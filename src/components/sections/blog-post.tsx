import type { CollectionEntry } from 'astro:content';
import { ChevronLeft, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

import { BlogCard } from './blog-posts';

/**
 * Calculate read time based on word count
 * @param content - The markdown content to analyze
 * @returns Formatted read time string (e.g., "5 min read")
 */
export function calculateReadTime(content: string): string {
  // Remove markdown syntax and count words
  const cleanContent = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/^\s*[-*+]\s+/gm, '') // Remove list markers
    .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered list markers
    .replace(/---[\s\S]*?---/g, '') // Remove frontmatter
    .trim();

  const words = cleanContent.split(/\s+/).filter((word) => word.length > 0);
  const wordCount = words.length;

  // Average reading speed is 200-250 words per minute, using 225
  const readingSpeed = 225;
  const minutes = Math.ceil(wordCount / readingSpeed);

  return `${Math.max(1, minutes)} min read`;
}

const BlogPost = ({
  post,
  relatedPosts,
  children,
}: {
  post: CollectionEntry<'blog'>[];
  relatedPosts: CollectionEntry<'blog'>[];
  children: React.ReactNode;
}) => {
  const { title, description, date, coverImage, author } = post[0].data;
  const { id, body } = post[0];
  const readTime = calculateReadTime(body || '');

  return (
    <div className="section-padding container">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-8">
          <a
            href="/blog"
            className="group text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
          >
            <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Blog
          </a>

          {/* Title and Description */}
          <h1 className="mb-4 text-4xl tracking-tight md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="text-muted-foreground mb-8 text-lg md:text-xl">
            {description}
          </p>
        </header>

        <motion.div className="relative aspect-[16/9] overflow-hidden rounded-xl">
          <img
            src={coverImage}
            alt={title}
            className="size-full object-cover"
          />
        </motion.div>

        {/* Author Information */}
        <div className="mt-8 mb-12 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative size-14 overflow-hidden rounded-full">
              <img
                src={author.image}
                alt={author.name}
                className="size-full object-cover"
              />
            </div>
            <div>
              <div className="text-foreground text-2xl font-semibold">
                {author.name}
              </div>
              <div className="text-muted-foreground">
                {new Date(date).toLocaleDateString('en-GB', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}{' '}
                · {readTime}
              </div>
            </div>
          </div>

          {/* Social Share Icons */}
          <div className="bg-background border-input [&_*]:border-input grid grid-cols-3 items-center divide-x rounded-sm border shadow-sm">
            <a
              href={author.facebookUrl}
              className="flex items-center justify-center px-3 py-2.5 md:px-5"
            >
              <Facebook className="size-4 shrink-0 md:size-5" />
            </a>
            <a
              href={author.twitterUrl}
              className="flex items-center justify-center px-3 py-2.5 md:px-5"
            >
              <Twitter className="size-4 shrink-0 md:size-5" />
            </a>
            <a
              href={author.linkedinUrl}
              className="flex items-center justify-center px-3 py-2.5 md:px-5"
            >
              <MessageCircle className="size-4 shrink-0 md:size-5" />
            </a>
          </div>
        </div>

        {/* Article Content */}
        <article className="prose lg:prose-lg prose-headings:font-weight-display dark:prose-invert prose-headings:tracking-tight prose-p:leading-relaxed prose-li:leading-relaxed prose-img:rounded-xl prose-img:shadow-sm prose-a:text-primary prose-a:no-underline hover:prose-a:underline mx-auto max-w-none">
          {children}
        </article>
      </div>

      {relatedPosts.length > 0 && (
        <section className="mt-20 lg:mt-24">
          <h2 className="text-4xl tracking-tight lg:text-5xl">
            Related Articles
          </h2>
          <p className="text-muted-foreground mt-3 text-lg leading-snug lg:mt-4">
            From seamless integrations to productivity wins and fresh feature
            drops—these stories show how Pulse empowers teams to save time,
            collaborate better, and stay ahead in fast-paced work environments.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => {
              return (
                <a
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="group block h-full"
                >
                  <BlogCard post={relatedPost} />
                </a>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export { BlogPost };
