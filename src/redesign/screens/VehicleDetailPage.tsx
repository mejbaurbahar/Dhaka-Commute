import React, { useState } from 'react';

import { useDocumentTitle } from '../utils/useDocumentTitle';
import { KJ_TOKENS, T, SANS, BEN } from '../tokens';
import { PageShell } from './PageShell';
import { AdSlot, NativeAdCard, AdCluster } from '../components/AdSlot';
import { Bus3D, Train3D, Plane3D, Launch3D } from '../components/Vehicles3D';
import { LAUNCH_ROUTES, LAUNCH_TERMINALS } from '../../../data/bangladeshLaunchData';

interface Props { theme:'dark'|'light'; device:'desktop'|'mobile'; lang:'bn'|'en'; route:string; canBack:boolean; onNav:(r:string)=>void; onNavTab?:(r:string)=>void; onBack:()=>void; onLang:()=>void; onTheme:()=>void; onMenu:()=>void; params?:Record<string,string>; }

type VehicleKind = 'bus'|'train'|'plane'|'launch';

function LaunchVesselIllustration({ col, name }: { col: string; name: string }) {
  const DECK = '#e8e8e0';
  const LIT = '#fff5c0';
  const DIM = '#b09060';
  const stars: [number,number][] = [
    [42,18],[95,32],[147,8],[213,42],[289,15],[362,28],[447,9],[521,38],
    [598,12],[672,35],[731,19],[765,45],[38,60],[122,72],[198,55],[271,78],
    [345,62],[412,85],[489,48],[563,75],[637,58],[708,88],[750,35],
  ];
  return (
    <svg viewBox="0 0 800 450" style={{ width:'100%',display:'block',borderRadius:12 }}>
      <defs>
        <linearGradient id="lvSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#010a18"/>
          <stop offset="100%" stopColor="#102545"/>
        </linearGradient>
        <linearGradient id="lvWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c1e35"/>
          <stop offset="100%" stopColor="#020c18"/>
        </linearGradient>
        <filter id="lvGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="lvSoft" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6"/>
        </filter>
      </defs>

      {/* Sky */}
      <rect width="800" height="295" fill="url(#lvSky)"/>

      {/* Stars */}
      {stars.map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={0.8+(i%3)*0.5} fill="white" opacity={0.3+(i%5)*0.14}/>
      ))}

      {/* Moon */}
      <circle cx="700" cy="65" r="28" fill="#fff9e0" opacity="0.9"/>
      <circle cx="710" cy="58" r="24" fill="#010a18" opacity="0.95"/>

      {/* Water */}
      <rect y="285" width="800" height="165" fill="url(#lvWater)"/>
      <line x1="0" y1="305" x2="800" y2="305" stroke="#1a4070" strokeWidth="1" opacity="0.4"/>
      <line x1="0" y1="328" x2="800" y2="328" stroke="#1a4070" strokeWidth="1" opacity="0.28"/>
      <line x1="0" y1="355" x2="800" y2="355" stroke="#1a4070" strokeWidth="1" opacity="0.18"/>

      {/* Vessel ambient glow */}
      <ellipse cx="400" cy="292" rx="310" ry="22" fill={col} opacity="0.13" filter="url(#lvSoft)"/>

      {/* Hull */}
      <path d="M 88,252 Q 90,285 60,285 L 735,285 Q 718,268 718,246 Z" fill={col}/>
      <rect x="88" y="246" width="630" height="7" fill="white" opacity="0.45"/>

      {/* Lower passenger deck */}
      <rect x="96" y="193" width="617" height="53" rx="3" fill={DECK}/>
      {[...Array(14)].map((_,i) => (
        <rect key={i} x={113+i*41} y="204" width="24" height="16" rx="3"
          fill={i%5===3 ? DIM : LIT} opacity="0.95"/>
      ))}
      <rect x="96" y="191" width="617" height="4" rx="1" fill={col} opacity="0.75"/>

      {/* Upper passenger deck */}
      <rect x="112" y="147" width="582" height="46" rx="3" fill={DECK} opacity="0.95"/>
      {[...Array(13)].map((_,i) => (
        <rect key={i} x={128+i*42} y="157" width="23" height="14" rx="3"
          fill={i%4===2 ? DIM : LIT} opacity="0.9"/>
      ))}
      <rect x="112" y="145" width="582" height="4" rx="1" fill={col} opacity="0.65"/>

      {/* Bridge / wheelhouse */}
      <rect x="286" y="104" width="218" height="43" rx="5" fill={DECK} opacity="0.9"/>
      {[0,1,2,3,4].map(i => (
        <rect key={i} x={301+i*38} y="114" width="24" height="14" rx="2" fill={LIT} opacity="0.95"/>
      ))}
      <rect x="286" y="102" width="218" height="3" rx="1" fill={col} opacity="0.6"/>

      {/* Funnel at stern */}
      <rect x="612" y="67" width="46" height="82" rx="5" fill={col}/>
      <rect x="607" y="64" width="56" height="12" rx="3" fill="#111"/>
      <rect x="612" y="89" width="46" height="5" fill="white" opacity="0.45"/>
      <ellipse cx="635" cy="55" rx="9" ry="11" fill="#22243a" opacity="0.22"/>
      <ellipse cx="630" cy="40" rx="13" ry="13" fill="#22243a" opacity="0.13"/>

      {/* Bow mast */}
      <line x1="118" y1="193" x2="118" y2="93" stroke="#aaa" strokeWidth="2.5"/>
      {/* Bangladesh flag */}
      <rect x="118" y="93" width="24" height="15" fill="#006a4e"/>
      <circle cx="130" cy="100" r="4.5" fill="#f42a41"/>

      {/* Railing posts */}
      {[116,156,196,236,276,316,356,396,436,476,516,556,596,636,676].map((x,i) => (
        <line key={i} x1={x} y1="191" x2={x} y2="246" stroke={col} strokeWidth="1" opacity="0.45"/>
      ))}

      {/* Deck lights */}
      {[140,202,264,326,388,450,512,574,636].map((x,i) => (
        <g key={i}>
          <circle cx={x} cy="191" r="3.5" fill="#ffd080" opacity="0.75"/>
          <circle cx={x} cy="191" r="7" fill="#ffd080" opacity="0.18"/>
        </g>
      ))}

      {/* Navigation lights */}
      <circle cx="90" cy="238" r="5" fill="#00ff66" opacity="0.9" filter="url(#lvGlow)"/>
      <circle cx="720" cy="238" r="5" fill="#ff3333" opacity="0.9" filter="url(#lvGlow)"/>

      {/* Vessel name on hull */}
      <text x="400" y="271" textAnchor="middle" fontFamily="Arial, sans-serif"
        fontSize="13" fontWeight="bold" fill="white" opacity="0.72" letterSpacing="2">
        {name.toUpperCase()}
      </text>

      {/* Water light reflection */}
      <rect x="96" y="285" width="617" height="28" fill={col} opacity="0.07"/>
      {[0,1,2].map(i => (
        <rect key={i} x={96+i*30} y={291+i*9} width={617-i*60} height="3" fill={LIT} opacity={0.04-i*0.01}/>
      ))}
    </svg>
  );
}

