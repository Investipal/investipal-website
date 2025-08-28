export interface ServiceSchemaData {
  name: string;
  description: string;
  url: string;
  provider: {
    name: string;
    url: string;
  };
  serviceType: string;
  areaServed?: string[];
  audience?: {
    audienceType: string;
    name: string;
  };
  offers?: {
    name: string;
    description: string;
  }[];
}

export function generateServiceSchema(data: ServiceSchemaData) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.name,
    "description": data.description,
    "url": data.url,
    "provider": {
      "@type": "Organization",
      "name": data.provider.name,
      "url": data.provider.url
    },
    "serviceType": data.serviceType,
    ...(data.areaServed && { "areaServed": data.areaServed }),
    ...(data.audience && {
      "audience": {
        "@type": "Audience",
        "audienceType": data.audience.audienceType,
        "name": data.audience.name
      }
    }),
    ...(data.offers && {
      "offers": data.offers.map(offer => ({
        "@type": "Offer",
        "name": offer.name,
        "description": offer.description
      }))
    })
  };
}

// Predefined service configurations for Investipal features
export const investipalServiceConfigs = {
  "automated-statement-scanner": {
    name: "Automated Statement Scanner",
    description: "AI-powered document analysis tool that instantly extracts holdings, tickers, account types, and values from financial statements",
    serviceType: "Financial Technology Service",
    audience: {
      audienceType: "Professional",
      name: "Financial Advisors"
    },
    offers: [
      {
        name: "Document Processing",
        description: "Automated extraction of financial data from PDF and CSV statements"
      },
      {
        name: "Data Validation",
        description: "Automated verification and error checking of extracted data"
      }
    ]
  },
  "ai-driven-engagement": {
    name: "AI-Driven Engagement",
    description: "Intelligent lead monitoring and client engagement platform that turns prospects into clients",
    serviceType: "Customer Relationship Management Service",
    audience: {
      audienceType: "Professional",
      name: "Financial Advisors"
    },
    offers: [
      {
        name: "Lead Monitoring",
        description: "Intelligent tracking and engagement of potential clients"
      },
      {
        name: "Predictive Analytics",
        description: "AI-powered insights to anticipate client needs"
      }
    ]
  },
  "asset-allocation": {
    name: "Asset Allocation",
    description: "AI-powered portfolio construction and asset allocation tools for personalized investment strategies",
    serviceType: "Investment Management Service",
    audience: {
      audienceType: "Professional",
      name: "Investment Advisors"
    },
    offers: [
      {
        name: "Portfolio Construction",
        description: "AI-driven portfolio building with explainable insights"
      },
      {
        name: "Risk Management",
        description: "Advanced risk analytics and monitoring"
      }
    ]
  },
  "client-acquisition": {
    name: "Client Acquisition",
    description: "Comprehensive sales journey automation tools for financial advisors",
    serviceType: "Sales Management Service",
    audience: {
      audienceType: "Professional",
      name: "Financial Advisors"
    },
    offers: [
      {
        name: "Lead Generation",
        description: "Automated lead generation and qualification"
      },
      {
        name: "Sales Automation",
        description: "Streamlined sales process management"
      }
    ]
  },
  "regulation-best-interest-generator": {
    name: "Regulation Best Interest Generator",
    description: "Automated compliance documentation for Regulation Best Interest requirements",
    serviceType: "Compliance Management Service",
    audience: {
      audienceType: "Professional",
      name: "Financial Advisors"
    },
    offers: [
      {
        name: "Reg BI Documentation",
        description: "One-click generation of Regulation Best Interest compliance documents"
      },
      {
        name: "Compliance Monitoring",
        description: "Automated tracking of regulatory compliance requirements"
      }
    ]
  },
  "investment-policy-statements": {
    name: "Investment Policy Statements",
    description: "Automated generation and management of Investment Policy Statements for client portfolios",
    serviceType: "Investment Documentation Service",
    audience: {
      audienceType: "Professional",
      name: "Investment Advisors"
    },
    offers: [
      {
        name: "IPS Generation",
        description: "Automated creation of customized Investment Policy Statements"
      },
      {
        name: "Portfolio Monitoring",
        description: "Continuous monitoring against IPS guidelines"
      }
    ]
  },
  "risk-management": {
    name: "Risk Management",
    description: "Comprehensive risk analytics and portfolio monitoring tools for investment advisors",
    serviceType: "Risk Management Service",
    audience: {
      audienceType: "Professional",
      name: "Investment Advisors"
    },
    offers: [
      {
        name: "Risk Analytics",
        description: "Advanced risk measurement and analysis tools"
      },
      {
        name: "Portfolio Monitoring",
        description: "Real-time portfolio risk monitoring and alerts"
      }
    ]
  },
  "custom-security-builder": {
    name: "Custom Security Builder",
    description: "Tools for creating and tracking custom securities and alternative investments",
    serviceType: "Investment Management Service",
    audience: {
      audienceType: "Professional",
      name: "Investment Advisors"
    },
    offers: [
      {
        name: "Security Creation",
        description: "Custom security and alternative investment creation tools"
      },
      {
        name: "Performance Tracking",
        description: "Comprehensive tracking and reporting for custom investments"
      }
    ]
  },
  "iul-annuity-modeling": {
    name: "IUL & Annuity Modeling",
    description: "Advanced modeling and analysis tools for indexed universal life insurance and annuity products",
    serviceType: "Insurance Analysis Service",
    audience: {
      audienceType: "Professional",
      name: "Insurance Advisors"
    },
    offers: [
      {
        name: "Product Modeling",
        description: "Sophisticated modeling of IUL and annuity products"
      },
      {
        name: "Performance Analysis",
        description: "Comprehensive analysis and comparison tools"
      }
    ]
  },
  "roi-calculator": {
    name: "ROI Calculator",
    description: "Advanced return on investment calculation and comparison tools for financial advisors",
    serviceType: "Financial Analysis Service",
    audience: {
      audienceType: "Professional",
      name: "Financial Advisors"
    },
    offers: [
      {
        name: "ROI Analysis",
        description: "Comprehensive return on investment calculations"
      },
      {
        name: "Investment Comparison",
        description: "Side-by-side comparison of investment options"
      }
    ]
  }
};





