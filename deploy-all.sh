#!/usr/bin/env bash
set -e

echo "=== 1. Deploying Shopify Editions Winter 2026 to Vercel ==="
cd "/home/riftyxso/Documents/benchmark/clone web test/clone 2"
if [ ! -d "dist" ]; then
  npm run build
fi
vercel --name shopify-editions-winter-2026 --prod --yes

echo ""
echo "=== 2. Deploying Pear Website to Vercel ==="
cd "/home/riftyxso/Documents/benchmark/clone web test"
if [ ! -d "dist" ]; then
  npm run build
fi
vercel --name pear-cinematic-web --prod --yes

echo ""
echo "=== 3. Committing and Pushing Porto to GitHub ==="
cd /home/riftyxso/porto
git add .
git commit -m "feat(benchmarks): setup full Vercel deployments and fix benchmark routes

Co-Authored-By: Claude Code <noreply@anthropic.com>" || echo "No changes to commit"
git push origin master

echo ""
echo "=== Semua proses deploy dan push selesai! ==="
