#!/usr/bin/env node
/**
 * Meta Description Generator for Blog Posts
 * 
 * Simplified approach:
 * 1. Check if metaDescription already exists
 * 2. Extract title using simple regex
 * 3. Generate meta description from title
 * 4. Insert after excerpt line
 * 
 * Usage:
 *   node scripts/add-meta-descriptions.js --dry-run    # Preview changes
 *   node scripts/add-meta-descriptions.js              # Apply changes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BLOG_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');
const DRY_RUN = process.argv.includes('--dry-run');
const MAX_META_LENGTH = 155;

/**
 * Clean topic from title
 */
function cleanTopic(title) {
  return title
    .replace(/^(How to |The |A |An |Why |What is |Understanding |Best |Top \d+ )/gi, '')
    .replace(/( for Financial Advisors| for RIAs| for Wealth Managers| in \d{4}| — .*)/gi, '')
    .replace(/[:–—]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 40)
    .replace(/\s+\S*$/, '')
    .toLowerCase();
}

/**
 * Categorize based on title keywords
 */
function categorize(title) {
  const t = title.toLowerCase();
  
  if (t.includes('automat') || t.includes('streamlin') || t.includes('workflow')) return 'automation';
  if (t.includes(' ai ') || t.includes('ai-') || t.includes('machine learning') || t.includes('artificial')) return 'ai';
  if (t.includes('compliance') || t.includes('reg bi') || t.includes('ips') || t.includes('aml') || t.includes('kyc')) return 'compliance';
  if (t.includes('onboard') || t.includes('ocr') || t.includes('statement scan') || t.includes('data extract')) return 'onboarding';
  if (t.includes('risk') || t.includes('drift') || t.includes('rebalanc')) return 'risk';
  if (t.includes('proposal') || t.includes('sales') || t.includes('lead') || t.includes('client acqui')) return 'sales';
  if (t.includes('software') || t.includes('platform') || t.includes('tool') || t.includes('comparison') || t.includes('vs')) return 'software';
  if (t.includes('portfolio') || t.includes('allocation') || t.includes('optimization')) return 'portfolio';
  
  return 'general';
}

/**
 * Generate meta description based on title
 */
function generateMeta(title) {
  const topic = cleanTopic(title);
  const cat = categorize(title);
  
  const templates = {
    automation: `Automate ${topic}. Save hours weekly with step-by-step guide for financial advisors.`,
    ai: `AI-powered ${topic} for advisors. Practical implementation guide with real examples.`,
    compliance: `${topic.charAt(0).toUpperCase() + topic.slice(1)} compliance guide. Automated documentation & audit trails for RIAs.`,
    onboarding: `Speed up ${topic}. Process in minutes instead of days. Practical guide for advisors.`,
    risk: `Manage ${topic} effectively. Automated monitoring, alerts & best practices for advisors.`,
    sales: `Boost conversion with ${topic}. Templates, automation & strategies for advisors.`,
    software: `Compare ${topic} solutions. Features, pricing & expert recommendations for advisors.`,
    portfolio: `Optimize ${topic}. Data-driven strategies & automation for wealth managers.`,
    general: `Learn ${topic}. Practical insights & best practices for financial advisors.`
  };
  
  let meta = templates[cat];
  
  // Ensure length
  if (meta.length > MAX_META_LENGTH) {
    meta = meta.substring(0, MAX_META_LENGTH - 3).replace(/\s+\S*$/, '') + '...';
  }
  
  return meta;
}

/**
 * Extract title from content
 */
function extractTitle(content) {
  // Try quoted title first
  const quotedMatch = content.match(/^title:\s*["'](.+?)["']/m);
  if (quotedMatch) return quotedMatch[1];
  
  // Try unquoted
  const unquotedMatch = content.match(/^title:\s*(.+)$/m);
  if (unquotedMatch) return unquotedMatch[1].trim();
  
  return null;
}

/**
 * Insert meta description after excerpt line
 */
function insertMetaDescription(content, metaDesc) {
  // Find the excerpt line(s) and insert after
  const lines = content.split('\n');
  let inFrontmatter = false;
  let excerptFound = false;
  let insertIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === '---') {
      if (!inFrontmatter) {
        inFrontmatter = true;
      } else {
        // End of frontmatter - insert before this if we haven't found excerpt
        if (insertIndex === -1) insertIndex = i;
        break;
      }
      continue;
    }
    
    if (inFrontmatter && lines[i].startsWith('excerpt:')) {
      excerptFound = true;
    }
    
    // After finding excerpt, look for next field
    if (excerptFound && !lines[i].startsWith('excerpt:') && /^[a-zA-Z]/.test(lines[i])) {
      insertIndex = i;
      break;
    }
  }
  
  if (insertIndex === -1) return null;
  
  // Escape quotes
  const escaped = metaDesc.replace(/"/g, '\\"');
  lines.splice(insertIndex, 0, `metaDescription: "${escaped}"`);
  
  return lines.join('\n');
}

/**
 * Main process
 */
async function main() {
  console.log('🔍 Scanning blog posts...\n');
  
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
  
  let hasMetaCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;
  const updates = [];
  
  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Skip if already has metaDescription
    if (content.includes('metaDescription:')) {
      hasMetaCount++;
      continue;
    }
    
    // Extract title
    const title = extractTitle(content);
    if (!title) {
      skippedCount++;
      continue;
    }
    
    // Generate meta description
    const metaDesc = generateMeta(title);
    
    // Insert into content
    const newContent = insertMetaDescription(content, metaDesc);
    if (!newContent) {
      skippedCount++;
      continue;
    }
    
    updates.push({
      file: file.substring(0, 60),
      title: title.substring(0, 50),
      meta: metaDesc
    });
    
    if (!DRY_RUN) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      updatedCount++;
    }
  }
  
  // Summary
  console.log('📊 Summary:');
  console.log(`   Total posts: ${files.length}`);
  console.log(`   Already have meta: ${hasMetaCount}`);
  console.log(`   Would update: ${updates.length}`);
  console.log(`   Skipped (parse issues): ${skippedCount}`);
  
  if (DRY_RUN) {
    console.log('\n🔍 DRY RUN - Sample changes:\n');
    for (const u of updates.slice(0, 15)) {
      console.log(`📝 ${u.file}...`);
      console.log(`   Title: ${u.title}...`);
      console.log(`   Meta: ${u.meta}`);
      console.log('');
    }
    if (updates.length > 15) {
      console.log(`   ... and ${updates.length - 15} more\n`);
    }
    console.log(`\n💡 Run without --dry-run to apply ${updates.length} changes.`);
  } else {
    console.log(`\n✅ Updated ${updatedCount} posts.`);
    console.log(`📌 Review with: git diff --stat`);
  }
}

main().catch(console.error);
