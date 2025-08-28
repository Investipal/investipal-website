import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SystematicPostProcessor {
  constructor() {
    console.log('🔧 Systematic Post-Processor initialized');
    
    // Define systematic patterns that should be headers
    this.systematicPatterns = [
      {
        name: 'Question Headers',
        regex: /^(Ready to [^?]+\?|What (?:is|are|to|Sets) [^?]+\?|How (?:to|It|does) [^?]+\?|Why (?:It|This|do) [^?]+\?)(.*)$/,
        action: 'splitQuestion'
      },
      {
        name: 'Title Sentences',
        regex: /^([A-Z][^.]*(?:Example|Benefits?|Practices?|Guide|Overview|Summary|Pipeline|Workflow|Analysis|Strategy|Solution|Approach|Method|Process|Tips?|Steps?|Requirements?|Objectives?|Goals?|Outcomes?|Results?|Insights?|Recommendations?|Growth|Success|Transformation|Innovation|Automation|Personalization|Optimization|Intelligence|Data|Platform|System|Technology|Framework|Methodology|Experience|Advantage|Features?|Capabilities?|Functionality|Performance|Quality|Excellence|Leadership|Partnership|Collaboration|Communication|Engagement|Satisfaction|Value|Impact|Analytics|Knowledge|Expertise|Standards?|Compliance|Best Practices?|Tips?|Advice|Guidance|Support|Tools?|Resources?|Management|Operations?|Implementation|Development|Achievement))$/,
        action: 'makeHeader'
      },
      {
        name: 'Before/After Patterns',
        regex: /^(Before|After)\s+([A-Z][^:]+):\s*(.+)/,
        action: 'formatBeforeAfter'
      },
      {
        name: 'Merged Title Content',
        regex: /^([A-Z][^A-Z]*[A-Z][^a-z]*?)([A-Z][a-z].{30,})/,
        action: 'splitMerged'
      }
    ];
  }

  applySystematicPattern(line, pattern) {
    const match = line.match(pattern.regex);
    if (!match) return null;

    switch (pattern.action) {
      case 'splitQuestion':
        const questionPart = match[1];
        const remainingContent = match[2] ? match[2].trim() : '';
        
        console.log(`✅ ${pattern.name}: "${questionPart}"`);
        
        if (remainingContent) {
          return [`## ${questionPart}`, '', remainingContent];
        } else {
          return [`## ${questionPart}`];
        }

      case 'makeHeader':
        console.log(`✅ ${pattern.name}: "${match[1]}"`);
        return [`## ${match[1]}`];

      case 'formatBeforeAfter':
        console.log(`✅ ${pattern.name}: "${match[1]} ${match[2]}"`);
        return [`**${match[1]} ${match[2]}:** ${match[3]}`];

      case 'splitMerged':
        const titlePart = match[1].trim();
        const contentPart = match[2].trim();
        
        // Only apply if it looks like a real title/content split
        if (titlePart.length > 15 && titlePart.length < 100 && titlePart.split(' ').length >= 3) {
          console.log(`✅ ${pattern.name}: "${titlePart}"`);
          return [`## ${titlePart}`, '', contentPart];
        }
        break;
    }

    return null;
  }

  systematicProcess(content) {
    const lines = content.split('\n');
    const processedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      
      // Skip frontmatter, existing headers, empty lines, and list items
      if (line.startsWith('---') || line.startsWith('#') || !line.trim() || 
          line.startsWith('-') || line.startsWith('*') || line.startsWith('**')) {
        processedLines.push(line);
        continue;
      }
      
      // Apply systematic patterns
      let patternApplied = false;
      
      for (const pattern of this.systematicPatterns) {
        const result = this.applySystematicPattern(line, pattern);
        if (result) {
          processedLines.push(...result);
          patternApplied = true;
          break;
        }
      }
      
      // If no pattern matched, keep the line as is
      if (!patternApplied) {
        processedLines.push(line);
      }
    }
    
    return processedLines.join('\n');
  }

  async processAllPosts() {
    const blogDir = path.join(__dirname, '../src/content/blog');
    const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
    
    console.log(`🎯 Systematically processing ${files.length} blog posts`);
    
    let processedCount = 0;
    
    for (const file of files) {
      const filePath = path.join(blogDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      console.log(`\n📝 Processing: ${file}`);
      
      const processedContent = this.systematicProcess(content);
      
      // Only write if content changed
      if (processedContent !== content) {
        fs.writeFileSync(filePath, processedContent, 'utf-8');
        console.log(`✅ Systematically processed: ${file}`);
        processedCount++;
      } else {
        console.log(`ℹ️  No changes needed: ${file}`);
      }
    }
    
    console.log(`\n🎉 Systematic processing complete!`);
    console.log(`✅ Processed ${processedCount} out of ${files.length} files`);
    console.log(`🚀 All posts are now systematically formatted for batch processing!`);
  }
}

// Main execution
async function main() {
  const processor = new SystematicPostProcessor();
  await processor.processAllPosts();
}

// Run the systematic processor
try {
  await main();
} catch (error) {
  console.error('❌ Systematic processing failed:', error);
  process.exit(1);
}

export default SystematicPostProcessor;




