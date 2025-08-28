#!/usr/bin/env node
import process from 'node:process';

const API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const SITE_ID = process.env.WEBFLOW_SITE_ID; // optional to scope directly

if (!API_TOKEN) {
  console.error('WEBFLOW_API_TOKEN not set.');
  process.exit(1);
}

async function api(path) {
  const res = await fetch(`https://api.webflow.com/v2${path}`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` }
  });
  if (!res.ok) throw new Error(`${path} => ${res.status}`);
  return res.json();
}

function print(title, obj) {
  console.log(`\n=== ${title} ===`);
  console.log(JSON.stringify(obj, null, 2));
}

async function main() {
  const sites = await api('/sites');
  print('Sites', sites?.sites || sites);
  let siteId = SITE_ID;
  if (!siteId) {
    const first = (sites?.sites || sites)?.[0];
    if (!first) {
      console.error('No sites found for token.');
      process.exit(1);
    }
    siteId = first.id || first.siteId || first._id;
    console.log(`\nUsing site: ${first.name || first.displayName || siteId}`);
  }
  const cols = await api(`/sites/${siteId}/collections`);
  const collections = cols?.collections || cols;
  print('Collections', collections.map(c => ({ id: c.id || c.collectionId || c._id, displayName: c.displayName || c.name, slug: c.slug })));
  const blog = collections.find(c => /blog/i.test(c.displayName || c.name || '') || /blog/i.test(c.slug || ''));
  if (blog) {
    console.log(`\nDetected blog collection id: ${blog.id || blog.collectionId || blog._id}`);
  } else {
    console.log('\nNo obvious blog collection detected. Choose from the list above.');
  }
}

main().catch((e) => { console.error(e); process.exit(1); });


