// Ad unit constants — AdSense only. KoyJabo removed AdMob from the Android
// app (2026-08): the app is info-only with no ads; AdSense runs on the web
// (website + mobile web view), which Google Play policy permits.

/** Web publisher + slots (AdSense) */
export const ADSENSE_CLIENT = 'ca-pub-8425219156685369';
export const ADSENSE_SLOTS = {
  DISPLAY: '3797668998',
  MULTIPLEX: '2707948607',
  IN_ARTICLE: '9568870428',
} as const;
