import React, { useEffect, useRef, useState } from 'react';
import { isNativePlatform } from '../utils/platformDetect';
import AdSenseAd from '../../components/AdSenseAd';
import { ADSENSE_SLOTS, ADMOB_UNITS } from './adUnits';

// Build-time platform check — Vite statically replaces import.meta.env.VITE_PLATFORM
// with the literal at transform time, so rollup folds the ternary per module and
// tree-shakes the dead branch out of each build.
const NATIVE_BUILD = import.meta.env.VITE_PLATFORM === 'android';

export type AdPlacement =
  | 'leaderboard' // 728x90 banner top
  | 'mid-rect' // 300x250 in-content
  | 'mob-banner' // 320x100 mobile banner
  | 'anchor' // 320x50 bottom anchor
  | 'in-article' // fluid in-article
  | 'multiplex' // native grid
  | 'interstitial' // full-screen (imperative — use showInterstitial())
  | 'rewarded'; // rewarded video (imperative — use showRewardedAd())

interface PlatformAdProps {
  placement: AdPlacement;
  className?: string;
  style?: React.CSSProperties;
  onFilled?: (filled: boolean) => void;
}

// ── AdMob singleton state (native only) ────────────────────────────────────
let adMobReady: Promise<void> | null = null;
// AdMob shows exactly one banner per app — first mounted placement wins.
let activeBannerKey = '';

async function ensureAdMob() {
  if (!adMobReady) {
    adMobReady = (async () => {
      const { AdMob } = await import('@capacitor-community/admob');
      await AdMob.initialize();
    })().catch(() => {
      adMobReady = null; // allow retry
    });
  }
  return adMobReady;
}

/** Full-screen interstitial — call at natural screen transitions. */
export async function showInterstitial() {
  if (!isNativePlatform()) return;
  try {
    await ensureAdMob();
    const { AdMob, InterstitialAdPluginEvents } = await import('@capacitor-community/admob');
    await AdMob.prepareInterstitial({ adId: ADMOB_UNITS.INTERSTITIAL });
    await AdMob.showInterstitial();
    // re-prepare for the next navigation
    AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
      AdMob.prepareInterstitial({ adId: ADMOB_UNITS.INTERSTITIAL }).catch(() => {});
    });
  } catch {
    // silent — ads never block app flow
  }
}

/** Rewarded video — call on explicit user opt-in (e.g. KoyCoins). */
export async function showRewardedAd(): Promise<boolean> {
  if (!isNativePlatform()) return false;
  try {
    await ensureAdMob();
    const { AdMob } = await import('@capacitor-community/admob');
    await AdMob.prepareRewardVideoAd({ adId: ADMOB_UNITS.REWARDED });
    await AdMob.showRewardVideoAd();
    return true;
  } catch {
    return false;
  }
}

// ── Web branch: AdSense — map placement to existing slot/format ─────────────
const WEB_SLOTS: Record<string, { slot: string; format: string }> = {
  leaderboard: { slot: ADSENSE_SLOTS.DISPLAY, format: 'auto' },
  'mid-rect': { slot: ADSENSE_SLOTS.DISPLAY, format: 'auto' },
  'mob-banner': { slot: ADSENSE_SLOTS.DISPLAY, format: 'auto' },
  anchor: { slot: ADSENSE_SLOTS.DISPLAY, format: 'auto' },
  'in-article': { slot: ADSENSE_SLOTS.IN_ARTICLE, format: 'fluid' },
  multiplex: { slot: ADSENSE_SLOTS.MULTIPLEX, format: 'autorelaxed' },
};

function WebAd({
  placement,
  style,
  onFilled,
}: {
  placement: AdPlacement;
  style?: React.CSSProperties;
  onFilled?: (filled: boolean) => void;
}) {
  const cfg = WEB_SLOTS[placement];
  if (!cfg) return null;
  return (
    <AdSenseAd
      adSlot={cfg.slot}
      adFormat={cfg.format as any}
      responsive={placement !== 'in-article'}
      style={style}
      onFilled={onFilled}
    />
  );
}

// ── Native branch: AdMob banner ─────────────────────────────────────────────
const NATIVE_SIZE: Record<string, string> = {
  leaderboard: 'LEADERBOARD',
  'mid-rect': 'MEDIUM_RECTANGLE',
  'mob-banner': 'LARGE_BANNER',
  anchor: 'BANNER',
  'in-article': 'MEDIUM_RECTANGLE',
  multiplex: 'MEDIUM_RECTANGLE',
};

function NativeAd({ placement, onFilled }: { placement: AdPlacement; onFilled?: (filled: boolean) => void }) {
  const [shown, setShown] = useState(false);
  const key = useRef<string>('');

  useEffect(() => {
    let cancelled = false;
    key.current = `kj-ad-${Math.random().toString(36).slice(2)}`;

    // Single-banner policy: only the first mounted placement actually shows.
    // Losers collapse immediately so wrappers never show a stuck skeleton.
    if (activeBannerKey !== '') {
      onFilled?.(false);
      return;
    }
    activeBannerKey = key.current;

    (async () => {
      await ensureAdMob();
      if (cancelled) return;
      const { AdMob, BannerAdPosition, BannerAdSize, BannerAdPluginEvents } = await import('@capacitor-community/admob');
      const size = (BannerAdSize as Record<string, string>)[NATIVE_SIZE[placement] ?? 'ADAPTIVE_BANNER'] as any;
      await AdMob.showBanner({
        adId: ADMOB_UNITS.BANNER,
        adSize: size,
        position: placement === 'anchor' ? BannerAdPosition.BOTTOM_CENTER : BannerAdPosition.TOP_CENTER,
      });
      onFilled?.(true);
      setShown(true);
      AdMob.addListener(BannerAdPluginEvents.FailedToLoad, () => {
        onFilled?.(false);
        if (activeBannerKey === key.current) activeBannerKey = '';
      });
    })();

    return () => {
      cancelled = true;
      if (activeBannerKey === key.current) {
        activeBannerKey = '';
        import('@capacitor-community/admob')
          .then(({ AdMob }) => AdMob.hideBanner())
          .catch(() => {});
      }
    };
  }, [placement]);

  if (!shown) return null;
  return <div className="kj-admob-host" aria-hidden="true" />;
}

// ── Unified export ──────────────────────────────────────────────────────────
// NATIVE_BUILD returns null until AdMob approval is granted.
// Web/AdSense path is completely unaffected.
const PlatformAd: React.FC<PlatformAdProps> = ({ placement, className, style, onFilled }) =>
  NATIVE_BUILD ? null : (
    <WebAd placement={placement} style={style} onFilled={onFilled} />
  );

export default PlatformAd;
