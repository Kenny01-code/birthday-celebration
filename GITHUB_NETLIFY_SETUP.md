# 🚀 Deploy to Netlify via GitHub (Recommended)

This method enables automatic deployments whenever you push to GitHub!

## 📋 Step-by-Step Guide

### Step 1: Initialize Git Repository

Open PowerShell in your project directory and run:

```powershell
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Luxury Birthday Experience"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository:
   - **Name**: `luxury-birthday-experience` (or any name you prefer)
   - **Visibility**: Public or Private (your choice)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
3. Click "Create repository"

### Step 3: Push to GitHub

GitHub will show you commands. Use these:

```powershell
# Add GitHub as remote origin
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace** `YOUR-USERNAME` and `YOUR-REPO-NAME` with your actual GitHub username and repository name.

### Step 4: Connect to Netlify

1. Go to [Netlify](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Click **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub account
5. Select your repository from the list
6. Configure build settings (should auto-detect from netlify.toml):
   - **Branch to deploy**: `main`
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
   - **Node version**: Will use 20 from netlify.toml
7. Click **"Deploy site"**

### Step 5: Wait for Deployment

- Netlify will build and deploy your site
- First deployment takes 2-5 minutes
- You'll get a URL like: `https://random-name-123456.netlify.app`

### Step 6: Customize Site Name (Optional)

1. Go to **Site settings** → **Site details**
2. Click **"Change site name"**
3. Enter your preferred name: `gracia-birthday-celebration`
4. Your URL becomes: `https://gracia-birthday-celebration.netlify.app`

---

## 🎯 Benefits of GitHub + Netlify

✅ **Automatic Deployments**: Push to GitHub → Auto-deploy to Netlify
✅ **Deploy Previews**: Test changes before merging
✅ **Version Control**: Easy rollback to previous versions
✅ **Collaboration**: Share code with team members
✅ **Free Hosting**: Both GitHub and Netlify are free for personal projects

---

## 🔄 Future Updates

Whenever you make changes:

```powershell
# Make your changes to the code
# Then commit and push:

git add .
git commit -m "Description of your changes"
git push
```

Netlify will automatically detect the push and redeploy! 🎉

---

## 🌿 Working with Branches (Optional)

For testing before going live:

```powershell
# Create a development branch
git checkout -b development

# Make changes and commit
git add .
git commit -m "Testing new feature"
git push -u origin development
```

Netlify will create a **deploy preview** for this branch automatically!

---

## ⚙️ Environment Variables (If Needed)

If you need to add API keys or secrets:

1. Go to **Site settings** → **Environment variables**
2. Click **"Add a variable"**
3. Add your key-value pairs
4. These won't be in your GitHub repo (secure!)

---

## 🔧 Troubleshooting

### "Git is not recognized"
Install Git: [https://git-scm.com/download/win](https://git-scm.com/download/win)

### "Permission denied (publickey)"
Use HTTPS instead of SSH, or set up SSH keys:
```powershell
git remote set-url origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
```

### Build fails on Netlify
Check the build logs in Netlify dashboard. Common issues:
- Missing dependencies → Check package.json
- Node version mismatch → netlify.toml specifies Node 20

---

## 📊 What's Included

Your project already has:
- ✅ `.gitignore` - Excludes node_modules, build files, etc.
- ✅ `netlify.toml` - Build configuration
- ✅ Proper build scripts in package.json

---

## 🎉 You're All Set!

After setup, your workflow is simple:
1. Make changes to your code
2. Commit: `git commit -m "message"`
3. Push: `git push`
4. Netlify automatically deploys! ✨

**Your site will be live at**: `https://your-site-name.netlify.app`

---

## 📞 Need Help?

- [GitHub Docs](https://docs.github.com/)
- [Netlify Docs](https://docs.netlify.com/)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)