#!/usr/bin/env bash
set -euo pipefail
# Build the Android web bundle + sync into the Capacitor project. Run from repo root.
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "→ Building intercity widget..."
(cd intercity && npm install --silent && npm run build)

echo "→ Generating sitemap + BUILD_VERSION..."
export BUILD_VERSION=$(node -e 'process.stdout.write(String(Date.now()))')
# Keep version.json's androidVersionCode in sync with the Play Store release
# (AndroidManifest versionCode lives in android/app/build.gradle).
export ANDROID_VERSION_CODE=$(grep -o 'versionCode [0-9]*' android/app/build.gradle | head -1 | grep -o '[0-9]*')
node scripts/generate-sitemap.mjs

echo "→ Building web app for Android (VITE_PLATFORM=android)..."
VITE_PLATFORM=android npx vite build

# Prune web-only assets from the Android bundle (SEO/static pages, localized
# landing pages, sitemap artifacts). The SPA never fetches these; they only
# inflate the AAB (~45 MB before pruning). Blog/intercity/deals stay — the
# app reads them.
for p in bus train metro local-bus launch truck air \
         about advertise ai contact faq fare for-ai history privacy terms \
         bn en hi ja ko zh fr de es ar \
         sitemap.xml robots.txt llms.txt llm-data.json; do
  rm -rf "dist/$p"
done

echo "→ Syncing into Capacitor android project..."
npx cap sync android

echo "✓ Mobile web build + sync complete"
