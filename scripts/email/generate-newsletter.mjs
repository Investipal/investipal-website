#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

// Very simple newsletter generator stub: creates a dated markdown in src/content/email/newsletters
const outDir = path.resolve('src/content/email/newsletters');
fs.mkdirSync(outDir, { recursive: true });

const date = new Date().toISOString().slice(0, 10);
const file = path.join(outDir, `${date}-newsletter.md`);

const content = `---
title: "Investipal Weekly – ${date}"
description: "AI workflows for RIAs and advisors this week"
---

## This week’s insights

- Programmatic SEO cluster updates
- New blog posts to share on LinkedIn
- Feature spotlight: Statement Scanner

## CTA

[Book a demo](/book-a-demo)
`;

fs.writeFileSync(file, content);
console.log('Wrote', file);


