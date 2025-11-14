export interface Problem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

export const problemsData: Problem[] = [
  {
    id: 'manual-onboarding',
    title: 'Client onboarding takes weeks, not days',
    description: 'Manually parsing brokerage statements, chasing missing data, and completing risk questionnaires across disconnected tools slows your sales process—while prospects lose interest and competitors move faster.',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>`
  },
  {
    id: 'slow-workflows', 
    title: 'Proposal and compliance workflows eat up hours',
    description: 'Running portfolio analysis, building investment proposals, and generating IPS and Reg BI documents across siloed tools takes hours per client—time you could spend growing your practice.',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>`
  },
  {
    id: 'fragmented-management',
    title: 'Portfolio construction across asset classes is fragmented', 
    description: 'Building personalized portfolios with equities, fixed income, alternatives, and annuities requires juggling multiple platforms. You need to scale without sacrificing customization for each client.',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>`
  }
] as const;
