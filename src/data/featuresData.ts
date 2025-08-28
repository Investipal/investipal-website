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
    badge: 'Faster intake',
    title: 'Complete client onboarding forms',
    description: 'Analyze brokerage statements, complete Risk Tolerance Questionnaires (RTQ), and generate ready-to-sign documents - all in minutes, not days.',
    image: "https://c.animaapp.com/medefhqzj4Kk73/assets/685c14111ebadb03645bec27_Screenshot_2025-06-25_112138.png"
  },
  {
    id: 'close-business',
    badge: 'Close more business',
    title: 'AI-crafted proposals and compliance documents',
    description: 'Run portfolio comparisons, generate personalized proposals, and create Investment Policy Statements (IPS) in a single workflow - built for speed and scale.',
    image: "https://c.animaapp.com/medefhqzj4Kk73/assets/6855694d09617b1c67ead721_Untitled_design_(22).png"
  },
  {
    id: 'deliver-value',
    badge: 'Deliver more value',
    title: 'Personalized portfolios at scale',
    description: 'Build and manage multi-asset portfolios - including alternatives - with explainable AI that aligns to each client\'s needs, risk, and goals.',
    image: "https://c.animaapp.com/medefhqzj4Kk73/assets/68556f57a60ea42645bfaa8d_Untitled_design_(23).png"
  }
] as const;
