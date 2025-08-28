#!/usr/bin/env node
// Migrate external Webflow/CDN image URLs in src/** to local files under /public/images/external
// - Scans text files in src/**
// - Downloads each external URL once
// - Rewrites references to /images/external/<filename>

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..'); // investipal-astro
const root = projectRoot; // project root is investipal-astro
const srcDir = path.resolve(projectRoot, 'src');
const externalDir = path.resolve(projectRoot, 'public', 'images', 'external');

const urlRegex = /https?:\/\/(cdn\.prod\.website-files\.com|daks2k3a4ib2z\.cloudfront\.net|webflow\.com|website-files\.com)[^\s"']+/gi;

/** Recursively collect files under a directory */
function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function isTextFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return ['.astro', '.ts', '.tsx', '.js', '.jsx', '.json', '.md'].includes(ext);
}

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

function filenameFromUrl(u) {
  try {
    const url = new URL(u);
    const raw = url.pathname.split('/').filter(Boolean).pop() || 'asset';
    // Keep percent-encoding so existing local files with % remain matchable
    return raw.toLowerCase();
  } catch {
    return 'asset';
  }
}

async function downloadIfNeeded(url, destPath) {
  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) return 'cached';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.promises.writeFile(destPath, buf);
  return 'downloaded';
}

async function main() {
  await ensureDir(externalDir);

  const files = walk(srcDir).filter(isTextFile);
  const urlSet = new Set();
  const fileToUrls = new Map();

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(urlRegex);
    if (matches && matches.length) {
      fileToUrls.set(file, Array.from(new Set(matches)));
      for (const m of matches) urlSet.add(m);
    }
  }

  if (urlSet.size === 0) {
    console.log('No external Webflow/CDN URLs found.');
    return;
  }

  console.log(`Found ${urlSet.size} unique external URLs across ${fileToUrls.size} files.`);

  // Download assets
  const urlToLocal = new Map();
  for (const u of urlSet) {
    const fname = filenameFromUrl(u);
    let target = path.join(externalDir, fname);
    // Avoid accidental overwrite by uniquifying
    if (fs.existsSync(target)) {
      const { name, ext } = path.parse(fname);
      let i = 1;
      while (fs.existsSync(target)) {
        target = path.join(externalDir, `${name}__${i}${ext}`);
        i += 1;
      }
    }
    try {
      const status = await downloadIfNeeded(u, target);
      urlToLocal.set(u, '/images/external/' + path.basename(target));
      console.log(`${status.padEnd(10)} ${u} -> ${path.relative(root, target)}`);
    } catch (err) {
      console.warn(`WARN: ${String(err)}. Skipping ${u}`);
    }
  }

  // Rewrite files
  let rewrites = 0;
  for (const [file, urls] of fileToUrls.entries()) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    for (const u of urls) {
      const local = urlToLocal.get(u);
      if (!local) continue;
      const escaped = u.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(escaped, 'g');
      if (re.test(content)) {
        content = content.replace(re, local);
        changed = true;
        rewrites += 1;
      }
    }
    if (changed) {
      await fs.promises.writeFile(file, content, 'utf8');
      console.log(`rewrote ${path.relative(root, file)}`);
    }
  }

  console.log(`Done. Rewrote ${rewrites} references.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


