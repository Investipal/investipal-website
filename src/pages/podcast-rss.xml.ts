import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { podcastEpisodes } from '../data/podcastData';

export async function GET(context: APIContext) {
  const siteUrl = context.site?.toString() || 'https://investipal.co';
  
  // Convert podcast data to RSS items
  const podcastItems = podcastEpisodes.map((episode) => ({
    title: episode.title,
    description: episode.description,
    pubDate: episode.publishedDate,
    link: `${siteUrl}/podcasts/${episode.slug}`,
  }));

  return rss({
    title: 'The Investipal Podcast',
    description: 'Conversations with industry leaders on the future of wealth management, fintech innovation, and financial advisory technology.',
    site: siteUrl,
    items: podcastItems,
    customData: `<language>en-us</language>`,
  });
}
