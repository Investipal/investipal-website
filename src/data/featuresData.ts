export interface Feature {
  readonly id: string;
  readonly badge: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
}

export const featuresData: Feature[] = [
  {
    id: 'faster-intake',
    badge: 'Client Onboarding',
    title: 'Onboard clients in days, not weeks',
    description: 'AI-powered statement scanning extracts portfolio data from any brokerage statement in seconds. Automated risk questionnaires, document collection, and e-signature workflows complete onboarding 10x faster.',
    image: "/images/product_screenshots/client_onboarding_portal_v3_2025-11-11.png"
  },
  {
    id: 'close-business',
    badge: 'Proposals & Compliance',
    title: 'Generate proposals and compliance docs in minutes',
    description: 'Run portfolio comparison analysis, build branded investment proposals, and auto-generate IPS and Reg BI documentation—all in one workflow. Most advisors complete proposals in under 10 minutes.',
    image: "/images/product_screenshots/proposal_cover_page_v3_2025-11-14.png"
  },
  {
    id: 'deliver-value',
    badge: 'Portfolio Construction',
    title: 'Build portfolios across all asset classes',
    description: 'Construct personalized portfolios with equities, fixed income, alternatives, and annuities. AI-powered optimization for goal-based and risk-based strategies. Access our database of private securities or model custom alternatives.',
    image: "/images/product_screenshots/client_overview_performance_v1_2025-11-14.png"
  }
] as const;
