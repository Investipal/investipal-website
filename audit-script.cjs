#!/usr/bin/env node

/**
 * Comprehensive Audit Script for Investipal
 * 
 * This script runs Lighthouse and Pa11y audits on all important pages
 * and generates comprehensive reports for SEO, performance, and accessibility.
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Pages to audit
const pages = [
  { name: 'Homepage', url: 'http://localhost:4321' },
  { name: 'Wealth Managers', url: 'http://localhost:4321/segments/wealth-managers' },
  { name: 'Wealth Firms', url: 'http://localhost:4321/segments/wealth-firms' },
  { name: 'Financial Planners', url: 'http://localhost:4321/segments/financial-planners' },
  { name: 'Insurance', url: 'http://localhost:4321/segments/insurance' },
  { name: 'AI Engagement', url: 'http://localhost:4321/features/ai-driven-engagement' },
  { name: 'Asset Allocation', url: 'http://localhost:4321/features/asset-allocation' },
  { name: 'Statement Scanner', url: 'http://localhost:4321/features/automated-statement-scanner' },
  { name: 'Client Acquisition', url: 'http://localhost:4321/features/client-acquisition' },
  { name: 'Risk Management', url: 'http://localhost:4321/features/risk-management' }
];

const runCommand = (command, args) => {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, { shell: true });
    let output = '';
    let error = '';

    process.stdout.on('data', (data) => {
      output += data.toString();
    });

    process.stderr.on('data', (data) => {
      error += data.toString();
    });

    process.on('close', (code) => {
      if (code === 0 || code === 1) { // Pa11y returns 1 when issues found
        resolve({ output, error, code });
      } else {
        reject(new Error(`Command failed with code ${code}: ${error}`));
      }
    });
  });
};

async function runAudits() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportDir = `audit-reports-${timestamp}`;
  
  // Create reports directory
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
  }

  console.log('🔍 Starting comprehensive audit...\n');

  for (const page of pages) {
    console.log(`📊 Auditing: ${page.name}`);
    
    try {
      // Run Lighthouse audit
      console.log(`  🚨 Running Lighthouse for ${page.name}...`);
      const lighthouseCommand = [
        page.url,
        '--output', 'html',
        '--output-path', `${reportDir}/lighthouse-${page.name.toLowerCase().replace(/\s+/g, '-')}.html`,
        '--chrome-flags="--headless"',
        '--quiet'
      ];
      
      await runCommand('lighthouse', lighthouseCommand);
      
      // Run Pa11y audit
      console.log(`  ♿ Running Pa11y for ${page.name}...`);
      const pa11yResult = await runCommand('pa11y', [page.url]);
      
      // Save Pa11y results
      const pa11yFileName = `${reportDir}/pa11y-${page.name.toLowerCase().replace(/\s+/g, '-')}.txt`;
      fs.writeFileSync(pa11yFileName, pa11yResult.output);
      
      if (pa11yResult.code === 0) {
        console.log(`  ✅ ${page.name}: No accessibility issues found`);
      } else {
        console.log(`  ⚠️  ${page.name}: Accessibility issues found (see report)`);
      }
      
    } catch (error) {
      console.error(`  ❌ Error auditing ${page.name}:`, error.message);
    }
    
    console.log('');
  }

  // Generate summary report
  console.log('📋 Generating audit summary...');
  const summaryPath = `${reportDir}/audit-summary.md`;
  const summary = generateSummary(reportDir, pages);
  fs.writeFileSync(summaryPath, summary);

  console.log(`\n🎉 Audit complete! Reports saved in: ${reportDir}/`);
  console.log(`📊 Open the HTML files in your browser to view detailed Lighthouse reports`);
  console.log(`♿ Check the .txt files for Pa11y accessibility findings`);
  console.log(`📋 View ${summaryPath} for a comprehensive summary`);
}

function generateSummary(reportDir, pages) {
  const now = new Date();
  return `# Investipal Website Audit Summary

**Generated:** ${now.toLocaleString()}

## 🔍 Audit Tools Used

- **[Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)**: Performance, SEO, Best Practices, Accessibility
- **[Pa11y](https://pa11y.org/)**: Accessibility compliance (WCAG 2.1 AA)

## 📊 Pages Audited

${pages.map(page => `- **${page.name}**: [${page.url}](${page.url})`).join('\n')}

## 📁 Report Files

### Lighthouse Reports (Performance, SEO, Best Practices)
${pages.map(page => `- \`lighthouse-${page.name.toLowerCase().replace(/\s+/g, '-')}.html\``).join('\n')}

### Pa11y Reports (Accessibility)
${pages.map(page => `- \`pa11y-${page.name.toLowerCase().replace(/\s+/g, '-')}.txt\``).join('\n')}

## 🚀 Key Areas to Monitor

### Performance Metrics
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s  
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Total Blocking Time (TBT)**: < 200ms

### SEO Essentials
- ✅ Meta descriptions
- ✅ Title tags optimization
- ✅ Structured data
- ✅ Mobile-friendly design
- ✅ Page load speed

### Accessibility Standards
- ✅ WCAG 2.1 AA compliance
- ✅ Keyboard navigation
- ✅ Screen reader compatibility
- ✅ Color contrast ratios

## 🔄 Next Steps

1. **Review Lighthouse reports** for performance opportunities
2. **Check Pa11y findings** for accessibility improvements  
3. **Implement optimizations** based on recommendations
4. **Re-run audits** to verify improvements
5. **Set up automated monitoring** in CI/CD pipeline

## 📞 Resources

- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/overview/)
- [Pa11y Documentation](https://pa11y.org/)
- [Web.dev Performance](https://web.dev/performance/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
`;
}

// Run the audit
if (require.main === module) {
  runAudits().catch(console.error);
}

module.exports = { runAudits };




