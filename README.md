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

### GitHub Pages (Automatic)

This project is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

**Setup Steps:**

1. **Set GitHub Secret for API Key**
   - Go to your repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `GEMINI_API_KEY`
   - Value: Your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

2. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`
   - Save

3. **Push to main branch**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

The GitHub Actions workflow will automatically:
- Install dependencies
- Build the project
- Deploy to the `gh-pages` branch

### Custom Domain

The CNAME file is already configured for `dhaka-commute.sqatesting.com`. To use your own domain:

1. Update `public/CNAME` with your domain
2. Configure your DNS provider:
   - Add a CNAME record pointing to `mejbaurbahar.github.io`
   - Or add A records pointing to GitHub Pages IPs

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

### GitHub Pages Not Loading

1. **Check GitHub Actions**: Go to Actions tab and verify the deployment succeeded
2. **Clear Browser Cache**: Hard refresh with Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. **Verify DNS**: If using custom domain, ensure DNS is properly configured
4. **Check CNAME**: Ensure `public/CNAME` contains the correct domain

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
