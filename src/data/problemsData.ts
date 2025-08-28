export interface Problem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

export const problemsData: Problem[] = [
  {
    id: 'manual-onboarding',
    title: 'Manual onboarding is eating your time',
    description: 'Parsing brokerage statements, chasing missing data, and completing documents across disconnected tools slows everything down - while prospects lose interest.',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>`
  },
  {
    id: 'slow-workflows', 
    title: 'Proposal and compliance workflows are painfully slow',
    description: 'Running analysis, building proposals, and generating IPS documents across siloed tools eats up hours.',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>`
  },
  {
    id: 'fragmented-management',
    title: 'Personalized portfolio management is clunky and fragmented', 
    description: 'Switching tools to build and manage holistic portfolios - across public markets and alts - is time-consuming. Advisors need scale without sacrificing personalization.',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>`
  }
] as const;
