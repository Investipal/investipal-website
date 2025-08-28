// Podcast Data - Centralized content management for all podcast episodes
// This file contains all podcast episode information in a structured format

export interface PodcastEpisode {
  // Basic Episode Info
  slug: string;
  title: string;
  episodeNumber?: number;
  publishedDate: Date;
  
  // Guest Information
  guest: {
    name: string;
    title: string;
    company: string;
    bio: string;
    linkedIn?: string;
    twitter?: string;
    website?: string;
  };
  
  // Episode Content
  description: string;
  duration: string; // e.g., "33:50"
  
  // Media Links
  spotifyUrl: string;
  youtubeUrl: string;
  applePodcastsUrl?: string;
  
  // Visual Assets
  thumbnailImage: string;
  thumbnailAlt: string;
  
  // SEO
  seoDescription: string;
  keywords: string[];
  
  // Categories/Tags
  topics: string[]; // e.g., ["Investing", "Technology", "Wealth Management"]
  category: "Investing" | "Technology" | "Business Strategy" | "Financial Planning" | "Alternative Assets";
  
  // Featured episode flag
  featured?: boolean;
}

// All podcast episodes data
export const podcastEpisodes: PodcastEpisode[] = [
  {
    slug: "the-complexities-of-investing-with-peter-lazaroff",
    title: "The Complexities of Investing with Peter Lazaroff",
    publishedDate: new Date("2024-03-08"),
    guest: {
      name: "Peter Lazaroff",
      title: "CIO",
      company: "PlanCorp",
      bio: "Peter Lazaroff is the CIO of PlanCorp, Advisor at Brightplan, and Author of Making Money Simple: The Complete Guide to Getting Your Financial House in Order and Keeping It That Way Forever. He shares how he thinks about the complexities of finance, portfolio construction and management, the importance of taking a scientific approach to investing, decision-making and reducing bias, and more.",
      linkedIn: "https://www.linkedin.com/in/peterlazaroff/",
      website: "https://www.plancorp.com/"
    },
    description: "Peter Lazaroff is the CIO of PlanCorp, Advisor at Brightplan, and Author of Making Money Simple: The Complete Guide to Getting Your Financial House in Order and Keeping It That Way Forever. He shares how he thinks about the complexities of finance, portfolio construction and management, the importance of taking a scientific approach to investing, decision-making and reducing bias, and more.",
    duration: "33:50",
    spotifyUrl: "https://open.spotify.com/episode/5H6W1RtJC9DwWy1mKI68Yb",
    youtubeUrl: "https://www.youtube.com/watch?v=irafc2pAztU",
    thumbnailImage: "https://cdn.prod.website-files.com/666872ff37bdf42ce9637d77/6668ecdbeae4269044493898_65eb2a214d83ce6bd345de14_TIP%2520-%2520Peter%2520Lazaroff.png",
    thumbnailAlt: "Peter Lazaroff - The Complexities of Investing",
    seoDescription: "Peter Lazaroff, CIO of PlanCorp, discusses portfolio construction, scientific investing approaches, and reducing bias in financial decision-making.",
    keywords: ["investing", "portfolio management", "financial planning", "peter lazaroff", "plancorp"],
    topics: ["Investing", "Portfolio Management", "Financial Planning"],
    category: "Investing",
    featured: true
  },
  {
    slug: "unlocking-growth-with-private-lending-alternative-assets-with-jamie-shulman",
    title: "Unlocking Growth with Private Lending & Alternative Assets with Jamie Shulman",
    publishedDate: new Date("2024-05-08"),
    guest: {
      name: "Jamie Shulman",
      title: "Co-Founder and Fund Manager",
      company: "Meriwether Group Capital",
      bio: "Jamie Shulman is Co-Founder and Fund Manager at Meriwether Group Capital, a private commercial lending company focused on providing growth capital to lower middle market businesses. After 25+ years in banking and lending, Jamie has built a track record of delivering top tier results to businesses and their shareholders, and developed deep expertise in private credit.",
      linkedIn: "https://www.linkedin.com/in/jamie-shulman/"
    },
    description: "Jamie Shulman is Co-Founder and Fund Manager at Meriwether Group Capital, a private commercial lending company focused on providing growth capital to lower middle market businesses. After 25+ years in banking and lending, Jamie has built a track record of delivering top tier results to businesses and their shareholders, and developed deep expertise in private credit. In this episode, Jamie shares with us how Meriwether Group approaches private lending, what they look for in borrowers, how they structure their investments and the current environment for private credit from businesses seeking capital to investors looking for yield.",
    duration: "23:45",
    spotifyUrl: "https://open.spotify.com/episode/3hA28aL4psQVlzGfY0AoAf",
    youtubeUrl: "https://www.youtube.com/watch?v=da7ZIIv6mT8",
    thumbnailImage: "https://cdn.prod.website-files.com/666872ff37bdf42ce9637d77/6668ecdceae4269044493901_663b9b17a03dbc9a7ae1adbc_TIP%2520-%2520Jamie%2520Shulman%2520(1).png",
    thumbnailAlt: "Jamie Shulman - Private Lending & Alternative Assets",
    seoDescription: "Jamie Shulman from Meriwether Group Capital discusses private lending, alternative assets, and the current private credit environment.",
    keywords: ["private lending", "alternative assets", "private credit", "jamie shulman", "meriwether group"],
    topics: ["Alternative Assets", "Private Credit", "Investing"],
    category: "Alternative Assets"
  },
  {
    slug: "the-future-of-wealth-management-tech-winners-losers",
    title: "The Future of Wealth Management Tech: Winners, Losers, and What's Changing",
    publishedDate: new Date("2024-08-07"),
    guest: {
      name: "John O'Connell",
      title: "Founder",
      company: "The Oasis Group",
      bio: "John O'Connell is the founder of The Oasis Group, a leading consultancy helping RIAs, IBDs, and asset managers build the tech stack of the future. With over 30 years of experience at firms like Merrill Lynch, KPMG, and Oracle, John brings a rare blend of sales, tech, and executive insight to the wealth management space. At Oasis, he now advises firms on tool selection, AI strategy, and how to scale with modern infrastructure.",
      linkedIn: "https://www.linkedin.com/in/johnokoconnell",
      website: "https://theoasisgrp.com/"
    },
    description: "In this episode, we talk about why 'note-takers' are evolving into full AI-powered assistants, the difference between RIA and bank trust innovation cycles, how custodians are becoming full-stack competitors, what to watch for in AI regulation, risk, and hallucinations, and the winners and losers of the next wave of advisor tech. Join us for an in-depth discussion about the current state of wealth management technology and where the industry is heading next.",
    duration: "28:45",
    spotifyUrl: "https://open.spotify.com/episode/1r7gpdSHJUBIZWhFaJLp1a",
    youtubeUrl: "https://www.youtube.com/watch?v=G16JzLcjZG0",
    thumbnailImage: "https://cdn.prod.website-files.com/666872ff37bdf42ce9637d77/6893659e13ae670c2b0510cd_Copy%20of%20TIP%20-%20Dave%20Thornton%20(12).png",
    thumbnailAlt: "The Future of Wealth Management Tech with John O'Connell",
    seoDescription: "John O'Connell discusses the future of wealth management technology, AI-powered assistants, custodian competition, and the winners and losers in advisor tech.",
    keywords: ["wealth management technology", "fintech", "advisory tech", "industry trends", "john o'connell", "oasis group"],
    topics: ["Technology", "Wealth Management", "AI", "Industry Trends"],
    category: "Technology",
    featured: true
  }
];

