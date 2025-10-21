#!/usr/bin/env node
// For posts whose featuredImage points to a non-existent local file, repoint to a local general image

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const blogDir = path.join(root, 'src', 'content', 'blog');
const publicDir = path.join(root, 'public');
const generalDir = path.join(publicDir, 'images', 'general');

function splitFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) return { fmBlock: null, fm: null, body: raw };
  const fmBlock = m[0];
  const fm = m[1];
  const body = raw.slice(m.index + fmBlock.length);
  return { fmBlock, fm, body };
}

function getYaml(yaml, key) {
  const re = new RegExp(`^${key}\\s*:\\s*\"?([^\"\n]+)\"?`, 'm');
  const m = yaml.match(re);
  return m ? m[1] : null;
}

function setYaml(yaml, key, value) {
  const re = new RegExp(`^${key}\\s*:\\s*.*$`, 'm');
  const line = `${key}: "${value}"`;
  if (re.test(yaml)) return yaml.replace(re, line);
  return yaml.trimEnd() + `\n` + line + `\n`;
}

function isLocalPath(u) {
  return typeof u === 'string' && u.startsWith('/');
}

function existsPublic(u) {
  const fp = path.join(publicDir, u.replace(/^\//, ''));
  return fs.existsSync(fp);
}

function main() {
  const images = fs.readdirSync(generalDir).filter((f) => /\.(webp|jpe?g|png)$/i.test(f)).sort();
  if (images.length === 0) {
    console.error('No images found in public/images/general');
    process.exit(1);
  }
  let idx = 0;
  let changes = 0;
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));
  for (const file of files) {
    const fp = path.join(blogDir, file);
    const raw = fs.readFileSync(fp, 'utf8');
    const { fmBlock, fm, body } = splitFrontmatter(raw);
    if (!fmBlock || !fm) continue;
    const current = getYaml(fm, 'featuredImage');
    if (!current || !isLocalPath(current)) continue;
    if (existsPublic(current)) continue;
    const chosen = images[idx % images.length];
    idx += 1;
    const newFm = setYaml(fm, 'featuredImage', `/images/general/${chosen}`);
    const rebuilt = `${fmBlock.replace(fm, newFm)}${body}`;
    fs.writeFileSync(fp, rebuilt, 'utf8');
    changes += 1;
  }
  console.log(JSON.stringify({ changes }, null, 2));
}

main();


























