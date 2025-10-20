import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { NodeHtmlMarkdown } from 'node-html-markdown';
import he from 'he';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CleanSimpleMigration {
  constructor() {
    this.csvPath = path.join(__dirname, '..', '..', 'Wealth Mgmt Site - Blog Posts (1).csv');
    this.outputDir = path.join(__dirname, '..', 'src', 'content', 'blog');
    
    // Configure NodeHtmlMarkdown with SIMPLE, CONSERVATIVE settings
    this.nhm = new NodeHtmlMarkdown({
      useInlineLinks: true,
      useLinkReferenceDefinitions: false,
      useInlineImages: true,
      bulletMarker: '-',
      codeBlockStyle: 'fenced',
      preserveNewlines: false,  // Let it handle newlines naturally
      collapseWhitespace: true, // Clean up extra spaces
      // NO custom overrides - let the library handle everything
    });
  }

  async migrate() {
    console.log('🧹 Starting CLEAN, SIMPLE migration...');
    
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
    
    console.log('✅ Clean migration complete!');
  }

  async processPost(post) {
    const title = post.Name || 'Untitled';
    const slug = post.Slug || this.createSlug(title);
    
    console.log(`📝 Processing: ${title}`);
    
    // Clean HTML content - MINIMAL processing
    let htmlContent = post.Details || '';
    
    // Step 1: GLOBAL PRE-CLEANING - Remove problematic HTML patterns
    htmlContent = this.preCleanHtml(htmlContent);
    
    // Step 2: Decode HTML entities
    htmlContent = he.decode(htmlContent);
    
    // Step 3: Basic cleanup only
    htmlContent = htmlContent.replace(/&nbsp;/g, ' ');
    htmlContent = htmlContent.replace(/<br\s*\/?>/gi, '\n');
    
    // Step 4: Convert to Markdown - let NodeHtmlMarkdown do its job
    let markdownContent = this.nhm.translate(htmlContent);
    
    // Step 5: MINIMAL post-processing - only fix obvious issues
    markdownContent = this.minimalCleanup(markdownContent);
    
    // Create frontmatter
    const frontmatter = this.createFrontmatter(post);
    
    // Write file
    const filename = `${slug}.md`;
    const filepath = path.join(this.outputDir, filename);
    const fullContent = `${frontmatter}\n${markdownContent}`;
    
    fs.writeFileSync(filepath, fullContent);
    console.log(`✅ Created: ${filename}`);
  }

  preCleanHtml(html) {
    // GLOBAL FIX: Remove ALL problematic HTML patterns that cause Astro parsing errors
    
    // 1. Remove ALL complex image structures (most comprehensive approach)
    html = html.replace(/<img[^>]*>/gi, ''); // Remove ALL img tags completely
    html = html.replace(/<figure[^>]*>.*?<\/figure>/gis, ''); // Remove figure elements
    html = html.replace(/<picture[^>]*>.*?<\/picture>/gis, ''); // Remove picture elements
    
    // 2. Remove ALL JSON-like structures (comprehensive patterns)
    html = html.replace(/\{[^}]*\}/g, ''); // Remove ANY curly brace content
    html = html.replace(/&#x22;[^&#]*&#x22;/g, ''); // Remove HTML-encoded quotes content
    html = html.replace(/&quot;[^&]*&quot;/g, ''); // Remove quote-encoded content
    
    // 3. Remove problematic Webflow-specific elements
    html = html.replace(/<div[^>]*class="[^"]*w-[^"]*"[^>]*>/gi, '<div>'); // Simplify Webflow classes
    html = html.replace(/id="[^"]*"/gi, ''); // Remove all id attributes
    html = html.replace(/class="[^"]*"/gi, ''); // Remove all class attributes
    html = html.replace(/data-[^=]*="[^"]*"/gi, ''); // Remove all data attributes
    
    // 4. Clean up malformed structures
    html = html.replace(/\s+>/g, '>'); // Remove trailing spaces before >
    html = html.replace(/>\s+</g, '><'); // Remove spaces between tags
    html = html.replace(/\s{2,}/g, ' '); // Collapse multiple spaces
    
    // 5. Remove any remaining problematic patterns
    html = html.replace(/src="[^"]*"/gi, ''); // Remove any remaining src attributes
    html = html.replace(/alt="[^"]*"/gi, ''); // Remove any remaining alt attributes
    
    return html;
  }

  minimalCleanup(markdown) {
    // Only fix the most obvious issues
    
    // Fix common HTML entities that might have been missed
    markdown = markdown.replace(/&amp;/g, '&');
    markdown = markdown.replace(/&lt;/g, '<');
    markdown = markdown.replace(/&gt;/g, '>');
    markdown = markdown.replace(/&quot;/g, '"');
    
    // Remove malformed image references that cause Astro parsing errors
    markdown = markdown.replace(/\{&#x22;[^}]+\}/g, '');
    
    // Clean up excessive whitespace
    markdown = markdown.replace(/\n{3,}/g, '\n\n');
    
    // Trim
    markdown = markdown.trim();
    
    return markdown;
  }

  createFrontmatter(post) {
    const title = post.Name || 'Untitled';
    const excerpt = post['Meta Description'] || '';
    const author = 'Investipal Team';
    const publishedDate = this.parseDate(post['Created On']);
    const updatedDate = this.parseDate(post['Updated On']);
    const category = post.Category || 'General';
    const tags = post.Category ? [post.Category] : [];
    const slug = post.Slug || this.createSlug(title);
    const featuredImage = post['Featured Image'] || '';
    
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

const migration = new CleanSimpleMigration();
migration.migrate().catch(console.error);
