import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import TurndownService from 'turndown';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class BestPracticesMigration {
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
    console.log('🎯 Starting BEST PRACTICES migration...');
    console.log('📚 Using Turndown.js with Astro-optimized configuration');

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

    console.log('✅ Best practices migration complete!');
    console.log('🔍 Recommendation: Review output for quality and run Astro dev server to test');
  }

  async processPost(post) {
    const title = post.Name || 'Untitled';
    const slug = post.Slug || this.createSlug(title);

    console.log(`📝 Processing: ${title}`);

    let htmlContent = post.Details || '';

    // Step 1: Pre-process HTML for better conversion
    htmlContent = this.preprocessHTML(htmlContent);

    // Step 2: Convert using Turndown (industry standard)
    let markdownContent = this.turndownService.turndown(htmlContent);

    // Step 3: Post-process Markdown for Astro optimization
    markdownContent = this.postprocessMarkdown(markdownContent);

    // Step 4: Create Astro-compliant frontmatter
    const frontmatter = this.createAstroFrontmatter(post);

    // Step 5: Write file
    const filename = `${slug}.md`;
    const filepath = path.join(this.outputDir, filename);
    const fullContent = `${frontmatter}\n${markdownContent}`;

    fs.writeFileSync(filepath, fullContent);
    console.log(`✅ Created: ${filename}`);
  }

  preprocessHTML(html) {
    // Remove problematic Webflow-specific attributes
    html = html.replace(/id="[^"]*"/g, '');
    html = html.replace(/class="[^"]*"/g, '');
    html = html.replace(/data-[^=]*="[^"]*"/g, '');
    
    // Clean up empty elements
    html = html.replace(/<([^>]+)>\s*<\/\1>/g, '');
    
    // Fix common HTML issues
    html = html.replace(/&nbsp;/g, ' ');
    html = html.replace(/\s+/g, ' '); // Normalize whitespace
    
    return html;
  }

  postprocessMarkdown(markdown) {
    // Fix excessive whitespace (Astro best practice)
    markdown = markdown.replace(/\n{4,}/g, '\n\n\n'); // Max 3 newlines
    
    // Fix list formatting issues
    markdown = markdown.replace(/^(\s*)-\s*$/gm, ''); // Remove empty list items
    
    // Fix header spacing (ensure proper spacing after headers)
    markdown = markdown.replace(/(#{1,6}\s+[^\n]+)\n([^\n#])/g, '$1\n\n$2');
    
    // Fix bold text spacing issues
    markdown = markdown.replace(/\*\*([^*]+?)\s+\*\*/g, '**$1**');
    markdown = markdown.replace(/\*\*\s+([^*]+?)\*\*/g, '**$1**');
    
    // Clean up Unicode characters that break formatting
    markdown = markdown.replace(/[\u00A0\u2000-\u200B\u2028-\u2029]/g, ' ');
    
    // Trim and normalize
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

const migration = new BestPracticesMigration();
migration.migrate().catch(console.error);




