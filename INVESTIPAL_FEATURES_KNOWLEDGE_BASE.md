# Investipal Features & Capabilities Knowledge Base

**Last Updated:** November 26, 2025  
**Purpose:** Master reference for all Investipal features, capabilities, integrations, and product positioning.

---

## 🎯 Product Overview

**Investipal** is an all-in-one wealth management platform for RIAs, providing portfolio management, client onboarding, compliance, and proposal generation in a single platform.

**Target Market:** RIAs of all sizes—from solo advisors to large multi-advisor firms (100+ advisors)

**Key Differentiators:**
1. AI-powered automation (statement scanning, portfolio commentary)
2. Liquidity optimization for retirement planning
3. Multi-asset portfolio support (equities, bonds, alternatives, annuities)
4. 60-second IPS generation
5. All-in-one platform (no fragmented tools)

---

## 📊 Core Features

### 1. **Client Acquisition & Onboarding**

#### **Risk Assessment Questionnaire**
- Digital questionnaire for client risk tolerance
- Determines risk profile (conservative → aggressive)
- Integrated with portfolio recommendations
- Compliance-ready (Reg BI, suitability)

#### **Brokerage Statement Scanning (AI/OCR)**
- **How it works:** Upload PDF statement → AI extracts holdings, cost basis, dividends
- **Accuracy:** 99.5% (human review catches edge cases)
- **Time savings:** 50-page statement → data table in 2 minutes vs. 30-60 minutes manual
- **Supported brokerages:** All major brokerages (Schwab, Fidelity, TD Ameritrade, etc.)

#### **Plaid Connection (Account Aggregation)**
- Connect client accounts via Plaid
- Auto-sync balances, holdings, transactions
- Alternative to statement scanning

#### **Client Onboarding Portal**
- **Features:**
  - Risk assessment completion
  - Statement upload (or Plaid connection)
  - Personal information forms
  - AML (Anti-Money Laundering) checks
  - E-signature for advisory agreements
- **Schwab Integration:** Directly open Schwab accounts from within Investipal
- **Time savings:** 3-5 days → same day onboarding

#### **Proposal Generation**
- **How it works:** 
  1. Scan/import current portfolio
  2. Run liquidity optimization + comparative analysis
  3. Design proposed portfolio
  4. Generate branded proposal with AI commentary
- **Time savings:** 2-4 hours → 10 minutes
- **Features:**
  - Customizable branding (logo, colors, disclosures)
  - AI-generated personalized commentary (explains why proposed portfolio fits client)
  - Comparative analysis (current vs. proposed)
  - Performance projections (Monte Carlo)
  - IPS attached

---

### 2. **Portfolio Analysis & Design**

#### **Portfolio Analysis (Current Holdings)**
- **Data inputs:** Brokerage statements, Plaid, manual entry, CSV upload
- **Analysis includes:**
  - Asset allocation breakdown
  - Sector/geographic exposure
  - Factor exposure (quality, value, growth, momentum, dividend, ESG, low vol)
  - Correlation matrix
  - Risk metrics (volatility, Sharpe ratio, max drawdown, beta, VaR, CVaR)
  - Fee analysis
  - Performance attribution

#### **Comparative Portfolio Analysis**
- **How it works:** Compare current portfolio vs. proposed portfolio(s) side-by-side
- **Can compare multiple models at once:** Test 5-10 portfolio strategies simultaneously
- **Analysis includes:**
  - Performance comparison (historical returns, projections)
  - Asset breakdown (equities, bonds, cash, alternatives)
  - Factor exposure comparison
  - Sector/geographic/bond exposure
  - Fee comparison
  - Correlation comparison
  - Risk metrics comparison
- **Use case:** Find optimal portfolio fit for client by comparing multiple strategies
- **Time savings:** 5 minutes for comprehensive multi-model analysis vs. 2+ hours manual

#### **Liquidity Optimization** ⭐ **UNIQUE FEATURE**
- **How it works:** 
  1. Input client spending needs by year (e.g., $50K/year for 10 years)
  2. System analyzes portfolio liquidity profile
  3. Output: Liquidity quadrant, daily liquid surplus/requirements, contingent reserves, illiquid allocation limits
- **Liquidity Quadrant:** Visual breakdown of:
  - **Income allocation:** Liquid assets for near-term spending
  - **Growth allocation:** Long-term growth assets
  - **Public vs. Private:** Separation of liquid vs. illiquid holdings
- **Metrics provided:**
  - Daily liquid requirement vs. provided
  - Contingent reserves (lower bound vs. provided)
  - Illiquid allocation (actual vs. maximum allowed)
