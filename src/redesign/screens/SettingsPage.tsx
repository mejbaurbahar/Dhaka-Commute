import React, { useState } from 'react';

import { useDocumentTitle } from '../utils/useDocumentTitle';
import { STATIONS } from '../../../constants';
import { KJ_TOKENS, T, SANS, BEN, Tokens } from '../tokens';
import { PageShell } from './PageShell';
import { AdSlot, NativeAdCard, AdCluster } from '../components/AdSlot';
import { ConfirmModal } from '../components/ConfirmModal';
import { Icon } from '../components/Icons';
import { enablePush, disablePush, pushEnabled, pushSupported } from '../../services/pushService';
import { clearUserHistory } from '../../../services/analyticsService';

interface ScreenProps {
  theme: 'dark' | 'light';
  device: 'desktop' | 'mobile';
  lang: 'bn' | 'en';
  route: string;
  canBack: boolean;
  onNav: (r: string) => void;
  onBack: () => void;
  onLang: () => void;
  onTheme: () => void;
  onMenu: () => void;
}

function Toggle({ on, onChange, tk }: { on: boolean; onChange: () => void; tk: Tokens }) {
  return (
    <div onClick={onChange} style={{ width: 44, height: 24, borderRadius: 999, cursor: 'pointer', flexShrink: 0, background: on ? tk.primary : tk.panelMuted, border: `1px solid ${on ? tk.primary : tk.line}`, position: 'relative', transition: 'background 0.2s' }}>
      <div style={{ position: 'absolute', top: 3, left: 3, width: 16, height: 16, borderRadius: '50%', background: on ? tk.primaryInk : tk.textFaint, transform: `translateX(${on ? 19 : 0}px)`, transition: 'transform 0.2s' }} />
    </div>
  );
}

