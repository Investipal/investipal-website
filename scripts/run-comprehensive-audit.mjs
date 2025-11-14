#!/usr/bin/env node

/**
 * Comprehensive Website Audit Script
 * Runs Lighthouse, Pa11y, and SEO checks
 * Generates detailed reports
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BASE_URL = process.env.AUDIT_URL || 'http://localhost:4321';
const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
const REPORT_DIR = path.join(process.cwd(), 'reports', 'audits', `audit-${TIMESTAMP}`);

// Pages to audit
const PAGES_TO_AUDIT = [
  { name: 'home', url: '/' },
  { name: 'blog', url: '/blog' },
  { name: 'blog-post', url: '/blog/how-to-manage-cross-border-wealth' },
  { name: 'features', url: '/features' },
  { name: 'pricing', url: '/pricing' },
  { name: 'about', url: '/about' },
  { name: 'contact', url: '/contact' },
];

// Ensure report directory exists
async function ensureReportDir() {
  await fs.mkdir(REPORT_DIR, { recursive: true });
  console.log(`📁 Report directory created: ${REPORT_DIR}`);
}

// Run Lighthouse audit
async function runLighthouse(page) {
  console.log(`🔦 Running Lighthouse audit for ${page.name}...`);
  
  const outputPath = path.join(REPORT_DIR, `lighthouse-${page.name}.html`);
  const jsonOutputPath = path.join(REPORT_DIR, `lighthouse-${page.name}.json`);
  
  try {
    const command = `npx lighthouse ${BASE_URL}${page.url} \
      --output html --output json \
      --output-path ${path.join(REPORT_DIR, `lighthouse-${page.name}`)} \
      --chrome-flags="--headless --no-sandbox --disable-gpu" \
      --quiet`;
    
    await execAsync(command, { maxBuffer: 10 * 1024 * 1024 });
    
    console.log(`✅ Lighthouse audit completed for ${page.name}`);
    return { success: true, page: page.name };
  } catch (error) {
    console.error(`❌ Lighthouse audit failed for ${page.name}:`, error.message);
    return { success: false, page: page.name, error: error.message };
  }
}

// Run Pa11y accessibility audit
async function runPa11y(page) {
  console.log(`♿ Running Pa11y accessibility audit for ${page.name}...`);
  
  const outputPath = path.join(REPORT_DIR, `pa11y-${page.name}.json`);
  
  try {
    const command = `npx pa11y ${BASE_URL}${page.url} \
      --reporter json \
      --standard WCAG2AA \
      --timeout 30000`;
    
    const { stdout } = await execAsync(command, { maxBuffer: 10 * 1024 * 1024 });
    
    await fs.writeFile(outputPath, stdout);
    
    const results = JSON.parse(stdout);
    console.log(`✅ Pa11y audit completed for ${page.name} - Found ${results.length} issues`);
    return { success: true, page: page.name, issueCount: results.length };
  } catch (error) {
    // Pa11y exits with code 2 if issues are found, but still produces output
    if (error.stdout) {
      await fs.writeFile(outputPath, error.stdout);
      const results = JSON.parse(error.stdout);
      console.log(`⚠️ Pa11y audit completed for ${page.name} - Found ${results.length} issues`);
      return { success: true, page: page.name, issueCount: results.length };
    }
    console.error(`❌ Pa11y audit failed for ${page.name}:`, error.message);
    return { success: false, page: page.name, error: error.message };
  }
}

// Run SEO checks
async function runSEOChecks(page) {
  console.log(`🔍 Running SEO checks for ${page.name}...`);
  
  try {
    const response = await fetch(`${BASE_URL}${page.url}`);
    const html = await response.text();
    
    const seoIssues = [];
    
    // Check for title tag
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
    if (!titleMatch || !titleMatch[1].trim()) {
      seoIssues.push({ type: 'error', message: 'Missing or empty title tag' });
    } else if (titleMatch[1].length < 30 || titleMatch[1].length > 60) {
      seoIssues.push({ 
        type: 'warning', 
        message: `Title length (${titleMatch[1].length}) not optimal (30-60 chars)`,
        value: titleMatch[1]
      });
    }
    
    // Check for meta description
    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
    if (!descMatch) {
      seoIssues.push({ type: 'error', message: 'Missing meta description' });
    } else if (descMatch[1].length < 120 || descMatch[1].length > 160) {
      seoIssues.push({ 
        type: 'warning', 
        message: `Meta description length (${descMatch[1].length}) not optimal (120-160 chars)`,
        value: descMatch[1]
      });
    }
    
    // Check for canonical URL
    if (!html.match(/<link\s+rel=["']canonical["']/i)) {
      seoIssues.push({ type: 'warning', message: 'Missing canonical URL' });
    }
    
    // Check for Open Graph tags
    if (!html.match(/<meta\s+property=["']og:title["']/i)) {
      seoIssues.push({ type: 'warning', message: 'Missing og:title' });
    }
    if (!html.match(/<meta\s+property=["']og:description["']/i)) {
      seoIssues.push({ type: 'warning', message: 'Missing og:description' });
    }
    if (!html.match(/<meta\s+property=["']og:image["']/i)) {
      seoIssues.push({ type: 'warning', message: 'Missing og:image' });
    }
    
    // Check for Twitter Card tags
    if (!html.match(/<meta\s+name=["']twitter:card["']/i)) {
      seoIssues.push({ type: 'warning', message: 'Missing twitter:card' });
    }
    
    // Check for h1 tag
    const h1Matches = html.match(/<h1[^>]*>/gi);
    if (!h1Matches || h1Matches.length === 0) {
      seoIssues.push({ type: 'error', message: 'Missing h1 tag' });
    } else if (h1Matches.length > 1) {
      seoIssues.push({ type: 'warning', message: `Multiple h1 tags found (${h1Matches.length})` });
    }
    
    // Check for alt attributes on images
    const imgMatches = html.match(/<img[^>]*>/gi) || [];
    const imgsWithoutAlt = imgMatches.filter(img => !img.match(/alt=["'][^"']*["']/i));
    if (imgsWithoutAlt.length > 0) {
      seoIssues.push({ 
        type: 'warning', 
        message: `${imgsWithoutAlt.length} images missing alt attributes` 
      });
    }
    
    // Check for viewport meta tag
    if (!html.match(/<meta\s+name=["']viewport["']/i)) {
      seoIssues.push({ type: 'error', message: 'Missing viewport meta tag' });
    }
    
    // Check for structured data
    const hasStructuredData = html.match(/<script[^>]*type=["']application\/ld\+json["']/i);
    if (!hasStructuredData) {
      seoIssues.push({ type: 'info', message: 'No structured data (JSON-LD) found' });
    }
    
    const outputPath = path.join(REPORT_DIR, `seo-${page.name}.json`);
    await fs.writeFile(outputPath, JSON.stringify({
      page: page.name,
      url: page.url,
      timestamp: new Date().toISOString(),
      issues: seoIssues,
      summary: {
        errors: seoIssues.filter(i => i.type === 'error').length,
        warnings: seoIssues.filter(i => i.type === 'warning').length,
        info: seoIssues.filter(i => i.type === 'info').length,
      }
    }, null, 2));
    
    console.log(`✅ SEO checks completed for ${page.name} - ${seoIssues.length} issues found`);
    return { 
      success: true, 
      page: page.name, 
      issueCount: seoIssues.length,
      summary: {
        errors: seoIssues.filter(i => i.type === 'error').length,
        warnings: seoIssues.filter(i => i.type === 'warning').length,
      }
    };
  } catch (error) {
    console.error(`❌ SEO checks failed for ${page.name}:`, error.message);
    return { success: false, page: page.name, error: error.message };
  }
}

// Parse Lighthouse JSON results
async function parseLighthouseResults(page) {
  try {
    const jsonPath = path.join(REPORT_DIR, `lighthouse-${page.name}.report.json`);
    const data = await fs.readFile(jsonPath, 'utf-8');
    const results = JSON.parse(data);
    
    return {
      page: page.name,
      scores: {
        performance: Math.round(results.categories.performance.score * 100),
        accessibility: Math.round(results.categories.accessibility.score * 100),
        bestPractices: Math.round(results.categories['best-practices'].score * 100),
        seo: Math.round(results.categories.seo.score * 100),
      },
      metrics: {
        fcp: results.audits['first-contentful-paint'].displayValue,
        lcp: results.audits['largest-contentful-paint'].displayValue,
        tbt: results.audits['total-blocking-time'].displayValue,
        cls: results.audits['cumulative-layout-shift'].displayValue,
        si: results.audits['speed-index'].displayValue,
      }
    };
  } catch (error) {
    console.error(`Error parsing Lighthouse results for ${page.name}:`, error.message);
    return null;
  }
}

// Generate summary report
async function generateSummaryReport(lighthouseResults, pa11yResults, seoResults) {
  console.log('📝 Generating summary report...');
  
  const report = `# Website Audit Report
Generated: ${new Date().toLocaleString()}

## Executive Summary

This comprehensive audit includes:
- **Lighthouse Performance Audits** - Performance, Accessibility, Best Practices, and SEO scores
- **Pa11y Accessibility Audits** - WCAG 2.0 AA compliance checks
- **SEO Audits** - Meta tags, structured data, and on-page SEO elements

## Lighthouse Scores

| Page | Performance | Accessibility | Best Practices | SEO |
|------|-------------|---------------|----------------|-----|
${lighthouseResults.map(r => r ? `| ${r.page} | ${r.scores.performance} | ${r.scores.accessibility} | ${r.scores.bestPractices} | ${r.scores.seo} |` : '').join('\n')}

### Performance Metrics

| Page | FCP | LCP | TBT | CLS | SI |
|------|-----|-----|-----|-----|-----|
${lighthouseResults.map(r => r ? `| ${r.page} | ${r.metrics.fcp} | ${r.metrics.lcp} | ${r.metrics.tbt} | ${r.metrics.cls} | ${r.metrics.si} |` : '').join('\n')}

## Accessibility Issues (Pa11y)

| Page | Issues Found |
|------|--------------|
${pa11yResults.map(r => `| ${r.page} | ${r.issueCount || 0} |`).join('\n')}

## SEO Issues

| Page | Errors | Warnings |
|------|--------|----------|
${seoResults.map(r => r.summary ? `| ${r.page} | ${r.summary.errors} | ${r.summary.warnings} |` : `| ${r.page} | - | - |`).join('\n')}

## Recommendations

### High Priority
${generateHighPriorityRecommendations(lighthouseResults, pa11yResults, seoResults)}

### Medium Priority
${generateMediumPriorityRecommendations(lighthouseResults, pa11yResults, seoResults)}

### Low Priority
${generateLowPriorityRecommendations(lighthouseResults, pa11yResults, seoResults)}

## Detailed Reports

Individual reports for each page can be found in this directory:
- \`lighthouse-[page].html\` - Interactive Lighthouse reports
- \`lighthouse-[page].json\` - Raw Lighthouse data
- \`pa11y-[page].json\` - Accessibility issue details
- \`seo-[page].json\` - SEO audit details

## Next Steps

1. Review high-priority recommendations and create action items
2. Address critical accessibility issues (WCAG 2.0 AA violations)
3. Optimize pages with performance scores below 90
4. Fix SEO errors (missing meta tags, h1 issues, etc.)
5. Schedule follow-up audit after implementing fixes

---
*Generated by Investipal Website Audit Script*
`;

  const summaryPath = path.join(REPORT_DIR, 'audit-summary.md');
  await fs.writeFile(summaryPath, report);
  console.log(`✅ Summary report generated: ${summaryPath}`);
}

function generateHighPriorityRecommendations(lighthouse, pa11y, seo) {
  const recommendations = [];
  
  // Check for low performance scores
  const lowPerf = lighthouse.filter(r => r && r.scores.performance < 70);
  if (lowPerf.length > 0) {
    recommendations.push(`- **Improve Performance**: ${lowPerf.length} page(s) have performance scores below 70`);
  }
  
  // Check for accessibility scores
  const lowA11y = lighthouse.filter(r => r && r.scores.accessibility < 90);
  if (lowA11y.length > 0) {
    recommendations.push(`- **Fix Accessibility Issues**: ${lowA11y.length} page(s) have accessibility scores below 90`);
  }
  
  // Check for SEO errors
  const seoErrors = seo.filter(r => r.summary && r.summary.errors > 0);
  if (seoErrors.length > 0) {
    recommendations.push(`- **Fix SEO Errors**: ${seoErrors.length} page(s) have critical SEO errors`);
  }
  
  return recommendations.length > 0 ? recommendations.join('\n') : '- No critical issues found';
}

function generateMediumPriorityRecommendations(lighthouse, pa11y, seo) {
  const recommendations = [];
  
  // Check for moderate performance
  const medPerf = lighthouse.filter(r => r && r.scores.performance >= 70 && r.scores.performance < 90);
  if (medPerf.length > 0) {
    recommendations.push(`- **Optimize Performance**: ${medPerf.length} page(s) could benefit from performance improvements`);
  }
  
  // Check for best practices
  const lowBP = lighthouse.filter(r => r && r.scores.bestPractices < 90);
  if (lowBP.length > 0) {
    recommendations.push(`- **Improve Best Practices**: ${lowBP.length} page(s) have best practices scores below 90`);
  }
  
  // Check for SEO warnings
  const seoWarnings = seo.filter(r => r.summary && r.summary.warnings > 0);
  if (seoWarnings.length > 0) {
    recommendations.push(`- **Address SEO Warnings**: ${seoWarnings.length} page(s) have SEO optimization opportunities`);
  }
  
  return recommendations.length > 0 ? recommendations.join('\n') : '- No medium priority issues found';
}

function generateLowPriorityRecommendations(lighthouse, pa11y, seo) {
  const recommendations = [];
  
  recommendations.push('- Consider adding more structured data (JSON-LD) for rich snippets');
  recommendations.push('- Review and optimize images for better compression');
  recommendations.push('- Consider implementing Progressive Web App features');
  
  return recommendations.join('\n');
}

// Main execution
async function main() {
  console.log('🚀 Starting comprehensive website audit...\n');
  console.log(`📍 Base URL: ${BASE_URL}`);
  console.log(`📁 Report directory: ${REPORT_DIR}\n`);
  
  try {
    // Check if server is running
    try {
      await fetch(BASE_URL);
    } catch (error) {
      console.error('❌ Cannot connect to development server.');
      console.error(`Please start the server with: npm run dev`);
      process.exit(1);
    }
    
    await ensureReportDir();
    
    // Run audits for each page
    const lighthousePromises = [];
    const pa11yPromises = [];
    const seoPromises = [];
    
    for (const page of PAGES_TO_AUDIT) {
      // Run audits sequentially to avoid overwhelming the server
      await runLighthouse(page);
      await runPa11y(page);
      await runSEOChecks(page);
      console.log(''); // Empty line for readability
    }
    
    // Parse results
    console.log('📊 Parsing results...\n');
    const lighthouseResults = await Promise.all(
      PAGES_TO_AUDIT.map(page => parseLighthouseResults(page))
    );
    
    const pa11yResults = await Promise.all(
      PAGES_TO_AUDIT.map(async (page) => {
        try {
          const jsonPath = path.join(REPORT_DIR, `pa11y-${page.name}.json`);
          const data = await fs.readFile(jsonPath, 'utf-8');
          const results = JSON.parse(data);
          return { page: page.name, issueCount: results.length };
        } catch (error) {
          return { page: page.name, issueCount: 0 };
        }
      })
    );
    
    const seoResults = await Promise.all(
      PAGES_TO_AUDIT.map(async (page) => {
        try {
          const jsonPath = path.join(REPORT_DIR, `seo-${page.name}.json`);
          const data = await fs.readFile(jsonPath, 'utf-8');
          return JSON.parse(data);
        } catch (error) {
          return { page: page.name, summary: { errors: 0, warnings: 0 } };
        }
      })
    );
    
    // Generate summary
    await generateSummaryReport(lighthouseResults, pa11yResults, seoResults);
    
    console.log('\n✨ Audit complete!');
    console.log(`📁 Reports saved to: ${REPORT_DIR}`);
    console.log(`📄 Summary: ${path.join(REPORT_DIR, 'audit-summary.md')}`);
    
  } catch (error) {
    console.error('❌ Audit failed:', error);
    process.exit(1);
  }
}

main();

