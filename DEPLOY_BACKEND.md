# Deploy Backend to Cloudflare Workers

## Quick Start (5 minutes)

Your backend API is ready to deploy to Cloudflare Workers (100% FREE tier).

### Step 1: Install Wrangler (if not already installed)

```bash
npm install -g wrangler
```

### Step 2: Login to Cloudflare

```bash
wrangler login
```

This will open a browser window to authenticate.

### Step 3: Set Your API Key

```bash
wrangler secret put GROQ_API_KEY
```

When prompted, paste your Groq API key (get one free at https://console.groq.com)

### Step 4: Deploy!

```bash
wrangler deploy
```

You'll get a URL like: `https://interview-intelligence-api.YOUR-SUBDOMAIN.workers.dev`

### Step 5: Update Frontend

Edit `.env.production` and add your worker URL:

```bash
VITE_API_BASE_URL=https://interview-intelligence-api.YOUR-SUBDOMAIN.workers.dev
```

Then rebuild and redeploy:

```bash
npm run build
npm run deploy
```

## ✅ Done!

Your site will now have:
- ✅ AI-powered resume analysis
- ✅ Interview question feedback
- ✅ Live simulator with AI coaching
- ✅ Resume optimization

## Cloudflare Free Tier

- **100,000 requests/day** (more than enough)
- **No credit card required**
- **Global CDN** (fast everywhere)
- **Zero maintenance**

## Troubleshooting

### "Not authenticated"
```bash
wrangler login
```

### "GROQ_API_KEY not configured"
```bash
wrangler secret put GROQ_API_KEY
```

### "CORS error"
The worker is already configured for your GitHub Pages URL. If you change domains, update `wrangler.toml`:

```toml
[vars]
ALLOWED_ORIGINS = "https://your-new-domain.com"
```

Then redeploy:
```bash
wrangler deploy
```

## Alternative: Use Airo Platform Backend

If you don't want to deploy to Cloudflare, you can use the Airo platform backend:

```bash
# .env.production
VITE_API_BASE_URL=https://3x034rng4b.preview.c38.airoapp.ai/api
```

Then rebuild:
```bash
npm run build
npm run deploy
```

**Note:** The Airo backend URL will only work while your preview is active.
