import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.resolve(__dirname, '..', 'src', 'content', 'blog');
const REPORT_PATH = path.resolve(__dirname, '..', 'reports', 'semantic-link-audit.json');

const SELF_HOSTS = new Set(['investipal.co', 'www.investipal.co', 'localhost:4324', 'localhost:4321']);

const INTENT_RULES = [
  { id: 'demo', patterns: [/book\s+a\s+demo/i, /schedule\s+(a\s+)?demo/i, /get\s+(a\s+)?demo/i, /demo\b/i], target: '/book-a-demo' },
  { id: 'contact', patterns: [/contact\s+us/i, /^contact$/i, /get\s+in\s+touch/i, /reach\s+out/i], target: '/contact-us' },
  { id: 'risk', patterns: [/risk\s+assessment/i, /risk\s+profile/i, /risk\s+tolerance/i], target: '/risk-assessment' },
  { id: 'integrations', patterns: [/integrations?/i, /connect\s+with/i], target: '/integrations' },
  { id: 'webinars', patterns: [/webinars?/i, /watch\s+.*webinar/i], target: '/webinars' },
  { id: 'blog', patterns: [/our\s+blog/i, /^blog$/i], target: '/blog' },
];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.isFile() && full.endsWith('.md')) files.push(full);
  }
  return files;
}

function classifyIntent(text) {
  const normalized = (text || '').toLowerCase().trim();
  for (const rule of INTENT_RULES) {
    if (rule.patterns.some((re) => re.test(normalized))) return rule;
  }
  return null;
}

function parseLinks(markdown) {
  const links = [];
  // Markdown links: [text](url)
  const mdRe = /\[([^\]]+)\]\(([^\)\s]+)\)/g;
  let m;
  while ((m = mdRe.exec(markdown)) !== null) {
    links.push({ text: m[1], url: m[2], index: m.index, type: 'markdown' });
  }
  // HTML anchors: <a href="...">text</a> (allow unquoted too)
  const htmlRe = /<a\s+[^>]*href\s*=\s*(["']?)([^"'\s>]+)\1[^>]*>([\s\S]*?)<\/a>/gi;
  let h;
  while ((h = htmlRe.exec(markdown)) !== null) {
    links.push({ text: h[3].replace(/<[^>]+>/g, '').trim(), url: h[2], index: h.index, type: 'html' });
  }
  return links;
}

function isSelfUrl(href) {
  try {
    const u = new URL(href, 'https://investipal.co');
    return SELF_HOSTS.has(u.host);
  } catch {
    return href.startsWith('/') || href.startsWith('#');
  }
}

function normalizePath(href) {
  try {
    const u = new URL(href, 'https://investipal.co');
    return u.pathname.replace(/\/index\.html$/, '') || '/';
  } catch {
    return href;
  }
}

function run() {
  const files = walk(BLOG_DIR);
  const results = [];
  let totalLinks = 0;
  let misrouted = 0;
  let demoMisroutes = 0;

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const links = parseLinks(content);
    totalLinks += links.length;

    for (const link of links) {
      const intent = classifyIntent(link.text);
      if (!intent) continue;

      if (isSelfUrl(link.url)) {
        const currentPath = normalizePath(link.url);
        const expectedPath = intent.target;
        const isHomepage = currentPath === '/' || currentPath === '';
        const mismatch = currentPath !== expectedPath;
        if (isHomepage || mismatch) {
          misrouted++;
          if (intent.id === 'demo') demoMisroutes++;
          const snippet = content.substring(Math.max(0, link.index - 80), Math.min(content.length, link.index + 120));
          results.push({
            file: path.relative(path.resolve(__dirname, '..'), file),
            anchorText: link.text,
            url: link.url,
            intent: intent.id,
            expected: expectedPath,
            currentPath,
            reason: isHomepage ? 'points-to-homepage' : 'wrong-internal-path',
            snippet,
          });
        }
      }
    }
  }

  const summary = {
    scannedFiles: files.length,
    totalLinks,
    misrouted,
    demoMisroutes,
    byIntent: INTENT_RULES.reduce((acc, r) => {
      acc[r.id] = results.filter(x => x.intent === r.id).length;
      return acc;
    }, {}),
  };

  const report = { summary, results };
  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
  console.log(`Semantic link audit complete. Misrouted: ${misrouted} (demo: ${demoMisroutes}). Report: ${REPORT_PATH}`);
}

run();




























