#!/bin/bash

# Cloudflare Worker Deployment Script for Interview Intelligence AI

set -e

echo "🚀 Interview Intelligence AI - Cloudflare Worker Deployment"
echo "============================================================"
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found!"
    echo "📦 Install it with: npm install -g wrangler"
    exit 1
fi

echo "✅ Wrangler CLI found"
echo ""

# Check if user is logged in
if ! wrangler whoami &> /dev/null; then
    echo "🔐 You need to login to Cloudflare first"
    echo "Running: wrangler login"
    wrangler login
fi

echo "✅ Logged in to Cloudflare"
echo ""

# Ask which environment to deploy
echo "Which environment do you want to deploy?"
echo "1) Staging (interview-intelligence-ai-staging)"
echo "2) Production (interview-intelligence-ai)"
read -p "Enter choice [1-2]: " choice

case $choice in
    1)
        ENV="staging"
        echo "📦 Deploying to STAGING..."
        ;;
    2)
        ENV="production"
        echo "📦 Deploying to PRODUCTION..."
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""

# Check if GROQ_API_KEY is set
echo "🔑 Checking for GROQ_API_KEY secret..."
if ! wrangler secret list --env $ENV 2>/dev/null | grep -q "GROQ_API_KEY"; then
    echo "⚠️  GROQ_API_KEY not found for $ENV environment"
    echo "📝 You need to set it with: wrangler secret put GROQ_API_KEY --env $ENV"
    read -p "Do you want to set it now? [y/N]: " set_secret
    if [[ $set_secret =~ ^[Yy]$ ]]; then
        wrangler secret put GROQ_API_KEY --env $ENV
    else
        echo "❌ Cannot deploy without GROQ_API_KEY"
        exit 1
    fi
fi

echo "✅ GROQ_API_KEY is configured"
echo ""

# Deploy
echo "🚀 Deploying worker..."
wrangler deploy --env $ENV

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Copy the worker URL from above"
echo "2. Update assets/chat/config.json with the worker URL"
echo "3. Rebuild and redeploy your GitHub Pages site:"
echo "   npm run build && npm run deploy"
echo ""
echo "🧪 Test your deployment:"
echo "   curl https://interview-intelligence-ai-$ENV.YOUR-SUBDOMAIN.workers.dev/healthz"
echo ""
