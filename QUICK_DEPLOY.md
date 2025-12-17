# ⚡ Quick Deploy Reference

## 🚀 First Time Setup (5 minutes)

```powershell
# 1. Initialize Git
git init
git add .
git commit -m "Initial commit"

# 2. Create repo on GitHub.com, then:
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main

# 3. Go to Netlify.com
# - Click "Add new site" → "Import from GitHub"
# - Select your repo
# - Click "Deploy"
```

**Done! Your site will be live in 2-5 minutes.**

---

## 🔄 Future Updates (30 seconds)

```powershell
# Make your changes, then:
git add .
git commit -m "Your update message"
git push
```

**Netlify auto-deploys!** ✨

---

## 🎯 Useful Commands

```powershell
# Check status
git status

# See commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main
```

---

## 🌐 Your Site URLs

After deployment:
- **Netlify URL**: `https://your-site-name.netlify.app`
- **Custom domain**: Set up in Netlify dashboard

---

## 📱 Mobile Workflow

Can't access computer? Use GitHub mobile app:
1. Edit files on GitHub.com
2. Commit changes
3. Netlify auto-deploys!

---

**That's it! Simple and fast.** 🎉