import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SystematicMarkdownFormatter {
  constructor() {
    console.log('🔧 Systematic Markdown Formatter initialized');
    console.log('🎯 This will systematically fix ALL markdown formatting issues across ALL posts');
    
    // Define systematic patterns that apply to ALL posts
    this.systematicPatterns = [
      {
        name: 'Bold Text Cleanup',
        patterns: [
          // Fix **text ** (trailing space)
          { regex: /\*\*([^*]+)\s+\*\*/g, replacement: '**$1**' },
          // Fix ** text** (leading space)  
          { regex: /\*\*\s+([^*]+)\*\*/g, replacement: '**$1**' },
          // Fix ***text*** (triple asterisks)
          { regex: /\*{3,}([^*]+)\*{3,}/g, replacement: '**$1**' },
          // Fix **text**— (missing space before dash)
          { regex: /\*\*([^*]+)\*\*—/g, replacement: '**$1** —' },
          // Fix **text**- (missing space before dash)
          { regex: /\*\*([^*]+)\*\*-/g, replacement: '**$1** —' }
        ]
      },
      {
        name: 'List Item Formatting',
        patterns: [
          // Fix -**text** (missing space after dash)
          { regex: /^-\*\*([^*]+)\*\*/gm, replacement: '- **$1**' },
          // Fix -text (missing space after dash for any list item)
          { regex: /^-([A-Z])/gm, replacement: '- $1' },
          // Fix list items that should be bold: "- Title —" -> "- **Title** —"
          { regex: /^- ([A-Z][^—\n]*) —/gm, replacement: '- **$1** —' },
          // Fix list items that should be bold: "- Title:" -> "- **Title:**"
          { regex: /^- ([A-Z][^:\n]*):(?!\*\*)/gm, replacement: '- **$1:**' }
        ]
      },
      {
        name: 'Header Formatting',
        patterns: [
          // Fix headers with extra spaces
          { regex: /^(#{1,6})\s{2,}/gm, replacement: '$1 ' },
          // Fix headers missing space after #
          { regex: /^(#{1,6})([A-Z])/gm, replacement: '$1 $2' },
          // Ensure proper spacing after headers
          { regex: /^(#{1,6}\s+[^\n]+)\n([A-Z])/gm, replacement: '$1\n\n$2' }
        ]
      },
      {
        name: 'Content Structure',
        patterns: [
          // Fix "Net effect?" formatting
          { regex: /^Net effect\?\s*$/gm, replacement: '**Net effect?**' },
          // Fix standalone questions that should be headers
          { regex: /^(Ready to [^?\n]+\?)$/gm, replacement: '## $1' },
          { regex: /^(What [^?\n]+\?)$/gm, replacement: '## $1' },
          { regex: /^(How [^?\n]+\?)$/gm, replacement: '## $1' },
          { regex: /^(Why [^?\n]+\?)$/gm, replacement: '## $1' }
        ]
      },
      {
        name: 'Spacing and Cleanup',
        patterns: [
          // Remove excessive whitespace
          { regex: /\n{3,}/g, replacement: '\n\n' },
          // Fix spacing around em dashes
          { regex: /—\s{2,}/g, replacement: '— ' },
          { regex: /\s{2,}—/g, replacement: ' —' },
          // Fix double bullets
          { regex: /^- - /gm, replacement: '- ' },
          // Fix double headers
          { regex: /^## ## /gm, replacement: '## ' },
          { regex: /^### ### /gm, replacement: '### ' }
        ]
      }
    ];
  }

  applySystematicFormatting(content) {
    let formattedContent = content;
    let totalFixes = 0;

    console.log('🔍 Applying systematic formatting patterns...');

    // Apply each category of patterns
    for (const category of this.systematicPatterns) {
      console.log(`\n📋 Processing: ${category.name}`);
      let categoryFixes = 0;

      for (const pattern of category.patterns) {
        const matches = formattedContent.match(pattern.regex) || [];
        if (matches.length > 0) {
          formattedContent = formattedContent.replace(pattern.regex, pattern.replacement);
          categoryFixes += matches.length;
          console.log(`  ✅ Fixed ${matches.length} instances`);
        }
      }

      if (categoryFixes > 0) {
        console.log(`📊 ${category.name}: ${categoryFixes} total fixes`);
        totalFixes += categoryFixes;
      } else {
        console.log(`ℹ️  ${category.name}: No issues found`);
      }
    }

    console.log(`\n🎯 Total systematic fixes applied: ${totalFixes}`);
    return formattedContent;
  }

  validateFormatting(content) {
    const issues = [];
    
    // Check for common formatting problems
    const validationPatterns = [
      { pattern: /\*\*[^*]*\s+\*\*/g, description: 'Bold text with trailing spaces' },
      { pattern: /\*\*\s+[^*]*\*\*/g, description: 'Bold text with leading spaces' },
      { pattern: /^-[A-Z]/gm, description: 'List items missing space after dash' },
      { pattern: /\*\*[^*]+\*\*—/g, description: 'Bold text missing space before dash' },
      { pattern: /^#{1,6}[A-Z]/gm, description: 'Headers missing space after #' }
    ];

    for (const { pattern, description } of validationPatterns) {
      const matches = content.match(pattern) || [];
      if (matches.length > 0) {
        issues.push({
          type: description,
          count: matches.length,
          examples: matches.slice(0, 2)
        });
      }
    }

    return issues;
  }

  async formatAllPosts() {
    const blogDir = path.join(__dirname, '../src/content/blog');
    const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
    
    console.log(`🎯 Applying systematic formatting to ${files.length} blog posts`);
    console.log('📋 This ensures consistent formatting across ALL posts for batch processing');
    
    let formattedCount = 0;
    let totalIssuesFixed = 0;

    for (const file of files) {
      const filePath = path.join(blogDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      console.log(`\n📝 Processing: ${file}`);
      
      // Validate before formatting
      const issuesBefore = this.validateFormatting(content);
      if (issuesBefore.length > 0) {
        console.log(`⚠️  Found ${issuesBefore.length} types of formatting issues`);
      }
      
      // Apply systematic formatting
      const formattedContent = this.applySystematicFormatting(content);
      
      // Validate after formatting
      const issuesAfter = this.validateFormatting(formattedContent);
      
      // Only write if content changed
      if (formattedContent !== content) {
        fs.writeFileSync(filePath, formattedContent, 'utf-8');
        console.log(`✅ Applied systematic formatting: ${file}`);
        formattedCount++;
        
        const issuesResolved = issuesBefore.length - issuesAfter.length;
        totalIssuesFixed += Math.max(0, issuesResolved);
        
        if (issuesAfter.length > 0) {
          console.log(`⚠️  Remaining issues: ${issuesAfter.length} types`);
          issuesAfter.forEach(issue => {
            console.log(`   - ${issue.type}: ${issue.count} instances`);
          });
        } else {
          console.log(`🎉 All formatting issues resolved!`);
        }
      } else {
        console.log(`ℹ️  Already properly formatted: ${file}`);
      }
    }
    
    console.log(`\n🎉 Systematic formatting complete!`);
    console.log(`✅ Formatted ${formattedCount} out of ${files.length} files`);
    console.log(`📊 Total issue types resolved: ${totalIssuesFixed}`);
    console.log(`🚀 ALL posts now have systematic, consistent formatting!`);
    console.log(`🔄 This solution will work for ALL future batch migrations!`);
  }
}

// Main execution
async function main() {
  const formatter = new SystematicMarkdownFormatter();
  await formatter.formatAllPosts();
}

// Run the systematic formatter
try {
  await main();
} catch (error) {
  console.error('❌ Systematic formatting failed:', error);
  process.exit(1);
}

export default SystematicMarkdownFormatter;




