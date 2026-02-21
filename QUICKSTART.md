# 🚀 Quick Start - Deploy in 5 Minutes

## Prerequisites

- Node.js 18+ installed
- Cloudflare account (free tier works)
- GROQ API key from https://console.groq.com

---

## Option 1: One-Command Deployment (Recommended)

```bash
# Deploy backend + frontend in one command
npm run deploy:full
```

This will:
1. ✅ Install Wrangler (if needed)
2. ✅ Login to Cloudflare
3. ✅ Deploy backend worker
4. ✅ Set GROQ_API_KEY (prompts you)
5. ✅ Build frontend
6. ✅ Deploy to GitHub Pages

**After deployment:**
- Update `.env.production` with your worker URL
- Run `npm run build && npm run deploy` again

---

## Option 2: Step-by-Step Deployment

### Step 1: Deploy Backend

```bash
npm run deploy:cloudflare
```

Or manually:
```bash
wrangler login
wrangler deploy
wrangler secret put GROQ_API_KEY
```

### Step 2: Update Frontend Config

After deployment, you'll get a URL like:
```
https://interview-intelligence-api.abc123.workers.dev
```

Update `.env.production`:
```bash
node scripts/update-api-url.js https://interview-intelligence-api.abc123.workers.dev
```

### Step 3: Deploy Frontend

```bash
npm run build
npm run deploy
```

### Step 4: Verify

```bash
npm run deploy:verify
```

---

## Testing Your Deployment

### Test Backend API

```bash
curl https://interview-intelligence-api.YOUR-SUBDOMAIN.workers.dev/api/health
```

Expected response:
```json
{"status":"ok","timestamp":"2025-02-21T..."}
```

### Test Frontend

Visit: `https://tonyabdelmalak.com/tonyabdelmalak.github.io-staging/`

Test these pages:
- ✅ `/exercises` - Should load questions
- ✅ `/simulator-live` - Should start sessions
- ✅ `/resume-builder` - Should save resumes

---

## Troubleshooting

### "Failed to start session" error

**Cause:** Frontend can't reach backend API

**Fix:**
1. Check `.env.production` has correct worker URL
2. Rebuild: `npm run build`
3. Redeploy: `npm run deploy`

### "GROQ_API_KEY not configured"

**Fix:**
```bash
wrangler secret put GROQ_API_KEY
```

### "wrangler: command not found"

**Fix:**
```bash
npm install -g wrangler
```

### CORS errors

**Fix:** Update `wrangler.toml`:
```toml
[vars]
ALLOWED_ORIGINS = "https://tonyabdelmalak.com,https://tonyabdelmalak.github.io"
```

Redeploy:
```bash
wrangler deploy
```

---

## NPM Scripts Reference

```bash
npm run deploy:cloudflare  # Deploy backend only
npm run deploy:verify      # Verify deployment
npm run deploy:full        # Deploy backend + frontend
npm run deploy             # Deploy frontend only (GitHub Pages)
```

---

## What Gets Deployed

### Backend (Cloudflare Workers)
- ✅ All API endpoints (`/api/*`)
- ✅ AI chat with Groq
- ✅ Questions library
- ✅ Session tracking
- ✅ Resume optimization
- ✅ CORS configured

### Frontend (GitHub Pages)
- ✅ React SPA
- ✅ All pages and components
- ✅ Static assets
- ✅ Configured to call Cloudflare Worker

---

## Cost

**$0/month** - Everything runs on free tiers:
- Cloudflare Workers: 100,000 requests/day
- GitHub Pages: Unlimited static hosting
- Groq API: 14,400 requests/day

---

## Next Steps

1. ✅ Deploy backend: `npm run deploy:cloudflare`
2. ✅ Update `.env.production` with worker URL
3. ✅ Deploy frontend: `npm run build && npm run deploy`
4. ✅ Verify: `npm run deploy:verify`
5. ✅ Test at your GitHub Pages URL

---

## Need Help?

- **Full Guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Cloudflare Setup:** [CLOUDFLARE_SETUP.md](./CLOUDFLARE_SETUP.md)
- **View Logs:** `wrangler tail`
- **Check Status:** `wrangler deployments list`

---

**Ready to deploy? Run:** `npm run deploy:full`
