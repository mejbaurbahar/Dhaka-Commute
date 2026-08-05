import React, { useEffect, useState, useCallback } from 'react';
import { T, SANS, BEN, N } from '../tokens';
import { getDtcaAllVehicleLocationCached, dtcaLogin, DtcaVehicleLocation } from '../../../services/dtcaTrackerService';
import { Turnstile } from './Turnstile';

interface Props {
  tk: any;
  lang: 'bn' | 'en';
  onBusClick: (identifier: string, vrn: string) => void;
}

type AuthState = 'loading' | 'needs-login' | 'loaded' | 'error';

function busStatusColor(path: DtcaVehicleLocation['path']): string {
  const p = path?.[0];
  if (!p) return '#9ca3af';
  if (p.engine_status && p.speed_status > 0) return '#10b981';
  if (p.engine_status) return '#f59e0b';
  return '#9ca3af';
}

export function DTCABusListSection({ tk, lang, onBusClick }: Props) {
  const [buses, setBuses] = useState<DtcaVehicleLocation[]>([]);
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cfToken, setCfToken] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const load = useCallback(async () => {
    setAuthState('loading');
    try {
      const res = await getDtcaAllVehicleLocationCached();
      setBuses((res.vehicles ?? []).slice(0, 10));
      setAuthState('loaded');
    } catch (err: any) {
      if (err?.code === 'DTCA_AUTH_REQUIRED') {
        setAuthState('needs-login');
      } else {
        setAuthState('error');
      }
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  async function handleLogin() {
    if (!name.trim() || !phone.trim() || !cfToken) return;
    setLoginLoading(true);
    setLoginError('');
    try {
      await dtcaLogin(name.trim(), phone.trim(), cfToken);
      void load();
    } catch {
      setLoginError(T(lang, 'লগইন ব্যর্থ হয়েছে', 'Login failed. Check your details.'));
    } finally {
      setLoginLoading(false);
    }
  }

  const card: React.CSSProperties = {
    background: tk.panel,
    border: `1px solid ${tk.line}`,
    borderRadius: 16,
    padding: 16,
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: tk.inputBg,
    border: `1px solid ${tk.line}`,
    borderRadius: 10,
    padding: '9px 12px',
    fontFamily: SANS,
    fontSize: 13,
    color: tk.text,
    outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <div style={card}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ width: 10, height: 10, borderRadius: 999, background: '#10b981', flexShrink: 0 }} className="kj-anim-pulse" />
        <span style={{ fontFamily: BEN, fontWeight: 700, fontSize: 14, color: tk.text, flex: 1 }}>
          {T(lang, 'ঢাকা চাকা · লাইভ', 'Dhaka Chaka · Live')}
        </span>
        <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: 600, background: tk.primarySoft, color: tk.primary, borderRadius: 6, padding: '2px 7px' }}>
          DTCA
        </span>
      </div>

      {authState === 'loading' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
              <div style={{ width: 8, height: 8, borderRadius: 999, background: tk.line, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ height: 12, borderRadius: 6, background: tk.line, width: '60%', marginBottom: 4 }} />
                <div style={{ height: 10, borderRadius: 6, background: tk.line, width: '40%' }} />
              </div>
              <div style={{ width: 36, height: 12, borderRadius: 6, background: tk.line }} />
            </div>
          ))}
        </div>
      )}

      {authState === 'needs-login' && (
        <div>
          <div style={{ fontFamily: SANS, fontSize: 12, color: tk.textDim, marginBottom: 12 }}>
            {T(lang, 'লাইভ বাস দেখতে লগইন করুন', 'Login to see live buses')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={T(lang, 'আপনার নাম', 'Your name')}
              style={inputStyle}
            />
            <input
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
              style={inputStyle}
              type="tel"
            />
            <Turnstile theme={tk === undefined ? 'light' : 'light'} onVerify={t => setCfToken(t)} />
            {loginError && (
              <div style={{ fontFamily: SANS, fontSize: 11, color: '#ef4444' }}>{loginError}</div>
            )}
            <button
              disabled={!name.trim() || !phone.trim() || !cfToken || loginLoading}
              onClick={() => void handleLogin()}
              style={{
                background: (!name.trim() || !phone.trim() || !cfToken || loginLoading) ? tk.panelMuted : `linear-gradient(135deg,${tk.primary},${tk.primaryDeep})`,
                color: (!name.trim() || !phone.trim() || !cfToken || loginLoading) ? tk.textFaint : tk.primaryInk,
                border: 0,
                borderRadius: 10,
                padding: '10px 0',
                fontFamily: SANS,
                fontWeight: 700,
                fontSize: 13,
                cursor: (!name.trim() || !phone.trim() || !cfToken || loginLoading) ? 'not-allowed' : 'pointer',
                width: '100%',
              }}
            >
              {loginLoading ? T(lang, 'লগইন হচ্ছে...', 'Logging in...') : T(lang, 'ট্র্যাকিং শুরু করুন', 'Start Tracking')}
            </button>
          </div>
        </div>
      )}

      {authState === 'error' && (
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{ fontFamily: SANS, fontSize: 12, color: '#ef4444', marginBottom: 8 }}>
            {T(lang, 'লোড করা সম্ভব হয়নি', 'Could not load buses')}
          </div>
          <button
            onClick={() => void load()}
            style={{ background: tk.primarySoft, color: tk.primary, border: `1px solid ${tk.primary}`, borderRadius: 8, padding: '5px 12px', fontFamily: SANS, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
          >
            {T(lang, 'আবার চেষ্টা করুন', 'Retry')}
          </button>
        </div>
      )}

      {authState === 'loaded' && buses.length === 0 && (
        <div style={{ fontFamily: BEN, fontSize: 12, color: tk.textFaint, padding: '8px 0', textAlign: 'center' }}>
          {T(lang, 'কোনো বাস পাওয়া যায়নি', 'No buses found')}
        </div>
      )}

      {authState === 'loaded' && buses.map((bus, i) => {
        const col = busStatusColor(bus.path);
        const speed = bus.path?.[0]?.speed_status ?? 0;
        const loc = bus.path?.[0]?.nearby_l_name ?? '';
        return (
          <div
            key={bus.id ?? i}
            onClick={() => onBusClick(bus.v_identifier, bus.v_vrn)}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderTop: i ? `1px dashed ${tk.line}` : '', cursor: 'pointer' }}
          >
            <div style={{ width: 8, height: 8, borderRadius: 999, background: col, boxShadow: `0 0 0 3px ${col}22`, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 11, color: tk.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {bus.v_vrn || bus.v_identifier}
              </div>
              {loc ? (
                <div style={{ fontFamily: SANS, fontSize: 10, color: tk.textFaint, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 1 }}>
                  {loc}
                </div>
              ) : null}
            </div>
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 12, color: col, flexShrink: 0 }}>
              {N(speed, lang)} {T(lang, 'কিমি/ঘ', 'km/h')}
            </div>
          </div>
        );
      })}

      {authState === 'loaded' && buses.length > 0 && (
        <button
          onClick={() => void load()}
          style={{ marginTop: 10, width: '100%', background: 'transparent', border: `1px solid ${tk.line}`, borderRadius: 10, padding: 8, fontFamily: SANS, fontSize: 12, fontWeight: 700, color: tk.text, cursor: 'pointer' }}
        >
          {T(lang, 'আপডেট করুন', 'Refresh')} ↻
        </button>
      )}
    </div>
  );
}
