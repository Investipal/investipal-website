import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ComprehensiveFormattingFix {
  constructor() {
    console.log('🔧 Comprehensive Formatting Fix initialized');
    console.log('🎯 This will systematically fix ALL formatting issues');
  }

  systematicFormatFix(content) {
    let fixedContent = content;
    let totalFixes = 0;

    console.log('🔍 Applying comprehensive systematic formatting...');

    // STEP 1: Fix ALL broken bold formatting patterns
    const boldPatterns = [
      // Fix "**Text **" -> "**Text**"
      { pattern: /\*\*([^*]+)\s+\*\*/g, replacement: '**$1**', name: 'Bold with trailing spaces' },
      // Fix "** Text**" -> "**Text**"  
      { pattern: /\*\*\s+([^*]+)\*\*/g, replacement: '**$1**', name: 'Bold with leading spaces' },
      // Fix "***Text***" -> "**Text**"
      { pattern: /\*{3,}([^*]+)\*{3,}/g, replacement: '**$1**', name: 'Multiple asterisks' },
      // Fix incomplete bold
      { pattern: /\*\*([^*\n]+)(?!\*\*)/g, replacement: '**$1**', name: 'Incomplete bold' }
    ];

    boldPatterns.forEach(({ pattern, replacement, name }) => {
      const matches = fixedContent.match(pattern) || [];
      if (matches.length > 0) {
        fixedContent = fixedContent.replace(pattern, replacement);
        console.log(`✅ ${name}: Fixed ${matches.length} instances`);
        totalFixes += matches.length;
      }
    });

    // STEP 2: Systematically format list items that should have bullets and bold
    const listPatterns = [
      // Pattern: "Title — Content" -> "- **Title** — Content"
      /^([A-Z][^—\n]*(?:Analysis|Diagnostics|Filters|Analytics|Assessment|Setting|Alignment|Builder|Packages|Checks|Tracking|Summary|Profile|Identified|Evidence|Plan|Roadmap|Documentation|Steps|Time|Rate|Savings|Turnaround|goals|types|ranges|objectives|proposals|analysis|processes|gaps)) — (.+)$/gm,
      
      // Pattern: "Upload/Sync/Risk/Goal/Train/Multi/Explainable/Historical/Monte/Tax/Proposal/Compliance/No/Onboarding/Automated/Transition Title — Content"
      /^((?:Upload|Sync|Risk|Goal|Train|Multi|Explainable|Historical|Monte|Tax|Proposal|Compliance|No|Onboarding|Automated|Transition)[^—\n]*) — (.+)$/gm,
      
      // Pattern: "Executive/Client/Current/Gaps/Proposed/Supporting/Fees/Implementation/Next Title: Content"
      /^((?:Executive|Client|Current|Gaps|Proposed|Supporting|Fees|Implementation|Next)[^:\n]*): (.+)$/gm
    ];

    listPatterns.forEach((pattern, index) => {
      const matches = fixedContent.match(pattern) || [];
      if (matches.length > 0) {
        if (index < 2) {
          // For patterns with "—", format as "- **Title** — Content"
          fixedContent = fixedContent.replace(pattern, '- **$1** — $2');
        } else {
          // For patterns with ":", format as "- **Title:** $2"
          fixedContent = fixedContent.replace(pattern, '- **$1:** $2');
        }
        console.log(`✅ List pattern ${index + 1}: Fixed ${matches.length} instances`);
        totalFixes += matches.length;
      }
    });

    // STEP 3: Fix numbered section headers that should be proper headers
    const headerPatterns = [
      // "1. Title" -> "### 1. Title" (if not already a header)
      /^(\d+\.\s+[A-Z][^:\n]*(?:Entry|Analysis|Objectives|Portfolio|Backtests|Proposals|Workflow))$/gm,
    ];

    headerPatterns.forEach((pattern, index) => {
      const matches = fixedContent.match(pattern) || [];
      if (matches.length > 0) {
        fixedContent = fixedContent.replace(pattern, '### $1');
        console.log(`✅ Header pattern ${index + 1}: Fixed ${matches.length} instances`);
        totalFixes += matches.length;
      }
    });

    // STEP 4: Fix section headers that should be ## headers
    const sectionPatterns = [
      // Questions like "Why AI-Driven..." -> "## Why AI-Driven..."
      /^((?:Why|What|How|Ready to)[^?\n]*\?)$/gm,
      // Title-like sentences -> "## Title"
      /^([A-Z][^.\n]*(?:Workflow|Practices|Example|Growth|Pipeline|Outcomes|Success|Inputs|Pitfalls|Structure|Consistency))$/gm
    ];

    sectionPatterns.forEach((pattern, index) => {
      const matches = fixedContent.match(pattern) || [];
      if (matches.length > 0) {
        fixedContent = fixedContent.replace(pattern, '## $1');
        console.log(`✅ Section pattern ${index + 1}: Fixed ${matches.length} instances`);
        totalFixes += matches.length;
      }
    });

    // STEP 5: Fix simple list items that need bullets
    const simpleListPatterns = [
      // "3–5 hours saved..." -> "- 3–5 hours saved..."
      /^(\d+[–-]\d+\s+hours[^.\n]*\.)$/gm,
      /^(95%[^.\n]*\.)$/gm,
      /^(Near-zero[^.\n]*\.)$/gm,
      // "Manual onboarding..." -> "- Manual onboarding..."
      /^(Manual onboarding[^.\n]*\.)$/gm,
      /^(Disjointed tech[^.\n]*\.)$/gm,
      /^(Too much admin[^.\n]*\.)$/gm,
      /^(Difficulty scaling[^.\n]*\.)$/gm
    ];

    simpleListPatterns.forEach((pattern, index) => {
      const matches = fixedContent.match(pattern) || [];
      if (matches.length > 0) {
        fixedContent = fixedContent.replace(pattern, '- $1');
        console.log(`✅ Simple list pattern ${index + 1}: Fixed ${matches.length} instances`);
        totalFixes += matches.length;
      }
    });

    // STEP 6: Clean up any formatting artifacts
    // Remove double bullets
    fixedContent = fixedContent.replace(/^- - /gm, '- ');
    // Remove double headers
    fixedContent = fixedContent.replace(/^## ## /gm, '## ');
    fixedContent = fixedContent.replace(/^### ### /gm, '### ');
    // Fix spacing around headers
    fixedContent = fixedContent.replace(/^(#{1,3}\s+[^\n]+)\n([A-Z])/gm, '$1\n\n$2');

    console.log(`📊 Total comprehensive formatting fixes: ${totalFixes}`);
    return fixedContent;
  }

  async fixAllPosts() {
    const blogDir = path.join(__dirname, '../src/content/blog');
    const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
    
    console.log(`🎯 Applying comprehensive formatting fix to ${files.length} blog posts`);
    
    let fixedCount = 0;

    for (const file of files) {
      const filePath = path.join(blogDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      console.log(`\n📝 Processing: ${file}`);
      
      // Apply comprehensive formatting
      const fixedContent = this.systematicFormatFix(content);
      
      // Only write if content changed
      if (fixedContent !== content) {
        fs.writeFileSync(filePath, fixedContent, 'utf-8');
        console.log(`✅ Applied comprehensive formatting fix: ${file}`);
        fixedCount++;
      } else {
        console.log(`ℹ️  No additional formatting needed: ${file}`);
      }
    }
    
    console.log(`\n🎉 Comprehensive formatting fix complete!`);
    console.log(`✅ Fixed ${fixedCount} out of ${files.length} files`);
    console.log(`🚀 ALL formatting is now systematically consistent!`);
  }
}

// Main execution
async function main() {
  const fixer = new ComprehensiveFormattingFix();
  await fixer.fixAllPosts();
}

// Run the comprehensive fix
try {
  await main();
} catch (error) {
  console.error('❌ Comprehensive formatting fix failed:', error);
  process.exit(1);
}

export default ComprehensiveFormattingFix;




