# Cloudflare Workers Setup Guide

## Quick Start (5 Minutes)

### Step 1: Install Wrangler CLI

```bash
npm install -g wrangler
```

### Step 2: Login to Cloudflare

```bash
wrangler login
```

This opens a browser window for authentication.

### Step 3: Deploy Everything

```bash
chmod +x deploy-cloudflare.sh
./deploy-cloudflare.sh
```

The script will:
- ✅ Check authentication
- ✅ Deploy the worker
- ✅ Prompt for GROQ_API_KEY (if not set)
- ✅ Show your worker URL

### Step 4: Update Frontend

After deployment, you'll get a URL like:
```
https://interview-intelligence-api.abc123.workers.dev
```

Update `.env.production`:
```bash
node scripts/update-api-url.js https://interview-intelligence-api.abc123.workers.dev
```

### Step 5: Deploy Frontend

```bash
npm run build
npm run deploy
```

### Step 6: Verify

```bash
chmod +x scripts/verify-deployment.sh
./scripts/verify-deployment.sh
```

---

## Manual Deployment

If you prefer manual steps:

```bash
# 1. Deploy worker
wrangler deploy

# 2. Set GROQ API key
wrangler secret put GROQ_API_KEY
# Paste your key when prompted

# 3. Get your worker URL
wrangler deployments list

# 4. Update .env.production
echo "VITE_API_BASE_URL=https://your-worker-url.workers.dev" >> .env.production

# 5. Build and deploy frontend
npm run build
npm run deploy
```

---

## GitHub Actions (CI/CD)

For automated deployments:

### 1. Add Secrets to GitHub

Go to: Repository → Settings → Secrets and variables → Actions

Add these secrets:
- `CLOUDFLARE_API_TOKEN` - Get from Cloudflare Dashboard → API Tokens
- `CLOUDFLARE_ACCOUNT_ID` - Get from Cloudflare Dashboard → Workers
- `GROQ_API_KEY` - Your Groq API key

### 2. Trigger Deployment

Go to: Actions → Deploy to Cloudflare Workers → Run workflow

---

## Troubleshooting

### Issue: "wrangler: command not found"

```bash
npm install -g wrangler
```

### Issue: "Not authenticated"

```bash
wrangler login
```

### Issue: "GROQ_API_KEY not configured"

```bash
wrangler secret put GROQ_API_KEY
```

### Issue: "Worker not responding"

Check logs:
```bash
wrangler tail
```

### Issue: "CORS errors"

Update `wrangler.toml`:
```toml
[vars]
ALLOWED_ORIGINS = "https://your-domain.com,https://tonyabdelmalak.github.io"
```

Redeploy:
```bash
wrangler deploy
```

---

## Useful Commands

```bash
# View deployments
wrangler deployments list

# View logs (real-time)
wrangler tail

# View secrets
wrangler secret list

# Delete a secret
wrangler secret delete SECRET_NAME

# View worker info
wrangler whoami

# Test locally
wrangler dev
```

---

## Cost

**Free Tier:**
- 100,000 requests/day
- 10ms CPU time per request
- Unlimited bandwidth

**Your usage:** Well within free tier limits

---

## Custom Domain (Optional)

### 1. Add Custom Domain in Cloudflare

1. Go to Cloudflare Dashboard → Workers
2. Select your worker
3. Click "Triggers" → "Custom Domains"
4. Add domain: `api.tonyabdelmalak.com`

### 2. Update Frontend

```bash
node scripts/update-api-url.js https://api.tonyabdelmalak.com
npm run build
npm run deploy
```

---

## Next Steps

### Add Database Persistence (Optional)

Currently using in-memory storage. To add Cloudflare D1:

```bash
# Create database
wrangler d1 create interview-intelligence

# Update wrangler.toml with database ID
# Run migrations
wrangler d1 execute interview-intelligence --file=./migrations/schema.sql
```

### Monitor Performance

- View analytics: Cloudflare Dashboard → Workers → Analytics
- Set up alerts: Dashboard → Notifications
- Monitor errors: `wrangler tail`

---

## Support

- **Cloudflare Docs:** https://developers.cloudflare.com/workers/
- **Wrangler Docs:** https://developers.cloudflare.com/workers/wrangler/
- **Community:** https://discord.gg/cloudflaredev
