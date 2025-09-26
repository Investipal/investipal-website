#!/usr/bin/env node
// Fail if Webflow/CDN URLs are present in src/**
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const srcDir = path.resolve(projectRoot, 'src');
const urlRegex = /https?:\/\/(cdn\.prod\.website-files\.com|daks2k3a4ib2z\.cloudfront\.net|webflow\.com|website-files\.com)/i;

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function isText(file) {
  const ext = path.extname(file).toLowerCase();
  return ['.astro', '.ts', '.tsx', '.js', '.jsx', '.json', '.md'].includes(ext);
}

const offenders = [];
for (const file of walk(srcDir).filter(isText)) {
  const content = fs.readFileSync(file, 'utf8');
  if (urlRegex.test(content)) offenders.push(path.relative(projectRoot, file));
}

if (offenders.length) {
  console.error('ERROR: External Webflow/CDN URLs found in files:');
  for (const f of offenders) console.error(' - ' + f);
  process.exit(1);
} else {
  console.log('OK: No external Webflow/CDN URLs found.');
}
