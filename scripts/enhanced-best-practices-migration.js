import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import TurndownService from 'turndown';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class EnhancedBestPracticesMigration {
  constructor() {
    this.csvPath = path.join(__dirname, '..', '..', 'Wealth Mgmt Site - Blog Posts (1).csv');
    this.outputDir = path.join(__dirname, '..', 'src', 'content', 'blog');
    
    // Initialize Turndown with best practices configuration
    this.turndownService = new TurndownService({
      headingStyle: 'atx',           // Use # style headers (Astro/GitHub standard)
      hr: '---',                     // Use --- for horizontal rules
      bulletListMarker: '-',         // Use - for bullet lists (consistent)
      codeBlockStyle: 'fenced',      // Use ``` for code blocks
      fence: '```',                  // Use ``` for fenced code blocks
      emDelimiter: '*',              // Use * for emphasis
      strongDelimiter: '**',         // Use ** for strong emphasis
      linkStyle: 'inlined',          // Use [text](url) for links
      linkReferenceStyle: 'full',    // Full reference style when needed
      preformattedCode: false,       // Don't treat all <pre> as code
      blankReplacement: function (content, node) {
        return node.isBlock ? '\n\n' : '';
      },
      keepReplacement: function (content, node) {
        return node.isBlock ? '\n\n' + node.outerHTML + '\n\n' : node.outerHTML;
      }
    });

    this.configureTurndown();
  }

  configureTurndown() {
    // Remove problematic elements that cause issues
    this.turndownService.remove(['script', 'style', 'meta', 'link']);
    
    // Handle images - remove them since they're handled locally
    this.turndownService.addRule('images', {
      filter: ['img'],
      replacement: function () {
        return ''; // Remove images completely
      }
    });

    // Handle figures - remove them since they contain images
    this.turndownService.addRule('figures', {
      filter: ['figure'],
      replacement: function () {
        return ''; // Remove figures completely
      }
    });

    // Handle divs - convert to paragraph breaks
    this.turndownService.addRule('divs', {
      filter: 'div',
      replacement: function (content) {
        return content ? '\n\n' + content + '\n\n' : '';
      }
    });

    // Handle spans - just return content
    this.turndownService.addRule('spans', {
      filter: 'span',
      replacement: function (content) {
        return content;
      }
    });

    // Handle blockquotes properly
    this.turndownService.addRule('blockquotes', {
      filter: 'blockquote',
      replacement: function (content) {
        content = content.replace(/^\n+|\n+$/g, '');
        content = content.replace(/^/gm, '> ');
        return '\n\n' + content + '\n\n';
      }
    });

    // Handle line breaks
    this.turndownService.addRule('lineBreaks', {
      filter: 'br',
      replacement: function () {
        return '\n';
      }
    });

    // Handle paragraphs with proper spacing
    this.turndownService.addRule('paragraphs', {
      filter: 'p',
      replacement: function (content) {
        return content ? '\n\n' + content + '\n\n' : '';
      }
    });
  }

  async migrate() {
    console.log('🎯 Starting ENHANCED BEST PRACTICES migration...');
    console.log('📚 Using Turndown.js with enhanced post-processing');

    const csvContent = fs.readFileSync(this.csvPath, 'utf-8');
    const parsed = Papa.parse(csvContent, { header: true });

    const publishedPosts = parsed.data.filter(post =>
      post.Archived === 'false' &&
      post.Draft === 'false' &&
      post.Details &&
      post.Details.trim()
    );

    console.log(`📊 Found ${publishedPosts.length} published posts to migrate`);

    // Get pilot posts (including the specific one)
    const targetPost = publishedPosts.find(post =>
      post.Slug === 'how-to-use-ai-for-personalized-investment-proposal-generation-a-practical-guide'
    );

    const pilotPosts = targetPost ?
      [targetPost, ...publishedPosts.filter(p => p !== targetPost).slice(0, 2)] :
      publishedPosts.slice(0, 3);

    for (const post of pilotPosts) {
      await this.processPost(post);
    }

    console.log('✅ Enhanced best practices migration complete!');
    console.log('🔍 Recommendation: Review output for quality and run Astro dev server to test');
  }

  async processPost(post) {
    const title = post.Name || 'Untitled';
    const slug = post.Slug || this.createSlug(title);

    console.log(`📝 Processing: ${title}`);

    let htmlContent = post.Details || '';

    // Step 1: Pre-process HTML for better conversion (FIX WEBFLOW ISSUES)
    htmlContent = this.fixWebflowHTML(htmlContent);

    // Step 2: Convert using Turndown (industry standard)
    let markdownContent = this.turndownService.turndown(htmlContent);

    // Step 3: Enhanced post-processing for Webflow-specific issues
    markdownContent = this.enhancedPostProcessing(markdownContent);

    // Step 4: Create Astro-compliant frontmatter
    const frontmatter = this.createAstroFrontmatter(post);

    // Step 5: Write file
    const filename = `${slug}.md`;
    const filepath = path.join(this.outputDir, filename);
    const fullContent = `${frontmatter}\n${markdownContent}`;

    fs.writeFileSync(filepath, fullContent);
    console.log(`✅ Created: ${filename}`);
  }

  fixWebflowHTML(html) {
    // Fix common Webflow HTML issues BEFORE Turndown conversion
    
    // 1. Fix malformed list items that run together
    html = html.replace(/<\/li><li/g, '</li>\n<li');
    html = html.replace(/<li([^>]*)>([^<]*)<strong>([^<]*)<\/strong>([^<]*)/g, '<li$1><strong>$3</strong> $2$4');
    
    // 2. Fix missing spaces after strong tags
    html = html.replace(/<\/strong>([A-Za-z])/g, '</strong> $1');
    html = html.replace(/<\/strong>—/g, '</strong> —');
    
    // 3. Fix list items that should be separate
    html = html.replace(/([.!?])-([A-Z])/g, '$1\n- $2');
    html = html.replace(/([.!?])\s*-\s*\*\*/g, '$1\n\n- **');
    
    // 4. Fix bold text followed immediately by list items
    html = html.replace(/\*\*([^*]+)\*\*-\s*/g, '**$1**\n\n- ');
    
    // 5. Remove problematic Webflow-specific attributes
    html = html.replace(/id="[^"]*"/g, '');
    html = html.replace(/class="[^"]*"/g, '');
    html = html.replace(/data-[^=]*="[^"]*"/g, '');
    
    // 6. Clean up empty elements
    html = html.replace(/<([^>]+)>\s*<\/\1>/g, '');
    
    // 7. Fix common HTML issues
    html = html.replace(/&nbsp;/g, ' ');
    html = html.replace(/\s+/g, ' '); // Normalize whitespace
    
    return html;
  }

  enhancedPostProcessing(markdown) {
    // Enhanced post-processing to fix Webflow-specific Markdown issues
    
    // 1. Fix bullets that run together with text
    markdown = markdown.replace(/([.!?])([A-Z][^-\n]*)-\s*/g, '$1\n\n$2\n\n- ');
    markdown = markdown.replace(/([.!?])\*\*([^*]+)\*\*-\s*/g, '$1\n\n**$2**\n\n- ');
    
    // 2. Fix bold text immediately followed by bullets
    markdown = markdown.replace(/\*\*([^*]+)\*\*-\s*/g, '**$1**\n\n- ');
    markdown = markdown.replace(/\*\*([^*]+)\*\*([A-Z][^-\n]*)-\s*/g, '**$1**\n\n$2\n\n- ');
    
    // 3. Fix missing spaces after bold text
    markdown = markdown.replace(/\*\*([^*]+)\*\*([A-Za-z])/g, '**$1** $2');
    markdown = markdown.replace(/\*\*([^*]+)\*\*—/g, '**$1** —');
    
    // 4. Fix list items that should be on new lines
    markdown = markdown.replace(/([.!?])-\s*([A-Z])/g, '$1\n\n- $2');
    markdown = markdown.replace(/seconds\.\s*-\s*\*\*/g, 'seconds.\n\n- **');
    
    // 5. Fix "Net effect?" pattern specifically
    markdown = markdown.replace(/\*\*Net effect\?\*\*-\s*/g, '**Net effect?**\n\n- ');
    
    // 6. Fix excessive whitespace (Astro best practice)
    markdown = markdown.replace(/\n{4,}/g, '\n\n\n'); // Max 3 newlines
    
    // 7. Fix list formatting issues
    markdown = markdown.replace(/^(\s*)-\s*$/gm, ''); // Remove empty list items
    
    // 8. Fix header spacing (ensure proper spacing after headers)
    markdown = markdown.replace(/(#{1,6}\s+[^\n]+)\n([^\n#])/g, '$1\n\n$2');
    
    // 9. Fix bold text spacing issues
    markdown = markdown.replace(/\*\*([^*]+?)\s+\*\*/g, '**$1**');
    markdown = markdown.replace(/\*\*\s+([^*]+?)\*\*/g, '**$1**');
    
    // 10. Clean up Unicode characters that break formatting
    markdown = markdown.replace(/[\u00A0\u2000-\u200B\u2028-\u2029]/g, ' ');
    
    // 11. Fix specific patterns we know are problematic
    markdown = markdown.replace(/-\*\*([^*]+)\*\*—/g, '- **$1** —');
    markdown = markdown.replace(/-\*\*([^*]+)\*\*([A-Z])/g, '- **$1** $2');
    
    // 12. Trim and normalize
    markdown = markdown.trim();
    
    return markdown;
  }

  createAstroFrontmatter(post) {
    const title = post.Name || 'Untitled';
    
    // Extract excerpt from multiple possible sources (Astro best practice)
    let excerpt = post['Short Info'] || post['Meta Description'] || '';
    if (!excerpt.trim()) {
      // Fallback: extract from content (SEO best practice)
      const content = post.Details || '';
      const plainText = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
      excerpt = plainText.length > 160 ? plainText.substring(0, 157) + '...' : plainText;
    }
    
    // Use proper field mapping from CSV
    const author = post['Author Name'] || 'Investipal Team';
    const publishedDate = this.parseDate(post['Created On']);
    const updatedDate = this.parseDate(post['Updated On']);
    const category = post.Tag || 'General';
    const tags = post.Tag ? [post.Tag] : [];
    const slug = post.Slug || this.createSlug(title);

    // Astro-compliant frontmatter (YAML format)
    return `---
title: "${this.escapeYaml(title)}"
excerpt: "${this.escapeYaml(excerpt)}"
author: "${this.escapeYaml(author)}"
publishedDate: ${publishedDate}
updatedDate: ${updatedDate}
category: "${this.escapeYaml(category)}"
tags: ${JSON.stringify(tags)}
slug: "${slug}"
featuredImage: ""
draft: false
---`;
  }

  escapeYaml(str) {
    if (!str) return '';
    return str.replace(/"/g, '\\"');
  }

  parseDate(dateString) {
    if (!dateString) return new Date().toISOString();

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return new Date().toISOString();
      }
      return date.toISOString();
    } catch (error) {
      console.warn(`Invalid date: ${dateString}, using current date`);
      return new Date().toISOString();
    }
  }

  createSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .trim();
  }
}

const migration = new EnhancedBestPracticesMigration();
migration.migrate().catch(console.error);





