#!/usr/bin/env node
import process from 'node:process';

const API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const COLLECTION_ID = process.env.WEBFLOW_PODCAST_COLLECTION_ID || process.argv[2];

if (!API_TOKEN || !COLLECTION_ID) {
  console.error('Usage: WEBFLOW_API_TOKEN=... node scripts/dump-webflow-collection.mjs <collectionId>');
  process.exit(1);
}

async function fetchAll() {
  const out = [];
  let offset = 0; const limit = 50;
  while (true) {
    const url = `https://api.webflow.com/v2/collections/${COLLECTION_ID}/items?offset=${offset}&limit=${limit}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${API_TOKEN}` } });
    if (!res.ok) throw new Error(`${res.status} fetching items`);
    const data = await res.json();
    const items = data?.items || data?.data || [];
    out.push(...items);
    if (items.length < limit) break;
    offset += limit;
  }
  return out;
}

(async () => {
  const items = await fetchAll();
  const sample = items.slice(0, 5).map((it) => ({
    id: it.id,
    isDraft: it.isDraft,
    isArchived: it.isArchived,
    keys: Object.keys(it.fieldData || {}),
    fieldData: it.fieldData,
  }));
  console.log(JSON.stringify({ count: items.length, sample }, null, 2));
})();



