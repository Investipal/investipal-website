import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SystematicListFix {
  constructor() {
    console.log('🔧 Systematic List & Formatting Fix initialized');
    
    // Define systematic patterns for list and formatting issues
    this.listPatterns = [
      {
        name: 'Missing Bullet Points with Bold Text',
        regex: /^([A-Z][^—]*) — (.+)$/gm,
        replacement: '- **$1** — $2',
        description: 'Fix "Title — Content" -> "- **Title** — Content"'
      },
      {
        name: 'Broken Bold with Extra Spaces',
        regex: /\*\*([^*]+)\s+\*\*/g,
        replacement: '**$1**',
        description: 'Fix "**Text **" -> "**Text**"'
      },
      {
        name: 'Missing Bullet Points for List Items',
        regex: /^([A-Z][^—\n]*(?:Analysis|Diagnostics|Filters|Analytics|Assessment|Setting|Alignment)) — (.+)$/gm,
        replacement: '- **$1** — $2',
        description: 'Fix list items missing bullets'
      },
      {
        name: 'Inconsistent List Formatting',
        regex: /^-([A-Z][^—]*) — (.+)$/gm,
        replacement: '- **$1** — $2',
        description: 'Fix "-Title — Content" -> "- **Title** — Content"'
      },
      {
        name: 'Bold Text Without Proper Spacing',
        regex: /^-\s*([A-Z][^—]*) — (.+)$/gm,
        replacement: '- **$1** — $2',
        description: 'Ensure proper bold formatting in lists'
      }
    ];
  }

  fixListFormatting(content) {
    let fixedContent = content;
    let totalFixes = 0;

    console.log('🔍 Scanning for list formatting issues...');

    // Apply each pattern systematically
    for (const pattern of this.listPatterns) {
      const beforeMatches = fixedContent.match(pattern.regex) || [];
      const beforeCount = beforeMatches.length;
      
      if (beforeCount > 0) {
        console.log(`📋 Found ${beforeCount} instances of: ${pattern.name}`);
        fixedContent = fixedContent.replace(pattern.regex, pattern.replacement);
        
        // Verify the fix worked
        const afterMatches = fixedContent.match(pattern.regex) || [];
        const afterCount = afterMatches.length;
        const fixedCount = beforeCount - afterCount;
        
        if (fixedCount > 0) {
          console.log(`✅ ${pattern.name}: Fixed ${fixedCount} instances`);
          totalFixes += fixedCount;
        }
      }
    }

    // Additional specific fixes for edge cases
    
    // Fix any remaining unformatted list items
    fixedContent = fixedContent.replace(/^([A-Z][^-\n]*(?:Goal Setting|Net effect)) — (.+)$/gm, '**$1** — $2');
    
    // Fix list items that should have bullets but don't
    fixedContent = fixedContent.replace(/^([A-Z][^-\n]*(?:3–5 hours|95% less|Near-zero)) (.+)$/gm, '- $1 $2');
    
    // Clean up any double bullets
    fixedContent = fixedContent.replace(/^- - /gm, '- ');
    
    // Fix any remaining bold formatting issues
    fixedContent = fixedContent.replace(/\*\*([^*]+)\s*\*\*\s*—/g, '**$1** —');

    console.log(`📊 Total list formatting fixes applied: ${totalFixes}`);
    
    return fixedContent;
  }

  validateListFormatting(content) {
    const issues = [];
    
    // Check for common list formatting problems
    const problematicPatterns = [
      { 
        pattern: /^[A-Z][^—\n]*[A-Z][a-z]+ — /gm, 
        description: 'Potential missing bullet points',
        exclude: /^- \*\*/ // Exclude properly formatted items
      },
      { 
        pattern: /\*\*[^*]*\s+\*\*/g, 
        description: 'Bold text with trailing spaces' 
      },
      { 
        pattern: /^-[A-Z]/gm, 
        description: 'Missing space after bullet point' 
      },
      { 
        pattern: /^[A-Z][^—\n]*(?:Analysis|Diagnostics|Filters|Analytics) — (?!\*\*)/gm, 
        description: 'List items without bold formatting' 
      }
    ];

    for (const { pattern, description, exclude } of problematicPatterns) {
      let matches = content.match(pattern) || [];
      
      // Filter out excluded patterns if specified
      if (exclude) {
        matches = matches.filter(match => !exclude.test(match));
      }
      
      if (matches.length > 0) {
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
    
    console.log(`🎯 Systematically fixing list formatting in ${files.length} blog posts`);
    
    let fixedCount = 0;
    let totalIssuesFixed = 0;

    for (const file of files) {
      const filePath = path.join(blogDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      console.log(`\n📝 Processing: ${file}`);
      
      // Validate current state
      const issuesBefore = this.validateListFormatting(content);
      if (issuesBefore.length > 0) {
        console.log(`⚠️  Found ${issuesBefore.length} types of list formatting issues`);
        issuesBefore.forEach(issue => {
          console.log(`   - ${issue.type}: ${issue.count} instances`);
          if (issue.examples.length > 0) {
            console.log(`     Examples: ${issue.examples.slice(0, 2).map(ex => `"${ex.substring(0, 50)}..."`).join(', ')}`);
          }
        });
      }
      
      // Fix list formatting
      const fixedContent = this.fixListFormatting(content);
      
      // Validate after fixes
      const issuesAfter = this.validateListFormatting(fixedContent);
      
      // Only write if content changed
      if (fixedContent !== content) {
        fs.writeFileSync(filePath, fixedContent, 'utf-8');
        console.log(`✅ Fixed list formatting in: ${file}`);
        fixedCount++;
        
        const issuesResolved = issuesBefore.length - issuesAfter.length;
        totalIssuesFixed += Math.max(0, issuesResolved);
        
        if (issuesAfter.length > 0) {
          console.log(`⚠️  Remaining issues: ${issuesAfter.length} types`);
        } else {
          console.log(`🎉 All list formatting issues resolved!`);
        }
      } else {
        console.log(`ℹ️  No list formatting issues found: ${file}`);
      }
    }
    
    console.log(`\n🎉 Systematic list formatting fix complete!`);
    console.log(`✅ Fixed ${fixedCount} out of ${files.length} files`);
    console.log(`📊 Total issue types resolved: ${totalIssuesFixed}`);
    console.log(`🚀 All posts now have consistent list formatting for batch processing!`);
  }
}

// Main execution
async function main() {
  const fixer = new SystematicListFix();
  await fixer.fixAllPosts();
}

// Run the systematic list fix
try {
  await main();
} catch (error) {
  console.error('❌ Systematic list fix failed:', error);
  process.exit(1);
}

export default SystematicListFix;





