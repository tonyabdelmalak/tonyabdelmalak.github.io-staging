# Interview Intelligence™ Platform

AI-powered interview preparation and performance platform designed to help you detect signals, navigate objections, and secure opportunities.

## 🌐 Live Site

- **Staging**: https://tonyabdelmalak.com/tonyabdelmalak.github.io-staging/
- **GitHub**: https://github.com/tonyabdelmalak/tonyabdelmalak.github.io-staging

## 🏗️ Architecture

This platform consists of two main components:

### 1. Frontend (GitHub Pages)
- **Framework**: React 19 + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui components
- **Hosting**: GitHub Pages (static site)
- **Deployment**: Automated via `gh-pages` npm package

### 2. Backend (Cloudflare Workers)
- **Runtime**: Cloudflare Workers (serverless)
- **AI**: Groq API (llama-3.1 models)
- **Features**: Streaming chat, persona-based responses, knowledge filtering
- **Deployment**: Wrangler CLI

## 🚀 Quick Start

### Prerequisites

1. **Node.js 20+** and npm
2. **Git** for version control
3. **Cloudflare Account** (free tier works)
4. **Groq API Key** (free at https://console.groq.com/keys)

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Deploy Frontend to GitHub Pages

```bash
# Build and deploy in one command
npm run build && npm run deploy
```

This will:
1. Build the React app with production optimizations
2. Deploy to the `gh-pages` branch
3. Make it live at your GitHub Pages URL

### Deploy Backend to Cloudflare

**Option 1: Use the deployment script (recommended)**

```bash
./deploy-worker.sh
```

This interactive script will:
- Check if Wrangler is installed
- Login to Cloudflare (if needed)
- Prompt for environment (staging/production)
- Check/set GROQ_API_KEY secret
- Deploy the worker

**Option 2: Manual deployment**

```bash
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Set your Groq API key
wrangler secret put GROQ_API_KEY --env staging

# Deploy to staging
wrangler deploy --env staging
```

See [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md) for detailed instructions.

## 📁 Project Structure

```
.
├── src/
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   └── ...          # Custom components
│   ├── layouts/         # Page layouts (RootLayout, Dashboard)
│   ├── pages/           # Route pages
│   ├── styles/          # Global CSS
│   └── main.tsx         # App entry point
├── assets/
│   └── chat/            # AI chat configuration
│       ├── config.json      # Chat widget config
│       ├── persona.json     # AI persona definition
│       ├── knowledge/       # Knowledge base markdown files
│       └── worker.js        # (reference only, actual worker is in root)
├── public/              # Static assets
├── worker.js            # Cloudflare Worker code
├── wrangler.toml        # Cloudflare Worker config
├── deploy-worker.sh     # Worker deployment script
└── package.json         # Dependencies and scripts
```

## 🔧 Configuration

### Frontend Configuration

**Vite Config** (`vite.config.ts`):
- Base path set to `/tonyabdelmalak.github.io-staging/` for GitHub Pages
- React plugin with Fast Refresh
- TypeScript path aliases (`@/` → `src/`)

**Chat Widget** (`assets/chat/config.json`):
```json
{
  "endpoint": "https://YOUR-WORKER.workers.dev/chat",
  "title": "Interview Intelligence AI",
  "greeting_markdown": "Welcome message...",
  "placeholder": "Ask about interview preparation..."
}
```

### Backend Configuration

**Wrangler Config** (`wrangler.toml`):
- Staging and production environments
- Environment variables (PERSONA_URL, KNOWLEDGE_URL, ALLOWED_ORIGINS)
- Groq API settings (model, URL)

**Secrets** (set via Wrangler CLI):
- `GROQ_API_KEY`: Your Groq API key

## 🎨 Features

### Interview Intelligence Platform
- **AI Daily Insights**: Personalized recommendations
- **Quick Actions**: AI Coach, Interview Simulator, Exercises, Coaching Modules
- **8 Core Capabilities**:
  - Behavioral Analysis
  - Technical Assessment
  - Communication Skills
  - Cultural Fit Evaluation
  - Stress Management
  - Body Language Analysis
  - Question Preparation
  - Performance Metrics

### AI Chat System
- **Streaming Responses**: Real-time SSE streaming
- **Persona-Based**: Customizable AI personality
- **Knowledge Filtering**: Keyword-based context selection
- **CORS Support**: Multi-origin access control

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start dev server (localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run deploy       # Deploy to GitHub Pages
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Tech Stack

**Frontend:**
- React 19
- TypeScript
- Vite 6
- Tailwind CSS
- shadcn/ui
- Motion (animations)
- React Router

**Backend:**
- Cloudflare Workers
- Groq API (LLM)
- Server-Sent Events (SSE)

## 📚 Documentation

- [Cloudflare Deployment Guide](./CLOUDFLARE_DEPLOYMENT.md) - Detailed worker deployment instructions
- [App Template README](./README.md) - This file

## 🔐 Environment Variables

### Frontend (Vite)
No environment variables needed for basic functionality.

### Backend (Cloudflare Worker)

**Public Variables** (in `wrangler.toml`):
- `PERSONA_URL` - URL to persona.json
- `KNOWLEDGE_URL` - URL to knowledge markdown file(s)
- `ALLOWED_ORIGINS` - Comma-separated allowed origins
- `GROQ_URL` - Groq API endpoint
- `GROQ_MODEL` - Model name (e.g., llama-3.1-70b-versatile)
- `USE_KEYWORD_FILTER` - Enable/disable keyword filtering

**Secrets** (set via `wrangler secret put`):
- `GROQ_API_KEY` - Your Groq API key

## 🚨 Troubleshooting

### GitHub Pages shows 404
1. Ensure `gh-pages` branch exists: `git branch -r`
2. Check GitHub Pages settings: Repository Settings → Pages
3. Select "Deploy from a branch" → "gh-pages" → "/ (root)"
4. Wait 1-2 minutes for deployment

### AI Chat not working
1. Check worker is deployed: `curl https://YOUR-WORKER.workers.dev/healthz`
2. Verify GROQ_API_KEY is set: `wrangler secret list --env staging`
3. Check CORS settings in `wrangler.toml`
4. Verify persona/knowledge URLs are accessible

### Build errors
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Clear build cache: `rm -rf dist`
3. Check Node version: `node -v` (should be 20+)

## 📄 License

MIT License - feel free to use this for your own projects!

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📧 Contact

- **GitHub**: [@tonyabdelmalak](https://github.com/tonyabdelmalak)
- **Website**: https://tonyabdelmalak.com

---

**Built with ❤️ using React, Cloudflare Workers, and Groq AI**
