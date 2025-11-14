// Segment Pages Data
// Centralized content for all segment pages based on live website content

export interface SegmentPageProps {
  // SEO Meta
  pageTitle: string;
  pageDescription: string;
  keywords?: string;

  // Hero Section
  segmentName: string; // e.g., "Financial Planners"
  title: string; // Main hero title
  subtitle: string; // Hero subtitle/description
  heroImage: string; // Hero image URL
  heroImageAlt: string; // Alt text for hero image

  // Main intro section
  mainTitle: string; // Title for the main intro section
  mainSubtitle: string; // Subtitle for the main intro section

  // Main Content Sections (3 sections typically)
  sections: Array<{
    id: string; // e.g., "portfolios", "sales", "compliance"
    sectionHeader: string; // e.g., "Portfolios", "Sales", "Compliance"
    title: string; // Section title
    description: string; // Section description
    bulletPoints: Array<{
      text: string; // Bullet point text with HTML bold tags for key phrases
    }>;
    image: string; // Section image URL
    imageAlt: string; // Alt text for section image
    imagePosition: 'left' | 'right'; // Whether image goes on left or right
  }>;

  // Productivity Section
  productivityStats: Array<{
    value: string; // e.g., "4x"
    label: string; // e.g., "Faster than traditional sales processes..."
  }>;

