import React, { useState, useEffect, useRef } from 'react';
import { STATIONS } from '../../../constants';
import { KJ_TOKENS, T, SANS, BEN, chipBtn } from '../tokens';
import { PageShell } from './PageShell';
import { useDocumentTitle, setMetaTag, setCanonicalUrl } from '../utils/useDocumentTitle';

import { Icon } from '../components/Icons';
import { askGeminiRoute, ChatMessage } from '../../../services/geminiService';
import { askGitHubModels } from '../../../services/githubModelsService';
import { getAllSessions, getSession, saveChatMessage, deleteSession } from '../../../services/chatHistoryManager';
import { getAuthUser } from '../../../services/communityDataService';

interface Props { theme:'dark'|'light'; device:'desktop'|'mobile'; lang:'bn'|'en'; route:string; canBack:boolean; onNav:(r:string)=>void; onNavTab?:(r:string)=>void; onBack:()=>void; onLang:()=>void; onTheme:()=>void; onMenu:()=>void; params?:Record<string,string>; }

function AvatarAI({ tk }: { tk: any }) {
  return (
    <div style={{ width:32,height:32,borderRadius:999,background:`linear-gradient(135deg,${tk.primary},${tk.accent})`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
      <svg viewBox="0 0 32 32" width="32" height="32">
        <rect x="8" y="10" width="16" height="14" rx="5" fill="rgba(255,255,255,0.9)"/>
        <circle cx="13" cy="16" r="1.8" fill={tk.primaryDeep} className="kj-ai-eye"/>
        <circle cx="19" cy="16" r="1.8" fill={tk.primaryDeep} className="kj-ai-eye2"/>
        <path d="M13 21 Q16 23 19 21" stroke={tk.accent} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

type Msg = { id: number; isUser: boolean; text: string; rich?: string };
const INIT_MESSAGES: Msg[] = [
  { id:1, isUser:false, text:'hello', rich:'greeting' },
];

function ChatBubble({ msg, tk, lang, userAvatarUrl, userInitials }: { msg: any; tk: any; lang:'bn'|'en'; userAvatarUrl?: string; userInitials?: string }) {
  const isUser = msg.isUser;
  if (msg.rich === 'greeting') {
    return (
      <div style={{ display:'flex',gap:10,alignSelf:'flex-start',maxWidth:'80%' }}>
        <AvatarAI tk={tk}/>
        <div style={{ background:tk.panel,border:`1px solid ${tk.line}`,borderRadius:16,padding:'12px 16px',color:tk.text }}>
          <div style={{ fontFamily:BEN,fontSize:14,lineHeight:1.6 }}>
            {T(lang,'হ্যালো! আমি কই যাবো AI। বাংলাদেশের যেকোনো পরিবহন সম্পর্কে জিজ্ঞেস করুন।','Hello! I\'m KoyJabo AI. Ask me anything about transport in Bangladesh.')}
          </div>
        </div>
      </div>
    );
  }
  if (msg.rich === 'table') {
    return (
      <div style={{ display:'flex',gap:10,alignSelf:'flex-start',maxWidth:'90%' }}>
        <AvatarAI tk={tk}/>
        <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
          <div style={{ background:tk.panel,border:`1px solid ${tk.line}`,borderRadius:16,padding:'12px 16px',color:tk.text,fontFamily:BEN,fontSize:14,lineHeight:1.6 }}>
            {T(lang,'গুলশান → মতিঝিল রুটে ৩টি বিকল্প আছে:','Gulshan → Motijheel has 3 options:')}
          </div>
          <div style={{ background:tk.panel,border:`1px solid ${tk.line}`,borderRadius:16,overflow:'hidden' }}>
            <table style={{ width:'100%',borderCollapse:'collapse',fontFamily:SANS,fontSize:12 }}>
              <thead>
                <tr style={{ background:tk.primarySoft }}>
                  {[T(lang,'মাধ্যম','Mode'),T(lang,'সময়','Time'),T(lang,'ভাড়া','Fare'),T(lang,'রেটিং','Rating')].map((h,i)=>(
                    <th key={i} style={{ padding:'8px 10px',textAlign:'left',color:tk.text,fontWeight:700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { m:'🚌 Green Line', t:'48 min', f:'৳ 60', r:'★4.2', best:true },
                  { m:'🚇 Metro', t:'32 min', f:'৳ 40', r:'★5.0', best:false },
                  { m:'🚕 CNG', t:'35 min', f:'৳ 120', r:'★3.8', best:false },
                ].map((row,i)=>(
                  <tr key={i} style={{ borderTop:`1px solid ${tk.line}`,background:row.best?tk.primarySoft:'transparent' }}>
                    <td style={{ padding:'8px 10px',color:tk.text,fontWeight:row.best?700:400 }}>{row.m}</td>
                    <td style={{ padding:'8px 10px',color:tk.textDim }}>{row.t}</td>
                    <td style={{ padding:'8px 10px',color:tk.text,fontWeight:700 }}>{row.f}</td>
                    <td style={{ padding:'8px 10px',color:'#f59e0b' }}>{row.r}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display:'flex',gap:6,flexWrap:'wrap' }}>
            {[T(lang,'🗺 রুট দেখুন','🗺 See route'),T(lang,'📊 তুলনা','📊 Compare'),T(lang,'⭐ রিভিউ','⭐ Reviews')].map((c,i)=>(
              <button key={i} style={chipBtn(tk)}>{c}</button>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (msg.rich === 'coxs') {
    return (
      <div style={{ display:'flex',gap:10,alignSelf:'flex-start',maxWidth:'85%' }}>
        <AvatarAI tk={tk}/>
        <div style={{ background:tk.panel,border:`1px solid ${tk.line}`,borderRadius:16,padding:'12px 16px',color:tk.text,fontFamily:BEN,fontSize:14,lineHeight:1.7 }}>
          {T(lang,
            "কক্সবাজার যাওয়ার ৩টি উপায়:\n\n🚌 বাস (গ্রীন লাইন/হানিফ): ৳৯০০–২৫০০, রাতে ছাড়ে, ১০–১২ ঘণ্টা\n🚆 ট্রেন (কক্সবাজার এক্সপ্রেস): ৳২০০–১২০০, রাত ১০টায় ছাড়ে, ৯ ঘণ্টা\n✈️ ফ্লাইট (বিমান/ইউএস বাংলা): ৳৪৫০০+, ৫৫ মিনিট",
            "3 ways to reach Cox's Bazar:\n\n🚌 Bus (Green Line/Hanif): ৳900–2500, overnight, 10–12h\n🚆 Train (Cox's Bazar Express): ৳200–1200, 10PM, 9h\n✈️ Flight (Biman/US-Bangla): ৳4500+, 55 min"
          )}
        </div>
      </div>
    );
  }
  return (
    <div style={{ display:'flex',gap:10,alignSelf:isUser?'flex-end':'flex-start',maxWidth:'80%',flexDirection:isUser?'row-reverse':'row' }}>
      {!isUser && <AvatarAI tk={tk}/>}
      {isUser && (userAvatarUrl
        ? <img src={userAvatarUrl} alt={userInitials} style={{ width:32,height:32,borderRadius:999,objectFit:'cover',flexShrink:0,border:`1.5px solid ${tk.primarySoft}` }}/>
        : <div style={{ width:32,height:32,borderRadius:999,background:tk.accentSoft,color:tk.accent,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontFamily:SANS,fontWeight:700,fontSize:12 }}>{userInitials||'KJ'}</div>
      )}
      <div style={{ background:isUser?tk.primary:tk.panel,color:isUser?tk.primaryInk:tk.text,border:isUser?0:`1px solid ${tk.line}`,borderRadius:16,padding:'12px 16px',fontFamily:BEN,fontSize:14,lineHeight:1.6 }}>
        {isUser ? msg.text : renderMd(msg.text, tk)}
      </div>
    </div>
  );
}

function renderMd(text: string, tk: any) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) return <div key={i} style={{ height: 10 }} />;
    if (/^─{3,}$/.test(trimmed)) return <div key={i} style={{ borderTop:`1px solid ${tk.line}`, margin:'18px 0 14px' }} />;

    const parseBold = (s: string) => {
      const parts = s.split(/\*\*(.+?)\*\*/);
      return parts.map((p, j) => j % 2 === 1
        ? <strong key={j} style={{ fontWeight:700, color:tk.text }}>{p}</strong>
        : p);
    };

    const isRouteTag = /^[🏆⚡💸🚌]/.test(trimmed) && trimmed.includes('**') && trimmed.length < 80;
    const isFlow = trimmed.startsWith('📍');
    const isSummary = trimmed.startsWith('⏱️');
    const isStep = /^\s*🚌|^\s*🚇|^\s*🚂|^\s*🚶|^\s*✈️/.test(trimmed);
    const isReason = trimmed.startsWith('💡');
    const isHeader = /^🗺️/.test(trimmed);

    let bg = 'transparent';
    let borderL = 'none';
    let pl = 0;
    let mb = 3;

    if (isRouteTag) { bg = `${tk.primarySoft}44`; pl = 8; mb = 4; }
    if (isFlow) { bg = `${tk.panelMuted}`; pl = 8; mb = 4; }
    if (isStep) { pl = 12; mb = 3; borderL = `2px solid ${tk.line}`; }
    if (isReason) { bg = `${tk.accentSoft}22`; pl = 8; mb = 2; }
    if (isHeader) { mb = 6; }

    return (
      <div key={i} style={{
        marginBottom: mb,
        paddingLeft: pl,
        paddingTop: isRouteTag ? 6 : isReason ? 4 : 0,
        paddingBottom: isRouteTag ? 4 : 0,
        paddingRight: (isRouteTag || isFlow || isReason) ? 8 : 0,
        background: bg,
        borderLeft: borderL,
        borderRadius: (isRouteTag || isFlow || isReason) ? 8 : 0,
      }}>
        {parseBold(trimmed)}
      </div>
    );
  });
}

// Find nearest station name from GPS coords using all known STATIONS
function nearestArea(lat: number, lng: number): string {
  const stationList = Object.values(STATIONS).filter((s: any) => s.lat && s.lng);
  let best: any = stationList[0];
  let bestDist = Infinity;
  for (const s of stationList as any[]) {
    const d = (s.lat - lat) ** 2 + (s.lng - lng) ** 2;
    if (d < bestDist) { bestDist = d; best = s; }
  }
  return best?.name || 'Dhaka';
}

export function AIChatPage(props: Props) {
  const { theme, device, lang } = props;
  useDocumentTitle(lang === 'bn' ? 'কই যাবো AI — যাতায়াত সহায়ক চ্যাট' : 'KoyJabo AI — Transport Chat Assistant');
  setMetaTag('description', lang === 'bn' ? 'বাংলা বা ইংরেজিতে রুট, ভাড়া ও যাতায়াত প্রশ্নের জবাব দেয় কই যাবো AI।' : 'Ask KoyJabo AI about routes, fares and travel in English or Bengali.');
  setCanonicalUrl('/ai');
  const tk = KJ_TOKENS[theme];
  const isMobile = device === 'mobile';
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>(INIT_MESSAGES);
  const firstQ = props.params?.q;
  useEffect(() => {
    if (!firstQ) return;
    setInput(firstQ);
    send(firstQ);
    window.history.replaceState({}, '', '/ai');
  }, [firstQ]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const userAreaRef = useRef<string>('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Warm-up: load cached area and refresh GPS in background
    const consent = localStorage.getItem('kj-location-consent');
    const stored = localStorage.getItem('kj-location-area');
    if (stored) userAreaRef.current = stored;
    if (consent !== 'yes' || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      pos => {
        const area = nearestArea(pos.coords.latitude, pos.coords.longitude);
        userAreaRef.current = area;
        localStorage.setItem('kj-location-area', area);
      },
      () => {},
      { timeout: 5000, maximumAge: 300000 }
    );
  }, []);

  // Returns cached area immediately, or fetches fresh GPS (max 6 s) if cache is empty.
  // Resolves with null when GPS is denied, unavailable, or timed out.
  function getOrFetchArea(): Promise<string | null> {
    if (userAreaRef.current) return Promise.resolve(userAreaRef.current);
    if (!navigator.geolocation) return Promise.resolve(null);
    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const area = nearestArea(pos.coords.latitude, pos.coords.longitude);
          userAreaRef.current = area;
          localStorage.setItem('kj-location-area', area);
          localStorage.setItem('kj-location-consent', 'yes');
          resolve(area);
        },
        () => resolve(null),
        { timeout: 6000, maximumAge: 60000 }
      );
    });
  }

  // Auto-scroll to latest message whenever messages or loading state changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading]);

  const chatUser = getAuthUser();
  const userAvatarUrl = chatUser?.avatarUrl;
  const userInitials = (chatUser?.displayName || chatUser?.username || 'KJ').slice(0, 2).toUpperCase();

  const suggestions = [
    { bn:'কোন বাস গুলশান থেকে মতিঝিল?', en:'Bus Gulshan to Motijheel?' },
    { bn:'বিমানবন্দর → ফার্মগেট', en:'Airport → Farmgate' },
    { bn:'সদরঘাট লঞ্চ সময়', en:'Sadarghat launch times' },
    { bn:'মেট্রো সময়সূচি', en:'Metro schedule' },
  ];

  const [showAllRecents, setShowAllRecents] = useState(false);
  const [allRecents, setAllRecents] = useState(() =>
    getAllSessions().slice().sort((a, b) => b.lastUpdated - a.lastUpdated)
      .map(s => ({ id: s.id, title: s.messages.find(m => m.role === 'user')?.text || T(lang, 'নতুন কথোপকথন', 'New conversation') }))
  );
  const recents = showAllRecents ? allRecents : allRecents.slice(0, 5);

  function loadSession(id: string) {
    const session = getSession(id);
    if (!session) return;
    setSessionId(id);
    const msgs: Msg[] = session.messages.map((m, i) => ({ id: i, isUser: m.role === 'user', text: m.text }));
    setMessages(msgs.length ? msgs : INIT_MESSAGES);
  }

  function handleDeleteSession(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    deleteSession(id);
    setAllRecents(prev => prev.filter(r => r.id !== id));
    if (sessionId === id) { setSessionId(null); setMessages(INIT_MESSAGES); }
  }

  async function send(prefill?: string) {
    const text = prefill ?? input;
    if (!text.trim() || isLoading) return;
    const userText = text.trim();
    const userMsg = { id: Date.now(), isUser:true, text:userText };
    setMessages(m => [...m, userMsg]);
    const nextSessionId = saveChatMessage({ role: 'user', text: userText, timestamp: Date.now() } as any, sessionId);
    setSessionId(nextSessionId);
    setInput('');
    setIsLoading(true);
    // Refresh recents list (new session title)
    setAllRecents(getAllSessions().slice().sort((a, b) => b.lastUpdated - a.lastUpdated)
      .map(s => ({ id: s.id, title: s.messages.find(m => m.role === 'user')?.text || T(lang, 'নতুন কথোপকথন', 'New conversation') })));
    try {
      const currentMessages = [...messages, userMsg];
      const chatHistory: ChatMessage[] = currentMessages
        .filter(m => !(m as any).rich)
        .map(m => ({ role: m.isUser ? 'user' : 'assistant', text: m.text }));

      const hasFrom = /\bfrom\b|থেকে|হতে/i.test(userText);

      // Extract destination from "how to go X", "want to go X", "jeta chai X" etc.
      function extractGoToDest(q: string): string | null {
        const m = q.match(
          /(?:how\s+(?:to\s+)?(?:go|get)\s+(?:to\s+)?|route\s+to\s+|reach\s+|take\s+me\s+to\s+|go\s+to\s+|directions?\s+to\s+|best\s+(?:bus|way)\s+(?:to|for)\s+|nearest\s+way\s+to\s+|how\s+can\s+i\s+(?:get\s+to|reach)\s+|(?:i\s+)?want\s+to\s+go(?:\s+to)?\s+|(?:i\s+)?want\s+to\s+visit\s+|(?:i\s+)?need\s+to\s+go(?:\s+to)?\s+|(?:i\s+)?(?:am|m)\s+going(?:\s+to)?\s+)([a-zA-Z\u0980-\u09FF][a-zA-Z\u0980-\u09FF\s']{1,40})(?:\?|।|,|$)/i
        ) || q.match(/(?:কিভাবে\s+যাব[োো]?\s+|যেতে\s+চাই\s+|যাবো?\s+কিভাবে\s+|জেতে\s+চাই\s+|jeta\s+chai\s*,?\s*|jabo\s+|jete\s+chai\s+|jaite\s+chai\s+)([a-zA-Z\u0980-\u09FF][a-zA-Z\u0980-\u09FF\s']{1,40})(?:\?|।|,|$)/i);
        return m ? m[1].trim().replace(/[?।,]$/, '').trim() : null;
      }

      const goToDest = !hasFrom ? extractGoToDest(userText) : null;
      const isNavIntent = !hasFrom && goToDest !== null;

      // When nav-intent is detected and no cached area, proactively fetch GPS now.
      let area = userAreaRef.current;
      if (isNavIntent && !area) {
        area = await getOrFetchArea() ?? '';
      }

      // If still no area after GPS attempt, ask user to specify origin
      if (isNavIntent && !area && goToDest) {
        const noLocMsg = lang === 'bn'
          ? `📍 আপনার বর্তমান অবস্থান জানতে পারছি না।\n\n**${goToDest}** যেতে চান, কিন্তু আপনি কোথা থেকে যাচ্ছেন? একটু বলুন — যেমন: \'মিরপুর থেকে ${goToDest}\' বা \'ফার্মগেট থেকে ${goToDest}\'।`
          : `📍 I couldn't detect your current location.\n\nYou want to go to **${goToDest}** — where are you starting from? Try: \'Mirpur to ${goToDest}\' or \'Farmgate to ${goToDest}\'.`;
        saveChatMessage({ role: 'assistant', text: noLocMsg, timestamp: Date.now() } as any, nextSessionId);
        setMessages(m => [...m, { id: Date.now()+1, isUser:false, text: noLocMsg }]);
        return;
      }

      let queryForOffline: string;
      if (area && goToDest) {
        // Build unambiguous "FROM to DEST" — prevents positional reversal
        queryForOffline = `${area} to ${goToDest} [Context: User is in ${area} area]`;
      } else if (!hasFrom && area) {
        queryForOffline = `${userText} from ${area} [Context: User is in ${area} area]`;
      } else {
        queryForOffline = userText;
      }

      let response: string;
      try {
        response = await askGitHubModels(userText, chatHistory);
      } catch {
        // Greet by the logged-in user's real name — never a hardcoded one
        const chatUserName = chatUser?.displayName || chatUser?.username || undefined;
        response = await askGeminiRoute(queryForOffline, undefined, chatHistory, chatUserName);
        // Prepend "Your current location" when GPS was injected and area not already in response
        if (!hasFrom && area && response && !response.includes(area)) {
          const prefix = lang === 'bn'
            ? `📍 **আপনার বর্তমান অবস্থান:** ${area}\n\n`
            : `📍 **Your current location:** ${area}\n\n`;
          response = prefix + response;
        }
      }
      saveChatMessage({ role: 'assistant', text: response, timestamp: Date.now() } as any, nextSessionId);
      setMessages(m => [...m, { id: Date.now()+1, isUser:false, text:response }]);
    } catch {
      setMessages(m => [...m, { id: Date.now()+1, isUser:false, text:T(lang,'দুঃখিত, একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।','Sorry, something went wrong. Please try again.') }]);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <PageShell {...props}>
      <div style={{ display:'flex', height: isMobile ? 'calc(100dvh - 52px - 60px)' : 'calc(100vh - 60px)', overflow:'hidden', background: tk.bg }}>

        {/* ── Desktop sidebar ── */}
        {!isMobile && (
          <div style={{ width:300,flexShrink:0,borderRight:`1px solid ${tk.line}`,display:'flex',flexDirection:'column',background:tk.panel }}>

            {/* Sidebar AI branding header */}
            <div style={{ padding:'20px 20px 16px', borderBottom:`1px solid ${tk.line}`, background:`linear-gradient(135deg,${tk.primarySoft} 0%,${tk.accentSoft ?? tk.panelMuted} 100%)` }}>
              <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:6 }}>
                <div style={{ width:34,height:34,borderRadius:10,background:`linear-gradient(135deg,${tk.primary},${tk.accent})`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                  <svg viewBox="0 0 32 32" width="20" height="20"><rect x="8" y="10" width="16" height="14" rx="5" fill="rgba(255,255,255,0.9)"/><circle cx="13" cy="16" r="1.8" fill={tk.primaryDeep}/><circle cx="19" cy="16" r="1.8" fill={tk.primaryDeep}/></svg>
                </div>
                <div>
                  <div style={{ fontFamily:SANS,fontSize:13,fontWeight:800,color:tk.text }}>KoyJabo AI</div>
                  <div style={{ fontFamily:BEN,fontSize:10,color:tk.textDim }}>পরিবহন সহায়ক • Transport Assistant</div>
                </div>
              </div>
              <button onClick={()=>{setSessionId(null);setMessages(INIT_MESSAGES);}} style={{ width:'100%',padding:'7px 12px',borderRadius:10,border:`1px solid ${tk.primary}40`,background:tk.primarySoft,color:tk.primary,fontFamily:BEN,fontSize:12,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:6 }}>
                <span>✦</span> {T(lang,'নতুন কথোপকথন','New conversation')}
              </button>
            </div>

            {/* Recent conversations */}
            <div style={{ flex:1,overflowY:'auto',padding:'12px 12px 0' }}>
              <div style={{ fontFamily:SANS,fontSize:9,fontWeight:700,color:tk.textFaint,letterSpacing:1.4,textTransform:'uppercase',marginBottom:8,paddingLeft:4 }}>
                {T(lang,'সাম্প্রতিক','Recents')}
              </div>
              {recents.length > 0 ? (
                <>
                  {recents.map((r) => (
                    <div key={r.id} onClick={() => loadSession(r.id)}
                      style={{ display:'flex',alignItems:'center',gap:8,padding:'8px 10px',borderRadius:12,cursor:'pointer',fontFamily:BEN,fontSize:12,color:sessionId===r.id?tk.primary:tk.textDim,marginBottom:2,background:sessionId===r.id?tk.primarySoft:'transparent',border:`1px solid ${sessionId===r.id?tk.primary+'30':'transparent'}`,transition:'all 0.15s' }}
                      onMouseEnter={e=>{if(sessionId!==r.id)(e.currentTarget.style.background=tk.chipBg)}}
                      onMouseLeave={e=>{if(sessionId!==r.id)(e.currentTarget.style.background='transparent')}}>
                      <span style={{ fontSize:14,flexShrink:0 }}>💬</span>
                      <span style={{ flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{r.title}</span>
                      <button onClick={e=>handleDeleteSession(r.id,e)} style={{ flexShrink:0,background:'none',border:'none',cursor:'pointer',color:tk.textFaint,fontSize:16,padding:'0 2px',lineHeight:1,opacity:0.6 }}>×</button>
                    </div>
                  ))}
                  {allRecents.length > 5 && (
                    <button onClick={()=>setShowAllRecents(v=>!v)} style={{ width:'100%',background:'none',border:`1px solid ${tk.line}`,borderRadius:8,padding:'5px',fontFamily:SANS,fontSize:11,color:tk.textFaint,cursor:'pointer',marginTop:4 }}>
                      {showAllRecents ? T(lang,'কম দেখুন','Show less') : T(lang,`আরও ${allRecents.length-5}টি`,`+${allRecents.length-5} more`)}
                    </button>
                  )}
                </>
              ) : (
                <div style={{ fontFamily:BEN,fontSize:12,color:tk.textFaint,lineHeight:1.6,padding:'6px 4px',textAlign:'center',marginTop:12 }}>
                  {T(lang,'এখনো কোনো কথোপকথন নেই।','No conversations yet.')}
                </div>
              )}
            </div>

            {/* Suggestions */}
            <div style={{ padding:'12px',borderTop:`1px solid ${tk.line}` }}>
              <div style={{ fontFamily:SANS,fontSize:9,fontWeight:700,color:tk.textFaint,letterSpacing:1.4,textTransform:'uppercase',marginBottom:8,paddingLeft:4 }}>
                {T(lang,'দ্রুত প্রশ্ন','Quick questions')}
              </div>
              {suggestions.map((s,i)=>(
                <button key={i} onClick={()=>setInput(T(lang,s.bn,s.en))} style={{ display:'flex',alignItems:'center',gap:8,width:'100%',textAlign:'left',padding:'8px 10px',borderRadius:10,border:`1px solid ${tk.line}`,background:'transparent',color:tk.text,fontFamily:BEN,fontSize:12,cursor:'pointer',marginBottom:5,transition:'background 0.12s' }}
                  onMouseEnter={e=>(e.currentTarget.style.background=tk.chipBg)}
                  onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
                  <span style={{ color:tk.primary,flexShrink:0 }}>→</span>
                  {T(lang,s.bn,s.en)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Main chat column ── */}
        <div style={{ flex:1,display:'flex',flexDirection:'column',minHeight:0,background:`linear-gradient(180deg,${tk.bg} 0%,${tk.panelSolid ?? tk.panel} 100%)` }}>
          <div style={{ display:'flex',flexDirection:'column',minHeight:0,maxWidth:isMobile?'100%':900,width:'100%',margin:'0 auto',flex:1 }}>

          {/* Desktop chat header bar */}
          {!isMobile && (
            <div style={{ flexShrink:0,padding:'14px 20px',borderBottom:`1px solid ${tk.line}`,display:'flex',alignItems:'center',gap:12,background:tk.panel }}>
              <AvatarAI tk={tk}/>
              <div>
                <div style={{ fontFamily:SANS,fontSize:14,fontWeight:700,color:tk.text }}>KoyJabo AI</div>
                <div style={{ display:'flex',alignItems:'center',gap:5 }}>
                  <span style={{ width:7,height:7,borderRadius:'50%',background:'#22c55e',display:'inline-block' }}/>
                  <span style={{ fontFamily:SANS,fontSize:11,color:tk.textDim }}>{T(lang,'সক্রিয়','Online')}</span>
                </div>
              </div>
            </div>
          )}

          {/* Messages area */}
          <div style={{ flex:1,minHeight:0,overflowY:'auto',padding: isMobile ? '14px 12px' : '20px 24px',display:'flex',flexDirection:'column',gap: isMobile ? 12 : 16 }}>
            {messages.map(msg => <ChatBubble key={msg.id} msg={msg} tk={tk} lang={lang} userAvatarUrl={userAvatarUrl} userInitials={userInitials}/>)}
            {isLoading && (
              <div style={{ display:'flex',gap:10,alignSelf:'flex-start',maxWidth:'80%' }}>
                <AvatarAI tk={tk}/>
                <div style={{ background:tk.panel,border:`1px solid ${tk.line}`,borderRadius:20,borderBottomLeftRadius:4,padding:'14px 18px',boxShadow:`0 2px 8px ${tk.shadow ?? 'rgba(0,0,0,0.08)'}` }}>
                  <span className="kj-ai-dots" style={{ fontFamily:SANS,fontSize:20,letterSpacing:6,color:tk.textDim }}>···</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} style={{ height:1,flexShrink:0 }}/>
          </div>

          {/* Mobile suggestion chips */}
          {isMobile && (
            <div style={{ flexShrink:0,display:'flex',gap:6,padding:'8px 12px',overflowX:'auto',background:tk.panel,borderTop:`1px solid ${tk.line}`,scrollbarWidth:'none' } as React.CSSProperties}>
              {suggestions.slice(0,4).map((s,i)=>(
                <button key={i} onClick={()=>setInput(T(lang,s.bn,s.en))} style={{ flexShrink:0,background:tk.primarySoft,border:`1px solid ${tk.primary}30`,borderRadius:999,padding:'6px 14px',fontFamily:BEN,fontSize:11,fontWeight:600,color:tk.primary,cursor:'pointer',whiteSpace:'nowrap' }}>
                  {T(lang,s.bn,s.en)}
                </button>
              ))}
            </div>
          )}

          {/* Input bar — sticky on mobile so it always floats above the page
              scroll (page scrolls 60+px on small screens; input must stay visible) */}
          <div style={{
            flexShrink:0,
            padding: isMobile ? '10px 12px' : '14px 20px',
            paddingBottom: isMobile ? 'calc(10px + env(safe-area-inset-bottom, 0px))' : '14px',
            borderTop:`1px solid ${tk.line}`,
            background:tk.panel,
            display:'flex',gap:8,alignItems:'center',
            ...(isMobile ? { position:'sticky', bottom:0, zIndex:5, boxShadow:'0 -10px 24px rgba(0,0,0,0.10)' } : {}),
          }}>
            <div style={{ flex:1,display:'flex',alignItems:'center',background:tk.inputBg,border:`1.5px solid ${tk.line}`,borderRadius:999,padding:'0 16px',gap:8,transition:'border-color 0.2s' }}>
              <span style={{ fontSize:16,flexShrink:0 }}>🔍</span>
              <input
                value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()}
                placeholder={T(lang,'পরিবহন সম্পর্কে জিজ্ঞেস করুন...','Ask about transport in Bangladesh...')}
                style={{ flex:1,background:'transparent',border:'none',padding: isMobile ? '14px 0' : '12px 0',fontFamily:BEN,fontSize: isMobile ? 16 : 14,color:tk.text,outline:'none',minWidth:0 }}
              />
            </div>
            <button onClick={() => send()} disabled={isLoading} aria-label={T(lang,'পাঠান','Send message')} style={{ width: isMobile ? 46 : 48,height: isMobile ? 46 : 48,borderRadius:999,background:isLoading?tk.panelMuted:`linear-gradient(135deg,${tk.primary},${tk.accent})`,color:'#fff',border:0,cursor:isLoading?'not-allowed':'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,boxShadow:isLoading?'none':`0 4px 14px ${tk.primary}55`,transition:'all 0.2s' }}>
              <Icon.arrowR s={18}/>
            </button>
          </div>
        </div>
        </div>
      </div>
    </PageShell>
  );
}
