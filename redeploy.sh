#!/usr/bin/env bash
set -e

echo "=== 🚀 Redeploying Porto to Vercel Production ==="
cd /home/riftyxso/porto
vercel --prod --yes

echo ""
echo "=== ✅ Porto redeploy selesai dan aktif di Vercel Production! ==="
