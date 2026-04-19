# 🚀 Deployment Guide - BizDirectory

This guide will walk you through deploying your BizDirectory app to GitHub Pages.

## Prerequisites

- Git installed on your computer
- A GitHub account
- Node.js and npm installed (for local testing)

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Name your repository (e.g., `biz-directory` or `business-directory-app`)
5. Choose **Public** or **Private** (Pages works with both)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these files)
7. Click **"Create repository"**

## Step 2: Initialize Git and Push to GitHub

Open your terminal in the project directory and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit: BizDirectory mobile app with chat feature"

# Add your GitHub repository as remote (replace with your repository URL)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace** `YOUR-USERNAME` and `YOUR-REPO-NAME` with your actual GitHub username and repository name.

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **"Settings"** tab
3. Click on **"Pages"** in the left sidebar
4. Under **"Source"**, select **"GitHub Actions"**
5. The deployment will start automatically!

## Step 4: Wait for Deployment

1. Go to the **"Actions"** tab in your repository
2. You'll see a workflow running called **"Deploy to GitHub Pages"**
3. Wait for it to complete (usually takes 1-2 minutes)
4. Once complete, your site will be live!

## Step 5: Access Your Deployed App

Your app will be available at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

For example:
- If username is `johndoe` and repo is `biz-directory`
- URL would be: `https://johndoe.github.io/biz-directory/`

## Automatic Deployments

Every time you push changes to the `main` branch, GitHub Actions will automatically rebuild and deploy your app!

To push updates:
```bash
git add .
git commit -m "Description of your changes"
git push
```

## Custom Domain (Optional)

If you want to use a custom domain:

1. Go to repository **Settings** → **Pages**
2. Under **"Custom domain"**, enter your domain (e.g., `bizdirectory.com`)
3. Add the following DNS records at your domain registrar:
   - Type: `A`, Host: `@`, Value: `185.199.108.153`
   - Type: `A`, Host: `@`, Value: `185.199.109.153`
   - Type: `A`, Host: `@`, Value: `185.199.110.153`
   - Type: `A`, Host: `@`, Value: `185.199.111.153`
4. For `www` subdomain, add:
   - Type: `CNAME`, Host: `www`, Value: `YOUR-USERNAME.github.io`

## Troubleshooting

### Deployment Failed
- Check the **Actions** tab for error messages
- Ensure all dependencies are in `package.json`
- Try running `npm install` and `npm run build` locally first

### Page Shows 404
- Wait a few minutes after first deployment
- Check that GitHub Pages is enabled in Settings
- Verify the repository is not empty
- Check that the workflow completed successfully

### Changes Not Showing
- Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Wait a few minutes for CDN to update
- Check the Actions tab to ensure deployment completed

## Alternative Deployment Options

### Netlify
1. Sign up at [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click "Deploy site"

### Vercel
1. Sign up at [Vercel](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Framework preset: Vite
5. Click "Deploy"

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## Environment Variables (If Needed)

If you need to add environment variables:

1. Create a `.env` file locally (already in `.gitignore`)
2. For GitHub Pages, add secrets in **Settings** → **Secrets and variables** → **Actions**
3. Update the workflow file to use secrets:
   ```yaml
   - name: Build
     run: npm run build
     env:
       VITE_API_KEY: ${{ secrets.VITE_API_KEY }}
   ```

## Support

If you encounter any issues:
1. Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
2. Review the Actions logs for detailed error messages
3. Ensure your `package.json` has all required dependencies

---

**Congratulations! Your BizDirectory app is now live! 🎉**

Share your deployed URL with others to let them start adding their businesses!
