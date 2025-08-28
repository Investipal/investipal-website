#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const PODCAST_DIR = path.join(process.cwd(), 'src', 'content', 'podcasts');

const RULES = [
  { topic: 'AI', patterns: [/\bAI\b/i, /artificial intelligence/i, /agentic/i, /LLM/i] },
  { topic: 'Wealthtech', patterns: [/wealthtech/i, /advisor tech/i, /technology/i, /platform/i] },
  { topic: 'Compliance', patterns: [/compliance/i, /SEC/i, /regulation/i, /regulatory/i, /audit/i] },
  { topic: 'Operations', patterns: [/operations/i, /scal(ing|e)/i, /workflow/i, /automation/i] },
  { topic: 'Marketing & Growth', patterns: [/marketing/i, /growth/i, /lead/i, /acquisition/i, /content/i] },
  { topic: 'Data & Analytics', patterns: [/data/i, /analytics/i, /BI\b/i, /insights/i] },
  { topic: 'M&A', patterns: [/\bM&A\b/i, /mergers/i, /acquisitions/i] },
  { topic: 'Investments', patterns: [/portfolio/i, /investment/i, /asset/i, /ETF/i] },
  { topic: 'Client Experience', patterns: [/client experience/i, /onboarding/i, /engagement/i, /journey/i] },
];

function listMarkdown(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(d => d.isFile() && d.name.endsWith('.md'))
    .map(d => path.join(dir, d.name));
}

function splitFm(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) return { fm: '', body: raw };
  return { fm: m[1], body: raw.slice(m.index + m[0].length) };
}

function getFmVal(fm, key) {
  const r = new RegExp(`^${key}:\\s*(.*)$`, 'm');
  const m = fm.match(r);
  if (!m) return '';
  const v = m[1].trim().replace(/^"|"$/g, '');
  return v;
}

function setFmVal(fm, key, value) {
  const line = `${key}: ${typeof value === 'string' ? '"' + value.replace(/"/g, '\\"') + '"' : value}`;
  const r = new RegExp(`^${key}:\\s*.*$`, 'm');
  if (r.test(fm)) return fm.replace(r, line);
  return fm + (fm.endsWith('\n') ? '' : '\n') + line + '\n';
}

function setArrayVal(fm, key, arr) {
  const yaml = `${key}:\n${arr.map(v => `  - "${v.replace(/"/g, '\\"')}"`).join('\n')}`;
  const r = new RegExp(`^${key}:\n(?:^[\t ]+-.*\n?)*`, 'm');
  if (r.test(fm)) return fm.replace(r, yaml);
  return fm + (fm.endsWith('\n') ? '' : '\n') + yaml + '\n';
}

function categorize(title, excerpt, body) {
  const hay = `${title}\n${excerpt}\n${body}`;
  const hits = [];
  for (const rule of RULES) {
    if (rule.patterns.some(p => p.test(hay))) hits.push(rule.topic);
  }
  return hits.length ? hits : ['General'];
}

function buildFile(fm, body) { return `---\n${fm.trim()}\n---\n${body}`; }

function main() {
  const files = listMarkdown(PODCAST_DIR);
  let updated = 0;
  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf8');
    const { fm, body } = splitFm(raw);
    const title = getFmVal(fm, 'title');
    const excerpt = getFmVal(fm, 'excerpt');
    const topicsRaw = getFmVal(fm, 'topics');
    const hasTopics = /topics:\n\s*-/.test(fm);
    if (hasTopics && !/General/.test(fm)) continue;
    const topics = categorize(title, excerpt, body);
    let newFm = hasTopics ? fm : fm;
    newFm = setArrayVal(newFm, 'topics', topics);
    fs.writeFileSync(file, buildFile(newFm, body), 'utf8');
    updated++;
  }
  console.log(`Podcast categorization complete. Updated: ${updated}`);
}

main();



