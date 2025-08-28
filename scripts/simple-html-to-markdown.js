import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import he from 'he';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SimpleHtmlToMarkdown {
  constructor() {
    this.csvPath = path.join(__dirname, '..', '..', 'Wealth Mgmt Site - Blog Posts (1).csv');
    this.outputDir = path.join(__dirname, '..', 'src', 'content', 'blog');
  }

  async migrate() {
    console.log('🧹 Starting SIMPLE HTML-to-Markdown migration...');
    
    // Read and parse CSV
    const csvContent = fs.readFileSync(this.csvPath, 'utf-8');
    const parsed = Papa.parse(csvContent, { header: true });
    
    // Filter for published posts only
    const publishedPosts = parsed.data.filter(post => 
      post.Archived === 'false' && 
      post.Draft === 'false' && 
      post.Details && 
      post.Details.trim()
    );
    
    console.log(`📊 Found ${publishedPosts.length} published posts to migrate`);
    
    // Find the specific post we've been working with
    const targetPost = publishedPosts.find(post => 
      post.Slug === 'how-to-use-ai-for-personalized-investment-proposal-generation-a-practical-guide'
    );
    
    // Process target post plus 2 others for pilot
    const pilotPosts = targetPost ? 
      [targetPost, ...publishedPosts.filter(p => p !== targetPost).slice(0, 2)] :
      publishedPosts.slice(0, 3);
    
    for (const post of pilotPosts) {
      await this.processPost(post);
    }
    
    console.log('✅ Simple migration complete!');
  }

  async processPost(post) {
    const title = post.Name || 'Untitled';
    const slug = post.Slug || this.createSlug(title);
    
    console.log(`📝 Processing: ${title}`);
    
    // Get HTML content
    let htmlContent = post.Details || '';
    
    // Step 1: Decode HTML entities
    htmlContent = he.decode(htmlContent);
    
    // Step 2: SIMPLE conversion - no complex libraries
    let markdownContent = this.simpleHtmlToMarkdown(htmlContent);
    
    // Create frontmatter
    const frontmatter = this.createFrontmatter(post);
    
    // Write file
    const filename = `${slug}.md`;
    const filepath = path.join(this.outputDir, filename);
    const fullContent = `${frontmatter}\n${markdownContent}`;
    
    fs.writeFileSync(filepath, fullContent);
    console.log(`✅ Created: ${filename}`);
  }

  simpleHtmlToMarkdown(html) {
    // SIMPLE, SAFE conversion that won't create malformed JSON
    
    // 1. Remove ALL images completely (since you have them locally)
    html = html.replace(/<img[^>]*>/gi, '');
    html = html.replace(/<figure[^>]*>.*?<\/figure>/gis, '');
    html = html.replace(/<picture[^>]*>.*?<\/picture>/gis, '');
    
    // Also remove any remaining image-like patterns that might cause issues
    html = html.replace(/!\[.*?\]\([^)]*\)/g, ''); // Remove Markdown images
    html = html.replace(/!\[\]/g, ''); // Remove empty Markdown images
    
    // 2. Convert headers (ensure proper spacing)
    html = html.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n\n# $1\n\n');
    html = html.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n\n## $1\n\n');
    html = html.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n\n### $1\n\n');
    html = html.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n\n#### $1\n\n');
    html = html.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '\n\n##### $1\n\n');
    html = html.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '\n\n###### $1\n\n');
    
    // 3. Convert paragraphs (ensure proper spacing)
    html = html.replace(/<p[^>]*>(.*?)<\/p>/gi, '\n\n$1\n\n');
    
    // 4. Convert lists (preserve structure)
    html = html.replace(/<ul[^>]*>/gi, '\n\n');
    html = html.replace(/<\/ul>/gi, '\n\n');
    html = html.replace(/<ol[^>]*>/gi, '\n\n');
    html = html.replace(/<\/ol>/gi, '\n\n');
    html = html.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
    
    // 5. Convert formatting
    html = html.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
    html = html.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
    html = html.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
    html = html.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
    
    // 6. Convert links
    html = html.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');
    
    // 7. Convert line breaks
    html = html.replace(/<br\s*\/?>/gi, '\n');
    
    // 8. Remove all remaining HTML tags
    html = html.replace(/<[^>]*>/g, '');
    
    // 9. Clean up HTML entities and Unicode characters FIRST
    html = html.replace(/&nbsp;/g, ' ');
    html = html.replace(/&amp;/g, '&');
    html = html.replace(/&lt;/g, '<');
    html = html.replace(/&gt;/g, '>');
    html = html.replace(/&quot;/g, '"');
    
    // 10. Fix Unicode characters that break Markdown formatting
    html = html.replace(/┬á/g, ' '); // Non-breaking space
    html = html.replace(/ΓÇö/g, '—'); // Em dash
    html = html.replace(/ΓÇÖ/g, "'"); // Right single quotation mark
    html = html.replace(/ΓÇ£/g, '"'); // Left double quotation mark
    html = html.replace(/ΓÇ¥/g, '"'); // Right double quotation mark
    html = html.replace(/ΓÇì/g, '—'); // Em dash variant
    
    // 11. Fix broken bold formatting caused by Unicode characters and spaces
    html = html.replace(/\*\*([^*]+?)\s*┬á\s*\*\*/g, '**$1**'); // Fix bold with Unicode spaces
    html = html.replace(/\*\*([^*]+?)\s+\*\*/g, '**$1**'); // Fix bold with trailing spaces
    html = html.replace(/\*\*\s+([^*]+?)\*\*/g, '**$1**'); // Fix bold with leading spaces
    html = html.replace(/\*\*([^*]+?)\s\*\*/g, '**$1**'); // Fix bold with single trailing space
    html = html.replace(/\*\*Advanced Analytics \*\*/g, '**Advanced Analytics**'); // Specific fix
    
    // 12. Fix header spacing issues - ensure headers have proper line breaks (AFTER bold fixes)
    html = html.replace(/(#{1,6}\s+[^\n]+)([A-Za-z])/g, '$1\n\n$2'); // Add spacing after headers that run into text
    
    // 13. Clean up whitespace (preserve structure)
    html = html.replace(/[ \t]{2,}/g, ' '); // Multiple spaces/tabs to single space (but preserve newlines)
    html = html.replace(/\n{4,}/g, '\n\n\n'); // Limit excessive newlines but preserve paragraph breaks
    html = html.trim();
    
    return html;
  }

  createFrontmatter(post) {
    const title = post.Name || 'Untitled';
    
    // Fix excerpt - check multiple possible fields and create fallback
    let excerpt = post['Meta Description'] || post['Excerpt'] || post['Description'] || '';
    if (!excerpt.trim()) {
      // Fallback: extract first 160 characters from content
      const content = post.Details || '';
      const plainText = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
      excerpt = plainText.length > 160 ? plainText.substring(0, 157) + '...' : plainText;
    }
    
    const author = 'Investipal Team';
    const publishedDate = this.parseDate(post['Created On']);
    const updatedDate = this.parseDate(post['Updated On']);
    const category = post.Category || 'General';
    const tags = post.Category ? [post.Category] : [];
    const slug = post.Slug || this.createSlug(title);
    
    // For now, leave featuredImage empty (clean approach)
    const featuredImage = '';
    
    return `---
title: "${title}"
excerpt: "${excerpt}"
author: "${author}"
publishedDate: ${publishedDate}
updatedDate: ${updatedDate}
category: "${category}"
tags: ${JSON.stringify(tags)}
slug: "${slug}"
featuredImage: "${featuredImage}"
draft: false
---`;
  }

  parseDate(dateString) {
    if (!dateString) return new Date().toISOString();
    
    try {
      const date = new Date(dateString);
      return date.toISOString();
    } catch (error) {
      return new Date().toISOString();
    }
  }

  createSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
}

const migration = new SimpleHtmlToMarkdown();
migration.migrate().catch(console.error);
