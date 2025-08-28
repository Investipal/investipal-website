import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class TargetedFormatFix {
  constructor() {
    console.log('🔧 Targeted Format Fix initialized');
    console.log('🎯 Fixing specific formatting issues systematically');
  }

  fixSpecificIssues(content) {
    let fixedContent = content;
    let fixes = 0;

    console.log('🔍 Applying targeted fixes...');

    // Fix the specific jumbled line issue
    const jumbledPattern = /### 2\. Instant Portfolio X-Ray & Gap Analysis\*\*-\*\*Concentration.*?more\./;
    if (jumbledPattern.test(fixedContent)) {
      const replacement = `### 2. Instant Portfolio X-Ray & Gap Analysis

- **Concentration & Correlation Analysis** — AI highlights overweight sectors, individual securities, and correlated clusters that drive unnecessary risk.
- **Cost Diagnostics** — Surface advisory fees and fund costs, and analyze performance on a gross and net basis.
- **Tax Filters** — Identify asset location issues, tax drag, and transition costs upfront.
- **Advanced Analytics** — Get 25+ risk/return metrics like Sharpe Ratio, drawdown, volatility, Value-at-Risk (VAR), and more.`;

      fixedContent = fixedContent.replace(jumbledPattern, replacement);
      console.log('✅ Fixed jumbled section 2 content');
      fixes++;
    }

    // Fix any remaining **text ** patterns (bold with trailing space)
    const trailingSpacePattern = /\*\*([^*]+)\s+\*\*/g;
    const trailingMatches = fixedContent.match(trailingSpacePattern);
    if (trailingMatches) {
      fixedContent = fixedContent.replace(trailingSpacePattern, '**$1**');
      console.log(`✅ Fixed ${trailingMatches.length} bold trailing space issues`);
      fixes += trailingMatches.length;
    }

    // Fix any ** text** patterns (bold with leading space)
    const leadingSpacePattern = /\*\*\s+([^*]+)\*\*/g;
    const leadingMatches = fixedContent.match(leadingSpacePattern);
    if (leadingMatches) {
      fixedContent = fixedContent.replace(leadingSpacePattern, '**$1**');
      console.log(`✅ Fixed ${leadingMatches.length} bold leading space issues`);
      fixes += leadingMatches.length;
    }

    // Fix broken list items that should have proper formatting
    const brokenListPattern = /^([A-Z][^—\n]*) — (.+)$/gm;
    const listMatches = fixedContent.match(brokenListPattern);
    if (listMatches) {
      fixedContent = fixedContent.replace(brokenListPattern, '- **$1** — $2');
      console.log(`✅ Fixed ${listMatches.length} list formatting issues`);
      fixes += listMatches.length;
    }

    console.log(`📊 Total targeted fixes applied: ${fixes}`);
    return fixedContent;
  }

  async fixTargetedFile() {
    const filePath = path.join(__dirname, '../src/content/blog/how-to-use-ai-for-personalized-investment-proposal-generation-a-practical-guide.md');
    
    console.log('🎯 Applying targeted fix to the problematic file');
    
    const content = fs.readFileSync(filePath, 'utf-8');
    console.log('📝 Current content length:', content.length);
    
    const fixedContent = this.fixSpecificIssues(content);
    
    if (fixedContent !== content) {
      fs.writeFileSync(filePath, fixedContent, 'utf-8');
      console.log('✅ Applied targeted fixes successfully');
    } else {
      console.log('ℹ️  No changes needed');
    }
    
    console.log('🎉 Targeted fix complete!');
  }
}

// Main execution
async function main() {
  const fixer = new TargetedFormatFix();
  await fixer.fixTargetedFile();
}

// Run the targeted fix
try {
  await main();
} catch (error) {
  console.error('❌ Targeted fix failed:', error);
  process.exit(1);
}

export default TargetedFormatFix;




