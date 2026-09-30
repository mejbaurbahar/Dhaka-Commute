// Ad unit constants — AdSense (web) and AdMob (Android).
// AdSense is banned in Android apps by Google Play policy, so the app build
// (VITE_PLATFORM=android) renders AdMob units instead — same placements,
// same publisher account, Play-compliant.

/** Web publisher + slots (AdSense) */
export const ADSENSE_CLIENT = 'ca-pub-8425219156685369';
export const ADSENSE_SLOTS = {
  DISPLAY: '3797668998',
  MULTIPLEX: '2707948607',
  IN_ARTICLE: '9568870428',
} as const;

/** Android units (AdMob) — from .env, set at build time */
export const ADMOB_UNITS = {
  APP_ID: import.meta.env.VITE_ADMOB_APP_ID as string,
  BANNER: import.meta.env.VITE_ADMOB_BANNER_ID as string,
  INTERSTITIAL: import.meta.env.VITE_ADMOB_INTERSTITIAL_ID as string,
  NATIVE: import.meta.env.VITE_ADMOB_NATIVE_ID as string,
  REWARDED: import.meta.env.VITE_ADMOB_REWARDED_ID as string,
} as const;
