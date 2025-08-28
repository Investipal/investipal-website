#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');
const REPORT_PATH = path.join(process.cwd(), 'scripts', 'output', 'excerpt-audit.json');

function listMarkdownFiles(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.toLowerCase().endsWith('.md'))
    .map((d) => path.join(dir, d.name));
}

function splitFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) return { fm: null, body: raw, fmBlock: null };
  const fmBlock = m[0];
  const body = raw.slice(m.index + fmBlock.length);
  return { fm: m[1], body, fmBlock };
}

function parseFrontmatterYaml(yaml) {
  const obj = {};
  for (const line of yaml.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!m) continue;
    const key = m[1];
    let val = m[2].trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    obj[key] = val;
  }
  return obj;
}

function buildFrontmatterYaml(obj) {
  const lines = [];
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue;
    const val = typeof v === 'string' ? v.replace(/"/g, '\\"') : v;
    lines.push(`${k}: "${val}"`);
  }
  return lines.join('\n') + '\n';
}

function firstParagraphText(html) {
  const m = html.match(/<p[\s\S]*?>([\s\S]*?)<\/p>/i);
  if (!m) return '';
  const strip = m[1]
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return strip;
}

function cleanAndSentenceClamp(text, minLen = 80, maxLen = 220) {
  if (!text) return '';
  let t = text
    .replace(/\s+/g, ' ')
    .replace(/[\u2013\u2014]/g, '-')
    .trim();

  // Prefer full sentence up to maxLen
  const sentenceEnd = /([.!?])\s+/g;
  let best = '';
  let lastIdx = 0;
  let match;
  while ((match = sentenceEnd.exec(t)) !== null) {
    const candidate = t.slice(0, match.index + 1);
    if (candidate.length >= minLen && candidate.length <= maxLen) {
      best = candidate;
      break;
    }
    lastIdx = match.index + 1;
  }
  if (!best) {
    // Fallback: clamp to maxLen at a word boundary
    let clipped = t.slice(0, maxLen);
    clipped = clipped.replace(/\s+[^\s]*$/, '');
    if (!/[.!?]$/.test(clipped)) clipped += '.';
    best = clipped;
  }
  return best;
}

function needsFix(excerpt) {
  if (!excerpt) return true;
  const tooShort = excerpt.length < 40;
  const endsClean = /[.!?]$/.test(excerpt.trim());
  const hasDanglingDashOrWord = /[-\u2014\u2013]\s*$/.test(excerpt) || /\b\w$/.test(excerpt);
  return tooShort || (!endsClean && hasDanglingDashOrWord);
}

function main() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.error('Blog directory not found:', BLOG_DIR);
    process.exit(1);
  }
  const files = listMarkdownFiles(BLOG_DIR);
  const report = { processed: 0, updated: 0, issues: [] };

  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf8');
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    if (!m) { report.processed += 1; continue; }
    const fmBlock = m[0];
    const fm = m[1];
    const body = raw.slice(m.index + fmBlock.length);
    const firstPara = cleanAndSentenceClamp(firstParagraphText(body), 100, 220);
    if (!firstPara) { report.processed += 1; continue; }
    const excerptLineRe = /^excerpt:\s*.*$/m;
    const currentExcerptMatch = fm.match(/^excerpt:\s*(.*)$/m);
    const currentExcerpt = currentExcerptMatch ? currentExcerptMatch[1].trim().replace(/^"|"$/g, '') : '';
    // Update if missing or clearly truncated or different
    if (!currentExcerpt || needsFix(currentExcerpt) || currentExcerpt !== firstPara) {
      const safeExcerpt = firstPara.replace(/"/g, '\\"');
      let newFm = fm;
      if (excerptLineRe.test(fm)) {
        newFm = fm.replace(excerptLineRe, `excerpt: "${safeExcerpt}"`);
      } else {
        // Insert after title if present, else at top
        const titleLineRe = /^title:\s*.*$/m;
        if (titleLineRe.test(fm)) {
          newFm = fm.replace(titleLineRe, (line) => `${line}\nexcerpt: "${safeExcerpt}"`);
        } else {
          newFm = `excerpt: "${safeExcerpt}"\n` + fm;
        }
      }
      const rebuilt = `---\n${newFm}\n---\n${body}`;
      fs.writeFileSync(file, rebuilt, 'utf8');
      report.updated += 1;
      report.issues.push({ file: path.basename(file), old: currentExcerpt, fixed: firstPara });
    }
    report.processed += 1;
  }

  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf8');
  console.log(`Excerpt audit complete. Processed ${report.processed}; updated ${report.updated}.`);
  console.log(`Report at ${REPORT_PATH}`);
}

main();



