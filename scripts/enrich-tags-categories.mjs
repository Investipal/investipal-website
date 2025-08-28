import fs from 'fs';
import path from 'path';

const CATEGORY_MAP = [
  { key: /compliance|reg bi|kyp|ips|audit|regulation/i, category: 'Compliance' },
  { key: /onboarding|statement|scanner|account|kya|kyc/i, category: 'Onboarding' },
  { key: /portfolio|allocation|rebalanc|risk|drift|analysis|optimization/i, category: 'Portfolio Management' },
  { key: /ai|machine learning|predictive|automation|ocr/i, category: 'AI' },
  { key: /marketing|lead|growth|conversion|webinars|seo/i, category: 'Marketing' },
];

function decideCategory(slug, existingTags) {
  for (const rule of CATEGORY_MAP) {
    if (rule.key.test(slug) || existingTags.some(t => rule.key.test(t))) {
      return rule.category;
    }
  }
  return 'General';
}

function listFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(p));
    else if (entry.isFile() && p.toLowerCase().endsWith('.md')) out.push(p);
  }
  return out;
}

function main() {
  let blogDir = path.resolve(process.cwd(), 'src', 'content', 'blog');
  if (!fs.existsSync(blogDir)) blogDir = path.resolve(process.cwd(), 'investipal-astro', 'src', 'content', 'blog');
  const files = listFiles(blogDir);
  let changed = 0;
  for (const file of files) {
    let raw = fs.readFileSync(file, 'utf8');
    const m = raw.match(/^\s*---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n/);
    if (!m) continue;
    let fm = m[1];
    const body = raw.slice(m.index + m[0].length);
    const slugMatch = fm.match(/^slug:\s*"?([^"\r\n]+)"?/m);
    const slug = slugMatch ? slugMatch[1] : path.basename(file, '.md');
    // parse tags
    let tags = [];
    const arrMatch = fm.match(/^tags:\s*\[(.*)\]\s*$/m);
    if (arrMatch) {
      tags = arrMatch[1].split(',').map(s => s.replace(/"/g,'').trim()).filter(Boolean);
    } else {
      const single = fm.match(/^tags:\s*"([^"]*)"\s*$/m);
      if (single && single[1]) tags = single[1].split(',').map(s => s.trim()).filter(Boolean);
    }
    // ensure lowercase unique
    tags = Array.from(new Set(tags.map(t => t.trim())));
    const category = decideCategory(slug, tags);
    // write back
    let updatedFm = fm;
    if (/^category:/m.test(updatedFm)) {
      updatedFm = updatedFm.replace(/^category:\s*"?[^"]*"?/m, `category: "${category}"`);
    } else {
      updatedFm += `\ncategory: "${category}"`;
    }
    if (/^tags:/m.test(updatedFm)) {
      updatedFm = updatedFm.replace(/^tags:.*$/m, `tags: [${tags.map(t=>`"${t}"`).join(', ')}]`);
    } else if (tags.length){
      updatedFm += `\ntags: [${tags.map(t=>`"${t}"`).join(', ')}]`;
    }
    if (updatedFm !== fm) {
      const rebuilt = `---\n${updatedFm}\n---\n${body}`;
      fs.writeFileSync(file, rebuilt, 'utf8');
      changed++;
    }
  }
  console.log('Tags/categories enriched files =', changed);
}

main();




