#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CSV parser (handles quotes, commas, and multiline fields)
function parseCSV(csvContent) {
  const lines = csvContent.split('\n');
  if (lines.length === 0) return [];
  const headers = lines[0].split(',');
  const data = [];

  let i = 1;
  while (i < lines.length) {
    if (!lines[i].trim()) { i++; continue; }

    const values = [];
    let current = '';
    let inQuotes = false;
    let lineContent = lines[i];

    while (i < lines.length) {
      for (let j = 0; j < lineContent.length; j++) {
        const char = lineContent[j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim().replace(/^"|"$/g, ''));
          current = '';
        } else {
          current += char;
        }
      }
      if (inQuotes && i + 1 < lines.length) {
        current += '\n';
        i++;
        lineContent = lines[i];
      } else {
        break;
      }
    }
    values.push(current.trim().replace(/^"|"$/g, ''));

    if (values.length >= 2) {
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      if (row.Slug && row.Slug.trim()) data.push(row);
    }
    i++;
  }
  return data;
}

function sanitize(text) {
  return (text || '').toString().replace(/\r/g, '').trim();
}

function escapeYaml(str) {
  if (str == null) return '';
  const s = String(str);
  return s.includes(':') || s.includes('-') || s.includes('"') || s.includes('\n')
    ? '"' + s.replace(/"/g, '\\"') + '"'
    : s;
}

async function main() {
  const csvPath = path.join(__dirname, '..', 'Wealth Mgmt Site - Blog Posts (2).csv');
  const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');

  if (!fs.existsSync(csvPath)) {
    console.error('❌ CSV not found at', csvPath);
    process.exit(1);
  }
  if (!fs.existsSync(blogDir)) {
    console.error('❌ Blog directory not found at', blogDir);
    process.exit(1);
  }

  const csvRaw = fs.readFileSync(csvPath, 'utf-8');
  const rows = parseCSV(csvRaw);

  const siteFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  const siteSlugs = new Set(siteFiles.map(f => f.replace(/\.md$/i, '')));

  let created = 0;
  const createdSlugs = [];
  for (const row of rows) {
    const slug = sanitize(row.Slug);
    if (!slug || siteSlugs.has(slug)) continue;

    const name = sanitize(row.Name);
    const title = name || slug.replace(/-/g, ' ');
    const excerpt = sanitize(row['Short Info']);
    const category = sanitize(row.Tag) || 'General';
    const author = sanitize(row['Author Name']) || 'Investipal Team';
    const published = sanitize(row['Published On']) || sanitize(row['Updated On']) || sanitize(row['Created On']);
    const thumbImage = sanitize(row['Thumb Image']);
    const mainImage = sanitize(row['Main Image']);
    const featuredImage = mainImage || thumbImage || '';
    const detailsHtml = sanitize(row.Details);

    const frontmatter = [
      '---',
      `title: ${escapeYaml(title)}`,
      `excerpt: ${escapeYaml(excerpt)}`,
      `author: ${escapeYaml(author)}`,
      published ? `publishedDate: ${escapeYaml(new Date(published).toISOString())}` : `publishedDate: ${escapeYaml(new Date().toISOString())}`,
      `category: ${escapeYaml(category)}`,
      featuredImage ? `featuredImage: ${escapeYaml(featuredImage)}` : '',
      `tags: []`,
      `draft: false`,
      '---'
    ].filter(Boolean).join('\n');

    // Body: wrap CSV HTML in as-is; author can edit later
    const body = detailsHtml ? `\n${detailsHtml}\n` : `\n<p>Content to be added.</p>\n`;

    const outPath = path.join(blogDir, `${slug}.md`);
    fs.writeFileSync(outPath, `${frontmatter}${body}`);
    created++;
    createdSlugs.push(slug);
    console.log(`✅ Created ${slug}.md`);
  }

  const report = { created, createdSlugs };
  console.log('\n📈 Import Summary:', JSON.stringify(report, null, 2));
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});












