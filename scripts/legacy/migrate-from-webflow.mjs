#!/usr/bin/env node
// Fetch remaining published posts from Webflow CMS and write Markdown files
// Requires env vars: WEBFLOW_API_TOKEN, WEBFLOW_COLLECTION_ID

import fs from 'node:fs';
import path from 'node:path';

const API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const COLLECTION_ID = process.env.WEBFLOW_COLLECTION_ID;
const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

function requireEnv() {
  if (!API_TOKEN || !COLLECTION_ID) {
    console.log('WEBFLOW_API_TOKEN or WEBFLOW_COLLECTION_ID not set. Skipping Webflow fetch.');
    process.exit(0);
  }
}

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function toDateString(val) {
  try {
    const d = new Date(val);
    if (!isNaN(d.getTime())) return d.toISOString();
  } catch {}
  return new Date().toISOString();
}

function extractBody(item) {
  // Heuristics: prefer fields with html rich text
  const candidates = [
    'post-body', 'body', 'content', 'article', 'richtext', 'rich-text', 'long-text', 'longtext', 'main-content'
  ];
  for (const key of candidates) {
    if (item?.fieldData?.[key]) return String(item.fieldData[key]);
  }
  // Fallback to any long string field
  for (const [k, v] of Object.entries(item.fieldData || {})) {
    if (typeof v === 'string' && v.length > 200 && /<p|<h\d|<ul|<div/i.test(v)) return v;
  }
  return '';
}

function firstParagraph(html) {
  const m = String(html).match(/<p[\s\S]*?>([\s\S]*?)<\/p>/i);
  if (!m) return '';
  return m[1].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function sentenceClamp(txt, min = 100, max = 220) {
  const t = (txt || '').replace(/\s+/g, ' ').trim();
  if (!t) return '';
  const re = /([.!?])\s+/g; let m; let best = '';
  while ((m = re.exec(t))) {
    const s = t.slice(0, m.index + 1);
    if (s.length >= min && s.length <= max) { best = s; break; }
  }
  if (!best) {
    let c = t.slice(0, max).replace(/\s+[^\s]*$/, '');
    if (!/[.!?]$/.test(c)) c += '.';
    best = c;
  }
  return best;
}

function findImage(item, bodyHtml) {
  const fd = item.fieldData || {};
  const keys = ['featured-image', 'main-image', 'image', 'header-image', 'cover-image'];
  for (const k of keys) {
    if (fd[k] && typeof fd[k] === 'string') return fd[k];
    if (fd[k]?.url) return fd[k].url;
  }
  const m = String(bodyHtml).match(/<img\s+[^>]*src=["']([^"']+)["']/i);
  return m ? m[1] : '';
}

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }

function mapCategory(tags) {
  const first = (tags && tags[0] || '').toLowerCase();
  if (/compliance/.test(first)) return 'Compliance';
  if (/onboarding/.test(first)) return 'Onboarding';
  if (/(portfolio|investment)/.test(first)) return 'Portfolio Management';
  if (/ai|automation/.test(first)) return 'AI';
  return first ? first[0].toUpperCase() + first.slice(1) : 'General';
}

function toYamlValue(val) {
  if (val == null) return '';
  const s = String(val).replace(/"/g, '\\"');
  return `"${s}"`;
}

function buildFrontmatter({ title, excerpt, author, publishedDate, updatedDate, category, tags, slug, featuredImage, featuredImageAlt }) {
  const lines = [
    `title: ${toYamlValue(title)}`,
    `excerpt: ${toYamlValue(excerpt)}`,
    `author: ${toYamlValue(author || 'Investipal Team')}`,
    `publishedDate: ${toYamlValue(publishedDate)}`,
    `updatedDate: ${toYamlValue(updatedDate || publishedDate)}`,
    `category: ${toYamlValue(category)}`,
    `tags: ${Array.isArray(tags) ? JSON.stringify(tags) : '[]'}`,
    `slug: ${toYamlValue(slug)}`,
    featuredImage ? `featuredImage: ${toYamlValue(featuredImage)}` : '',
    featuredImageAlt ? `featuredImageAlt: ${toYamlValue(featuredImageAlt)}` : '',
    `draft: false`,
  ].filter(Boolean);
  return `---\n${lines.join('\n')}\n---\n`;
}

async function fetchAllItems() {
  const items = [];
  let offset = 0; const limit = 100;
  while (true) {
    const url = `https://api.webflow.com/v2/collections/${COLLECTION_ID}/items?offset=${offset}&limit=${limit}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${API_TOKEN}` } });
    if (!res.ok) throw new Error(`Webflow ${res.status}`);
    const data = await res.json();
    const arr = data?.items || data?.data || [];
    items.push(...arr);
    if (arr.length < limit) break;
    offset += limit;
  }
  return items;
}

async function main() {
  requireEnv();
  ensureDir(BLOG_DIR);
  const all = await fetchAllItems();
  const report = { fetched: all.length, written: 0, skippedExisting: 0 };
  for (const item of all) {
    if (item.isDraft || item.isArchived) continue;
    const fd = item.fieldData || {};
    const title = fd.title || fd.name || fd['post-title'] || 'Untitled';
    const slug = slugify(fd.slug || fd['post-slug'] || title);
    const outfile = path.join(BLOG_DIR, `${slug}.md`);
    if (fs.existsSync(outfile)) { report.skippedExisting += 1; continue; }
    const bodyHtml = extractBody(item);
    const excerptSrc = fd['short-info'] || fd.excerpt || fd.summary || firstParagraph(bodyHtml);
    const excerpt = sentenceClamp(excerptSrc || firstParagraph(bodyHtml));
    const tagsStr = fd.tag || fd.tags || '';
    const tags = Array.isArray(tagsStr) ? tagsStr : String(tagsStr).split(',').map(t => t.trim()).filter(Boolean);
    const category = mapCategory(tags);
    const featuredImage = findImage(item, bodyHtml);
    const fm = buildFrontmatter({
      title, excerpt, author: fd.author || 'Investipal Team',
      publishedDate: toDateString(item.createdOn || item.lastPublished || Date.now()),
      updatedDate: toDateString(item.lastPublished || item.updatedOn || item.createdOn || Date.now()),
      category, tags, slug, featuredImage, featuredImageAlt: title,
    });
    const content = `${fm}${bodyHtml || ''}`;
    fs.writeFileSync(outfile, content, 'utf8');
    report.written += 1;
  }
  console.log(`Webflow migration complete. Fetched: ${report.fetched}, written: ${report.written}, skippedExisting: ${report.skippedExisting}`);
}

main().catch((e) => { console.error(e); process.exit(1); });



