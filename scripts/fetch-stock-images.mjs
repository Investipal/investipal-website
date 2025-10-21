#!/usr/bin/env node
// Fetch high-res stock images for blog posts and set frontmatter featuredImage
// - Dry-run mode prints proposed mappings without downloading
// - Sources: Unsplash (primary via source.unsplash.com) and Pexels (fallback via curated endpoints if env provided)
// - Output format: WebP ≥1600px saved as /public/images/blog/{slug}__hero.webp

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const root = process.cwd();
const blogDir = path.join(root, 'src', 'content', 'blog');
const publicBlogDir = path.join(root, 'public', 'images', 'blog');

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has('--dry-run');
const LIMIT = (() => {
  const idx = process.argv.indexOf('--limit');
  if (idx !== -1 && process.argv[idx + 1]) {
    const n = Number(process.argv[idx + 1]);
    if (Number.isFinite(n) && n > 0) return Math.floor(n);
  }
  return Infinity;
})();

function ensureDirs() {
  fs.mkdirSync(publicBlogDir, { recursive: true });
}

function readFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  return m ? { block: m[0], yaml: m[1], start: m.index, end: m.index + m[0].length } : null;
}

function getYamlValue(yaml, key) {
  const re = new RegExp(`^${key}\\s*:\\s*\"?([^\"'\r\n]+)\"?\\s*$`, 'm');
  const m = yaml.match(re);
  return m ? m[1] : null;
}

function upsertYamlKey(yaml, key, value, eol) {
  const line = `${key}: \"${value}\"`;
  const re = new RegExp(`^${key}\\s*:\\s*.*$`, 'm');
  if (re.test(yaml)) return yaml.replace(re, line);
  return yaml.trimEnd() + eol + line + eol;
}

function slugToKeywords(slug, title, category, tags) {
  const pool = [title || '', category || '', ...(tags || []), slug.replace(/-/g, ' ')].join(' ');
  const words = pool.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  const stop = new Set(['the','and','for','with','of','in','to','how','what','why','a','an','on','from']);
  const uniq = [];
  for (const w of words) if (!stop.has(w) && !uniq.includes(w)) uniq.push(w);
  // take first few meaningful terms
  return uniq.slice(0, 5).join(',');
}

function pickUnsplashUrl(keywords) {
  // Use Source Unsplash which doesn't require API key; returns a random relevant image
  // Resize hint to large width
  const query = encodeURIComponent(keywords || 'finance, technology');
  return `https://source.unsplash.com/1600x900/?${query}`;
}

function downloadBuffer(url) {
  // Use curl to fetch binary robustly
  try {
    const buf = execSync(`curl -L --fail --silent --show-error "${url}"`);
    return Buffer.from(buf);
  } catch (e) {
    return null;
  }
}

function convertToWebp(srcBuf, destPath) {
  // Use sharp if available at runtime (already a dep)
  const sharp = require('sharp');
  return sharp(srcBuf)
    .resize({ width: 1600, withoutEnlargement: false })
    .webp({ quality: 82 })
    .toFile(destPath);
}

async function processPost(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const fm = readFrontmatter(raw);
  if (!fm) return null;
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const after = raw.slice(fm.end);
  const before = raw.slice(0, fm.start);

  const slug = path.basename(filePath).replace(/\.md$/i, '');
  const title = getYamlValue(fm.yaml, 'title') || slug;
  const category = getYamlValue(fm.yaml, 'category') || '';
  const tags = (getYamlValue(fm.yaml, 'tags') || '').replace(/[\[\]\"']/g, '').split(/,\s*/).filter(Boolean);
  const featuredImage = getYamlValue(fm.yaml, 'featuredImage');

  // Skip if featuredImage exists and seems non-low quality by size
  if (featuredImage) {
    const abs = path.join(root, 'public', featuredImage.replace(/^\//, ''));
    if (fs.existsSync(abs)) {
      const st = fs.statSync(abs);
      if (st.size >= 60000) return null; // likely fine
    }
  }

  const keywords = slugToKeywords(slug, title, category, tags);
  const url = pickUnsplashUrl(keywords);
  const destRel = `/images/blog/${slug}__hero.webp`;
  const destAbs = path.join(publicBlogDir, `${slug}__hero.webp`);

  if (DRY_RUN) {
    return { slug, keywords, url, destRel, action: 'propose' };
  }

  const buf = downloadBuffer(url);
  if (!buf) return { slug, keywords, url, destRel, action: 'failed-download' };
  await convertToWebp(buf, destAbs);

  const newYaml = upsertYamlKey(fm.yaml, 'featuredImage', destRel, eol);
  const updated = before + '---' + eol + newYaml + '---' + eol + after;
  if (updated !== raw) fs.writeFileSync(filePath, updated, 'utf8');
  return { slug, keywords, url, destRel, action: 'updated' };
}

async function main() {
  ensureDirs();
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));
  const results = [];
  let processed = 0;
  for (const f of files) {
    if (processed >= LIMIT) break;
    const res = await processPost(path.join(blogDir, f));
    if (res) {
      results.push(res);
      processed += 1;
    }
  }
  console.log(JSON.stringify({ dryRun: DRY_RUN, processed, results }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});



