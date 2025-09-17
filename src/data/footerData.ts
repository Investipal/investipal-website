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
      { id: 'risk-assessment', title: 'Risk Assessment', href: '/risk-assessment' },
      { id: 'book-demo', title: 'Book a Demo', href: '/book-a-demo' },
      { id: 'integrations', title: 'Integrations', href: '/integrations' }
    ]
  },
  {
    id: 'company',
    title: 'Company',
    links: [
      { id: 'about', title: 'About us', href: '/about-us' },
      { id: 'manifesto', title: 'Manifesto', href: '/manifesto' },
      { id: 'blog', title: 'Blog', href: '/blog' },
      { id: 'podcasts', title: 'Podcasts', href: '/podcasts' },
      { id: 'faq', title: 'FAQ', href: '/contact-us#faq' },
      { id: 'contact', title: 'Contact us', href: '/contact-us' }
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
