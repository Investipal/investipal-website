'use client';

import { useEffect, useState } from 'react';

import Noise from '@/components/elements/noise';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

const COMMON_CARDS_CLASSNAMES = {
  big: 'col-span-4 lg:[&_blockquote]:text-base lg:[&_blockquote]:leading-loose lg:[&_blockquote]:text-foreground',
};
const testimonials = [
  {
    id: '1',
    name: 'Lauren M. Williams',
    title: 'CEO',
    company: 'ProsperPlan Wealth',
    image:
      '/images/external/66cf4f1cdec6f9fb4a1d4554_40cb0baa-70cc-4eef-9326-255691abafee.png',
    companyLogo: {
      src: '/images/logos/prosperplan_wealth_logo.png',
      width: 105,
      height: 28,
    },
    testimonial:
      'We\'re deeply committed to integrating cutting-edge technology to transform the financial planning landscape. Investipal\'s innovative approach aligns perfectly with our vision, particularly in utilizing OCR technology to streamline processes and elevate the client and advisor experience.',
    className: COMMON_CARDS_CLASSNAMES.big,
  },
  {
    id: '2',
    name: 'Michael Hoskin',
    title: 'Founder & Wealth Advisor',
    company: 'Hoskin Wealth Advisory',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    testimonial:
      'Investipal cut our client onboarding time from weeks to days. The AI statement scanner alone saves us 5+ hours per client.',
    className: 'col-span-2 ',
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    title: 'Managing Partner',
    company: 'Pacific Portfolio Advisors',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    testimonial:
      'The portfolio construction tools are game-changing. We can now build sophisticated multi-asset portfolios in minutes, not hours.',
    className: 'col-span-2 ',
  },
  {
    id: '4',
    name: 'David Chen',
    title: 'Financial Advisor',
    company: 'Raymond James',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    testimonial:
      'Reg BI compliance used to be a nightmare. Now we generate compliant documentation automatically with every proposal.',
    className: 'col-span-2 ',
  },
  {
    id: '5',
    name: 'Robert Martinez',
    title: 'Senior Advisor',
    company: 'WJCM Wealth Management',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    testimonial:
      'Our proposal turnaround time dropped from days to under 10 minutes. Clients are impressed by the professional, branded output.',
    className: 'col-span-2 ',
  },
  {
    id: '6',
    name: 'Jennifer Lee',
    title: 'Wealth Manager',
    company: 'ASTN Financial',
    image:
      'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face',
    testimonial:
      'The platform handles everything from alternatives to annuities seamlessly. Finally, one tool that does it all.',
    className: 'col-span-2',
  },
  {
    id: '7',
    name: 'Thomas Anderson',
    title: 'Principal',
    company: 'SRG Wealth Advisory',
    image:
      'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face',
    testimonial:
      'Investipal scaled with our practice effortlessly. We've doubled our AUM without adding more staff.',
    className: 'col-span-2',
  },
  {
    id: '8',
    name: 'Amanda Foster',
    title: 'Portfolio Manager',
    company: 'Pacific Portfolio Advisors',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face',
    companyLogo: {
      src: '/images/logos/pacific_logo.png',
      width: 105,
      height: 28,
    },
    testimonial:
      'Investipal has completely transformed how we approach client onboarding and portfolio management. The AI-powered tools save us countless hours while delivering better outcomes for our clients.',
    className: cn(COMMON_CARDS_CLASSNAMES.big, ''),
  },
  {
    id: '9',
    name: 'James Williams',
    title: 'Managing Director',
    company: 'SRG Capital',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    companyLogo: {
      src: '/images/logos/srg_company_logo_white.png',
      width: 130,
      height: 20,
    },
    testimonial:
      'We onboarded 15 new clients last quarter—all managed seamlessly through Investipal. The platform scales effortlessly.',
    className: cn(
      COMMON_CARDS_CLASSNAMES.big,
      'lg:[&_blockquote]:text-4xl lg:[&_blockquote]:leading-tight lg:shadow-lg',
    ),
  },
];

export default function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="section-padding relative overflow-x-hidden">
      <Noise />
      <div className="container">
        {/* Section Header */}
        <div className="mx-auto max-w-4xl space-y-3 lg:space-y-4 lg:text-center">
          <h2 className="text-4xl tracking-tight lg:text-5xl">
            Trusted by modern teams
          </h2>
          <p className="text-muted-foreground text-lg leading-snug lg:text-balance">
            Join thousands of product managers, designers, and developers who
            rely on Lumen to plan, track, and deliver value without the chaos.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="mx-auto mt-8 hidden max-w-6xl grid-cols-8 gap-2 lg:mt-12 lg:grid">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="mt-8 -mr-[max(2rem,calc((100vw-80rem)/2+5rem))] lg:hidden">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent className="-ml-2 lg:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="basis-9/10 pl-2 sm:basis-1/2 lg:pl-4"
                >
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden" />
            <CarouselNext className="hidden" />
          </Carousel>

          {/* Carousel Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: count }, (_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  'size-2 rounded-full transition-all duration-200',
                  index === current
                    ? 'bg-foreground scale-110'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50',
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: {
    id: string;
    name: string;
    title: string;
    company: string;
    image: string;
    companyLogo?: {
      src: string;
      width: number;
      height: number;
    };
    testimonial: string;
    featured?: boolean;
    className?: string;
  };
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const isBigCard = testimonial.className?.includes('col-span-4');
  const withGradientBorder = testimonial.id === '1' || testimonial.id === '9';
  return (
    <Card
      className={cn(
        'hover:shadow-primary/5 relative h-full transition-all duration-300 hover:shadow-lg',
        withGradientBorder &&
          'lg:before:from-chart-1 lg:before:via-chart-2 lg:before:to-chart-3 lg:border-0 lg:before:absolute lg:before:inset-[-1px] lg:before:z-[-1] lg:before:rounded-xl lg:before:bg-gradient-to-tr lg:before:content-[""]',
        testimonial.className,
      )}
    >
      <CardHeader>
        {/* Author Info at Top for Small Cards */}
        {!isBigCard && (
          <div className="flex items-center gap-3">
            <img
              src={testimonial.image}
              alt={`${testimonial.name} profile`}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="text-card-foreground truncate text-sm font-medium">
                {testimonial.name}
              </div>
              <div className="text-muted-foreground truncate text-xs">
                {testimonial.title} at {testimonial.company}
              </div>
            </div>
          </div>
        )}

        {/* Company Logo for Big Cards Only */}
        {testimonial?.companyLogo?.src && (
          <img
            src={testimonial.companyLogo.src}
            alt={`${testimonial.company} logo`}
            width={testimonial.companyLogo.width}
            height={testimonial.companyLogo.height}
            className="object-contain dark:invert"
          />
        )}
      </CardHeader>

      <CardContent className="">
        {/* Testimonial Text */}
        <blockquote
          className={cn('lg:text-muted-foreground leading-relaxed lg:text-sm')}
        >
          “{testimonial.testimonial}”
        </blockquote>
      </CardContent>

      {/* Author Info at Bottom for Big Cards */}
      {isBigCard && (
        <CardFooter className="flex items-center gap-3">
          <div className="relative">
            <img
              src={testimonial.image}
              alt={`${testimonial.name} profile`}
              width={40}
              height={40}
              className="size-10 rounded-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-card-foreground truncate text-sm font-medium">
              {testimonial.name}
            </div>
            <div className="text-muted-foreground truncate text-xs">
              {testimonial.title} at {testimonial.company}
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
