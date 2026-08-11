import React, { useState } from 'react';
import PlatformAd from '../src/ads/PlatformAd';

// Sticky banner ad that sits just above the mobile bottom nav bar.
// Positions at bottom: nav-height + safe-area so it never overlaps the nav.
// Dismissible — Google policy requires sticky ads to be closable.
const StickyBottomBannerAd: React.FC = () => {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  return (
    <div
      className="fixed left-0 right-0 z-40 md:hidden bg-kj-panel border-t border-kj-line shadow-[0_-2px_8px_rgba(0,0,0,0.08)]"
      style={{ bottom: 'calc(4.375rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <button
        onClick={() => setHidden(true)}
        aria-label="Close ad"
        style={{
          position: 'absolute',
          top: 2,
          right: 6,
          border: 0,
          background: 'transparent',
          color: 'rgba(255,255,255,0.65)',
          fontSize: 14,
          lineHeight: 1,
          cursor: 'pointer',
          zIndex: 1,
          padding: '4px 8px',
        }}
      >
        ✕
      </button>
      <PlatformAd placement="anchor" />
    </div>
  );
};

export default StickyBottomBannerAd;
