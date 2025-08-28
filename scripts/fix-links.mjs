import fs from 'fs';
import path from 'path';

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
    const before = fs.readFileSync(file, 'utf8');
    let s = before;
    // Rewrite Webflow blog paths to local blog
    s = s.replace(/href="\/blog-posts\//g, 'href="/blog/');
    s = s.replace(/href="https?:\/\/www\.investipal\.co\/blog-posts\//g, 'href="/blog/');
    s = s.replace(/href="https?:\/\/investipal\.co\/blog-posts\//g, 'href="/blog/');
    // Normalize already-correct absolute blog links to relative
    s = s.replace(/href="https?:\/\/www\.investipal\.co\/blog\//g, 'href="/blog/');
    s = s.replace(/href="https?:\/\/investipal\.co\/blog\//g, 'href="/blog/');
    if (s !== before) {
      fs.writeFileSync(file, s, 'utf8');
      changed++;
    }
  }
  console.log('Links rewritten in files =', changed);
}

main();



