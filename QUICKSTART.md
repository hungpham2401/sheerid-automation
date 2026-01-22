# ⚡ Quick Start - Deploy to Railway

## 🎯 Fastest Way to Get Real Automation Working

### 1️⃣ One-Click Deploy to Railway

Click this button:

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/YOUR_USERNAME/YOUR_REPO)

Or manually:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Deploy
railway up
```

---

### 2️⃣ That's It! 🎉

Railway sẽ:
- ✅ Tự động detect Node.js project
- ✅ Cài Chromium browser (x86_64)
- ✅ Build ứng dụng
- ✅ Deploy và cho bạn URL

---

### 3️⃣ Test Real Automation

1. Truy cập URL Railway cho bạn: `https://your-app.railway.app`
2. Fill form và click "Start Verification"
3. Watch **REAL browser automation** chạy! 🚀

---

## 🔍 Verify It's Real

Check logs trong Railway dashboard:

```
🚀 Launching real Chrome browser...
✅ Real browser launched successfully
🌐 Navigating to: https://services.sheerid.com/...
📄 Form loaded - taking screenshot
✏️  Filling First Name: John
✏️  Filling Last Name: Doe
...
🎉 Verification completed!
```

**KHÔNG CÒN "SIMULATION MODE" NỮA!** ✨

---

## 💡 Troubleshooting

### "Still showing simulation mode"

Check environment variables trong Railway:
- `NODE_ENV=production` ✅
- `PUPPETEER_EXECUTABLE_PATH` exists ✅

### "Chromium not found"

Railway sẽ tự install via `nixpacks.toml`. Check build logs.

### "Out of memory"

Railway free tier có 512MB RAM. Nếu cần nhiều hơn:
- Optimize code
- Or upgrade to Pro plan

---

## 📊 What You Get

**Free Tier:**
- $5/month credit (enough for testing)
- Real x86_64 Linux
- Real Chromium browser
- Real Puppeteer automation

**Perfect for:**
- Testing automation workflows
- Small-scale verification
- Development/staging

---

**DONE!** 🎉 Real automation in < 5 minutes!
