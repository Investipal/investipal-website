#!/usr/bin/env node
// Force-correct frontmatter delimiters to always be:
// ---\n<yaml>\n---\n<body>

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const blogDir = path.join(root, 'src', 'content', 'blog');

function normalizeOne(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const startIdx = raw.indexOf('---');
  if (startIdx !== 0) return false; // expect FM at top
  // find next '---' after start
  const afterStart = 3; // position after first '---'
  const nextIdx = raw.indexOf('---', afterStart);
  if (nextIdx === -1) return false;
  const beforeYaml = raw.slice(0, 3);
  const yamlAndAfter = raw.slice(3);
  // yamlAndAfter begins after first '---'
  // remove leading newlines/spaces
  let yamlStart = 0;
  while (yamlStart < yamlAndAfter.length && (yamlAndAfter[yamlStart] === '\n' || yamlAndAfter[yamlStart] === '\r')) yamlStart++;
  // find closing '---' relative to yamlAndAfter
  const relCloseIdx = yamlAndAfter.indexOf('---', yamlStart);
  if (relCloseIdx === -1) return false;
  const yamlContent = yamlAndAfter.slice(yamlStart, relCloseIdx).replace(/\s+$/, '');
  const body = yamlAndAfter.slice(relCloseIdx + 3);
  // remove a single trailing EOL from body if present (we will add one)
  const bodyNormalized = body.replace(/^(\r?\n)?/, '');
  const rebuilt = '---' + eol + yamlContent + eol + '---' + eol + bodyNormalized;
  if (rebuilt !== raw) {
    fs.writeFileSync(filePath, rebuilt, 'utf8');
    return true;
  }
  return false;
}

function main() {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));
  let changed = 0;
  for (const f of files) {
    if (normalizeOne(path.join(blogDir, f))) changed += 1;
  }
  console.log(JSON.stringify({ changed, files: files.length }, null, 2));
}

main();



