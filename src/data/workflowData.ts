export interface WorkflowStep {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

export const workflowData: WorkflowStep[] = [
  {
    id: 'step-1',
    title: 'Upload client documents',
    description: 'Simply upload brokerage statements and other client documents to get started.',
    icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="24" fill="#F3F4F6"/>
      <path d="M24 12L32 20H28V28H20V20H16L24 12Z" fill="#8B5CF6"/>
      <path d="M16 32V36H32V32" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    id: 'step-2',
    title: 'AI analyzes and extracts data',
    description: 'Our AI automatically extracts and analyzes all relevant information from the documents.',
    icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="24" fill="#F3F4F6"/>
      <path d="M16 20L24 28L32 20" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="24" cy="24" r="8" stroke="#8B5CF6" stroke-width="2" fill="none"/>
      <path d="M24 16V24L28 20" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    id: 'step-3',
    title: 'Generate personalized proposals',
    description: 'Create customized investment proposals and compliance documents in minutes.',
    icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="24" fill="#F3F4F6"/>
      <path d="M16 16H32V32H16V16Z" stroke="#8B5CF6" stroke-width="2" fill="none"/>
      <path d="M20 20H28" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round"/>
      <path d="M20 24H28" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round"/>
      <path d="M20 28H24" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'step-4',
    title: 'Build and manage portfolios',
    description: 'Construct and manage personalized portfolios with AI assistance.',
    icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="24" fill="#F3F4F6"/>
      <path d="M16 32L24 16L32 32" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <circle cx="24" cy="24" r="2" fill="#8B5CF6"/>
    </svg>`
  }
] as const;
