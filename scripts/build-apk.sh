#!/usr/bin/env bash
set -euo pipefail
# Full APK build: web bundle → Capacitor sync → Gradle release APK.
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# Capacitor 8 plugins require the Java 21 toolchain — prefer JDK 21 when present.
if [ -z "${JAVA_HOME:-}" ] && [ -x /opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home/bin/java ]; then
  export JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home
fi

bash "$ROOT/scripts/build-mobile.sh"

cd "$ROOT/android"
./gradlew assembleRelease

echo "✓ APK: $ROOT/android/app/build/outputs/apk/release/app-release.apk"
