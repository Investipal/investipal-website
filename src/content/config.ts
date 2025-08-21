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

// Export the collections object to register the blog collection
export const collections = {
  blog,
};

// Export types for use in components
export type BlogPost = z.infer<typeof blog.schema>;
