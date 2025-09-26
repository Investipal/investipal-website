#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const PODCAST_COLLECTION_ID = process.env.WEBFLOW_PODCAST_COLLECTION_ID; // set this to the Podcasts collection id
const PODCAST_DIR = path.join(process.cwd(), 'src', 'content', 'podcasts');

function requireEnv() {
  if (!API_TOKEN || !PODCAST_COLLECTION_ID) {
    console.log('WEBFLOW_API_TOKEN or WEBFLOW_PODCAST_COLLECTION_ID not set. Skipping podcast fetch.');
    process.exit(0);
  }
}

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function toDateString(val) {
  try { const d = new Date(val); if (!isNaN(d.getTime())) return d.toISOString(); } catch {}
  return new Date().toISOString();
}

function sentenceClamp(txt, max = 200) {
  const t = (txt || '').replace(/\s+/g, ' ').trim();
  if (!t) return '';
  const re = /([.!?])\s+/g; let m; let best = '';
  while ((m = re.exec(t))) { const s = t.slice(0, m.index + 1); if (s.length <= max) { best = s; break; } }
  if (!best) { let c = t.slice(0, max).replace(/\s+[^\s]*$/, ''); if (!/[.!?]$/.test(c)) c += '.'; best = c; }
  return best;
}

function toYamlValue(val) { if (val == null) return '""'; return `"${String(val).replace(/"/g, '\\"')}"`; }

function buildFrontmatter(data) {
  const lines = [
    `title: ${toYamlValue(data.title)}`,
    `excerpt: ${toYamlValue(data.excerpt)}`,
    `publishedDate: ${toYamlValue(data.publishedDate)}`,
    data.duration ? `duration: ${toYamlValue(data.duration)}` : '',
    data.audioUrl ? `audioUrl: ${toYamlValue(data.audioUrl)}` : '',
    data.youtubeUrl ? `youtubeUrl: ${toYamlValue(data.youtubeUrl)}` : '',
    data.spotifyUrl ? `spotifyUrl: ${toYamlValue(data.spotifyUrl)}` : '',
    data.coverImage ? `coverImage: ${toYamlValue(data.coverImage)}` : '',
    data.coverImageAlt ? `coverImageAlt: ${toYamlValue(data.coverImageAlt)}` : '',
    `draft: false`,
  ].filter(Boolean);
  return `---\n${lines.join('\n')}\n---\n`;
}

function extractField(fd, names) {
  for (const n of names) {
    const v = fd[n];
    if (v) return v.url || v;
  }
  return '';
}

async function fetchAll() {
  const items = [];
  let offset = 0; const limit = 100;
  while (true) {
    const url = `https://api.webflow.com/v2/collections/${PODCAST_COLLECTION_ID}/items?offset=${offset}&limit=${limit}`;
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

async function main() {
  requireEnv();
  ensureDir(PODCAST_DIR);
  const items = await fetchAll();
  const report = { fetched: items.length, written: 0, skippedExisting: 0 };

  for (const item of items) {
    if (item.isDraft || item.isArchived) continue;
    const fd = item.fieldData || {};
    const title = fd.title || fd.name || 'Untitled Episode';
    const slug = slugify(fd.slug || title);
    const outfile = path.join(PODCAST_DIR, `${slug}.md`);
    if (fs.existsSync(outfile)) { report.skippedExisting += 1; continue; }

    const description = fd.details || fd.description || fd.summary || fd.excerpt || '';
    const excerpt = sentenceClamp(description, 200);
    const published = toDateString(item.lastPublished || item.updatedOn || item.createdOn || Date.now());
    const audioUrl = extractField(fd, ['audio', 'audio-url', 'audioUrl']);
    const youtubeUrl = extractField(fd, ['youtube-embed-link', 'youtube', 'youtube-url', 'youtubeUrl', 'youtubeEmbed']);
    const spotifyUrl = extractField(fd, ['spotify-podcast-link', 'spotify', 'spotify-url', 'spotifyUrl', 'spotifyEmbed']);
    const cover = extractField(fd, ['thumb-image', 'cover-image', 'cover', 'image']);

    const fm = buildFrontmatter({
      title, excerpt, publishedDate: published, duration: fd.duration || fd.length || '',
      audioUrl, youtubeUrl, spotifyUrl, coverImage: cover, coverImageAlt: title,
    });
    const body = description ? `<p>${description}</p>` : '';
    fs.writeFileSync(outfile, fm + body, 'utf8');
    report.written += 1;
  }

  console.log(`Podcast migration complete. Fetched: ${report.fetched}, written: ${report.written}, skippedExisting: ${report.skippedExisting}`);
}

main().catch((e) => { console.error(e); process.exit(1); });


