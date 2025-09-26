#!/usr/bin/env node
// Normalize filenames in public/images/external (decode % encodings, kebab-case),
// then rewrite all /images/external/* references in src/** accordingly.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const root = projectRoot; // investipal-astro
const externalDir = path.join(root, 'public', 'images', 'external');
const srcDir = path.join(root, 'src');

function safeDecode(name) {
  let out = name;
  try {
    // decode repeatedly to handle double-encoded sequences like %2520
    let prev;
    do {
      prev = out;
      out = decodeURIComponent(out);
    } while (out !== prev);
  } catch {}
  return out;
}

function normalizeBase(name) {
  // Keep prefix ids; normalize the rest to kebab-case friendly
  const decoded = safeDecode(name);
  return decoded
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

if (!fs.existsSync(externalDir)) {
  console.error('External images dir not found:', externalDir);
  process.exit(1);
}

// Build rename mapping
const files = fs.readdirSync(externalDir);
const mapping = new Map();
for (const f of files) {
  const newBase = normalizeBase(f);
  if (newBase !== f) {
    let target = newBase;
    let counter = 1;
    while (fs.existsSync(path.join(externalDir, target)) && target !== f) {
      const ext = path.extname(newBase);
      const base = path.basename(newBase, ext);
      target = `${base}-${counter}${ext}`;
      counter += 1;
    }
    mapping.set(f, target);
  }
}

// Apply renames
for (const [oldName, newName] of mapping.entries()) {
  const from = path.join(externalDir, oldName);
  const to = path.join(externalDir, newName);
  fs.renameSync(from, to);
  console.log('Renamed:', oldName, '->', newName);
}

// Rewrite references in src/**
const exts = new Set(['.astro', '.ts', '.tsx', '.js', '.json']);
const srcFiles = walk(srcDir).filter((p) => exts.has(path.extname(p)));
let changed = 0;
for (const file of srcFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let updated = content;
  for (const [oldName, newName] of mapping.entries()) {
    const fromPath = `/images/external/${oldName}`;
    const toPath = `/images/external/${newName}`;
    if (updated.includes(fromPath)) {
      updated = updated.split(fromPath).join(toPath);
    }
  }
  if (updated !== content) {
    fs.writeFileSync(file, updated, 'utf8');
    changed++;
    console.log('Rewrote refs in', path.relative(root, file));
  }
}

console.log('Done. Files renamed:', mapping.size, 'Files updated:', changed);

