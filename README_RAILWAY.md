# 🚂 Railway Deployment - SheerID Automation

## ✨ TL;DR - Deploy NGAY

```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

**DONE!** 🎉 Real automation sau 2 phút!

---

## 🎯 Điều Gì Sẽ Xảy Ra

### Local (Development):
- ⚠️ **Simulation Mode** - Fake automation vì không có Chrome
- Không submit thật vào SheerID
- Chỉ để test UI/UX

### Railway (Production):
- ✅ **REAL MODE** - Puppeteer + Chrome thật
- ✅ Submit thật vào SheerID
- ✅ Nhận verification ID thật
- ✅ Screenshots thật từ browser

---

## 📦 Files Đã Tạo

```
📁 Project Root
├── railway.json          # Railway config
├── nixpacks.toml         # Chromium + Node.js setup
├── Procfile              # Start command
├── DEPLOY.md             # Chi tiết deployment
├── QUICKSTART.md         # Hướng dẫn nhanh
└── .dockerignore         # Files bỏ qua khi deploy
```

---

## 🚀 Deployment Steps

### Option 1: Railway CLI (Fastest)

```bash
# 1. Install CLI
npm i -g @railway/cli

# 2. Login
railway login

# 3. Initialize
railway init
# Choose: "Create new project"
# Name: sheerid-automation (or anything)

# 4. Deploy!
railway up

# 5. Get URL
railway domain
# Or auto-open in browser:
railway open
```

### Option 2: GitHub + Railway Dashboard

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "SheerID automation ready for Railway"
git remote add origin YOUR_GITHUB_URL
git push -u origin main

# 2. Go to Railway
# → https://railway.app
# → "New Project"
# → "Deploy from GitHub"
# → Select your repo
# → Auto-deploy! ✨
```

---

## ⚙️ Environment Variables

Railway tự động set:
- `NODE_ENV=production` ✅
- `PUPPETEER_EXECUTABLE_PATH=/nix/store/.../chromium` ✅

Bạn chỉ cần thêm (optional):
- `SHEERID_API_KEY` (nếu dùng SheerID API)

---

## 🎨 Custom Domain (Optional)

Trong Railway dashboard:
1. Settings → Networking
2. Generate Domain (free `.railway.app`)
3. Or add your own domain

---

## 📊 Monitoring

### View Logs:

```bash
railway logs
```

Hoặc trong Dashboard:
- Deployments → View Logs
- Real-time log streaming

### Check Status:

```bash
railway status
```

---

## 💰 Cost

**Free Tier:**
- $5 credit/month
- ~500 hours runtime
- Perfect for testing

**Usage Example:**
- 1,000 verifications/month
- ~10 seconds each
- = ~3 hours total
- Cost: **FREE!** ✨

---

## 🔍 Verify Real Automation

### Trong logs, bạn sẽ thấy:

```
✅ Real browser launched successfully
📄 Form loaded - taking screenshot
✏️  Filling First Name: John
✏️  Filling Last Name: Doe
✏️  Filling Email: john@example.com
✏️  Filling Birth Date: 01/15/2000
✏️  Selecting School: Penn State University
✏️  Filling Student ID: ABC123456
✅ All fields filled successfully
📨 Submitting form...
⏳ Waiting for verification response...
🎉 Verification completed! ID: ver_1234567890_abc123
```

**KHÔNG CÒN "simulation mode"!** 🎊

---

## 🆘 Troubleshooting

### Still Showing "Simulation Mode"?

Check Railway environment:
```bash
railway vars
```

Should see:
- `NODE_ENV=production` ✅
- `PUPPETEER_EXECUTABLE_PATH` ✅

### Chromium Not Found?

Check build logs:
```bash
railway logs --build
```

Should see:
```
✓ Installing chromium
✓ Chromium installed successfully
```

### Out of Memory?

Free tier: 512MB RAM
Solutions:
- Optimize code (reduce concurrent runs)
- Upgrade to Pro plan ($5/month)

---

## 📈 Scaling

### Concurrent Requests:

Free tier handles ~2-3 concurrent verifications.

For more:
- Upgrade Railway plan
- Or use queue system (Bull/Redis)

---

## 🎯 What's Next?

1. ✅ Deploy to Railway
2. ✅ Test real automation
3. ✅ Monitor via logs
4. ✅ Add error handling
5. ✅ Implement retry logic
6. ✅ Add verification status polling
7. ✅ Store results in database

---

## 📚 Resources

- [Railway Docs](https://docs.railway.app)
- [Puppeteer Docs](https://pptr.dev)
- [SheerID API Docs](https://developer.sheerid.com)

---

## ✅ Checklist

- [ ] Code pushed to GitHub
- [ ] Railway account created
- [ ] Project deployed
- [ ] Domain configured
- [ ] Env vars set
- [ ] Test verification run
- [ ] Logs checked
- [ ] Real automation confirmed

---

**READY TO DEPLOY!** 🚀

Chạy ngay:
```bash
railway login && railway up
```

**2 phút sau → REAL AUTOMATION!** ✨
