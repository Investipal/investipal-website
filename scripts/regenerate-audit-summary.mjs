#!/usr/bin/env node

/**
 * Regenerate audit summary from existing reports
 */

import fs from 'fs/promises';
import path from 'path';

const REPORT_DIR = process.argv[2] || 'reports/audits/audit-2025-11-14';

const PAGES = ['home', 'blog', 'blog-post', 'features', 'pricing', 'about', 'contact'];

async function parseLighthouseResults(page) {
  try {
    const jsonPath = path.join(REPORT_DIR, `lighthouse-${page}.report.json`);
    const data = await fs.readFile(jsonPath, 'utf-8');
    const results = JSON.parse(data);
    
    return {
      page: page,
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
    console.error(`Error parsing Lighthouse results for ${page}:`, error.message);
    return null;
  }
}

async function parsePa11yResults(page) {
  try {
    const jsonPath = path.join(REPORT_DIR, `pa11y-${page}.json`);
    const data = await fs.readFile(jsonPath, 'utf-8');
    const results = JSON.parse(data);
    return { page: page, issueCount: results.length };
  } catch (error) {
    return { page: page, issueCount: 0 };
  }
}

async function parseSEOResults(page) {
  try {
    const jsonPath = path.join(REPORT_DIR, `seo-${page}.json`);
    const data = await fs.readFile(jsonPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { page: page, summary: { errors: 0, warnings: 0 } };
  }
}

function generateHighPriorityRecommendations(lighthouse, pa11y, seo) {
  const recommendations = [];
  
  const lowPerf = lighthouse.filter(r => r && r.scores.performance < 70);
  if (lowPerf.length > 0) {
    recommendations.push(`- **Improve Performance**: ${lowPerf.map(r => r.page).join(', ')} have performance scores below 70`);
  }
  
  const lowA11y = lighthouse.filter(r => r && r.scores.accessibility < 90);
  if (lowA11y.length > 0) {
    recommendations.push(`- **Fix Accessibility Issues**: ${lowA11y.map(r => r.page).join(', ')} have accessibility scores below 90`);
  }
  
  const seoErrors = seo.filter(r => r.summary && r.summary.errors > 0);
  if (seoErrors.length > 0) {
    recommendations.push(`- **Fix SEO Errors**: ${seoErrors.map(r => r.page).join(', ')} have critical SEO errors (missing title, description, or h1)`);
  }
  
  return recommendations.length > 0 ? recommendations.join('\n') : '- No critical issues found';
}

function generateMediumPriorityRecommendations(lighthouse, pa11y, seo) {
  const recommendations = [];
  
  const medPerf = lighthouse.filter(r => r && r.scores.performance >= 70 && r.scores.performance < 90);
  if (medPerf.length > 0) {
    recommendations.push(`- **Optimize Performance**: ${medPerf.map(r => r.page).join(', ')} could benefit from performance improvements`);
  }
  
  const lowBP = lighthouse.filter(r => r && r.scores.bestPractices < 90);
  if (lowBP.length > 0) {
    recommendations.push(`- **Improve Best Practices**: ${lowBP.map(r => r.page).join(', ')} have best practices scores below 90`);
  }
  
  const seoWarnings = seo.filter(r => r.summary && r.summary.warnings > 0);
  if (seoWarnings.length > 0) {
    recommendations.push(`- **Address SEO Warnings**: ${seoWarnings.map(r => r.page).join(', ')} have SEO optimization opportunities`);
  }
  
  return recommendations.length > 0 ? recommendations.join('\n') : '- No medium priority issues found';
}

async function main() {
  console.log('📊 Parsing audit results...');
  
  const lighthouseResults = await Promise.all(PAGES.map(page => parseLighthouseResults(page)));
  const pa11yResults = await Promise.all(PAGES.map(page => parsePa11yResults(page)));
  const seoResults = await Promise.all(PAGES.map(page => parseSEOResults(page)));
  
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
${lighthouseResults.filter(r => r).map(r => `| ${r.page} | ${r.scores.performance} | ${r.scores.accessibility} | ${r.scores.bestPractices} | ${r.scores.seo} |`).join('\n')}

### Performance Metrics

| Page | FCP | LCP | TBT | CLS | SI |
|------|-----|-----|-----|-----|-----|
${lighthouseResults.filter(r => r).map(r => `| ${r.page} | ${r.metrics.fcp} | ${r.metrics.lcp} | ${r.metrics.tbt} | ${r.metrics.cls} | ${r.metrics.si} |`).join('\n')}

### Performance Analysis

**Key Findings:**
${lighthouseResults.filter(r => r).map(r => {
  const issues = [];
  if (r.scores.performance < 70) issues.push('Poor performance');
  if (r.scores.performance >= 70 && r.scores.performance < 90) issues.push('Moderate performance');
  if (parseFloat(r.metrics.lcp) > 2.5) issues.push('Slow LCP');
  if (parseFloat(r.metrics.fcp) > 1.8) issues.push('Slow FCP');
  return issues.length > 0 ? `- **${r.page}**: ${issues.join(', ')}` : null;
}).filter(Boolean).join('\n') || '- All pages have good performance scores'}

## Accessibility Issues (Pa11y)

| Page | Issues Found |
|------|--------------|
${pa11yResults.map(r => `| ${r.page} | ${r.issueCount} |`).join('\n')}

**Total Accessibility Issues:** ${pa11yResults.reduce((sum, r) => sum + r.issueCount, 0)}

## SEO Issues

| Page | Errors | Warnings |
|------|--------|----------|
${seoResults.map(r => r.summary ? `| ${r.page} | ${r.summary.errors} | ${r.summary.warnings} |` : `| ${r.page} | - | - |`).join('\n')}

**Total SEO Issues:** ${seoResults.reduce((sum, r) => sum + (r.summary ? r.summary.errors + r.summary.warnings : 0), 0)}

### Common SEO Issues

${await generateSEOIssuesSummary(seoResults)}

## Recommendations

### High Priority (Fix Immediately)
${generateHighPriorityRecommendations(lighthouseResults, pa11yResults, seoResults)}

### Medium Priority (Fix Soon)
${generateMediumPriorityRecommendations(lighthouseResults, pa11yResults, seoResults)}

### Low Priority (Nice to Have)
- Consider adding more structured data (JSON-LD) for rich snippets
- Review and optimize images for better compression
- Consider implementing Progressive Web App features
- Add more comprehensive Open Graph and Twitter Card tags

## Detailed Reports

Individual reports for each page can be found in this directory:
- \`lighthouse-[page].report.html\` - Interactive Lighthouse reports
- \`lighthouse-[page].report.json\` - Raw Lighthouse data
- \`pa11y-[page].json\` - Accessibility issue details
- \`seo-[page].json\` - SEO audit details

## Next Steps

1. **Immediate Actions:**
   - Fix critical SEO errors (missing titles, descriptions, h1 tags)
   - Address performance issues on pages with scores below 70
   - Review and fix accessibility issues

2. **Short-term Actions:**
   - Optimize images and assets for better performance
   - Add missing meta tags and Open Graph data
   - Improve page load times (LCP, FCP)

3. **Long-term Actions:**
   - Implement structured data across all pages
   - Set up performance monitoring
   - Schedule regular audits (monthly)

---
*Generated by Investipal Website Audit Script*
*Report Directory: ${REPORT_DIR}*
`;

  const summaryPath = path.join(REPORT_DIR, 'audit-summary.md');
  await fs.writeFile(summaryPath, report);
  console.log(`✅ Summary report generated: ${summaryPath}`);
}

async function generateSEOIssuesSummary(seoResults) {
  const issueTypes = {};
  
  for (const result of seoResults) {
    if (result.issues) {
      for (const issue of result.issues) {
        const key = issue.message.split(':')[0];
        if (!issueTypes[key]) {
          issueTypes[key] = { count: 0, pages: [] };
        }
        issueTypes[key].count++;
        issueTypes[key].pages.push(result.page);
      }
    }
  }
  
  const sorted = Object.entries(issueTypes)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5);
  
  if (sorted.length === 0) {
    return '- No common SEO issues found';
  }
  
  return sorted.map(([issue, data]) => 
    `- **${issue}**: Found on ${data.count} page(s) (${data.pages.join(', ')})`
  ).join('\n');
}

main();

