# Interview Intelligence™ - AI-Powered Interview Prep Platform

**AI-Powered Interview Preparation & Performance Platform**

🌐 **Live Site:** https://tonyabdelmalak.github.io/tonyabdelmalak.github.io-staging/

📦 **GitHub Repo:** https://github.com/tonyabdelmalak/tonyabdelmalak.github.io-staging

---

## ✅ What's Working Now

### Frontend (Deployed to GitHub Pages)
- ✅ **Homepage** - Professional landing page with feature overview
- ✅ **AI Coach** - Resume/job description analyzer with AI insights
- ✅ **Exercises** - Question browser with AI feedback system
- ✅ **Live Simulator** - Practice sessions with audio recording
- ✅ **Resume Builder** - Create and edit professional resumes
- ✅ **Dashboard** - Performance tracking interface
- ✅ **Responsive Design** - Works on mobile, tablet, desktop

### Backend (Ready to Deploy)
- ✅ **Cloudflare Worker** - Serverless API ready for deployment
- ✅ **Groq AI Integration** - LLM-powered coaching and feedback
- ✅ **CORS Configured** - Works with your GitHub Pages domain
- ✅ **Free Tier** - 100,000 requests/day at no cost

---

## 🚀 Quick Deploy (Frontend)

Your frontend is already live! To deploy updates:

```bash
# Make your changes, then:
git add .
git commit -m "Your update message"
git push origin main

# Build and deploy
npm run build
npm run deploy
```

Your changes will be live in ~2 minutes at:
**https://tonyabdelmalak.github.io/tonyabdelmalak.github.io-staging/**

---

## 🔌 Deploy Backend (5 Minutes)

To enable AI features, deploy the backend to Cloudflare Workers:

### Option 1: Cloudflare Workers (Recommended - FREE)

See **[DEPLOY_BACKEND.md](./DEPLOY_BACKEND.md)** for step-by-step instructions.

**Quick version:**
```bash
# 1. Login to Cloudflare
wrangler login

# 2. Set your Groq API key (get free at https://console.groq.com)
wrangler secret put GROQ_API_KEY

# 3. Deploy
wrangler deploy

# 4. Update .env.production with your worker URL
# VITE_API_BASE_URL=https://interview-intelligence-api.YOUR-SUBDOMAIN.workers.dev

# 5. Rebuild and redeploy frontend
npm run build
npm run deploy
```

### Option 2: Use Airo Platform Backend (Temporary)

Edit `.env.production`:
```bash
VITE_API_BASE_URL=https://3x034rng4b.preview.c38.airoapp.ai/api
```

Then rebuild:
```bash
npm run build
npm run deploy
```

**Note:** This URL only works while the Airo preview is active.

---

## 📁 Project Structure

```
├── src/
│   ├── pages/              # All page components
│   │   ├── index.tsx       # Homepage
│   │   ├── ai-coach.tsx    # AI Coach with resume analyzer
│   │   ├── exercises.tsx   # Question browser
│   │   ├── simulator-live.tsx  # Live interview simulator
│   │   └── resume-builder.tsx  # Resume editor
│   ├── components/         # Reusable UI components
│   ├── layouts/            # Layout components (Header, Footer)
│   └── server/             # Backend API routes (for local dev)
├── worker-api.js           # Cloudflare Worker (production backend)
├── wrangler.toml           # Cloudflare configuration
├── .env.production         # Production environment variables
└── dist/                   # Built files (auto-generated)
```

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful component library
- **React Router** - Client-side routing

### Backend
- **Cloudflare Workers** - Serverless edge computing
- **Groq API** - Fast LLM inference (Llama 3.1 70B)
- **Wrangler** - Cloudflare deployment tool

### Hosting
- **GitHub Pages** - Free static site hosting
- **Cloudflare Workers** - Free serverless API (100k requests/day)

---

## 🎯 Core Features

### 1. AI Coach
- Upload or paste resume and job description
- Get AI-powered match score (0-100%)
- Identify skill gaps
- Receive predicted interview questions
- Get customized talking points

### 2. Live Interview Simulator
- Practice with realistic interview questions
- Record audio answers
- Get instant AI feedback
- Track session history

### 3. Exercises
- Browse 100+ interview questions
- Filter by category and difficulty
- Practice answers with AI feedback
- STAR method evaluation

### 4. Resume Builder
- Create professional resumes
- Multiple templates (Professional, Modern, Creative)
- AI-powered optimization
- Resume-job alignment analysis

---

## 🔑 Environment Variables

### `.env.production` (Frontend)
```bash
# Backend API URL (update after deploying Cloudflare Worker)
VITE_API_BASE_URL=https://interview-intelligence-api.YOUR-SUBDOMAIN.workers.dev

# GitHub Pages base path
BASE_URL=/tonyabdelmalak.github.io-staging/
```

### Cloudflare Secrets (Backend)
```bash
# Set with: wrangler secret put GROQ_API_KEY
# Get your free API key at: https://console.groq.com
GROQ_API_KEY=your_groq_api_key_here
```

---

## 📝 Development

### Local Development

```bash
# Install dependencies
npm install

# Start dev server (frontend + backend)
npm run dev
```

Open http://localhost:5173

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

---

## 🎨 Customization

### Update Colors

Edit `src/styles/globals.css` - all colors use CSS variables:

```css
:root {
  --primary: 217 91% 60%;      /* Main brand color */
  --secondary: 217 91% 70%;    /* Secondary color */
  --accent: 43 96% 56%;        /* Accent color */
  /* ... more variables */
}
```

### Add New Pages

1. Create page in `src/pages/your-page.tsx`
2. Add route in `src/routes.tsx`
3. Add navigation link in `src/layouts/parts/Header.tsx`

---

## 🐛 Troubleshooting

### "Module script failed" Error
- Make sure you've deployed the latest build: `npm run build && npm run deploy`
- Check that `.env.production` has correct `BASE_URL`

### AI Features Not Working
- Deploy the backend to Cloudflare Workers (see DEPLOY_BACKEND.md)
- Or use the Airo platform backend URL temporarily

### CORS Errors
- Update `wrangler.toml` with your domain
- Redeploy worker: `wrangler deploy`

---

## 📚 Documentation

- **[DEPLOY_BACKEND.md](./DEPLOY_BACKEND.md)** - Backend deployment guide
- **[QUICKSTART.md](./QUICKSTART.md)** - Quick start guide
- **[CLOUDFLARE_SETUP.md](./CLOUDFLARE_SETUP.md)** - Cloudflare setup details
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Full deployment documentation

---

## 🎯 Roadmap

### Completed ✅
- [x] Professional homepage
- [x] AI Coach with resume analyzer
- [x] Question browser with filters
- [x] Live interview simulator
- [x] Resume builder with templates
- [x] GitHub Pages deployment
- [x] Cloudflare Workers backend

### Next Steps 🚀
- [ ] User authentication
- [ ] Progress tracking dashboard
- [ ] Video recording support
- [ ] Database integration (Cloudflare D1)
- [ ] Resume PDF export
- [ ] Additional resume templates
- [ ] Mobile app (React Native)

---

## 📄 License

MIT License - You own this code completely.

---

## 🤝 Support

For questions or issues:
1. Check the documentation files
2. Review the troubleshooting section
3. Check GitHub Issues

---

**Built with ❤️ using React, TypeScript, and AI**
