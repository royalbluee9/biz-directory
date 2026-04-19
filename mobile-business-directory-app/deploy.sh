#!/bin/bash

# BizDirectory - Quick Deployment Script
# This script helps you deploy to GitHub quickly

echo "🚀 BizDirectory - GitHub Deployment Helper"
echo "==========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if this is already a git repository
if [ -d .git ]; then
    echo "✅ Git repository already initialized"
else
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
fi

# Check if remote exists
if git remote get-url origin &> /dev/null; then
    echo "✅ Remote origin already configured"
    REMOTE_URL=$(git remote get-url origin)
    echo "   Current remote: $REMOTE_URL"
else
    echo ""
    echo "🔗 Please enter your GitHub repository URL"
    echo "   (e.g., https://github.com/username/repo-name.git)"
    read -p "Repository URL: " REPO_URL
    
    if [ -z "$REPO_URL" ]; then
        echo "❌ No URL provided. Exiting."
        exit 1
    fi
    
    git remote add origin "$REPO_URL"
    echo "✅ Remote origin configured"
fi

# Add all files
echo ""
echo "📝 Adding files to git..."
git add .

# Commit
echo ""
read -p "📋 Enter commit message (or press Enter for default): " COMMIT_MSG
if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="Deploy BizDirectory app"
fi

git commit -m "$COMMIT_MSG"
echo "✅ Files committed"

# Push to GitHub
echo ""
echo "📤 Pushing to GitHub..."
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Go to your GitHub repository"
    echo "2. Click 'Settings' → 'Pages'"
    echo "3. Under 'Source', select 'GitHub Actions'"
    echo "4. Wait for the deployment to complete (check the 'Actions' tab)"
    echo "5. Your app will be live at: https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/"
    echo ""
    echo "🎉 Happy deploying!"
else
    echo ""
    echo "❌ Push failed. Please check the error message above."
    echo ""
    echo "Common solutions:"
    echo "- Make sure the repository URL is correct"
    echo "- Check if you have permission to push to this repository"
    echo "- Verify your GitHub credentials"
fi
