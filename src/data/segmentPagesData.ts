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
}

export const segmentPages: Record<string, SegmentPageProps> = {
  'financial-planners': {
    // SEO Meta
    pageTitle: 'Financial Planning Software | AI Portfolio Construction | Investipal',
    pageDescription: 'Financial planning software with AI portfolio construction, automated compliance, and client analytics. Streamline your planning practice with powerful automation tools.',
    keywords: 'financial planning software, financial advisor automation, portfolio construction tools, compliance automation for planners, financial planning technology',

    // Hero Section
    segmentName: 'Financial Planners',
    title: 'AI-Powered Efficiency for Financial Planners',
    subtitle: 'Bridge the gap between financial planning and portfolio management with automated portfolio construction, real-time analytics, and compliance-ready proposals.',
    heroImage: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/679d01fa9b7abc3b91d1b768_Untitled%20design%20(7).png',
    heroImageAlt: 'Financial Planning Platform Dashboard',

    // Main intro section
    mainTitle: 'AI-Powered Efficiency for Financial Planners',
    mainSubtitle: 'Bridge the gap between financial planning and portfolio management with automated portfolio construction, real-time analytics, and compliance-ready proposals.',

    // Main Content Sections
    sections: [
      {
        id: 'portfolios',
        sectionHeader: 'Portfolios',
        title: 'AI-Driven Portfolio Construction',
        description: 'Investipal\'s portfolio construction engine enables planners to build hyper-personalized portfolios',
        bulletPoints: [
          { text: '<strong>AI-driven portfolio construction</strong> <strong>& management</strong> – Build fully customized client portfolios in seconds & optimize in 1-click' },
          { text: '<strong>Multi-factor optimization</strong> – Align portfolios with risk tolerance, income needs, and long-term goals' },
          { text: '<strong>Public and alternative assets</strong> – Seamlessly allocate across equities, ETFs, mutual funds, and alternatives' }
        ],
        image: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/6670bcd46fdbe25cd2633108_Group%2018.svg',
        imageAlt: 'Portfolio construction dashboard',
        imagePosition: 'right'
      },
      {
        id: 'analytics',
        sectionHeader: 'Analytics',
        title: 'Uncover Hidden Wealth & Provide Smarter Advice',
        description: 'Held-away assets and incomplete data make financial planning harder. Investipal <strong>automates data intake</strong> so you can deliver more accurate, proactive recommendations.',
        bulletPoints: [
          { text: '<strong>Instant account aggregation</strong> – Sync multiple accounts with ease' },
          { text: '<strong>AI-powered statement scanning</strong> – Extract holdings from PDFs and integrate seamlessly' },
          { text: '<strong>Advanced portfolio analytics</strong> – Identify risks, gaps, tax impacts and better allocation strategies' }
        ],
        image: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/6670c23549ff685ca6551088_Group%2020.svg',
        imageAlt: 'Analytics dashboard showing portfolio analysis',
        imagePosition: 'left'
      },
      {
        id: 'proposals-compliance',
        sectionHeader: 'Proposals & Compliance',
        title: 'Seamless Compliance & Proposal Generation',
        description: 'Clients expect <strong>clear, actionable financial plans</strong>—regulators expect <strong>accurate documentation</strong>. Investipal ensures you deliver both effortlessly.',
        bulletPoints: [
          { text: '<strong>One-click investment proposals</strong> – Turn insights into client-ready presentations instantly' },
          { text: '<strong>Automated compliance tools</strong> – IPS, Reg BI, KYP, and real-time monitoring' },
          { text: '<strong>Client-friendly reports & disclosures</strong> – Simplify complex financial strategies for better decision-making' }
        ],
        image: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/6785783f7aad463ffadbb7be_image.png',
        imageAlt: 'Compliance and proposal generation dashboard',
        imagePosition: 'right'
      }
    ],

    // Productivity Section
    productivityStats: [
      { value: '4x', label: 'Faster than traditional sales processes. Do in 1 day what used to take 4 weeks.' },
      { value: '70%', label: 'Cost savings versus comparative tech stack' }
    ]
  },

  'wealth-managers': {
    // SEO Meta
    pageTitle: 'Wealth Management Software | Portfolio Optimization | Investipal',
    pageDescription: 'Scale your wealth management practice with AI automation. Portfolio optimization, sales automation, and compliance management for wealth managers.',
    keywords: 'wealth management software, portfolio optimization, wealth manager tools, investment management platform, wealth advisor technology',

    // Hero Section
    segmentName: 'Wealth Managers',
    title: 'AI-Powered Growth for Wealth Managers',
    subtitle: 'Scale your practice with AI automation that streamlines every step of your sales and portfolio process.',
    heroImage: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/679d01fa9b7abc3b91d1b768_Untitled%20design%20(7).png',
    heroImageAlt: 'Wealth Management Platform Dashboard',

    // Main intro section
    mainTitle: 'AI-Powered Growth for Wealth Managers',
    mainSubtitle: 'Scale your practice with AI automation that streamlines every step of your sales and portfolio process.',

    // Main Content Sections
    sections: [
      {
        id: 'portfolios',
        sectionHeader: 'Portfolios',
        title: 'Personalized Portfolio Construction',
        description: 'Deliver customized investment solutions at scale—across public equities and alternative assets—with AI-powered automation.',
        bulletPoints: [
          { text: '<strong>AI-powered portfolio optimization</strong> tailored to individual risk profiles' },
          { text: '<strong>Robust backtesting and risk monitoring</strong> to uncover hidden exposures' },
          { text: '<strong>AI-driven portfolio construction</strong>—customized for each client, including alternative assets.' }
        ],
        image: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/66708c515646ac37490a9be8_Personalized%20portfolio%20construction.svg',
        imageAlt: 'Personalized portfolio construction dashboard',
        imagePosition: 'right'
      },
      {
        id: 'sales',
        sectionHeader: 'Sales',
        title: 'Automated Sales Process',
        description: 'Close more clients in record time with an <strong>end-to-end AI-driven workflow</strong> that eliminates manual bottlenecks.',
        bulletPoints: [
          { text: '<strong>Automated client intake</strong> – Instantly process RTQs, brokerage statements, and held-away assets' },
          { text: '<strong>AI-driven portfolio analysis</strong> – Identify gaps, risks, and opportunities within client portfolios, compare to your model(s), and model future returns' },
          { text: '<strong>Automated proposals</strong> – Convert prospects into clients faster with customized, high-impact proposals' }
        ],
        image: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/6670abaa94d486018a8cab6c_Group%204%20(3).svg',
        imageAlt: 'Automated sales process dashboard',
        imagePosition: 'left'
      },
      {
        id: 'compliance',
        sectionHeader: 'Compliance',
        title: 'AI Compliance Management',
        description: 'Stay fully compliant—without the administrative burden. Investipal automates regulatory workflows, so you can <strong>focus on advising, not paperwork.</strong>',
        bulletPoints: [
          { text: '<strong>Instant IPS & Reg BI document generation</strong>' },
          { text: '<strong>AI-driven KYP workflows</strong> for compliance & due diligence' },
          { text: '<strong>Continuous monitoring & automated reporting</strong>' }
        ],
        image: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/66708f9d65ce0074b7190ea0_AI%20Compliance%20Mgmt%20(2).svg',
        imageAlt: 'AI compliance management dashboard',
        imagePosition: 'right'
      }
    ],

    // Productivity Section
    productivityStats: [
      { value: '4x', label: 'Faster than traditional sales processes. Do in 1 day what used to take 4 weeks.' },
      { value: '70%', label: 'Cost savings versus comparative tech stack' }
    ]
  },

  'wealth-firms': {
    // SEO Meta
    pageTitle: 'Enterprise Wealth Management Software | Firm Solutions | Investipal',
    pageDescription: 'Enterprise wealth management platform for firms. Automate advisor workflows, ensure compliance, and drive AUM growth with AI-powered solutions.',
    keywords: 'enterprise wealth management, firm-wide compliance, advisor productivity tools, wealth firm technology, investment firm software',

    // Hero Section
    segmentName: 'Wealth Firms',
    title: 'An Enterprise-Ready Solution for Modern Wealth Firms',
    subtitle: 'Eliminate inefficiencies, increase advisor productivity, and drive AUM growth through automation, data intelligence, and compliance-ready workflows.',
    heroImage: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/679d01fa9b7abc3b91d1b768_Untitled%20design%20(7).png',
    heroImageAlt: 'Enterprise Wealth Management Platform Dashboard',

    // Main intro section
    mainTitle: 'An Enterprise-Ready Solution for Modern Wealth Firms',
    mainSubtitle: 'Eliminate inefficiencies, increase advisor productivity, and drive AUM growth through automation, data intelligence, and compliance-ready workflows.',

    // Main Content Sections
    sections: [
      {
        id: 'sales',
        sectionHeader: 'Sales',
        title: 'Close More Business, Faster',
        description: 'Reduce operational drag by automating key advisor workflows—from client profiling to portfolio proposals—while maintaining firm-wide consistency.',
        bulletPoints: [
          { text: '<strong>Automated client intake</strong> – From risk assessments to brokerage statement scanning' },
          { text: '<strong>Instant analysis</strong> – Automated portfolio analysis, comparisons and Monte Carlo modelling' },
          { text: '<strong>One-click proposal generation</strong> – Ensure every advisor delivers high-converting, compliance-ready recommendations' }
        ],
        image: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/6670abaa94d486018a8cab6c_Group%204%20(3).svg',
        imageAlt: 'Sales automation dashboard',
        imagePosition: 'right'
      },
      {
        id: 'portfolios',
        sectionHeader: 'Portfolios',
        title: 'Personalized Portfolio Construction—At Scale',
        description: 'Ensure consistent investment outcomes across the firm while allowing for personalization at the advisor level. Investipal\'s AI-driven portfolio engine builds optimized, risk-adjusted portfolios in seconds.',
        bulletPoints: [
          { text: '<strong>Firm-wide investment mandates, applied dynamically</strong> – Standardize portfolio strategy while adapting to each client\'s needs' },
          { text: '<strong>AI-powered asset allocation</strong> – Automatically construct portfolios across equities, ETFs, mutual funds, and alternatives' },
          { text: '<strong>Automated rebalancing & risk monitoring</strong> – Maintain alignment with client goals and market conditions' }
        ],
        image: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/6670b5d811b10734a1372edc_2024%2C%2014_50_09%20GMT-4.svg',
        imageAlt: 'Portfolio construction at scale dashboard',
        imagePosition: 'left'
      },
      {
        id: 'compliance',
        sectionHeader: 'Compliance',
        title: 'Reduce Compliance Risks While Driving Growth',
        description: 'Regulatory oversight shouldn\'t slow down expansion. Investipal ensures compliance firm-wide, reducing risk while freeing your team to focus on AUM growth.',
        bulletPoints: [
          { text: '<strong>Automated IPS & Reg BI documentation</strong> – Generate compliant documents instantly' },
          { text: '<strong>Firm-wide KYP & portfolio monitoring</strong> – Ensure advisors meet fiduciary obligations at scale' },
          { text: '<strong>Audit-ready data tracking & reporting</strong> – Reduce manual oversight and mitigate compliance risk' }
        ],
        image: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/667092e94a00c3fc66619dfc_AI%20Compliance%20Mgmt%20(4).svg',
        imageAlt: 'Enterprise compliance management dashboard',
        imagePosition: 'right'
      }
    ],

    // Productivity Section
    productivityStats: [
      { value: '4x', label: 'Faster than traditional sales processes. Do in 1 day what used to take 4 weeks.' },
      { value: '70%', label: 'Cost savings versus comparative tech stack' }
    ]
  },

  'insurance': {
    // SEO Meta
    pageTitle: 'Insurance Advisor Software | IUL & Annuity Modeling | Investipal',
    pageDescription: 'Insurance advisor software with automated IUL modeling, annuity calculations, and proposal generation. Streamline insurance sales processes.',
    keywords: 'insurance advisor software, IUL modeling, annuity calculation tools, insurance proposal software, life insurance technology',

    // Hero Section
    segmentName: 'Insurance',
    title: 'AI-Powered Efficiency for Insurance Advisors',
    subtitle: 'Save time, eliminate manual calculations, and present clear, data-driven insights that help clients make confident decisions.',
    heroImage: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/679d01fa9b7abc3b91d1b768_Untitled%20design%20(7).png',
    heroImageAlt: 'Insurance Planning Platform Dashboard',

    // Main intro section
    mainTitle: 'AI-Powered Efficiency for Insurance Advisors',
    mainSubtitle: 'Save time, eliminate manual calculations, and present clear, data-driven insights that help clients make confident decisions.',

    // Main Content Sections
    sections: [
      {
        id: 'portfolios',
        sectionHeader: 'Portfolios',
        title: 'Automate Complex IUL & Annuity Calculations',
        description: 'Eliminate manual effort and reduce errors with AI-driven tools that handle everything from <strong>premium calculations to withdrawal strategies</strong>.',
        bulletPoints: [
          { text: '<strong>Automated policy modeling</strong> – Generate accurate projections instantly' },
          { text: '<strong>Advanced growth forecasting</strong> – Compare multiple scenarios for better decision-making' },
          { text: '<strong>Instant proposal generation</strong> – Deliver personalized recommendations in minutes' }
        ],
        image: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/679d4c8a1904a711c70ae837_Untitled%20design%20(11).png',
        imageAlt: 'IUL and annuity modeling dashboard',
        imagePosition: 'right'
      },
      {
        id: 'sales',
        sectionHeader: 'Sales',
        title: 'Deliver Clear, Data-Driven Insights',
        description: 'Turn intricate data into <strong>easy-to-understand forecasts and comparisons</strong> so clients can make informed choices with confidence.',
        bulletPoints: [
          { text: '<strong>Interactive scenario analysis</strong>– Compare different funding and withdrawal strategies' },
          { text: '<strong>Visualized growth projections</strong>– Help clients understand long-term impact' },
          { text: '<strong>Side-by-side policy comparisons</strong> – Present options clearly and transparently' }
        ],
        image: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/6785969aab7035ae2acd1bf0_Untitled%20design%20(2).png',
        imageAlt: 'Insurance sales insights dashboard',
        imagePosition: 'left'
      },
      {
        id: 'compliance',
        sectionHeader: 'Compliance',
        title: 'Streamline Proposal Creation',
        description: 'Build <strong>customized, visually compelling proposals</strong> in minutes—designed to convert prospects into long-term clients.',
        bulletPoints: [
          { text: '<strong>Fully automated proposal generation</strong> – Reduce prep time and close deals faster' },
          { text: '<strong>Clear, client-friendly visuals</strong>– Simplify complex insurance and annuity structures' },
          { text: '<strong>Automated compliance documentation</strong> – Ensure all proposals meet regulatory requirements' }
        ],
        image: 'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/6785783f7aad463ffadbb7be_image.png',
        imageAlt: 'Insurance proposal generation dashboard',
        imagePosition: 'right'
      }
    ],

    // Productivity Section
    productivityStats: [
      { value: '4x', label: 'Faster than traditional sales processes. Do in 1 day what used to take 4 weeks.' },
      { value: '70%', label: 'Cost savings versus comparative tech stack' }
    ]
  }
} as const;

// Export individual segment page data for easier access
export const financialPlannersData = segmentPages['financial-planners'];
export const wealthManagersData = segmentPages['wealth-managers'];
export const wealthFirmsData = segmentPages['wealth-firms'];
export const insuranceData = segmentPages['insurance'];
