#!/usr/bin/env bash
set -e

cd /home/riftyxso/porto
git add src/data/recapData.ts src/app/recap/page.tsx redeploy-all.sh
git commit -m "feat(recap): connect WareTrack live Vercel deployments and clean benchmark syncing

Co-Authored-By: Claude Code <noreply@anthropic.com>" || echo "No changes to commit"
git push origin master

echo "Porto master pushed to GitHub successfully!"