function Vehicle3D({ kind, size }: { kind: VehicleKind; size: number }) {
  if (kind==='bus') return <Bus3D size={size}/>;
  if (kind==='train') return <Train3D size={size}/>;
  if (kind==='plane') return <Plane3D size={size}/>;
  return <Launch3D size={size}/>;
}

export function VehicleDetailPage(props: Props) {
  const { theme, device, lang, params } = props;
  useDocumentTitle(T(lang, 'যানবাহনের তথ্য', 'Vehicle Details'));
  const tk = KJ_TOKENS[theme];
  const isMobile = device === 'mobile';
  const kind = (params?.kind || 'bus') as VehicleKind;
  const [tab, setTab] = useState<'stops'|'seats'|'amenities'|'photos'|'reviews'>('stops');
  const card = (r=16): React.CSSProperties => ({ background:tk.panel,border:`1px solid ${tk.line}`,borderRadius:r,padding:16 });

  // Build launch meta — prefer URL params, fall back to data lookup by id
  const launchDataById = kind === 'launch' && !params?.name && params?.id
    ? LAUNCH_ROUTES.find(r => r.id === params.id)
    : undefined;
  const terminalName = (id: string) => LAUNCH_TERMINALS.find(t => t.id === id)?.en ?? id;
  const terminalBnName = (id: string) => LAUNCH_TERMINALS.find(t => t.id === id)?.bn ?? id;
  const launchMeta = kind === 'launch' ? (() => {
    const ld = launchDataById;
    const col = params?.col || ld?.col || '#0c1a2e';
    const name = params?.name || (ld ? T(lang, ld.name.bn, ld.name.en) : 'MV Launch');
    const nameBn = params?.nameBn || ld?.name.bn || name;
    const fromLabel = params?.from || (ld ? terminalName(ld.from) : 'Sadarghat');
    const toLabel = params?.to || (ld ? terminalName(ld.to) : 'Barisal');
    const fromBn = ld ? terminalBnName(ld.from) : 'সদরঘাট';
    const toBn = ld ? terminalBnName(ld.to) : 'বরিশাল';
    return {
      hero: `linear-gradient(135deg,${col},${col}aa)`,
      title: name,
      titleBn: nameBn,
      route: `${fromLabel} → ${toLabel}`,
      routeBn: `${fromBn} → ${toBn}`,
      dep: params?.dep || ld?.dep || '8:00 PM',
      arr: params?.arr || ld?.arr || '6:00 AM',
      dur: params?.dur || ld?.dur || '10h',
      col,
      stats: [
        ['৳'+(params?.deck||ld?.deck||'300'),T(lang,'ডেক','deck')],
        ['৳'+(params?.cabin||ld?.cabin||'1200'),T(lang,'কেবিন','cabin')],
        ['৳'+(params?.vip||ld?.vip||'4000'),'VIP'],
        [(params?.rating||String(ld?.rating||'4.1'))+'★',T(lang,'রেটিং','rating')],
      ] as [string,string][],
    };
  })() : null;

  const meta: Record<VehicleKind,{hero:string,title:string,titleBn:string,route:string,routeBn:string,dep:string,arr:string,dur:string,stats:[string,string][]}>  = {
    bus:{ hero:'linear-gradient(135deg,#064e3b,#10b981)', title:'Green Line Paribahan',titleBn:'গ্রীন লাইন পরিবহন',route:'Gulshan → Motijheel',routeBn:'গুলশান → মতিঝিল',dep:'4:22 PM',arr:'5:10 PM',dur:'48 min',stats:[['12','stops'],['৳60','fare'],['AC','type'],['4.2★','rating']] },
    train:{ hero:'linear-gradient(135deg,#1e1b4b,#6d28d9)', title:'Cox\'s Bazar Express',titleBn:'কক্সবাজার এক্সপ্রেস',route:'Dhaka → Cox\'s Bazar',routeBn:'ঢাকা → কক্সবাজার',dep:'10:00 PM',arr:'7:00 AM',dur:'9h',stats:[['390km','distance'],['৳200+','fare'],['5 classes','coach'],['4.5★','rating']] },
    plane:{ hero:'linear-gradient(135deg,#1e3a8a,#6d28d9)', title:'BG-431 Biman Bangladesh',titleBn:'BG-431 বিমান বাংলাদেশ',route:'Dhaka → Cox\'s Bazar',routeBn:'ঢাকা → কক্সবাজার',dep:'8:00 AM',arr:'8:55 AM',dur:'55 min',stats:[['162','seats'],['৳4500','fare'],['2 classes','class'],['4.3★','rating']] },
    launch:{ hero:'linear-gradient(135deg,#0c1a2e,#0369a1)', title:'Sundarban-12',titleBn:'সুন্দরবন-১২',route:'Sadarghat → Barisal',routeBn:'সদরঘাট → বরিশাল',dep:'8:00 PM',arr:'6:00 AM',dur:'10h',stats:[['5 cabins','classes'],['৳300+','deck fare'],['Overnight','duration'],['4.3★','rating']] },
  };
  const m = launchMeta || meta[kind];

  const launchStops = kind === 'launch' && params?.from ? [
    { bn: params.from, en: params.from, t: params.dep || '8:00 PM', type: 'boarding' as const },
    { bn: params.to || 'Barisal', en: params.to || 'Barisal', t: params.arr || '6:00 AM', type: 'destination' as const },
  ] : null;

  const stops: Record<VehicleKind,{bn:string,en:string,t:string,type?:string}[]> = {
    bus:[{bn:'গুলশান ২',en:'Gulshan 2',t:'4:22 PM',type:'boarding'},{bn:'বাড্ডা',en:'Badda',t:'4:31 PM'},{bn:'রামপুরা',en:'Rampura',t:'4:38 PM'},{bn:'মালিবাগ',en:'Malibagh',t:'4:45 PM'},{bn:'মতিঝিল',en:'Motijheel',t:'5:10 PM',type:'destination'}],
    train:[{bn:'ঢাকা',en:'Dhaka',t:'10:00 PM',type:'boarding'},{bn:'কুমিল্লা',en:'Comilla',t:'12:30 AM'},{bn:'চট্টগ্রাম',en:'Chittagong',t:'3:30 AM',type:'rest'},{bn:'কক্সবাজার',en:"Cox's Bazar",t:'7:00 AM',type:'destination'}],
    plane:[{bn:'হজরত শাহজালাল বিমানবন্দর',en:'Hazrat Shahjalal Airport',t:'8:00 AM',type:'boarding'},{bn:'কক্সবাজার বিমানবন্দর',en:"Cox's Bazar Airport",t:'8:55 AM',type:'destination'}],
    launch: launchStops || [{bn:'সদরঘাট',en:'Sadarghat',t:'8:00 PM',type:'boarding'},{bn:'চাঁদপুর',en:'Chandpur',t:'11:30 PM'},{bn:'বরিশাল',en:'Barisal',t:'6:00 AM',type:'destination'}],
  };

  const amenities: Record<VehicleKind,{e:string,l:string}[]> = {
    bus:[{e:'❄️',l:'AC'},{e:'🪑',l:'Recliner'},{e:'🔌',l:'Charger'},{e:'🚻',l:'Toilet'},{e:'🍿',l:'Snacks'},{e:'💧',l:'Water'},{e:'📶',l:'WiFi'},{e:'📺',l:'TV'}],
    train:[{e:'❄️',l:'AC'},{e:'🍽️',l:'Pantry'},{e:'🔌',l:'Charging'},{e:'🚻',l:'Toilet'},{e:'🛏️',l:'Bedding'},{e:'📶',l:'WiFi'},{e:'♿',l:'Wheelchair'},{e:'🕌',l:'Prayer'}],
    plane:[{e:'🧳',l:'15kg bag'},{e:'🍽️',l:'Meal'},{e:'🎬',l:'IFE'},{e:'🔌',l:'USB'},{e:'🛏️',l:'Blanket'},{e:'📍',l:'Extra legroom'}],
    launch:[{e:'❄️',l:'AC Cabin'},{e:'🍽️',l:'Restaurant'},{e:'📺',l:'TV'},{e:'🛟',l:'Life jackets'},{e:'🌙',l:'Overnight'},{e:'🌊',l:'River view'}],
  };

  const buyAt: Record<VehicleKind,{icon:string,t:string}[]> = {
    bus:[{icon:'🌐',t:'greenlinebd.com'},{icon:'🏢',t:T(lang,'সায়েদাবাদ কাউন্টার','Sayedabad counter')},{icon:'📞',t:'01700-000000'}],
    train:[{icon:'🌐',t:'eticket.railway.gov.bd'},{icon:'🏢',t:T(lang,'কমলাপুর স্টেশন','Kamalapur Station')},{icon:'📞',t:'131'}],
    plane:[{icon:'🌐',t:'biman.com.bd / us-bangla.com'},{icon:'🏢',t:T(lang,'শাহজালাল বিমানবন্দর','Shahjalal Airport')},{icon:'📞',t:'13600'}],
    launch:[{icon:'🌐',t:'biwtc.gov.bd'},{icon:'🏢',t: params?.operator ? T(lang, params.operatorBn||params.operator, params.operator) : T(lang,'সদরঘাট টার্মিনাল','Sadarghat Terminal')},{icon:'📞',t:'16223'}],
  };

  const tabs: {key:typeof tab,label:string}[] = [{key:'stops',label:T(lang,'স্টপ','Stops')},{key:'seats',label:T(lang,'আসন','Seats')},{key:'amenities',label:T(lang,'সুবিধা','Amenities')},{key:'photos',label:T(lang,'ছবি','Photos')},{key:'reviews',label:T(lang,'রিভিউ','Reviews')}];

  return (
    <PageShell {...props}>
      <div style={{ padding:isMobile?'16px 16px 48px':'28px 40px 48px', maxWidth:1000, margin:'0 auto' }}>
        {/* Hero */}
        <div style={{ background:m.hero,borderRadius:22,padding:isMobile?18:24,marginBottom:20,color:'#fff',display:'flex',gap:16,alignItems:'center',flexWrap:'wrap' }}>
          <div style={{ flex:1 }}>
            <h2 style={{ fontFamily:BEN,fontWeight:700,fontSize:isMobile?20:26,margin:'0 0 6px' }}>{T(lang,m.titleBn,m.title)}</h2>
            <div style={{ fontFamily:BEN,fontSize:13,opacity:0.85,marginBottom:12 }}>{T(lang,m.routeBn,m.route)}</div>
            <div style={{ display:'flex',alignItems:'center',gap:14,marginBottom:12,flexWrap:'wrap' }}>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontFamily:SANS,fontWeight:800,fontSize:16 }}>{m.dep}</div>
                <div style={{ fontFamily:SANS,fontSize:11,opacity:0.7 }}>{T(lang,'ছাড়বে','Departs')}</div>
              </div>
              <div style={{ flex:1,height:2,background:'rgba(255,255,255,0.3)',borderRadius:999 }}/>
              <div style={{ fontFamily:SANS,fontSize:12,opacity:0.7 }}>{m.dur}</div>
              <div style={{ flex:1,height:2,background:'rgba(255,255,255,0.3)',borderRadius:999 }}/>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontFamily:SANS,fontWeight:800,fontSize:16 }}>{m.arr}</div>
                <div style={{ fontFamily:SANS,fontSize:11,opacity:0.7 }}>{T(lang,'পৌঁছাবে','Arrives')}</div>
              </div>
            </div>
            <div style={{ display:'flex',gap:10,flexWrap:'wrap' }}>
              {m.stats.map(([v,l],i)=>(
                <div key={i} style={{ background:'rgba(255,255,255,0.15)',padding:'6px 12px',borderRadius:999 }}>
                  <span style={{ fontFamily:SANS,fontWeight:800,fontSize:13 }}>{v}</span>
                  <span style={{ fontFamily:SANS,fontSize:11,opacity:0.8,marginLeft:4 }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
          {!isMobile && <Vehicle3D kind={kind} size={160}/>}
        </div>

        {/* Tabs */}
        <div style={{ display:'flex',gap:4,marginBottom:20,overflowX:'auto',padding:4,background:tk.panelMuted,borderRadius:14 }}>
          {tabs.map(t=>(
            <button key={t.key} onClick={()=>setTab(t.key)} style={{ padding:'8px 14px',borderRadius:10,border:0,background:tab===t.key?tk.primary:'transparent',color:tab===t.key?tk.primaryInk:tk.textDim,fontFamily:SANS,fontWeight:600,fontSize:13,cursor:'pointer',whiteSpace:'nowrap',flexShrink:0 }}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ display:'grid',gridTemplateColumns:isMobile?'1fr':'1.4fr 1fr',gap:20 }}>
          <div>
            {tab==='stops' && (
              <div style={{ ...card(18),marginBottom:16 }}>
                {stops[kind].map((s,i)=>(
                  <div key={i} style={{ display:'flex',gap:14,paddingBottom:i<stops[kind].length-1?14:0,position:'relative' }}>
                    <div style={{ width:20,flexShrink:0,display:'flex',justifyContent:'center',position:'relative' }}>
                      {i<stops[kind].length-1 && <div style={{ position:'absolute',top:16,bottom:-4,width:2,background:tk.primary,opacity:0.3 }}/>}
                      <div style={{ width:s.type?16:10,height:s.type?16:10,borderRadius:999,marginTop:4,background:s.type==='boarding'?tk.primary:s.type==='destination'?tk.accent:s.type==='rest'?tk.amber:tk.panel,border:`2px solid ${s.type==='boarding'?tk.primary:s.type==='destination'?tk.accent:s.type==='rest'?tk.amber:tk.primary}` }}/>
                    </div>
                    <div style={{ flex:1,display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                      <span style={{ fontFamily:BEN,fontWeight:s.type?700:500,fontSize:14,color:tk.text }}>{T(lang,s.bn,s.en)}</span>
                      <span style={{ fontFamily:SANS,fontSize:12,color:tk.textFaint }}>{s.t}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab==='amenities' && (
              <div style={{ ...card(18),marginBottom:16 }}>
                <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8 }}>
                  {amenities[kind].map((a,i)=>(
                    <div key={i} style={{ background:tk.panelMuted,borderRadius:12,padding:12,display:'flex',flexDirection:'column',alignItems:'center',gap:6 }}>
                      <span style={{ fontSize:22 }}>{a.e}</span>
                      <span style={{ fontFamily:SANS,fontSize:11,color:tk.textDim,textAlign:'center' }}>{a.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab==='seats' && (
              <div style={{ ...card(18),marginBottom:16 }}>
                <div style={{ fontFamily:BEN,fontWeight:700,fontSize:15,color:tk.text,marginBottom:12 }}>{T(lang,'আসন মানচিত্র','Seat map')}</div>
                {kind==='bus' && (
                  <div style={{ display:'flex',flexDirection:'column',gap:6 }}>
                    {Array.from({length:10},(_,r)=>(
                      <div key={r} style={{ display:'flex',gap:4,justifyContent:'center',alignItems:'center' }}>
                        {['A','B'].map(c=><span key={c} style={{ width:24,height:24,borderRadius:4,background:r<3?'#6b7280':r===5?tk.accentSoft:tk.primarySoft,border:`1px solid ${r<3?'#6b7280':r===5?tk.accent:tk.primary}`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:SANS,fontSize:9,color:r<3?'#fff':r===5?tk.accent:tk.primary,fontWeight:700 }}>{c}</span>)}
                        <span style={{ width:14 }}/>
                        {['C','D'].map(c=><span key={c} style={{ width:24,height:24,borderRadius:4,background:tk.primarySoft,border:`1px solid ${tk.primary}`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:SANS,fontSize:9,color:tk.primary,fontWeight:700 }}>{c}</span>)}
                      </div>
                    ))}
                    <div style={{ display:'flex',gap:10,marginTop:10,flexWrap:'wrap' }}>
                      {[{c:tk.primarySoft,b:tk.primary,l:T(lang,'উপলব্ধ','Available')},{c:'#6b728020',b:'#6b7280',l:T(lang,'বুকড','Booked')},{c:tk.accentSoft,b:tk.accent,l:T(lang,'মহিলা','Ladies')}].map((x,i)=>(
                        <div key={i} style={{ display:'flex',alignItems:'center',gap:6 }}>
                          <span style={{ width:16,height:16,borderRadius:4,background:x.c,border:`1px solid ${x.b}`,display:'block' }}/>
                          <span style={{ fontFamily:SANS,fontSize:11,color:tk.textFaint }}>{x.l}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {kind!=='bus' && <div style={{ fontFamily:BEN,fontSize:13,color:tk.textDim }}>{T(lang,'আসন তথ্য অপারেটরের ওয়েবসাইটে পাওয়া যাবে।','Seat info available at operator website.')}</div>}
                <div style={{ marginTop:12,padding:10,background:tk.amberSoft,borderRadius:10,fontFamily:BEN,fontSize:12,color:tk.amber }}>
                  ℹ️ {T(lang,'কই যাবো টিকেট বিক্রি করে না।','KoyJabo doesn\'t sell tickets — info only.')}
                </div>
              </div>
            )}
            {(tab==='photos'||tab==='reviews') && (
              <div style={{ ...card(18),marginBottom:16 }}>
                {tab==='photos' ? (
                  <div>
                    {kind==='launch' && params?.photos && params.photos.length > 0 ? (
                      <div style={{ display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8 }}>
                        {params.photos.split('|').filter(Boolean).map((src,i)=>(
                          <img key={i} src={src} alt={params?.name||'launch'} style={{ width:'100%',aspectRatio:'4/3',objectFit:'cover',borderRadius:12,display:'block' }} loading="lazy" />
                        ))}
                      </div>
                    ) : kind==='launch' ? (
                      <LaunchVesselIllustration col={launchMeta?.col||params?.col||'#1a6b3c'} name={launchMeta?.title||params?.name||'MV Launch'}/>
                    ) : (
                      <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8 }}>
                        {[['#10b981','#064e3b'],['#3b82f6','#1e3a8a'],['#f59e0b','#b45309'],['#ef4444','#991b1b']].map(([c1,c2],i)=>(
                          <div key={i} style={{ aspectRatio:'4/3',borderRadius:12,background:`linear-gradient(135deg,${c1},${c2})` }}/>
                        ))}
                        <div style={{ aspectRatio:'4/3',borderRadius:12,background:tk.panelMuted,border:`2px dashed ${tk.line}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,cursor:'pointer' }}>+</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {[{name:'Rahim',r:5,t:T(lang,'দুর্দান্ত সার্ভিস!','Excellent service!')},{name:'Karim',r:4,t:T(lang,'ভালো ছিল।','Was good.')},{name:'Sara',r:4,t:T(lang,'সময়মতো।','On time.')}].map((rev,i)=>(
                      <div key={i} style={{ paddingBottom:12,marginBottom:12,borderBottom:`1px solid ${tk.line}` }}>
                        <div style={{ display:'flex',gap:8,marginBottom:6 }}>
                          <div style={{ width:28,height:28,borderRadius:999,background:tk.primarySoft,color:tk.primary,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:SANS,fontWeight:700,fontSize:12 }}>{rev.name[0]}</div>
                          <span style={{ fontFamily:SANS,fontWeight:600,fontSize:13,color:tk.text }}>{rev.name}</span>
                          <span style={{ color:'#f59e0b' }}>{'★'.repeat(rev.r)}</span>
                        </div>
                        <div style={{ fontFamily:BEN,fontSize:13,color:tk.textDim }}>{rev.t}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <NativeAdCard
              tk={tk}
              lang={lang}
              kind={isMobile?'mob-banner':'leaderboard'}
              title={T(lang, 'এই যাত্রার জন্য অফার', 'Offers for this journey')}
              icon="🎯"
            />
          </div>

          {!isMobile && (
            <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
              <div style={{ ...card(16),background:'#0a0a1a',color:'#fff',border:'none' }}>
                <div style={{ fontFamily:BEN,fontWeight:700,fontSize:15,marginBottom:12 }}>{T(lang,'টিকেট কোথায় পাবেন','Where to buy')}</div>
                {buyAt[kind].map((b,i)=>(
                  <div key={i} style={{ display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.12)' }}>
                    <span>{b.icon}</span><span style={{ fontFamily:BEN,fontSize:13,opacity:0.9 }}>{b.t}</span>
                  </div>
                ))}
                <p style={{ fontFamily:BEN,fontSize:11,opacity:0.7,marginTop:10 }}>ℹ️ {T(lang,'শুধু তথ্য · টিকেট বিক্রয় নেই।','Info only · no ticket sales.')}</p>
              </div>
              <NativeAdCard
                tk={tk}
                lang={lang}
                kind="mid-rect"
                title={T(lang, 'যাত্রীদের জন্য', 'For your trip')}
                subtitle={T(lang, 'ভ্রমণ ও পার্টনার ডিল', 'Travel & partner deals')}
                icon="🎁"
                compact
              />
            </div>
          )}
        </div>
      </div>
          <AdCluster tk={tk} lang={lang} count={3} isMobile={isMobile}/>
    </PageShell>
  );
}
