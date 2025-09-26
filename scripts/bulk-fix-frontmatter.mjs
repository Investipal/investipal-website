import fs from 'fs';
import path from 'path';

// Expect to run from project root or from investipal-astro; resolve both
let blogDir = path.resolve(process.cwd(), 'src', 'content', 'blog');
if (!fs.existsSync(blogDir)) {
  blogDir = path.resolve(process.cwd(), 'investipal-astro', 'src', 'content', 'blog');
}

function listMarkdownFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listMarkdownFiles(p));
    else if (entry.isFile() && p.toLowerCase().endsWith('.md')) out.push(p);
  }
  return out;
}

function extractFrontmatter(raw) {
  // Match proper fenced frontmatter
  const m = raw.match(/^\s*---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n/);
  if (m) return { fm: m[1], start: m.index, end: m.index + m[0].length };

  // Salvage: look for top lines that look like key: value until blank line or HTML
  const lines = raw.split(/\r?\n/);
  const fmLines = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) break;
    if (/^[A-Za-z][A-Za-z0-9_-]*\s*:/.test(line)) {
      fmLines.push(line);
      i++;
      continue;
    }
    // If we see HTML, stop salvage
    if (line.includes('<')) break;
    // If first line is malformed like `ntitle: ...`, strip leading non-letters
    const fixed = line.replace(/^`+/, '');
    if (/^[A-Za-z][A-Za-z0-9_-]*\s*:/.test(fixed)) {
      fmLines.push(fixed);
      i++;
      continue;
    }
    break;
  }
  if (fmLines.length > 0) {
    const fm = fmLines.join('\n');
    const bodyStartIdx = lines.slice(0, i).join('\n').length + (i > 0 ? 1 : 0);
    return { fm, start: 0, end: bodyStartIdx };
  }
  return null;
}

function firstImageUrlFromBody(body) {
  const m = body.match(/<img[^>]*\ssrc="([^"]+)"/i);
  return m ? m[1] : null;
}

function normalizeFrontmatter(fm, body) {
  // Remove stray backticks and literal `n sequences
  let out = fm.replace(/`n/g, '\n').replace(/`/g, '');
  // Drop any lines that contain HTML
  out = out
    .split(/\r?\n/)
    .filter((l) => !l.includes('<'))
    .join('\n')
    .trimEnd();

  // Normalize featuredImage
  const lines = out.split('\n');
  let foundFi = false;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(featuredImage:\s*)"?([^"]*?)"?\s*$/);
    if (m) {
      foundFi = true;
      let val = (m[2] || '').trim();
      if (!val || val.includes('<')) {
        const url = firstImageUrlFromBody(body);
        if (url) lines[i] = `${m[1]}"${url}"`;
        else lines[i] = ''; // remove if we can't provide a valid URL
      } else {
        // keep only URL quoted
        lines[i] = `${m[1]}"${val}"`;
      }
    }
  }
  let normalized = lines.filter(Boolean).join('\n');
  if (!foundFi) {
    const url = firstImageUrlFromBody(body);
    if (url) normalized += `\nfeaturedImage: "${url}"`;
  }
  return normalized.trimEnd();
}

function ensureFences(normalizedFm, body) {
  return `---\n${normalizedFm}\n---\n${body.replace(/^\s+/, '')}`;
}

function processFile(filePath) {
  let raw = fs.readFileSync(filePath, 'utf8');
  const fmBlock = extractFrontmatter(raw);
  if (!fmBlock) return false; // skip if can't find/salvage

  const fm = fmBlock.fm;
  const body = raw.slice(fmBlock.end);
  let cleaned = normalizeFrontmatter(fm, body);

  // Regenerate excerpt if missing or too short
  const makeExcerpt = () => {
    const m = body.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if (!m) return '';
    const text = m[1]
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
    const max = 200;
    if (text.length <= max) return text;
    let cut = text.slice(0, max);
    const lastSpace = cut.lastIndexOf(' ');
    if (lastSpace > 120) cut = cut.slice(0, lastSpace);
    return cut.replace(/[\s,.–-]*$/, '') + '…';
  };

  const lines = cleaned.split('\n');
  let hasExcerpt = false;
  for (let i = 0; i < lines.length; i++) {
    if (/^excerpt:\s*/.test(lines[i])) {
      hasExcerpt = true;
      const current = lines[i].replace(/^excerpt:\s*"?/, '').replace(/"?\s*$/, '');
      if (!current || current.length < 80) {
        const e = makeExcerpt();
        if (e) lines[i] = `excerpt: "${e}"`;
      }
      break;
    }
  }
  if (!hasExcerpt) {
    const e = makeExcerpt();
    if (e) lines.unshift(`excerpt: "${e}"`);
  }
  cleaned = lines.filter(Boolean).join('\n');
  const rebuilt = ensureFences(cleaned, body);
  if (rebuilt !== raw) {
    fs.writeFileSync(filePath, rebuilt, 'utf8');
    return true;
  }
  return false;
}

function main() {
  const files = listMarkdownFiles(blogDir);
  let fixed = 0;
  for (const f of files) {
    try {
      if (processFile(f)) fixed++;
    } catch (e) {
      // keep going; report at end
      console.error('Failed to fix', f, e.message);
    }
  }
  console.log('Bulk frontmatter repaired files=', fixed);
}

main();


