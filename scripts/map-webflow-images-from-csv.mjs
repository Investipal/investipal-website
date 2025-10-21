#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse CSV manually with better handling of multiline content
function parseCSV(csvContent) {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',');
  const data = [];
  
  console.log(`📋 CSV Headers: ${headers.slice(0, 5).join(', ')}...`);
  
  let i = 1;
  while (i < lines.length) {
    if (!lines[i].trim()) {
      i++;
      continue;
    }
    
    // Handle CSV parsing with quoted fields containing commas and newlines
    const values = [];
    let current = '';
    let inQuotes = false;
    let lineContent = lines[i];
    
    // Handle multiline fields (content spanning multiple lines)
    while (i < lines.length) {
      for (let j = 0; j < lineContent.length; j++) {
        const char = lineContent[j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim().replace(/^"|"$/g, '')); // Remove surrounding quotes
          current = '';
        } else {
          current += char;
        }
      }
      
      // If we're still in quotes, this field continues on the next line
      if (inQuotes && i + 1 < lines.length) {
        current += '\n';
        i++;
        lineContent = lines[i];
      } else {
        break;
      }
    }
    
    values.push(current.trim().replace(/^"|"$/g, '')); // Add the last value and remove quotes
    
    if (values.length >= 2) { // At least Name and Slug
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      
      // Only add rows that have a valid slug
      if (row.Slug && row.Slug.trim()) {
        data.push(row);
      }
    }
    
    i++;
  }
  
  return data;
}

async function mapWebflowImages() {
  console.log('🔍 Reading Webflow CSV export...');
  
  // Read the CSV file
  const csvPath = path.join(__dirname, '..', 'Wealth Mgmt Site - Blog Posts (2).csv');
  if (!fs.existsSync(csvPath)) {
    console.error('❌ CSV file not found:', csvPath);
    return;
  }
  
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const webflowPosts = parseCSV(csvContent);
  
  console.log(`📊 Found ${webflowPosts.length} posts in Webflow CSV`);
  
  // Show first few slugs for debugging
  console.log('🔍 First 5 Webflow slugs:', webflowPosts.slice(0, 5).map(p => p.Slug));
  
  // Read all blog post files
  const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
  const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
  
  console.log(`📝 Found ${blogFiles.length} blog post files`);
  console.log('🔍 First 5 blog files:', blogFiles.slice(0, 5).map(f => f.replace('.md', '')));
  
  let updated = 0;
  let matched = 0;
  let errors = 0;
  
  for (const file of blogFiles) {
    try {
      const slug = file.replace('.md', '');
      const filePath = path.join(blogDir, file);
      
      // Find matching Webflow post by slug
      const webflowPost = webflowPosts.find(post => post.Slug === slug);
      
      if (webflowPost) {
        matched++;
        
        // Get the main image URL (prefer Main Image over Thumb Image)
        const mainImage = webflowPost['Main Image'] || webflowPost['Thumb Image'];
        
        if (mainImage && mainImage.startsWith('https://')) {
          // Read the current blog post
          const content = fs.readFileSync(filePath, 'utf-8');
          
          // Extract frontmatter (handle different formats)
          const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
          if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1];
            const body = content.slice(frontmatterMatch[0].length);
            
            // Update featuredImage in frontmatter
            let updatedFrontmatter = frontmatter;
            let wasUpdated = false;
            
            if (frontmatter.includes('featuredImage:')) {
              // Replace existing featuredImage
              const oldFrontmatter = updatedFrontmatter;
              updatedFrontmatter = frontmatter.replace(
                /featuredImage:\s*["']?[^"'\n\r]*["']?/,
                `featuredImage: "${mainImage}"`
              );
              wasUpdated = oldFrontmatter !== updatedFrontmatter;
            } else {
              // Add featuredImage after title
              const oldFrontmatter = updatedFrontmatter;
              updatedFrontmatter = frontmatter.replace(
                /(title:\s*["']?[^"'\n\r]*["']?\r?\n)/,
                `$1featuredImage: "${mainImage}"\n`
              );
              wasUpdated = oldFrontmatter !== updatedFrontmatter;
            }
            
            // Only write if something actually changed
            if (wasUpdated) {
              // Write updated content
              const updatedContent = `---\n${updatedFrontmatter}\n---${body}`;
              fs.writeFileSync(filePath, updatedContent);
              
              updated++;
              console.log(`✅ Updated ${slug} with image: ${mainImage.substring(0, 60)}...`);
            } else {
              console.log(`⏭️  Skipped ${slug} (already has same image)`);
            }
          } else {
            console.warn(`⚠️  No frontmatter found in ${file}`);
          }
        } else {
          console.warn(`⚠️  No valid image URL for ${slug}`);
        }
      } else {
        console.log(`❓ No Webflow match found for slug: ${slug}`);
      }
    } catch (error) {
      errors++;
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }
  
  console.log('\n📈 Summary:');
  console.log(`   Matched posts: ${matched}`);
  console.log(`   Updated posts: ${updated}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Total blog files: ${blogFiles.length}`);
  
  if (updated > 0) {
    console.log('\n🎉 Successfully mapped Webflow images to blog posts!');
    console.log('💡 The images are now pointing to the original Webflow CDN URLs.');
  }
}

mapWebflowImages().catch(console.error);
