#!/usr/bin/env node
// Build a preview mapping: blog slug -> best Webflow image URL (no writes)

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const blogDir = path.join(root, 'src', 'content', 'blog');
const manifestPath = path.join(root, 'scripts', 'webflow-image-manifest.json');

if (!fs.existsSync(manifestPath)) {
  console.error('Manifest not found. Run parse-webflow-curl.mjs first.');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

function normalize(s) {
  return String(s).toLowerCase().replace(/%20|\s+/g, '-').replace(/[^a-z0-9-]/g, '-');
}

function tokenize(s) {
  return normalize(s).split('-').filter(Boolean);
}

const candidates = manifest.items
  .filter((it) => ['.png', '.jpg', '.jpeg', '.webp', '.avif'].includes((it.ext || '').toLowerCase()))
  .map((it) => ({ ...it, nfile: normalize(it.filename), tokens: tokenize(it.filename) }));

function scoreMatch(slugTokens, cand) {
  // base score: number of shared tokens
  let score = 0;
  for (const t of slugTokens) if (cand.nfile.includes(t)) score += 1;
  // boost if file starts with slug prefix
  const slugPrefix = slugTokens.join('-').slice(0, 40);
  if (cand.nfile.startsWith(slugPrefix)) score += 3;
  // de-emphasize tiny thumbnails (e.g., p-130x130)
  if (/p-\d+x\d+/i.test(cand.filename)) score -= 1;
  // avoid obvious icons/logos
  if (/(logo|icon|favicon|slack|webflow)\./i.test(cand.filename)) score -= 2;
  return score;
}

const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));
const mapping = {};
const unmatched = [];

for (const f of files) {
  const slug = f.replace(/\.md$/i, '');
  const slugTokens = tokenize(slug);
  const ranked = candidates
    .map((c) => ({ c, s: scoreMatch(slugTokens, c) }))
    .sort((a, b) => b.s - a.s);
  const top = ranked[0];
  if (top && top.s > 1) {
    mapping[slug] = { url: top.c.url, filename: top.c.filename, score: top.s };
  } else {
    unmatched.push(slug);
  }
}

const out = {
  totalPosts: files.length,
  matched: Object.keys(mapping).length,
  unmatchedCount: unmatched.length,
  unmatched: unmatched.slice(0, 30),
  mapping,
};

const outPath = path.join(root, 'scripts', 'preview-image-mapping.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
console.log(`Preview written: ${outPath}`);
console.log(`Matched ${out.matched}/${out.totalPosts}. Unmatched ${out.unmatchedCount}.`);

