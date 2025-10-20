#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

// Read a simple YAML-like queue (actually JSON for simplicity here) and print scheduled posts
// Usage: node scripts/social/queue-linkedin.mjs docs/ai-cmo/social/content-queue.json

const [, , queuePath] = process.argv;
if (!queuePath) {
  console.error('Usage: node scripts/social/queue-linkedin.mjs path/to/content-queue.json');
  process.exit(1);
}

const items = JSON.parse(fs.readFileSync(queuePath, 'utf-8'));
for (const post of items) {
  console.log(`[${post.date}] ${post.hook}`);
}


