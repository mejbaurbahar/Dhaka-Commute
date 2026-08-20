import React from 'react';
import AdSenseAd from '../../components/AdSenseAd';
import { ADSENSE_SLOTS } from './adUnits';

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
  | 'interstitial' // full-screen (unused — no in-app ads)
  | 'rewarded'; // rewarded video (unused — no in-app ads)

interface PlatformAdProps {
  placement: AdPlacement;
  className?: string;
  style?: React.CSSProperties;
  onFilled?: (filled: boolean) => void;
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

// ── Unified export ──────────────────────────────────────────────────────────
// KoyJabo shows no ads in the Android app (AdMob removed 2026-08). Call sites
// (AdSlot / AdComponents) collapse natively before reaching here; this guard
// keeps PlatformAd web-only as a final safety net.
const PlatformAd: React.FC<PlatformAdProps> = ({ placement, className, style, onFilled }) =>
  NATIVE_BUILD ? null : (
    <WebAd placement={placement} style={style} onFilled={onFilled} />
  );

export default PlatformAd;
