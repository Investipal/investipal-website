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
    heroImage: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/66cf592dcb1be92d31050903_Account%20Statement%20Scanning%20for%20Financial%20Advisors%201.png',
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
    dashboardImage: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/66cf56bf0f86f453970dad3d_2024%2C%2018_51_39%20GMT-4%201%20(3).png',
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
    heroImage: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/672e80ad7acd7627388aeb71_33.3%25%20(1).png',
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
    dashboardImage: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/672e8161712202e983252f86_33.3%25%20(3).png',
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
    heroImage: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/67d2fb99697373d9bc7afaaa_Screenshot%202025-03-13%20111643.png',
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
    dashboardImage: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/67d2fc16d99cc77d92191a9d_Screenshot%202025-03-13%20111543.png',
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
    pageTitle: 'Client Acquisition Automation | Financial Advisor Sales | Investipal',
    pageDescription: 'Automate your client acquisition process. Risk assessment, portfolio analysis, and proposal generation powered by AI.',
    keywords: 'client acquisition automation, financial advisor sales software, automated proposals, risk assessment tools, prospect conversion',

    // Hero Section
    audienceText: 'For Advisors & Planners',
    featureName: 'Sales Enablement Platform',
    title: 'Automate Your Client Acquisition Process with AI',
    subtitle: 'From risk assessment to portfolio analysis and personalized proposals, Investipal empowers advisors to focus on building relationships and growing their practice.',
    heroImage: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/66e49de3e0861a7034eb995e_Investment%20proposal%20generator.png',
    heroImageAlt: 'MacBook mockup showing investment proposal generator interface',

    // Features Section (2x2 grid)
    features: [
      {
        icon: icons.speed,
        title: 'Automated Risk Tolerance Questionnaire (RTQ)',
        description: 'Our 3-factor risk questionnaire assesses risk capacity, behavioral characteristics and current portfolio risk to generate a risk tolerance score, and flags potential discrepancies to support strategy selection.'
      },
      {
        icon: icons.analysis,
        title: 'AI Brokerage Statement Data Extraction & Analysis',
        description: 'Leverage Optical Character Recognition (OCR) and AI to completely automate client brokerage account statements data extraction, validation and analysis.'
      },
      {
        icon: icons.shield,
        title: 'Automated Comparative Portfolio Analysis',
        description: 'Utilize an advanced backtesting engine for a comprehensive and instant comparison of model(s) to client portfolio, enabling you to quickly identify optimal strategies, streamline decision-making, and win the business.'
      },
      {
        icon: icons.monitoring,
        title: 'Automated Investment Proposal Generation',
        description: 'Create personalized investment proposals instantly, giving you more time to focus on building relationships.'
      }
    ],
    dashboardImage: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/66e49e9b47b74cbcf82ad5a2_Portfolio%20Comparison%20(1).png',
    dashboardImageAlt: 'Dashboard mockup showing portfolio comparison interface',

    // Productivity Section
    productivityTitle: 'Better operations and smarter resource utilization.',
    productivityDescription: 'Free up your time to spend on higher-value activities.',
    stats: [
      { value: '4x', label: 'Faster than traditional sales processes. Do in 1 day what used to take 4 weeks.' },
      { value: '70%', label: 'Cost savings versus comparative tech stack' }
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
    heroImage: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/66e3394ad754f2dd7ec8ee68_Reg%20BI%20(1).png',
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
    dashboardImage: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/66e33a7b1564936bac69f8a9_Risk%20profile%20(1).png',
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
    heroImage: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/66da118db938e0ddbcc47d8c_Investment%20Policy%20Statement%20Generator.png',
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
    dashboardImage: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/66df52298b82cebf2ffd7e59_Untitled%20design%20(3).png',
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
    heroImage: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/66e30ff444d57784dc98bf20_risk%20insights%20(3).png',
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
    dashboardImage: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/66e316ea14404e1e88b824c8_Untitled%20design%20(4).png',
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
    heroImage: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/67a0f97d1cbc00d15a66b4da_Screenshot%202025-02-03%20121414.png',
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
    dashboardImage: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/67a0fa5860e896984e58e055_Screenshot%202025-02-03%20121808.png',
    dashboardImageAlt: 'Visual representation of the Custom Security Builder tool showcasing features like data entry automation and proposal generation',

    // Productivity Section
    productivityTitle: 'Better operations and smarter resource utilization.',
    productivityDescription: 'Free up your time to spend on higher-value activities.',
    stats: [
      { value: '4x', label: 'Faster than traditional sales processes. Do in 1 day what used to take 4 weeks.' },
      { value: '70%', label: 'Cost savings versus comparative tech stack' }
    ]
  },

  'iul-annuity-modeling': {
    // SEO Meta
    pageTitle: 'IUL & Annuity Modeling Software | Insurance Planning | Investipal',
    pageDescription: 'Advanced IUL and annuity modeling software. Automate policy calculations, growth forecasting, and proposal generation.',
    keywords: 'IUL modeling software, annuity calculation tools, insurance planning software, life insurance modeling, insurance advisor technology',

    // Hero Section
    audienceText: 'For Advisors & Planners',
    featureName: 'Sales Enablement Platform',
    title: 'Automate Your IUL and Annuity Modeling Process with AI',
    subtitle: 'Investipal\'s Advanced IUL & Annuity Modeling tool simplifies policy design, premium calculations, and proposals, enabling advisors to focus on client relationships instead of manual tasks.',
    heroImage: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/678577d2945b0c05117d13dc_Screenshot%202025-01-13%20152940.png',
    heroImageAlt: 'IUL & Annuity Modeling dashboard showing automated policy design and calculations',

    // Features Section (2x2 grid)
    features: [
      {
        icon: icons.optimization,
        title: 'Forecast Growth with Clarity',
        description: 'Show clients the future with precise growth simulations benchmarked against market indices, making complex products easier to understand.'
      },
      {
        icon: icons.document,
        title: 'Automate Tedious Calculations',
        description: 'Eliminate hours of manual effort with AI-driven tools for premiums, policies, and withdrawal strategies.'
      },
      {
        icon: icons.shield,
        title: 'Compare Scenarios with Ease',
        description: 'Quickly evaluate multiple policy strategies to identify the best fit for your client.'
      },
      {
        icon: icons.monitoring,
        title: 'Create Proposals That Win',
        description: 'Generate personalized, data-driven proposals that inspire confidence and turn prospects into long-term clients.'
      }
    ],
    dashboardImage: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/67857da6d8c446a3445ae3d0_IUL%20Modeler%20(2).png',
    dashboardImageAlt: 'IUL & Annuity Modeling Dashboard showing comprehensive policy analysis and modeling tools',

    // Productivity Section
    productivityTitle: 'Better operations and smarter resource utilization.',
    productivityDescription: 'Free up your time to spend on higher-value activities.',
    stats: [
      { value: '4x', label: 'Faster than traditional sales processes. Do in 1 day what used to take 4 weeks.' },
      { value: '70%', label: 'Cost savings versus comparative tech stack' }
    ]
  }

  // Add more feature pages here as needed...
} as const;

export type FeaturePageKey = keyof typeof featurePages;
