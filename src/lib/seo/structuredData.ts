// SEO Structured Data Generation
// Generates JSON-LD structured data for enhanced search engine understanding

interface BlogPostStructuredData {
  "@context": string;
  "@type": string;
  headline: string;
  description: string;
  image: string;
  author: {
    "@type": string;
    name: string;
    image?: string;
  };
  publisher: {
    "@type": string;
    name: string;
    logo: {
      "@type": string;
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  mainEntityOfPage: {
    "@type": string;
    "@id": string;
  };
  articleSection: string;
  keywords: string;
  wordCount: number;
  timeRequired: string;
}

export function generateBlogPostStructuredData(
  frontmatter: {
    title: string;
    excerpt: string;
    author: string;
    authorImage?: string;
    publishedDate: Date;
    updatedDate?: Date;
    category: string;
    tags: string[];
    featuredImage: string;
    readingTime?: number;
  },
  slug: string,
  content: string,
  siteUrl: string = 'https://investipal.co'
): BlogPostStructuredData {
  const pageUrl = `${siteUrl}/blog/${slug}`;
  const wordCount = content.split(/\s+/).length;
  const readingTime = frontmatter.readingTime || Math.ceil(wordCount / 200);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": frontmatter.title,
    "description": frontmatter.excerpt,
    "image": frontmatter.featuredImage,
    "author": {
      "@type": "Person",
      "name": frontmatter.author,
      ...(frontmatter.authorImage && { "image": frontmatter.authorImage })
    },
    "publisher": {
      "@type": "Organization",
      "name": "Investipal",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "datePublished": frontmatter.publishedDate.toISOString(),
    "dateModified": (frontmatter.updatedDate || frontmatter.publishedDate).toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl
    },
    "articleSection": frontmatter.category,
    "keywords": frontmatter.tags.join(", "),
    "wordCount": wordCount,
    "timeRequired": `PT${readingTime}M`
  };
}

export function generateBreadcrumbStructuredData(
  breadcrumbs: Array<{ name: string; url: string }>,
  siteUrl: string = 'https://investipal.co'
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${siteUrl}${crumb.url}`
    }))
  };
}

export function generateWebsiteStructuredData(siteUrl: string = 'https://investipal.co') {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Investipal",
    "url": siteUrl,
    "description": "AI built for financial advisors to help you streamline compliance, build portfolios, and stay compliant in one seamless workflow.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/blog?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}





