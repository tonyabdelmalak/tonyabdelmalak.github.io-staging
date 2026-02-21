#!/bin/bash

# Verify Cloudflare Worker deployment

set -e

echo "🔍 Verifying Cloudflare Worker Deployment"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Get worker URL from .env.production
if [ -f .env.production ]; then
    WORKER_URL=$(grep VITE_API_BASE_URL .env.production | cut -d '=' -f2)
    if [ -z "$WORKER_URL" ]; then
        echo -e "${RED}❌ VITE_API_BASE_URL not found in .env.production${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ .env.production not found${NC}"
    echo "Please create .env.production with your worker URL"
    exit 1
fi

echo -e "Testing worker at: ${YELLOW}$WORKER_URL${NC}"
echo ""

# Test health endpoint
echo "1. Testing /api/health..."
HEALTH_RESPONSE=$(curl -s "$WORKER_URL/api/health")
if echo "$HEALTH_RESPONSE" | grep -q '"status":"ok"'; then
    echo -e "   ${GREEN}✅ Health check passed${NC}"
else
    echo -e "   ${RED}❌ Health check failed${NC}"
    echo "   Response: $HEALTH_RESPONSE"
    exit 1
fi

# Test questions endpoint
echo "2. Testing /api/questions..."
QUESTIONS_RESPONSE=$(curl -s "$WORKER_URL/api/questions")
if echo "$QUESTIONS_RESPONSE" | grep -q '"questions"'; then
    QUESTION_COUNT=$(echo "$QUESTIONS_RESPONSE" | grep -o '"id"' | wc -l)
    echo -e "   ${GREEN}✅ Questions endpoint working ($QUESTION_COUNT questions)${NC}"
else
    echo -e "   ${RED}❌ Questions endpoint failed${NC}"
    echo "   Response: $QUESTIONS_RESPONSE"
    exit 1
fi

# Test categories endpoint
echo "3. Testing /api/questions/categories..."
CATEGORIES_RESPONSE=$(curl -s "$WORKER_URL/api/questions/categories")
if echo "$CATEGORIES_RESPONSE" | grep -q '"categories"'; then
    CATEGORY_COUNT=$(echo "$CATEGORIES_RESPONSE" | grep -o '"id"' | wc -l)
    echo -e "   ${GREEN}✅ Categories endpoint working ($CATEGORY_COUNT categories)${NC}"
else
    echo -e "   ${RED}❌ Categories endpoint failed${NC}"
    echo "   Response: $CATEGORIES_RESPONSE"
    exit 1
fi

# Test chat endpoint (POST)
echo "4. Testing /api/chat..."
CHAT_RESPONSE=$(curl -s -X POST "$WORKER_URL/api/chat" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}')
if echo "$CHAT_RESPONSE" | grep -q '"response"'; then
    echo -e "   ${GREEN}✅ Chat endpoint working${NC}"
elif echo "$CHAT_RESPONSE" | grep -q 'GROQ_API_KEY not configured'; then
    echo -e "   ${YELLOW}⚠️  Chat endpoint working but GROQ_API_KEY not set${NC}"
    echo "   Run: wrangler secret put GROQ_API_KEY"
else
    echo -e "   ${RED}❌ Chat endpoint failed${NC}"
    echo "   Response: $CHAT_RESPONSE"
fi

echo ""
echo "=========================================="
echo -e "${GREEN}🎉 Deployment verification complete!${NC}"
echo ""
echo "All critical endpoints are working."
echo "Your Interview Intelligence API is ready!"
echo ""
