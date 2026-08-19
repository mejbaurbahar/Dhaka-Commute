/**
 * Language auto-detection: browser language first (a Saudi visitor's phone
 * browser is Arabic → Arabic; a Bangladeshi's is bn → Bangla), then IP
 * geolocation as a fallback for ambiguous/empty browser locales.
 * Never forces Bangla on foreign visitors — English is the neutral fallback.
 */

export const SUPPORTED_LANGS = ['bn', 'en', 'hi', 'ja', 'ko', 'zh', 'fr', 'de', 'es', 'ar'] as const;
export type UiLang = typeof SUPPORTED_LANGS[number];

export const LANG_META: Record<UiLang, { native: string; name: string; flag: string; rtl?: boolean }> = {
  bn: { native: 'বাংলা', name: 'Bengali', flag: '🇧🇩' },
  en: { native: 'English', name: 'English', flag: '🇬🇧' },
  hi: { native: 'हिन्दी', name: 'Hindi', flag: '🇮🇳' },
  ja: { native: '日本語', name: 'Japanese', flag: '🇯🇵' },
  ko: { native: '한국어', name: 'Korean', flag: '🇰🇷' },
  zh: { native: '中文', name: 'Chinese', flag: '🇨🇳' },
  fr: { native: 'Français', name: 'French', flag: '🇫🇷' },
  de: { native: 'Deutsch', name: 'German', flag: '🇩🇪' },
  es: { native: 'Español', name: 'Spanish', flag: '🇪🇸' },
  ar: { native: 'العربية', name: 'Arabic', flag: '🇸🇦', rtl: true },
};

/** Country code → supported language (only maps where we have translations). */
const COUNTRY_LANG: Record<string, UiLang> = {
  BD: 'bn',
  SA: 'ar', AE: 'ar', EG: 'ar', QA: 'ar', KW: 'ar', BH: 'ar', OM: 'ar', IQ: 'ar', YE: 'ar',
  JO: 'ar', LB: 'ar', PS: 'ar', SY: 'ar', MA: 'ar', DZ: 'ar', TN: 'ar', LY: 'ar', SD: 'ar',
  IN: 'hi',
  JP: 'ja',
  KR: 'ko',
  CN: 'zh', TW: 'zh', HK: 'zh', SG: 'zh', MO: 'zh',
  FR: 'fr', LU: 'fr', MC: 'fr',
  DE: 'de', AT: 'de',
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es', VE: 'es', EC: 'es',
  GT: 'es', CU: 'es', BO: 'es', DO: 'es', HN: 'es', PY: 'es', SV: 'es', NI: 'es',
  CR: 'es', PA: 'es', UY: 'es', PR: 'es',
};

const GEO_CACHE_KEY = 'kj-lang-geo';
const OVERRIDE_KEY = 'kj-language';

export function storedOverride(): UiLang | null {
  try {
    const v = localStorage.getItem(OVERRIDE_KEY) as UiLang | null;
    return v && SUPPORTED_LANGS.includes(v) ? v : null;
  } catch { return null; }
}

/** Browser UI language → supported lang (ar-SA → ar, zh-CN → zh, en-US → en). */
export function browserLanguage(): UiLang | null {
  if (typeof navigator === 'undefined') return null;
  const raw = (navigator.language || navigator.languages?.[0] || '').toLowerCase();
  if (!raw) return null;
  const base = raw.split('-')[0];
  if (base === 'en') return 'en';
  if (base === 'bn') return 'bn';
  if (SUPPORTED_LANGS.includes(base as UiLang)) return base as UiLang;
  return null;
}

/** IP geolocation → country code, cached for 30 days. Null when offline/blocked. */
export async function geoCountryCode(): Promise<string | null> {
  try {
    const cached = localStorage.getItem(GEO_CACHE_KEY);
    if (cached) {
      const { cc, at } = JSON.parse(cached) as { cc: string | null; at: number };
      if (typeof cc === 'string' && Date.now() - at < 30 * 24 * 3600 * 1000) return cc;
    }
    const res = await fetch('https://ipwho.is/', { signal: AbortSignal.timeout(6000) });
    if (!res.ok) return null;
    const data = await res.json() as { success?: boolean; country_code?: string };
    const cc = data.success !== false ? (data.country_code ?? '') : '';
    try { localStorage.setItem(GEO_CACHE_KEY, JSON.stringify({ cc, at: Date.now() })); } catch { /* private mode */ }
    return cc || null;
  } catch {
    return null; // offline — caller falls back to default
  }
}

/** IP geolocation → supported language (Bangladeshi in BD → bn), cached 30 days. */
export async function geoLanguage(): Promise<UiLang | null> {
  const cc = await geoCountryCode();
  return cc ? (COUNTRY_LANG[cc.toUpperCase()] ?? null) : null;
}

/**
 * Resolve initial language:
 * 1. Stored user override (explicit choice wins).
 * 2. Browser language (Saudi visitor → Arabic, foreigner in BD → en, not bn).
 * 3. IP geolocation (Bangladeshi in BD → bn).
 * 4. Default bn (Bangladesh app, matches previous behavior).
 */
export async function resolveInitialLanguage(): Promise<UiLang> {
  const stored = storedOverride();
  if (stored) return stored;
  const browser = browserLanguage();
  if (browser) return browser;
  const geo = await geoLanguage();
  if (geo) return geo;
  return 'bn';
}
