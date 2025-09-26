#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const COLLECTION_ID = process.env.WEBFLOW_PODCAST_COLLECTION_ID;
const PODCAST_DIR = path.join(process.cwd(), 'src', 'content', 'podcasts');

if (!API_TOKEN || !COLLECTION_ID) {
  console.log('WEBFLOW_API_TOKEN or WEBFLOW_PODCAST_COLLECTION_ID not set. Skipping backfill.');
  process.exit(0);
}

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function sentenceClamp(txt, max = 200) {
  const t = (txt || '').replace(/\s+/g, ' ').trim();
  if (!t) return '';
  const re = /([.!?])\s+/g; let m; let best = '';
  while ((m = re.exec(t))) { const s = t.slice(0, m.index + 1); if (s.length <= max) { best = s; break; } }
  if (!best) { let c = t.slice(0, max).replace(/\s+[^\s]*$/, ''); if (!/[.!?]$/.test(c)) c += '.'; best = c; }
  return best;
}

function splitFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) return { fm: '', body: raw, hasFm: false };
  return { fm: m[1], body: raw.slice(m.index + m[0].length), hasFm: true, fmBlock: m[0] };
}

function getFmValue(fm, key) {
  const r = new RegExp(`^${key}:\\s*"?([^"\n]+)"?`, 'm');
  const m = fm.match(r);
  return m ? m[1] : '';
}

function setFmValue(fm, key, value) {
  const line = `${key}: "${String(value).replace(/"/g, '\\"')}"`;
  const r = new RegExp(`^${key}:\\s*.*$`, 'm');
  if (r.test(fm)) return fm.replace(r, line);
  return fm + (fm.endsWith('\n') ? '' : '\n') + line + '\n';
}

function buildFile(fm, body) {
  return `---\n${fm.trim()}\n---\n${body}`;
}

async function fetchAll() {
  const items = [];
  let offset = 0; const limit = 100;
  while (true) {
    const url = `https://api.webflow.com/v2/collections/${COLLECTION_ID}/items?offset=${offset}&limit=${limit}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${API_TOKEN}` } });
    if (!res.ok) throw new Error(`Webflow ${res.status}`);
    const data = await res.json();
    const arr = data?.items || data?.data || [];
    items.push(...arr);
    if (arr.length < limit) break;
    offset += limit;
  }
  return items;
}

function extractField(fd, names) {
  for (const n of names) {
    const v = fd[n];
    if (v) return v.url || v;
  }
  return '';
}

function normalizeDescription(desc) {
  if (!desc) return '';
  // If looks like HTML, keep; otherwise wrap in <p>
  if (/<\w+[^>]*>/.test(desc)) return desc;
  return `<p>${desc}</p>`;
}

async function main() {
  const items = await fetchAll();
  const report = { processed: 0, updated: 0, skipped: 0 };

  for (const item of items) {
    if (item.isDraft || item.isArchived) continue;
    const fd = item.fieldData || {};
    const title = fd.title || fd.name || '';
    const slug = slugify(fd.slug || title);
    const file = path.join(PODCAST_DIR, `${slug}.md`);
    if (!fs.existsSync(file)) { report.skipped += 1; continue; }

    const raw = fs.readFileSync(file, 'utf8');
    const { fm: origFm, body: origBody, hasFm, fmBlock } = splitFrontmatter(raw);
    let fm = origFm;
    let body = origBody;
    let changed = false;

    const description = fd.details || fd.description || fd.summary || fd.excerpt || '';
    const excerpt = sentenceClamp(description, 200);
    const youtubeUrl = extractField(fd, ['youtube-embed-link', 'youtube', 'youtube-url', 'youtubeUrl', 'youtubeEmbed']);
    const spotifyUrl = extractField(fd, ['spotify-podcast-link', 'spotify', 'spotify-url', 'spotifyUrl', 'spotifyEmbed']);
    const cover = extractField(fd, ['thumb-image', 'cover-image', 'cover', 'image']);
    const duration = fd.duration || fd.length || '';
    // Guest fields in Webflow (best-effort names)
    const guestName = fd['guest-name'] || fd['guest'] || fd['speaker'] || '';
    const guestTitle = fd['guest-title'] || fd['title-role'] || '';
    const guestCompany = fd['guest-company'] || fd['company'] || '';
    const guestBio = fd['guest-bio'] || fd['bio'] || '';
    const guestLinkedIn = fd['guest-linkedin'] || fd['linkedin'] || '';
    const guestTwitter = fd['guest-twitter'] || '';
    const guestWebsite = fd['guest-website'] || '';

    if (!getFmValue(fm, 'excerpt') && excerpt) { fm = setFmValue(fm, 'excerpt', excerpt); changed = true; }
    if (!getFmValue(fm, 'youtubeUrl') && youtubeUrl) { fm = setFmValue(fm, 'youtubeUrl', youtubeUrl); changed = true; }
    if (!getFmValue(fm, 'spotifyUrl') && spotifyUrl) { fm = setFmValue(fm, 'spotifyUrl', spotifyUrl); changed = true; }
    if (!getFmValue(fm, 'coverImage') && cover) { fm = setFmValue(fm, 'coverImage', cover); changed = true; }
    if (!getFmValue(fm, 'coverImageAlt') && title) { fm = setFmValue(fm, 'coverImageAlt', title); changed = true; }
    if (!getFmValue(fm, 'duration') && duration) { fm = setFmValue(fm, 'duration', duration); changed = true; }
    if (!getFmValue(fm, 'guestName') && guestName) { fm = setFmValue(fm, 'guestName', guestName); changed = true; }
    if (!getFmValue(fm, 'guestTitle') && guestTitle) { fm = setFmValue(fm, 'guestTitle', guestTitle); changed = true; }
    if (!getFmValue(fm, 'guestCompany') && guestCompany) { fm = setFmValue(fm, 'guestCompany', guestCompany); changed = true; }
    if (!getFmValue(fm, 'guestBio') && guestBio) { fm = setFmValue(fm, 'guestBio', guestBio); changed = true; }
    if (!getFmValue(fm, 'guestLinkedIn') && guestLinkedIn) { fm = setFmValue(fm, 'guestLinkedIn', guestLinkedIn); changed = true; }
    if (!getFmValue(fm, 'guestTwitter') && guestTwitter) { fm = setFmValue(fm, 'guestTwitter', guestTwitter); changed = true; }
    if (!getFmValue(fm, 'guestWebsite') && guestWebsite) { fm = setFmValue(fm, 'guestWebsite', guestWebsite); changed = true; }

    if (!body || body.trim().length === 0) {
      const html = normalizeDescription(description);
      if (html) { body = html + (html.endsWith('\n') ? '' : '\n'); changed = true; }
    }

    if (changed) {
      const rebuilt = buildFile(fm, body);
      fs.writeFileSync(file, rebuilt, 'utf8');
      report.updated += 1;
    } else {
      report.processed += 1;
    }
  }

  console.log(`Podcast backfill complete. Updated: ${report.updated}, processed(no change): ${report.processed}, skipped(not found): ${report.skipped}`);
}

main().catch((e) => { console.error(e); process.exit(1); });


