import React, { useEffect, useState } from 'react';
import type { Lang } from '../tokens';
import { subscribeRemoteFlags, getRemoteFlags, RemoteFlags } from '../../services/remoteConfigService';
import { T } from '../tokens';

interface Props {
  lang: Lang;
}

/** Top-of-app bars driven by Firebase Remote Config (maintenance + announcement). */
export function ConfigBanner({ lang }: Props) {
  const [flags, setFlags] = useState<RemoteFlags>(getRemoteFlags());
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  useEffect(() => subscribeRemoteFlags(setFlags), []);

  if (flags.maintenanceMode) {
    return (
      <div style={{
        background: '#dc2626', color: '#fff', textAlign: 'center',
        padding: '8px 12px', fontSize: 13, fontWeight: 600,
        fontFamily: lang === 'bn' ? "'Noto Sans Bengali', sans-serif" : undefined,
        zIndex: 60, position: 'relative',
      }}>
        {T(lang,
          'অস্থায়ী রক্ষণাবেক্ষণ চলছে — কিছু তথ্য সাময়িক অনুপলব্ধ থাকতে পারে',
          'Temporary maintenance — some info may be briefly unavailable')}
      </div>
    );
  }

  if (flags.announcement && !announcementDismissed) {
    return (
      <div style={{
        background: '#1d4ed8', color: '#fff', textAlign: 'center',
        padding: '8px 12px', fontSize: 13, fontWeight: 500,
        fontFamily: lang === 'bn' ? "'Noto Sans Bengali', sans-serif" : undefined,
        zIndex: 60, position: 'relative',
      }}>
        {flags.announcement}
        <button
          aria-label="Dismiss"
          onClick={() => setAnnouncementDismissed(true)}
          style={{
            position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
            background: 'transparent', border: 'none', color: '#fff',
            cursor: 'pointer', fontSize: 16, lineHeight: 1,
          }}
        >✕</button>
      </div>
    );
  }

  return null;
}
