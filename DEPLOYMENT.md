# Interview Intelligence™ - Cloudflare Deployment Guide

## Overview

This application requires **two separate deployments**:

1. **Frontend** → GitHub Pages (static files)
2. **Backend API** → Cloudflare Workers (serverless functions)

---

## Prerequisites

- Node.js 18+ installed
- Cloudflare account (free tier works)
- Wrangler CLI installed: `npm install -g wrangler`
- GitHub repository set up
- GROQ API key from https://console.groq.com

---

## Step 1: Deploy Backend API to Cloudflare Workers

### 1.1 Login to Cloudflare

```bash
wrangler login
```

This will open a browser window to authenticate.

### 1.2 Deploy the Worker

```bash
chmod +x deploy-api.sh
./deploy-api.sh
```

Or manually:

```bash
wrangler deploy
```

### 1.3 Set Environment Secrets

Set your GROQ API key:

```bash
wrangler secret put GROQ_API_KEY
# Paste your GROQ API key when prompted
```

### 1.4 Note Your Worker URL

After deployment, Wrangler will output your worker URL:

```
https://interview-intelligence-api.<your-subdomain>.workers.dev
```

**Save this URL** - you'll need it for the frontend configuration.

---

## Step 2: Configure Frontend for Production

### 2.1 Update API Base URL

Edit `.env.production` and replace `<your-subdomain>` with your actual Cloudflare subdomain:

```env
VITE_API_BASE_URL=https://interview-intelligence-api.YOUR-SUBDOMAIN.workers.dev
```

### 2.2 Update API Client

The frontend needs to use the Cloudflare Worker URL in production. Update `src/lib/api-client.ts`:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  // ... rest of the code
}
```

---

## Step 3: Deploy Frontend to GitHub Pages

### 3.1 Build with Production Config

```bash
npm run build
```

### 3.2 Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
- Build the production bundle
- Deploy to `gh-pages` branch
- Make it available at your GitHub Pages URL

---

## Step 4: Verify Deployment

### 4.1 Test API Endpoints

Test your Cloudflare Worker:

```bash
curl https://interview-intelligence-api.YOUR-SUBDOMAIN.workers.dev/api/health
```

Expected response:
```json
{"status":"ok","timestamp":"2025-02-21T..."}
```

### 4.2 Test Frontend

Visit your GitHub Pages site:
```
https://tonyabdelmalak.com/tonyabdelmalak.github.io-staging/
```

Test these pages:
- `/exercises` - Should load questions
- `/simulator-live` - Should start sessions
- `/resume-builder` - Should save resumes

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Pages                            │
│  https://tonyabdelmalak.com/...                            │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Frontend (React SPA)                                │  │
│  │  - Static HTML/CSS/JS                                │  │
│  │  - No backend processing                             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ API Calls
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              Cloudflare Workers                             │
│  https://interview-intelligence-api.*.workers.dev           │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Backend API (Serverless)                            │  │
│  │  - /api/questions                                    │  │
│  │  - /api/chat (Groq AI)                               │  │
│  │  - /api/sessions                                     │  │
│  │  - /api/resumes                                      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## API Endpoints Available

### Questions
- `GET /api/questions` - List questions (with filters)
- `GET /api/questions/categories` - List categories
- `POST /api/questions/seed` - Seed database

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

## Environment Variables

### Cloudflare Worker (Secrets)
- `GROQ_API_KEY` - Groq API key for AI features

### Frontend (.env.production)
- `VITE_API_BASE_URL` - Cloudflare Worker URL
- `BASE_URL` - GitHub Pages base path

---

## Troubleshooting

### Issue: API calls fail with CORS errors

**Solution:** Update `ALLOWED_ORIGINS` in `wrangler.toml`:

```toml
[vars]
ALLOWED_ORIGINS = "https://tonyabdelmalak.com,https://tonyabdelmalak.github.io"
```

Redeploy:
```bash
wrangler deploy
```

### Issue: 404 errors on API endpoints

**Solution:** Verify your worker is deployed:

```bash
wrangler deployments list
```

### Issue: AI features not working

**Solution:** Verify GROQ_API_KEY is set:

```bash
wrangler secret list
```

If not listed, set it:
```bash
wrangler secret put GROQ_API_KEY
```

### Issue: Frontend shows old version

**Solution:** Clear GitHub Pages cache:

1. Go to GitHub repo → Settings → Pages
2. Change source branch and save
3. Change back to `gh-pages` and save
4. Wait 1-2 minutes for rebuild

---

## Cost Estimate

### Cloudflare Workers (Free Tier)
- 100,000 requests/day
- 10ms CPU time per request
- **Cost:** $0/month (within free tier)

### GitHub Pages
- Unlimited static hosting
- **Cost:** $0/month

### Groq API
- Free tier: 14,400 requests/day
- **Cost:** $0/month (within free tier)

**Total:** $0/month for MVP usage

---

## Production Checklist

- [ ] Cloudflare Worker deployed
- [ ] GROQ_API_KEY secret set
- [ ] Worker URL noted and saved
- [ ] `.env.production` updated with worker URL
- [ ] Frontend built with production config
- [ ] Frontend deployed to GitHub Pages
- [ ] API health check passes
- [ ] Exercises page loads questions
- [ ] Live Simulator starts sessions
- [ ] Resume Builder saves data
- [ ] AI features working (chat, optimization, feedback)

---

## Support

For issues:
1. Check Cloudflare Workers logs: `wrangler tail`
2. Check browser console for errors
3. Verify API_BASE_URL is correct
4. Test API endpoints directly with curl

---

## Next Steps (Optional)

### Add Database Persistence

Currently using in-memory storage (MVP). To add persistence:

1. Create Cloudflare D1 database:
   ```bash
   wrangler d1 create interview-intelligence
   ```

2. Update `wrangler.toml` with database ID

3. Run migrations:
   ```bash
   wrangler d1 execute interview-intelligence --file=./schema.sql
   ```

4. Update worker handlers to use D1 instead of hardcoded data

### Add Custom Domain

1. Go to Cloudflare Dashboard → Workers
2. Select your worker
3. Click "Triggers" → "Custom Domains"
4. Add your domain (e.g., `api.tonyabdelmalak.com`)
5. Update frontend `VITE_API_BASE_URL`
