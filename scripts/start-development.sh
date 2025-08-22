#!/bin/bash

# Start Development Script
# Ensures you're always starting in the staging branch

echo "🚀 Investipal Development Setup"
echo "=============================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this from the investipal-astro directory"
    exit 1
fi

echo "🔄 Setting up development environment..."

# Fetch latest changes
git fetch origin

# Switch to staging branch
echo "📍 Switching to staging branch..."
git checkout staging

# Pull latest staging changes
echo "⬇️  Pulling latest staging changes..."
git pull origin staging

# Check status
echo ""
echo "✅ Development environment ready!"
echo ""
echo "Current branch: $(git branch --show-current)"
echo "🌐 Staging site: https://red-water-01e2a8910.1.azurestaticapps.net/"
echo "📝 Pages CMS: https://app.pagescms.org/"
echo ""
echo "Next steps:"
echo "1. Make your changes"
echo "2. Test locally with: npm run dev"
echo "3. Commit and push to staging"
echo "4. Review on staging site"
echo "5. Only promote to production when explicitly instructed"
echo ""
echo "🚀 Happy coding!"

