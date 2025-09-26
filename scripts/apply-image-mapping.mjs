#!/usr/bin/env node
// Apply preview-image-mapping: download images and update featuredImage

import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const root = process.cwd();
const blogDir = path.join(root, 'src', 'content', 'blog');
const outDir = path.join(root, 'public', 'images', 'blog');
const mapPath = path.join(root, 'scripts', 'preview-image-mapping.json');

if (!fs.existsSync(mapPath)) {
  console.error('Mapping not found. Run preview-image-mapping.mjs first.');
  process.exit(1);
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const mapping = JSON.parse(fs.readFileSync(mapPath, 'utf8')).mapping || {};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 400) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(dest)));
    }).on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

function frontmatterBounds(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return null;
  return { start: m.index, end: m[0].length, yaml: m[1], block: m[0] };
}

function upsertYamlKey(yaml, key, value, eol) {
  const re = new RegExp(`^${key}\\s*:\\s*.*$`, 'm');
  const line = `${key}: "${value}"`;
  if (re.test(yaml)) return yaml.replace(re, line);
  return yaml.trimEnd() + eol + line + eol;
}

async function run() {
  const slugs = Object.keys(mapping);
  const results = [];
  for (const slug of slugs) {
    const { url, filename } = mapping[slug];
    const ext = path.extname(filename) || '.png';
    const localName = `${slug}__hero${ext}`.replace(/[^a-zA-Z0-9_.-]/g, '-');
    const dest = path.join(outDir, localName);
    try {
      if (!fs.existsSync(dest)) {
        await download(url, dest);
      }
      const mdPath = path.join(blogDir, `${slug}.md`);
      if (!fs.existsSync(mdPath)) continue;
      const raw = fs.readFileSync(mdPath, 'utf8');
      const eol = raw.includes('\r\n') ? '\r\n' : '\n';
      const bounds = frontmatterBounds(raw);
      if (!bounds) continue;
      const before = raw.slice(0, bounds.start);
      const yaml = bounds.yaml;
      const after = raw.slice(bounds.start + bounds.block.length);
      const rel = `/images/blog/${localName}`;
      const newYaml = upsertYamlKey(yaml, 'featuredImage', rel, eol);
      const updated = before + '---' + eol + newYaml + '---' + eol + after;
      if (updated !== raw) {
        fs.writeFileSync(mdPath, updated, 'utf8');
        results.push({ slug, rel });
      }
    } catch (e) {
      console.error(`Failed ${slug}:`, e.message);
    }
  }
  console.log(JSON.stringify({ updated: results.length }, null, 2));
}

run();


