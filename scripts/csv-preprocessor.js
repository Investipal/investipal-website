import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Papa from 'papaparse';
import * as cheerio from 'cheerio';
import he from 'he';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CSVPreprocessor {
  constructor() {
    console.log('🧹 CSV Preprocessor initialized');
  }

  cleanHtmlContent(html) {
    if (!html) return '';
    
    // Decode HTML entities first
    html = he.decode(html);
    
    // Load into cheerio for DOM manipulation
    const $ = cheerio.load(html, { 
      decodeEntities: true,
      normalizeWhitespace: true 
    });
    
    console.log('🔍 Processing HTML content...');
    
    // PATTERN 1: Fix headers with merged content like "1. Title- **Content..." or "TitleContent"
    $('h1, h2, h3, h4, h5, h6').each((i, element) => {
      const $el = $(element);
      const text = $el.text().trim();
      
      // Sub-pattern 1a: "1. Title- **Content..." or "Title- **Content..."
      let match = text.match(/^(.+?)(?:\s*[&:]\s*[^-]*)?[-–]\s*(.+)/);
      if (match) {
        const headerText = match[1].trim();
        const contentText = match[2].replace(/^\*\*|\*\*$/g, '').trim();
        
        console.log(`  ✅ Fixed header with dash: "${headerText}"`);
        
        // Clean the header
        $el.text(headerText);
        
        // Add content as separate paragraph
        if (contentText) {
          $el.after(`<p><strong>${contentText}</strong></p>`);
        }
        return; // Skip other patterns for this element
      }
      
      // Sub-pattern 1b: "Title1. Content" or "TitleContent starts here"
      match = text.match(/^([A-Z][^0-9]*?)(\d+\.\s*.+)/);
      if (match) {
        const headerText = match[1].trim();
        const contentText = match[2].trim();
        
        console.log(`  ✅ Fixed header with merged number: "${headerText}"`);
        
        // Clean the header
        $el.text(headerText);
        
        // Add content as separate paragraph
        $el.after(`<p><strong>${contentText}</strong></p>`);
        return; // Skip other patterns for this element
      }
      
      // Sub-pattern 1c: "TitleSome content that starts with capital"
      match = text.match(/^([A-Z][^A-Z]*?)([A-Z][a-z].{20,})/);
      if (match && text.length > 50) {
        const headerText = match[1].trim();
        const contentText = match[2].trim();
        
        // Only apply if it looks like a real header/content split
        if (headerText.length > 10 && headerText.length < 100 && !headerText.includes('.')) {
          console.log(`  ✅ Fixed merged header/content: "${headerText}"`);
          
          // Clean the header
          $el.text(headerText);
          
          // Add content as separate paragraph
          $el.after(`<p>${contentText}</p>`);
        }
      }
    });
    
    // PATTERN 2: Fix paragraphs that should be headers like "Portfolio Analysis- **Content..."
    $('p').each((i, element) => {
      const $el = $(element);
      const text = $el.text().trim();
      
      // Match patterns like "Instant Portfolio X-Ray & Gap Analysis- **Concentration..."
      const match = text.match(/^([A-Z][^-]{10,80})[-–]\s*\*\*(.+)/);
      if (match && text.length < 300) { // Only reasonably short paragraphs
        const headerText = match[1].trim();
        const contentText = match[2].replace(/^\*\*|\*\*$/g, '').trim();
        
        console.log(`  ✅ Converted to header: "${headerText}"`);
        
        // Replace with header + content
        $el.replaceWith(`<h3>${headerText}</h3><p><strong>${contentText}</strong></p>`);
      }
    });
    
    // PATTERN 3: Fix empty numbered headers followed by content
    $('h1, h2, h3, h4, h5, h6').each((i, element) => {
      const $el = $(element);
      const text = $el.text().trim();
      
      // Match patterns like "2." (just a number)
      if (text.match(/^\d+\.\s*$/)) {
        let $next = $el.next();
        
        // Skip empty elements
        while ($next.length && $next.text().trim() === '') {
          $next = $next.next();
        }
        
        if ($next.length) {
          const nextText = $next.text().trim();
          // Check if it looks like header content
          const match = nextText.match(/^([A-Z][^-]{10,80})[-–]\s*(.+)/);
          if (match) {
            const headerText = match[1].trim();
            const contentText = match[2].replace(/^\*\*|\*\*$/g, '').trim();
            
            console.log(`  ✅ Combined empty header: "${text} ${headerText}"`);
            
            // Update header
            $el.text(`${text} ${headerText}`);
            
            // Update content
            if (contentText.startsWith('**')) {
              $next.html(`<strong>${contentText}</strong>`);
            } else {
              $next.html(`<strong>${contentText}</strong>`);
            }
          }
        }
      }
    });
    
    // PATTERN 4: Fix split headers like "4. AI-" followed by "Driven Portfolio..."
    $('h1, h2, h3, h4, h5, h6').each((i, element) => {
      const $el = $(element);
      const text = $el.text().trim();
      
      // Match incomplete numbered sections
      if (text.match(/^\d+\.\s+[A-Z][^-]*[-–]\s*$/)) {
        const $next = $el.next();
        if ($next.length && $next.is('h1, h2, h3, h4, h5, h6')) {
          const nextText = $next.text().trim();
          
          console.log(`  ✅ Merged split header: "${text}" + "${nextText}"`);
          
          // Combine headers
          $el.text(text.replace(/[-–]\s*$/, '') + nextText);
          $next.remove();
        }
      }
    });
    
    return $.html();
  }

  async preprocessCSV(inputPath, outputPath, isPilot = false) {
    try {
      console.log(`\n🚀 Starting CSV preprocessing...`);
      console.log(`📁 Input: ${inputPath}`);
      console.log(`📁 Output: ${outputPath}`);
      
      // Read original CSV
      const csvContent = fs.readFileSync(inputPath, 'utf-8');
      const parseResult = Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
        trimHeaders: true,
        transform: (value) => value.trim()
      });
      
      if (parseResult.errors.length > 0) {
        console.warn('⚠️  CSV parsing warnings:', parseResult.errors);
      }
      
      const posts = parseResult.data;
      console.log(`📊 Total posts in CSV: ${posts.length}`);
      
      // Filter for published posts
      const publishedPosts = posts.filter(post => 
        post['Archived'] === 'false' && 
        post['Draft'] === 'false' &&
        post['Name'] &&
        post['Name'].trim() !== ''
      );
      
      console.log(`✅ Published posts found: ${publishedPosts.length}`);
      
      // For pilot, take only first 3 posts
      const postsToProcess = isPilot ? publishedPosts.slice(0, 3) : publishedPosts;
      console.log(`🎯 Posts to process: ${postsToProcess.length}`);
      
      // Process each post
      const cleanedPosts = postsToProcess.map((post, index) => {
        console.log(`\n📝 Processing post ${index + 1}/${postsToProcess.length}: "${post['Name']}"`);
        
        const cleanedPost = { ...post };
        
        // Clean the HTML content in 'Details' field
        if (post['Details']) {
          cleanedPost['Details'] = this.cleanHtmlContent(post['Details']);
        }
        
        return cleanedPost;
      });
      
      // Convert back to CSV
      const cleanedCSV = Papa.unparse(cleanedPosts, {
        header: true,
        quotes: true
      });
      
      // Write cleaned CSV
      fs.writeFileSync(outputPath, cleanedCSV, 'utf-8');
      
      console.log(`\n🎉 CSV preprocessing complete!`);
      console.log(`✅ Processed ${cleanedPosts.length} posts`);
      console.log(`📁 Cleaned CSV saved to: ${outputPath}`);
      
      return outputPath;
      
    } catch (error) {
      console.error('❌ CSV preprocessing failed:', error);
      throw error;
    }
  }
}

// Main execution
async function main() {
  const isPilot = process.argv.includes('--pilot');
  const inputPath = path.join(__dirname, '../../Wealth Mgmt Site - Blog Posts.csv');
  const outputPath = path.join(__dirname, isPilot ? 
    '../../Wealth Mgmt Site - Blog Posts - CLEANED-PILOT.csv' : 
    '../../Wealth Mgmt Site - Blog Posts - CLEANED.csv'
  );
  
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Input CSV file not found: ${inputPath}`);
    process.exit(1);
  }

  const preprocessor = new CSVPreprocessor();
  await preprocessor.preprocessCSV(inputPath, outputPath, isPilot);
}

// Run if called directly
try {
  await main();
} catch (error) {
  console.error('Script failed:', error);
  process.exit(1);
}

export default CSVPreprocessor;
