#!/usr/bin/env bash
set -euo pipefail
# Build the Android web bundle + sync into the Capacitor project. Run from repo root.
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "→ Building intercity widget..."
(cd intercity && npm install --silent && npm run build)

echo "→ Generating sitemap + BUILD_VERSION..."
export BUILD_VERSION=$(node -e 'process.stdout.write(String(Date.now()))')
node scripts/generate-sitemap.mjs

echo "→ Building web app for Android (VITE_PLATFORM=android)..."
VITE_PLATFORM=android npx vite build

echo "→ Syncing into Capacitor android project..."
npx cap sync android

echo "✓ Mobile web build + sync complete"