- **Use cases:**
  - Retirement income planning (ensure adequate liquid reserves)
  - High-net-worth liquidity management
  - Annuity/structured product allocation planning
- **Time savings:** 30 minutes manual analysis → 2 minutes automated
- **Competitor gap:** No other platform has this feature

#### **Monte Carlo Simulation**
- Probabilistic projections of portfolio outcomes
- Show probability of achieving financial goals
- Example: "90% probability of $2M in 20 years with $100K/year spending"

#### **Scenario Analysis**
- Test portfolio performance under different market conditions
- Custom scenarios (recession, inflation, bull market, etc.)

---

### 3. **Portfolio Construction & Management**

#### **Portfolio Design**
- **How it works:** Advisors manually select securities and set target allocations
- **Inputs:**
  - Manual security selection
  - CSV upload (ticker, weight) for bulk setup
  - Target allocations by asset class
- **Supported asset classes:**
  - Equities (stocks, ETFs, mutual funds)
  - Fixed income (bonds, bond funds)
  - Alternatives (private equity, real estate, hedge funds)
  - Annuities (fixed, variable, indexed)
  - Custom securities (structured products, private placements)

#### **Portfolio Optimization Methods**
- **4 Optimization Methods for Portfolio Design:**
  1. **Equal Weight:** Equal allocation to all holdings
  2. **Minimum Volatility:** Optimize for lowest portfolio volatility
  3. **Maximum Sharpe:** Optimize for highest risk-adjusted return
  4. **Factor-Based:** Target specific factor exposures (value, growth, quality, etc.)

**Important:** Investipal is a portfolio DESIGN and ANALYSIS platform—not a trading or execution system. Advisors design portfolios in Investipal, then execute through their custodian (Schwab, etc.).

#### **Custom Securities Builder** ⭐
- **How it works:** Model any non-standard security
- **Use cases:**
  - Annuities (fixed, variable, indexed)
  - Structured products (market-linked notes, equity-linked notes)
  - Private placements
  - Custom fixed income
- **Inputs:** Expected return, volatility, correlation, liquidity constraints

#### **Alternatives Database** ⭐
- **Pre-built models for:**
  - Private equity funds
  - Real estate (REITs, private real estate)
  - Hedge funds
  - Commodities
  - Infrastructure
- **Integration:** Add alternatives to portfolios alongside traditional assets
- **Use case:** Build 70% stocks/bonds + 20% private real estate + 10% structured notes portfolio

---

### 4. **AI-Powered Features**

#### **AI-Generated Portfolio Commentary** ⭐ **UNIQUE FEATURE**
- **How it works:** AI analyzes portfolio holdings + market conditions → generates personalized commentary
- **Two use cases:**
  1. **Client reporting:** Quarterly updates for existing clients
  2. **Proposal personalization:** Explain why proposed portfolio fits prospect
- **Example output:** 
  > "Your portfolio's 25% tech allocation performed well this quarter due to AI momentum, driving a +12% return. However, your bond holdings faced headwinds from rate volatility, with your 10-year Treasury position down -3%. Overall, your diversified allocation helped cushion volatility, with a net portfolio return of +5.2%."
- **Time savings:** 30 minutes per client → 2 minutes automated
- **Tone:** Professional, personalized, advisor-like
- **Competitor gap:** No other platform has AI writing personalized market commentary

#### **AI Statement Scanning (OCR + ML)**
- See "Brokerage Statement Scanning" under Client Onboarding
- **Technology:** Optical Character Recognition (OCR) + Machine Learning
- **Accuracy:** 99.5%
- **Supported formats:** PDF, images, scanned documents

#### **Portfolio Sentiment Tracking**
- **What it tracks:** Market sentiment specific to portfolio holdings
- **Output:** Bullish/bearish sentiment score
- **Integration:** Powers AI commentary generation

---

### 5. **Compliance & Documentation**

#### **IPS (Investment Policy Statement) Creation** ⭐
- **How it works:** Risk questionnaire → IPS in 60 seconds
- **Fully compliant:** SEC, FINRA, state regulations
- **Customizable:** Firm-specific policies, disclosures, methodologies
- **Time savings:** 4-6 hours manual → 60 seconds automated
- **Output formats:** PDF, Word (editable)
- **Competitor gap:** Most platforms have no IPS automation

#### **Reg BI Creation**
- **How it works:** Auto-generate Regulation Best Interest disclosures
- **Includes:** Conflict of interest disclosures, material limitations, alternatives considered
- **Status:** Available but barely used by advisors (low demand)
- **Output:** Compliant PDF

