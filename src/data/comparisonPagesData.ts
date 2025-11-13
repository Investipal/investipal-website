/**
 * Comparison Pages Data
 * 
 * This file contains all the content and configuration for competitor comparison pages.
 * Update this file to add new competitor comparisons.
 * 
 * Pattern: Each competitor gets one data object
 * Usage: Import in /src/pages/compare/[competitor]-alternative.astro
 */

export interface ComparisonPageData {
  // SEO Meta
  pageTitle: string;
  pageDescription: string;
  keywords: string;
  
  // Competitor Info
  competitorName: string;
  competitorLogo?: string;
  competitorTagline: string;
  competitorWebsite?: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  heroImageAlt?: string;
  
  // Comparison Table
  comparisonTable: {
    categories: Array<{
      name: string; // e.g., "Core Features"
      features: Array<{
        feature: string;
        competitor: boolean | string; // true/false or "$X/month" or "Limited"
        investipal: boolean | string;
        investipalNote?: string; // Optional highlight/badge
      }>;
    }>;
  };
  
  // Why Switch Section
  whySwitchReasons: Array<{
    icon: string; // SVG path
    title: string;
    description: string;
  }>;
  
  // Migration Guide
  migrationSteps: Array<{
    stepNumber: number;
    title: string;
    description: string;
    timeEstimate: string; // e.g., "5 minutes"
  }>;
  
  // Testimonial (optional - specific to competitor switchers)
  testimonial?: {
    quote: string;
    author: string;
    title: string;
    company: string;
    image?: string;
  };
  
  // Related Resources
  relatedFeatures?: Array<{
    title: string;
    href: string;
  }>;
}

// Icon library for consistent usage
export const comparisonIcons = {
  allInOne: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>',
  automation: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>',
  document: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>',
  money: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  shield: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>',
  integration: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>',
  analytics: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>',
  users: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>',
  speed: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>'
} as const;

