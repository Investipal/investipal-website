#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');
const REPORT_DIR = path.join(process.cwd(), 'scripts', 'output');
const REPORT_PATH = path.join(REPORT_DIR, 'link-audit-report.json');

// Domain normalization
const DOMAIN_REGEX = /https?:\/\/(?:www\.)?investipal\.co(\/[^"'\s)]*)/gi;

// Known internal path normalizations
const NORMALIZATIONS = [
  {
    description: 'Webflow blog-posts → /blog',
    pattern: /(href=["'])\/blog-posts\/([^"']+)["']/gi,
    replace: (_m, p1, p2) => `${p1}/blog/${p2}"`,
  },
  {
    description: 'Absolute domain to relative',
    pattern: DOMAIN_REGEX,
    replace: (_m, p1) => p1,
  },
  {
    description: 'Strip trailing .html for internal links',
    pattern: /(href=["'])(\/[^"']+?)\.html(["'])/gi,
    replace: (_m, p1, p2, p3) => `${p1}${p2}${p3}`,
  },
];

// Map key phrases to preferred internal targets for enrichment (first occurrence per doc)
const ENRICH_MAP = [
  // Feature pages
  { phrase: /\bbrokerage statement scanning\b/gi, url: '/features/automated-statement-scanner' },
  { phrase: /\bstatement scanner\b/gi, url: '/features/automated-statement-scanner' },
  { phrase: /\bocr\b/gi, url: '/features/automated-statement-scanner' },
  { phrase: /\bpdf to excel\b/gi, url: '/features/automated-statement-scanner' },
  { phrase: /\brisk assessment\b/gi, url: '/features/risk-management' },
  { phrase: /\brisk tolerance questionnaire\b/gi, url: '/features/risk-management' },
  { phrase: /\binvestment policy statement(?:s)?\b/gi, url: '/features/investment-policy-statements' },
  { phrase: /\bips\b/gi, url: '/features/investment-policy-statements' },
  { phrase: /\breg(?:ulation)? ?bi\b/gi, url: '/features/regulation-best-interest-generator' },
  { phrase: /\bportfolio optimization\b/gi, url: '/features/asset-allocation' },
  { phrase: /\basset allocation\b/gi, url: '/features/asset-allocation' },
  { phrase: /\bclient onboarding\b/gi, url: '/features/client-acquisition' },
  { phrase: /\bai[- ]driven engagement\b/gi, url: '/features/ai-driven-engagement' },
  { phrase: /\bcustom security builder\b/gi, url: '/features/custom-security-builder' },
  { phrase: /\biul(?:s)?|annuity modeling\b/gi, url: '/features/iul-annuity-modeling' },
  { phrase: /\broi calculator\b/gi, url: '/features/roi-calculator' },

  // Segments
  { phrase: /\bwealth managers?\b/gi, url: '/segments/wealth-managers' },
  { phrase: /\bfinancial planners?\b/gi, url: '/segments/financial-planners' },
  { phrase: /\bwealth firms?\b/gi, url: '/segments/wealth-firms' },
  { phrase: /\binsurance\b/gi, url: '/segments/insurance' },

  // Blog categories/tags
  { phrase: /\bcompliance automation\b/gi, url: '/blog/category/compliance' },
  { phrase: /\bonboarding\b/gi, url: '/blog/category/onboarding' },
  { phrase: /\bportfolio (?:management|construction)\b/gi, url: '/blog/category/portfolio-management' },
  { phrase: /\bai\b/gi, url: '/blog/tag/ai' },
  { phrase: /\binvestment proposals?\b/gi, url: '/blog/tag/investment-proposals' },

  // Calls to action
  { phrase: /\bbook (?:a )?demo\b/gi, url: '/book-a-demo' },
  { phrase: /\bschedule (?:a )?demo\b/gi, url: '/book-a-demo' },
  { phrase: /\brequest (?:a )?demo\b/gi, url: '/book-a-demo' },
  { phrase: /\bcontact us\b/gi, url: '/contact-us' },
  { phrase: /\bintegrations?\b/gi, url: '/integrations' },
];

// Bad href patterns to fix
const BAD_HREF_PATTERNS = [
  /href=["']<path[^"']*["']/gi, // inline SVG path mistakenly used as href
  /href=["']#(?:\s|)["']/gi,     // empty hash
  /href=["']javascript:[^"']+["']/gi, // javascript pseudo links
];

function listMarkdownFiles(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.toLowerCase().endsWith('.md'))
    .map((d) => path.join(dir, d.name));
}

function splitFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) return { fm: null, body: raw, fmBlock: null };
  const fmBlock = m[0];
  const body = raw.slice(m.index + fmBlock.length);
  return { fm: m[1], body, fmBlock };
}

function isInsideAnchor(html, index) {
  // naive check: look back for <a and ahead for </a>
  const before = html.lastIndexOf('<a', index);
  const close = html.indexOf('</a>', index);
  return before !== -1 && (close === -1 || close > index);
}

function wrapPhraseIfNotLinked(html, phraseRegex, url) {
  let changed = false;
  html = html.replace(phraseRegex, (match, ...args) => {
    const offset = args[args.length - 2];
    if (typeof offset !== 'number') return match;
    if (isInsideAnchor(html, offset)) return match;
    changed = true;
    return `<a href="${url}">${match}</a>`;
  });
  return { html, changed };
}

// Authoritative external enrichment (first N additions per doc)
const EXT_ENRICH_MAP = [
  { phrase: /\bReg(?:ulation)? Best Interest\b/gi, url: 'https://www.sec.gov/regulation-best-interest' },
  { phrase: /\bForm CRS\b/gi, url: 'https://www.sec.gov/formcrs' },
  { phrase: /\bAML\b/gi, url: 'https://www.finra.org/rules-guidance/key-topics/anti-money-laundering' },
  { phrase: /\bKYC\b/gi, url: 'https://www.finra.org/rules-guidance/key-topics/know-your-customer' },
  { phrase: /\bCustomer Identification Program\b/gi, url: 'https://www.fincen.gov/resources/statutes-regulations/usa-patriot-act/customer-identification-program' },
  { phrase: /\bCDD\b/gi, url: 'https://www.fincen.gov/cdd-final-rule' },
  { phrase: /\bOFAC\b/gi, url: 'https://home.treasury.gov/policy-issues/office-of-foreign-assets-control-sanctions-programs-and-country-information' },
  { phrase: /\bSanctions(?: List)?\b/gi, url: 'https://sanctionssearch.ofac.treas.gov' },
  { phrase: /\bSIPC\b/gi, url: 'https://www.sipc.org/' },
];

function auditAndFixLinks(body) {
  const diagnostics = {
    normalized: [],
    badHrefFixed: 0,
    enriched: [],
    externalEnriched: [],
  };

  let out = body;

  // 1) Protect headings: unwrap any links inside headings, and store headings as placeholders
  const headingStore = [];
  out = out.replace(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi, (m) => {
    // unwrap <a> tags inside the heading
    const cleaned = m.replace(/<a[^>]*>([\s\S]*?)<\/a>/gi, '$1');
    const token = `__HDR__${headingStore.length}__`;
    headingStore.push(cleaned);
    return token;
  });

  // Normalizations
  for (const rule of NORMALIZATIONS) {
    const before = out;
    out = out.replace(rule.pattern, rule.replace);
    if (out !== before) diagnostics.normalized.push(rule.description);
  }

  // Bad href fixes
  for (const pat of BAD_HREF_PATTERNS) {
    out = out.replace(pat, (m) => {
      diagnostics.badHrefFixed += 1;
      // remove bad href entirely (leave anchor text)
      return m.replace(/href=["'][^"']+["']/, '');
    });
  }

  // Enrichment (limit to first occurrence per phrase per document)
  for (const { phrase, url } of ENRICH_MAP) {
    const res = wrapPhraseIfNotLinked(out, phrase, url);
    if (res.changed) diagnostics.enriched.push({ phrase: phrase.toString(), url });
    out = res.html;
  }

  // External enrichment with cap per document
  let externalAdds = 0;
  const maxExternalAdds = 3;
  for (const { phrase, url } of EXT_ENRICH_MAP) {
    if (externalAdds >= maxExternalAdds) break;
    const before = out;
    const res = wrapPhraseIfNotLinked(out, phrase, url);
    if (res.changed) {
      diagnostics.externalEnriched.push({ phrase: phrase.toString(), url });
      externalAdds += 1;
    }
    out = res.html;
  }

  // Add target/rel to external links (non-investipal domains)
  out = out.replace(/<a([^>]*?)href=["'](https?:\/\/(?![^\/]*investipal\.co)[^"']+)["']([^>]*)>/gi, (m, pre, href, post) => {
    let tag = `<a${pre}href="${href}"${post}>`;
    if (!/target=/.test(tag)) tag = tag.replace(/<a/,'<a target="_blank"');
    if (!/rel=/.test(tag)) tag = tag.replace(/<a/,'<a rel="noopener noreferrer"');
    return tag;
  });

  // 2) Restore headings (without links)
  out = out.replace(/__HDR__(\d+)__/g, (_m, idx) => headingStore[Number(idx)] || _m);

  return { body: out, diagnostics };
}

function main() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.error('Blog directory not found:', BLOG_DIR);
    process.exit(1);
  }
  if (!fs.existsSync(REPORT_DIR)) fs.mkdirSync(REPORT_DIR, { recursive: true });

  const files = listMarkdownFiles(BLOG_DIR);
  const report = { processed: 0, changed: 0, files: [], externalCounts: {} };

  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf8');
    const { fmBlock, body } = splitFrontmatter(raw);
    const { body: newBody, diagnostics } = auditAndFixLinks(body);
    if (newBody !== body) {
      const rebuilt = fmBlock ? `${fmBlock}${newBody}` : newBody;
      fs.writeFileSync(file, rebuilt, 'utf8');
      report.changed += 1;
    }
    report.processed += 1;
    // Tally external domains added in this file
    if (diagnostics.externalEnriched?.length) {
      for (const e of diagnostics.externalEnriched) {
        try {
          const u = new URL(e.url);
          report.externalCounts[u.hostname] = (report.externalCounts[u.hostname] || 0) + 1;
        } catch {}
      }
    }

    report.files.push({
      file: path.basename(file),
      changed: newBody !== body,
      diagnostics,
    });
  }

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf8');
  console.log(`Link audit complete. Processed ${report.processed} files; changed ${report.changed}.`);
  console.log(`Report written to ${REPORT_PATH}`);
}

main();


