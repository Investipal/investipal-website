#!/usr/bin/env node
// Replace placeholder featured images with Unsplash Source hotlinks, then localize in a separate step.

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const blogDir = path.join(root, 'src', 'content', 'blog');

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

function setYaml(yaml, key, value, eol) {
  const re = new RegExp(`^${key}\\s*:\\s*.*$`, 'm');
  const line = `${key}: \"${value}\"`;
  if (re.test(yaml)) return yaml.replace(re, line);
  return yaml.trimEnd() + eol + line + eol;
}

function keywordsFrom(title, category, tags, slug) {
  const pool = [title || '', category || '', ...(tags || []), slug.replace(/-/g, ' ')].join(' ');
  const words = pool.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  const stop = new Set(['the','and','for','with','of','in','to','how','what','why','a','an','on','from']);
  const uniq = [];
  for (const w of words) if (!stop.has(w) && !uniq.includes(w)) uniq.push(w);
  return uniq.slice(0, 5).join(',');
}

function main() {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));
  const out = { scanned: 0, replaced: 0 };
  for (const f of files) {
    const filePath = path.join(blogDir, f);
    const raw = fs.readFileSync(filePath, 'utf8');
    const eol = raw.includes('\r\n') ? '\r\n' : '\n';
    const { fmBlock, fm, body } = splitFrontmatter(raw);
    if (!fmBlock || !fm) continue;
    out.scanned++;
    const featured = getYaml(fm, 'featuredImage');
    if (featured !== '/images/blog/placeholder-image.png') continue;
    const title = getYaml(fm, 'title') || f.replace(/\.md$/i, '');
    const category = getYaml(fm, 'category') || '';
    const tagsRaw = getYaml(fm, 'tags');
    const tags = tagsRaw ? tagsRaw.replace(/[\[\]\"']/g, '').split(/,\s*/).filter(Boolean) : [];
    const slug = f.replace(/\.md$/i, '');
    const q = encodeURIComponent(keywordsFrom(title, category, tags, slug) || 'finance, technology');
    const src = `https://source.unsplash.com/1600x900/?${q}`;
    const newYaml = setYaml(fm, 'featuredImage', src, eol);
    const rebuilt = fmBlock.replace(fm, newYaml) + body;
    fs.writeFileSync(filePath, rebuilt, 'utf8');
    out.replaced++;
  }
  console.log(JSON.stringify(out, null, 2));
}

main();



