import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class FinalHeaderFix {
  constructor() {
    console.log('🔧 Final Header Fix Tool initialized');
  }

  fixHeaderFormatting(content) {
    const lines = content.split('\n');
    const fixedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      
      // Skip frontmatter and existing headers
      if (line.startsWith('---') || line.startsWith('#')) {
        fixedLines.push(line);
        continue;
      }
      
      // SPECIFIC FIXES for known problematic patterns
      
      // SPECIFIC FIXES for exact problematic patterns from the screenshot
      
      // Fix: "### 1. Eliminate Manual Data Entry: AI Onboarding & Intake- **Upload..."
      if (line.match(/^### \d+\. [^-]+ & [^-]+[-–]\s*\*\*.+/)) {
        const match = line.match(/^(### \d+\. [^-]+ & [^-]+)[-–]\s*(.+)/);
        if (match) {
          console.log(`✅ Fixed numbered header with merged content: "${match[1].trim()}"`);
          fixedLines.push(match[1].trim());
          fixedLines.push('');
          fixedLines.push(match[2].trim());
          continue;
        }
      }
      
      // Fix: "Why AI-Driven Proposal Generation Is a Gamechanger for AdvisorsFinancial advisors"
      if (line.includes('AdvisorsFinancial advisors')) {
        const fixed = line.replace('AdvisorsFinancial advisors', 'Advisors\n\nFinancial advisors');
        const parts = fixed.split('\n\n');
        console.log(`✅ Fixed specific pattern: AdvisorsFinancial advisors`);
        fixedLines.push(`## ${parts[0]}`);
        fixedLines.push('');
        fixedLines.push(parts[1]);
        continue;
      }
      
      // PATTERN 1: "TitleSentence starts here" - Split merged title and content
      const titleContentMatch = line.match(/^([A-Z][^A-Z]*[A-Z][^a-z]*?)([A-Z][a-z].{30,})/);
      if (titleContentMatch && line.length > 60 && !line.startsWith('**') && !line.startsWith('-')) {
        const titlePart = titleContentMatch[1].trim();
        const contentPart = titleContentMatch[2].trim();
        
        // Only apply if title looks like a real header (multiple words, reasonable length)
        if (titlePart.length > 20 && titlePart.length < 100 && titlePart.split(' ').length >= 3) {
          console.log(`✅ Fixed merged title/content: "${titlePart}"`);
          fixedLines.push(`## ${titlePart}`);
          fixedLines.push('');
          fixedLines.push(contentPart);
          continue;
        }
      }
      
      // PATTERN 2: "### N. Title- Content" or "N. Title- Content" - Split numbered header with merged content
      const numberedHeaderMatch = line.match(/^((?:### )?\d+\. [^-]+)[-–]\s*(.+)/);
      if (numberedHeaderMatch) {
        const headerPart = numberedHeaderMatch[1].trim();
        const contentPart = numberedHeaderMatch[2].trim();
        
        // Ensure it starts with ###
        const formattedHeader = headerPart.startsWith('###') ? headerPart : `### ${headerPart}`;
        
        console.log(`✅ Fixed numbered header: "${formattedHeader}"`);
        fixedLines.push(formattedHeader);
        fixedLines.push('');
        fixedLines.push(contentPart);
        continue;
      }
      
      // PATTERN 3: "### N." (empty) or "N." (bare) followed by content - Combine with next line
      if (line.match(/^(?:### )?\d+\.\s*$/) && i + 1 < lines.length) {
        let nextIndex = i + 1;
        let nextLine = lines[nextIndex];
        
        // Skip empty lines
        while (nextLine && nextLine.trim() === '' && nextIndex + 1 < lines.length) {
          nextIndex++;
          nextLine = lines[nextIndex];
        }
        
        if (nextLine && nextLine.trim()) {
          // Check if next line has content that should be part of header
          const contentHeaderMatch = nextLine.match(/^([A-Z][^-]*?)[-–]\s*(.+)/);
          if (contentHeaderMatch) {
            const headerTitle = contentHeaderMatch[1].trim();
            const headerContent = contentHeaderMatch[2].trim();
            
            const baseNumber = line.trim().replace('###', '').trim();
            const formattedHeader = `### ${baseNumber} ${headerTitle}`;
            
            console.log(`✅ Fixed empty numbered header: "${formattedHeader}"`);
            fixedLines.push(formattedHeader);
            fixedLines.push('');
            fixedLines.push(headerContent);
            i = nextIndex; // Skip processed lines
            continue;
          } else {
            // If next line doesn't match pattern, treat it as the header title
            const baseNumber = line.trim().replace('###', '').trim();
            
            // Special case: if next line starts with content that should be header
            if (nextLine.match(/^[A-Z][^-]*[-–]/)) {
              const headerMatch = nextLine.match(/^([A-Z][^-]*)[-–]\s*(.+)/);
              if (headerMatch) {
                const headerTitle = headerMatch[1].trim();
                const headerContent = headerMatch[2].trim();
                const formattedHeader = `### ${baseNumber} ${headerTitle}`;
                
                console.log(`✅ Fixed empty numbered header with dash content: "${formattedHeader}"`);
                fixedLines.push(formattedHeader);
                fixedLines.push('');
                fixedLines.push(headerContent);
                i = nextIndex; // Skip processed lines
                continue;
              }
            }
            
            const formattedHeader = `### ${baseNumber} ${nextLine.trim()}`;
            
            console.log(`✅ Fixed empty numbered header with simple content: "${formattedHeader}"`);
            fixedLines.push(formattedHeader);
            i = nextIndex; // Skip processed lines
            continue;
          }
        }
      }
      
      // PATTERN 4: "### N. Word-" (incomplete) followed by continuation
      if (line.match(/^### \d+\. [A-Z][^-]*[-–]\s*$/) && i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        if (nextLine && nextLine.trim() && !nextLine.startsWith('#')) {
          console.log(`✅ Fixed split numbered header: "${line.trim()}${nextLine.trim()}"`);
          fixedLines.push(`${line.trim()}${nextLine.trim()}`);
          i++; // Skip next line
          continue;
        }
      }
      
      // PATTERN 5: Standalone content that should be headers "Content Title- **Something"
      const standaloneHeaderMatch = line.match(/^([A-Z][^-]{20,80})[-–]\s*(.+)/);
      if (standaloneHeaderMatch && !line.startsWith('**') && !line.startsWith('-')) {
        const headerTitle = standaloneHeaderMatch[1].trim();
        const headerContent = standaloneHeaderMatch[2].trim();
        
        console.log(`✅ Fixed standalone header: "${headerTitle}"`);
        fixedLines.push(`## ${headerTitle}`);
        fixedLines.push('');
        fixedLines.push(headerContent);
        continue;
      }
      
      // Default: keep line as is
      fixedLines.push(line);
    }
    
    return fixedLines.join('\n');
  }

  async fixAllPilotPosts() {
    const blogDir = path.join(__dirname, '../src/content/blog');
    const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
    
    console.log(`🎯 Found ${files.length} blog posts to fix`);
    
    let fixedCount = 0;
    
    for (const file of files) {
      const filePath = path.join(blogDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      console.log(`\n📝 Processing: ${file}`);
      
      const fixedContent = this.fixHeaderFormatting(content);
      
      // Only write if content changed
      if (fixedContent !== content) {
        fs.writeFileSync(filePath, fixedContent, 'utf-8');
        console.log(`✅ Fixed headers in: ${file}`);
        fixedCount++;
      } else {
        console.log(`ℹ️  No changes needed: ${file}`);
      }
    }
    
    console.log(`\n🎉 Header fixing complete!`);
    console.log(`✅ Fixed ${fixedCount} out of ${files.length} files`);
  }
}

// Main execution
async function main() {
  const fixer = new FinalHeaderFix();
  await fixer.fixAllPilotPosts();
}

// Run if called directly
try {
  await main();
} catch (error) {
  console.error('❌ Script failed:', error);
  process.exit(1);
}

export default FinalHeaderFix;
