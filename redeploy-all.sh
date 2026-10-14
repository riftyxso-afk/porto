#!/usr/bin/env bash
set -e

echo "=== 1. Redeploying Shopify Editions Winter 2026 ==="
cd "/home/riftyxso/Documents/benchmark/clone web test/clone 2"
npm run build
vercel --name shopify-editions-winter-2026 --prod --yes

echo ""
echo "=== 2. Redeploying Pear Website ==="
cd "/home/riftyxso/Documents/benchmark/clone web test"
npm run build
vercel --name pear-cinematic-web --prod --yes

echo ""
echo "=== 3. Redeploying WareTrack Astra Max ==="
cd "/home/riftyxso/Documents/benchmark/gpt 6 astra max"
npm run build
vercel --name waretrack-astra --prod --yes

echo ""
echo "=== 4. Redeploying WareTrack Sol 6.1 ==="
cd "/home/riftyxso/Documents/benchmark/gpt 6.1 sol"
npm run build
vercel --name waretrack-sol --prod --yes

echo ""
echo "=== 5. Redeploying Porto to Vercel Production ==="
cd /home/riftyxso/porto
vercel --prod --yes

echo ""
echo "=== ✅ Semua 5 proyek berhasil di-redeploy ke Vercel Production! ==="
