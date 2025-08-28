#!/usr/bin/env node
// Map real images to blog posts' frontmatter.featuredImage
// Heuristics:
// 1) If first in-body image exists under /public, use it
// 2) Else, find a file in /public/images/blog whose filename starts with the post slug
// 3) Else, pick a file that contains the slug tokens
// 4) Else, fallback to placeholder

import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
// If invoked from repo root, ensure we are in investipal-astro
if (!root.endsWith('investipal-astro')) {
  // adjust to script's directory parent
  const scriptDir = path.dirname(new URL(import.meta.url).pathname);
  const maybeRoot = path.resolve(scriptDir, '..');
  process.chdir(maybeRoot);
}
const realRoot = process.cwd();
const blogDir = path.join(realRoot, 'src', 'content', 'blog');
const publicDir = path.join(realRoot, 'public');
const blogImagesDir = path.join(publicDir, 'images', 'blog');
const placeholder = '/images/blog/placeholder-image.png';

function normalizeSlug(s) {
  return String(s).toLowerCase().replace(/%20|\s+/g, '-').replace(/[^a-z0-9-]/g, '-');
}

function listBlogImages() {
  try {
    const files = fs.readdirSync(blogImagesDir);
    return files.filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f));
  } catch {
    return [];
  }
}

const blogImages = listBlogImages();

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

function resolveFromBody(content) {
  const m = content.match(/!\[[^\]]*\]\((\/images\/[\w\-\/%\.]+)\)/i);
  if (!m) return null;
  const rel = m[1];
  const abs = path.join(publicDir, rel.replace(/^\//, ''));
  return fs.existsSync(abs) ? rel : null;
}

function resolveFromImages(slug) {
  const norm = normalizeSlug(slug);
  // prefix match first
  const prefix = blogImages.find((f) => normalizeSlug(f).startsWith(norm));
  if (prefix) return `/images/blog/${prefix}`;
  // token contains match
  const tokens = norm.split('-').filter(Boolean);
  const scored = blogImages
    .map((f) => {
      const nf = normalizeSlug(f);
      const score = tokens.reduce((acc, t) => acc + (nf.includes(t) ? 1 : 0), 0);
      return { f, score };
    })
    .sort((a, b) => b.score - a.score);
  if (scored[0] && scored[0].score > 0) return `/images/blog/${scored[0].f}`;
  return null;
}

function processFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const bounds = frontmatterBounds(raw);
  if (!bounds) return null;
  const before = raw.slice(0, bounds.start);
  const yaml = bounds.yaml;
  const after = raw.slice(bounds.start + bounds.block.length);

  const slug = path.basename(filePath).replace(/\.md$/i, '');
  // If featuredImage already points to an existing file, keep it
  const fmMatch = yaml.match(/^featuredImage\s*:\s*["']?([^"'\r\n]+)["']?\s*$/m);
  if (fmMatch) {
    const cur = fmMatch[1];
    if (cur) {
      const abs = path.join(publicDir, cur.replace(/^\//, ''));
      if (fs.existsSync(abs)) return null; // no change
    }
  }

  let resolved = resolveFromBody(after);
  if (!resolved) resolved = resolveFromImages(slug);
  if (!resolved) resolved = placeholder;

  const newYaml = upsertYamlKey(yaml, 'featuredImage', resolved, eol);
  const updated = before + '---' + eol + newYaml + '---' + eol + after;
  if (updated !== raw) {
    fs.writeFileSync(filePath, updated, 'utf8');
    return { filePath, featuredImage: resolved };
  }
  return null;
}

function main() {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));
  const changes = [];
  for (const f of files) {
    const p = path.join(blogDir, f);
    const res = processFile(p);
    if (res) changes.push(res);
  }
  console.log(JSON.stringify({ changed: changes.length, changes }, null, 2));
}

main();


