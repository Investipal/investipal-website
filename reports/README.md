# Reports Index

This folder contains generated reports for the Investipal website project.

## Directory Structure

```
reports/
├── analytics/          # Google Analytics & Search Console reports
├── audits/            # Performance and accessibility audits
├── validation/        # Content validation reports
└── [various files]    # Legacy reports and artifacts
```

## Report Categories

### 📊 Analytics Reports (`analytics/`)
**Monthly analytics reports combining Google Search Console and Google Analytics 4 data.**

- Traffic analysis and trends
- Organic search performance
- User behavior and engagement
- Conversion tracking
- Action plans and recommendations

**Latest Report:** `analytics/2025-01/combined-analytics-report.md`

See [Analytics README](./analytics/README.md) for details.

### 🔍 Audit Reports (`audits/`)
**Performance, accessibility, and SEO audits organized by timestamp.**

- Lighthouse performance scores
- Pa11y accessibility checks
- SEO optimization audits
- Page speed analysis

Each audit folder contains:
- `audit-summary.md` - Executive summary
- `lighthouse-*.html` - Lighthouse reports
- `pa11y-*.txt` - Accessibility reports
- `README.md` - Audit details

**Latest Audit:** `audits/2025-09-17T12-02-07-791Z/`

### ✅ Validation Reports (`validation/`)
**Content and markup validation reports.**

- Markdown validation
- Link checking
- Content structure validation

## Legacy Reports (Root Level)

### Sitemap & Crawl Data
- `sitemap*.xml` - Sitemap artifacts
- `crawl_*.json` - Site crawl results
- `robots.txt` - Robots.txt snapshot

### Performance Data
- `lighthouse-*.json` - Lighthouse outputs
- `home*.json` - Homepage performance
- `feature*.json` - Feature page performance
- `webinars*.json` - Webinar page performance

### Content Audits
- `semantic-link-audit.json` - Internal linking report
- `blog-*.json` - Blog content analysis
- `url_parity.json` - URL consistency check
- `missing_in_staging.csv` - Content gaps

### Build & Type Checking
- `astro-check.txt` - Astro/TypeScript check output

## Report Schedule

### Monthly
- **Analytics Reports** (23rd of each month)
  - Google Search Console data
  - Google Analytics 4 metrics
  - Combined insights and action plans

### Quarterly
- **Comprehensive Audits**
  - Performance benchmarking
  - Accessibility compliance
  - SEO health check
  - Content quality review

### Ad-Hoc
- **Validation Reports** (as needed)
- **Crawl Reports** (before major releases)
- **Link Audits** (after content updates)

## How to Generate Reports

### Analytics Reports
```powershell
# See scripts in google-analytics-mcp/ for data collection
# Reports are generated manually using API data
```

### Audit Reports
```bash
# Run comprehensive audit
npm run audit

# Run specific audits
npm run lighthouse
npm run pa11y
```

### Validation Reports
```bash
# Validate markdown
npm run validate:markdown

# Check links
npm run check:links
```

## Related Documentation

- [Project Plan](../project.plan.md)
- [AI CMO Documentation](../docs/ai-cmo/)
- [Scripts Documentation](../scripts/README.md)

---

**Last Updated:** January 23, 2025
