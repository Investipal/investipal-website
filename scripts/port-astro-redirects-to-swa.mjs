#!/usr/bin/env node
// Port redirects from astro.config.mjs to Azure SWA staticwebapp.config.json

import { readFile, writeFile } from 'fs/promises';

const ASTRO_CONFIG = 'astro.config.mjs';
const SWA_CONFIG = 'staticwebapp.config.json';

function extractRedirectPairs(source) {
  // Look for a `redirects: { ... }` block and grab "from": "to" pairs
  const redirectsBlockMatch = source.match(/redirects\s*:\s*\{([\s\S]*?)\}\s*,?\s*[\r\n]/);
  if (!redirectsBlockMatch) return [];
  const block = redirectsBlockMatch[1];
  const pairRegex = /['\"](\/[^"]*?)['\"]\s*:\s*['\"](\/[^"]*?)['\"]/g;
  const pairs = [];
  let m;
  while ((m = pairRegex.exec(block))) {
    const from = m[1];
    const to = m[2];
    pairs.push([from, to]);
  }
  return pairs;
}

function ensureRoute(route) {
  return route.startsWith('/') ? route : `/${route}`;
}

async function main() {
  const [astroText, swaJsonText] = await Promise.all([
    readFile(ASTRO_CONFIG, 'utf-8'),
    readFile(SWA_CONFIG, 'utf-8')
  ]);

  const pairs = extractRedirectPairs(astroText);
  if (!pairs.length) {
    console.log('No redirects found in astro.config.mjs');
    return;
  }

  const swa = JSON.parse(swaJsonText);
  swa.routes = swa.routes || [];

  const existingByRoute = new Map(swa.routes.map(r => [r.route, r]));
  let added = 0;

  for (const [from, to] of pairs) {
    const route = ensureRoute(from.replace(/\/$/, ''));
    const redirect = ensureRoute(to.replace(/\/$/, ''));
    // Skip if route already present (avoid duplicates)
    if (existingByRoute.has(route)) continue;
    swa.routes.push({ route, redirect, statusCode: 301 });
    existingByRoute.set(route, true);
    added++;
  }

  await writeFile(SWA_CONFIG, JSON.stringify(swa, null, 2));
  console.log(`Added ${added} redirect routes to ${SWA_CONFIG}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});


