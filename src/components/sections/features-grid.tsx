import Noise from '@/components/elements/noise';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const FEATURES_DATA = [
  {
    id: 1,
    image: '/images/product_screenshots/client_onboarding_portal_v3_2025-11-11.png',
    imageAlt: 'Client onboarding portal',
    title: 'Client Onboarding',
    description:
      'AI-powered statement scanning extracts portfolio data from any brokerage statement in seconds. Complete onboarding 10x faster.',
    className: 'lg:col-span-3',
    width: 423,
    height: 228,
  },
  {
    id: 2,
    image: '/images/product_screenshots/proposal_cover_page_v3_2025-11-14.png',
    imageAlt: 'Investment proposal generator',
    title: 'Proposal Generation',
    description:
      'Build branded investment proposals and auto-generate IPS and Reg BI documentation. Complete proposals in under 10 minutes.',
    className: 'lg:col-span-3',
    width: 435,
    height: 228,
  },
  {
    id: 3,
    image: '/images/product_screenshots/client_overview_performance_v1_2025-11-14.png',
    imageAlt: 'Portfolio construction dashboard',
    title: 'Portfolio Construction',
    description:
      'Build personalized portfolios with equities, fixed income, alternatives, and annuities. AI-powered optimization for goal-based strategies.',
    className: 'lg:col-span-4',
    width: 599,
    height: 218,
  },
  {
    id: 4,
    image: '/images/general/compliance_v6_(1)_1.png',
    imageAlt: 'Compliance documentation',
    title: 'Reg BI & Compliance',
    description:
      'Automatically generate compliant documentation including Best Interest disclosures, Form CRS, and investment policy statements.',
    className: 'lg:col-span-2',
    width: 292,
    height: 215,
  },
  {
    id: 5,
    image: '/images/general/risk_insights_(1).png',
    imageAlt: 'Risk assessment tools',
    title: 'Risk Management',
    description:
      'Comprehensive risk analysis with stress testing, scenario analysis, and Monte Carlo simulations for informed decision-making.',
    className: 'lg:col-span-3',
    width: 417,
    height: 175,
  },
  {
    id: 6,
    image: '/images/general/iul_modeler_(1).png',
    imageAlt: 'Annuities and insurance modeling',
    title: 'Annuities & Insurance',
    description:
      'Model indexed universal life policies and annuity products with comprehensive illustrations and comparative analysis.',
    className: 'lg:col-span-3',
    width: 433,
    height: 155,
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features-grid" className="section-padding relative">
      <Noise />
      <div className="container">
        {/* Section Header */}
        <div className="mx-auto max-w-5xl space-y-3 lg:space-y-4 lg:text-center">
          <h2 className="text-4xl tracking-tight lg:text-5xl">
            Everything you need to serve clients efficiently
          </h2>
          <p className="text-muted-foreground text-lg leading-snug lg:text-balance">
            From onboarding to portfolio construction to compliance documentation, Investipal streamlines every step of the advisor workflow.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-8 grid grid-cols-1 gap-2 lg:mt-12 lg:grid-cols-6">
          {FEATURES_DATA.map((feature) => (
            <FeatureCard key={feature.id} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  className?: string;
  width: number;
  height: number;
}

function FeatureCard({
  image,
  imageAlt,
  title,
  description,
  className,
  width,
  height,
}: FeatureCardProps) {
  return (
    <Card className={cn('h-full', className)}>
      {/* Image Section */}
      <CardContent>
        <div className="overflow-hidden rounded-lg">
          <img
            src={image}
            alt={imageAlt}
            width={width}
            height={height}
            className="w-full object-cover"
          />
        </div>
      </CardContent>

      {/* Content Section */}
      <CardHeader>
        <CardTitle className="text-xl leading-tight font-semibold">
          {title}
        </CardTitle>
        <p className="text-muted-foreground/70 leading-relaxed">
          {description}
        </p>
      </CardHeader>
    </Card>
  );
}
