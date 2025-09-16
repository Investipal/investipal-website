#!/usr/bin/env node
// Hotlink Unsplash Source URLs as featuredImage for low-quality posts (no API key)
// Then run scripts/localize-images.mjs to download and rewrite to local paths.

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const blogDir = path.join(root, 'src', 'content', 'blog');
const publicDir = path.join(root, 'public');

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
  return uniq.slice(0, 5).join(',');
}

function shouldReplaceLowQuality(featuredImage) {
  if (!featuredImage) return true;
  // If local path exists and is small, mark for replacement
  if (featuredImage.startsWith('/')) {
    const abs = path.join(publicDir, featuredImage.replace(/^\//, ''));
    try {
      const st = fs.statSync(abs);
      if (st.size < 60000) return true; // ~60KB threshold
      return false;
    } catch {
      // missing local file -> replace
      return true;
    }
  }
  // If external URL, keep as-is (likely already stock/localized)
  return false;
}

function buildUnsplashSourceUrl(keywords) {
  const q = encodeURIComponent(keywords || 'finance, technology');
  return `https://source.unsplash.com/1600x900/?${q}`;
}

function processPost(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const fm = readFrontmatter(raw);
  if (!fm) return null;
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const after = raw.slice(fm.end);
  const before = raw.slice(0, fm.start);

  const slug = path.basename(filePath).replace(/\.md$/i, '');
  const title = getYamlValue(fm.yaml, 'title') || slug;
  const category = getYamlValue(fm.yaml, 'category') || '';
  const tagsRaw = getYamlValue(fm.yaml, 'tags');
  const tags = tagsRaw ? tagsRaw.replace(/[\[\]\"']/g, '').split(/,\s*/).filter(Boolean) : [];
  const featuredImage = getYamlValue(fm.yaml, 'featuredImage');

  if (!shouldReplaceLowQuality(featuredImage)) return null;

  const keywords = slugToKeywords(slug, title, category, tags);
  const unsplashUrl = buildUnsplashSourceUrl(keywords);

  if (DRY_RUN) return { slug, keywords, to: unsplashUrl, action: 'propose' };

  const newYaml = upsertYamlKey(fm.yaml, 'featuredImage', unsplashUrl, eol);
  const updated = before + '---' + eol + newYaml + '---' + eol + after;
  if (updated !== raw) fs.writeFileSync(filePath, updated, 'utf8');
  return { slug, keywords, to: unsplashUrl, action: 'updated' };
}

function main() {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));
  const results = [];
  let processed = 0;
  for (const f of files) {
    if (processed >= LIMIT) break;
    const res = processPost(path.join(blogDir, f));
    if (res) {
      results.push(res);
      processed += 1;
    }
  }
  console.log(JSON.stringify({ dryRun: DRY_RUN, processed, results }, null, 2));
}

main();



