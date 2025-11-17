'use client';

import Logo from './logo';
import { NAV_LINKS } from './navbar';

import Noise from '@/components/elements/noise';

// Create footer sections from NAV_LINKS and add blog links
const FOOTER_SECTIONS = [
  {
    title: 'Product',
    links: [
      { name: 'All Features', href: '/features' },
      { name: 'Portfolio Construction', href: '/features/asset-allocation' },
      { name: 'Client Onboarding', href: '/features/client-onboarding' },
      { name: 'Proposal Generation', href: '/features/alternatives-proposals' },
      { name: 'Reg BI & Compliance', href: '/features/regulation-best-interest-generator' },
      { name: 'Alternatives Modeling', href: '/features/alternatives-modeling' },
      { name: 'How It Works', href: '/how-it-works' },
      { name: 'Integrations', href: '/integrations' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { name: 'RIA Firms', href: '/solutions/ria' },
      { name: 'Solo Advisors', href: '/solutions/solo-advisor' },
      { name: 'Financial Planners', href: '/segments/financial-planners' },
      { name: 'Wealth Managers', href: '/segments/wealth-managers' },
      { name: 'Wealth Firms', href: '/segments/wealth-firms' },
      { name: 'Insurance Advisors', href: '/segments/insurance' },
      { name: 'Cross-Border Wealth', href: '/cross-border-wealth' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Blog', href: '/blog' },
      { name: 'Case Studies', href: '/resources/case-studies' },
      { name: 'Webinars', href: '/webinars' },
      { name: 'Podcasts', href: '/podcasts' },
      { name: 'Compare', href: '/compare' },
      { name: 'Risk Assessment', href: '/risk-assessment' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about-us' },
      { name: 'Manifesto', href: '/manifesto' },
      { name: 'Contact', href: '/contact-us' },
      { name: 'Book a Demo', href: '/book-a-demo' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms & Conditions', href: '/terms-conditions' },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    name: 'Follow on LinkedIn',
    href: 'https://www.linkedin.com/company/investipal',
  },
  {
    name: 'Follow on X',
    href: 'https://x.com/investipal',
  },
];

const APP_STORE_BUTTONS = [
  {
    href: '#',
    icon: 'apple',
    topText: 'Download on the',
    mainText: 'App Store',
  },
  {
    href: '#',
    icon: 'googlePlay',
    topText: 'GET IT ON',
    mainText: 'Google Play',
  },
];

const Footer = ({ currentPage }: { currentPage: string }) => {
  const pathname = currentPage?.replace(/\/$/, '') || '';

  const hideFooter = [
    '/signin',
    '/signup',
    '/docs',
    '/not-found',
    '/forgot-password',
  ].some((route) => pathname.includes(route));

  if (hideFooter) return null;

  return (
    <footer className="relative border-t py-12">
      <Noise />

      <div className="container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Left side - Footer sections */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:col-span-3">
            {FOOTER_SECTIONS.map((section, index) => (
              <div key={index}>
                <h3 className="text-foreground mb-4 font-bold md:mb-8">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right side - Lumen branding and social */}
          <div className="flex w-fit flex-col items-start justify-self-end md:col-span-1">
            <Logo />
            <div className="mt-4 space-y-3 md:mt-8">
              {SOCIAL_LINKS.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-15 flex flex-col items-center justify-center gap-4 border-t pt-8 md:mt-20">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Investipal. All rights reserved.
            </span>
            <a
              href="/privacy-policy"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms-conditions"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
