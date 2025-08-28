#!/usr/bin/env node

/**
 * PILOT MIGRATION: 3 Blog Posts
 * 
 * This script migrates exactly 3 published blog posts from Webflow CSV to Astro
 * following the exact same process we'll use for the full batch migration.
 * 
 * VALIDATION APPROACH:
 * 1. Parse CSV and identify published posts
 * 2. Select first 3 high-quality posts
 * 3. Convert HTML to Markdown with full validation
 * 4. Generate proper Astro frontmatter
 * 5. Create files with safe naming
 * 6. Validate results before proceeding
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CSV_FILE_PATH = path.join(__dirname, '../../Wealth Mgmt Site - Blog Posts.csv');
const OUTPUT_DIR = path.join(__dirname, '../src/content/blog');
const PILOT_COUNT = 3;

console.log('🚀 PILOT MIGRATION: 3 Blog Posts\n');

/**
 * Parse CSV file safely
 */
function parseCSV(filePath) {
  console.log('📄 Reading CSV file...');
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`CSV file not found: ${filePath}`);
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n').filter(line => line.trim());
  
  if (lines.length < 2) {
    throw new Error('CSV file appears to be empty or invalid');
  }
  
  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
  console.log(`📊 Found ${headers.length} columns: ${headers.slice(0, 5).join(', ')}...`);
  
  const posts = [];
  
  for (let i = 1; i < lines.length; i++) {
    try {
      // Handle CSV parsing more carefully for complex content
      const line = lines[i];
      const columns = [];
      let current = '';
      let inQuotes = false;
      
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          columns.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      columns.push(current.trim()); // Add the last column
      
      // Create post object
      const post = {};
      headers.forEach((header, index) => {
        post[header] = columns[index] || '';
      });
      
      posts.push(post);
    } catch (error) {
      console.warn(`⚠️ Skipping malformed row ${i}: ${error.message}`);
    }
  }
  
  console.log(`✅ Parsed ${posts.length} total posts\n`);
  return posts;
}

/**
 * Filter for published posts only
 */
function getPublishedPosts(posts) {
  console.log('🔍 Filtering for published posts...');
  
  const published = posts.filter(post => 
    post.Archived === 'false' && 
    post.Draft === 'false' &&
    post.Name &&
    post.Details &&
    post.Details.length > 100 // Ensure substantial content
  );
  
  console.log(`📝 Found ${published.length} published posts with content`);
  
  // Sort by content quality (length and completeness)
  published.sort((a, b) => {
    const scoreA = (a.Details?.length || 0) + (a['Short Info']?.length || 0) * 2;
    const scoreB = (b.Details?.length || 0) + (b['Short Info']?.length || 0) * 2;
    return scoreB - scoreA;
  });
  
  return published;
}

/**
 * Convert HTML to clean Markdown
 */
function htmlToMarkdown(html) {
  if (!html) return '';
  
  let markdown = html;
  
  // Remove quotes that wrap the entire content
  markdown = markdown.replace(/^"(.*)"$/s, '$1');
  
  // Convert headers
  markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1');
  markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1');
  markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1');
  markdown = markdown.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1');
  markdown = markdown.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1');
  markdown = markdown.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1');
  
  // Convert paragraphs
  markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
  
  // Convert bold and italic
  markdown = markdown.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
  markdown = markdown.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
  markdown = markdown.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
  markdown = markdown.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
  
  // Convert links
  markdown = markdown.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');
  
  // Convert images
  markdown = markdown.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, '![$2]($1)');
  markdown = markdown.replace(/<img[^>]*src="([^"]*)"[^>]*>/gi, '![]($1)');
  
  // Convert lists
  markdown = markdown.replace(/<ul[^>]*>(.*?)<\/ul>/gis, (match, content) => {
    return content.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1') + '\n';
  });
  
  markdown = markdown.replace(/<ol[^>]*>(.*?)<\/ol>/gis, (match, content) => {
    let counter = 1;
    return content.replace(/<li[^>]*>(.*?)<\/li>/gi, () => `${counter++}. $1`) + '\n';
  });
  
  // Convert line breaks
  markdown = markdown.replace(/<br\s*\/?>/gi, '\n');
  
  // Remove remaining HTML tags
  markdown = markdown.replace(/<[^>]*>/g, '');
  
  // Clean up whitespace
  markdown = markdown.replace(/\n{3,}/g, '\n\n');
  markdown = markdown.trim();
  
  return markdown;
}

/**
 * Generate safe filename from title
 */
function generateSafeFilename(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove multiple hyphens
    .substring(0, 50) // Limit length for Windows
    .replace(/-$/, ''); // Remove trailing hyphen
}

/**
 * Parse date safely
 */
