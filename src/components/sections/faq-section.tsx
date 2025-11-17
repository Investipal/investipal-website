'use client';

import { ChevronRightIcon, MessageSquare } from 'lucide-react';

import Noise from '@/components/elements/noise';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

const faqData = [
  {
    id: 'what-is-investipal',
    question: 'What is Investipal?',
    answer:
      'Investipal is AI-powered financial advisor software that automates portfolio construction, compliance documentation, and client onboarding. It's designed specifically for financial planners who want to spend less time on administrative work and more time with clients.',
  },
  {
    id: 'how-long-onboarding',
    question: 'How long does client onboarding take?',
    answer:
      'Most advisors complete client onboarding in days, not weeks. Our AI-powered statement scanner extracts portfolio data from any brokerage statement in seconds, and automated workflows handle risk questionnaires, document collection, and e-signatures.',
  },
  {
    id: 'asset-classes',
    question: 'What asset classes does Investipal support?',
    answer:
      'Investipal supports equities, fixed income, ETFs, mutual funds, alternatives (private equity, real estate, private credit), annuities, and insurance products. You can build portfolios across all asset classes in one platform.',
  },
  {
    id: 'compliance',
    question: 'How does Investipal handle compliance?',
    answer:
      'Investipal automatically generates Regulation Best Interest (Reg BI) disclosures, Investment Policy Statements (IPS), and Form CRS documentation for every client. All documentation is compliant and ready to share.',
  },
  {
    id: 'integrations',
    question: 'Does Investipal integrate with my existing tools?',
    answer:
      'Yes, Investipal integrates with popular custodians, CRMs, and portfolio management systems. Our AI statement scanner works with any brokerage statement format, and you can export data in multiple formats.',
  },
];

export default function FAQSection() {
  return (
    <section className="section-padding relative">
      <Noise />
      <div className="container">
        {/* Section Header */}
        <h2 className="text-4xl leading-tight tracking-tight lg:text-5xl">
          Frequently <br className="hidden md:block" />
          asked questions:
        </h2>

        {/* FAQ Content */}
        <div className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-3">
          {/* FAQ Accordion - Left Side */}
          <div className="lg:col-span-2">
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border-input hover:shadow-primary/5 rounded-lg !border px-6 py-2 transition-all duration-300 hover:shadow-md"
                >
                  <AccordionTrigger className="cursor-pointer text-base font-medium hover:no-underline md:text-lg lg:text-xl">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <Card className="hover:shadow-primary/5 h-full gap-6 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="gap-6 md:gap-8 lg:gap-11">
              <MessageSquare className="text-secondary size-18 stroke-1 md:size-20" />
              <h3 className="text-2xl">Still have questions?</h3>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground">
                Let&apos;s talk. Our team is here to help you streamline your advisory practice. Schedule a personalized demo to see Investipal in action.
              </p>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button
                size="lg"
                variant="light"
                className="group h-12 w-full gap-4"
                asChild
              >
                <a href="/book-a-demo">
                  Schedule a Demo
                  <div className="bg-border border-input grid size-5.5 place-items-center rounded-full border">
                    <ChevronRightIcon className="size-4 transition-transform group-hover:translate-x-0.25" />
                  </div>
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
