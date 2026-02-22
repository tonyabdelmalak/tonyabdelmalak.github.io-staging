# Cloudflare Worker Auto-Deployment Setup

## GitHub Secrets Required

1. CLOUDFLARE_API_TOKEN
   - Get from: https://dash.cloudflare.com/profile/api-tokens
   - Create token with "Edit Cloudflare Workers" permissions

2. CLOUDFLARE_ACCOUNT_ID
   - Find at: https://dash.cloudflare.com/ (right sidebar)

## Add to GitHub

1. Go to: https://github.com/tonyabdelmalak/tonyabdelmalak.github.io-staging/settings/secrets/actions
2. Add both secrets

## Trigger Deployment

Manual: https://github.com/tonyabdelmalak/tonyabdelmalak.github.io-staging/actions
Click "Deploy Cloudflare Worker" → "Run workflow"

## Verify

curl https://interview-master-worker.tonyabdelmalak.workers.dev/questions
