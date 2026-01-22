# 🚀 GitHub + Railway Deployment Guide

## 📋 Prerequisites

- Git installed
- GitHub account
- Railway CLI installed: `npm install -g @railway/cli`
- Railway account (free tier)

---

## 🎯 STEP 1: Get Source Code

### From Dazl Platform:
1. Click **"Code"** button (top-right toolbar)
2. Click **"Export Project"**
3. Download the `.zip` file
4. Extract to a folder (e.g., `sheerid-automation`)
5. Open terminal in that folder

---

## 🎯 STEP 2: Initialize Git & Push to GitHub

```bash
# Navigate to project folder
cd sheerid-automation  # hoặc tên folder bạn extract

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: SheerID Automation App"

# Create GitHub repo:
# 1. Go to https://github.com/new
# 2. Repository name: sheerid-automation (hoặc tên khác)
# 3. Choose "Private" (recommended)
# 4. DO NOT check "Add README" (already exists)
# 5. Click "Create repository"

# Link to your GitHub repo (replace YOUR_USERNAME and REPO_NAME):
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push code
git branch -M main
git push -u origin main
```

---

## 🎯 STEP 3: Deploy to Railway

```bash
# Login to Railway
railway login

# Link project to Railway
railway link

# When prompted, select:
# - "Create new project" OR select existing project
# - "Deploy from GitHub repo"
# - Select your repo: YOUR_USERNAME/REPO_NAME

# Deploy!
railway up

# View deployment logs
railway logs -f
```

---

## 🎯 STEP 4: Set Environment Variables (IMPORTANT!)

Railway Dashboard:
1. Go to https://railway.app/dashboard
2. Select your project
3. Click "Variables" tab
4. Add these variables:

```
SHEERID_ACCESS_TOKEN=your_sheerid_token_here
SHEERID_PROGRAM_ID=your_program_id_here
NODE_ENV=production
```

**Get your SheerID credentials:**
- Login to https://developer.sheerid.com
- Navigate to your program
- Copy Access Token and Program ID

---

## ✅ STEP 5: Verify Deployment

1. Railway will give you a URL (e.g., `https://your-app.railway.app`)
2. Open the URL
3. Paste a real SheerID verification link:
   ```
   https://services.sheerid.com/verify/67c8c14f5f17a83b745e3f82/?verificationId=69723f2f11d51d3e6baa6de8
   ```
4. Click "Submit"
5. Watch the automation run! 🎉

---

## 🔄 Future Updates

After initial setup, deploying updates is easy:

```bash
# Make your changes
git add .
git commit -m "Your update message"
git push

# Railway automatically deploys! No need to run 'railway up' again
```

---

## 🐛 Troubleshooting

### Issue: Git not initialized
```bash
git init
```

### Issue: Remote already exists
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

### Issue: Railway CLI not found
```bash
npm install -g @railway/cli
railway login
```

### Issue: Chrome/Puppeteer errors
- ✅ Already handled by Railway's `nixpacks.toml` config
- Railway automatically installs x64 Chrome
- No action needed!

### Issue: Deployment fails
```bash
# Check logs
railway logs

# Check environment variables
railway variables

# Restart deployment
railway up --detach
```

---

## 📚 Useful Commands

```bash
# View logs
railway logs -f

# View environment variables
railway variables

# Open Railway dashboard
railway open

# Check deployment status
railway status

# Unlink project
railway unlink

# Redeploy
railway up
```

---

## 🎊 Success Indicators

✅ Railway deployment successful
✅ URL accessible: `https://your-app.railway.app`
✅ Form loads correctly
✅ Chrome browser launches
✅ Automation completes verification

---

## 📞 Support

If you encounter issues:
1. Check Railway logs: `railway logs`
2. Verify environment variables are set
3. Ensure SheerID credentials are valid
4. Check that GitHub repo is up to date

---

**Ready to deploy! 🚀**
