import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target the specific file
const filePath = path.join(__dirname, '../src/content/blog/how-to-use-ai-for-personalized-investment-proposal-generation-a-practical-guide.md');

console.log('🔧 Fixing Advanced Analytics formatting issue...');

// Read the file
let content = fs.readFileSync(filePath, 'utf-8');

console.log('📝 Original content length:', content.length);

// Show current state around Advanced Analytics
const lines = content.split('\n');
lines.forEach((line, index) => {
  if (line.includes('Advanced Analytics')) {
    console.log(`📋 Line ${index + 1}: "${line}"`);
  }
});

// Apply very specific fixes
let fixes = 0;

// Fix the exact pattern: **Advanced Analytics **
if (content.includes('**Advanced Analytics **')) {
  content = content.replace(/\*\*Advanced Analytics \*\*/g, '**Advanced Analytics**');
  console.log('✅ Fixed: **Advanced Analytics ** → **Advanced Analytics**');
  fixes++;
}

// Fix any variations
if (content.includes('**Advanced Analytics**—')) {
  content = content.replace(/\*\*Advanced Analytics\*\*—/g, '**Advanced Analytics** —');
  console.log('✅ Fixed: **Advanced Analytics**— → **Advanced Analytics** —');
  fixes++;
}

// Ensure proper list formatting
if (content.includes('-**Advanced Analytics**')) {
  content = content.replace(/-\*\*Advanced Analytics\*\*/g, '- **Advanced Analytics**');
  console.log('✅ Fixed: -**Advanced Analytics** → - **Advanced Analytics**');
  fixes++;
}

// Write the file back
fs.writeFileSync(filePath, content, 'utf-8');

console.log(`📊 Applied ${fixes} specific fixes`);
console.log('🎉 Advanced Analytics formatting fix complete!');

// Verify the fix
const updatedContent = fs.readFileSync(filePath, 'utf-8');
const updatedLines = updatedContent.split('\n');
updatedLines.forEach((line, index) => {
  if (line.includes('Advanced Analytics')) {
    console.log(`✅ Updated Line ${index + 1}: "${line}"`);
  }
});




