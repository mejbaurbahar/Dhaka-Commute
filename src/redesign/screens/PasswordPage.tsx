import React, { useState } from 'react';

import { useDocumentTitle } from '../utils/useDocumentTitle';
import { KJ_TOKENS, T, SANS, BEN } from '../tokens';
import { PageShell } from './PageShell';
import { AdCluster } from '../components/AdSlot';
import { useAuth } from '../../contexts/AuthContext';
import { changePassword, setGoogleUserPassword } from '../../services/githubAuthService';

interface Props { theme:'dark'|'light'; device:'desktop'|'mobile'; lang:'bn'|'en'; route:string; canBack:boolean; onNav:(r:string)=>void; onNavTab?:(r:string)=>void; onBack:()=>void; onLang:()=>void; onTheme:()=>void; onMenu:()=>void; params?:Record<string,string>; }

function EyeIcon({ open }: { open: boolean }) {
  return open
    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
}

export function PasswordPage(props: Props) {
  const { theme, device, lang } = props;
  useDocumentTitle(lang === 'bn' ? 'পাসওয়ার্ড পরিবর্তন' : 'Change Password');
  const tk = KJ_TOKENS[theme];
  const isMobile = device === 'mobile';
  const { user: authUser } = useAuth();

  const isGoogleNoPassword = authUser?.provider === 'google' && !authUser?.hasPassword;

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const pwStrength = (pw: string) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (pw.length >= 12) score++;
    return score;
  };

  const strengthColor = (n: number, score: number) => {
    if (score <= 1) return n <= score ? '#ef4444' : tk.line;
    if (score <= 2) return n <= score ? '#f59e0b' : tk.line;
    if (score <= 3) return n <= score ? '#3b82f6' : tk.line;
    return n <= score ? '#10b981' : tk.line;
  };

  const strengthLabel = (score: number) => {
    if (score <= 1) return T(lang, 'দুর্বল', 'Weak');
    if (score <= 2) return T(lang, 'মোটামুটি', 'Fair');
    if (score <= 3) return T(lang, 'ভালো', 'Good');
    return T(lang, 'শক্তিশালী', 'Strong');
  };

  const score = pwStrength(newPw);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPw.length < 8) {
      setError(T(lang, 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে', 'Password must be at least 8 characters'));
      return;
    }
    if (newPw !== confirmPw) {
      setError(T(lang, 'পাসওয়ার্ড মিলছে না', 'Passwords do not match'));
      return;
    }

    if (!authUser) {
      setError(T(lang, 'সাইন ইন করুন', 'Please sign in'));
      return;
    }

    setLoading(true);
    try {
      if (isGoogleNoPassword) {
        await setGoogleUserPassword(authUser.id, newPw);
      } else {
        if (!currentPw) {
          setError(T(lang, 'বর্তমান পাসওয়ার্ড দিন', 'Enter current password'));
          setLoading(false);
          return;
        }
        await changePassword(authUser.id, authUser.email, currentPw, newPw);
      }
      setSuccess(T(lang, 'পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে', 'Password updated successfully'));
      setCurrentPw('');
      setNewPw('');
      setConfirmPw('');
    } catch (err) {
      setError(err instanceof Error ? err.message : T(lang, 'পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে', 'Failed to update password'));
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    flex: 1, background: 'transparent', border: 0, outline: 'none',
    color: tk.text, fontFamily: SANS, fontSize: 14, padding: 0,
  };

  const wrapStyle: React.CSSProperties = {
    background: tk.inputBg, border: `1px solid ${tk.line}`, borderRadius: 12,
    padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10,
  };

  const canSubmit = isGoogleNoPassword
    ? newPw.length >= 8 && confirmPw.length >= 8 && !loading
    : currentPw.length > 0 && newPw.length >= 8 && confirmPw.length >= 8 && !loading;

  return (
    <PageShell {...props}>
      <div style={{ padding: isMobile ? '16px 16px 48px' : '28px 40px 48px', maxWidth: 480, margin: '0 auto' }}>
        <h1 style={{ fontFamily: BEN, fontWeight: 700, fontSize: isMobile ? 20 : 24, color: tk.text, marginBottom: 20 }}>
          {isGoogleNoPassword
            ? T(lang, 'পাসওয়ার্ড সেট করুন', 'Set Password')
            : T(lang, 'পাসওয়ার্ড পরিবর্তন', 'Change Password')}
        </h1>

        {isGoogleNoPassword && (
          <div style={{ background: '#4285F418', border: '1px solid #4285F433', borderRadius: 12, padding: '12px 16px', marginBottom: 20, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <svg width="16" height="16" viewBox="0 0 48 48" style={{ flexShrink: 0, marginTop: 1 }}>
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            <div style={{ fontFamily: SANS, fontSize: 13, color: '#4285F4' }}>
              {T(lang, 'গুগল দিয়ে সাইন ইন করেছেন। পাসওয়ার্ড দিয়ে লগইনের জন্য নিচে পাসওয়ার্ড সেট করুন।', 'You signed in with Google. Set a password below to also sign in with email.')}
            </div>
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {error && (
            <div style={{ background: `${tk.accent}18`, border: `1px solid ${tk.accent}44`, borderRadius: 10, padding: '10px 14px', fontFamily: SANS, fontSize: 13, color: tk.accent }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ background: '#10b98118', border: '1px solid #10b98144', borderRadius: 10, padding: '10px 14px', fontFamily: SANS, fontSize: 13, color: '#10b981' }}>
              {success}
            </div>
          )}

          {!isGoogleNoPassword && (
            <div>
              <label style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: tk.textFaint, textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>
                {T(lang, 'বর্তমান পাসওয়ার্ড', 'Current password')}
              </label>
              <div style={wrapStyle}>
                <input
                  type={showCurrent ? 'text' : 'password'}
                  value={currentPw}
                  onChange={e => setCurrentPw(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  style={inputStyle}
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowCurrent(p => !p)} style={{ background: 'none', border: 0, color: tk.textFaint, cursor: 'pointer', padding: 0, lineHeight: 0 }}>
                  <EyeIcon open={showCurrent} />
                </button>
              </div>
            </div>
          )}

          <div>
            <label style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: tk.textFaint, textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>
              {T(lang, 'নতুন পাসওয়ার্ড', 'New password')}
            </label>
            <div style={wrapStyle}>
              <input
                type={showNew ? 'text' : 'password'}
                value={newPw}
                onChange={e => setNewPw(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                style={inputStyle}
                autoComplete="new-password"
              />
              <button type="button" onClick={() => setShowNew(p => !p)} style={{ background: 'none', border: 0, color: tk.textFaint, cursor: 'pointer', padding: 0, lineHeight: 0 }}>
                <EyeIcon open={showNew} />
              </button>
            </div>
            {newPw.length > 0 && (
              <div style={{ display: 'flex', gap: 4, marginTop: 8, alignItems: 'center' }}>
                {[1, 2, 3, 4, 5].map(n => (
                  <div key={n} style={{ flex: 1, height: 4, borderRadius: 999, background: strengthColor(n, score), transition: 'background .2s' }} />
                ))}
                <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, marginLeft: 6, color: strengthColor(score, score) }}>
                  {strengthLabel(score)}
                </span>
              </div>
            )}
          </div>

          <div>
            <label style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: tk.textFaint, textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>
              {T(lang, 'পাসওয়ার্ড নিশ্চিত করুন', 'Confirm new password')}
            </label>
            <div style={{ ...wrapStyle, borderColor: confirmPw.length > 0 && confirmPw !== newPw ? tk.accent : tk.line }}>
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPw}
                onChange={e => setConfirmPw(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                style={inputStyle}
                autoComplete="new-password"
              />
              <button type="button" onClick={() => setShowConfirm(p => !p)} style={{ background: 'none', border: 0, color: tk.textFaint, cursor: 'pointer', padding: 0, lineHeight: 0 }}>
                <EyeIcon open={showConfirm} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            style={{
              width: '100%', background: canSubmit ? tk.primary : tk.panelMuted,
              color: canSubmit ? tk.primaryInk : tk.textFaint,
              border: 0, borderRadius: 14, padding: '13px 20px',
              fontFamily: SANS, fontWeight: 700, fontSize: 15,
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              boxShadow: canSubmit ? `0 6px 16px -6px ${tk.primary}` : 'none',
              transition: 'all .2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              marginTop: 4,
            }}
          >
            {loading && (
              <span style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${tk.primaryInk}44`, borderTopColor: tk.primaryInk, display: 'inline-block', animation: 'kj-spin 0.7s linear infinite' }} />
            )}
            {loading
              ? T(lang, 'সংরক্ষণ হচ্ছে…', 'Saving…')
              : isGoogleNoPassword
                ? T(lang, 'পাসওয়ার্ড সেট করুন', 'Set Password')
                : T(lang, 'পাসওয়ার্ড পরিবর্তন করুন', 'Update Password')}
          </button>
        </form>
      </div>
      <style>{`@keyframes kj-spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <AdCluster tk={tk} lang={lang} count={3} isMobile={isMobile} />
      </div>
    </PageShell>
  );
}