#### **E-Signature for Advisory Agreements**
- Integrated e-signature (via DocuSign or similar)
- Send agreements for client signature from within platform
- Track signature status

---

### 6. **Integrations**

#### **CRM Integrations**
- **Salesforce** ✅
- **Wealthbox** ✅
- **Redtail** ✅
- **Note:** Investipal is NOT a CRM—it integrates with existing CRMs

#### **Custodian Integrations**
- **Schwab** ✅ (includes account opening)
- **More custodians coming soon** (Fidelity, TD Ameritrade, etc.)

#### **Account Aggregation**
- **Plaid** ✅ (connects to all major banks/brokerages)

---

## 🚀 Coming Soon Features

### **Digital Proposals (Enhanced)**
- **Release:** Q1 2026
- **Features:**
  - Interactive proposals (not static PDF)
  - Clients can view proposals online
  - E-signature integrated
  - Accept/reject functionality
  - Call-to-action to proceed to next steps
  - Real-time proposal tracking

### **AI Workflow Builder**
- **Release:** Q2 2026
- **What it does:** Automate repetitive advisor workflows
- **Examples:**
  - Auto-send quarterly reports when portfolio performance updates
  - Auto-rebalance portfolios when drift exceeds threshold
  - Auto-generate IPS when new client completes risk assessment
  - Custom triggers + actions

---

## ❌ Features We DO NOT Have

### **Removed Features:**
- **AI Portfolio Construction/Optimization:** REMOVED (as of Nov 2025)
  - We do NOT automatically build portfolios
  - Advisors manually design portfolios
  - We provide rebalancing automation, but NOT initial construction

### **Not Provided:**
- **Free templates/downloadable resources:** We do NOT offer free IPS templates, checklists, or downloadable resources
- **Built-in CRM:** We integrate with CRMs, but are NOT a CRM
- **Tax-loss harvesting:** Not currently available
- **Built-in billing/invoicing:** Not available (integrate with billing software)
- **Client portal for performance viewing:** Not available (coming with digital proposals)

---

## 🎯 Product Positioning

### **Target Customer:**
- **Firm size:** RIAs of all sizes (solo to 100+ advisors)
- **AUM:** $10M - $500M
- **Advisor type:** Fee-only RIAs, hybrid RIAs
- **Use cases:**
  - Advisors who want all-in-one platform (not fragmented tools)
  - Advisors working with alternatives/annuities
  - Advisors doing retirement income planning (liquidity optimization)
  - Advisors who want AI automation (commentary, scanning)

### **Competitive Advantages:**

| Feature | Investipal | Competitors |
|---------|-----------|-------------|
| **Liquidity optimization** | ✅ Unique | ❌ None have this |
| **AI portfolio commentary** | ✅ Unique | ❌ None have this |
| **AI statement scanning** | ✅ | ❌ Most require manual entry |
| **60-second IPS generation** | ✅ | ❌ Most have no automation |
| **Multi-asset support** | ✅ Full (stocks, bonds, alts, annuities) | Partial (most are stocks/bonds only) |
| **All-in-one platform** | ✅ | ❌ Most are fragmented |
| **Ease of use** | ✅ Simple UI, fast setup | Complex, steep learning curve |

### **When to Choose Investipal:**
- ✅ Need liquidity optimization (retirement planning)
- ✅ Work with alternatives/annuities
- ✅ Want AI automation (save 30+ min/client)
- ✅ Want all-in-one (no integration headaches)
- ✅ Budget-conscious (vs. $10K+/year enterprise platforms)
- ✅ RIAs of all sizes (solo to 100+ advisors)

### **When NOT to Choose Investipal:**
- ❌ Need built-in CRM (use Salesforce/Wealthbox + Investipal)
- ❌ Need tax-loss harvesting
- ❌ Need client billing/invoicing
- ❌ Large enterprise RIA (100+ advisors) needing complex workflows

---

## 📈 Key Metrics & Time Savings

| Task | Manual Time | Investipal Time | Time Saved |
|------|-------------|-----------------|------------|
| **Scan 50-page statement** | 30-60 min | 2 min | 28-58 min |
| **Generate IPS** | 4-6 hours | 60 seconds | 4-6 hours |
| **Generate proposal** | 2-4 hours | 10 min | 1.5-3.5 hours |
| **Client onboarding** | 3-5 days | Same day | 2-4 days |
| **Write portfolio commentary** | 30 min | 2 min | 28 min |
| **Liquidity analysis** | 30 min | 2 min | 28 min |
| **Comparative portfolio analysis** | 2+ hours | 5 min | 1.5+ hours |

