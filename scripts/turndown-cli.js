#!/usr/bin/env node
import fs from 'fs';
import TurndownService from 'turndown';
import he from 'he';

// Read HTML from stdin
const readStdin = async () => {
  return new Promise((resolve, reject) => {
    let data = '';
    process.stdin.setEncoding('utf-8');
    process.stdin.on('data', chunk => (data += chunk));
    process.stdin.on('end', () => resolve(data));
    process.stdin.on('error', reject);
  });
};

// Configure Turndown with sensible options
const td = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
  strongDelimiter: '**',
  linkStyle: 'inlined',
  br: '\n',
});

// Add rules to preserve paragraphs and spacing
td.addRule('preserveParagraphs', {
  filter: ['p'],
  replacement: (content) => `\n\n${content}\n\n`,
});

td.addRule('headersWithSpacing', {
  filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  replacement: (content, node) => {
    const level = Number(node.nodeName.charAt(1));
    const hashes = '#'.repeat(level);
    return `\n\n${hashes} ${content.trim()}\n\n`;
  },
});

// Run
(async () => {
  try {
    const html = await readStdin();
    const decoded = he.decode(html || '');
    let md = td.turndown(decoded);

    // Post-process fixes
    // 0) Normalize non-breaking spaces and replacement chars early
    md = md.replace(/\u00A0/g, ' '); // NBSP -> space
    // Heuristics for "�" replacement char
    md = md.replace(/\s\uFFFD\s/g, ' — '); // spaces around -> em-dash
    md = md.replace(/([A-Za-z])\uFFFD([A-Za-z])/g, "$1’$2"); // between letters -> apostrophe
    // Common mojibake (UTF-8 shown as CP1252) normalizations
    md = md.replace(/â€™/g, '’');
    md = md.replace(/â€œ/g, '“');
    md = md.replace(/â€/g, '”');
    md = md.replace(/â€˜/g, '‘');
    md = md.replace(/â€”/g, '—');
    md = md.replace(/â€“/g, '–');
    md = md.replace(/â€¦/g, '…');

    // 1) Ensure space around bold boundaries if stuck to words
    md = md.replace(/(\*\*[^*]+\*\*)(\S)/g, '$1 $2');
    md = md.replace(/(\S)(\*\*[^*]+\*\*)/g, '$1 $2');

    // 1b) Remove stray inner spaces just inside bold delimiters
    md = md.replace(/\*\*\s+([^*]+?)\s*\*\*/g, '**$1**');

    // 2) Merge headers broken across lines (e.g., "## Why\n\nProfessional ...")
    md = md.replace(/^(#{1,6}\s+\w+)\s*\n\n(?!#|\*|-)([^\n].*)$/gm, '$1 $2');

    // 2b) If a header line still contains bold content (merged paragraph), split it out
    md = md.replace(/^(#{1,6}\s+[^\n]*?)(\*\*.+)$/gm, '$1\n\n$2');

    // 3) Collapse excessive blank lines
    md = md.replace(/\n{3,}/g, '\n\n');

    process.stdout.write(md.trim() + '\n');
  } catch (err) {
    console.error(err?.message || String(err));
    process.exit(1);
  }
})();


