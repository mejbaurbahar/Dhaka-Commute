// Build-time platform flag — replaced by Vite with a literal `true`/`false`
// so bundlers fold it and tree-shake the unused ad branch:
// web bundle ships zero AdMob code, app bundle zero AdSense.
// 'web' = AdSense build (default), 'android' = AdMob build (build:mobile).
declare const __KJ_NATIVE__: boolean;

export type KJPlatform = 'web' | 'android';

// Module-level const for runtime checks. Tree-shaking-critical components use
// __KJ_NATIVE__ directly (per-file declare) — rollup only folds same-file literals.
export const KJ_IS_NATIVE: boolean = __KJ_NATIVE__;

/** True when running inside the Android Capacitor WebView (AdMob code path). */
export function isNativePlatform(): boolean {
  return KJ_IS_NATIVE || hasCapacitor();
}

/** Runtime Capacitor presence check (works for ad-hoc debugging too). */
export function hasCapacitor(): boolean {
  try {
    if (typeof window !== 'undefined' && (window as any).Capacitor?.isNativePlatform?.()) {
      return true;
    }
  } catch {
    // ignore
  }
  try {
    return typeof location !== 'undefined' && location.protocol === 'capacitor:';
  } catch {
    return false;
  }
}
