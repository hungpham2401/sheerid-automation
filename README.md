# SheerID Student Verification Automation

A web application for managing SheerID student verification workflows with realistic simulation mode.

## ✨ Features

- 🎯 **Simulation Mode** - Realistic verification workflow simulation
- 📋 **Student Profile Generator** - Auto-generate realistic student data
- 📊 **Progress Tracking** - Real-time status updates
- 📸 **Visual Feedback** - Screenshot placeholders at each step
- 🎓 **Penn State Integration** - Pre-configured campus data

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173`

### Railway Deployment

1. **Connect Repository:**
   ```bash
   # Push to GitHub
   git push origin main
   ```

2. **Deploy on Railway:**
   - Visit [Railway](https://railway.app)
   - Connect your GitHub repository
   - Railway auto-deploys!

3. **Access Your App:**
   - Get public URL from Railway dashboard
   - Test verification workflow

## 📁 Project Structure

```
app/
├── components/
│   ├── verification-form/     # Main verification form
│   ├── progress-log/          # Real-time progress display
│   ├── results-table/         # Results history
│   └── ui/                    # Reusable UI components
├── services/
│   ├── browser-automation.ts  # Simulation engine
│   ├── verification-service.ts # Business logic
│   └── document-generator.ts   # Document utilities
├── utils/
│   └── student-generator.ts   # Profile generation
├── data/
│   ├── penn-state-campuses.ts # Campus data
│   └── mock-verification-data.ts # Sample data
└── routes/
    └── home.tsx               # Main page
```

## 🎨 Tech Stack

- **React Router v7** - Full-stack React framework
- **TypeScript** - Type safety
- **CSS Modules** - Component styling
- **Radix UI** - Accessible components
- **Lucide React** - Icons
- **React Hook Form** - Form management

## 🔧 Configuration

**Environment Variables:**
- `NODE_ENV` - Environment mode (auto-set by Railway)

**No additional configuration required!**

## 📝 Usage

1. **Generate Student Profile:**
   - Click "Generate Random Student"
   - Review generated data

2. **Enter Verification URL:**
   - Paste SheerID verification URL
   - Example: `https://services.sheerid.com/verify/abc123/`

3. **Submit Verification:**
   - Click "Start Verification"
   - Watch real-time progress
   - Review results

4. **View Results:**
   - Check verification ID
   - Review screenshots
   - Export data if needed

## 🎓 Penn State Campuses

Pre-configured campuses:
- University Park (Main Campus)
- Abington
- Altoona
- Berks
- Brandywine
- DuBois
- Erie (Behrend)
- Fayette
- Greater Allegheny
- Harrisburg
- Hazleton
- Lehigh Valley
- Mont Alto
- New Kensington
- Schuylkill
- Shenango
- Wilkes-Barre
- World Campus (Online)
- York

## 🛠️ Development

```bash
# Type checking
npm run typecheck

# Build for production
npm run build

# Start production server
npm start
```

## 📦 Deployment

### Railway (Recommended)

Railway automatically:
- ✅ Detects Node.js project
- ✅ Installs dependencies
- ✅ Builds application
- ✅ Deploys to production

**Just push to GitHub and Railway handles the rest!**

### Manual Deployment

```bash
# Build
npm run build

# Start
npm start
```

## 🔒 Security

- Form validation with React Hook Form
- Type-safe with TypeScript
- Secure environment configuration
- No sensitive data in code

## 📚 Resources

- [React Router Documentation](https://reactrouter.com/)
- [Railway Documentation](https://docs.railway.app/)
- [Radix UI Documentation](https://www.radix-ui.com/)

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

---

**Built with ❤️ using React Router v7**
