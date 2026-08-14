import type { RemoteConfig } from 'firebase/remote-config';
import { app, isFirebaseConfigured } from './firebaseConfig';

/**
 * Firebase Remote Config — kill-switch + announcement flags.
 * Values are fetched once per session (12h TTL); failures are silent
 * so a Remote Config outage never breaks the app.
 *
 * Flags consumed by ConfigBanner:
 *  - maintenance_mode  (boolean, default false)  → red "under maintenance" bar
 *  - announcement      (string, default '')      → dismissible info bar
 *  - show_ads          ('default' | 'off')       → reserved for ad kill-switch
 */

export interface RemoteFlags {
  maintenanceMode: boolean;
  announcement: string;
  showAds: 'default' | 'off';
}

export const DEFAULT_FLAGS: RemoteFlags = {
  maintenanceMode: false,
  announcement: '',
  showAds: 'default',
};

let flags: RemoteFlags = DEFAULT_FLAGS;
let listeners = new Set<(f: RemoteFlags) => void>();
let initialized = false;

export function getRemoteFlags(): RemoteFlags {
  return flags;
}

export function subscribeRemoteFlags(cb: (f: RemoteFlags) => void): () => void {
  listeners.add(cb);
  cb(flags);
  return () => { listeners.delete(cb); };
}

function apply(rc: RemoteConfig, getValueFn: (k: string) => { asBoolean: () => boolean; asString: () => string }) {
  const maintenanceMode = getValueFn('maintenance_mode').asBoolean();
  const announcement = getValueFn('announcement').asString();
  const showAds = getValueFn('show_ads').asString() === 'off' ? 'off' : 'default';
  flags = { maintenanceMode, announcement, showAds };
  listeners.forEach((l) => l(flags));
}

/** Fire-and-forget: never blocks first paint, never throws. */
export function initRemoteConfig() {
  if (initialized || !isFirebaseConfigured || typeof document === 'undefined') return;
  initialized = true;
  import('firebase/remote-config').then(async ({ getRemoteConfig, isSupported, fetchAndActivate, getValue }) => {
    if (!isSupported()) return;
    const rc = getRemoteConfig(app);
    rc.settings.minimumFetchIntervalMillis = 12 * 60 * 60 * 1000; // 12h
    rc.defaultConfig = {
      maintenance_mode: false,
      announcement: '',
      show_ads: 'default',
    };
    try {
      await fetchAndActivate(rc);
      apply(rc, (k) => getValue(rc, k));
    } catch {
      // Offline / blocked — keep defaults
    }
  }).catch(() => { /* dynamic import failed — non-fatal */ });
}
