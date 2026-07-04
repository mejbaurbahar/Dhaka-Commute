import React, { useState } from 'react';
import { KJ_TOKENS, T, SANS, BEN } from '../tokens';
import { PageShell } from './PageShell';
import { AdCluster } from '../components/AdSlot';
import { Logo } from '../components/Logo';
import { loginUser, loginWithGoogle } from '../../services/githubAuthService';
import { useAuth } from '../../contexts/AuthContext';
import { checkRateLimit, getRateLimitRemainingMs, sanitizeFormField } from '../../utils/security';
import { isFirebaseConfigured } from '../../services/firebaseConfig';
import { Turnstile } from '../components/Turnstile';

interface Props { theme:'dark'|'light'; device:'desktop'|'mobile'; lang:'bn'|'en'; route:string; canBack:boolean; onNav:(r:string)=>void; onNavTab?:(r:string)=>void; onBack:()=>void; onLang:()=>void; onTheme:()=>void; onMenu:()=>void; params?:Record<string,string>; }

export function SignInPage(props: Props) {
  const { theme, device, lang, onNav } = props;
  const tk = KJ_TOKENS[theme];
  const isMobile = device === 'mobile';
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [cfToken, setCfToken] = useState('');

  async function handleGoogleSignIn() {
    if (!isFirebaseConfigured) return;
    setGoogleLoading(true);
    setError('');
    try {
      const result = await loginWithGoogle();
      login({
        id: result.userId,
        email: result.email,
        username: result.username,
        displayName: result.displayName,
        avatarUrl: result.googlePhotoUrl,
        createdAt: Date.now(),
        provider: 'google' as any,
        hasPassword: result.hasPassword,
      });
      onNav('home');
    } catch (err: any) {
      const msg = err?.message || '';
      if (!msg.includes('cancelled')) {
        setError(msg || T(lang, 'গুগল সাইন ইন ব্যর্থ হয়েছে', 'Google sign in failed'));
      }
    } finally {
      setGoogleLoading(false);
    }
  }
  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    const allowed = checkRateLimit('signin:' + email.trim(), 5, 15 * 60 * 1000);
    if (!allowed) {
      const wait = Math.ceil(getRateLimitRemainingMs('signin:' + email.trim()) / 60000);
      setError(T(lang, `অনেকবার চেষ্টা করা হয়েছে। ${wait} মিনিট পরে চেষ্টা করুন।`, `Too many attempts. Try again in ${wait} minute(s).`));
      return;
    }
    if (!email.trim() || !password) return;
    setLoading(true);
    setError('');
    try {
      const result = await loginUser(sanitizeFormField(email, 'email'), password, cfToken);
      login({
        id: result.userId,
        email: result.email,
        username: result.username,
        displayName: result.displayName,
        createdAt: Date.now(),
        provider: 'manual',
        hasPassword: true,
      });
      onNav('profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : T(lang, 'সাইন ইন ব্যর্থ হয়েছে', 'Sign in failed'));
    } finally {
      setLoading(false);
    }
  }

  const canSubmit = email.trim().length > 0 && password.length > 0 && !!cfToken && !loading;

  return (
    <PageShell {...props}>
      <div style={{ minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center',padding:isMobile?'24px 16px':'48px 24px' }}>
        <form onSubmit={handleSignIn} style={{ width:'100%',maxWidth:420,background:tk.panel,border:`1px solid ${tk.line}`,borderRadius:24,padding:isMobile?24:32,boxShadow:tk.shadowLg }}>
          <div style={{ display:'flex',flexDirection:'column',alignItems:'center',marginBottom:24 }}>
            <Logo tk={tk} size={52}/>
            <h1 style={{ fontFamily:BEN,fontWeight:700,fontSize:22,color:tk.text,margin:'14px 0 4px' }}>{T(lang,'সাইন ইন করুন','Sign in to KoyJabo')}</h1>
            <p style={{ fontFamily:BEN,fontSize:13,color:tk.textDim,margin:0 }}>{T(lang,'আপনার যাত্রা শুরু হোক','Start your journey')}</p>
          </div>

          {error && (
            <div style={{ background:`${tk.accent}18`,border:`1px solid ${tk.accent}44`,borderRadius:10,padding:'10px 14px',marginBottom:16,fontFamily:SANS,fontSize:13,color:tk.accent }}>
              {error}
            </div>
          )}

          <div style={{ display:'flex',flexDirection:'column',gap:12,marginBottom:20 }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
              required
              style={{ width:'100%',background:tk.inputBg,border:`1px solid ${tk.line}`,borderRadius:12,padding:'12px 14px',color:tk.text,fontFamily:SANS,fontSize:14,outline:'none',boxSizing:'border-box',opacity:loading?0.6:1 }}
            />
            <div style={{ position:'relative' }}>
              <input
                type={showPw?'text':'password'}
                placeholder={T(lang,'পাসওয়ার্ড','Password')}
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
                required
                style={{ width:'100%',background:tk.inputBg,border:`1px solid ${tk.line}`,borderRadius:12,padding:'12px 14px',color:tk.text,fontFamily:SANS,fontSize:14,outline:'none',boxSizing:'border-box',opacity:loading?0.6:1 }}
              />
              <button type="button" onClick={()=>setShowPw(p=>!p)} style={{ position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',background:'none',border:0,color:tk.textFaint,cursor:'pointer',padding:4,lineHeight:0 }}>
                {showPw
                  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
            <div style={{ textAlign:'right' }}>
              <button type="button" onClick={()=>onNav('forgot-password')} style={{ background:'none',border:0,color:tk.primary,fontFamily:SANS,fontSize:12,fontWeight:600,cursor:'pointer' }}>
                {T(lang,'পাসওয়ার্ড ভুলে গেছেন?','Forgot password?')}
              </button>
            </div>
          </div>

          <Turnstile theme={theme} onVerify={setCfToken} onExpire={() => setCfToken('')} />

          <button
            type="submit"
            disabled={!canSubmit}
            style={{
              width:'100%',background:canSubmit?tk.primary:tk.panelMuted,color:canSubmit?tk.primaryInk:tk.textFaint,
              border:0,borderRadius:14,padding:'13px 20px',fontFamily:SANS,fontWeight:700,fontSize:15,
              cursor:canSubmit?'pointer':'not-allowed',marginBottom:16,
              boxShadow:canSubmit?`0 6px 16px -6px ${tk.primary}`:'none',
              transition:'all .2s',display:'flex',alignItems:'center',justifyContent:'center',gap:10
            }}
          >
            {loading && (
              <span style={{
                width:16,height:16,borderRadius:'50%',
                border:`2px solid ${tk.primaryInk}44`,borderTopColor:tk.primaryInk,
                display:'inline-block',animation:'kj-spin 0.7s linear infinite',flexShrink:0
              }}/>
            )}
            {loading ? T(lang,'সাইন ইন হচ্ছে…','Signing in…') : T(lang,'সাইন ইন করুন','Sign in')}
          </button>

          {false && isFirebaseConfigured && (
            <>
              <div style={{ display:'flex',alignItems:'center',gap:10,margin:'4px 0 12px' }}>
                <div style={{ flex:1,height:1,background:tk.line }}/>
                <span style={{ fontFamily:SANS,fontSize:11,color:tk.textFaint,whiteSpace:'nowrap' }}>{T(lang,'অথবা','or')}</span>
                <div style={{ flex:1,height:1,background:tk.line }}/>
              </div>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                style={{ width:'100%',background:tk.panelMuted,border:`1px solid ${tk.line}`,borderRadius:14,padding:'12px 20px',fontFamily:SANS,fontWeight:600,fontSize:14,color:tk.text,cursor:googleLoading?'not-allowed':'pointer',marginBottom:16,display:'flex',alignItems:'center',justifyContent:'center',gap:10,opacity:googleLoading?0.7:1 }}
              >
                {googleLoading
                  ? <span style={{ width:16,height:16,borderRadius:'50%',border:`2px solid ${tk.line}`,borderTopColor:tk.primary,display:'inline-block',animation:'kj-spin 0.7s linear infinite' }}/>
                  : <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></svg>
                }
                {googleLoading ? T(lang,'সাইন ইন হচ্ছে…','Signing in…') : T(lang,'গুগল দিয়ে সাইন ইন','Continue with Google')}
              </button>
            </>
          )}

          <div style={{ textAlign:'center',fontFamily:BEN,fontSize:13,color:tk.textDim }}>
            {T(lang,'অ্যাকাউন্ট নেই?','Don\'t have an account?')}{' '}
            <button type="button" onClick={()=>onNav('signup')} style={{ background:'none',border:0,color:tk.primary,fontFamily:BEN,fontSize:13,fontWeight:700,cursor:'pointer',padding:0 }}>
              {T(lang,'সাইন আপ করুন','Sign up')}
            </button>
          </div>
        </form>
      </div>
      <style>{`@keyframes kj-spin{to{transform:rotate(360deg)}}`}</style>
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <AdCluster tk={tk} lang={lang} count={3} isMobile={isMobile}/>
        </div>
    </PageShell>
  );
}
