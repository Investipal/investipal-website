#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');
const PODCAST_DIR = path.join(process.cwd(), 'src', 'content', 'podcasts');
const PUBLIC_BLOG_IMG_DIR = path.join(process.cwd(), 'public', 'images', 'blog');
const PUBLIC_POD_IMG_DIR = path.join(process.cwd(), 'public', 'images', 'podcasts');
const REPORT_PATH = path.join(process.cwd(), 'scripts', 'output', 'image-localization-report.json');

const isExternal = (url) => /^https?:\/\//i.test(url) && !url.startsWith('https://investipal.co') && !url.startsWith('http://investipal.co');

function ensureDirs() {
  fs.mkdirSync(PUBLIC_BLOG_IMG_DIR, { recursive: true });
  fs.mkdirSync(PUBLIC_POD_IMG_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
}

function listMarkdownFiles(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.toLowerCase().endsWith('.md'))
    .map((d) => path.join(dir, d.name));
}

function splitFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) return { fmBlock: null, fm: null, body: raw };
  const fmBlock = m[0];
  const fm = m[1];
  const body = raw.slice(m.index + fmBlock.length);
  return { fmBlock, fm, body };
}

function sanitizeFilename(s, slug) {
  const base = s.replace(/\?.*$/, '')
    .split('/')
    .filter(Boolean)
    .slice(-1)[0]
    .replace(/[^a-z0-9_.-]/gi, '_') || 'image.jpg';
  // Limit length to avoid Windows path issues
  const ext = (base.match(/\.[a-z0-9]+$/i) || ['.jpg'])[0];
  const name = base.replace(/\.[a-z0-9]+$/i, '');
  const shortSlug = (slug || 'post').slice(0, 40).replace(/[^a-z0-9_-]/gi, '_');
  const shortName = name.slice(0, 50).replace(/_+/g, '_');
  return `${shortSlug}__${shortName}${ext}`;
}

async function downloadTo(url, destFile) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(destFile, buf);
}

async function processFile(file, collection) {
  const raw = fs.readFileSync(file, 'utf8');
  const { fmBlock, fm, body } = splitFrontmatter(raw);
  if (!fmBlock || !fm) return { changed: false };

  let changed = false;
  const slug = path.basename(file, '.md');
  let newFm = fm;
  let newBody = body;
  const downloads = [];

  // Featured image
  const fmImgKey = collection === 'podcasts' ? 'coverImage' : 'featuredImage';
  const featMatch = fm.match(new RegExp(`^${fmImgKey}:\\s*\"?([^\"\\n]+)\"?`, 'm'));
  if (featMatch && isExternal(featMatch[1])) {
    const url = featMatch[1];
    const fname = sanitizeFilename(url, slug);
    const localPath = path.join(collection === 'podcasts' ? PUBLIC_POD_IMG_DIR : PUBLIC_BLOG_IMG_DIR, fname);
    fs.mkdirSync(path.dirname(localPath), { recursive: true });
    const publicUrl = collection === 'podcasts' ? `/images/podcasts/${fname}` : `/images/blog/${fname}`;
    downloads.push({ url, dest: localPath });
    const replaceRe = new RegExp(`^${fmImgKey}:\\s*.*$`, 'm');
    newFm = newFm.replace(replaceRe, `${fmImgKey}: "${publicUrl}"`);
    changed = true;
  }

  // Inline <img src="...">
  newBody = newBody.replace(/<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi, (m, src) => {
    if (!isExternal(src)) return m;
    const fname = sanitizeFilename(src, slug);
    const localPath = path.join(collection === 'podcasts' ? PUBLIC_POD_IMG_DIR : PUBLIC_BLOG_IMG_DIR, fname);
    fs.mkdirSync(path.dirname(localPath), { recursive: true });
    const publicUrl = collection === 'podcasts' ? `/images/podcasts/${fname}` : `/images/blog/${fname}`;
    downloads.push({ url: src, dest: localPath });
    changed = true;
    return m.replace(src, publicUrl);
  });

  // Perform downloads (unique list)
  const seen = new Set();
  for (const d of downloads) {
    const key = `${d.url}=>${d.dest}`;
    if (seen.has(key)) continue;
    seen.add(key);
    try {
      if (!fs.existsSync(d.dest)) {
        await downloadTo(d.url, d.dest);
      }
    } catch (e) {
      console.warn(`Failed to download ${d.url}: ${e.message}`);
    }
  }

  if (changed) {
    const rebuilt = `${fmBlock.replace(fm, newFm)}${newBody}`;
    fs.writeFileSync(file, rebuilt, 'utf8');
  }

  return { changed, downloads: downloads.length };
}

async function main() {
  ensureDirs();
  const blogFiles = listMarkdownFiles(BLOG_DIR);
  const podFiles = fs.existsSync(PODCAST_DIR) ? listMarkdownFiles(PODCAST_DIR) : [];
  const report = { processed: 0, changed: 0, downloads: 0, files: [] };
  for (const f of blogFiles) {
    const res = await processFile(f, 'blog');
    report.processed += 1;
    if (res.changed) report.changed += 1;
    report.downloads += res.downloads || 0;
    report.files.push({ file: path.basename(f), collection: 'blog', changed: res.changed, downloads: res.downloads });
  }
  for (const f of podFiles) {
    const res = await processFile(f, 'podcasts');
    report.processed += 1;
    if (res.changed) report.changed += 1;
    report.downloads += res.downloads || 0;
    report.files.push({ file: path.basename(f), collection: 'podcasts', changed: res.changed, downloads: res.downloads });
  }
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf8');
  console.log(`Image localization complete. Processed ${report.processed}; changed ${report.changed}; downloads ${report.downloads}.`);
  console.log(`Report at ${REPORT_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


