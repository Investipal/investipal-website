'use client';
import React, { useEffect, useState } from 'react';

import { BarChart3, Clock, FileText, TrendingUp, Users, Shield, Zap, Building2, Briefcase, BookOpen, Lightbulb } from 'lucide-react';

import { ThemeToggle } from '@/components/elements/theme-toggle';
import { useBannerVisibility } from '@/components/layout/banner';
import Logo from '@/components/layout/logo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

export const NAV_LINKS = [
  {
    label: 'Features',
    href: '/features',
    subitems: [
      {
        label: 'Data Intake',
        description: 'Streamline client data collection',
        icon: Zap,
        submenu: [
          {
            label: 'Automated Statement Scanner',
            href: '/features/automated-statement-scanner',
            description: 'Extract portfolio data from any statement',
          },
          {
            label: 'AI-Driven Engagement',
            href: '/features/ai-driven-engagement',
            description: 'Intelligent client communication',
          },
        ],
      },
      {
        label: 'Onboarding',
        description: 'Simplify client onboarding',
        icon: Clock,
        submenu: [
          {
            label: 'Client Onboarding',
            href: '/features/client-onboarding',
            description: 'Onboard clients 10x faster with AI',
          },
          {
            label: 'Risk Assessment',
            href: '/risk-assessment',
            description: 'Comprehensive risk profiling',
          },
        ],
      },
      {
        label: 'Compliance',
        description: 'Ensure regulatory compliance',
        icon: Shield,
        submenu: [
          {
            label: 'Reg BI Generator',
            href: '/features/regulation-best-interest-generator',
            description: 'Automated Best Interest documentation',
          },
          {
            label: 'Investment Policy Statements',
            href: '/features/investment-policy-statements',
            description: 'Auto-generate IPS for every client',
          },
        ],
      },
      {
        label: 'Portfolios',
        description: 'Core portfolio management',
        icon: BarChart3,
        submenu: [
          {
            label: 'Portfolio Construction',
            href: '/features/asset-allocation',
            description: 'AI-powered asset allocation',
          },
          {
            label: 'Proposal Generation',
            href: '/features/alternatives-proposals',
            description: 'Generate proposals in under 10 minutes',
          },
          {
            label: 'Risk Management',
            href: '/features/risk-management',
            description: 'Comprehensive risk analysis',
          },
        ],
      },
      {
        label: 'Alternatives & Insurance',
        description: 'Private markets and insurance',
        icon: TrendingUp,
        submenu: [
          {
            label: 'Alternatives Modeling',
            href: '/features/alternatives-modeling',
            description: 'Model PE, real estate, and more',
          },
          {
            label: 'Annuities & Insurance',
            href: '/features/annuities-insurance-modeling',
            description: 'Model IUL and annuity products',
          },
          {
            label: 'Custom Security Builder',
            href: '/features/custom-security-builder',
            description: 'Build custom alternatives',
          },
        ],
      },
      {
        label: 'How It Works',
        href: '/how-it-works',
        description: 'See our complete workflow',
        icon: Lightbulb,
      },
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions',
    subitems: [
      {
        label: 'RIA Firms',
        href: '/solutions/ria',
        description: 'Enterprise solutions for RIA firms',
        icon: Building2,
      },
      {
        label: 'Solo Advisors',
        href: '/solutions/solo-advisor',
        description: 'Streamlined tools for independent advisors',
        icon: Briefcase,
      },
      {
        label: 'Financial Planners',
        href: '/segments/financial-planners',
        description: 'Tools for comprehensive financial planning',
        icon: Users,
      },
      {
        label: 'Wealth Managers',
        href: '/segments/wealth-managers',
        description: 'Portfolio management at scale',
        icon: TrendingUp,
      },
      {
        label: 'Wealth Firms',
        href: '/segments/wealth-firms',
        description: 'Enterprise wealth management',
        icon: Building2,
      },
      {
        label: 'Insurance Advisors',
        href: '/segments/insurance',
        description: 'Insurance and annuity modeling',
        icon: Shield,
      },
    ],
  },
  {
    label: 'Platform',
    href: '#',
    subitems: [
      {
        label: 'How It Works',
        href: '/how-it-works',
        description: 'See how Investipal works end-to-end',
        icon: Lightbulb,
      },
      {
        label: 'Integrations',
        href: '/integrations',
        description: 'Connect with your existing tools',
        icon: Zap,
      },
      {
        label: 'Cross-Border Wealth',
        href: '/cross-border-wealth',
        description: 'Multi-currency portfolio management',
        icon: TrendingUp,
      },
      {
        label: 'Risk Assessment',
        href: '/risk-assessment',
        description: 'Comprehensive risk profiling',
        icon: Shield,
      },
    ],
  },
  {
    label: 'Resources',
    href: '/blog',
    subitems: [
      {
        label: 'Blog',
        href: '/blog',
        description: 'Industry insights and best practices',
        icon: BookOpen,
      },
      {
        label: 'Case Studies',
        href: '/resources/case-studies',
        description: 'Client success stories',
        icon: Lightbulb,
      },
      {
        label: 'Webinars',
        href: '/webinars',
        description: 'Educational webinars and demos',
        icon: Users,
      },
      {
        label: 'Podcasts',
        href: '/podcasts',
        description: 'Listen to industry experts',
        icon: BookOpen,
      },
      {
        label: 'Compare',
        href: '/compare',
        description: 'Compare with other platforms',
        icon: BarChart3,
      },
    ],
  },
  {
    label: 'Company',
    href: '#',
    subitems: [
      {
        label: 'About Us',
        href: '/about-us',
        description: 'Our mission and team',
        icon: Users,
      },
      {
        label: 'Manifesto',
        href: '/manifesto',
        description: 'Our vision for the industry',
        icon: BookOpen,
      },
      {
        label: 'Contact',
        href: '/contact-us',
        description: 'Get in touch with our team',
        icon: Users,
      },
    ],
  },
];

const ACTION_BUTTONS = [
  { label: 'Sign in', href: 'https://app.investipal.co/login', variant: 'ghost' as const },
  { label: 'Book a Demo', href: '/book-a-demo', variant: 'default' as const },
];

const Navbar = ({ currentPage }: { currentPage: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const { isAtLeast } = useMediaQuery();
  const { isBannerVisible } = useBannerVisibility();
  const pathname = currentPage?.replace(/\/$/, '') || '';

  const hideNavbar = [
    '/signin',
    '/signup',
    '/docs',
    '/not-found',
    '/forgot-password',
  ].some((route) => pathname.includes(route));

  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (hideNavbar) return null;

  return (
    <header
      className={cn(
        'isolate z-50 transition-all duration-300 ease-in-out',
        isScrolled && isAtLeast('lg')
          ? 'fixed top-0 right-0 left-0 translate-y-2 px-5.5'
          : 'relative',
      )}
    >
      <div
        className={cn(
          'bg-background navbar-container relative z-50 flex h-[var(--header-height)] items-center justify-between gap-4 transition-all duration-300 ease-in-out',
          isScrolled &&
            isAtLeast('lg') &&
            'h-[calc(var(--header-height)-20px)] max-w-7xl rounded-full shadow-sm backdrop-blur-md',
        )}
      >
        <Logo className="" />

        <div className="flex items-center gap-8">
          <NavigationMenu viewport={false} className="hidden lg:block">
            <NavigationMenuList className="">
              {NAV_LINKS.map((item) => (
                <NavigationMenuItem key={item.label}>
                  {item.subitems ? (
                    <>
                      <NavigationMenuTrigger
                        className={cn(
                          'cursor-pointer [&_svg]:ms-2 [&_svg]:size-4',
                          // "after:from-chart-2 after:to-chart-3 after:absolute after:-inset-0.25 after:-z-1 after:rounded-sm after:bg-gradient-to-tr after:opacity-0 after:transition-all after:content-[''] hover:after:opacity-100",
                          pathname.startsWith(item.href) &&
                            'bg-accent font-semibold',
                        )}
                      >
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="">
                        <div 
                          className="flex w-[620px]"
                          onMouseLeave={() => setHoveredCategory(null)}
                        >
                          {/* Left column - Categories */}
                          <div className="w-[280px] border-r pr-3">
                            {item.subitems.map((subitem) => (
                              <div 
                                key={subitem.label}
                                onMouseEnter={() => subitem.submenu && setHoveredCategory(subitem.label)}
                              >
                                {subitem.href ? (
                                  <NavigationMenuLink
                                    href={subitem.href}
                                    className={cn(
                                      "hover:bg-accent/50 flex-row gap-3 p-3",
                                      hoveredCategory === subitem.label && "bg-accent/50"
                                    )}
                                  >
                                    <subitem.icon className="text-foreground size-5.5" />
                                    <div className="flex flex-col gap-1">
                                      <div className="text-sm font-medium tracking-normal">
                                        {subitem.label}
                                      </div>
                                      <div className="text-muted-foreground text-xs leading-snug">
                                        {subitem.description}
                                      </div>
                                    </div>
                                  </NavigationMenuLink>
                                ) : (
                                  <div className={cn(
                                    "hover:bg-accent/50 flex cursor-default flex-row gap-3 rounded-md p-3",
                                    hoveredCategory === subitem.label && "bg-accent/50"
                                  )}>
                                    <subitem.icon className="text-foreground size-5.5" />
                                    <div className="flex flex-1 flex-col gap-1">
                                      <div className="flex items-center justify-between">
                                        <div className="text-sm font-medium tracking-normal">
                                          {subitem.label}
                                        </div>
                                        {subitem.submenu && (
                                          <svg className="size-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                          </svg>
                                        )}
                                      </div>
                                      <div className="text-muted-foreground text-xs leading-snug">
                                        {subitem.description}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          {/* Right column - Submenu items (shows on hover) */}
                          <div 
                            className="w-[340px] pl-3"
                            onMouseEnter={() => {
                              // Keep the hovered state when mouse enters right column
                            }}
                          >
                            {item.subitems.map((subitem) => (
                              subitem.submenu && hoveredCategory === subitem.label && (
                                <div 
                                  key={`submenu-${subitem.label}`}
                                  className="space-y-1"
                                >
                                  {subitem.submenu.map((nestedItem) => (
                                    <NavigationMenuLink
                                      key={nestedItem.label}
                                      href={nestedItem.href}
                                      className="hover:bg-accent/50 flex flex-col gap-1 rounded-md p-3"
                                    >
                                      <div className="text-sm font-medium">
                                        {nestedItem.label}
                                      </div>
                                      <div className="text-muted-foreground text-xs leading-snug">
                                        {nestedItem.description}
                                      </div>
                                    </NavigationMenuLink>
                                  ))}
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink
                      href={item.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        // "after:from-chart-2 after:to-chart-3 after:absolute after:-inset-0.25 after:-z-1 after:rounded-sm after:bg-gradient-to-tr after:opacity-0 after:transition-all after:content-[''] hover:after:opacity-100",
                        pathname === item.href && 'bg-accent font-semibold',
                      )}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden items-center justify-end gap-4 lg:flex">
            <ThemeToggle />
            {ACTION_BUTTONS.map((button) => (
              <Button
                key={button.label}
                size="sm"
                variant={button.variant}
                className="rounded-full shadow-none"
                asChild
              >
                <a href={button.href}>{button.label}</a>
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2 lg:hidden lg:gap-4">
            <ThemeToggle />
            <button
              className="text-muted-foreground relative flex size-8 rounded-sm border lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <div
                className={cn(
                  'absolute top-1/2 left-1/2 block w-4 -translate-x-1/2 -translate-y-1/2',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute block h-0.25 w-full rounded-full bg-current transition duration-500 ease-in-out',
                    isMenuOpen ? 'rotate-45' : '-translate-y-1.5',
                  )}
                ></span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute block h-0.25 w-full rounded-full bg-current transition duration-500 ease-in-out',
                    isMenuOpen ? 'opacity-0' : '',
                  )}
                ></span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute block h-0.25 w-full rounded-full bg-current transition duration-500 ease-in-out',
                    isMenuOpen ? '-rotate-45' : 'translate-y-1.5',
                  )}
                ></span>
              </div>
            </button>
          </div>
        </div>
        {/*  Mobile Menu Navigation */}
        <div
          className={cn(
            'bg-background/95 text-accent-foreground fixed inset-0 -z-10 flex flex-col justify-between tracking-normal backdrop-blur-md transition-all duration-500 ease-out lg:hidden',
            isBannerVisible
              ? 'pt-[calc(var(--header-height)+3rem)]'
              : 'pt-[var(--header-height)]',
            isMenuOpen
              ? 'translate-x-0 opacity-100'
              : 'pointer-events-none translate-x-full opacity-0',
          )}
        >
          <div className="container">
            <NavigationMenu
              orientation="vertical"
              className="inline-block w-full max-w-none py-10"
            >
              <NavigationMenuList className="w-full flex-col items-start gap-0">
                {NAV_LINKS.map((item) => (
                  <NavigationMenuItem key={item.label} className="w-full py-3">
                    {item.subitems ? (
                      <Accordion type="single" collapsible className="">
                        <AccordionItem value={item.label}>
                          <AccordionTrigger className="flex w-full cursor-pointer items-center justify-between px-2 py-3 text-base font-normal hover:no-underline">
                            {item.label}
                          </AccordionTrigger>
                          <AccordionContent className="pb-0">
                            <div className="space-y-2">
                              {item.subitems.map((subitem) => (
                                <NavigationMenuLink
                                  key={subitem.label}
                                  href={subitem.href}
                                  onClick={() => setIsMenuOpen(false)}
                                  className={cn(
                                    'text-muted-foreground hover:bg-accent/50 flex flex-row gap-2 p-3 font-medium transition-colors',
                                    pathname === subitem.href &&
                                      'bg-accent font-semibold',
                                  )}
                                >
                                  <subitem.icon className="size-5" />
                                  <span className="">{subitem.label}</span>
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <NavigationMenuLink
                        href={item.href}
                        className={cn(
                          'hover:text-foreground text-base transition-colors',
                          pathname === item.href && 'font-semibold',
                        )}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex flex-col gap-4.5 border-t px-6 py-4">
            {ACTION_BUTTONS.map((button) => (
              <Button
                key={button.label}
                variant={
                  button.variant === 'ghost' ? 'outline' : button.variant
                }
                asChild
                className="h-12 flex-1 rounded-sm shadow-sm"
              >
                <a href={button.href} onClick={() => setIsMenuOpen(false)}>
                  {button.label}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