export const comparisonPages: Record<string, ComparisonPageData> = {
  'ycharts-alternative': {
    // SEO Meta
    pageTitle: 'YCharts Alternative | Complete Advisor Platform vs Research Tool | Investipal',
    pageDescription: 'Switch from YCharts to Investipal for comprehensive portfolio management beyond research and analytics. Get proposal generation, compliance automation, client onboarding, and portfolio construction in one unified platform.',
    keywords: 'YCharts alternative, YCharts competitor, YCharts vs Investipal, investment research platform alternative, financial advisor software, portfolio management software, comprehensive advisor platform, YCharts replacement',
    
    // Competitor Info
    competitorName: 'YCharts',
    competitorTagline: 'Investment research and data platform',
    competitorWebsite: 'https://ycharts.com',
    
    // Hero Section
    heroTitle: 'The Complete Alternative to YCharts',
    heroSubtitle: 'Go beyond research and data visualization. Get portfolio construction, automated compliance, client onboarding, and proposal generation in one unified platform—not just charts and analytics.',
    heroImage: '/images/external/68556380691d8adc81db4f23_untitled-design-17.png',
    heroImageAlt: 'Investipal comprehensive platform dashboard',
    
    // Comparison Table
    comparisonTable: {
      categories: [
        {
          name: 'Research & Analytics',
          features: [
            { feature: 'Investment Research & Data', competitor: 'Advanced', investipal: true },
            { feature: 'Fund & Stock Screeners', competitor: true, investipal: true },
            { feature: 'Fundamental Charts & Visualization', competitor: 'Advanced', investipal: true },
            { feature: 'Technical Charts', competitor: true, investipal: false },
            { feature: 'Economic Data & Indicators', competitor: 'Advanced', investipal: false },
            { feature: 'Model Portfolios & Backtesting', competitor: 'Basic', investipal: 'Advanced' },
            { feature: 'Portfolio Optimizer', competitor: 'Basic', investipal: 'Advanced' },
          ]
        },
        {
          name: 'Portfolio Management & Construction',
          features: [
            { feature: 'AI-Powered Portfolio Construction', competitor: false, investipal: true, investipalNote: 'Build optimized portfolios in seconds' },
            { feature: 'Asset Allocation Optimization', competitor: 'Basic', investipal: 'Advanced', investipalNote: 'Multi-constraint optimization' },
            { feature: 'Custom Security Builder', competitor: 'Basic', investipal: 'Advanced', investipalNote: 'Model alternatives & private assets' },
            { feature: 'Portfolio Rebalancing', competitor: false, investipal: true },
            { feature: 'Tax-Loss Harvesting', competitor: false, investipal: true },
            { feature: 'Drift Monitoring & Alerts', competitor: false, investipal: true },
          ]
        },
        {
          name: 'Client Onboarding & Data Management',
          features: [
            { feature: 'Statement Scanning (Quick Extract)', competitor: 'Basic', investipal: 'Advanced' },
            { feature: 'Portfolio Data Import', competitor: true, investipal: true },
            { feature: 'CRM & Custodian Integrations', competitor: 'Advanced', investipal: true },
            { feature: 'Account Aggregation (Held-Away Assets)', competitor: 'Basic', investipal: 'Advanced' },
            { feature: 'Document Generation & E-Signature', competitor: false, investipal: true },
            { feature: 'AML & ID Verification', competitor: false, investipal: true },
            { feature: 'Client Portal', competitor: false, investipal: true },
            { feature: 'Client Relationship Management', competitor: false, investipal: true },
          ]
        },
        {
          name: 'Proposals & Client Communication',
          features: [
            { feature: 'Custom Reports & Presentations', competitor: 'Advanced', investipal: 'Advanced' },
            { feature: 'Portfolio Proposals', competitor: 'Basic', investipal: 'Advanced' },
            { feature: 'What-If Scenarios', competitor: true, investipal: 'Advanced' },
            { feature: 'Interactive Analysis Tools', competitor: true, investipal: 'Advanced' },
            { feature: 'Portfolio Comparison Analysis', competitor: 'Advanced', investipal: 'Advanced' },
            { feature: 'Risk Profiling & Scoring', competitor: 'Basic', investipal: 'Advanced' },
          ]
        },
        {
          name: 'Compliance & Documentation',
          features: [
            { feature: 'Investment Policy Statements (IPS)', competitor: false, investipal: true },
            { feature: 'Regulation Best Interest (Reg BI) Documentation', competitor: false, investipal: true },
            { feature: 'Know Your Product (KYP) Comparisons', competitor: false, investipal: true },
            { feature: 'Compliance Audit Trails', competitor: false, investipal: true },
            { feature: 'Suitability Documentation', competitor: false, investipal: true },
          ]
        }
      ]
    },
    
    // Why Switch Section
    whySwitchReasons: [
      {
        icon: comparisonIcons.allInOne,
        title: 'Beyond Research: Complete Workflow Automation',
        description: 'YCharts excels at research, data, and reporting—but requires 3-4 additional tools for portfolio construction, compliance, and client onboarding. Investipal unifies research, AI-powered portfolio construction, compliance automation, and complete client onboarding in one platform—eliminating data silos and reducing costs.'
      },
      {
        icon: comparisonIcons.speed,
        title: 'Advanced Statement Scanning & Onboarding',
        description: 'YCharts Quick Extract is limited: PDF/images only, 50 uploads/month, holdings extraction only. Investipal provides unlimited advanced statement scanning with any format, transaction-level detail, full portfolio analysis, plus e-signature, AML/ID verification, and automated compliance documentation—reducing onboarding from weeks to hours.'
      },
      {
        icon: comparisonIcons.analytics,
        title: 'AI-First vs. Data-First Platform',
        description: 'YCharts is a data and research platform with basic portfolio tools. Investipal is an AI-first platform that uses machine learning throughout—from portfolio construction to compliance automation to proposal generation—delivering 10x faster workflows and personalized client experiences at scale.'
      }
    ],
    
    // Migration Guide
    migrationSteps: [
      {
        stepNumber: 1,
        title: 'Book a Personalized Demo',
        description: 'Schedule a 15-minute walkthrough tailored to your YCharts workflow. See exactly how Investipal compares and what you will gain by switching—especially around portfolio construction and compliance.',
        timeEstimate: '15 minutes'
      },
      {
        stepNumber: 2,
        title: 'Data Migration Support',
        description: 'Our team assists with seamless data transfer from YCharts. We ensure all model portfolios, research lists, and custom securities are accurately migrated to Investipal.',
        timeEstimate: '1-3 days'
      },
      {
        stepNumber: 3,
        title: 'Personalized Onboarding & Training',
        description: 'Get dedicated training for your team. We will help you set up your workflows, customize reports, and integrate Investipal into your practice—going beyond what YCharts offers.',
        timeEstimate: '1 week'
      },
      {
        stepNumber: 4,
        title: 'Go Live with Full Support',
        description: 'Launch Investipal with dedicated support. Run both platforms in parallel during your transition if needed. Cancel YCharts when you are ready—no rush.',
        timeEstimate: 'Immediate'
      }
    ],
    
    // Related Resources
    relatedFeatures: [
      { title: 'Portfolio Construction', href: '/features/portfolio-construction' },
      { title: 'Automated Statement Scanner', href: '/features/automated-statement-scanner' },
      { title: 'Proposal Generation', href: '/features/proposal-generation' },
      { title: 'Regulation Best Interest (Reg BI) Generator', href: '/features/regulation-best-interest-generator' },
      { title: 'Risk Management', href: '/features/risk-management' }
    ]
  },
  
  'nitrogen-alternative': {
    // SEO Meta
    pageTitle: 'Nitrogen Alternative | Riskalyze Alternative | Complete Portfolio Platform | Investipal',
    pageDescription: 'Switch from Nitrogen (formerly Riskalyze) to Investipal for comprehensive portfolio management, automated statement scanning, proposal generation, and compliance automation. All-in-one platform vs. point solution.',
    keywords: 'Nitrogen alternative, Riskalyze alternative, Nitrogen competitor, Riskalyze competitor, Nitrogen Wealth alternative, Nitrogen vs Investipal, Riskalyze vs Investipal, Risk Number alternative, portfolio management software, risk assessment tool alternative, financial advisor software, comprehensive advisor platform',
    
    // Competitor Info
    competitorName: 'Nitrogen',
    competitorTagline: 'Risk assessment and reporting tool (formerly Riskalyze)',
    competitorWebsite: 'https://nitrogenwealth.com',
    
    // Hero Section
    heroTitle: 'The Complete Alternative to Nitrogen (Formerly Riskalyze)',
    heroSubtitle: 'Go beyond risk assessment and the Risk Number®. Get portfolio construction, proposal generation, compliance automation, and client onboarding in one unified platform.',
    heroImage: '/images/external/68556380691d8adc81db4f23_untitled-design-17.png',
    heroImageAlt: 'Investipal comprehensive platform dashboard',
    
    // Comparison Table
    comparisonTable: {
      categories: [
        {
          name: 'Risk & Portfolio Analytics',
          features: [
            { feature: 'Risk Tolerance Assessment (Risk Number®)', competitor: true, investipal: true },
            { feature: 'Portfolio Risk Scoring', competitor: true, investipal: true },
            { feature: 'Stress Testing & Scenarios', competitor: true, investipal: true },
            { feature: 'Monte Carlo Simulations', competitor: true, investipal: true },
            { feature: 'Annuity & IUL Modeling', competitor: 'Basic', investipal: 'Advanced', investipalNote: 'Comprehensive modeling tools' },
            { feature: 'AI-Powered Portfolio Construction', competitor: false, investipal: true, investipalNote: 'Build optimized portfolios in seconds' },
            { feature: 'Asset Allocation Optimization', competitor: false, investipal: true, investipalNote: 'Multi-factor optimization' },
            { feature: 'Custom Security Builder', competitor: false, investipal: true, investipalNote: 'Model alternatives & private assets' },
          ]
        },
        {
          name: 'Client Onboarding & Data Management',
          features: [
            { feature: 'Automated Statement Scanning (OCR)', competitor: 'Basic', investipal: 'Advanced', investipalNote: 'Any format, transactions, holdings & full portfolio analysis' },
            { feature: 'Account Aggregation (Held-Away Assets)', competitor: true, investipal: true },
            { feature: 'Document Generation & E-Signature', competitor: false, investipal: true },
            { feature: 'AML & ID Verification', competitor: false, investipal: true },
            { feature: 'Client Portal', competitor: true, investipal: true },
          ]
        },
        {
          name: 'Proposals & Client Communication',
          features: [
            { feature: 'Risk Assessment Reports', competitor: true, investipal: true },
            { feature: 'Portfolio Proposals', competitor: 'Basic', investipal: 'Advanced', investipalNote: 'AI-generated, fully customizable' },
            { feature: 'Portfolio Comparison Analysis', competitor: 'Limited', investipal: true, investipalNote: 'Current vs. proposed with historical data' },
            { feature: 'What-If Scenarios', competitor: false, investipal: true },
            { feature: 'Tax Impact Analysis', competitor: false, investipal: true },
            { feature: 'Custom Branding', competitor: true, investipal: true },
          ]
        },
        {
          name: 'Compliance & Documentation',
          features: [
            { feature: 'Investment Policy Statements (IPS)', competitor: true, investipal: true, investipalNote: 'AI-generated in seconds' },
            { feature: 'Regulation Best Interest (Reg BI) Documentation', competitor: false, investipal: true },
            { feature: 'Know Your Product (KYP) Comparisons', competitor: false, investipal: true },
            { feature: 'Portfolio Drift Monitoring', competitor: false, investipal: true },
            { feature: 'Compliance Audit Trails', competitor: false, investipal: true },
            { feature: 'Automated Compliance Alerts', competitor: false, investipal: true },
          ]
        }
      ]
    },
    
    // Why Switch Section
    whySwitchReasons: [
      {
        icon: comparisonIcons.allInOne,
        title: 'True All-in-One Platform',
        description: 'Replace Nitrogen plus 3-4 other tools with one comprehensive platform. Investipal unifies risk assessment, portfolio construction, proposals, compliance automation, and client onboarding—eliminating the need for multiple disconnected "Centers" and third-party integrations.'
      },
      {
        icon: comparisonIcons.speed,
        title: 'Complete Client Onboarding',
        description: 'Nitrogen lacks onboarding capabilities. Investipal includes automated statement scanning with transaction-level detail, e-signature workflows, AML & ID verification, and compliance documentation generation—reducing onboarding from weeks to hours.'
      },
      {
        icon: comparisonIcons.analytics,
        title: 'Advanced Multi-Asset Handling',
        description: 'Go beyond traditional securities. Investipal provides comprehensive modeling for alternatives, private assets, annuities, IULs, and structured products with AI-powered portfolio construction and custom security builder—capabilities Nitrogen simply doesn\'t offer.'
      }
    ],
    
    // Migration Guide
    migrationSteps: [
      {
        stepNumber: 1,
        title: 'Book a Personalized Demo',
          description: 'Schedule a 15-minute walkthrough tailored to your Nitrogen workflow. See exactly how Investipal compares and what you will gain by switching.',
        timeEstimate: '15 minutes'
      },
      {
        stepNumber: 2,
        title: 'Data Migration Support',
        description: 'Our team helps migrate your client data, risk assessments, and portfolio information. We handle the heavy lifting—no manual re-entry required.',
        timeEstimate: '1-2 days'
      },
      {
        stepNumber: 3,
        title: 'Team Training & Onboarding',
        description: 'Get your entire team up to speed with personalized training sessions, video tutorials, and access to our comprehensive knowledge base and support team.',
        timeEstimate: '1 week'
      },
      {
        stepNumber: 4,
        title: 'Go Live with Full Support',
          description: 'Launch Investipal with dedicated support. Run both platforms in parallel during your transition if needed. Cancel Nitrogen when you are ready—no rush.',
        timeEstimate: 'Immediate'
      }
    ],
    
    // Related Resources
    relatedFeatures: [
      { title: 'Risk Management', href: '/features/risk-management' },
      { title: 'Asset Allocation', href: '/features/asset-allocation' },
      { title: 'Automated Statement Scanner', href: '/features/automated-statement-scanner' },
      { title: 'Investment Policy Statements', href: '/features/investment-policy-statements' },
      { title: 'Regulation Best Interest Generator', href: '/features/regulation-best-interest-generator' }
    ]
  },
  
  'morningstar-alternative': {
    // SEO Meta
    pageTitle: 'Morningstar Alternative | Complete Advisor Platform vs Research Tool | Investipal',
    pageDescription: 'Switch from Morningstar Advisor Workstation to Investipal for modern AI-powered portfolio management. Get automated compliance, client onboarding, and portfolio construction beyond traditional research and planning tools.',
    keywords: 'Morningstar alternative, Morningstar Advisor Workstation alternative, Morningstar Direct alternative, Morningstar competitor, Morningstar vs Investipal, financial advisor software, portfolio management software, advisor platform, Morningstar replacement',
    
    // Competitor Info
    competitorName: 'Morningstar',
    competitorTagline: 'Traditional research and planning platform',
    competitorWebsite: 'https://www.morningstar.com',
    
    // Hero Section
    heroTitle: 'The Modern Alternative to Morningstar Advisor Workstation',
    heroSubtitle: 'Move beyond traditional research and planning tools. Get AI-powered portfolio construction, automated compliance, modern client onboarding, and seamless proposal generation in one unified platform.',
    heroImage: '/images/external/68556380691d8adc81db4f23_untitled-design-17.png',
    heroImageAlt: 'Investipal comprehensive platform dashboard',
    
    // Comparison Table
    comparisonTable: {
      categories: [
        {
          name: 'Research & Planning',
          features: [
            { feature: 'Investment Research & Data', competitor: 'Advanced', investipal: true },
            { feature: 'Fund & Stock Analysis', competitor: true, investipal: true },
            { feature: 'Screeners & Filters', competitor: true, investipal: true },
            { feature: 'Financial Planning Tools', competitor: 'Advanced', investipal: true },
            { feature: 'Goal Planning', competitor: true, investipal: true },
            { feature: 'Scenario Builder', competitor: 'Basic', investipal: true },
          ]
        },
        {
          name: 'Portfolio Management & Construction',
          features: [
            { feature: 'AI-Powered Portfolio Construction', competitor: false, investipal: true, investipalNote: 'Build optimized portfolios in seconds' },
            { feature: 'Model Portfolios', competitor: 'Basic', investipal: true },
            { feature: 'Portfolio Analysis', competitor: 'Basic', investipal: true },
            { feature: 'Asset Allocation Optimization', competitor: 'Basic', investipal: 'Advanced', investipalNote: 'Multi-factor AI optimization' },
            { feature: 'Custom Security Builder', competitor: false, investipal: true, investipalNote: 'Model alternatives & private assets' },
            { feature: 'Automated Rebalancing', competitor: false, investipal: true },
            { feature: 'Drift Monitoring & Alerts', competitor: false, investipal: true },
          ]
        },
        {
          name: 'Client Onboarding & Data Management',
          features: [
            { feature: 'Automated Statement Scanning (OCR)', competitor: false, investipal: 'Advanced', investipalNote: 'Any format, transactions, holdings & full portfolio analysis' },
            { feature: 'Account Aggregation (Held-Away Assets)', competitor: 'Basic', investipal: 'Advanced' },
            { feature: 'Document Generation & E-Signature', competitor: false, investipal: true },
            { feature: 'AML & ID Verification', competitor: false, investipal: true },
            { feature: 'Client Portal', competitor: false, investipal: true },
            { feature: 'Client Management', competitor: 'Basic', investipal: 'Advanced' },
          ]
        },
        {
          name: 'Proposals & Client Communication',
          features: [
            { feature: 'Custom Reports', competitor: 'Basic', investipal: 'Advanced', investipalNote: 'AI-generated, fully customizable' },
            { feature: 'Investment Plan Reports', competitor: true, investipal: true },
            { feature: 'Portfolio Proposals', competitor: 'Basic', investipal: 'Advanced', investipalNote: 'Comprehensive proposal generation' },
            { feature: 'What-If Scenarios', competitor: 'Basic', investipal: 'Advanced' },
            { feature: 'Portfolio Comparison Analysis', competitor: 'Basic', investipal: 'Advanced', investipalNote: 'Current vs. proposed with tax impact' },
            { feature: 'Risk Profiling & Scoring', competitor: 'Basic', investipal: 'Advanced' },
          ]
        },
        {
          name: 'Compliance & Documentation',
          features: [
            { feature: 'Investment Policy Statements (IPS)', competitor: false, investipal: true, investipalNote: 'AI-generated in seconds' },
            { feature: 'Regulation Best Interest (Reg BI) Documentation', competitor: 'Basic', investipal: 'Advanced' },
            { feature: 'Automated Compliance Alerts', competitor: false, investipal: true },
            { feature: 'Suitability Documentation', competitor: 'Basic', investipal: 'Advanced' },
          ]
        }
      ]
    },
    
    // Why Switch Section
    whySwitchReasons: [
      {
        icon: comparisonIcons.allInOne,
        title: 'Modern AI-Powered Platform',
        description: 'Morningstar Advisor Workstation is a legacy platform built decades ago. Investipal is a modern, AI-first platform built from the ground up with machine learning, automation, and intelligent workflows—delivering 10x faster portfolio construction and proposal generation.'
      },
      {
        icon: comparisonIcons.speed,
        title: 'Complete Client Onboarding',
        description: 'Morningstar lacks modern onboarding capabilities. Investipal includes automated statement scanning with transaction-level detail, e-signature workflows, AML & ID verification, and instant compliance documentation generation—reducing onboarding from weeks to hours.'
      },
      {
        icon: comparisonIcons.analytics,
        title: 'All-in-One vs. Multiple Tools',
        description: 'Morningstar requires multiple modules, add-ons, and third-party integrations to cover your workflow. Investipal unifies research, portfolio construction, compliance, onboarding, and proposals in one seamless platform—eliminating data silos and reducing costs.'
      }
    ],
    
    // Migration Guide
    migrationSteps: [
      {
        stepNumber: 1,
        title: 'Book a Personalized Demo',
        description: 'Schedule a 15-minute walkthrough tailored to your Morningstar workflow. See exactly how Investipal compares and what you will gain by switching to a modern AI-powered platform.',
        timeEstimate: '15 minutes'
      },
      {
        stepNumber: 2,
        title: 'Data Migration Support',
        description: 'Our team assists with seamless data transfer from Morningstar. We ensure all client data, model portfolios, and research lists are accurately migrated to Investipal.',
        timeEstimate: '1-3 days'
      },
      {
        stepNumber: 3,
        title: 'Personalized Onboarding & Training',
        description: 'Get dedicated training for your team. We will help you set up your workflows, customize reports, and integrate Investipal into your practice—showing you how to leverage AI for 10x productivity gains.',
        timeEstimate: '1 week'
      },
      {
        stepNumber: 4,
        title: 'Go Live with Full Support',
        description: 'Launch Investipal with dedicated support. Run both platforms in parallel during your transition if needed. Cancel Morningstar when you are ready—no rush.',
        timeEstimate: 'Immediate'
      }
    ],
    
    // Related Resources
    relatedFeatures: [
      { title: 'Portfolio Construction', href: '/features/portfolio-construction' },
      { title: 'Automated Statement Scanner', href: '/features/automated-statement-scanner' },
      { title: 'Proposal Generation', href: '/features/proposal-generation' },
      { title: 'Regulation Best Interest (Reg BI) Generator', href: '/features/regulation-best-interest-generator' },
      { title: 'Financial Planning', href: '/features/financial-planning' }
    ]
  },
  
  // Template for adding new competitors
  // Copy this structure and fill in the details
  /*
  'competitor-name-alternative': {
    pageTitle: '',
    pageDescription: '',
    keywords: '',
    competitorName: '',
    competitorTagline: '',
    heroTitle: '',
    heroSubtitle: '',
    comparisonTable: {
      categories: [
        {
          name: '',
          features: [
            { feature: '', competitor: false, investipal: true }
          ]
        }
      ]
    },
    whySwitchReasons: [
      {
        icon: comparisonIcons.allInOne,
        title: '',
        description: ''
      }
    ],
    migrationSteps: [
      {
        stepNumber: 1,
        title: '',
        description: '',
        timeEstimate: ''
      }
    ]
  }
  */
};

