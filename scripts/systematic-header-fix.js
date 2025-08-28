import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SystematicHeaderFix {
  constructor() {
    console.log('🔧 Systematic Header Fix Tool initialized');
    
    // Define ALL possible header patterns systematically
    this.headerPatterns = [
      // Pattern 1: Standalone sentences that should be headers (common titles)
      {
        name: 'Standalone Title Sentences',
        regex: /^([A-Z][^.!?]*(?:Example|Benefits?|Practices?|Guide|Overview|Summary|Introduction|Conclusion|Pipeline|Workflow|Analysis|Strategy|Solution|Approach|Method|Process|Tips?|Steps?|Requirements?|Objectives?|Goals?|Outcomes?|Results?|Insights?|Recommendations?|Best Practices?|Common (?:Pitfalls?|Mistakes?)|Key (?:Points?|Takeaways?|Insights?)|What (?:to|Sets)|How (?:to|It)|Why (?:It|This)|When (?:to|You)|Where (?:to|You)))(?:\?)?$/,
        action: 'makeHeader',
        level: 2
      },
      
      // Pattern 2: "Before/After X:" patterns
      {
        name: 'Before/After Patterns',
        regex: /^(Before|After)\s+([A-Z][^:]+):\s*(.+)/,
        action: 'splitBeforeAfter'
      },
      
      // Pattern 3: "Ready to X?" questions
      {
        name: 'Ready Questions',
        regex: /^(Ready to [^?]+\?)(.*)/,
        action: 'splitQuestion'
      },
      
      // Pattern 4: Numbered headers with merged content after dash
      {
        name: 'Numbered Headers with Dash',
        regex: /^((?:### )?\d+\. [^-]+)[-–]\s*(.+)/,
        action: 'splitNumberedHeader'
      },
      
      // Pattern 5: Empty numbered headers
      {
        name: 'Empty Numbered Headers',
        regex: /^((?:### )?\d+\.)\s*$/,
        action: 'fixEmptyNumbered'
      },
      
      // Pattern 6: Headers that got split across lines
      {
        name: 'Split Headers',
        regex: /^(### \d+\. [A-Z][^-]*[-–])\s*$/,
        action: 'combineWithNext'
      },
      
      // Pattern 7: Sentences that should be headers (ending with specific words)
      {
        name: 'Title-like Sentences',
        regex: /^([A-Z][^.]*(?:Success|Failure|Growth|Scale|Efficiency|Automation|Personalization|Optimization|Integration|Implementation|Transformation|Innovation|Evolution|Revolution|Solution|Platform|System|Technology|Framework|Architecture|Infrastructure|Methodology|Strategy|Approach|Process|Workflow|Pipeline|Journey|Experience|Advantage|Benefits?|Features?|Capabilities?|Functionality|Performance|Quality|Excellence|Leadership|Partnership|Collaboration|Communication|Engagement|Satisfaction|Retention|Acquisition|Conversion|Revenue|Profitability|ROI|Value|Impact|Outcomes?|Results?|Insights?|Analytics?|Intelligence|Data|Information|Knowledge|Expertise|Skills?|Competenc(?:y|ies)|Qualifications?|Certifications?|Standards?|Compliance|Regulations?|Requirements?|Specifications?|Guidelines?|Policies?|Procedures?|Best Practices?|Recommendations?|Suggestions?|Tips?|Advice|Guidance|Support|Assistance|Help|Service|Solutions?|Tools?|Resources?|Assets?|Investments?|Portfolio|Management|Administration|Operations?|Execution|Delivery|Implementation|Deployment|Launch|Release|Update|Upgrade|Enhancement|Improvement|Optimization|Refinement|Customization|Configuration|Setup|Installation|Integration|Migration|Transition|Transformation|Change|Evolution|Development|Progress|Advancement|Achievement|Accomplishment|Success|Victory|Win|Triumph|Breakthrough|Discovery|Innovation|Creation|Generation|Production|Manufacturing|Construction|Building|Design|Planning|Strategy|Vision|Mission|Goals?|Objectives?|Targets?|Milestones?|Deadlines?|Timelines?|Schedules?|Calendars?|Events?|Activities?|Tasks?|Actions?|Steps?|Phases?|Stages?|Levels?|Tiers?|Categories?|Types?|Kinds?|Varieties?|Options?|Choices?|Alternatives?|Possibilities?|Opportunities?|Prospects?|Potential|Capacity|Capability|Ability|Power|Strength|Force|Energy|Drive|Motivation|Inspiration|Passion|Enthusiasm|Commitment|Dedication|Loyalty|Trust|Confidence|Reliability|Dependability|Consistency|Stability|Security|Safety|Protection|Privacy|Confidentiality|Integrity|Honesty|Transparency|Openness|Clarity|Simplicity|Ease|Convenience|Comfort|Satisfaction|Happiness|Joy|Pleasure|Delight|Excitement|Thrill|Adventure|Challenge|Opportunity|Chance|Luck|Fortune|Destiny|Future|Tomorrow|Today|Now|Present|Current|Latest|Recent|New|Fresh|Modern|Contemporary|Advanced|Sophisticated|Complex|Simple|Basic|Fundamental|Essential|Critical|Important|Significant|Major|Minor|Small|Large|Big|Huge|Massive|Enormous|Tiny|Micro|Mini|Compact|Portable|Mobile|Flexible|Adaptable|Scalable|Expandable|Extensible|Modular|Integrated|Comprehensive|Complete|Full|Partial|Limited|Restricted|Exclusive|Inclusive|Universal|Global|International|National|Regional|Local|Personal|Individual|Custom|Tailored|Personalized|Specialized|General|Broad|Wide|Narrow|Focused|Targeted|Specific|Detailed|Precise|Accurate|Exact|Perfect|Ideal|Optimal|Best|Top|Leading|Premier|Primary|Main|Central|Core|Key|Essential|Vital|Crucial|Critical|Important|Significant|Relevant|Applicable|Suitable|Appropriate|Right|Correct|Proper|Good|Great|Excellent|Outstanding|Exceptional|Remarkable|Amazing|Incredible|Fantastic|Wonderful|Marvelous|Superb|Superior|Premium|High-quality|Professional|Expert|Skilled|Experienced|Qualified|Certified|Authorized|Approved|Verified|Validated|Tested|Proven|Reliable|Trustworthy|Credible|Authentic|Genuine|Real|True|Honest|Transparent|Open|Clear|Simple|Easy|Convenient|Fast|Quick|Rapid|Swift|Immediate|Instant|Real-time|Live|Dynamic|Interactive|Engaging|Compelling|Attractive|Appealing|Interesting|Exciting|Innovative|Creative|Original|Unique|Distinctive|Special|Exclusive|Premium|Luxury|Elite|Professional|Corporate|Business|Commercial|Industrial|Technical|Scientific|Academic|Educational|Training|Learning|Development|Growth|Progress|Improvement|Enhancement|Optimization|Efficiency|Effectiveness|Productivity|Performance|Quality|Excellence|Success))(?:\?)?$/,
        action: 'makeHeader',
        level: 2
      }
    ];
  }

  applyPattern(line, nextLine, pattern, lineIndex) {
    const match = line.match(pattern.regex);
    if (!match) return null;

    switch (pattern.action) {
      case 'makeHeader':
        console.log(`✅ ${pattern.name}: "${match[1].trim()}"`);
        return {
          lines: [`## ${match[1].trim()}`],
          skipNext: 0
        };

      case 'splitBeforeAfter':
        console.log(`✅ ${pattern.name}: "${match[1]} ${match[2]}"`);
        return {
          lines: [
            `**${match[1]} ${match[2]}:** ${match[3].trim()}`
          ],
          skipNext: 0
        };

      case 'splitQuestion':
        console.log(`✅ ${pattern.name}: "${match[1]}"`);
        const result = [`## ${match[1]}`];
        if (match[2] && match[2].trim()) {
          result.push('', match[2].trim());
        }
        return {
          lines: result,
          skipNext: 0
        };

      case 'splitNumberedHeader':
        const headerPart = match[1].trim();
        const contentPart = match[2].trim();
        const formattedHeader = headerPart.startsWith('###') ? headerPart : `### ${headerPart}`;
        
        console.log(`✅ ${pattern.name}: "${formattedHeader}"`);
        return {
          lines: [formattedHeader, '', contentPart],
          skipNext: 0
        };

      case 'fixEmptyNumbered':
        if (nextLine && nextLine.trim()) {
          const baseNumber = match[1].trim().replace('###', '').trim();
          
          // Check if next line has dash pattern
          const dashMatch = nextLine.match(/^([A-Z][^-]*)[-–]\s*(.+)/);
          if (dashMatch) {
            const headerTitle = dashMatch[1].trim();
            const headerContent = dashMatch[2].trim();
            const formattedHeader = `### ${baseNumber} ${headerTitle}`;
            
            console.log(`✅ ${pattern.name}: "${formattedHeader}"`);
            return {
              lines: [formattedHeader, '', headerContent],
              skipNext: 1
            };
          } else {
            const formattedHeader = `### ${baseNumber} ${nextLine.trim()}`;
            console.log(`✅ ${pattern.name}: "${formattedHeader}"`);
            return {
              lines: [formattedHeader],
              skipNext: 1
            };
          }
        }
        break;

      case 'combineWithNext':
        if (nextLine && nextLine.trim() && !nextLine.startsWith('#')) {
          console.log(`✅ ${pattern.name}: "${match[1]}${nextLine.trim()}"`);
          return {
            lines: [`${match[1]}${nextLine.trim()}`],
            skipNext: 1
          };
        }
        break;
    }

    return null;
  }

  systematicHeaderFix(content) {
    const lines = content.split('\n');
    const fixedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const nextLine = i + 1 < lines.length ? lines[i + 1] : null;
      
      // Skip frontmatter and existing headers
      if (line.startsWith('---') || line.startsWith('#')) {
        fixedLines.push(line);
        continue;
      }
      
      // Skip empty lines and list items
      if (!line.trim() || line.startsWith('-') || line.startsWith('*') || line.startsWith('**')) {
        fixedLines.push(line);
        continue;
      }
      
      // Apply patterns systematically
      let patternApplied = false;
      
      for (const pattern of this.headerPatterns) {
        const result = this.applyPattern(line, nextLine, pattern, i);
        if (result) {
          fixedLines.push(...result.lines);
          i += result.skipNext; // Skip processed lines
          patternApplied = true;
          break;
        }
      }
      
      // If no pattern matched, keep the line as is
      if (!patternApplied) {
        fixedLines.push(line);
      }
    }
    
    return fixedLines.join('\n');
  }

  async fixAllPosts() {
    const blogDir = path.join(__dirname, '../src/content/blog');
    const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
    
    console.log(`🎯 Found ${files.length} blog posts to systematically fix`);
    
    let fixedCount = 0;
    
    for (const file of files) {
      const filePath = path.join(blogDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      console.log(`\n📝 Processing: ${file}`);
      
      const fixedContent = this.systematicHeaderFix(content);
      
      // Only write if content changed
      if (fixedContent !== content) {
        fs.writeFileSync(filePath, fixedContent, 'utf-8');
        console.log(`✅ Systematically fixed: ${file}`);
        fixedCount++;
      } else {
        console.log(`ℹ️  No changes needed: ${file}`);
      }
    }
    
    console.log(`\n🎉 Systematic header fixing complete!`);
    console.log(`✅ Fixed ${fixedCount} out of ${files.length} files`);
  }
}

// Main execution
async function main() {
  const fixer = new SystematicHeaderFix();
  await fixer.fixAllPosts();
}

// Run the systematic fix
try {
  await main();
} catch (error) {
  console.error('❌ Systematic fix failed:', error);
  process.exit(1);
}

export default SystematicHeaderFix;