function parseDate(dateStr) {
  if (!dateStr || dateStr.trim() === '') return new Date();
  
  try {
    const cleanDateStr = dateStr.replace(/"/g, '').trim();
    const date = new Date(cleanDateStr);
    return isNaN(date.getTime()) ? new Date() : date;
  } catch (error) {
    console.warn(`⚠️ Could not parse date: ${dateStr}`);
    return new Date();
  }
}

/**
 * Create Astro markdown file
 */
function createMarkdownFile(post, outputDir) {
  const title = post.Name?.replace(/"/g, '') || 'Untitled';
  const slug = post.Slug?.replace(/"/g, '') || generateSafeFilename(title);
  const filename = `${slug}.md`;
  const filepath = path.join(outputDir, filename);
  
  console.log(`📝 Creating: ${filename}`);
  
  // Parse dates
  const publishedDate = parseDate(post['Published On']);
  const updatedDate = parseDate(post['Updated On']);
  
  // Convert content
  const content = htmlToMarkdown(post.Details || '');
  const excerpt = post['Short Info']?.replace(/"/g, '') || '';
  const category = post.Tag?.replace(/"/g, '') || 'General';
  const author = post['Author Name']?.replace(/"/g, '') || 'Investipal Team';
  
  // Handle images
  const thumbImage = post['Thumb Image']?.replace(/"/g, '') || '';
  const mainImage = post['Main Image']?.replace(/"/g, '') || '';
  const featuredImage = mainImage || thumbImage;
  
  // Create frontmatter
  const frontmatter = {
    title,
    excerpt,
    author,
    publishedDate: publishedDate.toISOString().split('T')[0],
    updatedDate: updatedDate.toISOString().split('T')[0],
    category,
    tags: [category],
    draft: false,
    slug,
    ...(featuredImage && { featuredImage })
  };
  
  // Generate markdown file content
  let markdown = '---\n';
  
  Object.entries(frontmatter).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      markdown += `${key}: [${value.map(v => `"${v}"`).join(', ')}]\n`;
    } else if (key === 'publishedDate' || key === 'updatedDate') {
      markdown += `${key}: ${value}\n`;
    } else if (typeof value === 'string') {
      markdown += `${key}: "${value}"\n`;
    } else {
      markdown += `${key}: ${value}\n`;
    }
  });
  
  markdown += '---\n\n';
  markdown += content;
  
  // Write file
  fs.writeFileSync(filepath, markdown, 'utf8');
  
  return {
    filename,
    title,
    contentLength: content.length,
    hasImage: !!featuredImage,
    category
  };
}

/**
 * Main migration function
 */
async function runPilotMigration() {
  try {
    console.log('🎯 Starting pilot migration...\n');
    
    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    
    // Parse CSV
    const allPosts = parseCSV(CSV_FILE_PATH);
    
    // Filter published posts
    const publishedPosts = getPublishedPosts(allPosts);
    
    if (publishedPosts.length === 0) {
      throw new Error('No published posts found in CSV');
    }
    
    // Select pilot posts
    const pilotPosts = publishedPosts.slice(0, PILOT_COUNT);
    console.log(`\n🎯 Selected ${pilotPosts.length} posts for pilot migration:\n`);
    
    pilotPosts.forEach((post, idx) => {
      console.log(`${idx + 1}. "${post.Name?.replace(/"/g, '')}"`);
      console.log(`   Content: ${post.Details?.length || 0} chars`);
      console.log(`   Category: ${post.Tag?.replace(/"/g, '')}`);
      console.log('');
    });
    
    // Migrate posts
    console.log('🚀 Starting migration...\n');
    const results = [];
    
    for (const post of pilotPosts) {
      try {
        const result = createMarkdownFile(post, OUTPUT_DIR);
        results.push(result);
        console.log(`✅ Success: ${result.filename} (${result.contentLength} chars)`);
      } catch (error) {
        console.error(`❌ Failed: ${post.Name} - ${error.message}`);
      }
    }
    
    // Summary
    console.log('\n🎉 PILOT MIGRATION COMPLETE!\n');
    console.log('📊 RESULTS:');
    console.log(`✅ Successfully migrated: ${results.length}/${pilotPosts.length} posts`);
    console.log(`📁 Output directory: ${OUTPUT_DIR}`);
    
    if (results.length > 0) {
      console.log('\n📝 MIGRATED POSTS:');
      results.forEach((result, idx) => {
        console.log(`${idx + 1}. ${result.filename}`);
        console.log(`   Title: ${result.title}`);
        console.log(`   Content: ${result.contentLength} chars`);
        console.log(`   Category: ${result.category}`);
        console.log(`   Image: ${result.hasImage ? 'Yes' : 'No'}`);
        console.log('');
      });
      
      console.log('🔍 NEXT STEPS:');
      console.log('1. Review the migrated files for quality');
      console.log('2. Test the Astro dev server');
      console.log('3. Validate content formatting');
      console.log('4. If successful, proceed with full batch migration');
    }
    
  } catch (error) {
    console.error('💥 Pilot migration failed:', error.message);
    process.exit(1);
  }
}

// Run the migration
runPilotMigration();




