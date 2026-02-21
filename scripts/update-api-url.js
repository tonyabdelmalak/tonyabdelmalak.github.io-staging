#!/usr/bin/env node

/**
 * Update API URL in .env.production
 * Usage: node scripts/update-api-url.js <worker-url>
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('❌ Error: Please provide the Cloudflare Worker URL');
  console.error('Usage: node scripts/update-api-url.js <worker-url>');
  console.error('Example: node scripts/update-api-url.js https://interview-intelligence-api.abc123.workers.dev');
  process.exit(1);
}

const workerUrl = args[0];

// Validate URL
if (!workerUrl.startsWith('https://')) {
  console.error('❌ Error: URL must start with https://');
  process.exit(1);
}

if (!workerUrl.includes('workers.dev')) {
  console.error('❌ Error: URL must be a Cloudflare Workers URL (*.workers.dev)');
  process.exit(1);
}

const envPath = path.join(__dirname, '..', '.env.production');

// Read current .env.production
let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

// Update or add VITE_API_BASE_URL
if (envContent.includes('VITE_API_BASE_URL=')) {
  envContent = envContent.replace(
    /VITE_API_BASE_URL=.*/,
    `VITE_API_BASE_URL=${workerUrl}`
  );
} else {
  envContent += `\nVITE_API_BASE_URL=${workerUrl}\n`;
}

// Write updated content
fs.writeFileSync(envPath, envContent);

console.log('✅ Updated .env.production');
console.log(`   VITE_API_BASE_URL=${workerUrl}`);
console.log('');
console.log('📦 Next step: npm run build && npm run deploy');
