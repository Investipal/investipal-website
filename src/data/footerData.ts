export interface FooterLink {
  readonly id: string;
  readonly title: string;
  readonly href: string;
}

export interface FooterSection {
  readonly id: string;
  readonly title: string;
  readonly links: FooterLink[];
}

export const footerData: FooterSection[] = [
  {
    id: 'product',
    title: 'Product',
    links: [
      { id: 'features', title: 'Features', href: '/features' },
      { id: 'solutions', title: 'Solutions', href: '/solutions' },
      { id: 'how-it-works', title: 'How It Works', href: '/how-it-works' },
      { id: 'integrations', title: 'Integrations', href: '/integrations' },
      { id: 'risk-assessment', title: 'Risk Assessment', href: '/risk-assessment' }
    ]
  },
  {
    id: 'compare',
    title: 'Compare',
    links: [
      { id: 'compare-platforms', title: 'All Comparisons', href: '/compare' },
      { id: 'nitrogen-alternative', title: 'vs Nitrogen', href: '/compare/nitrogen-alternative' },
      { id: 'ycharts-alternative', title: 'vs YCharts', href: '/compare/ycharts-alternative' },
      { id: 'morningstar-alternative', title: 'vs Morningstar', href: '/compare/morningstar-alternative' }
    ]
  },
  {
    id: 'resources',
    title: 'Resources',
    links: [
      { id: 'blog', title: 'Blog', href: '/blog' },
      { id: 'podcasts', title: 'Podcasts', href: '/podcasts' },
      { id: 'webinars', title: 'Webinars', href: '/webinars' },
      { id: 'case-studies', title: 'Case Studies', href: '/resources/case-studies' }
    ]
  },
  {
    id: 'company',
    title: 'Company',
    links: [
      { id: 'about', title: 'About Us', href: '/about-us' },
      { id: 'manifesto', title: 'Manifesto', href: '/manifesto' },
      { id: 'contact', title: 'Contact Us', href: '/contact-us' },
      { id: 'book-demo', title: 'Book a Demo', href: '/book-a-demo' }
    ]
  }
] as const;

export const socialLinks = [
  { id: 'facebook', title: 'Facebook', href: 'https://www.facebook.com/p/Investipal-100079914533637/' },
  { id: 'instagram', title: 'Instagram', href: 'https://www.instagram.com/investipal/' },
  { id: 'twitter', title: 'X', href: 'https://x.com/investipal' },
  { id: 'linkedin', title: 'LinkedIn', href: 'https://www.linkedin.com/company/investipal' },
  { id: 'youtube', title: 'YouTube', href: 'https://www.youtube.com/channel/UCkjQIhCIWlI-Uv-pMHPSWgA' }
] as const;