// Helper functions for data access
export function getPodcastBySlug(slug: string): PodcastEpisode | undefined {
  return podcastEpisodes.find(episode => episode.slug === slug);
}

export function getFeaturedPodcasts(): PodcastEpisode[] {
  return podcastEpisodes.filter(episode => episode.featured).sort((a, b) => 
    b.publishedDate.getTime() - a.publishedDate.getTime()
  );
}

export function getRecentPodcasts(limit: number = 6): PodcastEpisode[] {
  return podcastEpisodes
    .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime())
    .slice(0, limit);
}

export function getPodcastsByCategory(category: PodcastEpisode['category']): PodcastEpisode[] {
  return podcastEpisodes
    .filter(episode => episode.category === category)
    .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());
}

export function getRelatedPodcasts(currentSlug: string, limit: number = 3): PodcastEpisode[] {
  const currentEpisode = getPodcastBySlug(currentSlug);
  if (!currentEpisode) return [];

  return podcastEpisodes
    .filter(episode => 
      episode.slug !== currentSlug && 
      (episode.category === currentEpisode.category || 
       episode.topics.some(topic => currentEpisode.topics.includes(topic)))
    )
    .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime())
    .slice(0, limit);
}

export function getAllPodcastCategories(): string[] {
  return [...new Set(podcastEpisodes.map(episode => episode.category))].sort();
}

export function getAllPodcastTopics(): string[] {
  const allTopics = new Set<string>();
  podcastEpisodes.forEach(episode => {
    episode.topics.forEach(topic => allTopics.add(topic));
  });
  return Array.from(allTopics).sort();
}

// SEO helpers
export function generatePodcastStructuredData(episode: PodcastEpisode, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "name": episode.title,
    "description": episode.seoDescription,
    "url": `${siteUrl}/podcasts/${episode.slug}`,
    "datePublished": episode.publishedDate.toISOString(),
    "duration": episode.duration,
    "associatedMedia": [
      {
        "@type": "MediaObject",
        "contentUrl": episode.spotifyUrl,
        "encodingFormat": "audio/mpeg"
      },
      {
        "@type": "VideoObject",
        "contentUrl": episode.youtubeUrl,
        "encodingFormat": "video/mp4"
      }
    ],
    "partOfSeries": {
      "@type": "PodcastSeries",
      "name": "The Investipal Podcast",
      "url": `${siteUrl}/podcasts`
    },
    "publisher": {
      "@type": "Organization",
      "name": "Investipal",
      "url": siteUrl
    }
  };
}
