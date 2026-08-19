import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { App as CapApp } from '@capacitor/app';
import { KJ_TOKENS, Theme, Lang, Device } from './tokens';
import { SUPPORTED_LANGS, LANG_META, storedOverride, browserLanguage, resolveInitialLanguage } from './i18n/languageDetect';
import { injectGlobalStyles } from './globalStyles';
import { findPair, findInterchange } from './busPairs';
import { SplashScreen } from './SplashScreen';
import { LocationConsentModal } from './components/LocationConsentModal';

// Build-time platform check — Vite statically replaces this with a literal.
const NATIVE_BUILD = import.meta.env.VITE_PLATFORM === 'android';

// HomePage is eager — it's always the landing screen
import { HomePage } from './screens/HomePage';
import { PageSkeleton } from './screens/PageSkeleton';
// System state pages are eager — needed for error boundaries and 404 handling
import { ErrorPage404, ErrorPage500, OfflinePage, MaintenancePage } from './screens/SystemStatesPage';

// All other screens are lazy — only loaded when the user navigates there
const LocalBusPage = React.lazy(() => import('./screens/LocalBusPage').then(m => ({ default: m.LocalBusPage })));
const MetroPage = React.lazy(() => import('./screens/MetroPage').then(m => ({ default: m.MetroPage })));
const TrainPage = React.lazy(() => import('./screens/TrainPage').then(m => ({ default: m.TrainPage })));
const LaunchPage = React.lazy(() => import('./screens/LaunchPage').then(m => ({ default: m.LaunchPage })));
const FlightsPage = React.lazy(() => import('./screens/FlightsPage').then(m => ({ default: m.FlightsPage })));
const TruckPage = React.lazy(() => import('./screens/TruckPage').then(m => ({ default: m.TruckPage })));
const AIChatPage = React.lazy(() => import('./screens/AIChatPage').then(m => ({ default: m.AIChatPage })));
const IntercityPage = React.lazy(() => import('./screens/IntercityPage').then(m => ({ default: m.IntercityPage })));
const RouteResultsV2Page = React.lazy(() => import('./screens/RouteResultsV2Page').then(m => ({ default: m.RouteResultsV2Page })));
const FareCalcPage = React.lazy(() => import('./screens/FareCalcPage').then(m => ({ default: m.FareCalcPage })));
const IntercityDetailPage = React.lazy(() => import('./screens/IntercityDetailPage').then(m => ({ default: m.IntercityDetailPage })));
const BusDetailPage = React.lazy(() => import('./screens/BusDetailPage').then(m => ({ default: m.BusDetailPage })));
const FromToBusPage = React.lazy(() => import('./screens/FromToBusPage').then(m => ({ default: m.FromToBusPage })));
const MetroDetailPage = React.lazy(() => import('./screens/MetroDetailPage').then(m => ({ default: m.MetroDetailPage })));
const TrainDetailPage = React.lazy(() => import('./screens/TrainDetailPage').then(m => ({ default: m.TrainDetailPage })));
const VehicleDetailPage = React.lazy(() => import('./screens/VehicleDetailPage').then(m => ({ default: m.VehicleDetailPage })));
const FlightDetailPage = React.lazy(() => import('./screens/FlightDetailPage').then(m => ({ default: m.FlightDetailPage })));
const RateReviewPage = React.lazy(() => import('./screens/RateReviewPage').then(m => ({ default: m.RateReviewPage })));
const MetroTokenPage = React.lazy(() => import('./screens/MetroTokenPage').then(m => ({ default: m.MetroTokenPage })));
const MetroPassPage = React.lazy(() => import('./screens/MetroPassPage').then(m => ({ default: m.MetroPassPage })));
const FavoritesPage = React.lazy(() => import('./screens/FavoritesPage').then(m => ({ default: m.FavoritesPage })));
const HistoryPage = React.lazy(() => import('./screens/HistoryPage').then(m => ({ default: m.HistoryPage })));
const SettingsPage = React.lazy(() => import('./screens/SettingsPage').then(m => ({ default: m.SettingsPage })));
const WhyPage = React.lazy(() => import('./screens/WhyPage').then(m => ({ default: m.WhyPage })));
const AboutPage = React.lazy(() => import('./screens/AboutPage').then(m => ({ default: m.AboutPage })));
const BlogsPage = React.lazy(() => import('./screens/BlogsPage').then(m => ({ default: m.BlogsPage })));
const BlogDetailPage = React.lazy(() => import('./screens/BlogDetailPage').then(m => ({ default: m.BlogDetailPage })));
const QAPage = React.lazy(() => import('./screens/QAPage').then(m => ({ default: m.QAPage })));
const ContactPage = React.lazy(() => import('./screens/ContactPage').then(m => ({ default: m.ContactPage })));
const ReleasePage = React.lazy(() => import('./screens/ReleasePage').then(m => ({ default: m.ReleasePage })));
const PrivacyPage = React.lazy(() => import('./screens/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage = React.lazy(() => import('./screens/TermsPage').then(m => ({ default: m.TermsPage })));
const InstallPage = React.lazy(() => import('./screens/InstallPage').then(m => ({ default: m.InstallPage })));
const AdvertisePage = React.lazy(() => import('./screens/AdvertisePage').then(m => ({ default: m.AdvertisePage })));
const DTCABusDetailPage = React.lazy(() => import('./screens/DTCABusDetailPage').then(m => ({ default: m.DTCABusDetailPage })));
const BusLiveMapPage = React.lazy(() => import('./screens/BusLiveMapPage').then(m => ({ default: m.BusLiveMapPage })));
const DiscoverPage = React.lazy(() => import('./screens/DiscoverPage').then(m => ({ default: m.DiscoverPage })));
const DestinationDetailPage = React.lazy(() => import('./screens/DestinationDetailPage').then(m => ({ default: m.DestinationDetailPage })));
const ItineraryPage = React.lazy(() => import('./screens/ItineraryPage').then(m => ({ default: m.ItineraryPage })));

const LazyFallback = () => <div style={{ minHeight: '60vh' }} />;
import { claimDailyBonus } from './utils/koyCoinService';
import { NavDrawer } from './components/NavDrawer';
// FloatingControls removed per user request
import { AIFab } from './components/AIFab';
import { AppUpdateDialog } from './components/AppUpdateDialog';
import { PlayStoreBanner } from './components/PlayStoreBanner';
const AIChatModal = React.lazy(() => import('./components/AIChatModal').then(m => ({ default: m.AIChatModal })));
import { TopBar } from './components/TopBar';
import { MobileTabBar } from './components/MobileTabBar';
import { ConfigBanner } from './components/ConfigBanner';
import { initRemoteConfig } from '../services/remoteConfigService';
import { SideRailAd, AnchorAd, VignetteAd } from './components/AdComponents';
import { BUS_DATA, STATIONS } from '../../constants';
type Route = string;

interface StackEntry {
  route: Route;
  params?: Record<string, string>;
}

const SECTION_MAP: Record<string, string> = {
  home: 'home', 'bus-hub': 'search', 'metro-hub': 'search', 'train-hub': 'search',
  'launch-hub': 'search', 'flights-hub': 'search', 'truck-hub': 'search', intercity: 'search',
  ai: 'ai', favorites: 'saved', history: 'you', settings: 'you',
};

// Routes that show a back button when there is a previous page in the stack.
// navTab() resets the stack so back never shows on tab-bar navigation — safe to list all non-home routes here.
const SHOW_BACK_ROUTES = new Set([
  // detail / leaf pages
  'bus-detail', 'from-to-bus', 'train-detail', 'metro-detail', 'intercity-detail', 'vehicle',
  'rate-review', 'metro-token', 'metro-pass', 'blog-detail',
  'results', 'install', 'flight-detail', 'dtca-bus-detail', 'bus-live-map',
  // transport search / hub pages
  'bus-hub', 'metro-hub', 'train-hub', 'launch-hub', 'flights-hub', 'truck-hub',
  'intercity', 'fare',
  // utility / info pages
  'favorites', 'history', 'ai', 'settings',
  'why', 'about', 'blogs', 'qa', 'faq', 'contact', 'release', 'privacy', 'terms', 'advertise',
  'discover', 'destination-detail', 'itinerary',
]);

const ROUTE_PATHS: Record<string, string> = {
  home: '/',
  'bus-hub': '/local-bus',
  'metro-hub': '/metro',
  'train-hub': '/train',
  'launch-hub': '/launch',
  'flights-hub': '/air',
  'truck-hub': '/truck',
  intercity: '/intercity',
  fare: '/fare',
  ai: '/ai',
  favorites: '/favorites',
  history: '/history',
  settings: '/settings',
  why: '/why',
  about: '/about',
  blogs: '/blog',
  qa: '/qa',
  faq: '/faq',
  contact: '/contact',
  release: '/release',
  privacy: '/privacy',
  terms: '/terms',
  install: '/install',
  advertise: '/advertise',
  'daily-journey': '/daily-journey',
  discover: '/discover',
  itinerary: '/itinerary',
};

// Must mirror scripts/generate-sitemap.mjs slugify() exactly — it strips
// "paribahan" (Active Paribahan → /bus/active/). The old unstripped variant
// is kept only for resolving legacy deep links.
const slugify = (value: string) => value.toLowerCase().trim().replace(/paribahan/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const slugifyKeepParibahan = (value: string) => value.toLowerCase().trim().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// Mirror of scripts/generate-sitemap.mjs slugify — destination URLs must match sitemap slugs
const destSlug = (value: string) => (value || '')
  .toLowerCase()
  .replace(/paribahan/g, '')
  .replace(/&/g, ' and ')
  .replace(/['’]/g, '')
  .normalize('NFKD')
  .replace(/[^\w\sঀ-৿-]/g, ' ')
  .trim()
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '');

function busSlug(busId?: string) {
  const bus = BUS_DATA.find(item => item.id === busId);
  return slugify(bus?.name || busId || 'bus');
}

function detailPath(route: string, params: Record<string, string> = {}) {
  const query = new URLSearchParams();
  if (params.from) query.set('from', slugify(params.from));
  if (params.to) query.set('to', slugify(params.to));
  const suffix = query.toString() ? `?${query.toString()}` : '';
  if (route === 'blog-detail') return `/blog/${params.slug || 'post'}`;
  // Destination slugs must match scripts/generate-sitemap.mjs (apostrophes dropped, not dashed)
  if (route === 'destination-detail') return `/places/${params.slug || destSlug(params.id || 'place')}/`;
  if (route === 'bus-detail') return `/bus/${busSlug(params.busId)}${suffix}`;
  if (route === 'bus-live-map') return `/bus/${busSlug(params.busId)}/live${suffix}`;
  if (route === 'from-to-bus') return params.via ? `/bus/${params.from}-to-${params.to}-via-${params.via}/` : `/bus/${params.from}-to-${params.to}/`;
  if (route === 'metro-detail') return `/metro/${slugify(params.stationId || params.id || 'detail')}${suffix}`;
  if (route === 'train-detail') return `/train/${slugify(params.trainId || params.id || 'detail')}${suffix}`;
  if (route === 'intercity-detail') {
    const base = slugify(params.operator || params.id || 'detail');
    const q = new URLSearchParams();
    if (params.from) q.set('from', params.from);
    if (params.to) q.set('to', params.to);
    const qs = q.toString() ? `?${q.toString()}` : '';
    return `/intercity/${base}${qs}`;
  }
  if (route === 'vehicle') return `/launch/${slugify(params.id || params.name || 'detail')}${suffix}`;
  if (route === 'dtca-bus-detail') return `/live-bus/${encodeURIComponent(params.identifier || 'bus')}`;
  if (route === 'flight-detail') {
    const base = (params.flightNo || params.code || 'flight').toLowerCase();
    const q = new URLSearchParams();
    if (params.fromIATA) q.set('from', params.fromIATA);
    if (params.toIATA) q.set('to', params.toIATA);
    const qs = q.toString() ? `?${q.toString()}` : '';
    return `/air/${base}${qs}`;
  }
  return ROUTE_PATHS[route] || '/';
}

function pathForEntry(entry: StackEntry) {
  if (['bus-detail', 'bus-live-map', 'from-to-bus', 'metro-detail', 'train-detail', 'intercity-detail', 'vehicle', 'flight-detail', 'blog-detail', 'dtca-bus-detail', 'destination-detail'].includes(entry.route)) {
    return detailPath(entry.route, entry.params || {});
  }
  if (entry.route === 'results') {
    const query = new URLSearchParams();
    if (entry.params?.from) query.set('from', entry.params.from);
    if (entry.params?.to) query.set('to', entry.params.to);
    if (entry.params?.search) query.set('search', entry.params.search);
    return `/local-bus/results${query.toString() ? `?${query.toString()}` : ''}`;
  }
  return ROUTE_PATHS[entry.route] || '/';
}

function entryFromLocation(): StackEntry {
  // Restore path stored by intercity/index.html or 404.html sessionStorage redirect
  try {
    const stored = sessionStorage.getItem('__kj_path') || sessionStorage.getItem('redirect');
    if (stored) {
      sessionStorage.removeItem('__kj_path');
      sessionStorage.removeItem('redirect');
      const url = new URL(stored, window.location.origin);
      window.history.replaceState({}, '', url.pathname + url.search + url.hash);
    }
  } catch { /* sessionStorage unavailable */ }

  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const search = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(search.entries()) as Record<string, string>;
  if (path.startsWith('/bus/')) {
    const slug = path.split('/')[2] || '';
    // Interchange pages: /bus/badda-to-dhanmondi-via-mohakhali/
    const viaMatch = slug.match(/^([a-z0-9_]+)-to-([a-z0-9_]+)-via-([a-z0-9_]+)$/);
    if (viaMatch && findInterchange(viaMatch[1], viaMatch[2])) {
      return { route: 'from-to-bus', params: { ...params, from: viaMatch[1], to: viaMatch[2], via: viaMatch[3] } };
    }
    // From→to answer pages: /bus/gulistan-to-dhanmondi/
    const fromTo = slug.match(/^([a-z0-9_]+)-to-([a-z0-9_]+)$/);
    if (fromTo && findPair(fromTo[1], fromTo[2])) {
      return { route: 'from-to-bus', params: { ...params, from: fromTo[1], to: fromTo[2] } };
    }
    // Live bus map: /bus/agradut/live
    if (path.split('/')[3] === 'live') {
      const bus = BUS_DATA.find(item => slugify(item.name) === slug || slugify(item.id) === slug);
      return { route: 'bus-live-map', params: { ...params, busId: bus?.id || slug } };
    }
    const bus = BUS_DATA.find(item => slugify(item.name) === slug || slugify(item.id) === slug)
      // legacy unstripped slugs (pre-sitemap-alignment deep links)
      ?? BUS_DATA.find(item => slugifyKeepParibahan(item.name) === slug);
    return { route: 'bus-detail', params: { ...params, busId: bus?.id || slug } };
  }
  if (path.startsWith('/local-bus/results')) return { route: 'results', params };
  if (path.startsWith('/metro/') && path !== '/metro') return { route: 'metro-detail', params: { ...params, stationId: path.split('/')[2] || '' } };
  if (path.startsWith('/train/') && path !== '/train') return { route: 'train-detail', params: { ...params, trainId: path.split('/')[2] || '' } };
  if (path.startsWith('/intercity/') && path !== '/intercity') return { route: 'intercity-detail', params: { ...params, id: path.split('/')[2] || '' } };
  if (path.startsWith('/launch/') && path !== '/launch') return { route: 'vehicle', params: { ...params, id: path.split('/')[2] || '' } };
  if ((path.startsWith('/live-bus/') || path.startsWith('/dtca/')) && path !== '/live-bus' && path !== '/dtca') return { route: 'dtca-bus-detail', params: { ...params, identifier: decodeURIComponent(path.split('/')[2] || '') } };
  if (path.startsWith('/air/') && path !== '/air') return { route: 'flight-detail', params: { ...params, code: (path.split('/')[2] || '').toUpperCase() } };
  if (path.startsWith('/places/') && path !== '/places') {
    return { route: 'destination-detail', params: { ...params, id: path.split('/')[2] || '' } };
  }
  if ((path.startsWith('/blog/') || path.startsWith('/blogs/')) && path !== '/blog' && path !== '/blogs') {
    return { route: 'blog-detail', params: { ...params, slug: path.split('/')[2] || '' } };
  }
  const match = Object.entries(ROUTE_PATHS).find(([, routePath]) => routePath === path);
  return { route: match?.[0] || 'home' };
}

function getInitialLang(): Lang {
  // Sync first paint: explicit override wins, then browser UI language
  // (Saudi visitor's Arabic phone → Arabic; foreigner in BD → en, never bn),
  // then Bangla as the Bangladeshi default. IP geolocation resolves async
  // after mount in the effect below.
  return storedOverride() ?? browserLanguage() ?? 'bn';
}

/** Theme persists per device in localStorage ('theme' key — the same key the
 *  index.html pre-paint script reads, so no wrong-theme flash). Default:
 *  Light for new users; an explicit Dark choice survives restarts. */
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  try {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function toggleTheme(t: Theme): Theme {
  const next = t === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('theme', next); } catch { /* private mode */ }
  return next;
}

export function KoyJaboApp() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [lang, setLang] = useState<Lang>(getInitialLang);
  const [forceDesktop, setForceDesktop] = useState(false); // phone user can request desktop view
  const [stack, setStack] = useState<StackEntry[]>(() => [entryFromLocation()]);
  const stackRef = useRef(stack);
  stackRef.current = stack;
  const [menuOpen, setMenuOpen] = useState(false);
  const [dir, setDir] = useState<'fwd' | 'back' | 'tab'>('fwd');
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [splash, setSplash] = useState(true);
  const [vignette, setVignette] = useState(false);
  const [anchorOn, setAnchorOn] = useState(true);
  const [vw, setVw] = useState(window.innerWidth);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [aiOpen, setAiOpen] = useState(false); // global AI chat popup
  const [aiQ, setAiQ] = useState<string | undefined>(); // prefill question for the popup
  const scrollerRef = useRef<HTMLDivElement>(null);
  const vignetteTimer = useRef<number>(0);
  const adNavRef = useRef(false);

  // Inject global styles once
  useEffect(() => { injectGlobalStyles(); }, []);

  // Keep <html>.dark in sync with the theme state — index.html's FOLM script
  // sets it at load, but runtime toggles must update it too (CSS .dark rules
  // like body background and .adsense-container depend on it).
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Daily-use bonus (no accounts — per-device)
  useEffect(() => { claimDailyBonus(); }, []);

  // Clear any stale pre-removal auth session left in old browsers
  useEffect(() => { try { localStorage.removeItem('koyjabo_auth_session'); } catch { /* ignore */ } }, []);

  // Firebase Remote Config (maintenance/announcement flags) — fire-and-forget
  useEffect(() => { initRemoteConfig(); }, []);

  // New SW / version available → silent auto-update (reload). No popup on the
  // website — the PWA updates itself. The native app shows its own Play Store
  // update dialog (AppUpdateDialog), also without this toast.
  useEffect(() => {
    const handler = () => {
      // Local dev: BUILD_VERSION isn't set, so version.json never matches the
      // running bundle — would reload on every focus. Skip reloading there.
      const host = window.location.hostname;
      if (host === 'localhost' || host === '127.0.0.1') return;
      // Small grace so the current render commits; then apply the update.
      setTimeout(() => window.location.reload(), 1200);
    };
    window.addEventListener('kj-update-available', handler);
    return () => window.removeEventListener('kj-update-available', handler);
  }, []);

  // Dismiss both splash screens after 1.4s, then show consent modal on first visit
  useEffect(() => {
    const t = setTimeout(() => {
      setSplash(false);
      const el = document.getElementById('kj-splash');
      if (el) { el.style.opacity = '0'; el.style.visibility = 'hidden'; setTimeout(() => el.remove(), 600); }
      // Show consent modal only if user hasn't decided yet
      if (!localStorage.getItem('kj-location-consent')) {
        setShowConsentModal(true);
      }
    }, 1400);
    return () => clearTimeout(t);
  }, []);

  // Show vignette ad after 3 minutes of use
  useEffect(() => {
    vignetteTimer.current = window.setTimeout(() => setVignette(true), 180000);
    return () => clearTimeout(vignetteTimer.current);
  }, []);

  // On mobile: add a dismiss button above any auto-injected AdSense unit (Google Auto Ads)
  // that is NOT inside one of our managed NativeAdCard wrappers [data-kj-ad].
  // Expression ternary so the body (auto-ads are web-only) is tree-shaken out of the app build.
  useEffect(
    NATIVE_BUILD
      ? () => undefined
      : () => {
          if (window.innerWidth >= 1024) return;
          const tagged = new WeakSet<Element>();

          const process = (ins: Element) => {
            if (tagged.has(ins) || ins.closest('[data-kj-ad]')) return;
            tagged.add(ins);

            const poll = setInterval(() => {
              const status = ins.getAttribute('data-adsbygoogle-status');
              if (status !== 'done' && status !== 'filled') return;
              clearInterval(poll);
              const iframe = ins.querySelector('iframe');
              if (!iframe || !iframe.src || iframe.src.startsWith('about:')) return;

              const parent = ins.parentElement;
              if (!parent || parent.getAttribute('data-kj-auto-dismiss') === '1') return;
              parent.setAttribute('data-kj-auto-dismiss', '1');

              const bar = document.createElement('div');
              bar.style.cssText = 'display:flex;justify-content:flex-end;padding:2px 4px;';
              const btn = document.createElement('button');
              btn.textContent = '✕';
              btn.setAttribute('aria-label', 'Close');
              btn.style.cssText = [
                'background:rgba(0,0,0,0.1)', 'color:#666', 'border:1px solid rgba(0,0,0,0.15)',
                'border-radius:999px', 'width:24px', 'height:24px', 'font-size:12px',
                'cursor:pointer', 'display:flex', 'align-items:center', 'justify-content:center',
                'padding:0', 'line-height:1',
              ].join(';');
              btn.onclick = () => { parent.style.display = 'none'; };
              bar.appendChild(btn);
              parent.insertBefore(bar, ins);
            }, 800);

            setTimeout(() => clearInterval(poll), 20000);
          };

          document.querySelectorAll('ins.adsbygoogle').forEach(process);
          const obs = new MutationObserver(() => document.querySelectorAll('ins.adsbygoogle').forEach(process));
          obs.observe(document.body, { childList: true, subtree: true });
          return () => obs.disconnect();
        },
    []
  );

  // Track vw for rail ads
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const top = stack[stack.length - 1];
  const canBack = stack.length > 1;

  // On SPA navigation: reset anchor ad. Auto Ads detects URL changes natively —
  // pushing enable_page_level_ads again throws a TagError and breaks ad serving.
  useEffect(() => {
    if (!adNavRef.current) { adNavRef.current = true; return; }
    setAnchorOn(true);
  }, [top.route]);

  const tk = KJ_TOKENS[theme];

  const pushUrl = useCallback((entry: StackEntry, replace = false) => {
    const nextPath = pathForEntry(entry);
    const currentPath = `${window.location.pathname}${window.location.search}`;
    if (nextPath === currentPath) return;
    if (replace) window.history.replaceState(entry, '', nextPath);
    else window.history.pushState(entry, '', nextPath);
  }, []);

  useEffect(() => {
    pushUrl(stack[stack.length - 1], true);
    const onPop = () => {
      setDir('back');
      setStack([entryFromLocation()]);
      if (scrollerRef.current) scrollerRef.current.scrollTop = 0;
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Resolve actual device — forceDesktop lets phone users request web layout
  const resolvedDevice: 'desktop' | 'mobile' = (vw < 1024 && !forceDesktop) ? 'mobile' : 'desktop';

  const nav = useCallback((route: Route, params?: Record<string, string>) => {
    // AI chat opens as a popup from any page — only direct /ai URLs load the full page
    if (route === 'ai') { setAiQ(params?.q); setAiOpen(true); return; }
    const entry = { route, params };
    // Double-tap guard — ignore a nav to the page already on top of the stack
    const top = stackRef.current[stackRef.current.length - 1];
    if (top && top.route === route && JSON.stringify(top.params ?? {}) === JSON.stringify(params ?? {})) return;
    setDir('fwd');
    setShowSkeleton(true);
    pushUrl(entry);
    if (['results', 'bus-hub', 'metro-hub', 'train-hub', 'flights-hub', 'intercity', 'launch-hub', 'truck-hub'].includes(route)) {
    }
    setTimeout(() => {
      setStack(s => [...s, entry]);
      setShowSkeleton(false);
      if (scrollerRef.current) scrollerRef.current.scrollTop = 0;
    }, 160);
  }, [pushUrl]);

  const navTab = useCallback((route: Route) => {
    if (route === 'ai') { setAiOpen(true); return; } // AI tab = popup, not a page
    const entry = { route };
    setDir('tab'); // tab switch = cross-fade, not directional slide
    pushUrl(entry);
    setStack([entry]);
    if (scrollerRef.current) scrollerRef.current.scrollTop = 0;
  }, [pushUrl]);

  const back = useCallback(() => {
    if (stack.length <= 1) {
      // Direct URL entry (e.g. /bus/agradut/live) — no stack to pop. Go back
      // in browser history, or home if there's nowhere to go.
      if (window.history.length > 1) window.history.back();
      else nav('home');
      return;
    }
    const previous = stack[stack.length - 2];
    setDir('back');
    setStack(s => s.slice(0, -1));
    pushUrl(previous);
    if (scrollerRef.current) scrollerRef.current.scrollTop = 0;
  }, [stack, pushUrl, nav]);

  // Keyboard back
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (aiOpen) return; // AI modal handles Escape itself
      if ((e.key === 'Escape' || e.key === 'Backspace') &&
        !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName) &&
        !(e.target as HTMLElement).isContentEditable) {
        if (canBack) { e.preventDefault(); back(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [canBack, back]);

  // Android hardware back button — keep refs so the listener registered
  // once at mount always sees the latest state without re-registering.
  const backRef = useRef(back);
  backRef.current = back;
  const canBackRef = useRef(canBack);
  canBackRef.current = canBack;
  const aiOpenRef = useRef(aiOpen);
  aiOpenRef.current = aiOpen;

  useEffect(() => {
    if (!NATIVE_BUILD) return;
    let handle: { remove: () => void } | null = null;
    CapApp.addListener('backButton', () => {
      // If AI modal open, close it first
      if (aiOpenRef.current) { setAiOpen(false); return; }
      if (canBackRef.current) {
        backRef.current();
      } else {
        CapApp.minimizeApp();
      }
    }).then(h => { handle = h; });
    return () => { handle?.remove(); };
  }, []); // register once at mount — uses refs for live state

  // Back button only on detail/leaf pages, not on hub/main pages
  // bus-live-map always gets a back button — users often land on it directly via URL.
  const showBack = SHOW_BACK_ROUTES.has(top.route) && (canBack || top.route === 'bus-live-map');

  const toggleLang = useCallback(() => {
    // Cycles through all 10 UI languages; Arabic flips the document to RTL.
    setLang(l => {
      const i = SUPPORTED_LANGS.indexOf(l);
      const next = SUPPORTED_LANGS[(i + 1) % SUPPORTED_LANGS.length];
      localStorage.setItem('kj-language', next);
      return next;
    });
  }, []);

  // Auto-detect on first visit: no stored override → IP geolocation
  // (BD → Bangla, Saudi Arabia → Arabic, India → Hindi, else English).
  useEffect(() => {
    if (storedOverride()) return;
    let cancelled = false;
    resolveInitialLanguage().then(resolved => {
      if (cancelled) return;
      setLang(prev => {
        if (prev === resolved) return prev;
        try { localStorage.setItem('kj-language', resolved); } catch { /* private mode */ }
        return resolved;
      });
    });
    return () => { cancelled = true; };
  }, []);

  // RTL document direction for Arabic (flex layouts mirror automatically)
  useEffect(() => {
    document.documentElement.dir = LANG_META[lang]?.rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const sharedProps = {
    theme, device: resolvedDevice, lang,
    route: top.route, params: top.params ?? {},
    canBack: showBack, onBack: back, onNav: nav, onNavTab: navTab,
    onLang: toggleLang,
    onLangTo: (l: Lang) => { try { localStorage.setItem('kj-language', l); } catch { /* private mode */ } setLang(l); },
    onTheme: () => setTheme(toggleTheme),
    onMenu: () => setMenuOpen(true),
  } as any; // typed via each screen's Props interface

  const section = SECTION_MAP[top.route] || 'home';
  const showRails = resolvedDevice === 'desktop' && vw >= 1500;
  // Show anchor ad on all devices — mobile positions it above the tab bar
  const showAnchor = anchorOn;
  const isPhone = resolvedDevice === 'mobile';
  const showFrame = false; // no phone frame mode — always full responsive

  function renderScreen(route: Route, params?: Record<string, string>) {
    const p = { ...sharedProps, params };
    switch (route) {
      case 'home': return <HomePage {...p}/>;
      case 'bus-hub': return <LocalBusPage {...p}/>;
      case 'metro-hub': return <MetroPage {...p}/>;
      case 'train-hub': return <TrainPage {...p}/>;
      case 'launch-hub': return <LaunchPage {...p}/>;
      case 'flights-hub': return <FlightsPage {...p}/>;
      case 'truck-hub': return <TruckPage {...p}/>;
      case 'ai': return <AIChatPage {...p}/>;
      case 'intercity': return <IntercityPage {...p}/>;
      case 'results': return <RouteResultsV2Page {...p}/>;
      case 'fare': return <FareCalcPage {...p}/>;
      case 'intercity-detail': return <IntercityDetailPage {...p}/>;
      case 'bus-detail': return <BusDetailPage {...p}/>;
      case 'bus-live-map': return <BusLiveMapPage {...p}/>;
      case 'from-to-bus': return <FromToBusPage {...p}/>;
      case 'dtca-bus-detail': return <DTCABusDetailPage {...p}/>;
      case 'metro-detail': return <MetroDetailPage {...p}/>;
      case 'train-detail': return <TrainDetailPage {...p}/>;
      case 'vehicle': return <VehicleDetailPage {...p}/>;
      case 'flight-detail': return <FlightDetailPage {...p}/>;
      case 'rate-review': return <RateReviewPage {...p}/>;
      case 'metro-token': return <MetroTokenPage {...p}/>;
      case 'metro-pass': return <MetroPassPage {...p}/>;
      case 'favorites': return <FavoritesPage {...p}/>;
      case 'history': return <HistoryPage {...p}/>;
      case 'settings': return <SettingsPage {...p}/>;
      case 'why': return <WhyPage {...p}/>;
      case 'about': return <AboutPage {...p}/>;
      case 'blogs': return <BlogsPage {...p}/>;
      case 'blog-detail': return <BlogDetailPage {...p}/>;
      case 'qa':
      case 'faq': return <QAPage {...p}/>;
      case 'contact': return <ContactPage {...p}/>;
      case 'release': return <ReleasePage {...p}/>;
      case 'privacy': return <PrivacyPage {...p}/>;
      case 'terms': return <TermsPage {...p}/>;
      case 'install': return <InstallPage {...p}/>;
      case 'advertise': return <AdvertisePage {...p}/>;
      case 'daily-journey': return <HomePage {...p}/>;
      case 'discover': return <DiscoverPage {...p}/>;
      case 'destination-detail': return <DestinationDetailPage {...p}/>;
      case 'itinerary': return <ItineraryPage {...p}/>;
      case '500': return <ErrorPage500 theme={theme} lang={lang}/>;
      case 'offline': return <OfflinePage theme={theme} lang={lang}/>;
      case 'maintenance': return <MaintenancePage theme={theme} lang={lang}/>;
      default: return <ErrorPage404 theme={theme} lang={lang} onHome={() => navTab('home')}/>;
    }
  }

  const screenKey = `${stack.length}:${top.route}`;

  const screenContent = (
    <div key={screenKey} className={`kj-screen kj-${dir}`} style={{ minHeight: '100%' }}>
      {showSkeleton
        ? <PageSkeleton tk={tk} lang={lang} isMobile={isPhone} />
        : <Suspense fallback={<LazyFallback />}>
            {renderScreen(top.route, top.params)}
          </Suspense>}
    </div>
  );

  // AI FAB — sticky inside scroller so it pins to phone screen too
  // Hidden on the AI page itself
  // AIFab — fixed so it always shows regardless of scroll/overflow context
  const aiFab = top.route !== 'ai' ? (
    <div style={{
      position: 'fixed', right: 16,
      bottom: isPhone
        // 192px = 72px tab bar + 120px max anchor height — FAB always clears a filled anchor
        ? (anchorOn ? 'calc(192px + env(safe-area-inset-bottom))' : 'calc(92px + env(safe-area-inset-bottom))')
        : (anchorOn ? 'calc(132px + env(safe-area-inset-bottom))' : 24),
      zIndex: 9200, pointerEvents: 'auto',
    }}>
      <AIFab tk={tk} lang={lang} onNav={() => setAiOpen(true)}/>
    </div>
  ) : null;

  let stage: React.ReactNode;
  if (showFrame) {
    const fh = Math.min(window.innerHeight - 48, 880);
    stage = (
      <div style={{
        width: '100%', minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: theme === 'dark' ? '#05060b' : '#dde6ee',
        padding: 24, boxSizing: 'border-box',
      }}>
        <div style={{
          width: 414, height: fh, borderRadius: 52, padding: 12,
          background: 'linear-gradient(160deg,#23252c,#0c0d11)',
          boxShadow: '0 40px 100px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
          flexShrink: 0,
        }}>
          <div ref={scrollerRef} data-app-scroller="true" style={{
            width: '100%', height: '100%', borderRadius: 40,
            overflow: 'hidden auto', background: tk.bg,
            position: 'relative', WebkitOverflowScrolling: 'touch',
          }}>
            {screenContent}
            {aiFab}
          </div>
        </div>
      </div>
    );
  } else {
    stage = (
      <div ref={scrollerRef} data-app-scroller="true" style={{
        width: '100%', height: '100dvh',
        overflowX: forceDesktop ? 'auto' : 'hidden',
        overflowY: 'auto',
        background: tk.bg, position: 'relative',
        WebkitOverflowScrolling: 'touch',
        paddingLeft: showRails ? 184 : 0,
        paddingRight: showRails ? 184 : 0,
        paddingBottom: 0,
        boxSizing: 'border-box',
      }}>
        {/* When forcing desktop on phone, content needs min-width to render properly */}
        <div style={{ minWidth: forceDesktop ? 1280 : 'auto' }}>
        {screenContent}
        </div>
      </div>
    );
  }

  const liftBottom = showAnchor ? 88 : 16;

  return (
    <>
      {splash && <SplashScreen/>}
      {/* TopBar rendered here — outside the animated .kj-screen wrapper */}
      {/* This avoids CSS transform containment block issue that breaks position:fixed */}
      <TopBar
        tk={tk} lang={lang} theme={theme}
        device={resolvedDevice}
        activeRoute={top.route}
        canBack={showBack} onBack={back}
        onNav={nav} onLangTo={sharedProps.onLangTo}
        onTheme={() => setTheme(toggleTheme)}
        onMenu={() => setMenuOpen(true)}
      />
      {/* Remote Config maintenance/announcement bar — below TopBar, above content */}
      <ConfigBanner lang={lang} />
      {/* Play Store download bar — phone web only, hidden for installed/native users */}
      {isPhone && !NATIVE_BUILD && <PlayStoreBanner tk={tk} lang={lang} />}
      {/* Mobile tab bar — outside scroller too */}
      {isPhone && (
        <MobileTabBar
          tk={tk} lang={lang}
          activeRoute={top.route}
          onNav={navTab}
          onMenu={() => setMenuOpen(true)}
        />
      )}
      <main>{stage}</main>
      {aiFab}
      {aiOpen && <Suspense fallback={<LazyFallback />}><AIChatModal theme={theme} lang={lang} isMobile={isPhone} initialQ={aiQ} onClose={() => setAiOpen(false)} /></Suspense>}
      {/* Desktop view toggle removed — mobile users always get mobile layout */}
      <NavDrawer
        open={menuOpen} theme={theme} lang={lang}
        activeRoute={top.route}
        onClose={() => setMenuOpen(false)}
        onNav={(r) => { setMenuOpen(false); nav(r); }}
      />
      {showRails && (
        <>
          <SideRailAd tk={tk} lang={lang} side="left"/>
          <SideRailAd tk={tk} lang={lang} side="right"/>
        </>
      )}
      {/* No anchor ad on the AI chat page — it covers the sticky input bar */}
      {showAnchor && top.route !== 'ai' && <AnchorAd key={top.route} tk={tk} lang={lang} onClose={() => setAnchorOn(false)} bottomOffset={isPhone ? 'calc(72px + env(safe-area-inset-bottom))' : '0px'}/>}
      {!isPhone && <VignetteAd tk={tk} lang={lang} open={vignette} onClose={() => setVignette(false)}/>}
      {/* Native app only: Play Store update dialog (never shown on the website) */}
      <AppUpdateDialog tk={tk} lang={lang} />
      <LocationConsentModal
        tk={tk} lang={lang} open={showConsentModal}
        onNav={(r) => { setShowConsentModal(false); nav(r); }}
        onAllow={() => {
          localStorage.setItem('kj-location-consent', 'yes');
          setShowConsentModal(false);
          navigator.geolocation?.getCurrentPosition(
            pos => {
              const {latitude:lat,longitude:lng} = pos.coords;
              const stList = Object.values(STATIONS).filter((s:any)=>s.lat&&s.lng);
              let best:any=stList[0],bestD=Infinity;
              for(const s of stList as any[]){const d=(s.lat-lat)**2+(s.lng-lng)**2;if(d<bestD){bestD=d;best=s;}}
              localStorage.setItem('kj-location-area', best?.name||'Dhaka');
            },
            () => {},
            { timeout: 8000, maximumAge: 0 }
          );
        }}
        onDeny={() => {
          localStorage.setItem('kj-location-consent', 'no');
          setShowConsentModal(false);
        }}
      />
    </>
  );
}
