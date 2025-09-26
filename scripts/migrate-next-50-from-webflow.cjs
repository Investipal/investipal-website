#!/usr/bin/env node

/*
  Migrate next 50 missing Webflow blog posts into Astro content.
  - Requires env var WEBFLOW_TOKEN (Webflow CMS API token)
  - Uses collection id hardcoded below
  - Writes files to src/content/blog/{slug}.md with YAML frontmatter and HTML body
*/

const fs = require('fs');
const path = require('path');

const WEBFLOW_TOKEN = process.env.WEBFLOW_TOKEN || '';
const COLLECTION_ID = '666872ff37bdf42ce9637da3';
const API_BASE = `https://api.webflow.com/v2/collections/${COLLECTION_ID}`;
const TARGET_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');

if (!WEBFLOW_TOKEN) {
  console.error('Missing WEBFLOW_TOKEN env var. Please set your Webflow CMS API token.');
  process.exit(1);
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${WEBFLOW_TOKEN}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error(`Request failed ${res.status}: ${t}`);
  }
  return res.json();
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function listExistingSlugs(dir) {
  if (!fs.existsSync(dir)) return new Set();
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  const slugs = files.map(f => path.basename(f, '.md'));
  return new Set(slugs);
}

function sanitizeYaml(value) {
  if (value == null) return '';
  if (typeof value === 'string') {
    // Wrap in double quotes and escape quotes/newlines safely
    const escaped = value.replace(/"/g, '\\"');
    return `"${escaped}"`;
  }
  if (Array.isArray(value)) {
    return `[${value.map(v => sanitizeYaml(v)).join(', ')}]`;
  }
  return String(value);
}

function guessFeaturedImage(fieldData) {
  // Heuristic: pick first field that looks like an image URL
  const keys = Object.keys(fieldData || {});
  for (const k of keys) {
    const v = fieldData[k];
    if (typeof v === 'string' && /\.(png|jpg|jpeg|webp|gif)(\?.*)?$/i.test(v)) return { url: v, alt: '' };
    // Webflow CDN host often
    if (typeof v === 'string' && /cdn\.prod\.website-files\.com/.test(v)) return { url: v, alt: '' };
    if (v && typeof v === 'object' && v.url && typeof v.url === 'string') {
      if (/\.(png|jpg|jpeg|webp|gif)(\?.*)?$/i.test(v.url) || /cdn\.prod\.website-files\.com/.test(v.url)) {
        return { url: v.url, alt: v.alt || '' };
      }
    }
  }
  return { url: '', alt: '' };
}

function pickHtmlBody(fieldData) {
  // Heuristic: choose first long string containing HTML tags
  const keys = Object.keys(fieldData || {});
  for (const k of keys) {
    const v = fieldData[k];
    if (typeof v === 'string' && /<\/?(p|h1|h2|h3|h4|h5|h6|ul|ol|li|img|figure|blockquote)/i.test(v)) {
      return v;
    }
  }
  // Fallback to empty
  return '';
}

function makeExcerpt(fieldData, htmlBody) {
  // Prefer explicit short/summary fields
  const candidates = ['excerpt', 'summary', 'shortDescription', 'short_description', 'description'];
  for (const c of candidates) {
    if (fieldData[c] && typeof fieldData[c] === 'string') {
      return fieldData[c].trim();
    }
  }
  // Derive from HTML by stripping tags
  const text = htmlBody
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.slice(0, 180);
}

function makeTags(fieldData) {
  // Common Webflow patterns: array of strings, or comma-separated
  const t = fieldData.tags || fieldData.tag || fieldData.topics || fieldData.topic;
  if (Array.isArray(t)) return t;
  if (typeof t === 'string') return t.split(',').map(s => s.trim()).filter(Boolean);
  // Fallback category as tag
  const cat = fieldData.category || fieldData.categories;
  if (Array.isArray(cat)) return cat.map(String);
  if (typeof cat === 'string') return [cat];
  return [];
}

function yamlFrontmatter(data) {
  const lines = [
    '---',
    `title: ${sanitizeYaml(data.title)}`,
    `excerpt: ${sanitizeYaml(data.excerpt)}`,
    `author: ${sanitizeYaml(data.author)}`,
    `publishedDate: ${data.publishedDate ? new Date(data.publishedDate).toISOString() : ''}`,
    `updatedDate: ${data.updatedDate ? new Date(data.updatedDate).toISOString() : ''}`,
    `category: ${sanitizeYaml(data.category)}`,
    `tags: ${sanitizeYaml(data.tags)}`,
    `slug: ${sanitizeYaml(data.slug)}`,
    `featuredImage: ${sanitizeYaml(data.featuredImage)}`,
    `featuredImageAlt: ${sanitizeYaml(data.featuredImageAlt)}`,
    'draft: false',
    '---',
    '',
  ];
  return lines.join('\n');
}

async function main() {
  ensureDir(TARGET_DIR);
  const existing = listExistingSlugs(TARGET_DIR);

  // Fetch all items with pagination (100/page)
  const pageSize = 100;
  let items = [];
  let offset = 0;
  let total = null;
  while (true) {
    const page = await fetchJson(`${API_BASE}/items?limit=${pageSize}&offset=${offset}&sortBy=lastPublished&sortOrder=desc`);
    const list = Array.isArray(page.items) ? page.items : [];
    if (list.length === 0) break;
    items = items.concat(list);
    total = page.total ?? total ?? items.length;
    offset += pageSize;
    if ((total != null && items.length >= total) || list.length < pageSize) break;
  }

  // Filter missing by slug
  const missing = items.filter(it => {
    const slug = it?.fieldData?.slug || it?.slug;
    return slug && !existing.has(slug);
  });

  // Sort by lastPublished desc
  missing.sort((a, b) => {
    const ad = new Date(a.lastPublished || a.lastUpdated || a.createdOn || 0).getTime();
    const bd = new Date(b.lastPublished || b.lastUpdated || b.createdOn || 0).getTime();
    return bd - ad;
  });

  const next50 = missing.slice(0, 50);
  let created = 0;

  for (const it of next50) {
    const fd = it.fieldData || {};
    const slug = fd.slug || it.slug;
    if (!slug) continue;
    const title = fd.name || fd.title || slug.replace(/[-_]/g, ' ');
    const htmlBody = pickHtmlBody(fd);
    const excerpt = makeExcerpt(fd, htmlBody);
    const { url: featUrl, alt: featAlt } = guessFeaturedImage(fd);
    const author = fd.author || fd.authorName || 'Investipal Team';
    const category = fd.category || fd.categoryName || 'General';
    const tags = makeTags(fd);

    const fm = yamlFrontmatter({
      title,
      excerpt,
      author,
      publishedDate: it.lastPublished || it.createdOn || null,
      updatedDate: it.lastUpdated || it.lastPublished || null,
      category,
      tags,
      slug,
      featuredImage: featUrl || '',
      featuredImageAlt: featAlt || title,
    });

    const filepath = path.join(TARGET_DIR, `${slug}.md`);
    if (fs.existsSync(filepath)) continue;

    const body = htmlBody || '';
    fs.writeFileSync(filepath, fm + body, 'utf8');
    created += 1;
  }

  console.log(`Created ${created} markdown files in ${TARGET_DIR}`);
}

// Node 18+ has global fetch
if (typeof fetch !== 'function') {
  global.fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

