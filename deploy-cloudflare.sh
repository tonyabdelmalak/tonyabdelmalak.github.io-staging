#!/bin/bash

# Interview Intelligence™ - Cloudflare Deployment Script
# This script deploys both the backend API and updates the frontend configuration

set -e  # Exit on error

echo "🚀 Interview Intelligence™ - Cloudflare Deployment"
echo "================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo -e "${RED}❌ Wrangler CLI not found${NC}"
    echo "Installing Wrangler globally..."
    npm install -g wrangler
    echo -e "${GREEN}✅ Wrangler installed${NC}"
fi

# Check if logged in to Cloudflare
echo -e "${BLUE}🔐 Checking Cloudflare authentication...${NC}"
if ! wrangler whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Cloudflare${NC}"
    echo "Opening browser for authentication..."
    wrangler login
else
    echo -e "${GREEN}✅ Already authenticated${NC}"
fi

echo ""
echo -e "${BLUE}📦 Deploying Cloudflare Worker...${NC}"
wrangler deploy

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Worker deployed successfully!${NC}"
else
    echo -e "${RED}❌ Worker deployment failed${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}🔑 Checking GROQ_API_KEY secret...${NC}"
if wrangler secret list | grep -q "GROQ_API_KEY"; then
    echo -e "${GREEN}✅ GROQ_API_KEY is already set${NC}"
else
    echo -e "${YELLOW}⚠️  GROQ_API_KEY not found${NC}"
    echo "Please set your GROQ API key:"
    wrangler secret put GROQ_API_KEY
fi

echo ""
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo ""
echo "================================================="
echo -e "${BLUE}📝 Next Steps:${NC}"
echo ""
echo "1. Your API is now live at:"
echo -e "   ${GREEN}https://interview-intelligence-api.<your-subdomain>.workers.dev${NC}"
echo ""
echo "2. Update .env.production with your worker URL:"
echo -e "   ${YELLOW}VITE_API_BASE_URL=https://interview-intelligence-api.<subdomain>.workers.dev${NC}"
echo ""
echo "3. Rebuild and deploy frontend:"
echo -e "   ${YELLOW}npm run build && npm run deploy${NC}"
echo ""
echo "4. Test your API:"
echo -e "   ${YELLOW}curl https://interview-intelligence-api.<subdomain>.workers.dev/api/health${NC}"
echo ""
echo "================================================="
echo ""
echo -e "${BLUE}📚 Documentation:${NC}"
echo "   - Full guide: ./DEPLOYMENT.md"
echo "   - Troubleshooting: wrangler tail (view logs)"
echo "   - Worker dashboard: https://dash.cloudflare.com"
echo ""
