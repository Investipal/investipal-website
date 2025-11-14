# Audit Reports (Consolidated Index)

Canonical index for audit artifacts, mirroring legacy `audit-reports-*` folders.

## Latest Audit
**📊 [audit-2025-11-14](./audit-2025-11-14/)** - Comprehensive Lighthouse, Pa11y, and SEO audit

**Quick Links:**
- [Executive Summary](./audit-2025-11-14/EXECUTIVE-SUMMARY.md) - High-level overview for stakeholders
- [Action Items](./audit-2025-11-14/ACTION-ITEMS.md) - 34 prioritized tasks with estimates
- [Technical Details](./audit-2025-11-14/README.md) - Deep dive into findings
- [Index](./audit-2025-11-14/INDEX.md) - Complete file listing

**Key Findings:**
- Overall Site Health: 77.5/100
- Performance: 55/100 (Critical - needs immediate attention)
- Accessibility: 95/100 (Excellent)
- SEO: 75/100 (Good, needs improvement)
- 8 critical issues identified
- 12 high-priority improvements recommended

## Previous Audits

### Timestamps
- `2025-11-14/` — **Latest** - Comprehensive audit (Lighthouse, Pa11y, SEO)
- `2025-09-17T12-02-07-791Z/` — Lighthouse (HTML), Pa11y (TXT), Lighthouse JSON
- `2025-09-16T21-23-25-155Z/` — Lighthouse (HTML) and Pa11y (TXT)
- `2025-09-16T12-58-17-488Z/` — Lighthouse (HTML) and Pa11y (TXT)

## Audit Schedule

- **Frequency:** Monthly
- **Next Audit:** December 14, 2025
- **Focus Areas:** Performance, Accessibility, SEO, Best Practices

## How to Run Audits

### Automated Comprehensive Audit
```bash
# Start dev server
npm run dev

# In another terminal, run audit
node scripts/run-comprehensive-audit.mjs
```

### Individual Tools
```bash
# Lighthouse only
npm run audit:lighthouse

# Pa11y only
npm run audit:pa11y

# Astro type checking
npm run audit:check
```

## Notes
- Original folders remain in repo root for backward compatibility.
- Prefer linking to these consolidated paths going forward.
- All new audits should use the `audit-YYYY-MM-DD` naming format.
