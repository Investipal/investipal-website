import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import he from 'he';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class StructurePreservingMigration {
  constructor() {
    this.csvPath = path.join(__dirname, '..', '..', 'Wealth Mgmt Site - Blog Posts (1).csv');
    this.outputDir = path.join(__dirname, '..', 'src', 'content', 'blog');
  }

  async migrate() {
    console.log('🎯 Starting STRUCTURE-PRESERVING migration...');

    const csvContent = fs.readFileSync(this.csvPath, 'utf-8');
    const parsed = Papa.parse(csvContent, { header: true });

    const publishedPosts = parsed.data.filter(post =>
      post.Archived === 'false' &&
      post.Draft === 'false' &&
      post.Details &&
      post.Details.trim()
    );

    console.log(`📊 Found ${publishedPosts.length} published posts to migrate`);

    const targetPost = publishedPosts.find(post =>
      post.Slug === 'how-to-use-ai-for-personalized-investment-proposal-generation-a-practical-guide'
    );

    const pilotPosts = targetPost ?
      [targetPost, ...publishedPosts.filter(p => p !== targetPost).slice(0, 2)] :
      publishedPosts.slice(0, 3);

    for (const post of pilotPosts) {
      await this.processPost(post);
    }

    console.log('✅ Structure-preserving migration complete!');
  }

  async processPost(post) {
    const title = post.Name || 'Untitled';
    const slug = post.Slug || this.createSlug(title);

    console.log(`📝 Processing: ${title}`);

    let htmlContent = post.Details || '';

    // Step 1: Decode HTML entities
    htmlContent = he.decode(htmlContent);

    // Step 2: STRUCTURE-PRESERVING conversion
    let markdownContent = this.preserveStructureConvert(htmlContent);

    const frontmatter = this.createFrontmatter(post);

    const filename = `${slug}.md`;
    const filepath = path.join(this.outputDir, filename);
    const fullContent = `${frontmatter}\n${markdownContent}`;

    fs.writeFileSync(filepath, fullContent);
    console.log(`✅ Created: ${filename}`);
  }

  preserveStructureConvert(html) {
    // Remove ALL images first (since you have them locally)
    html = html.replace(/<img[^>]*>/gi, '');
    html = html.replace(/<figure[^>]*>.*?<\/figure>/gis, '');
    html = html.replace(/<picture[^>]*>.*?<\/picture>/gis, '');

    // Convert headers - PRESERVE spacing by adding proper line breaks
    html = html.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n\n# $1\n\n');
    html = html.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n\n## $1\n\n');
    html = html.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n\n### $1\n\n');
    html = html.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n\n#### $1\n\n');
    html = html.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '\n\n##### $1\n\n');
    html = html.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '\n\n###### $1\n\n');

    // Convert paragraphs - PRESERVE spacing
    html = html.replace(/<p[^>]*>(.*?)<\/p>/gi, '\n\n$1\n\n');

    // Convert lists - PRESERVE structure
    // First handle list items
    html = html.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
    
    // Then handle list containers with proper spacing
    html = html.replace(/<ul[^>]*>/gi, '\n\n');
    html = html.replace(/<\/ul>/gi, '\n\n');
    html = html.replace(/<ol[^>]*>/gi, '\n\n');
    html = html.replace(/<\/ol>/gi, '\n\n');

    // Convert formatting - PRESERVE bold/italic
    html = html.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
    html = html.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
    html = html.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
    html = html.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');

    // Convert links
    html = html.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');

    // Convert blockquotes - PRESERVE structure
    html = html.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, '\n\n> $1\n\n');

    // Convert line breaks
    html = html.replace(/<br\s*\/?>/gi, '\n');

    // Remove ALL remaining HTML tags and attributes
    html = html.replace(/<[^>]*>/g, '');

    // Clean up HTML entities
    html = html.replace(/&nbsp;/g, ' ');
    html = html.replace(/&amp;/g, '&');
    html = html.replace(/&lt;/g, '<');
    html = html.replace(/&gt;/g, '>');
    html = html.replace(/&quot;/g, '"');

    // Fix Unicode characters that break formatting
    html = html.replace(/┬á/g, ' '); // Non-breaking space
    html = html.replace(/ΓÇö/g, '—'); // Em dash
    html = html.replace(/ΓÇÖ/g, "'"); // Right single quotation mark
    html = html.replace(/ΓÇ£/g, '"'); // Left double quotation mark
    html = html.replace(/ΓÇ¥/g, '"'); // Right double quotation mark

    // Fix broken bold formatting - AFTER Unicode cleanup
    html = html.replace(/\*\*([^*]+?)\s+\*\*/g, '**$1**'); // Fix bold with trailing spaces
    html = html.replace(/\*\*\s+([^*]+?)\*\*/g, '**$1**'); // Fix bold with leading spaces

    // GENTLE whitespace cleanup - preserve structure
    html = html.replace(/\n{4,}/g, '\n\n\n'); // Limit to max 3 newlines
    html = html.replace(/[ \t]+/g, ' '); // Multiple spaces to single (but preserve newlines)
    html = html.trim();

    return html;
  }

  createFrontmatter(post) {
    const title = post.Name || 'Untitled';
    
    // Fix excerpt - check multiple possible fields and create fallback
    let excerpt = post['Meta Description'] || post['Short Info'] || post['Excerpt'] || '';
    if (!excerpt.trim()) {
      // Fallback: extract first 160 characters from content
      const content = post.Details || '';
      const plainText = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
      excerpt = plainText.length > 160 ? plainText.substring(0, 157) + '...' : plainText;
    }
    
    const author = post['Author Name'] || 'Investipal Team';
    const publishedDate = this.parseDate(post['Created On']);
    const updatedDate = this.parseDate(post['Updated On']);
    const category = post.Tag || 'General';
    const tags = post.Tag ? [post.Tag] : [];
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

const migration = new StructurePreservingMigration();
migration.migrate().catch(console.error);




