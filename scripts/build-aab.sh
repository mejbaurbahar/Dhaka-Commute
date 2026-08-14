#!/usr/bin/env bash
set -euo pipefail
# Full AAB build: web bundle → Capacitor sync → Gradle release bundle.
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# Capacitor 8 plugins require the Java 21 toolchain — always prefer JDK 21.
# A stale JAVA_HOME (e.g. openjdk@17) makes Gradle fail with
# "invalid source release: 21", so JDK 21 wins over whatever the shell has set.
if [ -x /opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home/bin/java ]; then
  export JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home
fi

bash "$ROOT/scripts/build-mobile.sh"

cd "$ROOT/android"
./gradlew bundleRelease

echo "✓ AAB: $ROOT/android/app/build/outputs/bundle/release/app-release.aab"
