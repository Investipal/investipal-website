#!/usr/bin/env node
// Fix malformed frontmatter across blog posts:
// - Ensure closing '---' is on its own line (e.g., "featuredImage: ...---" -> newline before ---)
// - Normalize draft booleans (draft: "false" -> draft: false)
// - Normalize tags like ["[]"] -> []
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

  let replaced = fm;
  // 1) Ensure any trailing '---' is on its own line
  // e.g., "...__hero.png"--- -> "...__hero.png"\n---
  replaced = replaced.replace(/([^\n])---/g, '$1\n---');

  // 2) Normalize draft booleans (quoted -> boolean)
  replaced = replaced
    .replace(/draft:\s*"?false"?(\s*\n|\s*\r\n)/i, 'draft: false$1')
    .replace(/draft:\s*"?true"?(\s*\n|\s*\r\n)/i, 'draft: true$1')
    // Also catch if glued to closing ---
    .replace(/draft:\s*"?false"?\s*\n?---/i, 'draft: false\n---')
    .replace(/draft:\s*"?true"?\s*\n?---/i, 'draft: true\n---');

  // 3) Normalize tags like ["[]"] -> [] and string "[]" -> []
  replaced = replaced
    .replace(/tags:\s*\[\s*"?\[\s*\]"?\s*\]/i, 'tags: []')
    .replace(/tags:\s*"\[\s*\]"/i, 'tags: []');

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


