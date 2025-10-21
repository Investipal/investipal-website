#!/usr/bin/env node
// Audits blog featured images for existence, low quality indicators, and duplicates
// Outputs a JSON summary and samples to stdout

import fs from 'node:fs';
import path from 'node:path';

const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
const publicDir = path.join(process.cwd(), 'public');

function readFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : '';
}

function getYaml(yaml, key) {
  const re = new RegExp(`^${key}\\s*:\\s*["']?([^"'\r\n]+)["']?\\s*$`, 'm');
  const m = yaml.match(re);
  return m ? m[1] : null;
}

function audit() {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));
  const stats = [];
  const usage = new Map();

  for (const f of files) {
    const slug = f.replace(/\.md$/i, '');
    const raw = fs.readFileSync(path.join(blogDir, f), 'utf8');
    const yaml = readFrontmatter(raw);
    const featuredImage = getYaml(yaml, 'featuredImage');
    const title = getYaml(yaml, 'title') || slug;

    let exists = false;
    let size = 0;
    let ext = null;
    let low = false;
    let pathAbs = null;

    if (featuredImage) {
      pathAbs = path.join(publicDir, featuredImage.replace(/^\//, ''));
      exists = fs.existsSync(pathAbs);
      if (exists) {
        const st = fs.statSync(pathAbs);
        size = st.size;
        ext = path.extname(pathAbs).toLowerCase();
        // Consider low quality if it's a Webflow thumbnail variant or very small size
        const fileBase = path.basename(pathAbs);
        low = /-p-\d+x\d+/i.test(fileBase) || size < 20000; // ~20KB
        usage.set(featuredImage, (usage.get(featuredImage) || 0) + 1);
      }
    }

    stats.push({ slug, title, featuredImage, exists, size, ext, low });
  }

  const duplicates = Array.from(usage.entries())
    .filter(([_, count]) => count > 1)
    .sort((a, b) => b[1] - a[1]);

  const summary = {
    totalPosts: stats.length,
    missingFeaturedImage: stats.filter((s) => !s.featuredImage).length,
    imageNotFound: stats.filter((s) => s.featuredImage && !s.exists).length,
    lowQualityCount: stats.filter((s) => s.low).length,
    uniqueImages: usage.size,
    duplicateSets: duplicates.length,
  };

  const output = {
    summary,
    topDuplicates: duplicates.slice(0, 15).map(([img, count]) => ({ img, count })),
    samples: {
      low: stats.filter((s) => s.low).slice(0, 20),
      missing: stats.filter((s) => !s.featuredImage).slice(0, 20),
      notFound: stats.filter((s) => s.featuredImage && !s.exists).slice(0, 20),
    },
  };

  console.log(JSON.stringify(output, null, 2));
}

audit();



