# Complete Netlify Deployment Guide

## 🚀 Quick Start (Recommended)

### Option 1: Using the PowerShell Script (Easiest)

1. **Open PowerShell** in the project directory:
   ```powershell
   cd "Luxury Birthday Experience Design"
   ```

2. **Run the deployment script**:
   ```powershell
   .\deploy.ps1
   ```

3. **First-time setup**:
   - The script will install Netlify CLI if needed
   - Your browser will open for Netlify login
   - Authorize the Netlify CLI
   - The site will be created and deployed automatically

4. **Subsequent deployments**:
   - Just run `.\deploy.ps1` again
   - Your changes will be deployed instantly

---

## 🌐 Option 2: Manual Netlify CLI Deployment

### Step 1: Install Netlify CLI
```powershell
npm install -g netlify-cli
```

### Step 2: Login to Netlify
```powershell
netlify login
```

### Step 3: Initialize and Deploy
```powershell
# First time - this creates a new site
netlify init

# Or deploy directly
netlify deploy --prod
```

---

## 📦 Option 3: Deploy via Netlify Web Interface

### Step 1: Build Your Project Locally
```powershell
npm install
npm run build
```

### Step 2: Deploy via Drag & Drop
1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Deploy manually"
3. Drag and drop the `build` folder
4. Your site will be live in seconds!

---

## 🔗 Option 4: Connect to Git (Continuous Deployment)

### Step 1: Push to GitHub/GitLab
1. Create a repository on GitHub or GitLab
2. Push your code:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

### Step 2: Connect to Netlify
1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose your Git provider
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
   - **Node version**: 20
6. Click "Deploy site"

### Benefits:
- ✅ Automatic deployments on every push
- ✅ Deploy previews for pull requests
- ✅ Rollback to previous versions easily

---

## ⚙️ Configuration Files

### netlify.toml
The project includes a `netlify.toml` file with optimal settings:
- Build command: `npm run build`
- Publish directory: `build`
- SPA redirect rules (for React Router)
- Node.js version: 20

### vite.config.ts
- Output directory: `build`
- Optimized for production builds

---

## 🔍 Troubleshooting

### Build Fails
**Issue**: Dependencies not installing
```powershell
# Clear cache and reinstall
rm -r node_modules
rm package-lock.json
npm install
```

### 404 Errors on Page Refresh
**Solution**: The `netlify.toml` file includes redirect rules to fix this.

### Environment Variables
If you need environment variables:
1. Go to Site settings → Environment variables
2. Add your variables (e.g., API keys)
3. Redeploy

---

## 📊 Post-Deployment

### Custom Domain
1. Go to Site settings → Domain management
2. Add your custom domain
3. Configure DNS settings as instructed

### HTTPS
- Automatically enabled by Netlify
- Free SSL certificate included

### Performance
- Netlify provides global CDN
- Automatic asset optimization
- Gzip compression enabled

---

## 🎯 Deployment Checklist

- [ ] Install dependencies: `npm install`
- [ ] Test build locally: `npm run build`
- [ ] Test the build: `npm run preview` (if available)
- [ ] Commit all changes
- [ ] Run deployment script or manual deploy
- [ ] Verify site is working
- [ ] Set up custom domain (optional)
- [ ] Configure environment variables (if needed)

---

## 📞 Need Help?

- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Support](https://www.netlify.com/support/)
- [Netlify Community](https://answers.netlify.com/)

---

**Happy Deploying! 🎉**