export function SettingsPage(props: ScreenProps) {
  const { theme, device, lang, onNav, onTheme, onLang } = props;
  useDocumentTitle(lang === 'bn' ? 'সেটিংস' : 'Settings');
  const tk: Tokens = KJ_TOKENS[theme];
  const isMobile = device === 'mobile';
  const lbl = (en: string, bn: string) => T(lang, bn, en);
  const font = lang === 'bn' ? BEN : SANS;

  const [notifs, setNotifs] = useState({ reminders: true, alerts: true, news: false, email: false });
  const [pushOn, setPushOn] = useState<boolean>(() => pushEnabled());
  const [pushMsg, setPushMsg] = useState<string | null>(null);
  const pushAvailable = pushSupported();

  async function handlePushToggle() {
    // C3: the toggle really turns push OFF — unsubscribe from the delivery
    // worker and the browser (previously OFF was a no-op; users could never
    // opt out once subscribed).
    if (pushOn) {
      setPushMsg(null);
      await disablePush();
      setPushOn(false);
      return;
    }
    setPushMsg(null);
    const ok = await enablePush(); // user gesture → permission prompt OK
    setPushOn(ok);
    if (!ok) {
      // Give the user a real reason + recovery path instead of a silent no-op.
      if (typeof Notification !== 'undefined' && Notification.permission === 'denied') {
        setPushMsg(lbl(
          'Notifications are blocked in your browser. Enable them in site settings (lock icon → Notifications → Allow), then toggle back on.',
          'ব্রাউজারে নোটিফিকেশন ব্লক করা আছে। সাইট সেটিংস থেকে চালু করুন (লক আইকন → নোটিফিকেশন → অনুমতি দিন), তারপর আবার চালু করুন।'
        ));
      } else if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
        setPushMsg(lbl(
          'The permission prompt was dismissed. Tap the toggle again to retry.',
          'অনুমতির বার্তাটি বাতিল হয়েছে। আবার চালু করুন।'
        ));
      } else {
        setPushMsg(lbl(
          'Could not subscribe right now — check your connection and retry.',
          'এখন সাবস্ক্রাইব করা যাচ্ছে না — ইন্টারনেট চেক করে আবার চেষ্টা করুন।'
        ));
      }
    }
  }
  const [privacy, setPrivacy] = useState({
    stats: true,
    location: localStorage.getItem('kj-location-consent') === 'yes',
  });

  function handleLocationToggle() {
    const next = !privacy.location;
    setPrivacy(p => ({ ...p, location: next }));
    if (next) {
      localStorage.setItem('kj-location-consent', 'yes');
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
    } else {
      localStorage.setItem('kj-location-consent', 'no');
      localStorage.removeItem('kj-location-area');
    }
  }
  const [confirmClear, setConfirmClear] = useState(false);

  const card: React.CSSProperties = {
    background: tk.panel,
    border: `1px solid ${tk.line}`,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 4,
    boxShadow: `0 2px 12px rgba(0,0,0,0.04)`,
  };

  const SectionLabel = ({ label, color }: { label: string; color?: string }) => (
    <div style={{
      fontFamily: SANS, fontWeight: 800, fontSize: 10, color: color ?? tk.textFaint,
      padding: '18px 4px 8px', textTransform: 'uppercase', letterSpacing: 1.5,
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      {color && <div style={{ width: 14, height: 2, borderRadius: 999, background: color }} />}
      {label}
    </div>
  );

  // Icon background colors per group
  const iconBgMap: Record<string, { bg: string; text: string }> = {
    '🎨': { bg: 'linear-gradient(135deg,#f59e0b,#ef4444)', text: '#fff' },
    '🌐': { bg: 'linear-gradient(135deg,#3b82f6,#6366f1)', text: '#fff' },
    '🔔': { bg: 'linear-gradient(135deg,#f59e0b,#ef4444)', text: '#fff' },
    '⏰': { bg: 'linear-gradient(135deg,#8b5cf6,#a855f7)', text: '#fff' },
    '🚨': { bg: 'linear-gradient(135deg,#ef4444,#f97316)', text: '#fff' },
    '📰': { bg: 'linear-gradient(135deg,#10b981,#059669)', text: '#fff' },
    '✉️': { bg: 'linear-gradient(135deg,#3b82f6,#06b6d4)', text: '#fff' },
    '📊': { bg: 'linear-gradient(135deg,#06b6d4,#3b82f6)', text: '#fff' },
    '📍': { bg: 'linear-gradient(135deg,#ef4444,#f97316)', text: '#fff' },
    '🗑':  { bg: 'linear-gradient(135deg,#6b7280,#4b5563)', text: '#fff' },
    '❓': { bg: 'linear-gradient(135deg,#8b5cf6,#6366f1)', text: '#fff' },
    '✉':  { bg: 'linear-gradient(135deg,#3b82f6,#06b6d4)', text: '#fff' },
    '📄': { bg: 'linear-gradient(135deg,#6b7280,#4b5563)', text: '#fff' },
    '🛡': { bg: 'linear-gradient(135deg,#059669,#0d9488)', text: '#fff' },
    'ℹ️': { bg: 'linear-gradient(135deg,#3b82f6,#6366f1)', text: '#fff' },
    '🆕': { bg: 'linear-gradient(135deg,#10b981,#059669)', text: '#fff' },
  };

  const RowItem = ({ icon, label, sub, right, onClick, danger }: { icon: string; label: string; sub?: string; right?: React.ReactNode; onClick?: () => void; danger?: boolean }) => {
    const iconStyle = iconBgMap[icon] ?? { bg: tk.panelMuted, text: tk.text };
    return (
      <div
        onClick={onClick}
        style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '12px 16px',
          borderTop: `1px solid ${tk.line}`,
          cursor: onClick ? 'pointer' : 'default',
          transition: 'background 0.13s',
        }}
        onMouseEnter={onClick ? e => ((e.currentTarget as HTMLDivElement).style.background = tk.panelMuted) : undefined}
        onMouseLeave={onClick ? e => ((e.currentTarget as HTMLDivElement).style.background = 'transparent') : undefined}
      >
        {/* Gradient icon chip */}
        <div style={{
          width: 36, height: 36, borderRadius: 11, flexShrink: 0,
          background: iconStyle.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        }}>{icon}</div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: font, fontSize: 14, fontWeight: 500, color: danger ? tk.accent : tk.text }}>{label}</div>
          {sub && <div style={{ fontFamily: SANS, fontSize: 11, color: tk.textFaint, marginTop: 2, lineHeight: 1.4 }}>{sub}</div>}
        </div>
        {right ?? (onClick ? <span style={{ color: tk.textFaint, display: 'flex' }}><Icon.arrowR s={14} /></span> : null)}
      </div>
    );
  };

  const groups = [
    {
      title: lbl('Appearance', 'চেহারা'),
      items: [
        { icon: '🎨', label: lbl('Theme', 'থিম'), sub: theme === 'dark' ? lbl('Dark', 'অন্ধকার') : lbl('Light', 'আলো'), right: <Toggle on={theme === 'dark'} onChange={onTheme} tk={tk} />, onClick: undefined },
        { icon: '🌐', label: lbl('Language', 'ভাষা'), sub: lang === 'bn' ? 'বাংলা' : 'English', right: <Toggle on={lang === 'bn'} onChange={onLang} tk={tk} />, onClick: undefined },
      ],
    },
    {
      title: lbl('Notifications', 'নোটিফিকেশন'),
      items: [
        ...(pushAvailable ? [{ icon: '🔔', label: lbl('Push notifications', 'পুশ নোটিফিকেশন'), sub: pushOn ? lbl('On – install/search/save reminders', 'চালু – ইনস্টল/সার্চ/সেভ রিমাইন্ডার') : lbl('Off – never miss a reminder', 'বন্ধ – রিমাইন্ডার পেতে চালু করুন'), right: <Toggle on={pushOn} onChange={handlePushToggle} tk={tk} />, onClick: undefined }] : []),
        { icon: '⏰', label: lbl('Trip reminders', 'ট্রিপ রিমাইন্ডার'), right: <Toggle on={notifs.reminders} onChange={() => setNotifs(p => ({ ...p, reminders: !p.reminders }))} tk={tk} />, onClick: undefined },
        { icon: '🚨', label: lbl('Service alerts', 'সেবা সতর্কতা'), right: <Toggle on={notifs.alerts} onChange={() => setNotifs(p => ({ ...p, alerts: !p.alerts }))} tk={tk} />, onClick: undefined },
        { icon: '📰', label: lbl('News & updates', 'সংবাদ ও আপডেট'), right: <Toggle on={notifs.news} onChange={() => setNotifs(p => ({ ...p, news: !p.news }))} tk={tk} />, onClick: undefined },
        { icon: '✉️', label: lbl('Email notifications', 'ইমেইল নোটিফিকেশন'), right: <Toggle on={notifs.email} onChange={() => setNotifs(p => ({ ...p, email: !p.email }))} tk={tk} />, onClick: undefined },
      ],
    },
    {
      title: lbl('Privacy & Data', 'গোপনীয়তা ও ডেটা'),
      items: [
        { icon: '📊', label: lbl('Anonymous usage stats', 'বেনামী ব্যবহার পরিসংখ্যান'), right: <Toggle on={privacy.stats} onChange={() => setPrivacy(p => ({ ...p, stats: !p.stats }))} tk={tk} />, onClick: undefined },
        { icon: '📍', label: lbl('Location for AI & nearby buses', 'AI ও কাছের বাসের জন্য অবস্থান'), sub: privacy.location ? lbl('Active – detecting location', 'সক্রিয় – অবস্থান শনাক্ত হচ্ছে') : lbl('Off – enable for smarter results', 'বন্ধ – চালু করলে ভালো ফলাফল পাবেন'), right: <Toggle on={privacy.location} onChange={handleLocationToggle} tk={tk} />, onClick: undefined },
        { icon: '🗑', label: lbl('Clear search history', 'অনুসন্ধান ইতিহাস মুছুন'), right: null, onClick: () => setConfirmClear(true) },
      ],
    },
    {
      title: lbl('Support', 'সহায়তা'),
      items: [
        { icon: '❓', label: lbl('Q & A', 'প্রশ্নোত্তর'), onClick: () => onNav('qa') },
        { icon: '✉', label: lbl('Contact us', 'যোগাযোগ'), onClick: () => onNav('contact') },
        { icon: '📄', label: lbl('Privacy Policy', 'গোপনীয়তা নীতি'), onClick: () => onNav('privacy') },
        { icon: '🛡', label: lbl('Terms of Service', 'সেবার শর্ত'), onClick: () => onNav('terms') },
        { icon: 'ℹ️', label: lbl('About KoyJabo', 'KoyJabo সম্পর্কে'), onClick: () => onNav('about') },
        { icon: '🆕', label: lbl('Release Notes', 'রিলিজ নোট'), sub: 'v1.5.2', onClick: () => onNav('release') },
      ],
    },
  ];

  return (
    <PageShell {...props} canBack>
      <div style={{ maxWidth: isMobile ? '100%' : 720, margin: '0 auto', padding: isMobile ? '16px 12px 100px' : '24px 40px 60px' }}>

        <div className="kj-enter-1">
          <h1 style={{ margin: '0 0 4px', fontFamily: font, fontWeight: 800, fontSize: 26, color: tk.text, letterSpacing: -0.5 }}>{lbl('Settings', 'সেটিংস')}</h1>
          <p style={{ margin: '0 0 20px', fontFamily: SANS, fontSize: 13, color: tk.textDim }}>{lbl('Manage your preferences', 'আপনার পছন্দ পরিচালনা করুন')}</p>
        </div>

        {groups.map((g, gi) => {
          const sectionColor = gi === 0 ? '#00b8d9' : gi === 1 ? '#ff2a6d' : gi === 2 ? '#a259ff' : '#6b7280';
          return (
          <div key={gi} className={`kj-enter-${Math.min(gi + 2, 6)}`}>
            <SectionLabel label={g.title} color={sectionColor} />
            <div style={card}>
              {g.items.map((item, i) => (
                <RowItem
                  key={i}
                  icon={item.icon}
                  label={item.label}
                  sub={'sub' in item ? item.sub : undefined}
                  right={'right' in item ? item.right : undefined}
                  onClick={'onClick' in item ? item.onClick : undefined}
                  danger={'danger' in item ? item.danger : false}
                />
              ))}
            </div>
              {gi === 1 && pushMsg && (
              <div style={{ margin: '0 0 8px', padding: '10px 14px', borderRadius: 12, background: tk.accent + '14', border: `1px solid ${tk.accent}3d`, fontFamily: font, fontSize: 12, color: tk.accent, lineHeight: 1.55 }}>
                {pushMsg}
              </div>
            )}
          </div>
        );
        })}

        <NativeAdCard
          tk={tk}
          lang={lang}
          kind={isMobile ? 'mob-banner' : 'leaderboard'}
          title={lbl('Personalized offers', 'ব্যক্তিগত অফার')}
          icon="🎯"
        />

        <div style={{ textAlign: 'center', marginTop: 16, fontFamily: SANS, fontSize: 11, color: tk.textFaint }}>
          KoyJabo · v1.5.2 · Build 2026.06.18
        </div>
          <NativeAdCard
            tk={tk}
            lang={lang}
            kind="multiplex"
            title={lbl('More like this', 'আরও দেখুন')}
            subtitle={lbl('Travel & transport', 'ভ্রমণ ও পরিবহন')}
            icon="🧭"
          />
      </div>

      <ConfirmModal tk={tk} lang={lang} open={confirmClear} title={lbl('Clear search history?', 'অনুসন্ধান ইতিহাস মুছবেন?')} message={lbl('All your search history will be permanently deleted.', 'আপনার সমস্ত অনুসন্ধান ইতিহাস স্থায়ীভাবে মুছে যাবে।')} confirmLabel={lbl('Clear', 'মুছুন')} onConfirm={() => { clearUserHistory(); setConfirmClear(false); }} onClose={() => setConfirmClear(false)} />
          <AdCluster tk={tk} lang={lang} count={3} isMobile={isMobile}/>
    </PageShell>
  );
}
