#!/usr/bin/env node
// Remap posts that still lack a usable featuredImage by using Webflow manifest
// Targets posts where featuredImage is missing, placeholder, or file missing on disk

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
function tokensFromTitle(title) {
  return String(title)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length >= 4 && !['investipal','financial','advisor','advisors','wealth','management','guide','using','with','your','from'].includes(t));
}

const candidates = manifest.items
  .filter((it) => ['.png', '.jpg', '.jpeg', '.webp', '.avif'].includes((it.ext || '').toLowerCase()))
  .map((it) => ({ ...it, nfile: normalize(it.filename) }));

function scoreCandidate(slug, title, cand) {
  const nslug = normalize(slug);
  const slugTokens = nslug.split('-').filter(Boolean);
  const titleTokens = tokensFromTitle(title);
  let score = 0;
  // slug prefix boost
  if (cand.nfile.startsWith(`${nslug}__`) || cand.nfile.startsWith(`${nslug}.`)) score += 6;
  // token overlaps
  for (const t of slugTokens) if (cand.nfile.includes(t)) score += 1;
  for (const t of titleTokens) if (cand.nfile.includes(t)) score += 0.5;
  // penalties
  if (/p-\d+x\d+/i.test(cand.filename)) score -= 2; // tiny thumbnails
  if (/(logo|icon|favicon|slack|webflow)\./i.test(cand.filename)) score -= 3;
  if (/^untitled[-_]?design/i.test(cand.filename)) score -= 1;
  return score;
}

function frontmatterBounds(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return null;
  return { start: m.index, end: m[0].length, yaml: m[1], block: m[0] };
}
function getYamlValue(yaml, key) {
  const m = yaml.match(new RegExp(`^${key}\\s*:\\s*["']?([^"'\r\n]+)["']?\\s*$`, 'm'));
  return m ? m[1] : null;
}
function upsertYamlKey(yaml, key, value, eol) {
  const re = new RegExp(`^${key}\\s*:\\s*.*$`, 'm');
  const line = `${key}: "${value}"`;
  if (re.test(yaml)) return yaml.replace(re, line);
  return yaml.trimEnd() + eol + line + eol;
}
function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 400) {
        file.close(); fs.unlink(dest, () => {});
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(dest)));
    }).on('error', (e) => { file.close(); fs.unlink(dest, () => {}); reject(e); });
  });
}

async function run() {
  const usedFiles = new Set(fs.existsSync(outDir) ? fs.readdirSync(outDir) : []);
  let updated = 0;
  const posts = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));
  for (const f of posts) {
    const slug = f.replace(/\.md$/i, '');
    const mdPath = path.join(blogDir, f);
    const raw = fs.readFileSync(mdPath, 'utf8');
    const eol = raw.includes('\r\n') ? '\r\n' : '\n';
    const bounds = frontmatterBounds(raw);
    if (!bounds) continue;
    const before = raw.slice(0, bounds.start);
    const yaml = bounds.yaml;
    const after = raw.slice(bounds.start + bounds.block.length);
    const title = getYamlValue(yaml, 'title') || slug;
    const current = getYamlValue(yaml, 'featuredImage');
    let need = false;
    if (!current || current === '/images/blog/placeholder-image.png') need = true;
    else {
      const abs = path.join(publicDir, current.replace(/^\//, ''));
      if (!fs.existsSync(abs)) need = true;
    }
    if (!need) continue;

    // pick best candidate not already used for this slug file name
    const ranked = candidates
      .map((c) => ({ c, s: scoreCandidate(slug, title, c) }))
      .sort((a, b) => b.s - a.s);
    const pick = ranked.find((r) => r.s > 1);
    const targetName = `${slug}__hero${path.extname(pick?.c?.filename || '.png')}`.replace(/[^a-zA-Z0-9_.-]/g, '-');
    const dest = path.join(outDir, targetName);
    try {
      if (pick && pick.s > 1) {
        if (!fs.existsSync(dest)) await download(pick.c.url, dest);
      } else {
        // fallback to placeholder copy per slug to keep layout consistent
        const placeholder = path.join(publicDir, 'images', 'blog', 'placeholder-image.png');
        if (fs.existsSync(placeholder) && !fs.existsSync(dest)) {
          fs.copyFileSync(placeholder, dest);
        }
      }
      const rel = `/images/blog/${targetName}`;
      const newYaml = upsertYamlKey(yaml, 'featuredImage', rel, eol);
      const updatedRaw = before + '---' + eol + newYaml + '---' + eol + after;
      if (updatedRaw !== raw) {
        fs.writeFileSync(mdPath, updatedRaw, 'utf8');
        updated += 1;
      }
    } catch (e) {
      console.error('Remap error for', slug, e.message);
    }
  }
  console.log(JSON.stringify({ updated }, null, 2));
}

run();


