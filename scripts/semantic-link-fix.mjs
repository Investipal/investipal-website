import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');
const REPORT_PATH = path.join(ROOT, 'reports', 'semantic-link-audit.json');

function loadReport() {
  if (!fs.existsSync(REPORT_PATH)) {
    throw new Error(`Report not found: ${REPORT_PATH}. Run audit first.`);
  }
  return JSON.parse(fs.readFileSync(REPORT_PATH, 'utf8'));
}

function applyFixes() {
  const report = loadReport();
  const byFile = new Map();
  for (const r of report.results) {
    if (!byFile.has(r.file)) byFile.set(r.file, []);
    byFile.get(r.file).push(r);
  }

  let filesChanged = 0;
  let linksFixed = 0;

  for (const [relFile, issues] of byFile.entries()) {
    const filePath = path.resolve(ROOT, relFile);
    if (!fs.existsSync(filePath)) continue;
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    for (const issue of issues) {
      const from = issue.url;
      const to = issue.expected;
      if (!from || !to) continue;

      const before = content;

      // Markdown direct match: [text](from)
      const mdExact = new RegExp(`(\\])\\(${escapeReg(from)}\\)`, 'g');
      content = content.replace(mdExact, `$1(${to})`);

      // Markdown with currentPath (relative or absolute self domain)
      const mdPathRel = new RegExp(`(\\])\\(${escapeReg(issue.currentPath)}\\)`, 'g');
      const mdPathAbs = new RegExp(`(\\])\\((?:https?:\\/\\/(?:www\\.)?investipal\\.co)${escapeReg(issue.currentPath)}\\)`, 'g');
      const mdHomeAbs = new RegExp(`(\\])\\((?:https?:\\/\\/(?:www\\.)?investipal\\.co)\\/\\)`, 'g');
      const mdHomeRel = new RegExp(`(\\])\\(\\/\\)`, 'g');
      content = content
        .replace(mdPathRel, `$1(${to})`)
        .replace(mdPathAbs, `$1(${to})`)
        .replace(mdHomeAbs, `$1(${to})`)
        .replace(mdHomeRel, `$1(${to})`);

      // HTML anchors: quoted and unquoted href values
      const htmlExactD = new RegExp(`href=\"${escapeReg(from)}\"`, 'g');
      const htmlExactS = new RegExp(`href='${escapeReg(from)}'`, 'g');
      const htmlExactU = new RegExp(`href=${escapeReg(from)}(?=[\s>])`, 'g');
      const htmlPathAbsD = new RegExp(`href=\"(?:https?:\\/\\/(?:www\\.)?investipal\\.co)${escapeReg(issue.currentPath)}\"`, 'g');
      const htmlPathAbsS = new RegExp(`href='(?:https?:\\/\\/(?:www\\.)?investipal\\.co)${escapeReg(issue.currentPath)}'`, 'g');
      const htmlPathAbsU = new RegExp(`href=(?:https?:\\/\\/(?:www\\.)?investipal\\.co)${escapeReg(issue.currentPath)}(?=[\\s>])`, 'g');
      const htmlPathRelD = new RegExp(`href=\"${escapeReg(issue.currentPath)}\"`, 'g');
      const htmlPathRelS = new RegExp(`href='${escapeReg(issue.currentPath)}'`, 'g');
      const htmlPathRelU = new RegExp(`href=${escapeReg(issue.currentPath)}(?=[\\s>])`, 'g');
      const htmlHomeAbsD = new RegExp(`href=\"(?:https?:\\/\\/(?:www\\.)?investipal\\.co)\\/\"`, 'g');
      const htmlHomeAbsS = new RegExp(`href='(?:https?:\\/\\/(?:www\\.)?investipal\\.co)\/'`, 'g');
      const htmlHomeAbsU = new RegExp(`href=(?:https?:\\/\\/(?:www\\.)?investipal\\.co)\/(?=[\\s>])`, 'g');
      const htmlHomeRelD = new RegExp(`href=\"\\/\"`, 'g');
      const htmlHomeRelS = new RegExp(`href='\\/'`, 'g');
      const htmlHomeRelU = new RegExp(`href=\\/(?=[\\s>])`, 'g');
      content = content
        .replace(htmlExactD, `href="${to}"`)
        .replace(htmlExactS, `href='${to}'`)
        .replace(htmlExactU, `href="${to}"`)
        .replace(htmlPathAbsD, `href="${to}"`)
        .replace(htmlPathAbsS, `href='${to}'`)
        .replace(htmlPathAbsU, `href="${to}"`)
        .replace(htmlPathRelD, `href="${to}"`)
        .replace(htmlPathRelS, `href='${to}'`)
        .replace(htmlPathRelU, `href="${to}"`)
        .replace(htmlHomeAbsD, `href="${to}"`)
        .replace(htmlHomeAbsS, `href='${to}'`)
        .replace(htmlHomeAbsU, `href="${to}"`)
        .replace(htmlHomeRelD, `href="${to}"`)
        .replace(htmlHomeRelS, `href='${to}'`)
        .replace(htmlHomeRelU, `href="${to}"`);

      if (content !== before) {
        changed = true;
        linksFixed++;
      }
    }

    if (changed) {
      fs.writeFileSync(filePath, content);
      filesChanged++;
    }
  }

  console.log(`Semantic fixes applied. Files changed: ${filesChanged}, links fixed: ${linksFixed}`);
}

function escapeReg(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

applyFixes();
