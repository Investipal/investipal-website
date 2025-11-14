/**
 * Feature Pages Data
 * 
 * This file contains all the content and configuration for feature pages.
 * Update this file to maintain consistency across all feature pages.
 */

// Icon definitions as strings (SVG paths)
export const icons = {
  document: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
  </svg>`,
  
  upload: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
  </svg>`,
  
  analytics: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
  </svg>`,
  
  download: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
  </svg>`,
  
  shield: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
  </svg>`,
  
  speed: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
  </svg>`,

  portfolio: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
  </svg>`,

  optimization: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>`,

  analysis: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
  </svg>`,

  monitoring: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
  </svg>`
} as const;

// Feature page configurations
export const featurePages = {
  'automated-statement-scanner': {
    // SEO Meta
    pageTitle: 'AI Statement Scanner | Brokerage Statement Processing | Investipal',
    pageDescription: 'AI-powered brokerage statement scanner. Extract portfolio data from any format instantly. OCR technology for financial advisors.',
    keywords: 'brokerage statement scanner, AI statement processing, financial advisor automation, portfolio data extraction, OCR financial software',

    // Hero Section
    audienceText: 'For Advisors & Planners',
    featureName: 'Automated Statement Scanner',
    title: 'Parse & Analyze Client Account Statements in Seconds',
    subtitle: 'Let AI automatically read, extract, organize and analyze the holdings data of your clients portfolio.',
    heroImage: '/images/external/66cf592dcb1be92d31050903_account-statement-scanning-for-financial-advisors-1.png',
    heroImageAlt: 'Automated Statement Scanner Dashboard',

    // Features Section (2x2 grid)
    features: [
      {
        icon: icons.upload,
        title: 'Upload Documents',
        description: 'Simply drag and drop PDF statements or scan images directly into the platform.'
      },
      {
        icon: icons.analytics,
        title: 'AI Extraction',
        description: 'Advanced AI automatically identifies and extracts all holdings data with 99.9% accuracy.'
      },
      {
        icon: icons.portfolio,
        title: 'Portfolio Analysis',
        description: 'Get instant insights into asset allocation, risk metrics, and portfolio performance.'
      },
      {
        icon: icons.download,
        title: 'Export Data',
        description: 'Download clean, organized data in CSV format for further analysis or import into your tools.'
      }
    ],
    dashboardImage: '/images/external/66cf56bf0f86f453970dad3d_2024-18_51_39-gmt-4-1-3.png',
    dashboardImageAlt: 'Portfolio Analytics Dashboard',

    // Productivity Section
    productivityTitle: 'Better operations and smarter resource utilization.',
    productivityDescription: 'Free up your time to spend on higher-value activities.',
    stats: [
      { value: '95%', label: 'Time saved' },
      { value: '3-5', label: 'Hours saved per document, on average' }
    ]
  },

  'asset-allocation': {
    // SEO Meta
    pageTitle: 'AI Asset Allocation Software | Portfolio Optimization | Investipal',
    pageDescription: 'AI-powered asset allocation and portfolio optimization. Create personalized portfolios across public and alternative assets with transparent AI.',
    keywords: 'AI asset allocation, portfolio optimization software, automated portfolio construction, investment allocation tools, financial advisor technology',

    // Hero Section
    audienceText: 'For Advisors, PMs and CIOs',
    featureName: 'Portfolio Creation',
    title: 'AI-Powered Asset Allocation, Stewarded by You',
    subtitle: 'Easily create and manage hyper-personalized portfolios across public equities and alternative assets in a matter of seconds - at scale. Transparent explanations mitigate "black box" risks.',
    heroImage: '/images/external/672e80ad7acd7627388aeb71_33.3-1.png',
    heroImageAlt: 'AI-powered asset allocation dashboard showing portfolio creation interface',

    // Features Section (2x2 grid)
    features: [
      {
        icon: icons.optimization,
        title: 'Customize Your Engine',
        description: 'Start by uploading your investment universe - from public equities to alternative assets. Our AI engine analyzes historical performance, correlations, sector exposures, and factor sensitivities to build a sophisticated understanding of your investment landscape.'
      },
      {
        icon: icons.analysis,
        title: 'Generate Optimized Portfolios',
        description: 'Generate institutional-grade portfolios instantly. Our engine optimizes across multiple dimensions—from risk-return objectives to tax efficiency—while adhering to your specific mandates and client preferences.'
      },
      {
        icon: icons.document,
        title: 'Analyze and Fine-Tune',
        description: 'Unlike black-box solutions, we show our work. Get clear, detailed explanations for every allocation decision, run comprehensive stress tests, and fine-tune using institutional-grade analytics before implementation.'
      },
      {
        icon: icons.monitoring,
        title: 'Monitor and Maintain',
        description: 'Stay ahead of drift with intelligent monitoring. Receive actionable alerts when portfolios need rebalancing, along with suggested adjustments that keep you aligned with mandates while minimizing unnecessary turnover.'
      }
    ],
    dashboardImage: '/images/external/672e8161712202e983252f86_33.3-3.png',
    dashboardImageAlt: 'Asset allocation dashboard showing portfolio analytics and optimization tools',

    // Productivity Section
    productivityTitle: 'Hyper-Personalization, Automated',
    productivityDescription: 'Free up your time to spend on higher-value activities.',
    stats: [
      { value: '95%', label: 'Time saved' },
      { value: '8', label: 'Hours saved on portfolio construction and analysis' }
    ]
  },

  'ai-driven-engagement': {
    // SEO Meta
    pageTitle: 'AI Client Engagement | Automated Lead Nurturing | Investipal',
    pageDescription: 'AI-driven client engagement and lead nurturing. Monitor portfolios, generate personalized insights, and re-engage prospects automatically.',
    keywords: 'AI client engagement, automated lead nurturing, portfolio monitoring, financial advisor CRM, client retention software',

    // Hero Section
    audienceText: 'For Advisors & Planners',
    featureName: 'Automated Lead Nuturing', // Note: keeping the typo from live site
    title: 'Close More Leads with AI-Driven Personalized Engagement',
    subtitle: 'We all want every prospect to close today—but what if they don\'t? If you\'re relying on monthly follow-ups or generic posts, you\'re missing key chances to re-engage. Investipal bridges that gap by monitoring each prospect\'s actual portfolio and letting you know when it\'s time to step in with meaningful, data-backed insights.',
    heroImage: '/images/external/67d2fb99697373d9bc7afaaa_screenshot-2025-03-13-111643.png',
    heroImageAlt: 'AI-driven engagement graph showing investment performance metrics for effective client engagement',

    // Features Section (2x2 grid)
    features: [
      {
        icon: icons.speed,
        title: 'Live Portfolio Monitoring',
        description: 'Stay updated on each prospect\'s holdings. Know instantly when a position underperforms or fees spike—and use that information to engage with clarity and relevance.'
      },
      {
        icon: icons.analysis,
        title: 'On-Demand, Customized Materials',
        description: 'Generate fresh charts, analyses, and proposals instead of presenting last quarter\'s stale data.'
      },
      {
        icon: icons.shield,
        title: 'Actionable Alerts & Explanations',
        description: 'Automated notifications tell you exactly which issues to highlight, backed by easy-to-understand explanations—cutting out guesswork and saving you hours in prep time.'
      },
      {
        icon: icons.monitoring,
        title: 'Proactive Lead Re-Engagement',
        description: 'No more lukewarm "Just checking in" emails. Let timely alerts drive a conversation around potential upgrades, missed gains, or new investment opportunities.'
      }
    ],
    dashboardImage: '/images/external/67d2fc16d99cc77d92191a9d_screenshot-2025-03-13-111543.png',
    dashboardImageAlt: 'AI-driven engagement dashboard showing portfolio tracking and alerts',

    // Productivity Section
    productivityTitle: 'Better operations and smarter resource utilization.',
    productivityDescription: 'Free up your time to spend on higher-value activities.',
    stats: [
      { value: '95%', label: 'Time saved' },
      { value: '3-5', label: 'Hours saved per document, on average' }
    ]
  },

  'client-acquisition': {
    // SEO Meta
    pageTitle: 'Investment Proposal Software | AI Proposal Generator | Investipal',
    pageDescription: 'Generate professional investment proposals in minutes with AI. Custom branding, portfolio analysis charts, and AI-powered content generation. Close deals 3x faster with personalized proposals.',
    keywords: 'investment proposal software, financial advisor proposal generator, AI proposal writing, branded investment proposals, automated proposal generation, wealth management proposals, RIA proposal software, custom investment proposals',

    // Hero Section
    audienceText: 'For All Financial Advisors',
    featureName: 'Investment Proposal Generator',
    title: 'Generate Professional Investment Proposals in Under 10 Minutes',
    subtitle: 'Create stunning, branded proposals with portfolio analysis, AI-generated content, and full customization. Run the analysis, let AI write the narrative, customize your message, and deliver a proposal that wins the business—all in one seamless workflow.',
    heroImage: '/images/product_screenshots/proposal_cover_page_v3_2025-11-14.png',
    heroImageAlt: 'Professional branded investment proposal cover page with custom branding and client details',

    // Features Section (2x2 grid)
    features: [
      {
        icon: icons.document,
        title: 'Fully Branded Proposals',
        description: 'Customize every proposal with your logo, brand colors, and custom cover images. Every proposal reflects your brand and positions you as the premium choice. No design skills required—just customize the branding settings once and generate unlimited branded proposals.'
      },
      {
        icon: icons.speed,
        title: 'AI Writes Your Proposal Content',
        description: 'AI analyzes the portfolio comparison and generates compelling narratives explaining why your recommended strategy is superior. Customize the AI prompts to match your voice and messaging. Edit the output directly in the proposal—or let AI handle it entirely.'
      },
      {
        icon: icons.analysis,
        title: 'Automatic Portfolio Analysis Charts',
        description: 'Every proposal includes professional charts comparing current vs. recommended portfolios: asset allocation, risk metrics, historical performance, geographic exposure, and more. Charts are auto-generated from your analysis—no manual work required.'
      },
      {
        icon: icons.monitoring,
        title: 'Complete Workflow Integration',
        description: 'Run portfolio comparison or goal-based analysis, generate the proposal, customize content, and deliver—all in one platform. Add compliance documentation (IPS, Reg BI) with one click. Send the proposal and onboarding link together to close deals faster.'
      }
    ],
    dashboardImage: '/images/product_screenshots/proposal_text_editor_v1_2025-11-14.png',
    dashboardImageAlt: 'Proposal editor showing AI-generated content with portfolio analysis charts and customizable text sections',

    // Productivity Section
    productivityTitle: 'Close More Deals with Less Effort',
    productivityDescription: 'Stop spending hours building proposals in PowerPoint. Generate professional, personalized investment proposals in minutes and focus on what matters—winning the business.',
    stats: [
      { value: '10 min', label: 'Average time to complete a full proposal' },
      { value: '3x', label: 'Faster close rates vs. generic presentations' }
    ]
  },

  'regulation-best-interest-generator': {
    // SEO Meta
    pageTitle: 'Reg BI Compliance Software | Best Interest Documentation | Investipal',
    pageDescription: 'Generate Regulation Best Interest documentation automatically. Streamline compliance with AI-powered disclosure generation.',
    keywords: 'Reg BI compliance software, regulation best interest generator, financial advisor compliance, automated disclosures, regulatory documentation',

    // Hero Section
    audienceText: 'For Advisors & Planners',
    featureName: 'Regulation Best Interest (Reg BI) Generator',
    title: 'Generate Compliant Reg BI Documentation in 1-Click with AI',
    subtitle: 'Streamline your Reg BI compliance process and automate disclosure generation.',
    heroImage: '/images/external/66e3394ad754f2dd7ec8ee68_reg-bi-1.png',
    heroImageAlt: 'Regulation Best Interest Generator dashboard showing compliance workflow and documentation generation',

    // Features Section (2x2 grid)
    features: [
      {
        icon: icons.optimization,
        title: 'Comprehensive Client Profiling',
        description: 'Capture essential client information with a quick assessment that analyzes investment objectives, risk tolerance, and financial situation.'
      },
      {
        icon: icons.document,
        title: 'Generate Tailored Disclosures',
        description: 'Instantly create required disclosures, customized for each client\'s unique circumstances.'
      },
      {
        icon: icons.shield,
        title: 'Meet Core Obligations',
        description: 'Effortlessly fulfill Reg BI\'s four pillars to meet regulatory expectations with maximum efficiency.'
      },
      {
        icon: icons.monitoring,
        title: 'Monitor Ongoing Compliance',
        description: 'Stay ahead of regulatory changes with real-time updates and automated compliance checks, ensuring consistent adherence to Reg BI obligations.'
      }
    ],
    dashboardImage: '/images/external/66e33a7b1564936bac69f8a9_risk-profile-1.png',
    dashboardImageAlt: 'Regulation Best Interest compliance dashboard showing risk profile and client assessment tools',

    // Productivity Section
    productivityTitle: 'Better operations and smarter resource utilization.',
    productivityDescription: 'Free up your time to spend on higher-value activities.',
    stats: [
      { value: '95%', label: 'Time saved' },
      { value: '1-2', label: 'Hours saved per document, on average' }
    ]
  },

  'investment-policy-statements': {
    // SEO Meta
    pageTitle: 'Investment Policy Statement Generator | IPS Software | Investipal',
    pageDescription: 'Generate Investment Policy Statements instantly with AI. Risk assessment, goal setting, and compliance monitoring automated.',
    keywords: 'investment policy statement generator, IPS software, financial advisor compliance, automated policy statements, investment compliance tools',

    // Hero Section
    audienceText: 'For Advisors & Planners',
    featureName: 'Investment Policy Statement Generator',
    title: 'Generate Personalized Investment Policy Statements in 1-Click with AI',
    subtitle: 'Streamline your compliance documentation and automate drift monitoring. No manual data entry required.',
    heroImage: '/images/external/66da118db938e0ddbcc47d8c_investment-policy-statement-generator.png',
    heroImageAlt: 'Investment Policy Statement Generator dashboard showing automated compliance documentation',

    // Features Section (2x2 grid)
    features: [
      {
        icon: icons.optimization,
        title: 'Identify Risk Tolerance',
        description: 'Pinpoint risk tolerance with a quick 5-minute assessment that analyzes risk capacity, behavior and the clients\' existing portfolio.'
      },
      {
        icon: icons.analysis,
        title: 'Set Goals & Objectives',
        description: 'Set-up accounts and goals for all members of the household.'
      },
      {
        icon: icons.document,
        title: 'Define Asset Allocation & Investment Selection',
        description: 'Set guardrails and define mandates.'
      },
      {
        icon: icons.monitoring,
        title: 'Monitor Drift',
        description: 'Ensure consistency and alignment with automated drift alerts.'
      }
    ],
    dashboardImage: '/images/external/66df52298b82cebf2ffd7e59_untitled-design-3.png',
    dashboardImageAlt: 'Investment Policy Statement dashboard showing portfolio allocation and monitoring features',

    // Productivity Section
    productivityTitle: 'Better operations and smarter resource utilization.',
    productivityDescription: 'Free up your time to spend on higher-value activities.',
    stats: [
      { value: '95%', label: 'Time saved' },
      { value: '1-2', label: 'Hours saved per document, on average' }
    ]
  },

  'risk-management': {
    // SEO Meta
    pageTitle: 'Portfolio Risk Management Software | AI Risk Analytics | Investipal',
    pageDescription: 'Advanced portfolio risk management with AI. Real-time risk monitoring, concentration analysis, and automated rebalancing.',
    keywords: 'portfolio risk management, risk analytics software, concentration analysis, automated rebalancing, financial risk tools',

    // Hero Section
    audienceText: 'For Advisors & Planners',
    featureName: 'Risk Insights',
    title: 'Detect, Analyze, and Mitigate Portfolio Risk in Real-Time with AI',
    subtitle: 'Uncover hidden concentration risks and correlations. Analyze asset class, geographic, and sector exposure. Stay ahead of market shifts with automated drift alerts, and optimize portfolios effortlessly using advanced rebalancing tools.',
    heroImage: '/images/external/66e30ff444d57784dc98bf20_risk-insights-3.png',
    heroImageAlt: 'Risk insights dashboard showing portfolio risk analysis and monitoring tools',

    // Features Section (2x2 grid)
    features: [
      {
        icon: icons.optimization,
        title: 'Uncover Hidden Risks',
        description: 'Instantly analyze concentration and correlation insights across your portfolios. Identify potential vulnerabilities and make data-driven decisions to protect your clients\' wealth.'
      },
      {
        icon: icons.analysis,
        title: 'Multi-Dimensional Exposure',
        description: 'Gain a 360-degree view of asset class, geographic, and sector exposures. Visualize complex data in intuitive dashboards, empowering you to communicate risks effectively to clients.'
      },
      {
        icon: icons.document,
        title: 'Stay Ahead with Smart Alerts',
        description: 'Receive real-time drift notifications when portfolios deviate from their targets. Proactively manage risk and demonstrate your value by addressing issues before they become problems.'
      },
      {
        icon: icons.monitoring,
        title: 'Optimize with Precision',
        description: 'Leverage advanced rebalancing tools using minimum volatility and maximum Sharpe ratio strategies. Fine-tune portfolios efficiently, balancing risk and return to meet your clients\' unique goals.'
      }
    ],
    dashboardImage: '/images/external/66e316ea14404e1e88b824c8_untitled-design-4.png',
    dashboardImageAlt: 'Risk management dashboard showing portfolio analysis and rebalancing tools',

    // Productivity Section
    productivityTitle: 'Uncover hidden risk and scale with confidence.',
    productivityDescription: 'Free up your time to spend on higher-value activities.',
    stats: [
      { value: '95%', label: 'Time saved' },
      { value: '7', label: 'Hours saved on portfolio construction and analysis' }
    ]
  },

  'custom-security-builder': {
    // SEO Meta
    pageTitle: 'Custom Security Builder | Alternative Investment Modeling | Investipal',
    pageDescription: 'Create and model custom securities and alternative investments. Private equity, structured products, and performance tracking.',
    keywords: 'custom security builder, alternative investment modeling, private equity software, structured products, investment modeling tools',

    // Hero Section
    audienceText: 'For Advisors & Planners',
    featureName: 'Custom Security Builder',
    title: 'Effortlessly Create & Manage Custom Securities at Scale',
    subtitle: 'Effortlessly create, customize, and track securities. Whether managing alternative investments, private equity, or structured products, our builder enables precise security modeling, automated structuring, and seamless performance tracking.',
    heroImage: '/images/external/67a0f97d1cbc00d15a66b4da_screenshot-2025-02-03-121414.png',
    heroImageAlt: 'Custom Security Builder interface showcasing features like modeling, proposal generation, and data optimization tools',

    // Features Section (2x2 grid)
    features: [
      {
        icon: icons.optimization,
        title: 'Define & Customize Securities',
        description: 'Model securities with historical returns, risk metrics, and distribution schedules.'
      },
      {
        icon: icons.analysis,
        title: 'Bulk Upload & Automate Data Entry',
        description: 'Easily import performance data from Excel for fast, efficient processing.'
      },
      {
        icon: icons.shield,
        title: 'Track Performance & Optimize Risk',
        description: 'Model investment performance, cash flows, and risk-adjusted returns.'
      },
      {
        icon: icons.monitoring,
        title: 'Private Market & Alternative Investments Support',
        description: 'Build structures like private equity funds, annuities, and more.'
      }
    ],
    dashboardImage: '/images/external/67a0fa5860e896984e58e055_screenshot-2025-02-03-121808.png',
    dashboardImageAlt: 'Visual representation of the Custom Security Builder tool showcasing features like data entry automation and proposal generation',

    // Productivity Section
    productivityTitle: 'Better operations and smarter resource utilization.',
    productivityDescription: 'Free up your time to spend on higher-value activities.',
    stats: [
      { value: '4x', label: 'Faster than traditional sales processes. Do in 1 day what used to take 4 weeks.' },
      { value: '70%', label: 'Cost savings versus comparative tech stack' }
    ]
  },

  'liquidity-optimization': {
    // SEO Meta
    pageTitle: 'Goal-Based Portfolio Construction | Spending-Based Asset Allocation Software | Investipal',
    pageDescription: 'Ensure clients never run out of money. Match every dollar to future spending needs with AI-powered goal-based portfolio construction. Perfect for retirement planning and multi-generational wealth.',
    keywords: 'goal-based portfolio construction, spending-based asset allocation, retirement portfolio planning, liquidity bucketing strategy, cash flow matching, goal-based investing software, retirement income planning',

    // Hero Section
    audienceText: 'For Financial Advisors & Wealth Managers',
    featureName: 'Goal-Based Portfolio Construction',
    title: 'Ensure Clients Never Run Out of Money: Match Every Dollar to a Future Goal',
    subtitle: 'Stop using generic asset allocation models. Build portfolios that match real spending needs across time horizons—from next year\'s expenses to multi-generational wealth transfer. Our AI engine automatically maps client goals to appropriate liquidity buckets, then optimizes remaining assets for growth while respecting risk tolerance and regulatory constraints.',
    heroImage: '/images/product_screenshots/liquidity_optimization_results_summary_v1_2025-11-14.png',
    heroImageAlt: 'Goal-based portfolio construction summary showing detailed portfolio analysis and metrics',

    // Features Section (2x2 grid)
    features: [
      {
        icon: icons.optimization,
        title: 'Map Every Goal to the Right Time Horizon',
        description: 'Enter client spending needs by year—retirement income, college tuition, home purchase, legacy gifts—or paste directly from Excel. Our engine automatically organizes goals into short-term (0-3 years), medium-term (3-10 years), and long-term (10+ years) buckets, ensuring the right assets fund each goal.'
      },
      {
        icon: icons.analysis,
        title: 'Smart Asset Matching by Liquidity Need',
        description: 'The system automatically matches investment strategies to time horizons: high-liquidity assets for near-term goals, balanced approaches for medium-term needs, and growth-focused strategies for long-term objectives. No more guessing which investments belong where.'
      },
      {
        icon: icons.portfolio,
        title: 'Automated Portfolio Optimization',
        description: 'Our AI engine builds the optimal portfolio by funding each goal first, then maximizing growth potential with remaining assets—all while staying within risk tolerance, meeting income targets, respecting regulatory limits, and maintaining proper diversification across your model universe.'
      },
      {
        icon: icons.monitoring,
        title: 'Clear Goal-Funding Status & Alerts',
        description: 'See exactly which goals are fully funded, underfunded, or at risk. Get detailed diagnostics showing goal coverage by time period, portfolio risk vs. target, surplus/shortfall by bucket, and complete holdings breakdown. Receive alerts when goals drift off track.'
      }
    ],
    dashboardImage: '/images/product_screenshots/liquidity_optimization_results_analysis_v1_2025-11-14.png',
    dashboardImageAlt: 'Goal-based portfolio construction analysis showing detailed breakdown and insights',

    // Productivity Section
    productivityTitle: 'Perfect for Retirement Planning, College Funding & Multi-Generational Wealth Transfer',
    productivityDescription: 'Build portfolios that match real client goals—not generic risk scores. Show clients exactly how their money will fund their future.',
    stats: [
      { value: '10x', label: 'Faster goal-based portfolio construction' },
      { value: '100%', label: 'Automated goal-to-asset matching' }
    ]
  },

  'alternatives-proposals': {
    // SEO Meta
    pageTitle: 'Alternative Investment Proposal Software | Create Private Equity & Hedge Fund Proposals in 5 Minutes | Investipal',
    pageDescription: 'Win HNW clients with institutional-grade proposals that include alternatives. Generate private equity, private credit, and hedge fund proposals with automated risk scoring, fee modeling, and Reg BI compliance in 5 minutes.',
    keywords: 'alternative investment proposals, private equity proposals, hedge fund proposals, private market allocation, alternative investment software, institutional portfolio proposals, alternatives proposal generator, private investment proposals',

    // Hero Section
    audienceText: 'For RIAs & Wealth Advisors',
    featureName: 'Alternatives-Driven Proposals',
    title: 'Win High-Net-Worth Clients with Institutional-Grade Alternative Investment Proposals',
    subtitle: 'Stop losing prospects to competitors with better alternatives capabilities. Seamlessly integrate private equity, private credit, real estate, hedge funds, and custom private vehicles into client-ready proposals. Automatically incorporate risk scoring, liquidity constraints, fee modeling, and Reg BI compliance—all in 5 minutes.',
    heroImage: '/images/product_screenshots/proposal_cover_page_v3_2025-11-14.png',
    heroImageAlt: 'Professional investment proposal cover page with Investipal branding',

    // Features Section (2x2 grid)
    features: [
      {
        icon: icons.portfolio,
        title: 'Seamless Alternatives Integration',
        description: 'Unlike traditional proposal tools that only handle public markets, add private equity, private credit, real estate, hedge funds, interval funds, and custom private vehicles directly into proposals alongside stocks and bonds. No manual workarounds, no separate systems—just one unified proposal.'
      },
      {
        icon: icons.analysis,
        title: 'Automatic Risk & Liquidity Scoring',
        description: 'Our engine automatically calculates risk metrics, liquidity constraints, and suitability scores for mixed public/private allocations. Ensure every proposal reflects accurate portfolio characteristics and regulatory requirements—no spreadsheet calculations needed.'
      },
      {
        icon: icons.document,
        title: 'Comprehensive Fee & Performance Modeling',
        description: 'Model management fees, performance fees, hurdle rates, and waterfall structures. Show prospects side-by-side comparisons with their current portfolios, including detailed fee impact analysis and net return projections. Make the case for alternatives crystal clear.'
      },
      {
        icon: icons.shield,
        title: 'Compliance-Ready Documentation',
        description: 'Generate proposals that align with Reg BI and Know Your Product (KYP) requirements. Automated suitability checks, accreditation verification, and compliance audit trails built into every proposal. Pass compliance review the first time.'
      }
    ],
    dashboardImage: '/images/product_screenshots/portfolio_comparison_results_v1_2025-11-14.png',
    dashboardImageAlt: 'Portfolio comparison showing current vs proposed portfolios with AI-powered insights',

    // Productivity Section
    productivityTitle: 'Close More HNW Clients by Offering What They Actually Want: Access to Alternatives',
    productivityDescription: 'As HNW clients increasingly demand alternatives exposure, differentiate your practice with institutional-style proposals that showcase sophisticated portfolio construction.',
    stats: [
      { value: '95%', label: 'Time saved on alternatives proposals' },
      { value: '5 min', label: 'Generate complete proposals with alternatives' }
    ]
  },

  'alternatives-modeling': {
    // SEO Meta
    pageTitle: 'Alternative Investment Portfolio Management Software | Private Markets Platform | Investipal',
    pageDescription: 'Build and analyze portfolios with private market investments. Access our database of private equity, private credit, and real assets with risk/return/performance metrics—or model custom alternatives. Institutional-grade portfolio construction for family offices and RIAs.',
    keywords: 'alternative investment modeling, private equity modeling, private credit analysis, private market portfolio, institutional portfolio construction, alternatives portfolio management, private markets software, alternatives database, private equity performance tracking',

    // Hero Section
    audienceText: 'For Family Offices & Alt-Heavy RIAs',
    featureName: 'Alternatives Portfolio Management',
    title: 'Build and Analyze Portfolios with Private Market Investments',
    subtitle: 'Access our database of private equity, private credit, real assets, and venture investments with tracked risk/return/performance metrics. Don\'t see what you need? Model custom alternatives with our flexible security builder. Analyze portfolios across all asset classes with unified risk assessment, performance tracking, and portfolio comparison tools.',
    heroImage: '/images/product_screenshots/client_overview_performance_v1_2025-11-14.png',
    heroImageAlt: 'Client portfolio overview showing household asset allocation and performance tracking with benchmark comparisons',

    // Features Section (2x2 grid)
    features: [
      {
        icon: icons.portfolio,
        title: 'Database of Private Market Securities',
        description: 'Access our comprehensive database of private equity, private credit, real assets, and venture investments. Each security includes tracked risk/return/performance metrics, correlation data, and historical returns. Search by strategy, vintage, sector, or geography to find the right alternatives for your portfolios.'
      },
      {
        icon: icons.optimization,
        title: 'Custom Private Security Builder',
        description: 'Model custom alternatives not in our database. Create securities for private equity funds, private credit, co-investments, evergreen structures, and fund-of-funds. Define return profiles, volatility assumptions, liquidity terms, fee structures, and correlation assumptions. Model any private investment structure.'
      },
      {
        icon: icons.analysis,
        title: 'Multi-Asset Portfolio Analysis',
        description: 'Analyze portfolios across all asset classes—equities, fixed income, alternatives, and annuities—in unified reports. Run portfolio comparison, Monte Carlo simulation, tax transition analysis, and risk assessment. See how private allocations impact overall portfolio risk/return profiles and compare alternative strategies vs. public market benchmarks.'
      },
      {
        icon: icons.monitoring,
        title: 'Unified Performance Tracking',
        description: 'Track portfolio performance including both public and private assets in one view. Monitor risk metrics, asset allocation, and performance attribution across all asset classes. Calculate IRR, TVPI, DPI, RVPI, and time-weighted returns with accurate performance tracking for alternatives alongside traditional investments.'
      }
    ],
    dashboardImage: '/images/external/67a0fa5860e896984e58e055_screenshot-2025-02-03-121808.png',
    dashboardImageAlt: 'Alternative investment portfolio management dashboard showing capital call analysis and performance metrics',

    // Productivity Section
    productivityTitle: 'Perfect for: Multi-Family Offices Managing $500M+, RIAs with 20%+ Alternatives, Endowments & Foundations',
    productivityDescription: 'Build portfolios with alternatives using our database of private market securities—or model custom alternatives. Institutional-grade portfolio construction and analysis without hiring a team of analysts.',
    stats: [
      { value: '10x', label: 'Faster alternatives modeling vs. spreadsheets' },
      { value: '100+', label: 'Private securities in our database' }
    ]
  },

  'annuities-insurance-modeling': {
    // SEO Meta
    pageTitle: 'Annuity & Insurance Modeling | FIA & IUL Analysis | Investipal',
    pageDescription: 'Advanced annuity modeling with participation rates, cap rates, floor rates, spreads, and crediting methods. Configure premiums, payouts, COLA adjustments, and contributions for comprehensive FIA and IUL analysis.',
    keywords: 'annuity modeling software, FIA modeling, IUL illustration, indexed annuity calculator, annuity comparison tool, participation rate calculator, cap rate modeling, annuity illustration software, annuity proposal generator, insurance modeling, retirement income planning, guaranteed income analysis, variable annuity analysis, annuity software for advisors',

    // Hero Section
    audienceText: 'For Hybrid Advisors & Insurance Professionals',
    featureName: 'Annuities & Insurance Modeling',
    title: 'Unify Insurance and Investment Planning in One Platform',
    subtitle: 'Model fixed indexed annuities with comprehensive parameter controls including participation rates, cap rates, floor rates, spreads, and crediting methods. Configure premium structures, accumulation periods, payout options, and COLA adjustments to show clients complete retirement income projections.',
    heroImage: '/images/product_screenshots/portfolio_simulation_results_v1_2025-11-14.png',
    heroImageAlt: 'Monte Carlo portfolio simulation showing projected returns and AI-powered insights for retirement planning',

    // Features Section (2x2 grid)
    features: [
      {
        icon: icons.optimization,
        title: 'Comprehensive Annuity Parameter Controls',
        description: 'Configure participation rates, cap rates, floor rates, and spreads to model indexed annuity performance. Select crediting methods (Annual Point to Point, etc.) and set expected returns with volatility assumptions for accurate growth projections.'
      },
      {
        icon: icons.analysis,
        title: 'Flexible Premium & Payout Structures',
        description: 'Model various premium types, amounts, and frequencies. Define accumulation years and configure payout types, periods, and rates. Include COLA adjustments to show inflation-protected income streams that reflect real client scenarios.'
      },
      {
        icon: icons.portfolio,
        title: 'Dynamic Contributions & Withdrawals',
        description: 'Add multiple contribution schedules and withdrawal events throughout the policy lifecycle. Model how additional premiums and systematic withdrawals impact cash value growth, income availability, and long-term policy performance.'
      },
      {
        icon: icons.document,
        title: 'Integrated Portfolio Simulations',
        description: 'Run side-by-side comparisons of annuity strategies versus portfolio-based approaches. Show clients how guaranteed income from annuities complements market-based investments, with clear visualizations of risk-adjusted returns and income certainty.'
      }
    ],
    dashboardImage: '/images/product_screenshots/custom_security_builder_performance_v2_2025-11-11.png',
    dashboardImageAlt: 'Annuity performance modeling showing IRR, TVPI, DPI, RVPI metrics and historical returns',

    // Productivity Section
    productivityTitle: 'Insurance + Investments, Unified',
    productivityDescription: 'Stop juggling separate systems for insurance and investment planning.',
    stats: [
      { value: '90%', label: 'Time saved vs. manual spreadsheet calculations' },
      { value: '5 min', label: 'To model complex annuity scenarios' }
    ]
  },

  'client-onboarding': {
    // SEO Meta
    pageTitle: 'Client Onboarding Software | Automated Onboarding | Investipal',
    pageDescription: 'Streamline client onboarding with one secure link. Automated risk assessments, statement uploads, AML checks, e-signature, and advisory agreements. Complete onboarding in days, not weeks.',
    keywords: 'client onboarding software, automated client onboarding, financial advisor onboarding, e-signature for advisors, AML verification, risk assessment automation, advisory agreement software, client intake automation, onboarding automation',

    // Hero Section
    audienceText: 'For All Financial Advisors',
    featureName: 'Client Onboarding',
    title: 'Onboard Clients in Days, Not Weeks—With One Secure Link',
    subtitle: 'Send prospects one branded portal to complete everything: risk assessment, statement upload, AML verification, disclosures, and advisory agreement signing. Built-in e-signature. Zero back-and-forth emails. Complete onboarding 10x faster.',
    heroImage: '/images/product_screenshots/client_onboarding_portal_v3_2025-11-11.png',
    heroImageAlt: 'Client onboarding portal showing branded interface with risk assessment, document upload, and e-signature workflow',

    // Features Section (2x2 grid)
    features: [
      {
        icon: icons.optimization,
        title: 'Configure Your Perfect Onboarding Workflow',
        description: 'Choose what you need: risk assessment questionnaires, statement uploads, client information requests, AML/ID verification (scan driver\'s license, cross-check with OFAC), disclosure forms, and advisory agreements. Configure the order and what you collect—fully customizable to your process.'
      },
      {
        icon: icons.shield,
        title: 'One Secure, Branded Portal for Clients',
        description: 'Send prospects one link to a secure, custom-branded portal. They complete everything in one place—on their phone or desktop. No app downloads, no account creation, no confusion. Just a clean, professional experience that reflects your brand.'
      },
      {
        icon: icons.document,
        title: 'Built-In E-Signature—No Third-Party Tools',
        description: 'E-signature is built directly into the platform. Clients sign advisory agreements, disclosures, and compliance documents right in the portal. No DocuSign, no HelloSign, no extra logins. Track signature status in real-time and get instant notifications when complete.'
      },
      {
        icon: icons.monitoring,
        title: 'Complete Workflow Integration',
        description: 'Use as a standalone onboarding tool—or as the final step in your Investipal sales workflow. Complete data intake, run analysis, generate a personalized proposal to win the business, create an IPS instantly, then send the onboarding portal for completion. All in one seamless workflow.'
      }
    ],
    dashboardImage: '/images/product_screenshots/client_documents_esign_v1_2025-11-14.png',
    dashboardImageAlt: 'Document management dashboard showing e-signature workflow and onboarding status tracking',

    // Productivity Section
    productivityTitle: 'Close Deals Faster and Onboard More Clients',
    productivityDescription: 'Stop chasing clients for documents and signatures. Automate your entire onboarding process and focus on growing your practice.',
    stats: [
      { value: '10x', label: 'Faster onboarding vs. manual processes' },
      { value: '90%', label: 'Reduction in back-and-forth emails' }
    ]
  }

  // Add more feature pages here as needed...
} as const;

export type FeaturePageKey = keyof typeof featurePages;
