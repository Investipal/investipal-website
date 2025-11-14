# Analytics Reports

This directory contains comprehensive analytics reports for Investipal.co, combining data from Google Search Console, Google Analytics 4, and other analytics platforms.

## Directory Structure

```
analytics/
├── README.md (this file)
├── 2025-01/
│   └── combined-analytics-report.md (GSC + GA4 - Jan 2025)
└── [future months]/
```

## Report Types

### Combined Analytics Reports
- **Frequency:** Monthly
- **Sources:** Google Search Console + Google Analytics 4
- **Contents:**
  - Organic search performance (GSC)
  - Overall traffic and engagement metrics (GA4)
  - Traffic source breakdown
  - Top pages and content performance
  - Device and geographic distribution
  - Critical issues and recommendations
  - Action plans and success metrics

## Latest Report

**📊 January 2025 Combined Report**
- **File:** `2025-01/combined-analytics-report.md`
- **Date Range:** October 23, 2024 - January 23, 2025 (90 days)
- **Key Findings:**
  - 🚨 CRITICAL: No conversion tracking set up in GA4
  - 87.5% direct traffic (suspicious - likely tracking issues)
  - 798 organic search clicks (GSC) vs 17,597 total sessions (GA4)
  - Strong organic search engagement (203s avg duration)
  - Email and social channels severely underutilized

## Key Metrics Overview (Last 90 Days)

### Traffic
- **Total Sessions:** 17,597
- **Total Users:** 16,067
- **Page Views:** 55,557
- **Bounce Rate:** 38.8%

### Organic Search (GSC)
- **Clicks:** 798
- **Impressions:** 65,956
- **CTR:** 1.21%
- **Avg Position:** 45.5

### Top Traffic Sources
1. Direct: 87.5% (needs investigation)
2. Organic Search: 8.9%
3. Referral: 2.1%
4. Social: 0.3%
5. Email: <0.1%

## Critical Action Items

### Immediate (Week 1)
- [ ] Set up GA4 conversion tracking
- [ ] Fix UTM parameter tracking
- [ ] Audit direct traffic attribution
- [ ] Optimize book-a-demo page

### Short-term (Month 1)
- [ ] Launch email newsletter
- [ ] Increase LinkedIn posting frequency
- [ ] Rewrite meta descriptions for top 20 pages
- [ ] Create lead magnets

### Long-term (Quarter 1)
- [ ] Build backlinks to top blog posts
- [ ] Expand AI/automation content
- [ ] Launch referral program
- [ ] Consider paid advertising

## Report Schedule

- **Monthly Reports:** Generated on the 23rd of each month
- **Quarterly Reviews:** Deep dive analysis every 3 months
- **Annual Summary:** Comprehensive year-over-year analysis

## Data Sources

### Google Search Console
- **Property:** sc-domain:investipal.co
- **Access:** OAuth authenticated
- **Metrics:** Clicks, impressions, CTR, position, queries, pages

### Google Analytics 4
- **Property:** 398871396 (Webflow)
- **Account:** 210880601 (Investipal)
- **Access:** OAuth authenticated
- **Metrics:** Sessions, users, page views, bounce rate, traffic sources, conversions

## How to Generate Reports

1. **Authenticate with Google:**
   - Ensure OAuth tokens are valid for both GSC and GA4
   - Tokens typically expire after 3599 seconds

2. **Run Data Collection:**
   ```powershell
   # Example API calls are documented in the scripts/ directory
   ```

3. **Generate Report:**
   - Combine GSC and GA4 data
   - Analyze trends and patterns
   - Identify critical issues
   - Create actionable recommendations

4. **Save Report:**
   - Create new directory: `reports/analytics/YYYY-MM/`
   - Save as: `combined-analytics-report.md`
   - Update this README with latest findings

## Metrics to Track

### Traffic Metrics
- Organic search sessions growth
- Direct traffic percentage (target: <50%)
- Email traffic growth
- Social traffic growth

### Engagement Metrics
- Average session duration (target: 120s+)
- Bounce rate (target: <40%)
- Pages per session (target: 4.0+)

### Conversion Metrics
- Demo booking conversion rate (target: 2-5%)
- Email signup conversion rate (target: 3-8%)
- Form completion rates

### Content Metrics
- Blog traffic growth
- Blog post average duration (target: 150s+)
- Podcast page views growth

## Related Documentation

- [Project Plan](../../project.plan.md)
- [AI CMO Documentation](../../docs/ai-cmo/)
- [Audit Reports](../audits/)
- [SEO Scripts](../../scripts/seo/)

## Contact

For questions about analytics reports or data access, contact the marketing team.

---

**Last Updated:** January 23, 2025












