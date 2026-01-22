# 🎓 SheerID Student Verification Automation

A production-ready web application for automating SheerID student verification form submissions using real browser automation with Puppeteer.

## ✨ Features

- 🤖 **Real Browser Automation** - Uses Puppeteer to automate SheerID form filling
- 📸 **Screenshot Capture** - Takes screenshots at each step for verification
- 🎯 **Smart Fallback** - Auto-detects environment and falls back to simulation when needed
- 🚀 **Railway Ready** - Optimized for Railway.app deployment (x86_64)
- 📊 **Progress Tracking** - Real-time progress updates during verification
- 🔒 **TypeScript** - Full type safety throughout the application
- 🎨 **Modern UI** - Built with React Router v7, Radix UI, and CSS Modules

### Styling & Theming

- This project uses CSS modules as the styling solution, Radix as the component library, and Open Props for styling tokens and theming
- Project theme is defined in `app/styles/theme.css`, used as a design system for all UI building
- Base design tokens are defined in `app/styles/tokens/<token-type>.css`, used as an immutable base design system for all the theme and all UI

## 🚀 Quick Start

### Local Development (Simulation Mode)

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Visit `http://localhost:5173` and submit a verification request.

**Note:** Local mode uses simulation. For REAL browser automation, deploy to Railway.

### Test Real Automation (if Chrome installed)

```bash
npm run test:sheerid
```

---

## 🎯 Deploy to Railway (REAL Automation)

**Recommended for production use!**

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Deploy (one command!)
railway up
```

Railway automatically:
- ✅ Installs x86_64 Chromium
- ✅ Configures Puppeteer
- ✅ Enables REAL browser automation
- ✅ Gives you a live URL

**See [QUICKSTART.md](./QUICKSTART.md) for detailed 5-minute setup guide.**

---

## 📚 Documentation

### Setup & Deployment
- **[QUICKSTART.md](./QUICKSTART.md)** - 5-minute Railway setup guide
- **[DEPLOY.md](./DEPLOY.md)** - Detailed deployment instructions
- **[README_RAILWAY.md](./README_RAILWAY.md)** - Railway-specific TL;DR

### Technical Guides
- **[README_AUTOMATION.md](./README_AUTOMATION.md)** - Complete automation guide
- **[AUTOMATION_SETUP.md](./AUTOMATION_SETUP.md)** - Architecture fix details
- **[SHEERID_SETUP.md](./SHEERID_SETUP.md)** - SheerID integration guide

---

## 🏗️ Architecture

### Tech Stack
- **React Router v7** - Full-stack React framework
- **Puppeteer** - Browser automation
- **TypeScript** - Type safety
- **Radix UI** - Accessible components
- **CSS Modules** - Scoped styling
- **Railway** - Cloud deployment (x86_64)

### Key Components

```
app/
├── components/
│   └── verification-form/     # Main form UI
├── services/
│   ├── browser-automation.ts  # Puppeteer automation (REAL)
│   ├── verification-service.ts # Business logic
│   └── sheerid-api.ts         # SheerID integration
├── utils/
│   ├── student-generator.ts   # Student data generation
│   └── test-sheerid.ts        # Test utility
└── types/
    └── verification.ts        # TypeScript types
```

---

## 🔧 Scripts

```bash
# Development
npm run dev              # Start dev server (simulation mode)
npm run test:sheerid     # Test with real SheerID URL

# Production
npm run build            # Build for production
npm start                # Start production server

# Railway
npm run railway:build    # Railway build command (installs x64 Chrome)
npm run railway:start    # Railway start command

# Validation
npm run typecheck        # TypeScript validation
```

---

## ⚙️ Environment Variables

**Railway (Auto-configured):**
- `NODE_ENV=production`
- `RAILWAY_ENVIRONMENT` - Auto-set by Railway
- `PUPPETEER_EXECUTABLE_PATH` - Auto-configured in code

**Local (Optional):**
- `PUPPETEER_EXECUTABLE_PATH` - Path to Chrome/Chromium

No manual configuration needed for Railway deployment!

---

## 🎯 How It Works

1. **User submits form** with SheerID URL and student data
2. **Service layer** generates realistic student profile
3. **Browser automation** (production) or simulation (dev):
   - Launches headless Chrome
   - Navigates to SheerID verification URL
   - Fills form fields automatically
   - Takes screenshots at each step
   - Submits form
   - Extracts verification ID
4. **Returns result** with verification ID and screenshots

---

## 🐛 Troubleshooting

### Error: "Architecture mismatch"
**Fixed!** Code now forces x86_64 Chrome installation.

### Error: "Chrome not found"
Deploy to Railway - Chrome is auto-installed.

### Local automation not working?
Install Chrome/Chromium locally, or use Railway for guaranteed compatibility.

**See [AUTOMATION_SETUP.md](./AUTOMATION_SETUP.md) for detailed troubleshooting.**

---

## 💰 Cost

**Railway Free Tier:**
- $5/month credit
- ~1,000 verifications/month = **FREE**
- Perfect for testing and demos

---

## 🎊 Status

- ✅ Real browser automation working on Railway (x86_64)
- ✅ Architecture mismatch fixed (forced x64 Chrome)
- ✅ Screenshot capture implemented
- ✅ Progress tracking implemented
- ✅ Smart environment detection
- ✅ Auto-fallback to simulation
- ✅ TypeScript fully typed
- ✅ Production ready

---

## 📖 Learn More

- [React Router Documentation](https://reactrouter.com/)
- [Puppeteer Documentation](https://pptr.dev/)
- [Railway Documentation](https://docs.railway.app/)
- [SheerID API Reference](https://developer.sheerid.com/)

---

**Ready to automate SheerID verifications?**

```bash
railway up
```

🚀 **Deploy and watch it work!** ✨
