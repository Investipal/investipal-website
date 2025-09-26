#!/usr/bin/env node
// Parse a Webflow curl commands file and extract image URLs and filenames
// Usage: node scripts/parse-webflow-curl.mjs "C:\\path\\to\\curl-commands.txt"

import fs from 'node:fs';
import path from 'node:path';

const inputPath = process.argv[2] || 'C:/Users/chris/OneDrive/Desktop/curl-commands.txt';
if (!fs.existsSync(inputPath)) {
  console.error(`Input not found: ${inputPath}`);
  process.exit(1);
}

const raw = fs.readFileSync(inputPath, 'utf8');
const lines = raw.split(/\r?\n/);

const urlRegex = /curl\s+\^?\"([^\"]+)\"/i; // match first quoted URL after curl (Windows-escaped)
const entries = [];

for (const line of lines) {
  const m = line.match(urlRegex);
  if (!m) continue;
  let url = m[1];
  // Remove caret escapes from Windows PowerShell export
  url = url.replace(/\^/g, '');
  // Fix encoded caret-percent sequences (e.g., ^%20 became %20 after removing ^)
  try {
    const u = new URL(url);
    const filename = path.basename(u.pathname);
    const ext = path.extname(filename).toLowerCase();
    entries.push({ url, filename, ext });
  } catch {
    // ignore invalid URL lines
  }
}

// De-duplicate by URL
const unique = Array.from(new Map(entries.map(e => [e.url, e])).values());

const outPath = path.join(process.cwd(), 'scripts', 'webflow-image-manifest.json');
fs.writeFileSync(outPath, JSON.stringify({ count: unique.length, items: unique }, null, 2), 'utf8');
console.log(`Wrote manifest: ${outPath}`);
console.log(`Count: ${unique.length}`);

