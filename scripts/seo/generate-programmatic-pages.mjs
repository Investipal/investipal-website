#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

// Minimal generator: reads a JSON spec and writes markdown files into src/content/solutions
// Usage: node scripts/seo/generate-programmatic-pages.mjs path/to/spec.json

const [, , specPath] = process.argv;
if (!specPath) {
  console.error('Usage: node scripts/seo/generate-programmatic-pages.mjs spec.json');
  process.exit(1);
}

const outDir = path.resolve('src/content/solutions');
fs.mkdirSync(outDir, { recursive: true });

const spec = JSON.parse(fs.readFileSync(specPath, 'utf-8'));
if (!Array.isArray(spec)) {
  console.error('Spec must be an array of items.');
  process.exit(1);
}

for (const item of spec) {
  const slug = item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const file = path.join(outDir, `${slug}.md`);
  const frontmatter = {
    title: item.title,
    description: item.description || '',
    icp: item.icp || 'RIA',
    intent: item.intent || 'commercial',
    primary_kw: item.primary_kw || '',
    secondary_kws: item.secondary_kws || [],
    seoDescription: item.seoDescription || item.description || '',
    draft: !!item.draft,
  };
  const body = item.body || '## Overview\n\nComing soon.';
  const yaml = `---\n${Object.entries(frontmatter)
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? `\n  - ${v.join('\n  - ')}` : JSON.stringify(v).replace(/^"|"$/g, '')}`)
    .join('\n')}\n---\n\n${body}\n`;
  fs.writeFileSync(file, yaml);
  console.log('Wrote', file);
}


