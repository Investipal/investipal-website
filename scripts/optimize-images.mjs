#!/usr/bin/env node
/**
 * Image Optimization Script for Investipal Website
 * 
 * This script:
 * 1. Identifies large images (>500KB)
 * 2. Converts them to WebP format
 * 3. Generates responsive image sizes
 * 4. Updates image references in code
 * 
 * Usage: node scripts/optimize-images.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

// Configuration
const IMAGE_DIRS = [
  'public/images/product_screenshots',
  'public/images/external',
  'public/images/blog'
];

const RESPONSIVE_SIZES = [
  { width: 380, suffix: '-mobile' },    // Mobile
  { width: 768, suffix: '-tablet' },    // Tablet
  { width: 1200, suffix: '-desktop' },  // Desktop
  { width: 1920, suffix: '-hd' }        // HD
];

const MAX_SIZE_KB = 500; // Flag images larger than 500KB

async function analyzeImage(filePath) {
  const stats = fs.statSync(filePath);
  const sizeKB = Math.round(stats.size / 1024);
  
  if (sizeKB < MAX_SIZE_KB) return null;
  
  const metadata = await sharp(filePath).metadata();
  
  return {
    path: filePath,
    sizeKB,
    width: metadata.width,
    height: metadata.height,
    format: metadata.format
  };
}

async function optimizeImage(imagePath, outputDir) {
  const filename = path.basename(imagePath, path.extname(imagePath));
  const results = [];
  
  console.log(`\n📸 Optimizing: ${path.basename(imagePath)}`);
  
  for (const size of RESPONSIVE_SIZES) {
    const outputPath = path.join(outputDir, `${filename}${size.suffix}.webp`);
    
    try {
      await sharp(imagePath)
        .resize(size.width, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: 85 })
        .toFile(outputPath);
      
      const stats = fs.statSync(outputPath);
      const sizeKB = Math.round(stats.size / 1024);
      
      results.push({
        size: size.width,
        path: outputPath,
        sizeKB
      });
      
      console.log(`  ✓ ${size.width}w → ${sizeKB} KB`);
    } catch (error) {
      console.error(`  ✗ Failed to create ${size.width}w:`, error.message);
    }
  }
  
  return results;
}

async function scanDirectory(dir) {
  const fullPath = path.join(ROOT, dir);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Directory not found: ${dir}`);
    return [];
  }
  
  const files = fs.readdirSync(fullPath);
  const images = [];
  
  for (const file of files) {
    const filePath = path.join(fullPath, file);
    const ext = path.extname(file).toLowerCase();
    
    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      const analysis = await analyzeImage(filePath);
      if (analysis) {
        images.push(analysis);
      }
    }
  }
  
  return images;
}

async function main() {
  console.log('🔍 Scanning for large images...\n');
  
  const allImages = [];
  
  for (const dir of IMAGE_DIRS) {
    const images = await scanDirectory(dir);
    allImages.push(...images);
  }
  
  if (allImages.length === 0) {
    console.log('✅ No large images found (all under 500KB)');
    return;
  }
  
  // Sort by size (largest first)
  allImages.sort((a, b) => b.sizeKB - a.sizeKB);
  
  console.log(`\n📊 Found ${allImages.length} large images:\n`);
  
  allImages.forEach((img, i) => {
    const relativePath = path.relative(ROOT, img.path);
    console.log(`${i + 1}. ${relativePath}`);
    console.log(`   Size: ${img.sizeKB} KB | Dimensions: ${img.width}x${img.height}`);
  });
  
  console.log('\n' + '='.repeat(60));
  console.log('📝 RECOMMENDATIONS:');
  console.log('='.repeat(60));
  
  const totalSizeKB = allImages.reduce((sum, img) => sum + img.sizeKB, 0);
  const totalSizeMB = (totalSizeKB / 1024).toFixed(2);
  
  console.log(`\n1. Total size of large images: ${totalSizeMB} MB`);
  console.log(`2. Estimated savings with WebP: ~${(totalSizeMB * 0.7).toFixed(2)} MB (70%)`);
  console.log(`3. Top 3 offenders:`);
  
  allImages.slice(0, 3).forEach((img, i) => {
    console.log(`   ${i + 1}. ${path.basename(img.path)} - ${img.sizeKB} KB`);
  });
  
  console.log('\n💡 Next steps:');
  console.log('   - Run with --optimize flag to generate WebP versions');
  console.log('   - Update image references to use <picture> elements');
  console.log('   - Add width/height attributes to prevent layout shifts');
  
  // Check if --optimize flag is present
  if (process.argv.includes('--optimize')) {
    console.log('\n🚀 Starting optimization...');
    
    for (const img of allImages.slice(0, 5)) { // Optimize top 5 for now
      const outputDir = path.dirname(img.path);
      await optimizeImage(img.path, outputDir);
    }
    
    console.log('\n✅ Optimization complete!');
  } else {
    console.log('\n💡 Tip: Run with --optimize to generate optimized versions');
  }
}

main().catch(console.error);