  // FAQ Section
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const segmentPages: Record<string, SegmentPageProps> = {
  'financial-planners': {
    // SEO Meta
    pageTitle: 'Financial Planning Software | AI Portfolio Construction | Investipal',
    pageDescription: 'Financial planning software with AI-powered goal-based portfolio construction, automated compliance, and retirement income planning. Bridge the gap between planning and implementation.',
    keywords: 'financial planning software, goal-based portfolio construction, retirement income planning, financial advisor automation, portfolio construction tools, compliance automation for planners, liability-driven investing, financial planning technology',

    // Hero Section
    segmentName: 'Financial Planners',
    title: 'Build Goal-Based Portfolios and Compliance Docs in Minutes. No Spreadsheets.',
    subtitle: 'Investipal\'s AI analyzes client spending needs and generates optimized portfolios with liquidity bucketing, IPS documents, and Reg BI compliance—all in one workflow. Most planners complete full proposals in under 10 minutes.',
    heroImage: '/images/product_screenshots/liquidity_optimization_results_summary_v1_2025-11-14.png',
    heroImageAlt: 'Goal-based portfolio construction dashboard showing AI-generated liquidity analysis and optimal allocation strategy for financial planners',

    // Main intro section
    mainTitle: 'Transform Your Financial Planning Practice',
    mainSubtitle: 'From portfolio construction to compliance documentation, Investipal automates every step of your workflow so you can focus on what matters most—building lasting client relationships.',

    // Main Content Sections
    sections: [
      {
        id: 'portfolios',
        sectionHeader: 'Portfolios',
        title: 'Build Personalized Portfolios in 5 Minutes',
        description: 'Stop spending hours in spreadsheets. Input client spending needs, and Investipal\'s AI generates optimal liquid/growth allocations with liquidity bucketing—automatically. You can override any recommendation, but most advisors use the AI output as-is because it\'s that good.',
        bulletPoints: [
          { text: '<strong>AI analyzes spending sequences in seconds</strong> – Input estimated annual spending by year, and the AI determines optimal liquid vs. growth allocation across time horizons' },
          { text: '<strong>Customize or accept AI recommendations</strong> – Review the AI-generated portfolio, adjust if needed, or accept as-is. Most planners save 90% of portfolio construction time' },
          { text: '<strong>Include annuities and alternatives</strong> – Seamlessly allocate across equities, ETFs, mutual funds, private markets, and insurance products in one unified portfolio' }
        ],
        image: '/images/product_screenshots/liquidity_optimization_results_analysis_v1_2025-11-14.png',
        imageAlt: 'Detailed liquidity analysis showing objective breakdown and allocation recommendations',
        imagePosition: 'right'
      },
      {
        id: 'analytics',
        sectionHeader: 'Analytics',
        title: 'Get Complete Client Data in Minutes, Not Days',
        description: 'Held-away assets and incomplete data make financial planning harder. Instead of manually entering data from PDFs or waiting for aggregation, Investipal\'s AI scans statements and extracts holdings in seconds—so you can start planning immediately.',
        bulletPoints: [
          { text: '<strong>AI scans PDFs in 30 seconds</strong> – Upload brokerage statements, and our AI extracts every holding, allocation, and cost basis automatically. No manual data entry.' },
          { text: '<strong>Instant account aggregation</strong> – Connect to 15,000+ financial institutions. Sync checking, savings, investment, and retirement accounts in real-time.' },
          { text: '<strong>Run analysis in one click</strong> – Portfolio comparison, Monte Carlo simulation, tax transition analysis, and risk monitoring—all automated once data is in.' }
        ],
        image: '/images/product_screenshots/client_overview_performance_v1_2025-11-14.png',
        imageAlt: 'Portfolio analytics dashboard showing household asset allocation and performance tracking with benchmark comparisons',
        imagePosition: 'left'
      },
      {
        id: 'proposals-compliance',
        sectionHeader: 'Proposals & Compliance',
        title: 'Generate Proposals and Compliance Docs in 2 Minutes',
        description: 'Clients expect clear, actionable financial plans—regulators expect accurate documentation. Instead of spending hours formatting proposals and filling out IPS templates, Investipal generates everything automatically from your portfolio analysis. Most planners go from analysis to signed proposal in under 10 minutes.',
        bulletPoints: [
          { text: '<strong>One-click branded proposals</strong> – Turn your portfolio analysis into a professional, client-ready presentation with charts, projections, and recommendations. Customize the template once, then auto-generate for every client.' },
          { text: '<strong>Auto-generate IPS and Reg BI docs</strong> – Compliance documentation is created automatically from your portfolio data. No manual form-filling. Just review and send for e-signature.' },
          { text: '<strong>Built-in e-signature and tracking</strong> – Send proposals and compliance docs for e-signature directly from Investipal. Track opens, views, and signatures in real-time.' }
        ],
        image: '/images/product_screenshots/proposal_cover_page_v3_2025-11-14.png',
        imageAlt: 'Professional investment proposal cover page with branded design',
        imagePosition: 'right'
      }
    ],

    // Productivity Section
    productivityStats: [
      { value: '4x', label: 'Faster than traditional sales processes. Do in 1 day what used to take 4 weeks.' },
      { value: '70%', label: 'Cost savings versus comparative tech stack' }
    ],

    // FAQ Section
    faqs: [
      {
        question: "What is Investipal?",
        answer: "Investipal is AI-powered financial advisor software that automates portfolio construction, compliance documentation, and client onboarding. It's designed specifically for financial planners who want to spend less time on administrative work and more time with clients."
      },
      {
        question: "How long does it take to build a portfolio with goal-based construction?",
        answer: "Most planners build complete portfolios in 5 minutes or less. You input the client's spending needs by year, and the AI generates optimal liquid/growth allocations with liquidity bucketing automatically. You can customize the output or accept it as-is."
      },
      {
        question: "Can I override the AI's portfolio recommendations?",
        answer: "Yes, absolutely. The AI provides recommendations based on the client's spending needs and risk tolerance, but you have full control to adjust allocations, change securities, or modify the strategy. Most advisors use the AI output as-is because it's accurate, but customization is always available."
      },
      {
        question: "Does goal-based construction work with my existing model portfolios?",
        answer: "Yes. You can allocate to your existing model portfolios OR individual securities. The AI determines the optimal allocation between liquid and growth assets, and you choose how to implement it—whether that's with your models, ETFs, mutual funds, or individual securities."
      },
      {
        question: "How does the AI scan brokerage statements?",
        answer: "Upload a PDF brokerage statement, and our AI extracts every holding, allocation, and cost basis in about 30 seconds. No manual data entry required. The AI handles complex statements with hundreds of holdings, including alternatives and annuities."
      },
      {
        question: "What compliance documents does Investipal generate?",
        answer: "Investipal auto-generates IPS (Investment Policy Statements) and Reg BI documentation from your portfolio analysis. The documents are pre-filled with client data, portfolio details, and disclosures. You just review, customize if needed, and send for e-signature."
      },
      {
        question: "How long does onboarding take?",
        answer: "Most firms are fully onboarded in 1-2 weeks. This includes setting up your branding, importing client data, configuring compliance templates, and training your team. We provide dedicated onboarding support to ensure a smooth transition."
      },
      {
        question: "Do you integrate with my CRM or custodian?",
        answer: "Yes. Investipal integrates with major custodians (Schwab, Fidelity, TD Ameritrade, etc.) and CRMs (Salesforce, Redtail, Wealthbox, etc.). We also offer account aggregation that connects to 15,000+ financial institutions for held-away assets."
      },
      {
        question: "What's the pricing?",
        answer: "Pricing is based on the number of advisors and AUM. Contact us for a custom quote based on your firm's size and needs. Most planners save 15+ hours per week, which typically pays for the software many times over."
      },
      {
        question: "Is my client data secure?",
        answer: "Yes. Investipal is SOC 2 Type II certified and uses bank-level encryption (256-bit AES). All data is encrypted in transit and at rest. We never sell or share client data with third parties. Your data is yours."
      }
    ]
  },

  'wealth-managers': {
    // SEO Meta
    pageTitle: 'Wealth Management Software | Portfolio Optimization | Investipal',
    pageDescription: 'Wealth management software with AI-powered portfolio optimization, alternatives management, and goal-based construction. Scale your practice with automated sales and compliance workflows.',
    keywords: 'wealth management software, alternatives portfolio management, private equity modeling, goal-based portfolio construction, portfolio optimization, wealth manager tools, investment management platform, wealth advisor technology',

    // Hero Section
    segmentName: 'Wealth Managers',
    title: 'Close More Clients and Scale Your Practice. Without Hiring More Staff.',
    subtitle: 'Automate your entire workflow—from prospect intake to portfolio construction to compliance documentation. Build portfolios across all asset classes including alternatives. Generate branded proposals in minutes. Most wealth managers save 15+ hours per week and close deals 3x faster.',
    heroImage: '/images/product_screenshots/client_overview_performance_v1_2025-11-14.png',
    heroImageAlt: 'Wealth management portfolio dashboard showing household asset allocation, alternatives tracking, and performance monitoring with benchmark comparisons',

    // Main intro section
    mainTitle: 'Scale Your Wealth Management Practice with AI',
    mainSubtitle: 'Manage more clients without sacrificing personalization. Build portfolios across all asset classes—equities, fixed income, alternatives, and annuities. Automate your sales workflow from prospect intake to signed proposals. Stay compliant with auto-generated IPS and Reg BI documentation.',

    // Main Content Sections
    sections: [
      {
        id: 'sales',
        sectionHeader: 'Sales Workflow',
        title: 'Close Prospects in 2-3 Days Instead of 2-4 Weeks',
        description: 'Stop wasting weeks on manual data entry, portfolio analysis, and proposal formatting. Automate your entire sales workflow from prospect intake to signed proposals. Most advisors close deals 3x faster and save 10+ hours per prospect.',
        bulletPoints: [
          { text: '<strong>Automated prospect intake</strong> – Send prospects a secure link for risk questionnaires and document upload. They complete it on their phone in 10 minutes. You get notified when done—no back-and-forth emails or manual data entry.' },
          { text: '<strong>Instant AI-powered portfolio analysis</strong> – Upload their current statements, and the AI extracts holdings and runs portfolio comparison, Monte Carlo simulation, and tax transition analysis automatically. Identify opportunities in seconds, not hours.' },
          { text: '<strong>One-click proposal generation</strong> – Turn your analysis into a branded, professional proposal with charts, projections, and recommendations in 2 minutes. Customize your template once, then auto-generate every proposal. Send for e-signature directly from the platform.' }
        ],
        image: '/images/product_screenshots/proposal_cover_page_v3_2025-11-14.png',
        imageAlt: 'Professional investment proposal cover page with branding and client information',
        imagePosition: 'right'
      },
      {
        id: 'portfolios',
        sectionHeader: 'Portfolio Construction',
        title: 'Build Personalized Portfolios Across All Asset Classes',
        description: 'Stop juggling separate systems for public markets, alternatives, and annuities. Build portfolios with equities, fixed income, alternatives, and annuities in one unified workflow. Access our database of private securities with performance metrics, or model custom alternatives. No more spreadsheets.',
        bulletPoints: [
          { text: '<strong>Multi-asset portfolio construction</strong> – Build portfolios with equities, fixed income, alternatives (PE, VC, real estate, private credit), and annuities. Access our database of private market securities with risk/return/performance metrics, or model custom alternatives if not in our database.' },
          { text: '<strong>AI-powered portfolio optimization</strong> – Whether it\'s retirement income, wealth transfer, or liquidity planning, the AI optimizes allocations across all asset classes based on client goals and time horizons. Run portfolio comparison, Monte Carlo simulation, and tax transition analysis in seconds.' },
          { text: '<strong>Goal-based and risk-based strategies</strong> – Match client spending needs to optimal allocations with goal-based construction. Or use traditional risk-based asset allocation. Choose the right approach for each client—all in one platform.' }
        ],
        image: '/images/product_screenshots/portfolio_comparison_results_v1_2025-11-14.png',
        imageAlt: 'Portfolio comparison dashboard showing current vs. proposed allocation analysis',
        imagePosition: 'left'
      },
      {
        id: 'compliance',
        sectionHeader: 'Compliance & Documentation',
        title: 'Stay Compliant Without Thinking About It',
        description: 'Compliance is tedious and time-consuming—but missing it is risky. Automate IPS generation, Reg BI documentation, and portfolio monitoring so you stay compliant without the manual work. Most advisors save 5-10 hours per week on compliance alone.',
        bulletPoints: [
          { text: '<strong>Auto-generate compliance documents</strong> – Every portfolio analysis automatically generates compliant IPS and Reg BI documentation pre-filled with client data, portfolio details, and disclosures. Just review, customize if needed, and send for e-signature. No templates to fill out manually.' },
          { text: '<strong>24/7 portfolio monitoring with alerts</strong> – Set drift thresholds once (e.g., 5% from target allocation), and Investipal monitors every portfolio 24/7. Get instant alerts when rebalancing is needed or when concentration risk exceeds limits—before clients notice or regulators ask.' },
          { text: '<strong>Complete audit trails and reporting</strong> – Every client action is logged with timestamps and documentation. Generate compliance reports for audits in one click. Show exactly when and why every portfolio decision was made—no scrambling to gather paperwork.' }
        ],
        image: '/images/product_screenshots/ips_generator_output_v1_2025-11-14.png',
        imageAlt: 'Investment Policy Statement generator showing auto-populated compliance documentation',
        imagePosition: 'right'
      }
    ],

    // Productivity Section
    productivityStats: [
      { value: '4x', label: 'Faster than traditional sales processes. Do in 1 day what used to take 4 weeks.' },
      { value: '70%', label: 'Cost savings versus comparative tech stack' }
    ],

    // FAQ Section
    faqs: [
      {
        question: "How does Investipal handle alternative investments?",
        answer: "Access our database of private equity, real estate, private credit, and venture capital with risk/return/performance metrics. Each security includes correlation data and historical returns. Don't see what you need? Build custom alternatives with our security builder—define return profiles, volatility, liquidity terms, fees, and correlations."
      },
      {
        question: "Can I build portfolios with alternatives and traditional assets together?",
        answer: "Yes. Build portfolios with equities, fixed income, alternatives, and annuities in one unified workflow. Run portfolio comparison, Monte Carlo simulation, and risk assessment across all asset classes. See how private allocations impact overall portfolio risk/return profiles."
      },
      {
        question: "How long does it take to close a prospect?",
        answer: "Most wealth managers go from initial meeting to signed proposal in 2-3 days with Investipal—compared to 2-4 weeks traditionally. The AI automates data entry, portfolio analysis, and proposal generation, so you can move faster while maintaining quality."
      },
      {
        question: "Does goal-based construction work for high-net-worth clients?",
        answer: "Yes. Goal-based construction works for any client with specific, time-bound goals—whether that's retirement income, wealth transfer, liquidity planning, or charitable giving. The AI optimizes allocations across all asset classes (equities, fixed income, alternatives, annuities) based on the client's goals and time horizons."
      },
      {
        question: "How does compliance monitoring work?",
        answer: "Set drift thresholds once (e.g., 5% from target allocation), and Investipal monitors every portfolio 24/7. You get real-time alerts when rebalancing is needed, when concentration risk exceeds limits, or when compliance breaches occur. Every action is logged for audit trails."
      },
      {
        question: "Can I customize proposal templates?",
        answer: "Yes. Customize your proposal template once with your branding, disclosures, and formatting preferences. Then every proposal is auto-generated from your portfolio analysis using that template. You can have multiple templates for different client types or services."
      },
      {
        question: "What integrations do you support?",
        answer: "Investipal integrates with major custodians (Schwab, Fidelity, TD Ameritrade, Pershing, etc.), CRMs (Salesforce, Redtail, Wealthbox, etc.), and portfolio accounting systems (Black Diamond, Orion, Tamarac, etc.). We also offer account aggregation for held-away assets."
      },
      {
        question: "How long does onboarding take?",
        answer: "Most wealth managers are fully onboarded in 1-2 weeks. This includes branding setup, client data import, compliance template configuration, and team training. We provide dedicated onboarding support and weekly check-ins to ensure success."
      },
      {
        question: "What's the pricing model?",
        answer: "Pricing is based on AUM and number of advisors. Contact us for a custom quote. Most wealth managers save 15+ hours per week on portfolio construction and compliance alone, which typically pays for the software many times over."
      },
      {
        question: "Is client data secure?",
        answer: "Yes. Investipal is SOC 2 Type II certified with bank-level 256-bit AES encryption. All data is encrypted in transit and at rest. We never sell or share client data. Your data is yours, and you can export it anytime."
      }
    ]
  },

  'wealth-firms': {
    // SEO Meta
    pageTitle: 'Enterprise Wealth Management Software | Firm Solutions | Investipal',
    pageDescription: 'Enterprise wealth management platform for firms. Automate advisor workflows, ensure firm-wide compliance, and drive AUM growth with AI-powered portfolio construction and alternatives management.',
    keywords: 'enterprise wealth management, enterprise portfolio management, firm-wide compliance monitoring, advisor productivity platform, alternatives management software, wealth firm technology, investment firm software',

    // Hero Section
    segmentName: 'Wealth Firms',
    title: 'Standardize and Automate Your Entire Advisory Workflow. Firm-Wide.',
    subtitle: 'AI-powered automation for every step: data intake, portfolio analysis, proposal generation, compliance documentation, and client onboarding. Standardize processes across all advisors while managing portfolios with equities, fixed income, alternatives, and annuities—without adding headcount.',
    heroImage: '/images/product_screenshots/portfolio_comparison_results_v1_2025-11-14.png',
    heroImageAlt: 'Enterprise portfolio comparison dashboard showing automated analysis capabilities for wealth management firms',

    // Main intro section
    mainTitle: 'Drive Efficiency and Consistency Across Your Entire Firm',
    mainSubtitle: 'Eliminate operational bottlenecks and standardize best practices firm-wide. Investipal automates the complete advisory workflow—from initial data intake through signed advisory agreements—while managing portfolios across all asset classes including equities, fixed income, alternatives, and annuities.',

    // Main Content Sections
    sections: [
      {
        id: 'sales',
        sectionHeader: 'Workflow Automation',
        title: 'Automate the Complete Advisory Workflow—From Intake to Onboarding',
        description: 'Streamline operations and reduce advisor workload by 70%. Investipal automates every step of the client journey: data intake, portfolio analysis, proposal generation, compliance documentation, and advisory agreement signing. Standardize processes while maintaining advisor flexibility.',
        bulletPoints: [
          { text: '<strong>Automated data intake and analysis</strong> – AI-powered statement scanning extracts holdings from any PDF in 30 seconds. Instant portfolio comparison, Monte Carlo simulation, and tax transition analysis—no manual data entry required.' },
          { text: '<strong>One-click proposal and compliance generation</strong> – Proposals, IPS documents, and Reg BI disclosures are auto-generated from analysis. Set firm-wide templates once, then every advisor produces consistent, compliant output in minutes.' },
          { text: '<strong>Digital onboarding and e-signature</strong> – Send advisory agreements, compliance documents, and proposals for e-signature directly from the platform. Track status in real-time. Complete onboarding in days, not weeks.' }
        ],
        image: '/images/product_screenshots/proposal_cover_page_v3_2025-11-14.png',
        imageAlt: 'Professional investment proposal showing firm-wide branding and automated document generation',
        imagePosition: 'right'
      },
      {
        id: 'portfolios',
        sectionHeader: 'Portfolio Management',
        title: 'Multi-Asset Portfolio Construction and Analysis',
        description: 'Build and analyze portfolios across all asset classes—equities, fixed income, alternatives, and annuities. Access our database of private market securities with risk/return/performance metrics, or model custom alternatives. Standardize portfolio construction methodologies while allowing advisor customization for client needs.',
        bulletPoints: [
          { text: '<strong>Multi-asset portfolio construction</strong> – Build portfolios with equities, fixed income, alternatives (PE, VC, real estate, private credit), and annuities. Access our database of private market securities with tracked performance metrics, or model custom alternatives if not in our database.' },
          { text: '<strong>Comprehensive portfolio analysis</strong> – Run portfolio comparison, Monte Carlo simulation, tax transition analysis, and risk assessment across all asset classes. Analyze risk/return profiles for both public and private securities in unified reports.' },
          { text: '<strong>Standardized methodologies with flexibility</strong> – Set firm-wide investment methodologies and model portfolios. Advisors can customize allocations and strategies for client needs while maintaining consistency with firm standards. AI-powered optimization for goal-based and risk-based strategies.' }
        ],
        image: '/images/product_screenshots/liquidity_optimization_results_summary_v1_2025-11-14.png',
        imageAlt: 'Goal-based portfolio construction dashboard showing multi-asset allocation and liquidity analysis',
        imagePosition: 'left'
      },
      {
        id: 'compliance',
        sectionHeader: 'Compliance & Risk',
        title: 'Automate Compliance and Risk Management Firm-Wide',
        description: 'Reduce regulatory risk and ensure consistent compliance across all advisors. Investipal automates IPS generation, Reg BI documentation, portfolio monitoring, and audit reporting—eliminating manual compliance work and reducing firm liability. Every action is logged and audit-ready.',
        bulletPoints: [
          { text: '<strong>Automated compliance documentation</strong> – IPS, Reg BI disclosures, and advisory agreements are auto-generated for every client from portfolio data. Set firm-wide compliance standards once, then enforce automatically. No advisor can skip required documentation.' },
          { text: '<strong>Real-time risk monitoring and alerts</strong> – Monitor drift, concentration risk, and compliance breaches across all portfolios 24/7. Set firm-wide thresholds and get instant alerts when any portfolio requires attention. Proactive risk management before issues escalate.' },
          { text: '<strong>Audit-ready reporting and documentation</strong> – Generate firm-wide compliance reports instantly for regulatory audits. Complete audit trails show every client action, document, and timestamp. Demonstrate compliance without manual paperwork gathering.' }
        ],
        image: '/images/product_screenshots/ips_generator_output_v1_2025-11-14.png',
        imageAlt: 'Investment Policy Statement generator showing automated compliance documentation for firm-wide standards',
        imagePosition: 'right'
      }
    ],

    // Productivity Section
    productivityStats: [
      { value: '4x', label: 'Faster than traditional sales processes. Do in 1 day what used to take 4 weeks.' },
      { value: '70%', label: 'Cost savings versus comparative tech stack' }
    ],

    // FAQ Section
    faqs: [
      {
        question: "How does Investipal reduce operational costs and increase efficiency?",
        answer: "Investipal automates the complete advisory workflow—from data intake through client onboarding—reducing advisor workload by 70%. Firms eliminate redundant tools, reduce manual work, and standardize processes firm-wide. Most firms see 40-60% faster client onboarding, 70% cost savings vs. their previous tech stack, and ROI within 3-6 months."
      },
      {
        question: "What specific workflows does Investipal automate?",
        answer: "Investipal automates: (1) Data intake - AI scans statements and extracts holdings in 30 seconds, (2) Portfolio analysis - Automated portfolio comparison, Monte Carlo simulation, and tax analysis, (3) Proposal generation - One-click branded proposals with compliance disclosures, (4) Compliance documentation - Auto-generated IPS and Reg BI docs, (5) Client onboarding - E-signature for advisory agreements and compliance documents."
      },
      {
        question: "How do we standardize processes while allowing advisor flexibility?",
        answer: "Set firm-wide standards for client intake, compliance templates, proposal branding, and investment methodologies. Advisors can then customize portfolios and strategies for their specific clients—but within your firm's guardrails. You get consistency where it matters (compliance, branding, risk management) and flexibility where it helps (portfolio customization, client communication)."
      },
      {
        question: "Can we manage alternatives and annuities alongside traditional portfolios?",
        answer: "Yes. Investipal supports multi-asset portfolio construction including equities, fixed income, alternatives (PE, VC, real estate, private credit), and annuities. Access our database of private market securities with risk/return/performance metrics, or model custom alternatives. Analyze portfolios across all asset classes with unified risk assessment, performance tracking, and portfolio comparison tools."
      },
      {
        question: "How do we monitor compliance and risk across all advisors?",
        answer: "Investipal provides a centralized compliance dashboard showing every portfolio, drift alert, and compliance breach across all advisors. Set firm-wide drift thresholds and concentration limits once, then get real-time alerts when any portfolio needs attention. Every action is logged with timestamps for complete audit trails."
      },
      {
        question: "What visibility do we get into advisor activity and portfolio performance?",
        answer: "Comprehensive firm-wide visibility into all client portfolios and advisor activity. View portfolio performance, risk metrics, and asset allocation across all advisors. Track advisor productivity including proposals generated, clients onboarded, and compliance documentation completion rates. Monitor portfolio drift, concentration risk, and compliance status across the entire firm."
      },
      {
        question: "How long does enterprise implementation take?",
        answer: "Most firms are fully onboarded in 2-4 weeks, depending on size and complexity. Implementation includes: firm branding setup, client data migration, advisor training, compliance template configuration, and integration with existing systems. We provide dedicated implementation support, weekly check-ins, and ongoing training for new advisors."
      },
      {
        question: "What integrations and enterprise features are supported?",
        answer: "Investipal integrates with major custodians (Schwab, Fidelity, TD Ameritrade, Pershing), CRMs (Salesforce, Redtail, Wealthbox), and portfolio accounting systems (Black Diamond, Orion, Tamarac). Enterprise features include: SSO, role-based access control, audit logs, API access, custom reporting, and white-label branding."
      },
      {
        question: "What security and compliance certifications does Investipal have?",
        answer: "Investipal is SOC 2 Type II certified with bank-level 256-bit AES encryption. We're FINRA and SEC compliant. All data is encrypted in transit and at rest. Enterprise security features include: SSO, role-based permissions, audit logs, IP whitelisting, and data residency options. Annual penetration testing and security audits."
      },
      {
        question: "How is enterprise pricing structured?",
        answer: "Enterprise pricing is based on total firm AUM and number of advisors, with volume discounts for larger firms. Pricing includes unlimited client accounts, all features, integrations, dedicated support, and implementation services. Most firms see ROI within 3-6 months from operational efficiency gains alone. Contact us for a custom quote."
      }
    ]
  },

  'insurance': {
    // SEO Meta
    pageTitle: 'Insurance Advisor Software | IUL & Annuity Modeling | Investipal',
    pageDescription: 'Insurance advisor software with advanced FIA and IUL modeling. Configure participation rates, cap rates, floor rates, and crediting methods. Generate professional proposals with Monte Carlo projections.',
    keywords: 'insurance advisor software, FIA modeling software, IUL modeling, indexed annuity calculator, participation rate calculator, cap rate modeling, annuity comparison tool, insurance proposal software, life insurance technology, IUL illustration software',

    // Hero Section
    segmentName: 'Insurance',
    title: 'Model FIAs and IULs with Precision. Then Integrate into Retirement Plans.',
    subtitle: 'Configure participation rates, cap rates, floor rates, spreads, and crediting methods for fixed indexed annuities and IULs. Then run Monte Carlo projections to show complete retirement income—combining insurance with investment portfolios.',
    heroImage: '/images/product_screenshots/portfolio_simulation_results_v1_2025-11-14.png',
    heroImageAlt: 'Monte Carlo simulation results showing retirement income projections with confidence bands and probability analysis for insurance and investment portfolios',

    // Main intro section
    mainTitle: 'Unify Insurance and Investment Planning',
    mainSubtitle: 'Model complex annuities and IUL products with precision, then integrate them seamlessly into comprehensive retirement income plans. Show clients the complete picture—not just the insurance piece.',

    // Main Content Sections
    sections: [
      {
        id: 'portfolios',
        sectionHeader: 'Portfolios',
        title: 'Model Any Annuity or IUL Product in Minutes',
        description: 'Annuity illustrations from carriers are limited and inflexible. Investipal lets you model any FIA or IUL product with full control over participation rates, cap rates, floor rates, spreads, and crediting methods—so you can show clients exactly how different products compare.',
        bulletPoints: [
          { text: '<strong>Configure every parameter</strong> – Set participation rates, cap rates, floor rates, spreads, and crediting methods for any FIA or IUL product. Model accumulation periods, withdrawal strategies, and COLA adjustments with precision.' },
          { text: '<strong>Compare products side-by-side</strong> – Model multiple annuity products with different parameters and see projections side-by-side. Show clients which product performs best under different market scenarios.' },
          { text: '<strong>Run Monte Carlo projections</strong> – Project retirement income with confidence bands and probability analysis. Show clients the range of possible outcomes—not just the best-case scenario.' }
        ],
        image: '/images/product_screenshots/custom_security_builder_main_v2_2025-11-11.png',
        imageAlt: 'Annuity modeling interface showing participation rate, floor rate, cap rate, and crediting method configuration',
        imagePosition: 'right'
      },
      {
        id: 'sales',
        sectionHeader: 'Sales',
        title: 'Show Clients the Complete Retirement Picture',
        description: 'Clients don\'t just need insurance—they need a complete retirement income plan. Investipal lets you combine annuities, IULs, and investment portfolios in one unified projection, so clients see exactly how everything works together to fund their retirement.',
        bulletPoints: [
          { text: '<strong>Combine insurance + investments</strong> – Model annuities and IULs alongside investment portfolios. Show clients how insurance products fit into their complete retirement income strategy—not just as standalone products.' },
          { text: '<strong>Compare funding strategies</strong> – Run scenarios with different premium amounts, withdrawal strategies, and COLA adjustments. Show clients which strategy maximizes retirement income with the least risk.' },
          { text: '<strong>Visualize probability of success</strong> – Monte Carlo projections show confidence bands and probability analysis. Clients see the range of possible outcomes—not just the rosy best-case scenario.' }
        ],
        image: '/images/product_screenshots/client_overview_performance_v1_2025-11-14.png',
        imageAlt: 'Client portfolio overview showing household asset allocation and performance tracking with insurance and investment products combined',
        imagePosition: 'left'
      },
      {
        id: 'proposals',
        sectionHeader: 'Proposals',
        title: 'Generate Professional Proposals in 2 Minutes',
        description: 'Creating insurance proposals manually takes hours—formatting charts, writing explanations, adding disclosures. Investipal generates professional, branded proposals automatically from your analysis. Most advisors go from modeling to signed proposal in under 10 minutes.',
        bulletPoints: [
          { text: '<strong>One-click proposal generation</strong> – Your annuity analysis automatically becomes a professional proposal with charts, projections, and recommendations. Customize the template once, then auto-generate for every client.' },
          { text: '<strong>Client-friendly visuals</strong> – Complex insurance products are explained with clear charts, side-by-side comparisons, and probability visualizations. Clients understand what they\'re buying—not just signing.' },
          { text: '<strong>Built-in compliance disclosures</strong> – Every proposal includes required regulatory disclosures automatically. No risk of missing disclosures or compliance issues. Send for e-signature directly from Investipal.' }
        ],
        image: '/images/product_screenshots/proposal_cover_page_v3_2025-11-14.png',
        imageAlt: 'Professional insurance proposal cover page with branded design',
        imagePosition: 'right'
      }
    ],

    // Productivity Section
    productivityStats: [
      { value: '4x', label: 'Faster than traditional sales processes. Do in 1 day what used to take 4 weeks.' },
      { value: '70%', label: 'Cost savings versus comparative tech stack' }
    ],

    // FAQ Section
    faqs: [
      {
        question: "What annuity and IUL products can I model?",
        answer: "You can model any fixed indexed annuity (FIA) or indexed universal life (IUL) product. Configure participation rates, cap rates, floor rates, spreads, and crediting methods for any carrier's product. Model accumulation periods, withdrawal strategies, COLA adjustments, and premium structures with full control."
      },
      {
        question: "How do I compare different annuity products?",
        answer: "Model multiple annuity products with different parameters and see projections side-by-side. Run Monte Carlo simulations for each product to show clients which performs best under different market scenarios. Compare guaranteed income, upside potential, and downside protection across products."
      },
      {
        question: "Can I combine insurance products with investment portfolios?",
        answer: "Yes. Model annuities and IULs alongside investment portfolios to show clients complete retirement income projections. See how insurance products fit into the overall retirement strategy—not just as standalone products. Run unified Monte Carlo projections showing total retirement income from all sources."
      },
      {
        question: "How long does it take to create an annuity proposal?",
        answer: "Most advisors go from modeling to signed proposal in under 10 minutes. Configure the annuity parameters, run projections, and Investipal auto-generates a professional proposal with charts, comparisons, and disclosures. Customize the template once, then auto-generate for every client."
      },
      {
        question: "Does Investipal include compliance disclosures?",
        answer: "Yes. Every proposal includes required regulatory disclosures automatically—no risk of missing disclosures or compliance issues. Customize disclosures once in your template, and they're included in every proposal. Send for e-signature directly from Investipal."
      },
      {
        question: "Can I run Monte Carlo projections for annuities?",
        answer: "Yes. Run Monte Carlo projections showing retirement income with confidence bands and probability analysis. Show clients the range of possible outcomes—not just the best-case scenario. Compare probability of success across different products and funding strategies."
      },
      {
        question: "How does Investipal handle COLA adjustments?",
        answer: "Configure COLA (Cost of Living Adjustment) rates for withdrawal strategies. Model how inflation-adjusted withdrawals impact account values over time. Show clients how COLA affects their purchasing power in retirement."
      },
      {
        question: "What integrations do you support?",
        answer: "Investipal integrates with major custodians and CRMs. We also offer account aggregation for held-away assets, so you can see the complete financial picture—insurance, investments, and other assets—in one place."
      },
      {
        question: "How long does onboarding take?",
        answer: "Most insurance advisors are fully onboarded in 1 week. This includes setting up your branding, configuring annuity product templates, and training on the modeling tools. We provide dedicated onboarding support to ensure you're productive quickly."
      },
      {
        question: "What's the pricing?",
        answer: "Pricing is based on the number of advisors and volume of proposals. Contact us for a custom quote. Most insurance advisors save 10+ hours per week on modeling and proposal creation, which typically pays for the software many times over."
      }
    ]
  },

  'cross-border-wealth': {
    // SEO Meta
    pageTitle: 'Cross-Border Wealth Management Software | US-Canada Portfolio Management | Investipal',
    pageDescription: 'Cross-border wealth management software for US-Canada advisors. Multi-currency portfolio tracking, dual compliance documentation, and unified statement aggregation for clients with assets in both countries.',
    keywords: 'cross-border wealth management, US Canada financial planning, dual currency portfolio management, cross-border compliance, PFIC reporting, RRSP IRA management, snowbird financial planning, expat wealth management, cross-border tax planning software, US Canada advisor platform',

    // Hero Section
    segmentName: 'Cross-Border Wealth Management',
    title: 'Manage US-Canada Portfolios in One Platform. No More Spreadsheets or Currency Headaches.',
    subtitle: 'Investipal\'s AI handles multi-currency portfolios, dual-country statement aggregation, and cross-border compliance documentation—so you can serve expats, snowbirds, and dual citizens without the complexity. Most cross-border proposals are completed in under 15 minutes.',
    heroImage: '/images/product_screenshots/portfolio_comparison_results_v1_2025-11-14.png',
    heroImageAlt: 'Multi-currency portfolio comparison dashboard showing unified US and Canada holdings analysis for cross-border wealth management',

    // Main intro section
    mainTitle: 'Built for the Complexity of Cross-Border Wealth',
    mainSubtitle: 'Serving clients with assets in both the US and Canada shouldn\'t require two separate platforms, manual currency conversions, and hours of reconciliation. Investipal unifies your entire cross-border workflow into one intelligent platform.',

    // Main Content Sections
    sections: [
      {
        id: 'aggregation',
        sectionHeader: 'Data Aggregation',
        title: 'Aggregate US and Canadian Accounts in One Dashboard',
        description: 'Your clients have accounts at TD Canada Trust, RBC, Questrade, Schwab, Fidelity, and Vanguard. Instead of logging into multiple platforms or manually entering data from PDFs, Investipal\'s AI aggregates everything automatically—with proper currency handling built in.',
        bulletPoints: [
          { text: '<strong>AI scans both US and Canadian statements</strong> – Upload PDFs from any North American brokerage. Our AI extracts holdings, allocations, and cost basis in seconds—whether it\'s in USD or CAD' },
          { text: '<strong>Multi-currency portfolio tracking</strong> – View consolidated portfolios with automatic CAD/USD conversion. Track currency exposure and see true asset allocation across both countries' },
          { text: '<strong>Connect 15,000+ institutions</strong> – Direct integration with major US and Canadian banks, brokerages, and custodians. Real-time syncing of checking, savings, investment, and retirement accounts' }
        ],
        image: '/images/product_screenshots/statement_scanner_output_v3_2025-11-11.png',
        imageAlt: 'AI statement scanner extracting holdings from both US and Canadian brokerage statements with multi-currency support',
        imagePosition: 'right'
      },
      {
        id: 'portfolios',
        sectionHeader: 'Portfolio Management',
        title: 'Build Cross-Border Portfolios Without the Complexity',
        description: 'Managing RRSPs, TFSAs, 401(k)s, and IRAs in one portfolio is a nightmare with traditional tools. Investipal handles the complexity—you focus on the strategy. Model both US and Canadian securities, track currency risk, and optimize across all account types.',
        bulletPoints: [
          { text: '<strong>Unified multi-asset portfolio construction</strong> – Build portfolios with US equities, Canadian equities, ETFs from both countries, alternatives, and annuities. All in one optimization engine' },
          { text: '<strong>Account-type aware modeling</strong> – Properly handle RRSPs, TFSAs, RESPs, 401(k)s, IRAs, and taxable accounts. Understand which securities work in which account types to avoid PFIC issues' },
          { text: '<strong>Currency risk analysis</strong> – Track CAD/USD exposure across the portfolio. Model currency hedging strategies and understand how FX movements impact returns' }
        ],
        image: '/images/product_screenshots/client_overview_performance_v1_2025-11-14.png',
        imageAlt: 'Cross-border portfolio dashboard showing unified US and Canadian holdings with multi-currency performance tracking',
        imagePosition: 'left'
      },
      {
        id: 'compliance',
        sectionHeader: 'Compliance & Proposals',
        title: 'Generate Cross-Border Compliant Proposals and Documentation',
        description: 'Your proposals and IPS documents need to address dual-country tax implications, residency considerations, and estate planning complexities. Investipal generates everything automatically—with cross-border considerations built in. No more generic templates that miss critical details.',
        bulletPoints: [
          { text: '<strong>Cross-border aware proposals</strong> – Generate professional proposals that address US-Canada tax treaty implications, currency risk, and account-type considerations. AI writes compelling narratives in minutes' },
          { text: '<strong>IPS with dual-country compliance</strong> – Create Investment Policy Statements that document cross-border strategy, residency assumptions, and tax planning considerations. One-click generation from portfolio data' },
          { text: '<strong>Reg BI and Canadian compliance</strong> – Automated Regulation Best Interest documentation for US clients. Track substantial presence test days for snowbirds. Document suitability across both jurisdictions' }
        ],
        image: '/images/product_screenshots/proposal_cover_page_v3_2025-11-14.png',
        imageAlt: 'Professional branded investment proposal with cross-border portfolio analysis and dual-currency reporting',
        imagePosition: 'right'
      },
      {
        id: 'onboarding',
        sectionHeader: 'Client Onboarding',
        title: 'Onboard Cross-Border Clients in Days, Not Weeks',
        description: 'Cross-border onboarding is notoriously complex—multiple account types, dual-country documentation, AML checks, and tax forms. Investipal streamlines everything into one secure portal. Clients complete everything on their phone or desktop—no confusion, no delays.',
        bulletPoints: [
          { text: '<strong>One portal for complete onboarding</strong> – Configure your workflow once: risk assessment, statement upload (US and Canadian), AML verification, tax residency documentation, and advisory agreement signing' },
          { text: '<strong>Built-in e-signature and ID verification</strong> – Clients sign documents right in the portal. Scan driver\'s licenses (US or Canadian) and cross-check with OFAC automatically. No DocuSign, no extra logins' },
          { text: '<strong>Residency tracking built-in</strong> – Track substantial presence test days for snowbirds. Document tax residency status. Ensure clients understand implications of spending too much time in either country' }
        ],
        image: '/images/product_screenshots/client_onboarding_portal_v3_2025-11-11.png',
        imageAlt: 'Client onboarding portal with cross-border workflow including dual-country documentation and compliance',
        imagePosition: 'left'
      }
    ],

    // Productivity Section
    productivityStats: [
      {
        value: '3x',
        label: 'Faster than managing US and Canadian portfolios in separate platforms. Most cross-border proposals completed in 15 minutes.'
      },
      {
        value: '100%',
        label: 'Of US and Canadian brokerage statements supported. AI extracts holdings from any format in seconds.'
      }
    ],

    // FAQ Section
    faqs: [
      {
        question: "How does Investipal handle multi-currency portfolios?",
        answer: "Investipal automatically tracks holdings in both USD and CAD with real-time currency conversion. You can view consolidated portfolios in either currency, track currency exposure across accounts, and analyze how FX movements impact returns. All portfolio analytics, risk metrics, and performance reporting work seamlessly across both currencies."
      },
      {
        question: "Can Investipal scan statements from Canadian brokerages?",
        answer: "Yes. Our AI-powered statement scanner handles all major Canadian brokerages including TD Canada Trust, RBC Direct Investing, BMO InvestorLine, Scotiabank iTRADE, Questrade, Wealthsimple, and Interactive Brokers Canada—plus all major US brokerages. Upload any PDF statement and holdings are extracted in 30 seconds, regardless of format or currency."
      },
      {
        question: "How does Investipal handle RRSPs, TFSAs, and other Canadian accounts?",
        answer: "Investipal recognizes all Canadian registered accounts (RRSPs, TFSAs, RESPs, RRIFs) and US retirement accounts (401(k)s, IRAs, Roth IRAs). The platform tracks which securities are held in which account types, helping you avoid PFIC issues with Canadian mutual funds in US taxable accounts. Portfolio optimization considers account-type tax implications."
      },
      {
        question: "Does Investipal help with PFIC reporting and cross-border tax compliance?",
        answer: "While Investipal doesn't file tax forms, it helps you identify potential PFIC issues by flagging Canadian mutual funds and ETFs held in US taxable accounts. The platform tracks which holdings may require Form 8621 reporting. For snowbirds, you can track days spent in each country to monitor substantial presence test compliance. All data exports to your tax preparer."
      },
      {
        question: "Can I generate proposals that address cross-border tax implications?",
        answer: "Yes. Investipal's AI can generate proposal narratives that address US-Canada tax treaty considerations, currency risk, account-type suitability, and estate planning implications. You can customize AI prompts to include specific cross-border talking points. All proposals can be branded with your firm's logo and colors."
      },
      {
        question: "How does Investipal handle currency risk in portfolio analysis?",
        answer: "Investipal tracks currency exposure across your entire portfolio and shows how much of your client's wealth is denominated in USD vs CAD. You can model currency hedging strategies, analyze historical currency impact on returns, and run scenarios showing how FX movements affect portfolio values. All risk analytics account for currency volatility."
      },
      {
        question: "Can I track substantial presence test days for snowbird clients?",
        answer: "Yes. Investipal includes residency tracking features where you can log days spent in the US vs Canada. The platform calculates substantial presence test compliance (183-day rule) and alerts you when clients are approaching thresholds. This helps snowbirds avoid unintentional US tax residency and maintain Canadian provincial health coverage."
      },
      {
        question: "Does Investipal integrate with Canadian custodians and CRMs?",
        answer: "Investipal integrates with major North American custodians including Canadian Imperial Bank of Commerce (CIBC), National Bank of Canada, and all major US custodians (Schwab, Fidelity, TD Ameritrade, Pershing). CRM integrations include Salesforce, Redtail, Wealthbox, and Junxure. Direct data feeds eliminate manual entry."
      },
      {
        question: "How does Investipal handle estate planning for cross-border clients?",
        answer: "Investipal's IPS generator can document estate planning considerations including US estate tax exposure for Canadian residents with US assets, deemed disposition rules in Canada, and cross-border trust structures. While Investipal doesn't provide legal advice, it helps you document the estate planning strategy in client-facing documents and track which assets are subject to which country's rules."
      },
      {
        question: "What makes Investipal different from other platforms for cross-border wealth?",
        answer: "Most wealth management platforms are built for either the US or Canada—not both. Investipal is one of the only platforms that natively handles multi-currency portfolios, aggregates statements from both countries, understands both US and Canadian account types, and generates compliance documentation that addresses dual-country considerations. You get one unified platform instead of juggling separate US and Canadian tools."
      }
    ]
  }
} as const;

// Export individual segment page data for easier access
export const financialPlannersData = segmentPages['financial-planners'];
export const wealthManagersData = segmentPages['wealth-managers'];
export const wealthFirmsData = segmentPages['wealth-firms'];
export const insuranceData = segmentPages['insurance'];
export const crossBorderWealthData = segmentPages['cross-border-wealth'];
