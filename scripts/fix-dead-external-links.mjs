#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');
const REPORT_PATH = path.join(process.cwd(), 'scripts', 'output', 'external-link-check.json');
const FIX_REPORT = path.join(process.cwd(), 'scripts', 'output', 'external-link-fixes.json');

function groupFailuresByFile() {
  if (!fs.existsSync(REPORT_PATH)) {
    console.error('No external-link-check.json found. Run check-external-links.mjs first.');
    process.exit(1);
  }
  const report = JSON.parse(fs.readFileSync(REPORT_PATH, 'utf8'));
  const map = new Map();
  for (const f of report.failures || []) {
    const file = f.file;
    const url = f.url;
    if (!map.has(file)) map.set(file, new Set());
    map.get(file).add(url);
  }
  return map;
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function fixFile(filePath, badUrls) {
  const raw = fs.readFileSync(filePath, 'utf8');
  let content = raw;
  let changes = 0;
  for (const url of badUrls) {
    const u = escapeRegex(url);
    // Replace HTML anchors <a href="url">text</a> with just text
    const reHtml = new RegExp(`<a([^>]*?)href=["']${u}["']([^>]*?)>([\s\S]*?)<\\/a>`, 'gi');
    content = content.replace(reHtml, (_m, _pre, _post, inner) => {
      changes += 1;
      return inner;
    });
    // Replace markdown links [text](url) with just text
    const reMd = new RegExp(`\\[([^\\]]+)\\]\\(${u}\\)`, 'gi');
    content = content.replace(reMd, (_m, inner) => {
      changes += 1;
      return inner;
    });
  }
  if (changes > 0) fs.writeFileSync(filePath, content, 'utf8');
  return changes;
}

function main() {
  const map = groupFailuresByFile();
  const result = { fixedFiles: 0, totalFixes: 0, details: [] };
  for (const [file, urlSet] of map.entries()) {
    const p = path.join(BLOG_DIR, file);
    if (!fs.existsSync(p)) continue;
    const fixes = fixFile(p, Array.from(urlSet));
    if (fixes > 0) {
      result.fixedFiles += 1;
      result.totalFixes += fixes;
      result.details.push({ file, fixes });
    }
  }
  fs.mkdirSync(path.dirname(FIX_REPORT), { recursive: true });
  fs.writeFileSync(FIX_REPORT, JSON.stringify(result, null, 2), 'utf8');
  console.log(`External link auto-fix complete. Files changed: ${result.fixedFiles}; Replacements: ${result.totalFixes}`);
  console.log(`Report at ${FIX_REPORT}`);
}

main();


