import React, { useState } from 'react';

import { useDocumentTitle } from '../utils/useDocumentTitle';
import { KJ_TOKENS, T, SANS, BEN } from '../tokens';
import { PageShell } from './PageShell';
import { AdSlot, NativeAdCard, AdCluster } from '../components/AdSlot';
import { FbIcon, LiIcon } from '../components/BrandIcons';

interface Props { theme:'dark'|'light'; device:'desktop'|'mobile'; lang:'bn'|'en'; route:string; canBack:boolean; onNav:(r:string)=>void; onNavTab?:(r:string)=>void; onBack:()=>void; onLang:()=>void; onTheme:()=>void; onMenu:()=>void; params?:Record<string,string>; }

const PROXY = 'https://koyjabo-auth-proxy.fagun115946.workers.dev';

export function ContactPage(props: Props) {
  const { theme, device, lang } = props;
  useDocumentTitle(lang === 'bn' ? 'যোগাযোগ' : 'Contact Us');
  const tk = KJ_TOKENS[theme];
  const isMobile = device === 'mobile';
  const card = (r=16): React.CSSProperties => ({ background:tk.panel,border:`1px solid ${tk.line}`,borderRadius:r,padding:16 });
  const [subject, setSubject] = useState('General');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle'|'sending'|'ok'|'err'>('idle');
  const subjects = ['General','Bug Report','Feature Request','Content Error'];

  const inputStyle = (): React.CSSProperties => ({ width:'100%',background:tk.inputBg,border:`1px solid ${tk.line}`,borderRadius:12,padding:'12px 14px',color:tk.text,fontFamily:BEN,fontSize:14,outline:'none',boxSizing:'border-box' });

  const submit = async () => {
    if (!name.trim() || !message.trim() || status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch(`${PROXY}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: subject,
          query: name.trim(),
          from: email.trim(),
          to: '',
          comment: message.trim(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('ok');
      setName(''); setEmail(''); setMessage('');
    } catch {
      setStatus('err');
    }
  };

  return (
    <PageShell {...props}>
      <div style={{ padding:isMobile?'16px 16px 48px':'28px 40px 48px', maxWidth:700, margin:'0 auto' }}>

        {/* Hero */}
        <div className="kj-enter-1" style={{
          borderRadius:20,overflow:'hidden',position:'relative',
          background:'linear-gradient(135deg, #006a4e 0%, #10b981 50%, #34d399 100%)',
          color:'#fff',padding:isMobile?'24px 20px 20px':'36px 32px 28px',
          marginBottom:24,boxShadow:'0 6px 32px rgba(0,0,0,0.2)',
        }}>
          <div style={{ position:'absolute',inset:0,pointerEvents:'none',backgroundImage:'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',backgroundSize:'28px 28px',maskImage:'linear-gradient(135deg,transparent,rgba(0,0,0,0.4))',WebkitMaskImage:'linear-gradient(135deg,transparent,rgba(0,0,0,0.4))'}}/>
          <div style={{ position:'absolute',right:-30,top:-30,width:160,height:160,borderRadius:999,background:'rgba(255,255,255,0.08)',pointerEvents:'none'}}/>
          <div style={{ position:'relative',zIndex:1 }}>
            <span style={{ fontFamily:SANS,fontSize:10,fontWeight:800,letterSpacing:1.8,opacity:0.72,textTransform:'uppercase',display:'block',marginBottom:8 }}>✉️ {T(lang,'যোগাযোগ','Contact')}</span>
            <h1 style={{ fontFamily:BEN,fontWeight:800,fontSize:isMobile?24:32,margin:'0 0 6px',lineHeight:1.2 }}>{T(lang,'যোগাযোগ করুন','Contact Us')}</h1>
            <p style={{ fontFamily:BEN,fontSize:13,opacity:0.85,margin:0 }}>{T(lang,'আমরা ২৪-৪৮ ঘণ্টার মধ্যে উত্তর দিই।','We respond within 24-48 hours.')}</p>
          </div>
        </div>

        <div style={{ display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',gap:12,marginBottom:24 }}>
          {[
            { e:'mail', l:'Email', v:'koyjabo.bd@gmail.com', href:'mailto:koyjabo.bd@gmail.com', c:tk.primarySoft, fc:tk.primary },
            { e:'fb', l:'Facebook', v:'facebook.com/koyjabo', href:'https://facebook.com/koyjabo', c:'#1877f22a', fc:'#1877f2' },
            { e:'li', l:'LinkedIn', v:'linkedin.com/company/koy-jabo', href:'https://linkedin.com/company/koy-jabo', c:tk.chipBg, fc:tk.text },
            { e:'📝', l:T(lang,'ভুল তথ্য জানান','Report issue'), v:'Contact form', href:'#', c:tk.accentSoft, fc:tk.accent },
          ].map((c,i)=>(
            <a key={i} href={c.href} onClick={c.href === '#' ? (ev)=>{ ev.preventDefault(); document.getElementById('kj-contact-name')?.focus(); } : undefined} style={{ ...card(14),background:c.c,borderColor:c.fc+'33',display:'flex',alignItems:'center',gap:12,textDecoration:'none' }}>
              {c.e === 'fb' ? <FbIcon size={24} color="#1877F2" /> : c.e === 'li' ? <LiIcon size={24} color="#0A66C2" /> : <span style={{ fontSize:24 }}>{c.e === 'mail' ? '📧' : '📝'}</span>}
              <div>
                <div style={{ fontFamily:SANS,fontWeight:700,fontSize:13,color:c.fc }}>{c.l}</div>
                <div style={{ fontFamily:SANS,fontSize:12,color:tk.textDim }}>{c.v}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Form */}
        <div style={{ ...card(20) }}>
          <div style={{ fontFamily:BEN,fontWeight:700,fontSize:16,color:tk.text,marginBottom:16 }}>{T(lang,'বার্তা পাঠান','Send a message')}</div>
          <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
            <div>
              <label style={{ fontFamily:SANS,fontSize:11,fontWeight:700,color:tk.textFaint,textTransform:'uppercase',letterSpacing:1,display:'block',marginBottom:6 }}>{T(lang,'নাম','Name')}</label>
              <input id="kj-contact-name" value={name} onChange={e=>setName(e.target.value)} placeholder={T(lang,'আপনার নাম','Your name')} style={inputStyle()}/>
            </div>
            <div>
              <label style={{ fontFamily:SANS,fontSize:11,fontWeight:700,color:tk.textFaint,textTransform:'uppercase',letterSpacing:1,display:'block',marginBottom:6 }}>{T(lang,'ইমেইল','Email')}</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder={T(lang,'আপনার ইমেইল','your@email.com')} style={{ ...inputStyle(), fontFamily:SANS }}/>
            </div>
            <div>
              <label style={{ fontFamily:SANS,fontSize:11,fontWeight:700,color:tk.textFaint,textTransform:'uppercase',letterSpacing:1,display:'block',marginBottom:6 }}>{T(lang,'বিষয়','Subject')}</label>
              <select value={subject} onChange={e=>setSubject(e.target.value)} style={{ width:'100%',background:tk.inputBg,border:`1px solid ${tk.line}`,borderRadius:12,padding:'12px 14px',color:tk.text,fontFamily:SANS,fontSize:14,outline:'none',boxSizing:'border-box' }}>
                {subjects.map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontFamily:SANS,fontSize:11,fontWeight:700,color:tk.textFaint,textTransform:'uppercase',letterSpacing:1,display:'block',marginBottom:6 }}>{T(lang,'বার্তা','Message')}</label>
              <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder={T(lang,'আপনার বার্তা লিখুন...','Write your message...')} style={{ ...inputStyle(), minHeight:120, resize:'vertical' }}/>
            </div>
            <button onClick={submit} disabled={status === 'sending' || !name.trim() || !message.trim()} style={{ background:tk.primary,color:tk.primaryInk,border:0,borderRadius:12,padding:'13px 20px',fontFamily:SANS,fontWeight:700,fontSize:14,cursor:'pointer',opacity:status === 'sending' || !name.trim() || !message.trim() ? 0.5 : 1 }}>
              {status === 'sending' ? T(lang,'পাঠানো হচ্ছে...','Sending...') : `${T(lang,'পাঠান','Send message')} →`}
            </button>
            {status === 'ok' && <div style={{ color:tk.accent,fontFamily:BEN,fontSize:14 }}>{T(lang,'ধন্যবাদ! বার্তা পাঠানো হয়েছে।','Thank you! Your message has been sent.')}</div>}
            {status === 'err' && <div style={{ color:'#e5484d',fontFamily:BEN,fontSize:14 }}>{T(lang,'বার্তা পাঠানো যায়নি। আবার চেষ্টা করুন।','Could not send. Please try again.')}</div>}
          </div>
        </div>

        <NativeAdCard
          tk={tk}
          lang={lang}
          kind={isMobile?'mob-banner':'leaderboard'}
          title={T(lang, 'সংশ্লিষ্ট সাহায্য ও অফার', 'Related help & offers')}
          icon="💬"
        />
      </div>
          <AdCluster tk={tk} lang={lang} count={3} isMobile={isMobile}/>
    </PageShell>
  );
}
