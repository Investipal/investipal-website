#!/bin/bash

# Deploy to Production Script
# Only use this when explicitly instructed to promote staging to production

echo "🚀 Investipal Production Deployment"
echo "=================================="
echo ""
echo "⚠️  WARNING: This will deploy to PRODUCTION site!"
echo "    https://polite-sea-03d4d3510.1.azurestaticapps.net/"
echo ""
echo "Make sure you have:"
echo "✅ Tested changes on staging: https://red-water-01e2a8910.1.azurestaticapps.net/"
echo "✅ Reviewed with team"
echo "✅ Confirmed this is ready for live users"
echo ""

read -p "Are you sure you want to deploy to production? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

echo ""
echo "🔄 Deploying staging to production..."

# Switch to main branch
git checkout main
git pull origin main

# Merge staging into main
git merge staging

if [ $? -eq 0 ]; then
    echo "✅ Staging merged successfully"
    
    # Push to production
    git push origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 Successfully deployed to production!"
        echo "🌐 Live site: https://polite-sea-03d4d3510.1.azurestaticapps.net/"
        echo ""
        echo "Next steps:"
        echo "1. Verify changes on production site"
        echo "2. Monitor for any issues"
        echo "3. Switch back to staging for next development"
        echo ""
        
        # Switch back to staging
        git checkout staging
        echo "🔄 Switched back to staging branch for continued development"
    else
        echo "❌ Failed to push to production"
        exit 1
    fi
else
    echo "❌ Failed to merge staging into main"
    echo "Please resolve conflicts and try again"
    exit 1
fi
