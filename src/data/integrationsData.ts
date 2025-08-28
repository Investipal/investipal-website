export interface Integration {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description: string;
  readonly logo: string;
  readonly image: string;
  readonly category: string;
  readonly categoryDisplay: string;
  readonly builtBy: string;
  readonly website: string;
  readonly features?: readonly string[];
  readonly benefits?: readonly string[];
}

export const integrationCategories = {
  'crm': 'CRM',
  'document-management': 'Document Management', 
  'financial-planning': 'Financial Planning',
  'forms-automation': 'Forms Automation'
} as const;

export const integrationsData: Integration[] = [
  {
    id: 'elements',
    name: 'Elements',
    slug: 'elements',
    description: 'Elements is a financial software that regroups business activities, such as CRM, workflows, product and document management or reports.',
    logo: "/images/external/67ca0cc660ebeb853a309631_getelements_logo.jpg",
    image: "/images/external/67ca101b66ea354dfdcc376b_e5c64505-b807-44c3-867a-cb5b5ee30be7.png",
    category: 'financial-planning',
    categoryDisplay: 'Financial Planning',
    builtBy: 'Elements',
    website: 'https://getelements.com/',
    features: [
      'Comprehensive financial planning tools',
      'CRM and client management',
      'Document management system',
      'Workflow automation',
      'Reporting and analytics'
    ],
    benefits: [
      'Streamline your entire financial planning process',
      'Centralize client data and communications',
      'Automate repetitive tasks and workflows',
      'Generate comprehensive reports quickly'
    ]
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    slug: 'salesforce',
    description: 'Salesforce is a CRM software that allows brokers, producers, advisors, bankers, and service representatives to proactively connect with customers.',
    logo: "/images/external/68601582806d8f37caba83da_salesforce%20logo.png",
    image: "/images/external/686016caf22e216ffa97cbc2_salesforce%20dashboard.png",
    category: 'crm',
    categoryDisplay: 'CRM',
    builtBy: 'Salesforce',
    website: 'https://www.salesforce.com/financial-services/',
    features: [
      'Complete customer relationship management',
      'Lead tracking and conversion',
      'Automated workflows and processes',
      'Advanced analytics and reporting',
      'Mobile accessibility'
    ],
    benefits: [
      'Increase client acquisition and retention',
      'Automate sales processes for efficiency',
      'Get 360-degree view of client relationships',
      'Scale your business with enterprise-grade tools'
    ]
  },
  {
    id: 'wealthbox',
    name: 'Wealthbox',
    slug: 'wealthbox',
    description: 'Wealthbox is a leading CRM software application that helps financial advisors manage their clients and collaborate as a team.',
    logo: "/images/external/67c9d0bee8955e40acd1e429_wealthbox%20icon.png",
    image: "/images/external/67c9d59101613caebb6c9a11_untitled%20design%20(14).png",
    category: 'crm',
    categoryDisplay: 'CRM',
    builtBy: 'Wealthbox',
    website: 'https://www.wealthbox.com/',
    features: [
      'Purpose-built for financial advisors',
      'Client relationship management',
      'Team collaboration tools',
      'Task and workflow management',
      'Integration capabilities'
    ],
    benefits: [
      'Designed specifically for wealth management',
      'Improve team collaboration and efficiency',
      'Never miss important client touchpoints',
      'Streamline advisor-client communications'
    ]
  },
  {
    id: 'sidedrawer',
    name: 'SideDrawer',
    slug: 'side-drawer',
    description: 'SideDrawer is a document management and organization solution that helps team members create personal tasks, track users\' activities and collaborate on files from within a centralized platform.',
    logo: "/images/external/67c9d655d8e8acd2bd282bd9_sidedrawer_logo.jpg",
    image: "/images/external/67c9d759e44cd1d2c076985a_group%2031.webp",
    category: 'document-management',
    categoryDisplay: 'Document Management',
    builtBy: 'Side Drawer',
    website: 'https://www.sidedrawer.com/',
    features: [
      'Secure document storage and organization',
      'Team collaboration and file sharing',
      'Personal task management',
      'Activity tracking and monitoring',
      'Centralized platform access'
    ],
    benefits: [
      'Keep all client documents organized and secure',
      'Improve team collaboration on client files',
      'Track document access and changes',
      'Streamline document workflow processes'
    ]
  },
  {
    id: 'precisefp',
    name: 'PreciseFP',
    slug: 'precisefp',
    description: 'PreciseFP is an automated engagement and onboarding platform that enables you to gather, store and securely distribute client information online.',
    logo: "/images/external/67c9d84e89332121e8295be8_1631370022070.jpg",
    image: "/images/external/67c9d88651214dc8efbf4004_untitled%20(722%20x%20520%20px)%20(722%20x%20520%20px)%20(622%20x%20420%20px)%20(3).png",
    category: 'forms-automation',
    categoryDisplay: 'Forms Automation',
    builtBy: 'PreciseFP',
    website: 'https://precisefp.com/',
    features: [
      'Automated client data collection',
      'Secure online forms and questionnaires',
      'Digital document signing',
      'Client onboarding workflows',
      'Data validation and verification'
    ],
    benefits: [
      'Eliminate manual data entry and paperwork',
      'Accelerate client onboarding process',
      'Reduce errors with automated validation',
      'Improve client experience with digital forms'
    ]
  },
  {
    id: 'redtail',
    name: 'Redtail Technology',
    slug: 'redtail',
    description: 'Web-based Client Relationship Management software (CRM), integrates widely and deeply with other popular tools for the Financial Advisor.',
    logo: "/images/external/67c9d7941994beadca8688de_unnamed.jpg",
    image: "/images/external/67c9d7a35c8331d6b1ccfce0_crm-today-feature-1080x600.jpg",
    category: 'crm',
    categoryDisplay: 'CRM',
    builtBy: 'Redtail Technology',
    website: 'https://corporate.redtailtechnology.com/',
    features: [
      'Web-based CRM platform',
      'Extensive third-party integrations',
      'Client contact management',
      'Activity tracking and reporting',
      'Workflow automation tools'
    ],
    benefits: [
      'Access your CRM from anywhere with web access',
      'Connect with 100+ popular financial tools',
      'Maintain detailed client relationship history',
      'Automate routine administrative tasks'
    ]
  }
] as const;

// Helper functions
export const getIntegrationsByCategory = (category: keyof typeof integrationCategories) => {
  return integrationsData.filter(integration => integration.category === category);
};

export const getIntegrationBySlug = (slug: string) => {
  return integrationsData.find(integration => integration.slug === slug);
};

export const getAllCategories = () => {
  return Object.entries(integrationCategories).map(([key, value]) => ({ key, value }));
};
