'use client';

import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

import Noise from '@/components/elements/noise';
import { Button } from '@/components/ui/button';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  // Typing effect state
  const words = ['proposals', 'onboarding', 'data intake', 'compliance', 'portfolios'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        } else {
          // Pause at end of word
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((currentWordIndex + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: 'blur(2px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 25,
        mass: 1,
        duration: 0.6,
      },
    },
  };

  const overlayVariants = {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 120,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
      filter: 'blur(3px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        stiffness: 80,
        damping: 20,
        delay: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <section className="section-padding relative flex flex-col items-center bg-[url(/images/gradient.webp)] bg-cover bg-center bg-no-repeat !pb-0 dark:bg-[url(/images/gradient-dark.webp)]">
      <motion.div
        variants={overlayVariants}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate="visible"
        className="from-background/30 pointer-events-none absolute inset-0 bg-gradient-to-b to-transparent"
      />
      <Noise />
      <motion.div
        className="z-1 container text-center"
        variants={containerVariants}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-3xl leading-tight tracking-tight md:text-5xl lg:text-6xl"
        >
          AI for financial advisors
          <br className="hidden md:block" /> streamlining{' '}
          <span className="text-primary">
            {currentText}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-muted-foreground my-2 text-sm md:my-4 md:text-lg lg:my-6 lg:text-xl"
        >
          Automate client onboarding, portfolio construction across all asset classes, and compliance documentation in one seamless platform. Most advisors complete proposals in under 10 minutes.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Button
            size="lg"
            className="mt-2 rounded-full !pl-5.5 before:rounded-full"
            asChild
          >
            <a href="/book-a-demo">
              Schedule a Demo
              <div className="bg-background/15 border-background/10 grid size-5.5 place-items-center rounded-full border">
                <ChevronRight className="size-4" />
              </div>
            </a>
          </Button>
        </motion.div>

        <motion.div
          variants={imageVariants}
          className="bg-background/45 border-background relative mt-10 justify-self-end overflow-hidden rounded-t-xl border p-2 md:mt-20 md:rounded-t-3xl md:p-4 lg:mt-25"
        >
          <img
            src="/images/external/68556380691d8adc81db4f23_untitled-design-17.png"
            alt="Investipal Dashboard showing AI-powered portfolio management interface"
            width={1056}
            height={752.5}
            className="border-background/45 rounded-t-sm md:rounded-t-xl"
          />
        </motion.div>
        <div className="from-background pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent via-25% to-transparent" />
      </motion.div>
    </section>
  );
}
