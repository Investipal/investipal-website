#!/usr/bin/env node
// Normalize frontmatter blocks to:
// ---\n<yaml>\n---\n<body>

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const blogDir = path.join(root, 'src', 'content', 'blog');

function normalizeOne(fp) {
  const raw = fs.readFileSync(fp, 'utf8');
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  if (!raw.startsWith('---')) return false;
  // find the next '---' after the first line (tolerate missing newline before it)
  const afterFirst = raw.indexOf('---') + 3;
  const rest = raw.slice(afterFirst);
  const endIdxRel = rest.indexOf('---');
  if (endIdxRel === -1) return false; // malformed beyond simple fix
  const yamlSection = rest.slice(0, endIdxRel)
    .replace(/^\r?\n/, '') // drop leading newline if present
    .replace(/\r?\n?$/, ''); // drop trailing newline if present
  const body = rest.slice(endIdxRel + 3).replace(/^\r?\n?/, '');
  const rebuilt = `---${eol}${yamlSection}${eol}---${eol}${body}`;
  if (rebuilt !== raw) {
    fs.writeFileSync(fp, rebuilt, 'utf8');
    return true;
  }
  return false;
}

function main() {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));
  let changed = 0;
  for (const f of files) {
    try {
      if (normalizeOne(path.join(blogDir, f))) changed += 1;
    } catch {}
  }
  console.log(JSON.stringify({ files: files.length, changed }, null, 2));
}

main();















