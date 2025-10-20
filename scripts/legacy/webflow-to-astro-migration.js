import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Papa from 'papaparse';
import { NodeHtmlMarkdown } from 'node-html-markdown';
import he from 'he';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class WebflowToAstroMigration {
  constructor() {
    // Configure NodeHtmlMarkdown with better spacing and formatting
    this.nhm = new NodeHtmlMarkdown({
      // Use ATX style headers (### instead of underlines)
      useInlineLinks: true,
      useLinkReferenceDefinitions: false,
      useInlineImages: true,
      
      // Better list handling
      bulletMarker: '-',
      codeBlockStyle: 'fenced',
      
      // Preserve line breaks and spacing - CRITICAL for header separation
      preserveNewlines: true,
      
      // Better handling of whitespace
      collapseWhitespace: false, // Don't collapse whitespace to preserve structure
      
      // Custom overrides for better formatting with proper spacing
      overrides: {
        h1: (content, node) => `\n\n# ${content.trim()}\n\n`,
        h2: (content, node) => `\n\n## ${content.trim()}\n\n`,
        h3: (content, node) => `\n\n### ${content.trim()}\n\n`,
        h4: (content, node) => `\n\n#### ${content.trim()}\n\n`,
        h5: (content, node) => `\n\n##### ${content.trim()}\n\n`,
        h6: (content, node) => `\n\n###### ${content.trim()}\n\n`,
        p: (content, node) => `\n${content.trim()}\n`,
        div: (content, node) => `\n${content}\n`,
      }
    });
  }

  parseDate(dateString) {
    if (!dateString) return new Date();
    
    try {
      // Remove timezone information and parse
      const cleanDateString = dateString.replace(/\s*\([^)]*\)$/, '').trim();
      const date = new Date(cleanDateString);
      
      if (isNaN(date.getTime())) {
        console.warn(`Invalid date: ${dateString}, using current date`);
        return new Date();
      }
      
      return date;
    } catch (error) {
      console.warn(`Error parsing date: ${dateString}, using current date`);
      return new Date();
    }
  }



  convertHtmlToMarkdown(html) {
    if (!html) return '';
    
    // Step 1: Decode HTML entities
    html = he.decode(html);
    
    // Step 2: Basic cleanup
    html = html.replace(/<br\s*\/?>/gi, '\n');
    html = html.replace(/&nbsp;/g, ' ');
    
    // Step 3: Convert to markdown using NodeHtmlMarkdown (HTML should already be cleaned)
    let markdown = this.nhm.translate(html);
    
    // Step 4: Comprehensive post-processing (includes systematic header detection)
    markdown = this.postProcessMarkdown(markdown);
    
    return markdown;
  }

  postProcessMarkdown(markdown) {
    // Light cleanup - most work should be done in HTML repair
    markdown = markdown.replace(/&amp;/g, '&');
    markdown = markdown.replace(/&nbsp;/g, ' ');
    markdown = markdown.replace(/&lt;/g, '<');
    markdown = markdown.replace(/&gt;/g, '>');
    markdown = markdown.replace(/&quot;/g, '"');
    
    // SYSTEMATIC HEADER DETECTION: Handle text that should be headers but got merged during conversion
    const lines = markdown.split('\n');
    const processedLines = [];
    
    // Define systematic patterns for headers
    const headerPatterns = [
      // Questions that should be headers
      /^(Ready to [^?]+\?)/,
      /^(What (?:is|are|to|Sets) [^?]+\?)/,
      /^(How (?:to|It|does) [^?]+\?)/,
      /^(Why (?:It|This|do) [^?]+\?)/,
      
      // Title-like sentences (ending with key words)
      /^([A-Z][^.]*(?:Example|Benefits?|Practices?|Guide|Overview|Summary|Pipeline|Workflow|Analysis|Strategy|Solution|Approach|Method|Process|Tips?|Steps?|Requirements?|Objectives?|Goals?|Outcomes?|Results?|Insights?|Recommendations?|Growth|Success|Transformation|Innovation|Automation|Personalization|Optimization))$/,
      
      // Merged title patterns
      /^([A-Z][^A-Z]*[A-Z][^a-z]*?)([A-Z][a-z].{30,})/
    ];
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      
      // Skip if already a header
      if (line.startsWith('#')) {
        processedLines.push(line);
        continue;
      }
      
      // SPECIFIC FIX: "Why AI-Driven Proposal Generation Is a Gamechanger for AdvisorsFinancial advisors"
      if (line.includes('AdvisorsFinancial advisors')) {
        const parts = line.split('AdvisorsFinancial advisors');
        if (parts.length === 2) {
          processedLines.push(`## ${parts[0].trim()}Advisors`);
          processedLines.push('');
          processedLines.push(`Financial advisors${parts[1].trim()}`);
          continue;
        }
      }
      
      // Pattern 1: "Title1. **Content" or "TitleFinancial advisors" - title merged with numbered content or text
      let match = line.match(/^([A-Z][^0-9]*?)(\d+\.\s*\*\*.+)/);
      if (match) {
        const titleText = match[1].trim().replace(/[:\-–]\s*$/, ''); // Remove trailing colon or dash
        const contentText = match[2].trim();
        
        if (titleText.length > 5 && titleText.length < 120) { // More flexible length
          processedLines.push(`## ${titleText}`);
          processedLines.push('');
          processedLines.push(contentText);
          continue;
        }
      }
      
      // Pattern 1b: "TitleFinancial advisors" or "TitlePersonalized investment" - title merged with sentence
      match = line.match(/^([A-Z][^A-Z]*?)([A-Z][a-z][^.]*(?:\.|$))/);
      if (match && line.length > 50 && !line.startsWith('**')) {
        const titleText = match[1].trim();
        const contentText = match[2].trim();
        
        // Only apply if title looks like a real header (has multiple words, no periods)
        if (titleText.length > 15 && titleText.length < 100 && !titleText.includes('.') && titleText.split(' ').length >= 3) {
          processedLines.push(`## ${titleText}`);
          processedLines.push('');
          processedLines.push(contentText);
          continue;
        }
      }
      
      // Pattern 2: "Title- **Content" or "Title- Content" - title merged with dash content
      match = line.match(/^([A-Z][^-]{10,120})[-–]\s*(.+)/);
      if (match) {
        const titleText = match[1].trim();
        const contentText = match[2].trim();
        

        
        processedLines.push(`## ${titleText}`);
        processedLines.push('');
        if (contentText.startsWith('**')) {
          processedLines.push(contentText);
        } else {
          processedLines.push(contentText);
        }
        continue;
      }
      
      // Pattern 2b: Handle empty numbered sections like "2." or "6." on their own line
      if (line.match(/^\d+\.\s*$/) && i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        if (nextLine && nextLine.trim() && !nextLine.startsWith('#')) {
          // Look for the actual header content in the next line or nearby lines
          let headerContent = '';
          let contentStart = i + 1;
          
          // Check if next line looks like header content
          if (nextLine.match(/^[A-Z][^-]*[-–]\s*(.+)/)) {
            const headerMatch = nextLine.match(/^([A-Z][^-]*)[-–]\s*(.+)/);
            if (headerMatch) {
              headerContent = headerMatch[1].trim();
              const restContent = headerMatch[2].trim();
              

              
              processedLines.push(`### ${line.trim()} ${headerContent}`);
              processedLines.push('');
              processedLines.push(restContent.startsWith('**') ? restContent : restContent);
              i++; // Skip the next line
              continue;
            }
          }
        }
      }
      
      // Pattern 3: "TitleSome content that starts with capital" - title merged with content
      match = line.match(/^([A-Z][^A-Z]{10,100})([A-Z][a-z].{15,})/);
      if (match && line.length > 50) {
        const titleText = match[1].trim();
        const contentText = match[2].trim();
        
        // Only apply if it looks like a real title/content split
        if (!titleText.includes('.') && !titleText.includes(',') && titleText.split(' ').length >= 3) {
          processedLines.push(`## ${titleText}`);
          processedLines.push('');
          processedLines.push(contentText);
          continue;
        }
      }
      
      // Pattern 4: Handle incomplete numbered sections like "4. AI-" that need to be combined with next line
      if (line.match(/^\d+\.\s+[A-Z][^-]*[-–]\s*$/) && i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        if (nextLine && nextLine.trim() && !nextLine.startsWith('#')) {
          
          processedLines.push(`### ${line.trim()}${nextLine.trim()}`);
          i++; // Skip the next line
          continue;
        }
      }
      
      processedLines.push(line);
    }
    
    // Clean up extra whitespace
    const finalMarkdown = processedLines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
    
    return finalMarkdown;
  }

  generateSlug(title) {
    const MAX_SLUG_LENGTH = 150;
    let slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    if (slug.length > MAX_SLUG_LENGTH) {
      slug = slug.substring(0, MAX_SLUG_LENGTH).replace(/-[^-]*$/, '');
    }
    
    return slug;
  }

  generateFrontmatter(post) {
    const publishedDate = this.parseDate(post['Published On']);
    const updatedDate = post['Updated On'] ? this.parseDate(post['Updated On']) : publishedDate;
    
    const frontmatter = {
      title: post['Name'] || 'Untitled',
      excerpt: post['Summary'] || '',
      author: post['Author'] || 'Investipal',
      publishedDate: publishedDate.toISOString().split('T')[0],
      updatedDate: updatedDate.toISOString().split('T')[0],
      category: post['Category'] || 'General',
      tags: [],
      slug: this.generateSlug(post['Name'] || 'untitled'),
      featuredImage: post['Main Image'] || '',
      draft: false
    };

    // Generate YAML frontmatter
    let yaml = '---\n';
    for (const [key, value] of Object.entries(frontmatter)) {
      if (key === 'tags' && Array.isArray(value)) {
        yaml += `${key}: []\n`;
      } else if (key === 'publishedDate' || key === 'updatedDate') {
        yaml += `${key}: ${value}\n`;
      } else {
        yaml += `${key}: "${value}"\n`;
      }
    }
    yaml += '---\n\n';
    
    return yaml;
  }

  async migratePosts(csvFilePath, isPilot = false) {
    try {
      console.log(`🚀 Starting ${isPilot ? 'PILOT' : 'FULL'} migration from cleaned CSV...`);
      
      // Use cleaned CSV file
      const cleanedCsvPath = isPilot ? 
        csvFilePath.replace('.csv', ' - CLEANED-PILOT.csv') :
        csvFilePath.replace('.csv', ' - CLEANED.csv');
      
      if (!fs.existsSync(cleanedCsvPath)) {
        console.error(`❌ Cleaned CSV not found: ${cleanedCsvPath}`);
        console.log('💡 Run the CSV preprocessor first: node scripts/csv-preprocessor.js --pilot');
        process.exit(1);
      }
      
      // Read and parse cleaned CSV
      const csvContent = fs.readFileSync(cleanedCsvPath, 'utf-8');
      const parseResult = Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
        trimHeaders: true,
        transform: (value) => value.trim()
      });
      
      if (parseResult.errors.length > 0) {
        console.warn('CSV parsing warnings:', parseResult.errors);
      }
      
      const posts = parseResult.data;

      console.log(`📊 Total posts in CSV: ${posts.length}`);

      // Filter for published posts only
      const publishedPosts = posts.filter(post => 
        post['Archived'] === 'false' && 
        post['Draft'] === 'false' &&
        post['Name'] &&
        post['Name'].trim() !== ''
      );

      console.log(`✅ Published posts found: ${publishedPosts.length}`);
      
      if (publishedPosts.length === 0) {
        console.log('⚠️  No published posts found. Checking first few posts...');
        posts.slice(0, 3).forEach((post, i) => {
          console.log(`Post ${i + 1}:`, {
            Name: post['Name'],
            Archived: post['Archived'],
            Draft: post['Draft']
          });
        });
      }

      // For pilot, take only first 3 posts
      const postsToMigrate = isPilot ? publishedPosts.slice(0, 3) : publishedPosts;
      console.log(`🎯 Posts to migrate: ${postsToMigrate.length}`);

      // Ensure output directory exists
      const outputDir = path.join(__dirname, '../src/content/blog');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      let successCount = 0;
      let errorCount = 0;

      for (const post of postsToMigrate) {
        try {
          console.log(`\n📝 Processing: ${post['Name']}`);
          
          const slug = this.generateSlug(post['Name']);
          const filename = `${slug}.md`;
          const filepath = path.join(outputDir, filename);

          // Generate frontmatter
          const frontmatter = this.generateFrontmatter(post);

          // Convert content
          const content = this.convertHtmlToMarkdown(post['Details'] || '');

          // Combine frontmatter and content
          const fullContent = frontmatter + content;

          // Write file
          fs.writeFileSync(filepath, fullContent, 'utf-8');
          
          console.log(`✅ Migrated: ${post['Name']}`);
          successCount++;

        } catch (error) {
          console.error(`❌ Error migrating "${post['Name']}":`, error.message);
          errorCount++;
        }
      }

      console.log(`\n🎉 Migration complete!`);
      console.log(`✅ Successfully migrated: ${successCount} posts`);
      if (errorCount > 0) {
        console.log(`❌ Errors: ${errorCount} posts`);
      }

    } catch (error) {
      console.error('❌ Migration failed:', error);
      throw error;
    }
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting migration script...');
  
  const isPilot = process.argv.includes('--pilot');
  const csvFilePath = path.join(__dirname, '../../Wealth Mgmt Site - Blog Posts.csv');
  
  console.log(`📁 Looking for CSV at: ${csvFilePath}`);
  
  if (!fs.existsSync(csvFilePath)) {
    console.error(`❌ CSV file not found: ${csvFilePath}`);
    process.exit(1);
  }

  const migrator = new WebflowToAstroMigration();
  await migrator.migratePosts(csvFilePath, isPilot);
}

// Run if called directly
try {
  await main();
} catch (error) {
  console.error('❌ Script failed:', error);
  process.exit(1);
}