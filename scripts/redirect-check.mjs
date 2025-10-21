#!/usr/bin/env node
// Redirect Checker: Validate that each old URL 301s to the intended new URL.
// Input CSV format: old_url,new_url

import { readFile } from 'fs/promises';

function getArg(flag, def) {
  const idx = process.argv.indexOf(flag);
  return idx !== -1 ? process.argv[idx + 1] : def;
}

const mapFile = getArg('--map', 'redirect_map.csv');

async function fetchHead(url, redirects = 'follow') {
  const res = await fetch(url, { method: 'GET', redirect: redirects });
  return { url: res.url, status: res.status, redirected: res.redirected };
}

async function main() {
  const txt = await readFile(mapFile, 'utf-8');
  const lines = txt.split(/\r?\n/).filter(Boolean).slice(1);
  let failures = 0;
  for (const line of lines) {
    const [oldUrl, newUrl] = line.split(',');
    if (!oldUrl || !newUrl) continue;
    try {
      const res = await fetch(oldUrl, { method: 'GET', redirect: 'manual' });
      const location = res.headers.get('location');
      const ok = (res.status === 301 || res.status === 308) && location;
      const final = location ? new URL(location, oldUrl).toString() : '';
      const normalizedNew = newUrl.replace(/\/$/, '');
      const normalizedFinal = final.replace(/\/$/, '');
      if (!ok || normalizedNew !== normalizedFinal) {
        failures++;
        console.log(`FAIL	${res.status}	${oldUrl}	->	${location}	(Expected: ${newUrl})`);
      } else {
        console.log(`OK	${res.status}	${oldUrl}	->	${final}`);
      }
    } catch (e) {
      failures++;
      console.log(`ERR	${oldUrl}	${e.message}`);
    }
  }
  if (failures > 0) process.exit(1);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});


