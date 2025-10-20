#!/usr/bin/env node

/**
 * Normalize inline images in blog posts.
 * - Scans Markdown files for Markdown and HTML <img> references
 * - Downloads remote http(s) images
 * - Crops/resizes to 3:2 (1200x800) using Sharp with attention-based crop
 * - Converts to WebP (quality ~82)
 * - Saves under public/images/inline/
 * - Rewrites post content to local URLs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'inline');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function hash(buf) {
  return crypto.createHash('sha1').update(buf).digest('hex').slice(0, 10);
}

function uniqueName(slug, index, buf) {
  return `${slug}-${index}-${hash(buf)}.webp`;
}

function findImages(content) {
  const results = [];
  // Markdown images
  const mdRe = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g; // ![alt](url "title")
  let m;
  while ((m = mdRe.exec(content))) {
    results.push({ type: 'markdown', full: m[0], url: m[1], index: m.index });
  }
  // HTML images
  const htmlRe = /<img[^>]*src=["']([^"']+)["'][^>]*>/gi;
  while ((m = htmlRe.exec(content))) {
    results.push({ type: 'html', full: m[0], url: m[1], index: m.index });
  }
  return results;
}

async function fetchBuffer(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

async function processImage(buf) {
  // Standardize to 1200x800 (3:2)
  return await sharp(buf)
    .resize({ width: 1200, height: 800, fit: 'cover', position: 'attention' })
    .webp({ quality: 82 })
    .toBuffer();
}

async function loadLocalBuffer(relUrl) {
  const publicRoot = path.join(__dirname, '..', 'public');
  const clean = relUrl.startsWith('/') ? relUrl.slice(1) : relUrl;
  const abs = path.join(publicRoot, clean);
  if (!fs.existsSync(abs)) throw new Error('Local file not found');
  return fs.readFileSync(abs);
}

function replaceAll(content, replacements) {
  // replacements: array of { from, to }
  let out = content;
  for (const { from, to } of replacements) {
    out = out.split(from).join(to);
  }
  return out;
}

async function main() {
  ensureDir(OUT_DIR);
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));

  let totalImages = 0;
  let converted = 0;
  let skipped = 0;
  let changedFiles = 0;

  for (const file of files) {
    const slug = file.replace(/\.md$/i, '');
    const abs = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(abs, 'utf-8');

    const images = findImages(content);
    if (images.length === 0) continue;
    totalImages += images.length;

    const replacements = [];
    let idx = 0;
    for (const img of images) {
      const url = String(img.url || '').trim();
      try {
        let buf;
        if (/^https?:\/\//i.test(url)) {
          buf = await fetchBuffer(url);
        } else {
          // local site-relative path under /public
          buf = await loadLocalBuffer(url);
        }
        // Skip if image is already close to 3:2 landscape (no heavy portrait)
        const meta = await sharp(buf).metadata();
        if (meta.width && meta.height) {
          const ratio = meta.width / meta.height;
          // If tall portrait (ratio < 1), or extreme aspect not ~1.5, normalize
          // Otherwise still normalize to ensure consistent width & format
        }
        const out = await processImage(buf);
        const name = uniqueName(slug, idx++, buf);
        const outPath = path.join(OUT_DIR, name);
        fs.writeFileSync(outPath, out);
        const localUrl = `/images/inline/${name}`;
        // Replace specific occurrence by string replacement of the URL only
        replacements.push({ from: url, to: localUrl });
        converted++;
        console.log(`✅ ${slug}: ${url} -> ${localUrl}`);
      } catch (err) {
        console.warn(`⚠️  ${slug}: failed ${url}: ${err.message}`);
      }
    }

    if (replacements.length > 0) {
      const updated = replaceAll(content, replacements);
      if (updated !== content) {
        fs.writeFileSync(abs, updated);
        changedFiles++;
      }
    }
  }

  console.log('\n📈 Inline Image Normalization Summary');
  console.log(`   Files changed: ${changedFiles}`);
  console.log(`   Total references: ${totalImages}`);
  console.log(`   Converted: ${converted}`);
  console.log(`   Skipped (already local/relative): ${skipped}`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});


