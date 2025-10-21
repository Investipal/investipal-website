#!/usr/bin/env node
// Ensure frontmatter YAML ends with a newline before closing '---' in blog posts

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const blogDir = path.join(root, 'src', 'content', 'blog');

function fixFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n?)/);
  if (!m) return false;
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const start = m.index;
  const fmBlock = m[0];
  const yaml = m[1];
  const afterStart = start + fmBlock.length;
  const before = raw.slice(0, start);
  const after = raw.slice(afterStart);

  // If YAML does not end with a newline, add one
  const yamlHasTrailingNewline = /(\r?\n)$/.test(yaml);
  const yamlFixed = yamlHasTrailingNewline ? yaml : (yaml + eol);

  const rebuilt = '---' + eol + yamlFixed + '---' + eol + after;
  const updated = before + rebuilt;
  if (updated !== raw) {
    fs.writeFileSync(filePath, updated, 'utf8');
    return true;
  }
  return false;
}

function main() {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));
  let changed = 0;
  for (const f of files) {
    if (fixFile(path.join(blogDir, f))) changed += 1;
  }
  console.log(JSON.stringify({ changed, files: files.length }, null, 2));
}

main();



