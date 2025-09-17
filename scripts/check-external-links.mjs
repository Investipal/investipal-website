#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');
const REPORT_PATH = path.join(process.cwd(), 'scripts', 'output', 'external-link-check.json');

function listMarkdownFiles(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.toLowerCase().endsWith('.md'))
    .map((d) => path.join(dir, d.name));
}

function extractExternalLinks(html) {
  const links = [];
  const re = /<a[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    links.push(m[1]);
  }
  return links.filter((u) => !/investipal\.co/i.test(u));
}

async function checkUrl(url) {
  const headers = { 'User-Agent': 'Mozilla/5.0 (compatible; InvestipalBot/1.0; +https://investipal.co/robots.txt)' };
  try {
    let res = await fetch(url, { method: 'HEAD', redirect: 'follow', headers });
    if (res.ok) return { ok: true, status: res.status, method: 'HEAD' };
    // Fallback to GET for servers that block HEAD or need UA
    // Some providers return 404/429 to HEAD even when GET is 200
    if (!res.ok && [403, 404, 405, 429, 500, 502, 503, 504].includes(res.status)) {
      try {
        res = await fetch(url, { method: 'GET', redirect: 'follow', headers });
        return { ok: res.ok, status: res.status, method: 'GET' };
      } catch (e2) {
        return { ok: false, status: 0, error: e2.message, method: 'GET' };
      }
    }
    return { ok: false, status: res.status, method: 'HEAD' };
  } catch (e) {
    // Try GET on network error
    try {
      const res = await fetch(url, { method: 'GET', redirect: 'follow', headers });
      return { ok: res.ok, status: res.status, method: 'GET', error: e.message };
    } catch (e2) {
      return { ok: false, status: 0, error: e2.message, method: 'GET' };
    }
  }
}

async function main() {
  const files = listMarkdownFiles(BLOG_DIR);
  const report = { scanned: 0, links: 0, failures: [], byStatus: {} };

  for (const f of files) {
    const raw = fs.readFileSync(f, 'utf8');
    const body = raw.replace(/^---[\s\S]*?---\r?\n/, '');
    const links = extractExternalLinks(body);
    report.scanned += 1;
    report.links += links.length;

    for (const u of links) {
      const r = await checkUrl(u);
      if (!r.ok) {
        report.failures.push({ file: path.basename(f), url: u, status: r.status, method: r.method, error: r.error });
        const key = String(r.status);
        report.byStatus[key] = (report.byStatus[key] || 0) + 1;
      }
    }
  }

  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf8');
  console.log(`External link check complete. Files: ${report.scanned}; Links: ${report.links}; Failures: ${report.failures.length}`);
  console.log(`Report at ${REPORT_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


