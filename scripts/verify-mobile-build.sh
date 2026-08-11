#!/usr/bin/env bash
set -uo pipefail
# Verify the mobile build is clean: zero AdSense code, AdMob present.
# IMPORTANT: run right after a VITE_PLATFORM=android build — a subsequent
# web build overwrites dist/ and invalidates these checks.
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
FAIL=0

echo "── Mobile bundle checks ──"
if grep -rl "adsbygoogle" dist/assets/*.js >/dev/null 2>&1; then
  echo "✗ AdSense (adsbygoogle) in mobile bundle"; FAIL=1
else
  echo "✓ No adsbygoogle in mobile bundle"
fi
if grep -rl "ca-pub-" dist/assets/*.js >/dev/null 2>&1; then
  echo "✗ AdSense client ID (ca-pub-) in mobile bundle"; FAIL=1
else
  echo "✓ No AdSense client ID in mobile bundle"
fi
if grep -rl "kj-admob-host" dist/assets/*.js >/dev/null 2>&1; then
  echo "✓ AdMob banner component present"
else
  echo "✗ kj-admob-host missing from mobile bundle"; FAIL=1
fi
if ls dist/assets/vendor-*.js >/dev/null 2>&1; then
  echo "✓ Vendor chunks present (AdMob plugin dynamic chunk)"
else
  echo "✗ No vendor chunks found"; FAIL=1
fi

echo "── index.html checks (mobile) ──"
# Match actual loader script/img srcs — CSP meta domains are harmless policy, not loaders.
if grep -q 'src="https://[^"]*\(adsbygoogle\|fundingchoices\|daamdekhi\)' dist/index.html; then
  echo "✗ Ad loader script still in mobile index.html"; FAIL=1
else
  echo "✓ No ad loader scripts in mobile index.html"
fi

echo "── Android project checks ──"
for perm in INTERNET ACCESS_NETWORK_STATE ACCESS_FINE_LOCATION ACCESS_COARSE_LOCATION; do
  if grep -q "android.permission.$perm" android/app/src/main/AndroidManifest.xml; then
    echo "✓ Permission $perm"
  else
    echo "✗ Permission $perm missing"; FAIL=1
  fi
done
if [ -f android/keystore.properties ]; then
  echo "✓ keystore.properties present"
else
  echo "✗ keystore.properties missing — release build cannot sign"; FAIL=1
fi

if [ "$FAIL" -eq 0 ]; then
  echo ""
  echo "✓ ALL CHECKS PASSED — mobile build is clean"
else
  echo ""
  echo "✗ FAILURES — inspect output above"
  exit 1
fi
