#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');
const CLI_TARGET = process.argv[2] ? path.resolve(ROOT, process.argv[2]) : null;
const ENV_TARGET = process.env.VERIFY_ONLY ? path.resolve(ROOT, process.env.VERIFY_ONLY) : null;
const TARGET = CLI_TARGET || ENV_TARGET || BLOG_DIR;

const rules = {
  tlDr: /(?<=^|\n)##\s*TL;?DR/i,
  h1: /^#\s+.+/m,
  h2Count: /(^##\s+)/gm,
  faq: /(^##\s*FAQ)s?/mi,
  internalLinks: /\]\(\/(learn|features|downloads|solutions)\//g,
  httpLinks: /\]\((https?:\/\/[^\)]+)\)/g,
};

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(p);
  }
  return out;
}

function withinTarget(filePath) {
  const abs = path.resolve(filePath);
  return abs === TARGET || abs.startsWith(TARGET + path.sep);
}

function checkFile(filePath) {
  const base = path.basename(filePath).toLowerCase();
  if (base === 'brief.md') return []; // skip briefs

  const content = fs.readFileSync(filePath, 'utf8');
  const errors = [];

  if (!rules.h1.test(content)) errors.push('Missing H1');

  const h2s = content.match(rules.h2Count) || [];
  if (h2s.length < 2) errors.push('Too few subheads (need ≥2)');

  if (!rules.tlDr.test(content)) errors.push('Missing TL;DR section/bullets');

  const internals = content.match(rules.internalLinks) || [];
  if (internals.length < 3) errors.push('Need ≥3 internal links');

  if (!rules.faq.test(content)) errors.push('Missing FAQ section');

  const httpLinks = content.match(rules.httpLinks) || [];
  if (httpLinks.length < 1) errors.push('No external citations found');

  return errors;
}

function main() {
  const all = walk(TARGET).filter(withinTarget);
  if (all.length === 0) {
    console.log('No markdown files matched target; nothing to verify.');
    return;
  }
  const report = [];
  for (const f of all) {
    const errs = checkFile(f);
    if (errs.length) report.push({ file: path.relative(ROOT, f), errors: errs });
  }
  if (report.length) {
    console.error('Post verification failed:\n');
    for (const r of report) {
      console.error(`- ${r.file}`);
      for (const e of r.errors) console.error(`  • ${e}`);
    }
    process.exit(1);
  } else {
    console.log('All posts passed verification.');
  }
}

main();
