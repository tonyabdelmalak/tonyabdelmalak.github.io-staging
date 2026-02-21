# Interview Intelligence™

**AI-Powered Interview Preparation Platform**

A comprehensive enterprise platform for interview preparation featuring AI coaching, resume optimization, live practice sessions, and performance analytics.

---

## 🚀 Quick Start

### For Development (Local)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit: `http://localhost:5173`

### For Production Deployment

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.**

Quick deploy:

```bash
# 1. Deploy backend API to Cloudflare Workers
wrangler login
wrangler deploy
wrangler secret put GROQ_API_KEY

# 2. Update .env.production with your worker URL
# 3. Deploy frontend to GitHub Pages
npm run build
npm run deploy
```

---

## ✨ Features

### 🎯 **Exercises** (Fully Functional)
- Browse 13+ interview questions across 6 categories
- Filter by category, difficulty, industry, role
- Practice mode with AI-powered feedback
- STAR method analysis for behavioral questions
- Real-time evaluation and recommendations

### 🎬 **Live Interview Simulator** (Fully Functional)
- 5-question practice sessions
- Real-time timer tracking
- Audio recording capability (microphone access)
- Text answer input
- AI feedback after each question
- Session completion summary
- Performance tracking and storage

### 📄 **Resume Builder** (Fully Functional)
- Create and manage multiple resumes
- 3 professional templates (Professional, Modern, Creative)
- Multiple section types (Summary, Experience, Education, Skills, etc.)
- AI-powered resume optimization
- Target role and industry customization
- Save/load resume functionality

### 🎯 **Resume-Job Alignment** (API Ready)
- AI-powered resume vs. job description analysis
- Keyword matching percentage
- Skills alignment scoring
- Gap identification
- Actionable recommendations
- Overall alignment score (0-100)

### 💬 **AI Chat Coach** (Fully Functional)
- Expert interview coaching
- Real-time conversation
- Groq-powered AI (llama-3.1-70b)
- Contextual guidance
- Available in header on all pages

### 📊 **Dashboard** (UI Only)
- Performance metrics overview
- Progress tracking visualization
- Recent activity feed
- Quick action cards

---

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- React 19 + TypeScript
- Vite (build tool)
- Tailwind CSS + shadcn UI
- React Router
- Motion (animations)

**Backend:**
- Cloudflare Workers (serverless)
- Groq API (AI/LLM)
- Express API routes (dev)
- Drizzle ORM + MySQL (database schema ready)

**Deployment:**
- Frontend: GitHub Pages
- Backend: Cloudflare Workers
- Database: MySQL (Airo platform) / D1 (Cloudflare - optional)

### Project Structure

```
├── src/
│   ├── pages/              # React pages
│   │   ├── index.tsx       # Homepage
│   │   ├── exercises.tsx   # ✅ Fully functional
│   │   ├── simulator-live.tsx  # ✅ Fully functional
│   │   ├── resume-builder.tsx  # ✅ Fully functional
│   │   ├── dashboard.tsx   # UI only
│   │   └── ...
│   ├── components/         # React components
│   │   ├── ui/            # shadcn UI components
│   │   └── AIChat.tsx     # ✅ AI chat widget
│   ├── layouts/           # Layout components
│   ├── server/            # Backend API (dev)
│   │   ├── api/           # API routes
│   │   └── db/            # Database schema
│   └── lib/               # Utilities
├── worker-api.js          # Cloudflare Worker (production)
├── wrangler.toml          # Cloudflare config
└── DEPLOYMENT.md          # Deployment guide
```

---

## 📡 API Endpoints

### Questions
- `GET /api/questions` - List questions (with filters)
- `GET /api/questions/categories` - List categories

### Chat
- `POST /api/chat` - AI chat with Groq

### Sessions
- `POST /api/sessions` - Save practice session

### Resumes
- `GET /api/resumes` - List resumes
- `POST /api/resumes` - Create resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume
- `POST /api/resumes/optimize` - AI optimization
- `POST /api/resumes/analyze-alignment` - Job alignment analysis

---

## 🗄️ Database Schema

13 tables covering enterprise features:

- `users` - User accounts
- `resumes` - Resume storage
- `resume_sections` - Resume content
- `questions` - Question bank
- `question_categories` - Question organization
- `interview_scenarios` - Custom scenarios
- `practice_sessions` - Session tracking
- `session_recordings` - Audio/video recordings
- `feedback` - AI feedback storage
- `coaching_plans` - Personalized coaching
- `progress_tracking` - Progress metrics
- `achievements` - Gamification
- `user_preferences` - User settings

---

## 🔑 Environment Variables

### Development (.env)

```env
GROQ_API_KEY=your_groq_api_key
DATABASE_URL=mysql://...
```

### Production

**Cloudflare Worker Secrets:**
```bash
wrangler secret put GROQ_API_KEY
```

**Frontend (.env.production):**
```env
VITE_API_BASE_URL=https://interview-intelligence-api.YOUR-SUBDOMAIN.workers.dev
BASE_URL=/tonyabdelmalak.github.io-staging/
```

---

## 🧪 Testing

```bash
# Run tests
npm run test

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## 📦 Scripts

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run deploy           # Deploy to GitHub Pages
npm run type-check       # TypeScript type checking
npm run lint             # ESLint
npm run db:generate      # Generate DB migrations
npm run db:migrate       # Run DB migrations
```

---

## 🚀 Deployment Status

### ✅ Working in Development
- All features functional on Airo preview
- Preview URL: `https://3x034rng4b.preview.c38.airoapp.ai`

### ⚠️ GitHub Pages (Static Only)
- Frontend deployed: `https://tonyabdelmalak.com/tonyabdelmalak.github.io-staging/`
- **Backend API required** - Deploy Cloudflare Worker for full functionality

### 📋 Production Deployment Checklist

- [ ] Deploy Cloudflare Worker (`wrangler deploy`)
- [ ] Set GROQ_API_KEY secret
- [ ] Update `.env.production` with worker URL
- [ ] Build frontend (`npm run build`)
- [ ] Deploy to GitHub Pages (`npm run deploy`)
- [ ] Test all features

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.**

---

## 🎯 Roadmap

### MVP Complete ✅
- [x] Questions Library with 6 categories
- [x] AI Chat Coach
- [x] Exercises page with AI feedback
- [x] Live Interview Simulator with recording
- [x] Resume Builder with AI optimization
- [x] Resume-Job Alignment analysis
- [x] Session tracking and storage

### Next Steps
- [ ] Connect Progress page to tracking database
- [ ] Connect Behavioral Metrics to feedback system
- [ ] Add video recording (WebRTC)
- [ ] Build interview scenario generator
- [ ] Add authentication/user management
- [ ] Implement D1 database for persistence
- [ ] Add custom domain for API

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🤝 Contributing

Contributions welcome! Please read CONTRIBUTING.md first.

---

## 📞 Support

For issues or questions:
1. Check [DEPLOYMENT.md](./DEPLOYMENT.md)
2. Review Cloudflare Workers logs: `wrangler tail`
3. Check browser console for errors
4. Open an issue on GitHub

---

## 🙏 Acknowledgments

- **Groq** - AI/LLM inference
- **Cloudflare** - Serverless hosting
- **shadcn/ui** - UI components
- **Tailwind CSS** - Styling
- **React** - Frontend framework

---

**Built with ❤️ using Airo Platform**
