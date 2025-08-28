#!/usr/bin/env node
// Detect images reused across many posts and replace with unique alternatives from Webflow manifest

import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const root = process.cwd();
const blogDir = path.join(root, 'src', 'content', 'blog');
const publicDir = path.join(root, 'public');
const outDir = path.join(publicDir, 'images', 'blog');
const manifestPath = path.join(root, 'scripts', 'webflow-image-manifest.json');

if (!fs.existsSync(manifestPath)) {
  console.error('Manifest not found. Run parse-webflow-curl.mjs first.');
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

function normalize(s) {
  return String(s).toLowerCase().replace(/%20|\s+/g, '-').replace(/[^a-z0-9-]/g, '-');
}

const candidates = manifest.items
  .filter((it) => ['.png', '.jpg', '.jpeg', '.webp', '.avif'].includes((it.ext || '').toLowerCase()))
  .filter((it) => !/(logo|icon|favicon|webflow)\./i.test(it.filename))
  .map((it) => ({ ...it, nfile: normalize(it.filename) }));

function tokensFromTitle(title) {
  return String(title)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length >= 4 && !['investipal','financial','advisor','advisors','wealth','management','guide','using','with','your','from','best','how','tools'].includes(t));
}

function score(slug, title, cand) {
  const nslug = normalize(slug);
  let s = 0;
  if (cand.nfile.startsWith(`${nslug}__`) || cand.nfile.startsWith(`${nslug}.`)) s += 6;
  const slugTokens = nslug.split('-').filter(Boolean);
  for (const t of slugTokens) if (cand.nfile.includes(t)) s += 1;
  for (const t of tokensFromTitle(title)) if (cand.nfile.includes(t)) s += 0.5;
  if (/p-\d+x\d+/i.test(cand.filename)) s -= 2;
  if (/(patrick|min[_-]?vol|preview[-_]?portfolio)/i.test(cand.filename)) s -= 5;
  return s;
}

function fmBounds(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return null;
  return { start: m.index, block: m[0], yaml: m[1] };
}
function getYaml(yaml, key) {
  const m = yaml.match(new RegExp(`^${key}\\s*:\\s*["']?([^"'\r\n]+)["']?\\s*$`, 'm'));
  return m ? m[1] : null;
}
function setYaml(yaml, key, value) {
  const re = new RegExp(`^${key}\\s*:\\s*.*$`, 'm');
  const line = `${key}: "${value}"`;
  return re.test(yaml) ? yaml.replace(re, line) : `${yaml}\n${line}\n`;
}
function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 400) { file.close(); fs.unlink(dest, () => {}); return reject(new Error(`HTTP ${res.statusCode}`)); }
      res.pipe(file); file.on('finish', () => file.close(() => resolve(dest)));
    }).on('error', (e) => { file.close(); fs.unlink(dest, () => {}); reject(e); });
  });
}

async function run() {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));
  const usage = new Map();
  const posts = [];
  for (const f of files) {
    const slug = f.replace(/\.md$/i, '');
    const raw = fs.readFileSync(path.join(blogDir, f), 'utf8');
    const bounds = fmBounds(raw); if (!bounds) continue;
    const featured = getYaml(bounds.yaml, 'featuredImage');
    const title = getYaml(bounds.yaml, 'title') || slug;
    posts.push({ slug, raw, bounds, title, file: f, featured });
    if (featured) usage.set(featured, (usage.get(featured) || 0) + 1);
  }

  const overused = Array.from(usage.entries()).filter(([img, count]) => count > 1 && /images\/blog\//.test(img));
  if (!overused.length) { console.log(JSON.stringify({ updated: 0, message: 'no duplicates' })); return; }

  let updated = 0;
  for (const [img] of overused) {
    const conflict = posts.filter((p) => p.featured === img);
    // keep image for the first, remap the rest
    for (let i = 1; i < conflict.length; i++) {
      const p = conflict[i];
      const ranked = candidates.map((c) => ({ c, s: score(p.slug, p.title, c) })).sort((a,b)=>b.s-a.s);
      const pick = ranked.find((r) => r.s > 1 && !r.c.filename.includes('patrick')) || ranked[0];
      const ext = path.extname(pick?.c?.filename || '.jpg');
      const local = `${p.slug}__hero${ext}`.replace(/[^a-zA-Z0-9_.-]/g, '-');
      const dest = path.join(outDir, local);
      if (pick?.c?.url && !fs.existsSync(dest)) {
        try { await download(pick.c.url, dest); } catch {}
      }
      const rel = `/images/blog/${local}`;
      const eol = p.raw.includes('\r\n') ? '\r\n' : '\n';
      const newYaml = setYaml(p.bounds.yaml, 'featuredImage', rel);
      const updatedRaw = p.raw.replace(p.bounds.block, `---${eol}${newYaml}---${eol}`);
      fs.writeFileSync(path.join(blogDir, p.file), updatedRaw, 'utf8');
      updated += 1;
    }
  }
  console.log(JSON.stringify({ updated }, null, 2));
}

run();


