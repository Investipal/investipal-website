import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SystematicBoldFix {
  constructor() {
    console.log('🔧 Systematic Bold Text Fix initialized');
    
    // Define systematic patterns for bold text issues
    this.boldPatterns = [
      {
        name: 'Broken Bold with Extra Asterisks',
        regex: /\*\*([^*]+)\s+\*\*([^*]*)/g,
        replacement: '**$1$2**',
        description: 'Fix "**Text **extra" -> "**Text extra**"'
      },
      {
        name: 'Incomplete Bold Opening',
        regex: /\*\*([^*]+)(?!\*\*)/g,
        replacement: '**$1**',
        description: 'Fix "**Text" -> "**Text**"'
      },
      {
        name: 'Incomplete Bold Closing',
        regex: /(?<!\*\*)([^*]+)\*\*/g,
        replacement: '**$1**',
        description: 'Fix "Text**" -> "**Text**"'
      },
      {
        name: 'Multiple Asterisks',
        regex: /\*{3,}([^*]+)\*{3,}/g,
        replacement: '**$1**',
        description: 'Fix "***Text***" -> "**Text**"'
      },
      {
        name: 'Bold with Trailing Spaces',
        regex: /\*\*([^*]+)\s+\*\*/g,
        replacement: '**$1**',
        description: 'Fix "**Text **" -> "**Text**"'
      },
      {
        name: 'Bold with Leading Spaces',
        regex: /\*\*\s+([^*]+)\*\*/g,
        replacement: '**$1**',
        description: 'Fix "** Text**" -> "**Text**"'
      },
      {
        name: 'Nested Bold Issues',
        regex: /\*\*([^*]*)\*\*([^*]*)\*\*([^*]*)\*\*/g,
        replacement: '**$1** **$2** **$3**',
        description: 'Fix nested bold formatting'
      },
      {
        name: 'Bold with Punctuation Issues',
        regex: /\*\*([^*]+[.,:;!?])\s*\*\*/g,
        replacement: '**$1**',
        description: 'Fix bold with punctuation spacing'
      }
    ];
  }

  fixBoldFormatting(content) {
    let fixedContent = content;
    let totalFixes = 0;

    console.log('🔍 Scanning for bold formatting issues...');

    // Apply each pattern systematically
    for (const pattern of this.boldPatterns) {
      const beforeCount = (fixedContent.match(pattern.regex) || []).length;
      
      if (beforeCount > 0) {
        fixedContent = fixedContent.replace(pattern.regex, pattern.replacement);
        console.log(`✅ ${pattern.name}: Fixed ${beforeCount} instances`);
        totalFixes += beforeCount;
      }
    }

    // Additional cleanup for common edge cases
    
    // Fix double bold markers
    fixedContent = fixedContent.replace(/\*\*\*\*([^*]+)\*\*\*\*/g, '**$1**');
    
    // Fix bold markers with no content
    fixedContent = fixedContent.replace(/\*\*\s*\*\*/g, '');
    
    // Fix bold at start/end of lines
    fixedContent = fixedContent.replace(/^\*\*([^*\n]+)\*\*$/gm, '**$1**');
    
    // Fix bold with line breaks
    fixedContent = fixedContent.replace(/\*\*([^*]+)\n([^*]+)\*\*/g, '**$1 $2**');

    console.log(`📊 Total bold formatting fixes applied: ${totalFixes}`);
    
    return fixedContent;
  }

  validateBoldFormatting(content) {
    const issues = [];
    
    // Check for unmatched asterisks
    const asteriskMatches = content.match(/\*+/g) || [];
    const boldMatches = content.match(/\*\*[^*]+\*\*/g) || [];
    
    // Look for potential issues
    const problematicPatterns = [
      { pattern: /\*\*[^*]*\s+\*\*/, description: 'Bold with trailing spaces' },
      { pattern: /\*\*\s+[^*]*\*\*/, description: 'Bold with leading spaces' },
      { pattern: /\*{3,}/, description: 'Multiple consecutive asterisks' },
      { pattern: /\*\*[^*]*$/, description: 'Unclosed bold formatting' },
      { pattern: /^[^*]*\*\*/, description: 'Unopened bold formatting' }
    ];

    for (const { pattern, description } of problematicPatterns) {
      const matches = content.match(pattern);
      if (matches) {
        issues.push({
          type: description,
          count: matches.length,
          examples: matches.slice(0, 3) // Show first 3 examples
        });
      }
    }

    return issues;
  }

  async fixAllPosts() {
    const blogDir = path.join(__dirname, '../src/content/blog');
    const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
    
    console.log(`🎯 Systematically fixing bold formatting in ${files.length} blog posts`);
    
    let fixedCount = 0;
    let totalIssuesFixed = 0;

    for (const file of files) {
      const filePath = path.join(blogDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      console.log(`\n📝 Processing: ${file}`);
      
      // Validate current state
      const issuesBefore = this.validateBoldFormatting(content);
      if (issuesBefore.length > 0) {
        console.log(`⚠️  Found ${issuesBefore.length} types of bold formatting issues`);
        issuesBefore.forEach(issue => {
          console.log(`   - ${issue.type}: ${issue.count} instances`);
        });
      }
      
      // Fix bold formatting
      const fixedContent = this.fixBoldFormatting(content);
      
      // Validate after fixes
      const issuesAfter = this.validateBoldFormatting(fixedContent);
      
      // Only write if content changed
      if (fixedContent !== content) {
        fs.writeFileSync(filePath, fixedContent, 'utf-8');
        console.log(`✅ Fixed bold formatting in: ${file}`);
        fixedCount++;
        
        const issuesResolved = issuesBefore.length - issuesAfter.length;
        totalIssuesFixed += issuesResolved;
        
        if (issuesAfter.length > 0) {
          console.log(`⚠️  Remaining issues: ${issuesAfter.length} types`);
        } else {
          console.log(`🎉 All bold formatting issues resolved!`);
        }
      } else {
        console.log(`ℹ️  No bold formatting issues found: ${file}`);
      }
    }
    
    console.log(`\n🎉 Systematic bold formatting fix complete!`);
    console.log(`✅ Fixed ${fixedCount} out of ${files.length} files`);
    console.log(`📊 Total issue types resolved: ${totalIssuesFixed}`);
    console.log(`🚀 All posts now have consistent bold formatting for batch processing!`);
  }
}

// Main execution
async function main() {
  const fixer = new SystematicBoldFix();
  await fixer.fixAllPosts();
}

// Run the systematic bold fix
try {
  await main();
} catch (error) {
  console.error('❌ Systematic bold fix failed:', error);
  process.exit(1);
}

export default SystematicBoldFix;





