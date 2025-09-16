#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Robust CSV parser (handles quotes, commas, and multiline fields)
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

    // Accumulate until we close quotes
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

function toSet(arr) {
  const s = new Set();
  for (const v of arr) if (v && String(v).trim()) s.add(String(v).trim());
  return s;
}

function diffSets(a, b) {
  const onlyA = [];
  for (const v of a) if (!b.has(v)) onlyA.push(v);
  return onlyA.sort();
}

async function main() {
  const csvPath = path.join(__dirname, '..', 'Wealth Mgmt Site - Blog Posts (2).csv');
  if (!fs.existsSync(csvPath)) {
    console.error('❌ CSV not found at', csvPath);
    process.exit(1);
  }

  const csvRaw = fs.readFileSync(csvPath, 'utf-8');
  const csvRows = parseCSV(csvRaw);
  const csvSlugs = toSet(csvRows.map(r => r.Slug));

  const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
  const siteFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  const siteSlugs = toSet(siteFiles.map(f => f.replace(/\.md$/i, '')));

  const siteOnly = diffSets(siteSlugs, csvSlugs);
  const csvOnly = diffSets(csvSlugs, siteSlugs);
  const intersectionCount = [...siteSlugs].filter(s => csvSlugs.has(s)).length;

  const report = {
    summary: {
      csvPosts: csvSlugs.size,
      sitePosts: siteSlugs.size,
      intersection: intersectionCount,
      siteOnlyCount: siteOnly.length,
      csvOnlyCount: csvOnly.length,
    },
    siteOnly, // exist on site but NOT in CSV
    csvOnly   // exist in CSV but NOT on site
  };

  console.log(JSON.stringify(report, null, 2));

  // Also write to file for reference
  const outDir = path.join(__dirname, 'output');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'compare-csv-to-blog.json'), JSON.stringify(report, null, 2));
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});








