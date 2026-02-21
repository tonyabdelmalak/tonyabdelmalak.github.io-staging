#!/bin/bash

# Deploy Interview Intelligence API to Cloudflare Workers

echo "🚀 Deploying Interview Intelligence API to Cloudflare Workers..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Deploy the worker
echo "📦 Deploying worker..."
wrangler deploy

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Set your GROQ_API_KEY secret:"
echo "   wrangler secret put GROQ_API_KEY"
echo ""
echo "2. Your API will be available at:"
echo "   https://interview-intelligence-api.<your-subdomain>.workers.dev"
echo ""
echo "3. Update your frontend API_BASE_URL to point to this worker URL"
