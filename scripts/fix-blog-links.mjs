import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.resolve(__dirname, '..', 'src', 'content', 'blog');

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

function normalizeLinks(md) {
  let out = md;
  // 1) /book-demo -> /book-a-demo
  out = out.replaceAll('(\/book-demo)', '(/book-a-demo)');
  out = out.replaceAll('"/book-demo"', '"/book-a-demo"');
  // 2) Absolute domain -> relative
  out = out.replaceAll('(https://investipal.co/book-demo)', '(/book-a-demo)');
  out = out.replaceAll(
    '(https://www.investipal.co/book-demo)',
    '(/book-a-demo)'
  );
  out = out.replaceAll(
    '("https://investipal.co/book-demo")',
    '("/book-a-demo")'
  );
  out = out.replaceAll(
    '("https://www.investipal.co/book-demo")',
    '("/book-a-demo")'
  );
  out = out.replaceAll('(https://investipal.co', '(');
  out = out.replaceAll('(https://www.investipal.co', '(');
  out = out.replaceAll('"https://investipal.co', '"');
  out = out.replaceAll('"https://www.investipal.co', '"');
  // 3) /blog-posts/* -> /blog/*
  out = out.replaceAll('(/blog-posts/', '(/blog/');
  out = out.replaceAll('"/blog-posts/', '"/blog/');
  // 4) category/tag to /blog
  out = out.replaceAll('(/blog/category/', '(/blog/');
  out = out.replaceAll('"/blog/category/', '"/blog/');
  out = out.replaceAll('(/blog/tag/', '(/blog/');
  out = out.replaceAll('"/blog/tag/', '"/blog/');
  return out;
}

function run() {
  const files = walk(BLOG_DIR);
  let changed = 0;
  for (const file of files) {
    const before = fs.readFileSync(file, 'utf8');
    const after = normalizeLinks(before);
    if (after !== before) {
      fs.writeFileSync(file, after);
      changed++;
    }
  }
  console.log(`Updated ${changed} blog files.`);
}

run();
