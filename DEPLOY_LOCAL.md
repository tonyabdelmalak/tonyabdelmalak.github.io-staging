# Deploy from Your Local Machine

## Why Deploy Locally?

Cloudflare deployment requires browser authentication, which can't be done from the Airo platform. You need to deploy from your local computer.

---

## 🚀 Quick Deploy (5 Minutes)

### Step 1: Clone Your Repository

```bash
git clone https://github.com/tonyabdelmalak/tonyabdelmalak.github.io-staging.git
cd tonyabdelmalak.github.io-staging
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Deploy Backend to Cloudflare Workers

#### 3a. Login to Cloudflare (opens browser)
```bash
npx wrangler login
```

#### 3b. Get Your Groq API Key

1. Go to https://console.groq.com
2. Sign up for free (no credit card required)
3. Create an API key
4. Copy the key

#### 3c. Set the API Key
```bash
npx wrangler secret put GROQ_API_KEY
```
When prompted, paste your Groq API key.

#### 3d. Deploy!
```bash
npx wrangler deploy
```

You'll get a URL like:
```
https://interview-intelligence-api.YOUR-SUBDOMAIN.workers.dev
```

**Copy this URL!** You'll need it in the next step.

---

### Step 4: Update Frontend Configuration

Edit `.env.production` and replace the Airo URL with your Cloudflare Worker URL:

```bash
# Before:
VITE_API_BASE_URL=https://3x034rng4b.preview.c38.airoapp.ai/api

# After:
VITE_API_BASE_URL=https://interview-intelligence-api.YOUR-SUBDOMAIN.workers.dev
```

---

### Step 5: Deploy Frontend to GitHub Pages

```bash
npm run build
npm run deploy
```

Your site will be live at:
**https://tonyabdelmalak.github.io/tonyabdelmalak.github.io-staging/**

---

## ✅ Verification

Test your deployed site:

1. **Visit:** https://tonyabdelmalak.github.io/tonyabdelmalak.github.io-staging/
2. **Test AI Coach:** Upload a resume and job description
3. **Test Exercises:** Try the question browser with AI feedback
4. **Test Live Simulator:** Start a practice session

All AI features should work!

---

## 🔧 Troubleshooting

### "Not authenticated" Error
```bash
npx wrangler login
```

### "Secret not found" Error
```bash
npx wrangler secret put GROQ_API_KEY
```

### CORS Errors
Update `wrangler.toml` with your GitHub Pages domain:
```toml
[vars]
ALLOWED_ORIGINS = "https://tonyabdelmalak.github.io"
```

Then redeploy:
```bash
npx wrangler deploy
```

### Build Errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📊 Cost Breakdown

| Service | Cost | Your Usage |
|---------|------|------------|
| Cloudflare Workers | **$0** | 100,000 requests/day free |
| Groq API | **$0** | 14,400 requests/day free |
| GitHub Pages | **$0** | Unlimited bandwidth |
| **Total** | **$0/month** | 🎉 |

---

## 🎯 Alternative: Use Airo Backend Temporarily

If you want to test without deploying to Cloudflare, the site is already configured to use the Airo backend:

```bash
# Just deploy to GitHub Pages
npm run build
npm run deploy
```

**Note:** The Airo backend URL will only work while the preview is active. For production, deploy to Cloudflare Workers.

---

## 📚 Additional Resources

- **Cloudflare Workers Docs:** https://developers.cloudflare.com/workers/
- **Groq API Docs:** https://console.groq.com/docs
- **GitHub Pages Docs:** https://docs.github.com/pages
- **Wrangler CLI Docs:** https://developers.cloudflare.com/workers/wrangler/

---

## 🆘 Need Help?

Check these files in your repo:
- **README.md** - Full project documentation
- **DEPLOY_BACKEND.md** - Detailed backend deployment guide
- **QUICKSTART.md** - Quick start guide
