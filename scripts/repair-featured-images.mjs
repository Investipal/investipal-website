#!/usr/bin/env node
// Repair featuredImage fields that point to missing local files.
// Strategy: if missing, use first existing local body image; else fallback to placeholder.

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const blogDir = path.join(root, 'src', 'content', 'blog');
const publicDir = path.join(root, 'public');
const placeholder = '/images/blog/placeholder-image.png';

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

function findFirstExistingBodyImage(body) {
  const re = /!\[[^\]]*\]\((\/images\/blog\/[\w%\-_.]+)\)/gi;
  let m;
  while ((m = re.exec(body)) !== null) {
    const rel = m[1];
    const abs = path.join(publicDir, rel.replace(/^\//, ''));
    if (fs.existsSync(abs)) return rel;
  }
  // also look for <img src="/images/blog/...">
  const reImg = /<img\s+[^>]*src=["'](\/images\/blog\/[\w%\-_.]+)["'][^>]*>/gi;
  while ((m = reImg.exec(body)) !== null) {
    const rel = m[1];
    const abs = path.join(publicDir, rel.replace(/^\//, ''));
    if (fs.existsSync(abs)) return rel;
  }
  return null;
}

function main() {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));
  const report = { scanned: 0, repaired: 0, kept: 0 };
  for (const f of files) {
    const filePath = path.join(blogDir, f);
    const raw = fs.readFileSync(filePath, 'utf8');
    const eol = raw.includes('\r\n') ? '\r\n' : '\n';
    const { fmBlock, fm, body } = splitFrontmatter(raw);
    if (!fmBlock || !fm) continue;
    report.scanned++;
    const featured = getYaml(fm, 'featuredImage');
    let needsRepair = false;
    if (!featured) {
      needsRepair = true;
    } else if (featured.startsWith('/')) {
      const abs = path.join(publicDir, featured.replace(/^\//, ''));
      if (!fs.existsSync(abs)) needsRepair = true;
    }
    if (!needsRepair) {
      report.kept++;
      continue;
    }
    const replacement = findFirstExistingBodyImage(body) || placeholder;
    const newYaml = setYaml(fm, 'featuredImage', replacement, eol);
    const rebuilt = fmBlock.replace(fm, newYaml) + body;
    fs.writeFileSync(filePath, rebuilt, 'utf8');
    report.repaired++;
  }
  console.log(JSON.stringify(report, null, 2));
}

main();



