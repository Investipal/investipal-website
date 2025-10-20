#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

function run(cmd, args, label) {
  console.log(`\n>>> ${label}`);
  const res = spawnSync(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32' });
  if (res.status !== 0) {
    console.error(`Command failed: ${cmd} ${args.join(' ')}`);
    process.exit(res.status || 1);
  }
}

function ensureOutputDir() {
  const outDir = path.join(process.cwd(), 'scripts', 'output');
  fs.mkdirSync(outDir, { recursive: true });
}

async function main() {
  ensureOutputDir();

  // 1) Migration step (expects an existing migration script or Webflow export process)
  // If you still use a Webflow script, call it here; otherwise, skip.
  // Example placeholder (no-op):
  // Attempt Webflow fetch if credentials are present
  run('node', ['scripts/migrate-from-webflow.mjs'], 'Fetch remaining posts from Webflow (if configured)');
  // Fetch podcasts if configured
  run('node', ['scripts/migrate-podcasts-from-webflow.mjs'], 'Fetch podcasts from Webflow (if configured)');

  // 2) Fix frontmatter and featured images
  run('node', ['scripts/bulk-fix-frontmatter.mjs'], 'Fix frontmatter & featured images');

  // 3) Normalize and enrich links (and remove links from headings)
  run('node', ['scripts/audit-and-enrich-links.mjs'], 'Normalize/enrich links and clean heading links');

  // 4) Ensure tags/categories populated
  run('node', ['scripts/enrich-tags-categories.mjs'], 'Populate tags and derived categories');

  // 5) Rewrite internal links and absolute site URLs
  run('node', ['scripts/fix-links.mjs'], 'Rewrite internal links to /blog/:slug and relative URLs');

  // 6) Rebuild all excerpts deterministically using sentence clamp
  run('node', ['scripts/audit-excerpts.mjs'], 'Regenerate excerpts (no cutoffs)');

  // 6b) Optional: localize images to public/images/blog and rewrite references
  run('node', ['scripts/localize-images.mjs'], 'Localize external images to public/ and relink');

  // 6c) Optional: external link 404 check (report only)
  run('node', ['scripts/check-external-links.mjs'], 'Check external links (report only)');

  // 7) Type-check & build to validate
  run('npx', ['--yes', 'astro', 'check'], 'Type check');
  run('npx', ['--yes', 'astro', 'build'], 'Build');

  console.log('\nAll steps completed successfully.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


