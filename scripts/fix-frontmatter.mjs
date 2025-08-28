#!/usr/bin/env node
// Fix malformed frontmatter lines like: draft: false--- or draft: "false"---
import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const files = walk(blogDir).filter((f) => f.toLowerCase().endsWith('.md'));
let fixed = 0;
for (const file of files) {
  const orig = fs.readFileSync(file, 'utf8');
  let content = orig;
  // Replace occurrences only in the frontmatter block at the top
  const fmMatch = content.match(/^---[\s\S]*?---/);
  if (!fmMatch) continue;
  let fm = fmMatch[0];
  const replaced = fm
    .replace(/draft:\s*"?false"?---/i, 'draft: false\n---')
    .replace(/draft:\s*"?true"?---/i, 'draft: true\n---');
  if (replaced !== fm) {
    content = content.replace(fm, replaced);
  }
  if (content !== orig) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('fixed', path.relative(process.cwd(), file));
    fixed += 1;
  }
}
console.log(`Done. Fixed ${fixed} files.`);


