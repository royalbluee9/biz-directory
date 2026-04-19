# 🚀 GitHub Deployment - Quick Start

## 3-Minute Deployment Guide

### Step 1: Create GitHub Repository (1 min)
1. Go to https://github.com/new
2. Repository name: `biz-directory` (or any name you prefer)
3. Choose Public or Private
4. **Don't** check any initialization options
5. Click "Create repository"

### Step 2: Deploy Your Code (1 min)

**Copy the repository URL** from GitHub (looks like: `https://github.com/username/biz-directory.git`)

Then run ONE of these options:

#### Option A: Automated Script (Easiest)

**Mac/Linux:**
```bash
chmod +x deploy.sh
./deploy.sh
```

**Windows:**
```bash
deploy.bat
```

#### Option B: Manual Commands

```bash
git init
git add .
git commit -m "Initial commit: BizDirectory app"
git remote add origin YOUR_REPO_URL_HERE
git push -u origin main
```

### Step 3: Enable GitHub Pages (1 min)
1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**, select **"GitHub Actions"**
5. Done! ✅

### Step 4: View Your Live App
1. Go to **Actions** tab
2. Wait for green checkmark (~2 minutes)
3. Your app is now live at:
   ```
   https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
   ```

---

## Common Issues & Solutions

### ❌ "git: command not found"
**Solution:** Install Git from https://git-scm.com/downloads

### ❌ "Permission denied (publickey)"
**Solutions:**
- Use HTTPS URL instead of SSH: `https://github.com/username/repo.git`
- Or set up SSH keys: https://docs.github.com/en/authentication

### ❌ "Repository not found"
**Solutions:**
- Check the repository URL is correct
- Ensure you have access to the repository
- Use your GitHub username, not display name

### ❌ Page shows 404
**Solutions:**
- Wait 2-3 minutes after first deployment
- Check Actions tab for deployment status
- Verify GitHub Pages is set to "GitHub Actions"
- Clear browser cache (Ctrl+Shift+R)

---

## Updating Your Live App

After making changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

Your site will automatically rebuild and update! 🎉

---

## Need More Help?

- **Full Guide:** See [DEPLOYMENT.md](DEPLOYMENT.md)
- **GitHub Pages Docs:** https://pages.github.com
- **Git Basics:** https://git-scm.com/book/en/v2

---

**That's it! Your BizDirectory app is now live on the internet! 🌐**
