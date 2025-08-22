// Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';

// Define the blog collection schema
const blog = defineCollection({
  type: 'content',
  
  // Define the schema for blog post frontmatter
  schema: z.object({
    // Required fields
    title: z.string(),
    excerpt: z.string().max(160, 'Excerpt should be under 160 characters for SEO'),
    author: z.string(),
    publishedDate: z.date(),
    category: z.enum([
      'AI & Technology',
      'Portfolio Management', 
      'Client Communication',
      'Compliance',
      'Industry Trends',
      'Best Practices',
      'Process Improvement'
    ]),
    featuredImage: z.string(),
    featuredImageAlt: z.string(),
    
    // Optional fields with defaults
    authorImage: z.string().optional(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
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
    excerpt: z.string().max(160, 'Excerpt should be under 160 characters for SEO'),
    publishedDate: z.date(),
    audioUrl: z.string().url('Must be a valid audio URL'),
    duration: z.string(), // e.g., "45:30"
    
    // Optional fields
    episodeNumber: z.number().optional(),
    season: z.number().optional(),
    hosts: z.array(z.string()).default([]),
    guests: z.array(z.string()).default([]),
    topics: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
    coverImageAlt: z.string().optional(),
    transcript: z.string().optional(),
    
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

// Export types for use in components
export type BlogPost = z.infer<typeof blog.schema>;
export type PageContent = z.infer<typeof pages.schema>;
export type PodcastEpisode = z.infer<typeof podcasts.schema>;
