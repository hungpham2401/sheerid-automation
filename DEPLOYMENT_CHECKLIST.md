# ✅ Railway Deployment Checklist

## 🎯 Pre-Deployment

- [x] ✅ TypeScript validation passed
- [x] ✅ Build successful (no errors)
- [x] ✅ Architecture fix applied (x64 forced)
- [x] ✅ Railway config updated
- [x] ✅ Test utility created
- [x] ✅ Documentation complete

---

## 🚀 Deployment Steps

### 1. Install Railway CLI
```bash
npm i -g @railway/cli
```

### 2. Login to Railway
```bash
railway login
```
- Opens browser for authentication
- Select your Railway account

### 3. Deploy
```bash
railway up
```
- Automatically detects project
- Runs build process
- Deploys to Railway

### 4. Monitor Deployment
```bash
railway logs -f
```

**Expected build logs:**
```
📦 Installing dependencies...
   npm ci --prefer-offline --no-audit

🎨 Installing Chrome (x64)...
   npx puppeteer browsers install chrome --platform=linux --arch=x64

🔨 Building application...
   npm run build

✅ Build complete!
🚀 Starting server...
   npm run railway:start
```

---

## 🧪 Post-Deployment Testing

### 1. Get Your Railway URL
```bash
railway open
```
Or find it in Railway dashboard.

### 2. Test Real Automation

Visit your Railway URL and:
1. Enter your SheerID URL:
   ```
   https://services.sheerid.com/verify/67c8c14f5f17a83b745e3f82/?verificationId=69723f2f11d51d3e6baa6de8
   ```
2. Select school: `Pennsylvania State University`
3. Fill student info
4. Submit form

### 3. Watch Logs
```bash
railway logs -f
```

**Expected success:**
```
🚀 Launching real Chrome browser...
✅ Real browser launched successfully
🌐 Navigating to: https://services.sheerid.com/verify/...
📄 Form loaded - taking screenshot
✏️ Filling First Name: [name]
✏️ Filling Last Name: [name]
✏️ Filling Email: [email]
✏️ Filling Birth Date: [date]
✏️ Selecting School: Pennsylvania State University
✏️ Filling Student ID: [id]
✅ All fields filled successfully
📨 Submitting form...
⏳ Waiting for verification response...
🎉 Verification completed! ID: ver_XXXXXX_XXXXXX
```

---

## 🔍 Validation Checklist

### On Railway Dashboard:

- [ ] Build status: ✅ Success
- [ ] Deployment status: ✅ Active
- [ ] Application URL: Available
- [ ] Environment variables: Auto-configured
- [ ] Resource usage: Normal

### In Logs:

- [ ] Chrome installed successfully
- [ ] Application started
- [ ] No errors in startup
- [ ] Ready to accept requests

### Via Web App:

- [ ] Home page loads
- [ ] Form renders correctly
- [ ] Can enter SheerID URL
- [ ] Progress updates show
- [ ] Screenshots captured
- [ ] Verification completes
- [ ] Results display

---

## 🐛 Troubleshooting

### Build Fails

**Check:**
```bash
railway logs
# Look for error messages
```

**Common issues:**
- Dependencies not installing → Redeploy
- Out of memory → Upgrade Railway plan
- Timeout → Check build scripts

**Fix:**
```bash
railway up --force
```

---

### Chrome Not Found

**Check:**
```bash
railway run bash -c "which chromium"
# Should output: /usr/bin/chromium
```

**Check Puppeteer cache:**
```bash
railway run bash -c "ls -la ~/.cache/puppeteer/"
# Should show chrome/linux-*/chrome-linux64/
```

**Fix:**
```bash
# Redeploy (Chrome reinstalls)
railway up --force
```

---

### Architecture Error (Should Not Happen)

If you still see ARM error:

**Clear cache:**
```bash
railway run bash -c "rm -rf ~/.cache/puppeteer"
```

**Redeploy:**
```bash
railway up --force
```

---

### Application Timeout

**Increase timeout in Railway:**
1. Go to Railway dashboard
2. Select your service
3. Settings → Environment
4. Add: `PUPPETEER_TIMEOUT=60000`

---

## 💡 Optimization Tips

### 1. Enable Persistent Storage
```bash
railway volume create
railway volume attach
```

**Benefits:**
- Cache Puppeteer downloads
- Faster subsequent deployments

### 2. Monitor Resource Usage
```bash
railway metrics
```

**Watch for:**
- CPU spikes during automation
- Memory usage (should be < 512MB)
- Request duration (< 30s typical)

### 3. Set Up Custom Domain
```bash
railway domain
```

---

## 📊 Expected Performance

| Metric | Value |
|--------|-------|
| Build time (first) | 3-5 min |
| Build time (cached) | 1-2 min |
| Cold start | < 3s |
| Automation time | 10-20s |
| Memory usage | 200-400 MB |
| Response time | < 30s |

---

## 🎯 Success Criteria

### ✅ Deployment Successful If:

1. Build completes without errors
2. Application starts successfully
3. Railway URL is accessible
4. Chrome launches on Railway
5. Form submission works
6. Screenshots are captured
7. Verification ID returned
8. Logs show "Real browser" messages

### ❌ Needs Attention If:

1. Build fails repeatedly
2. Chrome fails to launch
3. ARM architecture error
4. Memory errors
5. Timeout errors

---

## 🆘 Emergency Recovery

### Complete Reset:

```bash
# 1. Delete deployment
railway down

# 2. Clear local cache
rm -rf node_modules package-lock.json

# 3. Reinstall
npm install

# 4. Redeploy
railway up
```

---

## 📞 Support Resources

### Railway:
- Dashboard: https://railway.app/dashboard
- Docs: https://docs.railway.app/
- Discord: https://discord.gg/railway

### Puppeteer:
- Docs: https://pptr.dev/
- Troubleshooting: https://pptr.dev/troubleshooting
- GitHub: https://github.com/puppeteer/puppeteer

---

## ✅ Final Verification

After successful deployment:

- [ ] Visit Railway URL
- [ ] Submit test verification with YOUR real SheerID URL
- [ ] Check logs for "Real browser" messages
- [ ] Verify screenshots in response
- [ ] Confirm verification ID returned
- [ ] Check no errors in logs

---

## 🎊 Success!

If all checks pass:

```
✅ Deployment: SUCCESS
✅ Chrome: WORKING (x64)
✅ Automation: REAL
✅ Screenshots: CAPTURED
✅ Verification: COMPLETED
```

**Your SheerID automation is LIVE!** 🚀✨

---

## 📚 Next Steps

1. **Monitor usage:**
   ```bash
   railway metrics
   ```

2. **Set up alerts** (optional):
   - Railway dashboard → Notifications
   - Configure error alerts

3. **Test with multiple schools:**
   - Try different SheerID URLs
   - Verify different form layouts

4. **Scale if needed:**
   - Upgrade Railway plan
   - Add persistent storage
   - Optimize performance

---

**Ready to deploy?**

```bash
railway up
```

**Let's go!** 🚀