**Total time saved per client:** 8-12 hours  
**Annual time saved (50 clients/year):** 400-600 hours

---

## 🔧 Technical Details

### **Supported File Formats:**
- **Import:** PDF, CSV, Excel, Plaid (API)
- **Export:** PDF, Word, CSV, Excel

### **Security:**
- SOC 2 Type II compliant
- 256-bit encryption
- Two-factor authentication
- Role-based access control

### **Platform:**
- Web-based (browser access)
- No desktop app required
- Mobile-responsive

---

## 💡 Use Cases & Examples

### **Use Case 1: Retirement Income Planning**
**Client:** 65-year-old retiree, $2M portfolio, needs $80K/year spending
**Investipal workflow:**
1. Scan client's current brokerage statement (2 min)
2. Run liquidity optimization with $80K/year for 30 years (2 min)
3. Review liquidity quadrant → identify need for more liquid reserves
4. Design portfolio: 40% income (bonds, dividends) + 60% growth (stocks)
5. Run comparative analysis (current vs. proposed)
6. Generate proposal with AI commentary explaining liquidity strategy (5 min)
7. Client accepts → onboard via digital portal (same day)

**Total time:** 10-15 minutes vs. 4-6 hours manual

---

### **Use Case 2: Alternative Investment Allocation**
**Client:** High-net-worth, $5M portfolio, wants 20% in private real estate
**Investipal workflow:**
1. Import current portfolio via Plaid (1 min)
2. Add private real estate from alternatives database (2 min)
3. Build portfolio: 60% stocks/bonds + 20% private real estate + 20% custom annuity
4. Run Monte Carlo simulation (1 min)
5. Generate proposal (5 min)

**Total time:** 10 minutes vs. 3+ hours manual (most platforms don't support alts)

---

### **Use Case 3: Quarterly Client Reporting (50 clients)**
**Investipal workflow:**
1. Run portfolio analysis for all 50 clients (5 min)
2. Generate AI commentary for each client (2 min per client = 100 min total)
3. Export reports (5 min)

**Total time:** ~2 hours vs. 25 hours manual (30 min per client)

---

## 📋 Workflows

### **Typical Advisor Workflow in Investipal:**

```
Prospect Intake
    ↓
Risk Assessment Questionnaire (5 min)
    ↓
Statement Scanning or Plaid Connection (2 min)
    ↓
Portfolio Analysis + Liquidity Optimization (3 min)
    ↓
Portfolio Design (10-20 min)
    ↓
Comparative Analysis (5 min)
    ↓
Proposal Generation w/ AI Commentary (5 min)
    ↓
IPS + Reg BI Generation (1 min)
    ↓
Send Proposal to Prospect
    ↓
[Client accepts]
    ↓
Client Onboarding Portal (same day)
    ↓
Schwab Account Opening (integrated)
    ↓
Portfolio Implementation
    ↓
Automated Rebalancing (ongoing)
    ↓
AI-Generated Quarterly Reports (ongoing)
```

**Total time from prospect to client:** 1-2 days vs. 1-2 weeks traditional

---

## 🎨 Screenshots Reference

*Note: Screenshot file paths for reference in content creation*

- Client onboarding portal: `/images/product_screenshots/client_onboarding_portal_v3_2025-11-11.png`
- Proposal cover page: `/images/product_screenshots/proposal_cover_page_v3_2025-11-14.png`
- Client overview/performance: `/images/product_screenshots/client_overview_performance_v1_2025-11-14.png`
- Liquidity optimization: See user-provided screenshots in conversation (Liquidity Quadrant, Summary tab, Analysis tab, Holdings tab, Comparative Analysis)

---

## 📝 Notes & Guidelines

### **Pricing Guidance:**
- ❌ **DO NOT state pricing anywhere** (per user instruction Nov 26, 2025)
- ❌ Do NOT mention "$49/month" or any specific pricing
- ✅ Focus on value, time savings, ROI, capacity gains

### **Free Resources:**
- ❌ **DO NOT offer free templates/downloadables** (per user instruction Nov 26, 2025)
- ❌ Do NOT mention "free IPS template," "free download," "free checklist"
- ✅ Focus on Investipal's IPS generator feature (not templates)

### **Removed Features:**
- ❌ **DO NOT mention "AI portfolio construction/optimization"** (removed Nov 2025)
- ✅ Emphasize: "Advisor-designed portfolios with automated rebalancing"
- ✅ Clarify: Advisors manually design, Investipal automates rebalancing

---

**END OF KNOWLEDGE BASE**

*This document should be updated whenever Investipal adds new features, changes positioning, or modifies existing capabilities.*

