# 🚀 Railway Deployment Guide - SheerID Automation

## 📋 Prerequisites

1. **GitHub Account** (để connect với Railway)
2. **Railway Account** - Sign up tại: https://railway.app
3. **SheerID API Key** (optional - nếu dùng API thay vì browser automation)

---

## 🎯 Step 1: Prepare Code

### Push code lên GitHub:

```bash
git init
git add .
git commit -m "Initial commit - SheerID Automation"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

---

## 🚂 Step 2: Deploy to Railway

### Option A: Deploy từ GitHub (Recommended)

1. **Đăng nhập Railway**: https://railway.app
2. Click **"New Project"**
3. Chọn **"Deploy from GitHub repo"**
4. Select repository của bạn
5. Railway sẽ tự động detect và deploy!

### Option B: Deploy bằng Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

---

## ⚙️ Step 3: Configure Environment Variables

Trong Railway dashboard:

1. Click vào project
2. Go to **"Variables"** tab
3. Thêm các variables sau:

```env
# Required
NODE_ENV=production
PORT=3000

# Optional - SheerID API (nếu dùng API mode)
SHEERID_API_KEY=your_actual_api_key_here

# Puppeteer Config (Railway tự handle)
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false
```

---

## 🎨 Step 4: Configure Custom Domain (Optional)

1. Trong Railway project → **"Settings"**
2. **"Domains"** section
3. Click **"Generate Domain"** (miễn phí `.railway.app` subdomain)
4. Hoặc add custom domain của bạn

---

## ✅ Step 5: Verify Deployment

Sau khi deploy xong:

1. Railway sẽ cho bạn URL: `https://your-app.railway.app`
2. Truy cập URL để test
3. Thử submit form verification
4. Check **"Logs"** tab trong Railway để debug

---

## 📊 Monitoring & Logs

### View Real-time Logs:

```bash
railway logs
```

Hoặc trong Railway Dashboard:
- Go to project
- Click **"Deployments"** tab
- Click vào deployment → **"View Logs"**

---

## 🔧 Troubleshooting

### Puppeteer/Chromium Issues:

Nếu gặp lỗi Chromium, check logs và ensure:

```env
PUPPETEER_EXECUTABLE_PATH=/nix/store/.../chromium
```

Railway sẽ tự install Chromium qua Nixpacks config.

### Memory Issues:

Railway free tier có giới hạn:
- **512 MB RAM**
- **1 GB Disk**

Nếu cần nhiều hơn, upgrade plan hoặc optimize code.

---

## 🚀 Railway CLI Commands

```bash
# View project status
railway status

# View logs
railway logs

# Open in browser
railway open

# Connect to project shell
railway shell

# Restart service
railway restart
```

---

## 💰 Pricing

**Free Tier:**
- $5 free credit/month
- 512 MB RAM
- 1 GB Disk
- Shared CPU

**Pro Tier:**
- Pay as you go
- More resources
- Priority support

---

## 🎯 Next Steps

1. ✅ Deploy successfully
2. ✅ Test automation với real browser
3. ✅ Monitor logs
4. ✅ Scale nếu cần

---

## 🆘 Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- SheerID Docs: https://developer.sheerid.com

---

**XONG!** 🎉 

Bây giờ bạn có:
- ✅ Real x86_64 Linux environment
- ✅ Real Chrome browser
- ✅ Real Puppeteer automation
- ✅ Real SheerID verification

**100% THẬT - KHÔNG FAKE!** 🚀
