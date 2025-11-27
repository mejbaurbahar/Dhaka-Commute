# 🚌 DhakaCommute - Dhaka Bus Route Finder

Find Dhaka bus routes instantly! 200+ buses, real-time tracking, metro rail guide (MRT Line 6), AI assistant, and fare calculator.

## 🌐 Live Demo

Visit: [https://dhaka-commute.sqatesting.com/](https://dhaka-commute.sqatesting.com/)

## 🚀 Quick Start

### Prerequisites
- Node.js 20 or higher
- npm

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/mejbaurbahar/Dhaka-Commute.git
   cd Dhaka-Commute
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

4. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📦 Deployment

This project is deployed on **Netlify** with automatic deployments from the `main` branch.

**Live URLs:**
- Primary: https://dhakacommute.sqatesting.com
- Netlify: https://dhaka-commute.netlify.app

### Automatic Deployment

Every push to `main` triggers an automatic build and deployment on Netlify.

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy using Netlify CLI (if installed)
netlify deploy --prod
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🛠️ Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Google Gemini AI** - AI assistant
- **Lucide React** - Icons

## 📱 Features

- 🚌 200+ Dhaka bus routes
- 🗺️ Interactive route maps
- 🚇 Metro Rail (MRT Line 6) guide
- 💰 Fare calculator
- 🤖 AI-powered route assistant
- 📱 Mobile-first responsive design
- 🌐 Bilingual support (English & Bengali)
- 🔍 Smart search functionality

## 🐛 Troubleshooting

### Build Issues

If you encounter build errors:

1. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Clear Vite cache:
   ```bash
   rm -rf dist .vite
   npm run build
   ```

### Deployment Issues

1. **Check Netlify Build Logs**: Go to Netlify Dashboard → Deploys → View build logs
2. **Clear Browser Cache**: Hard refresh with Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. **Verify DNS**: Ensure DNS is properly configured (see [DEPLOYMENT.md](./DEPLOYMENT.md))
4. **503 Error**: Add custom domain in Netlify site settings

### API Key Issues

If AI features aren't working:
1. Verify `GEMINI_API_KEY` is set in GitHub Secrets
2. Check that the API key is valid at [Google AI Studio](https://aistudio.google.com/app/apikey)
3. Ensure billing is enabled for your Google Cloud project (if required)

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 👨‍💻 Author

**Mejbaur Bahar Fagun**

## 🙏 Acknowledgments

- Bus route data compiled from various Dhaka transport sources
- Metro Rail data from Dhaka Mass Transit Company Limited (DMTCL)
- Community contributions and feedback

---

Made with ❤️ for Dhaka commuters
