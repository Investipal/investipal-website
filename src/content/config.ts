// Import utilities from `astro:content`
import { defineCollection, z, type CollectionEntry } from 'astro:content';

// Define the blog collection schema
const blog = defineCollection({
  type: 'content',
  
  // Define the schema for blog post frontmatter
  schema: z.object({
    // Required fields
    title: z.string(),
    excerpt: z.preprocess((v) => (v == null ? '' : v), z.string()), // Accept null/undefined and coerce to empty for migrated content
    // Force a global author for all posts
    author: z.preprocess(() => 'Cameron Howe', z.string()),
    authorTitle: z.preprocess(() => 'Author', z.string()).optional(),
    authorBio: z.preprocess(
      () =>
        'Cameron Howe is an ex-quant and research analyst now turned fintech founder helping financial advisors grow their business by automating the delivery highly personalized proposals and portfolios.',
      z.string()
    ).optional(),
    publishedDate: z.coerce.date(),
    category: z.string(), // Made flexible for migrated content categories
    featuredImage: z.string().optional(),
    featuredImageAlt: z.string().optional(),
    
    // Optional fields with defaults
    authorImage: z.string().default(
      'https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/672e8c7ca4b90b405a96bf19_1698345963307.png'
    ),
    updatedDate: z.coerce.date().optional(),
    tags: z.union([z.array(z.string()), z.string()])
      .transform((val) => Array.isArray(val) ? val : val.split(',').map((t) => t.trim()).filter(Boolean))
      .default([]),
    featured: z.boolean().default(false),
    draft: z.coerce.boolean().default(false),
    seoDescription: z.string().optional(),
    
    // Auto-calculated fields (can be overridden)
    readingTime: z.number().optional(),
    slug: z.string().optional(),
  }),
});

// Define the pages collection schema
const pages = defineCollection({
  type: 'content',
  
  // Define the schema for page frontmatter
  schema: z.object({
    // Required fields
    title: z.string(),
    description: z.string(),
    
    // Optional fields that vary by page
    keywords: z.string().optional(),
    heroTitle: z.string().optional(),
    heroSubtitle: z.string().optional(),
    heroCtaText: z.string().optional(),
    heroCtaUrl: z.string().optional(),
    aboutTitle: z.string().optional(),
    aboutDescription: z.string().optional(),
    featuresTitle: z.string().optional(),
    featuresDescription: z.string().optional(),
    ctaTitle: z.string().optional(),
    ctaDescription: z.string().optional(),
    ctaButtonText: z.string().optional(),
    storyTitle: z.string().optional(),
    storyContent: z.string().optional(),
    missionTitle: z.string().optional(),
    missionContent: z.string().optional(),
    teamTitle: z.string().optional(),
    teamDescription: z.string().optional(),
    contactInfo: z.string().optional(),
    officeHours: z.string().optional(),
    supportInfo: z.string().optional(),
  }),
});

// Define the podcasts collection schema
const podcasts = defineCollection({
  type: 'content',
  
  // Define the schema for podcast episode frontmatter
  schema: z.object({
    // Required fields
    title: z.string(),
    excerpt: z.string().max(200, 'Excerpt should be under 200 characters for SEO'),
    publishedDate: z.coerce.date(),
    // For migrated content we may not have direct audio URLs; make optional
    audioUrl: z.string().url('Must be a valid audio URL').optional(),
    duration: z.string().optional(), // e.g., "45:30"
    
    // Optional fields
    episodeNumber: z.number().optional(),
    season: z.number().optional(),
    hosts: z.array(z.string()).default([]),
    guests: z.array(z.string()).default([]),
    topics: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
    coverImageAlt: z.string().optional(),
    transcript: z.string().optional(),
    // Guest fields (optional, populated from Webflow when available)
    guestName: z.string().optional(),
    guestTitle: z.string().optional(),
    guestCompany: z.string().optional(),
    guestBio: z.string().optional(),
    guestLinkedIn: z.string().url().optional(),
    guestTwitter: z.string().url().optional(),
    guestWebsite: z.string().url().optional(),
    // Platform embeds
    youtubeUrl: z.string().url().optional(),
    spotifyUrl: z.string().url().optional(),
    
    // SEO fields
    seoDescription: z.string().optional(),
    keywords: z.array(z.string()).default([]),
    
    // Status fields
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Export the collections object to register all collections
export const collections = {
  blog,
  pages,
  podcasts,
};

// Export types for use in components (use CollectionEntry for strong typing)
export type BlogPost = CollectionEntry<'blog'>;
export type PageContent = CollectionEntry<'pages'>;
export type PodcastEpisode = CollectionEntry<'podcasts'>;
