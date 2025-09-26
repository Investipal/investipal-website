#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class FinalBatchWorkflow {
  constructor() {
    console.log('🚀 Final Batch Migration Workflow initialized');
    console.log('📋 This runs the complete SYSTEMATIC migration process');
  }

  runCommand(command, description) {
    console.log(`\n🔄 ${description}...`);
    console.log(`📝 Running: ${command}`);
    
    try {
      const output = execSync(command, { 
        cwd: path.dirname(__dirname),
        encoding: 'utf-8',
        stdio: 'inherit'
      });
      console.log(`✅ ${description} completed successfully`);
      return true;
    } catch (error) {
      console.error(`❌ ${description} failed:`, error.message);
      return false;
    }
  }

  async runFullBatchMigration() {
    console.log('\n🎯 Starting COMPLETE SYSTEMATIC BATCH MIGRATION');
    console.log('=' .repeat(70));
    
    const steps = [
      {
        command: 'node scripts/csv-preprocessor.js',
        description: 'Step 1: Preprocess CSV (Clean HTML structure)',
        required: true
      },
      {
        command: 'node scripts/webflow-to-astro-migration.js',
        description: 'Step 2: Migrate all posts (HTML to Markdown)',
        required: true
      },
      {
        command: 'node scripts/systematic-post-processor.js',
        description: 'Step 3: Systematic post-processing (Fix headers)',
        required: true
      },
      {
        command: 'node scripts/systematic-bold-fix.js',
        description: 'Step 4: Systematic bold formatting fix',
        required: true
      },
      {
        command: 'node scripts/systematic-list-fix.js',
        description: 'Step 5: Systematic list formatting fix',
        required: true
      },
      {
        command: 'node scripts/systematic-markdown-formatter.js',
        description: 'Step 6: Final systematic markdown formatting',
        required: true
      }
    ];

    let allSuccessful = true;

    for (const step of steps) {
      const success = this.runCommand(step.command, step.description);
      
      if (!success && step.required) {
        console.error(`\n❌ CRITICAL FAILURE: ${step.description}`);
        console.error('🛑 Batch migration workflow stopped');
        process.exit(1);
      }
      
      if (!success) {
        allSuccessful = false;
      }
    }

    console.log('\n' + '='.repeat(70));
    
    if (allSuccessful) {
      console.log('🎉 COMPLETE SYSTEMATIC BATCH MIGRATION SUCCESSFUL!');
      console.log('✅ All blog posts have been systematically migrated');
      console.log('🚀 Ready for production deployment');
    } else {
      console.log('⚠️  Batch migration completed with some warnings');
      console.log('📋 Check the output above for details');
    }
    
    console.log('\n📊 Complete Migration Summary:');
    console.log('   • CSV preprocessing: ✅ Completed');
    console.log('   • HTML to Markdown: ✅ Completed'); 
    console.log('   • Header formatting: ✅ Systematized');
    console.log('   • Bold formatting: ✅ Systematized');
    console.log('   • List formatting: ✅ Systematized');
    console.log('   • Final formatting: ✅ Systematized');
    console.log('   • ALL FORMATTING: ✅ Systematized for batch processing');
  }

  async runPilotMigration() {
    console.log('\n🧪 Starting COMPLETE SYSTEMATIC PILOT MIGRATION');
    console.log('=' .repeat(70));
    
    const steps = [
      {
        command: 'node scripts/csv-preprocessor.js --pilot',
        description: 'Step 1: Preprocess pilot CSV',
        required: true
      },
      {
        command: 'node scripts/webflow-to-astro-migration.js --pilot',
        description: 'Step 2: Migrate pilot posts',
        required: true
      },
      {
        command: 'node scripts/systematic-post-processor.js',
        description: 'Step 3: Systematic post-processing',
        required: true
      },
      {
        command: 'node scripts/systematic-bold-fix.js',
        description: 'Step 4: Systematic bold formatting fix',
        required: true
      },
      {
        command: 'node scripts/systematic-list-fix.js',
        description: 'Step 5: Systematic list formatting fix',
        required: true
      },
      {
        command: 'node scripts/systematic-markdown-formatter.js',
        description: 'Step 6: Final systematic markdown formatting',
        required: true
      }
    ];

    let allSuccessful = true;

    for (const step of steps) {
      const success = this.runCommand(step.command, step.description);
      
      if (!success && step.required) {
        console.error(`\n❌ CRITICAL FAILURE: ${step.description}`);
        console.error('🛑 Pilot migration workflow stopped');
        process.exit(1);
      }
      
      if (!success) {
        allSuccessful = false;
      }
    }

    console.log('\n' + '='.repeat(70));
    
    if (allSuccessful) {
      console.log('🎉 COMPLETE SYSTEMATIC PILOT MIGRATION SUCCESSFUL!');
      console.log('✅ Pilot posts have been systematically migrated');
      console.log('🚀 Ready to run full batch migration');
    }
  }
}

// Main execution
async function main() {
  const workflow = new FinalBatchWorkflow();
  
  // Check command line arguments
  const args = process.argv.slice(2);
  
  if (args.includes('--pilot')) {
    await workflow.runPilotMigration();
  } else if (args.includes('--full')) {
    await workflow.runFullBatchMigration();
  } else {
    console.log('\n📋 Complete Systematic Batch Migration Workflow');
    console.log('Usage:');
    console.log('  node scripts/final-batch-workflow.js --pilot   # Run complete pilot migration');
    console.log('  node scripts/final-batch-workflow.js --full    # Run complete batch migration');
    console.log('\n🎯 This workflow systematically fixes ALL formatting issues:');
    console.log('   • Headers, bold text, lists, spacing, structure');
    console.log('   • Works for current posts AND all future batches');
    console.log('   • Ensures consistent formatting across ALL posts');
  }
}

// Run the workflow
main().catch(error => {
  console.error('❌ Workflow failed:', error);
  process.exit(1);
});





