# Deploy to Vercel - Quick Guide

## 🚀 One-Click Deploy (Easiest)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tonyabdelmalak/tonyabdelmalak.github.io-staging)

Click the button above or visit:
https://vercel.com/new/clone?repository-url=https://github.com/tonyabdelmalak/tonyabdelmalak.github.io-staging

---

## ⚙️ Configuration

### Required Environment Variables

After importing, add these environment variables in Vercel:

```bash
GROQ_API_KEY=your_groq_api_key_here
BASE_URL=/
```

### Get Your Groq API Key

1. Go to https://console.groq.com
2. Sign up for free (no credit card required)
3. Create an API key
4. Copy and paste into Vercel environment variables

---

## 📋 Step-by-Step Instructions

### Step 1: Import from GitHub

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Enter: `https://github.com/tonyabdelmalak/tonyabdelmalak.github.io-staging`
4. Click "Import"

### Step 2: Configure Project

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist/client`
- **Install Command:** `npm install`

### Step 3: Add Environment Variables

In the "Environment Variables" section:

| Name | Value |
|------|-------|
| `GROQ_API_KEY` | Your Groq API key from console.groq.com |
| `BASE_URL` | `/` |

### Step 4: Deploy!

Click "Deploy" and wait 2-3 minutes.

---

## ✅ Verify Deployment

After deployment completes:

1. Visit your Vercel URL (e.g., `your-project.vercel.app`)
2. Test these features:
   - **AI Coach** - Upload resume and job description
   - **Exercises** - Browse questions with AI feedback
   - **Live Simulator** - Start a practice session
   - **Resume Builder** - Create a new resume

All AI features should work!

---

## 🔧 Troubleshooting

### Build Fails

**Error:** "Module not found"
```bash
# Solution: Check that all dependencies are in package.json
npm install
npm run build
```

### API Errors

**Error:** "GROQ_API_KEY not configured"
```bash
# Solution: Add environment variable in Vercel dashboard
# Settings → Environment Variables → Add GROQ_API_KEY
```

### CORS Errors

**Error:** "Access-Control-Allow-Origin"
```bash
# Solution: Already configured in vercel.json
# If issues persist, check Vercel logs
```

---

## 🌐 Custom Domain

### Add Your Own Domain

1. Go to Vercel Dashboard → Your Project
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `interview-intelligence.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-30 minutes)

---

## 📊 Cost

| Service | Cost | Limits |
|---------|------|--------|
| **Vercel Hosting** | **$0** | 100GB bandwidth/month |
| **Groq API** | **$0** | 14,400 requests/day |
| **Total** | **$0/month** | 🎉 |

---

## 🔄 Automatic Deployments

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin main

# Vercel automatically deploys!
```

---

## 📚 Additional Resources

- **Vercel Docs:** https://vercel.com/docs
- **Groq API Docs:** https://console.groq.com/docs
- **Project README:** See README.md in this repo
- **Local Deployment:** See DEPLOY_LOCAL.md

---

## 🆘 Need Help?

Check these files in your repo:
- **README.md** - Full project documentation
- **DEPLOY_LOCAL.md** - Local deployment guide
- **DEPLOY_BACKEND.md** - Backend deployment
- **QUICKSTART.md** - Quick start guide

---

## 🎯 What's Included

✅ **5 Enterprise Features:**
- AI Coach - Resume & Job Analyzer
- Questions Library - 13+ Questions
- Live Interview Simulator
- Resume Builder with AI
- Exercises with AI Feedback

✅ **Complete Tech Stack:**
- React 19 + TypeScript
- Tailwind CSS + shadcn UI
- Vite Build System
- API Routes
- Database Schema (13 tables)

✅ **Production Ready:**
- Optimized build
- CORS configured
- Error handling
- Mobile responsive
- SEO optimized
