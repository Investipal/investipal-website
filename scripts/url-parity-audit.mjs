#!/usr/bin/env node
// URL Parity Audit: Compare production sitemap vs staging build sitemap
// Usage:
//   node scripts/url-parity-audit.mjs --prod https://investipal.co/sitemap-index.xml --staging dist/sitemap-index.xml

import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

function getArg(flag, def) {
  const idx = process.argv.indexOf(flag);
  return idx !== -1 ? process.argv[idx + 1] : def;
}

const prodIndexUrl = getArg('--prod', 'https://investipal.co/sitemap-index.xml');
const stagingIndexPath = getArg('--staging', 'dist/sitemap-index.xml');
const outputDir = getArg('--out', 'reports');

function extractLocs(xml) {
  const locs = new Set();
  const re = /<loc>\s*([^<\s]+)\s*<\/loc>/gi;
  let m;
  while ((m = re.exec(xml))) {
    locs.add(m[1]);
  }
  return Array.from(locs);
}

async function readText(filePath) {
  return await readFile(filePath, 'utf-8');
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.text();
}

async function readStagingSitemaps(indexPath) {
  const indexXml = await readText(indexPath);
  const indexDir = path.dirname(indexPath);
  const locs = extractLocs(indexXml);
  const isIndex = /<sitemapindex[\s>]/i.test(indexXml);
  if (!isIndex) {
    return extractLocs(indexXml);
  }
  const all = new Set();
  for (const loc of locs) {
    try {
      const childName = new URL(loc).pathname.replace(/^\//, '');
      const childPath = path.join(indexDir, childName);
      if (!existsSync(childPath)) continue;
      const childXml = await readText(childPath);
      extractLocs(childXml).forEach(u => all.add(u));
    } catch {
      // If URL parsing fails, skip
    }
  }
  return Array.from(all);
}

async function readProdSitemaps(indexUrl) {
  let indexXml;
  try {
    indexXml = await fetchText(indexUrl);
  } catch (e) {
    // Fallback: if index fetch fails, try /sitemap.xml on same origin
    try {
      const u = new URL(indexUrl);
      const fallback = `${u.origin}/sitemap.xml`;
      indexXml = await fetchText(fallback);
    } catch (e2) {
      throw e; // bubble original error if fallback also fails
    }
  }
  const locs = extractLocs(indexXml);
  const isIndex = /<sitemapindex[\s>]/i.test(indexXml);
  if (!isIndex) {
    return extractLocs(indexXml);
  }
  const all = new Set();
  for (const loc of locs) {
    try {
      const childXml = await fetchText(loc);
      extractLocs(childXml).forEach(u => all.add(u));
    } catch {
      // skip
    }
  }
  return Array.from(all);
}

function toPathname(u) {
  try {
    return new URL(u).pathname.replace(/\/$/, '');
  } catch {
    return u;
  }
}

function diffSets(prodUrls, stagingUrls) {
  const prodPaths = new Set(prodUrls.map(toPathname));
  const stagingPaths = new Set(stagingUrls.map(toPathname));
  const missingInStaging = [];
  const same = [];
  for (const p of prodPaths) {
    if (stagingPaths.has(p)) same.push(p);
    else missingInStaging.push(p);
  }
  return { same, missingInStaging };
}

async function main() {
  const [prodUrls, stagingUrls] = await Promise.all([
    readProdSitemaps(prodIndexUrl),
    readStagingSitemaps(stagingIndexPath)
  ]);

  const { same, missingInStaging } = diffSets(prodUrls, stagingUrls);

  await writeFile(
    path.join(outputDir, 'url_parity.json'),
    JSON.stringify({ prodCount: prodUrls.length, stagingCount: stagingUrls.length, sameCount: same.length, missingCount: missingInStaging.length, missingInStaging }, null, 2)
  );

  const missingCsv = ['path'].concat(missingInStaging).join('\n');
  await writeFile(path.join(outputDir, 'missing_in_staging.csv'), missingCsv);

  console.log(`Prod URLs: ${prodUrls.length}`);
  console.log(`Staging URLs: ${stagingUrls.length}`);
  console.log(`Missing in staging: ${missingInStaging.length}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});


