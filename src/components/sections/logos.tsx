'use client';

import { useEffect, useState } from 'react';

import Noise from '@/components/elements/noise';
import { Marquee } from '@/components/magicui/marquee';
import { cn } from '@/lib/utils';

const companies = [
  {
    name: 'Booking.com',
    logo: '/images/logos/booking.svg',
    className: 'dark:hidden',
    url: 'https://booking.com',
  },
  {
    name: 'Fortinet',
    logo: '/images/logos/fortinet.svg',
    className: 'dark:hidden',
    url: 'https://fortinet.com',
  },
  {
    name: 'IBM',
    logo: '/images/logos/ibm.svg',
    className: '',
    url: 'https://ibm.com',
  },
  {
    name: 'Logitech',
    logo: '/images/logos/logitech.svg',
    className: 'dark:hidden',
    url: 'https://logitech.com',
  },
  {
    name: 'Netflix',
    logo: '/images/logos/netflix.svg',
    className: '',
    url: 'https://netflix.com',
  },
  {
    name: 'Spotify',
    logo: '/images/logos/spotify.svg',
    className: '',
    url: 'https://spotify.com',
  },
  {
    name: 'T-Mobile',
    logo: '/images/logos/t-mobile.svg',
    className: '',
    url: 'https://t-mobile.com',
  },
  {
    name: 'TIBCO',
    logo: '/images/logos/tibc.svg',
    className: '',
    url: 'https://tibco.com',
  },
];

export default function Logos() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const storageKey = 'theme';

  useEffect(() => {
    setMounted(true);

    // Get initial theme from localStorage, default to 'light' if none exists
    const savedTheme = localStorage.getItem(storageKey) as
      | 'light'
      | 'dark'
      | null;
    const initialTheme = savedTheme || 'light';
    setTheme(initialTheme);

    // Listen for theme changes
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem(storageKey) as
        | 'light'
        | 'dark'
        | null;
      if (newTheme) {
        setTheme(newTheme);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Listen for direct DOM class and data-theme changes (for immediate updates)
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      const dataTheme = document.documentElement.getAttribute('data-theme');
      const currentTheme = dataTheme || (isDark ? 'dark' : 'light');
      setTheme(currentTheme as 'light' | 'dark');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      observer.disconnect();
    };
  }, []);

  // Filter out companies with dark:hidden when theme is dark
  // Only apply theme-based filtering after component is mounted to prevent hydration mismatch
  const visibleCompanies = companies.filter((company) => {
    if (
      mounted &&
      theme === 'dark' &&
      company.className.includes('dark:hidden')
    ) {
      return false;
    }
    return true;
  });

  return (
    <section className="section-padding relative">
      <Noise />
      <p className="container text-center text-base">
        Over 2+ million teams rely on Lumen to collaborate and get work done.
      </p>

      <div>
        <Marquee
          pauseOnHover
          className="mt-8 mask-r-from-60% mask-r-to-100% mask-l-from-60% mask-l-to-100% [--duration:20s] [--gap:4rem]"
        >
          {visibleCompanies.map((company) => (
            <a
              key={company.name}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative h-8 w-24 transition-transform duration-200 hover:scale-105"
            >
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className={cn('object-contai size-full', company.className)}
              />
            </a>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
