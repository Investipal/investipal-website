import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  // Get all blog posts (assuming we'll migrate to content collections)
  // For now, we'll create a basic RSS feed structure
  
  const siteUrl = context.site?.toString() || 'https://investipal.co';
  
  // Basic blog items - we'll enhance this when we migrate to content collections
  const blogItems = [
    {
      title: 'AI-Powered Portfolio Management: The Future is Here',
      description: 'Discover how artificial intelligence is revolutionizing portfolio management for financial advisors.',
      pubDate: new Date('2024-01-15'),
      link: '/blog/ai-powered-portfolio-management',
    },
    {
      title: 'Compliance Automation: Streamlining Regulatory Requirements',
      description: 'Learn how automated compliance tools can save time and reduce risk for financial advisors.',
      pubDate: new Date('2024-01-10'),
      link: '/blog/compliance-automation',
    },
    {
      title: 'Client Onboarding Best Practices in 2024',
      description: 'Essential strategies for modernizing your client onboarding process.',
      pubDate: new Date('2024-01-05'),
      link: '/blog/client-onboarding-best-practices',
    },
  ];

  return rss({
    title: 'Investipal Blog',
    description: 'Latest insights on AI-powered financial advisory technology, compliance automation, and wealth management innovation.',
    site: siteUrl,
    items: blogItems.map((item) => ({
      title: item.title,
      description: item.description,
      pubDate: item.pubDate,
      link: `${siteUrl}${item.link}`,
    })),
    customData: `<language>en-us</language>`,
    stylesheet: '/rss-styles.xsl',
  });
}














