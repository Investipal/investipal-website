// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Investipal - AI-Powered Wealth Management Platform';
export const SITE_DESCRIPTION =
  'Investipal helps financial advisors streamline their practice with AI-powered portfolio management, automated reporting, and intelligent client engagement tools.';

export const SITE_METADATA = {
  title: {
    default: SITE_TITLE,
    template: '%s | Investipal',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Wealth Management',
    'Financial Planning',
    'Portfolio Management',
    'RIA Software',
    'Financial Advisor Tools',
    'Asset Allocation',
    'Investment Management',
  ],
  authors: [{ name: 'Investipal' }],
  creator: 'Investipal',
  publisher: 'Investipal',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: '48x48' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon.ico' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: [{ url: '/favicon/favicon.ico' }],
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: 'Investipal',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Investipal - AI-Powered Wealth Management Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/images/og-image.jpg'],
    creator: '@investipal',
  },
};

