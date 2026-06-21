const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ai-service-BwDhcQae.js","assets/train-data-Bfg7o-rQ.js","assets/intercity-data-IxAoDdiK.js","assets/leaflet-BF7F7cMi.js","assets/leaflet-Dgihpmma.css","assets/virtual_pwa-register-BQqNblwi.js","assets/react-ClBwdsT_.js","assets/react-dom-JLeNMwRN.js","assets/vendor-BT0NSjO2.js","assets/lucide-LTw2Y516.js"])))=>i.map(i=>d[i]);
import{j as e,r as b,R as Ee}from"./react-ClBwdsT_.js";import{r as Si,c as wi}from"./react-dom-JLeNMwRN.js";import{p as Bi,s as Ci,S as ge,L as ve,A as Se,M as kt,B as pe,a as Ti,b as Oe,c as St,d as Fi,R as Di,e as Ai,g as Ni}from"./ai-service-BwDhcQae.js";import{T as qe,B as Ye}from"./train-data-Bfg7o-rQ.js";import{I as Xt,M as Zt,B as It}from"./intercity-data-IxAoDdiK.js";import{C as Ri,a as Ii,X as rt,A as Ha,S as zt,b as Mt,U as Wt,T as la,c as zi,d as Mi,e as da,P as Wi,L as Pi,N as Ei,f as pt,g as Li,h as Pt,i as ca,F as ha,M as pa}from"./lucide-LTw2Y516.js";import"./leaflet-BF7F7cMi.js";import"./vendor-BT0NSjO2.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function d(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(n){if(n.ep)return;n.ep=!0;const i=d(n);fetch(n.href,i)}})();const $i="modulepreload",_i=function(a){return"/"+a},ua={},Ae=function(o,d,t){let n=Promise.resolve();if(d&&d.length>0){let r=function(h){return Promise.all(h.map(u=>Promise.resolve(u).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),p=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));n=r(d.map(h=>{if(h=_i(h),h in ua)return;ua[h]=!0;const u=h.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${f}`))return;const v=document.createElement("link");if(v.rel=u?"stylesheet":$i,u||(v.as="script"),v.crossOrigin="",v.href=h,p&&v.setAttribute("nonce",p),document.head.appendChild(v),u)return new Promise((k,j)=>{v.addEventListener("load",k),v.addEventListener("error",()=>j(new Error(`Unable to preload CSS for ${h}`)))})}))}function i(r){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=r,window.dispatchEvent(s),!s.defaultPrevented)throw r}return n.then(r=>{for(const s of r||[])s.status==="rejected"&&i(s.reason);return o().catch(i)})},ae={light:{bg:"#eef3f7",pageBg:"#dde6ee",panel:"rgba(255,255,255,0.72)",panelMuted:"rgba(232,240,247,0.6)",line:"rgba(56,89,122,0.18)",text:"#0a1626",textDim:"#4a607a",textFaint:"#7e93ab",chipBg:"rgba(56,100,160,0.08)",chipText:"#1e3a5f",inputBg:"rgba(255,255,255,0.65)",primary:"#00b8d9",primaryInk:"#02161c",primarySoft:"rgba(0,184,217,0.12)",primaryDeep:"#0070ad",accent:"#ff3d77",accentSoft:"rgba(255,61,119,0.12)",amber:"#ff8a00",amberSoft:"rgba(255,138,0,0.12)",metroBg:"#001b2e",shadow:"0 2px 4px rgba(0,32,64,0.04), 0 18px 40px -20px rgba(0,184,217,0.18)",shadowLg:"0 4px 12px rgba(0,32,64,0.06), 0 32px 80px -30px rgba(0,184,217,0.35)"},dark:{bg:"#040814",pageBg:"#05060b",panel:"rgba(13,22,42,0.72)",panelMuted:"rgba(7,14,28,0.6)",line:"rgba(0,245,255,0.14)",text:"#e0f7ff",textDim:"#8da4c4",textFaint:"#5a7090",chipBg:"rgba(0,245,255,0.08)",chipText:"#bde6ff",inputBg:"rgba(5,12,24,0.6)",primary:"#00f5ff",primaryInk:"#001218",primarySoft:"rgba(0,245,255,0.14)",primaryDeep:"#00d4e6",accent:"#ff2a6d",accentSoft:"rgba(255,42,109,0.14)",amber:"#ffb800",amberSoft:"rgba(255,184,0,0.14)",metroBg:"#000814",shadow:"0 2px 4px rgba(0,0,0,0.5), 0 18px 50px -20px rgba(0,245,255,0.25)",shadowLg:"0 4px 12px rgba(0,0,0,0.6), 0 30px 90px -25px rgba(0,245,255,0.45)"}},c="'Inter', system-ui, -apple-system, sans-serif",m="'Hind Siliguri', 'Inter', system-ui, sans-serif",l=(a,o,d)=>a==="bn"?o:d,Ui="০১২৩৪৫৬৭৮৯",Y=(a,o)=>o!=="bn"?String(a):String(a).replace(/[0-9]/g,d=>Ui[+d]),ce=(a,o)=>"৳"+Y(String(a).replace(/^৳/,""),o),ye=a=>({background:a.panelMuted,border:`1px solid ${a.line}`,borderRadius:999,padding:"6px 12px",fontFamily:c,fontWeight:500,fontSize:12,color:a.text,display:"inline-flex",alignItems:"center",gap:6,cursor:"pointer"});function Hi(){if(document.getElementById("kj-global-styles"))return;const a=document.createElement("style");a.id="kj-global-styles",a.textContent=`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Hind+Siliguri:wght@400;500;600;700&display=swap');

    html, body { margin: 0; padding: 0; background: #05060b; font-family: 'Inter', system-ui, sans-serif; }
    * { box-sizing: border-box; }
    #root { min-height: 100vh; }

    .kj-screen, .kj-screen * { scrollbar-width: none; }
    .kj-screen *::-webkit-scrollbar { display: none; }

    /* Clip horizontal overflow — scroller is the true scroll boundary */
    .kj-screen { overflow-x: clip; }
    .kj-screen h1, .kj-screen h2, .kj-screen p { word-break: break-word; overflow-wrap: break-word; }

    /* Prevent grid/flex children from overflowing their column allocation */
    .kj-screen [style*="display: grid"] > *,
    .kj-screen [style*="display:grid"] > * { min-width: 0; }
    .kj-screen [style*="display: flex"] > *,
    .kj-screen [style*="display:flex"] > * { min-width: 0; }

    /* Scrollable chip rows */
    .kj-chips-scroll { overflow-x: auto; scrollbar-width: none; flex-wrap: nowrap !important; }
    .kj-chips-scroll::-webkit-scrollbar { display: none; }

    @media (prefers-reduced-motion: no-preference) {
      .kj-fwd  { animation: kjIn   .26s cubic-bezier(.2,.7,.25,1) both; }
      .kj-back { animation: kjBack .26s cubic-bezier(.2,.7,.25,1) both; }
    }
    @keyframes kjIn   { from { transform: translateY(10px); } to { transform: none; } }
    @keyframes kjBack { from { transform: translateY(-8px); } to { transform: none; } }

    @keyframes kjpulse { 0%,100% { opacity: 1; } 50% { opacity: .35; } }
    .kj-anim-pulse { animation: kjpulse 2.4s ease-in-out infinite; }
    .kj-anim-glow  { animation: kjpulse 2.4s ease-in-out infinite; }

    @keyframes kjShimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

    @keyframes kjAiFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
    @keyframes kjAiRing  { 0% { transform: scale(0.8); opacity: 0.6; } 100% { transform: scale(1.9); opacity: 0; } }
    @keyframes kjAiBlink { 0%,90%,100% { transform: scaleY(1); } 95% { transform: scaleY(0.12); } }
    @keyframes kjAiThink { 0%,80%,100% { transform: scale(0.5); opacity: 0.35; } 40% { transform: scale(1); opacity: 1; } }
    .kj-ai-eye  { transform-box: fill-box; transform-origin: center; animation: kjAiBlink 3.4s ease-in-out infinite; }
    .kj-ai-eye2 { transform-box: fill-box; transform-origin: center; animation: kjAiBlink 3.4s ease-in-out infinite; animation-delay: .12s; }

    @keyframes kjLoadBar { 0% { transform: translateX(-120%); } 100% { transform: translateX(330%); } }
    @keyframes kjFloatY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
    @keyframes kjWheel { from { transform: rotate(0); } to { transform: rotate(360deg); } }
    @keyframes kjBobY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
    @keyframes kjPopIn { 0% { transform: scale(.4); opacity: 0; } 60% { transform: scale(1.12); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
    @keyframes kjSpark { 0%,100% { transform: scale(.6); opacity: .2; } 50% { transform: scale(1.1); opacity: 1; } }
    @keyframes kjRollIn { 0% { transform: translateX(260px); } 70% { transform: translateX(-12px); } 100% { transform: translateX(0); } }
    @keyframes kjDriveBy { 0% { transform: translateX(380px); } 100% { transform: translateX(-200px); } }
    @keyframes kjStoryIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
    .kj-story-scene { animation: kjStoryIn .5s cubic-bezier(.2,.7,.25,1) both; }
    @keyframes kjMapPulse { 0% { box-shadow: 0 0 0 0 rgba(37,99,235,.5); } 70% { box-shadow: 0 0 0 14px rgba(37,99,235,0); } 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0); } }

    /* 3D vehicle animations */
    @keyframes kj-drive   { 0% { transform: translateX(-34%); } 100% { transform: translateX(134%); } }
    @keyframes kj-fly     { 0% { transform: translate(-24%, 22%) rotate(-7deg); } 50% { transform: translate(38%, 4%) rotate(-3deg); } 100% { transform: translate(132%, 22%) rotate(-7deg); } }
    @keyframes kj-train   { 0% { transform: translateX(-42%); } 100% { transform: translateX(142%); } }
    @keyframes kj-sail    { 0% { transform: translateX(-28%); } 100% { transform: translateX(128%); } }
    @keyframes kj-bob     { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-7px) rotate(0.4deg); } }
    @keyframes kj-bob-sm  { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
    @keyframes kj-bank    { 0%, 100% { transform: rotate(-2.5deg) translateY(0); } 50% { transform: rotate(1.5deg) translateY(-5px); } }
    @keyframes kj-rock    { 0%, 100% { transform: rotate(-1.6deg) translateY(0); } 50% { transform: rotate(1.6deg) translateY(-4px); } }
    @keyframes kj-suspend { 0%, 100% { transform: translateY(0); } 20% { transform: translateY(-1.4px); } 55% { transform: translateY(0.9px); } 80% { transform: translateY(-0.5px); } }
    @keyframes kj-spin    { from { transform: rotate(0); } to { transform: rotate(360deg); } }
    @keyframes kj-pulse   { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.08); } }
    @keyframes kj-dash    { to { stroke-dashoffset: -40; } }
    @keyframes kj-blink   { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
    @keyframes kj-smoke   { 0% { transform: translateY(0) scale(0.7); opacity: 0; } 25% { opacity: 0.55; } 100% { transform: translateY(-34px) scale(2.2); opacity: 0; } }
    @keyframes kj-streak  { 0% { transform: translateX(40%) scaleX(0.4); opacity: 0; } 30% { opacity: 0.9; } 100% { transform: translateX(-160%) scaleX(1); opacity: 0; } }
    @keyframes kj-shine   { 0% { transform: translateX(-120%) skewX(-18deg); } 60%,100% { transform: translateX(320%) skewX(-18deg); } }
    @keyframes kj-wake    { 0% { transform: scaleX(0.4); opacity: 0.7; } 100% { transform: scaleX(1.6); opacity: 0; } }
    @keyframes kj-spark   { 0%, 92%, 100% { opacity: 0; } 95% { opacity: 1; } }
    @keyframes kj-prop    { from { transform: scaleX(1); opacity: 0.5; } 50% { transform: scaleX(0.15); opacity: 0.9; } to { transform: scaleX(1); opacity: 0.5; } }
    .kj-anim-drive   { animation: kj-drive 9s linear infinite; transform-origin: center; }
    .kj-anim-fly     { animation: kj-fly 11s ease-in-out infinite; }
    .kj-anim-train   { animation: kj-train 7s linear infinite; }
    .kj-anim-sail    { animation: kj-sail 16s linear infinite; }
    .kj-anim-bob     { animation: kj-bob 2.4s ease-in-out infinite; }
    .kj-anim-bob-sm  { animation: kj-bob-sm 1.6s ease-in-out infinite; }
    .kj-anim-bank    { animation: kj-bank 4.5s ease-in-out infinite; }
    .kj-anim-rock    { animation: kj-rock 3.6s ease-in-out infinite; }
    .kj-anim-suspend { animation: kj-suspend 0.9s ease-in-out infinite; }
    .kj-anim-spin    { animation: kj-spin 0.55s linear infinite; transform-origin: 50% 50%; transform-box: fill-box; }
    .kj-anim-spin-slow { animation: kj-spin 6s linear infinite; transform-origin: 50% 50%; transform-box: fill-box; }
    .kj-anim-dash    { stroke-dasharray: 12 8; animation: kj-dash 1.6s linear infinite; }
    .kj-anim-blink   { animation: kj-blink 1.3s ease-in-out infinite; }
    .kj-anim-prop    { animation: kj-prop 0.12s linear infinite; transform-origin: 50% 50%; transform-box: fill-box; }

    /* Futuristic skin */
    :root {
      --kj-neon-cyan: #00f5ff;
      --kj-neon-magenta: #ff2a6d;
      --kj-neon-violet: #a259ff;
      --kj-neon-amber: #ffb800;
    }
    .kj-future-bg {
      position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0;
    }
    .kj-future-bg::before {
      content: ''; position: absolute; inset: -2px;
      background-image:
        linear-gradient(rgba(0,245,255,0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,245,255,0.08) 1px, transparent 1px);
      background-size: 40px 40px;
      mask-image: radial-gradient(ellipse at center top, #000 25%, transparent 75%);
      -webkit-mask-image: radial-gradient(ellipse at center top, #000 25%, transparent 75%);
      animation: kj-grid-shift 20s linear infinite;
    }
    .kj-future-bg::after {
      content: ''; position: absolute; inset: 0;
      background:
        radial-gradient(800px circle at 20% 0%, rgba(0,245,255,0.10), transparent 60%),
        radial-gradient(600px circle at 90% 30%, rgba(255,42,109,0.08), transparent 60%),
        radial-gradient(700px circle at 50% 100%, rgba(162,89,255,0.10), transparent 60%);
      animation: kj-aurora 18s ease-in-out infinite alternate;
    }
    @keyframes kj-grid-shift { from { transform: translate(0,0); } to { transform: translate(40px,40px); } }
    @keyframes kj-aurora { 0%,100% { opacity: 0.9; } 50% { opacity: 1; } }

    /* Leaflet map */
    .kj-map { background: #aadaff; }
    .kj-map .leaflet-control-attribution { font-family: 'Inter', sans-serif; font-size: 9px; }
    .kj-map .leaflet-bar { display: none; }
    .kj-stop-dot { background: #fff; border: 2px solid #e1126b; border-radius: 3px; box-shadow: 0 1px 4px rgba(0,0,0,0.3); }
    .kj-pill-marker { display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; font-family: 'Inter',sans-serif; font-weight: 700; font-size: 11px; color: #fff; padding: 4px 10px; border-radius: 999px; box-shadow: 0 4px 12px rgba(0,0,0,0.35); transform: translate(-50%,-130%); }
    .kj-marker-wrap { background: transparent !important; border: 0 !important; }

    .kj-photo-del { opacity: 0; transition: opacity .15s ease; pointer-events: none; }
    .kj-photo:hover .kj-photo-del, .kj-photo:focus-within .kj-photo-del { opacity: 1; pointer-events: auto; }
    @media (hover: none) { .kj-photo-del { opacity: 1; pointer-events: auto; } }

    [style*="border-radius: 16px"], [style*="border-radius: 18px"],
    [style*="border-radius: 20px"], [style*="border-radius: 22px"],
    [style*="border-radius: 24px"] {
      backdrop-filter: blur(16px) saturate(135%);
      -webkit-backdrop-filter: blur(16px) saturate(135%);
    }

    /* kj-screen clips horizontal overflow — scroller is the true scroll boundary */
    .kj-screen { overflow-x: clip; }
    .kj-screen h1, .kj-screen h2, .kj-screen p {
      word-break: break-word;
      overflow-wrap: break-word;
    }
    /* Fix grid/flex children so right-side content never overflows or hides */
    .kj-screen [style*="display: grid"] > *,
    .kj-screen [style*="display:grid"] > * {
      min-width: 0;
    }
    /* Scrollable chip rows — hide scrollbar */
    .kj-chips-scroll { overflow-x: auto; scrollbar-width: none; flex-wrap: nowrap !important; }
    .kj-chips-scroll::-webkit-scrollbar { display: none; }
  `,document.head.appendChild(a)}function Ki(){return e.jsx("div",{id:"kj-splash-react",style:{position:"fixed",inset:0,zIndex:99999,background:"radial-gradient(circle at 50% 38%, #0b1733 0%, #05060b 70%)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsxs("div",{style:{position:"relative",width:132,height:132,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:26},children:[e.jsxs("svg",{viewBox:"0 0 132 132",width:"132",height:"132",fill:"none","aria-hidden":"true",style:{position:"absolute",inset:0,animation:"kjWheel 2.6s linear infinite"},children:[e.jsx("circle",{cx:"66",cy:"66",r:"60",stroke:"rgba(255,255,255,0.08)",strokeWidth:"3"}),e.jsx("circle",{cx:"66",cy:"66",r:"60",stroke:"#22f5ff",strokeWidth:"3",strokeLinecap:"round",strokeDasharray:"60 320"}),e.jsx("circle",{cx:"126",cy:"66",r:"4",fill:"#ff2a6d"})]}),e.jsx("div",{style:{width:68,height:68,borderRadius:18,background:"#05060b",boxShadow:"0 14px 40px -10px rgba(0,200,230,0.65), inset 0 0 0 1px rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",animation:"kjFloatY 2.2s ease-in-out infinite"},children:e.jsx("img",{src:"/logo.png",alt:"KoyJabo",style:{width:"100%",height:"100%",objectFit:"contain",display:"block"}})})]}),e.jsx("div",{style:{fontFamily:"'Hind Siliguri', sans-serif",fontWeight:700,fontSize:30,color:"#eafcff",letterSpacing:-.5},children:"কই যাবো"}),e.jsx("div",{style:{fontFamily:"'Inter', sans-serif",fontWeight:700,fontSize:11,letterSpacing:4,color:"#4ad6ee",marginTop:4},children:"KOYJABO"}),e.jsx("div",{style:{width:168,height:4,borderRadius:999,background:"rgba(255,255,255,0.1)",marginTop:22,overflow:"hidden"},children:e.jsx("div",{style:{display:"block",height:"100%",width:"42%",borderRadius:999,background:"linear-gradient(90deg, #22f5ff, #ff2a6d)",animation:"kjLoadBar 1.2s ease-in-out infinite"}})}),e.jsx("div",{style:{fontFamily:"'Inter', sans-serif",fontSize:11,color:"#6b7a91",marginTop:14},children:"Loading your routes…"})]})})}function Oi({tk:a,lang:o,open:d,onAllow:t,onDeny:n,onNav:i}){if(!d)return null;const s=o==="bn"?m:c;return e.jsx("div",{style:{position:"fixed",inset:0,zIndex:1e4,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.65)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",padding:20},children:e.jsxs("div",{style:{background:a.panel,border:`1px solid ${a.line}`,borderRadius:20,padding:"28px 24px 24px",maxWidth:400,width:"100%",boxShadow:a.shadowLg,boxSizing:"border-box"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20},children:[e.jsx("div",{style:{width:52,height:52,borderRadius:14,background:`linear-gradient(135deg,${a.primary},${a.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0},children:"📍"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:c,fontWeight:700,fontSize:17,color:a.text},children:l(o,"আপনার অবস্থান ব্যবহার করি?","Use your location?")}),e.jsx("div",{style:{fontFamily:c,fontSize:12,color:a.textFaint,marginTop:2},children:"KoyJabo"})]})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10,marginBottom:20},children:[{icon:"🚌",en:"Find buses near you automatically",bn:"কাছের বাস স্বয়ংক্রিয়ভাবে খুঁজুন"},{icon:"🤖",en:'AI answers "how to go" from your location',bn:"AI আপনার অবস্থান থেকে রুট দেয়"},{icon:"🔒",en:"Location never shared or stored on servers",bn:"অবস্থান কখনো সার্ভারে সংরক্ষণ হয় না"}].map((p,h)=>e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"flex-start"},children:[e.jsx("span",{style:{fontSize:15,flexShrink:0},children:p.icon}),e.jsx("span",{style:{fontFamily:s,fontSize:13,color:a.textDim,lineHeight:1.5},children:l(o,p.bn,p.en)})]},h))}),e.jsxs("div",{style:{background:a.panelMuted,borderRadius:10,padding:"10px 12px",fontFamily:c,fontSize:11,color:a.textFaint,lineHeight:1.6,marginBottom:20},children:[l(o,"অ্যাপটি ব্যবহার করে আপনি আমাদের ","By continuing you agree to our "),e.jsx("span",{onClick:()=>i("terms"),style:{color:a.primary,cursor:"pointer",textDecoration:"underline"},children:l(o,"সেবার শর্তাবলী","Terms of Service")}),l(o," ও "," and "),e.jsx("span",{onClick:()=>i("privacy"),style:{color:a.primary,cursor:"pointer",textDecoration:"underline"},children:l(o,"গোপনীয়তা নীতি","Privacy Policy")}),l(o,"-তে সম্মত হচ্ছেন।",".")]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[e.jsx("button",{onClick:t,style:{background:a.primary,color:a.primaryInk,border:"none",borderRadius:12,padding:"14px",width:"100%",fontFamily:s,fontWeight:700,fontSize:15,cursor:"pointer"},children:l(o,"📍 অবস্থান অনুমতি দিন","📍 Allow Location")}),e.jsx("button",{onClick:n,style:{background:"transparent",color:a.textFaint,border:`1px solid ${a.line}`,borderRadius:12,padding:"12px",width:"100%",fontFamily:s,fontSize:13,cursor:"pointer"},children:l(o,"না, ধন্যবাদ","No thanks")})]}),e.jsx("div",{style:{textAlign:"center",marginTop:12,fontFamily:c,fontSize:10,color:a.textFaint},children:l(o,"সেটিংস থেকে যেকোনো সময় পরিবর্তন করা যাবে","Change anytime from Settings")})]})})}const Gi={leaderboard:{w:728,h:90,format:"horizontal",slot:"7294303750"},"mid-rect":{w:300,h:250,format:"rectangle",slot:"7294303750"},"mob-banner":{w:320,h:100,format:"horizontal",slot:"7294303750"},anchor:{w:320,h:50,format:"horizontal",slot:"7294303750"}};function Ji({format:a,slot:o}){const d=b.useRef(null),t=b.useRef(!1);return b.useEffect(()=>{t.current=!1;const n=()=>{const i=d.current;if(!i||t.current)return;const r=i.getAttribute("data-adsbygoogle-status");if(!(r==="done"||r==="filled")){if(typeof window.adsbygoogle>"u"){setTimeout(n,2e3);return}t.current=!0;try{(window.adsbygoogle=window.adsbygoogle||[]).push({})}catch{t.current=!1}}};n()},[o]),e.jsx("ins",{ref:d,className:"adsbygoogle",style:{display:"block",width:"100%",minWidth:0},"data-ad-client":"ca-pub-8425219156685369","data-ad-slot":o,"data-ad-format":a,"data-full-width-responsive":"true"})}function ee({tk:a,lang:o,kind:d="leaderboard",sticky:t}){const{w:n,h:i,format:r,slot:s}=Gi[d];return e.jsx("div",{style:{width:"100%",maxWidth:n,background:a.panelMuted,border:`1px solid ${a.line}`,borderRadius:12,overflow:"hidden",boxSizing:"border-box",position:t?"sticky":"relative",bottom:t?0:void 0,zIndex:t?10:void 0,flexShrink:0,margin:"0 auto"},children:e.jsx("div",{style:{minHeight:i,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(Ji,{format:r,slot:s})})})}const de=(a,o,d)=>e.jsx("svg",{width:o,height:o,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",...d,children:a}),te={search:({s:a=18})=>de(e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"11",cy:"11",r:"7"}),e.jsx("line",{x1:"16.5",y1:"16.5",x2:"22",y2:"22"})]}),a),pin:({s:a=18})=>de(e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M12 2C8.686 2 6 4.686 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.314-2.686-6-6-6z"}),e.jsx("circle",{cx:"12",cy:"8",r:"2.5"})]}),a),flag:({s:a=18})=>de(e.jsxs(e.Fragment,{children:[e.jsx("line",{x1:"5",y1:"2",x2:"5",y2:"22"}),e.jsx("path",{d:"M5 4h12l-3 5 3 5H5"})]}),a),swap:({s:a=18})=>de(e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M7 3L3 7l4 4"}),e.jsx("path",{d:"M3 7h13"}),e.jsx("path",{d:"M17 21l4-4-4-4"}),e.jsx("path",{d:"M21 17H8"})]}),a),bus:({s:a=18})=>de(e.jsxs(e.Fragment,{children:[e.jsx("rect",{x:"3",y:"5",width:"18",height:"13",rx:"2"}),e.jsx("line",{x1:"3",y1:"10",x2:"21",y2:"10"}),e.jsx("line",{x1:"8",y1:"5",x2:"8",y2:"18"}),e.jsx("line",{x1:"16",y1:"5",x2:"16",y2:"18"}),e.jsx("circle",{cx:"7.5",cy:"18.5",r:"1.5"}),e.jsx("circle",{cx:"16.5",cy:"18.5",r:"1.5"})]}),a),train:({s:a=18})=>de(e.jsxs(e.Fragment,{children:[e.jsx("rect",{x:"4",y:"4",width:"16",height:"13",rx:"2"}),e.jsx("line",{x1:"4",y1:"9",x2:"20",y2:"9"}),e.jsx("line",{x1:"4",y1:"14",x2:"20",y2:"14"}),e.jsx("line",{x1:"9",y1:"4",x2:"9",y2:"17"}),e.jsx("circle",{cx:"8",cy:"19.5",r:"1.5"}),e.jsx("circle",{cx:"16",cy:"19.5",r:"1.5"}),e.jsx("line",{x1:"8",y1:"17",x2:"6.5",y2:"21"}),e.jsx("line",{x1:"16",y1:"17",x2:"17.5",y2:"21"})]}),a),metro:({s:a=18})=>de(e.jsxs(e.Fragment,{children:[e.jsx("rect",{x:"3",y:"6",width:"18",height:"11",rx:"3"}),e.jsx("line",{x1:"3",y1:"11",x2:"21",y2:"11"}),e.jsx("circle",{cx:"7.5",cy:"17.5",r:"1.5"}),e.jsx("circle",{cx:"16.5",cy:"17.5",r:"1.5"}),e.jsx("line",{x1:"8",y1:"6",x2:"8",y2:"3"}),e.jsx("line",{x1:"16",y1:"6",x2:"16",y2:"3"}),e.jsx("line",{x1:"8",y1:"3",x2:"16",y2:"3"})]}),a),globe:({s:a=18})=>de(e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"12",cy:"12",r:"9"}),e.jsx("path",{d:"M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9"}),e.jsx("path",{d:"M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9"}),e.jsx("line",{x1:"3",y1:"9",x2:"21",y2:"9"}),e.jsx("line",{x1:"3",y1:"15",x2:"21",y2:"15"})]}),a),spark:({s:a=18})=>de(e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.3L12 17l-6.2 4-0.1-.1 2.4-7.2L2 9.2h7.6L12 2z"}),e.jsx("circle",{cx:"12",cy:"12",r:"2",fill:"currentColor",stroke:"none"})]}),a),bolt:({s:a=18})=>de(e.jsx("path",{d:"M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2z"}),a),sun:({s:a=18})=>de(e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"12",cy:"12",r:"4"}),e.jsx("line",{x1:"12",y1:"2",x2:"12",y2:"5"}),e.jsx("line",{x1:"12",y1:"19",x2:"12",y2:"22"}),e.jsx("line",{x1:"2",y1:"12",x2:"5",y2:"12"}),e.jsx("line",{x1:"19",y1:"12",x2:"22",y2:"12"}),e.jsx("line",{x1:"4.22",y1:"4.22",x2:"6.34",y2:"6.34"}),e.jsx("line",{x1:"17.66",y1:"17.66",x2:"19.78",y2:"19.78"}),e.jsx("line",{x1:"4.22",y1:"19.78",x2:"6.34",y2:"17.66"}),e.jsx("line",{x1:"17.66",y1:"6.34",x2:"19.78",y2:"4.22"})]}),a),moon:({s:a=18})=>de(e.jsx("path",{d:"M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"}),a),arrowR:({s:a=18})=>de(e.jsxs(e.Fragment,{children:[e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),e.jsx("polyline",{points:"12 5 19 12 12 19"})]}),a),arrowL:({s:a=18})=>de(e.jsxs(e.Fragment,{children:[e.jsx("line",{x1:"19",y1:"12",x2:"5",y2:"12"}),e.jsx("polyline",{points:"12 5 5 12 12 19"})]}),a),bell:({s:a=18})=>de(e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"}),e.jsx("path",{d:"M13.73 21a2 2 0 01-3.46 0"})]}),a),menu:({s:a=18})=>de(e.jsxs(e.Fragment,{children:[e.jsx("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),e.jsx("line",{x1:"3",y1:"12",x2:"21",y2:"12"}),e.jsx("line",{x1:"3",y1:"18",x2:"21",y2:"18"})]}),a),home:({s:a=18})=>de(e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"}),e.jsx("polyline",{points:"9 22 9 12 15 12 15 22"})]}),a),star:({s:a=18})=>de(e.jsx("polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",fill:"currentColor",stroke:"none"}),a),user:({s:a=18})=>de(e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"}),e.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),a),sos:({s:a=18})=>de(e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"12",cy:"12",r:"9"}),e.jsx("text",{x:"12",y:"16",textAnchor:"middle",fontSize:"8",fontWeight:"700",fontFamily:"system-ui",fill:"currentColor",stroke:"none",children:"SOS"})]}),a),clock:({s:a=18})=>de(e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"12",cy:"12",r:"9"}),e.jsx("polyline",{points:"12 7 12 12 15 15"})]}),a),taka:({s:a=18})=>e.jsx("svg",{width:a,height:a,viewBox:"0 0 24 24",fill:"none",children:e.jsx("text",{x:"12",y:"17",textAnchor:"middle",fontSize:"16",fontWeight:"700",fontFamily:"'Hind Siliguri', system-ui, sans-serif",fill:"currentColor",children:"৳"})}),wifi:({s:a=18})=>de(e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M1.42 9A16 16 0 0122.58 9"}),e.jsx("path",{d:"M5 12.55a11 11 0 0114.08 0"}),e.jsx("path",{d:"M8.53 16.11a6 6 0 016.95 0"}),e.jsx("circle",{cx:"12",cy:"20",r:"1",fill:"currentColor",stroke:"none"})]}),a),download:({s:a=18})=>de(e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"}),e.jsx("polyline",{points:"7 10 12 15 17 10"}),e.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),a)};function Me({size:a=200,palette:o=["#10b981","#006a4e","#04130d","#f59e0b"]}){const[d,t,n,i]=o,r=220,s=150;return e.jsxs("svg",{width:a,height:a*(s/r),viewBox:`0 0 ${r} ${s}`,overflow:"visible",role:"img","aria-label":"3D bus",children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:"bus-body",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"0%",stopColor:"#ffffff",stopOpacity:"0.18"}),e.jsx("stop",{offset:"30%",stopColor:d}),e.jsx("stop",{offset:"80%",stopColor:t}),e.jsx("stop",{offset:"100%",stopColor:n})]}),e.jsxs("linearGradient",{id:"bus-front",x1:"0",y1:"0",x2:"1",y2:"0",children:[e.jsx("stop",{offset:"0%",stopColor:n}),e.jsx("stop",{offset:"100%",stopColor:d})]}),e.jsxs("linearGradient",{id:"bus-glass",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"0%",stopColor:"#dff6ff",stopOpacity:"0.82"}),e.jsx("stop",{offset:"55%",stopColor:"#7fc4e6",stopOpacity:"0.65"}),e.jsx("stop",{offset:"100%",stopColor:"#27506e",stopOpacity:"0.9"})]}),e.jsxs("radialGradient",{id:"bus-head",cx:"50%",cy:"50%",r:"50%",children:[e.jsx("stop",{offset:"0%",stopColor:"#ffe066",stopOpacity:"1"}),e.jsx("stop",{offset:"60%",stopColor:"#f59e0b",stopOpacity:"0.8"}),e.jsx("stop",{offset:"100%",stopColor:"#b45309",stopOpacity:"0.3"})]}),e.jsxs("radialGradient",{id:"bus-shadow-rg",cx:"50%",cy:"50%",r:"50%",children:[e.jsx("stop",{offset:"0%",stopColor:"#000000",stopOpacity:"0.28"}),e.jsx("stop",{offset:"100%",stopColor:"#000000",stopOpacity:"0"})]})]}),[0,1,2,3,4].map(p=>e.jsx("rect",{x:30+p*18,y:82+p*4,width:28+p*6,height:2,rx:1,fill:d,opacity:.22,className:"kj-anim-streak",style:{animationDelay:`${p*.18}s`,animationName:"kj-streak",animationDuration:"1.4s",animationTimingFunction:"linear",animationIterationCount:"infinite"}},p)),e.jsx("ellipse",{cx:120,cy:143,rx:72,ry:6,fill:"url(#bus-shadow-rg)"}),e.jsxs("g",{className:"kj-anim-suspend",children:[e.jsx("path",{d:"M62 44 L176 44 L180 52 L58 52 Z",fill:t,opacity:.7}),e.jsx("rect",{x:110,y:38,width:28,height:8,rx:2,fill:t,opacity:.85}),e.jsx("rect",{x:113,y:36,width:22,height:4,rx:1,fill:n}),e.jsx("path",{d:"M58 52 L180 52 L180 128 Q180 134 174 134 L64 134 Q58 134 58 128 Z",fill:"url(#bus-body)"}),e.jsx("path",{d:"M180 52 L196 58 L196 128 Q196 134 190 134 L180 134 L180 52 Z",fill:"url(#bus-front)",opacity:.9}),e.jsx("rect",{x:58,y:84,width:122,height:4,rx:1,fill:"#ffffff",opacity:.22}),e.jsx("rect",{x:58,y:88,width:122,height:6,rx:0,fill:i,opacity:.82}),[0,1,2,3,4].map(p=>e.jsxs("g",{children:[e.jsx("rect",{x:66+p*22,y:57,width:17,height:22,rx:3,fill:"url(#bus-glass)"}),e.jsx("rect",{x:67+p*22,y:58,width:5,height:10,rx:1,fill:"#ffffff",opacity:.28})]},p)),e.jsx("rect",{x:66,y:108,width:64,height:16,rx:2,fill:"#0a0a0a"}),e.jsx("text",{x:98,y:120,textAnchor:"middle",fontSize:7,fontFamily:"'Inter',system-ui,monospace",fontWeight:"700",fill:"#ffd24a",letterSpacing:"0.5",children:"MOTIJHEEL · 6"}),e.jsx("rect",{x:144,y:96,width:8,height:34,rx:1,fill:"url(#bus-glass)",opacity:.75}),e.jsx("rect",{x:153,y:96,width:8,height:34,rx:1,fill:"url(#bus-glass)",opacity:.75}),e.jsx("line",{x1:148,y1:96,x2:148,y2:130,stroke:"#ffffff",strokeWidth:.8,strokeOpacity:.35}),e.jsx("circle",{cx:190,cy:100,r:7,fill:"url(#bus-head)",className:"kj-anim-pulse"}),e.jsx("circle",{cx:190,cy:100,r:4,fill:"#ffe066",opacity:.7}),e.jsx("rect",{x:183,y:62,width:10,height:6,rx:1,fill:t,opacity:.8}),e.jsx("line",{x1:183,y1:65,x2:196,y2:65,stroke:t,strokeWidth:1.5}),e.jsx("ellipse",{cx:86,cy:134,rx:18,ry:7,fill:n}),e.jsx("ellipse",{cx:158,cy:134,rx:18,ry:7,fill:n}),[86,158].map(p=>e.jsxs("g",{children:[e.jsx("circle",{cx:p,cy:134,r:13,fill:"#1a1a1a"}),e.jsx("circle",{cx:p,cy:134,r:9,fill:"#2a2a2a"}),e.jsx("circle",{cx:p,cy:134,r:4,fill:"#3a3a3a"}),e.jsx("g",{className:"kj-anim-spin",style:{transformOrigin:`${p}px 134px`},children:[0,60,120,180,240,300].map(h=>e.jsx("line",{x1:p,y1:134,x2:p+Math.cos(h*Math.PI/180)*8,y2:134+Math.sin(h*Math.PI/180)*8,stroke:"#555",strokeWidth:1.5},h))}),e.jsx("circle",{cx:p,cy:134,r:2.5,fill:"#888"})]},p)),e.jsx("rect",{x:58,y:52,width:30,height:82,rx:4,fill:"#ffffff",opacity:.1,style:{animation:"kj-shine 6s ease-in-out infinite",transformOrigin:"50% 50%"}})]})]})}function dt({size:a=200,palette:o=["#3b82f6","#1e40af","#ef4444"]}){const[d,t,n]=o,i=220,r=150;return e.jsxs("svg",{width:a,height:a*(r/i),viewBox:`0 0 ${i} ${r}`,overflow:"visible",role:"img","aria-label":"3D airplane",children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:"pl-fuse",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"0%",stopColor:"#e8f4ff"}),e.jsx("stop",{offset:"40%",stopColor:d,stopOpacity:"0.85"}),e.jsx("stop",{offset:"100%",stopColor:t})]}),e.jsxs("radialGradient",{id:"pl-shadow-rg",cx:"50%",cy:"50%",r:"50%",children:[e.jsx("stop",{offset:"0%",stopColor:"#000000",stopOpacity:"0.22"}),e.jsx("stop",{offset:"100%",stopColor:"#000000",stopOpacity:"0"})]})]}),e.jsx("line",{x1:10,y1:68,x2:200,y2:68,stroke:"#ffffff",strokeWidth:2,strokeOpacity:.3,className:"kj-anim-dash"}),e.jsx("line",{x1:10,y1:74,x2:180,y2:74,stroke:"#ffffff",strokeWidth:1.2,strokeOpacity:.18,className:"kj-anim-dash",style:{animationDelay:"0.4s"}}),e.jsx("ellipse",{cx:110,cy:140,rx:65,ry:5,fill:"url(#pl-shadow-rg)"}),e.jsxs("g",{className:"kj-anim-bank",style:{transformOrigin:"110px 80px"},children:[e.jsx("path",{d:"M95 82 L30 106 L38 112 L100 90 Z",fill:t,opacity:.65}),e.jsx("path",{d:"M168 76 L196 68 L196 72 L170 82 Z",fill:t,opacity:.8}),e.jsx("path",{d:"M168 84 L196 92 L196 88 L170 82 Z",fill:t,opacity:.55}),e.jsx("path",{d:"M168 62 L178 44 L182 44 L172 62 Z",fill:t,opacity:.75}),e.jsx("rect",{x:170,y:50,width:8,height:4,rx:1,fill:n,opacity:.9}),e.jsx("path",{d:"M42 76 Q55 66 80 68 L168 68 Q180 68 184 76 Q180 86 168 86 L80 86 Q55 88 42 76 Z",fill:"url(#pl-fuse)"}),e.jsx("path",{d:"M55 72 L168 72 Q176 72 178 76",stroke:d,strokeWidth:3,strokeOpacity:.6,fill:"none"}),e.jsx("path",{d:"M42 76 Q28 76 18 76 Q22 73 42 73 Z",fill:"#e8f4ff",opacity:.9}),Array.from({length:10}).map((s,p)=>e.jsx("circle",{cx:92+p*8,cy:74,r:2.8,fill:"#c8e8ff",opacity:.88},p)),e.jsx("path",{d:"M42 73 Q52 66 62 68 L62 76 Q52 74 42 76 Z",fill:"#1e3a5f",opacity:.85}),e.jsx("path",{d:"M96 78 L32 116 L44 120 L104 84 Z",fill:d,opacity:.88}),e.jsx("path",{d:"M32 116 L28 108 L36 114 Z",fill:t,opacity:.9}),e.jsx("ellipse",{cx:78,cy:90,rx:10,ry:5,fill:t,opacity:.85}),e.jsx("ellipse",{cx:74,cy:90,rx:5,ry:5,fill:"#111"}),e.jsx("g",{className:"kj-anim-prop",style:{transformOrigin:"74px 90px"},children:e.jsx("ellipse",{cx:74,cy:90,rx:4.5,ry:1.2,fill:"#555"})}),e.jsx("circle",{cx:74,cy:90,r:1.8,fill:"#888"}),e.jsx("circle",{cx:32,cy:118,r:2.5,fill:n,className:"kj-anim-blink"}),e.jsx("circle",{cx:196,cy:70,r:2,fill:"#ffffff",className:"kj-anim-blink",style:{animationDelay:"0.65s"}})]})]})}function Tt({size:a=200,palette:o=["#10b981","#006a4e","#fef3c7"]}){const[d,t,n]=o,i=230,r=150;return e.jsxs("svg",{width:a,height:a*(r/i),viewBox:`0 0 ${i} ${r}`,overflow:"visible",role:"img","aria-label":"3D metro train",children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:"tr-body",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"0%",stopColor:"#ffffff",stopOpacity:"0.16"}),e.jsx("stop",{offset:"35%",stopColor:d}),e.jsx("stop",{offset:"100%",stopColor:t})]}),e.jsxs("linearGradient",{id:"tr-glass",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"0%",stopColor:"#dff6ff",stopOpacity:"0.85"}),e.jsx("stop",{offset:"100%",stopColor:"#27506e",stopOpacity:"0.9"})]}),e.jsxs("radialGradient",{id:"tr-head",cx:"50%",cy:"50%",r:"50%",children:[e.jsx("stop",{offset:"0%",stopColor:"#fffde0"}),e.jsx("stop",{offset:"100%",stopColor:"#f59e0b",stopOpacity:"0.4"})]}),e.jsxs("radialGradient",{id:"tr-shadow-rg",cx:"50%",cy:"50%",r:"50%",children:[e.jsx("stop",{offset:"0%",stopColor:"#000000",stopOpacity:"0.25"}),e.jsx("stop",{offset:"100%",stopColor:"#000000",stopOpacity:"0"})]})]}),[0,1,2,3].map(s=>e.jsx("rect",{x:10+s*20,y:80+s*5,width:34+s*4,height:1.8,rx:.9,fill:d,opacity:.2,style:{animationName:"kj-streak",animationDuration:"1.2s",animationTimingFunction:"linear",animationIterationCount:"infinite",animationDelay:`${s*.15}s`}},s)),e.jsx("line",{x1:0,y1:138,x2:230,y2:138,stroke:"#555",strokeWidth:2.5}),e.jsx("line",{x1:0,y1:142,x2:230,y2:142,stroke:"#555",strokeWidth:2.5}),Array.from({length:12}).map((s,p)=>e.jsx("rect",{x:p*20,y:136,width:14,height:8,rx:1,fill:"#4a3728",opacity:.7},p)),e.jsx("ellipse",{cx:115,cy:144,rx:88,ry:5,fill:"url(#tr-shadow-rg)"}),e.jsxs("g",{className:"kj-anim-suspend",children:[e.jsx("line",{x1:80,y1:10,x2:220,y2:10,stroke:"#aaa",strokeWidth:.8,strokeOpacity:.5}),e.jsx("line",{x1:120,y1:36,x2:120,y2:10,stroke:"#bbb",strokeWidth:1}),e.jsx("line",{x1:140,y1:36,x2:130,y2:10,stroke:"#bbb",strokeWidth:1}),e.jsx("circle",{cx:128,cy:12,r:3,fill:"#ffe066",style:{animationName:"kj-spark",animationDuration:"1.8s",animationTimingFunction:"ease-in-out",animationIterationCount:"infinite"}}),e.jsx("rect",{x:10,y:48,width:94,height:84,rx:4,fill:"url(#tr-body)"}),e.jsx("rect",{x:10,y:82,width:94,height:6,fill:d,opacity:.5}),e.jsx("path",{d:"M104 48 L198 48 Q214 48 218 66 L218 120 Q218 132 204 132 L104 132 Z",fill:"url(#tr-body)"}),e.jsx("path",{d:"M104 82 L218 82 L218 88 L104 88 Z",fill:d,opacity:.55}),e.jsx("rect",{x:168,y:52,width:28,height:14,rx:2,fill:"#0a0a0a",opacity:.85}),e.jsx("text",{x:182,y:63,textAnchor:"middle",fontSize:7.5,fontFamily:"'Inter',system-ui,monospace",fontWeight:"800",fill:"#ffb800",children:"M6"}),[0,1,2,3].map(s=>e.jsx("rect",{x:16+s*22,y:54,width:16,height:22,rx:3,fill:"url(#tr-glass)"},s)),[0,1,2,3].map(s=>e.jsx("rect",{x:108+s*22,y:54,width:16,height:22,rx:3,fill:"url(#tr-glass)"},s)),e.jsx("path",{d:"M200 54 Q212 56 214 70 L214 76 L200 76 Z",fill:"url(#tr-glass)",opacity:.88}),e.jsx("circle",{cx:214,cy:92,r:5,fill:"url(#tr-head)",className:"kj-anim-pulse"}),e.jsx("circle",{cx:214,cy:104,r:5,fill:"url(#tr-head)",className:"kj-anim-pulse",style:{animationDelay:"0.3s"}}),[30,74,126,178].map(s=>e.jsxs("g",{children:[e.jsx("rect",{x:s-14,y:128,width:28,height:8,rx:2,fill:"#2a2a2a"}),e.jsx("circle",{cx:s-8,cy:136,r:6,fill:"#1a1a1a"}),e.jsxs("g",{className:"kj-anim-spin",style:{transformOrigin:`${s-8}px 136px`},children:[e.jsx("line",{x1:s-8,y1:130,x2:s-8,y2:142,stroke:"#444",strokeWidth:1.5}),e.jsx("line",{x1:s-14,y1:136,x2:s-2,y2:136,stroke:"#444",strokeWidth:1.5})]}),e.jsx("circle",{cx:s-8,cy:136,r:2,fill:"#666"}),e.jsx("circle",{cx:s+8,cy:136,r:6,fill:"#1a1a1a"}),e.jsxs("g",{className:"kj-anim-spin",style:{transformOrigin:`${s+8}px 136px`,animationDelay:"0.1s"},children:[e.jsx("line",{x1:s+8,y1:130,x2:s+8,y2:142,stroke:"#444",strokeWidth:1.5}),e.jsx("line",{x1:s+2,y1:136,x2:s+14,y2:136,stroke:"#444",strokeWidth:1.5})]}),e.jsx("circle",{cx:s+8,cy:136,r:2,fill:"#666"})]},s)),e.jsx("rect",{x:104,y:48,width:24,height:84,rx:4,fill:"#ffffff",opacity:.08,style:{animation:"kj-shine 6s ease-in-out infinite",animationDelay:"1s"}})]})]})}function ea({size:a=200,palette:o=["#0ea5e9","#075985","#f5d76e"]}){const[d,t,n]=o,i=230,r=150;return e.jsxs("svg",{width:a,height:a*(r/i),viewBox:`0 0 ${i} ${r}`,overflow:"visible",role:"img","aria-label":"3D river launch",children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:"lc-water",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"0%",stopColor:"#0369a1"}),e.jsx("stop",{offset:"100%",stopColor:"#1e3a5f"})]}),e.jsxs("linearGradient",{id:"lc-glass",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"0%",stopColor:"#fef9c3",stopOpacity:"0.9"}),e.jsx("stop",{offset:"100%",stopColor:"#f59e0b",stopOpacity:"0.5"})]}),e.jsxs("radialGradient",{id:"lc-shadow-rg",cx:"50%",cy:"50%",r:"50%",children:[e.jsx("stop",{offset:"0%",stopColor:"#000000",stopOpacity:"0.2"}),e.jsx("stop",{offset:"100%",stopColor:"#000000",stopOpacity:"0"})]})]}),e.jsx("path",{d:"M0 110 Q30 104 60 110 Q90 116 120 110 Q150 104 180 110 Q210 116 230 110 L230 150 L0 150 Z",fill:"url(#lc-water)",opacity:.88}),e.jsx("line",{x1:20,y1:122,x2:130,y2:122,stroke:"#7dd3fc",strokeWidth:1.5,strokeOpacity:.45,className:"kj-anim-dash"}),e.jsx("line",{x1:10,y1:128,x2:110,y2:128,stroke:"#7dd3fc",strokeWidth:1,strokeOpacity:.28,className:"kj-anim-dash",style:{animationDelay:"0.5s"}}),e.jsx("ellipse",{cx:55,cy:118,rx:40,ry:6,fill:"none",stroke:"#93c5fd",strokeWidth:1.5,strokeOpacity:.35,style:{animation:"kj-wake 2.4s ease-out infinite",transformOrigin:"55px 118px"}}),e.jsx("ellipse",{cx:120,cy:114,rx:75,ry:5,fill:"url(#lc-shadow-rg)"}),e.jsxs("g",{className:"kj-anim-rock",style:{transformOrigin:"120px 100px"},children:[[0,1,2].map(s=>e.jsx("circle",{cx:140+s*4,cy:52-s*6,r:5+s*2,fill:"#c0c0c0",opacity:.55,style:{animationName:"kj-smoke",animationDuration:"2.2s",animationTimingFunction:"ease-out",animationIterationCount:"infinite",animationDelay:`${s*.55}s`}},s)),e.jsx("path",{d:"M30 104 Q38 98 56 96 L190 96 Q204 96 208 104 L210 112 Q160 116 70 116 Q40 116 28 112 Z",fill:t}),e.jsx("rect",{x:50,y:78,width:148,height:20,rx:3,fill:d,opacity:.92}),e.jsx("rect",{x:66,y:56,width:108,height:24,rx:3,fill:"#f0f9ff",opacity:.9}),e.jsx("rect",{x:110,y:42,width:52,height:16,rx:3,fill:"#fef9c3",opacity:.88}),[0,1,2].map(s=>e.jsx("rect",{x:114+s*16,y:45,width:10,height:8,rx:2,fill:"url(#lc-glass)"},s)),e.jsx("rect",{x:132,y:28,width:12,height:18,rx:2,fill:t}),e.jsx("rect",{x:130,y:26,width:16,height:4,rx:1,fill:"#1a1a1a"}),Array.from({length:9}).map((s,p)=>e.jsx("rect",{x:54+p*16,y:82,width:10,height:10,rx:2,fill:"url(#lc-glass)",opacity:.85},p)),Array.from({length:6}).map((s,p)=>e.jsx("rect",{x:70+p*17,y:60,width:11,height:14,rx:2,fill:"url(#lc-glass)",opacity:.85},p)),e.jsx("rect",{x:50,y:96,width:148,height:4,rx:0,fill:n,opacity:.75}),e.jsx("line",{x1:56,y1:60,x2:56,y2:42,stroke:"#888",strokeWidth:1}),e.jsx("path",{d:"M56 42 L68 46 L56 50 Z",fill:n,className:"kj-anim-blink"}),Array.from({length:8}).map((s,p)=>e.jsx("circle",{cx:70+p*14,cy:58,r:2,fill:p%2===0?"#ffe066":"#ff6b6b",className:"kj-anim-blink",style:{animationDelay:`${p*.18}s`}},p))]})]})}function Yi({size:a=140,palette:o=["#ffffff","#ef4444","#fbbf24"]}){const[d,t,n]=o,i=160,r=140;return e.jsxs("svg",{width:a,height:a*(r/i),viewBox:`0 0 ${i} ${r}`,overflow:"visible",role:"img","aria-label":"AI chatbot",children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:"cb-body",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"0%",stopColor:d}),e.jsx("stop",{offset:"100%",stopColor:"#d5dde6"})]}),e.jsxs("radialGradient",{id:"cb-eye",cx:"40%",cy:"35%",r:"60%",children:[e.jsx("stop",{offset:"0%",stopColor:"#e0f7ff"}),e.jsx("stop",{offset:"50%",stopColor:n}),e.jsx("stop",{offset:"100%",stopColor:"#92400e"})]}),e.jsxs("radialGradient",{id:"cb-shadow-rg",cx:"50%",cy:"50%",r:"50%",children:[e.jsx("stop",{offset:"0%",stopColor:"#000000",stopOpacity:"0.18"}),e.jsx("stop",{offset:"100%",stopColor:"#000000",stopOpacity:"0"})]})]}),e.jsx("ellipse",{cx:80,cy:132,rx:38,ry:5,fill:"url(#cb-shadow-rg)"}),e.jsxs("g",{className:"kj-anim-bob",children:[e.jsx("line",{x1:80,y1:30,x2:80,y2:14,stroke:"#888",strokeWidth:2}),e.jsx("circle",{cx:80,cy:11,r:4,fill:t,className:"kj-anim-pulse"}),e.jsx("rect",{x:34,y:30,width:92,height:74,rx:24,fill:"url(#cb-body)",stroke:t,strokeWidth:2}),e.jsx("rect",{x:44,y:42,width:72,height:46,rx:14,fill:"#111827"}),e.jsx("circle",{cx:65,cy:62,r:8,fill:"url(#cb-eye)",className:"kj-ai-eye"}),e.jsx("circle",{cx:65,cy:62,r:3,fill:"#1a1a1a"}),e.jsx("circle",{cx:67,cy:60,r:1.5,fill:"#ffffff",opacity:.7}),e.jsx("circle",{cx:95,cy:62,r:8,fill:"url(#cb-eye)",className:"kj-ai-eye2"}),e.jsx("circle",{cx:95,cy:62,r:3,fill:"#1a1a1a"}),e.jsx("circle",{cx:97,cy:60,r:1.5,fill:"#ffffff",opacity:.7}),e.jsx("path",{d:"M66 76 Q80 84 94 76",stroke:n,strokeWidth:2.5,strokeLinecap:"round",fill:"none"}),e.jsx("rect",{x:24,y:52,width:12,height:18,rx:4,fill:t,opacity:.8}),e.jsx("rect",{x:124,y:52,width:12,height:18,rx:4,fill:t,opacity:.8}),e.jsx("g",{className:"kj-anim-pulse",style:{transformOrigin:"118px 38px"},children:e.jsx("text",{x:118,y:42,textAnchor:"middle",fontSize:12,fill:n,children:"✦"})}),[{cx:52,fill:"#22c55e"},{cx:66,fill:"#f59e0b"},{cx:80,fill:t},{cx:94,fill:"#3b82f6"}].map(({cx:s,fill:p},h)=>e.jsx("circle",{cx:s,cy:96,r:3,fill:p,className:"kj-anim-blink",style:{animationDelay:`${h*.22}s`}},h))]})]})}function ma({tk:a,height:o=300}){const d=a.bg==="#040814"||a.primary==="#00f5ff",t=d?"#001a12":"#c8f0e8",n=d?"transparent":"#eef9f4",i=d?"#1d3b30":"#a9c9b6",r=d?"#0a1a12":"#2d4a38";return e.jsxs("div",{style:{position:"relative",width:"100%",height:o,overflow:"hidden",background:`linear-gradient(180deg, ${t} 0%, ${n} 100%)`},children:[e.jsx("div",{style:{position:"absolute",top:18,right:32,width:48,height:48,borderRadius:"50%",background:"radial-gradient(circle, #fffde0 30%, #fbbf24 70%, transparent 100%)",opacity:.85}}),e.jsx("svg",{style:{position:"absolute",bottom:o*.22,left:0,width:"100%"},viewBox:"0 0 800 100",preserveAspectRatio:"none",height:Math.round(o*.35),children:[{x:20,w:40,h:80},{x:70,w:55,h:60},{x:134,w:36,h:90},{x:178,w:48,h:55},{x:580,w:52,h:75},{x:640,w:38,h:95},{x:686,w:60,h:65},{x:754,w:44,h:85}].map(({x:s,w:p,h},u)=>e.jsx("rect",{x:s,y:100-h,width:p,height:h,fill:i,opacity:.88,rx:2},u))}),e.jsxs("svg",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none"},viewBox:"0 0 800 200",preserveAspectRatio:"xMidYMid slice",children:[e.jsx("ellipse",{cx:200,cy:55,rx:70,ry:22,fill:"#ffffff",opacity:d?.06:.55,style:{animation:"kj-drive 28s linear infinite",animationDelay:"0s"}}),e.jsx("ellipse",{cx:560,cy:38,rx:55,ry:16,fill:"#ffffff",opacity:d?.04:.4,style:{animation:"kj-drive 44s linear infinite",animationDelay:"-12s"}})]}),e.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,height:o*.22,background:r,opacity:.9},children:e.jsx("svg",{style:{position:"absolute",top:"40%",left:0,width:"100%"},height:4,viewBox:"0 0 800 4",preserveAspectRatio:"none",children:e.jsx("line",{x1:0,y1:2,x2:800,y2:2,stroke:"#ffffff",strokeWidth:2.5,strokeOpacity:.28,className:"kj-anim-dash"})})}),e.jsx("div",{className:"kj-anim-drive",style:{position:"absolute",bottom:o*.04,left:0,display:"inline-block"},children:e.jsx(Me,{size:160})}),e.jsx("div",{className:"kj-anim-fly",style:{position:"absolute",top:o*.06,left:0,display:"inline-block"},children:e.jsx(dt,{size:120})}),e.jsxs("div",{style:{position:"absolute",top:12,left:16,background:d?"rgba(0,245,255,0.18)":"rgba(0,184,217,0.18)",border:`1px solid ${d?"rgba(0,245,255,0.4)":"rgba(0,184,217,0.4)"}`,borderRadius:999,padding:"4px 12px",display:"flex",alignItems:"center",gap:6,fontFamily:"'Inter', system-ui, sans-serif",fontWeight:700,fontSize:11,color:d?"#00f5ff":"#0070ad",letterSpacing:"0.08em"},className:"kj-anim-blink",children:[e.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:d?"#00f5ff":"#0070ad",display:"inline-block"}}),"LIVE · DHAKA"]})]})}function qi({kind:a,palette:o}){switch(a){case"bus":return e.jsx(Me,{size:80,palette:o});case"train":return e.jsx(Tt,{size:80,palette:o});case"plane":return e.jsx(dt,{size:100,palette:o});case"launch":return e.jsx(ea,{size:80,palette:o});case"chatbot":return e.jsx(Yi,{size:70,palette:o});default:return null}}function Ve({tk:a,size:o=36}){return e.jsx("div",{style:{width:o,height:o,borderRadius:o*.26,background:a.panel,border:`1px solid ${a.line}`,flexShrink:0,display:"inline-flex",alignItems:"center",justifyContent:"center",overflow:"hidden"},children:e.jsx("img",{src:"/logo.png",alt:"KoyJabo",style:{width:"100%",height:"100%",objectFit:"contain",display:"block"}})})}const Vi=[{bn:"লোকাল বাস",en:"Local Bus",route:"bus-hub"},{bn:"মেট্রো",en:"Metro",route:"metro-hub"},{bn:"ট্রেন",en:"Train",route:"train-hub"},{bn:"ফ্লাইট",en:"Flights",route:"flights-hub"},{bn:"লঞ্চ",en:"Launch",route:"launch-hub"},{bn:"ভাড়া",en:"Fare",route:"fare"}],Qi=[{bn:"প্রোফাইল",en:"Profile",route:"profile"},{bn:"সেভড",en:"Favorites",route:"favorites"},{bn:"ইতিহাস",en:"History",route:"history"},{bn:"সেটিংস",en:"Settings",route:"settings"},{bn:"সাইন ইন",en:"Sign In",route:"signin"}],Xi=[{bn:"কেন KoyJabo",en:"Why KoyJabo",route:"why"},{bn:"আমাদের সম্পর্কে",en:"About",route:"about"},{bn:"ব্লগ",en:"Blog",route:"blogs"},{bn:"QA",en:"QA",route:"qa"},{bn:"যোগাযোগ",en:"Contact",route:"contact"}],Zi=[{bn:"গোপনীয়তা",en:"Privacy",route:"privacy"},{bn:"শর্তাবলী",en:"Terms",route:"terms"},{bn:"রিলিজ",en:"Release",route:"release"}],en=[{label:"f",title:"Facebook",href:"https://www.facebook.com/koyjabo/"},{label:"in",title:"LinkedIn",href:"https://www.linkedin.com/company/koy-jabo/"}];function ut({tk:a,lang:o,heading:d,links:t,onNav:n}){return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,fontWeight:700,letterSpacing:.8,textTransform:"uppercase",color:a.textFaint,marginBottom:2},children:l(o,d.bn,d.en)}),t.map(i=>e.jsx("button",{onClick:()=>n(i.route),style:{background:"none",border:"none",padding:0,textAlign:"left",cursor:"pointer",fontFamily:o==="bn"?m:c,fontSize:13,color:a.textDim,lineHeight:1.4},children:l(o,i.bn,i.en)},i.route))]})}function Ka({tk:a,lang:o,isMobile:d,onNav:t}){return e.jsx("footer",{style:{background:a.panel,backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",borderTop:`1px solid ${a.line}`,width:"100%",boxSizing:"border-box"},children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto",padding:d?"32px 16px 24px":"48px 32px 32px"},children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:d?"1fr 1fr":"2fr 1fr 1fr 1fr 1fr",gap:d?"32px 20px":40,marginBottom:40},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,gridColumn:d?"1 / -1":void 0},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,cursor:"pointer"},onClick:()=>t("home"),role:"button",tabIndex:0,onKeyDown:n=>n.key==="Enter"&&t("home"),children:[e.jsx(Ve,{tk:a,size:36}),e.jsx("span",{style:{fontFamily:m,fontWeight:800,fontSize:20,color:a.text},children:"কই যাবো"})]}),e.jsx("p",{style:{fontFamily:o==="bn"?m:c,fontSize:13,color:a.textDim,margin:0,lineHeight:1.6,maxWidth:240},children:l(o,"ঢাকার যাত্রীদের জন্য স্মার্ট পরিবহন গাইড","Smart transit guide for Dhaka commuters")}),e.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:en.map(n=>e.jsx("a",{title:n.title,href:n.href,target:"_blank",rel:"noopener noreferrer",style:{width:34,height:34,borderRadius:8,background:a.panelMuted,border:`1px solid ${a.line}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontFamily:c,fontWeight:700,fontSize:12,color:a.textDim,textDecoration:"none"},children:n.label},n.title))})]}),e.jsx(ut,{tk:a,lang:o,heading:{bn:"এক্সপ্লোর",en:"Explore"},links:Vi,onNav:t}),e.jsx(ut,{tk:a,lang:o,heading:{bn:"অ্যাকাউন্ট",en:"Account"},links:Qi,onNav:t}),e.jsx(ut,{tk:a,lang:o,heading:{bn:"কোম্পানি",en:"Company"},links:Xi,onNav:t}),e.jsx(ut,{tk:a,lang:o,heading:{bn:"আইনি",en:"Legal"},links:Zi,onNav:t})]}),e.jsxs("div",{style:{borderTop:`1px solid ${a.line}`,paddingTop:20,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8},children:[e.jsx("span",{style:{fontFamily:c,fontSize:12,color:a.textFaint},children:l(o,"© ২০২৬ KoyJabo · সর্বস্বত্ব সংরক্ষিত","© 2026 KoyJabo · All rights reserved")}),e.jsxs("span",{style:{fontFamily:c,fontSize:12,color:"#22c55e",display:"flex",alignItems:"center",gap:5},children:[e.jsx("span",{style:{width:7,height:7,borderRadius:999,background:"#22c55e",display:"inline-block"}}),l(o,"বাংলাদেশের জন্য ঢাকায় তৈরি","Made in Dhaka for Bangladesh")]})]})]})})}function Ft({slot:a,format:o="auto"}){const d=b.useRef(null),t=b.useRef(!1);return b.useEffect(()=>{t.current=!1;const n=()=>{const i=d.current;if(!i||t.current)return;const r=i.getAttribute("data-adsbygoogle-status");if(!(r==="done"||r==="filled")){if(typeof window.adsbygoogle>"u"){window.setTimeout(n,1600);return}t.current=!0;try{(window.adsbygoogle=window.adsbygoogle||[]).push({})}catch{t.current=!1}}};n()},[a,o]),e.jsx("ins",{ref:d,className:"adsbygoogle",style:{display:"block",width:"100%",minWidth:0},"data-ad-client":"ca-pub-8425219156685369","data-ad-slot":a,"data-ad-format":o,"data-full-width-responsive":"true"})}function ga({tk:a,lang:o,side:d}){return e.jsx("div",{style:{position:"fixed",top:"50%",transform:"translateY(-50%)",[d]:8,width:160,zIndex:80,background:a.panelMuted,border:`1px solid ${a.line}`,borderRadius:12,minHeight:600,display:"flex",flexDirection:"column",alignItems:"stretch",justifyContent:"flex-start",padding:8,overflow:"hidden"},children:e.jsx("div",{style:{minHeight:560,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(Ft,{slot:"7294303750"})})})}function tn({tk:a,lang:o,onClose:d}){return e.jsxs("div",{style:{position:"fixed",bottom:0,left:0,right:0,zIndex:9e3,background:a.panel,borderTop:`1px solid ${a.line}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 16px",minHeight:64,backdropFilter:"blur(12px)",paddingBottom:"calc(8px + env(safe-area-inset-bottom))"},children:[e.jsx("div",{style:{flex:1,minHeight:50,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(Ft,{slot:"7294303750",format:"horizontal"})}),e.jsx("button",{onClick:d,style:{background:a.panelMuted,border:`1px solid ${a.line}`,borderRadius:999,color:a.textFaint,cursor:"pointer",fontSize:16,width:32,height:32,lineHeight:1},children:"×"})]})}function an({tk:a,lang:o,open:d,onClose:t}){const[n,i]=b.useState(5);return b.useEffect(()=>{if(!d){i(5);return}const r=setInterval(()=>i(s=>s<=1?(clearInterval(r),0):s-1),1e3);return()=>clearInterval(r)},[d]),d?e.jsxs("div",{style:{position:"fixed",inset:0,zIndex:10080,background:"rgba(3,5,12,0.92)",display:"flex",alignItems:"center",justifyContent:"center",padding:20},children:[e.jsxs("button",{onClick:n===0?t:void 0,style:{position:"absolute",top:14,right:14,padding:"8px 14px",borderRadius:999,border:"1px solid rgba(255,255,255,0.25)",background:"rgba(255,255,255,0.1)",color:"#fff",cursor:n===0?"pointer":"default",fontFamily:c,fontWeight:700,fontSize:13,display:"flex",alignItems:"center",gap:8,opacity:n===0?1:.7},children:[n===0?l(o,"বন্ধ করুন","Skip ad"):l(o,`${n}s`,`Skip in ${n}s`),n===0&&e.jsx("span",{children:"✕"})]}),e.jsx("div",{style:{width:"min(420px,100%)",minHeight:360,maxHeight:"76vh",borderRadius:18,overflow:"hidden",background:a.bg,border:`1px solid ${a.line}`,boxShadow:a.shadowLg,display:"flex",flexDirection:"column"},children:e.jsx("div",{style:{minHeight:300,display:"flex",alignItems:"center",justifyContent:"center",padding:12},children:e.jsx(Ft,{slot:"7294303750"})})})]}):null}function nn({tk:a,lang:o,isMobile:d}){const t=[l(o,"ঢাকা থেকে চট্টগ্রাম বাস","Dhaka to Chittagong bus"),l(o,"আজকের মেট্রো সময়সূচি","Metro schedule today"),l(o,"সদরঘাট লঞ্চ সময়","Sadarghat launch time"),l(o,"বিমান কক্সবাজার ফ্লাইট","Biman flight Dhaka Cox's Bazar")];return e.jsxs("div",{children:[e.jsx("div",{style:{background:a.panel,border:`1px solid ${a.line}`,borderRadius:14,padding:10,minHeight:d?120:100,marginBottom:16,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(Ft,{slot:"7294303750",format:d?"horizontal":"auto"})}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:t.map((n,i)=>e.jsxs("button",{style:{background:a.panelMuted,border:`1px solid ${a.line}`,borderRadius:999,padding:"6px 12px",fontFamily:m,fontSize:12,color:a.textDim,cursor:"pointer",display:"flex",alignItems:"center",gap:5},children:[e.jsx("span",{style:{fontSize:10},children:"🔍"}),n]},i))})]})}function ue({suggestions:a,onSelect:o,onDismiss:d,tk:t,lang:n,anchorRef:i,maxItems:r=20}){const s=n==="bn"?m:c,[p,h]=b.useState({top:0,left:0,width:0,maxH:320});return b.useEffect(()=>{const u=()=>{if(!i.current)return;const f=i.current.getBoundingClientRect(),v=window.innerHeight,k=6,j=120,A=320,z=v-f.bottom-k,C=Math.max(j,Math.min(A,z));h({top:f.bottom+k,left:f.left,width:f.width,maxH:C})};return u(),window.addEventListener("scroll",u,!0),window.addEventListener("resize",u),()=>{window.removeEventListener("scroll",u,!0),window.removeEventListener("resize",u)}},[i]),b.useEffect(()=>{const u=f=>{i.current&&!i.current.contains(f.target)&&d()};return document.addEventListener("mousedown",u),()=>document.removeEventListener("mousedown",u)},[d,i]),!a.length||p.width===0?null:Si.createPortal(e.jsx("div",{style:{position:"fixed",top:p.top,left:p.left,width:p.width,zIndex:99999,background:t.panel,border:`1px solid ${t.line}`,borderRadius:14,overflow:"hidden auto",boxShadow:t.shadowLg,maxHeight:p.maxH},children:a.slice(0,r).map((u,f)=>e.jsxs("button",{onMouseDown:v=>{v.preventDefault(),o(u)},style:{width:"100%",background:"none",border:"none",borderTop:f?`1px solid ${t.line}`:"",padding:"11px 14px",display:"flex",alignItems:"center",gap:10,cursor:"pointer",textAlign:"left"},onMouseEnter:v=>v.currentTarget.style.background=t.chipBg,onMouseLeave:v=>v.currentTarget.style.background="none",children:[e.jsx("span",{style:{fontSize:14,flexShrink:0},children:"📍"}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:s,fontSize:13,fontWeight:600,color:t.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:u.label}),u.sub&&e.jsx("div",{style:{fontFamily:u.sub.match(/[ঀ-৿]/)?m:c,fontSize:11,color:t.textFaint,marginTop:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:u.sub})]})]},u.id))}),document.body)}let Et=null;function on(){if(Et)return Et;const a=[],o=new Set;for(const d of Object.values(ge))o.has(d.id)||(o.add(d.id),a.push({id:d.id,label:d.name,sub:d.bnName||"",lat:d.lat,lng:d.lng,category:"bus_stop"}));for(const[d,t]of Object.entries(qe)){const n=o.has(d)?`rail_${d}`:d;o.has(n)||(o.add(n),a.push({id:n,label:t.name,sub:t.bnName||"",lat:t.lat,lng:t.lng,category:"railway_station"}))}for(const d of ve){const t=`launch_${d.id}`;o.has(t)||(o.add(t),a.push({id:t,label:d.en,sub:d.bn||"",lat:d.lat,lng:d.lng,category:"ferry_terminal"}))}for(const d of Se){const t=`airport_${d.iata.toLowerCase()}`;o.has(t)||(o.add(t),a.push({id:t,label:d.en,sub:d.bn||"",lat:d.lat,lng:d.lng,category:"airport"}))}return Et=a,a}function Re(a,o={}){const{limit:d=20,categories:t,includeOSM:n=!0}=o,[i,r]=b.useState([]),[s,p]=b.useState(!1),h=b.useRef(null);return b.useEffect(()=>{n&&Bi()},[n]),b.useEffect(()=>{if(!n||!a.trim()){r([]),p(!1);return}const f=Ci(a,d);if(f.length>0){r(f),p(!1);return}return p(!0),h.current&&clearTimeout(h.current),h.current=setTimeout(async()=>{try{const{searchLocations:v}=await Ae(async()=>{const{searchLocations:j}=await import("./ai-service-BwDhcQae.js").then(A=>A.l);return{searchLocations:j}},__vite__mapDeps([0,1,2])),k=await v(a,d);r(k)}catch{r([])}finally{p(!1)}},200),()=>{h.current&&clearTimeout(h.current)}},[a,d,n]),{suggestions:b.useCallback(()=>{const f=a.toLowerCase().trim(),v=on();if(!f)return t?v.filter(B=>t.includes(B.category)).slice(0,d):v.slice(0,d);const k=v.filter(B=>B.label.toLowerCase().includes(f)||B.sub.toLowerCase().includes(f)||B.sub.includes(a)),j=/\s*(bus stand|bus stop|bus station|bus terminal|railway station|rail station|train station|station|ghat|terminal|bazar|bazaar|stand|\d+)$/i,A=B=>B.toLowerCase().replace(j,"").replace(/[\s\-\.,'()]+/g,""),z=new Set(k.map(B=>A(B.label))),C=new Set(k.map(B=>B.id)),I=i.filter(B=>{if(!B.name||C.has(B.id))return!1;const H=A(B.name);return z.has(H)?!1:(z.add(H),!0)}).map(B=>({id:B.id,label:B.name,sub:B.bnName||B.category,lat:B.lat??void 0,lng:B.lng??void 0,category:B.category})),w=[...k,...I];return(t?w.filter(B=>t.includes(B.category)):w).slice(0,d)},[a,i,d,t])(),loading:s}}const Oa="koyjabo_favorite_buses";function Le(){try{const a=localStorage.getItem(Oa),o=a?JSON.parse(a):[];return Array.isArray(o)?o.filter(d=>typeof d=="string"):[]}catch{return[]}}function Ga(a){try{localStorage.setItem(Oa,JSON.stringify(Array.from(new Set(a)))),window.dispatchEvent(new Event("koyjabo:favorites-changed"))}catch{}}function Ja(a){const o=Le(),d=o.includes(a)?o.filter(t=>t!==a):[...o,a];return Ga(d),d}const rn="dhaka_commute_user_history";let $e=null;const Lt=a=>{$e=a},wt=()=>$e?`koyjabo_history_${$e}`:rn,fa=a=>{try{const o=Ce(),d=(i,r)=>{if(!r||r.length===0)return i;const s=new Set(i.map(h=>h.timestamp)),p=[...i,...r.filter(h=>!s.has(h.timestamp))];return p.sort((h,u)=>h.timestamp-u.timestamp),p.slice(-100)},t=(i,r)=>{if(!r)return i;const s={...i};for(const[p,h]of Object.entries(r))s[p]=Math.max(s[p]||0,h);return s},n={...o,busSearches:d(o.busSearches,a.busSearches),routeSearches:d(o.routeSearches,a.routeSearches),intercitySearches:d(o.intercitySearches,a.intercitySearches),trainSearches:d(o.trainSearches,a.trainSearches),mostUsedBuses:t(o.mostUsedBuses,a.mostUsedBuses),mostUsedRoutes:t(o.mostUsedRoutes,a.mostUsedRoutes),mostUsedIntercity:t(o.mostUsedIntercity,a.mostUsedIntercity),mostUsedTrains:t(o.mostUsedTrains,a.mostUsedTrains)};localStorage.setItem(wt(),JSON.stringify(n))}catch{}},ya="https://koyjabo-auth-proxy.mejbaur-bahar.workers.dev",Ge=()=>new Date().toISOString().split("T")[0],Ce=()=>{try{const a=localStorage.getItem(wt());if(!a)return{busSearches:[],routeSearches:[],intercitySearches:[],trainSearches:[],mostUsedBuses:{},mostUsedRoutes:{},mostUsedIntercity:{},mostUsedTrains:{},todayBuses:[],todayRoutes:[],todayIntercity:[],todayTrains:[],lastResetDate:Ge(),communityFeatureUsage:{},communityFeatureHistory:[]};const o=JSON.parse(a),d=Ge();return o.lastResetDate!==d&&(o.todayBuses=[],o.todayRoutes=[],o.todayIntercity=[],o.todayTrains=[],o.lastResetDate=d,localStorage.setItem(wt(),JSON.stringify(o))),o.mostUsedBuses||(o.mostUsedBuses={}),o.mostUsedRoutes||(o.mostUsedRoutes={}),o.mostUsedIntercity||(o.mostUsedIntercity={}),o.mostUsedTrains||(o.mostUsedTrains={}),o.busSearches||(o.busSearches=[]),o.routeSearches||(o.routeSearches=[]),o.intercitySearches||(o.intercitySearches=[]),o.trainSearches||(o.trainSearches=[]),o.todayBuses||(o.todayBuses=[]),o.todayRoutes||(o.todayRoutes=[]),o.todayIntercity||(o.todayIntercity=[]),o.todayTrains||(o.todayTrains=[]),o.communityFeatureUsage||(o.communityFeatureUsage={}),o.communityFeatureHistory||(o.communityFeatureHistory=[]),o}catch{return{busSearches:[],routeSearches:[],intercitySearches:[],trainSearches:[],mostUsedBuses:{},mostUsedRoutes:{},mostUsedIntercity:{},mostUsedTrains:{},todayBuses:[],todayRoutes:[],todayIntercity:[],todayTrains:[],lastResetDate:Ge(),communityFeatureUsage:{},communityFeatureHistory:[]}}};let $t=null;const sn=a=>{!$e||!ya||($t&&clearTimeout($t),$t=setTimeout(()=>{const o=$e;if(!o)return;const d={busSearches:(a.busSearches||[]).slice(-50),routeSearches:(a.routeSearches||[]).slice(-50),intercitySearches:(a.intercitySearches||[]).slice(-50),trainSearches:(a.trainSearches||[]).slice(-50),mostUsedBuses:a.mostUsedBuses||{},mostUsedRoutes:a.mostUsedRoutes||{},mostUsedIntercity:a.mostUsedIntercity||{},mostUsedTrains:a.mostUsedTrains||{},communityFeatureUsage:a.communityFeatureUsage||{},communityFeatureHistory:(a.communityFeatureHistory||[]).slice(-100)};fetch(`${ya}/gh`,{method:"POST",credentials:"omit",headers:{"Content-Type":"application/json"},body:JSON.stringify({requestId:crypto.randomUUID(),action:"save-history",userId:o,data:JSON.stringify(d)})}).catch(()=>{})},5e3))},ta=a=>{try{localStorage.setItem(wt(),JSON.stringify(a)),$e&&sn(a)}catch{}},aa=(a,o)=>{var d;try{(d=window.gtag)==null||d.call(window,"event",a,o)}catch{}},Ya=(a,o)=>{const d=Ce(),t=Ge();aa("bus_search",{bus_id:a,bus_name:o}),d.busSearches.push({busId:a,busName:o,timestamp:Date.now(),date:t}),d.mostUsedBuses[a]=(d.mostUsedBuses[a]||0)+1,d.todayBuses.includes(a)||d.todayBuses.push(a),d.busSearches.length>100&&(d.busSearches=d.busSearches.slice(-100)),ta(d)},ln=(a,o)=>{const d=Ce(),t=Ge(),n=`${a}-${o}`;aa("route_search",{from_location:a,to_location:o}),d.routeSearches.push({from:a,to:o,timestamp:Date.now(),date:t}),d.mostUsedRoutes[n]=(d.mostUsedRoutes[n]||0)+1,d.todayRoutes.includes(n)||d.todayRoutes.push(n),d.routeSearches.length>100&&(d.routeSearches=d.routeSearches.slice(-100)),ta(d)},qa=a=>{const o=Ce();o.communityFeatureUsage=o.communityFeatureUsage||{},o.communityFeatureHistory=o.communityFeatureHistory||[],aa("feature_open",{feature_name:a}),o.communityFeatureUsage[a]=(o.communityFeatureUsage[a]||0)+1,o.communityFeatureHistory.push({feature:a,timestamp:Date.now(),date:Ge(),userId:$e||void 0}),o.communityFeatureHistory.length>200&&(o.communityFeatureHistory=o.communityFeatureHistory.slice(-200)),ta(o)},dn=[{bn:"লোকাল বাস",en:"Local Bus",id:"bus",icon:"🚌"},{bn:"মেট্রো",en:"Metro",id:"metro",icon:"🚇"},{bn:"আন্তঃজেলা",en:"Intercity",id:"intercity",icon:"🧭"},{bn:"ট্রেন",en:"Train",id:"train",icon:"🚆"},{bn:"লঞ্চ",en:"Launch",id:"launch",icon:"⛴️"},{bn:"বিমান",en:"Air",id:"flights",icon:"✈️"}];function cn({tk:a,lang:o,isMobile:d,onNav:t,activeMode:n,setActiveMode:i}){const[r,s]=b.useState(""),[p,h]=b.useState(""),[u,f]=b.useState(""),[v,k]=b.useState(!1),[j,A]=b.useState(!1),[z,C]=b.useState(!1),[I,w]=b.useState(null),[D,B]=b.useState(!1),H=b.useRef(null),U=b.useRef(null),q=b.useRef(null),P={bus:["bus_stop"],metro:["metro_station"],train:["railway_station"],intercity:void 0,launch:["ferry_terminal"],flights:["airport"]},{suggestions:W}=Re(p,{limit:20,categories:P[n]}),{suggestions:M}=Re(u,{limit:20,categories:P[n]}),E=b.useMemo(()=>{if(n==="metro")return Object.values(kt).map(y=>({id:y.id,label:y.name,sub:y.bnName}));if(n==="train")return Object.values(qe).slice(0,20).map(y=>({id:y.id,label:y.name,sub:y.bnName}));if(n==="launch")return ve.map(y=>({id:y.id,label:y.en,sub:y.bn}));if(n==="flights")return Se.map(y=>({id:y.iata,label:y.en,sub:y.bn}));if(n==="intercity"){const y=new Set;return[...Xt,...Zt].filter(g=>y.has(g.district)?!1:(y.add(g.district),!0)).sort((g,T)=>g.district.localeCompare(T.district)).map(g=>({id:g.district,label:g.district,sub:g.busOperators.slice(0,2).join(", ")}))}return Object.values(ge).slice(0,20).map(y=>({id:y.id,label:y.name,sub:y.bnName}))},[n]),_=(y,g)=>y.trim()?g==="from"?W:M:E,L=(y=n)=>y==="bus"?"bus-hub":y==="metro"?"metro-hub":y==="train"?"train-hub":y==="launch"?"launch-hub":y==="flights"?"flights-hub":"intercity",J={bus:l(o,"বাস, স্টপ, এলাকা...","Search bus, stop, place..."),metro:l(o,"মেট্রো স্টেশন বা ভাড়া...","Search MRT station or fare..."),intercity:l(o,"জেলা বা অপারেটর...","Search district or operator..."),train:l(o,"ট্রেন, স্টেশন, নম্বর...","Search train, station, number..."),launch:l(o,"লঞ্চ, ঘাট, রুট...","Search launch, terminal, route..."),flights:l(o,"বিমানবন্দর বা ফ্লাইট রুট...","Search airport or flight route...")},R={bus:l(o,"গুলশান ১","Gulshan 1"),metro:l(o,"উত্তরা উত্তর","Uttara North"),intercity:l(o,"ঢাকা","Dhaka"),train:l(o,"ঢাকা (কমলাপুর)","Dhaka (Kamalapur)"),launch:l(o,"সদরঘাট","Sadarghat"),flights:l(o,"ঢাকা (DAC)","Dhaka (DAC)")},N={bus:l(o,"মতিঝিল","Motijheel"),metro:l(o,"মতিঝিল","Motijheel"),intercity:l(o,"কক্সবাজার","Cox's Bazar"),train:l(o,"চট্টগ্রাম","Chattogram"),launch:l(o,"বরিশাল ঘাট","Barisal Ghat"),flights:l(o,"কক্সবাজার (CXB)","Cox's Bazar (CXB)")},$=(y=r)=>{const g=y.trim()?{search:y.trim(),mode:n}:{mode:n};t(L(),g)},X=b.useMemo(()=>{if(!r.trim())return[];const y=r.toLowerCase();return n==="bus"?pe.filter(g=>g.name.toLowerCase().includes(y)||g.bnName.toLowerCase().includes(y)||g.routeString.toLowerCase().includes(y)).slice(0,6).map(g=>({id:g.id,label:g.name,sub:g.routeString})):n==="train"?[...Ye.filter(T=>T.name.toLowerCase().includes(y)||T.bnName.includes(r)||T.number.includes(y)).slice(0,5).map(T=>({id:T.id,label:`${T.name} (${T.number})`,sub:T.bnName})),..._(r,"from")].slice(0,15):_(r,"from")},[n,r,W]),Z=y=>{i(y),s(""),h(""),f("")},F={borderRadius:999,padding:"5px 13px",fontFamily:o==="bn"?m:c,fontSize:12,fontWeight:600,cursor:"pointer",border:"none",whiteSpace:"nowrap",transition:"all 0.18s ease"},x={background:a.inputBg,border:`1px solid ${a.line}`,borderRadius:14,padding:"10px 14px",display:"flex",alignItems:"center",gap:10,flex:1};return e.jsxs("div",{style:{borderRadius:24,padding:22,background:a.panel,boxShadow:a.shadowLg,border:`1px solid ${a.line}`,display:"flex",flexDirection:"column",gap:16},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,overflowX:"auto",scrollbarWidth:"none",flexWrap:d?"nowrap":"wrap"},children:[dn.map(y=>e.jsx("button",{"data-kj-search-mode":y.id,onClick:()=>Z(y.id),title:l(o,y.bn,y.en),style:{...F,background:n===y.id?a.primary:a.panelMuted,color:n===y.id?a.primaryInk:a.textDim,border:n===y.id?"none":`1px solid ${a.line}`,padding:"7px 11px",minWidth:0,fontSize:18},children:y.icon},y.id)),!d&&e.jsxs("button",{onClick:()=>t("intercity"),style:{...F,marginLeft:"auto",background:a.primarySoft,color:a.primary,border:`1px solid ${a.primary}`,display:"flex",alignItems:"center",gap:6},children:[e.jsx(te.search,{s:13}),l(o,"যেকোনো কিছু খুঁজুন","Search anything")]})]}),e.jsxs("div",{ref:q,style:{background:a.inputBg,border:`1px solid ${z?a.primary:a.line}`,borderRadius:14,padding:"11px 14px",display:"flex",alignItems:"center",gap:10,transition:"border-color 0.15s"},children:[e.jsx("div",{style:{width:30,height:30,borderRadius:8,background:"linear-gradient(135deg, rgba(0,245,255,0.25), rgba(162,89,255,0.25))",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:a.primary},children:e.jsx(te.search,{s:15})}),e.jsx("input",{"data-kj-home-search":!0,value:r,onChange:y=>s(y.target.value),onFocus:()=>C(!0),onBlur:()=>setTimeout(()=>C(!1),150),onKeyDown:y=>y.key==="Enter"&&r.trim()&&$(),placeholder:J[n],style:{flex:1,background:"transparent",border:"none",outline:"none",fontFamily:o==="bn"?m:c,fontSize:13,color:a.text,minWidth:0}}),!d&&e.jsx("span",{style:{background:a.panelMuted,border:`1px solid ${a.line}`,borderRadius:6,padding:"2px 6px",fontFamily:c,fontSize:10,fontWeight:600,color:a.textFaint,flexShrink:0},children:"⌘K"})]}),z&&X.length>0&&e.jsx(ue,{suggestions:X,onSelect:y=>{s(y.label),C(!1),$(y.label)},onDismiss:()=>C(!1),tk:a,lang:o,anchorRef:q}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("div",{style:{flex:1,height:1,background:a.line}}),e.jsx("span",{style:{fontFamily:o==="bn"?m:c,fontSize:11,color:a.textFaint},children:l(o,"অথবা · রুট প্ল্যান করুন","Or · plan a route")}),e.jsx("div",{style:{flex:1,height:1,background:a.line}})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:d?"1fr":"1fr 1fr auto",gap:10,alignItems:"center"},children:[e.jsxs("div",{ref:H,style:{...x,borderColor:v?a.primary:a.line,transition:"border-color 0.15s"},children:[e.jsx("div",{style:{width:32,height:32,borderRadius:9,background:a.primarySoft,display:"flex",alignItems:"center",justifyContent:"center",color:a.primary,flexShrink:0},children:e.jsx(te.pin,{s:16})}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:c,fontSize:10,fontWeight:600,color:a.textFaint,textTransform:"uppercase",letterSpacing:.5},children:l(o,"কোথা থেকে","From")}),e.jsx("input",{"data-kj-from-input":!0,value:p,onChange:y=>h(y.target.value),onFocus:()=>k(!0),onBlur:()=>setTimeout(()=>k(!1),150),placeholder:R[n],style:{background:"transparent",border:"none",outline:"none",fontFamily:o==="bn"?m:c,fontSize:13,fontWeight:600,color:a.text,width:"100%",marginTop:2}})]})]}),v&&e.jsx(ue,{suggestions:_(p,"from"),onSelect:y=>{h(y.label),k(!1),B(!1)},onDismiss:()=>k(!1),tk:a,lang:o,anchorRef:H}),!d&&e.jsx("button",{style:{width:36,height:36,borderRadius:999,background:a.primarySoft,border:`1px solid ${a.primary}`,color:a.primary,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,order:2},"aria-label":"Swap",children:e.jsx(te.swap,{s:16})}),e.jsxs("div",{ref:U,style:{...x,order:d?0:1,borderColor:j?a.accent:a.line,transition:"border-color 0.15s"},children:[e.jsx("div",{style:{width:32,height:32,borderRadius:9,background:a.accentSoft,display:"flex",alignItems:"center",justifyContent:"center",color:a.accent,flexShrink:0},children:e.jsx(te.flag,{s:16})}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:c,fontSize:10,fontWeight:600,color:a.textFaint,textTransform:"uppercase",letterSpacing:.5},children:l(o,"কোথায়","To")}),e.jsx("input",{"data-kj-to-input":!0,value:u,onChange:y=>f(y.target.value),onFocus:()=>A(!0),onBlur:()=>setTimeout(()=>A(!1),150),placeholder:N[n],style:{background:"transparent",border:"none",outline:"none",fontFamily:o==="bn"?m:c,fontSize:13,fontWeight:600,color:a.text,width:"100%",marginTop:2}})]})]}),j&&e.jsx(ue,{suggestions:_(u,"to"),onSelect:y=>{f(y.label),A(!1),B(!1)},onDismiss:()=>A(!1),tk:a,lang:o,anchorRef:U}),D&&e.jsxs("div",{style:{gridColumn:"1 / -1",order:-1,background:"#ef444422",border:"1px solid #ef4444",borderRadius:10,padding:"8px 14px",fontFamily:o==="bn"?m:c,fontSize:12,color:"#ef4444",fontWeight:600},children:["⚠ ",l(o,"শুরু ও গন্তব্য আলাদা হতে হবে","From and To must be different locations")]}),e.jsxs("button",{"data-kj-find-routes":!0,onClick:()=>{const y=p.trim().toLowerCase(),g=u.trim().toLowerCase();if(y&&g&&y===g){B(!0);return}B(!1);const T={mode:n};p&&(T.from=p),u&&(T.to=u),I&&(T.sort=I),t(n==="bus"?"results":L(),T)},style:{gridColumn:d?"1 / -1":"auto",order:d?0:3,background:a.primary,color:a.primaryInk,border:"none",borderRadius:14,padding:"13px 22px",fontFamily:o==="bn"?m:c,fontSize:14,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,whiteSpace:"nowrap"},children:[l(o,"রুট খুঁজুন","Find routes"),e.jsx(te.arrowR,{s:16})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:d?"nowrap":"wrap",overflowX:"auto",scrollbarWidth:"none"},children:[[{id:"now",label:l(o,`এখনই ছাড়ুন · ${new Date().toLocaleTimeString("en-BD",{hour:"2-digit",minute:"2-digit"})}`,`Leave now · ${new Date().toLocaleTimeString("en-BD",{hour:"2-digit",minute:"2-digit"})}`)},{id:"fastest",label:l(o,"দ্রুততম","Fastest")},{id:"cheapest",label:l(o,"সস্তাতম","Cheapest")},...d?[]:[{id:"non-ac",label:l(o,"Non-AC only","Non-AC only")}]].map(y=>{const g=I===y.id;return e.jsxs("button",{onClick:()=>w(g?null:y.id),style:{background:g?a.primarySoft:a.panelMuted,border:`1px solid ${g?a.primary:a.line}`,borderRadius:999,padding:"5px 12px",fontFamily:o==="bn"?m:c,fontSize:11,fontWeight:g?700:500,color:g?a.primary:a.textDim,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0},children:[g&&"✓ ",y.label]},y.id)}),e.jsxs("span",{style:{marginLeft:"auto",display:"flex",alignItems:"center",gap:5,fontFamily:o==="bn"?m:c,fontSize:11,fontWeight:600,color:"#22c55e",whiteSpace:"nowrap",flexShrink:0},children:[e.jsx("span",{style:{width:7,height:7,borderRadius:"50%",background:"#22c55e",animation:"kjpulse 2s ease-in-out infinite",display:"inline-block"}}),n==="bus"?l(o,"২,৪১২ রুট লাইভ","2,412 routes live"):l(o,"বাস্তব লোকাল ডেটা","Real local dataset")]})]})]})}const hn=[{grad:"linear-gradient(135deg, #10b981, #006a4e)",label:{bn:"লোকাল বাস",en:"Local bus"},sub:l("en","২০০+ রুট","200+ routes"),badge:{bn:"জনপ্রিয়",en:"Popular"},route:"bus-hub",mode:"bus",vehicleKind:"bus"},{grad:"linear-gradient(135deg, #3b82f6, #1e3a8a)",label:{bn:"মেট্রো রেল",en:"Metro Rail"},sub:"MRT-6 · 15 stations",route:"metro-hub",mode:"metro",vehicleKind:"train"},{grad:"linear-gradient(135deg, #8b5cf6, #5b21b6)",label:{bn:"ট্রেন",en:"Train"},sub:"BD Railway · all routes",route:"train-hub",mode:"train",vehicleKind:"train"},{grad:"linear-gradient(135deg, #f59e0b, #b45309)",label:{bn:"আন্তঃজেলা",en:"Intercity"},sub:"64 districts · bus/train/flight",route:"intercity",mode:"intercity",vehicleKind:"plane"},{grad:"linear-gradient(135deg, #0ea5e9, #075985)",label:{bn:"লঞ্চ ও স্টিমার",en:"Launch & Steamer"},sub:"Sadarghat → Barisal",route:"launch-hub",mode:"launch",vehicleKind:"launch"},{grad:"linear-gradient(135deg, #8b5cf6, #5b21b6)",label:{bn:"অভ্যন্তরীণ ফ্লাইট",en:"Flights"},sub:"4 airlines · 8 airports",badge:{bn:"নতুন",en:"New"},route:"flights-hub",mode:"flights",vehicleKind:"plane"},{grad:"linear-gradient(135deg, #ef4444, #b91c1c)",label:{bn:"AI সহায়ক",en:"AI Assistant"},sub:"Ask in Bangla",badge:{bn:"নতুন",en:"New"},route:"ai",mode:"bus",vehicleKind:"chatbot"}];function pn({tile:a,lang:o,onClick:d}){const[t,n]=b.useState(!1);return e.jsxs("button",{onClick:d,onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),style:{background:a.grad,borderRadius:18,padding:"16px 14px 96px 14px",minHeight:180,border:"none",cursor:"pointer",position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",justifyContent:"space-between",textAlign:"left",transform:t?"translateY(-3px) scale(1.02)":"none",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:t?"0 12px 32px rgba(0,0,0,0.35)":"0 4px 12px rgba(0,0,0,0.2)"},children:[e.jsx("div",{style:{position:"absolute",width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,0.08)",top:-30,right:-30,animation:"kjpulse 3s ease-in-out infinite"}}),e.jsx("div",{style:{position:"absolute",width:70,height:70,borderRadius:"50%",background:"rgba(255,255,255,0.06)",bottom:30,left:-20,animation:"kjpulse 4s ease-in-out infinite",animationDelay:"1s"}}),e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",position:"relative",zIndex:1},children:[e.jsx("div",{style:{width:38,height:38,borderRadius:11,background:"rgba(255,255,255,0.18)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",color:"white"},children:e.jsx("span",{style:{fontSize:a.vehicleKind==="bus"?20:a.vehicleKind==="chatbot"?18:20},children:a.vehicleKind==="bus"?"🚌":a.vehicleKind==="train"?"🚆":a.vehicleKind==="plane"?"✈️":a.vehicleKind==="launch"?"⛴️":"🤖"})}),a.badge&&e.jsx("span",{style:{background:"rgba(255,255,255,0.22)",borderRadius:999,padding:"3px 8px",fontFamily:o==="bn"?m:c,fontSize:10,fontWeight:700,color:"white",backdropFilter:"blur(4px)"},children:l(o,a.badge.bn,a.badge.en)})]}),e.jsxs("div",{style:{position:"relative",zIndex:2},children:[e.jsx("div",{style:{fontFamily:o==="bn"?m:c,fontSize:15,fontWeight:700,color:"white",lineHeight:1.2,marginBottom:4},children:l(o,a.label.bn,a.label.en)}),e.jsx("div",{style:{fontFamily:c,fontSize:11,color:"rgba(255,255,255,0.72)",lineHeight:1.3},children:a.sub})]}),e.jsx("div",{style:{position:"absolute",left:0,right:0,bottom:0,height:90,pointerEvents:"none",zIndex:1,overflow:"hidden"},children:e.jsx(qi,{kind:a.vehicleKind})})]})}const ba=[{bn:"লোকাল বাসস্ট্যান্ডে — কোন বাসে উঠবো? সব তো একরকম! 😕",en:"At the bus stand — which bus do I take? They all look the same! 😕"},{bn:"ফোনে koyjabo.com খুলে গন্তব্য লিখুন",en:"Open koyjabo.com and type your destination"},{bn:"সঠিক বাস, ভাড়া আর সময় — সাথে সাথে ✅",en:"The right bus, fare & time — instantly ✅"},{bn:"নিশ্চিন্তে সঠিক বাসে উঠে যাত্রা শুরু! 🎉",en:"Hop on the right bus, stress-free! 🎉"}];function un({tk:a,lang:o,onNav:d}){const[t,n]=b.useState(0);b.useEffect(()=>{const r=setInterval(()=>n(s=>(s+1)%4),3600);return()=>clearInterval(r)},[]);const i=[e.jsxs("div",{className:"kj-story-scene",style:{position:"relative",width:"100%",height:"100%",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(180deg, #1e3a5f 0%, #0f2d4a 60%, #1a3c2a 100%)"}}),e.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,height:60,background:"#1f2937"}}),e.jsx("div",{style:{position:"absolute",bottom:28,left:0,right:0,height:3,background:"repeating-linear-gradient(90deg, #fde68a 0, #fde68a 24px, transparent 24px, transparent 48px)",opacity:.5}}),e.jsxs("div",{style:{position:"absolute",bottom:58,left:"38%",display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsx("div",{style:{background:"#1d4ed8",color:"white",padding:"3px 8px",borderRadius:4,fontFamily:m,fontSize:11,fontWeight:700},children:"BUS"}),e.jsx("div",{style:{width:3,height:40,background:"#9ca3af"}})]}),e.jsx("div",{style:{position:"absolute",bottom:56,left:"48%",fontSize:38,animation:"kjBobY 1.8s ease-in-out infinite"},children:"🧑"}),e.jsx("div",{style:{position:"absolute",bottom:"55%",left:"54%",background:"rgba(255,255,255,0.92)",borderRadius:12,padding:"5px 10px",fontFamily:m,fontSize:12,color:"#1f2937",fontWeight:600,boxShadow:"0 2px 8px rgba(0,0,0,0.2)",whiteSpace:"nowrap"},children:"কোন বাসে উঠবো? 😕"}),e.jsx("div",{className:"kj-anim-drive",style:{position:"absolute",bottom:38,left:0,width:"30%",animationDuration:"6s"},children:e.jsx(Me,{size:64})}),e.jsx("div",{className:"kj-anim-drive",style:{position:"absolute",bottom:38,left:"-50%",width:"30%",animationDuration:"9s",animationDelay:"3s"},children:e.jsx(Me,{size:64})})]},"s0"),e.jsxs("div",{className:"kj-story-scene",style:{position:"relative",width:"100%",height:"100%",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(180deg, #1e3a5f 0%, #0f2d4a 60%, #1a3c2a 100%)"}}),e.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,height:60,background:"#1f2937"}}),e.jsx("div",{style:{position:"absolute",bottom:56,left:"42%",fontSize:34},children:"🧑"}),e.jsxs("div",{style:{position:"absolute",bottom:"32%",left:"50%",width:80,borderRadius:12,background:"#0d1b2e",border:"2px solid rgba(0,245,255,0.5)",overflow:"hidden",boxShadow:"0 0 20px rgba(0,245,255,0.3)",animation:"kjBobY 2s ease-in-out infinite"},children:[e.jsx("div",{style:{background:"rgba(0,245,255,0.15)",padding:"5px 6px 3px"},children:e.jsx("div",{style:{fontFamily:m,fontSize:7,fontWeight:800,color:"#00f5ff",letterSpacing:.5},children:"KoyJabo"})}),e.jsxs("div",{style:{padding:"4px 6px",display:"flex",flexDirection:"column",gap:3},children:[e.jsx("div",{style:{background:"rgba(255,255,255,0.08)",borderRadius:4,padding:"3px 5px",fontFamily:m,fontSize:7,color:"rgba(255,255,255,0.5)"},children:"মতিঝিল..."}),e.jsx("div",{style:{background:"rgba(0,245,255,0.12)",borderRadius:4,padding:"4px 5px",fontFamily:m,fontSize:7,fontWeight:600,color:"#00f5ff"},children:"🔍 খুঁজুন"})]})]}),e.jsx("div",{style:{position:"absolute",bottom:"65%",left:"62%",fontSize:18,animation:"kjSpark 1.5s ease-in-out infinite"},children:"✨"})]},"s1"),e.jsxs("div",{className:"kj-story-scene",style:{position:"relative",width:"100%",height:"100%",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(180deg, #1e3a5f 0%, #0f2d4a 60%, #1a3c2a 100%)"}}),e.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,height:60,background:"#1f2937"}}),e.jsx("div",{style:{position:"absolute",bottom:56,left:"38%",fontSize:34},children:"🧑"}),e.jsxs("div",{style:{position:"absolute",bottom:"28%",left:"48%",width:90,borderRadius:12,background:"#0d1b2e",border:"2px solid rgba(0,245,255,0.5)",overflow:"hidden",boxShadow:"0 0 24px rgba(0,245,255,0.35)"},children:[e.jsx("div",{style:{background:"rgba(0,245,255,0.15)",padding:"4px 6px"},children:e.jsx("div",{style:{fontFamily:m,fontSize:7,fontWeight:800,color:"#00f5ff"},children:"৩টি রুট পাওয়া গেছে"})}),[{route:"গ্রীন লাইন",fare:"৳৬০",time:"৪৮ মিনিট",c:"#10b981"},{route:"হানিফ",fare:"৳৭৫",time:"১ ঘন্টা",c:"#3b82f6"},{route:"বিআরটিসি",fare:"৳৪৫",time:"৫২ মিনিট",c:"#8b5cf6"}].map((r,s)=>e.jsxs("div",{style:{padding:"3px 6px",borderBottom:"1px solid rgba(255,255,255,0.06)",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{fontFamily:m,fontSize:7,color:"rgba(255,255,255,0.8)",fontWeight:600},children:r.route}),e.jsxs("div",{style:{display:"flex",gap:3},children:[e.jsx("span",{style:{fontFamily:m,fontSize:6,background:"rgba(34,197,94,0.15)",color:"#4ade80",borderRadius:3,padding:"1px 3px"},children:r.fare}),e.jsx("span",{style:{fontFamily:m,fontSize:6,color:"rgba(255,255,255,0.4)"},children:r.time})]})]},s))]})]},"s2"),e.jsxs("div",{className:"kj-story-scene",style:{position:"relative",width:"100%",height:"100%",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(180deg, #1e3a5f 0%, #0f2d4a 60%, #1a3c2a 100%)"}}),e.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,height:60,background:"#1f2937"}}),e.jsx("div",{style:{position:"absolute",bottom:56,left:"55%",fontSize:36,animation:"kjBobY 1.5s ease-in-out infinite"},children:"😊"}),e.jsx("div",{style:{position:"absolute",bottom:38,left:"10%",animation:"kjRollIn 1.2s cubic-bezier(.2,.7,.25,1) both"},children:e.jsx(Me,{size:90})}),e.jsx("div",{style:{position:"absolute",bottom:"65%",left:"26%",width:32,height:32,borderRadius:"50%",background:"#22c55e",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,animation:"kjPopIn 0.5s cubic-bezier(.2,.7,.25,1) both",animationDelay:"0.8s",opacity:0},children:"✓"}),["✨","🎉","⭐"].map((r,s)=>e.jsx("div",{style:{position:"absolute",fontSize:20,top:`${20+s*15}%`,left:`${60+s*8}%`,animation:`kjSpark ${1+s*.4}s ease-in-out infinite`,animationDelay:`${s*.3}s`},children:r},s))]},"s3")];return e.jsxs("div",{style:{borderRadius:22,overflow:"hidden",border:`1px solid ${a.line}`,background:a.panel},children:[e.jsx("div",{style:{height:260,position:"relative",background:"#0d1b2e"},children:i[t]}),e.jsxs("div",{style:{padding:"14px 18px",background:a.panel},children:[e.jsx("div",{style:{display:"flex",gap:6,marginBottom:12},children:[0,1,2,3].map(r=>e.jsx("div",{style:{flex:1,height:3,borderRadius:999,background:r===t?a.primary:a.line,transition:"background 0.4s ease",overflow:"hidden"},children:r===t&&e.jsx("div",{style:{height:"100%",background:a.primary,animation:"kjLoadBar 3.6s linear forwards",borderRadius:999}})},r))}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12},children:[e.jsx("p",{style:{margin:0,fontFamily:o==="bn"?m:c,fontSize:13,color:a.text,lineHeight:1.5,flex:1},children:o==="bn"?ba[t].bn:ba[t].en}),t===3&&e.jsx("button",{onClick:()=>d("bus-hub"),style:{background:a.primary,color:a.primaryInk,border:"none",borderRadius:999,padding:"7px 16px",fontFamily:o==="bn"?m:c,fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"},children:l(o,"এখনই চেষ্টা করুন","Try it now")})]})]})]})}const mn=["উত্তরা উত্তর","উত্তরা সেন্টার","পল্লবী","মিরপুর ১১","মিরপুর ১০","কাজীপাড়া","শেওড়াপাড়া","আগারগাঁও","বিজয় সরণি","ফার্মগেট","কারওয়ান বাজার","শাহবাগ","ঢাকা বিশ্ববিদ্যালয়","সচিবালয়","মতিঝিল"],Va=["Uttara North","Uttara Center","Pallabi","Mirpur 11","Mirpur 10","Kazipara","Shewrapara","Agargaon","Bijoy Sarani","Farmgate","Karwan Bazar","Shahbag","Dhaka Univ.","Secretariat","Motijheel"],xa=Va.length;function gn(){return e.jsxs("svg",{viewBox:"0 0 72 28",width:"72",height:"28",style:{display:"block",filter:"drop-shadow(0 0 6px rgba(96,165,250,0.8))"},children:[e.jsx("rect",{x:"1",y:"5",width:"70",height:"18",rx:"5",fill:"#1d4ed8"}),e.jsx("rect",{x:"1",y:"5",width:"70",height:"18",rx:"5",fill:"url(#mg)",opacity:"0.6"}),e.jsx("rect",{x:"1",y:"9",width:"70",height:"3",fill:"#3b82f6",opacity:"0.7"}),e.jsx("rect",{x:"5",y:"11",width:"12",height:"8",rx:"2",fill:"#bfdbfe",opacity:"0.9"}),e.jsx("rect",{x:"21",y:"11",width:"12",height:"8",rx:"2",fill:"#bfdbfe",opacity:"0.9"}),e.jsx("rect",{x:"37",y:"11",width:"12",height:"8",rx:"2",fill:"#bfdbfe",opacity:"0.9"}),e.jsx("rect",{x:"53",y:"11",width:"10",height:"8",rx:"2",fill:"#bfdbfe",opacity:"0.7"}),e.jsx("circle",{cx:"67",cy:"12",r:"2.5",fill:"#fde68a"}),e.jsx("circle",{cx:"67",cy:"20",r:"2.5",fill:"#fde68a"}),e.jsx("line",{x1:"20",y1:"5",x2:"15",y2:"1",stroke:"#94a3b8",strokeWidth:"1"}),e.jsx("line",{x1:"30",y1:"5",x2:"35",y2:"1",stroke:"#94a3b8",strokeWidth:"1"}),e.jsx("line",{x1:"15",y1:"1",x2:"35",y2:"1",stroke:"#94a3b8",strokeWidth:"1.5"}),e.jsx("circle",{cx:"14",cy:"24",r:"3.5",fill:"#1e3a8a",stroke:"#60a5fa",strokeWidth:"1"}),e.jsx("circle",{cx:"14",cy:"24",r:"1.2",fill:"#93c5fd"}),e.jsx("circle",{cx:"56",cy:"24",r:"3.5",fill:"#1e3a8a",stroke:"#60a5fa",strokeWidth:"1"}),e.jsx("circle",{cx:"56",cy:"24",r:"1.2",fill:"#93c5fd"}),e.jsx("defs",{children:e.jsxs("linearGradient",{id:"mg",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"0%",stopColor:"white",stopOpacity:"0.25"}),e.jsx("stop",{offset:"100%",stopColor:"white",stopOpacity:"0"})]})})]})}function fn({tk:a,lang:o,isMobile:d}){const[t,n]=b.useState(4),[i,r]=b.useState(2),[s,p]=b.useState(!0);b.useEffect(()=>{const f=setInterval(()=>{r(v=>v<=1?(p(!1),setTimeout(()=>{n(k=>(k+1)%xa),p(!0)},1200),4):v-1)},1e3);return()=>clearInterval(f)},[]);const h=t/(xa-1)*100,u=o==="bn"?mn:Va;return e.jsxs("div",{style:{background:a.metroBg,borderRadius:18,padding:d?"14px 14px":"18px 22px",border:"1px solid rgba(59,130,246,0.3)",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:-60,left:"30%",width:260,height:260,borderRadius:"50%",background:"radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",pointerEvents:"none"}}),e.jsxs("div",{style:{position:"relative",zIndex:1},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("span",{style:{background:"linear-gradient(135deg,#3b82f6,#1e3a8a)",borderRadius:8,padding:"4px 10px",fontFamily:c,fontSize:12,fontWeight:800,color:"white",letterSpacing:.5},children:"M6"}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx("span",{style:{width:7,height:7,borderRadius:"50%",background:"#22c55e",animation:"kjpulse 1.5s ease-in-out infinite",display:"inline-block"}}),e.jsx("span",{style:{fontFamily:c,fontSize:12,fontWeight:600,color:"#93c5fd"},children:l(o,"লাইভ · এমআরটি লাইন ৬","Live · MRT Line 6")})]}),e.jsx("div",{style:{fontFamily:o==="bn"?m:c,fontSize:11,color:"rgba(255,255,255,0.5)",marginTop:1},children:l(o,"উত্তরা উত্তর → মতিঝিল","Uttara North → Motijheel")})]})]}),e.jsxs("div",{style:{textAlign:"right",minWidth:72},children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,color:"rgba(255,255,255,0.4)"},children:l(o,"পরের ট্রেন","Next train")}),e.jsxs("div",{style:{fontFamily:c,fontSize:22,fontWeight:800,color:"#60a5fa",fontVariantNumeric:"tabular-nums",letterSpacing:"-0.5px"},children:[Y(i,o)," ",e.jsx("span",{style:{fontSize:14},children:l(o,"মিনিট","min")})]})]})]}),e.jsx("div",{style:{overflowX:"auto",paddingBottom:4},children:e.jsxs("div",{style:{minWidth:d?580:"100%",position:"relative",padding:"0 4px 28px"},children:[e.jsx("div",{style:{position:"absolute",top:6,left:4,right:4,height:1,background:"rgba(148,163,184,0.3)",zIndex:0}}),e.jsx("div",{style:{position:"absolute",top:26,left:4,right:4,height:5,borderRadius:999,background:"rgba(255,255,255,0.08)"}}),e.jsx("div",{style:{position:"absolute",top:26,left:4,width:`${h}%`,height:5,borderRadius:999,background:"linear-gradient(90deg,#1e40af,#60a5fa)",transition:"width 1.2s ease-in-out"}}),e.jsxs("div",{style:{position:"absolute",top:3,left:`calc(${h}% - 36px)`,transition:s?"left 1.2s cubic-bezier(.4,0,.2,1)":"none",zIndex:3,willChange:"left",contain:"layout style paint"},children:[e.jsx(gn,{}),!s&&e.jsx("div",{style:{position:"absolute",top:0,left:-20,width:20,height:28,background:"linear-gradient(90deg,transparent,rgba(59,130,246,0.3))",borderRadius:4}})]}),e.jsx("div",{style:{display:"flex",justifyContent:"space-between",position:"relative",zIndex:2,paddingTop:18},children:u.map((f,v)=>{const k=v<t,j=v===t;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flex:1,height:32},children:[e.jsx("div",{style:{width:1,height:8,background:k||j?"rgba(96,165,250,0.4)":"rgba(255,255,255,0.1)",flexShrink:0}}),e.jsx("div",{style:{width:12,height:12,borderRadius:"50%",flexShrink:0,background:j?"#60a5fa":k?"#3b82f6":"rgba(255,255,255,0.15)",border:j?"2px solid white":"2px solid transparent",boxShadow:j?"0 0 10px rgba(96,165,250,0.9)":"none",transition:"background 0.4s ease, box-shadow 0.4s ease"}}),e.jsx("span",{style:{fontFamily:o==="bn"?m:c,fontSize:8,fontWeight:700,color:"#93c5fd",whiteSpace:"nowrap",marginTop:2,visibility:j?"visible":"hidden",lineHeight:1},children:f})]},v)})})]})}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:d?12:24,flexWrap:"wrap",paddingTop:8,borderTop:"1px solid rgba(255,255,255,0.08)"},children:[{label:l(o,"ভাড়া","Fare"),value:"৳২০–১০০"},{label:l(o,"সময়","Hours"),value:"7:10AM – 9:40PM"},{label:"",value:l(o,"সময়মতো চলছে, বিলম্ব নেই","On time, no delays")}].map((f,v)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5},children:[f.label&&e.jsx("span",{style:{fontFamily:c,fontSize:10,color:"rgba(255,255,255,0.4)",fontWeight:500},children:f.label}),v===2&&e.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:"#22c55e",display:"inline-block"}}),e.jsx("span",{style:{fontFamily:o==="bn"?m:c,fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.75)"},children:f.value})]},v))})]})]})}function yn({tk:a,lang:o,isMobile:d,onNav:t}){const n=[a.primary,a.accent,a.amber,a.primaryDeep],r=Le().map(u=>pe.find(f=>f.id===u)).filter(Boolean),s=Ce(),p=Object.entries(s.mostUsedRoutes||{}).sort((u,f)=>f[1]-u[1]).slice(0,4).map(([u])=>{const[f,v]=u.split("-");return{from:f,to:v}});return r.length===0&&p.length===0?e.jsxs("div",{style:{background:a.panel,border:`1px solid ${a.line}`,borderRadius:16,padding:"24px 16px",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:32,marginBottom:8},children:"🔖"}),e.jsx("div",{style:{fontFamily:o==="bn"?m:c,fontSize:14,fontWeight:600,color:a.text,marginBottom:4},children:l(o,"কোনো সেভ করা রুট নেই","No saved routes yet")}),e.jsx("div",{style:{fontFamily:c,fontSize:12,color:a.textFaint},children:l(o,"বাস বিস্তারিতে ❤️ আইকন চাপুন সেভ করতে","Tap ❤️ on any bus detail page to save")})]}):e.jsxs("div",{style:{display:"grid",gridTemplateColumns:d?"none":"repeat(4, minmax(0, 1fr))",gap:12,overflowX:d?"auto":"hidden",paddingBottom:d?4:0,width:"100%"},children:[r.slice(0,4).map((u,f)=>e.jsxs("div",{onClick:()=>t("bus-detail",{busId:u.id}),style:{background:a.panel,border:`1px solid ${a.line}`,borderRadius:16,padding:"14px 16px",minWidth:d?180:0,flex:d?"0 0 auto":void 0,cursor:"pointer",display:"flex",flexDirection:"column",gap:6},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx("div",{style:{width:10,height:10,borderRadius:"50%",background:n[f%n.length],flexShrink:0}}),e.jsx("span",{style:{fontFamily:c,fontSize:10,fontWeight:700,color:n[f%n.length],textTransform:"uppercase",letterSpacing:.6},children:l(o,"প্রিয়","SAVED")})]}),e.jsx("div",{style:{fontFamily:o==="bn"?m:c,fontSize:13,fontWeight:600,color:a.text},children:o==="bn"?u.bnName:u.name}),e.jsx("div",{style:{fontFamily:c,fontSize:11,color:a.textFaint,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:u.routeString})]},u.id)),p.filter((u,f)=>f<4-Math.min(r.length,4)).map((u,f)=>e.jsxs("div",{onClick:()=>t("results",{from:u.from,to:u.to}),style:{background:a.panel,border:`1px solid ${a.line}`,borderRadius:16,padding:"14px 16px",minWidth:d?180:0,flex:d?"0 0 auto":void 0,cursor:"pointer",display:"flex",flexDirection:"column",gap:6},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx("div",{style:{width:10,height:10,borderRadius:"50%",background:n[(r.length+f)%n.length],flexShrink:0}}),e.jsx("span",{style:{fontFamily:c,fontSize:10,fontWeight:700,color:n[(r.length+f)%n.length],textTransform:"uppercase",letterSpacing:.6},children:l(o,"সাম্প্রতিক","RECENT")})]}),e.jsxs("div",{style:{fontFamily:c,fontSize:13,fontWeight:600,color:a.text},children:[u.from," → ",u.to]}),e.jsx("div",{style:{fontFamily:c,fontSize:11,color:a.textFaint},children:l(o,"সার্চ করা রুট","Searched route")})]},`route-${f}`))]})}function bn({tk:a,lang:o,onNav:d}){const t=Ce(),n=Object.entries(t.mostUsedBuses||{}).sort((u,f)=>f[1]-u[1]).slice(0,5).map(([u])=>u),i=[...pe].filter(u=>u.active!==!1&&u.stops.length>=6).sort((u,f)=>f.stops.length-u.stops.length).slice(0,5),r=new Set,s=[];for(const u of n){const f=pe.find(v=>v.id===u);f&&!r.has(f.id)&&(r.add(f.id),s.push(f))}for(const u of i)!r.has(u.id)&&s.length<5&&(r.add(u.id),s.push(u));const p=u=>u.type==="AC"?["#006a4e","#10b981"]:u.type==="Double-Decker"?["#1e3a8a","#3b82f6"]:u.type==="Local"?["#7c3aed","#a855f7"]:["#b45309","#f59e0b"],h=u=>u.type==="AC"?"৳60+":u.type==="Double-Decker"?"৳50":"৳25–40";return e.jsx("div",{style:{background:a.panel,border:`1px solid ${a.line}`,borderRadius:18,overflow:"hidden"},children:s.map((u,f)=>{const v=u.name.split(" ").map(z=>z[0]).join("").slice(0,2).toUpperCase(),[k,j]=p(u),A=n.includes(u.id);return e.jsxs("div",{onClick:()=>d("bus-detail",{busId:u.id}),style:{display:"flex",alignItems:"center",gap:12,padding:"13px 16px",borderBottom:f<s.length-1?`1px solid ${a.line}`:"none",cursor:"pointer",transition:"background 0.15s ease"},onMouseEnter:z=>{z.currentTarget.style.background=a.panelMuted},onMouseLeave:z=>{z.currentTarget.style.background="transparent"},children:[e.jsx("div",{style:{width:38,height:38,borderRadius:10,background:`linear-gradient(135deg,${k},${j})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:c,fontSize:11,fontWeight:800,color:"white",flexShrink:0},children:v}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,marginBottom:2},children:[e.jsx("span",{style:{fontFamily:o==="bn"?m:c,fontSize:13,fontWeight:600,color:a.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:o==="bn"?u.bnName:u.name}),u.type&&u.type!=="Local"&&e.jsx("span",{style:{fontFamily:c,fontSize:10,fontWeight:600,color:a.amber,background:a.amberSoft,borderRadius:5,padding:"1px 5px",whiteSpace:"nowrap"},children:u.type}),A&&e.jsx("span",{style:{fontFamily:c,fontSize:10,fontWeight:600,color:a.primary,background:a.primarySoft,borderRadius:5,padding:"1px 5px",whiteSpace:"nowrap"},children:l(o,"আপনার রুট","Your route")})]}),e.jsx("div",{style:{fontFamily:c,fontSize:11,color:a.textFaint,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:u.routeString})]}),e.jsxs("div",{style:{textAlign:"right",flexShrink:0},children:[e.jsx("div",{style:{fontFamily:o==="bn"?m:c,fontSize:13,fontWeight:700,color:a.text},children:h(u)}),e.jsxs("div",{style:{fontFamily:c,fontSize:10,color:a.textFaint},children:[Y(u.stops.length,o)," ",l(o,"স্টপ","stops")]})]}),e.jsx(te.arrowR,{s:16})]},u.id)})})}const xn=["How much to Cox's Bazar?","Airport → Farmgate","Sadarghat launch times"];function vn({tk:a,lang:o,onNav:d}){return e.jsxs("div",{onClick:()=>d("ai"),style:{background:"linear-gradient(135deg, #7c3aed, #5b21b6, #4338ca)",borderRadius:18,padding:"18px",cursor:"pointer",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",width:160,height:160,borderRadius:"50%",background:"rgba(255,255,255,0.07)",top:-50,right:-40,animation:"kjpulse 3.5s ease-in-out infinite",pointerEvents:"none"}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:10,position:"relative",zIndex:1},children:[e.jsx("div",{style:{width:34,height:34,borderRadius:10,background:"rgba(255,255,255,0.18)",display:"flex",alignItems:"center",justifyContent:"center",color:"white"},children:e.jsx(te.spark,{s:18})}),e.jsx("span",{style:{fontFamily:o==="bn"?m:c,fontSize:15,fontWeight:700,color:"white"},children:l(o,"AI সহায়ক","AI Assistant")}),e.jsx("span",{style:{background:"rgba(255,255,255,0.2)",color:"rgba(255,255,255,0.9)",borderRadius:999,padding:"2px 8px",fontFamily:c,fontSize:10,fontWeight:700},children:"Beta"})]}),e.jsx("p",{style:{margin:"0 0 12px",fontFamily:o==="bn"?m:c,fontSize:13,color:"rgba(255,255,255,0.8)",lineHeight:1.5,position:"relative",zIndex:1},children:l(o,"বাংলায় জিজ্ঞেস করুন — 'গুলশান থেকে মতিঝিল কোন বাস যায়?'","Ask in Bangla or English — 'Which bus goes from Gulshan to Motijheel?'")}),e.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12,position:"relative",zIndex:1},children:xn.map(t=>e.jsx("span",{style:{background:"rgba(255,255,255,0.14)",border:"1px solid rgba(255,255,255,0.22)",borderRadius:999,padding:"5px 11px",fontFamily:c,fontSize:11,color:"rgba(255,255,255,0.9)",cursor:"pointer"},children:t},t))}),e.jsxs("div",{style:{background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:12,padding:"10px 14px",display:"flex",alignItems:"center",gap:10,position:"relative",zIndex:1},children:[e.jsx("span",{style:{fontFamily:o==="bn"?m:c,fontSize:13,color:"rgba(255,255,255,0.4)",flex:1},children:l(o,"যেকোনো প্রশ্ন করুন...","Ask anything...")}),e.jsx("div",{style:{width:30,height:30,borderRadius:8,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",color:"white"},children:e.jsx(te.arrowR,{s:16})})]})]})}const jn=[{label:{bn:"পুলিশ",en:"Police"},number:"999",color:"accent"},{label:{bn:"অ্যাম্বুলেন্স",en:"Ambulance"},number:"199",color:"accent"},{label:{bn:"ফায়ার সার্ভিস",en:"Fire service"},number:"102",color:"amber"},{label:{bn:"হাইওয়ে",en:"Highway"},number:"+880-2",color:"primary"}];function kn({tk:a,lang:o}){const d=t=>t==="accent"?{bg:a.accentSoft,fg:a.accent}:t==="amber"?{bg:a.amberSoft,fg:a.amber}:{bg:a.primarySoft,fg:a.primary};return e.jsxs("div",{style:{background:a.panel,border:`1px solid ${a.line}`,borderRadius:18,padding:16},children:[e.jsxs("div",{style:{fontFamily:o==="bn"?m:c,fontSize:13,fontWeight:700,color:a.text,marginBottom:12,display:"flex",alignItems:"center",gap:6},children:[e.jsx(te.sos,{s:16}),l(o,"জরুরি নম্বর","Emergency Numbers")]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:jn.map((t,n)=>{const{bg:i,fg:r}=d(t.color);return e.jsxs("a",{href:`tel:${t.number}`,style:{background:i,border:`1px solid ${r}33`,borderRadius:12,padding:"10px 12px",display:"flex",flexDirection:"column",gap:3,textDecoration:"none",cursor:"pointer"},children:[e.jsx("span",{style:{fontFamily:o==="bn"?m:c,fontSize:11,color:r,fontWeight:600},children:l(o,t.label.bn,t.label.en)}),e.jsx("span",{style:{fontFamily:c,fontSize:18,fontWeight:800,color:r},children:t.number})]},n)})})]})}function Sn({tk:a,lang:o}){const d=[l(o,"এয়ারপোর্ট থেকে বাস","Bus from Airport"),l(o,"মতিঝিল রুট","Motijheel routes"),l(o,"ঢাকা-চট্টগ্রাম","Dhaka-Chittagong"),l(o,"গুলশান → বনানী","Gulshan → Banani"),l(o,"কক্সবাজার বাস","Cox's Bazar bus")];return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,overflowX:"auto",paddingBottom:2},children:[e.jsx("span",{style:{fontFamily:c,fontSize:10,fontWeight:600,color:a.textFaint,textTransform:"uppercase",letterSpacing:.5,whiteSpace:"nowrap",flexShrink:0},children:l(o,"স্পনসর","Sponsored")}),d.map((t,n)=>e.jsx("button",{style:{background:a.panelMuted,border:`1px solid ${a.line}`,borderRadius:999,padding:"6px 13px",fontFamily:o==="bn"?m:c,fontSize:12,fontWeight:500,color:a.textDim,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0},children:t},n))]})}function et({tk:a,lang:o,title:d,sub:t,action:n,onAction:i}){return e.jsxs("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:14},children:[e.jsxs("div",{children:[e.jsx("h2",{style:{margin:0,fontFamily:o==="bn"?m:c,fontSize:18,fontWeight:800,color:a.text,lineHeight:1.2},children:d}),t&&e.jsx("p",{style:{margin:"2px 0 0",fontFamily:c,fontSize:12,color:a.textFaint},children:t})]}),n&&i&&e.jsx("button",{onClick:i,style:{background:"none",border:`1px solid ${a.line}`,borderRadius:999,padding:"5px 12px",fontFamily:o==="bn"?m:c,fontSize:12,fontWeight:500,color:a.primary,cursor:"pointer"},children:n})]})}function wn({tk:a,lang:o}){return e.jsxs("div",{style:{background:a.panel,border:`1px solid ${a.line}`,borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,marginTop:12},children:[e.jsx("div",{style:{width:40,height:40,borderRadius:12,background:a.primarySoft,display:"flex",alignItems:"center",justifyContent:"center",color:a.primary,flexShrink:0},children:e.jsx(te.wifi,{s:20})}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:o==="bn"?m:c,fontSize:13,fontWeight:700,color:a.text,marginBottom:2},children:l(o,"অফলাইনেও কাজ করে","Works offline too")}),e.jsx("div",{style:{fontFamily:c,fontSize:11,color:a.textFaint},children:l(o,"PWA হিসেবে ইনস্টল করুন","Install as PWA")})]}),e.jsxs("button",{style:{background:a.primary,color:a.primaryInk,border:"none",borderRadius:10,padding:"6px 12px",fontFamily:o==="bn"?m:c,fontSize:11,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:5,flexShrink:0},children:[e.jsx(te.download,{s:13}),l(o,"ইনস্টল","Install")]})]})}function Bn({theme:a,device:o,lang:d,route:t,onNav:n,onBack:i,canBack:r,onLang:s,onTheme:p,onMenu:h}){const u=ae[a],f=o==="mobile",v=d==="bn"?m:c,[k,j]=b.useState("bus"),A={padding:f?"0 16px":"0 40px",boxSizing:"border-box",width:"100%",maxWidth:"100%",overflow:"hidden"};return e.jsxs("div",{className:"kj-screen",style:{minHeight:"100vh",background:u.pageBg,color:u.text,fontFamily:v,display:"flex",flexDirection:"column",position:"relative",overflowX:"hidden"},children:[e.jsx("div",{className:"kj-future-bg"}),e.jsx("div",{style:{height:f?52:60,flexShrink:0}}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:28,paddingBottom:f?80:32,paddingTop:24,position:"relative",zIndex:1},children:[e.jsxs("div",{style:A,children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:f?"1fr":"1.3fr 0.7fr",gap:20,alignItems:"start"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,minWidth:0,overflow:"hidden"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:10},children:e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:6,fontFamily:c,fontSize:11,fontWeight:700,letterSpacing:1.4,textTransform:"uppercase",color:u.textFaint},children:[e.jsx("span",{style:{width:6,height:6,borderRadius:999,background:u.accent,animation:"kjpulse 1.5s ease-in-out infinite",display:"inline-block"}}),l(d,"লাইভ আবহাওয়া ও ট্রাফিক চালু নেই","Live weather and traffic unavailable")]})}),e.jsx("h1",{style:{margin:"0 0 8px",fontFamily:m,fontSize:f?26:38,fontWeight:700,lineHeight:1.15,letterSpacing:d==="bn"?-.5:-1,color:u.text,wordBreak:"break-word",overflowWrap:"break-word",textWrap:"balance"},children:l(d,"কোথায় যেতে চান, মেজবাউর?","Where are you headed, Mejbaur?")}),e.jsx("p",{style:{margin:"0 0 0",fontFamily:m,fontSize:f?14:15,color:u.textDim,lineHeight:1.55,maxWidth:560,wordBreak:"break-word",textWrap:"pretty"},children:l(d,"২,৪০০+ ঢাকা লোকাল বাস, মেট্রো রেল ও বাংলাদেশের ৬৪ জেলার সব রুট — অফলাইনেও কাজ করে।","2,400+ Dhaka bus routes, Metro Rail and intercity travel across all 64 districts — works offline too.")})]}),e.jsx(cn,{tk:u,lang:d,isMobile:f,onNav:n,activeMode:k,setActiveMode:j})]}),!f&&e.jsxs("div",{style:{minWidth:0,overflow:"hidden"},children:[e.jsx(ma,{tk:u,height:280}),e.jsx(wn,{tk:u,lang:d})]})]}),f&&e.jsx("div",{style:{marginTop:20},children:e.jsx(ma,{tk:u,height:200})})]}),e.jsx("div",{style:{...A,display:"flex",justifyContent:"center"},children:e.jsx(ee,{tk:u,lang:d,kind:f?"mob-banner":"leaderboard"})}),e.jsxs("div",{style:A,children:[e.jsx(et,{tk:u,lang:d,title:l(d,"কী খুঁজছেন?","How are you traveling?")}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:f?"repeat(2, 1fr)":"repeat(auto-fill, minmax(160px, 1fr))",gap:12,minWidth:0,width:"100%"},children:hn.map(z=>e.jsx(pn,{tile:z,lang:d,onClick:()=>{if(z.route==="ai"){n(z.route);return}j(z.mode),window.scrollTo({top:0,behavior:"smooth"})}},z.route))})]}),e.jsx("div",{style:{...A,display:"flex",justifyContent:"center"},children:e.jsx(ee,{tk:u,lang:d,kind:f?"mob-banner":"leaderboard"})}),e.jsx("div",{style:A,children:e.jsx(Sn,{tk:u,lang:d})}),e.jsxs("div",{style:A,children:[e.jsx(et,{tk:u,lang:d,title:l(d,"KoyJabo কীভাবে কাজ করে?","How does KoyJabo work?")}),e.jsx(un,{tk:u,lang:d,onNav:n})]}),e.jsx("div",{style:{...A,display:"flex",justifyContent:"center"},children:e.jsx(ee,{tk:u,lang:d,kind:f?"mob-banner":"leaderboard"})}),e.jsxs("div",{style:A,children:[e.jsx(et,{tk:u,lang:d,title:l(d,"মেট্রো লাইভ","Metro Live"),action:l(d,"সব স্টেশন","All stations"),onAction:()=>n("metro-hub")}),e.jsx(fn,{tk:u,lang:d,isMobile:f})]}),e.jsxs("div",{style:A,children:[e.jsx(et,{tk:u,lang:d,title:l(d,"সেভ করা রুট","Saved routes"),action:l(d,"সব দেখুন","See all"),onAction:()=>n("favorites")}),e.jsx(yn,{tk:u,lang:d,isMobile:f,onNav:n})]}),e.jsx("div",{style:{...A,display:"flex",justifyContent:"center"},children:e.jsx(ee,{tk:u,lang:d,kind:f?"mob-banner":"leaderboard"})}),e.jsx("div",{style:A,children:e.jsxs("div",{style:{display:"grid",gridTemplateColumns:f?"1fr":"1fr 320px",gap:20,alignItems:"start"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:20,minWidth:0},children:[e.jsxs("div",{children:[e.jsx(et,{tk:u,lang:d,title:l(d,"জনপ্রিয় রুট","Popular routes"),action:l(d,"সব রুট","All routes"),onAction:()=>n("bus-hub")}),e.jsx(bn,{tk:u,lang:d,onNav:n})]}),e.jsx(vn,{tk:u,lang:d,onNav:n})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx(ee,{tk:u,lang:d,kind:"mid-rect"}),e.jsx(kn,{tk:u,lang:d})]})]})}),e.jsx("div",{style:A,children:e.jsx(nn,{tk:u,lang:d,isMobile:f})}),e.jsx(Ka,{tk:u,lang:d,isMobile:f,onNav:n})]}),f&&e.jsx("div",{style:{position:"fixed",bottom:64,left:"50%",transform:"translateX(-50%)",zIndex:6},children:e.jsx(ee,{tk:u,lang:d,kind:"anchor",sticky:!0})})]})}function ne({theme:a,device:o,lang:d,route:t,canBack:n,onNav:i,onBack:r,onLang:s,onTheme:p,onMenu:h,children:u}){const f=ae[a],v=o==="mobile";return e.jsxs("div",{style:{position:"relative",minHeight:"100vh",background:f.bg,color:f.text,fontFamily:d==="bn"?m:c},children:[e.jsx("div",{className:"kj-future-bg",style:{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",background:a==="dark"?`radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,245,255,0.07) 0%, transparent 70%),
                 radial-gradient(ellipse 60% 40% at 90% 80%, rgba(168,85,247,0.06) 0%, transparent 60%),
                 radial-gradient(ellipse 40% 50% at 10% 90%, rgba(255,42,109,0.04) 0%, transparent 60%)`:`radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,184,217,0.06) 0%, transparent 70%),
                 radial-gradient(ellipse 60% 40% at 90% 80%, rgba(168,85,247,0.04) 0%, transparent 60%)`}}),e.jsx("div",{style:{height:v?52:60,flexShrink:0}}),n&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",background:f.bg,borderBottom:`1px solid ${f.line}`,position:"sticky",top:v?52:60,zIndex:10},children:[e.jsx("button",{onClick:r,style:{width:36,height:36,borderRadius:10,border:`1px solid ${f.line}`,background:f.panel,color:f.text,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0},children:e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.4",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"m15 18-6-6 6-6"})})}),e.jsx("span",{style:{fontFamily:m,fontWeight:600,fontSize:15,color:f.text,flex:1},children:l(d,"পিছনে যান","Go back")})]}),e.jsx("main",{style:{position:"relative",zIndex:1},children:u}),!(v&&t==="ai")&&e.jsx(Ka,{tk:f,lang:d,isMobile:v,onNav:i})]})}function _e({tk:a,lang:o,title:d,action:t,onAction:n}){return e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8},children:[e.jsx("h2",{style:{margin:0,fontFamily:m,fontSize:18,fontWeight:700,color:a.text,lineHeight:1.3},children:d}),t&&n&&e.jsx("button",{onClick:n,style:{background:"none",border:"none",padding:"2px 0",cursor:"pointer",fontFamily:c,fontSize:12,fontWeight:600,color:a.primary,whiteSpace:"nowrap",flexShrink:0},children:t})]})}const Cn=(a,o)=>{switch(o){case"primary":return{background:a.primarySoft,color:a.primary};case"accent":return{background:a.accentSoft,color:a.accent};case"amber":return{background:a.amberSoft,color:a.amber};case"mute":default:return{background:a.panelMuted,color:a.textDim}}};function Ne({tk:a,children:o,tone:d="mute"}){const{background:t,color:n}=Cn(a,d);return e.jsx("span",{style:{display:"inline-flex",alignItems:"center",padding:"4px 8px",borderRadius:999,fontFamily:c,fontSize:11,fontWeight:600,letterSpacing:.3,textTransform:"uppercase",background:t,color:n,lineHeight:1},children:o})}function Tn({kind:a,size:o}){return a==="bus"?e.jsx(Me,{size:o}):a==="train"?e.jsx(Tt,{size:o}):a==="plane"?e.jsx(dt,{size:o}):e.jsx(ea,{size:o})}function ct({tk:a,isMobile:o,lang:d,kind:t,gradient:n,title:i,subtitle:r,stats:s}){return e.jsxs("div",{style:{borderRadius:24,overflow:"hidden",position:"relative",background:n,color:"#fff",padding:o?"18px 18px 0":"32px 32px 0",marginBottom:18,boxShadow:a.shadowLg,minHeight:o?240:280},children:[e.jsx("div",{style:{position:"absolute",right:-50,top:-60,width:240,height:240,borderRadius:999,background:"rgba(255,255,255,0.15)",animation:"kjpulse 3s ease-in-out infinite"}}),e.jsx("div",{style:{position:"absolute",left:"40%",bottom:-80,width:200,height:200,borderRadius:999,background:"rgba(255,255,255,0.08)"}}),e.jsxs("div",{style:{position:"relative",display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,flexWrap:"wrap"},children:[e.jsxs("div",{style:{flex:"1 1 240px",minWidth:0},children:[e.jsxs("span",{style:{fontFamily:c,fontSize:11,fontWeight:700,letterSpacing:1.4,opacity:.85,textTransform:"uppercase"},children:["✦ KoyJabo · ",t]}),e.jsx("h1",{style:{fontFamily:m,fontSize:o?26:38,fontWeight:700,margin:"6px 0 8px",letterSpacing:-.6,lineHeight:1.1},children:i}),e.jsx("p",{style:{fontFamily:m,fontSize:o?13:14,opacity:.92,lineHeight:1.55,margin:0,maxWidth:480},children:r}),e.jsx("div",{style:{display:"flex",gap:14,marginTop:18,flexWrap:"wrap",overflowX:"auto",scrollbarWidth:"none"},children:s.map((p,h)=>e.jsxs("div",{style:{minWidth:70,flexShrink:0},children:[e.jsx("div",{style:{fontFamily:c,fontWeight:800,fontSize:o?18:22,letterSpacing:-.4},children:p.v}),e.jsx("div",{style:{fontFamily:c,fontSize:9,fontWeight:700,letterSpacing:1.2,opacity:.85,textTransform:"uppercase",marginTop:2},children:p.l})]},h))})]}),e.jsx("div",{style:{flexShrink:0,alignSelf:"flex-end",marginBottom:o?-20:-10,overflow:"hidden"},children:e.jsx(Tn,{kind:t,size:o?160:280})})]})]})}const Qa="kj_coins";function ia(){try{const a=JSON.parse(localStorage.getItem(Qa)||"null");if(a)return a}catch{}return{balance:0,adFreeUntil:0,transactions:[],lastDailyBonus:"",claimedBonuses:[]}}function Xa(a){a.transactions.length>100&&(a.transactions=a.transactions.slice(-100)),localStorage.setItem(Qa,JSON.stringify(a))}function Fn(){return ia().adFreeUntil>Date.now()}function be(a,o){const d=ia();d.balance+=a,d.transactions.push({type:"earn",amount:a,reason:o,ts:Date.now()}),Xa(d)}function Dn(){const a=new Date().toISOString().slice(0,10),o=ia();return o.lastDailyBonus===a?!1:(o.balance+=10,o.lastDailyBonus=a,o.transactions.push({type:"earn",amount:10,reason:"Daily bonus",ts:Date.now()}),Xa(o),!0)}function An(a){return a==="AC"?"#7c3aed":a==="Local"?"#10b981":a==="Double-Decker"?"#3b82f6":"#f59e0b"}const Nn=[{b:"GL #6",t:"2 min",dist:"400 m",dir:"↗",col:"#10b981"},{b:"BRTC Double",t:"5 min",dist:"900 m",dir:"↗",col:"#3b82f6"},{b:"Hanif #11",t:"8 min",dist:"1.4 km",dir:"↗",col:"#ef4444"},{b:"Projapoti",t:"12 min",dist:"2.1 km",dir:"↘",col:"#f59e0b"}],Rn=[{l:"GL",n:"Green Line",c:"#10b981"},{l:"BR",n:"BRTC",c:"#3b82f6"},{l:"HF",n:"Hanif",c:"#ef4444"},{l:"SH",n:"Shyamoli",c:"#f59e0b"},{l:"PR",n:"Projapoti",c:"#7eb344"},{l:"AB",n:"Anabil",c:"#a855f7"}];function In(a){var J,R,N,$,X,Z;const{theme:o,device:d,lang:t,onNav:n}=a,i=ae[o],r=d==="mobile",s=(F=16)=>({background:i.panel,border:`1px solid ${i.line}`,borderRadius:16,padding:F}),[p,h]=b.useState(((J=a.params)==null?void 0:J.search)??""),[u,f]=b.useState(((R=a.params)==null?void 0:R.from)??""),[v,k]=b.useState(((N=a.params)==null?void 0:N.to)??""),[j,A]=b.useState(!!(($=a.params)!=null&&$.from||(X=a.params)!=null&&X.to||(Z=a.params)!=null&&Z.search)),[z,C]=b.useState(!1),[I,w]=b.useState(!1),D=b.useRef(null),B=b.useRef(null),{suggestions:H}=Re(u,{limit:20,categories:["bus_stop","railway_station","ferry_terminal"]}),{suggestions:U}=Re(v,{limit:20,categories:["bus_stop","railway_station","ferry_terminal"]}),q=(F,x)=>x==="from"?H:U,P=F=>F.toLowerCase().replace(/[\s\-\.]/g,""),W=(F,x)=>{if(!x.trim())return!0;const y=x.toLowerCase(),g=P(x);return F.routeString.toLowerCase().includes(y)||F.name.toLowerCase().includes(y)||F.bnName.includes(y)||F.stops.some(T=>T.toLowerCase().includes(g)||T.toLowerCase().includes(y))},M=b.useMemo(()=>{const F=p.trim().toLowerCase(),x=u.trim(),y=v.trim();if(F)return pe.filter(g=>g.name.toLowerCase().includes(F)||g.bnName.toLowerCase().includes(F)||g.routeString.toLowerCase().includes(F)||g.type.toLowerCase().includes(F)||g.stops.some(T=>T.toLowerCase().includes(P(F)))).slice(0,20);if(!j)return pe.filter(g=>g.active!==!1&&g.name.length>3).slice(0,10);if(x&&y){const g=pe.filter(T=>W(T,x)&&W(T,y)).slice(0,20);if(g.length)return g}return x?pe.filter(g=>W(g,x)).slice(0,15):y?pe.filter(g=>W(g,y)).slice(0,15):pe.filter(g=>g.active!==!1&&g.name.length>3).slice(0,10)},[p,u,v,j]),[E,_]=b.useState("buses"),L=[{id:1,total:"52 min",fare:"৳ 30",from:l(t,"গুলশান ২","Gulshan 2"),to:l(t,"মতিঝিল","Motijheel"),legs:[{kind:"walk",label:l(t,"হাঁটুন","Walk"),from:l(t,"গুলশান ২","Gulshan 2"),to:l(t,"গুলশান ১ স্টপ","Gulshan 1 stop"),min:3,col:"#6b7280"},{kind:"bus",label:"GL-5",from:l(t,"গুলশান ১","Gulshan 1"),to:l(t,"ফার্মগেট","Farmgate"),min:28,col:"#10b981",detail:l(t,"গ্রীন লাইন · ৳১৫","Green Line · ৳15")},{kind:"walk",label:l(t,"হাঁটুন","Walk"),from:l(t,"ফার্মগেট","Farmgate"),to:l(t,"ফার্মগেট বাস স্টপ","Farmgate bus stop"),min:3,col:"#6b7280"},{kind:"bus",label:"BRTC-8",from:l(t,"ফার্মগেট","Farmgate"),to:l(t,"মতিঝিল","Motijheel"),min:18,col:"#3b82f6",detail:l(t,"BRTC দোতলা · ৳১৫","BRTC Double · ৳15")}]},{id:2,total:"38 min",fare:"৳ 50",from:l(t,"ফার্মগেট","Farmgate"),to:l(t,"মিরপুর ১০","Mirpur 10"),legs:[{kind:"walk",label:l(t,"হাঁটুন","Walk"),from:l(t,"ফার্মগেট","Farmgate"),to:l(t,"ফার্মগেট মেট্রো","Farmgate Metro"),min:4,col:"#6b7280"},{kind:"metro",label:l(t,"মেট্রো MRT-6","Metro MRT-6"),from:l(t,"ফার্মগেট","Farmgate"),to:l(t,"মিরপুর ১০","Mirpur 10"),min:22,col:"#6d28d9",detail:l(t,"MRT লাইন ৬ · ৳৩০","MRT Line 6 · ৳30")},{kind:"walk",label:l(t,"হাঁটুন","Walk"),from:l(t,"মিরপুর ১০ স্টেশন","Mirpur 10 station"),to:l(t,"মিরপুর ১০","Mirpur 10"),min:4,col:"#6b7280"}]},{id:3,total:"65 min",fare:"৳ 25",from:l(t,"ধানমন্ডি","Dhanmondi"),to:l(t,"উত্তরা","Uttara"),legs:[{kind:"bus",label:"SH-7",from:l(t,"ধানমন্ডি","Dhanmondi"),to:l(t,"বিমানবন্দর রোড","Airport Road"),min:40,col:"#f59e0b",detail:l(t,"শ্যামলী · ৳২৫","Shyamoli · ৳25")},{kind:"walk",label:l(t,"হাঁটুন","Walk"),from:l(t,"বিমানবন্দর রোড","Airport Road"),to:l(t,"উত্তরা","Uttara"),min:5,col:"#6b7280"}]}];return e.jsx(ne,{...a,children:e.jsxs("div",{style:{padding:r?"0 0 80px":"0 0 48px"},children:[e.jsx(ct,{tk:i,isMobile:r,lang:t,kind:"bus",gradient:"linear-gradient(135deg, #006a4e 0%, #10b981 60%, #fbbf24 100%)",title:l(t,"ঢাকার সব বাস · এক অ্যাপে","Every Dhaka bus · in one app"),subtitle:l(t,"২,৪১২টি লাইভ রুট, ১,০০০+ স্টপ, ১৪০+ অপারেটর — অফলাইনেও কাজ করে।","2,412 live routes, 1,000+ stops, 140+ operators — works offline too."),stats:[{v:Y("2,412",t),l:l(t,"রুট","Routes")},{v:Y("1,043",t),l:l(t,"স্টপ","Stops")},{v:Y(140,t)+"+",l:l(t,"অপারেটর","Operators")},{v:"★ "+Y("4.4",t),l:l(t,"গড় রেটিং","Avg rating")}]}),e.jsxs("div",{style:{padding:r?"0 16px":"0 40px"},children:[e.jsxs("div",{style:{...s(16),marginBottom:18,boxShadow:i.shadow},children:[e.jsxs("div",{style:{background:i.inputBg,border:`1px solid ${i.line}`,borderRadius:14,padding:"12px 14px",display:"flex",alignItems:"center",gap:12,marginBottom:12},children:[e.jsx("div",{style:{width:28,height:28,borderRadius:8,background:`linear-gradient(135deg,${i.primary},${i.primaryDeep})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},className:"kj-anim-glow",children:e.jsx(te.search,{s:14})}),e.jsx("input",{value:p,onChange:F=>h(F.target.value),placeholder:l(t,"যেমন: গ্রীন লাইন, রাইদা ৭, BRTC দোতলা, রুট ৬...","e.g. Green Line, Raida #7, BRTC Double, Route 6..."),style:{flex:1,background:"transparent",border:"none",outline:"none",fontFamily:m,fontSize:14,color:i.text}})]}),e.jsx("div",{style:{display:"flex",gap:6,marginBottom:12},children:[{l:l(t,"নাম","Name"),on:!0},{l:l(t,"রুট","Route")},{l:l(t,"অপারেটর","Operator")}].map((F,x)=>e.jsx("button",{style:{...ye(i),background:F.on?i.primarySoft:i.panelMuted,color:F.on?i.primary:i.textDim,borderColor:F.on?i.primary:i.line,fontWeight:F.on?700:500},children:F.l},x))}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:r?"1fr":"1fr 1fr auto",gap:10},children:[e.jsxs("div",{ref:D,style:{background:i.inputBg,border:`1px solid ${z?i.primary:i.line}`,borderRadius:14,padding:"10px 14px",display:"flex",alignItems:"center",gap:12,transition:"border-color 0.15s"},children:[e.jsx("div",{style:{width:28,height:28,borderRadius:8,background:i.primarySoft,color:i.primaryDeep,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:e.jsx(te.pin,{s:16})}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:c,fontSize:10,fontWeight:600,color:i.textFaint,textTransform:"uppercase",letterSpacing:1.2},children:l(t,"কোথা থেকে","From")}),e.jsx("input",{value:u,onChange:F=>f(F.target.value),onFocus:()=>C(!0),onBlur:()=>setTimeout(()=>C(!1),150),placeholder:l(t,"গুলশান ১","Gulshan 1"),style:{background:"transparent",border:"none",outline:"none",fontFamily:m,fontSize:15,fontWeight:600,color:i.text,marginTop:2,width:"100%"}})]})]}),z&&e.jsx(ue,{suggestions:q(u,"from"),onSelect:F=>{f(F.label),C(!1)},onDismiss:()=>C(!1),tk:i,lang:t,anchorRef:D}),e.jsxs("div",{ref:B,style:{background:i.inputBg,border:`1px solid ${I?i.accent:i.line}`,borderRadius:14,padding:"10px 14px",display:"flex",alignItems:"center",gap:12,transition:"border-color 0.15s"},children:[e.jsx("div",{style:{width:28,height:28,borderRadius:8,background:i.accentSoft,color:i.accent,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:e.jsx(te.flag,{s:16})}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:c,fontSize:10,fontWeight:600,color:i.textFaint,textTransform:"uppercase",letterSpacing:1.2},children:l(t,"কোথায়","To")}),e.jsx("input",{value:v,onChange:F=>k(F.target.value),onFocus:()=>w(!0),onBlur:()=>setTimeout(()=>w(!1),150),placeholder:l(t,"মতিঝিল","Motijheel"),style:{background:"transparent",border:"none",outline:"none",fontFamily:m,fontSize:15,fontWeight:600,color:i.text,marginTop:2,width:"100%"}})]})]}),I&&e.jsx(ue,{suggestions:q(v,"to"),onSelect:F=>{k(F.label),w(!1)},onDismiss:()=>w(!1),tk:i,lang:t,anchorRef:B}),e.jsxs("button",{onClick:()=>{(u||v)&&ln(u,v),A(!0),n("results",{from:u,to:v,search:p})},style:{background:`linear-gradient(135deg,${i.primary},${i.primaryDeep})`,color:i.primaryInk,border:0,borderRadius:14,padding:r?"12px 16px":"0 22px",fontFamily:c,fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,minHeight:r?48:"auto",boxShadow:`0 8px 22px -10px ${i.primary}`},children:[e.jsx(te.search,{s:16}),l(t,"বাস খুঁজুন","Find bus")]})]}),e.jsx("div",{style:{display:"flex",gap:6,marginTop:12,flexWrap:"wrap"},children:[{l:"⚡ "+l(t,"দ্রুততম","Fastest"),on:!0},{l:"৳ "+l(t,"সস্তা","Cheapest")},{l:"❄️ AC"},{l:"🚻 "+l(t,"টয়লেট","Toilet")},{l:"👥 "+l(t,"কম ভিড়","Less crowd")}].map((F,x)=>e.jsx("button",{style:{...ye(i),background:F.on?i.text:i.panelMuted,color:F.on?i.bg:i.text,borderColor:F.on?i.text:i.line,fontWeight:F.on?700:500},children:F.l},x))})]}),e.jsx("div",{style:{display:"flex",gap:6,marginBottom:16},children:[{k:"buses",bn:"🚌 বাস রুট",en:"🚌 Bus routes"},{k:"transit",bn:"🔀 ট্রানজিট",en:"🔀 Transit"}].map(F=>e.jsx("button",{onClick:()=>_(F.k),style:{...ye(i),background:E===F.k?i.primary:i.panelMuted,color:E===F.k?i.primaryInk:i.text,borderColor:E===F.k?i.primary:i.line,fontWeight:E===F.k?700:500,padding:"8px 16px",fontSize:13},children:l(t,F.bn,F.en)},F.k))}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:r?"1fr":"1.4fr 1fr",gap:r?18:24},children:[e.jsx("div",{children:E==="buses"?e.jsxs(e.Fragment,{children:[e.jsx(_e,{tk:i,lang:t,title:j&&(p||u||v)?l(t,`${Y(M.length,t)}টি রুট পাওয়া গেছে`,`${Y(M.length,t)} routes found`):l(t,"জনপ্রিয় বাস রুট","Popular bus routes"),action:l(t,"সব দেখুন","See all")}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[M.length===0&&e.jsx("div",{style:{fontFamily:m,fontSize:13,color:i.textFaint,padding:"12px 0",textAlign:"center"},children:l(t,"কোনো রুট পাওয়া যায়নি","No routes found")}),M.map((F,x)=>{const y=An(F.type),g=F.name.split(" ").map(T=>T[0]).join("").slice(0,2).toUpperCase();return e.jsxs("div",{onClick:()=>{Ya(F.id,F.name),n("bus-detail",{busId:F.id,from:u,to:v})},style:{...s(14),display:"flex",alignItems:"center",gap:12,cursor:"pointer"},children:[e.jsx("div",{style:{width:44,height:44,borderRadius:12,flexShrink:0,background:`linear-gradient(135deg,${y}cc,${y})`,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:c,fontWeight:800,fontSize:13},children:g}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"},children:[e.jsx("span",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:i.text},children:t==="bn"?F.bnName:F.name}),F.type==="AC"&&e.jsx(Ne,{tk:i,tone:"primary",children:"AC"})]}),e.jsx("div",{style:{fontFamily:m,fontSize:12,color:i.textDim,marginTop:2},children:F.routeString}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,marginTop:4},children:[e.jsx("span",{style:{fontFamily:c,fontSize:10,color:i.textFaint},children:F.type}),F.hours&&e.jsxs("span",{style:{fontFamily:c,fontSize:10,color:i.textFaint},children:["· ",F.hours]})]})]}),e.jsx("div",{style:{textAlign:"right",flexShrink:0},children:e.jsx(te.arrowR,{s:14})})]},F.id||x)})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(_e,{tk:i,lang:t,title:l(t,"ট্রানজিট রুট · মাল্টি-লেগ যাত্রা","Transit routes · multi-leg journey"),action:""}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:14},children:L.map(F=>e.jsxs("div",{style:{...s(16),cursor:"pointer"},onClick:()=>{be(5,"Transit search"),n("results",{from:u||F.from,to:v||F.to})},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:i.text},children:[F.from," → ",F.to]}),e.jsxs("div",{style:{display:"flex",gap:10,marginTop:4},children:[e.jsxs("span",{style:{fontFamily:c,fontWeight:700,fontSize:12,color:i.primary},children:["⏱ ",F.total]}),e.jsxs("span",{style:{fontFamily:c,fontWeight:700,fontSize:12,color:"#10b981"},children:["৳ ",F.fare.replace("৳ ","")]})]})]}),e.jsxs("div",{style:{fontFamily:c,fontWeight:700,fontSize:11,color:i.textFaint},children:[F.legs.length," ",l(t,"লেগ","legs")]})]}),e.jsx("div",{style:{position:"relative"},children:F.legs.map((x,y)=>e.jsxs("div",{style:{display:"flex",gap:12,paddingBottom:(y<F.legs.length-1,0)},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",width:20,flexShrink:0},children:[e.jsx("div",{style:{width:12,height:12,borderRadius:999,background:x.col,border:`2px solid ${i.bg}`,boxShadow:`0 0 0 2px ${x.col}`,zIndex:1,marginTop:3,flexShrink:0}}),y<F.legs.length-1&&e.jsx("div",{style:{width:2,flex:1,background:`${x.col}44`,minHeight:20,marginTop:2}})]}),e.jsxs("div",{style:{flex:1,paddingBottom:12},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:2},children:[e.jsx("span",{style:{fontSize:13},children:x.kind==="walk"?"🚶":x.kind==="metro"?"🚇":"🚌"}),e.jsx("span",{style:{fontFamily:c,fontWeight:700,fontSize:13,color:x.col},children:x.label}),e.jsxs("span",{style:{fontFamily:c,fontSize:11,color:i.textFaint,marginLeft:"auto"},children:[x.min," ",l(t,"মিনিট","min")]})]}),e.jsxs("div",{style:{fontFamily:m,fontSize:12,color:i.textDim},children:[x.from," → ",x.to]}),x.detail&&e.jsx("div",{style:{fontFamily:c,fontSize:11,color:i.textFaint,marginTop:2},children:x.detail})]})]},y))}),e.jsx("div",{style:{borderTop:`1px dashed ${i.line}`,paddingTop:10,display:"flex",justifyContent:"flex-end"},children:e.jsxs("button",{style:{background:i.primarySoft,color:i.primary,border:`1px solid ${i.primary}`,borderRadius:8,padding:"6px 14px",fontFamily:c,fontWeight:700,fontSize:12,cursor:"pointer"},children:[l(t,"রুট দেখুন","View route")," →"]})})]},F.id))})]})}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[e.jsxs("div",{style:s(16),children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:12},children:[e.jsx("span",{style:{width:10,height:10,borderRadius:999,background:i.primary},className:"kj-anim-pulse"}),e.jsx("span",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:i.text,flex:1},children:l(t,"কাছাকাছি বাস · লাইভ","Buses near you · live")}),e.jsx("span",{style:{fontFamily:c,fontSize:11,color:i.textFaint,fontWeight:600},children:l(t,"ফার্মগেট","Farmgate")})]}),Nn.map((F,x)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderTop:x?`1px dashed ${i.line}`:""},children:[e.jsx("div",{style:{width:8,height:8,borderRadius:999,background:F.col,boxShadow:`0 0 0 4px ${F.col}22`}}),e.jsx("span",{style:{fontFamily:c,fontWeight:700,fontSize:12,color:i.text,flex:1},children:F.b}),e.jsxs("span",{style:{fontFamily:c,fontSize:11,color:i.textFaint},children:[F.dist," ",F.dir]}),e.jsx("span",{style:{fontFamily:c,fontWeight:700,fontSize:13,color:i.primary,minWidth:50,textAlign:"right"},children:F.t})]},x)),e.jsxs("button",{style:{marginTop:8,width:"100%",background:"transparent",border:`1px solid ${i.line}`,borderRadius:10,padding:8,fontFamily:c,fontSize:12,fontWeight:700,color:i.text,cursor:"pointer"},children:[l(t,"ম্যাপে সব দেখুন","View all on map")," →"]})]}),e.jsx(ee,{tk:i,lang:t,kind:r?"mob-banner":"mid-rect"}),e.jsxs("div",{style:s(14),children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:13,color:i.text,marginBottom:10},children:l(t,"শীর্ষ অপারেটর","Top operators")}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6},children:Rn.map((F,x)=>e.jsxs("div",{style:{background:`${F.c}22`,borderRadius:10,padding:"10px 8px",textAlign:"center",cursor:"pointer"},children:[e.jsx("div",{style:{fontFamily:c,fontWeight:800,fontSize:13,color:F.c},children:F.l}),e.jsx("div",{style:{fontFamily:c,fontSize:9,color:i.textFaint,marginTop:2,fontWeight:600},children:F.n})]},x))})]})]})]}),e.jsx(ee,{tk:i,lang:t,kind:r?"mob-banner":"leaderboard"})]})]})})}const va=Ti.mrt_6,Ue=va?va.stations.map((a,o)=>{const d=kt[a],t=o===0?0:Math.min(20+Math.floor(o/2)*10,100);return{id:a,bn:(d==null?void 0:d.bnName)??a,en:((d==null?void 0:d.name)??a).replace(" Metro Station",""),fare:t,desc:(d==null?void 0:d.description)??"",lat:d==null?void 0:d.lat,lng:d==null?void 0:d.lng}}):[{id:"uttara-north",bn:"উত্তরা উত্তর",en:"Uttara North",fare:0,desc:"",lat:23.8759,lng:90.3795},{id:"uttara-center",bn:"উত্তরা কেন্দ্র",en:"Uttara Center",fare:20,desc:"",lat:23.8706,lng:90.3842},{id:"uttara-south",bn:"উত্তরা দক্ষিণ",en:"Uttara South",fare:20,desc:"",lat:23.8631,lng:90.3891},{id:"pallabi",bn:"পল্লবী",en:"Pallabi",fare:30,desc:"",lat:23.8268,lng:90.3654},{id:"mirpur-11",bn:"মিরপুর ১১",en:"Mirpur 11",fare:40,desc:"",lat:23.819,lng:90.3659},{id:"mirpur-10",bn:"মিরপুর ১০",en:"Mirpur 10",fare:50,desc:"",lat:23.8067,lng:90.3686},{id:"kazipara",bn:"কাজীপাড়া",en:"Kazipara",fare:60,desc:"",lat:23.7981,lng:90.3712},{id:"shewrapara",bn:"শেওড়াপাড়া",en:"Shewrapara",fare:60,desc:"",lat:23.7904,lng:90.3752},{id:"agargaon",bn:"আগারগাঁও",en:"Agargaon",fare:70,desc:"",lat:23.7783,lng:90.3808},{id:"bijoy-sarani",bn:"বিজয় সরণি",en:"Bijoy Sarani",fare:80,desc:"",lat:23.7668,lng:90.3869},{id:"farmgate",bn:"ফার্মগেট",en:"Farmgate",fare:80,desc:"",lat:23.7573,lng:90.3896},{id:"karwan-bazar",bn:"কারওয়ান বাজার",en:"Karwan Bazar",fare:90,desc:"",lat:23.7516,lng:90.393},{id:"shahbagh",bn:"শাহবাগ",en:"Shahbagh",fare:90,desc:"",lat:23.7384,lng:90.3957},{id:"du",bn:"ঢাবি",en:"DU",fare:90,desc:"",lat:23.7337,lng:90.3939},{id:"secretariat",bn:"সচিবালয়",en:"Secretariat",fare:100,desc:"",lat:23.7297,lng:90.4069},{id:"motijheel",bn:"মতিঝিল",en:"Motijheel",fare:100,desc:"",lat:23.733,lng:90.4172},{id:"kamalapur",bn:"কমলাপুর",en:"Kamalapur",fare:100,desc:"",lat:23.732,lng:90.4262}];function zn(a,o){const t=(o.lat-a.lat)*Math.PI/180,n=(o.lng-a.lng)*Math.PI/180,i=a.lat*Math.PI/180,r=o.lat*Math.PI/180,s=Math.sin(t/2)**2+Math.cos(i)*Math.cos(r)*Math.sin(n/2)**2;return 6371*2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s))}function Mn(a){const{theme:o,device:d,lang:t,onNav:n}=a,i=ae[o],r=d==="mobile",s=(L=16)=>({background:i.panel,border:`1px solid ${i.line}`,borderRadius:16,padding:L}),[p,h]=b.useState(""),[u,f]=b.useState(""),[v,k]=b.useState(!1),[j,A]=b.useState(!1),[z,C]=b.useState(!1),[I,w]=b.useState(null),[D,B]=b.useState("checking"),H=b.useRef(null),U=b.useRef(null),q=b.useMemo(()=>Ue.map(L=>({id:L.en,label:L.en,sub:L.bn+(L.fare>0?` · ৳${L.fare}`:" · Start")})),[]);b.useEffect(()=>{if(!navigator.geolocation){B("unsupported");return}localStorage.getItem("kj-location-consent")==="yes"&&navigator.geolocation.getCurrentPosition(L=>{w({lat:L.coords.latitude,lng:L.coords.longitude}),B("ready")},()=>B("blocked"),{enableHighAccuracy:!0,timeout:9e3,maximumAge:3e5})},[]);const P=b.useMemo(()=>I?Ue.filter(L=>typeof L.lat=="number"&&typeof L.lng=="number").map((L,J)=>({...L,index:J,distance:zn(I,{lat:L.lat,lng:L.lng})})).sort((L,J)=>L.distance-J.distance)[0]??null:null,[I]),W=L=>{if(!L.trim())return q;const J=L.toLowerCase();return q.filter(R=>R.label.toLowerCase().includes(J)||(R.sub??"").toLowerCase().includes(J))},M=b.useMemo(()=>{const L=Ue.findIndex($=>$.en.toLowerCase()===p.toLowerCase()),J=Ue.findIndex($=>$.en.toLowerCase()===u.toLowerCase());if(L<0||J<0||L===J)return null;const R=Math.abs(L-J);return{fare:Math.min(20+Math.floor(R/2)*10,100),stops:R}},[p,u]),E=P?l(t,P.bn,P.en):l(t,"নিকটতম স্টেশন","nearest station"),_=P?P.distance<1?`${Math.round(P.distance*1e3)} m`:`${P.distance.toFixed(1)} km`:"";return e.jsx(ne,{...a,children:e.jsxs("div",{style:{padding:r?"0 0 80px":"0 0 48px"},children:[e.jsx(ct,{tk:i,isMobile:r,lang:t,kind:"train",gradient:"linear-gradient(135deg, #00130e 0%, #00543c 50%, #10b981 100%)",title:l(t,"ঢাকা মেট্রো · MRT-6 লাইভ","Dhaka Metro · MRT-6 live"),subtitle:l(t,"উত্তরা থেকে কমলাপুর পর্যন্ত ১৭টি স্টেশন · প্রতি ৮ মিনিটে ট্রেন · ৪৫ মিনিটে পুরো লাইন।","17 stations from Uttara to Kamalapur · trains every 8 min · 45 min end-to-end."),stats:[{v:Y(17,t),l:l(t,"স্টেশন","Stations")},{v:Y(8,t)+" min",l:l(t,"ফ্রিকোয়েন্সি","Frequency")},{v:"৳ "+Y("20",t)+"-"+Y(100,t),l:l(t,"ভাড়া","Fare range")},{v:Y("7",t)+"am–"+Y(9,t)+"pm",l:l(t,"চলমান","Operating")}]}),e.jsxs("div",{style:{padding:r?"0 16px":"0 40px"},children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:r?"1fr":"1.4fr 1fr",gap:14,marginBottom:18},children:[e.jsxs("div",{style:{background:"linear-gradient(135deg,#00130e,#00543c)",borderRadius:18,padding:20,color:"#fff",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",right:-40,top:-40,width:160,height:160,borderRadius:999,background:"rgba(16,185,129,0.25)"},className:"kj-anim-pulse"}),e.jsxs("div",{style:{fontFamily:c,fontSize:11,fontWeight:700,letterSpacing:1.4,color:"rgba(255,255,255,0.7)",textTransform:"uppercase",marginBottom:8},children:[l(t,"পরবর্তী ট্রেন","Next train")," · ",E]}),e.jsx("div",{style:{fontFamily:c,fontWeight:800,fontSize:r?48:56,color:"#fff",letterSpacing:-2,lineHeight:1},children:Y("2:15",t)}),e.jsx("div",{style:{fontFamily:m,fontSize:13,color:"rgba(255,255,255,0.7)",marginTop:6},children:l(t,"উত্তরা উত্তর → মতিঝিল","Uttara North → Motijheel")}),e.jsx("div",{style:{display:"flex",gap:12,marginTop:14},children:[{l:l(t,"পরের ট্রেন","After"),v:Y("10:08",t)},{l:l(t,"তার পর","Then"),v:Y("10:16",t)}].map((L,J)=>e.jsxs("div",{style:{background:"rgba(255,255,255,0.12)",borderRadius:10,padding:"8px 12px"},children:[e.jsx("div",{style:{fontFamily:c,fontSize:9,fontWeight:700,color:"rgba(255,255,255,0.6)",textTransform:"uppercase",letterSpacing:1},children:L.l}),e.jsx("div",{style:{fontFamily:c,fontWeight:800,fontSize:14,color:"#fff"},children:L.v})]},J))})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[{bg:`linear-gradient(135deg,${i.primary},${i.primaryDeep})`,ink:i.primaryInk,label:l(t,"একক যাত্রা টোকেন","Single journey token"),route:"metro-token",sub:l(t,"৳ ২০ – ১০০","৳ "+Y(20,t)+" – "+Y(100,t))},{bg:"linear-gradient(135deg,#7c3aed,#5b21b6)",ink:"#fff",label:l(t,"র‍্যাপিড পাস","MRT Rapid Pass"),route:"metro-pass",sub:l(t,"১০% ছাড়","10% discount")}].map((L,J)=>e.jsxs("button",{onClick:()=>n(L.route),style:{background:L.bg,color:L.ink,border:0,borderRadius:14,padding:"14px 18px",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:14},children:L.label}),e.jsx("div",{style:{fontFamily:c,fontSize:12,opacity:.85,marginTop:2},children:L.sub})]}),e.jsx(te.arrowR,{s:18})]},J))})]}),e.jsxs("div",{style:{...s(18),marginBottom:18,overflowX:"auto"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,marginBottom:14,flexWrap:"wrap"},children:[e.jsxs("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:i.text},children:[l(t,"স্টেশন মানচিত্র","Station map")," · MRT-6"]}),e.jsx("div",{style:{fontFamily:m,fontSize:12,color:P?i.primary:i.textFaint,background:P?i.primarySoft:i.panelMuted,border:`1px solid ${P?i.primary:i.line}`,borderRadius:999,padding:"5px 10px",whiteSpace:"nowrap"},children:P?l(t,`নিকটতম: ${P.bn} · ${_}`,`Nearest: ${P.en} · ${_}`):D==="checking"?l(t,"লোকেশন দেখা হচ্ছে...","Checking location..."):D==="unsupported"?l(t,"এই ব্রাউজারে লোকেশন নেই","Location is not supported"):l(t,"লোকেশন অনুমতি দিলে নিকটতম স্টেশন দেখাবে","Allow location to mark nearest station")})]}),e.jsx("div",{style:{display:"flex",alignItems:"flex-start",gap:0,minWidth:r?600:"auto",paddingBottom:8},children:Ue.map((L,J)=>{const R=(P==null?void 0:P.index)??-1,N=R>=0&&J<R,$=J===R;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flex:1,minWidth:0,position:"relative"},children:[J<Ue.length-1&&e.jsx("div",{style:{position:"absolute",top:8,left:"50%",right:"-50%",height:3,background:N||$?i.primary:"rgba(255,255,255,0.1)",zIndex:0}}),e.jsx("div",{style:{width:$?20:12,height:$?20:12,borderRadius:999,background:$?"#fff":N?i.primary:"rgba(255,255,255,0.2)",border:$?`3px solid ${i.primary}`:"none",boxShadow:$?`0 0 0 6px ${i.primary}44`:"none",zIndex:1,marginBottom:8,flexShrink:0}}),e.jsx("div",{style:{fontFamily:m,fontSize:9,fontWeight:$?700:500,color:$?i.text:i.textFaint,textAlign:"center",transform:"rotate(-35deg)",transformOrigin:"top center",whiteSpace:"nowrap",marginTop:4},children:l(t,L.bn,L.en)}),$&&e.jsxs("div",{style:{fontFamily:c,fontSize:8,color:i.primary,fontWeight:800,marginTop:18,whiteSpace:"nowrap"},children:[l(t,"নিকটতম","NEAREST")," · ",_]}),e.jsx("div",{style:{fontFamily:c,fontSize:8,color:i.primary,fontWeight:700,marginTop:20},children:ce(L.fare,t)})]},J)})})]}),e.jsxs("div",{style:{...s(16),marginBottom:18},children:[e.jsxs("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:i.text,marginBottom:14},children:[l(t,"ভাড়া ক্যালকুলেটর","Fare Calculator")," 🎫"]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:r?"1fr":"1fr 1fr auto",gap:10},children:[e.jsxs("div",{ref:H,style:{background:i.inputBg,border:`1px solid ${j?i.primary:i.line}`,borderRadius:14,padding:"10px 14px",display:"flex",alignItems:"center",gap:10,transition:"border-color 0.15s"},children:[e.jsx("div",{style:{width:28,height:28,borderRadius:8,background:i.primarySoft,color:i.primaryDeep,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:16},children:"🚇"}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:c,fontSize:10,fontWeight:600,color:i.textFaint,textTransform:"uppercase",letterSpacing:1.2},children:l(t,"থেকে","From station")}),e.jsx("input",{value:p,onChange:L=>h(L.target.value),onFocus:()=>A(!0),onBlur:()=>setTimeout(()=>A(!1),150),placeholder:l(t,"উত্তরা উত্তর","Uttara North"),style:{background:"transparent",border:"none",outline:"none",fontFamily:m,fontSize:14,fontWeight:600,color:i.text,width:"100%",marginTop:2}})]})]}),e.jsxs("div",{ref:U,style:{background:i.inputBg,border:`1px solid ${z?i.accent:i.line}`,borderRadius:14,padding:"10px 14px",display:"flex",alignItems:"center",gap:10,transition:"border-color 0.15s"},children:[e.jsx("div",{style:{width:28,height:28,borderRadius:8,background:i.accentSoft,color:i.accent,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:16},children:"📍"}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:c,fontSize:10,fontWeight:600,color:i.textFaint,textTransform:"uppercase",letterSpacing:1.2},children:l(t,"পর্যন্ত","To station")}),e.jsx("input",{value:u,onChange:L=>f(L.target.value),onFocus:()=>C(!0),onBlur:()=>setTimeout(()=>C(!1),150),placeholder:l(t,"মতিঝিল","Motijheel"),style:{background:"transparent",border:"none",outline:"none",fontFamily:m,fontSize:14,fontWeight:600,color:i.text,width:"100%",marginTop:2}})]})]}),v&&M?e.jsxs("div",{style:{background:`linear-gradient(135deg,${i.primary},${i.primaryDeep})`,color:i.primaryInk,borderRadius:14,padding:"10px 18px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minWidth:100},children:[e.jsx("div",{style:{fontFamily:c,fontWeight:800,fontSize:22,letterSpacing:-.5},children:ce(M.fare,t)}),e.jsxs("div",{style:{fontFamily:c,fontSize:10,fontWeight:700,opacity:.8,letterSpacing:1},children:[Y(M.stops,t)," ",l(t,"স্টেশন","STOPS")]})]}):e.jsx("button",{onClick:()=>{p&&u&&k(!0)},style:{background:p&&u?`linear-gradient(135deg,${i.primary},${i.primaryDeep})`:i.panelMuted,border:p&&u?"none":`1px solid ${i.line}`,borderRadius:14,padding:"10px 18px",cursor:p&&u?"pointer":"default",minWidth:100,color:p&&u?i.primaryInk:i.textFaint,fontFamily:c,fontSize:12,fontWeight:700,textAlign:"center"},children:l(t,"ভাড়া দেখুন","Check Fare")})]}),j&&e.jsx(ue,{suggestions:W(p),onSelect:L=>{h(L.label),A(!1),k(!1)},onDismiss:()=>A(!1),tk:i,lang:t,anchorRef:H}),z&&e.jsx(ue,{suggestions:W(u),onSelect:L=>{f(L.label),C(!1),k(!1)},onDismiss:()=>C(!1),tk:i,lang:t,anchorRef:U})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:r?"1fr 1fr":"repeat(4,1fr)",gap:10,marginBottom:18},children:[{ic:"⏰",t:l(t,"অপারেটিং","Operating"),v:Y("7:10",t)+" AM – "+Y("9:40",t)+" PM"},{ic:"🗓",t:l(t,"ছুটির দিন","Off day"),v:l(t,"শুক্রবার সকাল","Fri morning")},{ic:"🎫",t:l(t,"ভাড়া","Fare"),v:"৳ "+Y(20,t)+" – "+Y(100,t)},{ic:"⚡",t:l(t,"সর্বোচ্চ গতি","Top speed"),v:Y(100,t)+" km/h"}].map((L,J)=>e.jsxs("div",{style:s(14),children:[e.jsx("div",{style:{fontSize:22},children:L.ic}),e.jsx("div",{style:{fontFamily:c,fontSize:10,fontWeight:700,color:i.textFaint,letterSpacing:1.2,textTransform:"uppercase",marginTop:6},children:L.t}),e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:i.text,marginTop:2},children:L.v})]},J))}),e.jsx(ee,{tk:i,lang:t,kind:r?"mob-banner":"leaderboard"})]})]})})}function Dt({value:a,size:o=12}){return e.jsx("span",{style:{display:"inline-flex",gap:1},children:[1,2,3,4,5].map(d=>e.jsx("svg",{width:o,height:o,viewBox:"0 0 24 24",children:e.jsx("path",{d:"m12 2 2.9 6.4 7 .7-5.3 4.7 1.6 6.9L12 17.3 5.8 20.7l1.6-6.9L2 9.1l7-.7z",fill:d<=Math.round(a)?"#f59e0b":"rgba(245,158,11,0.2)"})},d))})}const We=a=>{var o;return((o=qe[a])==null?void 0:o.name)??a.replace(/_/g," ").replace(/\b\w/g,d=>d.toUpperCase())},Je=a=>{var o;return((o=qe[a])==null?void 0:o.bnName)??We(a)},ja=(a,o)=>{const d=o.toLowerCase().trim();return d?[a.name,a.bnName,a.number,a.from,a.to,We(a.from),We(a.to),Je(a.from),Je(a.to),...a.stops.flatMap(n=>[n,We(n),Je(n)])].join(" ").toLowerCase().includes(d):!0},He=Ye.map(a=>({source:a,num:a.number,bn:a.bnName,en:a.name,rbn:`${Je(a.from)} → ${Je(a.to)}`,ren:`${We(a.from)} → ${We(a.to)}`,dep:a.dhakaDepart??"—",arr:a.destinationArrive??"—",dur:a.distanceKm?`${a.distanceKm} km`:"—",fare:a.fare?`${a.fare.shuvan}–${a.fare.acBerth??a.fare.snigdha}`:"—",off:a.offDay||"নেই/None",col:[a.color??"#3b82f6","#1e3a5f"],rating:4.3,n:0})),Wn=["coxs-bazar-express-813","suborno-express-701","sonar-bangla-express-787","parabat-express-709","jahanabad-express-825"],Pn=[{l:"AC Berth",bn:"এসি বার্থ",c:"#7c3aed",fare:"৳ 2,656",n:"AC_B",e:"🛏️"},{l:"AC Seat",bn:"এসি সিট",c:"#6366f1",fare:"৳ 1,980",n:"AC_S",e:"💺"},{l:"Snigdha",bn:"স্নিগ্ধা",c:"#3b82f6",fare:"৳ 1,591",n:"SNIGDHA",e:"🪑"},{l:"First Berth",bn:"প্রথম বার্থ",c:"#10b981",fare:"৳ 1,200",n:"F_BERTH",e:"🛋️"},{l:"AC Chair",bn:"এসি চেয়ার",c:"#0ea5e9",fare:"৳ 980",n:"AC_CHAIR",e:"🪑"},{l:"Shovon Chair",bn:"শোভন চেয়ার",c:"#f59e0b",fare:"৳ 535",n:"S_CHAIR",e:"🎫"},{l:"Shovon",bn:"শোভন",c:"#6b7280",fare:"৳ 405",n:"SHOVAN",e:"🧳"},{l:"Shulov",bn:"সুলভ",c:"#84cc16",fare:"৳ 185",n:"SHULOV",e:"🎟️"}],En=Object.values(qe).slice(0,12);function Ln(a){const{theme:o,device:d,lang:t,onNav:n,params:i}=a,r=ae[o],s=d==="mobile",p=(S=16)=>({background:r.panel,border:`1px solid ${r.line}`,borderRadius:16,padding:S}),[h,u]=b.useState("eticket"),[f,v]=b.useState((i==null?void 0:i.from)??""),[k,j]=b.useState((i==null?void 0:i.to)??(i==null?void 0:i.search)??""),[A,z]=b.useState(!!(i!=null&&i.from||i!=null&&i.to||i!=null&&i.search)),[C,I]=b.useState(!1),[w,D]=b.useState(!1),B=b.useRef(null),H=b.useRef(null),[U,q]=b.useState(""),[P,W]=b.useState(""),[M,E]=b.useState(!1),[_,L]=b.useState(null),[J,R]=b.useState(""),{suggestions:N}=Re(f,{limit:20,categories:["railway_station"]}),{suggestions:$}=Re(k,{limit:20,categories:["railway_station"]}),X=(S,K)=>K==="from"?N:$,Z=b.useMemo(()=>{const S=f.toLowerCase(),K=k.toLowerCase();if(!A||!S&&!K){const Q=Wn.map(G=>He.find(ie=>ie.source.id===G)).filter(G=>!!G);return Q.length?Q:He.slice(0,5)}return He.filter(Q=>ja(Q.source,S)&&ja(Q.source,K))},[f,k,A]),F=b.useMemo(()=>{const S=P.toLowerCase().trim();return S?He.filter(K=>K.en.toLowerCase().includes(S)||K.bn.includes(S)||K.num.toLowerCase().includes(S)||K.ren.toLowerCase().includes(S)||K.rbn.includes(S)).slice(0,8):[]},[P]),x=b.useMemo(()=>{const S=J.toLowerCase().trim();return S?He.filter(K=>K.en.toLowerCase().includes(S)||K.bn.includes(S)||K.num.includes(S)).slice(0,15):He.slice(0,15)},[J]),y=A&&!!(f.trim()||k.trim()),g=[{id:"eticket",label:l(t,"ই-টিকেট","E-ticket"),icon:"🚆"},{id:"pnr",label:"PNR",icon:"🔍"},{id:"routemap",label:l(t,"রুট ম্যাপ","Route map"),icon:"🛤"}],T=S=>({...ye(r),background:S?r.text:r.panel,color:S?r.bg:r.text,borderColor:S?r.text:r.line,fontWeight:S?700:500}),V=()=>e.jsxs("div",{style:p(20),children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:16,color:r.text,marginBottom:6},children:l(t,"পিএনআর যাচাই করুন","Verify your PNR")}),e.jsx("div",{style:{fontFamily:c,fontSize:12,color:r.textFaint,marginBottom:18},children:l(t,"আপনার ই-টিকেটের PNR নম্বর দিন। বাংলাদেশ রেলওয়ের অফিসিয়াল সাইটে যাচাই হবে।","Enter the PNR number from your e-ticket. Verification done on Bangladesh Railway official site.")}),e.jsxs("div",{style:{background:r.inputBg,border:`1.5px solid ${r.primary}`,borderRadius:14,padding:"12px 16px",display:"flex",alignItems:"center",gap:12,marginBottom:14},children:[e.jsx("span",{style:{fontSize:20},children:"🎟️"}),e.jsx("input",{value:U,onChange:S=>q(S.target.value.toUpperCase()),placeholder:l(t,"PNR নম্বর লিখুন (যেমন: PNR1234567)","Enter PNR number (e.g. PNR1234567)"),style:{flex:1,background:"transparent",border:"none",outline:"none",fontFamily:c,fontWeight:700,fontSize:16,color:r.text,letterSpacing:2},maxLength:20,onKeyDown:S=>{S.key==="Enter"&&U.trim()&&window.open("https://eticket.railway.gov.bd/verify-ticket","_blank")}}),U&&e.jsx("button",{onClick:()=>q(""),style:{background:"none",border:"none",color:r.textFaint,cursor:"pointer",fontSize:16,padding:4},children:"✕"})]}),e.jsxs("button",{onClick:()=>{U.trim()&&window.open("https://eticket.railway.gov.bd/verify-ticket","_blank")},style:{width:"100%",background:"linear-gradient(135deg,#5b21b6,#7c3aed)",color:"#fff",border:0,borderRadius:14,padding:"14px",fontFamily:c,fontWeight:700,fontSize:15,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,boxShadow:"0 8px 22px -10px #7c3aed",opacity:U.trim()?1:.5},children:["🔍 ",l(t,"PNR যাচাই করুন","Verify PNR")]}),e.jsxs("div",{style:{marginTop:14,padding:"12px 14px",background:r.panelMuted,borderRadius:12,display:"flex",alignItems:"center",gap:10},children:[e.jsx("span",{style:{fontSize:18},children:"ℹ️"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:c,fontWeight:600,fontSize:12,color:r.textDim},children:l(t,"PNR কোথায় পাবেন?","Where to find PNR?")}),e.jsx("div",{style:{fontFamily:c,fontSize:11,color:r.textFaint,marginTop:2},children:l(t,"ই-টিকেট বুকিং কনফার্মেশন SMS বা ইমেইলে PNR নম্বর থাকে।","PNR number is in your e-ticket booking confirmation SMS or email.")})]})]}),e.jsx("div",{style:{marginTop:12,textAlign:"center"},children:e.jsx("a",{href:"https://eticket.railway.gov.bd/verify-ticket",target:"_blank",rel:"noopener noreferrer",style:{fontFamily:c,fontSize:12,color:r.primary,textDecoration:"underline"},children:l(t,"সরাসরি সাইটে যান →","Go directly to site →")})})]}),O=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[e.jsxs("div",{style:p(16),children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:12},children:[e.jsxs("div",{style:{flex:1,background:r.inputBg,border:`1px solid ${r.line}`,borderRadius:12,padding:"10px 14px",display:"flex",alignItems:"center",gap:8},children:[e.jsx(te.search,{s:14}),e.jsx("input",{value:J,onChange:S=>R(S.target.value),placeholder:l(t,"ট্রেন নাম বা নম্বর খুঁজুন...","Search train name or number..."),style:{flex:1,background:"transparent",border:"none",outline:"none",fontFamily:m,fontSize:13,color:r.text}})]}),e.jsxs("button",{onClick:()=>window.open("https://eticket.railway.gov.bd/train-information","_blank"),style:{background:"linear-gradient(135deg,#5b21b6,#7c3aed)",color:"#fff",border:0,borderRadius:12,padding:"10px 14px",fontFamily:c,fontWeight:700,fontSize:12,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0},children:["🛤 ",l(t,"সম্পূর্ণ ম্যাপ","Full Map")]})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:6,maxHeight:340,overflowY:"auto"},children:x.map(S=>e.jsx("div",{onClick:()=>L((_==null?void 0:_.source.id)===S.source.id?null:S),style:{padding:"10px 12px",background:(_==null?void 0:_.source.id)===S.source.id?`${S.col[0]}22`:r.panelMuted,border:`1.5px solid ${(_==null?void 0:_.source.id)===S.source.id?S.col[0]:"transparent"}`,borderRadius:10,cursor:"pointer",transition:"all 0.15s"},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("div",{style:{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${S.col[0]},${S.col[1]})`,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:c,fontWeight:800,fontSize:11,flexShrink:0},children:S.num}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:600,fontSize:13,color:r.text},children:l(t,S.bn,S.en)}),e.jsx("div",{style:{fontFamily:c,fontSize:11,color:r.textFaint},children:l(t,S.rbn,S.ren)})]}),e.jsxs("span",{style:{fontFamily:c,fontSize:10,color:S.col[0],fontWeight:700},children:[Y(S.source.stops.length,t)," stops"]})]})},S.source.id))})]}),_&&e.jsxs("div",{style:p(16),children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:14},children:[e.jsx("div",{style:{width:40,height:40,borderRadius:10,background:`linear-gradient(135deg,${_.col[0]},${_.col[1]})`,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:c,fontWeight:800,fontSize:13},children:_.num}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:15,color:r.text},children:l(t,_.bn,_.en)}),e.jsxs("div",{style:{fontFamily:c,fontSize:11,color:r.textFaint},children:[l(t,_.rbn,_.ren)," · ",_.dur]})]}),e.jsxs("button",{onClick:()=>window.open("https://eticket.railway.gov.bd/train-information","_blank"),style:{background:`${_.col[0]}22`,color:_.col[0],border:`1px solid ${_.col[0]}44`,borderRadius:8,padding:"6px 12px",fontFamily:c,fontWeight:700,fontSize:11,cursor:"pointer"},children:[l(t,"বিস্তারিত","Details")," ↗"]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14},children:[{l:l(t,"ছাড়ে","Departs"),v:_.dep,icon:"🕐"},{l:l(t,"পৌঁছায়","Arrives"),v:_.arr,icon:"🏁"},{l:l(t,"ভাড়া","Fare"),v:"৳ "+Y(_.fare,t),icon:"💰"},{l:l(t,"ছুটির দিন","Off day"),v:_.off.includes("/")?_.off.split("/")[t==="bn"?0:1]:_.off,icon:"📅"}].map((S,K)=>e.jsxs("div",{style:{background:r.panelMuted,borderRadius:10,padding:"8px 10px",display:"flex",alignItems:"center",gap:8},children:[e.jsx("span",{children:S.icon}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:c,fontSize:10,color:r.textFaint},children:S.l}),e.jsx("div",{style:{fontFamily:c,fontWeight:700,fontSize:13,color:r.text},children:S.v})]})]},K))}),e.jsxs("div",{style:{fontFamily:m,fontWeight:700,fontSize:13,color:r.text,marginBottom:10},children:[l(t,"স্টপসমূহ","Stops")," (",Y(_.source.stops.length,t),")"]}),e.jsx("div",{style:{maxHeight:280,overflowY:"auto"},children:_.source.stops.map((S,K)=>{const Q=K===0,G=K===_.source.stops.length-1,ie=We(S),oe=Je(S);return e.jsxs("div",{style:{display:"flex",gap:12,paddingBottom:G?0:10,position:"relative"},children:[e.jsxs("div",{style:{width:20,flexShrink:0,position:"relative",display:"flex",justifyContent:"center"},children:[!G&&e.jsx("div",{style:{position:"absolute",top:16,bottom:-4,width:2,background:_.col[0],opacity:.3}}),e.jsx("div",{style:{width:Q||G?16:10,height:Q||G?16:10,borderRadius:999,marginTop:4,background:Q?_.col[0]:G?_.col[1]:r.line,border:`2px solid ${_.col[0]}`,flexShrink:0}})]}),e.jsx("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"space-between",paddingBottom:2},children:e.jsxs("div",{children:[e.jsx("span",{style:{fontFamily:m,fontWeight:Q||G?700:400,fontSize:13,color:r.text},children:l(t,oe,ie)}),Q&&e.jsx("span",{style:{marginLeft:8,background:`${_.col[0]}22`,color:_.col[0],fontFamily:c,fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:6},children:"START"}),G&&e.jsx("span",{style:{marginLeft:8,background:`${_.col[1]}22`,color:_.col[1],fontFamily:c,fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:6},children:"END"})]})})]},S)})})]}),e.jsxs("div",{style:{...p(14),background:"linear-gradient(135deg,#5b21b633,#7c3aed22)",borderColor:"#7c3aed44",display:"flex",alignItems:"center",gap:14},children:[e.jsx("span",{style:{fontSize:28},children:"🛤"}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:r.text},children:l(t,"সম্পূর্ণ ট্রেন তথ্য ও রুট ম্যাপ","Complete Train Info & Route Map")}),e.jsx("div",{style:{fontFamily:c,fontSize:11,color:r.textFaint,marginTop:2},children:l(t,"বাংলাদেশ রেলওয়ের অফিসিয়াল ট্রেন ইনফরমেশন পেজ","Bangladesh Railway official train information page")})]}),e.jsxs("button",{onClick:()=>window.open("https://eticket.railway.gov.bd/train-information","_blank"),style:{background:"linear-gradient(135deg,#5b21b6,#7c3aed)",color:"#fff",border:0,borderRadius:12,padding:"10px 16px",fontFamily:c,fontWeight:700,fontSize:12,cursor:"pointer",flexShrink:0},children:[l(t,"দেখুন","View")," ↗"]})]})]});return e.jsx(ne,{...a,children:e.jsxs("div",{style:{padding:s?"0 0 80px":"0 0 48px"},children:[e.jsx(ct,{tk:r,isMobile:s,lang:t,kind:"train",gradient:"linear-gradient(135deg, #5b21b6 0%, #7c3aed 50%, #f59e0b 100%)",title:l(t,"বাংলাদেশ রেলওয়ে · সকল রুট","Bangladesh Railway · all routes"),subtitle:l(t,"৩৫০+ আন্তঃনগর ট্রেন, ই-টিকেট বুকিং, লাইভ অবস্থান ট্র্যাকিং — পদ্মা সেতু রুট সহ।","350+ intercity trains, e-ticket booking, live position tracking — including Padma Bridge route."),stats:[{v:Y(132,t),l:l(t,"ট্রেন","Trains")},{v:Y(260,t),l:l(t,"স্টেশন","Stations")},{v:Y(10,t)+" days",l:l(t,"অগ্রিম বুকিং","Advance booking")},{v:"★ "+Y("4.5",t),l:l(t,"গড় রেটিং","Avg rating")}]}),e.jsxs("div",{style:{padding:s?"0 16px":"0 40px"},children:[e.jsxs("div",{style:{...p(18),marginBottom:18},children:[e.jsx("div",{style:{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"},children:g.map(S=>e.jsxs("button",{onClick:()=>u(S.id),style:T(h===S.id),children:[S.icon," ",S.label]},S.id))}),e.jsxs("div",{style:{position:"relative",marginBottom:12},children:[e.jsxs("div",{style:{background:r.inputBg,border:`1px solid ${M?r.primary:r.line}`,borderRadius:14,padding:"10px 14px",display:"flex",alignItems:"center",gap:12},children:[e.jsx("div",{style:{width:32,height:32,borderRadius:10,flexShrink:0,background:"linear-gradient(135deg,#5b21b6,#7c3aed)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"},className:"kj-anim-glow",children:e.jsx(te.search,{s:16})}),e.jsx("input",{value:P,onChange:S=>W(S.target.value),onFocus:()=>E(!0),onBlur:()=>setTimeout(()=>E(!1),150),placeholder:l(t,"যেমন: কক্সবাজার এক্সপ্রেস, সোনার বাংলা, ৭৮৬...","e.g. Cox's Bazar Express, Sonar Bangla, #786..."),style:{flex:1,background:"transparent",border:"none",outline:"none",fontFamily:m,fontSize:14,color:r.text}}),P&&e.jsx("button",{onClick:()=>W(""),style:{background:"none",border:"none",color:r.textFaint,cursor:"pointer",fontSize:16,padding:4},children:"✕"}),e.jsx("div",{style:{display:"flex",gap:4},children:[{l:l(t,"নাম","Name"),c:"#7c3aed"},{l:l(t,"নম্বর","Number"),c:"#3b82f6"},{l:"PNR",c:"#10b981"}].map((S,K)=>e.jsx("span",{style:{padding:"4px 8px",borderRadius:6,fontFamily:c,fontSize:10,fontWeight:700,background:`${S.c}22`,color:S.c},children:S.l},K))})]}),P.trim()&&F.length>0&&M&&e.jsx("div",{style:{position:"absolute",top:"100%",left:0,right:0,zIndex:9999,background:r.panel,border:`1px solid ${r.line}`,borderRadius:14,marginTop:4,overflow:"hidden",boxShadow:"0 8px 24px rgba(0,0,0,0.15)"},children:F.map(S=>e.jsxs("div",{onMouseDown:()=>{h==="pnr"?window.open("https://eticket.railway.gov.bd/verify-ticket","_blank"):h==="routemap"?(L(S),R(S.en),W("")):n("train-detail",{trainId:S.source.id}),W("")},style:{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",cursor:"pointer",borderTop:`1px solid ${r.line}`},children:[e.jsx("div",{style:{width:36,height:36,borderRadius:10,background:`linear-gradient(135deg,${S.col[0]},${S.col[1]})`,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:c,fontWeight:800,fontSize:11,flexShrink:0},children:S.num}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:600,fontSize:13,color:r.text},children:l(t,S.bn,S.en)}),e.jsx("div",{style:{fontFamily:c,fontSize:11,color:r.textFaint},children:l(t,S.rbn,S.ren)})]}),e.jsxs("span",{style:{fontFamily:c,fontWeight:700,fontSize:12,color:r.textFaint},children:["৳ ",Y(S.fare,t)]})]},S.source.id))})]}),h==="eticket"&&e.jsxs("div",{style:{display:"grid",gridTemplateColumns:s?"1fr":"1fr 1fr auto",gap:10},children:[e.jsxs("div",{ref:B,style:{background:r.inputBg,border:`1px solid ${C?r.primary:r.line}`,borderRadius:14,padding:"10px 14px",display:"flex",alignItems:"center",gap:10},children:[e.jsx("div",{style:{width:28,height:28,borderRadius:8,background:r.primarySoft,color:r.primaryDeep,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:e.jsx(te.pin,{s:14})}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:c,fontSize:10,fontWeight:600,color:r.textFaint,textTransform:"uppercase",letterSpacing:1.2},children:l(t,"থেকে","From")}),e.jsx("input",{value:f,onChange:S=>v(S.target.value),onFocus:()=>I(!0),onBlur:()=>setTimeout(()=>I(!1),150),placeholder:l(t,"ঢাকা / Dhaka","Dhaka"),style:{background:"transparent",border:"none",outline:"none",fontFamily:m,fontSize:14,fontWeight:600,color:r.text,width:"100%"}})]})]}),C&&e.jsx(ue,{suggestions:X(f,"from"),onSelect:S=>{v(S.label),I(!1)},onDismiss:()=>I(!1),tk:r,lang:t,anchorRef:B}),e.jsxs("div",{ref:H,style:{background:r.inputBg,border:`1px solid ${w?r.accent:r.line}`,borderRadius:14,padding:"10px 14px",display:"flex",alignItems:"center",gap:10},children:[e.jsx("div",{style:{width:28,height:28,borderRadius:8,background:r.accentSoft,color:r.accent,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:e.jsx(te.flag,{s:14})}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:c,fontSize:10,fontWeight:600,color:r.textFaint,textTransform:"uppercase",letterSpacing:1.2},children:l(t,"গন্তব্য","To")}),e.jsx("input",{value:k,onChange:S=>j(S.target.value),onFocus:()=>D(!0),onBlur:()=>setTimeout(()=>D(!1),150),placeholder:l(t,"কক্সবাজার","Cox's Bazar"),style:{background:"transparent",border:"none",outline:"none",fontFamily:m,fontSize:14,fontWeight:600,color:r.text,width:"100%"}})]})]}),w&&e.jsx(ue,{suggestions:X(k,"to"),onSelect:S=>{j(S.label),D(!1)},onDismiss:()=>D(!1),tk:r,lang:t,anchorRef:H}),e.jsxs("button",{onClick:()=>{var S;be(5,"Train search"),z(!0),(S=document.getElementById("train-results"))==null||S.scrollIntoView({behavior:"smooth",block:"start"})},style:{background:"linear-gradient(135deg,#5b21b6,#7c3aed)",color:"#fff",border:0,borderRadius:14,padding:s?"12px 16px":"0 22px",fontFamily:c,fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,minHeight:s?48:"auto",boxShadow:"0 8px 22px -10px #7c3aed"},children:[e.jsx(te.search,{s:16}),l(t,"খুঁজুন","Search")]})]}),h==="pnr"&&e.jsxs("div",{style:{marginTop:4,padding:"4px 0 0"},children:[e.jsxs("div",{style:{background:r.inputBg,border:"1.5px solid #10b981",borderRadius:14,padding:"12px 16px",display:"flex",alignItems:"center",gap:12,marginBottom:12},children:[e.jsx("span",{style:{fontSize:20},children:"🎟️"}),e.jsx("input",{value:U,onChange:S=>q(S.target.value.toUpperCase()),placeholder:l(t,"PNR নম্বর লিখুন (যেমন: PNR1234567)","Enter PNR number (e.g. PNR1234567)"),style:{flex:1,background:"transparent",border:"none",outline:"none",fontFamily:c,fontWeight:700,fontSize:16,color:r.text,letterSpacing:2},maxLength:20,onKeyDown:S=>{S.key==="Enter"&&U.trim()&&window.open("https://eticket.railway.gov.bd/verify-ticket","_blank")}}),U&&e.jsx("button",{onClick:()=>q(""),style:{background:"none",border:"none",color:r.textFaint,cursor:"pointer",fontSize:16},children:"✕"})]}),e.jsxs("button",{onClick:()=>{U.trim()&&window.open("https://eticket.railway.gov.bd/verify-ticket","_blank")},style:{width:"100%",background:U.trim()?"linear-gradient(135deg,#059669,#10b981)":r.panelMuted,color:U.trim()?"#fff":r.textFaint,border:0,borderRadius:14,padding:"13px",fontFamily:c,fontWeight:700,fontSize:14,cursor:U.trim()?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",gap:8},children:["🔍 ",l(t,"PNR যাচাই করুন","Verify PNR")," →"]})]}),h==="routemap"&&e.jsx("div",{style:{marginTop:4,display:"flex",gap:10,flexWrap:"wrap"},children:e.jsxs("button",{onClick:()=>window.open("https://eticket.railway.gov.bd/train-information","_blank"),style:{flex:1,background:"linear-gradient(135deg,#5b21b6,#7c3aed)",color:"#fff",border:0,borderRadius:14,padding:"13px 16px",fontFamily:c,fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 8px 22px -10px #7c3aed"},children:["🛤 ",l(t,"অফিসিয়াল রুট ম্যাপ","Official Route Map")]})})]}),h==="eticket"&&e.jsxs("div",{style:{display:"grid",gridTemplateColumns:s?"1fr":"1.5fr 1fr",gap:18},children:[e.jsxs("div",{id:"train-results",children:[e.jsx(_e,{tk:r,lang:t,title:y?l(t,`${Y(Z.length,t)}টি ট্রেন পাওয়া গেছে`,`${Y(Z.length,t)} trains found`):l(t,"প্রিয় ট্রেন","Favorite trains"),action:l(t,"প্রিয় ট্রেন","Favorite trains")}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[Z.length===0&&e.jsx("div",{style:{fontFamily:m,fontSize:13,color:r.textFaint,padding:"16px 0",textAlign:"center"},children:l(t,"কোনো ট্রেন পাওয়া যায়নি","No trains found for this route")}),Z.map(S=>e.jsx("div",{onClick:()=>n("train-detail",{trainId:S.source.id}),style:{...p(14),cursor:"pointer"},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:10},children:[e.jsxs("div",{style:{width:48,height:48,borderRadius:12,flexShrink:0,background:`linear-gradient(135deg,${S.col[0]},${S.col[1]})`,color:"#fff",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[e.jsx("span",{style:{fontFamily:c,fontWeight:800,fontSize:12},children:S.num}),e.jsx("span",{style:{fontSize:14},children:"🚆"})]}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"},children:e.jsx("span",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:r.text},children:l(t,S.bn,S.en)})}),e.jsx("div",{style:{fontFamily:m,fontSize:12,color:r.textDim,marginTop:2},children:l(t,S.rbn,S.ren)}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,marginTop:4},children:[e.jsx(Dt,{value:S.rating,size:10}),e.jsx("span",{style:{fontFamily:c,fontSize:10,fontWeight:700,color:r.text},children:S.rating}),e.jsxs("span",{style:{fontFamily:c,fontSize:10,color:r.textFaint},children:["· ",l(t,"ছুটি","Off"),": ",S.off.includes("/")?S.off.split("/")[t==="bn"?0:1]:S.off]})]})]}),e.jsxs("div",{style:{textAlign:"right",flexShrink:0},children:[e.jsxs("div",{style:{fontFamily:c,fontWeight:800,fontSize:14,color:r.text},children:["৳ ",Y(S.fare,t)]}),e.jsxs("div",{style:{fontFamily:c,fontSize:10,color:r.textFaint},children:[Y(S.dep,t)," → ",Y(S.arr,t)]}),e.jsx("div",{style:{fontFamily:c,fontSize:10,color:r.textFaint},children:S.dur})]})]})},S.source.id))]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[e.jsxs("div",{style:p(16),children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:r.text,marginBottom:12},children:l(t,"কোচ ক্লাস","Coach classes")}),Pn.map((S,K)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderTop:K?`1px dashed ${r.line}`:""},children:[e.jsx("div",{style:{width:32,height:32,borderRadius:8,background:`${S.c}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16},children:S.e}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:13,color:r.text},children:l(t,S.bn,S.l)}),e.jsx("div",{style:{fontFamily:c,fontSize:10,color:r.textFaint},children:S.n})]}),e.jsx("div",{style:{fontFamily:c,fontWeight:800,fontSize:14,color:S.c},children:ce(S.fare.replace(/৳\s*/,""),t)})]},K))]}),e.jsxs("div",{style:p(14),children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:r.text,marginBottom:10},children:l(t,"প্রধান স্টেশন","Major stations")}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8},children:En.map(S=>e.jsxs("div",{onClick:()=>j(S.name),style:{background:r.panelMuted,borderRadius:10,padding:"8px 10px",fontFamily:m,fontSize:12,color:r.text,cursor:"pointer",display:"flex",alignItems:"center",gap:6},children:[e.jsx("span",{style:{fontSize:14},children:"🏛️"}),l(t,S.bnName,S.name)]},S.id))})]}),e.jsx(ee,{tk:r,lang:t,kind:s?"mob-banner":"mid-rect"})]})]}),h==="pnr"&&V(),h==="routemap"&&O(),e.jsx(ee,{tk:r,lang:t,kind:s?"mob-banner":"leaderboard"})]})]})})}const $n=[{l:"VIP Suite",bn:"ভিআইপি স্যুট",c:"#7c3aed",p:"৳ 5,500",e:"🛏️",desc:{bn:"টিভি · এসি · বাথ",en:"TV · AC · bath"}},{l:"Deluxe Cabin",bn:"ডিলাক্স",c:"#3b82f6",p:"৳ 3,500",e:"🚪",desc:{bn:"এসি · ডাবল বেড",en:"AC · double bed"}},{l:"Family Cabin",bn:"ফ্যামিলি",c:"#10b981",p:"৳ 2,200",e:"👪",desc:{bn:"৪ জন · ফ্যান",en:"For 4 · fan"}},{l:"Single Cabin",bn:"সিঙ্গেল",c:"#f59e0b",p:"৳ 1,200",e:"🛌",desc:{bn:"এক জন",en:"For 1"}},{l:"Deck Floor",bn:"ডেক",c:"#ef4444",p:"৳ 300",e:"🧳",desc:{bn:"খোলা ডেক",en:"Open deck"}}];function _n(a){var J,R;const{theme:o,device:d,lang:t,onNav:n,params:i}=a,r=ae[o],s=d==="mobile",p=(N=16)=>({background:r.panel,border:`1px solid ${r.line}`,borderRadius:16,padding:N}),h=(N,$)=>t==="bn"?$:N,[u,f]=b.useState((i==null?void 0:i.from)??""),[v,k]=b.useState((i==null?void 0:i.to)??(i==null?void 0:i.search)??""),[j,A]=b.useState(!!(i!=null&&i.from||i!=null&&i.to||i!=null&&i.search)),[z,C]=b.useState(!1),[I,w]=b.useState(!1),D=b.useRef(null),B=b.useRef(null),H=N=>{const $=N.toLowerCase();return(N?ve.filter(Z=>Z.en.toLowerCase().includes($)||Z.bn.includes(N)):ve).map(Z=>({id:Z.id,label:t==="bn"?Z.bn:Z.en}))},U=b.useMemo(()=>H(u),[u,t]),q=b.useMemo(()=>H(v),[v,t]),P=N=>{var X;if(!N)return null;const $=N.toLowerCase();return((X=ve.find(Z=>Z.en.toLowerCase().includes($)||Z.bn.includes(N)||Z.id===$.replace(/\s/g,"")))==null?void 0:X.id)??null},W=P(u),M=P(v),E=b.useMemo(()=>W&&M?Oe.filter(N=>N.from===W&&N.to===M):W?Oe.filter(N=>N.from===W):M?Oe.filter(N=>N.to===M):Oe.filter(N=>N.from==="sadarghat"&&N.to==="barisal"),[W,M]),_=W?((J=ve.find(N=>N.id===W))==null?void 0:J[t==="bn"?"bn":"en"])??"Sadarghat":t==="bn"?"সদরঘাট":"Sadarghat",L=M?((R=ve.find(N=>N.id===M))==null?void 0:R[t==="bn"?"bn":"en"])??"Barisal":t==="bn"?"বরিশাল":"Barisal";return e.jsx(ne,{...a,children:e.jsxs("div",{style:{padding:s?"0 0 80px":"0 0 48px"},children:[e.jsx(ct,{tk:r,isMobile:s,lang:t,kind:"launch",gradient:"linear-gradient(135deg, #0c4a6e 0%, #0ea5e9 50%, #fbbf24 100%)",title:l(t,"নদীপথে যাত্রা · সদরঘাট থেকে সারাদেশে","River journeys · from Sadarghat to everywhere"),subtitle:l(t,"৬০+ লঞ্চ রুট, রাতের কেবিন সার্ভিস, পদ্মা ও মেঘনা পার হয়ে — বরিশাল, ভোলা, পটুয়াখালী, চাঁদপুর।","60+ launch routes, overnight cabin service across Padma and Meghna — Barisal, Bhola, Patuakhali, Chandpur."),stats:[{v:Y(60,t)+"+",l:l(t,"রুট","Routes")},{v:Y(14,t),l:l(t,"ঘাট","Terminals")},{v:"৳ "+Y(300,t)+"+",l:l(t,"শুরু থেকে","From")},{v:Y(6,t)+"–"+Y(12,t)+"h",l:l(t,"যাত্রাকাল","Duration")}]}),e.jsxs("div",{style:{padding:s?"0 16px":"0 40px"},children:[e.jsxs("div",{style:{...p(16),marginBottom:18},children:[e.jsxs("div",{style:{background:r.inputBg,border:`1px solid ${r.line}`,borderRadius:14,padding:"10px 14px",display:"flex",alignItems:"center",gap:12,marginBottom:12},children:[e.jsx("div",{style:{width:32,height:32,borderRadius:10,flexShrink:0,background:"linear-gradient(135deg,#0ea5e9,#075985)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"},className:"kj-anim-glow",children:e.jsx(te.search,{s:16})}),e.jsx("span",{style:{flex:1,fontFamily:m,fontSize:14,color:r.textFaint},children:l(t,"যেমন: সুন্দরবন-১২, কীর্তনখোলা-১০, পারাবত-১৮...","e.g. Sundarban-12, Kirtonkhola-10, Parabat-18...")}),e.jsx("div",{style:{display:"flex",gap:4},children:[{l:l(t,"নাম","Name"),c:"#0ea5e9"},{l:l(t,"নম্বর","Number"),c:"#0c4a6e"},{l:l(t,"অপারেটর","Operator"),c:"#fbbf24"}].map((N,$)=>e.jsx("span",{style:{padding:"4px 8px",borderRadius:6,fontFamily:c,fontSize:10,fontWeight:700,background:`${N.c}22`,color:N.c},children:N.l},$))})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:s?"1fr":"1fr 1fr auto",gap:10},children:[e.jsxs("div",{ref:D,style:{background:r.inputBg,border:`1px solid ${r.line}`,borderRadius:14,padding:"10px 14px",display:"flex",alignItems:"center",gap:10},children:[e.jsx("div",{style:{width:28,height:28,borderRadius:8,background:r.primarySoft,color:r.primaryDeep,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:e.jsx(te.pin,{s:14})}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:c,fontSize:10,fontWeight:600,color:r.textFaint,textTransform:"uppercase",letterSpacing:1.2},children:h("From terminal","ঘাট")}),e.jsx("input",{value:u,onChange:N=>f(N.target.value),onFocus:()=>C(!0),onBlur:()=>setTimeout(()=>C(!1),150),placeholder:h("Sadarghat · Dhaka","সদরঘাট · ঢাকা"),style:{fontFamily:m,fontSize:14,fontWeight:600,color:r.text,background:"transparent",border:"none",outline:"none",width:"100%",padding:0}})]})]}),e.jsxs("div",{ref:B,style:{background:r.inputBg,border:`1px solid ${r.line}`,borderRadius:14,padding:"10px 14px",display:"flex",alignItems:"center",gap:10},children:[e.jsx("div",{style:{width:28,height:28,borderRadius:8,background:r.accentSoft,color:r.accent,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:e.jsx(te.flag,{s:14})}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:c,fontSize:10,fontWeight:600,color:r.textFaint,textTransform:"uppercase",letterSpacing:1.2},children:h("To","গন্তব্য")}),e.jsx("input",{value:v,onChange:N=>k(N.target.value),onFocus:()=>w(!0),onBlur:()=>setTimeout(()=>w(!1),150),placeholder:h("Barisal","বরিশাল"),style:{fontFamily:m,fontSize:14,fontWeight:600,color:r.text,background:"transparent",border:"none",outline:"none",width:"100%",padding:0}})]})]}),e.jsxs("button",{onClick:()=>{var N;be(5,"Launch search"),A(!0),(N=document.getElementById("launch-results"))==null||N.scrollIntoView({behavior:"smooth",block:"start"})},style:{background:"linear-gradient(135deg,#0ea5e9,#075985)",color:"#fff",border:0,borderRadius:14,padding:s?"12px 16px":"0 22px",fontFamily:c,fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,minHeight:s?48:"auto",boxShadow:"0 8px 22px -10px #0ea5e9"},children:[e.jsx(te.search,{s:16}),l(t,"লঞ্চ খুঁজুন","Find launch")]})]}),z&&e.jsx(ue,{suggestions:U,onSelect:N=>{f(N.label),C(!1)},onDismiss:()=>C(!1),tk:r,lang:t,anchorRef:D}),I&&e.jsx(ue,{suggestions:q,onSelect:N=>{k(N.label),w(!1)},onDismiss:()=>w(!1),tk:r,lang:t,anchorRef:B})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:s?"1fr":"1.5fr 1fr",gap:18},children:[e.jsxs("div",{id:"launch-results",children:[e.jsx(_e,{tk:r,lang:t,title:l(t,`আজকের লঞ্চ · ${_} → ${L}`,`Tonight's launches · ${_} → ${L}`),action:l(t,"সব দেখুন","All")}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:j?E.length===0?e.jsx("div",{style:{fontFamily:m,fontSize:13,color:r.textFaint,padding:"16px 0"},children:l(t,"এই রুটে কোনো লঞ্চ পাওয়া যায়নি।","No launches found for this route.")}):E.map((N,$)=>e.jsxs("div",{onClick:()=>n("vehicle",{kind:"launch",id:N.id,name:N.name.en,nameBn:N.name.bn,from:_,to:L,dep:N.dep,arr:N.arr,dur:N.dur,deck:String(N.deck),cabin:String(N.cabin),vip:String(N.vip),operator:N.operator.en,operatorBn:N.operator.bn,rating:String(N.rating),type:N.type,col:N.col}),style:{...p(14),position:"relative",overflow:"hidden",cursor:"pointer"},children:[N.overnight&&e.jsx("div",{style:{position:"absolute",top:0,right:0,background:"linear-gradient(90deg,#7c3aed,#a855f7)",color:"#fff",padding:"3px 10px",borderRadius:"0 16px 0 10px",fontFamily:c,fontWeight:800,fontSize:9,letterSpacing:1},children:"🌙 OVERNIGHT"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:10},children:[e.jsx("div",{style:{width:56,height:44,borderRadius:10,background:`linear-gradient(135deg,${N.col},${N.col}cc)`,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24},children:"⛴️"}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:r.text},children:l(t,N.name.bn,N.name.en)}),e.jsx("div",{style:{fontFamily:m,fontSize:11,color:r.textDim,marginTop:2},children:l(t,N.operator.bn,N.operator.en)}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4,marginTop:4},children:[e.jsx(Dt,{value:N.rating,size:10}),e.jsx("span",{style:{fontFamily:c,fontSize:10,fontWeight:700,color:r.text},children:N.rating}),e.jsx("span",{style:{fontFamily:c,fontSize:10,color:r.textFaint},children:N.type})]})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderTop:`1px dashed ${r.line}`,borderBottom:`1px dashed ${r.line}`,marginBottom:10},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:c,fontWeight:700,fontSize:14,color:r.text},children:Y(N.dep,t)}),e.jsx("div",{style:{fontFamily:m,fontSize:10,color:r.textFaint},children:_})]}),e.jsx("div",{style:{flex:1,height:1,background:r.line,position:"relative"},children:e.jsxs("span",{style:{position:"absolute",left:"50%",top:-8,transform:"translateX(-50%)",background:r.panel,padding:"0 6px",fontFamily:c,fontSize:10,fontWeight:700,color:r.textFaint,whiteSpace:"nowrap"},children:[N.dur," · ⛴"]})}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsx("div",{style:{fontFamily:c,fontWeight:700,fontSize:14,color:r.text},children:Y(N.arr,t)}),e.jsx("div",{style:{fontFamily:m,fontSize:10,color:r.textFaint},children:L})]})]}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsxs("div",{style:{flex:1,background:r.panelMuted,borderRadius:10,padding:"8px 10px"},children:[e.jsx("div",{style:{fontFamily:c,fontSize:9,fontWeight:700,color:r.textFaint,letterSpacing:1,textTransform:"uppercase"},children:l(t,"ডেক","Deck")}),e.jsx("div",{style:{fontFamily:c,fontWeight:800,fontSize:14,color:r.text},children:ce(N.deck,t)})]}),e.jsxs("div",{style:{flex:1,background:`${N.col}22`,borderRadius:10,padding:"8px 10px"},children:[e.jsxs("div",{style:{fontFamily:c,fontSize:9,fontWeight:700,color:N.col,letterSpacing:1,textTransform:"uppercase"},children:["VIP ",l(t,"কেবিন","Cabin")]}),e.jsx("div",{style:{fontFamily:c,fontWeight:800,fontSize:14,color:N.col},children:ce(N.vip,t)})]}),e.jsxs("button",{style:{background:N.col,color:"#fff",border:0,borderRadius:10,padding:"8px 14px",fontFamily:c,fontWeight:700,fontSize:12,cursor:"pointer"},children:[l(t,"বিস্তারিত","Details")," →"]})]})]},N.id)):e.jsx("div",{style:{fontFamily:m,fontSize:13,color:r.textFaint,padding:"16px 0",textAlign:"center"},children:l(t,"ঘাট বেছে লঞ্চ খুঁজুন বোতাম চাপুন","Select terminals and tap Find launch")})})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[e.jsxs("div",{style:p(16),children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:r.text,marginBottom:10},children:l(t,"কেবিন ও ভাড়া","Cabin classes")}),$n.map((N,$)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderTop:$?`1px dashed ${r.line}`:""},children:[e.jsx("div",{style:{width:32,height:32,borderRadius:8,background:`${N.c}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16},children:N.e}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:13,color:r.text},children:l(t,N.bn,N.l)}),e.jsx("div",{style:{fontFamily:m,fontSize:11,color:r.textFaint},children:l(t,N.desc.bn,N.desc.en)})]}),e.jsx("div",{style:{fontFamily:c,fontWeight:800,fontSize:14,color:N.c},children:ce(N.p.replace(/৳\s*/,""),t)})]},$))]}),e.jsx(ee,{tk:r,lang:t,kind:s?"mob-banner":"mid-rect"})]})]}),e.jsxs("div",{style:{marginTop:18},children:[e.jsx(_e,{tk:r,lang:t,title:l(t,"🌊 নিরাপত্তা ও পরামর্শ","🌊 Safety & travel tips")}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:s?"1fr":"repeat(3,1fr)",gap:10},children:[{ic:"🧥",bn:"লাইফ জ্যাকেট পরিধান করুন",en:"Wear a life jacket"},{ic:"🌦",bn:"আবহাওয়া পূর্বাভাস দেখুন",en:"Check weather forecast"},{ic:"📞",bn:"হটলাইন: ১৬২২৩",en:"Hotline: 16223"}].map((N,$)=>e.jsxs("div",{style:{...p(14),display:"flex",alignItems:"center",gap:12},children:[e.jsx("span",{style:{fontSize:28},children:N.ic}),e.jsx("span",{style:{fontFamily:m,fontWeight:600,fontSize:13,color:r.text,flex:1},children:l(t,N.bn,N.en)})]},$))})]}),e.jsx(ee,{tk:r,lang:t,kind:s?"mob-banner":"leaderboard"})]})]})})}const ka={BG:{name:{bn:"বিমান বাংলাদেশ",en:"Biman Bangladesh"},col:["#006a4e","#10b981"],rating:4.2,reviews:1240},BS:{name:{bn:"ইউএস-বাংলা",en:"US-Bangla"},col:["#0c4a6e","#0ea5e9"],rating:4.5,reviews:2310},VQ:{name:{bn:"নোভোএয়ার",en:"NOVOAIR"},col:["#b45309","#f59e0b"],rating:4.3,reviews:980},"2A":{name:{bn:"এয়ার আস্ট্রা",en:"Air Astra"},col:["#7c3aed","#a855f7"],rating:4.1,reviews:410}},Un=[{l:"Business",bn:"বিজনেস",c:"#7c3aed",p:"৳ 12,500",e:"🥂",desc:{bn:"প্রায়োরিটি · লাউঞ্জ",en:"Priority · lounge"}},{l:"Economy Plus",bn:"ইকোনমি প্লাস",c:"#0ea5e9",p:"৳ 6,200",e:"🪑",desc:{bn:"বাড়তি লেগরুম",en:"Extra legroom"}},{l:"Economy",bn:"ইকোনমি",c:"#10b981",p:"৳ 4,199",e:"💺",desc:{bn:"স্ট্যান্ডার্ড · ২০কেজি",en:"Standard · 20kg"}},{l:"Saver",bn:"সেভার",c:"#f59e0b",p:"৳ 3,990",e:"🎒",desc:{bn:"কেবিন ব্যাগ মাত্র",en:"Cabin bag only"}}];function Hn(a){var L,J;const{theme:o,device:d,lang:t,onNav:n,params:i}=a,r=ae[o],s=d==="mobile",p=(R=16)=>({background:r.panel,border:`1px solid ${r.line}`,borderRadius:16,padding:R}),[h,u]=b.useState((i==null?void 0:i.from)??""),[f,v]=b.useState((i==null?void 0:i.to)??(i==null?void 0:i.search)??""),[k,j]=b.useState(!!(i!=null&&i.from||i!=null&&i.to||i!=null&&i.search)),[A,z]=b.useState(!1),[C,I]=b.useState(!1),w=b.useRef(null),D=b.useRef(null),B=R=>{const N=R.toLowerCase();return(R.trim()===""?Se:Se.filter(X=>X.iata.toLowerCase().includes(N)||X.en.toLowerCase().includes(N)||X.bn.includes(R))).map(X=>({id:X.iata,label:X.iata+" · "+X.en,sub:X.bn}))},H=b.useMemo(()=>B(h),[h]),U=b.useMemo(()=>B(f),[f]),q=R=>{var N;return((N=R.match(/^([A-Z]{3})/))==null?void 0:N[1])??R.toUpperCase().slice(0,3)},P=h?q(h):"DAC",W=f?q(f):"CXB";b.useMemo(()=>{const R=St.filter($=>$.from===P&&$.to===W),N=R.length?Math.min(...R.map($=>$.fareEco)):0;return R.map($=>{const X=ka[$.airline]??{name:{bn:$.airline,en:$.airline},col:["#3b82f6","#60a5fa"],rating:4,reviews:0};return{...$,...X,fare:$.fareEco.toLocaleString(),stop:$.daysOp==="Daily"?"Nonstop":$.daysOp,best:$.airline==="BS",cheap:R.length>1&&$.fareEco===N}})},[P,W]);const M=b.useMemo(()=>{const R=St.filter($=>$.from===P&&$.to===W),N=R.length?Math.min(...R.map($=>$.fareEco)):0;return R.map($=>{const X=ka[$.airline]??{name:{bn:$.airline,en:$.airline},col:["#3b82f6","#60a5fa"],rating:4,reviews:0};return{...$,...X,fare:$.fareEco.toLocaleString(),stop:"Nonstop",best:$.airline==="BS",cheap:$.fareEco===N&&R.length>1}})},[P,W]),E=((L=Se.find(R=>R.iata===P))==null?void 0:L.en)??P,_=((J=Se.find(R=>R.iata===W))==null?void 0:J.en)??W;return e.jsx(ne,{...a,children:e.jsxs("div",{style:{padding:s?"0 0 80px":"0 0 48px"},children:[e.jsx(ct,{tk:r,isMobile:s,lang:t,kind:"plane",gradient:"linear-gradient(135deg, #0a1d3a 0%, #1e5aa0 55%, #22d3ee 100%)",title:l(t,"অভ্যন্তরীণ ফ্লাইট · এক সার্চে","Domestic flights · one search"),subtitle:l(t,"৪টি এয়ারলাইন ও ৮টি বিমানবন্দরের রুট গাইড। চূড়ান্ত ভাড়া ও সিট এয়ারলাইনের অফিসিয়াল সাইটে যাচাই করুন।","Route guide for 4 airlines and 8 airports. Verify final fares and seats on official airline sites."),stats:[{v:Y(4,t),l:l(t,"এয়ারলাইন","Airlines")},{v:Y(8,t),l:l(t,"বিমানবন্দর","Airports")},{v:"৳ "+Y("3,990",t),l:l(t,"শুরু থেকে","From")},{v:"★ "+Y("4.4",t),l:l(t,"গড় রেটিং","Avg rating")}]}),e.jsxs("div",{style:{padding:s?"0 16px":"0 40px"},children:[e.jsxs("div",{style:{...p(16),marginBottom:18},children:[e.jsx("div",{style:{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"},children:[{l:"↔ "+l(t,"ওয়ান ওয়ে","One way"),on:!0},{l:"⇄ "+l(t,"রাউন্ড ট্রিপ","Round trip")},{l:"👥 "+l(t,"১ যাত্রী","1 passenger")},{l:"💺 "+l(t,"ইকোনমি","Economy")}].map((R,N)=>e.jsx("button",{style:{...ye(r),background:R.on?r.text:r.panelMuted,color:R.on?r.bg:r.text,borderColor:R.on?r.text:r.line,fontWeight:R.on?700:500},children:R.l},N))}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:s?"1fr":"1fr 1fr auto",gap:10},children:[e.jsxs("div",{ref:w,style:{background:r.inputBg,border:`1px solid ${A?r.primary:r.line}`,borderRadius:14,padding:"10px 14px",display:"flex",alignItems:"center",gap:10},children:[e.jsx("div",{style:{width:28,height:28,borderRadius:8,background:r.primarySoft,color:r.primaryDeep,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:e.jsx(te.pin,{s:14})}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:c,fontSize:10,fontWeight:600,color:r.textFaint,textTransform:"uppercase",letterSpacing:1.2},children:l(t,"থেকে","From")}),e.jsx("input",{value:h,onChange:R=>u(R.target.value),onFocus:()=>z(!0),onBlur:()=>setTimeout(()=>z(!1),150),placeholder:l(t,"ঢাকা (DAC)","Dhaka (DAC)"),style:{fontFamily:m,fontSize:14,fontWeight:600,color:r.text,background:"transparent",border:"none",outline:"none",width:"100%",padding:0}})]})]}),e.jsxs("div",{ref:D,style:{background:r.inputBg,border:`1px solid ${C?r.accent:r.line}`,borderRadius:14,padding:"10px 14px",display:"flex",alignItems:"center",gap:10},children:[e.jsx("div",{style:{width:28,height:28,borderRadius:8,background:r.accentSoft,color:r.accent,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:e.jsx(te.flag,{s:14})}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:c,fontSize:10,fontWeight:600,color:r.textFaint,textTransform:"uppercase",letterSpacing:1.2},children:l(t,"গন্তব্য","To")}),e.jsx("input",{value:f,onChange:R=>v(R.target.value),onFocus:()=>I(!0),onBlur:()=>setTimeout(()=>I(!1),150),placeholder:l(t,"কক্সবাজার (CXB)","Cox's Bazar (CXB)"),style:{fontFamily:m,fontSize:14,fontWeight:600,color:r.text,background:"transparent",border:"none",outline:"none",width:"100%",padding:0}})]})]})]}),A&&e.jsx(ue,{suggestions:H,onSelect:R=>{u(R.label),z(!1)},onDismiss:()=>z(!1),tk:r,lang:t,anchorRef:w}),C&&e.jsx(ue,{suggestions:U,onSelect:R=>{v(R.label),I(!1)},onDismiss:()=>I(!1),tk:r,lang:t,anchorRef:D}),e.jsxs("button",{onClick:()=>{var R;be(5,"Flight search"),j(!0),(R=document.getElementById("flights-results"))==null||R.scrollIntoView({behavior:"smooth",block:"start"})},style:{background:"linear-gradient(135deg,#1e5aa0,#0a1d3a)",color:"#fff",border:0,borderRadius:14,padding:s?"12px 16px":"10px 22px",fontFamily:c,fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,minHeight:s?48:"auto",boxShadow:"0 8px 22px -10px #1e5aa0",marginTop:10},children:[e.jsx(te.search,{s:16}),l(t,"ফ্লাইট খুঁজুন","Find flights")]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:s?"1fr":"1.5fr 1fr",gap:18},children:[e.jsxs("div",{id:"flights-results",children:[e.jsx(_e,{tk:r,lang:t,title:l(t,`এয়ারলাইন গাইড · ${P} → ${W}`,`Airline guide · ${E} → ${_}`),action:l(t,"সব দেখুন","See all")}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[k?M.length===0?e.jsx("div",{style:{fontFamily:m,fontSize:13,color:r.textFaint,padding:"16px 0"},children:l(t,"এই রুটে কোনো ফ্লাইট পাওয়া যায়নি।","No flights found for this route.")}):null:e.jsx("div",{style:{fontFamily:m,fontSize:13,color:r.textFaint,padding:"16px 0",textAlign:"center"},children:l(t,"বিমানবন্দর বেছে ফ্লাইট খুঁজুন বোতাম চাপুন","Select airports and tap Find flights")}),(k&&M.length>0?M:[]).map((R,N)=>e.jsxs("div",{onClick:()=>{be(2,"View flight details"),n("flight-detail",{code:R.airline,flightNo:R.flightNo,dep:R.dep,arr:R.arr,dur:R.dur,fromIATA:P,toIATA:W,fromName:E,toName:_,fare:String(R.fareEco)})},style:{...p(14),position:"relative",overflow:"hidden",cursor:"pointer"},children:[R.best&&e.jsxs("div",{style:{position:"absolute",top:0,right:0,background:"linear-gradient(90deg,#0ea5e9,#22d3ee)",color:"#04130d",padding:"3px 10px",borderRadius:"0 16px 0 10px",fontFamily:c,fontWeight:800,fontSize:9,letterSpacing:1},children:["★ ",l(t,"সেরা","BEST")]}),R.cheap&&e.jsxs("div",{style:{position:"absolute",top:0,right:0,background:"linear-gradient(90deg,#a855f7,#7c3aed)",color:"#fff",padding:"3px 10px",borderRadius:"0 16px 0 10px",fontFamily:c,fontWeight:800,fontSize:9,letterSpacing:1},children:["৳ ",l(t,"সস্তা","CHEAPEST")]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:10},children:[e.jsx("div",{style:{width:44,height:44,borderRadius:12,flexShrink:0,background:`linear-gradient(135deg,${R.col[0]},${R.col[1]})`,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:c,fontWeight:800,fontSize:14},children:R.airline}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:r.text},children:l(t,R.name.bn,R.name.en)}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4,marginTop:3},children:[e.jsx(Dt,{value:R.rating,size:10}),e.jsx("span",{style:{fontFamily:c,fontSize:10,fontWeight:700,color:r.text},children:R.rating}),e.jsxs("span",{style:{fontFamily:c,fontSize:10,color:r.textFaint},children:["(",R.reviews,")"]})]})]}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsxs("div",{style:{fontFamily:c,fontWeight:800,fontSize:18,color:r.text,letterSpacing:-.3},children:["৳ ",Y(R.fare,t)]}),e.jsx("div",{style:{fontFamily:c,fontSize:10,color:r.textFaint,fontWeight:600},children:l(t,"অফিসিয়াল সাইটে যাচাই করুন","verify official site")})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,paddingTop:10,borderTop:`1px dashed ${r.line}`},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:c,fontWeight:700,fontSize:15,color:r.text},children:Y(R.dep,t)}),e.jsx("div",{style:{fontFamily:c,fontSize:10,color:r.textFaint},children:"DAC"})]}),e.jsxs("div",{style:{flex:1,position:"relative",height:14},children:[e.jsx("div",{style:{position:"absolute",top:"50%",left:0,right:0,height:1.5,background:r.line}}),e.jsx("span",{style:{position:"absolute",left:"50%",top:-3,transform:"translateX(-50%)",fontSize:12},children:"✈️"}),e.jsxs("span",{style:{position:"absolute",left:"50%",bottom:-12,transform:"translateX(-50%)",fontFamily:c,fontSize:9,fontWeight:700,color:r.textFaint,whiteSpace:"nowrap"},children:[R.dur," · ",R.stop]})]}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsx("div",{style:{fontFamily:c,fontWeight:700,fontSize:15,color:r.text},children:Y(R.arr,t)}),e.jsx("div",{style:{fontFamily:c,fontSize:10,color:r.textFaint},children:"CXB"})]}),e.jsxs("button",{style:{...ye(r),padding:"7px 12px",fontSize:11,fontWeight:700,background:R.col[1],color:"#fff",borderColor:R.col[1],marginLeft:6},children:[l(t,"বিস্তারিত","Details")," →"]})]})]},N))]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[e.jsxs("div",{style:p(16),children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:r.text,marginBottom:10},children:l(t,"কেবিন ক্লাস","Cabin classes")}),Un.map((R,N)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderTop:N?`1px dashed ${r.line}`:""},children:[e.jsx("div",{style:{width:32,height:32,borderRadius:8,background:`${R.c}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16},children:R.e}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:13,color:r.text},children:l(t,R.bn,R.l)}),e.jsx("div",{style:{fontFamily:m,fontSize:11,color:r.textFaint},children:l(t,R.desc.bn,R.desc.en)})]}),e.jsx("div",{style:{fontFamily:c,fontWeight:800,fontSize:13,color:R.c},children:ce(R.p.replace(/৳\s*/,""),t)})]},N))]}),e.jsx(ee,{tk:r,lang:t,kind:s?"mob-banner":"mid-rect"})]})]}),e.jsx("div",{style:{...p(14),background:r.amberSoft,borderColor:r.amber,marginTop:18,marginBottom:18},children:e.jsxs("div",{style:{fontFamily:m,fontSize:13,color:r.amber,lineHeight:1.6},children:["ℹ️ ",l(t,"কই যাবো শুধুমাত্র ফ্লাইট তথ্য দেখায় — টিকেট কিনতে সরাসরি এয়ারলাইন ওয়েবসাইট বা বিমানবন্দরে যান।","KoyJabo shows flight info only — purchase tickets at official airline websites or airports.")]})}),e.jsx(ee,{tk:r,lang:t,kind:s?"mob-banner":"leaderboard"})]})]})})}const Kn="https://koyjabo-auth-proxy.mejbaur-bahar.workers.dev";async function On(a,o){const d=await fetch(`${Kn}/ai`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:a,history:o})});if(!d.ok){const n=await d.json().catch(()=>({}));throw new Error(n.error||`AI error ${d.status}`)}const t=await d.json();if(!t.text)throw new Error("empty_response");return t.text}const na="dhaka_commute_chat_history",Gn=()=>`chat_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,st=()=>{try{const a=localStorage.getItem(na);return a?JSON.parse(a):[]}catch{return[]}},Jn=a=>st().find(d=>d.id===a)||null,Sa=(a,o)=>{const d=st(),t=o||Gn();let n=d.find(r=>r.id===t);n||(n={id:t,messages:[],createdAt:Date.now(),lastUpdated:Date.now()},d.push(n)),n.messages.push(a),n.lastUpdated=Date.now();const i=d.slice(-50);return localStorage.setItem(na,JSON.stringify(i)),t},Yn=a=>{const d=st().filter(t=>t.id!==a);localStorage.setItem(na,JSON.stringify(d))},Za="https://koyjabo-auth-proxy.mejbaur-bahar.workers.dev",ze=new Map,tt=300*1e3,qn=5;let Yt=0;const ei=[];function Vn(){return Yt<qn?(Yt++,Promise.resolve()):new Promise(a=>ei.push(a))}function Qn(){const a=ei.shift();a?a():Yt--}function Xn(a){ze.delete(a)}const ti="kj_pending_community_writes",ai=a=>`kj_community_cache:${a}`;function Te(){var a;try{const o=localStorage.getItem("koyjabo_auth_session");if(!o)return null;const d=(a=JSON.parse(o))==null?void 0:a.user;return d!=null&&d.id?{id:d.id,displayName:d.displayName??"",username:d.username??"",avatarUrl:d.avatarUrl??void 0,email:d.email??void 0}:null}catch{return null}}function ii(){try{const a=JSON.parse(localStorage.getItem(ti)??"[]");return Array.isArray(a)?a:[]}catch{return[]}}function ni(a){try{localStorage.setItem(ti,JSON.stringify(a))}catch{}}function mt(a){try{const o=localStorage.getItem(ai(a));return o?JSON.parse(o):null}catch{return null}}function oa(a,o){try{localStorage.setItem(ai(a),JSON.stringify(o))}catch{}}function wa(a,o,d){const t=ii().filter(n=>n.path!==a);t.push({id:crypto.randomUUID(),path:a,content:o,message:d,createdAt:Date.now()}),ni(t.slice(-100)),oa(a,o)}async function At(a){const o=ze.get(a);if(o&&o.expiresAt>Date.now())return o.data;await Vn();try{const d=await fetch(`${Za}/gh?r=d&p=${encodeURIComponent(a)}&_t=${Date.now()}`,{cache:"no-store"});if(d.status===404){const i=mt(a);return ze.set(a,{data:i,expiresAt:Date.now()+tt}),i}if(!d.ok){const i=mt(a);return ze.set(a,{data:i,expiresAt:Date.now()+tt}),i}const t=await d.text();if(!t||t==="null"){const i=mt(a);return ze.set(a,{data:i,expiresAt:Date.now()+tt}),i}const n=JSON.parse(t);return oa(a,n),ze.set(a,{data:n,expiresAt:Date.now()+tt}),n}catch{const d=mt(a);return ze.set(a,{data:d,expiresAt:Date.now()+tt}),d}finally{Qn()}}async function lt(a,o,d){const t=Te();try{const n=await fetch(`${Za}/gh`,{method:"POST",credentials:"omit",headers:{"Content-Type":"application/json"},body:JSON.stringify({requestId:crypto.randomUUID(),action:"save-data",userId:(t==null?void 0:t.id)||"anonymous",data:JSON.stringify({path:a,content:o,message:d||`community: ${a}`})})});return n.ok&&Xn(a),n.ok}catch{return!1}}async function oi(a,o,d){return oa(a,o),typeof navigator<"u"&&!navigator.onLine?(wa(a,o,d),!0):(await lt(a,o,d)||wa(a,o,d),!0)}async function Ba(){if(typeof navigator<"u"&&!navigator.onLine)return;const a=ii();if(a.length===0)return;const o=[];for(const d of a)await lt(d.path,d.content,d.message)||o.push(d);ni(o)}typeof window<"u"&&(window.addEventListener("online",()=>{Ba()}),Ba());async function we(a){return At(`data/ratings/${a}.json`)}async function Zn(a,o,d){const t=Te();if(!t)return!1;const n=(d??"").trim(),i=n.length>0?n:" ",s=(await we(a)||{ratings:[]}).ratings.filter(f=>f.userId!==t.id),p={userId:t.id,displayName:t.displayName,busId:a,stars:o,comment:i,timestamp:Date.now()},h=[...s,p],u=h.length?h.reduce((f,v)=>f+v.stars,0)/h.length:0;return oi(`data/ratings/${a}.json`,{busId:a,average:Math.round(u*10)/10,count:h.length,ratings:h},`rating: ${a}`)}async function eo(a){const o=Te();if(!o)return!1;const d=await we(a);if(!d)return!1;const t=d.ratings.filter(i=>i.userId!==o.id),n=t.length?t.reduce((i,r)=>i+r.stars,0)/t.length:0;return lt(`data/ratings/${a}.json`,{busId:a,average:Math.round(n*10)/10,count:t.length,ratings:t},`rating-delete: ${a}`)}async function _t(a){const o=await At(`data/photos/${a}.json`);return(o==null?void 0:o.photos)??[]}async function to(a,o,d,t){const n=Te();if(!n)return!1;const i=await At(`data/photos/${a}.json`)||{busId:a,photos:[]},r={id:crypto.randomUUID(),userId:n.id,displayName:n.displayName,busId:a,busName:o,caption:d,dataUrl:t,timestamp:Date.now()};return i.photos.unshift(r),i.photos.length>50&&(i.photos=i.photos.slice(0,50)),oi(`data/photos/${a}.json`,i,`photo: ${o}`)}async function ao(a,o){const d=Te();if(!d)return!1;const t=await At(`data/photos/${a}.json`);if(!t)return!1;const n=t.photos.length;return t.photos=t.photos.filter(i=>!(i.id===o&&i.userId===d.id)),t.photos.length===n?!1:t.photos.length===0?lt(`data/photos/${a}.json`,{busId:a,photos:[]},`photo-delete-all: ${a}`):lt(`data/photos/${a}.json`,t,`photo-delete: ${o}`)}function ot({tk:a}){return e.jsx("div",{style:{width:32,height:32,borderRadius:999,background:`linear-gradient(135deg,${a.primary},${a.accent})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:e.jsxs("svg",{viewBox:"0 0 32 32",width:"32",height:"32",children:[e.jsx("rect",{x:"8",y:"10",width:"16",height:"14",rx:"5",fill:"rgba(255,255,255,0.9)"}),e.jsx("circle",{cx:"13",cy:"16",r:"1.8",fill:a.primaryDeep,className:"kj-ai-eye"}),e.jsx("circle",{cx:"19",cy:"16",r:"1.8",fill:a.primaryDeep,className:"kj-ai-eye2"}),e.jsx("path",{d:"M13 21 Q16 23 19 21",stroke:a.accent,strokeWidth:"1.2",fill:"none",strokeLinecap:"round"})]})})}const Ut=[{id:1,isUser:!1,text:"hello",rich:"greeting"}];function io({msg:a,tk:o,lang:d,userAvatarUrl:t,userInitials:n}){const i=a.isUser;return a.rich==="greeting"?e.jsxs("div",{style:{display:"flex",gap:10,alignSelf:"flex-start",maxWidth:"80%"},children:[e.jsx(ot,{tk:o}),e.jsx("div",{style:{background:o.panel,border:`1px solid ${o.line}`,borderRadius:16,padding:"12px 16px",color:o.text},children:e.jsx("div",{style:{fontFamily:m,fontSize:14,lineHeight:1.6},children:l(d,"হ্যালো! আমি কই যাবো AI। বাংলাদেশের যেকোনো পরিবহন সম্পর্কে জিজ্ঞেস করুন।","Hello! I'm KoyJabo AI. Ask me anything about transport in Bangladesh.")})})]}):a.rich==="table"?e.jsxs("div",{style:{display:"flex",gap:10,alignSelf:"flex-start",maxWidth:"90%"},children:[e.jsx(ot,{tk:o}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[e.jsx("div",{style:{background:o.panel,border:`1px solid ${o.line}`,borderRadius:16,padding:"12px 16px",color:o.text,fontFamily:m,fontSize:14,lineHeight:1.6},children:l(d,"গুলশান → মতিঝিল রুটে ৩টি বিকল্প আছে:","Gulshan → Motijheel has 3 options:")}),e.jsx("div",{style:{background:o.panel,border:`1px solid ${o.line}`,borderRadius:16,overflow:"hidden"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontFamily:c,fontSize:12},children:[e.jsx("thead",{children:e.jsx("tr",{style:{background:o.primarySoft},children:[l(d,"মাধ্যম","Mode"),l(d,"সময়","Time"),l(d,"ভাড়া","Fare"),l(d,"রেটিং","Rating")].map((r,s)=>e.jsx("th",{style:{padding:"8px 10px",textAlign:"left",color:o.text,fontWeight:700},children:r},s))})}),e.jsx("tbody",{children:[{m:"🚌 Green Line",t:"48 min",f:"৳ 60",r:"★4.2",best:!0},{m:"🚇 Metro",t:"32 min",f:"৳ 40",r:"★5.0",best:!1},{m:"🚕 CNG",t:"35 min",f:"৳ 120",r:"★3.8",best:!1}].map((r,s)=>e.jsxs("tr",{style:{borderTop:`1px solid ${o.line}`,background:r.best?o.primarySoft:"transparent"},children:[e.jsx("td",{style:{padding:"8px 10px",color:o.text,fontWeight:r.best?700:400},children:r.m}),e.jsx("td",{style:{padding:"8px 10px",color:o.textDim},children:r.t}),e.jsx("td",{style:{padding:"8px 10px",color:o.text,fontWeight:700},children:r.f}),e.jsx("td",{style:{padding:"8px 10px",color:"#f59e0b"},children:r.r})]},s))})]})}),e.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap"},children:[l(d,"🗺 রুট দেখুন","🗺 See route"),l(d,"📊 তুলনা","📊 Compare"),l(d,"⭐ রিভিউ","⭐ Reviews")].map((r,s)=>e.jsx("button",{style:ye(o),children:r},s))})]})]}):a.rich==="coxs"?e.jsxs("div",{style:{display:"flex",gap:10,alignSelf:"flex-start",maxWidth:"85%"},children:[e.jsx(ot,{tk:o}),e.jsx("div",{style:{background:o.panel,border:`1px solid ${o.line}`,borderRadius:16,padding:"12px 16px",color:o.text,fontFamily:m,fontSize:14,lineHeight:1.7},children:l(d,`কক্সবাজার যাওয়ার ৩টি উপায়:

🚌 বাস (গ্রীন লাইন/হানিফ): ৳৯০০–২৫০০, রাতে ছাড়ে, ১০–১২ ঘণ্টা
🚆 ট্রেন (কক্সবাজার এক্সপ্রেস): ৳২০০–১২০০, রাত ১০টায় ছাড়ে, ৯ ঘণ্টা
✈️ ফ্লাইট (বিমান/ইউএস বাংলা): ৳৪৫০০+, ৫৫ মিনিট`,`3 ways to reach Cox's Bazar:

🚌 Bus (Green Line/Hanif): ৳900–2500, overnight, 10–12h
🚆 Train (Cox's Bazar Express): ৳200–1200, 10PM, 9h
✈️ Flight (Biman/US-Bangla): ৳4500+, 55 min`)})]}):e.jsxs("div",{style:{display:"flex",gap:10,alignSelf:i?"flex-end":"flex-start",maxWidth:"80%",flexDirection:i?"row-reverse":"row"},children:[!i&&e.jsx(ot,{tk:o}),i&&(t?e.jsx("img",{src:t,alt:n,style:{width:32,height:32,borderRadius:999,objectFit:"cover",flexShrink:0,border:`1.5px solid ${o.primarySoft}`}}):e.jsx("div",{style:{width:32,height:32,borderRadius:999,background:o.accentSoft,color:o.accent,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:c,fontWeight:700,fontSize:12},children:n||"KJ"})),e.jsx("div",{style:{background:i?o.primary:o.panel,color:i?o.primaryInk:o.text,border:i?0:`1px solid ${o.line}`,borderRadius:16,padding:"12px 16px",fontFamily:m,fontSize:14,lineHeight:1.6},children:i?a.text:no(a.text,o)})]})}function no(a,o){return a.split(`
`).map((t,n)=>{const i=t.trim();if(!i)return e.jsx("div",{style:{height:10}},n);if(/^─{3,}$/.test(i))return e.jsx("div",{style:{borderTop:`1px solid ${o.line}`,margin:"18px 0 14px"}},n);const r=z=>z.split(/\*\*(.+?)\*\*/).map((I,w)=>w%2===1?e.jsx("strong",{style:{fontWeight:700,color:o.text},children:I},w):I),s=/^[🏆⚡💸🚌]/.test(i)&&i.includes("**")&&i.length<80,p=i.startsWith("📍");i.startsWith("⏱️");const h=/^\s*🚌|^\s*🚇|^\s*🚂|^\s*🚶|^\s*✈️/.test(i),u=i.startsWith("💡"),f=/^🗺️/.test(i);let v="transparent",k="none",j=0,A=3;return s&&(v=`${o.primarySoft}44`,j=8,A=4),p&&(v=`${o.panelMuted}`,j=8,A=4),h&&(j=12,A=3,k=`2px solid ${o.line}`),u&&(v=`${o.accentSoft}22`,j=8,A=2),f&&(A=6),e.jsx("div",{style:{marginBottom:A,paddingLeft:j,paddingTop:s?6:u?4:0,paddingBottom:s?4:0,paddingRight:s||p||u?8:0,background:v,borderLeft:k,borderRadius:s||p||u?8:0},children:r(i)},n)})}function oo(a,o){const d=Object.values(ge).filter(i=>i.lat&&i.lng);let t=d[0],n=1/0;for(const i of d){const r=(i.lat-a)**2+(i.lng-o)**2;r<n&&(n=r,t=i)}return(t==null?void 0:t.name)||"Dhaka"}function ro(a){const{theme:o,device:d,lang:t}=a,n=ae[o],i=d==="mobile",[r,s]=b.useState(""),[p,h]=b.useState(Ut),[u,f]=b.useState(!1),[v,k]=b.useState(null),j=b.useRef("");b.useEffect(()=>{if(localStorage.getItem("kj-location-consent")!=="yes")return;const E=localStorage.getItem("kj-location-area");E&&(j.current=E),navigator.geolocation&&navigator.geolocation.getCurrentPosition(_=>{const L=oo(_.coords.latitude,_.coords.longitude);j.current=L,localStorage.setItem("kj-location-area",L)},()=>{},{timeout:5e3,maximumAge:3e5})},[]);const A=Te(),z=A==null?void 0:A.avatarUrl,C=((A==null?void 0:A.displayName)||(A==null?void 0:A.username)||"KJ").slice(0,2).toUpperCase(),I=[{bn:"কোন বাস গুলশান থেকে মতিঝিল?",en:"Bus Gulshan to Motijheel?"},{bn:"বিমানবন্দর → ফার্মগেট",en:"Airport → Farmgate"},{bn:"সদরঘাট লঞ্চ সময়",en:"Sadarghat launch times"},{bn:"মেট্রো সময়সূচি",en:"Metro schedule"}],[w,D]=b.useState(!1),[B,H]=b.useState(()=>st().slice().sort((M,E)=>E.lastUpdated-M.lastUpdated).map(M=>{var E;return{id:M.id,title:((E=M.messages.find(_=>_.role==="user"))==null?void 0:E.text)||l(t,"নতুন কথোপকথন","New conversation")}})),U=w?B:B.slice(0,5);function q(M){const E=Jn(M);if(!E)return;k(M);const _=E.messages.map((L,J)=>({id:J,isUser:L.role==="user",text:L.text}));h(_.length?_:Ut)}function P(M,E){E.stopPropagation(),Yn(M),H(_=>_.filter(L=>L.id!==M)),v===M&&(k(null),h(Ut))}async function W(){if(!r.trim()||u)return;const M=r.trim(),E={id:Date.now(),isUser:!0,text:M};h(L=>[...L,E]);const _=Sa({role:"user",text:M,timestamp:Date.now()},v);k(_),s(""),f(!0),H(st().slice().sort((L,J)=>J.lastUpdated-L.lastUpdated).map(L=>{var J;return{id:L.id,title:((J=L.messages.find(R=>R.role==="user"))==null?void 0:J.text)||l(t,"নতুন কথোপকথন","New conversation")}}));try{let L=function(x){const y=x.match(/^(?:how\s+(?:to\s+)?(?:go|get)\s+(?:to\s+)?|route\s+to\s+|(?:reach|take\s+me\s+to|go\s+to|directions?\s+to|best\s+(?:bus|way)\s+(?:to|for)|nearest\s+way\s+to|how\s+can\s+i\s+(?:get\s+to|reach)\s+))(.+?)(?:\?|$)/i)||x.match(/(?:কিভাবে\s+যাব[োো]?\s+|যেতে\s+চাই\s+|যাবো?\s+কিভাবে\s+)(.+?)(?:\?|।|$)/i);return y?y[1].trim().replace(/[?।]$/,"").trim():null};const R=[...p,E].filter(x=>!x.rich).map(x=>({role:x.isUser?"user":"assistant",text:x.text})),N=/\bfrom\b|থেকে|হতে/i.test(M),$=j.current,X=N?null:L(M);let Z;$&&X?Z=`${$} to ${X} [Context: User is in ${$} area]`:!N&&$?Z=`${M} from ${$} [Context: User is in ${$} area]`:Z=M;let F;try{F=await On(M,R)}catch{F=await Fi(Z,void 0,R,"Mejbaur"),!N&&$&&F&&!F.includes($)&&(F=(t==="bn"?`📍 **আপনার বর্তমান অবস্থান:** ${$}

`:`📍 **Your current location:** ${$}

`)+F)}Sa({role:"assistant",text:F,timestamp:Date.now()},_),h(x=>[...x,{id:Date.now()+1,isUser:!1,text:F}])}catch{h(L=>[...L,{id:Date.now()+1,isUser:!1,text:l(t,"দুঃখিত, একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।","Sorry, something went wrong. Please try again.")}])}finally{f(!1)}}return e.jsx(ne,{...a,children:e.jsxs("div",{style:{display:"flex",height:i?"calc(100vh - 52px - 60px)":"calc(100vh - 60px)",overflow:"hidden",position:"relative"},children:[!i&&e.jsxs("div",{style:{width:280,flexShrink:0,borderRight:`1px solid ${n.line}`,display:"flex",flexDirection:"column",overflow:"hidden auto",background:n.panel},children:[e.jsxs("div",{style:{padding:"14px 16px",borderBottom:`1px solid ${n.line}`},children:[e.jsx("div",{style:{fontFamily:c,fontSize:10,fontWeight:700,color:n.textFaint,letterSpacing:1.4,textTransform:"uppercase",marginBottom:10},children:l(t,"সাম্প্রতিক কথোপকথন","Recent conversations")}),U.length>0?e.jsxs(e.Fragment,{children:[U.map(M=>e.jsxs("div",{onClick:()=>q(M.id),style:{display:"flex",alignItems:"center",gap:6,padding:"7px 8px",borderRadius:10,cursor:"pointer",fontFamily:m,fontSize:12,color:n.textDim,marginBottom:3,background:v===M.id?n.primarySoft:"transparent"},onMouseEnter:E=>E.currentTarget.style.background=n.chipBg,onMouseLeave:E=>E.currentTarget.style.background=v===M.id?n.primarySoft:"transparent",children:[e.jsx("span",{style:{flexShrink:0},children:"💬"}),e.jsx("span",{style:{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:M.title}),e.jsx("button",{onClick:E=>P(M.id,E),style:{flexShrink:0,background:"none",border:"none",cursor:"pointer",color:n.textFaint,fontSize:14,padding:"0 2px",lineHeight:1},title:l(t,"মুছুন","Delete"),children:"×"})]},M.id)),B.length>5&&e.jsx("button",{onClick:()=>D(M=>!M),style:{width:"100%",background:"none",border:`1px solid ${n.line}`,borderRadius:8,padding:"5px",fontFamily:c,fontSize:11,color:n.textFaint,cursor:"pointer",marginTop:4},children:w?l(t,"কম দেখুন","Show less"):l(t,`আরও ${B.length-5}টি দেখুন`,`Load ${B.length-5} more`)})]}):e.jsx("div",{style:{fontFamily:m,fontSize:12,color:n.textFaint,lineHeight:1.6,padding:"6px 0"},children:l(t,"এখনো কোনো কথোপকথন নেই।","No conversations yet.")})]}),e.jsxs("div",{style:{padding:"14px 16px"},children:[e.jsx("div",{style:{fontFamily:c,fontSize:10,fontWeight:700,color:n.textFaint,letterSpacing:1.4,textTransform:"uppercase",marginBottom:10},children:l(t,"পরামর্শ","Suggestions")}),I.map((M,E)=>e.jsx("button",{onClick:()=>s(l(t,M.bn,M.en)),style:{display:"block",width:"100%",textAlign:"left",padding:"7px 10px",borderRadius:10,border:`1px solid ${n.line}`,background:"transparent",color:n.text,fontFamily:m,fontSize:12,cursor:"pointer",marginBottom:5},children:l(t,M.bn,M.en)},E))]})]}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"},children:[e.jsxs("div",{style:{flex:1,minHeight:0,overflow:"auto",padding:"16px",paddingBottom:i?"80px":"16px",display:"flex",flexDirection:"column",gap:14},children:[p.map(M=>e.jsx(io,{msg:M,tk:n,lang:t,userAvatarUrl:z,userInitials:C},M.id)),u&&e.jsxs("div",{style:{display:"flex",gap:10,alignSelf:"flex-start",maxWidth:"80%"},children:[e.jsx(ot,{tk:n}),e.jsx("div",{style:{background:n.panel,border:`1px solid ${n.line}`,borderRadius:16,padding:"12px 16px",color:n.textDim,fontFamily:c,fontSize:18,letterSpacing:4},children:e.jsx("span",{className:"kj-ai-dots",children:"···"})})]})]}),i&&e.jsx("div",{style:{display:"flex",gap:6,padding:"8px 12px",overflowX:"auto",borderTop:`1px solid ${n.line}`},children:I.slice(0,3).map((M,E)=>e.jsx("button",{onClick:()=>s(l(t,M.bn,M.en)),style:{flexShrink:0,background:n.panelMuted,border:`1px solid ${n.line}`,borderRadius:999,padding:"6px 12px",fontFamily:m,fontSize:11,color:n.textDim,cursor:"pointer",whiteSpace:"nowrap"},children:l(t,M.bn,M.en)},E))}),e.jsxs("div",{style:{position:i?"fixed":"relative",bottom:i?60:"auto",left:i?0:"auto",right:i?0:"auto",zIndex:i?120:"auto",padding:"12px 16px",paddingBottom:i?"14px":"12px",borderTop:`1px solid ${n.line}`,background:n.panel,backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",display:"flex",gap:10,alignItems:"flex-end"},children:[e.jsx("input",{value:r,onChange:M=>s(M.target.value),onKeyDown:M=>M.key==="Enter"&&W(),placeholder:l(t,"আপনার প্রশ্ন লিখুন...","Type your question..."),style:{flex:1,background:n.inputBg,border:`1px solid ${n.line}`,borderRadius:14,padding:i?"14px 16px":"12px 14px",fontFamily:m,fontSize:i?16:14,color:n.text,outline:"none",minWidth:0}}),e.jsx("button",{onClick:W,disabled:u,style:{width:44,height:44,borderRadius:999,background:u?n.panelMuted:n.primary,color:n.primaryInk,border:0,cursor:u?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:e.jsx(te.arrowR,{s:18})})]})]})]})})}const so=[{label:"Bus",labelBn:"বাস",icon:"🚌"},{label:"Train",labelBn:"ট্রেন",icon:"🚆"},{label:"Flight",labelBn:"ফ্লাইট",icon:"✈️"},{label:"Launch",labelBn:"লঞ্চ",icon:"⛴️"}],lo=[{val:"64",label:"Districts",labelBn:"জেলা"},{val:"4",label:"Modes",labelBn:"পরিবহন"},{val:"Live",label:"Schedules",labelBn:"শিডিউল"},{val:"50+",label:"Operators",labelBn:"অপারেটর"}],co=[...Xt,...Zt];function ho(a){const{theme:o,device:d,lang:t,onNav:n,params:i}=a,r=d==="mobile",s=ae[o],[p,h]=b.useState((i==null?void 0:i.mode)==="flights"?"Flight":"Bus"),[u,f]=b.useState((i==null?void 0:i.search)??""),[v,k]=b.useState((i==null?void 0:i.from)??""),[j,A]=b.useState((i==null?void 0:i.to)??""),[z,C]=b.useState(!!(i!=null&&i.from||i!=null&&i.to||i!=null&&i.search)),I=(g,T)=>l(t,T,g),[w,D]=b.useState(!1),[B,H]=b.useState(!1),U=b.useRef(null),q=b.useRef(null);b.useMemo(()=>[{id:"dhaka",label:"Dhaka",sub:"Dhaka Division"},{id:"chattogram",label:"Chattogram",sub:"Chattogram Division"},{id:"sylhet",label:"Sylhet",sub:"Sylhet Division"},{id:"rajshahi",label:"Rajshahi",sub:"Rajshahi Division"},{id:"khulna",label:"Khulna",sub:"Khulna Division"},{id:"barishal",label:"Barishal",sub:"Barishal Division"},{id:"rangpur",label:"Rangpur",sub:"Rangpur Division"},{id:"mymensingh",label:"Mymensingh",sub:"Mymensingh Division"},{id:"coxs_bazar",label:"Cox's Bazar",sub:"Chattogram Division"},{id:"cumilla",label:"Cumilla",sub:"Chattogram Division"},{id:"feni",label:"Feni",sub:"Chattogram Division"},{id:"noakhali",label:"Noakhali",sub:"Chattogram Division"},{id:"lakshmipur",label:"Lakshmipur",sub:"Chattogram Division"},{id:"chandpur",label:"Chandpur",sub:"Chattogram Division"},{id:"brahmanbaria",label:"Brahmanbaria",sub:"Chattogram Division"},{id:"bandarban",label:"Bandarban",sub:"Chattogram Division"},{id:"rangamati",label:"Rangamati",sub:"Chattogram Division"},{id:"khagrachhari",label:"Khagrachhari",sub:"Chattogram Division"},{id:"moulvibazar",label:"Moulvibazar",sub:"Sylhet Division"},{id:"habiganj",label:"Habiganj",sub:"Sylhet Division"},{id:"sunamganj",label:"Sunamganj",sub:"Sylhet Division"},{id:"bogura",label:"Bogura",sub:"Rajshahi Division"},{id:"naogaon",label:"Naogaon",sub:"Rajshahi Division"},{id:"natore",label:"Natore",sub:"Rajshahi Division"},{id:"chapainawabganj",label:"Chapainawabganj",sub:"Rajshahi Division"},{id:"pabna",label:"Pabna",sub:"Rajshahi Division"},{id:"sirajganj",label:"Sirajganj",sub:"Rajshahi Division"},{id:"joypurhat",label:"Joypurhat",sub:"Rajshahi Division"},{id:"jashore",label:"Jashore",sub:"Khulna Division"},{id:"benapole",label:"Benapole",sub:"Khulna Division"},{id:"satkhira",label:"Satkhira",sub:"Khulna Division"},{id:"bagerhat",label:"Bagerhat",sub:"Khulna Division"},{id:"narail",label:"Narail",sub:"Khulna Division"},{id:"chuadanga",label:"Chuadanga",sub:"Khulna Division"},{id:"jhenaidah",label:"Jhenaidah",sub:"Khulna Division"},{id:"magura",label:"Magura",sub:"Khulna Division"},{id:"meherpur",label:"Meherpur",sub:"Khulna Division"},{id:"kushtia",label:"Kushtia",sub:"Khulna Division"},{id:"patuakhali",label:"Patuakhali",sub:"Barishal Division"},{id:"kuakata",label:"Kuakata",sub:"Barishal Division"},{id:"bhola",label:"Bhola",sub:"Barishal Division"},{id:"pirojpur",label:"Pirojpur",sub:"Barishal Division"},{id:"barguna",label:"Barguna",sub:"Barishal Division"},{id:"jhalokati",label:"Jhalokati",sub:"Barishal Division"},{id:"dinajpur",label:"Dinajpur",sub:"Rangpur Division"},{id:"thakurgaon",label:"Thakurgaon",sub:"Rangpur Division"},{id:"panchagarh",label:"Panchagarh",sub:"Rangpur Division"},{id:"nilphamari",label:"Nilphamari",sub:"Rangpur Division"},{id:"lalmonirhat",label:"Lalmonirhat",sub:"Rangpur Division"},{id:"kurigram",label:"Kurigram",sub:"Rangpur Division"},{id:"gaibandha",label:"Gaibandha",sub:"Rangpur Division"},{id:"jamalpur",label:"Jamalpur",sub:"Mymensingh Division"},{id:"sherpur",label:"Sherpur",sub:"Mymensingh Division"},{id:"netrokona",label:"Netrokona",sub:"Mymensingh Division"},{id:"kishoreganj",label:"Kishoreganj",sub:"Mymensingh Division"},{id:"gazipur",label:"Gazipur",sub:"Dhaka Division"},{id:"narayanganj",label:"Narayanganj",sub:"Dhaka Division"},{id:"narsingdi",label:"Narsingdi",sub:"Dhaka Division"},{id:"manikganj",label:"Manikganj",sub:"Dhaka Division"},{id:"munshiganj",label:"Munshiganj",sub:"Dhaka Division"},{id:"faridpur",label:"Faridpur",sub:"Dhaka Division"},{id:"gopalganj",label:"Gopalganj",sub:"Dhaka Division"},{id:"madaripur",label:"Madaripur",sub:"Dhaka Division"},{id:"shariatpur",label:"Shariatpur",sub:"Dhaka Division"},{id:"rajbari",label:"Rajbari",sub:"Dhaka Division"},{id:"tangail",label:"Tangail",sub:"Dhaka Division"},{id:"gulshan",label:"Gulshan",sub:"Dhaka City"},{id:"banani",label:"Banani",sub:"Dhaka City"},{id:"uttara",label:"Uttara",sub:"Dhaka City"},{id:"mirpur",label:"Mirpur",sub:"Dhaka City"},{id:"dhanmondi",label:"Dhanmondi",sub:"Dhaka City"},{id:"mohammadpur",label:"Mohammadpur",sub:"Dhaka City"},{id:"farmgate",label:"Farmgate",sub:"Dhaka City"},{id:"motijheel",label:"Motijheel",sub:"Dhaka City"},{id:"old_dhaka",label:"Old Dhaka",sub:"Dhaka City"},{id:"badda",label:"Badda",sub:"Dhaka City"},{id:"khilgaon",label:"Khilgaon",sub:"Dhaka City"},{id:"rampura",label:"Rampura",sub:"Dhaka City"},{id:"mohakhali",label:"Mohakhali",sub:"Dhaka City"},{id:"tejgaon",label:"Tejgaon",sub:"Dhaka City"},{id:"shahbag",label:"Shahbag",sub:"Dhaka City"},{id:"savar",label:"Savar",sub:"Dhaka Division"},{id:"hemayetpur",label:"Hemayetpur",sub:"Savar, Dhaka"},{id:"gabtoli",label:"Gabtoli",sub:"Dhaka Bus Terminal"},{id:"sadarghat",label:"Sadarghat",sub:"Dhaka Launch Terminal"},{id:"kamalapur",label:"Kamalapur",sub:"Dhaka Railway Station"},{id:"airport",label:"Airport (HSIA)",sub:"Dhaka International Airport"},{id:"sundarbans",label:"Sundarbans",sub:"Khulna Division"},{id:"saint_martin",label:"Saint Martin Island",sub:"Teknaf, Cox's Bazar"},{id:"sajek",label:"Sajek Valley",sub:"Rangamati"},{id:"jaflong",label:"Jaflong",sub:"Sylhet"},{id:"ratargul",label:"Ratargul",sub:"Sylhet"},{id:"srimangal",label:"Srimangal",sub:"Moulvibazar"},{id:"nilgiri",label:"Nilgiri",sub:"Bandarban"},{id:"kaptai",label:"Kaptai Lake",sub:"Rangamati"},{id:"mongla",label:"Mongla",sub:"Bagerhat"},{id:"teknaf",label:"Teknaf",sub:"Cox's Bazar"},...co.filter(g=>!["Dhaka","Chattogram","Sylhet","Rajshahi","Khulna","Barishal","Rangpur","Mymensingh"].includes(g.district)).map(g=>({id:g.district.toLowerCase().replace(/\s/g,"_"),label:g.district,sub:g.division+" Division"}))].filter((g,T,V)=>V.findIndex(O=>O.id===g.id)===T),[]);const{suggestions:P}=Re(v,{limit:20}),{suggestions:W}=Re(j,{limit:20}),M=["Dhaka","Cox's Bazar","Sylhet","Chattogram","Rajshahi","Khulna","Barishal","Rangpur","Sajek Valley","Saint Martin's Island","Kuakata","Sreemangal","Bandarban","Sundarbans"].map(g=>({id:g.toLowerCase().replace(/[\s']/g,"_"),label:g,sub:""})),E=(g,T)=>g.trim()?T==="from"?P:W:M,_={dhaka:["kamalapur","tejgaon","cantonment","airport_r","tongi"],chattogram:["chattogram"],chittagong:["chattogram"],"cox's bazar":["coxsbazar"],coxsbazar:["coxsbazar"],"cox bazar":["coxsbazar"],sylhet:["sylhet"],rajshahi:["rajshahi"],khulna:["khulna"],mymensingh:["mymensingh"],comilla:["comilla"],cumilla:["comilla"],bogra:["bogra"],bogura:["bogra"],dinajpur:["dinajpur"],rangpur:["rangpur"],jamalpur:["jamalpur"],tangail:["tangail"],barishal:["barisal"],barisal:["barisal"],faridpur:["faridpur"],narayanganj:["narayanganj"],narsingdi:["narsingdi"],brahmanbaria:["brahmanbaria"],feni:["feni"],noakhali:["chaumuhani"],srimangal:["srimangal"],sreemangal:["srimangal"],sirajganj:["sirajganj"],pabna:["paksey"],benapole:["benapole"],jessore:["jessore"],jashore:["jessore"],kushtia:["kushtia_court"]},L={dhaka:"DAC","hazrat shahjalal":"DAC",hsia:"DAC",chattogram:"CGP",chittagong:"CGP",ctg:"CGP","shah amanat":"CGP",sylhet:"ZYL",osmani:"ZYL","cox's bazar":"CXB",coxsbazar:"CXB","cox bazar":"CXB",jessore:"JSR",jashore:"JSR",saidpur:"SPD",barishal:"BZL",barisal:"BZL",rajshahi:"RJH"},J={dhaka:"sadarghat",sadarghat:"sadarghat",barishal:"barisal",barisal:"barisal",khulna:"khulna",patuakhali:"patuakhali",kuakata:"patuakhali",bhola:"bhola",chandpur:"chandpur",narayanganj:"narayanganj",madaripur:"madaripur",hatiya:"hatiya",barguna:"borguna",borguna:"borguna",morrelganj:"morrelganj",jhalkathi:"jhalkathi",jhalokati:"jhalkathi"},R=(g,T)=>{if(!T.trim())return!0;const V=g.toLowerCase(),O=T.toLowerCase().trim();if(V.includes(O))return!0;const S=O.split(/\s+/).find(K=>K.length>=4);return S?V.includes(S):!1},N=g=>{const T=g.toLowerCase().trim();return _[T]||_[T.split(/\s+/)[0]]||[]},$=g=>{const T=g.toLowerCase().trim();return L[T]||L[T.split(/\s+/)[0]]||null},X=g=>{const T=g.toLowerCase().trim();return J[T]||J[T.split(/\s+/)[0]]||null},Z=b.useMemo(()=>{const g=v.toLowerCase().trim(),T=j.toLowerCase().trim(),V=u.toLowerCase().trim();if(p==="Train"){if(!g&&!T&&!V)return Ye;const Q=g?N(g):[],G=T?N(T):[];return Ye.filter(ie=>{const oe=[ie.from,ie.to,...ie.stops||[]],re=(ie.name+" "+ie.bnName).toLowerCase();if(V&&!R(re,V))return!1;const he=!g||(Q.length>0?Q.some(le=>oe.includes(le)):oe.some(le=>R(le,g))||R(re,g)),se=!T||(G.length>0?G.some(le=>oe.includes(le)):oe.some(le=>R(le,T))||R(re,T));return he&&se})}if(p==="Flight"){if(!g&&!T&&!V)return St;const Q=g?$(g)||g.toUpperCase():null,G=T?$(T)||T.toUpperCase():null;return St.filter(ie=>{const oe=Se.find(me=>me.iata===ie.from),re=Se.find(me=>me.iata===ie.to),he=(((oe==null?void 0:oe.en)||"")+" "+((oe==null?void 0:oe.city)||"")+" "+ie.from).toLowerCase(),se=(((re==null?void 0:re.en)||"")+" "+((re==null?void 0:re.city)||"")+" "+ie.to).toLowerCase(),le=(ie.flightNo+" "+ie.airline).toLowerCase();if(V&&!R(le+" "+he+" "+se,V))return!1;const je=!g||ie.from===Q||R(he,g),ke=!T||ie.to===G||R(se,T);return je&&ke})}if(p==="Launch"){if(!g&&!T&&!V)return Oe;const Q=g?X(g):null,G=T?X(T):null;return Oe.filter(ie=>{const oe=ve.find(me=>me.id===ie.from),re=ve.find(me=>me.id===ie.to),he=(((oe==null?void 0:oe.en)||"")+" "+((oe==null?void 0:oe.bn)||"")+" "+ie.from).toLowerCase(),se=(((re==null?void 0:re.en)||"")+" "+((re==null?void 0:re.bn)||"")+" "+ie.to).toLowerCase(),le=(ie.name.en+" "+ie.name.bn+" "+ie.operator.en).toLowerCase();if(V&&!R(le,V))return!1;const je=!g||ie.from===Q||R(he,g),ke=!T||ie.to===G||R(se,T);return je&&ke})}const O=V||g,S=T,K=[...Xt,...Zt];return!O&&!S?K.filter(Q=>Q.district!=="Dhaka"):K.filter(Q=>{const G=(Q.district+" "+Q.route+" "+Q.busOperators.join(" ")+" "+Q.division).toLowerCase();return O&&S?R(G,O)&&R(G,S):R(G,O||S)})},[u,v,j,p]),F={Dhaka:"#3b82f6",Chattogram:"#10b981",Sylhet:"#a855f7",Khulna:"#06b6d4",Rajshahi:"#f59e0b",Barishal:"#ec4899",Mymensingh:"#14b8a6",Rangpur:"#f97316"},x={width:"100%",background:s.inputBg,border:`1px solid ${s.line}`,borderRadius:12,padding:"12px 14px",fontFamily:t==="bn"?m:c,fontSize:14,color:s.text,outline:"none",boxSizing:"border-box"},y={fontFamily:c,fontSize:11,fontWeight:600,letterSpacing:.5,textTransform:"uppercase",color:s.textFaint,marginBottom:6,display:"block"};return e.jsx(ne,{...a,children:e.jsxs("div",{style:{color:s.text},children:[e.jsxs("div",{style:{background:"linear-gradient(135deg, #1e3a8a 0%, #3b82f6 55%, #0ea5e9 100%)",padding:r?"40px 16px 32px":"56px 32px 40px",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",inset:0,pointerEvents:"none",background:"radial-gradient(ellipse 70% 80% at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)"}}),e.jsx("div",{style:{position:"absolute",top:r?12:20,right:r?8:32,opacity:.85,zIndex:1},children:e.jsx(dt,{size:r?120:160,palette:["#93c5fd","#1e40af","#ef4444"]})}),e.jsxs("div",{style:{position:"relative",zIndex:2,maxWidth:700,flex:1},children:[e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.18)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:999,padding:"4px 12px",marginBottom:16},children:[e.jsx("span",{style:{width:7,height:7,borderRadius:"50%",background:"#fbbf24",display:"inline-block"},className:"kj-anim-pulse"}),e.jsx("span",{style:{fontFamily:c,fontSize:11,fontWeight:700,color:"#fff",letterSpacing:"0.08em"},children:I("LIVE SCHEDULES","লাইভ শিডিউল")})]}),e.jsx("h1",{style:{fontFamily:t==="bn"?m:c,fontSize:r?28:40,fontWeight:800,color:"#fff",margin:"0 0 8px",lineHeight:1.15},children:I("Intercity Travel","আন্তঃজেলা যাত্রা")}),e.jsx("p",{style:{fontFamily:t==="bn"?m:c,fontSize:r?14:16,color:"rgba(255,255,255,0.8)",margin:"0 0 24px",lineHeight:1.5},children:I("Bus · Train · Flight · Launch across Bangladesh","বাস · ট্রেন · ফ্লাইট · লঞ্চ — সারাদেশে")}),e.jsx("div",{style:{display:"flex",gap:12,flexWrap:"wrap"},children:lo.map(g=>e.jsxs("div",{style:{background:"rgba(255,255,255,0.15)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:12,padding:"10px 16px",textAlign:"center",minWidth:72},children:[e.jsx("div",{style:{fontFamily:c,fontSize:20,fontWeight:800,color:"#fff"},children:Y(g.val,t)}),e.jsx("div",{style:{fontFamily:t==="bn"?m:c,fontSize:11,color:"rgba(255,255,255,0.75)"},children:I(g.label,g.labelBn)})]},g.val))})]})]}),e.jsxs("div",{style:{padding:r?"20px 16px":"28px 40px"},children:[e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("label",{style:y,children:I("Search by name or route","নাম বা রুট দিয়ে খুঁজুন")}),e.jsx("input",{style:{...x,fontSize:14},placeholder:I("e.g. Green Line, Cox's Bazar Express, BG-437, Sundarban-12…","যেমন: গ্রীন লাইন, কক্সবাজার এক্সপ্রেস, BG-437…"),value:u,onChange:g=>f(g.target.value)}),e.jsx("div",{style:{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"},children:so.map(g=>e.jsxs("button",{onClick:()=>h(g.label),style:{background:p===g.label?s.primarySoft:s.panelMuted,border:`1px solid ${p===g.label?s.primary:s.line}`,borderRadius:999,padding:"6px 14px",cursor:"pointer",fontFamily:t==="bn"?m:c,fontSize:13,fontWeight:500,color:p===g.label?s.primary:s.textDim,display:"inline-flex",alignItems:"center",gap:5,transition:"all 0.15s ease"},children:[e.jsx("span",{style:{fontSize:15},children:g.icon}),I(g.label,g.labelBn)]},g.label))})]}),e.jsxs("div",{style:{background:s.panel,border:`1px solid ${s.line}`,borderRadius:20,padding:r?16:24,backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",boxShadow:s.shadow},children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:r?"1fr 1fr":"1fr 1fr 1fr 1fr",gap:16},children:[e.jsxs("div",{children:[e.jsx("label",{style:y,children:I("From","প্রেরণ")}),e.jsx("input",{ref:U,style:{...x,borderColor:w?s.primary:s.line},placeholder:I("Dhaka","ঢাকা"),value:v,onChange:g=>k(g.target.value),onFocus:()=>D(!0),onBlur:()=>setTimeout(()=>D(!1),150)}),w&&e.jsx(ue,{suggestions:E(v,"from"),onSelect:g=>{k(g.label),D(!1)},onDismiss:()=>D(!1),tk:s,lang:t,anchorRef:U})]}),e.jsxs("div",{children:[e.jsx("label",{style:y,children:I("To","গন্তব্য")}),e.jsx("input",{ref:q,style:{...x,borderColor:B?s.primary:s.line},placeholder:I("Cox's Bazar","কক্সবাজার"),value:j,onChange:g=>A(g.target.value),onFocus:()=>H(!0),onBlur:()=>setTimeout(()=>H(!1),150)}),B&&e.jsx(ue,{suggestions:E(j,"to"),onSelect:g=>{A(g.label),H(!1)},onDismiss:()=>H(!1),tk:s,lang:t,anchorRef:q})]})]}),e.jsxs("button",{onClick:()=>{var g;be(5,"Intercity search"),C(!0),(g=document.getElementById("intercity-results"))==null||g.scrollIntoView({behavior:"smooth",block:"start"})},style:{marginTop:16,width:"100%",background:"linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",border:"none",borderRadius:14,padding:"14px 24px",fontFamily:t==="bn"?m:c,fontSize:15,fontWeight:700,color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,letterSpacing:.3},children:["🔍 ",I("Search Journeys","যাত্রা খুঁজুন")]})]}),z&&e.jsx("div",{id:"intercity-results",style:{marginTop:32},children:p==="Bus"?(()=>{const g=[];for(const T of Z)for(const V of T.busOperators){const O=It.find(S=>S.name.toLowerCase().includes(V.toLowerCase())||V.toLowerCase().includes(S.name.split(" ")[0].toLowerCase()));g.push({opName:V,route:T.route,district:T.district,division:T.division,costNonAC:T.costNonAC,costAC:T.costAC,contact:(O==null?void 0:O.contactNumber)||T.mainContactNumber||""})}return e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,fontWeight:700,letterSpacing:.8,textTransform:"uppercase",color:s.textFaint,marginBottom:16},children:I(`${Y(g.length,t)} bus operators found`,`${Y(g.length,t)}টি বাস অপারেটর পাওয়া গেছে`)}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:g.slice(0,40).map((T,V)=>{const O=F[T.division]||"#6b7280",S=T.costAC&&T.costAC!=="-",K=It.find(Q=>Q.name.toLowerCase().includes(T.opName.toLowerCase())||T.opName.toLowerCase().includes(Q.name.split(" ")[0].toLowerCase()));return e.jsxs("button",{onClick:()=>n("intercity-detail",{operator:T.opName,route:T.route,district:T.district,costNonAC:T.costNonAC,costAC:T.costAC,contact:T.contact,counter:(K==null?void 0:K.mainCounterLocation)||"",from:v||"Dhaka",to:j||T.district}),style:{background:s.panel,border:`1px solid ${s.line}`,borderRadius:14,padding:"14px 16px",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:12},children:[e.jsx("div",{style:{width:48,height:48,borderRadius:12,background:`linear-gradient(135deg,${O},${O}aa)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0},children:"🚌"}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:c,fontSize:15,fontWeight:700,color:s.text},children:T.opName}),e.jsx("div",{style:{fontFamily:c,fontSize:11,color:s.textFaint,marginTop:3},children:T.route}),(K==null?void 0:K.mainCounterLocation)&&e.jsxs("div",{style:{fontFamily:c,fontSize:11,color:s.textDim,marginTop:2},children:["📍 ",K.mainCounterLocation]})]}),e.jsxs("div",{style:{textAlign:"right",flexShrink:0},children:[e.jsx("div",{style:{fontFamily:c,fontSize:14,fontWeight:700,color:s.text},children:T.costNonAC}),S&&e.jsxs("div",{style:{fontFamily:c,fontSize:11,color:s.textDim},children:["AC: ",T.costAC]}),T.contact&&e.jsxs("div",{style:{fontFamily:c,fontSize:10,color:s.primary,marginTop:4},children:["📞 ",T.contact.split(",")[0]]})]})]},T.opName+V)})}),g.length===0&&e.jsx("div",{style:{textAlign:"center",padding:"32px 16px",color:s.textFaint,fontFamily:t==="bn"?m:c,fontSize:14},children:I("No bus operators found. Try different locations.","কোনো বাস পাওয়া যায়নি।")})]})})():e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,fontWeight:700,letterSpacing:.8,textTransform:"uppercase",color:s.textFaint,marginBottom:16},children:I(`${Y(Z.length,t)} ${p} routes found`,`${Y(Z.length,t)}টি ${p} রুট পাওয়া গেছে`)}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:Z.slice(0,30).map((g,T)=>{var V;if(p==="Train")return e.jsxs("button",{onClick:()=>n("train-detail",{trainId:g.id}),style:{background:s.panel,border:`1px solid ${s.line}`,borderRadius:14,padding:"12px 14px",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:12},children:[e.jsx("div",{style:{width:44,height:44,borderRadius:10,background:"linear-gradient(135deg,#5b21b6,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0},children:"🚆"}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsxs("div",{style:{fontFamily:c,fontSize:14,fontWeight:700,color:s.text},children:[g.name," ",e.jsxs("span",{style:{fontFamily:c,fontSize:11,color:s.textFaint},children:["#",g.number]})]}),e.jsx("div",{style:{fontFamily:m,fontSize:12,color:s.textDim,marginTop:2},children:g.bnName}),e.jsxs("div",{style:{fontFamily:c,fontSize:11,color:s.textFaint,marginTop:2},children:["Off day: ",g.offDay]})]}),e.jsxs("div",{style:{textAlign:"right",flexShrink:0},children:[e.jsx("div",{style:{fontFamily:c,fontSize:13,fontWeight:700,color:s.text},children:g.dhakaDepart}),e.jsxs("div",{style:{fontFamily:c,fontSize:11,color:s.textDim},children:["৳",((V=g.fare)==null?void 0:V.shuvan)||"—"]})]})]},g.id+T);if(p==="Flight"){const O=Se.find(K=>K.iata===g.from),S=Se.find(K=>K.iata===g.to);return e.jsxs("button",{onClick:()=>n("flight-detail",{code:g.airline,flightNo:g.flightNo,dep:g.dep,arr:g.arr,dur:g.dur,fromIATA:g.from,toIATA:g.to,fromName:(O==null?void 0:O.en)||g.from,toName:(S==null?void 0:S.en)||g.to,fare:String(g.fareEco)}),style:{background:s.panel,border:`1px solid ${s.line}`,borderRadius:14,padding:"12px 14px",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:12},children:[e.jsx("div",{style:{width:44,height:44,borderRadius:10,background:"linear-gradient(135deg,#1e3a8a,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0},children:"✈️"}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:c,fontSize:14,fontWeight:700,color:s.text},children:g.flightNo}),e.jsxs("div",{style:{fontFamily:c,fontSize:11,color:s.textDim,marginTop:2},children:[(O==null?void 0:O.en)||g.from," → ",(S==null?void 0:S.en)||g.to]}),e.jsxs("div",{style:{fontFamily:c,fontSize:11,color:s.textFaint,marginTop:2},children:[g.dep," – ",g.arr," · ",g.dur," · ",g.daysOp]})]}),e.jsxs("div",{style:{textAlign:"right",flexShrink:0},children:[e.jsx("div",{style:{fontFamily:c,fontSize:13,fontWeight:700,color:s.text},children:ce(g.fareEco.toLocaleString(),t)}),g.fareBiz&&e.jsxs("div",{style:{fontFamily:c,fontSize:11,color:s.textDim},children:["Biz: ",ce(g.fareBiz.toLocaleString(),t)]})]})]},g.id+T)}if(p==="Launch"){const O=ve.find(K=>K.id===g.from),S=ve.find(K=>K.id===g.to);return e.jsxs("button",{onClick:()=>n("vehicle",{kind:"launch",id:g.id,name:g.name.en,nameBn:g.name.bn,from:(O==null?void 0:O.en)||g.from,to:(S==null?void 0:S.en)||g.to,dep:g.dep,arr:g.arr,dur:g.dur,deck:String(g.deck),cabin:String(g.cabin),vip:String(g.vip),operator:g.operator.en,operatorBn:g.operator.bn,rating:String(g.rating),col:"#0369a1"}),style:{background:s.panel,border:`1px solid ${s.line}`,borderRadius:14,padding:"12px 14px",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:12},children:[e.jsx("div",{style:{width:44,height:44,borderRadius:10,background:"linear-gradient(135deg,#0c1a2e,#0369a1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0},children:"⛴️"}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:m,fontSize:14,fontWeight:700,color:s.text},children:I(g.name.en,g.name.bn)}),e.jsx("div",{style:{fontFamily:m,fontSize:11,color:s.textDim,marginTop:2},children:I(g.operator.en,g.operator.bn)}),e.jsxs("div",{style:{fontFamily:c,fontSize:11,color:s.textFaint,marginTop:2},children:[g.dep," → ",g.arr," · ",g.dur]})]}),e.jsxs("div",{style:{textAlign:"right",flexShrink:0},children:[e.jsx("div",{style:{fontFamily:c,fontSize:13,fontWeight:700,color:s.text},children:ce(g.deck,t)}),e.jsxs("div",{style:{fontFamily:c,fontSize:11,color:s.textDim},children:["Cabin: ",ce(g.cabin,t)]})]})]},g.id+T)}return null})}),Z.length===0&&e.jsx("div",{style:{textAlign:"center",padding:"32px 16px",color:s.textFaint,fontFamily:t==="bn"?m:c,fontSize:14},children:I(`No ${p} routes found. Try different locations.`,"কোনো রুট পাওয়া যায়নি।")})]})}),e.jsxs("div",{style:{marginTop:28},children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,fontWeight:700,letterSpacing:.8,textTransform:"uppercase",color:s.textFaint,marginBottom:14},children:I("Top Operators","শীর্ষ অপারেটর")}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:r?"1fr 1fr":"repeat(4, 1fr)",gap:10},children:It.slice(0,8).map(g=>e.jsxs("button",{onClick:()=>n("intercity-detail"),style:{background:s.panel,border:`1px solid ${s.line}`,borderRadius:14,padding:"12px 10px",textAlign:"center",cursor:"pointer"},children:[e.jsx("div",{style:{fontFamily:c,fontSize:13,fontWeight:700,color:s.text,marginBottom:4},children:g.name.split(" ")[0]}),e.jsx("div",{style:{fontFamily:c,fontSize:10,color:s.textDim,lineHeight:1.3},children:g.primaryRoute.slice(0,20)})]},g.name))})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",marginTop:32},children:e.jsx(ee,{tk:s,lang:t,kind:r?"mob-banner":"leaderboard"})})]})]})})}const gt=a=>a.toLowerCase().replace(/[\s\-\.]/g,"");function po(a,o,d){if(!o&&!d)return!0;const t=gt(o),n=gt(d),i=!o||a.routeString.toLowerCase().includes(o.toLowerCase())||a.stops.some(s=>gt(s).includes(t)),r=!d||a.routeString.toLowerCase().includes(d.toLowerCase())||a.stops.some(s=>gt(s).includes(n));return i&&r}const uo={AC:"#006a4e",Local:"#1e3a8a","Double-Decker":"#7c3aed","Semi-Sitting":"#0c4a6e",Sitting:"#b45309"},mo={AC:60,"Double-Decker":50};function at(a){return mo[a.type]??30}const go=(()=>{const a={};for(const o of pe){const d=o.name.split(" ")[0];a[d]=(a[d]||0)+1}return Object.entries(a).sort((o,d)=>d[1]-o[1]).slice(0,8).map(([o])=>o)})();function fo(a){const{theme:o,device:d,lang:t,onNav:n,params:i}=a,r=d==="mobile",s=ae[o],p=(x,y)=>l(t,y,x),h=(i==null?void 0:i.from)??"",u=(i==null?void 0:i.to)??"",f=(i==null?void 0:i.search)??"",v=(i==null?void 0:i.sort)??null,[k,j]=b.useState(null),[A,z]=b.useState(20),[C,I]=b.useState(1200),[w,D]=b.useState(new Set),[B,H]=b.useState(new Set),[U,q]=b.useState(new Set),[P,W]=b.useState(v==="fastest"?"fastest":v==="cheapest"?"cheapest":"default"),[M,E]=b.useState(v==="non-ac"),[_,L]=b.useState(()=>Le()),[J,R]=b.useState(!1),N={Morning:[5,12],Afternoon:[12,17],Evening:[17,21],Night:[21,24]},$=b.useMemo(()=>{let x=pe.filter(y=>y.active!==!1);if(f){const y=f.toLowerCase();x=x.filter(g=>g.name.toLowerCase().includes(y)||g.bnName.toLowerCase().includes(y)||g.routeString.toLowerCase().includes(y))}else(h||u)&&(x=x.filter(y=>po(y,h,u)));if(M&&(x=x.filter(y=>y.type!=="AC")),k&&N[k]){const[y,g]=N[k];x=x.filter(T=>{if(!T.hours)return!0;const V=parseInt(T.hours.split("-")[0]||"0");return V>=y&&V<g})}return x=x.filter(y=>{const g=at(y);return g>=A&&g<=C}),w.size>0&&(x=x.filter(y=>w.has(y.type))),B.size>0&&(x=x.filter(y=>{const g=y.name.split(" ")[0];return B.has(g)})),U.has("AC")&&(x=x.filter(y=>y.type==="AC")),U.has("Charger")&&(x=x.filter(y=>y.type==="AC"||y.type==="Double-Decker")),U.has("WiFi")&&(x=x.filter(y=>y.type==="AC")),P==="cheapest"?x=[...x].sort((y,g)=>at(y)-at(g)):P==="fastest"&&(x=[...x].sort((y,g)=>g.stops.length-y.stops.length)),x.slice(0,30).map(y=>{const g=y.stops.map(T=>{var V;return((V=ge[T])==null?void 0:V.name)??T.replace(/_/g," ")}).slice(0,6);return{busId:y.id,badge:y.name.split(" ").map(T=>T[0]).join("").slice(0,2).toUpperCase(),name:y.name,nameBn:y.bnName,route:y.routeString,type:y.type,typeBn:y.type,badgeColor:uo[y.type]??"#1e3a8a",fare:at(y),fareLabel:`৳${at(y)}`,stops:g,hours:y.hours,isAC:y.type==="AC"}})},[h,u,f,k,A,C,w,B,U,P,M]),X=(x,y)=>{const g=new Set(x);return g.has(y)?g.delete(y):g.add(y),g},Z=(k?1:0)+(A>20||C<1200?1:0)+w.size+B.size+U.size+(M?1:0),F=()=>e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18},children:[e.jsxs("div",{style:{fontFamily:c,fontSize:13,fontWeight:700,color:s.text},children:[p("Filters","ফিল্টার")," ",Z>0&&e.jsx("span",{style:{background:s.primary,color:s.primaryInk,borderRadius:999,padding:"1px 7px",fontSize:11,marginLeft:4},children:Z})]}),Z>0&&e.jsx("button",{onClick:()=>{j(null),z(20),I(1200),D(new Set),H(new Set),q(new Set),E(!1)},style:{background:"none",border:"none",cursor:"pointer",fontFamily:c,fontSize:11,color:s.textFaint,textDecoration:"underline"},children:p("Clear all","সব মুছুন")})]}),e.jsxs("div",{style:{marginBottom:18},children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,fontWeight:600,color:s.textFaint,textTransform:"uppercase",letterSpacing:.5,marginBottom:8},children:p("Sort by","সাজান")}),e.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap"},children:[["default",p("Best match","সেরা")],["cheapest",p("Cheapest","সস্তা")],["fastest",p("Fastest","দ্রুত")]].map(([x,y])=>e.jsx("button",{onClick:()=>W(x),style:{background:P===x?s.primarySoft:s.panelMuted,border:`1px solid ${P===x?s.primary:s.line}`,borderRadius:8,padding:"5px 10px",cursor:"pointer",fontFamily:c,fontSize:11,fontWeight:P===x?700:500,color:P===x?s.primary:s.textDim},children:y},x))})]}),e.jsx("div",{style:{marginBottom:18},children:e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontFamily:c,fontSize:13,color:s.textDim},children:[e.jsx("input",{type:"checkbox",checked:M,onChange:x=>E(x.target.checked),style:{accentColor:s.primary,width:14,height:14}}),p("Non-AC only","নন-এসি শুধু")]})}),e.jsxs("div",{style:{marginBottom:18},children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,fontWeight:600,color:s.textFaint,textTransform:"uppercase",letterSpacing:.5,marginBottom:8},children:p("Time of Day","সময়")}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6},children:[{l:"Morning",b:"সকাল"},{l:"Afternoon",b:"দুপুর"},{l:"Evening",b:"সন্ধ্যা"},{l:"Night",b:"রাত"}].map(x=>e.jsx("button",{onClick:()=>j(k===x.l?null:x.l),style:{background:k===x.l?s.primarySoft:s.panelMuted,border:`1px solid ${k===x.l?s.primary:s.line}`,borderRadius:8,padding:"7px 4px",cursor:"pointer",fontFamily:t==="bn"?m:c,fontSize:12,fontWeight:k===x.l?700:500,color:k===x.l?s.primary:s.textDim},children:p(x.l,x.b)},x.l))})]}),e.jsxs("div",{style:{marginBottom:18},children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,fontWeight:600,color:s.textFaint,textTransform:"uppercase",letterSpacing:.5,marginBottom:8},children:p("Fare Range","ভাড়া")}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontFamily:c,fontSize:12,color:s.textDim,marginBottom:6},children:[e.jsxs("span",{children:["৳",A]}),e.jsxs("span",{children:["৳",C]})]}),e.jsx("div",{style:{display:"flex",alignItems:"flex-end",gap:3,height:36,marginBottom:10},children:[20,30,40,60,80,100,120].map((x,y)=>{const g=x>=A&&x<=C,T=x<=30?40:x<=60?100:x<=100?70:30;return e.jsx("div",{style:{flex:1,height:`${T}%`,borderRadius:"3px 3px 0 0",background:g?s.primary:s.panelMuted,transition:"background 0.15s"}},y)})}),e.jsx("input",{type:"range",min:20,max:1200,step:10,value:A,onChange:x=>z(Math.min(Number(x.target.value),C-10)),style:{width:"100%",accentColor:s.primary,marginBottom:6}}),e.jsx("input",{type:"range",min:20,max:1200,step:10,value:C,onChange:x=>I(Math.max(Number(x.target.value),A+10)),style:{width:"100%",accentColor:s.primary}})]}),e.jsxs("div",{style:{marginBottom:18},children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,fontWeight:600,color:s.textFaint,textTransform:"uppercase",letterSpacing:.5,marginBottom:8},children:p("Bus Type","বাসের ধরন")}),[["Local",p("Local","লোকাল")],["AC",p("AC","এসি")],["Double-Decker",p("Double Decker","ডবল ডেকার")]].map(([x,y])=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:7,cursor:"pointer",fontFamily:c,fontSize:13,color:s.textDim},children:[e.jsx("input",{type:"checkbox",checked:w.has(x),onChange:()=>D(X(w,x)),style:{accentColor:s.primary,width:14,height:14}}),y]},x))]}),e.jsxs("div",{style:{marginBottom:18},children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,fontWeight:600,color:s.textFaint,textTransform:"uppercase",letterSpacing:.5,marginBottom:8},children:p("Operator","অপারেটর")}),go.map(x=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:7,cursor:"pointer",fontFamily:c,fontSize:13,color:s.textDim},children:[e.jsx("input",{type:"checkbox",checked:B.has(x),onChange:()=>H(X(B,x)),style:{accentColor:s.primary,width:14,height:14}}),x]},x))]}),e.jsxs("div",{style:{marginBottom:8},children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,fontWeight:600,color:s.textFaint,textTransform:"uppercase",letterSpacing:.5,marginBottom:8},children:p("Amenities","সুবিধা")}),[["AC",p("AC","এসি")],["Charger",p("Charger","চার্জার")],["WiFi",p("WiFi","ওয়াইফাই")]].map(([x,y])=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:7,cursor:"pointer",fontFamily:c,fontSize:13,color:s.textDim},children:[e.jsx("input",{type:"checkbox",checked:U.has(x),onChange:()=>q(X(U,x)),style:{accentColor:s.primary,width:14,height:14}}),y]},x))]})]});return e.jsx(ne,{...a,children:e.jsxs("div",{style:{color:s.text},children:[e.jsx("div",{style:{background:s.panel,backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",borderBottom:`1px solid ${s.line}`,padding:r?"16px":"16px 32px"},children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:14,flexWrap:r?"wrap":"nowrap"},children:[e.jsx("div",{style:{background:s.inputBg,border:`1px solid ${s.line}`,borderRadius:10,padding:"8px 12px",fontFamily:c,fontSize:14,fontWeight:600,color:s.text,minWidth:120},children:h||p("Any origin","যেকোনো")}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontFamily:c,fontSize:12,color:s.textFaint,whiteSpace:"nowrap"},children:[e.jsx("div",{style:{width:28,height:1,background:s.line}}),e.jsx("span",{children:"→"}),e.jsx("div",{style:{width:28,height:1,background:s.line}})]}),e.jsx("div",{style:{background:s.inputBg,border:`1px solid ${s.line}`,borderRadius:10,padding:"8px 12px",fontFamily:c,fontSize:14,fontWeight:600,color:s.text,minWidth:120},children:u||p("Any destination","যেকোনো")}),e.jsx("button",{onClick:()=>n("bus-hub",{from:u,to:h}),style:{background:s.primarySoft,border:`1px solid ${s.primary}`,borderRadius:8,padding:"8px 10px",cursor:"pointer",fontFamily:c,fontSize:14,color:s.primary},children:"⇄"})]}),e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"},children:[e.jsxs("div",{style:{background:s.panelMuted,border:`1px solid ${s.line}`,borderRadius:999,padding:"6px 14px",display:"flex",alignItems:"center",gap:6,fontFamily:c,fontSize:12},children:[e.jsx("span",{children:"🚌"}),e.jsx("span",{style:{color:s.textDim},children:p("Results","ফলাফল")}),e.jsx("span",{style:{color:s.text,fontWeight:700},children:$.length})]}),Z>0&&e.jsxs("div",{style:{background:s.primarySoft,border:`1px solid ${s.primary}`,borderRadius:999,padding:"6px 14px",fontFamily:c,fontSize:12,color:s.primary,fontWeight:600},children:[Z," ",p("filter(s) active","ফিল্টার চালু")]}),r&&e.jsxs("button",{onClick:()=>R(!J),style:{marginLeft:"auto",background:J?s.primarySoft:s.panelMuted,border:`1px solid ${J?s.primary:s.line}`,borderRadius:999,padding:"6px 14px",cursor:"pointer",fontFamily:c,fontSize:12,color:J?s.primary:s.textDim,fontWeight:J?700:500},children:["🔧 ",p("Filters","ফিল্টার")," ",Z>0&&`(${Z})`]})]}),r&&J&&e.jsx("div",{style:{marginTop:16,background:s.panel,border:`1px solid ${s.line}`,borderRadius:16,padding:16},children:e.jsx(F,{})})]})}),e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto",padding:r?"16px":"24px 32px",display:"flex",gap:24,alignItems:"flex-start"},children:[!r&&e.jsx("div",{style:{width:260,flexShrink:0,background:s.panel,border:`1px solid ${s.line}`,borderRadius:16,padding:20,boxShadow:s.shadow,position:"sticky",top:76,alignSelf:"flex-start",height:"fit-content"},children:e.jsx(F,{})}),e.jsxs("div",{style:{flex:1,minWidth:0,display:"flex",flexDirection:"column",gap:14},children:[$.length===0&&e.jsxs("div",{style:{background:s.panel,border:`1px solid ${s.line}`,borderRadius:16,padding:"32px 24px",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:40,marginBottom:12},children:"🔍"}),e.jsx("div",{style:{fontFamily:t==="bn"?m:c,fontSize:16,fontWeight:700,color:s.text,marginBottom:8},children:p("No buses found","কোনো বাস পাওয়া যায়নি")}),e.jsx("div",{style:{fontFamily:c,fontSize:13,color:s.textFaint},children:p("Try adjusting filters or changing From/To","ফিল্টার পরিবর্তন করুন বা রুট বদলান")}),Z>0&&e.jsx("button",{onClick:()=>{j(null),z(20),I(1200),D(new Set),H(new Set),q(new Set),E(!1)},style:{marginTop:16,background:s.primarySoft,border:`1px solid ${s.primary}`,borderRadius:10,padding:"8px 18px",cursor:"pointer",fontFamily:c,fontSize:13,color:s.primary,fontWeight:600},children:p("Clear all filters","সব ফিল্টার মুছুন")})]}),$.map((x,y)=>e.jsxs(Ee.Fragment,{children:[y===2&&e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:e.jsx(ee,{tk:s,lang:t,kind:r?"mob-banner":"leaderboard"})}),e.jsxs("div",{style:{background:s.panel,border:`1px solid ${x.isAC?"#10b981":s.line}`,borderRadius:18,overflow:"hidden",boxShadow:s.shadow},children:[x.isAC&&e.jsxs("div",{style:{background:"linear-gradient(135deg,#10b981,#059669)",padding:"7px 16px",display:"flex",alignItems:"center",gap:8},children:[e.jsx("span",{style:{fontSize:14},children:"❄️"}),e.jsx("span",{style:{fontFamily:c,fontSize:12,fontWeight:700,color:"#fff"},children:"AC"}),e.jsx("span",{style:{marginLeft:"auto",background:"rgba(255,255,255,0.2)",borderRadius:4,padding:"2px 8px",fontFamily:c,fontSize:11,color:"#fff"},children:P==="cheapest"?"💰 "+p("Cheapest","সস্তা"):P==="fastest"?"⚡ "+p("Fastest","দ্রুত"):p("Best match","সেরা")})]}),e.jsx("div",{style:{padding:16},children:e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:14},children:[e.jsx("div",{style:{width:44,height:44,borderRadius:12,flexShrink:0,background:`linear-gradient(135deg,${x.badgeColor},${x.badgeColor}bb)`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:c,fontSize:13,fontWeight:800,color:"#fff"},children:x.badge}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,flexWrap:"wrap"},children:[e.jsx("div",{style:{fontFamily:t==="bn"?m:c,fontSize:15,fontWeight:700,color:s.text},children:p(x.name,x.nameBn)}),e.jsxs("span",{style:{fontFamily:c,fontSize:18,fontWeight:800,color:"#10b981"},children:["৳",x.fare]})]}),e.jsx("div",{style:{fontFamily:t==="bn"?m:c,fontSize:13,color:s.textDim,marginTop:2},children:x.route}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:4,marginTop:10,overflowX:"auto"},children:x.stops.map((g,T)=>e.jsxs(Ee.Fragment,{children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:3,flexShrink:0},children:[e.jsx("div",{style:{width:T===0||T===x.stops.length-1?10:7,height:T===0||T===x.stops.length-1?10:7,borderRadius:"50%",background:T===0||T===x.stops.length-1?x.badgeColor:s.primary,border:`2px solid ${s.bg}`,boxShadow:`0 0 0 1px ${T===0||T===x.stops.length-1?x.badgeColor:s.primary}`}}),!r&&e.jsx("span",{style:{fontFamily:c,fontSize:9,color:s.textFaint,whiteSpace:"nowrap"},children:g})]}),T<x.stops.length-1&&e.jsx("div",{style:{flex:1,height:2,background:s.line,minWidth:16,flexShrink:1}})]},g))}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:12,flexWrap:"wrap",gap:8},children:[e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"},children:[e.jsx("span",{style:{background:s.panelMuted,border:`1px solid ${s.line}`,borderRadius:6,padding:"3px 8px",fontFamily:c,fontSize:12,color:s.textDim},children:p(x.type,x.typeBn)}),x.stops.length>0&&e.jsxs("span",{style:{fontFamily:c,fontSize:11,color:s.textFaint},children:[x.stops.length," ",p("stops","স্টপ")]})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("button",{onClick:()=>L(Ja(x.busId)),style:{background:"none",border:"none",cursor:"pointer",fontSize:18,color:_.includes(x.busId)?s.accent:s.textFaint},children:_.includes(x.busId)?"♥":"♡"}),e.jsx("button",{onClick:()=>{Ya(x.busId,x.name),n("bus-detail",{busId:x.busId,from:h,to:u})},style:{background:s.primarySoft,border:`1px solid ${s.primary}`,borderRadius:8,padding:"6px 14px",cursor:"pointer",fontFamily:t==="bn"?m:c,fontSize:12,fontWeight:600,color:s.primary},children:p("View details","বিস্তারিত")})]})]})]})]})})]})]},x.busId)),e.jsx("div",{style:{display:"flex",justifyContent:"center",marginTop:8},children:e.jsx(ee,{tk:s,lang:t,kind:r?"mob-banner":"leaderboard"})})]})]})]})})}const ft=["Uttara North","Uttara Center","Uttara South","Pallabi","Mirpur 11","Mirpur 10","Kazipara","Shewrapara","Agargaon","Bijoy Sarani","Farmgate","Karwan Bazar","Shahbag","Dhaka University","Secretariat","Motijheel","Kamalapur"],Ca=["উত্তরা উত্তর","উত্তরা সেন্টার","উত্তরা দক্ষিণ","পল্লবী","মিরপুর ১১","মিরপুর ১০","কাজীপাড়া","শেওড়াপাড়া","আগারগাঁও","বিজয় সরণি","ফার্মগেট","কারওয়ান বাজার","শাহবাগ","ঢাকা বিশ্ববিদ্যালয়","সচিবালয়","মতিঝিল","কমলাপুর"],Fe={metro:{label:"Metro",labelBn:"মেট্রো",icon:"🚇",color:"#3b82f6"},bus:{label:"Bus",labelBn:"বাস",icon:"🚌",color:"#10b981"},cng:{label:"CNG",labelBn:"সিএনজি",icon:"🛺",color:"#f59e0b"},rideshare:{label:"Rideshare",labelBn:"রাইডশেয়ার",icon:"🚕",color:"#a855f7"}};function yo(a){const o={1:20,2:30,3:40,4:50,5:60,6:70,7:80,8:90};return a>=9?100:o[a]??20}function Ke(a,o){const d=o;switch(a){case"metro":return yo(o);case"bus":return 20+5*d;case"cng":return 80+15*d;case"rideshare":return 100+20*d}}function Ta(a,o){const t={metro:3,bus:7,cng:6,rideshare:5}[a]*o;return t<60?`${t} min`:`${Math.floor(t/60)}h ${t%60}m`}function bo(a){const{theme:o,device:d,lang:t,onNav:n}=a,i=d==="mobile",r=ae[o],[s,p]=b.useState(""),[h,u]=b.useState(""),[f,v]=b.useState("metro"),k=(B,H)=>l(t,H,B),j=ft.indexOf(s),A=ft.indexOf(h),z=j>=0&&A>=0?Math.abs(j-A):0,C=j>=0&&A>=0&&z>0,I=C?Ke(f,z):0,w={width:"100%",background:r.inputBg,border:`1px solid ${r.line}`,borderRadius:12,padding:"12px 14px",fontFamily:t==="bn"?m:c,fontSize:14,color:r.text,outline:"none",boxSizing:"border-box",appearance:"none",cursor:"pointer"},D={fontFamily:c,fontSize:11,fontWeight:600,letterSpacing:.5,textTransform:"uppercase",color:r.textFaint,marginBottom:6,display:"block"};return e.jsx(ne,{...a,children:e.jsxs("div",{style:{color:r.text},children:[e.jsxs("div",{style:{background:"linear-gradient(135deg, #1e3a5f 0%, #0ea5e9 60%, #38bdf8 100%)",padding:i?"32px 16px 28px":"48px 32px 36px",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",inset:0,pointerEvents:"none",background:"radial-gradient(ellipse 60% 80% at 90% 50%, rgba(255,255,255,0.08), transparent)"}}),e.jsxs("div",{style:{position:"relative",zIndex:1,textAlign:"center",padding:i?"0 16px":"0 40px"},children:[e.jsx("div",{style:{fontSize:i?40:56,marginBottom:8},children:"🧮"}),e.jsx("h1",{style:{fontFamily:t==="bn"?m:c,fontSize:i?26:36,fontWeight:800,color:"#fff",margin:"0 0 8px"},children:k("Fare Calculator","ভাড়া ক্যালকুলেটর")}),e.jsx("p",{style:{fontFamily:t==="bn"?m:c,fontSize:14,color:"rgba(255,255,255,0.8)",margin:0},children:k("Compare metro, bus, CNG, and rideshare fares instantly","মেট্রো, বাস, সিএনজি ও রাইডশেয়ার ভাড়া তুলনা করুন")})]})]}),e.jsxs("div",{style:{padding:i?"20px 16px":"28px 40px",maxWidth:1e3,margin:"0 auto"},children:[e.jsxs("div",{style:{background:r.panel,border:`1px solid ${r.line}`,borderRadius:20,padding:i?18:28,boxShadow:r.shadow,backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",marginBottom:24},children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:12,alignItems:"end",marginBottom:20},children:[e.jsxs("div",{children:[e.jsx("label",{style:D,children:k("From Station","প্রারম্ভিক স্টেশন")}),e.jsxs("select",{style:w,value:s,onChange:B=>p(B.target.value),children:[e.jsx("option",{value:"",children:k("Select station","স্টেশন বেছে নিন")}),ft.map((B,H)=>e.jsx("option",{value:B,children:t==="bn"?Ca[H]:B},B))]})]}),e.jsx("button",{onClick:()=>{const B=s;p(h),u(B)},style:{background:r.primarySoft,border:`1px solid ${r.primary}`,borderRadius:10,width:40,height:44,cursor:"pointer",fontFamily:c,fontSize:18,color:r.primary,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:"⇄"}),e.jsxs("div",{children:[e.jsx("label",{style:D,children:k("To Station","গন্তব্য স্টেশন")}),e.jsxs("select",{style:w,value:h,onChange:B=>u(B.target.value),children:[e.jsx("option",{value:"",children:k("Select station","স্টেশন বেছে নিন")}),ft.map((B,H)=>e.jsx("option",{value:B,children:t==="bn"?Ca[H]:B},B))]})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:D,children:k("Transport Mode","পরিবহনের ধরন")}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:8},children:Object.keys(Fe).map(B=>{const H=Fe[B];return e.jsxs("button",{onClick:()=>v(B),style:{background:f===B?`${H.color}22`:r.panelMuted,border:`1px solid ${f===B?H.color:r.line}`,borderRadius:10,padding:"10px 4px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,transition:"all 0.15s ease"},children:[e.jsx("span",{style:{fontSize:22},children:H.icon}),e.jsx("span",{style:{fontFamily:t==="bn"?m:c,fontSize:11,fontWeight:600,color:f===B?H.color:r.textDim},children:k(H.label,H.labelBn)})]},B)})})]})]}),C&&e.jsxs("div",{style:{background:r.panel,border:`1px solid ${r.line}`,borderRadius:20,padding:i?18:28,boxShadow:r.shadowLg,backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",marginBottom:24},children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:28},children:[e.jsxs("div",{style:{fontFamily:c,fontSize:12,color:r.textFaint,marginBottom:6,textTransform:"uppercase",letterSpacing:.5},children:[Fe[f].icon," ",k(Fe[f].label,Fe[f].labelBn)," · ",k(`${z} stations`,`${z} স্টেশন`)," · ~",z," km"]}),e.jsxs("div",{style:{fontFamily:c,fontSize:60,fontWeight:900,color:Fe[f].color,lineHeight:1},children:["৳",I]}),e.jsxs("div",{style:{fontFamily:c,fontSize:13,color:r.textDim,marginTop:6},children:[k("Estimated travel time:","আনুমানিক সময়:")," ",e.jsx("strong",{children:Ta(f,z)})]})]}),e.jsxs("div",{style:{borderTop:`1px solid ${r.line}`,paddingTop:20,marginBottom:20},children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,fontWeight:700,letterSpacing:.8,textTransform:"uppercase",color:r.textFaint,marginBottom:12},children:k("All modes comparison","সব পরিবহন তুলনা")}),e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse"},children:[e.jsx("thead",{children:e.jsx("tr",{children:[k("Mode","পরিবহন"),k("Fare","ভাড়া"),k("Time","সময়"),k("Notes","মন্তব্য")].map(B=>e.jsx("th",{style:{fontFamily:c,fontSize:11,fontWeight:600,color:r.textFaint,textAlign:"left",padding:"6px 8px",borderBottom:`1px solid ${r.line}`},children:B},B))})}),e.jsx("tbody",{children:Object.keys(Fe).map(B=>{const H=Fe[B],U=Ke(B,z),q=Ta(B,z),P={metro:{en:"Fastest, reliable",bn:"দ্রুত, নির্ভরযোগ্য"},bus:{en:"Affordable",bn:"সাশ্রয়ী"},cng:{en:"Door-to-door",bn:"দরজা থেকে দরজা"},rideshare:{en:"Comfortable",bn:"আরামদায়ক"}};return e.jsxs("tr",{style:{background:B===f?`${H.color}10`:"transparent"},children:[e.jsxs("td",{style:{padding:"10px 8px",borderBottom:`1px solid ${r.line}`},children:[e.jsx("span",{style:{fontFamily:c,fontSize:14},children:H.icon}),e.jsx("span",{style:{fontFamily:t==="bn"?m:c,fontSize:13,fontWeight:B===f?700:400,color:B===f?H.color:r.text,marginLeft:6},children:k(H.label,H.labelBn)})]}),e.jsxs("td",{style:{padding:"10px 8px",borderBottom:`1px solid ${r.line}`,fontFamily:c,fontSize:14,fontWeight:700,color:H.color},children:["৳",U]}),e.jsxs("td",{style:{padding:"10px 8px",borderBottom:`1px solid ${r.line}`,fontFamily:c,fontSize:13,color:r.textDim},children:["~",q]}),e.jsx("td",{style:{padding:"10px 8px",borderBottom:`1px solid ${r.line}`,fontFamily:t==="bn"?m:c,fontSize:12,color:r.textFaint},children:k(P[B].en,P[B].bn)})]},B)})})]})]}),e.jsxs("div",{style:{background:"#3b82f622",border:"1px solid #3b82f6",borderRadius:12,padding:"10px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:10},children:[e.jsx("span",{style:{fontSize:18},children:"🎓"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:c,fontSize:13,fontWeight:600,color:"#3b82f6"},children:k("Student Discount: 25% off metro","ছাত্র ছাড়: মেট্রোতে ২৫% ছাড়")}),e.jsx("div",{style:{fontFamily:c,fontSize:12,color:r.textDim,marginTop:2},children:k(`Metro fare with student card: ৳${Ke("metro",z)} → ৳${Math.round(Ke("metro",z)*.75)}`,`ছাত্র কার্ডে মেট্রো: ৳${Ke("metro",z)} → ৳${Math.round(Ke("metro",z)*.75)}`)})]})]}),e.jsxs("div",{style:{background:r.amberSoft,border:`1px solid ${r.amber}`,borderRadius:10,padding:"8px 12px",fontFamily:t==="bn"?m:c,fontSize:12,color:r.textDim,display:"flex",alignItems:"flex-start",gap:6},children:[e.jsx("span",{children:"ℹ"}),k("KoyJabo shows info only — fares may vary based on traffic, time of day, and operator.","KoyJabo শুধু তথ্য প্রদান করে — ভাড়া ট্র্যাফিক, সময় ও অপারেটর ভেদে পরিবর্তন হতে পারে।")]})]}),!C&&s!==""&&h!==""&&e.jsx("div",{style:{background:r.panel,border:`1px solid ${r.line}`,borderRadius:16,padding:24,textAlign:"center",color:r.textDim,fontFamily:c,marginBottom:24},children:k("Please select two different stations to calculate fare.","ভাড়া হিসাব করতে দুটি আলাদা স্টেশন বেছে নিন।")}),e.jsx("div",{style:{display:"flex",justifyContent:"center",marginTop:8},children:e.jsx(ee,{tk:r,lang:t,kind:i?"mob-banner":"mid-rect"})})]})]})})}const xe={cancellation:"Cancel 24h+ before: 10% fee. Cancel 12–24h: 25% fee. Cancel <12h: 50% fee. No refund after bus departure.",cancellationBn:"বাতিল ২৪ঘণ্টা+ আগে: ১০% ফি। বাতিল ১২-২৪ঘণ্টা: ২৫% ফি। বাতিল ১২ঘণ্টার কম: ৫০% ফি। বাস ছাড়ার পর কোনো রিফান্ড নেই।",refund:"Refund in 5–7 working days for mobile payment. 7–10 days for card/net banking. Counter tickets: cash refund same day.",refundBn:"মোবাইল পেমেন্ট: ৫-৭ কার্যদিবসে রিফান্ড। কার্ড/নেট ব্যাংকিং: ৭-১০ কার্যদিবস। কাউন্টার টিকেট: একই দিনে নগদ ফেরত।",luggage:"20kg free per passenger. Excess luggage: ৳5 per kg. No animals or hazardous items. Luggage goes in lower compartment only.",luggageBn:"প্রতি যাত্রী ২০ কেজি বিনামূল্যে। অতিরিক্ত লাগেজ: ৳৫ প্রতি কেজি। পশু বা বিপজ্জনক পণ্য নিষিদ্ধ। লাগেজ শুধু নিচের কম্পার্টমেন্টে।",boarding:"Arrive at counter 20–30 minutes before departure. Seat forfeited if not boarded 5 min before scheduled departure.",boardingBn:"ছাড়ার ২০-৩০ মিনিট আগে কাউন্টারে পৌঁছান। নির্ধারিত সময়ের ৫ মিনিট আগে না এলে আসন বাতিল হবে।",idRequired:!1,childPolicy:"Children under 3 travel free (no seat). Children 3–12: 50% fare with seat.",childPolicyBn:"৩ বছরের কম শিশু বিনামূল্যে (আসন নেই)। ৩-১২ বছর: আসনসহ ৫০% ভাড়া।",specialNotes:["Verify fares at counter or on Shohoz.com — fares may change on holidays.","During Eid, Puja and other holidays advance booking strongly recommended."],specialNotesBn:["কাউন্টারে বা Shohoz.com-এ ভাড়া যাচাই করুন — ছুটির দিনে ভাড়া পরিবর্তন হতে পারে।","ঈদ, পূজা ও অন্যান্য উৎসবে আগাম বুকিং করার জন্য অনুরোধ করা হচ্ছে।"]},ri=[{id:"green_line",name:"Green Line Paribahan",bnName:"গ্রীন লাইন পরিবহন",shortName:"GL",logo:"#006a4e",rating:4.2,website:"greenlinebd.com",phone:["09613316557","16557","01886-776586"],email:"greenline2009@gmail.com",headquarters:"9/2 Outer Circular Rd, Momen Bagh, Rajarbagh, Dhaka-1217",established:1990,fleetSize:"60+ Volvo/Scania buses",busTypes:["AC Sleeper (Volvo)","AC Sleeper (Scania)","Premium AC (MAN)"],coverage:"Nationwide + Kolkata (India)",routes:[{id:"gl_dhaka_chittagong",from:"Dhaka",to:"Chattogram",fromBn:"ঢাকা",toBn:"চট্টগ্রাম",dhakaCounters:["Arambagh (Motijheel)","Kalyanpur","Mohakhali"],destCounters:["Oxygen More (Chattogram City)","Agrabad","GEC Circle"],distanceKm:242,durationHrs:"5-6h",fareNonAC:"৳680",fareAC:"৳1200",departureTimes:["22:00","23:00","23:30","07:00","08:00"],returnTimes:["22:00","23:00","07:00"],busType:["AC Sleeper","AC"],stops:[{name:"Dhaka (Arambagh)",bnName:"ঢাকা (আরামবাগ)",type:"origin"},{name:"Kanchpur Bridge",bnName:"কাঁচপুর ব্রিজ",arrivalTime:"01:00",type:"stop"},{name:"Cumilla (Cantonment)",bnName:"কুমিল্লা (ক্যান্টনমেন্ট)",arrivalTime:"01:30",type:"major"},{name:"Feni",bnName:"ফেনী",arrivalTime:"02:30",type:"major"},{name:"Sitakunda",bnName:"সীতাকুণ্ড",arrivalTime:"03:30",type:"stop"},{name:"Chattogram (Oxygen More)",bnName:"চট্টগ্রাম (অক্সিজেন মোড়)",arrivalTime:"04:00",type:"destination"}]},{id:"gl_dhaka_coxsbazar",from:"Dhaka",to:"Cox's Bazar",fromBn:"ঢাকা",toBn:"কক্সবাজার",dhakaCounters:["Arambagh (Motijheel)","Kalyanpur","Mohakhali"],destCounters:["Kolatoli","Cox's Bazar Bus Terminal"],distanceKm:430,durationHrs:"10-12h",fareNonAC:"৳900",fareAC:"৳1800",departureTimes:["21:00","22:00","23:00"],returnTimes:["21:00","22:00"],busType:["AC Sleeper","Non-AC"],stops:[{name:"Dhaka (Arambagh)",bnName:"ঢাকা (আরামবাগ)",type:"origin"},{name:"Cumilla (Cantonment)",bnName:"কুমিল্লা",arrivalTime:"23:30",type:"major"},{name:"Feni",bnName:"ফেনী",arrivalTime:"00:30",type:"major"},{name:"Chattogram (Oxygen)",bnName:"চট্টগ্রাম",arrivalTime:"02:00",type:"major"},{name:"Patiya",bnName:"পটিয়া",arrivalTime:"02:45",type:"stop"},{name:"Chakaria",bnName:"চকরিয়া",arrivalTime:"05:00",type:"stop"},{name:"Cox's Bazar",bnName:"কক্সবাজার",arrivalTime:"07:00",type:"destination"}]},{id:"gl_dhaka_sylhet",from:"Dhaka",to:"Sylhet",fromBn:"ঢাকা",toBn:"সিলেট",dhakaCounters:["Mohakhali","Arambagh"],destCounters:["Sylhet Ambarkha","Sylhet City"],distanceKm:240,durationHrs:"4-5h",fareNonAC:"৳570",fareAC:"৳1200",departureTimes:["06:00","08:00","21:00","22:00","23:00"],returnTimes:["06:00","08:00","21:00","22:00"],busType:["AC Sleeper","AC"],stops:[{name:"Dhaka (Mohakhali)",bnName:"ঢাকা (মহাখালী)",type:"origin"},{name:"Narsingdi",bnName:"নরসিংদী",arrivalTime:"01:00",type:"stop"},{name:"Bhairab Bazar",bnName:"ভৈরব বাজার",arrivalTime:"01:30",type:"major"},{name:"Brahmanbaria",bnName:"ব্রাহ্মণবাড়িয়া",arrivalTime:"02:00",type:"stop"},{name:"Sylhet",bnName:"সিলেট",arrivalTime:"05:00",type:"destination"}]},{id:"gl_dhaka_khulna",from:"Dhaka",to:"Khulna",fromBn:"ঢাকা",toBn:"খুলনা",dhakaCounters:["Kalyanpur","Gabtoli"],destCounters:["Khulna Sonadanga Bus Terminal","Rupsha"],distanceKm:270,durationHrs:"4-5h",fareNonAC:"৳650",fareAC:"৳1200",departureTimes:["07:00","08:30","21:00","22:00"],returnTimes:["07:00","21:00"],busType:["AC Sleeper","AC"],stops:[{name:"Dhaka (Kalyanpur)",bnName:"ঢাকা (কল্যাণপুর)",type:"origin"},{name:"Mawa Ghat",bnName:"মাওয়া ঘাট",arrivalTime:"01:00",type:"stop"},{name:"Bhanga (Padma Bridge)",bnName:"ভাঙ্গা (পদ্মা সেতু)",arrivalTime:"01:15",type:"major"},{name:"Faridpur",bnName:"ফরিদপুর",arrivalTime:"01:45",type:"stop"},{name:"Jessore (Notun Bus Stand)",bnName:"যশোর",arrivalTime:"03:00",type:"major"},{name:"Khulna",bnName:"খুলনা",arrivalTime:"04:30",type:"destination"}]},{id:"gl_dhaka_benapole",from:"Dhaka",to:"Benapole",fromBn:"ঢাকা",toBn:"বেনাপোল",dhakaCounters:["Gabtoli","Kalyanpur"],destCounters:["Benapole Zero Point","Benapole Land Port"],distanceKm:215,durationHrs:"3.5-4.5h",fareNonAC:"৳700",fareAC:"৳1200",departureTimes:["07:00","08:00","09:00","10:00"],returnTimes:["07:00","08:00","12:00"],busType:["AC","Non-AC"],stops:[{name:"Dhaka (Gabtoli)",bnName:"ঢাকা (গাবতলী)",type:"origin"},{name:"Bhanga (Padma Bridge)",bnName:"ভাঙ্গা",arrivalTime:"01:15",type:"major"},{name:"Jessore",bnName:"যশোর",arrivalTime:"03:00",type:"major"},{name:"Benapole (Zero Point)",bnName:"বেনাপোল (জিরো পয়েন্ট)",arrivalTime:"04:00",type:"destination"}]}],policy:{...xe,cancellation:"Cancel 24h+: 10% fee. Cancel 12–24h: 20% fee. Cancel <12h: 50% fee. Counter tickets: non-refundable after departure.",cancellationBn:"বাতিল ২৪ঘণ্টা+ আগে: ১০% ফি। বাতিল ১২-২৪ঘণ্টা: ২০% ফি। বাতিল ১২ঘণ্টার কম: ৫০% ফি। কাউন্টার টিকেট: ছাড়ার পরে অফেরতযোগ্য।",luggage:"20kg free. Extra ৳5/kg. No food items in premium sleepers.",luggageBn:"২০ কেজি বিনামূল্যে। অতিরিক্ত ৳৫/কেজি। প্রিমিয়াম স্লিপারে খাবার নিষিদ্ধ।",idRequired:!0,specialNotes:["Premium Volvo/Scania sleeper — bring NID/passport for identity verification.","Online booking via greenlinebd.com or Shohoz.com.","International route (Kolkata) requires passport."],specialNotesBn:["প্রিমিয়াম ভলভো/স্ক্যানিয়া স্লিপার — পরিচয় যাচাইয়ের জন্য এনআইডি/পাসপোর্ট আনুন।","greenlinebd.com বা Shohoz.com-এ অনলাইনে বুকিং করুন।","আন্তর্জাতিক রুট (কলকাতা)-এর জন্য পাসপোর্ট প্রয়োজন।"]}},{id:"shohag",name:"Shohag Paribahan",bnName:"সোহাগ পরিবহন",shortName:"SH",logo:"#1e40af",rating:4.3,website:"shohagparibahan.com",phone:["01711-612433","09614-000777"],headquarters:"Malibagh, Dhaka",fleetSize:"100+ buses",busTypes:["AC (Double Decker)","AC Coach","Semi-Sleeper AC","Non-AC"],coverage:"Southern & Western Bangladesh",routes:[{id:"sh_dhaka_khulna",from:"Dhaka",to:"Khulna",fromBn:"ঢাকা",toBn:"খুলনা",dhakaCounters:["Malibagh","Gabtoli","Jigatola"],destCounters:["Khulna Sonadanga Terminal","Shibbari More"],distanceKm:270,durationHrs:"4-5h",fareNonAC:"৳650",fareAC:"৳1100",departureTimes:["06:30","07:30","08:30","09:30","14:00","15:00","21:00","22:00","23:00"],returnTimes:["06:30","07:30","14:00","21:00","22:00"],busType:["AC Coach","Non-AC"],stops:[{name:"Dhaka (Malibagh)",bnName:"ঢাকা (মালিবাগ)",type:"origin"},{name:"Postogola Bridge",bnName:"পোস্তগোলা ব্রিজ",arrivalTime:"00:20",type:"stop"},{name:"Mawa Ghat",bnName:"মাওয়া ঘাট",arrivalTime:"01:00",type:"stop"},{name:"Bhanga (Padma Bridge)",bnName:"ভাঙ্গা (পদ্মা সেতু)",arrivalTime:"01:20",type:"major"},{name:"Faridpur",bnName:"ফরিদপুর",arrivalTime:"01:50",type:"stop"},{name:"Jessore",bnName:"যশোর",arrivalTime:"03:00",type:"major"},{name:"Khulna",bnName:"খুলনা",arrivalTime:"04:30",type:"destination"}]},{id:"sh_dhaka_barisal",from:"Dhaka",to:"Barishal",fromBn:"ঢাকা",toBn:"বরিশাল",dhakaCounters:["Malibagh","Gabtoli","Gulistan"],destCounters:["Barishal Natullabad Bus Stand","Barishal City"],distanceKm:185,durationHrs:"3-4h",fareNonAC:"৳500",fareAC:"৳900",departureTimes:["07:00","08:00","09:00","12:00","14:00","15:00","21:00","22:00"],returnTimes:["07:00","08:00","14:00","21:00"],busType:["AC Coach","Non-AC"],stops:[{name:"Dhaka (Malibagh)",bnName:"ঢাকা (মালিবাগ)",type:"origin"},{name:"Bhanga (Padma Bridge)",bnName:"ভাঙ্গা (পদ্মা সেতু)",arrivalTime:"01:20",type:"major"},{name:"Faridpur",bnName:"ফরিদপুর",arrivalTime:"01:50",type:"stop"},{name:"Madaripur",bnName:"মাদারীপুর",arrivalTime:"02:15",type:"stop"},{name:"Barishal (Natullabad)",bnName:"বরিশাল (নথুল্লাবাদ)",arrivalTime:"03:30",type:"destination"}]},{id:"sh_dhaka_jessore",from:"Dhaka",to:"Jashore",fromBn:"ঢাকা",toBn:"যশোর",dhakaCounters:["Malibagh","Gabtoli"],destCounters:["Jessore Notun Bus Stand"],distanceKm:210,durationHrs:"3-4h",fareNonAC:"৳600",fareAC:"৳1000",departureTimes:["07:00","08:00","10:00","14:00","21:00","22:00"],returnTimes:["07:00","14:00","21:00"],busType:["AC Coach","Non-AC"],stops:[{name:"Dhaka (Malibagh)",bnName:"ঢাকা (মালিবাগ)",type:"origin"},{name:"Bhanga (Padma Bridge)",bnName:"ভাঙ্গা",arrivalTime:"01:20",type:"major"},{name:"Jessore",bnName:"যশোর",arrivalTime:"03:00",type:"destination"}]},{id:"sh_dhaka_satkhira",from:"Dhaka",to:"Satkhira",fromBn:"ঢাকা",toBn:"সাতক্ষীরা",dhakaCounters:["Malibagh","Gabtoli"],destCounters:["Satkhira Bus Terminal"],distanceKm:290,durationHrs:"5-6h",fareNonAC:"৳700",fareAC:"৳1200",departureTimes:["07:00","21:00","22:00"],returnTimes:["07:00","21:00"],busType:["AC Coach","Non-AC"],stops:[{name:"Dhaka (Malibagh)",bnName:"ঢাকা (মালিবাগ)",type:"origin"},{name:"Bhanga",bnName:"ভাঙ্গা",arrivalTime:"01:20",type:"major"},{name:"Jessore",bnName:"যশোর",arrivalTime:"03:00",type:"major"},{name:"Satkhira",bnName:"সাতক্ষীরা",arrivalTime:"05:00",type:"destination"}]}],policy:{...xe,specialNotes:["Book via Shohoz.com or counter at Malibagh/Gabtoli.","Double Decker AC service on Dhaka–Khulna corridor.","Padma Bridge routes: no ferry crossing, consistent schedules."],specialNotesBn:["Shohoz.com বা মালিবাগ/গাবতলী কাউন্টারে বুকিং করুন।","ঢাকা–খুলনা করিডোরে ডাবল ডেকার এসি সার্ভিস।","পদ্মা সেতু রুটে ফেরি পার নেই, নিয়মিত সময়সূচি।"]}},{id:"hanif",name:"Hanif Enterprise",bnName:"হানিফ এন্টারপ্রাইজ",shortName:"HF",logo:"#b91c1c",rating:4,website:"hanifenterprise.com",phone:["01713-402641","01713-402673","16374"],headquarters:"Panthapath, Dhaka",established:1984,fleetSize:"200+ buses",busTypes:["AC Sleeper","AC Coach","Non-AC","Double Decker"],coverage:"All 64 districts",routes:[{id:"hf_dhaka_chittagong",from:"Dhaka",to:"Chattogram",fromBn:"ঢাকা",toBn:"চট্টগ্রাম",dhakaCounters:["Sayedabad","Arambagh","Kalyanpur"],destCounters:["Chittagong Dampara","Agrabad"],distanceKm:242,durationHrs:"5-6h",fareNonAC:"৳680",fareAC:"৳1100",departureTimes:["06:00","07:00","22:00","23:00"],returnTimes:["06:00","22:00"],busType:["AC Sleeper","Non-AC"],stops:[{name:"Dhaka (Sayedabad)",bnName:"ঢাকা (সায়েদাবাদ)",type:"origin"},{name:"Kanchpur",bnName:"কাঁচপুর",arrivalTime:"00:40",type:"stop"},{name:"Cumilla",bnName:"কুমিল্লা",arrivalTime:"01:30",type:"major"},{name:"Feni",bnName:"ফেনী",arrivalTime:"02:30",type:"major"},{name:"Chattogram",bnName:"চট্টগ্রাম",arrivalTime:"04:00",type:"destination"}]},{id:"hf_dhaka_coxsbazar",from:"Dhaka",to:"Cox's Bazar",fromBn:"ঢাকা",toBn:"কক্সবাজার",dhakaCounters:["Sayedabad","Arambagh"],destCounters:["Cox's Bazar Terminal","Kolatoli"],distanceKm:430,durationHrs:"10-12h",fareNonAC:"৳900",fareAC:"৳1600",departureTimes:["21:00","22:00","23:00"],returnTimes:["21:00","22:00"],busType:["AC Sleeper","Non-AC"],stops:[{name:"Dhaka (Sayedabad)",bnName:"ঢাকা (সায়েদাবাদ)",type:"origin"},{name:"Cumilla",bnName:"কুমিল্লা",arrivalTime:"23:30",type:"major"},{name:"Feni",bnName:"ফেনী",arrivalTime:"00:30",type:"major"},{name:"Chattogram",bnName:"চট্টগ্রাম",arrivalTime:"02:00",type:"major"},{name:"Chakaria",bnName:"চকরিয়া",arrivalTime:"05:00",type:"stop"},{name:"Cox's Bazar",bnName:"কক্সবাজার",arrivalTime:"07:00",type:"destination"}]},{id:"hf_dhaka_sylhet",from:"Dhaka",to:"Sylhet",fromBn:"ঢাকা",toBn:"সিলেট",dhakaCounters:["Mohakhali","Sayedabad"],destCounters:["Sylhet Ambarkha","Amberkhana"],distanceKm:240,durationHrs:"4-5h",fareNonAC:"৳570",fareAC:"৳1000",departureTimes:["07:00","08:00","22:00","23:00"],returnTimes:["07:00","22:00"],busType:["AC","Non-AC"],stops:[{name:"Dhaka (Mohakhali)",bnName:"ঢাকা (মহাখালী)",type:"origin"},{name:"Narsingdi",bnName:"নরসিংদী",arrivalTime:"01:00",type:"stop"},{name:"Bhairab",bnName:"ভৈরব",arrivalTime:"01:30",type:"major"},{name:"Brahmanbaria",bnName:"ব্রাহ্মণবাড়িয়া",arrivalTime:"02:00",type:"stop"},{name:"Sylhet",bnName:"সিলেট",arrivalTime:"05:00",type:"destination"}]},{id:"hf_dhaka_rajshahi",from:"Dhaka",to:"Rajshahi",fromBn:"ঢাকা",toBn:"রাজশাহী",dhakaCounters:["Gabtoli","Kalyanpur"],destCounters:["Rajshahi Shaheb Bazar","Rajshahi Bus Terminal"],distanceKm:265,durationHrs:"5-6h",fareNonAC:"৳650",fareAC:"৳1100",departureTimes:["07:00","08:00","09:00","21:00","22:00"],returnTimes:["07:00","08:00","21:00"],busType:["AC","Non-AC"],stops:[{name:"Dhaka (Gabtoli)",bnName:"ঢাকা (গাবতলী)",type:"origin"},{name:"Aricha Ghat / Paturia",bnName:"আরিচা / পাটুরিয়া",arrivalTime:"01:30",type:"major"},{name:"Sirajganj",bnName:"সিরাজগঞ্জ",arrivalTime:"02:30",type:"major"},{name:"Natore",bnName:"নাটোর",arrivalTime:"04:00",type:"stop"},{name:"Rajshahi",bnName:"রাজশাহী",arrivalTime:"05:30",type:"destination"}]}],policy:{...xe,specialNotes:["Nationwide coverage — 64 districts served.","Book online via Shohoz.com or call 16374.","Hanif has been operating since 1984 — one of oldest operators."],specialNotesBn:["সারাদেশ কভারেজ — ৬৪ জেলায় সার্ভিস।","Shohoz.com-এ অনলাইনে বুকিং করুন বা কল করুন ১৬৩৭৪।","হানিফ ১৯৮৪ সাল থেকে পরিচালিত — অন্যতম পুরনো অপারেটর।"]}},{id:"nabil",name:"Nabil Paribahan",bnName:"নাবিল পরিবহন",shortName:"NB",logo:"#0369a1",rating:4.1,website:"nabilparibahan.com",phone:["01985-555554","01193-106611","09613655555"],headquarters:"Gabtoli, Dhaka",established:1996,fleetSize:"80+ buses",busTypes:["AC Coach","AC Sleeper","Non-AC"],coverage:"Northern Bangladesh",routes:[{id:"nb_dhaka_rangpur",from:"Dhaka",to:"Rangpur",fromBn:"ঢাকা",toBn:"রংপুর",dhakaCounters:["Gabtoli","Kalyanpur","Uttara (Mazar Road)"],destCounters:["Rangpur Modern Mor","Rangpur Bus Terminal"],distanceKm:320,durationHrs:"6-7h",fareNonAC:"৳800",fareAC:"৳1300",departureTimes:["07:00","08:00","09:00","21:00","22:00","23:00"],returnTimes:["07:00","08:00","21:00"],busType:["AC Coach","Non-AC"],stops:[{name:"Dhaka (Gabtoli)",bnName:"ঢাকা (গাবতলী)",type:"origin"},{name:"Tangail",bnName:"টাঙ্গাইল",arrivalTime:"01:30",type:"major"},{name:"Sirajganj",bnName:"সিরাজগঞ্জ",arrivalTime:"02:30",type:"major"},{name:"Bogura",bnName:"বগুড়া",arrivalTime:"03:30",type:"major"},{name:"Gaibandha",bnName:"গাইবান্ধা",arrivalTime:"04:30",type:"stop"},{name:"Rangpur",bnName:"রংপুর",arrivalTime:"06:00",type:"destination"}]},{id:"nb_dhaka_dinajpur",from:"Dhaka",to:"Dinajpur",fromBn:"ঢাকা",toBn:"দিনাজপুর",dhakaCounters:["Gabtoli","Kalyanpur","Uttara"],destCounters:["Dinajpur Town","Dinajpur Bus Stand"],distanceKm:430,durationHrs:"7-8h",fareNonAC:"৳850",fareAC:"৳1400",departureTimes:["07:00","08:00","21:00","22:00"],returnTimes:["07:00","21:00"],busType:["AC Coach","Non-AC"],stops:[{name:"Dhaka (Gabtoli)",bnName:"ঢাকা (গাবতলী)",type:"origin"},{name:"Tangail",bnName:"টাঙ্গাইল",arrivalTime:"01:30",type:"major"},{name:"Bogura",bnName:"বগুড়া",arrivalTime:"03:30",type:"major"},{name:"Rangpur",bnName:"রংপুর",arrivalTime:"05:30",type:"major"},{name:"Saidpur",bnName:"সৈয়দপুর",arrivalTime:"06:30",type:"stop"},{name:"Dinajpur",bnName:"দিনাজপুর",arrivalTime:"07:30",type:"destination"}]},{id:"nb_dhaka_thakurgaon",from:"Dhaka",to:"Thakurgaon",fromBn:"ঢাকা",toBn:"ঠাকুরগাঁও",dhakaCounters:["Gabtoli","Uttara"],destCounters:["Thakurgaon Bus Terminal"],distanceKm:480,durationHrs:"8-9h",fareNonAC:"৳950",fareAC:"৳1600",departureTimes:["07:00","21:00"],returnTimes:["07:00","21:00"],busType:["AC Coach","Non-AC"],stops:[{name:"Dhaka (Gabtoli)",bnName:"ঢাকা (গাবতলী)",type:"origin"},{name:"Bogura",bnName:"বগুড়া",arrivalTime:"03:30",type:"major"},{name:"Rangpur",bnName:"রংপুর",arrivalTime:"05:30",type:"major"},{name:"Dinajpur",bnName:"দিনাজপুর",arrivalTime:"07:30",type:"major"},{name:"Thakurgaon",bnName:"ঠাকুরগাঁও",arrivalTime:"08:30",type:"destination"}]}],policy:{...xe,specialNotes:["Specialist in northern Bangladesh routes.","Earliest morning departures from Gabtoli 7 AM.","Book via Shohoz.com, call 09613655555."],specialNotesBn:["উত্তরাঞ্চলের রুটে বিশেষজ্ঞ।","গাবতলী থেকে সকাল ৭টায় প্রথম ছাড়।","Shohoz.com-এ বুকিং করুন বা কল করুন ০৯৬১৩৬৫৫৫৫৫।"]}},{id:"ena",name:"Ena Transport",bnName:"এনা পরিবহন",shortName:"EN",logo:"#7c3aed",rating:4.1,website:"enatransport.com",phone:["01712-069722","16353"],headquarters:"Mohakhali, Dhaka",fleetSize:"150+ buses",busTypes:["AC Coach","Non-AC","Mini Coach"],coverage:"Dhaka Metro + Central Bangladesh",routes:[{id:"en_dhaka_mymensingh",from:"Dhaka",to:"Mymensingh",fromBn:"ঢাকা",toBn:"ময়মনসিংহ",dhakaCounters:["Mohakhali","Rampura"],destCounters:["Mymensingh Town Hall","Circuit House Mor"],distanceKm:120,durationHrs:"2-2.5h",fareNonAC:"৳350",fareAC:"৳500",departureTimes:["07:00","08:00","09:00","10:00","12:00","14:00","16:00","18:00"],returnTimes:["07:00","09:00","14:00","16:00"],busType:["AC Coach","Non-AC"],stops:[{name:"Dhaka (Mohakhali)",bnName:"ঢাকা (মহাখালী)",type:"origin"},{name:"Tongi",bnName:"টঙ্গী",arrivalTime:"00:30",type:"stop"},{name:"Mymensingh",bnName:"ময়মনসিংহ",arrivalTime:"02:00",type:"destination"}]},{id:"en_dhaka_sylhet",from:"Dhaka",to:"Sylhet",fromBn:"ঢাকা",toBn:"সিলেট",dhakaCounters:["Mohakhali"],destCounters:["Sylhet Ambarkha"],distanceKm:240,durationHrs:"4-5h",fareNonAC:"৳570",fareAC:"৳900",departureTimes:["07:00","08:00","22:00","23:00"],returnTimes:["07:00","22:00"],busType:["AC","Non-AC"],stops:[{name:"Dhaka (Mohakhali)",bnName:"ঢাকা (মহাখালী)",type:"origin"},{name:"Narsingdi",bnName:"নরসিংদী",arrivalTime:"01:00",type:"stop"},{name:"Bhairab",bnName:"ভৈরব",arrivalTime:"01:30",type:"major"},{name:"Sylhet",bnName:"সিলেট",arrivalTime:"05:00",type:"destination"}]},{id:"en_dhaka_kishoreganj",from:"Dhaka",to:"Kishoreganj",fromBn:"ঢাকা",toBn:"কিশোরগঞ্জ",dhakaCounters:["Mohakhali"],destCounters:["Kishoreganj Town"],distanceKm:100,durationHrs:"2h",fareNonAC:"৳400",fareAC:"৳600",departureTimes:["07:00","08:00","09:00","14:00"],returnTimes:["07:00","09:00","14:00"],busType:["AC","Non-AC"],stops:[{name:"Dhaka (Mohakhali)",bnName:"ঢাকা (মহাখালী)",type:"origin"},{name:"Bhairab",bnName:"ভৈরব",arrivalTime:"01:30",type:"stop"},{name:"Kishoreganj",bnName:"কিশোরগঞ্জ",arrivalTime:"02:00",type:"destination"}]}],policy:xe},{id:"sr_travels",name:"SR Travels",bnName:"এসআর ট্রাভেলস",shortName:"SR",logo:"#b45309",rating:4,website:"srtravels.com.bd",phone:["01716-560641","01711-356616"],headquarters:"Gabtoli, Dhaka",fleetSize:"60+ buses",busTypes:["AC Coach","Non-AC"],coverage:"Northern & Rajshahi Division",routes:[{id:"sr_dhaka_bogura",from:"Dhaka",to:"Bogura",fromBn:"ঢাকা",toBn:"বগুড়া",dhakaCounters:["Gabtoli","Kalyanpur"],destCounters:["Bogura Tinmatha","Satmatha"],distanceKm:250,durationHrs:"4-5h",fareNonAC:"৳500",fareAC:"৳900",departureTimes:["07:00","08:00","09:00","14:00","21:00","22:00"],returnTimes:["07:00","09:00","21:00"],busType:["AC Coach","Non-AC"],stops:[{name:"Dhaka (Gabtoli)",bnName:"ঢাকা (গাবতলী)",type:"origin"},{name:"Tangail",bnName:"টাঙ্গাইল",arrivalTime:"01:30",type:"major"},{name:"Sirajganj",bnName:"সিরাজগঞ্জ",arrivalTime:"02:30",type:"major"},{name:"Bogura",bnName:"বগুড়া",arrivalTime:"04:00",type:"destination"}]},{id:"sr_dhaka_rajshahi",from:"Dhaka",to:"Rajshahi",fromBn:"ঢাকা",toBn:"রাজশাহী",dhakaCounters:["Gabtoli","Kalyanpur"],destCounters:["Rajshahi Shaheb Bazar"],distanceKm:265,durationHrs:"5h",fareNonAC:"৳650",fareAC:"৳1000",departureTimes:["07:00","08:00","21:00","22:00"],returnTimes:["07:00","21:00"],busType:["AC Coach","Non-AC"],stops:[{name:"Dhaka (Gabtoli)",bnName:"ঢাকা (গাবতলী)",type:"origin"},{name:"Tangail",bnName:"টাঙ্গাইল",arrivalTime:"01:30",type:"major"},{name:"Sirajganj",bnName:"সিরাজগঞ্জ",arrivalTime:"02:30",type:"major"},{name:"Bogura",bnName:"বগুড়া",arrivalTime:"04:00",type:"major"},{name:"Natore",bnName:"নাটোর",arrivalTime:"04:45",type:"stop"},{name:"Rajshahi",bnName:"রাজশাহী",arrivalTime:"05:30",type:"destination"}]}],policy:xe},{id:"sakura",name:"Sakura Paribahan",bnName:"সাকুরা পরিবহন",shortName:"SK",logo:"#be185d",rating:4,website:"sakuraparibahan.com",phone:["01729-556677","01711-4022341"],headquarters:"Gabtoli / Sayedabad, Dhaka",fleetSize:"80+ buses",busTypes:["AC Coach","Non-AC"],coverage:"Barishal Division + Kuakata",routes:[{id:"sk_dhaka_barisal",from:"Dhaka",to:"Barishal",fromBn:"ঢাকা",toBn:"বরিশাল",dhakaCounters:["Gabtoli","Sayedabad","Gulistan"],destCounters:["Barishal Natullabad Bus Stand"],distanceKm:185,durationHrs:"3-4h",fareNonAC:"৳500",fareAC:"৳900",departureTimes:["07:00","08:00","09:00","14:00","21:00","22:00"],returnTimes:["07:00","14:00","21:00"],busType:["AC Coach","Non-AC"],stops:[{name:"Dhaka (Gabtoli)",bnName:"ঢাকা (গাবতলী)",type:"origin"},{name:"Padma Bridge (Bhanga)",bnName:"পদ্মা সেতু (ভাঙ্গা)",arrivalTime:"01:20",type:"major"},{name:"Faridpur",bnName:"ফরিদপুর",arrivalTime:"01:50",type:"stop"},{name:"Madaripur",bnName:"মাদারীপুর",arrivalTime:"02:20",type:"stop"},{name:"Barishal",bnName:"বরিশাল",arrivalTime:"03:30",type:"destination"}]},{id:"sk_dhaka_kuakata",from:"Dhaka",to:"Kuakata",fromBn:"ঢাকা",toBn:"কুয়াকাটা",dhakaCounters:["Gabtoli","Sayedabad"],destCounters:["Kuakata Beach","Patuakhali Bus Terminal"],distanceKm:330,durationHrs:"6-7h",fareNonAC:"৳850",fareAC:"৳1500",departureTimes:["07:00","21:00","22:00"],returnTimes:["07:00","21:00"],busType:["AC Coach","Non-AC"],stops:[{name:"Dhaka (Gabtoli)",bnName:"ঢাকা (গাবতলী)",type:"origin"},{name:"Padma Bridge",bnName:"পদ্মা সেতু",arrivalTime:"01:20",type:"major"},{name:"Barishal",bnName:"বরিশাল",arrivalTime:"03:30",type:"major"},{name:"Patuakhali",bnName:"পটুয়াখালী",arrivalTime:"04:30",type:"major"},{name:"Kuakata",bnName:"কুয়াকাটা",arrivalTime:"06:30",type:"destination"}]}],policy:xe},{id:"saudia",name:"Saudia Paribahan",bnName:"সৌদিয়া পরিবহন",shortName:"SD",logo:"#166534",rating:4.1,website:"saudiaparibahan.com",phone:["01711-629960","09613316161"],headquarters:"Arambagh / Kalyanpur, Dhaka",fleetSize:"70+ buses",busTypes:["AC Sleeper","AC Coach","Non-AC"],coverage:"Chittagong Division + Cox's Bazar corridor",routes:[{id:"sd_dhaka_chittagong",from:"Dhaka",to:"Chattogram",fromBn:"ঢাকা",toBn:"চট্টগ্রাম",dhakaCounters:["Arambagh","Kalyanpur","Fakirapool"],destCounters:["Chattogram Oxygen More","Kazir Dewri"],distanceKm:242,durationHrs:"5-6h",fareNonAC:"৳680",fareAC:"৳1200",departureTimes:["07:00","08:00","22:00","23:00"],returnTimes:["07:00","22:00"],busType:["AC Sleeper","AC"],stops:[{name:"Dhaka (Arambagh)",bnName:"ঢাকা (আরামবাগ)",type:"origin"},{name:"Kanchpur",bnName:"কাঁচপুর",arrivalTime:"00:40",type:"stop"},{name:"Cumilla",bnName:"কুমিল্লা",arrivalTime:"01:30",type:"major"},{name:"Feni",bnName:"ফেনী",arrivalTime:"02:30",type:"major"},{name:"Chattogram",bnName:"চট্টগ্রাম",arrivalTime:"04:00",type:"destination"}]},{id:"sd_dhaka_coxsbazar",from:"Dhaka",to:"Cox's Bazar",fromBn:"ঢাকা",toBn:"কক্সবাজার",dhakaCounters:["Arambagh","Fakirapool","Sayedabad"],destCounters:["Cox's Bazar Kolatoli","Cox's Bazar Bus Terminal"],distanceKm:430,durationHrs:"10-12h",fareNonAC:"৳900",fareAC:"৳1800",departureTimes:["21:00","22:00","23:00"],returnTimes:["21:00","22:00"],busType:["AC Sleeper","Non-AC"],stops:[{name:"Dhaka (Arambagh)",bnName:"ঢাকা (আরামবাগ)",type:"origin"},{name:"Cumilla",bnName:"কুমিল্লা",arrivalTime:"23:30",type:"major"},{name:"Feni",bnName:"ফেনী",arrivalTime:"00:30",type:"major"},{name:"Chattogram",bnName:"চট্টগ্রাম",arrivalTime:"02:00",type:"major"},{name:"Chakaria",bnName:"চকরিয়া",arrivalTime:"05:00",type:"stop"},{name:"Cox's Bazar",bnName:"কক্সবাজার",arrivalTime:"07:00",type:"destination"}]}],policy:xe},{id:"desh_travels",name:"Desh Travels",bnName:"দেশ ট্রাভেলস",shortName:"DT",logo:"#92400e",rating:3.9,website:"deshtravels.com.bd",phone:["01762-684433","01762-684405"],headquarters:"Kalyanpur / Arambagh, Dhaka",fleetSize:"50+ buses",busTypes:["AC Coach","Non-AC"],coverage:"Rajshahi Division",routes:[{id:"dt_dhaka_rajshahi",from:"Dhaka",to:"Rajshahi",fromBn:"ঢাকা",toBn:"রাজশাহী",dhakaCounters:["Kalyanpur","Arambagh"],destCounters:["Rajshahi Shaheb Bazar","Rajshahi Bus Terminal"],distanceKm:265,durationHrs:"5-6h",fareNonAC:"৳650",fareAC:"৳1100",departureTimes:["07:00","08:00","09:00","21:00","22:00"],returnTimes:["07:00","08:00","21:00"],busType:["AC Coach","Non-AC"],stops:[{name:"Dhaka (Kalyanpur)",bnName:"ঢাকা (কল্যাণপুর)",type:"origin"},{name:"Aricha Ghat",bnName:"আরিচা ঘাট",arrivalTime:"01:30",type:"major"},{name:"Sirajganj",bnName:"সিরাজগঞ্জ",arrivalTime:"02:30",type:"major"},{name:"Natore",bnName:"নাটোর",arrivalTime:"04:00",type:"stop"},{name:"Rajshahi",bnName:"রাজশাহী",arrivalTime:"05:30",type:"destination"}]},{id:"dt_dhaka_chapai",from:"Dhaka",to:"Chapainawabganj",fromBn:"ঢাকা",toBn:"চাঁপাইনবাবগঞ্জ",dhakaCounters:["Kalyanpur","Arambagh"],destCounters:["Chapainawabganj Bus Terminal"],distanceKm:310,durationHrs:"6-7h",fareNonAC:"৳800",fareAC:"৳1300",departureTimes:["07:00","21:00"],returnTimes:["07:00","21:00"],busType:["AC Coach","Non-AC"],stops:[{name:"Dhaka (Kalyanpur)",bnName:"ঢাকা (কল্যাণপুর)",type:"origin"},{name:"Sirajganj",bnName:"সিরাজগঞ্জ",arrivalTime:"02:30",type:"major"},{name:"Rajshahi",bnName:"রাজশাহী",arrivalTime:"05:30",type:"major"},{name:"Chapainawabganj",bnName:"চাঁপাইনবাবগঞ্জ",arrivalTime:"06:30",type:"destination"}]}],policy:xe},{id:"eagle",name:"Eagle Paribahan",bnName:"ঈগল পরিবহন",shortName:"EG",logo:"#1d4ed8",rating:4,website:"eagleparibahan.com",phone:["+8802477763501","01750038855"],headquarters:"Jess Tower, M.K. Road, Jessore-7400",fleetSize:"80+ buses",busTypes:["AC Coach","Non-AC"],coverage:"Southern Bangladesh + Jessore corridor",routes:[{id:"eg_dhaka_jessore",from:"Dhaka",to:"Jashore",fromBn:"ঢাকা",toBn:"যশোর",dhakaCounters:["Gabtoli","Kalyanpur"],destCounters:["Jessore Notun Bus Stand","Jessore Circuit House"],distanceKm:210,durationHrs:"3.5-4.5h",fareNonAC:"৳600",fareAC:"৳1000",departureTimes:["07:00","08:00","09:00","14:00","21:00","22:00"],returnTimes:["07:00","09:00","21:00"],busType:["AC Coach","Non-AC"],stops:[{name:"Dhaka (Gabtoli)",bnName:"ঢাকা (গাবতলী)",type:"origin"},{name:"Padma Bridge (Bhanga)",bnName:"পদ্মা সেতু (ভাঙ্গা)",arrivalTime:"01:20",type:"major"},{name:"Faridpur",bnName:"ফরিদপুর",arrivalTime:"01:50",type:"stop"},{name:"Jessore",bnName:"যশোর",arrivalTime:"03:30",type:"destination"}]},{id:"eg_dhaka_benapole",from:"Dhaka",to:"Benapole",fromBn:"ঢাকা",toBn:"বেনাপোল",dhakaCounters:["Gabtoli","Kalyanpur"],destCounters:["Benapole Zero Point","Benapole Land Port Gate"],distanceKm:215,durationHrs:"3.5-4.5h",fareNonAC:"৳700",fareAC:"৳1100",departureTimes:["07:00","08:00","09:00","10:00","11:00"],returnTimes:["08:00","09:00","10:00","11:00","12:00"],busType:["AC Coach","Non-AC"],stops:[{name:"Dhaka (Gabtoli)",bnName:"ঢাকা (গাবতলী)",type:"origin"},{name:"Padma Bridge (Bhanga)",bnName:"পদ্মা সেতু (ভাঙ্গা)",arrivalTime:"01:20",type:"major"},{name:"Jessore",bnName:"যশোর",arrivalTime:"03:00",type:"major"},{name:"Benapole",bnName:"বেনাপোল",arrivalTime:"04:00",type:"destination"}]},{id:"eg_dhaka_narail",from:"Dhaka",to:"Narail",fromBn:"ঢাকা",toBn:"নড়াইল",dhakaCounters:["Gabtoli"],destCounters:["Narail Bus Terminal"],distanceKm:190,durationHrs:"4h",fareNonAC:"৳550",fareAC:"৳900",departureTimes:["07:00","08:00","14:00"],returnTimes:["07:00","14:00"],busType:["Non-AC"],stops:[{name:"Dhaka (Gabtoli)",bnName:"ঢাকা (গাবতলী)",type:"origin"},{name:"Padma Bridge",bnName:"পদ্মা সেতু",arrivalTime:"01:20",type:"major"},{name:"Narail",bnName:"নড়াইল",arrivalTime:"04:00",type:"destination"}]}],policy:xe},{id:"tisha",name:"Tisha Paribahan",bnName:"তিশা পরিবহন",shortName:"TP",logo:"#065f46",rating:3.9,website:"tishaparibahan.com",phone:["01711-386408"],headquarters:"Sayedabad / Arambagh, Dhaka",fleetSize:"60+ buses",busTypes:["AC Coach","Non-AC"],coverage:"Chattogram Division + Brahmanbaria",routes:[{id:"tp_dhaka_chittagong",from:"Dhaka",to:"Chattogram",fromBn:"ঢাকা",toBn:"চট্টগ্রাম",dhakaCounters:["Sayedabad","Arambagh"],destCounters:["Chattogram Dampara","Oxygen More"],distanceKm:242,durationHrs:"5-6h",fareNonAC:"৳680",fareAC:"৳1100",departureTimes:["07:00","08:00","22:00","23:00"],returnTimes:["07:00","22:00"],busType:["AC Coach","Non-AC"],stops:[{name:"Dhaka (Sayedabad)",bnName:"ঢাকা (সায়েদাবাদ)",type:"origin"},{name:"Cumilla",bnName:"কুমিল্লা",arrivalTime:"01:30",type:"major"},{name:"Feni",bnName:"ফেনী",arrivalTime:"02:30",type:"major"},{name:"Chattogram",bnName:"চট্টগ্রাম",arrivalTime:"04:00",type:"destination"}]},{id:"tp_dhaka_brahmanbaria",from:"Dhaka",to:"Brahmanbaria",fromBn:"ঢাকা",toBn:"ব্রাহ্মণবাড়িয়া",dhakaCounters:["Sayedabad","Mohakhali"],destCounters:["Brahmanbaria Bus Terminal"],distanceKm:100,durationHrs:"2-2.5h",fareNonAC:"৳350",fareAC:"৳500",departureTimes:["07:00","08:00","09:00","14:00","16:00"],returnTimes:["07:00","09:00","14:00"],busType:["AC","Non-AC"],stops:[{name:"Dhaka (Sayedabad)",bnName:"ঢাকা (সায়েদাবাদ)",type:"origin"},{name:"Brahmanbaria",bnName:"ব্রাহ্মণবাড়িয়া",arrivalTime:"02:00",type:"destination"}]}],policy:xe}];function xo(a){const o=a.toLowerCase();return ri.find(d=>d.name.toLowerCase().includes(o)||d.shortName.toLowerCase()===o||d.id===o.replace(/\s+/g,"_"))}function vo(a,o){const d=a.toLowerCase().trim(),t=o.toLowerCase().trim(),n=[];for(const i of ri)for(const r of i.routes){const s=r.from.toLowerCase(),p=r.to.toLowerCase(),h=!d||s.includes(d)||d.includes(s.split(" ")[0]),u=!t||p.includes(t)||t.includes(p.replace("'","").split(" ")[0]);h&&u&&n.push({operator:i,route:r})}return n}const Fa=a=>a==="auto"||/^\d{9,11}$/.test(a),jo="7294303750",ko=Ee.memo(({adSlot:a,adFormat:o="auto",className:d="",responsive:t=!0,layoutKey:n,style:i,onFilled:r})=>{const s=b.useRef(null),p=b.useRef(!1),h=b.useRef(null),u=b.useRef(null),f=()=>{if(!navigator.onLine||!Fa(a))return;const v=s.current;if(!v||p.current)return;const k=v.getAttribute("data-adsbygoogle-status");if(!(k==="done"||k==="filled")){if(typeof window.adsbygoogle>"u"){h.current||(h.current=setTimeout(()=>{h.current=null,f()},2e3));return}p.current=!0;try{(window.adsbygoogle=window.adsbygoogle||[]).push({})}catch{p.current=!1}if(r){const j=A=>{u.current=setTimeout(()=>{const z=s.current;if(!z)return;const C=z.getAttribute("data-adsbygoogle-status");if(C==="filled"){r(!0);return}if(C==="done"){r(!1);return}A<8e3&&j(2e3)},A)};j(3e3)}}};return b.useEffect(()=>{p.current=!1,h.current&&(clearTimeout(h.current),h.current=null),u.current&&(clearTimeout(u.current),u.current=null)},[a]),b.useEffect(()=>{f();const v=()=>{p.current=!1,f()};return window.addEventListener("online",v),()=>{window.removeEventListener("online",v),h.current&&clearTimeout(h.current),u.current&&clearTimeout(u.current)}},[a]),Fa(a)?e.jsx("div",{className:`w-full shrink-0 overflow-hidden ${d}`,style:{minHeight:0,maxHeight:i==null?void 0:i.maxHeight,height:i==null?void 0:i.height,...i},children:e.jsx("ins",{ref:s,className:"adsbygoogle",style:{display:"block",width:"100%",minWidth:0,maxHeight:(i==null?void 0:i.maxHeight)||"none",overflow:"hidden"},"data-ad-client":"ca-pub-8425219156685369","data-ad-slot":a==="auto"?jo:a,"data-ad-format":o,"data-full-width-responsive":t?"true":"false",...n?{"data-ad-layout-key":n}:{}})}):null}),So=({language:a,size:o="728x90",className:d="",compact:t=!1})=>{const n=o==="728x90",i=n?90:250,r=b.useRef(null),s=b.useRef(null),p=b.useRef(null);return b.useEffect(()=>{const h=(v,k,j)=>{v&&(v.style.getPropertyValue(k)===j&&v.style.getPropertyPriority(k)==="important"||v.style.setProperty(k,j,"important"))},u=()=>{h(r.current,"display","block"),h(s.current,"min-height",`${i}px`),h(p.current,"height",`${i}px`),h(p.current,"min-height",`${i}px`),h(p.current,"max-height",`${i}px`)};u();const f=new MutationObserver(u);return[r.current,s.current,p.current].forEach(v=>{v&&f.observe(v,{attributes:!0,attributeFilter:["style"]})}),()=>f.disconnect()},[i]),e.jsx("div",{ref:r,className:`adsense-wrapper kj-ad-reserved w-full ${t?"my-3":"my-5 md:my-6"} ${d}`,children:e.jsx("div",{ref:s,className:"kj-ad-card w-full rounded-2xl overflow-hidden",style:{"--kj-ad-card-height":`${i}px`,"--kj-ad-height":`${i}px`,background:"var(--kj-panel)",border:"1px solid var(--kj-line)",boxShadow:"var(--kj-shadow)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",maxWidth:n?728:400,margin:"0 auto"},children:e.jsx("div",{ref:p,className:"kj-ad-shell relative w-full overflow-hidden",style:{height:i,minHeight:i,maxHeight:i,contain:"strict"},children:e.jsx(ko,{adSlot:"auto",adFormat:n?"horizontal":"rectangle",responsive:n,className:"relative z-10 w-full max-w-full"})})})})},Da={bn:{auth:{login:"লগইন",signup:"সাইনআপ",welcome:"স্বাগতম!",loginToAccount:"আপনার অ্যাকাউন্টে লগইন করুন",email:"ইমেইল",password:"পাসওয়ার্ড",forgotPassword:"পাসওয়ার্ড ভুলে গেছেন?",loginButton:"লগইন করুন",noAccount:"অ্যাকাউন্ট নেই?",register:"রেজিস্ট্রেশন করুন",verifying:"যাচাই করা হচ্ছে...",createAccount:"অ্যাকাউন্ট খুলুন",startJourney:"কই যাবো — আপনার যাত্রা শুরু করুন",fullName:"পুরো নাম",username:"ইউজারনেম",usernameCannotChange:"সাইনআপের পর পরিবর্তনযোগ্য নয়",usernameHint:"শুধু ছোট হাতের অক্ষর, সংখ্যা ও _ ব্যবহার করুন",namePlaceholder:"আপনার নাম",usernamePlaceholder:"যেমন: rahman_123",emailPlaceholder:"আপনার @ email.com",passPlaceholder:"কমপক্ষে ৮ অক্ষর",confirmPass:"পাসওয়ার্ড নিশ্চিত করুন",confirmPassPlaceholder:"পাসওয়ার্ড আবার লিখুন",signupButton:"অ্যাকাউন্ট তৈরি করুন",hasAccount:"ইতিমধ্যে অ্যাকাউন্ট আছে?",creatingAccount:"অ্যাকাউন্ট তৈরি করা হচ্ছে...",creatingAccountTitle:"অ্যাকাউন্ট তৈরি হচ্ছে",processingWait:"সুরক্ষিতভাবে প্রক্রিয়া করা হচ্ছে। দয়া করে অপেক্ষা করুন…",emailVerifying:"ইমেইল যাচাই করা হচ্ছে…",validation:{invalidEmail:"সঠিক ইমেইল দিন।",passwordRequired:"পাসওয়ার্ড দিন।",loginFailed:"লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",loginSuccess:"লগইন সফল হয়েছে!",fullNameRequired:"পুরো নাম লিখুন।",nameTooShort:"নাম কমপক্ষে ২ অক্ষরের হতে হবে।",nameTooLong:"নাম সর্বোচ্চ ৫০ অক্ষরের হতে পারে।",usernameRequired:"ইউজারনেম লিখুন।",usernameTooShort:"ইউজারনেম কমপক্ষে ৩ অক্ষরের হতে হবে।",usernameTooLong:"ইউজারনেম সর্বোচ্চ ৩০ অক্ষরের হতে পারে।",usernameInvalid:"শুধু ছোট হাতের অক্ষর (a-z), সংখ্যা (0-9) ও আন্ডারস্কোর (_) ব্যবহার করুন।",emailRequired:"ইমেইল লিখুন।",tempMailBlocked:"অস্থায়ী বা নকল ইমেইল ঠিকানা দিয়ে নিবন্ধন করা যাবে না। আপনার আসল Gmail, Yahoo বা অন্য বৈধ ইমেইল ব্যবহার করুন।",passwordTooWeak:"পাসওয়ার্ড শক্তিশালী করুন (নিচের শর্তগুলো পূরণ করুন)।",confirmPasswordRequired:"পাসওয়ার্ড নিশ্চিত করুন।",passwordsDoNotMatch:"পাসওয়ার্ড মিলছে না।",signupFailed:"রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",signupSuccess:"অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!",somethingWentWrong:"কিছু সমস্যা হয়েছে।",resetLinkSent:"রিসেট লিংক পাঠানো হয়েছে।",resetLinkFailed:"রিসেট লিংক পাঠাতে ব্যর্থ হয়েছে।",invalidCredentials:"ইমেইল বা পাসওয়ার্ড সঠিক নয়।",accountNotFound:"অ্যাকাউন্ট পাওয়া যায়নি। সাপোর্টে যোগাযোগ করুন।",emailAlreadyRegistered:"এই ইমেইলটি ইতিমধ্যে রেজিস্ট্রেশন করা হয়েছে। লগইন করুন।",usernameTaken:"ইউজারনেমটি ইতিমধ্যে নেওয়া হয়েছে। অন্য নাম বেছে নিন।",connectionFailed:"সংযোগ ব্যর্থ হয়েছে। ইন্টারনেট সংযোগ পরীক্ষা করুন।",requestTimedOut:"অনুরোধ বেশি সময় নিচ্ছে। একটু পরে আবার চেষ্টা করুন।",currentPasswordIncorrect:"বর্তমান পাসওয়ার্ড সঠিক নয়।",userNotFound:"ব্যবহারকারী পাওয়া যায়নি।",googleLoginFailed:"Google লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",googleCancelled:"Google সাইন-ইন বাতিল করা হয়েছে।",googlePopupBlocked:"পপআপ ব্লক হয়েছে। এই সাইটের জন্য পপআপ অনুমতি দিন এবং আবার চেষ্টা করুন।"},continueWithGoogle:"Google দিয়ে চালিয়ে যান",orContinueWith:"অথবা",passwordStrength:{label:"পাসওয়ার্ড:",weak:"দুর্বল",average:"মাঝারি",good:"ভালো",strong:"শক্তিশালী"},passwordRules:{minChars:"কমপক্ষে ৮ অক্ষর",uppercase:"একটি বড় হাতের অক্ষর (A-Z)",lowercase:"একটি ছোট হাতের অক্ষর (a-z)",number:"একটি সংখ্যা (0-9)",specialChar:"একটি বিশেষ চিহ্ন (!@#$%...)"},forgotPasswordPage:{processing:"প্রক্রিয়া করা হচ্ছে",maxWait:"অনুগ্রহ করে অপেক্ষা করুন…",returnToLogin:"লগইনে ফিরুন",passwordReset:"পাসওয়ার্ড রিসেট",registeredEmail:"রেজিস্টার্ড ইমেইল",resetLinkExpired:"রিসেট লিংকের মেয়াদ শেষ হয়েছে। নতুন একটি চাইয়া নিন।",errorTryAgain:"কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।",passwordUpdated:"আপনার পাসওয়ার্ড আপডেট হয়েছে। লগইন পেজে নিয়ে যাওয়া হচ্ছে…",sendingLink:"রিসেট লিংক পাঠানো হচ্ছে…",checkEmail:"আপনার ইমেইল দেখুন",sentLinkTo:"আমরা একটি রিসেট লিংক পাঠিয়েছি",waitingForClick:"লিংকে ক্লিক করার জন্য অপেক্ষা করা হচ্ছে…",pageUpdatesAuto:"পাসওয়ার্ড রিসেট হলে এই পেজ স্বয়ংক্রিয়ভাবে আপডেট হবে।",didntReceive:"পাননি? স্প্যাম ফোল্ডার দেখুন অথবা",resendIn:"{seconds} সেকেন্ড পরে আবার পাঠান",resendLink:"রিসেট লিংক আবার পাঠান",description:"পাসওয়ার্ড রিসেট লিংক পেতে আপনার ইমেইল দিন",sendLink:"রিসেট লিংক পাঠান",emailNotConfigured:"ইমেইল কনফিগার করা নেই — এই লিংকটি সরাসরি ব্যবহার করুন:"},resetPasswordTitle:"নতুন পাসওয়ার্ড সেট করুন",resettingPassword:"পাসওয়ার্ড আপডেট হচ্ছে",redirectingToLogin:"লগইন পেজে নিয়ে যাওয়া হচ্ছে…",setPasswordBtn:"পাসওয়ার্ড সেট করুন",tokenNotFound:'পাসওয়ার্ড রিসেট লিংকটি মেয়াদোত্তীর্ণ বা ভুল। ইমেইলে আসা লিংকে আবার ক্লিক করুন, অথবা নতুন রিসেট লিংকের জন্য "পাসওয়ার্ড ভুলে গেছি" আবার চেষ্টা করুন।'},common:{appName:"কই যাবো",search:"খুঁজুন",loading:"লোড হচ্ছে...",error:"ত্রুটি",save:"সংরক্ষণ করুন",cancel:"বাতিল",close:"বন্ধ করুন",back:"ফিরে যান",next:"পরবর্তী",previous:"পূর্ববর্তী",yes:"হ্যাঁ",no:"না",ok:"ঠিক আছে",select:"নির্বাচন করুন",from:"থেকে",to:"প্রাপ্তি",distance:"দূরত্ব",fare:"ভাড়া",type:"ধরন",stops:"স্টপ",viewDetails:"বিস্তারিত দেখুন",startNavigation:"নেভিগেশন শুরু করুন",menu:"মেনু",local:"লোকাল",sitting:"সিটিং",ac:"এসি",semiSitting:"সেমি-সিটিং",online:"অনলাইন",ready:"প্রস্তুত",tagline:"বাংলাদেশে গণপরিবহন নেভিগেশনে বিপ্লব নিয়ে আসছে",logout:"লগআউট",loginRequired:"এই ফিচারটি ব্যবহার করতে লগইন করুন",loginBtn:"লগইন করুন",signupBtn:"সাইনআপ করুন"},settings:{title:"সেটিংস",subtitle:"আপনার অ্যাপ অভিজ্ঞতা কাস্টমাইজ করুন",language:"ভাষা",languagePreference:"ভাষা পছন্দ",languageDescription:"আপনার পছন্দের ভাষা নির্বাচন করুন",bangla:"বাংলা",english:"ইংরেজি",currentLanguage:"বর্তমান ভাষা",theme:"থিম",themePreference:"থিম পছন্দ",themeDescription:"কই যাবো কেমন দেখাবে তা চয়ন করুন। একটি থিম নির্বাচন করুন বা আপনার সিস্টেমের সাথে সিঙ্ক করুন।",lightMode:"লাইট মোড",darkMode:"ডার্ক মোড",brightTheme:"উজ্জ্বল থিম",easyOnEyes:"চোখে আরামদায়ক",currentTheme:"বর্তমান থিম",light:"হালকা",dark:"অন্ধকার",appInfo:"অ্যাপ তথ্য",version:"সংস্করণ",lastUpdated:"সর্বশেষ আপডেট",supportFeedback:"সমর্থন ও প্রতিক্রিয়া",contactUsBtn:"যোগাযোগ করুন",contactUsDesc:"সাহায্য পান বা সমস্যা রিপোর্ট করুন"},nav:{home:"হোম",aiAssistant:"এআই",history:"ইতিহাস",favorites:"প্রিয়",settings:"সেটিংস",about:"পরিচয়",privacy:"গোপনীয়তা নীতি",terms:"শর্তাবলী",faq:"প্রশ্ন ও উত্তর",blog:"ব্লগ",contact:"যোগাযোগ",forAI:"এআই এর জন্য",login:"লগইন",signup:"সাইনআপ",profile:"প্রোফাইল",train:"ট্রেন",local:"লোকাল",intercity:"আন্তঃশহর"},home:{searchPlaceholder:"বাস, স্টেশন বা এলাকা খুঁজুন...",localBusSearch:"স্থান / বাস খুজুন",intercitySearch:"আন্তঃশহর অনুসন্ধান",routeFinder:"গন্তব্য খুজুন",findRoute:"রুট খুঁজুন",selectStartLocation:"শুরুর স্থান নির্বাচন করুন",selectDestination:"গন্তব্য নির্বাচন করুন",noResults:"কোনো ফলাফল পাওয়া যায়নি",noBusesBetweenStations:"নির্বাচিত স্টেশনের মধ্যে কোনো বাস পাওয়া যায়নি",noBusesInFavorites:"ফেভারিটে কোনো বাস নেই",noBusesMatching:"কোনো বাস পাওয়া যায়নি: ",tryDifferentSearch:"অন্য কিছু খুঁজে দেখুন",recentSearches:"সাম্প্রতিক অনুসন্ধান",popularRoutes:"জনপ্রিয় রুট",clearAll:"সব মুছুন",installApp:"অ্যাপ ইনস্টল করুন",whyUse:"কেন ব্যবহার করবেন",allDhakaLocalBuses:"ঢাকার সকল লোকাল বাস",whereToGo:"কোথায় যেতে চান?",whereToGoInDhaka:"কোথায় যেতে চান ঢাকায়?",findPerfectRoute:"এক ক্লিকে, আপনার সঠিক রুট খুঁজুন",findIntercityRoutes:"আন্তঃজেলা রুট খুঁজুন",findBusesBetweenCities:"শহর থেকে শহরে বাস খুঁজুন",favorites:"প্রিয় বাস",allBuses:"সকল বাস",savedRoutes:"সংরক্ষিত রুট",estimatedFare:"আনুমানিক ভাড়া",metroRail:"মেট্রো রেল",notAvailable:"Not Available",notAvailableNote:"এই বাসটি বর্তমানে চলাচল করছে না"},busDetails:{busRoute:"বাস রুট",fullRouteList:"সম্পূর্ণ রুট তালিকা",fareCalculator:"ভাড়া ক্যালকুলেটর",stopToStopFare:"স্টপ থেকে স্টপ ভাড়া",estimatedCost:"আনুমানিক খরচ",selectStartEnd:"ভাড়া গণনা করতে শুরু এবং শেষ স্টপ নির্বাচন করুন",liveView:"লাইভ দৃশ্য",clickDragPan:"প্যান করতে ক্লিক এবং ড্র্যাগ করুন",scrollToPan:"প্যান করতে স্ক্রোল করুন",maxFare:"সর্বোচ্চ ভাড়া",eta:"আনুমানিক সময়",speed:"গতি",yourTripPlan:"আপনার ভ্রমণ পরিকল্পনা",currentViewing:"বর্তমানে দেখছেন",clickToView:"দেখতে ক্লিক করুন",connectedRoutes:"সংযুক্ত রুটগুলি",you:"আপনি",start:"শুরু",destination:"গন্তব্য",transit:"ট্রানজিট",help:"সাহায্য",selectFromFirst:"প্রথমে থেকে নির্বাচন করুন",awayFrom:"দূরত্ব",stops:"স্টপ",startHere:"শুরু করুন",totalStops:"মোট স্টপেজ",viewBusImage:"বাসের ছবি",viewBusImageShort:"ছবি",realBusImage:"এই বাসের প্রকৃত ছবি",imageNotFound:"প্রকৃত বাস ছবি পাওয়া যায়নি"},community:{busRatingTitle:"বাস রেটিং",trainRatingTitle:"ট্রেন রেটিং",rateNow:"রেটিং দিন",editRating:"পরিবর্তন করুন",ratingsCount:"{count}টি রেটিং",noRatingsYet:"এখনো কোনো রেটিং নেই",beFirstToRate:"প্রথম রেটিং দিন!",giveYourRating:"আপনার রেটিং দিন",deleteRating:"রেটিং মুছুন",confirmDeleteRating:"আপনি কি আপনার রেটিং মুছে ফেলতে চান?",writeExperienceOptional:"আপনার অভিজ্ঞতা লিখুন (ঐচ্ছিক)...",submitting:"পাঠানো হচ্ছে...",submit:"জমা দিন",deletePhotoTitle:"ছবিটি মুছে ফেলতে চান?",deletePhotoDesc:"এটি স্থায়ীভাবে আপনার ছবি মুছে ফেলবে। এটি আর ফিরে পাওয়া যাবে না।",liveLocationTitle:"লাইভ অবস্থান",reportsCount:"{count}টি রিপোর্ট",reportNow:"রিপোর্ট করুন",latestLocation:"সর্বশেষ অবস্থান",shareBusLocation:"বাসের অবস্থান জানান",pickStop:"স্টপ নির্বাচন করুন",typeStopName:"বর্তমান স্টপের নাম লিখুন",pickDirectionOptional:"দিক নির্বাচন করুন (ঐচ্ছিক)",headingTowards:"{heading} দিকে যাচ্ছে",noLiveReports:"কোনো লাইভ রিপোর্ট নেই",promptReportIfSeen:"বাস দেখলে অবস্থান জানান",busPhotosTitle:"বাসের ছবি",photosCount:"{count}টি ছবি",addPhoto:"ছবি দিন",uploadPhotoTitle:"ছবি আপলোড করুন",pickPhoto:"ছবি নির্বাচন করুন",photoCaptionOptional:"ছবির বিবরণ (ঐচ্ছিক)",noPhotosYet:"এখনো কোনো ছবি নেই",beFirstToUpload:"প্রথম ছবি দিন!",compressing:"কম্প্রেস হচ্ছে...",photoUploaded:"ছবি আপলোড হয়েছে!",photoError:"ছবি আপলোড ব্যর্থ হয়েছে।",loadError:"লোড করতে ব্যর্থ হয়েছে।",ratingSubmitted:"রেটিং সংরক্ষিত হয়েছে!",ratingDeleted:"রেটিং মুছে ফেলা হয়েছে।",photoDeleted:"ছবি মুছে ফেলা হয়েছে।",locationReported:"লোকেশান রিপোর্ট সফল হয়েছে!",submitError:"সংরক্ষণ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"},liveNav:{navigation:"নেভিগেশন",currentLocation:"বর্তমান অবস্থান",destination:"গন্তব্য",nextStop:"পরবর্তী স্টপ",approaching:"কাছে আসছে",arrived:"পৌঁছেছে",stopNavigation:"নেভিগেশন বন্ধ করুন",getDirections:"দিকনির্দেশ পান",emergencyHelplines:"জরুরি হেল্পলাইন",startNavigation:"নেভিগেশন শুরু করুন",layers:"লেয়ার",nonstop:"নন-স্টপ",stop:"স্টপ",destinationLabel:"গন্তব্য",help:"সাহায্য",homeFrom:"হোম-থেকে",homeTo:"হোম-পর্যন্ত",currentStop:"বর্তমান স্টপ",nearestStop:"নিকটতম স্টপ",routeTimeline:"রুট টাইমলাইন",nextStopIn:"পরবর্তী স্টপ",youAre:"আপনি",findingSatellite:"স্যাটেলাইট অনুসন্ধান করা হচ্ছে...",detectingPosition:"বাসে আপনার অবস্থান শনাক্ত করা হচ্ছে",locationNeeded:"অবস্থান প্রয়োজন",enableLocation:"অবস্থান চালু করুন",startHere:"শুরু করুন",arrivedDestination:"আপনি গন্তব্যে পৌঁছে গেছেন!",offline:"আপনি অফলাইনে আছেন। লাইভ ট্র্যাকিং ব্যবহার করতে ইন্টারনেটের সাথে সংযুক্ত হন।",offlineError:"আপনি অফলাইনে আছেন। লাইভ ট্র্্যাকিং ব্যবহার করতে ইন্টারনেটের সাথে সংযুক্ত হন।",tooFarError:"আপনি রুট থেকে অনেক দূরে আছেন। লাইভ ট্র্যাকিং সক্রিয় করতে আপনাকে রুটের ২ কিমি এর মধ্যে (বাসের ভেতরে) থাকতে হবে।",goLive:"লাইভে যান (বাসের ভিতরে)",stopCasting:"সম্প্রচার বন্ধ করুন",speed:"গতি",dist:"দূরত্ব",eta:"সময়",min:"মিনিট",h:"ঘণ্টা",m:"মিঃ"},emergency:{title:"জরুরি হেল্পলাইন",near:"কাছাক্ছি",nationalEmergencyNumbers:"জাতীয় জরুরি নম্বর",nearestPoliceStations:"নিকটতম থানা",nearestHospitals:"নিকটতম হাসপাতাল",nearestFireStations:"নিকটতম ফায়ার স্টেশন",away:"দূরে",call:"কল করুন",locationNotAvailable:"অবস্থান উপলব্ধ নেই",enableLocation:"নিকটবর্তী জরুরি সেবা দেখতে অবস্থান সক্ষম করুন",emergencyFooter:"জরুরি অবস্থায়, অবিলম্বে",immediately:"কল করুন",close:"বন্ধ করুন"},ai:{title:"এআই সহায়ক",subtitle:"আমি আপনাকে রুট খুঁজে পেতে সাহায্য করতে পারি",placeholder:"যেকোনো কিছু জিজ্ঞেস করুন, আমি আপনার ভ্রমণ সহায়তায় আছি",send:"পাঠান",thinking:"চিন্তা করছি...",thinkingStep1:"অনুরোধ বোঝার চেষ্টা করছি...",thinkingStep2:"সেরা রুটটি খুঁজছি...",thinkingStep3:"ট্রাফিক আপডেট চেক করছি...",thinkingStep4:"উত্তর গুছিয়ে নিচ্ছি...",dailyLimitReached:"⏰ আজকের লিমিট শেষ",usedQueries:"আপনি আজকের জন্য আপনার {count} টি ফ্রি এআই চ্যাট কোয়েরি ব্যবহার করেছেন। লিমিট মধ্যরাতে রিসেট হবে। আগামীকাল আবার আসুন!",askQuestion:"প্রশ্ন করুন",examples:"উদাহরণ প্রশ্ন",example1:"মিরপুর থেকে মতিঝিল যেতে কোন বাস?",clearChat:"চ্যাট মুছুন",emptyState:"ঢাকার বাস সম্পর্কে কিছু জানতে চাইলে, আমাকে জিজ্ঞাসা করুন",queriesRemaining:"আজকের এআই চ্যাট সীমা"},history:{title:"ইতিহাস ও বিশ্লেষণ",myHistory:"আমার ইতিহাস",globalStats:"বৈশ্বিক পরিসংখ্যান",clearAllHistory:"সব ইতিহাস মুছুন",clearHistory:"ইতিহাস মুছবেন?",clearConfirm:"আপনি কি নিশ্চিত যে আপনি আপনার সমস্ত অনুসন্ধান ইতিহাস মুছে ফেলতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।",cancel:"বাতিল",yesClear:"হ্যাঁ, মুছুন",todayActivity:"আজকের কার্যকলাপ",busesSearched:"বাস অনুসন্ধান করা হয়েছে",routesSearched:"রুট অনুসন্ধান করা হয়েছে",viewTodayJourney:"আজকের যাত্রা দেখুন",journeyDescription:"দিনের জন্য আপনার সম্পূর্ণ ভ্রমণ রুট এবং স্টপগুলি দেখুন",offlinePrivacy:"১০০% অফলাইন • গোপনীয়তা-প্রথম",mostUsedBuses:"সবচেয়ে ব্যবহৃত বাস",mostUsedRoutes:"সবচেয়ে ব্যবহৃত রুট",recentBusSearches:"সাম্প্রতিক বাস অনুসন্ধান",recentRouteSearches:"সাম্প্রতিক রুট অনুসন্ধান",recentIntercityTrips:"সাম্প্রতিক আন্তঃশহর ভ্রমণ",mostViewedTrains:"সবচেয়ে দেখা ট্রেন",mostUsedTrains:"সবচেয়ে দেখা ট্রেন",trainsViewed:"ট্রেন দেখা হয়েছে",recentTrainViews:"সাম্প্রতিক ট্রেন দেখা",featureActivity:"ফিচার কার্যকলাপ",noHistoryYet:"এখনও কোন ইতিহাস নেই",startSearching:"এখানে আপনার ইতিহাস দেখতে বাস এবং রুট অনুসন্ধান শুরু করুন",communityStats:"সম্প্রদায় পরিসংখ্যান",online:"অনলাইন",live:"লাইভ",totalVisits:"মোট ভিজিট",todayVisits:"আজকের ভিজিট",liveActiveUsers:"লাইভ সক্রিয় ব্যবহারকারী",updatedRealtime:"রিয়েল-টাইমে আপডেট করা হয়েছে",realtimeUpdates:"রিয়েল-টাইম আপডেট",realtimeDescription:"এই পরিসংখ্যানগুলি রিয়েল-টাইমে আপডেট করা হয় এবং সমস্ত ব্যবহারকারীদের মধ্যে ভাগ করা হয়। ডেটা সেশন জুড়ে থাকে এবং অন্যান্য ব্যবহারকারীরা অ্যাপটি পরিদর্শন করলে স্বয়ংক্রিয়ভাবে আপডেট হয়।",communityImpact:"সম্প্রদায়ের প্রভাব",helpingCommuters:"যাত্রীদের সাহায্য করা",helpingDescription:"একসাথে, আমরা হাজার হাজার মানুষকে ঢাকার চারপাশে তাদের পথ খুঁজে পেতে সাহায্য করেছি",growingCommunity:"ক্রমবর্ধমান সম্প্রদায়",growingDescription:"প্রতিটি অনুসন্ধান আমাদের সবার জন্য অ্যাপটি উন্নত করতে সহায়তা করে",justNow:"এইমাত্র",minutesAgo:"মিনিট আগে",hoursAgo:"ঘন্টা আগে",daysAgo:"দিন আগে"},journey:{title:"দৈনিক যাত্রা",today:"আজ",yesterday:"গতকাল",distance:"দূরত্ব",duration:"সময়কাল",stops:"স্টপ",stopNumber:"স্টপ",stayed:"অবস্থান করেছে",traveledToNext:"পরবর্তী অবস্থানে ভ্রমণ করেছে",currentLocation:"বর্তমান অবস্থান",trackingActive:"ট্র্যাকিং সক্রিয়...",noJourneyToday:"আজ কোন যাত্রা নেই",enableLocation:"আপনার যাত্রা ট্র্যাকিং শুরু করতে লাইভ লোকেশন সক্ষম করুন",pastJourneys:"পূর্ববর্তী যাত্রা",stopsCount:"স্টপ",clearConfirm:"আপনি কি নিশ্চিত যে আপনি আজকের যাত্রা মুছে ফেলতে চান?"},whyUse:{title:"কেন ব্যবহার করবেন কই যাবো?",subtitle:"বাংলাদেশের বাস নেটওয়ার্ক নেভিগেট করার জন্য আপনার স্মার্ট সঙ্গী",lightningFast:"⚡ বিদ্যুৎ গতির অনুসন্ধান",lightningFastDesc:"সেকেন্ডের মধ্যে আপনার বাস রুট খুঁজুন! ইংরেজি বা বাংলায় অনুসন্ধান করুন - আমাদের স্মার্ট অনুসন্ধান উভয় ভাষা বোঝে এবং আ্পনার যাত্রার জন্য নিখুঁত বাস খুঁজে দেয়।",completeRoute:"🗺️ সম্পূর্ণ রুট ডেটাবেস",completeRouteDesc:"ঢাকার সমস্ত প্রধান এলাকা কভার করে ৩০০+ বাস রুট অ্যাক্সেস করুন। মিরপুর থেকে মতিঝিল, উত্তরা থেকে সদরঘাট - আমরা আপনার জন্য প্রতিটি রুট ম্যাপ করেছি।",aiPowered:"🤖 এআই-চালিত সহায়ক",aiPoweredDesc:"কোন বাস নিতে হবে নিশ্চিত নন? আমাদের এআই সহায়ককে জিজ্ঞাসা করুন! ব্যক্তিগতকৃত রুট পরামর্শ, ভ্রমণ টিপস, এবং প্রাকৃতিক ভাষায় আপনার সমস্ত যাতায়াত প্রশ্নের উত্তর পান।",accurateFare:"💰 সঠিক ভাড়া ক্যালকুলেটর",accurateFareDesc:"বোর্ডিংয়ের আগে আপনার ট্রিপের খরচ সঠিকভাবে জানুন! আমাদের ভাড়া ক্যালকুলেটর সরকারী ২০২২ এর হার ব্যবহার করে এবং প্রকৃত দূরত্বের উপর ভিত্তি করে গণনা করে।",liveNavigation:"🧭 লাইভ নেভিগেশন",liveNavigationDesc:"আর কখনও আপনার স্টপ মিস করবেন না! আমাদের লাইভ নেভিগেশন ফিচার আপনার অবস্থান ট্র্যাক করে এবং রিয়েল-টাইম আপডেটের সাথে রুটে আপনি ঠিক কোথায় আছেন তা দেখায়।",saveFavorites:"❤️ আপনার প্রিয়গুলি সংরক্ষণ করুন",saveFavoritesDesc:"প্রতিদিন একই রুট নেন? দ্রুত অ্যাক্সেসের জন্য আপনার প্রিয় বাসগুলি সংরক্ষণ করুন। আপনার দৈনিক যাতায়াত এখন অনেক সহজ হয়ে গেছে!",emergencyHelp:"🚨 জরুরি হেল্পলাইন অ্যাক্সেস",emergencyHelpDesc:"মানসিক শান্তির সাথে ভ্রমণ করুন! নেভিগেশনের সময় আপনার বর্তমান অবস্থানের কাছের জরুরি সেবা (পুলিশ, হাসপাতাল, ফায়ার স্টেশন) অ্যাক্সেস করুন। জাতীয় হেল্পলাইন (৯৯৯, ১০০, ১০২) এবং সমস্ত প্রধান শহরে অবস্থান-ভিত্তিক সেবা সহ বাংলাদেশ জুড়ে ৮০+ যাচাইকৃত জরুরি যোগাযোগে ওয়ান-ট্যাপ কলিং।",worksOffline:"📡 অফলাইনে কাজ করে",worksOfflineDesc:"ইন্টারনেট নেই? কোন সমস্যা নেই! সম্পূর্ণ বাস রুট ডেটাবেস আপনার ডিভাইসে সংরক্ষিত, তাই ডেটা সংযোগ ছাড়াই আপনি রুট খুঁজতে এবং বাসের বিবরণ চেক করতে পারেন।",metroIntegration:"🚇 মেট্রো রেল ইন্টিগ্রেশন",metroIntegrationDesc:"সম্পূর্ণ এমআরটি লাইন ৬ তথ্য অন্তর্ভুক্ত! ঢাকা জুড়ে আপনার যাত্রার জন্য বাস এবং মেট্রোর সেরা সংমিশ্রণ খুঁজুন।",railwayAirport:"✈️ রেলওয়ে ও বিমানবন্দর ফাইন্ডার",railwayAirportDesc:"আপনার বর্তমান অবস্থান থেকে নিকটতম রেলওয়ে স্টেশন এবং বিমানবন্দর সহজেই সনাক্ত করুন। আন্তঃশহর ভ্রমণ পরিকল্পনা এবং সময়মতো ফ্লাইট ধরার জন্য নিখুঁত!",readyToNavigate:"পেশাদারদের মতো ঢাকা নেভিগেট করতে প্রস্তুত?",readyToNavigateDesc:"হাজার হাজার যাত্রীর সাথে যোগ দিন যারা তাদের দৈনিক ভ্রমণের জন্য কই যাবোকে বিশ্বাস করেন",startFinding:"রুট খোঁজা শুরু করুন"},faq:{title:"প্রায়শই জিজ্ঞাসিত প্রশ্ন",subtitle:"কই যাবো সম্পর্কে আপনার যা জানা দরকার",q1:"কই যাবো কী?",a1:'কই যাবো মানে "কোথায় যাবেন?" বাংলায়। এটি একটি বিনামূল্যের ওয়েব অ্যাপ যা আপনাকে বাংলাদেশ জুড়ে বাস রুট খুঁজে পেতে সাহায্য করে।',q2:"কীভাবে বাস রুট খুঁজবো?",a2:"আপনি দুটি উপায়ে খুঁজতে পারেন: (১) সার্চ বক্সে বাস, স্টেশন বা এলাকার নাম টাইপ করুন, অথবা (২) রুট ফাইন্ডার ব্যবহার করুন।",q3:"অ্যাপটি কি বিনামূল্যে?",a3:"হ্যাঁ! কই যাবো সম্পূর্ণ বিনামূল্যে। কোনো রেজিস্ট্রেশন, সাবস্ক্রিপশন বা লুকানো ফি নেই।",q4:"এটি কি অফলাইনে কাজ করে?",a4:"হ্যাঁ! সব বাস রুট এবং স্টেশন ডেটা আপনার ডিভাইসে স্থানীয়ভাবে সংরক্ষিত, তাই ইন্টারনেট ছাড়াও রুট খুঁজতে পারবেন।",q5:"বাস ভাড়া কতটা সঠিক?",a5:"আমাদের ভাড়া ক্যালকুলেটর সরকার অনুমোদিত ২০২২ ভাড়া কাঠামো ব্যবহার করে। প্রকৃত ভাড়া সামান্য পরিবর্তিত হতে পারে।",q6:"এআই সহায়ক কী?",a6:"এআই সহায়ক আমাদের বুদ্ধিমান রুট খুঁজে পাওয়ার সিস্টেম। এটি বাস রুট সম্পর্কে প্রশ্নের উত্তর দিতে পারে।",q7:"জরুরি হেল্পলাইন কীভাবে অ্যাক্সেস করবো?",a7:'লাইভ নেভিগেশনের সময়, আপনি আপনার বর্তমান অবস্থানের পাশে একটি লাল "হেল্প লাইন" বোতাম দেখতে পাবেন।',q8:"লাইভ নেভিগেশন কীভাবে ব্যবহার করবো?",a8:'একটি বাস রুট নির্বাচন করুন, তারপর "নেভিগেশন শুরু করুন" ক্লিক করুন। অবস্থান অ্যাক্সেসের অনুমতি দিন।',q9:"বাংলায় খুঁজতে পারি?",a9:'অবশ্যই! আপনি ইংরেজি এবং বাংলা উভয় ভাষায় খুঁজতে পারেন। উদাহরণস্বরূপ "ফার্মগেট" বা "Farmgate"।',q10:"আমার অবস্থান ডেটা কি নিরাপদ?",a10:"হ্যাঁ! আপনার অবস্থান ডেটা শুধুমাত্র আপনার ডিভাইসে স্থানীয়ভাবে নেভিগেশনের জন্য ব্যবহৃত হয়।",q11:"কে এই অ্যাপটি তৈরি করেছেন?",a11:"কই যাবো মেজবাউর বাহার ফাগুন দ্বারা তৈরি করা হয়েছে, একজন সফটওয়্যার ইঞ্জিনিয়ার।",stillHaveQuestions:"এখনও প্রশ্ন আছে?",tryAskingAI:"আমাদের এআই সহায়ককে জিজ্ঞাসা করুন অথবা আমাদের সাথে যোগাযোগ করুন!",askAI:"এআই সহায়ককে জিজ্ঞাসা করুন",contactDeveloper:"ডেভেলপারের সাথে যোগাযোগ করুন"},about:{title:"কই যাবো সম্পর্কে",subtitle:"বাংলাদেশের জন্য স্মার্ট পাবলিক ট্রান্সপোর্ট নেভিগেশন",description:"কই যাবো একটি বিনামূল্যের ওয়েব অ্যাপ্লিকেশন যা ঢাকা এবং বাংলাদেশের অন্যান্য শহরে যাতায়াতকারীদের সাহায্য করে।",features:"বৈশিষ্ট্য",feature1:"৩০০+ বাস রুট",feature2:"লাইভ নেভিগেশন",feature3:"এআই সহায়ক",feature4:"অফলাইন সমর্থন",feature5:"মেট্রো রেল তথ্য",feature6:"ভাড়া ক্যালকুলেটর",madeWith:"দিয়ে তৈরি",inBangladesh:"বাংলাদেশে",allInOne:"🚀 আপনার সর্বাত্মক বাংলাদেশ রুট ফাইন্ডার",allInOneDesc:"কই যাবো হল চূড়ান্ত বাংলাদেশ রুট ফাইন্ডার এবং ভ্রমণ সঙ্গী। আমরা একসাথে নিয়ে আসি:",busRoutesTitle:"🚌 বাস রুট",busRoutesDesc:"বাংলাদেশের স্থানীয় বাস রুট এবং আন্তঃশহর বাস রুটের সম্পূর্ণ ডাটাবেস (ঢাকা থেকে চট্টগ্রাম, সিলেট, কক্সবাজার ইত্যাদি)।",trainMetroTitle:"🚆 ট্রেন ও মেট্রো",trainMetroDesc:"১০০+ আন্তঃজেলা ট্রেন, ইন্টারেক্টিভ রুট ম্যাপ, স্টপ টাইমলাইন এবং আপনার নিকটবর্তী স্টেশন ডিটেকশন। সাথে ঢাকা মেট্রো (এমআরটি লাইন ৬) সময়সূচী ও স্টেশন-টু-স্টেশন ভাড়া।",flightsTitle:"✈️ অভ্যন্তরীণ ফ্লাইট",flightsDesc:"দ্রুত বাংলাদেশের অভ্যন্তরীণ ফ্লাইট এবং আকাশ ভ্রমণের বিকল্প খুঁজুন।",aiAssistantTitle:"🤖 এআই ভ্রমণ সহায়ক",aiAssistantDesc:'সম্পূর্ণ অফলাইন এআই সহকারী — বাংলা, ইংরেজি এবং বাংলিশ (যেমন: "ফার্মগেট থেকে মিরপুর বাস আছে?") সব ভাষায় প্রশ্ন করুন। কোনো বাইরের এআই এপিআই ব্যবহার করা হয় না।',whyChoose:"✨ কেন কই যাবো বেছে নেবেন?",comprehensiveSearch:"ব্যাপক পরিবহন অনুসন্ধান",comprehensiveSearchDesc:"স্থানীয় বাস রুট থেকে দীর্ঘ-দূরত্ব বাস পর্যন্ত, আমরা সব কিছু কভার করি।",smartFare:"স্মার্ট ভাড়া অনুমান",smartFareDesc:"আমাদের ভ্রমণ খরচ ক্যালকুলেটর ব্যবহার করে সঠিক বাস ভাড়া তথ্য দিয়ে আপনার বাজেট পরিকল্পনা করুন।",touristFriendly:"পর্যটক বান্ধব",touristFriendlyDesc:"জনপ্রিয় পর্যটন স্থান আবিষ্কার করুন এবং কক্সবাজার বা সিলেটে সহজে পৌঁছান।",realTimeOffline:"রিয়েল-টাইম ও অফলাইন",realTimeOfflineDesc:"বাংলাদেশ রেলওয়ে সময়সূচী এবং মানচিত্র অফলাইনে অ্যাক্সেস করুন, বা অনলাইনে লাইভ স্ট্যাটাস ট্র্যাক করুন।",aiPowered:"এআই-চালিত পরিকল্পনা",aiPoweredDesc:"আমাদের এআই ভ্রমণ সহায়ক আপনাকে বাংলাদেশ জুড়ে ভ্রমণের সেরা উপায় খুঁজে পেতে সাহায্য করে।",whoIsItFor:"👥 এটি কার জন্য?",whoIsItForDesc:"দৈনিক যাত্রী, শিক্ষার্থী, অফিসগামী, ভ্রমণকারী এবং যে কেউ বাংলাদেশ জুড়ে একটি মসৃণ, চাপমুক্ত ভ্রমণ পরিকল্পনা চায়।",ourGoal:"🎯 আমাদের লক্ষ্য:",ourGoalDesc:"বাংলাদেশ জুড়ে ভ্রমণ সহজ, স্মার্ট এবং সবার জন্য আরও সহজলভ্য করা।",mission:"আমাদের লক্ষ্য",missionMotto:"বাংলাদেশের প্রত্যেকের জন্য গণপরিবহনকে সহজলভ্য, অনুমানযোগ্য এবং চাপমুক্ত করা।",missionDesc:"আমরা বিশ্বাস করি যে নির্ভরযোগ্য যাতায়াতের তথ্য একটি মৌলিক অধিকার। আপনি বিশ্ববিদ্যালয়ে যাতায়াতকারী শিক্ষার্থী হোন বা কোনো পর্যটক, কই যাবো নিশ্চিত করে যে আপনি আপনার গন্তব্যে পৌঁছানোর সেরা পথটি জানেন।",vision:"আমাদের ভিশন",visionMotto:"পুরো বাংলাদেশের জন্য সবচেয়ে বিশ্বস্ত পরিবহন সঙ্গী হয়ে ওঠা।",visionDesc:"আমরা এমন একটি ভবিষ্যৎ কল্পনা করি যেখানে আপনার নিজের ভাষায় সঠিক এবং রিয়েল-টাইম যাতায়াতের তথ্য পাওয়া যাবে। এআই এবং আধুনিক প্রযুক্তির মাধ্যমে আমরা বাংলাদেশের স্মার্ট যাতায়াতের অবকাঠামো তৈরি করছি।",offlineTitle:"অফলাইন সুবিধা",offlineDesc:"কাশ হয়ে গেলে ইন্টারনেট সংযোগ ছাড়াই দ্রুত এবং নির্ভরযোগ্য ফলাফল পাবেন।",offlineItem1:"যেকোনো ডিভাইসে পিডাব্লউএ (PWA) হিসেবে ইনস্টল করুন",offlineItem2:"সার্চ করা রুটের জন্য ১০০% অফলাইন কাজ করে",offlineItem3:"দ্রুত লোড এবং কম ডেটা খরচ",ourStoryTitle:"আমাদের গল্প",ourStoryPara1:'কই যাবো (KoyJabo) - যা বাংলা ভাষায় "আমি কোথায় যেতে চাই?" তার একটি সহজ প্রকাশ - এটি ঢাকা শহরের জটিল গণপরিবহন ব্যবস্থার সহজ সমাধানের এক অদম্য আগ্রহ থেকে তৈরি। বিশ্বের অন্যতম জনবহুল এই শহরে একজন নিয়মিত যাত্রী হিসেবে আমাদের প্রতিষ্ঠাতা সরাসরি অনুভব করেছেন সঠিক বাস রুট খুঁজে পাওয়া, মেট্রোরেলের সংযোগ বোঝা কিংবা আন্তঃজেলা ভ্রমণের পরিকল্পনা করার চ্যালেঞ্জগুলো।',ourStoryPara2:'২০২৪ সালের শুরুতে একটি উইকএন্ড প্রজেক্ট হিসেবে শুরু হলেও আজ এটি বাংলাদেশের সবচেয়ে স্বয়ংসম্পূর্ণ পরিবহন রুট ফাইন্ডার অ্যাপ। বর্তমানে প্রতি মাসে ১০,০০০+ মানুষ "কই যাবো" ব্যবহার করে আত্মবিশ্বাসের সাথে তাদের যাতায়াত এবং আন্তঃজেলা ভ্রমণ পরিকল্পনা করছেন।',busRouteItem1:"ঢাকার সকল এলাকায় ৩০০+ বাস রুট, রুট ম্যাপ ও ভাড়া",busRouteItem2:"বিস্তারিত স্টপেজ তথ্য এবং ভাড়ার তালিকা",busRouteItem3:"রিয়েল-টাইম অটো-কমপ্লিট সার্চ সুবিধা",trainMetroItem1:"১০০+ আন্তঃজেলা ট্রেন, রুট ম্যাপ ও স্টপ টাইমলাইন",trainMetroItem2:"স্টেশন টু স্টেশন ভাড়া ক্যালকুলেটর",trainMetroItem3:"এমআরটি লাইন ৬ সহ স্টেশন-টু-স্টেশন ভাড়া",aiAssistantItem1:"বাংলা, ইংরেজি ও বাংলিশে প্রশ্ন করুন",aiAssistantItem2:"সম্পূর্ণ অফলাইন — কোনো বাইরের এআই এপিআই নেই",aiAssistantItem3:"স্মার্ট ভ্রমণ টিপস, পর্যটন গাইড ও রুট তথ্য",impactTitle:"আমাদের প্রভাব",impactMonthly:"মাসিক ব্যবহারকারী",impactMonthlyVal:"১০ হাজার+",impactBuses:"লোকাল বাস",impactBusesVal:"৩০০+",impactDistricts:"জেলা",impactDistrictsVal:"৬৪",impactSearches:"আন্তঃজেলা ট্রেন",impactSearchesVal:"১০০+",meetDev:"প্রতিষ্ঠাতার সাথে দেখা করুন",devDesc:'মেজবাউর একজন সিনিয়র সফটওয়্যার টেস্ট ইঞ্জিনিয়ার, যিনি বর্তমানে বাংলাদেশের ঢাকায় বসবাস করছেন। প্রযুক্তির মাধ্যমে বাস্তব জীবনের বিভিন্ন সমস্যার সমাধান করার অদম্য উৎসাহ থেকেই তিনি "কই যাবো" তৈরি করেছেন যেন পুরো বাংলাদেশের যাতায়াতের তথ্য সবার জন্য সহজলভ্য হয়।'},notifications:{title:"বিজ্ঞপ্তি",noNotifications:"কোন বিজ্ঞপ্তি নেই",markAllRead:"সব পড়া হিসেবে চিহ্নিত করুন",trafficAlert:"ট্রাফিক সতর্কতা",routeUpdate:"রুট আপডেট",systemNotification:"সিস্টেম বিজ্ঞপ্তি",new:"নতুন",allCaughtUp:"আপনার সব দেখা শেষ!",justNow:"এইমাত্র",m:"মিঃ",h:"ঘণ্টা",d:"দিন",ago:"আগে",source:"উত্স",dismiss:"বাতিল করুন"},privacy:{title:"গোপনীয়তা নীতি",subtitle:"আমরা কীভাবে আপনার ডেটা রক্ষা করি",lastUpdated:"সর্বশেষ আপডেট",effectiveDate:"কার্যকরী তারিখ",introduction:"১. সূচনা",introText:"কই যাবো (KoyJabo) এ আপনাকে স্বাগতম। আমরা আপনার গোপনীয়তা রক্ষায় প্রতিশ্রুতিবদ্ধ। এই নীতি অ্যাপের সমস্ত ফিচার কভার করে — বাস রুট, ট্রেন সার্চ, মেট্রো, অফলাইন এআই সহকারী, ব্যবহারকারী অ্যাকাউন্ট, দৈনিক যাত্রা ট্র্যাকিং এবং নোটিফিকেশন।",collectInfo:"২. তথ্য সংগ্রহ",autoCollect:"২.১ স্বয়ংক্রিয়ভাবে সংগৃহীত তথ্য",logData:"লগ ডেটা: আইপি অ্যাড্রেস, ব্রাউজার টাইপ, অপারেটিং সিস্টেম ইত্যাদি।",deviceInfo:"ডিভাইস তথ্য: ডিভাইসের ধরণ, স্ক্রিন রেজোলিউশন এবং ব্রাউজার সেটিংস।",usageData:"ব্যবহারের ডেটা: সার্চ কুয়েরি, ফিচার ব্যবহারের ধরণ এবং অ্যাপের সাথে মিথস্ক্রিয়া।",locationData:"অবস্থান তথ্য: আইপি ঠিকানার উপর ভিত্তি করে আনুমানিক অবস্থান (আমরা আপনার অনুমতি ছাড়া সুনির্দিষ্ট জিপিএস অবস্থান ট্র্যাক করি না)।",locationConsent:"২.২ অবস্থান তথ্য (ঐচ্ছিক)",locationConsentText:'আপনি যদি আমাদের "ইউজ মাই লোকেশন" ফিচারটি ব্যবহার করতে চান, তবে আমরা আপনার ডিভাইসের জিপিএস অবস্থান ব্যবহারের অনুরোধ করি।',howWeUse:"৩. তথ্যের ব্যবহার",howWeUse1:"পরিষেবা প্রদান: আপনার সার্চের উপর ভিত্তি করে বাস রুট, ম্যাপ এবং পরিবহন তথ্য প্রদর্শন করা।",howWeUse2:"ব্যবহারকারীর অভিজ্ঞতা উন্নত করা: অ্যাপের পারফরম্যান্স অপ্টিমাইজ করতে এবং নতুন বৈশিষ্ট্য যোগ করতে ব্যবহারের ধরণ বিশ্লেষণ করা।",howWeUse3:"অফলাইন অ্যাক্সেস: রুটের তথ্য লোকাল ক্যাশ করা যাতে ইন্টারনেট ছাড়াই অ্যাপটি ব্যবহার করা যায়।",thirdParty:"৪. থার্ড-পার্টি সার্ভিস",thirdPartyText:"আমরা বেনামী ব্যবহার বিশ্লেষণের জন্য Google Analytics এবং বিজ্ঞাপনের জন্য Google AdSense ব্যবহার করি। আমরা কোনো বাইরের এআই এপিআই ব্যবহার করি না — সমস্ত এআই রেসপন্স স্থানীয় ট্রান্সপোর্ট ডেটা থেকে তৈরি হয়।",contactUsTitle:"যোগাযোগ করুন",contactUsDesc:"আপনার যদি এই গোপনীয়তা নীতি সম্পর্কে কোনো প্রশ্ন বা উদ্বেগ থাকে, তবে দয়া করে আমাদের অফিসিয়াল চ্যানেলের মাধ্যমে যোগাযোগ করুন:"},terms:{title:"শর্তাবলী",subtitle:"ব্যবহারের নিয়ম ও শর্তাবলী",lastUpdated:"সর্বশেষ আপডেট",acceptance:"১. শর্তাবলী গ্রহণ",acceptanceText:"কই যাবো (KoyJabo) ব্যবহার করার মাধ্যমে আপনি এই শর্তাবলীর সাথে একমত পোষণ করছেন। কই যাবো বাংলাদেশের পরিবহন তথ্য প্রদান করে — বাস, ট্রেন, মেট্রো, ফ্লাইট, লঞ্চ এবং এআই-সহায়তা রুট ফাইন্ডিং।",serviceDesc:"২. পরিষেবার বিবরণ",busRouteInfo:"২০০+ লোকাল বাস রুট, স্টপ বিবরণ ও ভাড়ার তথ্য",metroRailInfo:"ঢাকা মেট্রোরেল (MRT লাইন ৬) সময়সূচী ও স্টেশন-টু-স্টেশন ভাড়া",intercityInfo:"১০০+ আন্তঃজেলা ট্রেন রুট ম্যাপ ও টাইমলাইন, নিকটবর্তী স্টেশন ডিটেকশন — সাথে বাস, ফ্লাইট ও লঞ্চের তথ্য",aiAssistance:"অফলাইন এআই সহকারী — বাংলা, ইংরেজি ও বাংলিশ সমর্থন",disclaimer:"৭. দায়মুক্তি",disclaimerText:"আমরা রুট, ট্রেন সময়সূচী ও ভাড়ার তথ্য সঠিক রাখার সর্বোচ্চ চেষ্টা করি, তবে তথ্যের রিয়েল-টাইম নির্ভুলতার গ্যারান্টি দিই ойнотуу. গুরুত্বপূর্ণ ভ্রমণ তথ্য বাংলাদেশ রেলওয়ে বা BRTC-এর অফিসিয়াল উৎস থেকে যাচাই করুন।",liability:"৮. দায়বদ্ধতার সীমাবদ্ধতা",liabilityDesc:"আইন দ্বারা অনুমোদিত পূর্ণ মাত্রায়, কই যাবো কোনো পরোক্ষ, আনুষঙ্গিক, বা পরিণতিমূলক ক্ষতির জন্য দায়ী হবে না।",userAccountsTitle:"ইউজার অ্যাকাউন্ট",userAccountsDesc:"নিবন্ধন ঐচ্ছিক। আপনি যদি অ্যাকাউন্ট তৈরি করেন, তবে আপনি আপনার লগইন তথ্যের নিরাপত্তার জন্য দায়ী থাকবেন। আপনি যেকোনো সময় প্রোফাইল সেটিংস থেকে অ্যাকাউন্ট মুছে ফেলতে পারেন।",trainDataTitle:"ট্রেন ও সময়সূচির তথ্য",trainDataDesc:"ট্রেনের সময়সূচী এবং ভাড়ার তথ্য প্রকাশ্যে থাকা বাংলাদেশ রেলওয়ে তথ্যের ওপর ভিত্তি করে সংগ্রহ করা হয়েছে। ভ্রমণের আগে সর্বদা অফিসিয়াল বাংলাদেশ রেলওয়ে সোর্সের সাথে ছাড়ার সময় যাচাই করুন।",aiAssistantTitle:"এআই সহায়ক",aiAssistantDesc:"এআই সহায়ক স্থানীয় পরিবহন ডেটা ব্যবহার করে সম্পূর্ণ অফলাইনে কাজ করে। এটি ইংরেজি, বাংলা, এবং বাংলিশ সমর্থন করে। এআই এর উত্তর শুধুমাত্র তথ্যের উদ্দেশ্যে এবং অফিসিয়াল উৎসের বিকল্প নয়।",privacyTitle:"গোপনীয়তা",privacyDesc:"আপনার ব্যবহার আমাদের গোপনীয়তা নীতি দ্বারা নিয়ন্ত্রিত হয়।",modificationsTitle:"পরিবর্তনসমূহ",modificationsDesc:"আমরা যেকোনো সময় পরিষেবার যেকোনো দিক পরিবর্তন বা বন্ধ করার অধিকার সংরক্ষণ করি।",contactUs:"যোগাযোগ ও সহায়তা"},install:{title:"কই যাবো ইনস্টল করুন",subtitle:"আরও ভাল অভিজ্ঞতার জন্য আপনার ডিভাইসে অ্যাপ পান",installButton:"এখনই ইনস্টল করুন",installing:"ইনস্টল হচ্ছে...",alreadyInstalled:"অ্যাপ ইতিমধ্যে ইনস্টল করা হয়েছে!",enjoyFullApp:"আপনি কই যাবোর ইনস্টল করা সংস্করণ ব্যবহার করছেন। সম্পূর্ণ অ্যাপ অভিজ্ঞতা উপভোগ করুন!",howToUninstall:"কীভাবে আনইনস্টল করবেন",onAndroid:"অ্যান্ড্রয়েডে (ক্রোম):",onIOS:"iOS এ (সাফারি):",longPressIcon:"হোম স্ক্রিনে অ্যাপ আইকনে দীর্ঘক্ষণ চাপুন",tapUninstall:'"আনইনস্টল" বা "অ্যাপ info" → "আনইনস্টল" ট্যাপ করুন',confirmOK:'"OK" নিশ্চিত করুন',tapRemoveApp:'"Remove App" ট্যাপ করুন',confirmDelete:'"Delete App" নিশ্চিত করুন',worksOffline:"অফলাইনে কাজ করে",worksOfflineDesc:"ইন্টারনেট সংযোগ ছাড়াই বাস রুট অ্যাক্সেস করুন",fasterLoading:"দ্রুত লোডিং",fasterLoadingDesc:"আপনার হোম স্ক্রিন থেকে তাৎক্ষণিক অ্যাক্সেস",nativeExperience:"নেটিভ অভিজ্ঞতা",nativeExperienceDesc:"আপনার ডিভাইসে একটি প্রকৃত অ্যাপের মতো মনে হয়",noAppStore:"কোন অ্যাপ স্টোর নেই",noAppStoreDesc:"প্লে স্টোর ছাড়াই সরাসরি ইনস্টল করুন",freeNoRegistration:"বিনামূল্যে • কোন নিবন্ধন নেই • সমস্ত ডিভাইসে কাজ করে"},map:{liveLocation:"লাইভ লোকেশন",gpsSignalActive:"GPS সিগন্যাল সক্রিয়",acquiringSignal:"সিগন্যাল অধিগ্রহণ করা হচ্ছে...",offlineMode:"অফলাইন মোড",standard:"স্ট্যান্ডার্ড",satellite:"স্যাটেলাইট",terrain:"ভূখণ্ড",traffic:"ট্রাফিক",darkMode:"ডার্ক মোড"},errors:{somethingWentWrong:"কিছু ভুল হয়েছে",tryAgain:"আবার চেষ্টা করুন",noInternetConnection:"কোনো ইন্টারনেট সংযোগ নেই",locationPermissionDenied:"অবস্থান অনুমতি অস্বীকার করা হয়েছে",locationNotAvailable:"অবস্থান উপলব্ধ নেই",failedToLoadData:"ডেটা লোড করতে ব্যর্থ",pageNotFound:"পৃষ্ঠা পাওয়া যায়নি",serverError:"সার্ভার ত্রুটি"},offline:{workingOffline:"অফলাইনে কাজ করছে",offlineMode:"অফলাইন মোড",youAreOffline:"আপনি অফলাইনে আছেন",someFeaturesMayNotWork:"কিছু বৈশিষ্ট্য কাজ নাও করতে পারে",proceedAnyway:"যাই হোক এগিয়ে যান",intercityRequiresInternet:"আন্তঃশহর অনুসন্ধান এখন অফলাইনেও ব্যবহার করা যাবে।",aiRequiresInternet:"এআই সহায়ক ব্যবহার করতে ইন্টারনেট সংযোগ প্রয়োজন।",usingCachedData:"অফলাইন ডেটা ব্যবহার করা হচ্ছে",statusBarMessage:"অফলাইন মোড — বাস রুট ও মেট্রোরেল তথ্য সম্পূর্ণ উপলব্ধ",staleWarningTitle:"আপনি অফলাইনে আছেন",staleWarningMessage:`মনে হচ্ছে আপনি অনেকদিন অ্যাপটি ব্যবহার করেননি। সময়সূচী পুরানো হতে পারে।

আপডেট পেতে ইন্টারনেটে সংযোগ করুন, অথবা অফলাইনে চালিয়ে যান।`,continueOffline:"অফলাইনে চালিয়ে যান",details:"বিস্তারিত",noInternet:"ইন্টারনেট সংযোগ নেই",cachedData:"ক্যাশ তথ্য",dataCached:"ডেটা ক্যাশ করা হয়েছে {days} দিন আগে",connectToUpdate:"আপডেটের জন্য অনলাইনে সংযুক্ত হন",availableFeatures:"উপলব্ধ ফিচার",requiresOnline:"অনলাইন প্রয়োজন",liveTracking:"লাইভ ট্র্যাকিং",realTimeUpdates:"রিয়েল-টাইম আপডেট",gotIt:"বুঝেছি",dontWorry:"চিন্তা করবেন না! কই যাবো সম্পূর্ণভাবে অফলাইনে কাজ করার জন্য ডিজাইন করা হয়েছে। আপনি সকল মূল ফিচার ব্যবহার করতে পারবেন।"},routeFinder:{suggestedRoutes:"প্রস্তাবিত রুটগুলি",noRoutesFound:"কোনো রুট পাওয়া যায়নি",tryDifferentLocations:"বিভিন্ন স্থান চেষ্টা করুন",walk:"হাঁটা",takeMetro:"মেট্রো নিন",takeBus:"বাস নিন",transfer:"স্থানান্তর",totalTime:"মোট সময়",totalFare:"মোট ভাড়া",steps:"ধাপ"},intercity:{title:"আন্তঃশহর যাত্রা",searchIntercity:"আন্তঃশহর অনুসন্ধান",from:"থেকে",to:"গন্তব্য",date:"তারিখ",searchRoutes:"রুট খুঁজুন",byBus:"বাসে",byTrain:"ট্রেনে",byAir:"বিমানে",departureTime:"ছাড়ার সময়",arrivalTime:"পৌঁছানোর সময়",duration:"সময়কাল",price:"মূল্য",bookNow:"এখনই বুক করুন",searchLimit:"অনুসন্ধান সীমা",dailyLimitReached:"আজকের লিমিট শেষ",loadFailed:"আন্তঃশহর ডেটা লোড করতে ব্যর্থ",selectStartEnd:"শুরু এবং গন্তব্য নির্বাচন করুন",search:"খুঁজুন",exploreMini:"অনুসন্ধান করুন",onYourRoute:"আপনার রুটে",viewDemo:"ডেমো দেখুন",demoTitle:"কিভাবে এটি কাজ করে?",demoDesc:"আমাদের ডেটাবেস থেকে একটি নমুনা রুট তথ্য দেখুন।",signInRequired:"সাইন ইন প্রয়োজন",signInToViewResults:"রুটের ফলাফল দেখতে আপনার অ্যাকাউন্টে সাইন ইন করুন।",signInPrefixError:"ফলাফল দেখতে প্রথমে সাইন ইন করুন।"},blog:{postNotFound:"পোস্ট পাওয়া যায়নি",backToBlog:"ব্লগে ফিরে যান",author:"লেখক",share:"শেয়ার করুন",sharePost:"এই পোস্টটি শেয়ার করুন",copied:"কপি হয়েছে!",copyLink:"লিংক কপি করুন",toc:"সূচিপত্র",title:"ব্লগ",subtitle:"ঢাকা এবং বাংলাদেশের যাতায়াত সম্পর্কে গাইড এবং টিপস",featured:"ফিচার্ড",by:"লেখক",readMore:"পড়ুন",allPosts:"সকল পোস্ট",comingSoon:"আরও আসছে শীঘ্রই!",comingSoonDesc:"আমরা নিয়মিত নতুন গাইড এবং টিপস যুক্ত করছি। পরবর্তী আপডেটের জন্য থাকুন!",searchPlaceholder:"পোস্ট খুঁজুন...",allCategories:"সব",noResults:"কোনো ফলাফল পাওয়া যায়নি",clearFilters:"ফিল্টার মুছুন",results:"ফলাফল"},trainSearch:{title:"বাংলাদেশ রেলওয়ে",subtitle:"৩৬৭টি ট্রেনের মধ্যে সার্চ করুন | আন্তঃনগর • মেইল/এক্সপ্রেস • কমিউটার • লোকাল",fromStation:"যাত্রার স্টেশন",fromPlaceholder:"যেমন: ঢাকা, কমলাপুর",toStation:"গন্তব্য স্টেশন",toPlaceholder:"যেমন: চট্টগ্রাম, খুলনা",travelDate:"ভ্রমণের তারিখ (ঐচ্ছিক)",swapStations:"স্টেশন পরিবর্তন করুন",searching:"খুঁজছি...",searchButton:"ট্রেন খুঁজুন",found:"পাওয়া গেছে",train:"ট্রেন",bookTickets:"টিকিট বুক করুন",departure:"ছাড়ার সময়",duration:"সময়কাল",arrival:"পৌঁছানোর সময়",availableClasses:"উপলব্ধ শ্রেণী:",stopsLabel:"স্টপেজ",offDays:"বন্ধ:",noTrainsFound:"কোনো ট্রেন পাওয়া যায়নি",tryDifferentRoute:"অন্য রুট বা স্টেশনের নাম দিয়ে খুঁজুন",errorBothRequired:"যাত্রা ও গন্তব্য স্টেশন প্রবেশ করুন",errorNoTrains:"এর মধ্যে কোনো ট্রেন পাওয়া যায়নি",errorFailed:"ট্রেন সার্চ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"},roadAlerts:{title:"রাস্তা ও ট্রাফিক সতর্কতা",activeReports:"আজকের রিপোর্ট — {count}টি সক্রিয়",reportBtn:"রিপোর্ট",newReport:"নতুন সমস্যা রিপোর্ট করুন",locationPlaceholder:"স্থান / রাস্তার নাম (যেমন: মিরপুর-১০ ফ্লাইওভার)",descPlaceholder:"বিস্তারিত বিবরণ...",sending:"পাঠানো হচ্ছে...",reportAction:"রিপোর্ট করুন",loading:"লোড হচ্ছে...",noReportsToday:"আজ কোনো রিপোর্ট নেই",reportIfYouSee:"সমস্যা দেখলে রিপোর্ট করুন",reportedBy:"রিপোর্ট করেছেন:",correct:"সঠিক",severityLow:"কম",severityMedium:"মাঝারি",severityHigh:"তীব্র",severityOptLow:"কম তীব্র",severityOptMedium:"মাঝারি",severityOptHigh:"তীব্র",justNow:"এখনই",minutesAgo:" মিনিট আগে",hoursAgo:" ঘণ্টা আগে",typeHeavy:"ভারী যানজট",typeAccident:"দুর্ঘটনা",typeRoadBlock:"রাস্তা বন্ধ",typeBusDelayed:"বাস বিলম্বিত",typeBusCancelled:"বাস বাতিল",reportSuccess:"রিপোর্ট সফলভাবে জমা হয়েছে!"},liveTracker:{setManually:"ম্যানুয়ালি লোকেশন সেট করুন",typeStopName:"স্টপের নাম লিখুন...",noStopsFound:"কোনো স্টপ পাওয়া যায়নি",searchStop:"এই রুটে স্টপ খুঁজুন...",allStops:"সব স্টপ",current:"বর্তমান",manual:"ম্যানুয়াল",manualStop:"ম্যানুয়াল: স্টপ",of:"এর মধ্যে",useGPS:"GPS ব্যবহার করুন",selectedStop:"নির্বাচিত স্টপ",start:"শুরু",end:"শেষ",desktopMode:"💻 ডেস্কটপ মোড",desktopWarning:"অবস্থান কম সঠিক হতে পারে। GPS এর জন্য মোবাইল ডিভাইস ব্যবহার করুন। অথবা উপরে ম্যানুয়ালি স্টপ সার্চ করুন।",unknownLocation:"অজানা অবস্থান",showAllStops:"সব স্টপ দেখুন"},contactUs:{title:"যোগাযোগ করুন",subtitle:"আমাদের সাথে কথা বলুন!",description:"আপনার কি কোনো প্রশ্ন, মতামত আছে বা কোনো রুট খুঁজে পাচ্ছেন না? আমরা আপনাকে সাহায্য করতে এখানে আছি।",getInTouch:"যোগাযোগ করুন",reportBug:"বাগ রিপোর্ট করুন",reportBugDesc:"কোনো ভুল রুট বা প্রযুক্তিগত সমস্যা খুঁজে পেয়েছেন? আমাদের জানান।",openIssue:"ইস্যু খুলুন",shareIdeas:"মতামত দিন",shareIdeasDesc:"কই যাবো আরও উন্নত করার কোনো আইডিয়া আছে? আমরা শুনতে আগ্রহী!",sendEmail:"ইমেল পাঠান",partnership:"পার্টনারশিপ",partnershipDesc:"কই যাবোর সাথে যুক্ত হতে আগ্রহী? আমাদের সাথে কানেক্ট করুন।",founder:"প্রতিষ্ঠাতা, কই যাবো",location:"অবস্থান",locationDesc:"ঢাকা, বাংলাদেশ",socialPage:"ফেসবুক পেজ"},legal:{userAccounts:"ইউজার অ্যাকাউন্টস",registrationOptional:"রেজিস্ট্রেশন ঐচ্ছিক। আপনি যদি অ্যাকাউন্ট তৈরি করেন, তবে আপনার ক্রেডেনশিয়ালগুলোর নিরাপত্তার দায়িত্ব আপনার। আপনি যেকোনো সময় প্রোফাইল সেটিংস থেকে আপনার অ্যাকাউন্ট ডিলিট করতে পারেন।",trainData:"ট্রেইন এবং শিডিউল ডেটা",trainDataDesc:"ট্রেইন শিডিউল এবং ভাড়ার তথ্যসমূহ বাংলাদেশ রেলওয়ের পাবলিক তথ্য থেকে সংগৃহীত। ভ্রমণের আগে সবসময় বাংলাদেশ রেলওয়ের অফিসিয়াল উৎস থেকে ছাড়ার সময় যাচাই করে নিন।",aiAssistant:"এআই অ্যাসিস্ট্যান্ট",aiAssistantDesc:"এআই অ্যাসিস্ট্যান্ট পুরোপুরি অফলাইনে স্থানীয় পরিবহন তথ্যের ওপর ভিত্তি করে কাজ করে। এটি ইংরেজি, বাংলা এবং বাংলিশ সমর্থন করে। প্রাপ্ত উত্তরগুলো শুধুমাত্র তথ্যের জন্য এবং অফিসিয়াল উৎসের বিকল্প নয়।",liabilityFootnote:"আইনের সর্বোচ্চ সীমা অনুযায়ী, কোনো পরোক্ষ, আনুষঙ্গিক বা পরিণামস্বরূপ ক্ষতির জন্য কইযাবো দায়বদ্ধ থাকবে না।",privacy:"প্রাইভেসী",privacyDesc:"আপনার ব্যবহার আমাদের প্রাইভেসী পলিসি দ্বারাও পরিচালিত।",modifications:"পরিবর্তনসমূহ",modificationsDesc:"আমরা যেকোনো সময় পরিষেবার যেকোনো অংশ পরিবর্তন বা বন্ধ করার অধিকার সংরক্ষণ করি।"},authInfo:{title:"ইউজার অ্যাকাউন্টস এবং অথেন্টিকেশন",offersOptional:"কইযাবো ঐচ্ছিক ইউজার অ্যাকাউন্ট অফার করে। যখন আপনি সাইন আপ বা সাইন ইন করবেন, আমরা সংরক্ষণ করি:",githubProfile:"আপনার ইউজারনেম এবং প্রোফাইল পিকচার (শুধুমাত্র ডিসপ্লের উদ্দেশ্যে)",emailIdentification:"আপনার ইমেইল ঠিকানা (অ্যাকাউন্ট শনাক্তকরণের জন্য ব্যবহৃত, কখনো তৃতীয় পক্ষের সাথে শেয়ার করা হয় না)",localSearchHistory:"আপনার সার্চ হিস্ট্রি এবং সেভ করা রুট (আপনার ডিভাইসে লোকালি সংরক্ষণ করা হয়, আমাদের সার্ভারে নয়)",deviceSessions:"ডিভাইস সেশনসমূহ নিরাপত্তার জন্য — আপনি প্রোফাইল পেজ থেকে এগুলো দেখতে এবং বাতিল করতে পারেন",useWithoutAccount:"আপনি অ্যাকাউন্ট তৈরি করা ছাড়াই কইযাবো ব্যবহার করতে পারেন। সমস্ত পরিবহন ফিচার (বাস রুট, ট্রেন, মেট্রো, এআই অ্যাসিস্ট্যান্ট) লগইন ছাড়াই পুরোপুরি ব্যবহারযোগ্য।"},donts:{title:"আমরা যা করি না",noExternalAI:"আমরা আপনার সার্চ কুয়েরি কোনো এক্সটার্নাল এআই সার্ভিস-এ পাঠাই না। এআই অ্যাসিস্ট্যান্ট পুরোপুরি অফলাইনে স্থানীয় পরিবহন তথ্যের ওপর চলে।",noDataSelling:"আমরা আপনার ডেটা তৃতীয় পক্ষের কাছে বিক্রি করি না।",noGPSTracking:"আপনার সুনির্দিষ্ট জিপিএস লোকেশন আমরা আপনার অনুমতি ছাড়া ট্র্যাক করি না।",noRequiredRegistration:"অ্যাপ ব্যবহারের জন্য অ্যাকাউন্ট রেজিস্ট্রেশন বাধ্যতামূলক করি না।",noServerHistory:"আমরা আপনার দৈনিক যাত্রা বা রুট হিস্ট্রি কোনো সার্ভারে সংরক্ষণ করি না — সমস্ত হিস্ট্রি শুধুমাত্র ডিভাইস-লোকাল।"},features:{userAccountsTitle:"ইউজার অ্যাকাউন্টস",userAccountsDesc:"আপনার সার্চ হিস্ট্রি সেভ করতে, ডিভাইস ম্যানেজ করতে এবং ভালো অভিজ্ঞতার জন্য সাইন ইন করুন।",githubOAuth:"নিরাপদ লগইন — কোনো পাসওয়ার্ডের প্রয়োজন নেই",localHistory:"সার্চ হিস্ট্রি ডিভাইসের লোকালি সেভ হয়",profileManagement:"প্রোফাইল, সিকিউরিটি এবং ডিভাইস ম্যানেজমেন্ট",journeyTrackerTitle:"ডেইলি জার্নি ট্র্যাকার",journeyTrackerDesc:"আপনার দৈনিক যাতায়াতের স্টপেজগুলো লগ করুন, যাত্রার হিস্ট্রি ট্র্যাক করুন এবং আপনার যাতায়াতের ধরন অনুযায়ী রুটের সাজেশন পান — যা ব্যক্তিগতভাবে শুধুমাত্র আপনার ডিভাইসে সেভ থাকে।"},profile:{title:"আমার প্রোফাইল",profileInfo:"প্রোফাইল তথ্য",edit:"সম্পাদনা",save:"সংরক্ষণ করুন",fullName:"পুরো নাম",username:"ইউজারনেম",usernameFixed:"স্থায়ী",email:"ইমেইল",notChangeable:"(পরিবর্তনযোগ্য নয়)",profileUpdated:"প্রোফাইল আপডেট হয়েছে!",passwordChange:"পাসওয়ার্ড পরিবর্তন",currentPassword:"বর্তমান পাসওয়ার্ড",newPassword:"নতুন পাসওয়ার্ড",confirmNewPassword:"নতুন পাসওয়ার্ড নিশ্চিত করুন",passwordChanged:"পাসওয়ার্ড পরিবর্তন হয়েছে!",updatePasswordBtn:"পাসওয়ার্ড পরিবর্তন করুন",setPasswordTitle:"পাসওয়ার্ড সেট করুন",setPasswordDesc:"Google অ্যাকাউন্টে একটি পাসওয়ার্ড যোগ করুন যাতে ইমেইল দিয়েও লগইন করতে পারেন।",passwordSet:"পাসওয়ার্ড সফলভাবে সেট হয়েছে!",settingPassword:"পাসওয়ার্ড সেট হচ্ছে…",loginDevices:"লগইন ডিভাইস সমূহ",activeDevicesList:"আপনার অ্যাকাউন্টে সক্রিয় ডিভাইসের তালিকা",thisDevice:"এই ডিভাইস",ip:"IP",lastLogin:"সর্বশেষ",firstLogin:"প্রথম লগইন",unknown:"অজানা",loadingDevices:"ডিভাইস তালিকা লোড হচ্ছে…",noDevices:"এখনো কোনো ডিভাইস রেকর্ড নেই।",nextLoginInstruction:"পরবর্তী লগইনের পর এখানে দেখা যাবে।",securityWarning:"⚠️ অপরিচিত ডিভাইস দেখলে সেটি থেকে লগআউট করুন এবং পাসওয়ার্ড পরিবর্তন করুন।",logoutConfirmCurrent:"এই ডিভাইস থেকে লগআউট করবেন? আপনাকে আবার লগইন করতে হবে।",logoutConfirmOther:"এই ডিভাইস থেকে লগআউট করতে চান?",logoutDeviceTooltip:"এই ডিভাইস থেকে লগআউট",updatingProfile:"প্রোফাইল আপডেট হচ্ছে…",changingPassword:"পাসওয়ার্ড পরিবর্তন হচ্ছে…",uploadingAvatar:"ছবি আপলোড হচ্ছে…",loggingOutDevice:"ডিভাইস লগআউট হচ্ছে…",maxWait:"একটু অপেক্ষা করুন…",uploadFailed:"আপলোড ব্যর্থ হয়েছে।",logoutFailed:"ডিভাইস লগআউট ব্যর্থ হয়েছে।",tabs:{profile:"প্রোফাইল",password:"পাসওয়ার্ড",devices:"ডিভাইস"}},releaseNotes:{title:"রিলিজ নোটস",subtitle:"কই যাবো অ্যাপের নতুন সব আপডেট",whatsNew:"নতুন কী আছে",improvements:"উন্নতি",fixed:"ফিক্সড",version:"সংস্করণ",date:"তারিখ"}},en:{auth:{login:"Login",signup:"Signup",welcome:"Welcome Back!",loginToAccount:"Login to your account",email:"Email",password:"Password",forgotPassword:"Forgot Password?",loginButton:"Login Now",noAccount:"Don't have an account?",register:"Register Now",verifying:"Verifying...",createAccount:"Create Account",startJourney:"KoyJabo — Start your journey",fullName:"Full Name",username:"Username",usernameCannotChange:"cannot be changed after signup",usernameHint:"Only lowercase letters, numbers and _ allowed",namePlaceholder:"Your name",usernamePlaceholder:"e.g. rahman_123",emailPlaceholder:"your@email.com",passPlaceholder:"Min. 8 characters",confirmPass:"Confirm Password",confirmPassPlaceholder:"Re-type password",signupButton:"Create Account",hasAccount:"Already have an account?",creatingAccount:"Creating account...",creatingAccountTitle:"Creating Account",processingWait:"Processing securely. Please wait...",emailVerifying:"Verifying email…",validation:{invalidEmail:"Enter a valid email address.",passwordRequired:"Password is required.",loginFailed:"Login failed. Please try again.",loginSuccess:"Login successful!",fullNameRequired:"Full name is required.",nameTooShort:"Name must be at least 2 characters.",nameTooLong:"Name must be at most 50 characters.",usernameRequired:"Username is required.",usernameTooShort:"Username must be at least 3 characters.",usernameTooLong:"Username must be at most 30 characters.",usernameInvalid:"Only lowercase letters (a-z), numbers (0-9), and underscore (_) are allowed.",emailRequired:"Email is required.",tempMailBlocked:"Temporary or disposable email addresses are not allowed. Please use a real email address (Gmail, Yahoo, Outlook, etc.).",passwordTooWeak:"Strengthen your password (check rules below).",confirmPasswordRequired:"Please confirm your password.",passwordsDoNotMatch:"Passwords do not match.",signupFailed:"Signup failed. Please try again.",signupSuccess:"Account created successfully!",somethingWentWrong:"Something went wrong.",resetLinkSent:"Reset link sent.",resetLinkFailed:"Failed to send reset link.",authRequired:"Please login to continue.",invalidCredentials:"Invalid email or password.",accountNotFound:"Account not found. Please contact support.",emailAlreadyRegistered:"This email is already registered. Please log in.",usernameTaken:"This username is already taken. Please choose a different one.",connectionFailed:"Connection failed. Please check your internet and try again.",requestTimedOut:"Request is taking too long. Please try again.",currentPasswordIncorrect:"Current password is incorrect.",userNotFound:"User not found.",googleLoginFailed:"Google login failed. Please try again.",googleCancelled:"Google sign-in was cancelled.",googlePopupBlocked:"Popup was blocked. Please allow popups for this site and try again."},continueWithGoogle:"Continue with Google",orContinueWith:"or",passwordStrength:{label:"Password:",weak:"Weak",average:"Average",good:"Good",strong:"Strong"},passwordRules:{minChars:"Min. 8 characters",uppercase:"An uppercase letter (A-Z)",lowercase:"A lowercase letter (a-z)",number:"A number (0-9)",specialChar:"A special character (!@#$%...)"},forgotPasswordPage:{processing:"Processing",maxWait:"Please wait…",returnToLogin:"Return to Login",passwordReset:"Password Reset",registeredEmail:"Registered Email",resetLinkExpired:"Reset link expired. Please request a new one.",errorTryAgain:"Something went wrong. Please try again.",passwordUpdated:"Your password has been updated. Redirecting to login…",sendingLink:"Sending reset link…",checkEmail:"Check Your Email",sentLinkTo:"We sent a reset link to",waitingForClick:"Waiting for you to click the link…",pageUpdatesAuto:"This page updates automatically once your password is reset.",didntReceive:"Didn't receive it? Check spam or",resendIn:"Resend in {seconds}s",resendLink:"Resend Reset Link",description:"Enter your email to receive a password reset link",sendLink:"Send Reset Link",emailNotConfigured:"Email not configured — use this link directly:"},resetPasswordTitle:"Set New Password",resettingPassword:"Updating password",redirectingToLogin:"Redirecting to login page...",setPasswordBtn:"Set Password",tokenNotFound:'Your password reset link has expired or is invalid. Please click the link from your email again, or request a new reset link by clicking "Forgot Password".'},profile:{title:"My Profile",profileInfo:"Profile Information",edit:"Edit",save:"Save",fullName:"Full Name",username:"Username",usernameFixed:"Permanent",email:"Email",notChangeable:"(Not changeable)",profileUpdated:"Profile updated!",passwordChange:"Change Password",currentPassword:"Current Password",newPassword:"New Password",confirmNewPassword:"Confirm New Password",passwordChanged:"Password changed!",updatePasswordBtn:"Update Password",setPasswordTitle:"Set Password",setPasswordDesc:"Add a password to your Google account so you can also log in with your email.",passwordSet:"Password set successfully!",settingPassword:"Setting password…",loginDevices:"Login Devices",activeDevicesList:"List of active devices in your account",thisDevice:"This device",ip:"IP",lastLogin:"Last login",firstLogin:"First login",unknown:"Unknown",loadingDevices:"Loading device list...",noDevices:"No device records yet.",nextLoginInstruction:"Will appear here after next login.",securityWarning:"⚠️ If you see an unfamiliar device, logout from it and change your password.",logoutConfirmCurrent:"Logout from this device? You will need to login again.",logoutConfirmOther:"Do you want to logout from this device?",logoutDeviceTooltip:"Logout from this device",updatingProfile:"Updating profile...",changingPassword:"Changing password...",uploadingAvatar:"Uploading picture...",loggingOutDevice:"Logging out device...",maxWait:"Please wait...",uploadFailed:"Upload failed.",logoutFailed:"Device logout failed.",tabs:{profile:"Profile",password:"Password",devices:"Devices"}},common:{appName:"Koi Jabo",search:"Search",loading:"Loading...",error:"Error",save:"Save",cancel:"Cancel",close:"Close",back:"Back",next:"Next",previous:"Previous",yes:"Yes",no:"No",ok:"OK",select:"Select",from:"From",to:"To",distance:"Distance",fare:"Fare",type:"Type",stops:"Stops",viewDetails:"View Details",startNavigation:"Start Navigation",menu:"Menu",local:"Local",sitting:"Sitting",ac:"AC",semiSitting:"Semi-Sitting",online:"Online",ready:"Ready",tagline:"Revolutionizing Public Transport Navigation in Bangladesh",logout:"Logout",loginRequired:"Please log in to use this feature",loginBtn:"Log In",signupBtn:"Sign Up"},settings:{title:"Settings",subtitle:"Customize your app experience",language:"Language",languagePreference:"Language Preference",languageDescription:"Select your preferred language",bangla:"Bangla",english:"English",currentLanguage:"Current language",theme:"Theme",themePreference:"Theme Preference",themeDescription:"Choose how কই যাবো looks to you. Select a single theme, or sync with your system.",lightMode:"Light Mode",darkMode:"Dark Mode",brightTheme:"Bright theme",easyOnEyes:"Easy on the eyes",currentTheme:"Current theme",light:"Light",dark:"Dark",appInfo:"App Information",version:"Version",lastUpdated:"Last Updated",supportFeedback:"Support & Feedback",contactUsBtn:"Contact Us",contactUsDesc:"Get help or report an issue"},nav:{home:"Home",aiAssistant:"AI",history:"History",favorites:"Favorites",settings:"Settings",about:"About",privacy:"Privacy Policy",terms:"Terms of Service",faq:"FAQ",blog:"Blog",contact:"Contact",forAI:"For AI",login:"Login",signup:"Signup",profile:"Profile",train:"Train",local:"Local",intercity:"Intercity"},home:{searchPlaceholder:"Search for buses, stations, or areas...",localBusSearch:"Local Bus Search",intercitySearch:"Intercity Search",routeFinder:"Route Finder",findRoute:"Find Route",selectStartLocation:"Select Start Location",selectDestination:"Select Destination",noResults:"No results found",noBusesBetweenStations:"No buses found between selected stations",noBusesInFavorites:"No favorite buses found",noBusesMatching:"No buses found matching ",tryDifferentSearch:"Try a different search",recentSearches:"Recent Searches",popularRoutes:"Popular Routes",clearAll:"Clear All",installApp:"Install App",whyUse:"Why Use",allDhakaLocalBuses:"All Dhaka Local Buses",whereToGo:"Where would you like to go in Dhaka?",whereToGoInDhaka:"Where would you want to go in Dhaka?",findPerfectRoute:"Find your perfect route in one click",findIntercityRoutes:"Find Intercity Routes",findBusesBetweenCities:"Find buses between cities",favorites:"Favorites",allBuses:"All Buses",savedRoutes:"Saved Routes",estimatedFare:"Est. Fare",notAvailable:"Not Available",notAvailableNote:"This bus is currently not available"},busDetails:{busRoute:"Bus Route",fullRouteList:"Full Route List",fareCalculator:"Fare Calculator",stopToStopFare:"Stop-to-Stop Fare",estimatedCost:"Estimated Cost",selectStartEnd:"Select start and end stops to calculate fare",liveView:"Live View",clickDragPan:"Click & Drag to pan",scrollToPan:"Scroll to pan",maxFare:"Max Fare",eta:"ETA",speed:"Speed",yourTripPlan:"Your Trip Plan",currentViewing:"Current Viewing",clickToView:"Click to View",connectedRoutes:"Connected Routes",you:"You",start:"Start",destination:"Destination",transit:"Transit",help:"Help",selectFromFirst:"Select From first",startHere:"Start Here",awayFrom:"away from",totalStops:"Total Stops",viewBusImage:"Bus Image",viewBusImageShort:"Image",realBusImage:"Real Bus Image",imageNotFound:"Original Bus image not found"},community:{busRatingTitle:"Bus Rating",trainRatingTitle:"Train Rating",rateNow:"Rate",editRating:"Edit",ratingsCount:"{count} ratings",noRatingsYet:"No ratings yet",beFirstToRate:"Be the first to rate!",giveYourRating:"Give your rating",deleteRating:"Delete rating",confirmDeleteRating:"Are you sure you want to delete your rating?",writeExperienceOptional:"Write your experience (optional)...",submitting:"Submitting...",submit:"Submit",deletePhotoTitle:"Delete Photo?",deletePhotoDesc:"This will permanently remove your photo. This action cannot be undone.",liveLocationTitle:"Live Location",reportsCount:"{count} reports",reportNow:"Report",latestLocation:"Latest location",shareBusLocation:"Share bus location",pickStop:"Select a stop",typeStopName:"Type current stop name",pickDirectionOptional:"Select direction (optional)",headingTowards:"Heading {heading}",noLiveReports:"No live reports",promptReportIfSeen:"If you see the bus, share its location",busPhotosTitle:"Bus Photos",photosCount:"{count} photos",addPhoto:"Add photo",uploadPhotoTitle:"Upload a photo",pickPhoto:"Choose a photo",photoCaptionOptional:"Photo caption (optional)",noPhotosYet:"No photos yet",beFirstToUpload:"Be the first to upload!",compressing:"Compressing...",photoUploaded:"Photo uploaded!",photoError:"Failed to upload photo.",loadError:"Failed to load. Please try again.",ratingSubmitted:"Rating saved!",ratingDeleted:"Rating removed.",photoDeleted:"Photo removed.",locationReported:"Location reported successfully!",submitError:"Failed to save. Please try again."},liveNav:{navigation:"Navigation",currentLocation:"Current Location",destination:"Destination",nextStop:"Next Stop",approaching:"Approaching",arrived:"Arrived",stopNavigation:"Stop Navigation",getDirections:"Get Directions",emergencyHelplines:"Emergency Helplines",startNavigation:"Start Navigation",layers:"Layers",nonstop:"Nonstop",stop:"Stop",destinationLabel:"Destination",help:"Help",homeFrom:"HOME-FROM",homeTo:"HOME-TO",currentStop:"CURRENT STOP",nearestStop:"NEAREST STOP",routeTimeline:"ROUTE TIMELINE",nextStopIn:"NEXT STOP IN",youAre:"You are",findingSatellite:"Finding Satellite...",detectingPosition:"Detecting your position on the bus",locationNeeded:"Location Needed",enableLocation:"Enable Location",startHere:"Start Here",arrivedDestination:"You have reached the destination!",offline:"You are offline. Connect to the internet to use Live Tracking.",offlineError:"You are offline. Connect to the internet to use Live Tracking.",tooFarError:"You are too far from the route. You must be on the bus or within 2km of the route to go live.",goLive:"Go Live (Inside Bus)",stopCasting:"Stop Casting",speed:"Speed",dist:"Dist",eta:"ETA",min:"min",h:"h",m:"m"},emergency:{title:"Emergency Helplines",near:"Near",nationalEmergencyNumbers:"National Emergency Numbers",nearestPoliceStations:"Nearest Police Stations",nearestHospitals:"Nearest Hospitals",nearestFireStations:"Nearest Fire Stations",away:"away",call:"Call",locationNotAvailable:"Location not available",enableLocation:"Enable location to see nearby emergency services",emergencyFooter:"In case of emergency, call",immediately:"immediately",close:"Close"},ai:{title:"AI Assistant",subtitle:"I can help you find routes",placeholder:"Ask me anything, I am here for your Travel assistance",send:"Send",thinking:"Thinking...",thinkingStep1:"Understanding request...",thinkingStep2:"Planning route...",thinkingStep3:"Checking traffic...",thinkingStep4:"Finalizing response...",dailyLimitReached:"⏰ Daily Limit Reached",usedQueries:"You've used your {count} free AI Chat queries for today. The limit resets at midnight. Come back tomorrow!",askQuestion:"Ask Question",examples:"Example Questions",example1:"Which bus goes from Mirpur to Motijheel?",clearChat:"Clear Chat",emptyState:"Ask me anything about buses in Dhaka",queriesRemaining:"Today AI chat Limit"},history:{title:"History & Analytics",myHistory:"My History",globalStats:"Global Stats",clearAllHistory:"Clear All History",clearHistory:"Clear History?",clearConfirm:"Are you sure you want to clear all your search history? This action cannot be undone.",cancel:"Cancel",yesClear:"Yes, Clear",todayActivity:"Today's Activity",busesSearched:"Buses Searched",routesSearched:"Routes Searched",viewTodayJourney:"View Today's Journey",journeyDescription:"See your complete travel route and stops for the day",offlinePrivacy:"100% Offline • Privacy-First",mostUsedBuses:"Most Used Buses",mostUsedRoutes:"Most Used Routes",recentBusSearches:"Recent Bus Searches",recentRouteSearches:"Recent Route Searches",recentIntercityTrips:"Recent Intercity Trips",mostViewedTrains:"Most Viewed Trains",mostUsedTrains:"Most Viewed Trains",trainsViewed:"Trains Viewed",recentTrainViews:"Recent Train Views",featureActivity:"Feature Activity",noHistoryYet:"No History Yet",startSearching:"Start searching for buses and routes to see your history here",communityStats:"Community Statistics",online:"Online",live:"Live",totalVisits:"Total Visits",todayVisits:"Today's Visits",liveActiveUsers:"Live Active Users",updatedRealtime:"Updated in real-time",realtimeUpdates:"Real-time Updates",realtimeDescription:"These statistics are updated in real-time and shared across all users. The data persists across sessions and updates automatically when other users visit the app.",communityImpact:"Community Impact",helpingCommuters:"Helping Commuters",helpingDescription:"Together, we've helped thousands of people find their way around Dhaka",growingCommunity:"Growing Community",growingDescription:"Every search helps us improve the app for everyone",justNow:"Just now",minutesAgo:"m ago",hoursAgo:"h ago",daysAgo:"d ago"},journey:{title:"Daily Journey",today:"Today",yesterday:"Yesterday",distance:"Distance",duration:"Duration",stops:"Stops",stopNumber:"Stop",stayed:"Stayed",traveledToNext:"Traveled to next location",currentLocation:"Current Location",trackingActive:"Tracking active...",noJourneyToday:"No journey today",enableLocation:"Enable Live Location to start tracking your journey",pastJourneys:"Past Journeys",stopsCount:"stops",clearConfirm:"Are you sure you want to clear today's journey?"},whyUse:{title:"Why Use কই যাবো?",subtitle:"Your smart companion for navigating Bangladesh's bus network",lightningFast:"⚡ Lightning Fast Search",lightningFastDesc:"Find your bus route in seconds! Search in English or Bengali - our smart search understands both languages and finds the perfect bus for your journey.",completeRoute:"🗺️ Complete Route Database",completeRouteDesc:"Access 300+ bus routes covering all major areas of Dhaka. From Mirpur to Motijheel, Uttara to Sadarghat - we've got every route mapped out for you.",aiPowered:"🤖 AI-Powered Assistant",aiPoweredDesc:"Not sure which bus to take? Ask our AI assistant! Get personalized route suggestions, travel tips, and answers to all your commute questions in natural language.",accurateFare:"💰 Accurate Fare Calculator",accurateFareDesc:"Know exactly how much your trip will cost before you board! Our fare calculator uses official 2022 rates and calculates based on actual distance traveled.",liveNavigation:"🧭 Live Navigation",liveNavigationDesc:"Never miss your stop again! Our live navigation feature tracks your location and shows you exactly where you are on the route, with real-time updates.",saveFavorites:"❤️ Save Your Favorites",saveFavoritesDesc:"Take the same route every day? Save your favorite buses for quick access. Your daily commute just got a whole lot easier!",emergencyHelp:"🚨 Emergency Helpline Access",emergencyHelpDesc:"Travel with peace of mind! Access emergency services (Police, Hospitals, Fire Stations) near your current location during navigation. One-tap calling to 80+ verified emergency contacts across Bangladesh including national helplines (999, 100, 102) and location-based services in all major cities.",worksOffline:"📡 Works Offline",worksOfflineDesc:"No internet? No problem! The entire bus route database is stored on your device, so you can search for routes and check bus details even without a data connection.",metroIntegration:"🚇 Metro Rail Integration",metroIntegrationDesc:"Complete MRT Line 6 information included! Find the best combination of bus and metro for your journey across Dhaka.",railwayAirport:"✈️ Railway & Airport Finder",railwayAirportDesc:"Easily locate the nearest railway station and airport from your current location. Perfect for planning intercity travel and catching flights on time!",readyToNavigate:"Ready to Navigate Dhaka Like a Pro?",readyToNavigateDesc:"Join thousands of commuters who trust কই যাবো for their daily travels",startFinding:"Start Finding Routes"},faq:{title:"Frequently Asked Questions",subtitle:"Everything you need to know about কই যাবো",q1:"What is কই যাবো?",a1:`কই যাবো (Koi Jabo) means "Where to go?" in Bengali. It's a free web app that helps you find bus routes across Bangladesh.`,q2:"How do I search for a bus route?",a2:"You can search in two ways: (1) Type the name of a bus, station, or area in the search box, or (2) Use the Route Finder.",q3:"Is the app free to use?",a3:"Yes! কই যাবো is completely free. No registration, no subscription, no hidden fees.",q4:"Does it work offline?",a4:"Yes! All bus routes and station data are stored locally on your device, so you can search even without internet.",q5:"How accurate are the bus fares?",a5:"Our fare calculator uses the official 2022 government-approved fare structure. Actual fares may vary slightly.",q6:"What is the AI Assistant?",a6:"The AI Assistant is our intelligent route-finding system. It can answer questions about bus routes.",q7:"How do I access Emergency Helplines?",a7:`During live navigation, you'll see a red "Help Line" button beside your current location.`,q8:"How do I use Live Navigation?",a8:'Select a bus route, then click "Start Navigation". Make sure to allow location access when prompted.',q9:"Can I search in Bengali?",a9:'Absolutely! You can search in both English and Bengali. For example, "ফার্মগেট" or "Farmgate".',q10:"Is my location data private?",a10:"Yes! Your location data is only used locally on your device for navigation purposes.",q11:"Who built this app?",a11:"কই যাবো was developed by Mejbaur Bahar Fagun, a software engineer.",stillHaveQuestions:"Still Have Questions?",tryAskingAI:"Try asking our AI Assistant or reach out to us!",askAI:"Ask AI Assistant",contactDeveloper:"Contact Developer"},about:{title:"About কই যাবো",subtitle:"Smart Public Transport Navigation for Bangladesh",description:"কই যাবো is a free web application that helps commuters in Dhaka and other cities of Bangladesh.",features:"Features",feature1:"300+ Bus Routes",feature2:"Live Navigation",feature3:"AI Assistant",feature4:"Offline Support",feature5:"Metro Rail Info",feature6:"Fare Calculator",madeWith:"Made with",inBangladesh:"in Bangladesh",allInOne:"🚀 Your All-in-One Bangladesh Route Finder",allInOneDesc:"KoyJabo is the ultimate Bangladesh route finder and travel companion. We bring together:",busRoutesTitle:"🚌 Bus Routes",busRoutesDesc:"Complete database of local bus routes in Bangladesh and intercity bus routes (Dhaka to Chittagong, Sylhet, Cox's Bazar, etc.).",trainMetroTitle:"🚆 Train & Metro",trainMetroDesc:"100+ intercity trains with interactive route maps, stop timelines, and nearest-station detection. Plus full Dhaka Metro (MRT Line 6) schedules and fares.",flightsTitle:"✈️ Domestic Flights",flightsDesc:"Find Bangladesh domestic flights and air travel options quickly.",aiAssistantTitle:"🤖 AI Travel Assistant",aiAssistantDesc:'Fully offline AI assistant powered by local data. Understands English, বাংলা, and Banglish (e.g., "farmgate theke mirpur bus ache?"). No external AI API used.',whyChoose:"✨ Why Choose KoyJabo?",comprehensiveSearch:"Comprehensive Transport Search",comprehensiveSearchDesc:"From local bus routes to long-distance buses, we cover it all.",smartFare:"Smart Fare Estimation",smartFareDesc:"Use our travel cost calculator BD to plan your budget with accurate bus fare Bangladesh info.",touristFriendly:"Tourist Friendly",touristFriendlyDesc:"Discover popular tourist spots in Bangladesh and how to reach Cox's Bazar or Sylhet easily.",realTimeOffline:"Real-Time & Offline",realTimeOfflineDesc:"Access Bangladesh railway schedules and maps offline, or track live status online.",aiPowered:"AI-Powered Planning",aiPoweredDesc:"Our AI travel assistant Bangladesh helps you find the best way to travel across Bangladesh.",whoIsItFor:"👥 Who Is It For?",whoIsItForDesc:"Daily commuters, students, office goers, travelers, and anyone who wants a smooth, stress-free travel plan across Bangladesh.",ourGoal:"🎯 Our Goal:",ourGoalDesc:"To make travel across Bangladesh simpler, smarter, and more accessible for everyone.",mission:"Our Mission",missionMotto:"To make public transport accessible, predictable, and stress-free for every Bangladeshi.",missionDesc:"We believe that reliable transport information is a fundamental right, not a privilege. Whether you're a student commuting to university, a tourist exploring Dhaka, or a business traveler planning an intercity trip, KoyJabo ensures you always know the best way to reach your destination.",vision:"Our Vision",visionMotto:"To become the most trusted transport companion for all of Bangladesh.",visionDesc:"We envision a future where every Bangladeshi has instant access to accurate, real-time transport information in their native language. By leveraging AI, crowdsourcing, and cutting-edge technology, we're building the infrastructure for Bangladesh's smart transportation future.",offlineTitle:"Offline Capability",offlineDesc:"Fast, reliable, and available even without an internet connection once cached.",offlineItem1:"Install as PWA on any device",offlineItem2:"Works 100% offline for searched routes",offlineItem3:"Faster load times & lower data usage",ourStoryTitle:"Our Story",ourStoryPara1:`KoyJabo (কই যাবো) - which translates to "Where do you want to go?" in Bengali - was born out of a simple frustration: navigating Dhaka's complex public transport system was unnecessarily difficult. As a daily commuter in one of the world's most densely populated cities, our founder experienced firsthand the challenges of finding the right bus route, understanding metro connections, or planning intercity travel.`,ourStoryPara2:"What started in early 2024 as a weekend project to map local bus routes has grown into Bangladesh's most comprehensive transport app. Today KoyJabo covers 300+ local buses, 100+ intercity trains with route maps and timelines, metro rail, domestic flights, launches, and an AI assistant that understands English, বাংলা, and Banglish — serving over 10,000+ monthly users with confidence.",busRouteItem1:"300+ bus routes covering all Dhaka areas",busRouteItem2:"Detailed stop info, fare estimates & route maps",busRouteItem3:"Real-time autocomplete search",trainMetroItem1:"100+ intercity trains with full route maps & timelines",trainMetroItem2:"Nearest train station from your location",trainMetroItem3:"MRT Line 6 with station-to-station fares",aiAssistantItem1:"Supports Bengali, English & Banglish queries",aiAssistantItem2:"Offline — no external AI API, 100% local data",aiAssistantItem3:"Smart travel tips, tourist guides & route insights",impactTitle:"Our Impact",impactMonthly:"Monthly Users",impactMonthlyVal:"10k+",impactBuses:"Local Buses",impactBusesVal:"300+",impactDistricts:"Districts",impactDistrictsVal:"64",impactSearches:"Intercity Trains",impactSearchesVal:"100+",meetDev:"Meet the Founder",devDesc:"Mejbaur is a Senior Software Test Engineer based in Dhaka, Bangladesh. With a passion for solving real-world problems through technology, he created KoyJabo to democratize transport information across Bangladesh."},privacy:{title:"Privacy Policy",subtitle:"How we protect your data",lastUpdated:"Last updated",effectiveDate:"Effective Date",introduction:"1. Introduction",introText:"Welcome to KoyJabo. We are committed to protecting your privacy and ensuring a safe online experience. This policy covers all features of the app including bus routes, train search, metro, AI assistant, user accounts, daily journey tracking, and notifications.",collectInfo:"2. Information We Collect",autoCollect:"2.1 Automatically Collected Information",logData:"Log Data: IP address, browser type, operating system, etc.",deviceInfo:"Device Information: Device type, screen resolution, and browser settings.",usageData:"Usage Data: Search queries (bus, train, intercity), feature usage patterns, and app interactions.",locationData:"Location Data: Approximate location based on IP address (we do NOT track precise GPS location without your explicit permission). Used for nearest bus stop / train station detection.",locationConsent:"2.2 Location Information (Optional)",locationConsentText:`If you choose to use our "Use My Location" or "Nearest Train Station" feature, we request access to your device's GPS location with your explicit consent. Location data is only used within the app and never stored on any server.`,howWeUse:"3. How We Use Your Information",howWeUse1:"To Provide Services: Display bus routes, train schedules with route maps, metro info, intercity options, and transport information based on your searches.",howWeUse2:"To Improve User Experience: Analyze usage patterns to optimize app performance, improve AI responses, and add new features.",howWeUse3:"To Enable Offline Access: Cache route and train data locally so you can use the app without internet. All AI responses are generated fully offline from local data — no queries are sent to external AI services.",thirdParty:"4. Third-Party Services",thirdPartyText:"We use Google Analytics for anonymous usage analytics and Google AdSense for serving ads. We do NOT use any external AI API — all AI assistant responses are generated from local transport data.",contactUsTitle:"Contact Us",contactUsDesc:"If you have any questions or concerns about this Privacy Policy, please reach out via our official channels:"},terms:{title:"Terms of Service",subtitle:"Terms & Conditions",lastUpdated:"Last updated",acceptance:"1. Acceptance of Terms",acceptanceText:"By using KoyJabo, you agree to be bound by these Terms of Service. KoyJabo provides transport information for Bangladesh including bus, train, metro, flight, launch, and AI-assisted route finding.",serviceDesc:"2. Service Description",busRouteInfo:"300+ local bus routes for Dhaka and other cities with stop details and fare estimates",metroRailInfo:"Dhaka Metro Rail (MRT Line 6) schedules and station-to-station fares",intercityInfo:"100+ intercity trains with route maps, stop timelines, and nearest-station detection — plus intercity bus, flight, and launch info",aiAssistance:"Offline AI travel assistant supporting English, Bengali (বাংলা), and Banglish queries",disclaimer:"7. Disclaimer of Warranties",disclaimerText:"We make every effort to keep route, train schedule, and fare data accurate, but we do not guarantee the accuracy or real-time reliability of information. Always verify critical travel details (train departure times, fares) with official Bangladesh Railway or BRTC sources.",liability:"8. Limitation of Liability",liabilityDesc:"TO THE FULLEST EXTENT PERMITTED BY LAW, KOYJABO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES.",userAccountsTitle:"User Accounts",userAccountsDesc:"Registration is optional. If you create an account, you are responsible for maintaining the security of your credentials. You may delete your account at any time from the Profile settings.",trainDataTitle:"Train & Schedule Data",trainDataDesc:"Train schedule and fare data is sourced from publicly available Bangladesh Railway information. Always verify departure times with official Bangladesh Railway sources before travel.",aiAssistantTitle:"AI Assistant",aiAssistantDesc:"The AI assistant operates fully offline using local transport data. It supports English, Bengali, and Banglish. Responses are informational only and not a substitute for official sources.",privacyTitle:"Privacy",privacyDesc:"Your use is also governed by our Privacy Policy.",modificationsTitle:"Modifications",modificationsDesc:"We reserve the right to modify or discontinue any aspect of the Service at any time.",contactUs:"Contact & Support"},install:{title:"Install App",subtitle:"Install কই যাবো on your device for the best experience",installButton:"Install Now",benefits:"Benefits of Installing",offlineAccess:"Offline Access",fasterLoading:"Faster Loading",homeScreen:"Home Screen Shortcut",pushNotifications:"Push Notifications",alreadyInstalled:"App Already Installed!",enjoyFullApp:"You are using the installed version of Koi Jabo. Enjoy the full app experience!",howToUninstall:"How to Uninstall",onAndroid:"On Android (Chrome):",onIOS:"On iOS (Safari):",longPressIcon:"Long press app icon on home screen",tapUninstall:'Tap "Uninstall" or "App Info" → "Uninstall"',confirmOK:'Confirm "OK"',tapRemoveApp:'Tap "Remove App"',confirmDelete:'Confirm "Delete App"',worksOffline:"Works Offline",worksOfflineDesc:"Access bus routes even without internet connection",nativeExperience:"Native Experience",nativeExperienceDesc:"Feels like a real app on your device",noAppStore:"No App Store",noAppStoreDesc:"Install directly without Play Store",freeNoRegistration:"Free • No Registration • Works on all devices"},notifications:{title:"Notifications",noNotifications:"No notifications",markAllRead:"Mark all as read",trafficAlert:"Traffic Alert",routeUpdate:"Route Update",systemNotification:"System Notification",new:"new",allCaughtUp:"You're all caught up!",justNow:"Just now",m:"m",h:"h",d:"d",ago:"ago",source:"Source",dismiss:"Dismiss"},errors:{somethingWentWrong:"Something went wrong",tryAgain:"Try again",noInternetConnection:"No internet connection",locationPermissionDenied:"Location permission denied",locationNotAvailable:"Location not available",failedToLoadData:"Failed to load data",pageNotFound:"Page not found",serverError:"Server error"},offline:{workingOffline:"Working Offline",offlineMode:"Offline Mode",youAreOffline:"You are Offline",someFeaturesMayNotWork:"Some features may not work",proceedAnyway:"Proceed Anyway",intercityRequiresInternet:"Intercity search is now available offline!",aiRequiresInternet:"AI Assistant requires an internet connection.",usingCachedData:"Using cached offline data",statusBarMessage:"Offline Mode — Bus routes & Metro information fully available",staleWarningTitle:"You are Offline",staleWarningMessage:`It looks like you've not used the app in a while. Schedules might be outdated.

Please connect to the internet to update, or continue offline.`,continueOffline:"Continue Offline",details:"Details",noInternet:"No Internet Connection",cachedData:"Cached Data",dataCached:"Data cached {days} days ago",connectToUpdate:"Connect online to update data",availableFeatures:"Available Features",requiresOnline:"Requires Online",liveTracking:"Live Tracking",realTimeUpdates:"Real-time Updates",gotIt:"Got it",dontWorry:"No worries! Koy Jabo is designed to work fully offline. You can use all core features without internet."},map:{liveLocation:"Live Location",gpsSignalActive:"GPS Signal Active",acquiringSignal:"Acquiring Signal...",offlineMode:"Offline Mode",standard:"Standard",satellite:"Satellite",terrain:"Terrain",traffic:"Traffic",darkMode:"Dark Mode"},routeFinder:{suggestedRoutes:"Suggested Routes",noRoutesFound:"No routes found",tryDifferentLocations:"Try different locations",walk:"Walk",takeMetro:"Take Metro",takeBus:"Take Bus",transfer:"Transfer",totalTime:"Total Time",totalFare:"Total Fare",steps:"Steps"},intercity:{title:"Intercity Travel",searchIntercity:"Search Intercity",from:"From",to:"To",date:"Date",searchRoutes:"Search Routes",byBus:"By Bus",byTrain:"By Train",byAir:"By Air",departureTime:"Departure Time",arrivalTime:"Arrival Time",duration:"Duration",price:"Price",bookNow:"Book Now",searchLimit:"Search Limit",dailyLimitReached:"Daily Limit Reached",loadFailed:"Failed to load intercity data",selectStartEnd:"Select start and destination",search:"Search Now",exploreMini:"Explore",onYourRoute:"On Your Route",viewDemo:"View Demo",demoTitle:"How it works?",demoDesc:"Check a sample route info from our database.",signInRequired:"Sign in Required",signInToViewResults:"Sign in to your account to view route results.",signInPrefixError:"Please sign in to view search results."},blog:{postNotFound:"Post Not Found",backToBlog:"Back to Blog",author:"Author",share:"Share",sharePost:"Share this post",copied:"Copied!",copyLink:"Copy Link",toc:"Table of Contents",title:"Blog",subtitle:"Guides and tips about Dhaka and Bangladesh transport",featured:"Featured",by:"By",readMore:"Read More",allPosts:"All Posts",comingSoon:"More Coming Soon!",comingSoonDesc:"We're regularly adding new guides and tips. Stay tuned for the next update!",searchPlaceholder:"Search posts...",allCategories:"All",noResults:"No results found",clearFilters:"Clear filters",results:"results"},trainSearch:{title:"Bangladesh Railway",subtitle:"Search 367 trains across all routes | Intercity • Mail/Express • Commuter • Local",fromStation:"From Station",fromPlaceholder:"e.g., Dhaka, Kamalapur",toStation:"To Station",toPlaceholder:"e.g., Chittagong, Khulna",travelDate:"Travel Date (Optional)",swapStations:"Swap stations",searching:"Searching...",searchButton:"Search Trains",found:"Found",train:"train",bookTickets:"Book Tickets",departure:"Departure",duration:"Duration",arrival:"Arrival",availableClasses:"Available Classes:",stopsLabel:"Stops",offDays:"Off:",noTrainsFound:"No trains found",tryDifferentRoute:"Try searching for a different route or check station names",errorBothRequired:"Please enter both origin and destination stations",errorNoTrains:"No trains found between",errorFailed:"Failed to search trains. Please try again."},roadAlerts:{title:"Road & Traffic Alerts",activeReports:"Today's reports — {count} active",reportBtn:"Report",newReport:"Report a New Issue",locationPlaceholder:"Location / Road name (e.g., Mirpur-10 Flyover)",descPlaceholder:"Detailed description...",sending:"Sending...",reportAction:"Report",loading:"Loading...",noReportsToday:"No reports today",reportIfYouSee:"Report if you see an issue",reportedBy:"Reported by:",correct:"Correct",severityLow:"Low",severityMedium:"Medium",severityHigh:"High",severityOptLow:"Low Severity",severityOptMedium:"Medium",severityOptHigh:"High",justNow:"Just now",minutesAgo:" min ago",hoursAgo:" h ago",typeHeavy:"Heavy Traffic",typeAccident:"Accident",typeRoadBlock:"Road Block",typeBusDelayed:"Bus Delayed",typeBusCancelled:"Bus Cancelled",reportSuccess:"Report submitted successfully!"},liveTracker:{setManually:"Set location manually",typeStopName:"Type stop name...",noStopsFound:"No stops found",searchStop:"Search stop on this route...",allStops:"All Stops",current:"Current",manual:"Manual",manualStop:"Manual: Stop",of:"of",useGPS:"Use GPS",selectedStop:"Selected Stop",start:"Start",end:"End",desktopMode:"💻 Desktop Mode Detected",desktopWarning:"Location may be less accurate. Use a mobile device for GPS. Or search your stop manually above.",unknownLocation:"Unknown Location",showAllStops:"Show all stops"},contactUs:{title:"Contact Us",subtitle:"Let's Talk!",description:"Have questions, feedback, or found a missing route? We're here to help you navigate Bangladesh better.",getInTouch:"Get In Touch",reportBug:"Report a Bug",reportBugDesc:"Found an incorrect route or a technical glitch? Let us know.",openIssue:"Open Issue",shareIdeas:"Share Ideas",shareIdeasDesc:"Have an idea to make KoyJabo better? We'd love to hear it!",sendEmail:"Send Email",partnership:"Partnership",partnershipDesc:"Interested in integrating with KoyJabo? Let's connect.",founder:"Founder, KoyJabo",location:"Location",locationDesc:"Dhaka, Bangladesh",socialPage:"Facebook Page"},legal:{userAccounts:"User Accounts",registrationOptional:"Registration is optional. If you create an account, you are responsible for maintaining the security of your credentials. You may delete your account at any time from the Profile settings.",trainData:"Train & Schedule Data",trainDataDesc:"Train schedule and fare data is sourced from publicly available Bangladesh Railway information. Always verify departure times with official Bangladesh Railway sources before travel.",aiAssistant:"AI Assistant",aiAssistantDesc:"The AI assistant operates fully offline using local transport data. It supports English, Bengali, and Banglish. Responses are informational only and not a substitute for official sources.",liabilityFootnote:"TO THE FULLEST EXTENT PERMITTED BY LAW, KOYJABO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES.",privacy:"Privacy",privacyDesc:"Your use is also governed by our Privacy Policy.",modifications:"Modifications",modificationsDesc:"We reserve the right to modify or discontinue any aspect of the Service at any time."},authInfo:{title:"User Accounts & Authentication",offersOptional:"KoyJabo offers optional user accounts. When you sign up or sign in, we store:",githubProfile:"Your username and profile picture (for display purposes only)",emailIdentification:"Your email address (used for account identification, never shared with third parties)",localSearchHistory:"Your search history and saved routes (stored locally on your device, not on our servers)",deviceSessions:"Device sessions for security — you can view and revoke these from your Profile page",useWithoutAccount:"You may use KoyJabo without creating an account. All core transport features (bus routes, trains, metro, AI assistant) are fully available without login."},donts:{title:"What We Don't Do",noExternalAI:"We do NOT send your search queries to any external AI service. The AI assistant runs entirely offline on local transport data.",noDataSelling:"We do NOT sell your data to third parties.",noGPSTracking:"We do NOT track your precise GPS location without explicit consent.",noRequiredRegistration:"We do NOT require account registration to use the app.",noServerHistory:"We do NOT store your daily journey or route history on any server — all history is device-local only."},features:{userAccountsTitle:"User Accounts",userAccountsDesc:"Sign in to save your search history, manage devices, and personalize your experience.",githubOAuth:"Secure login — no password needed",localHistory:"Search history saved locally on device",profileManagement:"Profile, security & device management",journeyTrackerTitle:"Daily Journey Tracker",journeyTrackerDesc:"Log your daily commute stops, track journey history, and get route suggestions based on your travel patterns — all stored privately on your device."},releaseNotes:{title:"Release Notes",subtitle:"Latest updates and improvements to KoyJabo",whatsNew:"What's New",improvements:"Improvements",fixed:"Fixed",version:"Version",date:"Date"}}},si=b.createContext(void 0),wo=({children:a})=>{const[o,d]=b.useState("bn");b.useEffect(()=>{const r=localStorage.getItem("app-language");r&&(r==="en"||r==="bn")&&d(r)},[]);const t=r=>{d(r),localStorage.setItem("app-language",r)},n=(r,s)=>{const p=r.split(".");let h=Da[o];for(const f of p)if(h&&typeof h=="object")h=h[f];else{h=Da.en;for(const v of p)if(h&&typeof h=="object")h=h[v];else{h=r;break}break}let u=h||r;return s&&Object.entries(s).forEach(([f,v])=>{u=u.replace(`{${f}}`,v.toString())}),u},i=r=>{if(r==null)return"";const s=r.toString();if(o==="en")return s;const p={0:"০",1:"১",2:"২",3:"৩",4:"৪",5:"৫",6:"৬",7:"৭",8:"৮",9:"৯"};return s.replace(/[0-9]/g,h=>p[h])};return e.jsx(si.Provider,{value:{language:o,setLanguage:t,t:n,formatNumber:i},children:a})},ra=()=>{const a=b.useContext(si);if(!a)throw new Error("useLanguage must be used within a LanguageProvider");return a},li=b.createContext(void 0),Bo=({children:a})=>{const[o,d]=b.useState([]),t=b.useCallback((i,r="success")=>{const s=Math.random().toString(36).substring(2,9);d(p=>[...p,{id:s,message:i,type:r}]),setTimeout(()=>{d(p=>p.filter(h=>h.id!==s))},4e3)},[]),n=i=>{d(r=>r.filter(s=>s.id!==i))};return e.jsxs(li.Provider,{value:{showToast:t},children:[a,e.jsx("div",{className:"fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none",children:o.map(i=>e.jsxs("div",{className:`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border animate-in fade-in slide-in-from-bottom-5 duration-300 ${i.type==="success"?"bg-kj-primary-soft border-kj-primary/30 text-emerald-800 dark:text-emerald-200":"bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"}`,children:[i.type==="success"?e.jsx(Ri,{className:"w-5 h-5 text-kj-primary shrink-0"}):e.jsx(Ii,{className:"w-5 h-5 text-red-500 shrink-0"}),e.jsx("p",{className:"text-sm font-medium whitespace-nowrap",children:i.message}),e.jsx("button",{onClick:()=>n(i.id),className:"ml-2 text-kj-text-faint hover:text-kj-text-dim dark:hover:text-kj-text-faint",children:e.jsx(rt,{className:"w-4 h-4"})})]},i.id))})]})},di=()=>{const a=b.useContext(li);if(!a)throw new Error("useToast must be used within a ToastProvider");return a};function Co(a,o,d){const t=Math.floor((Date.now()-a)/6e4);return t<1?o("history.justNow"):t<60?`${d(t)} ${o("history.minutesAgo")}`:t<1440?`${d(Math.floor(t/60))} ${o("history.hoursAgo")}`:`${d(Math.floor(t/1440))} ${o("history.daysAgo")}`}const To=[{key:"ontime",en:"On-time",bn:"সময়মতো"},{key:"clean",en:"Cleanliness",bn:"পরিষ্কার"},{key:"comfort",en:"Comfort",bn:"আরামদায়ক"},{key:"staff",en:"Staff behavior",bn:"কর্মীর ব্যবহার"},{key:"safety",en:"Safety",bn:"নিরাপত্তা"}],Fo=[{emoji:"✨",en:"Clean",bn:"পরিষ্কার"},{emoji:"❄️",en:"Cool AC",bn:"ঠান্ডা এসি"},{emoji:"🕐",en:"On time",bn:"সময়মতো"},{emoji:"🛋️",en:"Comfortable",bn:"আরামদায়ক"},{emoji:"😊",en:"Friendly staff",bn:"ভালো কর্মী"},{emoji:"💰",en:"Good value",bn:"দাম ঠিক"}],Do=["","খুব খারাপ / Very bad","খারাপ / Bad","ঠিকঠাক / Okay","ভালো / Good","খুব ভালো / Very good"];function Ao(){return e.jsxs("div",{className:"space-y-4 animate-pulse px-4 pt-4",children:[e.jsxs("div",{className:"dc-card rounded-2xl p-5 flex items-center gap-6",children:[e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx("div",{className:"w-16 h-12 bg-kj-chip-bg rounded-lg mx-auto"}),e.jsx("div",{className:"flex gap-1 justify-center",children:Array.from({length:5},(a,o)=>e.jsx("div",{className:"w-4 h-4 bg-kj-chip-bg rounded"},o))}),e.jsx("div",{className:"w-16 h-3 bg-kj-chip-bg rounded mx-auto"})]}),e.jsx("div",{className:"flex-1 space-y-2",children:[5,4,3,2,1].map(a=>e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-3 h-3 bg-kj-chip-bg rounded"}),e.jsx("div",{className:"flex-1 h-2 bg-kj-chip-bg rounded-full"}),e.jsx("div",{className:"w-4 h-3 bg-kj-chip-bg rounded"})]},a))})]}),[1,2,3].map(a=>e.jsxs("div",{className:"dc-card rounded-2xl p-4 space-y-2",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsx("div",{className:"w-24 h-3.5 bg-kj-chip-bg rounded"}),e.jsx("div",{className:"flex gap-1",children:Array.from({length:5},(o,d)=>e.jsx("div",{className:"w-3 h-3 bg-kj-chip-bg rounded"},d))})]}),e.jsx("div",{className:"w-16 h-3 bg-kj-chip-bg rounded"})]}),e.jsx("div",{className:"w-full h-3 bg-kj-chip-bg rounded"}),e.jsx("div",{className:"w-3/4 h-3 bg-kj-chip-bg rounded"})]},a))]})}function qt({busId:a,busName:o,onBack:d,onSuccess:t}){const n=Te(),{t:i,language:r,formatNumber:s}=ra(),p=(x,y)=>r==="bn"?y:x,[h,u]=b.useState(null),[f,v]=b.useState(!0),[k,j]=b.useState(!1),[A,z]=b.useState(5),[C,I]=b.useState(0),[w,D]=b.useState({}),[B,H]=b.useState({}),[U,q]=b.useState([]),[P,W]=b.useState(""),[M,E]=b.useState(!1),[_,L]=b.useState(!1),{showToast:J}=di();b.useEffect(()=>{qa("bus_rating")},[]),b.useEffect(()=>{if(!_)return;const x=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=x}},[_]),b.useEffect(()=>{v(!0),we(a).then(x=>u(x)).catch(()=>J(i("community.loadError")||"Failed to load ratings","error")).finally(()=>v(!1))},[a]);const R=h==null?void 0:h.ratings.find(x=>x.userId===(n==null?void 0:n.id)),N=async x=>{x.preventDefault(),E(!0);const y=U.join(", "),g=[P.trim(),y].filter(Boolean).join(" · ");if(await Zn(a,A,g)){const V=await we(a);u(V),j(!1),W(""),z(5),q([]),D({}),J(i("community.ratingSubmitted")||"Rating saved!","success"),t==null||t()}else J(i("community.submitError")||"Failed to save. Please try again.","error");E(!1)},$=async()=>{if(E(!0),await eo(a)){const y=await we(a);u(y),j(!1),W(""),z(5),q([]),D({}),J(i("community.ratingDeleted")||"Rating removed.","success")}else J(i("community.submitError")||"Failed. Please try again.","error");L(!1),E(!1)},X=()=>{R?(z(R.stars),W((R.comment||"").trim())):(z(5),W(""),q([]),D({})),j(x=>!x)},Z=x=>{q(y=>y.includes(x)?y.filter(g=>g!==x):[...y,x])},F=(x,y="w-3.5 h-3.5")=>Array.from({length:5},(g,T)=>e.jsx(zt,{className:`${y} ${T<x?"text-amber-400 fill-amber-400":"text-kj-text-faint"}`},T));return e.jsxs("div",{className:"flex flex-col flex-1 min-h-0 bg-kj-bg overflow-hidden",children:[e.jsxs("div",{className:"sticky top-0 z-20 bg-kj-bg/90 backdrop-blur-md border-b border-kj-line flex items-center gap-3 px-4 py-3 shrink-0",children:[e.jsx("button",{onClick:d,className:"w-9 h-9 rounded-xl border border-kj-line bg-kj-panel text-kj-text-dim flex items-center justify-center active:scale-90 transition-all hover:border-kj-primary/40 hover:text-kj-primary",children:e.jsx(Ha,{className:"w-4 h-4"})}),e.jsx("span",{className:"font-bengali font-bold text-base text-kj-text flex-1",children:p("Rate & Review","রেট ও রিভিউ")}),n&&e.jsx("button",{onClick:X,className:"px-3 py-1.5 rounded-xl text-xs font-bold font-bengali text-kj-primary-ink active:scale-95 transition-all",style:{background:"linear-gradient(135deg, var(--kj-primary), var(--kj-primary-deep))",boxShadow:"0 4px 12px -4px var(--kj-primary)"},children:R?p("Edit rating","রেটিং সম্পাদনা"):p("Rate now","রেট করুন")})]}),e.jsx("div",{className:"flex-1 min-h-0 overflow-y-auto overscroll-y-contain touch-pan-y pb-8",style:{WebkitOverflowScrolling:"touch"},children:f?e.jsx(Ao,{}):e.jsxs("div",{className:"px-4 pt-4 space-y-4 max-w-2xl mx-auto w-full",children:[e.jsxs("div",{className:"dc-card rounded-2xl p-4 flex items-center gap-4",children:[e.jsx("div",{className:"w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0",style:{background:"linear-gradient(135deg, #f59e0b, #ea580c)"},children:"🚌"}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("p",{className:"font-bengali font-bold text-kj-text text-base truncate",children:o}),e.jsx("p",{className:"text-[11px] text-kj-text-faint font-sans mt-0.5",children:p("Rate & review this bus service","এই বাস সার্ভিসটি রেট ও রিভিউ করুন")})]})]}),h&&h.count>0&&e.jsxs("div",{className:"dc-card rounded-2xl p-5 flex items-center gap-6",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-5xl font-black text-kj-text",children:h.average.toFixed(1)}),e.jsx("div",{className:"flex mt-1 justify-center",children:F(Math.round(h.average),"w-4 h-4")}),e.jsx("p",{className:"text-xs text-kj-text-dim mt-1 font-bengali",children:i("community.ratingsCount",{count:s(h.count)})})]}),e.jsx("div",{className:"flex-1 space-y-1.5",children:[5,4,3,2,1].map(x=>{const y=h.ratings.filter(T=>T.stars===x).length,g=h.count?y/h.count*100:0;return e.jsxs("div",{className:"flex items-center gap-2 text-xs",children:[e.jsx("span",{className:"w-3 font-sans text-kj-text-dim",children:x}),e.jsx("div",{className:"flex-1 bg-kj-chip-bg rounded-full h-2",children:e.jsx("div",{className:"bg-amber-400 h-2 rounded-full transition-all duration-500",style:{width:`${g}%`}})}),e.jsx("span",{className:"w-4 font-sans text-kj-text-dim text-right",children:y})]},x)})})]}),k&&e.jsxs("form",{onSubmit:N,className:"space-y-4",children:[e.jsxs("div",{className:"dc-card rounded-2xl p-5 flex flex-col items-center gap-3",children:[e.jsx("p",{className:"text-[10px] font-bold uppercase tracking-[1.4px] text-kj-text-faint font-sans",children:p("Overall rating","সামগ্রিক রেটিং")}),e.jsx("div",{className:"flex gap-2",children:Array.from({length:5},(x,y)=>e.jsx("button",{type:"button",onMouseEnter:()=>I(y+1),onMouseLeave:()=>I(0),onClick:()=>z(y+1),className:"active:scale-90 transition-transform",children:e.jsx(zt,{className:`w-9 h-9 transition-colors ${y<(C||A)?"text-amber-400 fill-amber-400":"text-kj-text-faint"}`})},y))}),(C||A)>0&&e.jsxs("p",{className:"text-xs font-bold font-bengali",style:{color:"var(--kj-amber)"},children:["★ ",C||A," · ",Do[C||A]]})]}),e.jsxs("div",{className:"dc-card rounded-2xl p-4 space-y-3",children:[e.jsx("p",{className:"text-[10px] font-bold uppercase tracking-[1.4px] text-kj-text-faint font-sans",children:p("Rate aspects","বিস্তারিত রেট")}),To.map(x=>e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"flex-1 text-sm font-bengali text-kj-text",children:p(x.en,x.bn)}),e.jsx("div",{className:"flex gap-1",children:Array.from({length:5},(y,g)=>e.jsx("button",{type:"button",onMouseEnter:()=>H(T=>({...T,[x.key]:g+1})),onMouseLeave:()=>H(T=>({...T,[x.key]:0})),onClick:()=>D(T=>({...T,[x.key]:g+1})),className:"active:scale-90 transition-transform",children:e.jsx(zt,{className:`w-4 h-4 transition-colors ${g<(B[x.key]||w[x.key]||0)?"text-amber-400 fill-amber-400":"text-kj-text-faint"}`})},g))})]},x.key))]}),e.jsxs("div",{className:"dc-card rounded-2xl p-4 space-y-3",children:[e.jsx("p",{className:"text-[10px] font-bold uppercase tracking-[1.4px] text-kj-text-faint font-sans",children:p("What stood out?","কী ভালো লেগেছে?")}),e.jsx("div",{className:"flex flex-wrap gap-2",children:Fo.map(x=>{const y=p(x.en,x.bn),g=U.includes(y);return e.jsxs("button",{type:"button",onClick:()=>Z(y),className:`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold font-bengali border transition-all active:scale-95 ${g?"text-kj-primary-ink border-transparent":"bg-kj-chip-bg text-kj-text border-kj-line hover:border-kj-primary/40"}`,style:g?{background:"linear-gradient(135deg, var(--kj-primary), var(--kj-primary-deep))",boxShadow:"0 2px 8px -2px var(--kj-primary)"}:void 0,children:[e.jsx("span",{children:x.emoji}),e.jsx("span",{children:y})]},x.en)})})]}),e.jsxs("div",{className:"dc-card rounded-2xl p-4 space-y-3",children:[e.jsx("textarea",{value:P,onChange:x=>W(x.target.value.slice(0,500)),placeholder:p("Share your experience (optional)...","আপনার অভিজ্ঞতা লিখুন (ঐচ্ছিক)..."),rows:3,maxLength:500,className:"w-full bg-kj-input-bg border border-kj-line rounded-xl px-3 py-2.5 text-sm text-kj-text placeholder:text-kj-text-faint resize-none focus:outline-none focus:border-kj-primary/40 font-bengali"}),e.jsx("div",{className:"flex justify-end",children:e.jsxs("span",{className:"text-[10px] font-sans text-kj-text-faint",children:[P.length,"/500"]})})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{type:"button",onClick:()=>j(!1),className:"px-4 py-2.5 bg-kj-chip-bg text-kj-text-dim font-semibold text-sm rounded-xl font-bengali",children:p("Cancel","বাতিল")}),R&&e.jsx("button",{type:"button",onClick:()=>L(!0),disabled:M,className:"px-4 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 border border-red-200 dark:border-red-800 font-semibold text-sm rounded-xl disabled:opacity-50 font-bengali",children:p("Delete","মুছুন")}),e.jsx("button",{type:"submit",disabled:M,className:"flex-1 py-2.5 font-bold text-sm rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 text-kj-primary-ink font-bengali active:scale-[0.98] transition-all",style:{background:"linear-gradient(135deg, var(--kj-primary), var(--kj-primary-deep))",boxShadow:"0 6px 16px -6px var(--kj-primary)"},children:M?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"}),p("Posting...","পোস্ট হচ্ছে...")]}):p("Post Review","রিভিউ পোস্ট করুন")})]})]}),(!h||h.count===0)&&!k&&e.jsxs("div",{className:"dc-card rounded-2xl p-10 flex flex-col items-center gap-3 text-center",children:[e.jsx("div",{className:"w-16 h-16 rounded-2xl flex items-center justify-center text-3xl",style:{background:"linear-gradient(135deg, #f59e0b22, #ea580c22)"},children:"⭐"}),e.jsx("p",{className:"font-bengali font-bold text-kj-text",children:i("community.noRatingsYet")}),e.jsx("p",{className:"text-sm text-kj-text-faint font-bengali",children:i("community.beFirstToRate")}),n&&e.jsx("button",{onClick:X,className:"mt-1 px-5 py-2.5 rounded-xl text-sm font-bold font-bengali text-kj-primary-ink active:scale-95 transition-all",style:{background:"linear-gradient(135deg, var(--kj-primary), var(--kj-primary-deep))",boxShadow:"0 4px 12px -4px var(--kj-primary)"},children:p("Rate now","রেট করুন")})]}),h==null?void 0:h.ratings.map(x=>{var y;return e.jsxs("div",{className:"dc-card rounded-2xl p-4",children:[e.jsxs("div",{className:"flex items-start justify-between gap-2",children:[e.jsxs("div",{className:"flex items-center gap-2.5",children:[e.jsx("div",{className:"w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 font-sans",style:{background:"linear-gradient(135deg, #f59e0b, #ea580c)"},children:(x.displayName||"U").charAt(0).toUpperCase()}),e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("p",{className:"font-semibold text-kj-text text-sm font-bengali",children:x.displayName||"User"}),x.userId===(n==null?void 0:n.id)&&e.jsx("span",{className:"text-[9px] font-bold px-1.5 py-0.5 rounded font-sans",style:{background:"var(--kj-primary-soft)",color:"var(--kj-primary)"},children:"YOU"})]}),e.jsx("div",{className:"flex gap-0.5 mt-0.5",children:F(x.stars,"w-3.5 h-3.5")})]})]}),e.jsxs("div",{className:"flex items-center gap-2 shrink-0",children:[e.jsx("span",{className:"text-xs text-kj-text-faint font-sans",children:Co(x.timestamp,i,s)}),x.userId===(n==null?void 0:n.id)&&e.jsx("button",{onClick:X,className:"w-7 h-7 rounded-lg bg-kj-chip-bg flex items-center justify-center text-kj-text-dim hover:text-kj-primary transition-colors text-sm",children:"⋯"})]})]}),((y=x.comment)==null?void 0:y.trim())&&e.jsx("p",{className:"text-sm text-kj-text-dim mt-2.5 pl-10 font-bengali leading-relaxed",children:x.comment.trim()}),e.jsx("div",{className:"flex items-center gap-2 mt-3 pl-10",children:e.jsx("button",{className:"text-[11px] text-kj-text-faint hover:text-kj-primary font-semibold font-bengali transition-colors",children:p("👍 Helpful","👍 সহায়ক")})})]},x.userId+x.timestamp)}),e.jsx("div",{className:"h-4"})]})}),_&&e.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[e.jsx("div",{className:"absolute inset-0 bg-black/50 backdrop-blur-sm",onClick:()=>L(!1)}),e.jsxs("div",{className:"relative w-full max-w-sm bg-kj-panel rounded-2xl border border-kj-line p-5 shadow-2xl",children:[e.jsx("h3",{className:"text-base font-bold text-kj-text mb-2 font-bengali",children:i("community.deleteRating")}),e.jsx("p",{className:"text-sm text-kj-text-dim mb-4 font-bengali",children:i("community.confirmDeleteRating")}),e.jsxs("div",{className:"flex gap-2 justify-end",children:[e.jsx("button",{onClick:()=>L(!1),className:"px-4 py-2 rounded-xl bg-kj-chip-bg text-kj-text-dim text-sm font-semibold font-bengali",children:i("common.cancel")}),e.jsxs("button",{onClick:$,disabled:M,className:"px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold disabled:opacity-50 flex items-center gap-2 font-bengali",children:[M&&e.jsx("span",{className:"w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"}),M?p("Deleting...","মুছছে..."):i("community.deleteRating")]})]})]})]}),e.jsx(So,{language:r,size:"300x250",compact:!0})]})}const Aa={"4 নং Alike":"৪নং বাস","4 No Alike":"৪নং বাস","6 নং":"৬নং বাস","6 No":"৬নং বাস","7 নং":"৭নং বাস","7 No":"৭নং বাস","8 নং":"৮নং বাস","8 No":"৮নং বাস","9 নং":"৯নং বাস","9 No":"৯নং বাস",Agradut:"অগ্রদূত","Anabil Super":"অনাবিল",Arnob:"অরনব বাস",Akash:"আকাশ বাস",Akik:"আকিক ",Achim:"আছিম পরিবহন","Ajmeri Glory":"আজমেরী গ্লোর","Al Makka":"আল মক্কা বাস","Al Madina Plus One":"আল মনিদা প্লাস",Alif:"আলিফ বাস",Ashirbad:"আশীর্বাদ পরিবহন","Ashulia Classic":"আশুলিয়া ক্লাসিক বাস",Asmani:"আসমানী বাস",Ayath:"আয়াত বাস",ETC:"ইটিসি বাস",Winner:"উইনার বাস",ATCL:"এটিসিএল বাস",FTCL:"এফটিসিএল বাস",Everest:"এভারেস্ট পরিবহন বাস","MM Lovely":"এম এম লাভলী বাস","MTCL 2":"এমটিসিএল ২ বাস","Airport Bangabandhu Avenue":"এয়ারপোর্ট বঙ্গবন্ধু এভিনিউ ট্রান্","Omama International":"ওমামা ইন্টারন্যাশনাল বাস",Welcome:"ওয়েলকাম বাস",Konak:"কনক বাস","Kamal Plus":"কামাল প্লাস পরিবহন বাস",Kiranmala:"কিরণমালা বাস",Cantonment:"ক্যান্টনমেন্ট বাস","Cantonment Mini Service":"ক্যান্টনমেন্ট মিনি সার্ভিস","Khaja Baba":"খাজা বাবা বাস",Gazipur:"গাজীপুর পরিবহন বাস","Gulshan Chaka":"গুলশান চাকা বাস",Gramin:"গ্রামীণ বাস","Green Anabil":"গ্রীন অনাবিল বাস","Green Dhaka":"গ্রীন ঢাকা বাস",Champion:"চ্যাম্পিয়ন বাস",Shalsabil:"ছালছাবিল বাস",Salsabil:"ছালছাবিল বাস","Jabale Nur":"জাবালে নুর পরিবহন বাস","Trans Silva":"ট্রান্স সিলভা বাস",Transilva:"ট্রান্স সিলভা বাস","Trust AC":"ট্রাষ্ট ট্রান্সপোর্ট বাস এসি",Trust:"ট্রাষ্ট ট্রান্সপোর্ট বাস",Thikana:"ঠিকানা বাস","D One":"ডি ওয়ান বাস","D Link":"ডি লিংক বাস","Dhakar Chaka":"ঢাকার চাকা বাস","Taranga Plus":"তরঙ্গ প্লাস বাস",Tanjil:"তানজিল পরিবহন বাস",Talukdar:"তালুকদার বাস",Titas:"তিতাস বাস",Tetulia:"তেতুলিয়া বাস",Dishari:"দিসারি বাস",Deepan:"দীপন বাস",Dewan:"দেওয়ান বাস","Desh Bangla":"দেশ বাংলা বাস",Dip:"দ্বীপ পরিবহন বাস","New Vision":"নিউ ভিশন বাস",Nilachal:"নিলাচল বাস","Noor E Makka":"নূর এ মক্কা বাস",Paristhan:"পরিস্থান বাস","Pallabi Super":"পল্লবী সুপার","Purbachal Logistics":"পূর্বাচল লজিস্টিকস বাস",Prochesta:"প্রচেষ্টা বাস",Projapoti:"প্রজাপতি বাস",Protoy:"প্রত্যয় বাস","Prabhati Bonshree":"প্রভাতী বনশ্রী","First Ten":"ফার্স্ট টেন",Bondhu:"বন্ধু পরিবহন বাস",Balaka:"বলাকা বাস",Basumati:"বাসুমতি বাস",Bahon:"বাহন বাস","BRTC Articulated":"বি আর টিসি আরটিকুলেটেড বাস",BRTC:"বি আর টিসি বাস","Bikalpa Bus Auto Service":"বিকল্প বাস অটো সার্ভিস","Bikalpa Bus City Super Service":"বিকল্প বাস সিটি সুপার সার্ভিস",Bikash:"বিকাশ বাস",Bihanga:"বিহাঙ্গা বাস",Best:"বেষ্ট ট্রান্সপোর্ট","Best Satabdi AC":"বেষ্ট শতাব্দী এসি বাস",Baishakhi:"বৈশাখী বাস",Borak:"বোরাক বাস","VIP 27":"ভিআইপি ২৭ বাস","Victor Classic":"ভিক্টর ক্লাসিক বাস",Victor:"ভিক্টর পরিবহন বাস",Bhuiyan:"ভূঁইয়া পরিবহন",Madhumoti:"মধুমতি বাস","Manjil Express":"মাঞ্জিল এক্সপ্রেস",Malancha:"মালঞ্চ বাস",Midline:"মিডলাইন বাস","Mirpur United Service":"মিরপুর ইউনাইটেড সার্ভিস","Mirpur Mission":"মিরপুর মিশন বাস","Mirpur Metro Service":"মিরপুর মেট্রো সার্ভিস","Mirpur Link":"মিরপুর লিংক বাস",Meghla:"মেঘলা ট্রান্সপোর্ট",Meskat:"মেসকাত বাস",Maitri:"মৈত্রী বাস",Mohona:"মোহনা বাস",Maumita:"মৌমিতা বাস",Rajanigandha:"রজনীগন্ধা বাস",Robrob:"রবরব বাস",Ramjan:"রমযান বাস",Raida:"রাইদা বাস",Rajdhani:"রাজধানী বাস","Raja City":"রাজা সিটি বাস",Rupa:"রুপা পরিবহন বাস",Labbaik:"লাব্বাইক বাস","Lal Sobuj":"লাল সবুজ",LAMS:"ল্যামস পরিবহন বাস",Shatabdi:"শতাব্দি বাস","Shahriya Enterprise":"শাহরিয়া এন্টারপ্রাইজ বাস",Shikor:"শিকড় পরিবহন বাস","Shikor Paribahan":"শিকড় পরিবহন বাস",Shubhojatra:"শুভযাত্রা বাস",Shubhechcha:"শুভেচ্ছা বাস",Savar:"সাভার পরিবহন বাস","City Link":"সিটি লিংক বাস",Siam:"সিয়াম ট্রান্সপোর্ট বাস",Super:"সুপার বাস",Suprobhat:"সুপ্রভাত বাস","Safety Druti":"সেফটি দ্রুতি বাস",Skyline:"স্কাই লাইন বাস",Shokolpo:"স্বকল্প ট্রান্সপোর্ট",Shojon:"স্বজন পরিবহন বাস","Shadhin Express":"স্বাধীন এক্সপ্রেস বাস",Shadhin:"স্বাধীন বাস",Haji:"হাজি ট্রান্সপোর্ট",Himachal:"হিমাচল বাস",Himaloy:"হিমালয় বাস",Modhumoti:"মধুমতি বাস",Moumita:"মৌমিতা বাস",Himalay:"হিমালয় বাস",Itihash:"ইতিহাস বাস",Lams:"ল্যামস পরিবহন বাস","Rob Rob":"রবরব বাস",Prajapati:"প্রজাপতি বাস",Kanak:"কনক বাস","Sakalpa Transport":"স্বকল্প ট্রান্সপোর্ট","Swajan Paribahan":"স্বজন পরিবহন বাস",Suveccha:"শুভেচ্ছা বাস",Suvojatri:"শুভযাত্রা বাস","Lal Sabuj":"লাল সবুজ","Nur E Makka":"নূর এ মক্কা বাস","9 No.":"৯নং বাস",Shahria:"শাহরিয়া এন্টারপ্রাইজ বাস",Shahriya:"শাহরিয়া এন্টারপ্রাইজ বাস"},No=(a,o)=>{const d=a.replace(/\(.*\)/g,"").replace(/Paribahan/gi,"").replace(/Transport/gi,"").replace(/Service/gi,"").replace(/Enterprise/gi,"").replace(/Bus/gi,"").replace(/No\./gi,"নং").replace(/Co\./gi,"").replace(/Ltd\./gi,"").trim();let t=Aa[d]||Aa[a]||o;if(!t)return"/default-bus.svg";const n=["ডি লিংক বাস","পল্লবী সুপার","শিকড় পরিবহন বাস"],i=["বিকল্প বাস সিটি সুপার সার্ভিস"];return n.includes(t)?`/buses-image/${t}.png`:i.includes(t)?`/buses-image/${t}.jpeg`:`/buses-image/${t}.jpg`};function Na(a,o,d){const t=Math.floor((Date.now()-a)/6e4);return t<1?o("history.justNow"):t<60?`${d(t)} ${o("history.minutesAgo")}`:t<1440?`${d(Math.floor(t/60))} ${o("history.hoursAgo")}`:`${d(Math.floor(t/1440))} ${o("history.daysAgo")}`}async function Ro(a,o=280){return new Promise(d=>{const t=new FileReader;t.onload=n=>{const i=new Image;i.onload=()=>{const r=document.createElement("canvas");let{width:s,height:p}=i;const h=800;if(s>h||p>h){const v=Math.min(h/s,h/p);s=Math.round(s*v),p=Math.round(p*v)}r.width=s,r.height=p,r.getContext("2d").drawImage(i,0,0,s,p);let u=.85,f=r.toDataURL("image/jpeg",u);for(;f.length>o*1024*1.37&&u>.3;)u-=.1,f=r.toDataURL("image/jpeg",u);d(f)},i.src=n.target.result},t.readAsDataURL(a)})}function Io(){return e.jsx("div",{className:"grid grid-cols-3 gap-2 animate-pulse",children:[1,2,3,4,5,6].map(a=>e.jsx("div",{className:"aspect-square rounded-xl bg-kj-chip-bg"},a))})}function Vt({busId:a,busName:o,busBnName:d,onBack:t,onSuccess:n}){const i=Te(),{t:r,formatNumber:s,language:p}=ra(),h=(y,g)=>p==="bn"?g:y,[u,f]=b.useState([]),[v,k]=b.useState(!0),[j,A]=b.useState(!1),[z,C]=b.useState(""),[I,w]=b.useState(null),[D,B]=b.useState(!1),[H,U]=b.useState(!1),[q,P]=b.useState(null),[W,M]=b.useState(null),[E,_]=b.useState(!1),[L,J]=b.useState(null),[R,N]=b.useState(!1),{showToast:$}=di(),X=b.useRef(null);b.useEffect(()=>{const y=No(o,d),g=!!y&&y!=="/default-bus.svg";J(y),N(g)},[o,d]),b.useEffect(()=>{qa("bus_photos")},[]),b.useEffect(()=>{if(!q&&!W)return;const y=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=y}},[q,W]),b.useEffect(()=>{k(!0),_t(a).then(y=>f(y)).catch(()=>$(r("community.loadError")||"Failed to load photos","error")).finally(()=>k(!1))},[a]);const Z=async y=>{var V;const g=(V=y.target.files)==null?void 0:V[0];if(!g)return;if(!g.type.startsWith("image/")){$("Please select a valid image file.","error");return}B(!0);const T=await Ro(g);w(T),B(!1)},F=async y=>{if(y.preventDefault(),!I)return;if(U(!0),await to(a,o,z,I)){const T=await _t(a);f(T),A(!1),C(""),w(null),$(r("community.photoUploaded")||"Photo uploaded!","success"),n==null||n()}else $(r("community.submitError")||"Failed to upload. Please try again.","error");U(!1)},x=async()=>{if(!W)return;if(_(!0),await ao(a,W.id)){const g=await _t(a);f(g),(q==null?void 0:q.id)===W.id&&P(null),$(r("community.photoDeleted")||"Photo deleted.","success")}else $(r("community.submitError")||"Failed to delete photo. Please try again.","error");M(null),_(!1)};return e.jsxs("div",{className:"min-h-screen bg-kj-bg text-kj-text overflow-y-auto pb-32",children:[e.jsxs("div",{className:"sticky top-0 z-20 bg-kj-bg/90 backdrop-blur-md border-b border-kj-line flex items-center gap-3 px-4 py-3",children:[e.jsx("button",{onClick:t,className:"w-9 h-9 rounded-xl border border-kj-line bg-kj-panel text-kj-text-dim flex items-center justify-center active:scale-90 transition-all hover:border-kj-primary/40 hover:text-kj-primary",children:e.jsx(Ha,{className:"w-4 h-4"})}),e.jsx("span",{className:"font-bengali font-bold text-base text-kj-text",children:h("Bus Photos","বাসের ছবি")})]}),e.jsxs("div",{className:"px-4 py-5 space-y-4 max-w-2xl mx-auto w-full",children:[e.jsxs("div",{className:"dc-card p-4 flex items-center gap-4",children:[e.jsx("div",{className:"w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shrink-0 shadow-lg",children:e.jsx(Mt,{className:"w-6 h-6 text-white"})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("p",{className:"font-bold text-kj-text text-base truncate",children:o}),e.jsxs("p",{className:"text-xs text-kj-text-dim mt-0.5",children:[s(u.length)," ",h("photos","ছবি")]})]}),i&&e.jsxs("button",{onClick:()=>A(!j),className:"flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-xs font-bold shrink-0 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 active:scale-95 transition-all shadow",children:[e.jsx(Mt,{className:"w-3.5 h-3.5"}),h("Add Photo","ছবি যোগ করুন")]})]}),R&&e.jsxs("div",{className:"dc-card p-3",children:[e.jsx("p",{className:"text-[11px] font-bold text-kj-text-faint uppercase tracking-widest mb-2",children:h("Official Image","অফিসিয়াল ছবি")}),e.jsx("div",{className:"rounded-xl overflow-hidden border border-kj-line bg-kj-bg flex items-center justify-center",children:e.jsx("img",{src:L||"/default-bus.svg",alt:`${o} bus`,className:"w-full max-h-52 object-contain",loading:"lazy",onError:()=>{J("/default-bus.svg"),N(!1)}})}),e.jsx("p",{className:"text-xs text-kj-text-faint mt-2",children:h("Currently available bus image. Upload newer photos below.","বর্তমানে পাওয়া বাসের ছবি। নিচে নতুন ছবি আপলোড করুন।")})]}),j&&e.jsxs("form",{onSubmit:F,className:"dc-card p-4 space-y-3",children:[e.jsx("p",{className:"font-bold text-kj-text text-sm",children:r("community.uploadPhotoTitle")}),D?e.jsxs("div",{className:"w-full h-32 border-2 border-dashed border-pink-400/40 rounded-xl flex flex-col items-center justify-center gap-2 text-pink-500",children:[e.jsx("span",{className:"w-6 h-6 border-2 border-pink-300 border-t-pink-500 rounded-full animate-spin"}),e.jsx("span",{className:"text-sm",children:r("community.compressing")||"Compressing..."})]}):I?e.jsxs("div",{className:"relative",children:[e.jsx("img",{src:I,alt:"preview",className:"w-full rounded-xl object-cover max-h-48"}),e.jsx("button",{type:"button",onClick:()=>{w(null),X.current&&(X.current.value="")},className:"absolute top-2 right-2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center text-white",children:e.jsx(rt,{className:"w-4 h-4"})})]}):e.jsxs("button",{type:"button",onClick:()=>{var y;return(y=X.current)==null?void 0:y.click()},className:"w-full h-32 border-2 border-dashed border-kj-line rounded-xl flex flex-col items-center justify-center gap-2 text-kj-text-faint hover:border-pink-400 hover:text-pink-500 transition-colors",children:[e.jsx(Wt,{className:"w-6 h-6"}),e.jsx("span",{className:"text-sm",children:h("Upload your photo","ছবি আপলোড করুন")})]}),e.jsx("input",{ref:X,type:"file",accept:"image/*",className:"hidden",onChange:Z}),e.jsx("input",{value:z,onChange:y=>C(y.target.value.slice(0,200)),placeholder:r("community.photoCaptionOptional"),maxLength:200,className:"w-full bg-kj-chip-bg border border-kj-line rounded-xl px-3 py-2.5 text-sm text-kj-text placeholder:text-kj-text-faint"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{type:"submit",disabled:!I||H||D,className:"flex-1 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 disabled:opacity-50 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all",children:H?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"}),r("community.submitting")]}):r("community.submit")}),e.jsx("button",{type:"button",onClick:()=>{A(!1),w(null),C("")},className:"px-4 py-2.5 bg-kj-chip-bg text-kj-text-dim font-semibold text-sm rounded-xl",children:r("common.cancel")})]})]}),e.jsxs("div",{className:"flex items-center justify-between gap-3 pt-1",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-kj-text text-base",children:h("Rider photos","যাত্রীদের ছবি")}),e.jsxs("p",{className:"text-xs text-kj-text-faint mt-0.5",children:[s(u.length)," ",h("uploaded photos","আপলোড করা ছবি")]})]}),i&&!j&&e.jsx("button",{onClick:()=>A(!0),className:"px-3 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-600 active:scale-95 transition-all",children:h("Add photo","ছবি যোগ করুন")})]}),v?e.jsx(Io,{}):e.jsxs(e.Fragment,{children:[u.length===0&&!j&&e.jsxs("div",{className:"text-center py-16",children:[e.jsx("div",{className:"w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/10 to-rose-600/10 border border-pink-500/20 flex items-center justify-center mx-auto mb-4",children:e.jsx(Mt,{className:"w-8 h-8 text-pink-500/60"})}),e.jsx("p",{className:"text-kj-text-dim font-semibold",children:r("community.noPhotosYet")}),e.jsx("p",{className:"text-sm text-kj-text-faint mt-1",children:r("community.beFirstToUpload")}),i&&e.jsx("button",{onClick:()=>A(!0),className:"mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-bold rounded-xl active:scale-95 transition-all",children:h("Add Photo","ছবি যোগ করুন")})]}),e.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-3 gap-3",children:[i&&!j&&u.length>0&&e.jsxs("button",{type:"button",onClick:()=>A(!0),className:"aspect-square rounded-2xl border-2 border-dashed border-kj-line bg-kj-panel/80 flex flex-col items-center justify-center gap-2 text-kj-text-faint hover:border-pink-400 hover:text-pink-500 transition-colors",children:[e.jsx(Wt,{className:"w-7 h-7"}),e.jsx("span",{className:"text-xs font-bold",children:h("Upload photo","ছবি আপলোড")})]}),u.map(y=>e.jsxs("div",{className:"kj-photo relative rounded-2xl overflow-hidden aspect-square border border-kj-line bg-kj-panel",children:[e.jsxs("button",{onClick:()=>P(y),className:"absolute inset-0 w-full h-full",children:[e.jsx("img",{src:y.dataUrl,alt:y.caption||o,className:"w-full h-full object-cover"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"}),e.jsxs("div",{className:"absolute bottom-0 left-0 right-0 p-2",children:[y.caption&&e.jsx("p",{className:"text-[10px] text-white font-medium truncate",children:y.caption}),e.jsx("p",{className:"text-[10px] text-white/70",children:Na(y.timestamp,r,s)})]})]}),i&&y.userId===i.id&&e.jsx("button",{onClick:g=>{g.stopPropagation(),M(y)},className:"kj-photo-del absolute top-1.5 right-1.5 w-6 h-6 bg-red-500/80 hover:bg-red-600 rounded-full flex items-center justify-center z-10 opacity-0 transition-opacity",title:"Delete photo",children:e.jsx(la,{className:"w-3 h-3 text-white"})})]},y.id))]})]}),!i&&e.jsxs("div",{className:"dc-card p-4 border-2 border-dashed border-kj-line flex flex-col items-center gap-2 text-center",children:[e.jsx("div",{className:"w-10 h-10 rounded-xl bg-kj-chip-bg flex items-center justify-center",children:e.jsx(Wt,{className:"w-5 h-5 text-kj-text-faint"})}),e.jsx("p",{className:"text-sm font-semibold text-kj-text-dim",children:h("Upload your photo","ছবি আপলোড করুন")}),e.jsx("p",{className:"text-xs text-kj-text-faint",children:h("Sign in to contribute photos","ছবি যোগ করতে সাইন ইন করুন")})]}),e.jsx("div",{className:"h-4"})]}),q&&(()=>{const y=u.findIndex(V=>V.id===q.id),g=y>0,T=y<u.length-1;return e.jsxs("div",{className:"fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center backdrop-blur-sm",children:[e.jsxs("div",{className:"absolute top-0 left-0 right-0 p-4 flex items-start justify-between bg-gradient-to-b from-black/60 to-transparent z-10",children:[e.jsxs("div",{className:"flex-1 pr-4",children:[e.jsx("p",{className:"text-white font-semibold text-sm drop-shadow-md",children:q.caption||o}),e.jsxs("p",{className:"text-white/70 text-xs mt-1 drop-shadow-md",children:[q.displayName," · ",Na(q.timestamp,r,s)]})]}),e.jsxs("div",{className:"flex items-center gap-2 shrink-0",children:[i&&q.userId===i.id&&e.jsx("button",{onClick:()=>{M(q),P(null)},className:"w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-transform active:scale-95",children:e.jsx(la,{className:"w-5 h-5 text-white"})}),e.jsx("button",{onClick:()=>P(null),className:"w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center transition-transform active:scale-95",children:e.jsx(rt,{className:"w-6 h-6 text-white"})})]})]}),e.jsx("div",{className:"relative w-full h-full flex items-center justify-center p-4 md:p-12",children:e.jsx("img",{src:q.dataUrl,alt:q.caption||o,className:"max-w-full max-h-full object-contain rounded-lg select-none"})}),g&&e.jsx("button",{onClick:V=>{V.stopPropagation(),P(u[y-1])},className:"absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90 z-10",children:e.jsx(zi,{className:"w-8 h-8"})}),T&&e.jsx("button",{onClick:V=>{V.stopPropagation(),P(u[y+1])},className:"absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90 z-10",children:e.jsx(Mi,{className:"w-8 h-8"})})]})})(),W&&e.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[e.jsx("div",{className:"absolute inset-0 bg-black/70 backdrop-blur-sm",onClick:()=>M(null)}),e.jsxs("div",{className:"relative w-full max-w-sm dc-card p-5",children:[e.jsx("h3",{className:"text-base font-bold text-kj-text mb-2",children:r("community.deletePhotoTitle")||"Delete Photo?"}),e.jsx("p",{className:"text-sm text-kj-text-dim mb-4",children:r("community.deletePhotoDesc")||"This will permanently remove your photo. This action cannot be undone."}),e.jsxs("div",{className:"flex gap-2 justify-end",children:[e.jsx("button",{onClick:()=>M(null),disabled:E,className:"px-4 py-2 rounded-xl bg-kj-chip-bg text-kj-text-dim text-sm font-semibold disabled:opacity-50",children:h("Cancel","বাতিল")}),e.jsxs("button",{onClick:x,disabled:E,className:"px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold disabled:opacity-50 flex items-center gap-2 active:scale-95 transition-all",children:[E&&e.jsx("span",{className:"w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"}),E?h("Deleting…","মুছছে…"):h("Delete","মুছুন")]})]})]})]})]})}const zo=[{id:"seats",en:"Seats",bn:"সিট"},{id:"route",en:"Route & Stops",bn:"রুট ও স্টপ"},{id:"bus",en:"Bus & Amenities",bn:"বাস ও সুবিধা"},{id:"photos",en:"Photos",bn:"ছবি"},{id:"reviews",en:"Reviews",bn:"রিভিউ"},{id:"policy",en:"Policy",bn:"নীতি"}];function Mo(a,o,d,t){var j,A,z;const n=a.split(/⇄|→|->/),i=((j=n[0])==null?void 0:j.trim())||d,r=((A=n[1])==null?void 0:A.trim())||t,s=C=>{const I=C.match(/\(([^)]+)\)/);return I?I[1].trim():""},p=i.replace(/\([^)]+\)/,"").trim(),h=s(i)||((z=o==null?void 0:o.split("/")[0])==null?void 0:z.trim())||"",u=r.replace(/\([^)]+\)/,"").trim(),f=s(r),v=[],k=o.split("/").map(C=>C.trim()).filter(Boolean);return k.length>0?k.forEach((C,I)=>{v.push({name:`${C} (${p})`,nameBn:C,time:"",kind:I===0?"boarding":"stop"})}):v.push({name:h||p,nameBn:p,time:"",kind:"boarding"}),v.push({name:f?`${u} (${f})`:u,nameBn:u,time:"",kind:"destination"}),v}const Wo=[{label:"AC",labelBn:"এসি",icon:"❄️",available:!0},{label:"Recliner",labelBn:"রিক্লাইনার",icon:"💺",available:!0},{label:"Charger",labelBn:"চার্জার",icon:"🔌",available:!0},{label:"Toilet",labelBn:"টয়লেট",icon:"🚻",available:!0},{label:"Snacks",labelBn:"স্ন্যাকস",icon:"🍿",available:!0},{label:"Water",labelBn:"পানি",icon:"💧",available:!0},{label:"WiFi",labelBn:"ওয়াইফাই",icon:"📶",available:!1},{label:"TV",labelBn:"টিভি",icon:"📺",available:!0}],Po=Array.from({length:10},()=>Array.from({length:4},()=>"available")),Ht={available:{bg:"transparent",border:"#10b981"},booked:{bg:"#374151",border:"#374151"},selected:{bg:"#10b981",border:"#10b981"},ladies:{bg:"#fce7f355",border:"#ec4899"}},yt={available:{en:"Available",bn:"খালি"},booked:{en:"Booked",bn:"বুকড"},selected:{en:"Selected",bn:"নির্বাচিত"},ladies:{en:"Ladies'",bn:"মহিলা"}},Eo=[{brand:"bKash",brandColor:"#e2136e",icon:"💳",title:"10% cashback on bus tickets",titleBn:"বাস টিকেটে ১০% ক্যাশব্যাক",sub:"Pay with bKash · T&C apply",subBn:"bKash দিয়ে পেমেন্ট করুন"},{brand:"Travel Insurance",brandColor:"#0ea5e9",icon:"🛡️",title:"Cover your intercity journey",titleBn:"আপনার যাত্রা সুরক্ষিত রাখুন",sub:"From ৳49 per trip",subBn:"৳৪৯ থেকে শুরু প্রতি ট্রিপে"},{brand:"Uber",brandColor:"#000",icon:"🚗",title:"50% off your next ride",titleBn:"পরের রাইডে ৫০% ছাড়",sub:"Use code KOYJABO50",subBn:"কোড KOYJABO50 ব্যবহার করুন"}];function Lo({tk:a,lang:o}){const d=(r,s)=>l(o,s,r),[t,n]=b.useState(Po),i=(r,s)=>{n(p=>{const h=p.map(f=>[...f]),u=h[r][s];return u==="booked"||u==="ladies"||(h[r][s]=u==="selected"?"available":"selected"),h})};return e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:c,fontSize:12,color:a.textFaint,marginBottom:16,lineHeight:1.5},children:d("Seats shown for reference · purchase at operator counter","সিট শুধু রেফারেন্সের জন্য · কাউন্টারে কিনুন")}),e.jsx("div",{style:{display:"flex",gap:16,flexWrap:"wrap",marginBottom:16},children:Object.entries(Ht).map(([r,s])=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx("div",{style:{width:16,height:16,borderRadius:4,background:s.bg,border:`2px solid ${s.border}`}}),e.jsx("span",{style:{fontFamily:o==="bn"?m:c,fontSize:12,color:a.textDim},children:d(yt[r].en,yt[r].bn)})]},r))}),e.jsxs("div",{style:{background:a.panelMuted,borderRadius:16,padding:20,border:`1px solid ${a.line}`,display:"inline-block"},children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,color:a.textFaint,textAlign:"center",marginBottom:12},children:d("FRONT →","সামনে →")}),t.map((r,s)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,marginBottom:6},children:[e.jsx("span",{style:{fontFamily:c,fontSize:11,color:a.textFaint,width:18,textAlign:"right",flexShrink:0},children:s+1}),r.map((p,h)=>e.jsxs(Ee.Fragment,{children:[h===2&&e.jsx("div",{style:{width:12,flexShrink:0}}),e.jsx("button",{onClick:()=>i(s,h),style:{width:32,height:32,borderRadius:6,background:Ht[p].bg,border:`2px solid ${Ht[p].border}`,cursor:p==="booked"?"not-allowed":"pointer",fontFamily:c,fontSize:10,fontWeight:600,color:p==="selected"?"#fff":p==="booked"?"#6b7280":p==="ladies"?"#ec4899":"#10b981",transition:"all 0.1s ease"},title:`Row ${s+1} Seat ${h+1} — ${d(yt[p].en,yt[p].bn)}`,children:`${s+1}${String.fromCharCode(65+h)}`})]},h))]},s))]})]})}function $o({tk:a,lang:o,stops:d}){const t=(r,s)=>l(o,s,r),n={boarding:"#10b981",stop:"#3b82f6",rest:"#f59e0b",destination:"#ef4444"},i={boarding:{en:"Boarding",bn:"যাত্রা শুরু"},stop:{en:"Stop",bn:"স্টপ"},rest:{en:"Rest Stop",bn:"বিরতি"},destination:{en:"Destination",bn:"গন্তব্য"}};return e.jsx("div",{children:d.map((r,s)=>e.jsxs("div",{style:{display:"flex",gap:16,position:"relative"},children:[s<d.length-1&&e.jsx("div",{style:{position:"absolute",left:14,top:28,bottom:0,width:2,background:a.line,zIndex:0}}),e.jsx("div",{style:{position:"relative",zIndex:1,flexShrink:0},children:e.jsxs("div",{style:{width:28,height:28,borderRadius:"50%",background:n[r.kind],border:`3px solid ${a.bg}`,boxShadow:`0 0 0 2px ${n[r.kind]}`,display:"flex",alignItems:"center",justifyContent:"center"},children:[r.kind==="boarding"&&e.jsx("span",{style:{fontSize:11},children:"▶"}),r.kind==="destination"&&e.jsx("span",{style:{fontSize:11},children:"★"}),r.kind==="rest"&&e.jsx("span",{style:{fontSize:11},children:"☕"}),r.kind==="stop"&&e.jsx("span",{style:{fontSize:9,color:"#fff",fontWeight:700},children:"•"})]})}),e.jsxs("div",{style:{paddingBottom:24},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"},children:[e.jsx("span",{style:{fontFamily:o==="bn"?m:c,fontSize:15,fontWeight:600,color:a.text},children:t(r.name,r.nameBn)}),e.jsx("span",{style:{background:`${n[r.kind]}22`,border:`1px solid ${n[r.kind]}`,borderRadius:6,padding:"2px 8px",fontFamily:c,fontSize:11,fontWeight:600,color:n[r.kind]},children:t(i[r.kind].en,i[r.kind].bn)})]}),e.jsxs("div",{style:{fontFamily:c,fontSize:13,color:a.textFaint,marginTop:2},children:["🕐 ",r.time]})]})]},r.name))})}function _o({tk:a,lang:o}){const d=(t,n)=>l(o,n,t);return e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:12},children:Wo.map(t=>e.jsxs("div",{style:{background:t.available?"#10b98122":a.panelMuted,border:`1px solid ${t.available?"#10b981":a.line}`,borderRadius:14,padding:"16px 8px",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:26,marginBottom:6},children:t.icon}),e.jsx("div",{style:{fontFamily:o==="bn"?m:c,fontSize:12,fontWeight:600,color:t.available?"#10b981":a.textFaint},children:d(t.label,t.labelBn)}),e.jsx("div",{style:{fontFamily:c,fontSize:10,color:t.available?"#10b981":a.textFaint,marginTop:3},children:t.available?d("✓ Available","✓ আছে"):d("N/A","নেই")})]},t.label))})}function Uo(a){var y,g,T,V;const{theme:o,device:d,lang:t,onNav:n,params:i}=a,r=d==="mobile",s=ae[o],[p,h]=b.useState("seats"),[u,f]=b.useState(!1),[v,k]=b.useState(!1),[j,A]=b.useState(null),z=(O,S)=>l(t,S,O),C=(i==null?void 0:i.operator)||"Green Line Paribahan",I=C.split(" ").map(O=>O[0]).join("").toUpperCase().slice(0,2),w=(i==null?void 0:i.route)||"Dhaka ⇄ Cox's Bazar",D=(i==null?void 0:i.costNonAC)||"৳680",B=i!=null&&i.costAC&&i.costAC!=="-"?i.costAC:null,H=(i==null?void 0:i.counter)||"Sayedabad / Arambagh",U=(i==null?void 0:i.contact)||"16557",q=(i==null?void 0:i.from)||"Dhaka",P=(i==null?void 0:i.to)||(i==null?void 0:i.district)||"Destination",W=xo(C),E=((y=vo(q,P).filter(O=>O.operator.id===((W==null?void 0:W.id)||""))[0])==null?void 0:y.route)||null,_=E?E.stops.map(O=>({name:O.name,nameBn:O.bnName,time:O.arrivalTime||"",kind:O.type==="origin"?"boarding":O.type==="destination"?"destination":O.type==="major"?"rest":"stop"})):Mo(w,H,q,P),L=(E==null?void 0:E.fareNonAC)||D,J=(E==null?void 0:E.fareAC)||B,R=(E==null?void 0:E.durationHrs)||"",N=E?E.dhakaCounters.join(" / "):H,$=(W==null?void 0:W.phone[0])||U,X=(E==null?void 0:E.departureTimes)||[],Z=(E==null?void 0:E.busType)||(W==null?void 0:W.busTypes)||[],F=(W==null?void 0:W.policy)||null;if(Ee.useEffect(()=>{we(C).then(A).catch(()=>A(null))},[C]),u)return e.jsx(ne,{...a,canBack:!0,children:e.jsx("div",{style:{padding:r?"16px 12px 100px":"24px 40px 80px",maxWidth:920,margin:"0 auto"},children:e.jsx("div",{style:{background:s.panel,border:`1px solid ${s.line}`,borderRadius:18,padding:0,overflow:"hidden"},children:e.jsx(Vt,{busId:C,busName:C,busBnName:(W==null?void 0:W.bnName)||C,onBack:()=>f(!1),onSuccess:()=>be(8,"Photo uploaded")})})})});if(v)return e.jsx(ne,{...a,canBack:!0,children:e.jsx("div",{style:{padding:r?"16px 12px 100px":"24px 40px 80px",maxWidth:920,margin:"0 auto"},children:e.jsx("div",{style:{background:s.panel,border:`1px solid ${s.line}`,borderRadius:18,padding:0,overflow:"hidden",minHeight:r?"calc(100vh - 150px)":"calc(100vh - 190px)",display:"flex"},children:e.jsx(qt,{busId:C,busName:C,onBack:()=>{k(!1),we(C).then(A).catch(()=>A(null))},onSuccess:()=>be(10,"Review submitted")})})})});const x=()=>{var O;switch(p){case"seats":return e.jsx(Lo,{tk:s,lang:t});case"route":return e.jsx($o,{tk:s,lang:t,stops:_});case"bus":return e.jsx(_o,{tk:s,lang:t});case"photos":return e.jsx(Vt,{busId:C,busName:C,busBnName:(W==null?void 0:W.bnName)||C,onBack:()=>h("bus"),onSuccess:()=>be(8,"Photo uploaded")});case"reviews":return e.jsx(qt,{busId:C,busName:C,onBack:()=>h("bus"),onSuccess:()=>{be(10,"Review submitted"),we(C).then(A).catch(()=>{})}});case"policy":{const S=F,K=S?[{icon:"❌",title:z("Cancellation","বাতিল নীতি"),text:l(t,S.cancellationBn||"",S.cancellation)},{icon:"💰",title:z("Refund","রিফান্ড"),text:l(t,S.refundBn||"",S.refund)},{icon:"🧳",title:z("Luggage","মালপত্র"),text:l(t,S.luggageBn||"",S.luggage)},{icon:"🚌",title:z("Boarding","বোর্ডিং"),text:l(t,S.boardingBn||"",S.boarding)},{icon:"👶",title:z("Children","শিশু"),text:l(t,S.childPolicyBn||"",S.childPolicy)}]:[{icon:"📋",title:z("Policy","নীতি"),text:z("Contact operator for policy details.","অপারেটরের সাথে যোগাযোগ করুন।")}];return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[K.map((Q,G)=>e.jsxs("div",{style:{background:s.panelMuted,borderRadius:12,padding:"12px 14px"},children:[e.jsxs("div",{style:{fontFamily:c,fontSize:13,fontWeight:700,color:s.text,marginBottom:4},children:[Q.icon," ",Q.title]}),e.jsx("div",{style:{fontFamily:t==="bn"?m:c,fontSize:13,color:s.textDim,lineHeight:1.6},children:Q.text})]},G)),(O=S==null?void 0:S.specialNotes)==null?void 0:O.map((Q,G)=>{var ie;return e.jsxs("div",{style:{background:`${s.amber}22`,border:`1px solid ${s.amber}44`,borderRadius:10,padding:"10px 12px",fontFamily:t==="bn"?m:c,fontSize:12,color:s.textDim},children:["ℹ️ ",(ie=S.specialNotesBn)!=null&&ie[G]?l(t,S.specialNotesBn[G],Q):Q]},`note-${G}`)}),X.length>0&&e.jsxs("div",{style:{background:s.panelMuted,borderRadius:12,padding:"12px 14px"},children:[e.jsxs("div",{style:{fontFamily:c,fontSize:13,fontWeight:700,color:s.text,marginBottom:8},children:["🕐 ",z("Departure Times (from Dhaka)","ঢাকা থেকে ছাড়ার সময়")]}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:X.map((Q,G)=>e.jsx("span",{style:{background:s.primarySoft,color:s.primary,borderRadius:8,padding:"4px 10px",fontFamily:c,fontSize:13,fontWeight:700},children:Q},G))})]}),Z.length>0&&e.jsxs("div",{style:{background:s.panelMuted,borderRadius:12,padding:"12px 14px"},children:[e.jsxs("div",{style:{fontFamily:c,fontSize:13,fontWeight:700,color:s.text,marginBottom:8},children:["🚌 ",z("Bus Types","বাসের ধরন")]}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:Z.map((Q,G)=>e.jsx("span",{style:{background:s.accentSoft,color:s.accent,borderRadius:8,padding:"4px 10px",fontFamily:c,fontSize:12,fontWeight:600},children:Q},G))})]})]})}}};return e.jsx(ne,{...a,children:e.jsxs("div",{style:{color:s.text},children:[e.jsxs("div",{style:{background:"linear-gradient(135deg, #064e3b 0%, #065f46 55%, #022c22 100%)",padding:r?"28px 16px 24px":"40px 32px 32px",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",inset:0,pointerEvents:"none",background:"radial-gradient(ellipse 70% 60% at 80% 50%, rgba(16,185,129,0.12), transparent)"}}),e.jsxs("div",{style:{position:"relative",zIndex:1},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:16,flexWrap:"wrap"},children:[e.jsx("div",{style:{width:52,height:52,borderRadius:14,background:"linear-gradient(135deg, #006a4e 0%, #10b981 100%)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:c,fontSize:16,fontWeight:800,color:"#fff",flexShrink:0},children:I}),e.jsxs("div",{children:[e.jsx("h1",{style:{fontFamily:t==="bn"?m:c,fontSize:r?20:26,fontWeight:800,color:"#fff",margin:0},children:C}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginTop:4,flexWrap:"wrap"},children:[e.jsxs("span",{style:{fontFamily:c,fontSize:13,color:"rgba(255,255,255,0.75)"},children:["⭐ ",j?`${j.average.toFixed(1)} (${j.count} ${z("reviews","রিভিউ")})`:`4.2 (${z("loading...","লোড হচ্ছে...")})`]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5,background:"rgba(255,255,255,0.15)",borderRadius:999,padding:"3px 10px"},children:[e.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:"#4ade80",display:"inline-block"},className:"kj-anim-pulse"}),e.jsx("span",{style:{fontFamily:c,fontSize:11,fontWeight:700,color:"#4ade80",letterSpacing:"0.07em"},children:z("Live info","লাইভ তথ্য")})]})]}),e.jsxs("div",{style:{display:"flex",gap:8,marginTop:12},children:[e.jsxs("button",{onClick:()=>f(!0),style:{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:10,padding:"8px 14px",color:"#fff",fontFamily:c,fontSize:12,fontWeight:600,cursor:"pointer"},children:["📷 ",z("Photos","ছবি")]}),e.jsxs("button",{onClick:()=>k(!0),style:{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:10,padding:"8px 14px",color:"#fff",fontFamily:c,fontSize:12,fontWeight:600,cursor:"pointer"},children:["★ ",z("Review","রিভিউ")]})]})]})]}),e.jsxs("div",{style:{background:"rgba(255,255,255,0.12)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:16,padding:r?"14px 16px":"16px 24px",display:"flex",alignItems:"center",gap:16,flexWrap:r?"wrap":"nowrap"},children:[e.jsxs("div",{style:{textAlign:"center",flex:1},children:[e.jsx("div",{style:{fontFamily:c,fontSize:12,color:"rgba(255,255,255,0.6)"},children:((g=w.split("⇄")[0])==null?void 0:g.trim())||"Dhaka"}),e.jsx("div",{style:{fontFamily:c,fontSize:20,fontWeight:800,color:"#fff"},children:((T=N.split("/")[0])==null?void 0:T.trim())||"Counter"}),e.jsx("div",{style:{fontFamily:c,fontSize:11,color:"rgba(255,255,255,0.5)"},children:z("Boarding point","বোর্ডিং পয়েন্ট")})]}),e.jsxs("div",{style:{textAlign:"center",flexShrink:0},children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,color:"rgba(255,255,255,0.6)",marginBottom:4},children:z("Overnight","রাত্রিকালীন")}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:3},children:[e.jsx("div",{style:{width:32,height:1,background:"rgba(255,255,255,0.4)"}}),e.jsx("span",{style:{fontSize:16},children:"🚌"}),e.jsx("div",{style:{width:32,height:1,background:"rgba(255,255,255,0.4)"}})]})]}),e.jsxs("div",{style:{textAlign:"center",flex:1},children:[e.jsx("div",{style:{fontFamily:c,fontSize:12,color:"rgba(255,255,255,0.6)"},children:((V=w.split("⇄")[1])==null?void 0:V.trim())||"Destination"}),e.jsx("div",{style:{fontFamily:c,fontSize:20,fontWeight:800,color:"#fff"},children:L}),J&&e.jsxs("div",{style:{fontFamily:c,fontSize:11,color:"rgba(255,255,255,0.5)"},children:["AC: ",J]})]})]}),e.jsx("div",{style:{display:"flex",gap:10,marginTop:16,flexWrap:"wrap"},children:[{val:q,label:z("From","থেকে")},{val:P,label:z("To","গন্তব্য")},{val:L,label:z("Non-AC","নন-এসি")},...J?[{val:J,label:z("AC","এসি")}]:[],...R?[{val:R,label:z("Duration","সময়")}]:[]].map(O=>e.jsxs("div",{style:{background:"rgba(255,255,255,0.12)",borderRadius:10,padding:"8px 14px",textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:c,fontSize:16,fontWeight:800,color:"#fff"},children:O.val}),e.jsx("div",{style:{fontFamily:c,fontSize:11,color:"rgba(255,255,255,0.65)"},children:O.label})]},O.label))})]})]}),e.jsxs("div",{style:{maxWidth:1100,margin:"0 auto",padding:r?"16px":"24px 32px",display:"flex",gap:28,alignItems:"flex-start"},children:[e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{display:"flex",overflowX:"auto",gap:4,borderBottom:`1px solid ${s.line}`,marginBottom:24,paddingBottom:0},children:zo.map(O=>e.jsx("button",{onClick:()=>h(O.id),style:{background:"none",border:"none",cursor:"pointer",padding:"10px 14px",whiteSpace:"nowrap",fontFamily:t==="bn"?m:c,fontSize:13,fontWeight:p===O.id?700:500,color:p===O.id?s.primary:s.textDim,borderBottom:`2px solid ${p===O.id?s.primary:"transparent"}`,transition:"all 0.15s ease",flexShrink:0},children:z(O.en,O.bn)},O.id))}),e.jsx("div",{style:{marginBottom:24},children:x()}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,alignItems:"center",marginBottom:24},children:[e.jsx(ee,{tk:s,lang:t,kind:r?"mob-banner":"leaderboard"}),e.jsx(ee,{tk:s,lang:t,kind:"mid-rect"})]}),e.jsxs("div",{style:{marginBottom:24},children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,fontWeight:700,letterSpacing:.8,textTransform:"uppercase",color:s.textFaint,marginBottom:12},children:z("Sponsored","বিজ্ঞাপন")}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:Eo.map(O=>e.jsxs("div",{style:{background:s.panel,border:`1px solid ${s.line}`,borderRadius:14,padding:"14px 16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer"},children:[e.jsx("div",{style:{width:44,height:44,borderRadius:12,flexShrink:0,background:`${O.brandColor}22`,border:`1px solid ${O.brandColor}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22},children:O.icon}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,fontWeight:700,color:O.brandColor,marginBottom:2,textTransform:"uppercase",letterSpacing:.4},children:O.brand}),e.jsx("div",{style:{fontFamily:t==="bn"?m:c,fontSize:14,fontWeight:600,color:s.text},children:z(O.title,O.titleBn)}),e.jsx("div",{style:{fontFamily:t==="bn"?m:c,fontSize:12,color:s.textDim},children:z(O.sub,O.subBn)})]}),e.jsx("span",{style:{fontFamily:c,fontSize:18,color:s.textFaint},children:"›"})]},O.brand))})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:e.jsx(ee,{tk:s,lang:t,kind:r?"mob-banner":"leaderboard"})})]}),!r&&e.jsx("div",{style:{width:280,flexShrink:0,position:"sticky",top:76},children:e.jsxs("div",{style:{background:s.panel,border:`1px solid ${s.line}`,borderRadius:18,padding:20,boxShadow:s.shadow,backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",marginBottom:16},children:[e.jsx("div",{style:{fontFamily:c,fontSize:13,fontWeight:700,color:s.text,marginBottom:16},children:z("Price Info","মূল্য তথ্য")}),e.jsxs("div",{style:{borderBottom:`1px solid ${s.line}`,paddingBottom:14,marginBottom:14},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:8},children:[e.jsx("span",{style:{fontFamily:c,fontSize:13,color:s.textDim},children:z("AC Sleeper","এসি স্লিপার")}),e.jsx("span",{style:{fontFamily:c,fontSize:14,fontWeight:700,color:"#10b981"},children:"৳900–1200"})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("span",{style:{fontFamily:c,fontSize:13,color:s.textDim},children:z("Non-AC","নন-এসি")}),e.jsx("span",{style:{fontFamily:c,fontSize:14,fontWeight:700,color:"#10b981"},children:"৳700"})]})]}),e.jsx("div",{style:{fontFamily:c,fontSize:11,fontWeight:700,letterSpacing:.5,textTransform:"uppercase",color:s.textFaint,marginBottom:10},children:z("Where to Buy","কোথায় কিনবেন")}),[{icon:"🏢",label:N},{icon:"📞",label:$}].map(O=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:8,fontFamily:c,fontSize:13,color:s.textDim},children:[e.jsx("span",{children:O.icon}),e.jsx("span",{children:O.label})]},O.label)),e.jsxs("div",{style:{marginTop:14,background:s.amberSoft,border:`1px solid ${s.amber}`,borderRadius:10,padding:"8px 10px",fontFamily:t==="bn"?m:c,fontSize:11,color:s.textDim,lineHeight:1.5},children:["ℹ ",z("KoyJabo doesn't sell tickets · info only","KoyJabo টিকেট বিক্রি করে না · শুধু তথ্য")]})]})})]})]})})}const fe=a=>String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;");function Ho(a,o,d,t){const i=(d-a)*Math.PI/180,r=(t-o)*Math.PI/180,s=Math.sin(i/2)**2+Math.cos(a*Math.PI/180)*Math.cos(d*Math.PI/180)*Math.sin(r/2)**2;return 6371*2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s))}function Ko(a){const o=["#10b981","#3b82f6","#f59e0b","#ef4444","#8b5cf6","#06b6d4","#f97316","#84cc16","#ec4899","#14b8a6"];let d=0;for(let t=0;t<a.length;t++)d=d*31+a.charCodeAt(t)>>>0;return o[d%o.length]}async function Oo(a){var o;if(a.length<2)return null;try{let t=a;if(a.length>100){const h=(a.length-1)/99;t=Array.from({length:100},(u,f)=>a[Math.round(f*h)])}const n=t.map(([h,u])=>`${u},${h}`).join(";"),i=t.map(()=>50).join(";"),r=`https://router.project-osrm.org/route/v1/driving/${n}?overview=full&geometries=geojson&radiuses=${i}`,s=await fetch(r,{signal:AbortSignal.timeout(1e4)});if(!s.ok)return null;const p=await s.json();return p.code!=="Ok"||!((o=p.routes)!=null&&o[0])?null:{path:p.routes[0].geometry.coordinates.map(([h,u])=>[u,h]),waypoints:(p.waypoints||[]).map(h=>[h.location[1],h.location[0]])}}catch{return null}}const Go=({route:a,userLocation:o,highlightStartId:d,highlightEndId:t,isReversed:n=!1,onOpenFullMap:i,height:r=310})=>{const s=b.useRef(null),p=b.useRef(null),h=b.useRef(null),u=b.useRef(null),f=b.useRef(null),v=b.useRef(null),k=b.useRef(null),[j,A]=b.useState(!1),[z,C]=b.useState(!1),[I,w]=b.useState(!1),[D,B]=b.useState(!1),[H,U]=b.useState(!1),[q,P]=b.useState(!1),[W,M]=b.useState(!0),[E,_]=b.useState(typeof navigator<"u"?navigator.onLine:!0);b.useEffect(()=>{const y=()=>_(!0),g=()=>_(!1);return window.addEventListener("online",y),window.addEventListener("offline",g),()=>{window.removeEventListener("online",y),window.removeEventListener("offline",g)}},[]);const L=Ko(a.id),J=n?[...a.stops].reverse():a.stops,R=J.filter(y=>!!ge[y]),N=R.map(y=>[ge[y].lat,ge[y].lng]);let $=-1,X=-1;if(d&&t){const y=R.indexOf(d),g=R.indexOf(t);y!==-1&&g!==-1&&($=Math.min(y,g),X=Math.max(y,g))}let Z=-1,F=1/0;o&&N.length>0&&N.forEach(([y,g],T)=>{const V=Ho(o.lat,o.lng,y,g);V<F&&(F=V,Z=T)}),b.useEffect(()=>{if(!s.current||N.length===0)return;let y=!1;return Ae(()=>import("./leaflet-BF7F7cMi.js").then(g=>g.l),__vite__mapDeps([3,4])).then(async g=>{if(y)return;if(!document.getElementById("leaflet-css")){const Q=document.createElement("link");Q.id="leaflet-css",Q.rel="stylesheet",Q.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(Q)}delete g.Icon.Default.prototype._getIconUrl,g.Icon.Default.mergeOptions({iconUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",iconRetinaUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",shadowUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"}),p.current&&(p.current.remove(),p.current=null);const T=typeof window<"u"&&("ontouchstart"in window||navigator.maxTouchPoints>0||window.matchMedia("(pointer: coarse)").matches),V=g.map(s.current,{zoomControl:!T,attributionControl:!1,scrollWheelZoom:!T,dragging:!T,touchZoom:!1});if(T&&(V.dragging.disable(),V.scrollWheelZoom.disable(),V.touchZoom.enable(),s.current)){s.current.style.touchAction="pan-y pinch-zoom",s.current.style.pointerEvents="auto";const Q=G=>{G.touches.length>1&&G.preventDefault()};s.current.addEventListener("touchmove",Q,{passive:!1}),V.once("unload",()=>{var G;(G=s.current)==null||G.removeEventListener("touchmove",Q)})}T||V.touchZoom.disable(),V.doubleClickZoom.disable(),V.boxZoom.disable(),V.keyboard.disable(),h.current=g.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"",maxZoom:19,crossOrigin:!0}).addTo(V),p.current=V,u.current=g.layerGroup().addTo(V),f.current=g.layerGroup().addTo(V);const O=[...N];o&&O.push([o.lat,o.lng]);const S=g.latLngBounds(O);V.fitBounds(S,{padding:[32,32]}),x(g,N,null,!1),A(!0);const K=await Oo(N);y||!p.current||(K?(k.current=K.path,x(g,N,K.path,!0,K.waypoints),P(!0)):k.current=null)}),()=>{y=!0,p.current&&(p.current.remove(),p.current=null,k.current=null,A(!1),P(!1))}},[a.id,n]);const x=b.useCallback((y,g,T,V,O=null)=>{if(!u.current)return;u.current.clearLayers();const S=T??g;if(y.polyline(S,{color:L,weight:12,opacity:.15,lineCap:"round",lineJoin:"round"}).addTo(u.current),y.polyline(S,{color:L,weight:4,opacity:.95,lineCap:"round",lineJoin:"round"}).addTo(u.current),y.polyline(S,{color:"#ffffff",weight:1.5,opacity:.5,dashArray:"10, 20",lineCap:"round",className:"route-line-flow"}).addTo(u.current),$>=0&&X>=0&&X>$){const ie=g.slice($,X+1);ie.length>=2&&y.polyline(ie,{color:"#f59e0b",weight:6,opacity:1,lineCap:"round",lineJoin:"round"}).addTo(u.current)}const K=$>=0&&X>=0,Q=K?$:0,G=K?X:g.length-1;if(g.forEach((ie,oe)=>{const re=ge[R[oe]];if(!re)return;const he=oe===Q,se=oe===G,le=oe===Z;let je="#fff",ke=L,me=L,Qe="",Xe=14,Ze=8;he?(je="#10b981",ke="#059669",me="#fff",Qe="Start",Xe=52,Ze=10):se?(je="#1e293b",ke="#0f172a",me="#fff",Qe="Destination",Xe=76,Ze=10):le?(je="#6366f1",ke="#4f46e5",me="#fff",Qe="Nearest",Xe=58,Ze=9):(Qe="●",Xe=12,Ze=8);const ht=he||se||le?24:14,Rt=he||se||le?Xe:14,vi=he||se||le?12:"50%",ji=V&&O&&O[oe]?O[oe]:ie,ki=y.divIcon({className:"custom-bus-marker",iconSize:[Rt,ht],iconAnchor:[Rt/2,ht/2],html:`
          <div class="relative flex items-center justify-center">
            ${he||se||le?`<div class="absolute w-full h-full bg-${he?"green":se?"slate":"indigo"}-400/30 rounded-full animate-ping" style="padding: 10px;"></div>`:""}
            <div style="width:${Rt}px;height:${ht}px;border-radius:${vi}px;background:${je};border:2px solid ${ke};display:flex;align-items:center;justify-content:center;font-size:${Ze}px;font-weight:700;color:${me};box-shadow:0 2px 6px rgba(0,0,0,0.3);white-space:nowrap;padding:0 8px;font-family:sans-serif;position:relative;z-index:1;">${Qe}</div>
          </div>

        `});y.marker(ji,{icon:ki,zIndexOffset:he||se||le?1e3:500}).bindTooltip(`<b>${fe(re.name)}</b><br><small>${fe(re.bnName)}</small>`,{direction:"top",offset:[0,-ht/2-4],className:"leaflet-tooltip-bus"}).addTo(u.current)}),o){if(v.current&&v.current.remove(),Z>=0){const oe=V&&O&&O[Z]?O[Z]:g[Z],re=Math.round(F*1e3),he=re>=1e3?`${(re/1e3).toFixed(1)} km`:`${re} m`;y.polyline([[o.lat,o.lng],oe],{color:"#6366f1",weight:2.5,opacity:.85,dashArray:"6 5",lineCap:"round"}).addTo(u.current);const se=ge[R[Z]];if(se){const me=y.divIcon({className:"",iconSize:[72,24],iconAnchor:[36,12],html:'<div style="width:72px;height:24px;border-radius:12px;background:#6366f1;border:2px solid #4f46e5;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff;box-shadow:0 2px 8px rgba(99,102,241,0.5);white-space:nowrap;padding:0 8px;font-family:sans-serif;">📍 Nearest</div>'});y.marker(oe,{icon:me,zIndexOffset:900}).bindTooltip(`<b>📍 ${fe(se.name)}</b><br><small>নিকটতম বাস স্টপ · ${fe(he)} দূরে</small>`,{direction:"top",offset:[0,-16],className:"leaflet-tooltip-bus"}).addTo(u.current)}const le=(o.lat+oe[0])/2,je=(o.lng+oe[1])/2,ke=y.divIcon({className:"",iconSize:[60,18],iconAnchor:[30,9],html:`<div style="background:rgba(99,102,241,0.9);color:#fff;border-radius:8px;font-size:9px;font-weight:700;padding:2px 7px;white-space:nowrap;font-family:sans-serif;">🚶 ${he}</div>`});y.marker([le,je],{icon:ke,interactive:!1}).addTo(u.current)}const ie=y.divIcon({className:"",iconSize:[20,20],iconAnchor:[10,10],html:'<div style="width:20px;height:20px;border-radius:50%;background:#3b82f6;border:3px solid #fff;box-shadow:0 0 0 2px #3b82f6,0 2px 6px rgba(0,0,0,0.3);"></div>'});v.current=y.marker([o.lat,o.lng],{icon:ie,zIndexOffset:1e3}).bindTooltip("📍 আপনি এখানে",{direction:"top",className:"leaflet-tooltip-bus"}).addTo(u.current)}},[a.id,n,$,X,o,L,Z,F]);return b.useEffect(()=>{!j||!p.current||Ae(()=>import("./leaflet-BF7F7cMi.js").then(y=>y.l),__vite__mapDeps([3,4])).then(y=>{u.current&&x(y,N,k.current,k.current!==null)})},[x,j]),b.useEffect(()=>{!j||!p.current||Ae(()=>import("./leaflet-BF7F7cMi.js").then(y=>y.l),__vite__mapDeps([3,4])).then(y=>{f.current&&(f.current.clearLayers(),I&&Object.values(kt).forEach(g=>{const T=y.divIcon({className:"",iconSize:[26,26],iconAnchor:[13,13],html:`<div style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#6366f1);border:2.5px solid #fff;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(59,130,246,0.5);" title="${g.name}"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><rect x="5" y="2" width="14" height="20" rx="3"/><line x1="9" y1="6" x2="15" y2="6"/><circle cx="9" cy="14" r="1.5" fill="white"/><circle cx="15" cy="14" r="1.5" fill="white"/></svg></div>`});y.marker([g.lat,g.lng],{icon:T}).bindTooltip(`<b>🚇 ${fe(g.name)}</b><br><small>${fe(g.bnName||"")}</small>`,{direction:"top",className:"leaflet-tooltip-bus"}).addTo(f.current)}),D&&Object.values(Di).forEach(g=>{const T=y.divIcon({className:"",iconSize:[26,26],iconAnchor:[13,13],html:`<div style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#10b981,#059669);border:2.5px solid #fff;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(16,185,129,0.5);" title="${fe(g.name)}"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><rect x="4" y="3" width="16" height="15" rx="3"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="7" y2="21"/><line x1="15" y1="18" x2="17" y2="21"/></svg></div>`});y.marker([g.lat,g.lng],{icon:T}).bindTooltip(`<b>🚂 ${fe(g.name)}</b><br><small>${fe(g.bnName||"")}</small>`,{direction:"top",className:"leaflet-tooltip-bus"}).addTo(f.current)}),H&&Object.values(Ai).forEach(g=>{const T=y.divIcon({className:"",iconSize:[28,28],iconAnchor:[14,14],html:`<div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#f97316,#ef4444);border:2.5px solid #fff;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(249,115,22,0.5);" title="${fe(g.name)}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19.5 2.5S18 1 16.5 2.5L13 6 4.8 4.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 5.7 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z"/></svg></div>`});y.marker([g.lat,g.lng],{icon:T}).bindTooltip(`<b>✈️ ${fe(g.name)}</b><br><small>${fe(g.bnName||"")}</small>`,{direction:"top",className:"leaflet-tooltip-bus"}).addTo(f.current)}))})},[I,D,H,j]),b.useEffect(()=>{!j||!p.current||!I||Ae(()=>import("./leaflet-BF7F7cMi.js").then(y=>y.l),__vite__mapDeps([3,4])).then(y=>{const g=p.current;if(!g)return;const T=Object.values(kt).map(K=>[K.lat,K.lng]),V=[...N];o&&V.push([o.lat,o.lng]);const O=[...V,...T];if(O.length<2)return;const S=y.latLngBounds(O);g.fitBounds(S,{padding:[30,30]})})},[I,j,o,a.id,n]),b.useEffect(()=>{!j||!p.current||!o||Ae(()=>import("./leaflet-BF7F7cMi.js").then(y=>y.l),__vite__mapDeps([3,4])).then(y=>{if(u.current)if(v.current)v.current.setLatLng([o.lat,o.lng]);else{const g=y.divIcon({className:"",iconSize:[20,20],iconAnchor:[10,10],html:'<div style="width:20px;height:20px;border-radius:50%;background:#3b82f6;border:3px solid #fff;box-shadow:0 0 0 2px #3b82f6,0 2px 6px rgba(0,0,0,0.3);"></div>'});v.current=y.marker([o.lat,o.lng],{icon:g,zIndexOffset:1e3}).bindTooltip("আপনি এখানে",{direction:"top",className:"leaflet-tooltip-bus"}).addTo(u.current)}})},[o,j]),b.useEffect(()=>{if(!j||!p.current||!h.current)return;const y=p.current;Ae(()=>import("./leaflet-BF7F7cMi.js").then(g=>g.l),__vite__mapDeps([3,4])).then(g=>{if(!y||!h.current)return;y.removeLayer(h.current);const T=W&&E?"https://mt1.google.com/vt/lyrs=m@221097413,traffic&x={x}&y={y}&z={z}":"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";h.current=g.tileLayer(T,{attribution:"",maxZoom:19}).addTo(y)})},[W,E,j]),e.jsxs("div",{className:"kj-map relative z-0 isolate w-full rounded-b-2xl overflow-hidden bg-kj-chip-bg",style:{height:r},children:[e.jsx("div",{className:"w-full h-full relative",children:e.jsx("div",{ref:s,className:"w-full h-full"})}),e.jsxs("div",{className:"absolute top-3 left-3 z-[500] flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-white text-xs font-bold shadow-lg",style:{background:L},children:[e.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-white opacity-80 inline-block"}),a.name]}),e.jsx("div",{className:"absolute top-3 right-[90px] z-[500]",children:q?e.jsx("div",{className:"bg-kj-primary/90 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm",children:"🛣 Road route"}):j?e.jsx("div",{className:"bg-amber-400/80 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm",children:"Straight line"}):null}),e.jsxs("div",{className:"absolute top-3 right-3 z-[500] bg-white/90 dark:bg-kj-chip-bg/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-semibold text-kj-text-dim shadow border border-kj-line",children:[J.length," stops"]}),e.jsxs("div",{className:"absolute bottom-10 left-3 z-[500] flex flex-col items-start gap-1.5",children:[z&&e.jsxs("div",{className:"bg-white/95 dark:bg-kj-chip-bg/95 backdrop-blur-sm rounded-xl border border-kj-line border-kj-line shadow-xl p-3 w-44 mb-1 animate-in slide-in-from-bottom-2 fade-in duration-150",children:[e.jsxs("div",{className:"flex justify-between items-center mb-2 pb-1.5 border-b border-kj-line border-kj-line",children:[e.jsx("span",{className:"text-[10px] font-bold text-kj-text-dim uppercase tracking-wider",children:"Layers"}),e.jsx("button",{onClick:()=>C(!1),className:"w-5 h-5 flex items-center justify-center hover:bg-kj-chip-bg rounded-full transition-colors","aria-label":"Close layers panel",children:e.jsx(rt,{className:"w-3 h-3 text-kj-text-faint"})})]}),e.jsx("div",{className:"space-y-1.5",children:[{key:"metro",label:"Metro Rail",active:I,set:w,color:"from-kj-primary to-kj-neon-violet",Icon:da},{key:"railway",label:"Railway",active:D,set:B,color:"from-green-500 to-emerald-600",Icon:da},{key:"airport",label:"Airport",active:H,set:U,color:"from-orange-500 to-red-500",Icon:Wi}].map(({key:y,label:g,active:T,set:V,color:O,Icon:S})=>e.jsxs("label",{className:"flex items-center gap-2 cursor-pointer hover:bg-kj-chip-bg hover:bg-kj-chip-bg p-1.5 rounded-lg transition-colors",children:[e.jsx("div",{className:`w-5 h-5 rounded-md flex items-center justify-center border-2 transition-all ${T?`bg-gradient-to-br ${O} border-transparent shadow-sm`:"border-kj-line dark:border-slate-500 bg-white dark:bg-slate-700"}`,children:T&&e.jsx(S,{className:"w-3 h-3 text-white"})}),e.jsx("input",{type:"checkbox",checked:T,onChange:K=>V(K.target.checked),className:"hidden"}),e.jsx("span",{className:"text-xs font-semibold text-kj-text-dim",children:g})]},y))})]}),e.jsxs("button",{onClick:()=>C(y=>!y),className:`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border transition-all ${z?"bg-kj-panel dark:bg-white text-white dark:text-kj-text border-slate-900 dark:border-white":"bg-white/90 dark:bg-kj-chip-bg/90 text-kj-text-dim border-kj-line border-kj-line backdrop-blur-sm hover:bg-white hover:bg-kj-chip-bg"}`,children:[e.jsx(Pi,{className:"w-3.5 h-3.5"}),"Layers"]}),e.jsxs("button",{onClick:()=>M(y=>!y),className:`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border transition-all ${W&&E?"bg-orange-500 border-orange-600 text-white":W&&!E?"bg-slate-400 border-slate-500 text-white":"bg-white/90 dark:bg-kj-chip-bg/90 text-orange-500 border-orange-200 dark:border-orange-900/40 backdrop-blur-sm hover:bg-orange-50 dark:hover:bg-orange-900/20"}`,children:["🚦",e.jsxs("span",{children:["Traffic",W&&!E?" (offline)":""]}),W&&E&&e.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-white animate-pulse"})]})]}),j&&e.jsxs("div",{className:"absolute bottom-[72px] right-3 z-[600] flex flex-col gap-1",children:[e.jsx("button",{onClick:()=>{var y;return(y=p.current)==null?void 0:y.zoomIn()},className:"w-7 h-7 bg-white/95 dark:bg-kj-chip-bg/95 border border-kj-line border-kj-line rounded-lg shadow-md flex items-center justify-center text-kj-text-dim hover:bg-kj-chip-bg hover:bg-kj-chip-bg text-base font-bold leading-none transition-colors","aria-label":"Zoom in",children:"+"}),e.jsx("button",{onClick:()=>{var y;return(y=p.current)==null?void 0:y.zoomOut()},className:"w-7 h-7 bg-white/95 dark:bg-kj-chip-bg/95 border border-kj-line border-kj-line rounded-lg shadow-md flex items-center justify-center text-kj-text-dim hover:bg-kj-chip-bg hover:bg-kj-chip-bg text-base font-bold leading-none transition-colors","aria-label":"Zoom out",children:"−"})]}),i&&e.jsx("button",{onClick:i,className:"absolute bottom-10 right-3 z-[500] flex items-center justify-center bg-kj-primary hover:bg-kj-primary-deep text-white w-9 h-9 rounded-full shadow-lg transition-colors","aria-label":"Open live navigation",children:e.jsx(Ei,{className:"w-4 h-4"})}),!j&&e.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-kj-chip-bg",children:e.jsxs("div",{className:"flex flex-col items-center gap-2 text-kj-text-faint",children:[e.jsx("div",{className:"w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"}),e.jsx("span",{className:"text-xs",children:"Loading map…"})]})})]})},Jo=[{id:"emergency_999",name:"National Emergency",bnName:"জাতীয় জরুরি সেবা",number:"999",description:"Police, Fire, Ambulance services",icon:"phone"},{id:"national_service_333",name:"National Service",bnName:"জাতীয় তথ্য ও সেবা",number:"333",description:"Govt. information, services & complaints",icon:"info"},{id:"fire_102",name:"Fire Service",bnName:"ফায়ার সার্ভিস",number:"102",description:"Fire service central control room",icon:"flame"},{id:"women_children_109",name:"Women & Children Helpline",bnName:"নারী ও শিশু নির্যাতন প্রতিরোধ",number:"109",description:"Help for women and children facing violence",icon:"users"},{id:"child_1098",name:"Child Helpline",bnName:"চাইল্ড হেল্পলাইন",number:"1098",description:"Child protection and social services",icon:"users"},{id:"disaster_1090",name:"Disaster Warning",bnName:"দুর্যোগের আগাম বার্তা",number:"1090",description:"Weather and disaster early warnings",icon:"cloud-rain"},{id:"anticorruption_106",name:"Anti-Corruption (ACC)",bnName:"দুদক অভিযোগ কেন্দ্র",number:"106",description:"Report corruption and irregularities",icon:"shield"},{id:"land_16122",name:"Land Service",bnName:"ভূমি সেবা",number:"16122",description:"Land related services and complaints",icon:"map-pin"},{id:"passport_16445",name:"Passport Service",bnName:"পাসপোর্ট সেবা",number:"16445",description:"Passport and visa information",icon:"file-text"},{id:"narcotics_01908888888",name:"Narcotics Control",bnName:"মাদকদ্রব্য নিয়ন্ত্রণ",number:"01908888888",description:"Report drug related activities",icon:"alert-triangle"},{id:"biwta_16113",name:"BIWTA (Water Transport)",bnName:"বিআইডব্লিউটিএ (নৌ-পরিবহন)",number:"16113",description:"Water transport services and info",icon:"anchor"},{id:"coastguard_16111",name:"Bangladesh Coast Guard",bnName:"বাংলাদেশ কোস্ট গার্ড",number:"16111",description:"Coastal emergency and security",icon:"life-buoy"},{id:"legal_aid_16699",name:"Govt. Legal Aid",bnName:"সরকারি আইনি সেবা",number:"16699",description:"Free legal aid services",icon:"scale"},{id:"pension_16131",name:"Universal Pension",bnName:"সর্বজনীন পেনশন",number:"16131",description:"Universal pension scheme info",icon:"coins"},{id:"power_16999",name:"Power Division",bnName:"বিদ্যুৎ বিভাগ",number:"16999",description:"Electricity complaints and services",icon:"zap"},{id:"btrc_100",name:"BTRC Complaints",bnName:"বিটিআরসি অভিযোগ",number:"100",description:"Telecommunication complaints",icon:"phone-off"},{id:"expatriate_16135",name:"Probashi Bondhu",bnName:"প্রবাস বন্ধু কল সেন্টার",number:"16135",description:"Services for expatriate workers",icon:"globe"},{id:"muktijoddha_16171",name:"Freedom Fighters",bnName:"মুক্তিযোদ্ধা কল্যাণ",number:"16171",description:"Services for Freedom Fighters",icon:"award"},{id:"employee_welfare_16109",name:"Govt. Employee Welfare",bnName:"কর্মচারী কল্যাণ বোর্ড",number:"16109",description:"Govt. employee welfare services",icon:"briefcase"},{id:"egp_16575",name:"e-GP Help Desk",bnName:"ই-জিপি হেল্পলাইন",number:"16575",description:"Electronic Government Procurement",icon:"server"},{id:"infocom_16357",name:"Information Commission",bnName:"তথ্য কমিশন",number:"16357",description:"Right to Information services",icon:"info"}],Yo=[{id:"dmch",name:"Dhaka Medical College Hospital",bnName:"ঢাকা মেডিকেল কলেজ হাসপাতাল",type:"hospital",phone:"01819221012",lat:23.726,lng:90.398,area:"Shahbag"},{id:"nicvd",name:"National Institute of CardioVascular Diseases",bnName:"জাতীয় হৃদরোগ ইনস্টিটিউট",type:"hospital",phone:"09666771111",lat:23.765,lng:90.39,area:"Sher-e-Bangla Nagar"},{id:"suhrawardy",name:"Shaheed Suhrawardy Medical College Hospital",bnName:"শহীদ সোহ্‌রাওয়ার্দী মেডিকেল কলেজ হাসপাতাল",type:"hospital",phone:"01713032701",lat:23.755,lng:90.395,area:"Sher-e-Bangla Nagar"},{id:"square_hospital",name:"Square Hospital",bnName:"স্কয়ার হাসপাতাল",type:"hospital",phone:"10616",lat:23.752,lng:90.378,area:"Dhanmondi"},{id:"united_hospital",name:"United Hospital",bnName:"ইউনাইটেড হাসপাতাল",type:"hospital",phone:"10666",lat:23.7925,lng:90.4078,area:"Gulshan"},{id:"labaid",name:"Labaid Specialized Hospital",bnName:"লাবএইড স্পেশালাইজড হাসপাতাল",type:"hospital",phone:"10606",lat:23.795,lng:90.405,area:"Banani"},{id:"apollo_hospital",name:"Apollo Hospitals Dhaka",bnName:"অ্যাপোলো হাসপাতাল ঢাকা",type:"hospital",phone:"10678",lat:23.81,lng:90.412,area:"Bashundhara"},{id:"birdem",name:"BIRDEM General Hospital",bnName:"বারডেম জেনারেল হাসপাতাল",type:"hospital",phone:"09666710678",lat:23.738,lng:90.395,area:"Shahbag"},{id:"icddrb",name:"ICDDR,B Hospital",bnName:"আইসিডিডিআরবি হাসপাতাল",type:"hospital",phone:"01711545464",lat:23.78,lng:90.402,area:"Mohakhali"},{id:"nitor",name:"NITOR (Traumatology)",bnName:"জাতীয় ট্রমাটোলজি ইনস্টিটিউট",type:"hospital",phone:"01730334066",lat:23.805,lng:90.365,area:"Mirpur"},{id:"popular_hospital",name:"Popular Medical College Hospital",bnName:"পপুলার মেডিকেল কলেজ হাসপাতাল",type:"hospital",phone:"09666710667",lat:23.785,lng:90.43,area:"Badda"},{id:"uttara_crescent",name:"Uttara Crescent Hospital",bnName:"উত্তরা ক্রিসেন্ট হাসপাতাল",type:"hospital",phone:"09666710678",lat:23.87,lng:90.39,area:"Uttara"},{id:"enam_medical",name:"Enam Medical College Hospital",bnName:"এনাম মেডিকেল কলেজ হাসপাতাল",type:"hospital",phone:"01711568686",lat:23.855,lng:90.265,area:"Savar"},{id:"holy_family",name:"Holy Family Red Crescent Hospital",bnName:"হলি ফ্যামিলি রেড ক্রিসেন্ট হাসপাতাল",type:"hospital",phone:"01819229797",lat:23.738,lng:90.385,area:"Eskaton"},{id:"ibn_sina",name:"Ibn Sina Hospital Dhanmondi",bnName:"ইবনে সিনা হাসপাতাল ধানমন্ডি",type:"hospital",phone:"10615",lat:23.75,lng:90.38,area:"Dhanmondi"},{id:"ibn_sina_kallyanpur",name:"Ibn Sina Hospital Kallyanpur",bnName:"ইবনে সিনা হাসপাতাল কল্যাণপুর",type:"hospital",phone:"09610010615",lat:23.77,lng:90.36,area:"Kallyanpur"},{id:"anwar_khan",name:"Anwar Khan Modern Hospital",bnName:"আনোয়ার খান মডার্ন হাসপাতাল",type:"hospital",phone:"10090",lat:23.742,lng:90.375,area:"Dhanmondi"},{id:"cmh",name:"Combined Military Hospital (CMH)",bnName:"সম্মিলিত সামরিক হাসপাতাল",type:"hospital",phone:"01769000100",lat:23.81,lng:90.415,area:"Cantonment"},{id:"kurmitola_hospital",name:"Kurmitola General Hospital",bnName:"কুর্মিটোলা জেনারেল হাসপাতাল",type:"hospital",phone:"01769011223",lat:23.825,lng:90.405,area:"Cantonment"},{id:"bangabandhu_hospital",name:"Bangabandhu Sheikh Mujib Medical University",bnName:"বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয়",type:"hospital",phone:"01819211164",lat:23.738,lng:90.395,area:"Shahbag"},{id:"ibrahim_cardiac",name:"Ibrahim Cardiac Hospital & Research Institute",bnName:"ইব্রাহিম কার্ডিয়াক হাসপাতাল",type:"hospital",phone:"029671147",lat:23.738,lng:90.398,area:"Shahbag"},{id:"bangladesh_specialized",name:"Bangladesh Specialized Hospital",bnName:"বাংলাদেশ স্পেশালাইজড হাসপাতাল",type:"hospital",phone:"09666700100",lat:23.765,lng:90.368,area:"Mirpur"},{id:"al_helal",name:"Al Helal Specialized Hospital",bnName:"আল হেলাল স্পেশালাইজড হাসপাতাল",type:"hospital",phone:"029006820",lat:23.807,lng:90.3687,area:"Mirpur-10"},{id:"delta_hospital",name:"Delta Hospital Ltd.",bnName:"ডেল্টা হাসপাতাল",type:"hospital",phone:"029022410",lat:23.73,lng:90.395,area:"Dhaka"},{id:"city_hospital",name:"City Hospital & Diagnostic Center",bnName:"সিটি হাসপাতাল এন্ড ডায়াগনস্টিক",type:"hospital",phone:"028143312",lat:23.765,lng:90.36,area:"Mohammadpur"},{id:"evercare_hospital",name:"Evercare Hospital Dhaka",bnName:"এভারকেয়ার হাসপাতাল ঢাকা",type:"hospital",phone:"0255037242",lat:23.81,lng:90.412,area:"Bashundhara"},{id:"al_markazul",name:"Al-Markazul Islami Hospital",bnName:"আল-মারকাজুল ইসলামী হাসপাতাল",type:"hospital",phone:"01995559999",lat:23.762,lng:90.36,area:"Mohammadpur"},{id:"samorita",name:"Samorita Hospital",bnName:"সমরিতা হাসপাতাল",type:"hospital",phone:"029131901",lat:23.752,lng:90.388,area:"Panthapath"},{id:"central_hospital",name:"Central Hospital Ltd.",bnName:"সেন্ট্রাল হাসপাতাল",type:"hospital",phone:"029660015",lat:23.745,lng:90.38,area:"Dhanmondi"},{id:"ispahani_eye",name:"Ispahani Islamia Eye Institute and Hospital",bnName:"ইস্পাহানী ইসলামিয়া চক্ষু ইনস্টিটিউট",type:"hospital",phone:"09610998333",lat:23.755,lng:90.385,area:"Farmgate"},{id:"addin_women",name:"Ad-Din Women's Medical College Hospital",bnName:"আদ-দ্বীন উইমেন্স মেডিকেল কলেজ",type:"hospital",phone:"029353391",lat:23.75,lng:90.415,area:"Maghbazar"},{id:"japan_bangladesh",name:"Japan Bangladesh Friendship Hospital",bnName:"জাপান বাংলাদেশ ফ্রেন্ডশিপ হাসপাতাল",type:"hospital",phone:"029672277",lat:23.745,lng:90.372,area:"Zigatola"},{id:"universal_medical",name:"Universal Medical College Hospital Ltd.",bnName:"ইউনিভার্সাল মেডিকেল কলেজ হাসপাতাল",type:"hospital",phone:"09606111222",lat:23.78,lng:90.395,area:"Mohakhali"},{id:"national_heart",name:"National Heart Foundation Hospital & Research Institute",bnName:"জাতীয় হূদরোগ ফাউন্ডেশন হাসপাতাল",type:"hospital",phone:"029033442",lat:23.738,lng:90.398,area:"Mirpur"},{id:"neuroscience",name:"National Institute of Neuroscience",bnName:"জাতীয় স্নায়ুবিজ্ঞান ইনস্টিটিউট",type:"hospital",phone:"029112709",lat:23.775,lng:90.365,area:"Agargaon"},{id:"mirpur_ps",name:"Mirpur Model Police Station",bnName:"মিরপুর মডেল থানা",type:"police",phone:"01320014814",lat:23.8103,lng:90.3687,area:"Mirpur"},{id:"pallabi_ps",name:"Pallabi Police Station",bnName:"পল্লবী থানা",type:"police",phone:"01320014815",lat:23.825,lng:90.36,area:"Mirpur"},{id:"gulshan_ps",name:"Gulshan Police Station",bnName:"গুলশান থানা",type:"police",phone:"01320014802",lat:23.7808,lng:90.417,area:"Gulshan"},{id:"banani_ps",name:"Banani Police Station",bnName:"বনানী থানা",type:"police",phone:"01320014803",lat:23.793,lng:90.404,area:"Banani"},{id:"mohammadpur_ps",name:"Mohammadpur Police Station",bnName:"মোহাম্মদপুর থানা",type:"police",phone:"01320014811",lat:23.762,lng:90.36,area:"Mohammadpur"},{id:"dhanmondi_ps",name:"Dhanmondi Police Station",bnName:"ধানমন্ডি থানা",type:"police",phone:"01320014810",lat:23.745,lng:90.375,area:"Dhanmondi"},{id:"shahbag_ps",name:"Shahbag Police Station",bnName:"শাহবাগ থানা",type:"police",phone:"01320014809",lat:23.74,lng:90.395,area:"Shahbag"},{id:"tejgaon_ps",name:"Tejgaon Police Station",bnName:"তেজগাঁও থানা",type:"police",phone:"01320014806",lat:23.755,lng:90.39,area:"Tejgaon"},{id:"mohakhali_ps",name:"Mohakhali Police Station",bnName:"মহাখালী থানা",type:"police",phone:"01320014805",lat:23.7808,lng:90.3978,area:"Mohakhali"},{id:"motijheel_ps",name:"Motijheel Police Station",bnName:"মতিঝিল থানা",type:"police",phone:"01320014829",lat:23.733,lng:90.417,area:"Motijheel"},{id:"ramna_ps",name:"Ramna Police Station",bnName:"রমনা থানা",type:"police",phone:"01320014808",lat:23.735,lng:90.405,area:"Ramna"},{id:"paltan_ps",name:"Paltan Police Station",bnName:"পল্টন থানা",type:"police",phone:"01320014828",lat:23.73,lng:90.412,area:"Paltan"},{id:"uttara_ps",name:"Uttara Police Station",bnName:"উত্তরা থানা",type:"police",phone:"01320014816",lat:23.875,lng:90.395,area:"Uttara"},{id:"uttara_west_ps",name:"Uttara West Police Station",bnName:"উত্তরা পশ্চিম থানা",type:"police",phone:"01320014817",lat:23.865,lng:90.385,area:"Uttara"},{id:"badda_ps",name:"Badda Police Station",bnName:"বাড্ডা থানা",type:"police",phone:"01320014804",lat:23.78,lng:90.425,area:"Badda"},{id:"cantonment_ps",name:"Cantonment Police Station",bnName:"ক্যান্টনমেন্ট থানা",type:"police",phone:"01320014801",lat:23.81,lng:90.42,area:"Cantonment"},{id:"savar_ps",name:"Savar Police Station",bnName:"সাভার থানা",type:"police",phone:"01320015901",lat:23.8583,lng:90.2667,area:"Savar"},{id:"ashulia_ps",name:"Ashulia Police Station",bnName:"আশুলিয়া থানা",type:"police",phone:"01320015902",lat:23.89,lng:90.32,area:"Ashulia"},{id:"fire_hq",name:"Fire Service Headquarters",bnName:"ফায়ার সার্ভিস সদর দপ্তর",type:"fire",phone:"01713398888",lat:23.735,lng:90.41,area:"Dhaka"},{id:"mirpur_fire",name:"Mirpur Fire Station",bnName:"মিরপুর ফায়ার স্টেশন",type:"fire",phone:"01713398801",lat:23.81,lng:90.37,area:"Mirpur"},{id:"mohammadpur_fire",name:"Mohammadpur Fire Station",bnName:"মোহাম্মদপুর ফায়ার স্টেশন",type:"fire",phone:"01713398802",lat:23.762,lng:90.36,area:"Mohammadpur"},{id:"tejgaon_fire",name:"Tejgaon Fire Station",bnName:"তেজগাঁও ফায়ার স্টেশন",type:"fire",phone:"01713398803",lat:23.755,lng:90.39,area:"Tejgaon"},{id:"uttara_fire",name:"Uttara Fire Station",bnName:"উত্তরা ফায়ার স্টেশন",type:"fire",phone:"01713398804",lat:23.876,lng:90.396,area:"Uttara"},{id:"demra_fire",name:"Demra Fire Station",bnName:"ডেমরা ফায়ার স্টেশন",type:"fire",phone:"01713398805",lat:23.71,lng:90.51,area:"Demra"},{id:"savar_fire",name:"Savar Fire Station",bnName:"সাভার ফায়ার স্টেশন",type:"fire",phone:"01713398806",lat:23.859,lng:90.267,area:"Savar"},{id:"kallyanpur_fire",name:"Kallyanpur Fire Station",bnName:"কল্যাণপুর ফায়ার স্টেশন",type:"fire",phone:"01713398807",lat:23.765,lng:90.355,area:"Kallyanpur"},{id:"army_hq",name:"Bangladesh Army Headquarters",bnName:"বাংলাদেশ সেনাবাহিনী সদর দপ্তর",type:"other",phone:"01769000100",lat:23.812,lng:90.418,area:"Cantonment"},{id:"airforce_hq",name:"Bangladesh Air Force Headquarters",bnName:"বাংলাদেশ বিমান বাহিনী সদর দপ্তর",type:"other",phone:"01769100100",lat:23.805,lng:90.41,area:"Cantonment"},{id:"navy_hq",name:"Bangladesh Navy Headquarters",bnName:"বাংলাদেশ নৌবাহিনী সদর দপ্তর",type:"other",phone:"01769200100",lat:23.72,lng:90.39,area:"Banani"},{id:"bgb_hq",name:"Border Guard Bangladesh (BGB)",bnName:"বর্ডার গার্ড বাংলাদেশ",type:"other",phone:"01769300100",lat:23.76,lng:90.35,area:"Pilkhana"},{id:"ctg_medical",name:"Chittagong Medical College Hospital",bnName:"চট্টগ্রাম মেডিকেল কলেজ হাসপাতাল",type:"hospital",phone:"01819332288",lat:22.3569,lng:91.8325,area:"Chittagong"},{id:"ctg_police",name:"Chittagong Metropolitan Police",bnName:"চট্টগ্রাম মেট্রোপলিটন পুলিশ",type:"police",phone:"01320024801",lat:22.3569,lng:91.7832,area:"Chittagong"},{id:"ctg_fire",name:"Chittagong Fire Station",bnName:"চট্টগ্রাম ফায়ার স্টেশন",type:"fire",phone:"01713398901",lat:22.3384,lng:91.8317,area:"Chittagong"},{id:"ctg_general",name:"Chittagong General Hospital",bnName:"চট্টগ্রাম জেনারেল হাসপাতাল",type:"hospital",phone:"01819332277",lat:22.3475,lng:91.8123,area:"Chittagong"},{id:"sylhet_osmani",name:"Sylhet MAG Osmani Medical College",bnName:"সিলেট এমএজি ওসমানী মেডিকেল কলেজ",type:"hospital",phone:"01819443388",lat:24.8949,lng:91.8687,area:"Sylhet"},{id:"sylhet_police",name:"Sylhet Metropolitan Police",bnName:"সিলেট মেট্রোপলিটন পুলিশ",type:"police",phone:"01320034801",lat:24.8949,lng:91.8687,area:"Sylhet"},{id:"sylhet_fire",name:"Sylhet Fire Station",bnName:"সিলেট ফায়ার স্টেশন",type:"fire",phone:"01713398902",lat:24.8897,lng:91.8697,area:"Sylhet"},{id:"rajshahi_medical",name:"Rajshahi Medical College Hospital",bnName:"রাজশাহী মেডিকেল কলেজ হাসপাতাল",type:"hospital",phone:"01819554488",lat:24.3745,lng:88.6042,area:"Rajshahi"},{id:"rajshahi_police",name:"Rajshahi Metropolitan Police",bnName:"রাজশাহী মেট্রোপলিটন পুলিশ",type:"police",phone:"01320044801",lat:24.3745,lng:88.6042,area:"Rajshahi"},{id:"rajshahi_fire",name:"Rajshahi Fire Station",bnName:"রাজশাহী ফায়ার স্টেশন",type:"fire",phone:"01713398903",lat:24.3636,lng:88.6241,area:"Rajshahi"},{id:"khulna_medical",name:"Khulna Medical College Hospital",bnName:"খুলনা মেডিকেল কলেজ হাসপাতাল",type:"hospital",phone:"01819665588",lat:22.8456,lng:89.5403,area:"Khulna"},{id:"khulna_police",name:"Khulna Metropolitan Police",bnName:"খুলনা মেট্রোপলিটন পুলিশ",type:"police",phone:"01320054801",lat:22.8456,lng:89.5403,area:"Khulna"},{id:"khulna_fire",name:"Khulna Fire Station",bnName:"খুলনা ফায়ার স্টেশন",type:"fire",phone:"01713398904",lat:22.8092,lng:89.568,area:"Khulna"},{id:"barisal_medical",name:"Sher-e-Bangla Medical College",bnName:"শেরে বাংলা মেডিকেল কলেজ",type:"hospital",phone:"01819776688",lat:22.701,lng:90.3535,area:"Barisal"},{id:"barisal_police",name:"Barisal Metropolitan Police",bnName:"বরিশাল মেট্রোপলিটন পুলিশ",type:"police",phone:"01320064801",lat:22.701,lng:90.3535,area:"Barisal"},{id:"barisal_fire",name:"Barisal Fire Station",bnName:"বরিশাল ফায়ার স্টেশন",type:"fire",phone:"01713398905",lat:22.7022,lng:90.3696,area:"Barisal"},{id:"rangpur_medical",name:"Rangpur Medical College Hospital",bnName:"রংপুর মেডিকেল কলেজ হাসপাতাল",type:"hospital",phone:"01819887788",lat:25.7439,lng:89.2752,area:"Rangpur"},{id:"rangpur_police",name:"Rangpur Metropolitan Police",bnName:"রংপুর মেট্রোপলিটন পুলিশ",type:"police",phone:"01320074801",lat:25.7439,lng:89.2752,area:"Rangpur"},{id:"rangpur_fire",name:"Rangpur Fire Station",bnName:"রংপুর ফায়ার স্টেশন",type:"fire",phone:"01713398906",lat:25.7558,lng:89.2444,area:"Rangpur"},{id:"mymensingh_medical",name:"Mymensingh Medical College Hospital",bnName:"ময়মনসিংহ মেডিকেল কলেজ হাসপাতাল",type:"hospital",phone:"01819998888",lat:24.7471,lng:90.4203,area:"Mymensingh"},{id:"mymensingh_police",name:"Mymensingh Metropolitan Police",bnName:"ময়মনসিংহ মেট্রোপলিটন পুলিশ",type:"police",phone:"01320084801",lat:24.7471,lng:90.4203,area:"Mymensingh"},{id:"mymensingh_fire",name:"Mymensingh Fire Station",bnName:"ময়মনসিংহ ফায়ার স্টেশন",type:"fire",phone:"01713398907",lat:24.7636,lng:90.4203,area:"Mymensingh"},{id:"cumilla_medical",name:"Cumilla Medical College Hospital",bnName:"কুমিল্লা মেডিকেল কলেজ হাসপাতাল",type:"hospital",phone:"01819111188",lat:23.4607,lng:91.1809,area:"Cumilla"},{id:"cumilla_police",name:"Cumilla Police Station",bnName:"কুমিল্লা থানা",type:"police",phone:"01320094801",lat:23.4607,lng:91.1809,area:"Cumilla"},{id:"cumilla_fire",name:"Cumilla Fire Station",bnName:"কুমিল্লা ফায়ার স্টেশন",type:"fire",phone:"01713398908",lat:23.4682,lng:91.1788,area:"Cumilla"},{id:"narayanganj_hospital",name:"Narayanganj General Hospital",bnName:"নারায়ণগঞ্জ জেনারেল হাসপাতাল",type:"hospital",phone:"01819222288",lat:23.6238,lng:90.5,area:"Narayanganj"},{id:"narayanganj_police",name:"Narayanganj Police Station",bnName:"নারায়ণগঞ্জ থানা",type:"police",phone:"01320104801",lat:23.6238,lng:90.5,area:"Narayanganj"},{id:"narayanganj_fire",name:"Narayanganj Fire Station",bnName:"নারায়ণগঞ্জ ফায়ার স্টেশন",type:"fire",phone:"01713398909",lat:23.615,lng:90.505,area:"Narayanganj"},{id:"gazipur_hospital",name:"Shaheed Tajuddin Ahmad Medical College",bnName:"শহীদ তাজউদ্দীন আহমদ মেডিকেল কলেজ",type:"hospital",phone:"01819333388",lat:23.9999,lng:90.4203,area:"Gazipur"},{id:"gazipur_police",name:"Gazipur Police Station",bnName:"গাজীপুর থানা",type:"police",phone:"01320114801",lat:23.9999,lng:90.4203,area:"Gazipur"},{id:"gazipur_fire",name:"Gazipur Fire Station",bnName:"গাজীপুর ফায়ার স্টেশন",type:"fire",phone:"01713398910",lat:24.0022,lng:90.4264,area:"Gazipur"},{id:"gazipur_sadar_hospital",name:"Gazipur Sadar Hospital",bnName:"গাজীপুর সদর হাসপাতাল",type:"hospital",phone:"029261281",lat:23.995,lng:90.4164,area:"Gazipur Sadar"},{id:"international_medical_tongi",name:"International Medical College Hospital, Tongi",bnName:"ইন্টারন্যাশনাল মেডিকেল কলেজ হাসপাতাল, টঙ্গী",type:"hospital",phone:"029814550",lat:23.89,lng:90.405,area:"Tongi"},{id:"general_hospital_tongi",name:"General Hospital, Tongi",bnName:"জেনারেল হাসপাতাল, টঙ্গী",type:"hospital",phone:"01730324821",lat:23.892,lng:90.407,area:"Tongi"},{id:"popular_gazipur",name:"Popular Diagnostic Centre, Gazipur",bnName:"পপুলার ডায়াগনস্টিক সেন্টার, গাজীপুর",type:"hospital",phone:"09666787816",lat:23.996,lng:90.415,area:"Gazipur"},{id:"gmp_sadar",name:"Gazipur Sadar Police Station",bnName:"গাজীপুর সদর थाना",type:"police",phone:"01320070524",lat:23.998,lng:90.42,area:"Gazipur Sadar"},{id:"gmp_bason",name:"Bason Police Station",bnName:"বাসন থানা",type:"police",phone:"01320072998",lat:23.985,lng:90.41,area:"Gazipur"},{id:"gmp_konabari",name:"Konabari Police Station",bnName:"কোনাবাড়ী থানা",type:"police",phone:"01320072998",lat:24.01,lng:90.43,area:"Gazipur"},{id:"gmp_kashimpur",name:"Kashimpur Police Station",bnName:"কাশিমপুর থানা",type:"police",phone:"01320072998",lat:24.005,lng:90.425,area:"Gazipur"},{id:"gmp_gacha",name:"Gacha Police Station",bnName:"গাছা থানা",type:"police",phone:"01320072998",lat:24.015,lng:90.435,area:"Gazipur"},{id:"gmp_pubail",name:"Pubail Police Station",bnName:"পূবাইল থানা",type:"police",phone:"01320072998",lat:23.97,lng:90.44,area:"Gazipur"},{id:"gmp_tongi_east",name:"Tongi East Police Station",bnName:"টঙ্গী পূর্ব থানা",type:"police",phone:"01320072998",lat:23.895,lng:90.41,area:"Tongi"},{id:"gmp_tongi_west",name:"Tongi West Police Station",bnName:"টঙ্গী পশ্চিম থানা",type:"police",phone:"01320072998",lat:23.89,lng:90.4,area:"Tongi"},{id:"jaydebpur_fire",name:"Jaydebpur Fire Station",bnName:"জয়দেবপুর ফায়ার স্টেশন",type:"fire",phone:"01901020868",lat:23.995,lng:90.42,area:"Gazipur"},{id:"gazipur_chowrasta_fire",name:"Gazipur Chowrasta Modern Fire Station",bnName:"গাজীপুর চৌরাস্তা ফায়ার স্টেশন",type:"fire",phone:"01901020874",lat:23.998,lng:90.418,area:"Gazipur"},{id:"rajendrapur_fire",name:"Rajendrapur Modern Fire Station",bnName:"রাজেন্দ্রপুর ফায়ার স্টেশন",type:"fire",phone:"01901020876",lat:24.01,lng:90.43,area:"Gazipur"},{id:"konabari_fire",name:"Konabari Modern Fire Station",bnName:"কোনাবাড়ী ফায়ার স্টেশন",type:"fire",phone:"01901020878",lat:24.01,lng:90.435,area:"Gazipur"},{id:"sarabo_fire",name:"Sarabo Modern Fire Station",bnName:"সারাবো ফায়ার স্টেশন",type:"fire",phone:"01901020872",lat:23.98,lng:90.41,area:"Gazipur"},{id:"sreepur_fire",name:"Sreepur Fire Station",bnName:"শ্রীপুর ফায়ার স্টেশন",type:"fire",phone:"01901020900",lat:24.305,lng:90.455,area:"Gazipur"},{id:"kapasia_fire",name:"Kapasia Fire Station",bnName:"কাপাসিয়া ফায়ার স্টেশন",type:"fire",phone:"01901020898",lat:24.48,lng:90.65,area:"Gazipur"},{id:"kaliganj_fire",name:"Kaliganj Fire Station",bnName:"কালিগঞ্জ ফায়ার স্টেশন",type:"fire",phone:"01901020896",lat:24.07,lng:90.08,area:"Gazipur"},{id:"tongi_fire",name:"Tongi Fire Station",bnName:"টঙ্গী ফায়ার স্টেশন",type:"fire",phone:"01901020866",lat:23.89,lng:90.405,area:"Tongi"},{id:"kaliakair_fire",name:"Kaliakair Fire Station",bnName:"কালিয়াকৈর ফায়ার স্টেশন",type:"fire",phone:"01901020892",lat:24.05,lng:90.215,area:"Gazipur"},{id:"savar_prime",name:"Savar Prime Hospital",bnName:"সাভার প্রাইম হাসপাতাল",type:"hospital",phone:"09611530530",lat:23.858,lng:90.267,area:"Savar"},{id:"savar_care",name:"Savar Care Hospital",bnName:"সাভার কেয়ার হাসপাতাল",type:"hospital",phone:"01993000800",lat:23.855,lng:90.265,area:"Savar"},{id:"manikganj_250bed",name:"250 Bed District Hospital, Manikganj",bnName:"মানিকগঞ্জ ২৫০ শয্যা জেলা হাসপাতাল",type:"hospital",phone:"02996610227",lat:23.8644,lng:90.0047,area:"Manikganj"},{id:"manikganj_sadar_ps",name:"Manikganj Sadar Police Station",bnName:"মানিকগঞ্জ সদর থানা",type:"police",phone:"01320094375",lat:23.8644,lng:90.0047,area:"Manikganj"},{id:"saturia_ps",name:"Saturia Police Station",bnName:"সাটুরিয়া থানা",type:"police",phone:"01320094401",lat:23.78,lng:89.79,area:"Manikganj"},{id:"singair_ps",name:"Singair Police Station",bnName:"সিঙ্গাইর থানা",type:"police",phone:"01320094400",lat:23.98,lng:90.12,area:"Manikganj"},{id:"ghior_ps",name:"Ghior Police Station",bnName:"ঘিওর থানা",type:"police",phone:"01320094400",lat:23.92,lng:89.95,area:"Manikganj"},{id:"munshiganj_general",name:"Munshiganj General Hospital",bnName:"মুন্সীগঞ্জ জেনারেল হাসপাতাল",type:"hospital",phone:"01730324783",lat:23.5422,lng:90.5305,area:"Munshiganj"},{id:"keraniganj_health",name:"Keraniganj Upazila Health Complex",bnName:"কেরানীগঞ্জ উপজেলা স্বাস্থ্য কমপ্লেক্স",type:"hospital",phone:"01730324402",lat:23.71,lng:90.37,area:"Keraniganj"},{id:"munshiganj_sadar_ps",name:"Munshiganj Sadar Police Station",bnName:"মুন্সীগঞ্জ সদর থানা",type:"police",phone:"01320093300",lat:23.5422,lng:90.5305,area:"Munshiganj"},{id:"gazaria_ps",name:"Gazaria Police Station",bnName:"গজারিয়া থানা",type:"police",phone:"01320093300",lat:23.68,lng:90.48,area:"Munshiganj"},{id:"louhojong_ps",name:"Louhojong Police Station",bnName:"লৌহজং থানা",type:"police",phone:"01320093300",lat:23.52,lng:90.42,area:"Munshiganj"},{id:"sirajdikhan_ps",name:"Sirajdikhan Police Station",bnName:"সিরাজদিখান থানা",type:"police",phone:"01320093300",lat:23.45,lng:90.48,area:"Munshiganj"},{id:"sreenagar_ps",name:"Sreenagar Police Station",bnName:"শ্রীনগর থানা",type:"police",phone:"01320093300",lat:23.4,lng:90.58,area:"Munshiganj"},{id:"tongibari_ps",name:"Tongibari Police Station",bnName:"টংগীবাড়ি থানা",type:"police",phone:"01320093300",lat:23.47,lng:90.42,area:"Munshiganj"},{id:"munshiganj_fire",name:"Munshiganj Fire Station",bnName:"মুন্সীগঞ্জ ফায়ার স্টেশন",type:"fire",phone:"01901020984",lat:23.5422,lng:90.5305,area:"Munshiganj"},{id:"gazaria_fire",name:"Gazaria Fire Station",bnName:"গজারিয়া ফায়ার স্টেশন",type:"fire",phone:"01901020928",lat:23.68,lng:90.48,area:"Munshiganj"},{id:"narsingdi_100bed",name:"Narsingdi 100 Bed Zilla Hospital",bnName:"নরসিংদী ১০০ শয্যা জেলা হাসপাতাল",type:"hospital",phone:"01730324787",lat:23.9232,lng:90.715,area:"Narsingdi"},{id:"narsingdi_sadar_hospital",name:"Narsingdi Sadar Hospital",bnName:"নরসিংদী সদর হাসপাতাল",type:"hospital",phone:"062862006",lat:23.9232,lng:90.715,area:"Narsingdi"},{id:"narsingdi_model_ps",name:"Narsingdi Model Police Station",bnName:"নরসিংদী মডেল থানা",type:"police",phone:"01713373412",lat:23.9232,lng:90.715,area:"Narsingdi"},{id:"narsingdi_fire",name:"Narsingdi Fire Station",bnName:"নরসিংদী ফায়ার স্টেশন",type:"fire",phone:"01901020902",lat:23.9232,lng:90.715,area:"Narsingdi"},{id:"palash_fire",name:"Palash Fire Station",bnName:"পলাশ ফায়ার স্টেশন",type:"fire",phone:"01901020914",lat:23.97,lng:90.65,area:"Narsingdi"},{id:"madhobdi_fire",name:"Madhobdi Fire Station",bnName:"মধবদী ফায়ার স্টেশন",type:"fire",phone:"01901020904",lat:24.05,lng:90.78,area:"Narsingdi"},{id:"monoharodi_fire",name:"Monoharodi Fire Station",bnName:"মনোহরদী ফায়ার স্টেশন",type:"fire",phone:"01901020912",lat:24.03,lng:90.8,area:"Narsingdi"},{id:"belabo_fire",name:"Belabo Fire Station",bnName:"বেলাবো ফায়ার স্টেশন",type:"fire",phone:"01901020910",lat:24.08,lng:90.65,area:"Narsingdi"},{id:"shibpur_fire",name:"Shibpur Fire Station",bnName:"শিবপুর ফায়ার স্টেশন",type:"fire",phone:"01901020920",lat:24.02,lng:90.73,area:"Narsingdi"},{id:"raipura_fire",name:"Raipura Fire Station",bnName:"রায়পুরা ফায়ার স্টেশন",type:"fire",phone:"01901020918",lat:23.98,lng:90.77,area:"Narsingdi"},{id:"narayanganj_victoria",name:"General Hospital (Victoria), Narayanganj",bnName:"জেনারেল হাসপাতাল (ভিক্টরিয়া), নারায়ণগঞ্জ",type:"hospital",phone:"01730324784",lat:23.615,lng:90.505,area:"Narayanganj"},{id:"popular_narayanganj",name:"Popular Diagnostic Centre, Narayanganj",bnName:"পপুলার ডায়াগনস্টিক সেন্টার, নারায়ণগঞ্জ",type:"hospital",phone:"09666787804",lat:23.62,lng:90.508,area:"Narayanganj"},{id:"siddhirganj_ps",name:"Siddhirganj Police Station",bnName:"সিদ্ধিরগঞ্জ থানা",type:"police",phone:"01320090429",lat:23.68,lng:90.51,area:"Narayanganj"},{id:"rupganj_ps",name:"Rupganj Police Station",bnName:"রূপগঞ্জ থানা",type:"police",phone:"01320090481",lat:23.7,lng:90.53,area:"Narayanganj"},{id:"baridhara_fire",name:"Baridhara Fire Service Station",bnName:"বারিধারা ফায়ার স্টেশন",type:"fire",phone:"01730002245",lat:23.81,lng:90.42,area:"Baridhara"},{id:"bhashantek_fire",name:"Bhashantek Fire Service Station",bnName:"ভাসানটেক ফায়ার স্টেশন",type:"fire",phone:"01901020772",lat:23.82,lng:90.368,area:"Mirpur"},{id:"dhaka_epz_fire",name:"Dhaka EPZ Fire Service Station",bnName:"ঢাকা ইপিজেড ফায়ার স্টেশন",type:"fire",phone:"01730002231",lat:23.855,lng:90.267,area:"Savar"},{id:"dhamrai_fire",name:"Dhamrai Fire Service Station",bnName:"ধামরাই ফায়ার স্টেশন",type:"fire",phone:"01742302850",lat:23.905,lng:90.122,area:"Dhamrai"},{id:"dohar_fire",name:"Dohar Fire Service Station",bnName:"দোহার ফায়ার স্টেশন",type:"fire",phone:"01726845949",lat:23.592,lng:90.135,area:"Dohar"},{id:"hajaribagh_fire",name:"Hajaribagh Fire Service Station",bnName:"হাজারীবাগ ফায়ার স্টেশন",type:"fire",phone:"01721733114",lat:23.725,lng:90.368,area:"Hazaribagh"},{id:"khilgaon_fire",name:"Khilgaon Fire Service Station",bnName:"খিলগাঁও ফায়ার স্টেশন",type:"fire",phone:"01730002225",lat:23.735,lng:90.428,area:"Khilgaon"},{id:"kurmitola_fire",name:"Kurmitola Fire Service Station",bnName:"কুর্মিটোলা ফায়ার স্টেশন",type:"fire",phone:"01730002232",lat:23.825,lng:90.405,area:"Cantonment"},{id:"lalbagh_fire",name:"Lalbagh Fire Service Station",bnName:"লালবাগ ফায়ার স্টেশন",type:"fire",phone:"01730002218",lat:23.718,lng:90.385,area:"Lalbagh"},{id:"palashi_fire",name:"Palashi Barrack Fire Service Station",bnName:"পলাশী ব্যারাক ফায়ার স্টেশন",type:"fire",phone:"01730002219",lat:23.738,lng:90.398,area:"Shahbag"},{id:"postogola_fire",name:"Postogola Fire Service Station",bnName:"পোস্তগোলা ফায়ার স্টেশন",type:"fire",phone:"01713002216",lat:23.695,lng:90.43,area:"Postogola"},{id:"sadarghat_fire",name:"Sadarghat Fire Service Station",bnName:"সদরঘাট ফায়ার স্টেশন",type:"fire",phone:"01730002214",lat:23.705,lng:90.412,area:"Sadarghat"},{id:"sadarghat_river_fire",name:"Sadarghat River Fire Service Station",bnName:"সদরঘাট নদী ফায়ার স্টেশন",type:"fire",phone:"01711577451",lat:23.705,lng:90.412,area:"Sadarghat"},{id:"siddik_bazar_fire",name:"Siddik Bazar Fire Service Station",bnName:"সিদ্দিক বাজার ফায়ার স্টেশন",type:"fire",phone:"01730002210",lat:23.708,lng:90.41,area:"Dhaka"},{id:"sutrapur_fire",name:"Sutrapur Fire Service Station",bnName:"সূত্রাপুর ফায়ার স্টেশন",type:"fire",phone:"01794117037",lat:23.705,lng:90.415,area:"Sutrapur"},{id:"tangail_medical_college",name:"Sheikh Hasina Medical College Hospital, Tangail",bnName:"শেখ হাসিনা মেডিকেল কলেজ হাসপাতাল, টাঙ্গাইল",type:"hospital",phone:"092161100",lat:24.25,lng:89.9167,area:"Tangail"},{id:"tangail_sadar_hospital",name:"Tangail 250 Bed General Hospital",bnName:"টাঙ্গাইল ২৫০ শয্যা জেনারেল হাসপাতাল",type:"hospital",phone:"092164003",lat:24.251,lng:89.917,area:"Tangail"},{id:"tangail_sadar_ps",name:"Tangail Sadar Police Station",bnName:"টাঙ্গাইল সদর থানা",type:"police",phone:"01320095801",lat:24.249,lng:89.92,area:"Tangail"},{id:"kalihati_ps",name:"Kalihati Police Station",bnName:"কালিহাতী থানা",type:"police",phone:"01320096125",lat:24.38,lng:90.01,area:"Tangail"},{id:"ghatail_ps",name:"Ghatail Police Station",bnName:"ঘাটাইল থানা",type:"police",phone:"01320096180",lat:24.5,lng:89.98,area:"Tangail"},{id:"madhupur_ps",name:"Madhupur Police Station",bnName:"মধুপুর থানা",type:"police",phone:"01320096235",lat:24.61,lng:90.03,area:"Tangail"},{id:"mirzapur_ps",name:"Mirzapur Police Station",bnName:"মির্জাপুর থানা",type:"police",phone:"01320096290",lat:24.1,lng:90.09,area:"Tangail"},{id:"tangail_fire",name:"Tangail Fire Station",bnName:"টাঙ্গাইল ফায়ার স্টেশন",type:"fire",phone:"01713398912",lat:24.252,lng:89.915,area:"Tangail"},{id:"mirzapur_fire",name:"Mirzapur Fire Station",bnName:"মির্জাপুর ফায়ার স্টেশন",type:"fire",phone:"01901020950",lat:24.105,lng:90.095,area:"Tangail"},{id:"madhupur_fire",name:"Madhupur Fire Station",bnName:"মধুপুর ফায়ার স্টেশন",type:"fire",phone:"01901020954",lat:24.615,lng:90.035,area:"Tangail"},{id:"kishoreganj_medical_college",name:"Shaheed Syed Nazrul Islam Medical College",bnName:"শহীদ সৈয়দ নজরুল ইসলাম মেডিকেল কলেজ",type:"hospital",phone:"094161100",lat:24.4333,lng:90.7667,area:"Kishoreganj"},{id:"kishoreganj_sadar_hospital",name:"Kishoreganj 250 Bed District Hospital",bnName:"কিশোরগঞ্জ ২৫০ শয্যা জেলা হাসপাতাল",type:"hospital",phone:"094161555",lat:24.44,lng:90.775,area:"Kishoreganj"},{id:"kishoreganj_sadar_ps",name:"Kishoreganj Model Police Station",bnName:"কিশোরগঞ্জ মডেল থানা",type:"police",phone:"01320095145",lat:24.441,lng:90.7725,area:"Kishoreganj"},{id:"bhitair_ps",name:"Bhairab Police Station",bnName:"ভৈরব থানা",type:"police",phone:"01320095325",lat:24.05,lng:90.9833,area:"Kishoreganj"},{id:"kuliarchar_ps",name:"Kuliarchar Police Station",bnName:"কুলিয়ারচর থানা",type:"police",phone:"01320095280",lat:24.15,lng:90.9167,area:"Kishoreganj"},{id:"katiadi_ps",name:"Katiadi Police Station",bnName:"কটিয়াদী থানা",type:"police",phone:"01320095235",lat:24.25,lng:90.8167,area:"Kishoreganj"},{id:"kishoreganj_fire",name:"Kishoreganj Fire Station",bnName:"কিশোরগঞ্জ ফায়ার স্টেশন",type:"fire",phone:"01713398911",lat:24.442,lng:90.778,area:"Kishoreganj"},{id:"bhairab_river_fire",name:"Bhairab River Fire Station",bnName:"ভৈরব নদী ফায়ার স্টেশন",type:"fire",phone:"01901020942",lat:24.052,lng:90.985,area:"Kishoreganj"},{id:"bhairab_bazar_fire",name:"Bhairab Bazar Fire Station",bnName:"ভৈরব বাজার ফায়ার স্টেশন",type:"fire",phone:"01901020940",lat:24.055,lng:90.99,area:"Kishoreganj"},{id:"faridpur_medical_college",name:"Bangabandhu Sheikh Mujib Medical College Hospital",bnName:"বঙ্গবন্ধু শেখ মুজিব মেডিকেল কলেজ হাসপাতাল",type:"hospital",phone:"063162799",lat:23.6061,lng:89.8396,area:"Faridpur"},{id:"faridpur_general_hospital",name:"Faridpur General Hospital",bnName:"ফরিদপুর জেনারেল হাসপাতাল",type:"hospital",phone:"063164477",lat:23.6,lng:89.84,area:"Faridpur"},{id:"kotwali_ps_faridpur",name:"Kotwali Police Station, Faridpur",bnName:"কোতোয়ালী থানা, ফরিদপুর",type:"police",phone:"01320096585",lat:23.606,lng:89.837,area:"Faridpur"},{id:"bhanga_ps",name:"Bhanga Police Station",bnName:"ভাঙ্গা থানা",type:"police",phone:"01320096815",lat:23.3833,lng:89.9833,area:"Faridpur"},{id:"boalmari_ps",name:"Boalmari Police Station",bnName:"বোয়ালমারী থানা",type:"police",phone:"01320096700",lat:23.3833,lng:89.6833,area:"Faridpur"},{id:"faridpur_fire",name:"Faridpur Fire Station",bnName:"ফরিদপুর ফায়ার স্টেশন",type:"fire",phone:"01713398913",lat:23.604,lng:89.842,area:"Faridpur"},{id:"bhanga_fire",name:"Bhanga Fire Station",bnName:"ভাঙ্গা ফায়ার স্টেশন",type:"fire",phone:"01901021430",lat:23.385,lng:89.985,area:"Faridpur"},{id:"madaripur_sadar_hospital",name:"Madaripur Sadar Hospital",bnName:"মাদারীপুর সদর হাসপাতাল",type:"hospital",phone:"066161424",lat:23.1667,lng:90.2,area:"Madaripur"},{id:"madaripur_sadar_ps",name:"Madaripur Sadar Police Station",bnName:"মাদারীপুর সদর থানা",type:"police",phone:"01320120530",lat:23.165,lng:90.201,area:"Madaripur"},{id:"kalkini_ps",name:"Kalkini Police Station",bnName:"কালকিনি থানা",type:"police",phone:"01320120585",lat:23.0667,lng:90.2333,area:"Madaripur"},{id:"shibchar_ps",name:"Shibchar Police Station",bnName:"শিবচর থানা",type:"police",phone:"01320120695",lat:23.35,lng:90.1667,area:"Madaripur"},{id:"madaripur_fire",name:"Madaripur Fire Station",bnName:"মাদারীপুর ফায়ার স্টেশন",type:"fire",phone:"01901021438",lat:23.168,lng:90.205,area:"Madaripur"},{id:"shariatpur_sadar_hospital",name:"Shariatpur Sadar Hospital",bnName:"শরীয়তপুর সদর হাসপাতাল",type:"hospital",phone:"060161434",lat:23.2167,lng:90.35,area:"Shariatpur"},{id:"palong_ps",name:"Palong Model Police Station (Shariatpur Sadar)",bnName:"পালং মডেল থানা (শরীয়তপুর সদর)",type:"police",phone:"01320119865",lat:23.218,lng:90.352,area:"Shariatpur"},{id:"naria_ps",name:"Naria Police Station",bnName:"নড়িয়া থানা",type:"police",phone:"01320119975",lat:23.3,lng:90.4167,area:"Shariatpur"},{id:"zajira_ps",name:"Zajira Police Station",bnName:"জাজিরা থানা",type:"police",phone:"01320119920",lat:23.3333,lng:90.3333,area:"Shariatpur"},{id:"shariatpur_fire",name:"Shariatpur Fire Station",bnName:"শরীয়তপুর ফায়ার স্টেশন",type:"fire",phone:"01901021434",lat:23.22,lng:90.348,area:"Shariatpur"},{id:"gopalganj_medical_college",name:"Sheikh Sayera Khatun Medical College Hospital",bnName:"শেখ সায়েরা খাতুন মেডিকেল কলেজ হাসপাতাল",type:"hospital",phone:"026685002",lat:23.0069,lng:89.8175,area:"Gopalganj"},{id:"gopalganj_sadar_hospital",name:"Gopalganj 250 Bed General Hospital",bnName:"গোপালগঞ্জ ২৫০ শয্যা জেনারেল হাসপাতাল",type:"hospital",phone:"026685410",lat:23,lng:89.8333,area:"Gopalganj"},{id:"gopalganj_sadar_ps",name:"Gopalganj Sadar Police Station",bnName:"গোপালগঞ্জ সদর থানা",type:"police",phone:"01320118935",lat:23.003,lng:89.825,area:"Gopalganj"},{id:"tungipara_ps",name:"Tungipara Police Station",bnName:"টুঙ্গিপাড়া থানা",type:"police",phone:"01320119045",lat:22.9,lng:89.8833,area:"Gopalganj"},{id:"kotalipara_ps",name:"Kotalipara Police Station",bnName:"কোটালীপাড়া থানা",type:"police",phone:"01320118990",lat:22.9833,lng:90,area:"Gopalganj"},{id:"gopalganj_fire",name:"Gopalganj Fire Station",bnName:"গোপালগঞ্জ ফায়ার স্টেশন",type:"fire",phone:"01713398914",lat:23.005,lng:89.829,area:"Gopalganj"},{id:"tungipara_fire",name:"Tungipara Fire Station",bnName:"টুঙ্গিপাড়া ফায়ার স্টেশন",type:"fire",phone:"01901021428",lat:22.903,lng:89.886,area:"Gopalganj"},{id:"rajbari_sadar_hospital",name:"Rajbari Sadar Hospital",bnName:"রাজবাড়ী সদর হাসপাতাল",type:"hospital",phone:"064165596",lat:23.7583,lng:89.65,area:"Rajbari"},{id:"rajbari_sadar_ps",name:"Rajbari Sadar Police Station",bnName:"রাজবাড়ী সদর থানা",type:"police",phone:"01320117465",lat:23.759,lng:89.652,area:"Rajbari"},{id:"goalanda_ghat_ps",name:"Goalanda Ghat Police Station",bnName:"গোয়ালন্দ ঘাট থানা",type:"police",phone:"01320117520",lat:23.7333,lng:89.75,area:"Rajbari"},{id:"pangsha_ps",name:"Pangsha Police Station",bnName:"পাংশা থানা",type:"police",phone:"01320117575",lat:23.7833,lng:89.4167,area:"Rajbari"},{id:"rajbari_fire",name:"Rajbari Fire Station",bnName:"রাজবাড়ী ফায়ার স্টেশন",type:"fire",phone:"01713398915",lat:23.76,lng:89.648,area:"Rajbari"},{id:"goalanda_fire",name:"Goalanda Fire Station",bnName:"গোয়ালন্দ ফায়ার স্টেশন",type:"fire",phone:"01901021422",lat:23.736,lng:89.755,area:"Rajbari"}],qo=(a,o=2)=>{const d=Yo.map(n=>({...n,distance:Ni(a,{lat:n.lat,lng:n.lng})}));return{police:d.filter(n=>n.type==="police").sort((n,i)=>n.distance-i.distance).slice(0,o),hospital:d.filter(n=>n.type==="hospital").sort((n,i)=>n.distance-i.distance).slice(0,o),fire:d.filter(n=>n.type==="fire").sort((n,i)=>n.distance-i.distance).slice(0,o),other:d.filter(n=>n.type==="other").sort((n,i)=>n.distance-i.distance).slice(0,o)}},Vo=a=>a<1e3?`${Math.round(a)}m`:`${(a/1e3).toFixed(1)}km`,Qo=({isOpen:a,onClose:o,userLocation:d,currentLocationName:t})=>{const{t:n,formatNumber:i}=ra(),r=b.useMemo(()=>d?qo(d,2):null,[d]);if(b.useEffect(()=>{if(a){const f=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=f}}},[a]),!a)return null;const s=f=>{switch(f){case"police":return e.jsx(Pt,{className:"w-5 h-5"});case"hospital":return e.jsx(ca,{className:"w-5 h-5"});case"fire":return e.jsx(ha,{className:"w-5 h-5"});default:return e.jsx(pt,{className:"w-5 h-5"})}},p=f=>{switch(f){case"police":return"bg-blue-50 dark:bg-blue-900/30 text-kj-primary border-kj-primary/20";case"hospital":return"bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800";case"fire":return"bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800";default:return"bg-kj-panel text-kj-text-dim border-kj-line"}},h=f=>{window.location.href=`tel:${f}`},u=f=>{const v=p(f.type);return e.jsx("div",{className:"dc-card rounded-xl p-4 hover:shadow-md transition-shadow",children:e.jsxs("div",{className:"flex items-start justify-between gap-3",children:[e.jsxs("div",{className:"flex-1",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[e.jsx("div",{className:`p-1.5 rounded-lg border ${v}`,children:s(f.type)}),e.jsx("h4",{className:"font-bold text-kj-text text-sm",children:f.name})]}),e.jsx("p",{className:"text-xs text-kj-text-dim mb-2",children:f.bnName}),e.jsxs("div",{className:"flex items-center gap-2 text-xs text-kj-text-dim",children:[e.jsx(pa,{className:"w-3 h-3"}),e.jsxs("span",{children:[f.area," • ",i(Vo(f.distance))," ",n("emergency.away")]})]})]}),e.jsx("button",{onClick:()=>h(f.phone),className:"shrink-0 bg-kj-primary hover:bg-green-600 text-white p-3 rounded-xl transition-colors shadow-sm active:scale-95","aria-label":`Call ${f.name}`,children:e.jsx(pt,{className:"w-4 h-4"})})]})},f.id)};return e.jsx("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:9999},className:"flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in",onClick:o,children:e.jsxs("div",{className:"bg-kj-panel w-full md:max-w-2xl md:rounded-2xl rounded-t-3xl h-[100dvh] md:h-auto md:max-h-[90vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom md:slide-in-from-bottom-0",onClick:f=>f.stopPropagation(),children:[e.jsxs("div",{className:"sticky top-0 z-10 flex items-center justify-between px-5 py-4 pt-[max(env(safe-area-inset-top),1rem)] border-b border-kj-line shrink-0 bg-kj-panel",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"text-xl font-bold text-kj-text flex items-center gap-2",children:[e.jsx(pt,{className:"w-5 h-5 text-kj-accent"}),n("emergency.title")]}),t&&e.jsxs("p",{className:"text-xs text-kj-text-dim mt-1 flex items-center gap-1",children:[e.jsx(Li,{className:"w-3 h-3"}),n("emergency.near")," ",t]})]}),e.jsx("button",{onClick:o,className:"p-2 hover:bg-kj-chip-bg dark:hover:bg-kj-chip-bg rounded-full transition-colors","aria-label":"Close",children:e.jsx(rt,{className:"w-5 h-5 text-kj-text-dim"})})]}),e.jsxs("div",{className:"flex-1 overflow-y-auto p-5 space-y-6",children:[e.jsxs("div",{children:[e.jsxs("h3",{className:"text-sm font-bold text-kj-text-dim mb-3 uppercase tracking-wide flex items-center gap-2",children:[e.jsx(Pt,{className:"w-4 h-4 text-kj-accent"}),n("emergency.nationalEmergencyNumbers")]}),e.jsx("div",{className:"grid grid-cols-1 gap-2",children:Jo.map(f=>e.jsxs("div",{className:"bg-gradient-to-r from-dhaka-red/5 to-transparent border border-red-100 dark:border-red-900/30 rounded-xl p-3 flex items-center justify-between",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("h4",{className:"font-bold text-kj-text text-sm",children:f.name}),e.jsx("p",{className:"text-xs text-kj-text-dim",children:f.bnName}),e.jsx("p",{className:"text-xs text-kj-text-faint mt-0.5",children:f.description})]}),e.jsxs("button",{onClick:()=>h(f.number),className:"shrink-0 bg-kj-accent hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm active:scale-95 flex items-center gap-2",children:[e.jsx(pt,{className:"w-4 h-4"}),i(f.number)]})]},f.id))})]}),d&&r&&e.jsxs(e.Fragment,{children:[r.police.length>0&&e.jsxs("div",{children:[e.jsxs("h3",{className:"text-sm font-bold text-kj-text-dim mb-3 uppercase tracking-wide flex items-center gap-2",children:[e.jsx(Pt,{className:"w-4 h-4 text-kj-primary"}),n("emergency.nearestPoliceStations")]}),e.jsx("div",{className:"space-y-2",children:r.police.map(u)})]}),r.hospital.length>0&&e.jsxs("div",{children:[e.jsxs("h3",{className:"text-sm font-bold text-kj-text-dim mb-3 uppercase tracking-wide flex items-center gap-2",children:[e.jsx(ca,{className:"w-4 h-4 text-green-600"}),n("emergency.nearestHospitals")]}),e.jsx("div",{className:"space-y-2",children:r.hospital.map(u)})]}),r.fire.length>0&&e.jsxs("div",{children:[e.jsxs("h3",{className:"text-sm font-bold text-kj-text-dim mb-3 uppercase tracking-wide flex items-center gap-2",children:[e.jsx(ha,{className:"w-4 h-4 text-red-600"}),n("emergency.nearestFireStations")]}),e.jsx("div",{className:"space-y-2",children:r.fire.map(u)})]})]}),!d&&e.jsxs("div",{className:"text-center py-8 text-kj-text-dim",children:[e.jsx(pa,{className:"w-12 h-12 mx-auto mb-3 text-kj-text-faint"}),e.jsx("p",{className:"text-sm",children:n("emergency.locationNotAvailable")}),e.jsx("p",{className:"text-xs mt-1",children:n("emergency.enableLocation")})]})]}),e.jsx("div",{className:"p-4 pb-[max(env(safe-area-inset-bottom),1rem)] border-t border-kj-line bg-gray-50 dark:bg-kj-chip-bg shrink-0 rounded-b-3xl md:rounded-b-2xl",children:e.jsxs("p",{className:"text-xs text-center text-kj-text-dim",children:[n("emergency.emergencyFooter")," ",e.jsx("span",{className:"font-bold text-kj-accent",children:i(999)})," ",n("emergency.immediately")]})})]})})},Xo={AC:["#006a4e","#10b981"],Local:["#1e3a8a","#3b82f6"],"Double-Decker":["#5b21b6","#7c3aed"],"Semi-Sitting":["#0c4a6e","#0ea5e9"],Sitting:["#92400e","#f59e0b"],"Metro Rail":["#00543c","#10b981"]};function Zo(a,o){const t=(o.lat-a.lat)*Math.PI/180,n=(o.lng-a.lng)*Math.PI/180,i=a.lat*Math.PI/180,r=o.lat*Math.PI/180,s=Math.sin(t/2)**2+Math.cos(i)*Math.cos(r)*Math.sin(n/2)**2;return 6371*2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s))}function Ra(a,o){var n;if(!a)return o;const d=ge[a.toLowerCase()];if(d)return d.id;const t=a.toLowerCase().replace(/[^a-z0-9]/g,"");return((n=Object.values(ge).find(i=>i.id.toLowerCase().replace(/[^a-z0-9]/g,"")===t||i.name.toLowerCase().replace(/[^a-z0-9]/g,"")===t||(i.bnName||"").toLowerCase().replace(/[^a-z0-9]/g,"")===t))==null?void 0:n.id)||o}function er(a){var $,X,Z;const{theme:o,device:d,lang:t,params:n}=a,i=ae[o],r=d==="mobile",s=(F=16)=>({background:i.panel,border:`1px solid ${i.line}`,borderRadius:F,padding:16}),p=(n==null?void 0:n.busId)??"",h=pe.find(F=>F.id===p)??pe[0],u=Ra((n==null?void 0:n.from)??"",h.stops[0]),f=Ra((n==null?void 0:n.to)??"",h.stops[h.stops.length-1]),v=h.stops.indexOf(u),k=h.stops.indexOf(f),j=v>k&&v!==-1&&k!==-1,[A,z]=b.useState(()=>Le()),[C,I]=b.useState(null),[w,D]=b.useState(!1),[B,H]=b.useState(!1),[U,q]=b.useState(!1),[P,W]=b.useState(null),M=b.useMemo(()=>{const F=j?[...h.stops].reverse():h.stops;return F.map((x,y)=>{const g=ge[x];return{id:x,en:(g==null?void 0:g.name)??x.replace(/_/g," "),bn:(g==null?void 0:g.bnName)??x,lat:g==null?void 0:g.lat,lng:g==null?void 0:g.lng,isFrom:x===u||!(n!=null&&n.from)&&y===0,isTo:x===f||!(n!=null&&n.to)&&y===F.length-1}})},[h,u,f,n==null?void 0:n.from,n==null?void 0:n.to,j]),E=b.useMemo(()=>C?M.reduce((F,x,y)=>{if(typeof x.lat!="number"||typeof x.lng!="number")return F;const g=Zo(C,{lat:x.lat,lng:x.lng});return!F||g<F.distance?{index:y,distance:g}:F},null):null,[M,C]);if(b.useEffect(()=>{we(h.id).then(W).catch(()=>W(null))},[h.id]),b.useEffect(()=>{if(!navigator.geolocation||localStorage.getItem("kj-location-consent")!=="yes")return;const F=navigator.geolocation.watchPosition(x=>I({lat:x.coords.latitude,lng:x.coords.longitude}),()=>{},{enableHighAccuracy:!0,maximumAge:3e4,timeout:1e4});return()=>navigator.geolocation.clearWatch(F)},[]),w)return e.jsx(ne,{...a,canBack:!0,children:e.jsx("div",{style:{padding:r?"16px 12px 100px":"24px 40px 80px",maxWidth:920,margin:"0 auto"},children:e.jsx("div",{style:{...s(18),padding:0,overflow:"hidden",minHeight:r?"calc(100vh - 150px)":"calc(100vh - 190px)",display:"flex"},children:e.jsx(qt,{busId:h.id,busName:h.name,onBack:()=>{D(!1),we(h.id).then(W).catch(()=>W(null))},onSuccess:()=>be(10,"Bus review submitted")})})})});if(B)return e.jsx(ne,{...a,canBack:!0,children:e.jsx("div",{style:{padding:r?"16px 12px 100px":"24px 40px 80px",maxWidth:920,margin:"0 auto"},children:e.jsx("div",{style:{...s(18),padding:0,overflow:"hidden"},children:e.jsx(Vt,{busId:h.id,busName:h.name,busBnName:h.bnName,onBack:()=>H(!1),onSuccess:()=>be(8,"Bus photo uploaded")})})})});const _=Xo[h.type]??["#1e3a8a","#3b82f6"],L=h.name.split(" ").map(F=>F[0]).join("").slice(0,2).toUpperCase(),J=h.type==="AC"?60:h.type==="Double-Decker"?50:30,R=A.includes(h.id),N=E?($=M[E.index])==null?void 0:$.en:void 0;return e.jsxs(ne,{...a,children:[e.jsxs("div",{style:{padding:r?"16px 16px 100px":"28px 40px 145px",maxWidth:1180,margin:"0 auto"},children:[e.jsx("div",{style:{height:r?320:430,borderRadius:16,overflow:"hidden",position:"relative",marginBottom:18,background:"#0a1f14",border:`1px solid ${i.line}`},children:e.jsx(Go,{route:h,userLocation:C,highlightStartId:u,highlightEndId:f,isReversed:j,height:"100%"})}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:r?"1fr":"1.35fr 0.8fr",gap:20},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{...s(18),marginBottom:16},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:14},children:[e.jsx("div",{style:{width:44,height:44,borderRadius:12,background:`linear-gradient(135deg,${_[0]},${_[1]})`,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:c,fontWeight:800,fontSize:15},children:L}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:16,color:i.text},children:t==="bn"?h.bnName:h.name}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,marginTop:2,flexWrap:"wrap"},children:[P&&P.count>0?e.jsxs(e.Fragment,{children:[e.jsxs("span",{style:{color:"#f59e0b",fontSize:12},children:["★ ",P.average.toFixed(1)]}),e.jsxs("span",{style:{fontFamily:c,fontSize:11,color:i.textFaint},children:[P.count," ",l(t,"রিভিউ","reviews")]})]}):e.jsx("span",{style:{fontFamily:c,fontSize:11,color:i.textFaint},children:l(t,"এখনো কোনো রিভিউ নেই","No reviews yet")}),e.jsx(Ne,{tk:i,tone:h.type==="AC"?"primary":"mute",children:h.type})]})]})]}),e.jsx("div",{style:{fontFamily:m,fontSize:13,color:i.textDim,marginBottom:12},children:h.routeString}),e.jsx("div",{style:{fontFamily:c,fontSize:11,color:i.textFaint,marginBottom:12},children:h.hours}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8},children:[{v:Y(h.stops.length,t),l:l(t,"স্টপ","stops")},{v:ce(J,t),l:l(t,"ভাড়া","fare")},{v:h.type,l:l(t,"ধরন","type")}].map((F,x)=>e.jsxs("div",{style:{background:i.panelMuted,borderRadius:10,padding:"8px 6px",textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:c,fontWeight:800,fontSize:14,color:i.text},children:F.v}),e.jsx("div",{style:{fontFamily:c,fontSize:10,color:i.textFaint},children:F.l})]},x))})]}),e.jsxs("div",{style:{...s(18),marginBottom:16},children:[e.jsxs("div",{style:{fontFamily:m,fontWeight:700,fontSize:15,color:i.text,marginBottom:14},children:[l(t,"স্টপসমূহ","Stops")," ",e.jsxs("span",{style:{fontFamily:c,fontSize:11,color:i.textFaint},children:["(",Y(M.length,t),")"]})]}),M.map((F,x)=>{const y=(E==null?void 0:E.index)===x,g=y&&E.distance<=1.5;return e.jsxs("div",{style:{display:"flex",gap:14,paddingBottom:x<M.length-1?12:0,position:"relative"},children:[e.jsxs("div",{style:{width:20,flexShrink:0,position:"relative",display:"flex",justifyContent:"center"},children:[x<M.length-1&&e.jsx("div",{style:{position:"absolute",top:16,bottom:-4,width:2,background:i.primary,opacity:.3}}),e.jsx("div",{style:{width:F.isFrom||F.isTo||y?18:12,height:F.isFrom||F.isTo||y?18:12,borderRadius:999,marginTop:4,background:y?"#38bdf8":F.isFrom?i.primary:F.isTo?i.accent:i.panel,border:`2px solid ${y?"#38bdf8":F.isFrom?i.primary:F.isTo?i.accent:i.primary}`}})]}),e.jsxs("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"},children:[e.jsx("span",{style:{fontFamily:m,fontWeight:F.isFrom||F.isTo?700:500,fontSize:14,color:i.text},children:t==="bn"?F.bn:F.en}),F.isFrom&&e.jsx(Ne,{tk:i,tone:"primary",children:l(t,"বোর্ডিং","Boarding")}),F.isTo&&e.jsx(Ne,{tk:i,tone:"accent",children:l(t,"গন্তব্য","Destination")}),y&&e.jsx(Ne,{tk:i,tone:"mute",children:l(t,"আপনি এখানে","You are here")})]}),g&&e.jsx("button",{onClick:()=>q(!0),style:{background:i.accentSoft,border:`1px solid ${i.accent}55`,borderRadius:999,padding:"6px 10px",fontFamily:m,fontWeight:700,fontSize:12,color:i.accent,cursor:"pointer",whiteSpace:"nowrap"},children:l(t,"হেল্পলাইন","Help line")})]})]},F.id)})]}),e.jsx(ee,{tk:i,lang:t,kind:r?"mob-banner":"leaderboard"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsxs("div",{style:{...s(16),background:`linear-gradient(135deg,${_[0]},${_[1]})`,color:"#fff",border:"none"},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:16,marginBottom:12},children:l(t,"বাস তথ্য","Bus info")}),[{l:l(t,"অপারেটর","Operator"),v:h.name},{l:l(t,"বাস আইডি","Bus ID"),v:h.id},{l:l(t,"ভাড়া","Fare"),v:"৳ "+Y(J,t)},{l:l(t,"বাসের ধরন","Type"),v:h.type},{l:l(t,"সময়সূচি","Hours"),v:h.hours}].map((F,x)=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",gap:12,paddingBottom:8,borderBottom:"1px solid rgba(255,255,255,0.12)",marginBottom:8},children:[e.jsx("span",{style:{fontFamily:m,fontSize:13,opacity:.8},children:F.l}),e.jsx("span",{style:{fontFamily:c,fontWeight:700,fontSize:13,textAlign:"right"},children:F.v})]},x)),E&&e.jsxs("p",{style:{fontFamily:m,fontSize:12,opacity:.82,marginTop:8},children:[l(t,"নিকটতম স্টপ","Nearest stop"),": ",t==="bn"?(X=M[E.index])==null?void 0:X.bn:(Z=M[E.index])==null?void 0:Z.en," · ",Y(E.distance.toFixed(1),t)," km"]})]}),e.jsxs("div",{style:s(16),children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:15,color:i.text,marginBottom:10},children:l(t,"কমিউনিটি","Community")}),e.jsxs("button",{onClick:()=>D(!0),style:{...ye(i),width:"100%",justifyContent:"center",marginBottom:8},children:["★ ",l(t,"রিভিউ দিন","Rate & review")]}),e.jsx("button",{onClick:()=>H(!0),style:{...ye(i),width:"100%",justifyContent:"center"},children:l(t,"ছবি দেখুন / আপলোড","Photos / upload")})]}),e.jsx(ee,{tk:i,lang:t,kind:"mid-rect"})]})]})]}),e.jsxs("div",{style:{position:"fixed",bottom:r?0:60,left:0,right:0,background:i.panel,backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",borderTop:`1px solid ${i.line}`,padding:"12px 16px",display:"flex",gap:10,zIndex:9100},children:[e.jsxs("button",{onClick:()=>z(Ja(h.id)),style:{...ye(i),borderRadius:12,padding:"10px 16px",color:R?i.accent:i.text},children:[R?"♥":"♡"," ",l(t,"সেভ","Save")]}),e.jsxs("button",{onClick:()=>D(!0),style:{...ye(i),borderRadius:12,padding:"10px 16px"},children:["★ ",l(t,"রেট","Rate")]}),e.jsx("button",{style:{flex:1,background:i.primary,color:i.primaryInk,border:0,borderRadius:12,padding:"12px 20px",fontFamily:c,fontWeight:700,fontSize:14,cursor:"pointer"},children:l(t,"নেভিগেট শুরু","Start navigation")})]}),e.jsx(Qo,{isOpen:U,onClose:()=>q(!1),userLocation:C,currentLocationName:N})]})}const bt=[{name:"Uttara North",nameBn:"উত্তরা উত্তর",fare:0,fareLabel:"৳0"},{name:"Uttara Center",nameBn:"উত্তরা সেন্টার",fare:20,fareLabel:"৳20"},{name:"Uttara South",nameBn:"উত্তরা দক্ষিণ",fare:20,fareLabel:"৳20"},{name:"Pallabi",nameBn:"পল্লবী",fare:30,fareLabel:"৳30"},{name:"Mirpur 11",nameBn:"মিরপুর ১১",fare:40,fareLabel:"৳40"},{name:"Mirpur 10",nameBn:"মিরপুর ১০",fare:50,fareLabel:"৳50"},{name:"Kazipara",nameBn:"কাজীপাড়া",fare:60,fareLabel:"৳60"},{name:"Shewrapara",nameBn:"শেওড়াপাড়া",fare:60,fareLabel:"৳60"},{name:"Agargaon",nameBn:"আগারগাঁও",fare:70,fareLabel:"৳70"},{name:"Bijoy Sarani",nameBn:"বিজয় সরণি",fare:80,fareLabel:"৳80"},{name:"Farmgate",nameBn:"ফার্মগেট",fare:80,fareLabel:"৳80",current:!0},{name:"Karwan Bazar",nameBn:"কারওয়ান বাজার",fare:90,fareLabel:"৳90"},{name:"Shahbag",nameBn:"শাহবাগ",fare:90,fareLabel:"৳90"},{name:"Dhaka University",nameBn:"ঢাকা বিশ্ববিদ্যালয়",fare:90,fareLabel:"৳90"},{name:"Secretariat",nameBn:"সচিবালয়",fare:100,fareLabel:"৳100"},{name:"Motijheel",nameBn:"মতিঝিল",fare:100,fareLabel:"৳100"},{name:"Kamalapur",nameBn:"কমলাপুর",fare:100,fareLabel:"৳100"}],tr=[{icon:"🎫",en:"Buy token at station counter or vending machine",bn:"স্টেশন কাউন্টার বা ভেন্ডিং মেশিনে টোকেন কিনুন"},{icon:"📱",en:"Tap contactless card or token at gate",bn:"গেটে কার্ড বা টোকেন ট্যাপ করুন"},{icon:"🚇",en:"Board at the correct platform",bn:"সঠিক প্ল্যাটফর্মে উঠুন"},{icon:"🔄",en:"Tap again on exit to pay fare",bn:"বের হওয়ার সময় আবার ট্যাপ করুন"}],ar=["Fast","Clean","AC","On-time","Affordable"],ir=["দ্রুত","পরিষ্কার","এসি","সময়মতো","সাশ্রয়ী"],nr=[{stars:5,pct:72},{stars:4,pct:18},{stars:3,pct:6},{stars:2,pct:2},{stars:1,pct:2}];function or(a){const{theme:o,device:d,lang:t,onNav:n}=a,i=ae[o],r=d==="mobile",s=(j,A)=>l(t,A,j),p=t==="bn"?m:c,[h,u]=b.useState(120);b.useEffect(()=>{const j=setInterval(()=>u(A=>A>0?A-1:120),1e3);return()=>clearInterval(j)},[]);const f=Math.floor(h/60),v=String(h%60).padStart(2,"0"),k={background:i.panel,border:`1px solid ${i.line}`,borderRadius:20,padding:r?16:24,backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",boxShadow:i.shadow};return e.jsx(ne,{...a,canBack:!0,children:e.jsxs("div",{style:{maxWidth:900,margin:"0 auto",padding:r?"16px 16px 100px":"32px 24px 60px"},children:[e.jsxs("div",{style:{background:`linear-gradient(135deg, ${i.metroBg} 0%, #001a2e 50%, #002a14 100%)`,border:"1px solid rgba(0,245,255,0.2)",borderRadius:24,padding:r?20:32,marginBottom:24,position:"relative",overflow:"hidden",boxShadow:"0 0 60px rgba(0,245,255,0.12)"},children:[e.jsx("div",{style:{position:"absolute",inset:0,pointerEvents:"none",background:"radial-gradient(ellipse 70% 60% at 80% 50%, rgba(0,245,255,0.07) 0%, transparent 70%)"}}),e.jsx("div",{style:{position:"absolute",right:r?-20:24,top:"50%",transform:"translateY(-50%)",opacity:.65,pointerEvents:"none"},children:e.jsx(Tt,{size:r?130:180,palette:["#00b8d9","#005080","#fef3c7"]})}),e.jsxs("div",{style:{position:"relative",zIndex:1},children:[e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:8,marginBottom:12},children:[e.jsx("div",{style:{background:"linear-gradient(135deg, #00b8d9, #0070ad)",borderRadius:10,padding:"5px 12px",fontFamily:c,fontSize:13,fontWeight:800,color:"#fff",letterSpacing:1},children:"M6"}),e.jsx("div",{style:{background:"rgba(0,245,255,0.15)",border:"1px solid rgba(0,245,255,0.3)",borderRadius:999,padding:"3px 10px",fontFamily:c,fontSize:11,fontWeight:700,color:"#00f5ff",letterSpacing:"0.06em"},children:"MRT LINE 6"})]}),e.jsx("h1",{style:{fontFamily:p,fontSize:r?22:30,fontWeight:800,color:"#fff",margin:"0 0 4px",lineHeight:1.2},children:s("Metro Rail MRT-6","মেট্রো রেল এমআরটি-৬")}),e.jsx("div",{style:{fontFamily:c,fontSize:14,color:"rgba(255,255,255,0.65)",marginBottom:16},children:"Uttara North → Motijheel"}),e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap"},children:[e.jsxs("div",{style:{background:"rgba(0,245,255,0.12)",border:"1px solid rgba(0,245,255,0.25)",borderRadius:14,padding:"10px 16px"},children:[e.jsx("div",{style:{fontFamily:c,fontSize:10,fontWeight:600,letterSpacing:.5,textTransform:"uppercase",color:"#00f5ff",marginBottom:4},children:s("Current Station","বর্তমান স্টেশন")}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx("span",{style:{fontFamily:p,fontSize:16,fontWeight:700,color:"#fff"},children:s("Farmgate","ফার্মগেট")}),e.jsx("span",{style:{background:"#22c55e",borderRadius:999,padding:"2px 7px",fontFamily:c,fontSize:10,fontWeight:700,color:"#fff"},children:s("You are here","আপনি এখানে")})]})]}),e.jsxs("div",{style:{background:"rgba(255,184,0,0.12)",border:"1px solid rgba(255,184,0,0.25)",borderRadius:14,padding:"10px 16px"},children:[e.jsx("div",{style:{fontFamily:c,fontSize:10,fontWeight:600,letterSpacing:.5,textTransform:"uppercase",color:"#ffb800",marginBottom:4},children:s("Next Train","পরবর্তী ট্রেন")}),e.jsxs("div",{style:{fontFamily:c,fontSize:22,fontWeight:800,color:"#ffb800",fontVariantNumeric:"tabular-nums"},children:[Y(f,t),":",Y(v,t)]})]})]})]})]}),e.jsxs("div",{style:{...k,marginBottom:24,overflow:"hidden"},children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,fontWeight:700,letterSpacing:.8,textTransform:"uppercase",color:i.textFaint,marginBottom:16},children:s(`Full Route Map — ${Y(17,t)} Stations`,`সম্পূর্ণ রুট ম্যাপ — ${Y(17,t)} স্টেশন`)}),e.jsx("div",{style:{overflowX:"auto",paddingBottom:12},children:e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:0,minWidth:bt.length*80,position:"relative",paddingTop:16},children:[e.jsx("div",{style:{position:"absolute",top:31,left:20,right:20,height:3,background:"linear-gradient(90deg, #00b8d9, #0070ad)",borderRadius:2,zIndex:0}}),bt.map((j,A)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",width:80,flexShrink:0,position:"relative",zIndex:1},children:[e.jsx("div",{style:{width:j.current?20:12,height:j.current?20:12,borderRadius:"50%",background:j.current?"#00f5ff":A===0||A===bt.length-1?"#00b8d9":i.panel,border:`3px solid ${j.current?"#00f5ff":"#00b8d9"}`,boxShadow:j.current?"0 0 12px rgba(0,245,255,0.8)":void 0,flexShrink:0,marginBottom:6}}),e.jsx("div",{style:{transformOrigin:"top center",transform:"rotate(45deg)",whiteSpace:"nowrap",fontFamily:t==="bn"?m:c,fontSize:10,fontWeight:j.current?700:500,color:j.current?i.primary:i.textDim,marginBottom:28,textAlign:"left"},children:s(j.name,j.nameBn)}),e.jsx("div",{style:{fontFamily:c,fontSize:10,fontWeight:600,color:j.fare===0?"#22c55e":i.textFaint,marginTop:24},children:ce(j.fare,t)})]},j.name))]})})]}),e.jsxs("div",{style:{...k,marginBottom:24},children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,fontWeight:700,letterSpacing:.8,textTransform:"uppercase",color:i.textFaint,marginBottom:16},children:s("How to Use Metro","মেট্রো কীভাবে ব্যবহার করবেন")}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:r?"1fr 1fr":"repeat(4, 1fr)",gap:12},children:tr.map((j,A)=>e.jsxs("div",{style:{background:i.panelMuted,border:`1px solid ${i.line}`,borderRadius:14,padding:"14px 12px",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:28,marginBottom:8},children:j.icon}),e.jsx("div",{style:{fontFamily:c,fontSize:11,fontWeight:700,color:i.primary,marginBottom:4},children:s(`Step ${Y(A+1,t)}`,`ধাপ ${Y(A+1,t)}`)}),e.jsx("div",{style:{fontFamily:p,fontSize:12,color:i.textDim,lineHeight:1.4},children:s(j.en,j.bn)})]},A))})]}),e.jsxs("div",{style:{...k,marginBottom:24},children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,fontWeight:700,letterSpacing:.8,textTransform:"uppercase",color:i.textFaint,marginBottom:16},children:s("Fare Table (from Uttara North)","ভাড়ার তালিকা (উত্তরা উত্তর থেকে)")}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:r?"1fr 1fr":"repeat(3, 1fr)",gap:8},children:bt.map(j=>e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",background:j.current?i.primarySoft:i.panelMuted,border:`1px solid ${j.current?i.primary:i.line}`,borderRadius:10,padding:"8px 12px"},children:[e.jsx("span",{style:{fontFamily:p,fontSize:13,color:j.current?i.primary:i.text,fontWeight:j.current?700:400},children:s(j.name,j.nameBn)}),e.jsx("span",{style:{fontFamily:c,fontSize:13,fontWeight:700,color:j.fare===0?"#22c55e":i.textDim},children:ce(j.fare,t)})]},j.name))}),e.jsxs("div",{style:{fontFamily:c,fontSize:11,color:i.textFaint,marginTop:10,textAlign:"center"},children:["* ",s("Uttara North is the free zone origin station","উত্তরা উত্তর ফ্রি জোন উৎস স্টেশন")]})]}),e.jsxs("div",{style:{...k,marginBottom:24},children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,fontWeight:700,letterSpacing:.8,textTransform:"uppercase",color:i.textFaint,marginBottom:16},children:s("Ratings & Reviews","রেটিং ও রিভিউ")}),e.jsxs("div",{style:{display:"flex",gap:r?16:32,flexWrap:"wrap",alignItems:"flex-start"},children:[e.jsxs("div",{style:{textAlign:"center",minWidth:80},children:[e.jsx("div",{style:{fontFamily:c,fontSize:48,fontWeight:900,color:i.text,lineHeight:1},children:Y("4.8",t)}),e.jsx("div",{style:{fontFamily:c,fontSize:20,color:"#fbbf24",margin:"4px 0"},children:"★★★★★"}),e.jsxs("div",{style:{fontFamily:c,fontSize:11,color:i.textFaint},children:[Y("1,248",t)," ",s("reviews","রিভিউ")]})]}),e.jsx("div",{style:{flex:1,minWidth:160},children:nr.map(j=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:6},children:[e.jsxs("span",{style:{fontFamily:c,fontSize:12,color:i.textDim,width:20,textAlign:"right"},children:[Y(j.stars,t),"★"]}),e.jsx("div",{style:{flex:1,height:8,background:i.panelMuted,borderRadius:4,overflow:"hidden"},children:e.jsx("div",{style:{width:`${j.pct}%`,height:"100%",background:"#fbbf24",borderRadius:4}})}),e.jsxs("span",{style:{fontFamily:c,fontSize:11,color:i.textFaint,width:28},children:[Y(j.pct,t),"%"]})]},j.stars))})]}),e.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginTop:16},children:ar.map((j,A)=>e.jsx("div",{style:{background:i.primarySoft,border:`1px solid ${i.primary}`,borderRadius:999,padding:"5px 12px",fontFamily:p,fontSize:12,fontWeight:600,color:i.primary},children:s(j,ir[A])},j))})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",marginBottom:24},children:e.jsx(ee,{tk:i,lang:t,kind:r?"mob-banner":"leaderboard"})})]})})}const Ia=a=>{var o;return((o=qe[a])==null?void 0:o.name)??a.replace(/_/g," ").replace(/\b\w/g,d=>d.toUpperCase())};function xt(a){return a?a.replace(" BST","").trim():""}function rr(a){if(!a||a==="None"||a==="undefined")return"";const o=parseInt(a);return isNaN(o)?a:`${o} min`}function sr(a){var A,z,C,I,w;const{theme:o,device:d,lang:t,params:n}=a,i=ae[o],r=d==="mobile",s=(D=16)=>({background:i.panel,border:`1px solid ${i.line}`,borderRadius:D,padding:16}),p=Ye.find(D=>D.id===(n==null?void 0:n.trainId))??Ye[0],h=p.routeStops,u=[{l:"Shuvan",bn:"শোভন",c:"#6b7280",f:ce(p.fare.shuvan,t)},{l:"Shuvan Chair",bn:"শোভন চেয়ার",c:"#f59e0b",f:ce(p.fare.shuvanChair,t)},{l:"Snigdha",bn:"স্নিগ্ধা",c:"#3b82f6",f:ce(p.fare.snigdha,t)},p.fare.firstClassBerth?{l:"First Class Berth",bn:"প্রথম শ্রেণি বার্থ",c:"#10b981",f:ce(p.fare.firstClassBerth,t)}:null,p.fare.acBerth?{l:"AC Berth",bn:"এসি বার্থ",c:"#7c3aed",f:ce(p.fare.acBerth,t)}:null].filter(D=>!!D),f=(A=h[0])!=null&&A.departure?xt(h[0].departure):p.dhakaDepart,v=(z=h[h.length-1])!=null&&z.arrival?xt(h[h.length-1].arrival):p.destinationArrive,k=((C=h[0])==null?void 0:C.label)||Ia(p.from),j=((I=h[h.length-1])==null?void 0:I.label)||Ia(p.to);return e.jsx(ne,{...a,children:e.jsxs("div",{style:{padding:r?"16px 16px 48px":"28px 40px 48px",maxWidth:1e3,margin:"0 auto"},children:[e.jsxs("div",{style:{background:`linear-gradient(135deg,${p.color||"#1e1b4b"},#4338ca)`,borderRadius:22,padding:r?18:24,marginBottom:20,color:"#fff"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:10},children:[e.jsx("span",{style:{fontSize:28},children:"🚆"}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontFamily:c,fontWeight:700,fontSize:12,opacity:.8,letterSpacing:1},children:["BANGLADESH RAILWAY · #",p.number]}),e.jsx("h2",{style:{fontFamily:m,fontWeight:700,fontSize:r?20:26,margin:0},children:l(t,p.bnName,p.name)})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16,marginBottom:14,flexWrap:"wrap"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:c,fontWeight:800,fontSize:18},children:k.replace(/_/g," ")}),e.jsx("div",{style:{fontFamily:c,fontSize:12,opacity:.8},children:f})]}),e.jsxs("div",{style:{flex:1,textAlign:"center",minWidth:120},children:[p.totalDuration&&e.jsxs("div",{style:{fontFamily:c,fontSize:11,opacity:.7},children:["⏱ ",p.totalDuration]}),e.jsx("div",{style:{height:2,background:"rgba(255,255,255,0.35)",borderRadius:999,margin:"6px 0"}}),e.jsxs("div",{style:{fontFamily:c,fontSize:10,opacity:.6},children:[Y(h.length,t)," stations"]})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:c,fontWeight:800,fontSize:18},children:j.replace(/_/g," ")}),e.jsx("div",{style:{fontFamily:c,fontSize:12,opacity:.8},children:v})]})]}),e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[[p.type,p.totalDuration?`⏱ ${p.totalDuration}`:`${p.distanceKm} km`,`${l(t,"ছুটি","Off")}: ${p.offDay}`].map((D,B)=>e.jsx("span",{style:{background:"rgba(255,255,255,0.15)",padding:"5px 10px",borderRadius:999,fontFamily:c,fontSize:12,fontWeight:600},children:D},B)),((w=p.runningDays)==null?void 0:w.length)>0&&e.jsxs("span",{style:{background:"rgba(255,255,255,0.15)",padding:"5px 10px",borderRadius:999,fontFamily:c,fontSize:12,fontWeight:600},children:["📅 ",p.runningDays.join(", ")]})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:r?"1fr":"1.4fr 1fr",gap:20},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{...s(18),marginBottom:16},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:15,color:i.text,marginBottom:14},children:l(t,"কোচ ক্লাস ও ভাড়া","Coach classes")}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:u.map(D=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:12,background:i.panelMuted,border:`1px solid ${i.line}`},children:[e.jsx("div",{style:{width:12,height:12,borderRadius:3,background:D.c}}),e.jsx("span",{style:{flex:1,fontFamily:m,fontWeight:700,fontSize:14,color:i.text},children:l(t,D.bn,D.l)}),e.jsx("span",{style:{fontFamily:c,fontWeight:800,fontSize:15,color:D.c},children:D.f})]},D.l))}),e.jsx("div",{style:{marginTop:12,padding:10,background:i.amberSoft,borderRadius:10,fontFamily:m,fontSize:12,color:i.amber},children:l(t,"ভাড়া বাংলাদেশ রেলওয়ে ডেটা থেকে। অতিরিক্ত: সার্ভিস চার্জ ৳২০ + ১৫% ভ্যাট।","Base fare from Bangladesh Railway. Add: ৳20 service charge + 15% VAT.")})]}),e.jsxs("div",{style:{...s(18),marginBottom:16},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16},children:[e.jsxs("div",{style:{fontFamily:m,fontWeight:700,fontSize:15,color:i.text},children:[l(t,"রুট","Routes"),e.jsxs("span",{style:{fontFamily:c,fontSize:11,color:i.textFaint,fontWeight:400,marginLeft:6},children:["(",Y(h.length,t)," ",l(t,"স্টেশন","stations"),")"]})]}),p.totalDuration&&e.jsxs("span",{style:{fontFamily:c,fontSize:12,color:i.textFaint},children:[l(t,"মোট সময়","Total Duration"),": ",e.jsx("strong",{style:{color:i.primary},children:p.totalDuration})]})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:0},children:h.map((D,B)=>{const H=B===0,U=B===h.length-1,q=D.label||D.city.replace(/_/g," "),P=xt(D.arrival),W=xt(D.departure),M=rr(D.halt),E=D.duration&&D.duration!=="None"&&D.duration!=="undefined"?D.duration:"";return e.jsxs("div",{style:{display:"flex",gap:14,position:"relative",paddingBottom:16},children:[e.jsxs("div",{style:{width:20,flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsx("div",{style:{width:H||U?18:12,height:H||U?18:12,borderRadius:999,background:H?i.primary:U?i.accent:i.panelMuted,border:`2px solid ${H?i.primary:U?i.accent:i.primary}`,marginTop:3,flexShrink:0,boxShadow:H||U?`0 0 0 3px ${H?i.primarySoft:i.accentSoft}`:"none"}}),!U&&e.jsx("div",{style:{width:2,flex:1,background:i.primary,opacity:.25,marginTop:3}})]}),e.jsxs("div",{style:{flex:1,minWidth:0,paddingBottom:U?0:4},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:6},children:[e.jsx("span",{style:{fontFamily:c,fontWeight:H||U?700:600,fontSize:14,color:i.text},children:q}),H&&e.jsx(Ne,{tk:i,tone:"primary",children:l(t,"বোর্ডিং","BOARDING")}),U&&e.jsx(Ne,{tk:i,tone:"accent",children:l(t,"গন্তব্য","DESTINATION")})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"4px 16px",background:i.panelMuted,borderRadius:10,padding:"8px 12px"},children:[e.jsxs("div",{children:[e.jsx("span",{style:{fontFamily:c,fontSize:10,color:i.textFaint,display:"block"},children:l(t,"আসে","Arrival")}),e.jsx("span",{style:{fontFamily:c,fontSize:12,fontWeight:600,color:P?i.text:i.textFaint},children:P||"—"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{fontFamily:c,fontSize:10,color:i.textFaint,display:"block"},children:l(t,"বিরতি","Halt")}),e.jsx("span",{style:{fontFamily:c,fontSize:12,fontWeight:600,color:M?i.text:i.textFaint},children:M||"—"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{fontFamily:c,fontSize:10,color:i.textFaint,display:"block"},children:l(t,"ছাড়ে","Departure")}),e.jsx("span",{style:{fontFamily:c,fontSize:12,fontWeight:600,color:W?i.text:i.textFaint},children:W||"—"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{fontFamily:c,fontSize:10,color:i.textFaint,display:"block"},children:l(t,"সময়","Duration")}),e.jsx("span",{style:{fontFamily:c,fontSize:12,fontWeight:600,color:E?i.primary:i.textFaint},children:E||"—"})]})]})]})]},`${D.city}-${B}`)})}),p.totalDuration&&e.jsxs("div",{style:{marginTop:8,padding:"10px 14px",background:`${i.primary}15`,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsx("span",{style:{fontFamily:c,fontSize:12,color:i.textFaint},children:l(t,"মোট যাত্রা সময়","Total journey time")}),e.jsx("span",{style:{fontFamily:c,fontWeight:800,fontSize:15,color:i.primary},children:p.totalDuration})]})]}),e.jsx(ee,{tk:i,lang:t,kind:r?"mob-banner":"leaderboard"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[e.jsxs("div",{style:{...s(16),background:"linear-gradient(135deg,#1e1b4b,#4338ca)",color:"#fff",border:"none"},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:15,marginBottom:12},children:l(t,"টিকেট কোথায় পাবেন","Where to buy ticket")}),[{icon:"🌐",l:"eticket.railway.gov.bd",url:"https://eticket.railway.gov.bd"},{icon:"🏢",l:l(t,"রেলওয়ে কাউন্টার","Railway counter"),url:""},{icon:"📞",l:"131",url:""}].map((D,B)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,0.12)"},children:[e.jsx("span",{style:{fontSize:16},children:D.icon}),D.url?e.jsx("a",{href:D.url,target:"_blank",rel:"noopener noreferrer",style:{fontFamily:m,fontSize:13,opacity:.9,color:"#fff",textDecoration:"underline"},children:D.l}):e.jsx("span",{style:{fontFamily:m,fontSize:13,opacity:.9},children:D.l})]},B)),e.jsx("p",{style:{fontFamily:m,fontSize:11,opacity:.7,marginTop:10},children:l(t,"কই যাবো টিকেট বিক্রি করে না — শুধু তথ্য।","KoyJabo shows info only — no sales.")})]}),e.jsxs("button",{onClick:()=>window.open("https://eticket.railway.gov.bd","_blank"),style:{background:"linear-gradient(135deg,#5b21b6,#7c3aed)",color:"#fff",border:0,borderRadius:14,padding:"14px",fontFamily:c,fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 8px 22px -10px #7c3aed"},children:["🎫 ",l(t,"অনলাইনে টিকেট বুক করুন","Book Ticket Online")]}),e.jsxs("div",{style:{...s(14),background:"linear-gradient(135deg,#065f4622,#10b98122)",borderColor:"#10b98144"},children:[e.jsxs("div",{style:{fontFamily:m,fontWeight:700,fontSize:13,color:i.text,marginBottom:8},children:["👴 ",l(t,"প্রবীণ নাগরিক ছাড়","Senior Citizen Discount")]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[[l(t,"বয়স","Age"),Y(65,t)+"+"],[l(t,"ছাড়","Discount"),Y(25,t)+"%"],[l(t,"সাপ্তাহিক সীমা","Weekly limit"),l(t,"২ যাত্রা",`${Y(2,t)} trips`)],[l(t,"সহযাত্রী","Co-passenger"),Y(1,t)]].map(([D,B],H)=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontFamily:c,fontSize:12},children:[e.jsx("span",{style:{color:i.textFaint},children:D}),e.jsx("span",{style:{color:i.text,fontWeight:700},children:B})]},H))})]}),e.jsxs("div",{style:{...s(14)},children:[e.jsxs("div",{style:{fontFamily:m,fontWeight:700,fontSize:13,color:i.text,marginBottom:8},children:["💳 ",l(t,"ফি ও পেমেন্ট","Fees & Payment")]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:4,marginBottom:10},children:[[l(t,"সার্ভিস চার্জ","Service charge"),ce(20,t)],[l(t,"ভ্যাট","VAT"),Y(15,t)+"%"],[l(t,"বিছানা ফি","Bedding fee"),ce(50,t)],[l(t,"সর্বোচ্চ টিকেট","Max tickets"),Y(4,t)]].map(([D,B],H)=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontFamily:c,fontSize:12},children:[e.jsx("span",{style:{color:i.textFaint},children:D}),e.jsx("span",{style:{color:i.text,fontWeight:700},children:B})]},H))}),e.jsxs("div",{style:{fontFamily:c,fontSize:11,color:i.textFaint,marginBottom:6},children:[l(t,"পেমেন্ট পদ্ধতি","Payment methods"),":"]}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:4},children:["bKash","Nagad","Rocket","Visa","MasterCard","DBBL Nexus"].map(D=>e.jsx("span",{style:{background:i.panelMuted,border:`1px solid ${i.line}`,borderRadius:6,padding:"3px 8px",fontFamily:c,fontSize:10,fontWeight:600,color:i.textDim},children:D},D))})]}),!r&&e.jsx(ee,{tk:i,lang:t,kind:"mid-rect"})]})]})]})})}function lr({kind:a,size:o}){return a==="bus"?e.jsx(Me,{size:o}):a==="train"?e.jsx(Tt,{size:o}):a==="plane"?e.jsx(dt,{size:o}):e.jsx(ea,{size:o})}function dr(a){const{theme:o,device:d,lang:t,params:n}=a,i=ae[o],r=d==="mobile",s=(n==null?void 0:n.kind)||"bus",[p,h]=b.useState("stops"),u=(w=16)=>({background:i.panel,border:`1px solid ${i.line}`,borderRadius:w,padding:16}),k=(s==="launch"&&(n!=null&&n.name)?{hero:`linear-gradient(135deg,${n.col||"#0c1a2e"},${n.col||"#0369a1"}aa)`,title:n.name,titleBn:n.nameBn||n.name,route:`${n.from||"Sadarghat"} → ${n.to||"Barisal"}`,routeBn:`${n.from||"সদরঘাট"} → ${n.to||"বরিশাল"}`,dep:n.dep||"8:00 PM",arr:n.arr||"6:00 AM",dur:n.dur||"10h",stats:[["৳"+(n.deck||"300"),"deck"],["৳"+(n.cabin||"1200"),"cabin"],["৳"+(n.vip||"4000"),"VIP"],[(n.rating||"4.1")+"★","rating"]]}:null)||{bus:{hero:"linear-gradient(135deg,#064e3b,#10b981)",title:"Green Line Paribahan",titleBn:"গ্রীন লাইন পরিবহন",route:"Gulshan → Motijheel",routeBn:"গুলশান → মতিঝিল",dep:"4:22 PM",arr:"5:10 PM",dur:"48 min",stats:[["12","stops"],["৳60","fare"],["AC","type"],["4.2★","rating"]]},train:{hero:"linear-gradient(135deg,#1e1b4b,#6d28d9)",title:"Cox's Bazar Express",titleBn:"কক্সবাজার এক্সপ্রেস",route:"Dhaka → Cox's Bazar",routeBn:"ঢাকা → কক্সবাজার",dep:"10:00 PM",arr:"7:00 AM",dur:"9h",stats:[["390km","distance"],["৳200+","fare"],["5 classes","coach"],["4.5★","rating"]]},plane:{hero:"linear-gradient(135deg,#1e3a8a,#6d28d9)",title:"BG-431 Biman Bangladesh",titleBn:"BG-431 বিমান বাংলাদেশ",route:"Dhaka → Cox's Bazar",routeBn:"ঢাকা → কক্সবাজার",dep:"8:00 AM",arr:"8:55 AM",dur:"55 min",stats:[["162","seats"],["৳4500","fare"],["2 classes","class"],["4.3★","rating"]]},launch:{hero:"linear-gradient(135deg,#0c1a2e,#0369a1)",title:"Sundarban-12",titleBn:"সুন্দরবন-১২",route:"Sadarghat → Barisal",routeBn:"সদরঘাট → বরিশাল",dep:"8:00 PM",arr:"6:00 AM",dur:"10h",stats:[["5 cabins","classes"],["৳300+","deck fare"],["Overnight","duration"],["4.3★","rating"]]}}[s],j=s==="launch"&&(n!=null&&n.from)?[{bn:n.from,en:n.from,t:n.dep||"8:00 PM",type:"boarding"},{bn:n.to||"Barisal",en:n.to||"Barisal",t:n.arr||"6:00 AM",type:"destination"}]:null,A={bus:[{bn:"গুলশান ২",en:"Gulshan 2",t:"4:22 PM",type:"boarding"},{bn:"বাড্ডা",en:"Badda",t:"4:31 PM"},{bn:"রামপুরা",en:"Rampura",t:"4:38 PM"},{bn:"মালিবাগ",en:"Malibagh",t:"4:45 PM"},{bn:"মতিঝিল",en:"Motijheel",t:"5:10 PM",type:"destination"}],train:[{bn:"ঢাকা",en:"Dhaka",t:"10:00 PM",type:"boarding"},{bn:"কুমিল্লা",en:"Comilla",t:"12:30 AM"},{bn:"চট্টগ্রাম",en:"Chittagong",t:"3:30 AM",type:"rest"},{bn:"কক্সবাজার",en:"Cox's Bazar",t:"7:00 AM",type:"destination"}],plane:[{bn:"হজরত শাহজালাল বিমানবন্দর",en:"Hazrat Shahjalal Airport",t:"8:00 AM",type:"boarding"},{bn:"কক্সবাজার বিমানবন্দর",en:"Cox's Bazar Airport",t:"8:55 AM",type:"destination"}],launch:j||[{bn:"সদরঘাট",en:"Sadarghat",t:"8:00 PM",type:"boarding"},{bn:"চাঁদপুর",en:"Chandpur",t:"11:30 PM"},{bn:"বরিশাল",en:"Barisal",t:"6:00 AM",type:"destination"}]},z={bus:[{e:"❄️",l:"AC"},{e:"🪑",l:"Recliner"},{e:"🔌",l:"Charger"},{e:"🚻",l:"Toilet"},{e:"🍿",l:"Snacks"},{e:"💧",l:"Water"},{e:"📶",l:"WiFi"},{e:"📺",l:"TV"}],train:[{e:"❄️",l:"AC"},{e:"🍽️",l:"Pantry"},{e:"🔌",l:"Charging"},{e:"🚻",l:"Toilet"},{e:"🛏️",l:"Bedding"},{e:"📶",l:"WiFi"},{e:"♿",l:"Wheelchair"},{e:"🕌",l:"Prayer"}],plane:[{e:"🧳",l:"15kg bag"},{e:"🍽️",l:"Meal"},{e:"🎬",l:"IFE"},{e:"🔌",l:"USB"},{e:"🛏️",l:"Blanket"},{e:"📍",l:"Extra legroom"}],launch:[{e:"❄️",l:"AC Cabin"},{e:"🍽️",l:"Restaurant"},{e:"📺",l:"TV"},{e:"🛟",l:"Life jackets"},{e:"🌙",l:"Overnight"},{e:"🌊",l:"River view"}]},C={bus:[{icon:"🌐",t:"greenlinebd.com"},{icon:"🏢",t:l(t,"সায়েদাবাদ কাউন্টার","Sayedabad counter")},{icon:"📞",t:"01700-000000"}],train:[{icon:"🌐",t:"eticket.railway.gov.bd"},{icon:"🏢",t:l(t,"কমলাপুর স্টেশন","Kamalapur Station")},{icon:"📞",t:"131"}],plane:[{icon:"🌐",t:"biman.com.bd / us-bangla.com"},{icon:"🏢",t:l(t,"শাহজালাল বিমানবন্দর","Shahjalal Airport")},{icon:"📞",t:"13600"}],launch:[{icon:"🌐",t:"biwtc.gov.bd"},{icon:"🏢",t:n!=null&&n.operator?l(t,n.operatorBn||n.operator,n.operator):l(t,"সদরঘাট টার্মিনাল","Sadarghat Terminal")},{icon:"📞",t:"16223"}]},I=[{key:"stops",label:l(t,"স্টপ","Stops")},{key:"seats",label:l(t,"আসন","Seats")},{key:"amenities",label:l(t,"সুবিধা","Amenities")},{key:"photos",label:l(t,"ছবি","Photos")},{key:"reviews",label:l(t,"রিভিউ","Reviews")}];return e.jsx(ne,{...a,children:e.jsxs("div",{style:{padding:r?"16px 16px 48px":"28px 40px 48px",maxWidth:1e3,margin:"0 auto"},children:[e.jsxs("div",{style:{background:k.hero,borderRadius:22,padding:r?18:24,marginBottom:20,color:"#fff",display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"},children:[e.jsxs("div",{style:{flex:1},children:[e.jsx("h2",{style:{fontFamily:m,fontWeight:700,fontSize:r?20:26,margin:"0 0 6px"},children:l(t,k.titleBn,k.title)}),e.jsx("div",{style:{fontFamily:m,fontSize:13,opacity:.85,marginBottom:12},children:l(t,k.routeBn,k.route)}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,marginBottom:12,flexWrap:"wrap"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:c,fontWeight:800,fontSize:16},children:k.dep}),e.jsx("div",{style:{fontFamily:c,fontSize:11,opacity:.7},children:l(t,"ছাড়বে","Departs")})]}),e.jsx("div",{style:{flex:1,height:2,background:"rgba(255,255,255,0.3)",borderRadius:999}}),e.jsx("div",{style:{fontFamily:c,fontSize:12,opacity:.7},children:k.dur}),e.jsx("div",{style:{flex:1,height:2,background:"rgba(255,255,255,0.3)",borderRadius:999}}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:c,fontWeight:800,fontSize:16},children:k.arr}),e.jsx("div",{style:{fontFamily:c,fontSize:11,opacity:.7},children:l(t,"পৌঁছাবে","Arrives")})]})]}),e.jsx("div",{style:{display:"flex",gap:10,flexWrap:"wrap"},children:k.stats.map(([w,D],B)=>e.jsxs("div",{style:{background:"rgba(255,255,255,0.15)",padding:"6px 12px",borderRadius:999},children:[e.jsx("span",{style:{fontFamily:c,fontWeight:800,fontSize:13},children:w}),e.jsx("span",{style:{fontFamily:c,fontSize:11,opacity:.8,marginLeft:4},children:D})]},B))})]}),!r&&e.jsx(lr,{kind:s,size:160})]}),e.jsx("div",{style:{display:"flex",gap:4,marginBottom:20,overflowX:"auto",padding:4,background:i.panelMuted,borderRadius:14},children:I.map(w=>e.jsx("button",{onClick:()=>h(w.key),style:{padding:"8px 14px",borderRadius:10,border:0,background:p===w.key?i.primary:"transparent",color:p===w.key?i.primaryInk:i.textDim,fontFamily:c,fontWeight:600,fontSize:13,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0},children:w.label},w.key))}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:r?"1fr":"1.4fr 1fr",gap:20},children:[e.jsxs("div",{children:[p==="stops"&&e.jsx("div",{style:{...u(18),marginBottom:16},children:A[s].map((w,D)=>e.jsxs("div",{style:{display:"flex",gap:14,paddingBottom:D<A[s].length-1?14:0,position:"relative"},children:[e.jsxs("div",{style:{width:20,flexShrink:0,display:"flex",justifyContent:"center",position:"relative"},children:[D<A[s].length-1&&e.jsx("div",{style:{position:"absolute",top:16,bottom:-4,width:2,background:i.primary,opacity:.3}}),e.jsx("div",{style:{width:w.type?16:10,height:w.type?16:10,borderRadius:999,marginTop:4,background:w.type==="boarding"?i.primary:w.type==="destination"?i.accent:w.type==="rest"?i.amber:i.panel,border:`2px solid ${w.type==="boarding"?i.primary:w.type==="destination"?i.accent:w.type==="rest"?i.amber:i.primary}`}})]}),e.jsxs("div",{style:{flex:1,display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{fontFamily:m,fontWeight:w.type?700:500,fontSize:14,color:i.text},children:l(t,w.bn,w.en)}),e.jsx("span",{style:{fontFamily:c,fontSize:12,color:i.textFaint},children:w.t})]})]},D))}),p==="amenities"&&e.jsx("div",{style:{...u(18),marginBottom:16},children:e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8},children:z[s].map((w,D)=>e.jsxs("div",{style:{background:i.panelMuted,borderRadius:12,padding:12,display:"flex",flexDirection:"column",alignItems:"center",gap:6},children:[e.jsx("span",{style:{fontSize:22},children:w.e}),e.jsx("span",{style:{fontFamily:c,fontSize:11,color:i.textDim,textAlign:"center"},children:w.l})]},D))})}),p==="seats"&&e.jsxs("div",{style:{...u(18),marginBottom:16},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:15,color:i.text,marginBottom:12},children:l(t,"আসন মানচিত্র","Seat map")}),s==="bus"&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:6},children:[Array.from({length:10},(w,D)=>e.jsxs("div",{style:{display:"flex",gap:4,justifyContent:"center",alignItems:"center"},children:[["A","B"].map(B=>e.jsx("span",{style:{width:24,height:24,borderRadius:4,background:D<3?"#6b7280":D===5?i.accentSoft:i.primarySoft,border:`1px solid ${D<3?"#6b7280":D===5?i.accent:i.primary}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:c,fontSize:9,color:D<3?"#fff":D===5?i.accent:i.primary,fontWeight:700},children:B},B)),e.jsx("span",{style:{width:14}}),["C","D"].map(B=>e.jsx("span",{style:{width:24,height:24,borderRadius:4,background:i.primarySoft,border:`1px solid ${i.primary}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:c,fontSize:9,color:i.primary,fontWeight:700},children:B},B))]},D)),e.jsx("div",{style:{display:"flex",gap:10,marginTop:10,flexWrap:"wrap"},children:[{c:i.primarySoft,b:i.primary,l:l(t,"উপলব্ধ","Available")},{c:"#6b728020",b:"#6b7280",l:l(t,"বুকড","Booked")},{c:i.accentSoft,b:i.accent,l:l(t,"মহিলা","Ladies")}].map((w,D)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx("span",{style:{width:16,height:16,borderRadius:4,background:w.c,border:`1px solid ${w.b}`,display:"block"}}),e.jsx("span",{style:{fontFamily:c,fontSize:11,color:i.textFaint},children:w.l})]},D))})]}),s!=="bus"&&e.jsx("div",{style:{fontFamily:m,fontSize:13,color:i.textDim},children:l(t,"আসন তথ্য অপারেটরের ওয়েবসাইটে পাওয়া যাবে।","Seat info available at operator website.")}),e.jsxs("div",{style:{marginTop:12,padding:10,background:i.amberSoft,borderRadius:10,fontFamily:m,fontSize:12,color:i.amber},children:["ℹ️ ",l(t,"কই যাবো টিকেট বিক্রি করে না।","KoyJabo doesn't sell tickets — info only.")]})]}),(p==="photos"||p==="reviews")&&e.jsx("div",{style:{...u(18),marginBottom:16},children:p==="photos"?e.jsx("div",{children:e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8},children:[[["#10b981","#064e3b"],["#3b82f6","#1e3a8a"],["#f59e0b","#b45309"],["#ef4444","#991b1b"]].map(([w,D],B)=>e.jsx("div",{style:{aspectRatio:"4/3",borderRadius:12,background:`linear-gradient(135deg,${w},${D})`}},B)),e.jsx("div",{style:{aspectRatio:"4/3",borderRadius:12,background:i.panelMuted,border:`2px dashed ${i.line}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,cursor:"pointer"},children:"+"})]})}):e.jsx("div",{children:[{name:"Rahim",r:5,t:l(t,"দুর্দান্ত সার্ভিস!","Excellent service!")},{name:"Karim",r:4,t:l(t,"ভালো ছিল।","Was good.")},{name:"Sara",r:4,t:l(t,"সময়মতো।","On time.")}].map((w,D)=>e.jsxs("div",{style:{paddingBottom:12,marginBottom:12,borderBottom:`1px solid ${i.line}`},children:[e.jsxs("div",{style:{display:"flex",gap:8,marginBottom:6},children:[e.jsx("div",{style:{width:28,height:28,borderRadius:999,background:i.primarySoft,color:i.primary,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:c,fontWeight:700,fontSize:12},children:w.name[0]}),e.jsx("span",{style:{fontFamily:c,fontWeight:600,fontSize:13,color:i.text},children:w.name}),e.jsx("span",{style:{color:"#f59e0b"},children:"★".repeat(w.r)})]}),e.jsx("div",{style:{fontFamily:m,fontSize:13,color:i.textDim},children:w.t})]},D))})}),e.jsx(ee,{tk:i,lang:t,kind:r?"mob-banner":"leaderboard"})]}),!r&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[e.jsxs("div",{style:{...u(16),background:k.hero.split(",")[0].replace("linear-gradient(135deg","linear-gradient(135deg,#0a0a1a"),color:"#fff",border:"none"},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:15,marginBottom:12},children:l(t,"টিকেট কোথায় পাবেন","Where to buy")}),C[s].map((w,D)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,0.12)"},children:[e.jsx("span",{children:w.icon}),e.jsx("span",{style:{fontFamily:m,fontSize:13,opacity:.9},children:w.t})]},D)),e.jsxs("p",{style:{fontFamily:m,fontSize:11,opacity:.7,marginTop:10},children:["ℹ️ ",l(t,"শুধু তথ্য · টিকেট বিক্রয় নেই।","Info only · no ticket sales.")]})]}),e.jsx(ee,{tk:i,lang:t,kind:"mid-rect"})]})]})]})})}function cr(a){const{theme:o,device:d,lang:t}=a,n=ae[o],i=d==="mobile",[r,s]=b.useState(0),[p,h]=b.useState(0),[u,f]=b.useState({Comfort:0,Punctuality:0,Cleanliness:0,Value:0,Safety:0}),[v,k]=b.useState([]),[j,A]=b.useState(""),[z,C]=b.useState(!1),I=(B=16)=>({background:n.panel,border:`1px solid ${n.line}`,borderRadius:B,padding:16}),w=[l(t,"পরিষ্কার","Clean"),l(t,"AC ভালো","AC works"),l(t,"আরামদায়ক","Comfortable"),l(t,"সময়মতো","On-time"),l(t,"নিরাপদ","Safe"),l(t,"বন্ধুত্বপূর্ণ স্টাফ","Friendly staff"),l(t,"মূল্যমান ভালো","Good value"),l(t,"সুপারিশযোগ্য","Recommended")];function D(B){k(H=>H.includes(B)?H.filter(U=>U!==B):[...H,B])}return e.jsx(ne,{...a,children:e.jsxs("div",{style:{padding:i?"16px 16px 48px":"28px 40px 48px",maxWidth:600,margin:"0 auto"},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:18,color:n.text,marginBottom:20},children:l(t,"গ্রীন লাইন পরিবহন রেটিং","Rate Green Line Paribahan")}),e.jsxs("div",{style:{...I(18),marginBottom:16,display:"flex",flexDirection:"column",alignItems:"center",gap:14},children:[e.jsx("div",{style:{fontFamily:m,fontSize:14,color:n.textDim},children:l(t,"সামগ্রিক রেটিং","Overall rating")}),e.jsx("div",{style:{display:"flex",gap:8},children:[1,2,3,4,5].map(B=>e.jsx("span",{onClick:()=>s(B),onMouseEnter:()=>h(B),onMouseLeave:()=>h(0),style:{fontSize:36,cursor:"pointer",color:(p||r)>=B?"#f59e0b":n.textFaint,transition:"color .1s"},children:"★"},B))}),(p||r)>0&&e.jsx("div",{style:{fontFamily:m,fontSize:13,color:n.primary},children:[l(t,"খুব খারাপ","Very poor"),l(t,"খারাপ","Poor"),l(t,"ঠিক আছে","OK"),l(t,"ভালো","Good"),l(t,"দুর্দান্ত","Excellent")][(p||r)-1]})]}),e.jsxs("div",{style:{...I(18),marginBottom:16},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:n.text,marginBottom:12},children:l(t,"বিস্তারিত রেটিং","Aspect ratings")}),Object.keys(u).map(B=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:10},children:[e.jsx("span",{style:{fontFamily:c,fontSize:12,color:n.textDim,width:90,flexShrink:0},children:B}),e.jsx("div",{style:{display:"flex",gap:4},children:[1,2,3,4,5].map(H=>e.jsx("span",{onClick:()=>f(U=>({...U,[B]:H})),style:{fontSize:18,cursor:"pointer",color:u[B]>=H?"#f59e0b":n.textFaint},children:"★"},H))})]},B))]}),e.jsxs("div",{style:{...I(18),marginBottom:16},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:n.text,marginBottom:12},children:l(t,"আপনার অভিজ্ঞতা","Your experience")}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:w.map(B=>e.jsx("button",{onClick:()=>D(B),style:{padding:"6px 12px",borderRadius:999,border:`1px solid ${v.includes(B)?n.primary:n.line}`,background:v.includes(B)?n.primarySoft:"transparent",color:v.includes(B)?n.primary:n.textDim,fontFamily:m,fontSize:12,cursor:"pointer"},children:B},B))})]}),e.jsxs("div",{style:{...I(18),marginBottom:16},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:n.text,marginBottom:12},children:l(t,"ছবি আপলোড","Upload photos")}),e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[[["#10b981","#064e3b"],["#3b82f6","#1e3a8a"]].map(([B,H],U)=>e.jsx("div",{style:{width:70,height:70,borderRadius:12,background:`linear-gradient(135deg,${B},${H})`,position:"relative",cursor:"pointer"},children:e.jsx("button",{style:{position:"absolute",top:-6,right:-6,width:20,height:20,borderRadius:999,background:n.accent,color:"#fff",border:0,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",padding:0},children:"✕"})},U)),e.jsxs("div",{style:{width:70,height:70,borderRadius:12,background:n.panelMuted,border:`2px dashed ${n.line}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,cursor:"pointer",position:"relative"},children:[e.jsx("div",{style:{width:70,height:70,borderRadius:12,background:`conic-gradient(${n.primary} 72%, transparent 0)`,position:"absolute",inset:0,opacity:.3}}),e.jsx("span",{style:{fontFamily:c,fontSize:11,color:n.textFaint,position:"relative"},children:"72%"})]}),e.jsx("div",{style:{width:70,height:70,borderRadius:12,background:n.panelMuted,border:`2px dashed ${n.line}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,cursor:"pointer",color:n.textFaint},children:"+"})]})]}),e.jsxs("div",{style:{...I(18),marginBottom:16},children:[e.jsx("textarea",{value:j,onChange:B=>A(B.target.value.slice(0,500)),placeholder:l(t,"আপনার রিভিউ লিখুন... (সর্বোচ্চ ৫০০ অক্ষর)","Write your review... (max 500 chars)"),style:{width:"100%",minHeight:100,background:"transparent",border:0,color:n.text,fontFamily:m,fontSize:14,lineHeight:1.6,outline:"none",resize:"none",boxSizing:"border-box"}}),e.jsxs("div",{style:{fontFamily:c,fontSize:11,color:n.textFaint,textAlign:"right"},children:[j.length,"/500"]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20},children:[e.jsx("div",{onClick:()=>C(B=>!B),style:{width:36,height:22,borderRadius:999,background:z?n.primary:n.line,position:"relative",cursor:"pointer",transition:"background .2s"},children:e.jsx("div",{style:{position:"absolute",top:2,left:z?16:2,width:18,height:18,borderRadius:999,background:"#fff",transition:"left .2s",boxShadow:"0 1px 3px rgba(0,0,0,0.3)"}})}),e.jsx("span",{style:{fontFamily:m,fontSize:13,color:n.text},children:l(t,"বেনামে পোস্ট করুন","Post anonymously")})]}),e.jsx("button",{style:{width:"100%",background:n.primary,color:n.primaryInk,border:0,borderRadius:14,padding:"14px 20px",fontFamily:m,fontWeight:700,fontSize:16,cursor:"pointer",boxShadow:`0 6px 16px -6px ${n.primary}`},children:l(t,"রিভিউ পোস্ট করুন","Post Review")})]})})}const it=["Uttara North","Uttara Center","Uttara South","Pallabi","Mirpur 11","Mirpur 10","Kazipara","Shewrapara","Agargaon","Bijoy Sarani","Farmgate","Karwan Bazar","Shahbag","Dhaka University","Secretariat","Motijheel","Kamalapur"],za=[20,30,40,50,60,70,80,80,90,90,90,100,100,100,100,100];function hr(a){const{theme:o,device:d,lang:t}=a,n=ae[o],i=d==="mobile",r=(v=16)=>({background:n.panel,border:`1px solid ${n.line}`,borderRadius:v,padding:16}),[s,p]=b.useState(""),[h,u]=b.useState(""),f=s&&h?(()=>{const v=it.indexOf(s),k=it.indexOf(h);return v>=0&&k>=0?za[Math.abs(v-k)-1]||100:null})():null;return e.jsx(ne,{...a,children:e.jsxs("div",{style:{padding:i?"16px 16px 48px":"28px 40px 48px",maxWidth:700,margin:"0 auto"},children:[e.jsxs("div",{style:{background:n.metroBg,borderRadius:22,padding:i?18:24,marginBottom:20,color:"#fff"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:10},children:[e.jsx("div",{style:{width:44,height:44,borderRadius:12,background:n.primary,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:c,fontWeight:800,fontSize:15},children:"M6"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,fontWeight:700,letterSpacing:1.3,color:"#7fb89c",textTransform:"uppercase"},children:l(t,"একক যাত্রা","Single Journey")}),e.jsx("h2",{style:{fontFamily:m,fontWeight:700,fontSize:20,margin:0},children:l(t,"একক যাত্রা টোকেন","Single Journey Token")})]})]}),e.jsx("p",{style:{fontFamily:m,fontSize:14,opacity:.85,margin:0},children:l(t,"যেকোনো একটি যাত্রায় ট্যাপ করুন","Tap and ride any single journey")})]}),e.jsxs("div",{style:{...r(18),marginBottom:16},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:15,color:n.text,marginBottom:14},children:l(t,"ভাড়া হিসাব করুন","Calculate fare")}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:c,fontSize:10,fontWeight:700,color:n.textFaint,letterSpacing:1.2,textTransform:"uppercase",marginBottom:6},children:l(t,"কোথা থেকে","From")}),e.jsxs("select",{value:s,onChange:v=>p(v.target.value),style:{width:"100%",background:n.inputBg,border:`1px solid ${n.line}`,borderRadius:10,padding:"10px 12px",color:n.text,fontFamily:m,fontSize:13,outline:"none"},children:[e.jsx("option",{value:"",children:l(t,"স্টেশন বেছে নিন","Select station")}),it.map(v=>e.jsx("option",{children:v},v))]})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:c,fontSize:10,fontWeight:700,color:n.textFaint,letterSpacing:1.2,textTransform:"uppercase",marginBottom:6},children:l(t,"কোথায়","To")}),e.jsxs("select",{value:h,onChange:v=>u(v.target.value),style:{width:"100%",background:n.inputBg,border:`1px solid ${n.line}`,borderRadius:10,padding:"10px 12px",color:n.text,fontFamily:m,fontSize:13,outline:"none"},children:[e.jsx("option",{value:"",children:l(t,"স্টেশন বেছে নিন","Select station")}),it.map(v=>e.jsx("option",{children:v},v))]})]})]}),f&&e.jsxs("div",{style:{background:n.primarySoft,borderRadius:14,padding:16,textAlign:"center"},children:[e.jsxs("div",{style:{fontFamily:c,fontWeight:800,fontSize:32,color:n.primary},children:["৳ ",f]}),e.jsxs("div",{style:{fontFamily:m,fontSize:13,color:n.textDim},children:[s," → ",h]})]})]}),e.jsxs("div",{style:{...r(18),marginBottom:16},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:15,color:n.text,marginBottom:12},children:l(t,"ভাড়ার তালিকা","Fare table")}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:it.slice(1).map((v,k)=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"8px 10px",borderRadius:10,background:n.panelMuted},children:[e.jsxs("span",{style:{fontFamily:c,fontSize:12,color:n.textDim},children:["Uttara N → ",v]}),e.jsxs("span",{style:{fontFamily:c,fontWeight:700,fontSize:12,color:n.primary},children:["৳",za[k]]})]},v))})]}),e.jsxs("div",{style:{...r(18),marginBottom:16},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:15,color:n.text,marginBottom:14},children:l(t,"কীভাবে টোকেন কিনবেন","How to buy token")}),[{e:"🏧",t:l(t,"টোকেন ভেন্ডিং মেশিন বা কাউন্টারে যান","Go to token vending machine or counter")},{e:"🖥️",t:l(t,"গন্তব্য স্টেশন বেছে নিন","Select your destination station")},{e:"💳",t:l(t,"নগদ বা কার্ডে পেমেন্ট করুন","Pay with cash or card")},{e:"🎫",t:l(t,"টোকেন নিন, গেটে ট্যাপ করুন","Collect token, tap at gate")}].map((v,k)=>e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center",padding:"10px 0",borderBottom:k<3?`1px solid ${n.line}`:"none"},children:[e.jsx("div",{style:{width:36,height:36,borderRadius:10,background:n.primarySoft,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0},children:v.e}),e.jsx("span",{style:{fontFamily:m,fontSize:13,color:n.text},children:v.t})]},k))]}),e.jsxs("div",{style:{...r(18),marginBottom:16},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:15,color:n.text,marginBottom:12},children:l(t,"জানা ভালো","Good to know")}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:i?"1fr":"1fr 1fr",gap:10},children:[{e:"⏱️",t:l(t,"টোকেন মাত্র ৯০ মিনিট বৈধ","Token valid for 90 minutes only")},{e:"🚫",t:l(t,"বের হওয়ার পর পুনরায় প্রবেশ নেই","No re-entry after exit")},{e:"💰",t:l(t,"হারানো টোকেন = পূর্ণ ভাড়া","Lost token = full fare again")},{e:"👶",t:l(t,"৩ বছরের নিচে শিশু: বিনামূল্যে","Children under 3: free")}].map((v,k)=>e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"flex-start",padding:10,background:n.panelMuted,borderRadius:12},children:[e.jsx("span",{style:{fontSize:18},children:v.e}),e.jsx("span",{style:{fontFamily:m,fontSize:12,color:n.textDim,lineHeight:1.5},children:v.t})]},k))})]}),e.jsx(ee,{tk:n,lang:t,kind:i?"mob-banner":"leaderboard"})]})})}function pr(a){const{theme:o,device:d,lang:t}=a,n=ae[o],i=d==="mobile",r=(p=16)=>({background:n.panel,border:`1px solid ${n.line}`,borderRadius:p,padding:16}),s=[{l:"Standard",bn:"স্ট্যান্ডার্ড",c:"#3b82f6",dep:"৳100",min:"৳100",disc:l(t,"১০% ছাড়","10% discount"),desc:l(t,"সকলের জন্য","For everyone")},{l:"Student",bn:"স্টুডেন্ট",c:"#10b981",dep:"৳100",min:"৳50",disc:l(t,"২৫% ছাড়","25% discount"),desc:l(t,"ছাত্র আইডি প্রয়োজন","Student ID required")},{l:"Senior",bn:"সিনিয়র",c:"#f59e0b",dep:"৳100",min:"৳50",disc:l(t,"৫০% ছাড়","50% discount"),desc:l(t,"বয়স্ক আইডি প্রয়োজন","Senior ID required")}];return e.jsx(ne,{...a,children:e.jsxs("div",{style:{padding:i?"16px 16px 48px":"28px 40px 48px",maxWidth:700,margin:"0 auto"},children:[e.jsxs("div",{style:{background:"linear-gradient(135deg,#000814,#0369a1)",borderRadius:22,padding:i?18:24,marginBottom:20,color:"#fff"},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:22,marginBottom:6},children:l(t,"এমআরটি র‍্যাপিড পাস","MRT Rapid Pass")}),e.jsx("p",{style:{fontFamily:m,fontSize:14,opacity:.85,margin:0},children:l(t,"প্রতিদিনের মেট্রো যাত্রায় সাশ্রয়ী","Save on your daily metro commute")})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12,marginBottom:20},children:s.map((p,h)=>e.jsxs("div",{style:{...r(16),borderLeft:`4px solid ${p.c}`},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{fontFamily:m,fontWeight:700,fontSize:15,color:n.text},children:[l(t,p.bn,p.l)," Pass"]}),e.jsx("div",{style:{fontFamily:m,fontSize:12,color:n.textDim},children:p.desc})]}),e.jsx("div",{style:{background:p.c+"22",padding:"6px 12px",borderRadius:10,fontFamily:c,fontWeight:700,fontSize:13,color:p.c},children:p.disc})]}),e.jsxs("div",{style:{display:"flex",gap:16},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:c,fontSize:10,color:n.textFaint,textTransform:"uppercase",letterSpacing:1},children:l(t,"ডিপোজিট","Deposit")}),e.jsx("div",{style:{fontFamily:c,fontWeight:700,fontSize:15,color:n.text},children:p.dep})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:c,fontSize:10,color:n.textFaint,textTransform:"uppercase",letterSpacing:1},children:l(t,"সর্বনিম্ন ব্যালেন্স","Min balance")}),e.jsx("div",{style:{fontFamily:c,fontWeight:700,fontSize:15,color:n.text},children:p.min})]})]})]},h))}),e.jsxs("div",{style:{...r(18),marginBottom:16},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:15,color:n.text,marginBottom:14},children:l(t,"কীভাবে পাবেন","How to get Rapid Pass")}),[{e:"🚇",t:l(t,"যেকোনো MRT-6 স্টেশনের কাউন্টারে যান","Visit any MRT-6 station counter")},{e:"🪪",t:l(t,"বৈধ ছবি সহ আইডি দিন","Present valid photo ID")},{e:"💳",t:l(t,"৳১০০ ডিপোজিট + সর্বনিম্ন ব্যালেন্স দিন","Pay ৳100 deposit + minimum balance")},{e:"✅",t:l(t,"কার্ড তাৎক্ষণিকভাবে দেওয়া হবে","Card issued immediately")}].map((p,h)=>e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center",padding:"10px 0",borderBottom:h<3?`1px solid ${n.line}`:"none"},children:[e.jsx("div",{style:{width:36,height:36,borderRadius:10,background:n.primarySoft,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0},children:p.e}),e.jsx("span",{style:{fontFamily:m,fontSize:13,color:n.text},children:p.t})]},h))]}),e.jsxs("div",{style:{...r(18),marginBottom:16},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:15,color:n.text,marginBottom:12},children:l(t,"সুবিধাসমূহ","Benefits")}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:i?"1fr 1fr":"repeat(4,1fr)",gap:10},children:[{e:"💸",l:l(t,"১০% ছাড়","10% discount")},{e:"⚡",l:l(t,"লাইন নেই","No queuing")},{e:"📱",l:l(t,"কন্টাক্টলেস","Contactless")},{e:"🔄",l:l(t,"রিলোড করুন","Reloadable")}].map((p,h)=>e.jsxs("div",{style:{background:n.panelMuted,borderRadius:12,padding:12,display:"flex",flexDirection:"column",alignItems:"center",gap:6,textAlign:"center"},children:[e.jsx("span",{style:{fontSize:22},children:p.e}),e.jsx("span",{style:{fontFamily:m,fontSize:12,color:n.textDim},children:p.l})]},h))})]}),e.jsxs("div",{style:{...r(16),marginBottom:20},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:n.text,marginBottom:10},children:l(t,"রিলোড করার উপায়","Reload options")}),e.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[l(t,"স্টেশন কাউন্টার","Station counter"),"bKash","Nagad",l(t,"ব্যাংকিং অ্যাপ","Banking app")].map((p,h)=>e.jsx("span",{style:{padding:"6px 12px",borderRadius:999,background:n.chipBg,color:n.chipText,fontFamily:c,fontWeight:600,fontSize:12},children:p},h))})]}),e.jsx(ee,{tk:n,lang:t,kind:i?"mob-banner":"leaderboard"})]})})}function Pe({tk:a,lang:o,open:d,title:t,message:n,confirmLabel:i,onConfirm:r,onClose:s}){if(!d)return null;const p=l(o,"বাতিল","Cancel"),h=i??l(o,"নিশ্চিত করুন","Confirm");return e.jsx("div",{style:{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.55)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",padding:16},onClick:s,children:e.jsxs("div",{style:{background:a.panel,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:`1px solid ${a.line}`,borderRadius:16,padding:"28px 24px 24px",maxWidth:400,width:"100%",boxSizing:"border-box",boxShadow:a.shadowLg},onClick:u=>u.stopPropagation(),children:[e.jsx("h3",{style:{margin:"0 0 10px",fontFamily:o==="bn"?m:c,fontSize:17,fontWeight:700,color:a.text,lineHeight:1.3},children:t}),e.jsx("p",{style:{margin:"0 0 24px",fontFamily:o==="bn"?m:c,fontSize:14,color:a.textDim,lineHeight:1.6},children:n}),e.jsxs("div",{style:{display:"flex",gap:10,justifyContent:"flex-end"},children:[e.jsx("button",{onClick:s,style:{background:a.panelMuted,border:`1px solid ${a.line}`,borderRadius:999,padding:"9px 18px",fontFamily:c,fontSize:13,fontWeight:600,color:a.textDim,cursor:"pointer"},children:p}),e.jsx("button",{onClick:r,style:{background:a.accentSoft,border:`1px solid ${a.accent}`,borderRadius:999,padding:"9px 18px",fontFamily:c,fontSize:13,fontWeight:700,color:a.accent,cursor:"pointer"},children:h})]})]})})}const ur=[{icon:e.jsx(te.bell,{s:16}),label:"Notifications",labelBn:"নোটিফিকেশন",sub:"Delays, deals",subBn:"বিলম্ব, অফার",route:"settings"},{icon:e.jsx(te.globe,{s:16}),label:"Language",labelBn:"ভাষা",sub:"English",subBn:"বাংলা",route:"settings"},{icon:e.jsx(te.moon,{s:16}),label:"Theme",labelBn:"থিম",sub:"Dark mode",subBn:"ডার্ক মোড",route:"settings"},{icon:e.jsx(te.download,{s:16}),label:"Offline data",labelBn:"অফলাইন ডেটা",sub:"124 MB",subBn:"১২৪ এমবি",route:"settings"},{icon:e.jsx(te.user,{s:16}),label:"Privacy",labelBn:"গোপনীয়তা",sub:"Location sharing",subBn:"লোকেশন শেয়ার",route:"settings"}];function mr(a){const{theme:o,device:d,lang:t,onNav:n}=a,i=ae[o],r=d==="mobile",s=(C,I)=>l(t,I,C),p=t==="bn"?m:c,[h,u]=b.useState(!1),f=Te(),v=Ce(),k=Le().length,j=[...(v.routeSearches||[]).map(C=>({type:s("Route search","রুট সার্চ"),title:`${C.from||s("Any","যেকোনো")} → ${C.to||s("Any","যেকোনো")}`,time:C.timestamp})),...(v.busSearches||[]).map(C=>({type:s("Bus opened","বাস দেখা"),title:C.busName,time:C.timestamp})),...(v.trainSearches||[]).map(C=>({type:s("Train search","ট্রেন সার্চ"),title:`${C.trainName} · ${C.from} → ${C.to}`,time:C.timestamp})),...(v.intercitySearches||[]).map(C=>({type:s("Intercity search","আন্তঃজেলা সার্চ"),title:`${C.from} → ${C.to}`,time:C.timestamp}))].sort((C,I)=>I.time-C.time).slice(0,5),A={background:i.panel,border:`1px solid ${i.line}`,borderRadius:16,overflow:"hidden"},z=[{label:s("Searches","সার্চ"),value:String(j.length)},{label:s("Favorites","প্রিয়"),value:String(k)},{label:s("Buses opened","বাস দেখা"),value:String((v.busSearches||[]).length)},{label:s("Routes searched","রুট সার্চ"),value:String((v.routeSearches||[]).length)}];return e.jsxs(ne,{...a,canBack:!1,children:[e.jsxs("div",{style:{padding:r?"16px 12px 100px":"24px 40px 60px"},children:[e.jsxs("div",{style:{background:i.panel,border:`1px solid ${i.line}`,borderRadius:22,padding:r?18:24,marginBottom:24,display:"flex",flexDirection:r?"column":"row",alignItems:r?"flex-start":"center",gap:18,position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:-30,right:-40,width:200,height:200,borderRadius:999,background:`radial-gradient(circle, ${i.primarySoft}, transparent 70%)`,pointerEvents:"none"}}),f!=null&&f.avatarUrl?e.jsx("img",{src:f.avatarUrl,alt:"avatar",style:{width:76,height:76,borderRadius:999,objectFit:"cover",flexShrink:0,boxShadow:`0 0 24px ${i.primary}44`,border:`3px solid ${i.primarySoft}`}}):e.jsx("div",{style:{width:76,height:76,borderRadius:999,flexShrink:0,background:`linear-gradient(135deg, ${i.primary}, ${i.primaryDeep})`,color:i.primaryInk,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:c,fontWeight:800,fontSize:28,boxShadow:`0 0 24px ${i.primary}44`},children:((f==null?void 0:f.displayName)||(f==null?void 0:f.username)||"KJ").slice(0,2).toUpperCase()}),e.jsxs("div",{style:{flex:1,position:"relative",minWidth:0},children:[e.jsx("div",{style:{fontFamily:p,fontWeight:700,fontSize:22,color:i.text,letterSpacing:-.4},children:(f==null?void 0:f.displayName)||(f==null?void 0:f.username)||s("Guest user","অতিথি ব্যবহারকারী")}),e.jsx("div",{style:{fontFamily:c,fontSize:13,color:i.textDim,marginTop:4},children:f?`@${f.username}`:s("Sign in to sync your profile data","প্রোফাইল ডেটা সিঙ্ক করতে সাইন ইন করুন")}),e.jsx("div",{style:{display:"flex",gap:r?16:28,marginTop:14,flexWrap:"wrap"},children:z.map(C=>e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:c,fontWeight:800,fontSize:20,color:i.text,letterSpacing:-.5},children:C.value}),e.jsx("div",{style:{fontFamily:c,fontSize:10,fontWeight:700,color:i.textFaint,letterSpacing:1.2,textTransform:"uppercase",marginTop:2},children:C.label})]},C.label))})]}),e.jsx("button",{onClick:()=>n("edit-profile"),style:{background:i.panelMuted,border:`1px solid ${i.line}`,borderRadius:10,padding:"10px 18px",fontFamily:c,fontWeight:600,fontSize:13,color:i.text,cursor:"pointer",flexShrink:0},children:s("Edit profile","প্রোফাইল সম্পাদনা")})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:r?"1fr":"1.5fr 1fr",gap:24},children:[e.jsxs("div",{children:[e.jsx(_e,{tk:i,lang:t,title:s("Recent activity","সাম্প্রতিক কার্যকলাপ")}),e.jsx("div",{style:A,children:j.length>0?j.map((C,I)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",borderTop:I?`1px solid ${i.line}`:""},children:[e.jsx("div",{style:{width:42,height:42,borderRadius:10,background:i.panelMuted,border:`1px solid ${i.line}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0},children:e.jsx("span",{style:{fontFamily:c,fontSize:16,fontWeight:800,color:i.text,lineHeight:1},children:"•"})}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:p,fontWeight:600,fontSize:14,color:i.text},children:C.title}),e.jsx("div",{style:{fontFamily:c,fontSize:11,color:i.textFaint,marginTop:3},children:C.type})]}),e.jsx("div",{style:{fontFamily:c,fontSize:11,color:i.textFaint},children:new Date(C.time).toLocaleDateString(t==="bn"?"bn-BD":"en-US")})]},I)):e.jsx("div",{style:{padding:24,textAlign:"center",fontFamily:p,color:i.textDim,fontSize:14},children:s("No real activity yet. Searches and saved buses will appear here.","এখনো কোনো আসল কার্যকলাপ নেই। সার্চ ও সেভ করা বাস এখানে দেখা যাবে।")})}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginTop:20},children:[{icon:"❤",label:s("Favorites","প্রিয়"),route:"favorites"},{icon:"📊",label:s("History","ইতিহাস"),route:"history"},{icon:"⚙",label:s("Settings","সেটিংস"),route:"settings"},{icon:"🚪",label:s("Sign out","সাইন আউট"),route:""}].map(C=>e.jsxs("button",{onClick:()=>C.route?n(C.route):u(!0),style:{background:i.panel,border:`1px solid ${i.line}`,borderRadius:14,padding:"14px 6px",display:"flex",flexDirection:"column",alignItems:"center",gap:7,cursor:"pointer"},children:[e.jsx("span",{style:{fontSize:22},children:C.icon}),e.jsx("span",{style:{fontFamily:p,fontSize:11,color:i.textDim,fontWeight:600},children:C.label})]},C.label))})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx("div",{style:A,children:ur.map((C,I)=>e.jsxs("button",{onClick:()=>n(C.route),style:{width:"100%",background:"none",border:"none",borderTop:I?`1px solid ${i.line}`:"",display:"flex",alignItems:"center",gap:12,padding:"12px 14px",cursor:"pointer",textAlign:"left"},children:[e.jsx("div",{style:{width:32,height:32,borderRadius:8,background:i.chipBg,color:i.text,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:C.icon}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:p,fontWeight:600,fontSize:13,color:i.text},children:s(C.label,C.labelBn)}),e.jsx("div",{style:{fontFamily:c,fontSize:11,color:i.textFaint,marginTop:1},children:s(C.sub,C.subBn)})]}),e.jsx(te.arrowR,{s:14})]},I))}),e.jsx("div",{style:A,children:[{label:s("Edit profile","প্রোফাইল সম্পাদনা"),route:"edit-profile",icon:"👤"},{label:s("Password & security","পাসওয়ার্ড ও নিরাপত্তা"),route:"password",icon:"🔐"},{label:s("Devices","ডিভাইস"),route:"devices",icon:"📱"},{label:s("Sign out","সাইন আউট"),route:"__signout",icon:"🚪",danger:!0}].map((C,I)=>e.jsxs("button",{onClick:()=>C.route==="__signout"?u(!0):n(C.route),style:{display:"flex",alignItems:"center",gap:12,padding:"13px 14px",background:"none",border:"none",borderTop:I?`1px solid ${i.line}`:"",cursor:"pointer",textAlign:"left",width:"100%"},children:[e.jsx("span",{style:{fontSize:18},children:C.icon}),e.jsx("span",{style:{flex:1,fontFamily:p,fontSize:14,color:C.danger?i.accent:i.text,fontWeight:500},children:C.label}),!C.danger&&e.jsx(te.arrowR,{s:14})]},C.label))}),e.jsx(ee,{tk:i,lang:t,kind:"mid-rect"})]})]})]}),e.jsx(Pe,{tk:i,lang:t,open:h,title:s("Sign out?","সাইন আউট করবেন?"),message:s("You will be signed out of your account.","আপনি আপনার অ্যাকাউন্ট থেকে সাইন আউট হয়ে যাবেন।"),confirmLabel:s("Sign out","সাইন আউট"),onConfirm:()=>{u(!1),n("signin")},onClose:()=>u(!1)})]})}function gr(a){const{theme:o,device:d,lang:t,onNav:n}=a,i=ae[o],r=d==="mobile",s=(w,D)=>l(t,D,w),p=t==="bn"?m:c,h={background:i.panel,border:`1px solid ${i.line}`,borderRadius:16,padding:16},[u,f]=b.useState("All"),[v,k]=b.useState(()=>Le()),[j,A]=b.useState(null);b.useEffect(()=>{const w=()=>k(Le());return window.addEventListener("koyjabo:favorites-changed",w),window.addEventListener("storage",w),()=>{window.removeEventListener("koyjabo:favorites-changed",w),window.removeEventListener("storage",w)}},[]);const z=b.useMemo(()=>v.map(w=>pe.find(D=>D.id===w)).filter(w=>!!w),[v]),C=z,I=w=>{const D=v.filter(B=>B!==w);Ga(D),k(D),A(null)};return e.jsxs(ne,{...a,canBack:!0,children:[e.jsxs("div",{style:{maxWidth:r?"100%":760,margin:"0 auto",padding:r?"16px 12px 100px":"32px 16px 60px",display:"flex",flexDirection:"column",gap:20},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[e.jsx("h1",{style:{margin:0,fontFamily:p,fontWeight:700,fontSize:24,color:i.text},children:s("Favorites","প্রিয়")}),e.jsx("div",{style:{background:i.primarySoft,border:`1px solid ${i.primary}44`,borderRadius:999,padding:"2px 10px",fontFamily:c,fontWeight:700,fontSize:13,color:i.primary},children:z.length})]}),e.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:["All","Bus"].map(w=>e.jsx("button",{onClick:()=>f(w),style:{background:u===w?i.primarySoft:i.panelMuted,border:`1px solid ${u===w?i.primary:i.line}`,borderRadius:999,padding:"6px 14px",fontFamily:p,fontWeight:600,fontSize:12,color:u===w?i.primary:i.textDim,cursor:"pointer"},children:s(w,w==="All"?"সব":"বাস")},w))}),C.length>0?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:C.map(w=>{const D=w.name.split(" ").map(B=>B[0]).join("").slice(0,2).toUpperCase();return e.jsxs("div",{style:{...h,padding:0,overflow:"hidden"},children:[e.jsxs("button",{onClick:()=>n("bus-detail",{busId:w.id}),style:{width:"100%",padding:"14px 16px 10px",display:"flex",alignItems:"center",gap:12,background:"transparent",border:0,textAlign:"left",cursor:"pointer"},children:[e.jsx("div",{style:{width:44,height:44,borderRadius:12,background:i.primarySoft,border:`1px solid ${i.primary}40`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:c,fontWeight:800,fontSize:13,color:i.primary,flexShrink:0},children:D}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:p,fontWeight:700,fontSize:14,color:i.text},children:t==="bn"?w.bnName:w.name}),e.jsx("div",{style:{fontFamily:m,fontSize:12,color:i.textDim,marginTop:2},children:w.routeString}),e.jsxs("div",{style:{fontFamily:c,fontSize:11,color:i.textFaint,marginTop:4},children:[w.type," · ",w.hours]})]})]}),e.jsxs("div",{style:{borderTop:`1px solid ${i.line}`,padding:"10px 16px",display:"flex",gap:8},children:[e.jsxs("button",{onClick:()=>A(w.id),style:{background:i.accentSoft,border:`1px solid ${i.accent}44`,borderRadius:10,padding:"8px 12px",cursor:"pointer",color:i.accent,fontFamily:p,fontSize:12,fontWeight:700},children:["♥ ",s("Remove","সরান")]}),e.jsx("button",{onClick:()=>n("bus-detail",{busId:w.id}),style:{flex:1,background:i.panelMuted,border:`1px solid ${i.line}`,borderRadius:10,padding:"8px 12px",cursor:"pointer",color:i.text,fontFamily:p,fontSize:12,fontWeight:700},children:s("View details","বিস্তারিত")})]})]},w.id)})}):e.jsxs("div",{style:{...h,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"56px 24px",gap:12,textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:p,fontWeight:700,fontSize:18,color:i.textDim},children:s("No favorites yet","এখনো কোনো প্রিয় নেই")}),e.jsx("div",{style:{fontFamily:p,fontSize:14,color:i.textFaint,maxWidth:300,lineHeight:1.5},children:s("Tap the heart on a real bus route to save it here.","বাস রুটের হার্ট চাপলে এখানে সেভ হবে।")})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:e.jsx(ee,{tk:i,lang:t,kind:r?"mob-banner":"leaderboard"})})]}),e.jsx(Pe,{tk:i,lang:t,open:j!==null,title:s("Remove favorite?","প্রিয় থেকে সরাবেন?"),message:s("This bus will be removed from your favorites.","এই বাসটি আপনার প্রিয় থেকে মুছে যাবে।"),confirmLabel:s("Remove","সরান"),onConfirm:()=>j&&I(j),onClose:()=>A(null)})]})}const fr={minDistanceChange:50,minTimeGap:3e4,stopThreshold:300*1e3,stopRadius:100,maxDaysToKeep:7},Ie={TODAY_JOURNEY:"dhaka_commute_today_journey",JOURNEY_HISTORY:"dhaka_commute_journey_history",LAST_RESET:"dhaka_commute_last_reset"};function ci(){return new Date().toISOString().split("T")[0]}function yr(){try{br();const a=localStorage.getItem(Ie.TODAY_JOURNEY);return a?JSON.parse(a):null}catch{return null}}function Ma(){const a={date:ci(),startTime:Date.now(),endTime:Date.now(),points:[],stops:[],totalDistance:0,totalDuration:0};return localStorage.setItem(Ie.TODAY_JOURNEY,JSON.stringify(a)),localStorage.setItem(Ie.LAST_RESET,Date.now().toString()),a}function br(){localStorage.getItem(Ie.LAST_RESET);const a=localStorage.getItem(Ie.TODAY_JOURNEY);if(!a){Ma();return}const o=JSON.parse(a),d=ci();o.date!==d&&(xr(o),Ma())}function xr(a){try{const o=localStorage.getItem(Ie.JOURNEY_HISTORY),d=o?JSON.parse(o):[];d.push(a);const t=d.sort((n,i)=>new Date(i.date).getTime()-new Date(n.date).getTime()).slice(0,fr.maxDaysToKeep);localStorage.setItem(Ie.JOURNEY_HISTORY,JSON.stringify(t))}catch{}}function vr(){try{const a=localStorage.getItem(Ie.JOURNEY_HISTORY);return a?JSON.parse(a):[]}catch{return[]}}function jr(a,o){return new Intl.DateTimeFormat(o==="bn"?"bn-BD":"en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(new Date(a))}function kr(a){const{theme:o,device:d,lang:t}=a,n=ae[o],i=d==="mobile",r=(w,D)=>l(t,D,w),s=t==="bn"?m:c,p={background:n.panel,border:`1px solid ${n.line}`,borderRadius:16,padding:16},h=Ce(),u=yr(),f=vr(),v=b.useMemo(()=>{const w=(h.busSearches||[]).map(U=>({id:`bus-${U.timestamp}-${U.busId}`,mode:r("Bus","বাস"),title:U.busName,detail:U.busId,timestamp:U.timestamp,color:n.primary})),D=(h.routeSearches||[]).map(U=>({id:`route-${U.timestamp}-${U.from}-${U.to}`,mode:r("Route","রুট"),title:`${U.from||r("Any","যেকোনো")} → ${U.to||r("Any","যেকোনো")}`,detail:r("Local bus search","লোকাল বাস সার্চ"),timestamp:U.timestamp,color:"#818cf8"})),B=(h.intercitySearches||[]).map(U=>({id:`intercity-${U.timestamp}-${U.from}-${U.to}`,mode:r("Intercity","আন্তঃজেলা"),title:`${U.from} → ${U.to}`,detail:U.transportType,timestamp:U.timestamp,color:n.amber})),H=(h.trainSearches||[]).map(U=>({id:`train-${U.timestamp}-${U.trainId}`,mode:r("Train","ট্রেন"),title:U.trainName,detail:`${U.from} → ${U.to}`,timestamp:U.timestamp,color:"#34d399"}));return[...w,...D,...B,...H].sort((U,q)=>q.timestamp-U.timestamp)},[h,t,n.primary,n.amber]),k=v.length,j=v.filter(w=>new Date(w.timestamp).toDateString()===new Date().toDateString()).length,A=f.length+(u&&u.points.length>0?1:0),z=(h.communityFeatureHistory||[]).length,C=k>0||A>0||z>0,I=v.reduce((w,D)=>(w[D.mode]=(w[D.mode]||0)+1,w),{});return e.jsx(ne,{...a,canBack:!0,children:e.jsxs("div",{style:{padding:i?"16px 12px 100px":"24px 40px 60px",display:"flex",flexDirection:"column",gap:20},children:[e.jsxs("div",{style:{borderRadius:22,padding:i?18:28,position:"relative",overflow:"hidden",background:"linear-gradient(135deg, #006a4e 0%, #10b981 40%, #3b82f6 100%)",color:"#fff",boxShadow:n.shadowLg},children:[e.jsx("div",{style:{position:"absolute",right:-20,top:-30,width:180,height:180,borderRadius:999,background:"rgba(255,255,255,0.15)",pointerEvents:"none"}}),e.jsx("span",{style:{fontFamily:c,fontSize:11,fontWeight:700,letterSpacing:1.4,opacity:.85,textTransform:"uppercase"},children:r("Your real KoyJabo activity","আপনার আসল কই যাবো কার্যকলাপ")}),e.jsx("h1",{style:{fontFamily:s,fontSize:i?22:30,fontWeight:700,margin:"6px 0 18px",lineHeight:1.2},children:C?r(`${k} searches recorded`,`${k}টি সার্চ সংরক্ষিত`):r("No history yet","এখনো কোনো ইতিহাস নেই")}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:i?"1fr 1fr":"repeat(4,1fr)",gap:10},children:[{label:r("Total searches","মোট সার্চ"),value:k,icon:"🔎"},{label:r("Today","আজ"),value:j,icon:"📅"},{label:r("Journey days","যাত্রার দিন"),value:A,icon:"📍"},{label:r("Features opened","ফিচার ব্যবহার"),value:z,icon:"✨"}].map(w=>e.jsxs("div",{style:{background:"rgba(255,255,255,0.15)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:14,padding:"12px 10px",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:20,marginBottom:6},children:w.icon}),e.jsx("div",{style:{fontFamily:c,fontWeight:800,fontSize:i?16:22},children:w.value}),e.jsx("div",{style:{fontFamily:s,fontSize:10,fontWeight:700,opacity:.85,letterSpacing:1.2,textTransform:"uppercase",marginTop:3},children:w.label})]},w.label))})]}),C?e.jsxs("div",{style:{display:"grid",gridTemplateColumns:i?"1fr":"1.4fr 1fr",gap:20},children:[e.jsxs("div",{style:p,children:[e.jsx("div",{style:{fontFamily:s,fontWeight:700,fontSize:16,color:n.text,marginBottom:12},children:r("Recent activity","সাম্প্রতিক কার্যকলাপ")}),v.length>0?v.slice(0,50).map((w,D)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderTop:D?`1px solid ${n.line}`:"none"},children:[e.jsx("div",{style:{width:10,height:10,borderRadius:999,background:w.color,boxShadow:`0 0 0 4px ${w.color}22`,flexShrink:0}}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:s,fontWeight:700,fontSize:14,color:n.text},children:w.title}),e.jsxs("div",{style:{fontFamily:s,fontSize:12,color:n.textDim,marginTop:2},children:[w.mode," · ",w.detail]})]}),e.jsx("div",{style:{fontFamily:c,fontSize:11,color:n.textFaint,flexShrink:0},children:jr(w.timestamp,t)})]},w.id)):e.jsx("div",{style:{fontFamily:s,fontSize:14,color:n.textDim,padding:"28px 0",textAlign:"center"},children:r("No searches yet","এখনো কোনো সার্চ নেই")})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:20},children:[e.jsxs("div",{style:p,children:[e.jsx("div",{style:{fontFamily:s,fontWeight:700,fontSize:16,color:n.text,marginBottom:12},children:r("Mode split","মোড বিভাজন")}),Object.entries(I).length>0?Object.entries(I).map(([w,D])=>{const B=k?Math.round(D/k*100):0;return e.jsxs("div",{style:{marginBottom:12},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontFamily:s,fontSize:13,color:n.text,marginBottom:6},children:[e.jsx("span",{children:w}),e.jsxs("span",{children:[B,"%"]})]}),e.jsx("div",{style:{height:7,borderRadius:999,background:n.panelMuted,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",width:`${B}%`,borderRadius:999,background:n.primary}})})]},w)}):e.jsx("div",{style:{fontFamily:s,color:n.textDim},children:r("No mode data yet","এখনো মোড ডেটা নেই")})]}),(u||f.length>0)&&e.jsxs("div",{style:p,children:[e.jsx("div",{style:{fontFamily:s,fontWeight:700,fontSize:16,color:n.text,marginBottom:12},children:r("Location journey history","লোকেশন যাত্রার ইতিহাস")}),[u,...f].filter(Boolean).map((w,D)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,padding:"12px 0",borderTop:D?`1px solid ${n.line}`:"none"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:c,fontWeight:700,color:n.text},children:w.date}),e.jsxs("div",{style:{fontFamily:s,fontSize:12,color:n.textDim},children:[w.points.length," ",r("location points","লোকেশন পয়েন্ট")]})]}),e.jsxs("div",{style:{fontFamily:c,fontWeight:800,color:n.primary},children:[w.totalDistance.toFixed(1)," km"]})]},w.date))]})]})]}):e.jsxs("div",{style:{...p,padding:"64px 24px",textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:s,fontWeight:700,fontSize:20,color:n.text,marginBottom:8},children:r("No real history found","কোনো আসল ইতিহাস পাওয়া যায়নি")}),e.jsx("div",{style:{fontFamily:s,fontSize:14,color:n.textDim,lineHeight:1.6},children:r("Search buses, trains, intercity routes, or use community features. Your real activity will appear here.","বাস, ট্রেন, আন্তঃজেলা রুট সার্চ করলে বা কমিউনিটি ফিচার ব্যবহার করলে আপনার আসল কার্যকলাপ এখানে দেখা যাবে।")})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:e.jsx(ee,{tk:n,lang:t,kind:i?"mob-banner":"leaderboard"})})]})})}function De({on:a,onChange:o,tk:d}){return e.jsx("div",{onClick:o,style:{width:44,height:24,borderRadius:999,cursor:"pointer",flexShrink:0,background:a?d.primary:d.panelMuted,border:`1px solid ${a?d.primary:d.line}`,position:"relative",transition:"background 0.2s"},children:e.jsx("div",{style:{position:"absolute",top:3,left:a?22:3,width:16,height:16,borderRadius:"50%",background:a?d.primaryInk:d.textFaint,transition:"left 0.2s"}})})}function Sr(a){const{theme:o,device:d,lang:t,onNav:n,onTheme:i,onLang:r}=a,s=ae[o],p=d==="mobile",h=(W,M)=>l(t,M,W),u=t==="bn"?m:c,[f,v]=b.useState({reminders:!0,alerts:!0,news:!1,email:!1}),[k,j]=b.useState({stats:!0,location:localStorage.getItem("kj-location-consent")==="yes"});function A(){var M;const W=!k.location;j(E=>({...E,location:W})),W?(localStorage.setItem("kj-location-consent","yes"),(M=navigator.geolocation)==null||M.getCurrentPosition(E=>{const{latitude:_,longitude:L}=E.coords,J=Object.values(ge).filter($=>$.lat&&$.lng);let R=J[0],N=1/0;for(const $ of J){const X=($.lat-_)**2+($.lng-L)**2;X<N&&(N=X,R=$)}localStorage.setItem("kj-location-area",(R==null?void 0:R.name)||"Dhaka")},()=>{},{timeout:8e3,maximumAge:0})):(localStorage.setItem("kj-location-consent","no"),localStorage.removeItem("kj-location-area"))}const[z,C]=b.useState(!1),[I,w]=b.useState(!1),[D,B]=b.useState(!1),H={background:s.panel,border:`1px solid ${s.line}`,borderRadius:16,overflow:"hidden",marginBottom:4},U=({label:W})=>e.jsx("div",{style:{fontFamily:c,fontWeight:700,fontSize:11,color:s.textFaint,padding:"16px 4px 8px",textTransform:"uppercase",letterSpacing:1.4},children:W}),q=({icon:W,label:M,sub:E,right:_,onClick:L,danger:J})=>e.jsxs("div",{onClick:L,style:{display:"flex",alignItems:"center",gap:14,padding:"13px 16px",borderTop:`1px solid ${s.line}`,cursor:L?"pointer":"default"},children:[e.jsx("span",{style:{fontSize:18,flexShrink:0},children:W}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:u,fontSize:14,fontWeight:500,color:J?s.accent:s.text},children:M}),E&&e.jsx("div",{style:{fontFamily:c,fontSize:11,color:s.textFaint,marginTop:2},children:E})]}),_??e.jsx(te.arrowR,{s:14})]}),P=[{title:h("Account","অ্যাকাউন্ট"),items:[{icon:"👤",label:h("Edit profile","প্রোফাইল সম্পাদনা"),sub:h("Name, email, phone","নাম, ইমেইল, ফোন"),onClick:()=>n("edit-profile")},{icon:"🔐",label:h("Password & security","পাসওয়ার্ড ও নিরাপত্তা"),sub:h("2FA enabled","2FA চালু"),onClick:()=>n("password")},{icon:"📱",label:h("Devices","ডিভাইস"),sub:h("1 active","১টি সক্রিয়"),onClick:()=>n("devices")}]},{title:h("Appearance","চেহারা"),items:[{icon:"🎨",label:h("Theme","থিম"),sub:o==="dark"?h("Dark","অন্ধকার"):h("Light","আলো"),right:e.jsx(De,{on:o==="dark",onChange:i,tk:s}),onClick:void 0},{icon:"🌐",label:h("Language","ভাষা"),sub:t==="bn"?"বাংলা":"English",right:e.jsx(De,{on:t==="bn",onChange:r,tk:s}),onClick:void 0}]},{title:h("Notifications","নোটিফিকেশন"),items:[{icon:"⏰",label:h("Trip reminders","ট্রিপ রিমাইন্ডার"),right:e.jsx(De,{on:f.reminders,onChange:()=>v(W=>({...W,reminders:!W.reminders})),tk:s}),onClick:void 0},{icon:"🚨",label:h("Service alerts","সেবা সতর্কতা"),right:e.jsx(De,{on:f.alerts,onChange:()=>v(W=>({...W,alerts:!W.alerts})),tk:s}),onClick:void 0},{icon:"📰",label:h("News & updates","সংবাদ ও আপডেট"),right:e.jsx(De,{on:f.news,onChange:()=>v(W=>({...W,news:!W.news})),tk:s}),onClick:void 0},{icon:"✉️",label:h("Email notifications","ইমেইল নোটিফিকেশন"),right:e.jsx(De,{on:f.email,onChange:()=>v(W=>({...W,email:!W.email})),tk:s}),onClick:void 0}]},{title:h("Privacy & Data","গোপনীয়তা ও ডেটা"),items:[{icon:"📊",label:h("Anonymous usage stats","বেনামী ব্যবহার পরিসংখ্যান"),right:e.jsx(De,{on:k.stats,onChange:()=>j(W=>({...W,stats:!W.stats})),tk:s}),onClick:void 0},{icon:"📍",label:h("Location for AI & nearby buses","AI ও কাছের বাসের জন্য অবস্থান"),sub:k.location?h("Active – detecting location","সক্রিয় – অবস্থান শনাক্ত হচ্ছে"):h("Off – enable for smarter results","বন্ধ – চালু করলে ভালো ফলাফল পাবেন"),right:e.jsx(De,{on:k.location,onChange:A,tk:s}),onClick:void 0},{icon:"🗑",label:h("Clear search history","অনুসন্ধান ইতিহাস মুছুন"),right:null,onClick:()=>C(!0)},{icon:"⚠️",label:h("Delete account","অ্যাকাউন্ট মুছুন"),danger:!0,right:null,onClick:()=>w(!0)}]},{title:h("Support","সহায়তা"),items:[{icon:"❓",label:h("Q & A","প্রশ্নোত্তর"),onClick:()=>n("qa")},{icon:"✉",label:h("Contact us","যোগাযোগ"),onClick:()=>n("contact")},{icon:"📄",label:h("Privacy Policy","গোপনীয়তা নীতি"),onClick:()=>n("privacy")},{icon:"🛡",label:h("Terms of Service","সেবার শর্ত"),onClick:()=>n("terms")},{icon:"ℹ️",label:h("About KoyJabo","KoyJabo সম্পর্কে"),onClick:()=>n("about")},{icon:"🆕",label:h("Release Notes","রিলিজ নোট"),sub:"v1.5.2",onClick:()=>n("release")}]}];return e.jsxs(ne,{...a,canBack:!0,children:[e.jsxs("div",{style:{maxWidth:p?"100%":720,margin:"0 auto",padding:p?"16px 12px 100px":"24px 40px 60px"},children:[e.jsx("h1",{style:{margin:"0 0 4px",fontFamily:u,fontWeight:700,fontSize:26,color:s.text,letterSpacing:-.5},children:h("Settings","সেটিংস")}),e.jsx("p",{style:{margin:"0 0 20px",fontFamily:c,fontSize:13,color:s.textDim},children:h("Manage your preferences and account","আপনার পছন্দ এবং অ্যাকাউন্ট পরিচালনা করুন")}),P.map((W,M)=>e.jsxs("div",{children:[e.jsx(U,{label:W.title}),e.jsx("div",{style:H,children:W.items.map((E,_)=>e.jsx(q,{icon:E.icon,label:E.label,sub:"sub"in E?E.sub:void 0,right:"right"in E?E.right:void 0,onClick:"onClick"in E?E.onClick:void 0,danger:"danger"in E?E.danger:!1},_))})]},M)),e.jsx(ee,{tk:s,lang:t,kind:p?"mob-banner":"leaderboard"}),e.jsx("button",{onClick:()=>B(!0),style:{marginTop:20,width:"100%",background:s.accentSoft,color:s.accent,border:`1px solid ${s.accent}44`,borderRadius:12,padding:"14px",fontFamily:u,fontWeight:700,fontSize:14,cursor:"pointer"},children:h("Sign out","সাইন আউট")}),e.jsx("div",{style:{textAlign:"center",marginTop:16,fontFamily:c,fontSize:11,color:s.textFaint},children:"KoyJabo · v1.5.2 · Build 2026.06.18"})]}),e.jsx(Pe,{tk:s,lang:t,open:z,title:h("Clear search history?","অনুসন্ধান ইতিহাস মুছবেন?"),message:h("All your search history will be permanently deleted.","আপনার সমস্ত অনুসন্ধান ইতিহাস স্থায়ীভাবে মুছে যাবে।"),confirmLabel:h("Clear","মুছুন"),onConfirm:()=>C(!1),onClose:()=>C(!1)}),e.jsx(Pe,{tk:s,lang:t,open:I,title:h("Delete account?","অ্যাকাউন্ট মুছবেন?"),message:h("This action is irreversible. All your data will be permanently deleted.","এই পদক্ষেপ অপরিবর্তনীয়।"),confirmLabel:h("Delete","মুছুন"),onConfirm:()=>w(!1),onClose:()=>w(!1)}),e.jsx(Pe,{tk:s,lang:t,open:D,title:h("Sign out?","সাইন আউট করবেন?"),message:h("You will be signed out of your account.","আপনি সাইন আউট হয়ে যাবেন।"),confirmLabel:h("Sign out","সাইন আউট"),onConfirm:()=>{B(!1),n("signin")},onClose:()=>B(!1)})]})}const wr="mejbaurbahar",Br="Dhaka-Commute";const Bt="https://koyjabo-auth-proxy.mejbaur-bahar.workers.dev",Cr="",Hs=`https://api.github.com/repos/${wr}/${Br}`;function Tr(){return{Authorization:`Bearer ${Cr}`,Accept:"application/vnd.github.v3+json","Content-Type":"application/json"}}function hi(a){return a===401?"Service authentication failed. Please try again later.":a===403?"Service temporarily unavailable. Please try again in a few minutes.":a===404?"Account service connection failed.":a===422?"Request could not be processed. Please try again.":a===429?"Too many requests. Please wait a moment and try again.":a>=500?"Server error. Please try again in a moment.":"Account service connection failed."}function pi(a){return a instanceof TypeError&&a.message==="Failed to fetch"?"Connection failed. Please check your internet and try again.":a instanceof Error?a.message:"Connection failed. Please check your internet and try again."}function ui(){let a=localStorage.getItem("koyjabo_device_id");return a||(a=crypto.randomUUID(),localStorage.setItem("koyjabo_device_id",a)),a}async function Fr(){try{return(await(await fetch("https://api.ipify.org?format=json",{signal:AbortSignal.timeout(3e3)})).json()).ip||"Unknown"}catch{return"Unknown"}}const Qt="kj_user_index_cache",mi=1800*1e3,nt=new Map;async function gi(a,o){const d=`${Bt}/gh?r=${a}&p=${encodeURIComponent(o)}`;let t,n=0;for(;;){try{t=Bt?await fetch(d,{credentials:"omit"}):await fetch(d,{headers:Tr()})}catch(i){throw new Error(pi(i))}if(t.status===429&&n<3){await new Promise(i=>setTimeout(i,2e3*2**n)),n++;continue}break}if(t.status===404)return null;if(!t.ok)throw new Error(hi(t.status));return t.json()}function Dr(){try{const a=localStorage.getItem(Qt);if(!a)return null;const o=JSON.parse(a);if((o==null?void 0:o.expires)>Date.now())return o;localStorage.removeItem(Qt)}catch{}return null}function Ar(a){try{localStorage.setItem(Qt,JSON.stringify({data:a,expires:Date.now()+mi}))}catch{}}let vt=Dr();async function fi(a){const o=a==="data/users/index.json";if(o&&vt&&vt.expires>Date.now())return vt.data;const d=`d:${a}`;if(nt.has(d))return nt.get(d);const t=gi("d",a).then(n=>(nt.delete(d),o&&n&&(vt={data:n,expires:Date.now()+mi},Ar(n)),n)).catch(n=>{throw nt.delete(d),n});return nt.set(d,t),t}function Nr(a){return gi("a",a)}async function Rr(a,o,d){let t;const n={requestId:a,action:o,email:d.email||"",passwordHash:d.passwordHash||"",userId:d.userId||"",data:d.data||"{}"};try{Bt&&(t=await fetch(`${Bt}/gh`,{method:"POST",credentials:"omit",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}))}catch(i){throw new Error(pi(i))}if(!t.ok)throw new Error(hi(t.status))}async function Ir(a,o=18e4){const d=`data/results/${a}.json`,t=Date.now()+o;for(await new Promise(n=>setTimeout(n,2e4));Date.now()<t;){const n=await Nr(d).catch(()=>null);if(n)return n;await new Promise(i=>setTimeout(i,8e3))}throw new Error("Request is taking too long. Please check your connection and try again.")}async function yi(a,o){const d=crypto.randomUUID();return await Rr(d,a,o),Ir(d)}async function zr(a){const o=ui(),d=await Fr();yi("record-device",{userId:a,data:JSON.stringify({deviceInfo:{deviceId:o,userAgent:navigator.userAgent,ip:d}})}).catch(()=>{})}async function Mr(a){const o=await fi(`data/avatars/${a}.json`).catch(()=>null);return(o==null?void 0:o.imageData)??null}async function Wa(a){return fi(`data/history/${a}.json`).catch(()=>null)}function Wr(a,o){const d={busSearches:o.busSearches.slice(-50),routeSearches:o.routeSearches.slice(-50),intercitySearches:o.intercitySearches.slice(-50),trainSearches:(o.trainSearches||[]).slice(-50),mostUsedBuses:o.mostUsedBuses,mostUsedRoutes:o.mostUsedRoutes,mostUsedIntercity:o.mostUsedIntercity,mostUsedTrains:o.mostUsedTrains||{}};yi("save-history",{userId:a,data:JSON.stringify(d)}).catch(()=>{})}const Ct="koyjabo_auth_session",Pr=30;function Kt(a){const o={user:a,deviceId:ui(),expiresAt:Date.now()+Pr*24*60*60*1e3};localStorage.setItem(Ct,JSON.stringify(o))}function Ot(){try{const a=localStorage.getItem(Ct);if(!a)return null;const o=JSON.parse(a);return o.expiresAt<Date.now()?(localStorage.removeItem(Ct),null):o}catch{return null}}const bi=b.createContext(null);function Er({children:a}){const[o,d]=b.useState(null),[t,n]=b.useState("idle");b.useEffect(()=>{const p=Ot();p?(d(p.user),n("authenticated"),Lt(p.user.id),Mr(p.user.id).then(h=>{if(h&&h!==p.user.avatarUrl){d(f=>f&&{...f,avatarUrl:h});const u=Ot();u&&Kt({...u.user,avatarUrl:h})}}).catch(()=>{}),Wa(p.user.id).then(h=>{h&&fa(h)}).catch(()=>{})):n("unauthenticated")},[]);const i=b.useCallback(p=>{Kt(p),d(p),n("authenticated"),Lt(p.id),zr(p.id),Wa(p.id).then(h=>{h&&fa(h)}).catch(()=>{})},[]),r=b.useCallback(()=>{var h;const p=(h=Ot())==null?void 0:h.user;if(p){const u=Ce();Wr(p.id,{busSearches:u.busSearches,routeSearches:u.routeSearches,intercitySearches:u.intercitySearches,trainSearches:u.trainSearches,mostUsedBuses:u.mostUsedBuses,mostUsedRoutes:u.mostUsedRoutes,mostUsedIntercity:u.mostUsedIntercity,mostUsedTrains:u.mostUsedTrains})}localStorage.removeItem(Ct),Lt(null),d(null),n("unauthenticated")},[]),s=b.useCallback(p=>{d(h=>{if(!h)return h;const u={...h,...p};return Kt(u),u})},[]);return e.jsx(bi.Provider,{value:{user:o,status:t,login:i,logout:r,updateUser:s},children:a})}function xi(){const a=b.useContext(bi);if(!a)throw new Error("useAuth must be used inside <AuthProvider>");return a}function Lr(a){const{theme:o,device:d,lang:t,onBack:n}=a,i=ae[o],r=d==="mobile",{user:s}=xi(),p={name:(s==null?void 0:s.displayName)||"Mejbaur Fagun",username:(s==null?void 0:s.username)||"mejbaur_fagun",phone:"+880 1700-000000",home:l(t,"বনানী, ঢাকা","Banani, Dhaka"),work:l(t,"কারওয়ান বাজার, ঢাকা","Karwan Bazar, Dhaka"),bio:""},[h,u]=b.useState(p.name),[f,v]=b.useState(p.username),[k,j]=b.useState(p.phone),[A,z]=b.useState(p.home),[C,I]=b.useState(p.work),[w,D]=b.useState(p.bio),B=h!==p.name||f!==p.username||k!==p.phone||A!==p.home||C!==p.work||w!==p.bio,H={width:"100%",background:i.inputBg,border:`1px solid ${i.line}`,borderRadius:12,padding:"12px 14px",color:i.text,fontFamily:m,fontSize:14,outline:"none",boxSizing:"border-box"},U={...H,background:i.panelMuted,color:i.textFaint,opacity:.7};return e.jsx(ne,{...a,children:e.jsxs("div",{style:{padding:r?"16px 16px 48px":"28px 40px 48px",maxWidth:500,margin:"0 auto"},children:[e.jsx("h1",{style:{fontFamily:m,fontWeight:700,fontSize:r?20:24,color:i.text,marginBottom:20},children:l(t,"প্রোফাইল সম্পাদনা","Edit Profile")}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:24},children:[s!=null&&s.avatarUrl?e.jsx("img",{src:s.avatarUrl,alt:"avatar",style:{width:80,height:80,borderRadius:999,objectFit:"cover",marginBottom:10}}):e.jsx("div",{style:{width:80,height:80,borderRadius:999,background:`linear-gradient(135deg,${i.primary},${i.accent})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontFamily:c,fontWeight:800,fontSize:28,marginBottom:10},children:((s==null?void 0:s.displayName)||(s==null?void 0:s.username)||"KJ").slice(0,2).toUpperCase()}),e.jsx("button",{style:{background:i.primarySoft,color:i.primary,border:0,borderRadius:10,padding:"8px 14px",fontFamily:c,fontWeight:700,fontSize:13,cursor:"pointer"},children:l(t,"ছবি পরিবর্তন করুন","Change photo")})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[[{l:l(t,"পূর্ণ নাম","Full name"),v:h,set:u},{l:l(t,"ইউজারনেম","Username"),v:f,set:v},{l:l(t,"ফোন","Phone"),v:k,set:j},{l:l(t,"বাড়ির এলাকা","Home area"),v:A,set:z},{l:l(t,"কর্মস্থল এলাকা","Work area"),v:C,set:I}].map((q,P)=>e.jsxs("div",{children:[e.jsx("label",{style:{fontFamily:c,fontSize:11,fontWeight:700,color:i.textFaint,textTransform:"uppercase",letterSpacing:1,display:"block",marginBottom:6},children:q.l}),e.jsx("input",{value:q.v,onChange:W=>q.set(W.target.value),style:H})]},P)),e.jsxs("div",{children:[e.jsx("label",{style:{fontFamily:c,fontSize:11,fontWeight:700,color:i.textFaint,textTransform:"uppercase",letterSpacing:1,display:"block",marginBottom:6},children:"Email"}),e.jsx("input",{value:(s==null?void 0:s.email)||"mejbaur@markopolo.ai",readOnly:!0,style:U})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontFamily:c,fontSize:11,fontWeight:700,color:i.textFaint,textTransform:"uppercase",letterSpacing:1,display:"block",marginBottom:6},children:"Bio"}),e.jsx("textarea",{value:w,onChange:q=>D(q.target.value.slice(0,160)),placeholder:l(t,"নিজের সম্পর্কে লিখুন...","Write about yourself..."),style:{width:"100%",minHeight:80,background:i.inputBg,border:`1px solid ${i.line}`,borderRadius:12,padding:"12px 14px",color:i.text,fontFamily:m,fontSize:14,outline:"none",resize:"none",boxSizing:"border-box"}}),e.jsxs("div",{style:{fontFamily:c,fontSize:11,color:i.textFaint,textAlign:"right"},children:[w.length,"/160"]})]}),B&&e.jsx("button",{style:{background:i.primary,color:i.primaryInk,border:0,borderRadius:14,padding:"13px 20px",fontFamily:c,fontWeight:700,fontSize:14,cursor:"pointer"},children:l(t,"পরিবর্তন সংরক্ষণ করুন","Save changes")}),e.jsx("button",{onClick:n,style:{background:"transparent",border:0,color:i.textDim,fontFamily:c,fontSize:13,cursor:"pointer",padding:"8px 0"},children:l(t,"বাতিল করুন","Cancel")})]})]})})}function $r(a){const{theme:o,device:d,lang:t}=a,n=ae[o],i=d==="mobile",r=(h=16)=>({background:n.panel,border:`1px solid ${n.line}`,borderRadius:h,padding:16}),[s,p]=b.useState(!1);return e.jsx(ne,{...a,children:e.jsxs("div",{style:{padding:i?"16px 16px 48px":"28px 40px 48px",maxWidth:500,margin:"0 auto"},children:[e.jsx("h1",{style:{fontFamily:m,fontWeight:700,fontSize:i?20:24,color:n.text,marginBottom:16},children:l(t,"পাসওয়ার্ড ও নিরাপত্তা","Password & Security")}),e.jsxs("div",{style:{...r(16),background:n.primarySoft,borderColor:n.primary,marginBottom:16,display:"flex",gap:12,alignItems:"center"},children:[e.jsx("span",{style:{fontSize:28},children:"🛡️"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:n.primaryDeep},children:l(t,"আপনার অ্যাকাউন্ট সুরক্ষিত","Your account is secured")}),e.jsx("div",{style:{fontFamily:m,fontSize:12,color:n.primaryDeep,opacity:.85},children:l(t,"২ ফ্যাক্টর প্রমাণীকরণ সক্রিয়","2FA is currently enabled")})]})]}),e.jsxs("div",{style:{...r(18),marginBottom:16},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:n.text,marginBottom:12},children:l(t,"পাসওয়ার্ড পরিবর্তন","Change password")}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[{l:l(t,"বর্তমান পাসওয়ার্ড","Current password"),v:"••••••••••"},{l:l(t,"নতুন পাসওয়ার্ড","New password"),v:"••••••••••••",strength:!0},{l:l(t,"নতুন পাসওয়ার্ড নিশ্চিত করুন","Confirm new password"),v:"••••••••••••"}].map((h,u)=>e.jsxs("div",{children:[e.jsx("label",{style:{fontFamily:c,fontSize:11,fontWeight:700,color:n.textFaint,textTransform:"uppercase",letterSpacing:1,display:"block",marginBottom:5},children:h.l}),e.jsxs("div",{style:{background:n.inputBg,border:`1px solid ${n.line}`,borderRadius:12,padding:"11px 14px",display:"flex",alignItems:"center",gap:10},children:[e.jsx("span",{style:{fontSize:14,opacity:.6},children:"🔒"}),e.jsx("span",{style:{flex:1,fontFamily:c,fontSize:16,color:n.textDim,letterSpacing:3},children:h.v}),e.jsx("span",{style:{cursor:"pointer",color:n.textFaint},children:"👁"})]}),h.strength&&e.jsxs("div",{style:{display:"flex",gap:4,marginTop:6},children:[[1,2,3,4,5].map(f=>e.jsx("div",{style:{flex:1,height:4,borderRadius:999,background:f<=4?"#10b981":n.line}},f)),e.jsx("span",{style:{fontFamily:c,fontSize:11,color:"#10b981",fontWeight:700,marginLeft:6},children:"Strong"})]})]},u))})]}),e.jsxs("div",{style:{...r(18),marginBottom:16},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:n.text,marginBottom:12},children:l(t,"দুই-ফ্যাক্টর প্রমাণীকরণ","Two-Factor Authentication")}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:m,fontSize:13,color:n.text},children:l(t,"অথেনটিকেটর অ্যাপ","Authenticator app")}),e.jsx("div",{style:{fontFamily:c,fontSize:11,color:n.textFaint},children:l(t,"সক্রিয়","Active")})]}),e.jsx("span",{style:{background:"#10b981",color:"#fff",fontFamily:c,fontWeight:700,fontSize:11,padding:"4px 10px",borderRadius:999},children:"ON"})]}),e.jsxs("button",{style:{marginTop:12,background:"transparent",border:0,color:n.primary,fontFamily:c,fontWeight:600,fontSize:13,cursor:"pointer",padding:0},children:[l(t,"ব্যাকআপ কোড দেখুন","View backup codes")," →"]})]}),e.jsxs("div",{style:{...r(18),marginBottom:20},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:n.text,marginBottom:12},children:l(t,"সক্রিয় সেশন","Active sessions")}),[{n:"iPhone 14 Pro",t:l(t,"এই ডিভাইস","This device"),cur:!0},{n:"Chrome Windows",t:l(t,"২ ঘণ্টা আগে","2h ago"),cur:!1},{n:"iOS App",t:l(t,"গতকাল","Yesterday"),cur:!1}].map((h,u)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:u<2?`1px solid ${n.line}`:"none"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:m,fontSize:13,color:n.text},children:h.n}),e.jsx("div",{style:{fontFamily:c,fontSize:11,color:n.textFaint},children:h.t})]}),h.cur?e.jsx("span",{style:{background:n.primarySoft,color:n.primary,fontFamily:c,fontWeight:700,fontSize:10,padding:"3px 8px",borderRadius:999},children:"Current"}):e.jsx("button",{style:{background:"transparent",border:0,color:n.accent,fontFamily:c,fontSize:12,cursor:"pointer"},children:l(t,"সরান","Remove")})]},u)),e.jsx("button",{onClick:()=>p(!0),style:{marginTop:12,width:"100%",background:n.accentSoft,border:`1px solid ${n.accent}`,borderRadius:12,padding:"10px",fontFamily:m,fontWeight:700,fontSize:13,color:n.accent,cursor:"pointer"},children:l(t,"অন্য সব ডিভাইস সাইন আউট করুন","Sign out all other devices")})]}),e.jsx("button",{style:{width:"100%",background:n.primary,color:n.primaryInk,border:0,borderRadius:14,padding:"13px 20px",fontFamily:c,fontWeight:700,fontSize:14,cursor:"pointer"},children:l(t,"পরিবর্তন সংরক্ষণ করুন","Save changes")}),e.jsx(Pe,{tk:n,lang:t,open:s,title:l(t,"সাইন আউট","Sign out all"),message:l(t,"অন্য সব ডিভাইস সাইন আউট হবে।","All other devices will be signed out."),confirmLabel:l(t,"হ্যাঁ","Yes"),onClose:()=>p(!1),onConfirm:()=>p(!1)})]})})}function _r(a){const{theme:o,device:d,lang:t}=a,n=ae[o],i=d==="mobile",r=(u=16)=>({background:n.panel,border:`1px solid ${n.line}`,borderRadius:u,padding:16}),[s,p]=b.useState({open:!1,title:"",msg:""}),h=[{icon:"📱",name:"iPhone 14 Pro",os:"iOS 17",loc:l(t,"ঢাকা","Dhaka"),last:l(t,"এখনই","Just now"),current:!0,suspicious:!1},{icon:"💻",name:"Chrome on Windows",os:"Windows 11",loc:l(t,"ঢাকা","Dhaka"),last:l(t,"২ ঘণ্টা আগে","2h ago"),current:!1,suspicious:!1},{icon:"📱",name:"Samsung Galaxy S23",os:"Android 14",loc:l(t,"চট্টগ্রাম","Chittagong"),last:"Jun 15",current:!1,suspicious:!0}];return e.jsx(ne,{...a,children:e.jsxs("div",{style:{padding:i?"16px 16px 48px":"28px 40px 48px",maxWidth:600,margin:"0 auto"},children:[e.jsx("h1",{style:{fontFamily:m,fontWeight:700,fontSize:i?20:26,color:n.text,marginBottom:20},children:l(t,"ডিভাইস","Devices")}),e.jsxs("div",{style:{background:n.amberSoft,border:`1px solid ${n.amber}`,borderRadius:16,padding:16,marginBottom:20,display:"flex",gap:12,alignItems:"flex-start"},children:[e.jsx("span",{style:{fontSize:24,flexShrink:0},children:"⚠️"}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:n.amber,marginBottom:4},children:l(t,"নতুন সাইন-ইন শনাক্ত হয়েছে","New sign-in detected")}),e.jsx("div",{style:{fontFamily:m,fontSize:12,color:n.amber,opacity:.85,marginBottom:10},children:l(t,"চট্টগ্রাম থেকে · ১৫ জুন · Chrome on Windows","From Chittagong · Jun 15 · Chrome on Windows")}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx("button",{style:{background:n.amber,color:"#fff",border:0,borderRadius:10,padding:"7px 14px",fontFamily:c,fontWeight:700,fontSize:12,cursor:"pointer"},children:l(t,"এটা আমি","This is me")}),e.jsx("button",{onClick:()=>p({open:!0,title:l(t,"ডিভাইস সরান","Remove device"),msg:l(t,"এই ডিভাইস সাইন আউট করা হবে।","This device will be signed out.")}),style:{background:"transparent",border:`1px solid ${n.amber}`,borderRadius:10,padding:"7px 14px",fontFamily:c,fontWeight:700,fontSize:12,color:n.amber,cursor:"pointer"},children:l(t,"সরিয়ে দিন","Remove")})]})]})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10,marginBottom:20},children:h.map((u,f)=>e.jsxs("div",{style:{...r(16),display:"flex",gap:14,alignItems:"center",borderColor:u.suspicious?n.amber:n.line,background:u.suspicious?n.amberSoft:n.panel},children:[e.jsx("span",{style:{fontSize:28,flexShrink:0},children:u.icon}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx("span",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:n.text},children:u.name}),u.current&&e.jsx("span",{style:{background:n.primarySoft,color:n.primary,fontFamily:c,fontWeight:700,fontSize:10,padding:"2px 7px",borderRadius:999},children:l(t,"এই ডিভাইস","This device")}),u.suspicious&&e.jsx("span",{style:{background:n.amberSoft,color:n.amber,fontFamily:c,fontWeight:700,fontSize:10,padding:"2px 7px",borderRadius:999},children:"⚠️"})]}),e.jsxs("div",{style:{fontFamily:c,fontSize:11,color:n.textFaint,marginTop:3},children:[u.os," · ",u.loc," · ",u.last]})]}),!u.current&&e.jsx("button",{onClick:()=>p({open:!0,title:l(t,"ডিভাইস সরান","Remove device"),msg:l(t,"এই ডিভাইস সাইন আউট হবে।","This device will be signed out.")}),style:{background:n.panelMuted,border:`1px solid ${n.line}`,borderRadius:10,padding:"7px 12px",fontFamily:c,fontWeight:600,fontSize:12,color:n.accent,cursor:"pointer",flexShrink:0},children:l(t,"সরান","Remove")})]},f))}),e.jsx("button",{onClick:()=>p({open:!0,title:l(t,"সব ডিভাইস থেকে সাইন আউট","Sign out all devices"),msg:l(t,"আপনি সব ডিভাইস থেকে সাইন আউট হয়ে যাবেন।","You will be signed out of all devices.")}),style:{width:"100%",background:n.accentSoft,border:`1px solid ${n.accent}`,borderRadius:14,padding:"13px 20px",fontFamily:m,fontWeight:700,fontSize:14,color:n.accent,cursor:"pointer"},children:l(t,"সব ডিভাইস থেকে সাইন আউট করুন","Sign out all devices")}),e.jsx(Pe,{tk:n,lang:t,open:s.open,title:s.title,message:s.msg,confirmLabel:l(t,"হ্যাঁ, সরান","Yes, remove"),onClose:()=>p(u=>({...u,open:!1})),onConfirm:()=>p(u=>({...u,open:!1}))})]})})}function Ur(a){const{theme:o,device:d,lang:t,onNav:n}=a,i=ae[o],r=d==="mobile",[s,p]=b.useState(!1);return e.jsx(ne,{...a,children:e.jsx("div",{style:{minHeight:"60vh",display:"flex",alignItems:"center",justifyContent:"center",padding:r?"24px 16px":"48px 24px"},children:e.jsxs("div",{style:{width:"100%",maxWidth:420,background:i.panel,border:`1px solid ${i.line}`,borderRadius:24,padding:r?24:32,boxShadow:i.shadowLg},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:24},children:[e.jsx(Ve,{tk:i,size:52}),e.jsx("h1",{style:{fontFamily:m,fontWeight:700,fontSize:22,color:i.text,margin:"14px 0 4px"},children:l(t,"সাইন ইন করুন","Sign in to KoyJabo")}),e.jsx("p",{style:{fontFamily:m,fontSize:13,color:i.textDim,margin:0},children:l(t,"আপনার যাত্রা শুরু হোক","Start your journey")})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10,marginBottom:20},children:[{icon:"G",name:"Google",bg:"#fff",fg:"#1f2937",border:"#e5e7eb"},{icon:"f",name:"Facebook",bg:"#1877f2",fg:"#fff",border:"#1877f2"}].map((h,u)=>e.jsxs("button",{style:{width:"100%",background:h.bg,border:`1px solid ${h.border}`,borderRadius:12,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:10,fontFamily:c,fontWeight:700,fontSize:14,color:h.fg,cursor:"pointer"},children:[e.jsx("span",{style:{fontWeight:900,fontSize:16,fontFamily:"serif"},children:h.icon}),l(t,`${h.name} দিয়ে সাইন ইন`,`Continue with ${h.name}`)]},u))}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:20},children:[e.jsx("div",{style:{flex:1,height:1,background:i.line}}),e.jsx("span",{style:{fontFamily:c,fontSize:11,fontWeight:700,color:i.textFaint,textTransform:"uppercase",letterSpacing:1.4},children:l(t,"অথবা","or")}),e.jsx("div",{style:{flex:1,height:1,background:i.line}})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,marginBottom:20},children:[e.jsx("input",{type:"email",placeholder:"Email",style:{width:"100%",background:i.inputBg,border:`1px solid ${i.line}`,borderRadius:12,padding:"12px 14px",color:i.text,fontFamily:c,fontSize:14,outline:"none",boxSizing:"border-box"}}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx("input",{type:s?"text":"password",placeholder:l(t,"পাসওয়ার্ড","Password"),style:{width:"100%",background:i.inputBg,border:`1px solid ${i.line}`,borderRadius:12,padding:"12px 14px",color:i.text,fontFamily:c,fontSize:14,outline:"none",boxSizing:"border-box"}}),e.jsx("button",{onClick:()=>p(h=>!h),style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:0,color:i.textFaint,cursor:"pointer",fontSize:16},children:s?"👁️":"👁"})]}),e.jsx("div",{style:{textAlign:"right"},children:e.jsx("button",{style:{background:"none",border:0,color:i.primary,fontFamily:c,fontSize:12,fontWeight:600,cursor:"pointer"},children:l(t,"পাসওয়ার্ড ভুলে গেছেন?","Forgot password?")})})]}),e.jsx("button",{style:{width:"100%",background:i.primary,color:i.primaryInk,border:0,borderRadius:14,padding:"13px 20px",fontFamily:c,fontWeight:700,fontSize:15,cursor:"pointer",marginBottom:16,boxShadow:`0 6px 16px -6px ${i.primary}`},children:l(t,"সাইন ইন করুন","Sign in")}),e.jsxs("div",{style:{textAlign:"center",fontFamily:m,fontSize:13,color:i.textDim},children:[l(t,"অ্যাকাউন্ট নেই?","Don't have an account?")," ",e.jsx("button",{onClick:()=>n("signup"),style:{background:"none",border:0,color:i.primary,fontFamily:m,fontSize:13,fontWeight:700,cursor:"pointer",padding:0},children:l(t,"সাইন আপ করুন","Sign up")})]})]})})})}function Hr(a){const{theme:o,device:d,lang:t,onNav:n}=a,i=ae[o],r=d==="mobile",[s,p]=b.useState(!1),[h,u]=b.useState(""),f=h.length>12?5:h.length>8?4:h.length>5?3:h.length>2?2:h.length>0?1:0,v=["","Weak","Fair","Good","Strong","Excellent"][f],k=["",i.accent,"#f59e0b","#f59e0b","#10b981","#10b981"][f];return e.jsx(ne,{...a,children:e.jsx("div",{style:{minHeight:"60vh",display:"flex",alignItems:"center",justifyContent:"center",padding:r?"24px 16px":"48px 24px"},children:e.jsxs("div",{style:{width:"100%",maxWidth:420,background:i.panel,border:`1px solid ${i.line}`,borderRadius:24,padding:r?24:32,boxShadow:i.shadowLg},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:24},children:[e.jsx(Ve,{tk:i,size:52}),e.jsx("h1",{style:{fontFamily:m,fontWeight:700,fontSize:22,color:i.text,margin:"14px 0 4px"},children:l(t,"অ্যাকাউন্ট তৈরি করুন","Create account")})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,marginBottom:20},children:[e.jsx("input",{placeholder:l(t,"পূর্ণ নাম","Full name"),style:{width:"100%",background:i.inputBg,border:`1px solid ${i.line}`,borderRadius:12,padding:"12px 14px",color:i.text,fontFamily:m,fontSize:14,outline:"none",boxSizing:"border-box"}}),e.jsx("input",{type:"email",placeholder:"Email",style:{width:"100%",background:i.inputBg,border:`1px solid ${i.line}`,borderRadius:12,padding:"12px 14px",color:i.text,fontFamily:c,fontSize:14,outline:"none",boxSizing:"border-box"}}),e.jsxs("div",{children:[e.jsx("input",{type:"password",value:h,onChange:j=>u(j.target.value),placeholder:l(t,"পাসওয়ার্ড","Password"),style:{width:"100%",background:i.inputBg,border:`1px solid ${i.line}`,borderRadius:12,padding:"12px 14px",color:i.text,fontFamily:c,fontSize:14,outline:"none",boxSizing:"border-box"}}),h.length>0&&e.jsxs("div",{style:{display:"flex",gap:4,marginTop:8,alignItems:"center"},children:[[1,2,3,4,5].map(j=>e.jsx("div",{style:{flex:1,height:4,borderRadius:999,background:j<=f?k:i.line,transition:"background .2s"}},j)),e.jsx("span",{style:{fontFamily:c,fontSize:11,color:k,fontWeight:700,marginLeft:6,flexShrink:0},children:v})]})]}),e.jsx("input",{type:"password",placeholder:l(t,"পাসওয়ার্ড নিশ্চিত করুন","Confirm password"),style:{width:"100%",background:i.inputBg,border:`1px solid ${i.line}`,borderRadius:12,padding:"12px 14px",color:i.text,fontFamily:c,fontSize:14,outline:"none",boxSizing:"border-box"}})]}),e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:10,marginBottom:20,cursor:"pointer"},onClick:()=>p(j=>!j),children:[e.jsx("div",{style:{width:18,height:18,borderRadius:5,border:`2px solid ${s?i.primary:i.line}`,background:s?i.primary:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1},children:s&&e.jsx("span",{style:{color:i.primaryInk,fontSize:12,fontWeight:900},children:"✓"})}),e.jsxs("span",{style:{fontFamily:m,fontSize:12,color:i.textDim,lineHeight:1.5},children:[l(t,"আমি ","I agree to the "),e.jsx("span",{style:{color:i.primary},children:l(t,"গোপনীয়তা নীতি","Privacy Policy")}),l(t," এবং ","  and "),e.jsx("span",{style:{color:i.primary},children:l(t,"সেবার শর্তাবলি","Terms of Service")}),l(t,"-তে সম্মত আছি","")]})]}),e.jsx("button",{disabled:!s,style:{width:"100%",background:s?i.primary:i.panelMuted,color:s?i.primaryInk:i.textFaint,border:0,borderRadius:14,padding:"13px 20px",fontFamily:c,fontWeight:700,fontSize:15,cursor:s?"pointer":"not-allowed",marginBottom:16,boxShadow:s?`0 6px 16px -6px ${i.primary}`:"none",transition:"all .2s"},children:l(t,"অ্যাকাউন্ট তৈরি করুন","Create account")}),e.jsxs("div",{style:{textAlign:"center",fontFamily:m,fontSize:13,color:i.textDim},children:[l(t,"ইতিমধ্যে অ্যাকাউন্ট আছে?","Already have an account?")," ",e.jsx("button",{onClick:()=>n("signin"),style:{background:"none",border:0,color:i.primary,fontFamily:m,fontSize:13,fontWeight:700,cursor:"pointer",padding:0},children:l(t,"সাইন ইন করুন","Sign in")})]})]})})})}const Kr=[{icon:"🗺",titleEn:"Free & Offline",titleBn:"বিনামূল্যে ও অফলাইন",descEn:"Works without internet · PWA installable",descBn:"ইন্টারনেট ছাড়াই চলে · PWA ইনস্টলযোগ্য",from:"#064e3b",to:"#10b981"},{icon:"🚌",titleEn:"All Transport",titleBn:"সব পরিবহন",descEn:"Bus, Metro, Train, Launch, Flights",descBn:"বাস, মেট্রো, ট্রেন, লঞ্চ, ফ্লাইট",from:"#1e3a8a",to:"#3b82f6"},{icon:"🌐",titleEn:"Bilingual",titleBn:"দ্বিভাষিক",descEn:"বাংলা এবং English — seamlessly switch",descBn:"বাংলা এবং English — অনায়াসে বদলান",from:"#4c1d95",to:"#a855f7"},{icon:"🔒",titleEn:"No Ads BS",titleBn:"বিজ্ঞাপন জঞ্জাল নেই",descEn:"Clean UI, not cluttered — ads are non-intrusive",descBn:"পরিষ্কার ইন্টারফেস — বিজ্ঞাপন বিরক্তিকর নয়",from:"#92400e",to:"#f59e0b"}],Or=[{valueEn:"50,000+",valueBn:"৫০,০০০+",labelEn:"Users",labelBn:"ব্যবহারকারী"},{valueEn:"2,400+",valueBn:"২,৪০০+",labelEn:"Routes",labelBn:"রুট"},{valueEn:"64",valueBn:"৬৪",labelEn:"Districts",labelBn:"জেলা"},{valueEn:"99.9%",valueBn:"৯৯.৯%",labelEn:"Uptime",labelBn:"আপটাইম"}];function Gr(a){const{theme:o,lang:d,device:t}=a,n=ae[o],i=t==="mobile",r=(s,p)=>l(d,p,s);return e.jsx(ne,{...a,children:e.jsxs("div",{style:{maxWidth:900,margin:"0 auto",padding:i?"0 16px 80px":"0 32px 80px"},children:[e.jsxs("div",{style:{background:"linear-gradient(135deg, #064e3b 0%, #065f46 100%)",borderRadius:20,padding:i?"48px 24px":"72px 64px",marginBottom:40,marginTop:24,textAlign:"center",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",inset:0,background:"radial-gradient(ellipse 70% 60% at 50% 0%, rgba(16,185,129,0.25) 0%, transparent 70%)",pointerEvents:"none"}}),e.jsx("h1",{style:{fontFamily:m,fontSize:i?28:40,fontWeight:800,color:"#fff",margin:"0 0 12px",position:"relative"},children:r("Why KoyJabo?","কেন কই যাবো?")}),e.jsx("p",{style:{fontFamily:d==="bn"?m:c,fontSize:i?14:17,color:"rgba(255,255,255,0.8)",margin:0,lineHeight:1.7,maxWidth:560,marginLeft:"auto",marginRight:"auto",position:"relative"},children:r("Bangladesh's smartest transit companion — free, offline-first, covering every mode of transport across all 64 districts.","বাংলাদেশের সবচেয়ে স্মার্ট যানবাহন সঙ্গী — বিনামূল্যে, অফলাইন-প্রথম, সকল ৬৪ জেলায় সব ধরনের পরিবহন কভার করে।")})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:i?"1fr":"1fr 1fr",gap:16,marginBottom:40},children:Kr.map(s=>e.jsxs("div",{style:{background:`linear-gradient(135deg, ${s.from} 0%, ${s.to} 100%)`,borderRadius:16,padding:"28px 24px",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",inset:0,background:"rgba(0,0,0,0.15)",pointerEvents:"none",borderRadius:16}}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx("div",{style:{fontSize:32,marginBottom:12},children:s.icon}),e.jsx("h3",{style:{fontFamily:d==="bn"?m:c,fontSize:18,fontWeight:700,color:"#fff",margin:"0 0 8px"},children:r(s.titleEn,s.titleBn)}),e.jsx("p",{style:{fontFamily:d==="bn"?m:c,fontSize:13,color:"rgba(255,255,255,0.85)",margin:0,lineHeight:1.6},children:r(s.descEn,s.descBn)})]})]},s.titleEn))}),e.jsx("div",{style:{background:n.panel,backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:`1px solid ${n.line}`,borderRadius:16,padding:"28px 24px",display:"grid",gridTemplateColumns:i?"1fr 1fr":"repeat(4, 1fr)",gap:24,marginBottom:40,textAlign:"center"},children:Or.map(s=>e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:m,fontSize:i?24:32,fontWeight:800,color:n.primary,lineHeight:1.1,marginBottom:4},children:r(s.valueEn,s.valueBn)}),e.jsx("div",{style:{fontFamily:d==="bn"?m:c,fontSize:13,color:n.textDim},children:r(s.labelEn,s.labelBn)})]},s.labelEn))}),e.jsxs("div",{style:{background:n.panel,backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:`1px solid ${n.line}`,borderRadius:16,padding:"28px 28px",marginBottom:40},children:[e.jsx("h2",{style:{fontFamily:m,fontSize:20,fontWeight:700,color:n.text,margin:"0 0 14px"},children:r("How it started","যেভাবে শুরু হয়েছিল")}),e.jsx("p",{style:{fontFamily:d==="bn"?m:c,fontSize:14,color:n.textDim,margin:"0 0 12px",lineHeight:1.75},children:r("KoyJabo was born out of daily frustration — trying to navigate Dhaka's chaotic public transport with no reliable guide. We built the app we wished existed: one that works offline, covers every mode of transport, speaks your language, and never sells your data.","KoyJabo জন্ম নিয়েছে দৈনন্দিন হতাশা থেকে — কোনো নির্ভরযোগ্য গাইড ছাড়া ঢাকার বিশৃঙ্খল গণপরিবহনে নেভিগেট করার চেষ্টা করতে গিয়ে। আমরা সেই অ্যাপটি তৈরি করেছি যা আমরা চেয়েছিলাম: একটি যা অফলাইনে কাজ করে, সব ধরনের পরিবহন কভার করে, আপনার ভাষায় কথা বলে এবং কখনো আপনার ডেটা বিক্রি করে না।")}),e.jsx("p",{style:{fontFamily:d==="bn"?m:c,fontSize:14,color:n.textDim,margin:0,lineHeight:1.75},children:r("Today KoyJabo serves over 50,000 commuters daily across Bangladesh — from metro passengers in Dhaka to ferry travellers heading to Barisal.","আজ KoyJabo বাংলাদেশ জুড়ে প্রতিদিন ৫০,০০০ এরও বেশি যাত্রীদের সেবা দেয় — ঢাকার মেট্রো যাত্রী থেকে বরিশালগামী ফেরি যাত্রী পর্যন্ত।")})]}),e.jsxs("div",{style:{background:`linear-gradient(135deg, ${n.primary} 0%, #a855f7 100%)`,borderRadius:20,padding:i?"32px 24px":"40px 48px",display:"flex",flexDirection:i?"column":"row",alignItems:i?"flex-start":"center",justifyContent:"space-between",gap:20,marginBottom:40},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{fontFamily:m,fontSize:20,fontWeight:800,color:"#001218",margin:"0 0 6px"},children:r("Install KoyJabo App","KoyJabo অ্যাপ ইনস্টল করুন")}),e.jsx("p",{style:{fontFamily:d==="bn"?m:c,fontSize:13,color:"rgba(0,18,24,0.75)",margin:0,lineHeight:1.6},children:r("Works offline · No app store needed · Add to home screen","অফলাইনে কাজ করে · অ্যাপ স্টোর লাগবে না · হোম স্ক্রিনে যোগ করুন")})]}),e.jsx("button",{onClick:()=>a.onNav("install"),style:{background:"#001218",color:n.primary,border:"none",borderRadius:12,padding:"12px 28px",fontFamily:d==="bn"?m:c,fontSize:14,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0},children:r("Download App","অ্যাপ ডাউনলোড করুন")})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:e.jsx(ee,{tk:n,lang:d,kind:i?"mob-banner":"leaderboard"})})]})})}const Jr=[{role:"Developer",roleBn:"ডেভেলপার",initials:"MB",color:"#3b82f6",desc:"Full-stack, PWA architecture",descBn:"ফুল-স্ট্যাক, PWA আর্কিটেকচার"},{role:"Designer",roleBn:"ডিজাইনার",initials:"RK",color:"#a855f7",desc:"UI/UX, branding",descBn:"ইউআই/ইউএক্স, ব্র্যান্ডিং"},{role:"Data",roleBn:"ডেটা",initials:"SA",color:"#10b981",desc:"Route data, schedules",descBn:"রুট ডেটা, সময়সূচি"},{role:"Community",roleBn:"কমিউনিটি",initials:"FH",color:"#f59e0b",desc:"User research, QA",descBn:"ব্যবহারকারী গবেষণা, QA"}],Yr=[{valueEn:"2 years",valueBn:"২ বছর",labelEn:"Building",labelBn:"নির্মাণকাল"},{valueEn:"50K",valueBn:"৫০ হাজার",labelEn:"Users",labelBn:"ব্যবহারকারী"},{valueEn:"2,400",valueBn:"২,৪০০",labelEn:"Routes",labelBn:"রুট"},{valueEn:"64",valueBn:"৬৪",labelEn:"Districts",labelBn:"জেলা"}],qr=[{icon:"💼",label:"LinkedIn",href:"https://www.linkedin.com/company/koy-jabo/",labelBn:"লিংকডইন"},{icon:"📘",label:"Facebook",href:"https://www.facebook.com/koyjabo/",labelBn:"ফেসবুক"},{icon:"✉️",label:"koyjabo@gmail.com",href:"mailto:koyjabo@gmail.com",labelBn:"ইমেইল"}];function Vr(a){const{theme:o,lang:d,device:t}=a,n=ae[o],i=t==="mobile",r=(s,p)=>l(d,p,s);return e.jsx(ne,{...a,children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto",padding:i?"0 16px 80px":"0 40px 80px"},children:[e.jsxs("div",{style:{textAlign:"center",padding:i?"48px 16px 32px":"72px 48px 40px",marginBottom:32},children:[e.jsx("div",{style:{width:80,height:80,borderRadius:20,background:`linear-gradient(135deg, ${n.primary} 0%, #a855f7 100%)`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",fontSize:36,boxShadow:`0 0 40px ${n.primary}55`,animation:"none"},children:e.jsx("span",{style:{fontFamily:"'Hind Siliguri',sans-serif",fontWeight:700,fontSize:40,color:"#fff",lineHeight:1},children:"ক"})}),e.jsx("h1",{style:{fontFamily:m,fontSize:i?28:38,fontWeight:800,color:n.text,margin:"0 0 12px",background:`linear-gradient(135deg, ${n.primary} 0%, #a855f7 100%)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"},children:r("About KoyJabo","আমাদের সম্পর্কে")}),e.jsx("p",{style:{fontFamily:d==="bn"?m:c,fontSize:16,color:n.textDim,margin:0,lineHeight:1.6},children:r("Bangladesh's transport companion","বাংলাদেশের যানবাহন সঙ্গী")})]}),e.jsxs("div",{style:{background:n.panel,backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:`1px solid ${n.line}`,borderRadius:16,padding:"28px 28px",marginBottom:32},children:[e.jsx("h2",{style:{fontFamily:m,fontSize:18,fontWeight:700,color:n.primary,margin:"0 0 14px"},children:r("Our Story","আমাদের গল্প")}),e.jsx("p",{style:{fontFamily:d==="bn"?m:c,fontSize:14,color:n.textDim,margin:0,lineHeight:1.8},children:r("KoyJabo (কই যাবো = 'Where are you going?') was created to solve the chaos of navigating Dhaka's public transport. We cover buses, metro, trains, launches and flights across all 64 districts. Our mission is simple: make every journey in Bangladesh stress-free and informed.","KoyJabo (কই যাবো = 'কোথায় যাচ্ছেন?') তৈরি হয়েছে ঢাকার গণপরিবহনে নেভিগেট করার বিশৃঙ্খলা সমাধান করতে। আমরা সকল ৬৪ জেলায় বাস, মেট্রো, ট্রেন, লঞ্চ এবং ফ্লাইট কভার করি। আমাদের লক্ষ্য সহজ: বাংলাদেশে প্রতিটি যাত্রা চাপমুক্ত ও সচেতন করা।")})]}),e.jsx("h2",{style:{fontFamily:m,fontSize:18,fontWeight:700,color:n.text,margin:"0 0 16px"},children:r("Our Team","আমাদের দল")}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:i?"1fr 1fr":"repeat(4, 1fr)",gap:14,marginBottom:32},children:Jr.map(s=>e.jsxs("div",{style:{background:n.panel,backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",border:`1px solid ${n.line}`,borderRadius:14,padding:"20px 16px",textAlign:"center"},children:[e.jsx("div",{style:{width:52,height:52,borderRadius:999,background:`linear-gradient(135deg, ${s.color}cc, ${s.color}66)`,border:`2px solid ${s.color}55`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",fontFamily:c,fontWeight:700,fontSize:16,color:"#fff"},children:s.initials}),e.jsx("div",{style:{fontFamily:d==="bn"?m:c,fontSize:14,fontWeight:600,color:n.text,marginBottom:4},children:r(s.role,s.roleBn)}),e.jsx("div",{style:{fontFamily:d==="bn"?m:c,fontSize:11,color:n.textFaint,lineHeight:1.5},children:r(s.desc,s.descBn)})]},s.role))}),e.jsx("div",{style:{background:`linear-gradient(135deg, ${n.primary}22 0%, #a855f755 100%)`,border:`1px solid ${n.primary}33`,borderRadius:16,padding:"24px 24px",display:"grid",gridTemplateColumns:i?"1fr 1fr":"repeat(4, 1fr)",gap:20,marginBottom:32,textAlign:"center"},children:Yr.map(s=>e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:m,fontSize:26,fontWeight:800,color:n.primary,lineHeight:1.1,marginBottom:4},children:r(s.valueEn,s.valueBn)}),e.jsx("div",{style:{fontFamily:d==="bn"?m:c,fontSize:12,color:n.textDim},children:r(s.labelEn,s.labelBn)})]},s.labelEn))}),e.jsx("h2",{style:{fontFamily:m,fontSize:18,fontWeight:700,color:n.text,margin:"0 0 14px"},children:r("Contact & Links","যোগাযোগ ও লিংক")}),e.jsx("div",{style:{display:"flex",flexDirection:i?"column":"row",gap:12,marginBottom:40},children:qr.map(s=>e.jsxs("a",{href:s.href,target:"_blank",rel:"noopener noreferrer",style:{background:n.panel,backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",border:`1px solid ${n.line}`,borderRadius:12,padding:"14px 20px",display:"flex",alignItems:"center",gap:10,textDecoration:"none",color:n.textDim,fontFamily:d==="bn"?m:c,fontSize:13,fontWeight:500,flex:i?void 0:1},children:[e.jsx("span",{style:{fontSize:18},children:s.icon}),e.jsx("span",{children:r(s.label,s.labelBn)})]},s.label))}),e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:e.jsx(ee,{tk:n,lang:d,kind:i?"mob-banner":"leaderboard"})})]})})}const jt=[{id:"ai-traffic-system-dhaka-violations-fines",slug:"ai-traffic-system-dhaka-violations-fines",title:"Dhaka Traffic Rules, Violations & Fine List (2026 Guide)",bnTitle:"ঢাকার ট্রাফিক আইন, লঙ্ঘন ও জরিমানার তালিকা (২০২৬ গাইড)",excerpt:"A major change is coming to Dhaka's traffic system. DMP's new AI-based initiative will automatically detect traffic violations at key intersections.",bnExcerpt:"ঢাকার ট্রাফিক সিস্টেমে বড় পরিবর্তন শুরু হয়ে গেছে। এখন থেকে শুধু ট্রাফিক পুলিশ না—AI-based system নিজেই শনাক্ত করবে কে আইন ভাঙছে।",coverImage:"/blog/ai-traffic-system-dhaka-violations-fines.jpg",author:"KoyJabo Team",publishDate:"2026-04-30",readTime:"4 min read",keywords:["Dhaka AI traffic system","DMP smart cameras Dhaka","traffic fine Bangladesh","automated traffic enforcement Dhaka","Dhaka smart city","KoyJabo traffic guide","avoid traffic fines Dhaka","DMP Hello app","smart traffic signal Dhaka"],category:"Tips & Tricks",content:`
A major change is finally arriving in Dhaka's traffic management. From now on, it's not just the traffic police you need to watch out for — **an AI-based system will automatically detect who is breaking the law.**

According to the new initiative by the Dhaka Metropolitan Police (DMP), smart cameras are being installed at key intersections across the city to automatically detect traffic violations.

---

## 🔍 What's Changing?

✅ **Smart traffic signals** at 25+ major intersections
✅ **24/7 camera monitoring**
✅ **AI detection** for:
- 🚫 Breaking traffic signals
- 🚧 Illegal lane changes
- ⚠️ Other traffic violations

👉 **Direct legal action** will follow — there will be no room for escaping the system.

---

## ⚡ Why is this a Game Changer?

**Before:**
- Manual checks by officers
- Time-consuming process
- High chance of escaping undetected

**Now:**
- 🤖 Automated AI surveillance
- ⚡ Instant detection and processing
- 🔒 Minimal loopholes

---

## 📱 Other Smart Systems Coming Soon

🔹 **Hello DMP App**
Direct access to police services, complaints, and feedback.

🔹 **Hotel Information System**
Real-time guest data for enhanced city security.

🔹 **7+ New DMP Softwares**
Making operations faster, more transparent, and fully digital.

---

## 🧠 Why KoyJabo.com is Essential Now

AI will now catch your mistakes — but **who will help you plan your journey to avoid those mistakes?**

This is where **KoyJabo.com** comes in.

**KoyJabo.com** helps you plan ahead:
- 🚌 Find the **correct bus routes**
- 🚇 Create smart trips by **combining Metro Rail + Bus**
- ⏱️ Choose the **shortest routes** to save time
- 💰 **Calculate costs** beforehand

👉 This means you will know in advance:
- Which roads are less chaotic
- Where the heaviest traffic is
- Which routes have the lowest risk of delays

---

## 🎯 The Real Impact

**AI + Smart Planning = 🚀 Smart City Movement**

- Reduced traffic violations
- Increased discipline on the roads
- Fewer hassles and fines for commuters
- A smoother, easier daily life

---

---

## 💰 Dhaka Traffic Violation Fines (2026)

| Violation Type | Fine Amount (Estimated) |
|----------------|-------------------------|
| Speeding | ৳2,000 - ৳5,000 |
| Signal Jumping | ৳1,000 - ৳3,000 |
| Illegal Parking | ৳500 - ৳1,500 |
| Driving Without License | ৳5,000 - ৳25,000 |

👉 **Pro Tip:** Always carry your digital license in the **DL Checker** app to avoid unnecessary delays.

---

## 🔥 Final Thoughts

Dhaka is moving towards an **AI-driven traffic system**. The technology is getting smarter, and it's time for us to be smart too.

**Before the AI catches you, plan your journey.**

🌐 Plan your journey smartly with: **[KoyJabo.com](https://koyjabo.com)**
🚀 Travel smart. Stay safe. Avoid violations.

#DhakaTraffic #SmartCity #AI #KoyJabo #SafeTravel #Bangladesh #TrafficFines
`,bnContent:`
ঢাকার ট্রাফিক সিস্টেমে বড় পরিবর্তন শুরু হয়ে গেছে। এখন থেকে শুধু ট্রাফিক পুলিশ না—**AI-based system নিজেই শনাক্ত করবে কে আইন ভাঙছে**।

ডিএমপির নতুন উদ্যোগ অনুযায়ী, শহরের গুরুত্বপূর্ণ মোড়গুলোতে বসানো হচ্ছে স্মার্ট ক্যামেরা, যা অটোমেটিকভাবে ট্রাফিক ভায়োলেশন ডিটেক্ট করবে।

---

## 🔍 কী কী পরিবর্তন আসছে?

✅ ২৫+ মোড়ে স্মার্ট ট্রাফিক সিগন্যাল
✅ ২৪/৭ ক্যামেরা মনিটরিং
✅ AI দিয়ে শনাক্ত করা হবে:
- 🚫 সিগন্যাল ভাঙা
- 🚧 লেন পরিবর্তনের ভুল
- ⚠️ অন্যান্য ট্রাফিক আইন লঙ্ঘন

👉 এরপর সরাসরি আইনগত ব্যবস্থা—কোনো ছাড় নেই।

---

## ⚡ কেন এটা গেম চেঞ্জার?

**আগে:**
- ম্যানুয়াল চেক
- সময়সাপেক্ষ
- অনেক ক্ষেত্রে এড়িয়ে যাওয়া সম্ভব ছিল

**এখন:**
- 🤖 অটোমেটেড AI নজরদারি
- ⚡ দ্রুত ব্যবস্থা
- 🔒 কম ফাঁকফোকর

---

## 📱 আরও যেসব স্মার্ট সিস্টেম আসছে

🔹 **Hello DMP App**
সরাসরি পুলিশ সেবা, অভিযোগ, ফিডব্যাক।

🔹 **Hotel Information System**
রিয়েল-টাইম গেস্ট ডাটা, উন্নত সিকিউরিটি।

🔹 **ডিএমপির ৭+ নতুন সফটওয়্যার**
অপারেশন হবে আরও দ্রুত, ট্রান্সপারেন্ট ও ডিজিটাল।

---

## 🧠 এখানে KoyJabo.com কেন গুরুত্বপূর্ণ?

AI এখন ভুল ধরবে—কিন্তু **ভুল না করার প্ল্যানিংটা কে করবে?**

 এখানেই আসে **KoyJabo.com**

**KoyJabo.com** আপনাকে আগে থেকেই হেল্প করে:
- 🚌 সঠিক বাস রুট খুঁজতে
- 🚇 মেট্রো + বাস কম্বাইন করে স্মার্ট ট্রিপ বানাতে
- ⏱️ কম সময়ের রুট বেছে নিতে
- 💰 খরচ হিসাব করতে

👉 মানে, আপনি আগে থেকেই জানবেন:
- কোন রাস্তায় কম ঝামেলা
- কোথায় ট্রাফিক বেশি
- কোন রুটে রিস্ক কম

---

## 🎯 Real Impact

**AI + Smart Planning = 🚀 Smart City Movement**

- ট্রাফিক আইন ভাঙা কমবে
- রাস্তায় ডিসিপ্লিন বাড়বে
- ঝামেলা ও জরিমানা কমবে
- কমিউটার লাইফ হবে সহজ

---

## 🔥 শেষ কথা

ঢাকা এখন যাচ্ছে **AI-driven traffic system**-এর দিকে। এখন স্মার্ট হওয়া আপনার হাতে: **AI ধরার আগে, আপনি প্ল্যান করুন।**

🌐 Plan your journey smartly with: **[KoyJabo.com](https://koyjabo.com)**
🚀 Travel smart. Stay safe. Avoid violations.

#ঢাকা #ট্রাফিক #AI #KoyJabo #নিরাপদ_ভ্রমণ #বাংলাদেশ
`},{id:"complete-guide-getting-around-dhaka",slug:"complete-guide-getting-around-dhaka",title:"How to Travel in Dhaka: Transport Guide for Tourists (2026)",bnTitle:"কিভাবে ঢাকায় যাতায়াত করবেন: পর্যটকদের জন্য ট্রান্সপোর্ট গাইড (২০২৬)",excerpt:"Everything you need to know about transport in Dhaka — buses, metro rail, rickshaws, CNGs, ride-hailing apps, and how to navigate the city like a local.",bnExcerpt:"ঢাকায় যাতায়াতের সব তথ্য এক জায়গায় — বাস, মেট্রো, রিকশা, সিএনজি, রাইড-হেইলিং অ্যাপ এবং কীভাবে শহরটি চেনা মানুষের মতো চলতে পারবেন।",coverImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Drone_view_from_Kamal_Atat%C3%BCrk_Avenue.jpg/960px-Drone_view_from_Kamal_Atat%C3%BCrk_Avenue.jpg",author:"KoyJabo Team",publishDate:"2026-04-28",readTime:"8 min read",keywords:["how to get around Dhaka","Dhaka transportation guide","Dhaka transport 2026","getting around Bangladesh","Dhaka bus guide","Dhaka metro rail","rickshaw Dhaka","CNG auto rickshaw Bangladesh","ride hailing Dhaka","Pathao Dhaka","Shohoz Dhaka","Uber Dhaka","Dhaka travel tips for tourists","Bangladesh travel guide","Dhaka expat guide","KoyJabo app","public transport Dhaka","how to travel Dhaka cheaply"],category:"Travel Guide",content:`
Dhaka is one of the most densely populated cities in the world, but getting around is more manageable than it looks — if you know your options. This guide covers every transport mode available in Dhaka in 2026, from the modern MRT Metro to the classic cycle rickshaw.

---

## 1. Metro Rail (MRT Line 6) — The Fastest Option

The Dhaka Metro Rail, officially **MRT Line 6**, runs from **Uttara North to Motijheel** and is the fastest way to cross the city. Avoid peak-hour traffic completely.

| Station | Zone |
|--------|------|
| Uttara North | Northern End |
| Agargaon | Mirpur Road |
| Farmgate | Central |
| Shahbag | University Area |
| Dhaka University | Old Dhaka Gateway |
| Motijheel | Business District |

**Fares:** ৳20–৳100 depending on distance
**Hours:** 7:00 AM – 10:00 PM
**Tips:** Use the MRT Pass card to skip queues. Women-only coaches are available at the front.

---

## 2. City Buses — Cheapest Way to Travel

City buses connect almost every corner of Dhaka. Fares start from ৳5 and go up to ৳40 for longer routes.

### Key Bus Terminals
- **Sayedabad** — Southeast Dhaka, intercity buses to Chittagong, Barisal
- **Gabtoli** — Northwest Dhaka, routes to Rajshahi, Rangpur, Khulna
- **Mohakhali** — North Dhaka, routes to Mymensingh, Sylhet

**Tip:** Use **KoyJabo (koyjabo.com)** to find the exact bus route between any two points in Dhaka. It shows route numbers, stops, and estimated fares.

---

## 3. Ride-Hailing Apps — Convenient and Safe

Three major apps operate in Dhaka:

| App | Type | Best For |
|-----|------|----------|
| Pathao | Bike, Car | Quick trips, traffic shortcuts |
| Shohoz | Bike, Car | Budget rides |
| Uber | Car, Premium | Comfort, airport transfers |

Bike rides (via Pathao/Shohoz) are significantly faster during peak hours since motorcycles can navigate traffic.

---

## 4. CNG Auto-Rickshaws — For Short to Medium Trips

CNG-powered three-wheelers are everywhere in Dhaka. **Always negotiate the fare before getting in** or insist on the meter.

- Short trip (2–3 km): ৳60–৳100
- Medium trip (5–7 km): ৳150–৳250
- Never pay more than double the starting meter rate

---

## 5. Rickshaws — For Short Distances

Cycle rickshaws are ideal for trips under 2 km, especially in Old Dhaka where cars can't go. Agree on the price before boarding.

- Typical short trip: ৳20–৳50

---

## 6. BRTA-Licensed Taxis

Metered taxis are available but less common. They're comfortable and air-conditioned. Fare: ৳40 flag-fall + ৳15/km.

---

## Planning Your Route

The easiest way to plan any journey in Dhaka is to use **KoyJabo** — Bangladesh's most comprehensive transport guide app. Enter your starting point and destination, and it shows you:

- Which buses to take
- Estimated journey time
- Fare ranges
- Walking connections to metro stations

Visit **[koyjabo.com](https://koyjabo.com)** or install the app for offline use.

---

## Essential Tips for Navigating Dhaka

1. **Leave early or late** — 8–10 AM and 5–8 PM are the worst traffic times
2. **Use the Metro whenever possible** — saves 40–60 minutes on major corridors
3. **Keep small change** — buses and rickshaws don't always have change
4. **Learn a few Bengali words** — "Kothay jaben?" (Where are you going?) goes a long way
5. **Use KoyJabo app** — plan before you go, always

---

Dhaka rewards those who understand its transport system. With a metro card in your pocket and KoyJabo on your phone, you're ready to navigate the city efficiently.

🔗 [https://koyjabo.com](https://koyjabo.com)

#Dhaka #DhakaTransport #BangladeshTravel #TravelGuide #KoyJabo
`,bnContent:`
ঢাকা পৃথিবীর সবচেয়ে ঘনবসতিপূর্ণ শহরগুলোর একটি। কিন্তু যদি বিকল্পগুলো জানা থাকে, তাহলে এই শহরে চলাচল করা আপনার ধারণার চেয়ে অনেক সহজ। এই গাইডে ২০২৬ সালের ঢাকার প্রতিটি পরিবহন মাধ্যম নিয়ে বিস্তারিত আলোচনা করা হয়েছে।

---

## ১. মেট্রোরেল (এমআরটি লাইন ৬) — সবচেয়ে দ্রুত বিকল্প

ঢাকা মেট্রোরেল **উত্তরা থেকে মতিঝিল** পর্যন্ত চলে। রাস্তার যানজট পুরোপুরি এড়িয়ে শহর পার করুন।

**ভাড়া:** ২০–১০০ টাকা দূরত্ব অনুযায়ী
**সময়:** সকাল ৭টা – রাত ১০টা

---

## ২. সিটি বাস — সবচেয়ে সাশ্রয়ী

সিটি বাসে ঢাকার প্রতিটি কোণে পৌঁছানো যায়। ভাড়া শুরু হয় ৫ টাকা থেকে।

**KoyJabo (koyjabo.com)** ব্যবহার করে যেকোনো রুটের বাস নম্বর, স্টপেজ এবং আনুমানিক ভাড়া জানুন।

---

## ৩. রাইড-হেইলিং অ্যাপ — সুবিধাজনক ও নিরাপদ

| অ্যাপ | ধরন | কখন ব্যবহার করবেন |
|------|-----|-----------------|
| পাঠাও | বাইক, কার | দ্রুত ট্রিপ |
| শহজ | বাইক, কার | সাশ্রয়ী যাত্রা |
| উবার | কার | এয়ারপোর্ট, কমফোর্ট |

---

## ৪. সিএনজি অটোরিকশা

সিএনজিতে উঠার আগে **ভাড়া ঠিক করুন** অথবা মিটারে চলার কথা বলুন।

---

## ৫. রিকশা — ছোট দূরত্বের জন্য

২ কিলোমিটারের কম দূরত্বের জন্য রিকশাই সেরা। পুরান ঢাকায় গাড়ি যেখানে যেতে পারে না, রিকশা সেখানেও যায়।

---

## রুট পরিকল্পনা

ঢাকার যেকোনো যাত্রার পরিকল্পনা করতে **KoyJabo** ব্যবহার করুন — কোন বাসে যাবেন, কত ভাড়া লাগবে, মেট্রো কোথা থেকে নিতে হবে — সব তথ্য এক জায়গায়।

🔗 [https://koyjabo.com](https://koyjabo.com)

#ঢাকা #DhakaTransport #KoyJabo
`},{id:"dhaka-metro-rail-mrt-line-6-complete-guide",slug:"dhaka-metro-rail-mrt-line-6-complete-guide",title:"Dhaka Metro Rail MRT Line 6 Guide: Route, Ticket & Timing",bnTitle:"ঢাকা মেট্রোরেল এমআরটি লাইন ৬ গাইড: রুট, টিকিট ও সময়সূচী",excerpt:"Everything about Dhaka's MRT Line 6 — all stations, fares, operating hours, MRT Pass card, tips for first-time riders, and how it connects to buses and other transport.",bnExcerpt:"ঢাকার মেট্রোরেল সম্পর্কে সব কিছু — স্টেশন, ভাড়া, সময়সূচি, এমআরটি পাস কার্ড এবং প্রথমবার যাত্রীদের জন্য টিপস।",coverImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/MRT_Line_6_train_%28cropped%29.jpg/960px-MRT_Line_6_train_%28cropped%29.jpg",author:"KoyJabo Team",publishDate:"2026-04-27",readTime:"6 min read",keywords:["Dhaka Metro Rail guide","MRT Line 6 Bangladesh","Dhaka metro stations","metro fare Dhaka","MRT Pass Dhaka","Uttara to Motijheel metro","ঢাকা মেট্রোরেল","মেট্রো ভাড়া","MRT card Dhaka","metro rail schedule Bangladesh","Dhaka rapid transit","metro etiquette Bangladesh","Dhaka commute metro","KoyJabo metro guide","public transport Bangladesh"],category:"Metro Rail",content:`
Dhaka's **MRT Line 6** transformed daily commuting for millions of people. What used to be a 90-minute bus crawl from Uttara to Motijheel is now a 40-minute metro ride. Here's everything you need to know.

---

## All Stations on MRT Line 6

| # | Station | Key Connection |
|---|---------|---------------|
| 1 | Uttara North | Northern residential hub |
| 2 | Uttara Centre | Shopping areas |
| 3 | Uttara South | Bus links |
| 4 | Pallabi | Mirpur residential |
| 5 | Mirpur 11 | Commercial area |
| 6 | Mirpur 10 | Mirpur Circle |
| 7 | Kazipara | Kafrul area |
| 8 | Shewrapara | Western Dhaka |
| 9 | Agargaon | NID offices, hospitals |
| 10 | Bijoy Sarani | Army Stadium area |
| 11 | Farmgate | Central Dhaka |
| 12 | Kawranbazar | Media hub |
| 13 | Shahbag | Hospitals, university |
| 14 | Dhaka University | Student hub |
| 15 | Bangladesh Secretariat | Government offices |
| 16 | Motijheel | Business district |

---

## Fares (2026)

Fares are distance-based:

| Distance | Fare |
|----------|------|
| 1–2 stations | ৳20 |
| 3–5 stations | ৳40 |
| 6–8 stations | ৳60 |
| 9–12 stations | ৳80 |
| Full route (Uttara–Motijheel) | ৳100 |

---

## Operating Hours

- **Weekdays:** 7:00 AM – 10:00 PM
- **Weekends/Holidays:** 8:00 AM – 10:00 PM
- Trains run every **8–10 minutes** during peak hours

---

## MRT Pass Card

Get the **MRT Pass** (rechargeable smart card) to:
- Skip cash queues entirely
- Board faster at turnstiles
- Get potential fare discounts on future updates

**How to get one:** Available at any metro station's customer service counter. Initial deposit: ৳200 (reusable card value included).

---

## Women-Only Coach

The **first coach** on every train is reserved for women. It is strictly enforced and air-conditioned. Men may not board the first coach.

---

## Accessibility

- All stations have **elevators and escalators**
- Dedicated spaces for wheelchair users
- Audio announcements in Bengali and English
- Tactile guidance paths on platforms

---

## Connecting to Buses and Other Transport

At major stations, you can connect to city buses:

- **Farmgate** → buses to Mirpur, Gulshan, Banani
- **Shahbag** → buses to Paltan, Old Dhaka
- **Motijheel** → buses across Old and Southeast Dhaka

**KoyJabo** shows you exactly which bus to take after exiting any metro station. Plan your full multimodal journey at [koyjabo.com](https://koyjabo.com).

---

## Tips for First-Time Riders

1. **Buy token or use MRT Pass** at the ticket counter before entering
2. **Stand right, walk left** on escalators
3. **Let passengers exit first** before you board
4. **Keep your ticket** — you'll need it to exit at the destination gate
5. **Avoid rush hour (8–10 AM, 5–7 PM)** if you can — trains get very crowded

---

## Is It Worth It vs. Bus?

| | Metro | City Bus |
|-|-------|---------|
| Speed | ⚡ Fast | 🐢 Slow in traffic |
| Cost | ৳20–৳100 | ৳5–৳40 |
| Comfort | ✅ Air-conditioned | Variable |
| Coverage | 16 stations | City-wide |

For the Uttara–Motijheel corridor, **metro wins every time.** For destinations off the metro line, combine metro + bus with KoyJabo's route planner.

🔗 [https://koyjabo.com](https://koyjabo.com)

#DhakaMetro #MRTLine6 #DhakaTransport #Bangladesh #KoyJabo
`,bnContent:`
ঢাকার **এমআরটি লাইন ৬** লক্ষ লক্ষ মানুষের দৈনন্দিন যাত্রাকে বদলে দিয়েছে। উত্তরা থেকে মতিঝিল যেখানে আগে বাসে ৯০ মিনিট লাগত, এখন মেট্রোয় লাগে মাত্র ৪০ মিনিট।

---

## এমআরটি লাইন ৬-এর সব স্টেশন

| # | স্টেশন | গুরুত্বপূর্ণ সংযোগ |
|---|--------|----------------|
| ১ | উত্তরা নর্থ | উত্তরা আবাসিক এলাকা |
| ২ | উত্তরা সেন্টার | শপিং এলাকা |
| ৩ | উত্তরা সাউথ | বাস সংযোগ |
| ৪ | পল্লবী | মিরপুর আবাসিক |
| ৫ | মিরপুর ১১ | বাণিজ্যিক এলাকা |
| ৬ | মিরপুর ১০ | মিরপুর চত্বর |
| ৭ | কাজীপাড়া | কাফরুল এলাকা |
| ৮ | শেওড়াপাড়া | পশ্চিম ঢাকা |
| ৯ | আগারগাঁও | এনআইডি অফিস, হাসপাতাল |
| ১০ | বিজয় সরণি | আর্মি স্টেডিয়াম এলাকা |
| ১১ | ফার্মগেট | কেন্দ্রীয় ঢাকা |
| ১২ | কাওরানবাজার | মিডিয়া হাব |
| ১৩ | শাহবাগ | হাসপাতাল, বিশ্ববিদ্যালয় |
| ১৪ | ঢাকা বিশ্ববিদ্যালয় | শিক্ষার্থী কেন্দ্র |
| ১৫ | বাংলাদেশ সচিবালয় | সরকারি অফিস |
| ১৬ | মতিঝিল | ব্যবসায়িক জেলা |

---

## ভাড়া (২০২৬)

| দূরত্ব | ভাড়া |
|--------|------|
| ১–২ স্টেশন | ২০ টাকা |
| ৩–৫ স্টেশন | ৪০ টাকা |
| ৬–৮ স্টেশন | ৬০ টাকা |
| সম্পূর্ণ রুট | ১০০ টাকা |

---

## পরিচালনার সময়

- **কর্মদিবস:** সকাল ৭টা – রাত ১০টা
- **সাপ্তাহিক ছুটি:** সকাল ৮টা – রাত ১০টা

---

## এমআরটি পাস কার্ড

রিচার্জযোগ্য **এমআরটি পাস কার্ড** ব্যবহার করুন — টিকিট কাউন্টারে লাইন দেওয়া এড়িয়ে দ্রুত প্রবেশ করুন।

---

## নতুন যাত্রীদের জন্য টিপস

১. এস্কেলেটরে **ডানে দাঁড়ান, বামে হাঁটুন**
২. ট্রেন থেকে **আগে নামতে দিন**, তারপর উঠুন
৩. টিকিট রাখুন — বের হওয়ার গেটেও লাগবে

**KoyJabo** দিয়ে মেট্রো থেকে নামার পর কোন বাসে চড়তে হবে তাও জানুন।

🔗 [https://koyjabo.com](https://koyjabo.com)

#মেট্রোরেল #DhakaMetro #MRTLine6 #KoyJabo
`},{id:"dhaka-to-coxs-bazar-travel-guide",slug:"dhaka-to-coxs-bazar-travel-guide",title:"Dhaka to Cox’s Bazar Travel Cost, Bus & Train Guide (2026)",bnTitle:"ঢাকা থেকে কক্সবাজার ভ্রমণের খরচ, বাস ও ট্রেন গাইড (২০২৬)",excerpt:"Planning a trip from Dhaka to Cox's Bazar? Here's every option — overnight buses, the new train route, and budget flights — with fares, duration, and tips to make the journey smooth.",bnExcerpt:"ঢাকা থেকে কক্সবাজার যাওয়ার সব উপায় — নাইটকোচ বাস, ট্রেন এবং বিমান। ভাড়া, সময় এবং সেরা টিপস সহ।",coverImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/A_dusk_at_Cox%27s_Bazar_sea_beach.jpg/960px-A_dusk_at_Cox%27s_Bazar_sea_beach.jpg",author:"KoyJabo Team",publishDate:"2026-04-26",readTime:"7 min read",keywords:["Dhaka to Cox's Bazar bus","Dhaka to Coxs Bazar travel guide","Cox's Bazar transport guide","overnight bus Dhaka Coxs Bazar","Dhaka Coxs Bazar train","Dhaka Coxs Bazar flight","Coxs Bazar travel tips","ঢাকা থেকে কক্সবাজার","কক্সবাজার বাস ভাড়া","Bangladesh beach travel","Cox's Bazar tourism","KoyJabo travel guide","Bangladesh travel 2026","Sayedabad bus terminal","Green Line bus Dhaka"],category:"Travel Guide",content:`
Cox's Bazar is the world's longest natural sea beach — 120 km of unbroken coastline. It's Bangladesh's most popular tourist destination, and it's 400 km south of Dhaka. Here's how to get there.

---

## Option 1: Overnight Bus (Most Popular)

**Departure point:** Sayedabad Bus Terminal, Dhaka
**Journey time:** 8–10 hours
**Best choice for:** Budget travelers and those wanting to save on accommodation

### Top Bus Services

| Bus Company | Type | Fare (approx) |
|-------------|------|--------------|
| Green Line | AC Sleeper | ৳1,200–৳1,500 |
| Shyamoli | AC Chair | ৳900–৳1,100 |
| Hanif Enterprise | Non-AC | ৳700–৳900 |
| S Alam | AC Chair | ৳900–৳1,100 |
| Soudia | AC Coach | ৳1,000–৳1,200 |

**Book in advance** — especially during Eid, Puja, and December holidays when seats sell out days ahead.

> **Pro Tip:** Take an overnight bus (departing 9–11 PM) and arrive at Cox's Bazar in the morning. You save a night's hotel cost and wake up ready to explore.

---

## Option 2: Train to Dohazari + Bus

A direct Dhaka–Cox's Bazar railway is under construction. For now, the closest option is:

1. Train: Dhaka → Chittagong (6–7 hours, ৳300–৳800)
2. Bus: Chittagong → Cox's Bazar (3 hours, ৳150–৳250)

This takes longer total but some travelers prefer the train leg for comfort.

---

## Option 3: Flight (Fastest)

**Route:** Dhaka Hazrat Shahjalal → Cox's Bazar Airport
**Airlines:** Biman Bangladesh, Novoair, US-Bangla
**Duration:** ~55 minutes
**Fare:** ৳3,500–৳8,000 one-way (varies greatly, book early for best prices)

Flights make sense if your time is limited or you're booking business travel. Cox's Bazar Airport is well-connected, and the view of the Bay of Bengal on descent is spectacular.

---

## New Fare (Post-2025 Hike)

As of 2026, bus fares from Dhaka to Cox's Bazar have increased to approximately **৳1,189 on 40-seat AC coaches**. See our [bus fare guide](/blog/long-distance-bus-fare-hike-bangladesh) for the full breakdown.

---

## What to Know Before You Go

### Best Time to Visit
- **October–March** — best weather, clear skies, calm sea
- **April–September** — monsoon, rough sea; not ideal for beach

### Getting Around Cox's Bazar
- **Hotel zone to beach:** 5-minute walk or auto-rickshaw (৳30–৳50)
- **Inani Beach:** 27 km south — take a CNG (৳200–৳300 one-way)
- **Himchori:** 18 km south — CNG ৳150–৳200

---

---

## 🏨 Where to Stay: Best Hotels in Cox's Bazar

Looking for a place to stay? Here are some top-rated options (Affiliate Links):

*   **Premium:** [Sayeman Beach Resort](https://www.booking.com/searchresults.en-gb.html?ss=Sayeman+Beach+Resort&aid=YOUR_ID) - The best sea view in town.
*   **Comfort:** [Hotel Sea Crown](https://www.agoda.com/search?q=Hotel+Sea+Crown+Cox+Bazar&aid=YOUR_ID) - Directly on the beach.
*   **Budget:** [Hotel Media International](https://www.booking.com/searchresults.en-gb.html?ss=Hotel+Media+International&aid=YOUR_ID) - Affordable and central.

---

## 💰 Estimated Trip Cost (Per Person)

*   **Budget:** ৳5,000 - ৳7,000 (Non-AC Bus + Budget Hotel)
*   **Mid-range:** ৳10,000 - ৳15,000 (AC Bus + 3-Star Hotel)
*   **Luxury:** ৳25,000+ (Flight + 5-Star Resort)

---

## How KoyJabo Helps

Before heading to Sayedabad terminal, use **KoyJabo** to find the best bus route to get there from your location in Dhaka.

👉 [koyjabo.com](https://koyjabo.com) — plan your city route before the long-distance journey

---

Cox's Bazar is worth every kilometer. Whether you choose the overnight bus for the adventure and savings, or the flight for speed — the beach at the end is the reward.

🔗 [https://koyjabo.com](https://koyjabo.com)

#CoxsBazar #DhakaTravel #BangladeshTourism #TravelBangladesh #KoyJabo #TravelCost
`,bnContent:`
কক্সবাজার পৃথিবীর দীর্ঘতম প্রাকৃতিক সমুদ্র সৈকত — ১২০ কিলোমিটার অবিচ্ছিন্ন উপকূলরেখা। এটি বাংলাদেশের সবচেয়ে জনপ্রিয় পর্যটন গন্তব্য এবং ঢাকা থেকে ৪০০ কিলোমিটার দক্ষিণে অবস্থিত।

---

## বিকল্প ১: নাইটকোচ বাস (সবচেয়ে জনপ্রিয়)

**ছাড়ার স্থান:** সায়েদাবাদ বাস টার্মিনাল
**যাত্রার সময়:** ৮–১০ ঘণ্টা

### শীর্ষ বাস সার্ভিস

| বাস কোম্পানি | ধরন | আনুমানিক ভাড়া |
|------------|-----|-------------|
| গ্রীন লাইন | এসি স্লিপার | ১,২০০–১,৫০০ টাকা |
| শ্যামলী | এসি চেয়ার | ৯০০–১,১০০ টাকা |
| হানিফ এন্টারপ্রাইজ | নন-এসি | ৭০০–৯০০ টাকা |
| এস আলম | এসি চেয়ার | ৯০০–১,১০০ টাকা |

> **পরামর্শ:** রাত ৯–১১টায় বাসে উঠুন, সকালে কক্সবাজার পৌঁছান। একরাতের হোটেল খরচ বাঁচান।

---

## বিকল্প ২: বিমান (সবচেয়ে দ্রুত)

**রুট:** হযরত শাহজালাল → কক্সবাজার বিমানবন্দর
**সময়:** মাত্র ৫৫ মিনিট
**ভাড়া:** ৩,৫০০–৮,০০০ টাকা

---

## কক্সবাজার ভ্রমণের সেরা সময়

- **অক্টোবর–মার্চ** — সর্বোত্তম আবহাওয়া, শান্ত সমুদ্র
- **এপ্রিল–সেপ্টেম্বর** — বর্ষাকাল, উত্তাল সমুদ্র

---

সায়েদাবাদ টার্মিনালে যাওয়ার আগে **KoyJabo** দিয়ে আপনার অবস্থান থেকে সেরা রুট খুঁজে নিন।

🔗 [https://koyjabo.com](https://koyjabo.com)

#কক্সবাজার #BangladeshTourism #KoyJabo
`},{id:"dhaka-to-chittagong-travel-guide",slug:"dhaka-to-chittagong-travel-guide",title:"Dhaka to Chittagong: Complete Travel Guide 2026",bnTitle:"ঢাকা থেকে চট্টগ্রাম: সম্পূর্ণ ট্রাভেল গাইড ২০২৬",excerpt:"Dhaka to Chittagong by bus, train, or flight — fares, journey times, best options for different budgets, and what to expect on Bangladesh's busiest intercity route.",bnExcerpt:"ঢাকা থেকে চট্টগ্রাম বাস, ট্রেন বা বিমানে — ভাড়া, সময়, এবং বাংলাদেশের সবচেয়ে ব্যস্ত রুটে কী আশা করতে পারেন।",coverImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Agrabad_Commercial_Area.jpg/960px-Agrabad_Commercial_Area.jpg",author:"KoyJabo Team",publishDate:"2026-04-25",readTime:"6 min read",keywords:["Dhaka to Chittagong bus","Dhaka Chittagong travel guide","ঢাকা চট্টগ্রাম বাস ভাড়া","Dhaka Chittagong train","Dhaka Chittagong flight","Chittagong travel Bangladesh","Shonarbangla train Dhaka","Green Line Dhaka Chittagong","Bangladesh intercity bus","KoyJabo Chittagong guide","Sayedabad to Chittagong","Subarna Express train"],category:"Travel Guide",content:`
Dhaka to Chittagong (also spelled Chattogram) is Bangladesh's busiest intercity corridor — covering 244 km between the capital and the country's main port city. You have three options: bus, train, or flight.

---

## Option 1: Bus

**Departure:** Sayedabad Bus Terminal
**Duration:** 4–6 hours (depending on traffic)
**Fare range:** ৳555–৳750 (new 2026 rates, varies by bus type)

### Best Bus Services

| Bus | Type | Fare |
|-----|------|------|
| Green Line | AC Sleeper | ৳700–৳750 |
| S Alam | AC Chair | ৳600–৳650 |
| Shyamoli | AC Coach | ৳555–৳600 |
| Hanif Enterprise | Non-AC | ৳350–৳450 |
| Soudia | AC Chair | ৳600–৳650 |

**Book online** via company websites or Shohoz to guarantee a seat during holidays.

---

## Option 2: Train (Recommended for Comfort)

Trains are air-conditioned, punctual, and comfortable on this route.

### Key Trains

| Train | Type | Departure | Duration |
|-------|------|-----------|----------|
| Subarna Express | Intercity | 7:00 AM | ~5.5 hrs |
| Turna Nishitha | Intercity (Night) | 11:00 PM | ~6 hrs |
| Sonnar Bangla | Intercity | 7:30 AM | ~5 hrs |
| Mahanagar Provati | Intercity | 7:40 AM | ~6 hrs |

**Fares:**
- Shuvon (Chair): ৳300
- Shuvon Chair AC: ৳500
- Snigdha (AC Business): ৳800
- AC Berth: ৳1,000+

**Book online** at [eticket.railway.gov.bd](https://eticket.railway.gov.bd) up to 10 days in advance.

---

## Option 3: Flight

| Airline | Duration | Fare |
|---------|----------|------|
| Biman Bangladesh | ~55 min | ৳3,000–৳6,000 |
| Novoair | ~55 min | ৳3,000–৳7,000 |
| US-Bangla | ~55 min | ৳2,800–৳6,500 |

Flights make sense for business travelers or when trains/buses are fully booked.

---

## Which Option Is Best?

| Priority | Best Option |
|----------|------------|
| Budget | Non-AC bus |
| Comfort | Train (Snigdha class) |
| Speed | Flight |
| Overnight | AC Sleeper bus or night train |

For most travelers, the **train is the best balance** of comfort, price, and reliability.

---

## What to Do in Chittagong

- **Patenga Beach** — city beach, 22 km from city center
- **Chittagong Hill Tracts** — access point to Rangamati, Bandarban, Khagrachari
- **Karnaphuli River** — scenic riverfront
- **Foy's Lake** — natural lake with amusement park
- **Old port area** — historic ship-breaking yards

---

## Planning Your Dhaka Trip

Before heading to Sayedabad or Kamalapur station, use **KoyJabo** to find the best route from your location.

🔗 [https://koyjabo.com](https://koyjabo.com)

#Chittagong #DhakaToChittagong #Bangladesh #TravelBangladesh #KoyJabo
`,bnContent:`
ঢাকা থেকে চট্টগ্রাম (চট্টগ্রাম) বাংলাদেশের সবচেয়ে ব্যস্ত আন্তঃনগর করিডোর — রাজধানী এবং প্রধান বন্দর শহরের মধ্যে ২৪৪ কিলোমিটারের দূরত্ব। আপনার কাছে তিনটি বিকল্প রয়েছে: বাস, ট্রেন বা বিমান।

---

## বাস

**যাত্রার স্থান:** সায়েদাবাদ বাস টার্মিনাল
**সময়:** ৪–৬ ঘণ্টা
**ভাড়া:** ৫৫৫–৭৫০ টাকা (২০২৬ সালের নতুন ভাড়া)

---

## ট্রেন (কমফোর্টের জন্য সেরা)

| ট্রেন | ধরন | ছাড়ার সময় |
|------|-----|----------|
| সুবর্ণ এক্সপ্রেস | আন্তঃনগর | সকাল ৭টা |
| তূর্ণা নিশীথা | আন্তঃনগর | রাত ১১টা |
| সোনার বাংলা | আন্তঃনগর | সকাল ৭:৩০ |

**ভাড়া:** শোভন ৩০০ টাকা | স্নিগ্ধা ৮০০ টাকা | এসি বার্থ ১,০০০+ টাকা

---

## কোন বিকল্পটি সেরা?

| অগ্রাধিকার | সেরা বিকল্প |
|----------|-----------|
| বাজেট | নন-এসি বাস |
| কমফোর্ট | ট্রেন (স্নিগ্ধা ক্লাস) |
| গতি | বিমান |

বেশিরভাগ যাত্রীর জন্য **ট্রেন সর্বোত্তম ভারসাম্য** — কমফোর্ট, দাম এবং নির্ভরযোগ্যতায়।

🔗 [https://koyjabo.com](https://koyjabo.com)

#চট্টগ্রাম #DhakaToChittagong #KoyJabo
`},{id:"how-to-use-koyjabo-app",slug:"how-to-use-koyjabo-app",title:"How to Use KoyJabo: Bangladesh's #1 Transport Planner",bnTitle:"কই যাবো কীভাবে ব্যবহার করবেন: বাংলাদেশের সেরা ট্রান্সপোর্ট প্ল্যানার",excerpt:"KoyJabo (কই যাবো) helps you find bus routes, check fares, and plan journeys across Bangladesh. Here's a complete guide to every feature — bus search, metro guide, train finder, and more.",bnExcerpt:"কই যাবো দিয়ে ঢাকার বাস রুট খুঁজুন, ভাড়া দেখুন এবং সারা বাংলাদেশে যাত্রা পরিকল্পনা করুন। এখানে প্রতিটি ফিচারের সম্পূর্ণ গাইড।",coverImage:"/blog/how-to-use-koyjabo-app.jpg",author:"KoyJabo Team",publishDate:"2026-04-24",readTime:"5 min read",keywords:["KoyJabo app guide","কই যাবো অ্যাপ","Bangladesh transport app","Dhaka bus route finder","how to find bus route Dhaka","best app for Dhaka transport","koyjabo.com guide","Bangladesh public transport app","Dhaka route planner","find bus in Dhaka","Dhaka commuter app","transit app Bangladesh","KoyJabo features","offline transport app Bangladesh"],category:"App Guide",content:`
**KoyJabo (কই যাবো)** — which means "Where are you going?" in Bengali — is Bangladesh's most comprehensive transport planning platform. It helps you navigate Dhaka's complex bus network, track metro routes, find trains, and plan multi-modal journeys.

Here's everything it can do.

---

## Feature 1: Dhaka Bus Route Finder

The core feature. Enter your **starting point** and **destination** and KoyJabo shows:

- Which bus numbers to take
- Where to board and where to get off
- Estimated journey time
- Approximate fare
- Alternative routes

**Example:** Want to go from Mirpur 10 to Gulshan 2? KoyJabo shows you the exact bus number, stop names, and whether a direct route exists or you need to transfer.

---

## Feature 2: Metro Rail Guide

Complete information on MRT Line 6:
- All 16 stations with connections
- Real-time fare calculator
- Operating hours
- Tips for MRT Pass card
- Connecting bus routes from each station

---

## Feature 3: Train Search

Search across **367 trains** in the Bangladesh Railway network:
- Filter by origin and destination
- See departure times, journey duration, and fares by class
- Direct link to book tickets at eticket.railway.gov.bd

---

## Feature 4: Intercity Bus Routes

Planning a trip to Chittagong, Cox's Bazar, Sylhet, or Rajshahi? KoyJabo covers:
- Which terminal to depart from (Sayedabad, Gabtoli, Mohakhali)
- Bus companies serving each route
- Updated fares post-2026 revision
- Journey time estimates

---

## Feature 5: Multi-Stop Planner

Plan a journey with multiple stops — ideal for:
- Office commuters with two transfers
- Delivery riders optimizing routes
- Travelers doing a tour of multiple cities

---

## Feature 6: Commute Cost Calculator

Calculate the monthly cost of your daily commute across different transport options. Compare bus vs. metro vs. ride-hailing to find the most cost-effective option.

---

## Feature 7: AI Transport Assistant

Ask transport questions in natural language — in Bengali or English:
- "What bus goes from Farmgate to Banani?"
- "ফার্মগেট থেকে মতিঝিল কোন বাসে যাবো?"
- "Dhaka to Sylhet overnight bus options?"

---

## Feature 8: Works Offline

Install KoyJabo as a **Progressive Web App (PWA)** for offline access. All route data is cached locally, so it works even without internet.

**How to install:**
1. Visit [koyjabo.com](https://koyjabo.com) on your phone
2. Tap the browser menu → "Add to Home Screen"
3. Access like a native app, no app store needed

---

## Available in Bengali and English

Switch between বাংলা and English from the Settings page. All route data, guides, and the AI assistant work in both languages.

---

## Free to Use

KoyJabo is completely free. No subscription, no login required for basic route finding.

---

Start planning smarter journeys today: **[koyjabo.com](https://koyjabo.com)**

#KoyJabo #BangladeshTransport #DhakaApp #PublicTransport #SmartCommute
`,bnContent:`
**কই যাবো (KoyJabo)** — বাংলাদেশের সবচেয়ে সম্পূর্ণ ট্রান্সপোর্ট প্ল্যানিং প্ল্যাটফর্ম। ঢাকার জটিল বাস নেটওয়ার্ক, মেট্রো রুট, ট্রেন এবং মাল্টি-মোডাল যাত্রা পরিকল্পনায় সাহায্য করে।

---

## ফিচার ১: ঢাকা বাস রুট ফাইন্ডার

আপনার **শুরুর স্থান** এবং **গন্তব্য** দিন, KoyJabo দেখাবে:
- কোন বাস নম্বরে যাবেন
- কোথায় উঠবেন এবং কোথায় নামবেন
- আনুমানিক সময় ও ভাড়া

---

## ফিচার ২: মেট্রোরেল গাইড

এমআরটি লাইন ৬-এর সম্পূর্ণ তথ্য — সব ১৬টি স্টেশন, ভাড়া ক্যালকুলেটর, এবং প্রতিটি স্টেশন থেকে বাস সংযোগ।

---

## ফিচার ৩: ট্রেন সার্চ

বাংলাদেশ রেলওয়ের **৩৬৭টি ট্রেনে** সার্চ করুন। ক্লাস অনুযায়ী ভাড়া ও সময়সূচি দেখুন।

---

## ফিচার ৪: অফলাইন কাজ করে

**PWA** হিসেবে ইনস্টল করুন — ইন্টারনেট ছাড়াও সব রুট তথ্য পাওয়া যাবে।

---

## সম্পূর্ণ বিনামূল্যে

KoyJabo সম্পূর্ণ ফ্রি। কোনো সাবস্ক্রিপশন বা লগইন ছাড়াই বেসিক রুট খোঁজা যায়।

আজই শুরু করুন: **[koyjabo.com](https://koyjabo.com)**

#KoyJabo #কইযাবো #BangladeshTransport
`},{id:"best-bus-routes-dhaka-commuter-guide",slug:"best-bus-routes-dhaka-commuter-guide",title:"Best Bus Routes in Dhaka: The Daily Commuter's Guide",bnTitle:"ঢাকার সেরা বাস রুট: দৈনন্দিন যাত্রীদের গাইড",excerpt:"A practical guide to the most important bus routes in Dhaka — covering major corridors like Mirpur–Motijheel, Uttara–Gulshan, Dhanmondi–Paltan, and how to find any route using KoyJabo.",bnExcerpt:"ঢাকার সবচেয়ে গুরুত্বপূর্ণ বাস রুটের ব্যবহারিক গাইড — মিরপুর–মতিঝিল, উত্তরা–গুলশান, ধানমন্ডি–পল্টন এবং কীভাবে KoyJabo দিয়ে যেকোনো রুট খুঁজবেন।",coverImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/BRTC_Ashok_Leyland_Titan_double-decker%2CBangladesh_%2830825844661%29.jpg/960px-BRTC_Ashok_Leyland_Titan_double-decker%2CBangladesh_%2830825844661%29.jpg",author:"KoyJabo Team",publishDate:"2026-04-23",readTime:"5 min read",keywords:["Dhaka bus routes","best bus Dhaka","Dhaka city bus guide","Mirpur to Motijheel bus","Uttara to Gulshan bus","Dhanmondi bus route","ঢাকা বাস রুট","ঢাকা সিটি বাস","KoyJabo bus guide","public bus Dhaka 2026","BRTC Dhaka","bus number Dhaka","Dhaka commute guide","daily commute Dhaka transport"],category:"Bus & Transport",content:`
Dhaka has hundreds of bus routes covering every corner of the city. For a daily commuter, knowing the right bus can save an hour or more every day. Here are the key corridors and routes.

---

## Major Corridors

### Mirpur–Motijheel (via Mirpur Road)

One of the busiest corridors. Multiple buses run from Mirpur 1, 6, 10, 11, 12 toward Farmgate, Shahbag, Paltan, and Motijheel.

- **Metro Option:** MRT Line 6 covers this corridor (Mirpur 10 → Motijheel in ~25 min)
- Key buses: Multiple operators including BRTC

### Uttara–Gulshan–Motijheel

High-traffic route for office workers commuting from Uttara.

- Metro: Uttara → Farmgate (15 min), then bus or CNG to Gulshan

### Dhanmondi–Paltan–Motijheel

- Major routes pass through Science Lab, Nilkhet, Shahbag
- Key transfer point: Shahbag (also a metro station)

### Gazipur–Abdullahpur–Uttara

For garment workers and commuters from the industrial north:
- BRTC runs high-capacity double-decker buses on this route

### Mirpur–Gabtoli–Savar

For those commuting to the EPZ or outer industrial zones.

---

## Understanding Bus Numbers

Dhaka's city buses are operated by multiple companies under route licenses. Buses on the same route may have:
- Different **company names** (but same route)
- The **route number** is displayed on the side
- Some buses display only the **destination** on the front

**Use KoyJabo** to get the exact bus numbers for your specific start and end points. The app shows all valid options for your route.

---

## BRTC Buses

Bangladesh Road Transport Corporation (BRTC) runs government buses:
- **Double-decker buses** on high-capacity routes
- **Articulated buses** on BRT corridors
- Generally cheaper and have fixed stopping points
- Women-only sections at the front

---

## Tips for Bus Commuters

1. **Board at proper stops** — random flagging down causes traffic issues
2. **Keep small change** — exact fare preferred
3. **Women sit at the front** — first few rows are reserved
4. **Avoid peak hours** — 8–10 AM, 5–7 PM are significantly slower
5. **Use KoyJabo to find routes** — avoid guessing at bus stops

---

## Finding Any Route with KoyJabo

Can't find the bus you need? Go to **[koyjabo.com](https://koyjabo.com)**:

1. Enter your start location
2. Enter your destination
3. See matching bus routes, stop names, and estimated fares

The app covers thousands of routes across all Dhaka zones.

🔗 [https://koyjabo.com](https://koyjabo.com)

#DhakaBus #BusRouteDhaka #DhakaCommute #PublicTransport #KoyJabo
`,bnContent:`
ঢাকায় শত শত বাস রুট রয়েছে। সঠিক বাস জানা একজন দৈনন্দিন যাত্রীর প্রতিদিনের এক ঘণ্টারও বেশি সময় বাঁচাতে পারে।

---

## প্রধান করিডোর

### মিরপুর–মতিঝিল

অন্যতম ব্যস্ততম করিডোর। মিরপুর ১, ৬, ১০, ১১, ১২ থেকে ফার্মগেট, শাহবাগ, পল্টন, মতিঝিলে একাধিক বাস চলে।

- **মেট্রো অপশন:** এমআরটি লাইন ৬ — মিরপুর ১০ থেকে মতিঝিল মাত্র ২৫ মিনিটে

### উত্তরা–গুলশান–মতিঝিল

উত্তরা থেকে অফিসগামী যাত্রীদের জন্য হাই-ট্রাফিক রুট।

### ধানমন্ডি–পল্টন–মতিঝিল

সায়েন্স ল্যাব, নীলক্ষেত, শাহবাগ হয়ে প্রধান রুট।

---

## বাস কমিউটারদের টিপস

১. নির্দিষ্ট স্টপে উঠুন
২. ছোট মুদ্রা রাখুন
৩. মহিলারা সামনের সিটে বসুন
৪. পিক আওয়ার (৮–১০ AM, ৫–৭ PM) এড়িয়ে চলুন
৫. রুট খুঁজতে KoyJabo ব্যবহার করুন

🔗 [https://koyjabo.com](https://koyjabo.com)

#ঢাকাবাস #DhakaBus #KoyJabo
`},{id:"dhaka-to-sylhet-travel-guide",slug:"dhaka-to-sylhet-travel-guide",title:"Dhaka to Sylhet: Bus, Train & Complete Travel Guide",bnTitle:"ঢাকা থেকে সিলেট: বাস, ট্রেন ও সম্পূর্ণ ট্রাভেল গাইড",excerpt:"Planning a trip to Sylhet — the land of tea gardens, Ratargul swamp forest, and the Jaflong hills? Here's the full guide on buses, trains, fares, and what to see.",bnExcerpt:"সিলেট ভ্রমণ পরিকল্পনা করছেন — চা বাগান, রাতারগুল, জাফলং-এর দেশে? বাস, ট্রেন, ভাড়া এবং দর্শনীয় স্থানের সম্পূর্ণ গাইড।",coverImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Sylhet_city_02.jpg/960px-Sylhet_city_02.jpg",author:"KoyJabo Team",publishDate:"2026-04-22",readTime:"6 min read",keywords:["Dhaka to Sylhet bus","Dhaka Sylhet travel guide","ঢাকা থেকে সিলেট","Sylhet travel Bangladesh","Sylhet bus fare 2026","ঢাকা সিলেট ট্রেন","Parabat Express Sylhet","tea garden Sylhet guide","Ratargul swamp forest","Jaflong Bangladesh","Sylhet tourism","Shyamoli Sylhet bus","KoyJabo Sylhet guide","Bangladesh travel Sylhet"],category:"Travel Guide",content:`
Sylhet is northeastern Bangladesh's crown jewel — rolling tea estates, crystal-clear rivers, the mystical Ratargul swamp forest, and the stunning Jaflong hills on the Indian border. It's 240 km from Dhaka and very well connected.

---

## Option 1: Bus from Dhaka to Sylhet

**Departure point:** Sayedabad or Mohakhali Bus Terminal
**Duration:** 5–7 hours
**Fare range:** ৳580–৳800 (2026 rates)

### Top Bus Services

| Bus | Class | Fare |
|-----|-------|------|
| Green Line | AC Sleeper | ৳780–৳850 |
| Shyamoli | AC Chair | ৳650–৳700 |
| Hanif | Non-AC | ৳400–৳500 |
| ENA | AC Coach | ৳700–৳780 |
| BRTC | AC/Non-AC | ৳500–৳600 |

---

## Option 2: Train (The Scenic Choice)

The **Sylhet route has some of the most beautiful train journeys** in Bangladesh — passing through hilly terrain in the final stretch.

### Key Trains

| Train | Departure | Duration | Fare (Shuvon) |
|-------|-----------|----------|--------------|
| Parabat Express | 6:40 AM | ~6.5 hrs | ৳305 |
| Jalalabad Express | 2:00 PM | ~7 hrs | ৳305 |
| Surma Mail | 10:00 PM | ~8 hrs | ৳270 |
| Upaban Express | 9:50 PM | ~7.5 hrs | ৳305 |

Book at [eticket.railway.gov.bd](https://eticket.railway.gov.bd).

---

## What to See in Sylhet

### Day 1
- **Ratargul Swamp Forest** — Bangladesh's only freshwater swamp forest, magical by boat
- **Jaflong** — crystal-clear Piyain river, pebble beaches, views of Meghalaya

### Day 2
- **Srimangal** (1.5 hrs from Sylhet) — tea capital of Bangladesh, 7-layer tea
- **Lawachara National Forest** — rainforest with hoolock gibbons

### Day 3
- **Hazrat Shah Jalal & Shah Paran shrines** — important pilgrimage sites
- **Osmani Museum** — history of Liberation War and the region

---

## Getting Around Sylhet

- **CNG auto-rickshaw** — main city transport, ৳30–৳150
- **Microbus hire** — for day trips to Jaflong/Ratargul (৳1,500–৳2,500/day)
- **Bus to Srimangal** — from Sylhet bus station (৳60–৳80)

---

## Best Time to Visit

- **October–April** — best weather
- **Monsoon (June–September)** — Ratargul is most beautiful when flooded, but getting there is harder

---

Use **KoyJabo** to plan your route to Sayedabad or Mohakhali terminal from wherever you are in Dhaka.

🔗 [https://koyjabo.com](https://koyjabo.com)

#Sylhet #DhakaToSylhet #BangladeshTravel #RatargulForest #KoyJabo
`,bnContent:`
সিলেট বাংলাদেশের উত্তর-পূর্বের মুকুট — চা বাগান, স্বচ্ছ নদী, রাতারগুল জলের অরণ্য এবং জাফলং পাহাড়। ঢাকা থেকে ২৪০ কিলোমিটার।

---

## বাস

**যাত্রার স্থান:** সায়েদাবাদ বা মহাখালী
**সময়:** ৫–৭ ঘণ্টা
**ভাড়া:** ৫৮০–৮০০ টাকা (২০২৬)

---

## ট্রেন (প্রকৃতির দৃশ্যের জন্য সেরা)

| ট্রেন | ছাড়ার সময় | সময় |
|------|---------|-----|
| পারাবত এক্সপ্রেস | সকাল ৬:৪০ | ৬.৫ ঘণ্টা |
| জালালাবাদ এক্সপ্রেস | দুপুর ২টা | ৭ ঘণ্টা |
| উপবন এক্সপ্রেস | রাত ৯:৫০ | ৭.৫ ঘণ্টা |

---

## সিলেটে দর্শনীয় স্থান

- **রাতারগুল** — বাংলাদেশের একমাত্র মিঠাপানির জলাবন
- **জাফলং** — পিয়াইন নদী, পাথরের সৈকত
- **শ্রীমঙ্গল** — চা-বাগান, ৭ রঙের চা
- **লাউয়াছড়া জাতীয় উদ্যান** — বন্যপ্রাণী

🔗 [https://koyjabo.com](https://koyjabo.com)

#সিলেট #Sylhet #BangladeshTravel #KoyJabo
`},{id:"rickshaw-cng-guide-dhaka",slug:"rickshaw-cng-guide-dhaka",title:"Rickshaw & CNG Auto-Rickshaw in Dhaka: The Essential Guide",bnTitle:"ঢাকায় রিকশা ও সিএনজি: প্রয়োজনীয় গাইড",excerpt:"Rickshaws and CNG auto-rickshaws are uniquely Dhaka. Here's how to use them, what to pay, how to negotiate, and when they're the best option — for locals and visitors alike.",bnExcerpt:"রিকশা ও সিএনজি ঢাকার অনন্য পরিচয়। কীভাবে ব্যবহার করবেন, কত দিতে হবে, কীভাবে দামাদামি করবেন — স্থানীয় এবং দর্শনার্থী উভয়ের জন্য।",coverImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/%E0%A6%85%E0%A6%9F%E0%A7%8B%E0%A6%B0%E0%A6%BF%E0%A6%95%E0%A6%B6%E0%A6%BE.jpg/960px-%E0%A6%85%E0%A6%9F%E0%A7%8B%E0%A6%B0%E0%A6%BF%E0%A6%95%E0%A6%B6%E0%A6%BE.jpg",author:"KoyJabo Team",publishDate:"2026-04-21",readTime:"4 min read",keywords:["rickshaw Dhaka guide","CNG auto rickshaw Dhaka","Dhaka transport for tourists","rickshaw price Dhaka","CNG fare Dhaka","how to use CNG Bangladesh","ঢাকা রিকশা","ঢাকা সিএনজি ভাড়া","তিন চাকার গাড়ি ঢাকা","Dhaka local transport","negotiate fare Bangladesh","cycle rickshaw Bangladesh","Dhaka tourist transport","Old Dhaka rickshaw"],category:"Travel Guide",content:`
Dhaka has the **largest rickshaw fleet in the world** — estimates suggest over 400,000 cycle rickshaws operate daily. Alongside them are thousands of CNG-powered auto-rickshaws. Together they form an essential layer of Dhaka's transport fabric.

---

## Cycle Rickshaws — The Heart of Short Trips

Cycle rickshaws are pedal-powered three-wheelers, ridden by a driver in front. They carry 1–2 passengers plus bags.

### When to Use Rickshaws
- Short trips under 2 km
- Old Dhaka — where cars and buses can't navigate
- Last-mile connection from bus stop to your door
- Rainy days when you don't want to walk

### Pricing
Always **negotiate before you board** — there's no meter.

| Trip Distance | Typical Fare |
|--------------|-------------|
| Under 1 km | ৳20–৳40 |
| 1–2 km | ৳40–৳80 |
| 2–3 km | ৳80–৳120 |

As a non-local, expect to be quoted 2x. Offer half and settle somewhere in the middle.

---

## CNG Auto-Rickshaws — For Medium Distances

CNG-powered three-wheelers (nicknamed "CNG" in Bangladesh) are faster and cover longer distances than rickshaws.

### Two Types
1. **Metered CNGs** — should run on meter; common in the city
2. **Negotiated CNGs** — agree on price before getting in

### Pricing Guide
- **Minimum fare:** ~৳60
- Short city trip (2–4 km): ৳80–৳150
- Medium trip (4–7 km): ৳150–৳280
- **Meter rate:** ~৳40 flag-fall + ৳12.50/km

### Tips
- Ask "meter diye jaben?" (Will you go by meter?) — this works with ethical drivers
- If they refuse the meter, negotiate firmly before boarding
- Don't accept a price that's more than 2x the meter equivalent

---

## Knowing the Difference at a Glance

| Feature | Cycle Rickshaw | CNG Auto |
|---------|---------------|----------|
| Power | Pedal | CNG gas |
| Speed | Slow | Moderate |
| Range | Short (<3 km) | Medium (3–15 km) |
| Price | Negotiate | Meter or negotiate |
| Where | Narrow lanes | Main roads |
| Covered? | No (open) | Yes (enclosed) |

---

## App-Based Alternatives

For predictable pricing, use:
- **Pathao** or **Shohoz** — motorcycle taxis (faster, fare shown in app upfront)
- **Uber** or **Shohoz Cars** — car rides with fixed fares

---

## Safety Notes

- For women traveling alone, the **front-row enclosed CNG** offers more privacy
- Confirm the route verbally before boarding
- Keep your phone secure in CNGs (open window areas)

Use **KoyJabo** to estimate what transport mode makes sense for your specific route.

🔗 [https://koyjabo.com](https://koyjabo.com)

#Rickshaw #CNG #DhakaTransport #BangladeshTravel #KoyJabo
`,bnContent:`
ঢাকায় পৃথিবীর **সবচেয়ে বড় রিকশা বহর** — প্রতিদিন প্রায় ৪ লাখেরও বেশি সাইকেল রিকশা চলে। পাশাপাশি হাজার হাজার সিএনজি অটোরিকশাও ঢাকার পরিবহনের অপরিহার্য অংশ।

---

## সাইকেল রিকশা — ছোট যাত্রার হৃদয়

### কখন রিকশা নেবেন
- ২ কিলোমিটারের কম দূরত্বে
- পুরান ঢাকায় — যেখানে গাড়ি বা বাস যায় না
- বাস স্টপ থেকে বাড়ির শেষ দূরত্বে

### ভাড়া
| দূরত্ব | আনুমানিক ভাড়া |
|-------|-------------|
| ১ কিলোমিটারের কম | ২০–৪০ টাকা |
| ১–২ কিলোমিটার | ৪০–৮০ টাকা |
| ২–৩ কিলোমিটার | ৮০–১২০ টাকা |

সবসময় **উঠার আগে দাম ঠিক করুন** — কোনো মিটার নেই।

---

## সিএনজি অটোরিকশা — মাঝারি দূরত্বের জন্য

- **ন্যূনতম ভাড়া:** ~৬০ টাকা
- শহরের ছোট ট্রিপ: ৮০–১৫০ টাকা
- মাঝারি ট্রিপ: ১৫০–২৮০ টাকা

টিপস: "মিটারে যাবেন?" জিজ্ঞেস করুন — সৎ চালকরা মিটারে যাবেন।

🔗 [https://koyjabo.com](https://koyjabo.com)

#রিকশা #সিএনজি #DhakaTransport #KoyJabo
`},{id:"budget-travel-bangladesh-transport-tips",slug:"budget-travel-bangladesh-transport-tips",title:"Budget Travel in Bangladesh: How to Get Around for Less",bnTitle:"বাজেটে বাংলাদেশ ভ্রমণ: কম খরচে যাতায়াতের উপায়",excerpt:"Bangladesh is one of the most affordable countries to travel in Asia. Here's how to get around the country on a tight budget — from cheap buses and trains to free walking routes.",bnExcerpt:"বাংলাদেশ এশিয়ার সবচেয়ে সাশ্রয়ী দেশগুলোর একটি। কম খরচে কীভাবে সারাদেশ ঘুরবেন — সস্তা বাস থেকে ট্রেন এবং হাঁটার রুট পর্যন্ত।",coverImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Dhaka_-_Taxi_boats_and_ferry_on_Buriganga_River.jpg/960px-Dhaka_-_Taxi_boats_and_ferry_on_Buriganga_River.jpg",author:"KoyJabo Team",publishDate:"2026-04-20",readTime:"6 min read",keywords:["budget travel Bangladesh","cheap transport Bangladesh","how to travel Bangladesh cheaply","Bangladesh backpacker guide","low cost travel Dhaka","cheap bus Bangladesh","train travel Bangladesh budget","Bangladesh travel tips","travel on budget Asia","backpacking Bangladesh","affordable Bangladesh travel","KoyJabo budget travel","non-AC bus Bangladesh","ferry travel Bangladesh"],category:"Travel Guide",content:`
Bangladesh is one of the most rewarding and affordable destinations in Asia. Transport options exist at every price point — from ৳5 local buses to ৳8,000 flights. Here's how to travel Bangladesh without breaking the bank.

---

## City Transport on a Budget (Dhaka)

| Option | Min Fare | Notes |
|--------|---------|-------|
| City bus | ৳5 | Cheapest, crowded during peak hours |
| Metro Rail | ৳20 | Fast, worth every taka for key corridors |
| BRTC bus | ৳8–৳15 | Government buses, slightly more reliable |
| Rickshaw | ৳20 | Negotiate, avoid tourist pricing |
| CNG (by meter) | ৳60 | Insist on meter |
| Pathao bike | ৳30–৳100 | App, no negotiation, fastest for single rider |

**Budget daily transport in Dhaka:** ৳80–৳150 if you use buses and the metro strategically.

---

## Intercity on a Budget

### Bus
Non-AC buses are dramatically cheaper than their AC counterparts and perfectly fine for most routes:

| Route | Non-AC | AC |
|-------|--------|-----|
| Dhaka–Chittagong | ৳350–৳450 | ৳555–৳750 |
| Dhaka–Cox's Bazar | ৳700–৳800 | ৳1,000–৳1,200 |
| Dhaka–Sylhet | ৳350–৳450 | ৳580–৳780 |
| Dhaka–Rajshahi | ৳350–৳500 | ৳600–৳800 |

### Train
Train travel in Bangladesh is **excellent value**:
- Shuvon class (cheapest seat): ৳150–৳350 for most routes
- Even AC classes are cheaper than buses for long distances
- Night trains save hotel costs

### Overnight Transport Hack
Take overnight buses or trains for long-distance journeys. You save a night of accommodation and arrive refreshed in the morning.

---

## Free and Almost-Free Sightseeing in Dhaka

- **Ahsan Manzil (Pink Palace):** ৳20 entry
- **Lalbagh Fort:** ৳20 entry
- **Dhaka University campus:** Free to walk
- **Sadarghat riverfront:** Free to walk
- **Old Dhaka food lanes:** Free to explore, cheap street food

---

## Southern Bangladesh by Ferry

The rocket paddle steamer (BIWTA) runs overnight between Dhaka and Barisal — one of the most iconic journeys in Bangladesh.

| Class | Fare |
|-------|------|
| Deck (open) | ৳150–৳200 |
| 2nd Class Cabin | ৳500–৳700 |
| 1st Class Cabin | ৳1,000–৳1,500 |

The deck class experience — sleeping under the stars on the river — is unforgettable for budget travelers.

---

## Food Budget Reference

| Item | Cost |
|------|------|
| Bhaat-dal at local canteen | ৳60–৳100 |
| Street food snack | ৳10–৳40 |
| Restaurant meal | ৳150–৳300 |
| Bottled water | ৳15–৳20 |

---

## Planning Your Budget Route

Use **KoyJabo** to:
- Compare bus vs. metro options
- Find the cheapest route between two points
- Plan your path to terminals

🔗 [https://koyjabo.com](https://koyjabo.com)

#BudgetTravel #Bangladesh #BackpackingBangladesh #CheapTravel #KoyJabo
`,bnContent:`
বাংলাদেশ এশিয়ার সবচেয়ে সাশ্রয়ী গন্তব্যগুলোর একটি। পরিবহন বিকল্প প্রতিটি বাজেটে পাওয়া যায় — ৫ টাকার স্থানীয় বাস থেকে ৮,০০০ টাকার বিমান পর্যন্ত।

---

## ঢাকায় বাজেটে যাতায়াত

| বিকল্প | ন্যূনতম ভাড়া | টিপস |
|--------|------------|-----|
| সিটি বাস | ৫ টাকা | সবচেয়ে সস্তা |
| মেট্রোরেল | ২০ টাকা | দ্রুত, মূল্য উপযুক্ত |
| রিকশা | ২০ টাকা | দামাদামি করুন |
| সিএনজি (মিটারে) | ৬০ টাকা | মিটারে চাপুন |

**ঢাকায় দৈনিক বাজেট পরিবহন:** ৮০–১৫০ টাকা।

---

## দূরপাল্লায় বাজেটে

নন-এসি বাস এসি বাসের তুলনায় অনেক সস্তা এবং বেশিরভাগ রুটে যথেষ্ট ভালো।

---

## রকেট স্টিমার — ঐতিহাসিক অভিজ্ঞতা

ঢাকা থেকে বরিশাল রাতের পদ্মা নদীতে ডেকে ভ্রমণ — ১৫০–২০০ টাকায় এক অবিস্মরণীয় অভিজ্ঞতা।

🔗 [https://koyjabo.com](https://koyjabo.com)

#BudgetTravel #Bangladesh #KoyJabo
`},{id:"dhaka-traffic-tips-beat-rush-hour",slug:"dhaka-traffic-tips-beat-rush-hour",title:"Dhaka Traffic: 10 Tips to Beat Rush Hour and Save Hours Every Week",bnTitle:"ঢাকার ট্রাফিক: রাশ আওয়ার এড়ানোর ১০টি টিপস এবং প্রতি সপ্তাহে ঘণ্টা বাঁচান",excerpt:"Dhaka traffic is legendary. But commuters who understand the patterns, the shortcuts, and the right tools save hours every week. Here are 10 proven strategies.",bnExcerpt:"ঢাকার ট্রাফিক কুখ্যাত। কিন্তু যারা প্যাটার্ন, শর্টকাট এবং সঠিক টুল জানেন তারা প্রতি সপ্তাহে ঘণ্টার পর ঘণ্টা বাঁচান। এখানে ১০টি প্রমাণিত কৌশল।",coverImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Cycle_Rickshaws_-_High_Court_Street_-_Dhaka_2015-05-31_2095.JPG/960px-Cycle_Rickshaws_-_High_Court_Street_-_Dhaka_2015-05-31_2095.JPG",author:"KoyJabo Team",publishDate:"2026-04-19",readTime:"5 min read",keywords:["Dhaka traffic tips","beat Dhaka rush hour","Dhaka commute hack","avoid traffic Dhaka","Dhaka travel time saving","ঢাকা ট্রাফিক","ঢাকা যানজট এড়ানো","rush hour Dhaka timing","Dhaka commuter tips","metro vs bus Dhaka","early morning Dhaka commute","KoyJabo traffic tips"],category:"Tips & Tricks",content:`
Dhaka's traffic is one of the most challenging in the world. The city regularly features in global "worst traffic" rankings. But millions of people navigate it daily — and those who do it smartly save 1–2 hours per day. Here's how.

---

## 1. Know the Rush Hour Windows

- **Morning peak:** 7:30 AM – 10:30 AM
- **Evening peak:** 4:30 PM – 8:30 PM
- **Friday morning:** Lighter traffic (government holiday)
- **Saturday evening:** Often worse than weekdays (markets)

If you can shift your commute by even 45 minutes, the difference is dramatic.

---

## 2. Use the Metro for North–South Corridors

MRT Line 6 (Uttara–Motijheel) is **immune to road traffic**. If your route overlaps with the metro line, use it — always. A 90-minute bus journey becomes 30–40 minutes.

Combine metro + short bus/CNG for first/last mile.

---

## 3. Take Bike Rides for Cross-City Shortcuts

Pathao and Shohoz motorcycle taxis can cut through traffic that stops cars and buses. For a 7 km cross-city trip, a bike ride during peak hours often takes half the time of a CNG.

---

## 4. Avoid Key Bottlenecks

The worst choke points in Dhaka:

| Location | Why It's Bad |
|----------|-------------|
| Farmgate intersection | Bus terminal + office area convergence |
| Mohakhali flyover | Always congested, avoid peak hours |
| Gulshan 1 & 2 circle | Commercial area, heavy turn traffic |
| Jatrabari | Major south Dhaka interchange |
| Gabtoli bridge | Gateway to/from northwest |

Route around these using KoyJabo's alternative suggestions.

---

## 5. Use Alternate Roads in Old Dhaka

Old Dhaka's narrow lanes are counterintuitively faster during peak hours for short trips — rickshaws can move when cars cannot. Learn the lane network or use a local driver who knows it.

---

## 6. Plan Transfers at Off-Peak Micro-Gaps

There's a brief dip in traffic between **10:30 AM and 12:30 PM** — use this window for any non-urgent travel. Midday (12:30–2:00 PM) is also lighter on most routes.

---

## 7. Use Pedestrian Shortcuts

For distances under 15 minutes of walking, consider foot + metro + foot. Dhaka's footpaths near metro stations are being improved. Walking saves CNG/bus wait time.

---

## 8. Keep Small Change Ready

A common delay is waiting for change from a bus or rickshaw driver. Keep ৳10, ৳20, ৳50 notes ready — board and pay instantly.

---

## 9. Use KoyJabo Before Every Non-Routine Trip

For trips you don't do every day, plan the route on **KoyJabo** before leaving:
- See all bus options
- Check metro connections
- Find alternative routes

Knowing where you're going before you step out saves confusion time at stops and terminals.

---

## 10. Accept What You Can't Control

Some days, Dhaka just jams. Political programs, accidents, and rain can make even good routes unpredictable. Build buffer time into any appointment that matters.

The best commuters combine preparation (know your route), adaptability (know your alternatives), and patience (it's everyone's challenge).

🔗 [https://koyjabo.com](https://koyjabo.com)

#DhakaTraffic #CommuteHacks #DhakaTransport #TrafficTips #KoyJabo
`,bnContent:`
ঢাকার ট্রাফিক বিশ্বের সবচেয়ে চ্যালেঞ্জিং। কিন্তু যারা স্মার্টভাবে চলেন তারা প্রতিদিন ১–২ ঘণ্টা বাঁচান।

---

## ১. রাশ আওয়ার জানুন

- **সকালের পিক:** ৭:৩০ – ১০:৩০ AM
- **সন্ধ্যার পিক:** ৪:৩০ – ৮:৩০ PM

যদি ৪৫ মিনিট আগে বা পরে বের হতে পারেন, পার্থক্য বিশাল।

---

## ২. উত্তর–দক্ষিণ করিডোরে মেট্রো নিন

এমআরটি লাইন ৬ রাস্তার যানজটের বাইরে। ৯০ মিনিটের বাস যাত্রা ৩০–৪০ মিনিটে।

---

## ৩. প্রধান বাধাগুলো এড়িয়ে চলুন

| স্থান | কেন খারাপ |
|------|---------|
| ফার্মগেট মোড় | বাস টার্মিনাল + অফিস |
| মহাখালী ফ্লাইওভার | সবসময় জট |
| গুলশান ১ ও ২ | বাণিজ্যিক ট্রাফিক |
| জাত্রাবাড়ি | দক্ষিণ ঢাকার মোড় |

---

## ৯. KoyJabo দিয়ে পরিকল্পনা করুন

প্রতিটি অপরিচিত ট্রিপের আগে **KoyJabo** দিয়ে রুট দেখুন — সময় এবং বিভ্রান্তি এড়ান।

🔗 [https://koyjabo.com](https://koyjabo.com)

#ঢাকাট্রাফিক #DhakaTraffic #KoyJabo
`},{id:"long-distance-bus-fare-hike-bangladesh",slug:"long-distance-bus-fare-hike-bangladesh",title:"Long-Distance Bus Fare Hike: Impact on Passengers and the Reality on the Ground",bnTitle:"দূরপাল্লার বাসভাড়া বৃদ্ধি: যাত্রীদের উপর প্রভাব ও বাস্তবতা",excerpt:"New long-distance bus fares have been published for 40-seat and 51-seat buses across major routes. Find out what changed, why fares are rising, and how to make smarter travel decisions.",bnExcerpt:"সম্প্রতি দূরপাল্লার বাসভাড়ার নতুন তালিকা প্রকাশ হয়েছে। কী পরিবর্তন হয়েছে, কেন ভাড়া বাড়ছে এবং কীভাবে স্মার্ট সিদ্ধান্ত নেবেন — জানুন বিস্তারিত।",coverImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Female_coach_in_Bangladesh_Railway.jpg/960px-Female_coach_in_Bangladesh_Railway.jpg",content:`
A new long-distance bus fare list has recently been published. Fares have been increased for 40-seat and 51-seat buses on various routes — directly affecting the daily commute of ordinary passengers.

---

## What Changed?

According to the new fare list:

### 🔹 Sayedabad Route

* Dhaka → Chittagong: ৳555 → ৳704
* Dhaka → Cox's Bazar: ৳900 → ৳1,189
* Dhaka → Sylhet: ৳580 → ৳780
* Dhaka → Barisal: ৳483 → ৳621

### 🔹 Gabtoli Route

* Dhaka → Panchagarh: ৳1,005 → ৳1,291
* Dhaka → Rangpur: ৳756 → ৳935
* Dhaka → Dinajpur: ৳974 → ৳1,241

### 🔹 Mohakhali Route

* Dhaka → Mymensingh: ৳299 → ৳375
* Dhaka → Sherpur: ৳429 → ৳537

👉 (Fares may vary by route and bus type)

---

## Why Are Fares Rising?

Bus fare increases are generally caused by a few factors:

* Rising fuel prices
* Operational costs (drivers, maintenance)
* Demand for improved passenger services

But the reality is — the burden of these changes ultimately falls on passengers.

---

## Impact on Passengers

A fare hike means:

* Higher daily commute costs
* More pressure on students and lower-income earners
* Changes in travel planning

Especially for those who regularly travel from Dhaka to other districts — this is a significant change.

---

## The Bigger Problem: Lack of Information

The biggest issue isn't just the fare increase —
Many people don't know in advance:

* What the fare is for their specific route
* Which bus offers a cheaper option
* What alternative routes or options exist

As a result, wrong decisions are often made, and costs increase even further.

---

## How to Make Smart Decisions?

The need now is to **plan ahead**:

* Check routes before you travel
* Compare fares across options
* Explore alternative paths

You can use **KoyJabo (কই যাবো)** to make these tasks easier.

Before your journey, you can check:

* Which route to take
* Approximate fare
* Alternative paths and transit options

---

## Final Thought

Rising bus fares are beyond our control.
But how we plan our travel — that's entirely in our hands.

With the right information, you can save both time and money.

---

🔗 [https://koyjabo.com](https://koyjabo.com)

#KoyJabo #BusFare #Bangladesh #TravelSmart #PublicTransport
`,bnContent:`
সম্প্রতি দূরপাল্লার বাসভাড়ার নতুন তালিকা প্রকাশ করা হয়েছে। বিভিন্ন রুটে ৪০ আসন ও ৫১ আসনের বাস অনুযায়ী ভাড়া বাড়ানো হয়েছে — যা সরাসরি প্রভাব ফেলছে সাধারণ যাত্রীদের দৈনন্দিন যাতায়াতে।

---

## কী পরিবর্তন হয়েছে?

নতুন তালিকা অনুযায়ী:

### 🔹 সায়েদাবাদ রুট

* ঢাকা → চট্টগ্রাম: ৫৫৫ → ৭০৪ টাকা
* ঢাকা → কক্সবাজার: ৯০০ → ১১৮৯ টাকা
* ঢাকা → সিলেট: ৫৮০ → ৭৮০ টাকা
* ঢাকা → বরিশাল: ৪৮৩ → ৬২১ টাকা

### 🔹 গাবতলী রুট

* ঢাকা → পঞ্চগড়: ১০০৫ → ১২৯১ টাকা
* ঢাকা → রংপুর: ৭৫৬ → ৯৩৫ টাকা
* ঢাকা → দিনাজপুর: ৯৭৪ → ১২৪১ টাকা

### 🔹 মহাখালী রুট

* ঢাকা → ময়মনসিংহ: ২৯৯ → ৩৭৫ টাকা
* ঢাকা → শেরপুর: ৪২৯ → ৫৩৭ টাকা

---

## কেন ভাড়া বাড়ছে?

* জ্বালানি তেলের দাম বৃদ্ধি
* অপারেশনাল খরচ বৃদ্ধি
* যাত্রী সেবা উন্নয়নের দাবি

---

## কীভাবে স্মার্ট সিদ্ধান্ত নেবেন?

**KoyJabo (কই যাবো)** ব্যবহার করে আগে থেকে রুট ও ভাড়া চেক করুন।

🔗 [https://koyjabo.com](https://koyjabo.com)

#KoyJabo #BusFare #Bangladesh #TravelSmart
`,author:"কই যাবো Team",publishDate:"2026-04-27",readTime:"4 min read",keywords:["বাসভাড়া বৃদ্ধি","দূরপাল্লার বাস","Bangladesh bus fare","Dhaka bus fare hike","সায়েদাবাদ বাস","গাবতলী বাস","Dhaka to Chittagong fare","Dhaka to Cox Bazar fare","long distance bus Bangladesh","KoyJabo blog","public transport Bangladesh","bus fare increase 2026","travel cost Bangladesh"],category:"Bus & Transport"},{id:"metro-transport-culture-dhaka",slug:"metro-transport-culture-dhaka",title:"Dhaka Metro Rail: Not Just Fast Travel — A New Transport Culture",bnTitle:"মেট্রোরেল: শুধু দ্রুত যাতায়াত নয়, এক নতুন ট্রান্সপোর্ট কালচার",excerpt:"Metro Rail brought more than speed to Dhaka — it introduced a new civic culture of shared space, discipline, and smart commuting. Small habits can change the whole city.",bnExcerpt:"মেট্রোরেল শুধু যাত্রা দ্রুত করেনি, এনেছে একটি নতুন ট্রান্সপোর্ট কালচার। ছোট ছোট অভ্যাস কীভাবে পুরো শহরের অভিজ্ঞতা বদলে দিতে পারে।",coverImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Metro_Rail_Station_at_Uttara_Center_in_Dhaka%2C_Bangladesh.jpg/960px-Metro_Rail_Station_at_Uttara_Center_in_Dhaka%2C_Bangladesh.jpg",content:`
Amid Dhaka's traffic, crowds, and uncertainty, Metro Rail has arrived as a kind of relief. It saves time and makes commuting easier. But Metro Rail isn't just a fast vehicle — it's introducing a new **transport culture** for our city.

This culture isn't built by infrastructure alone — it's built by our behavior.

---

## Why Is This a "Culture"?

Many of us notice it —
crowding at stations, disorder while boarding and alighting, blocking escalators by standing in the middle.

These may seem like small things, but they determine how smoothly a system will run.

The metro systems of developed cities work well not just because of technology — **but because of people's habits**.

---

## Small Habits, Big Change

### 1. Stand on the Left on Escalators, Keep the Right Side Clear

Those in a hurry can move quickly on the right side. This saves everyone's time.

### 2. Let Passengers Off First, Then Board

This is the most basic but most ignored rule.
When everyone gets the chance to exit, the entire process becomes faster.

### 3. Move Inside Instead of Crowding the Door

When people crowd the door, the entire queue gets blocked. Moving a little further in creates much more space.

### 4. Give Priority to Passengers Who Need It

Giving way to elderly, women, children, or physically challenged passengers — this isn't just a rule, it's humanity.

---

## Metro Is More Than Just Travel

Metro Rail is teaching us something new —
**how to move with discipline in a shared space.**

This goes beyond just the train itself — it can change the behavior of the whole city.

---

## Information + Behavior = A Better Journey

A good journey needs two things:

* Knowing the right route
* Moving the right way

For finding routes, we're often confused — which bus, which train, from where.

This is exactly where **KoyJabo (কই যাবো)** helps.
You can easily see which route gets you there fastest and with the least hassle.

---

## Final Thought

Metro Rail has handed us a good system.
How effective it will be now depends largely on us.

When we change small habits, the experience of the whole city can change.

---

🔗 [https://koyjabo.com](https://koyjabo.com)

#KoyJabo #DhakaMetro #Dhaka #PublicTransport #CivicSense
`,bnContent:`
ঢাকার ট্রাফিক, ভিড় আর অনিশ্চয়তার মাঝে মেট্রোরেল এসেছে এক ধরনের স্বস্তি নিয়ে। সময় বাঁচায়, যাত্রা সহজ করে। কিন্তু মেট্রোরেল শুধু একটা দ্রুত যানবাহন না — এটা আমাদের শহরের জন্য একটা নতুন **ট্রান্সপোর্ট কালচার**।

---

## কেন এটা "কালচার"?

স্টেশনে ভিড়, ট্রেনে উঠা-নামার সময় বিশৃঙ্খলা — এগুলো ছোট বিষয় মনে হলেও একটা সিস্টেম কতটা স্মুথভাবে চলবে তা ঠিক করে দেয়।

---

## কিছু ছোট অভ্যাস, বড় পরিবর্তন

### ১. এস্কেলেটরে বামে দাঁড়ান, ডান পাশ ফাঁকা রাখুন
### ২. আগে নামতে দিন, তারপর উঠুন
### ৩. দরজার সামনে না দাঁড়িয়ে ভেতরে যান
### ৪. বিশেষ চাহিদাসম্পন্ন যাত্রীদের অগ্রাধিকার দিন

---

## শেষ কথা

মেট্রোরেল আমাদের হাতে একটা ভালো সিস্টেম তুলে দিয়েছে। ছোট ছোট অভ্যাস বদলালে পুরো শহরের অভিজ্ঞতা বদলে যেতে পারে।

🔗 [https://koyjabo.com](https://koyjabo.com)

#KoyJabo #DhakaMetro #Dhaka #PublicTransport
`,author:"কই যাবো Team",publishDate:"2026-04-25",readTime:"4 min read",keywords:["Dhaka Metro Rail culture","মেট্রোরেল","metro etiquette Dhaka","MRT Line 6 tips","Dhaka public transport","metro rail Bangladesh","civic sense metro","escalator etiquette","KoyJabo blog","ঢাকা মেট্রো","transport culture Bangladesh","metro commute Dhaka"],category:"Metro Rail"},{id:"best-places-to-visit-in-bangladesh-2026-guide",slug:"best-places-to-visit-in-bangladesh-2026-guide",title:"Best Places to Visit in Bangladesh (2026 Tourist Guide)",bnTitle:"বাংলাদেশে ভ্রমণের সেরা জায়গাগুলো (২০২৬ ট্যুরিস্ট গাইড)",excerpt:"Explore the hidden gems of Bangladesh — from the world's largest mangrove forest to the longest sea beach. Here are the must-visit places for your next trip.",bnExcerpt:"বাংলাদেশের লুকিয়ে থাকা সৌন্দর্যগুলো খুঁজে দেখুন — পৃথিবীর বৃহত্তম ম্যানগ্রোভ বন থেকে দীর্ঘতম সমুদ্র সৈকত। আপনার পরবর্তী ট্যুরের জন্য সেরা জায়গাগুলোর তালিকা।",coverImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Sundarban_Tiger.jpg/1024px-Sundarban_Tiger.jpg",author:"KoyJabo Team",publishDate:"2026-05-02",readTime:"10 min read",keywords:["best places to visit in Bangladesh","Bangladesh tourism 2026","visit Sundarbans","Cox's Bazar beach guide","Sylhet tea gardens","Srimangal travel","Bandarban hiking","Saint Martin island","places to visit in Dhaka","Bangladesh travel tips","KoyJabo travel guide"],category:"Travel Guide",content:`
Bangladesh is a land of vibrant culture, lush greenery, and stunning natural beauty. If you're planning a trip in 2026, here are the absolute must-visit destinations.

---

## 🐯 1. The Sundarbans — World's Largest Mangrove Forest
A UNESCO World Heritage site and home to the majestic Royal Bengal Tiger.
- **Best for:** Nature lovers, wildlife photography.
- **Top Activity:** Boat safari through the narrow creeks.
- **💰 Estimated Cost:** ৳15,000 - ৳25,000 for a 3-day tour.

---

## 🏖️ 2. Cox's Bazar — The Longest Sea Beach
120 km of sandy beach and rolling waves.
- **Best for:** Relaxation, seafood, sunsets.
- **Top Activity:** Marine Drive drive to Inani Beach.
- **🏨 Where to Stay:** [See our Cox's Bazar Hotel Guide](https://www.booking.com/searchresults.en-gb.html?ss=Cox%27s+Bazar&aid=YOUR_ID)

---

## 🍵 3. Sylhet & Srimangal — The Tea Capital
Rolling hills covered in emerald green tea gardens and the famous Lawachara National Park.
- **Best for:** Peace, trekking, tea tasting.
- **Top Activity:** Visit Ratargul Swamp Forest.
- **💰 Estimated Cost:** ৳8,000 - ৳12,000 for a weekend trip.

---

## ⛰️ 4. Bandarban — The Hill Tracts
The roof of Bangladesh, featuring the highest peaks and indigenous cultures.
- **Best for:** Adventure, hiking, breathtaking views.
- **Top Activity:** Boat ride on Sangu River.

---

## 🏝️ 5. Saint Martin's Island — The Only Coral Island
Crystal clear blue water and coconut groves.
- **Best for:** Snorkeling, relaxing, fresh coconut water.
- **Note:** Check for current travel restrictions as the government limits visitors to preserve the environment.

---

## 🎯 Plan Your Trip with KoyJabo
Getting to these places usually starts from Dhaka. Use **[KoyJabo.com](https://koyjabo.com)** to find the best bus and train connections to reach these stunning destinations.

#BangladeshTourism #Sundarbans #CoxsBazar #Sylhet #Bandarban #KoyJabo #Travel2026
`,bnContent:`
বাংলাদেশ প্রাকৃতিক সৌন্দর্যে ভরপুর একটি দেশ। ২০২৬ সালে ভ্রমণের জন্য সেরা কিছু জায়গার তালিকা নিচে দেওয়া হলো।

---

## ১. সুন্দরবন — বিশ্বের বৃহত্তম ম্যানগ্রোভ বন
ইউনেস্কো ওয়ার্ল্ড হেরিটেজ সাইট এবং রয়েল বেঙ্গল টাইগারের আবাসস্থল।

---

## ২. কক্সবাজার — দীর্ঘতম সমুদ্র সৈকত
১২০ কিলোমিটার বালুকাময় সৈকত।

---

## ৩. সিলেট ও শ্রীমঙ্গল — চায়ের রাজধানী
সবুজ পাহাড় আর চা বাগানে ঘেরা এলাকা।

---

## ৪. বান্দরবান — পাহাড়ের রাণী
বাংলাদেশের সর্বোচ্চ পাহাড় এবং আদিবাসী সংস্কৃতির অপূর্ব মিলনস্থল।

---

## ৫. সেন্ট মার্টিন দ্বীপ — একমাত্র প্রবাল দ্বীপ
নীল জলরাশি আর নারিকেল বাগানের দ্বীপ।

#ভ্রমণ #বাংলাদেশ #সুন্দরবন #কক্সবাজার #সিলেট #বান্দরবান #কইযাবো
`},{id:"cheap-travel-guide-dhaka-to-coxs-bazar-save-money",slug:"cheap-travel-guide-dhaka-to-coxs-bazar-save-money",title:"Dhaka to Cox’s Bazar Budget Travel Guide: Save Money (2026)",bnTitle:"ঢাকা থেকে কক্সবাজার বাজেটে ভ্রমণের গাইড: টাকা বাঁচান (২০২৬)",excerpt:"Want to visit Cox's Bazar without breaking the bank? Learn how to find cheap buses, budget hotels, and affordable food for your next beach trip.",bnExcerpt:"বেশি খরচ না করে কক্সবাজার ঘুরতে চান? কিভাবে কম ভাড়ায় বাস, সস্তা হোটেল এবং সাশ্রয়ী খাবার পাবেন তা জানুন।",coverImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Cox%27s_Bazar_Beach_Crowd.jpg/1024px-Cox%27s_Bazar_Beach_Crowd.jpg",author:"KoyJabo Team",publishDate:"2026-05-01",readTime:"8 min read",keywords:["cheap travel Cox's Bazar","budget trip Dhaka to Coxs Bazar","Cox's Bazar low cost guide","cheap hotels Coxs Bazar","budget food Coxs Bazar","how to save money in Bangladesh trip","KoyJabo budget guide","travel hacks Bangladesh"],category:"Travel Guide",content:`
Traveling to Cox's Bazar doesn't have to be expensive. With a little planning, you can enjoy the world's longest beach on a tight budget.

---

## 🚌 1. Choose Non-AC Night Coaches
While AC Sleeper buses are comfortable, they cost ৳1,500+. Non-AC buses like Hanif or Shyamoli cost around **৳700 - ৳800**.
- **Saving:** ৳800 per person per way.
- **Tip:** Take the 10 PM bus to save one night's hotel cost.

---

## 🏨 2. Stay Away from Kolatoli Main Point
Hotels right at the Kolatoli beach point are the most expensive. Look for hotels in the **Sugondha or Laboni** area, or slightly inland.
- **Budget Hotel Pick:** [Hotel Media International](https://www.booking.com/hotel/bd/media-international.html?aid=YOUR_ID) (~৳1,200/night).
- **Tip:** Book 2 weeks in advance for better rates.

---

## 🍽️ 3. Eat Like a Local (Puran Dhaka Style)
Instead of expensive beach-view restaurants, eat at local "Bhuna" houses. You can get a full meal (Rice + Vorta + Fish/Chicken) for **৳150 - ৳250**.
- **Pro Tip:** Try the "Loitta Fry" at a local shack instead of a big restaurant.

---

## 🚶 4. Walk or Use Shared Tomtoms
Avoid private CNGs. Shared electric Tomtoms (Easy bikes) cost only **৳10 - ৳20** to move between beach points.

---

## 💰 Total Estimated Budget (3 Days/2 Nights)
*   **Transport:** ৳1,600 (Return)
*   **Hotel:** ৳2,400 (Shared room)
*   **Food:** ৳1,500
*   **Total:** **৳5,500** per person!

---

🌐 Plan your transport route to the bus terminal using **[KoyJabo.com](https://koyjabo.com)** to save on city transport too!

#BudgetTravel #CoxsBazar #SaveMoney #TravelHacks #Bangladesh #KoyJabo
`,bnContent:`
কক্সবাজার ভ্রমণ খুব বেশি ব্যয়বহুল হওয়ার দরকার নেই। একটু পরিকল্পনা করলেই আপনি অনেক টাকা বাঁচাতে পারেন।

---

## ১. নন-এসি বাস বেছে নিন
এসি বাসের চেয়ে নন-এসি বাসে ভাড়া অনেক কম (৳৭০০-৳৮০০)।

---

## ২. একটু দূরে হোটেল নিন
কলাতলী মেইন পয়েন্টের চেয়ে সুগন্ধা বা লাবণী পয়েন্টের ভেতরের দিকে হোটেল সস্তা।

---

## ৩. লোকাল খাবার খান
বীচ ভিউ রেস্টুরেন্টের বদলে লোকাল ভাতের হোটেলে খান।

---

#সাশ্রয়ীভ্রমণ #কক্সবাজার #বাজেটট্যুর #কইযাবো
`},{id:"bangladesh-tour-cost-breakdown-2026",slug:"bangladesh-tour-cost-breakdown-2026",title:"Bangladesh Tour Cost Breakdown: How Much Money Do You Need?",bnTitle:"বাংলাদেশ ট্যুর খরচ: আপনার কত টাকা লাগবে? (২০২৬ আপডেট)",excerpt:"Planning a trip around Bangladesh? Here is a complete breakdown of daily costs for transport, food, accommodation, and activities for all budgets.",bnExcerpt:"সারা বাংলাদেশ ঘুরে দেখার পরিকল্পনা করছেন? যাতায়াত, খাবার, থাকা এবং অন্যান্য খরচের একটি পূর্ণাঙ্গ হিসাব এখানে পাবেন।",coverImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Taka_Banknote.jpg/1024px-Taka_Banknote.jpg",author:"KoyJabo Team",publishDate:"2026-04-30",readTime:"7 min read",keywords:["Bangladesh travel cost","daily budget Bangladesh","price of food Bangladesh","transport fares Bangladesh 2026","hotel prices Bangladesh","is Bangladesh expensive","travel budget planner","KoyJabo cost guide"],category:"Tips & Tricks",content:`
How much does it cost to travel in Bangladesh in 2026? Whether you are a backpacker or a luxury traveler, here is the real breakdown.

---

## 🍱 1. Food Costs
- **Budget (Local Eatery):** ৳100 - ৳250 per meal.
- **Mid-range (Casual Dining):** ৳400 - ৳800 per meal.
- **Luxury (High-end):** ৳1,500+ per meal.
- **Street Food:** ৳20 - ৳50 (Fuchka, Chotpoty, Jhalmuri).

---

## 🚌 2. Transport Costs (Intercity)
- **Non-AC Bus:** ৳1.8 - ৳2.2 per km.
- **AC Bus:** ৳2.5 - ৳4.0 per km.
- **Train (Snigdha/AC):** ৳1.5 - ৳2.5 per km.
- **Domestic Flight:** ৳3,500 - ৳7,000 (Dhaka to major cities).

---

## 🏨 3. Accommodation Costs
- **Budget Guesthouse:** ৳1,000 - ৳2,000 per night.
- **3-Star Hotel:** ৳3,500 - ৳6,000 per night. [Check Current Rates](https://www.booking.com/country/bd.html?aid=YOUR_ID)
- **5-Star Resort:** ৳12,000+ per night.

---

## 🎟️ 4. Entry Fees (Tourist Sites)
- **Locals:** ৳20 - ৳100.
- **Foreigners:** ৳200 - ৳600 (SAARC citizens get discounts).

---

## 💰 Suggested Daily Budget
*   **Backpacker:** ৳1,500 - ৳2,500 ($13 - $22)
*   **Mid-range:** ৳5,000 - ৳8,000 ($45 - $70)
*   **Flashpacker/Luxury:** ৳15,000+ ($130+)

---

## 🚀 Save Money with KoyJabo
Don't get overcharged by middlemen. Use **[KoyJabo.com](https://koyjabo.com)** to check official bus fares and routes before you travel.

#TravelCost #BangladeshBudget #TripPlanner #KoyJabo #TravelTips
`,bnContent:`
২০২৬ সালে বাংলাদেশ ভ্রমণে আপনার কেমন খরচ হতে পারে? যাতায়াত, খাবার এবং থাকার বিস্তারিত খরচ এখানে দেওয়া হলো।

---

## ১. খাবারের খরচ
লোকাল খাবার প্রতি বেলা ১০০-২৫০ টাকা।

---

## ২. যাতায়াত খরচ
বাস ও ট্রেনের ভাড়ার বিস্তারিত তালিকা।

---

## ৩. থাকার খরচ
বাজেট হোটেল থেকে লাক্সারি রিসোর্টের খরচের ধারণা।

---

#ভ্রমণখরচ #বাংলাদেশ #বাজেট #ট্যুরপ্ল্যানার #কইযাবো
`},{id:"sundarbans-tour-guide-from-dhaka",slug:"sundarbans-tour-guide-from-dhaka",title:"Sundarbans Tour from Dhaka: Complete 2026 Guide (Cost, Routes & Tips)",bnTitle:"ঢাকা থেকে সুন্দরবন ভ্রমণ: সম্পূর্ণ ২০২৬ গাইড (খরচ, রুট ও টিপস)",excerpt:"The Sundarbans — home to Royal Bengal Tigers and the world's largest mangrove forest — is Bangladesh's most awe-inspiring destination. Here's exactly how to get there from Dhaka, how much it costs, and what to expect.",bnExcerpt:"সুন্দরবন — রয়েল বেঙ্গল টাইগারের আবাস এবং পৃথিবীর বৃহত্তম ম্যানগ্রোভ বন — বাংলাদেশের সবচেয়ে অসাধারণ গন্তব্য। ঢাকা থেকে কীভাবে যাবেন, খরচ কত এবং কী দেখবেন।",coverImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Sundarban_Tiger.jpg/1024px-Sundarban_Tiger.jpg",author:"KoyJabo Team",publishDate:"2026-05-10",readTime:"9 min read",keywords:["Sundarbans tour from Dhaka","Sundarbans travel guide","visit Sundarbans Bangladesh","Sundarbans cost 2026","Sundarbans package tour","Khulna to Sundarbans","Royal Bengal Tiger Bangladesh","Sundarbans UNESCO","mangrove forest Bangladesh","Mongla port Sundarbans","Sundarbans boat tour","Bangladesh wildlife tour","KoyJabo travel guide","সুন্দরবন ভ্রমণ","সুন্দরবন যাওয়ার উপায়"],category:"Travel Guide",content:`
The **Sundarbans** is one of the most extraordinary places on Earth — a UNESCO World Heritage Site spanning 10,000 sq km across Bangladesh and India. It is home to the legendary **Royal Bengal Tiger**, saltwater crocodiles, spotted deer, and over 300 species of birds.

If you're planning a Bangladesh trip, the Sundarbans is non-negotiable.

---

## 🗺️ How to Get from Dhaka to Sundarbans

The Sundarbans is in southwestern Bangladesh. You cannot enter directly — you must go through **Khulna or Mongla** port first.

### Route 1: By Bus (Budget Option)
- **Dhaka → Khulna:** Bus from Kalyanpur/Gabtoli terminal
  - Non-AC: ৳700–900 | AC: ৳1,100–1,600
  - Journey time: 7–9 hours
  - Operators: Soudia, Shyamoli, Green Line, Hanif
- **Khulna → Mongla:** Local bus or CNG auto (~1.5 hrs, ৳80–150)
- **Mongla → Sundarbans:** Boat/launch (arranged by tour operators)

### Route 2: By Train (Comfortable)
- **Jahanabad Express** (Dhaka → Khulna via Padma Bridge): **3 hrs 45 min only!**
  - Shovan Chair: ৳445 | Snigdha AC: ৳856
  - Departs from Kamalapur/Airport stations
- Fastest and most comfortable option thanks to Padma Bridge

### Route 3: Overnight Launch from Dhaka (Scenic)
- Sadarghat → Khulna by overnight launch
- Deck: ৳300–500 | Cabin: ৳1,000–3,000
- Journey: 10–12 hours (evening departure)
- Relaxing option — see the rivers at dawn

---

## 💰 Sundarbans Tour Cost Breakdown

| Item | Budget | Mid-Range | Premium |
|------|--------|-----------|---------|
| Dhaka–Khulna transport | ৳800 | ৳1,200 | ৳2,000 |
| Sundarbans package (2N/3D) | ৳4,000 | ৳8,000 | ৳18,000+ |
| Forest entry + guide fee | ৳1,500 | ৳1,500 | Included |
| Food (per day) | ৳300 | ৳600 | Included |
| **Total (per person)** | **~৳7,000** | **~৳12,000** | **৳22,000+** |

> **Tip:** Group tours (6–10 people) can be 40% cheaper per person.

---

## 📅 Best Time to Visit

| Season | Months | What to Expect |
|--------|--------|----------------|
| ✅ Best | November – February | Cool, dry, wildlife very active |
| ✅ Good | March – April | Warm, fewer crowds |
| ⚠️ Avoid | June – September | Monsoon, high flood risk, tours limited |
| 🐯 Tiger sightings | January – March | Best chance during dry season |

---

## 🚤 What Happens Inside the Sundarbans

All visitors must travel by boat — no roads exist inside. Your package includes:

- **Boat ride** through the mangrove canals
- **Forest walks** with armed forest guards (mandatory)
- **Watch towers** at Katka, Kochikhali, Hiron Point
- **Wildlife spotting:** Tigers (rare but possible), spotted deer, crocodiles, kingfishers, dolphins
- **Mangrove forest:** Surreal beauty of sundarl trees reflected in still water

---

## 🏨 Where to Stay

**In Khulna (before/after):**
- Hotel Castle Salam (mid-range, ৳1,500–3,000/night)
- Hotel Royal (budget, ৳800/night)

**In the Sundarbans:**
- Bangladesh Forest Department guesthouses at Hiron Point, Katka
- Boat accommodation (included in most packages)

---

## 📋 Tour Operators (Trusted)

- **Guide Tour Ltd** — Dhaka-based, reputable for Sundarbans packages
- **Bengal Tours** — Good group packages
- **Parjatan Hotel & Tourism** — Government operator, reliable

> **Book via KoyJabo.com route planner** to find the cheapest bus or train to Khulna as your first step.

---

## ⚠️ Important Rules

- 🚫 No plastic bags inside the forest (strict ban)
- 🚫 Do not wander alone — tigers are real, guards mandatory
- 📋 Carry national ID or passport for forest permit
- 📱 Mobile signal is almost zero inside

---

## 🔑 Quick Summary

1. **Fastest route:** Train (Jahanabad Express, Padma Bridge, 3h45m)
2. **Cheapest route:** Bus (~৳700)
3. **Most scenic:** Overnight launch from Sadarghat
4. **Best package:** 2 nights / 3 days, ~৳8,000–12,000 per person
5. **Best time:** November to February

Use **[KoyJabo.com](https://koyjabo.com)** to find real-time bus fares and train schedules for Dhaka → Khulna before booking your Sundarbans trip.

#Sundarbans #BangladeshTravel #WildlifeTour #RoyalBengalTiger #KoyJabo #TravelBangladesh
`,bnContent:`
**সুন্দরবন** পৃথিবীর অন্যতম বিস্ময়কর স্থান — একটি UNESCO বিশ্ব ঐতিহ্য স্থান যা বাংলাদেশ ও ভারত জুড়ে ১০,০০০ বর্গকিলোমিটার বিস্তৃত। এখানে রয়েছে কিংবদন্তি **রয়েল বেঙ্গল টাইগার**, লোনা জলের কুমির, চিত্রল হরিণ এবং ৩০০+ প্রজাতির পাখি।

---

## 🗺️ ঢাকা থেকে সুন্দরবন যাওয়ার উপায়

সুন্দরবন বাংলাদেশের দক্ষিণ-পশ্চিমে। সরাসরি প্রবেশ করা যায় না — আগে **খুলনা বা মংলা** বন্দরে যেতে হবে।

### রুট ১: বাসে (বাজেট)
- **ঢাকা → খুলনা:** কল্যাণপুর/গাবতলী টার্মিনাল থেকে
  - নন-এসি: ৳৭০০–৯০০ | এসি: ৳১,১০০–১,৬০০
  - সময়: ৭–৯ ঘন্টা
- **খুলনা → মংলা:** লোকাল বাস বা সিএনজি (~১.৫ ঘন্টা, ৳৮০–১৫০)

### রুট ২: ট্রেনে (সবচেয়ে দ্রুত)
- **জাহানাবাদ এক্সপ্রেস** (পদ্মা সেতু হয়ে): মাত্র **৩ ঘন্টা ৪৫ মিনিট!**
  - শোভন চেয়ার: ৳৪৪৫ | স্নিগ্ধা এসি: ৳৮৫৬

### রুট ৩: রাতের লঞ্চে (দর্শনীয়)
- সদরঘাট → খুলনা, ১০–১২ ঘন্টা
- ডেক: ৳৩০০–৫০০ | কেবিন: ৳১,০০০–৩,০০০

---

## 💰 সুন্দরবন ট্যুরের খরচ

| আইটেম | বাজেট | মধ্যম | প্রিমিয়াম |
|--------|-------|-------|----------|
| ঢাকা–খুলনা যাতায়াত | ৳৮০০ | ৳১,২০০ | ৳২,০০০ |
| সুন্দরবন প্যাকেজ (২রাত/৩দিন) | ৳৪,০০০ | ৳৮,০০০ | ৳১৮,০০০+ |
| বন প্রবেশ + গাইড | ৳১,৫০০ | ৳১,৫০০ | অন্তর্ভুক্ত |
| **মোট (প্রতিজন)** | **~৳৭,০০০** | **~৳১২,০০০** | **৳২২,০০০+** |

---

## 📅 যাওয়ার সেরা সময়

- ✅ **নভেম্বর – ফেব্রুয়ারি:** শীতল, শুষ্ক, বন্যপ্রাণী সক্রিয়
- ✅ **মার্চ – এপ্রিল:** উষ্ণ, ভিড় কম
- ⚠️ **জুন – সেপ্টেম্বর:** বর্ষা, বন্যার ঝুঁকি

**[KoyJabo.com](https://koyjabo.com)** ব্যবহার করে ঢাকা → খুলনার বাস বা ট্রেনের ভাড়া ও সময়সূচী দেখুন।

#সুন্দরবন #বাংলাদেশভ্রমণ #রয়েলবেঙ্গলটাইগার #কইযাবো
`},{id:"saint-martin-island-travel-guide-bangladesh",slug:"saint-martin-island-travel-guide-bangladesh",title:"Saint Martin Island Bangladesh: Complete Travel Guide 2026",bnTitle:"সেন্ট মার্টিন দ্বীপ সম্পূর্ণ ভ্রমণ গাইড ২০২৬",excerpt:"Saint Martin is Bangladesh's only coral island — crystal clear water, white sand beaches and coconut groves. Here's the complete guide: how to get there, where to stay, costs and the best time to visit.",bnExcerpt:"সেন্ট মার্টিন বাংলাদেশের একমাত্র প্রবাল দ্বীপ — স্বচ্ছ জল, সাদা বালির সৈকত এবং নারকেল বাগান। কীভাবে যাবেন, কোথায় থাকবেন, খরচ ও সেরা সময় জানুন।",coverImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Saint_Martin_Island.jpg/1024px-Saint_Martin_Island.jpg",author:"KoyJabo Team",publishDate:"2026-05-11",readTime:"8 min read",keywords:["Saint Martin island Bangladesh","Saint Martin travel guide","how to go Saint Martin","Saint Martin cost 2026","Teknaf to Saint Martin","Bangladesh coral island","Saint Martin hotel","Saint Martin beach","cox's bazar to Saint Martin","সেন্ট মার্টিন ভ্রমণ","সেন্ট মার্টিন যাওয়ার উপায়","KoyJabo travel","Bangladesh island tour","Keari Sindbad ship","Saint Martin ship schedule"],category:"Travel Guide",content:`
**Saint Martin Island** (Narikel Jinjira / নারিকেল জিঞ্জিরা) is Bangladesh's only coral island and one of the most beautiful destinations in the entire Bay of Bengal. Located 9km south of Teknaf in the southernmost tip of Bangladesh, it offers turquoise water, white sandy beaches, coral reefs, and fresh seafood.

Every year, hundreds of thousands of Bangladeshi tourists and international visitors come here — and for good reason.

---

## 🚢 How to Get to Saint Martin Island

There is only **one way to reach Saint Martin: by ship from Teknaf**. No airport, no bridge.

### Full Route from Dhaka

**Step 1: Dhaka → Cox's Bazar**
- **Bus:** 10–12 hrs | ৳900–2,500 (non-AC to luxury AC)
  - Operators: Green Line, Hanif, Shyamoli, S Alam
  - Departs: Sayedabad Terminal, Dhaka
- **Train:** Cox's Bazar Express (departs 10:30 PM) | ৳745–2,656
- **Flight:** 55 min | ৳4,500–12,000 (Biman, US-Bangla, Novoair)

**Step 2: Cox's Bazar → Teknaf**
- Local bus or tourist bus: 1.5–2 hrs | ৳80–200
- CNG/taxi: ৳300–500

**Step 3: Teknaf → Saint Martin (by Ship)**
| Ship | Departs | Returns | Fare (one way) |
|------|---------|---------|----------------|
| Keari Sindbad | 9:00 AM | 3:00 PM | ৳650–1,200 |
| Bay One Express | 9:30 AM | 3:30 PM | ৳600–1,100 |
| MV Swarnadwip | 9:00 AM | 3:00 PM | ৳550–900 |

> Ships depart **Teknaf at 9–9:30 AM** and return at **3–3:30 PM**. Miss it, and you stay the night (or go back by speedboat for ৳3,000–4,000).

---

## 💰 Saint Martin Trip Cost (per person)

| Item | Budget | Mid-Range | Luxury |
|------|--------|-----------|--------|
| Dhaka→Cox's Bazar (bus) | ৳1,000 | ৳1,500 | ৳3,500 |
| Cox's Bazar→Teknaf | ৳150 | ৳200 | ৳400 |
| Ship (return) | ৳1,100 | ৳1,600 | ৳2,400 |
| Hotel (2 nights) | ৳800 | ৳2,000 | ৳6,000+ |
| Food (2 days) | ৳600 | ৳1,200 | ৳2,500 |
| **Total** | **~৳4,000** | **~৳7,000** | **৳15,000+** |

---

## 📅 Best Time to Visit

| Season | Verdict |
|--------|---------|
| November – February | ✅ **Best** — calm sea, clear water, cool weather |
| March – April | ✅ Good — warm, manageable waves |
| May – June | ⚠️ Border season — sea getting rough |
| July – October | ❌ Ships stopped — cyclone season |

> **Saint Martin is officially closed to tourists from June to September.** Ships stop running due to the Bay of Bengal cyclone season. Plan accordingly.

---

## 🏨 Where to Stay on Saint Martin

| Hotel/Resort | Price per night | Notes |
|---|---|---|
| Blue Marine Resort | ৳3,000–6,000 | Popular, sea-view rooms |
| Coral Blue Resort | ৳2,500–5,000 | Good beach access |
| Hotel Sea Beach | ৳1,500–3,000 | Budget-friendly |
| Local homestays | ৳500–1,000 | Cheapest option |

> Book in advance for November–February — the island gets packed.

---

## 🐠 What to Do at Saint Martin

- **Sunrise & sunset** from the beach (spectacular)
- **Coral viewing** — snorkel or glass-bottom boat (৳200–400/hr)
- **Chera Dwip** — tiny island accessible by boat at low tide (৳50 boat fee)
- **Fresh seafood** — lobster, crab, hilsa, various fish cooked fresh
- **Coconut everywhere** — fresh coconut water for ৳30–50
- **Star-gazing at night** — no light pollution, incredible sky

---

## ⚠️ Important Tips

- 📋 **Carry your National ID / passport** — checkpoints on route
- 🐠 **No plastic** — Saint Martin has a plastic ban for environmental protection
- 💧 **Carry extra water** — fresh water is limited on the island
- 🌊 **Don't swim in deep water** — currents can be dangerous
- 📱 **Network is limited** — Robi/Teletalk have partial coverage

---

## 🔑 Quick Summary

1. **Only way in:** Ship from Teknaf (departs 9 AM)
2. **Closest base:** Cox's Bazar (2 hrs from Teknaf)
3. **Cheapest trip from Dhaka:** ~৳4,000 total
4. **Best season:** November – February
5. **Must try:** Fresh lobster on the beach at sunset

Use **[KoyJabo.com](https://koyjabo.com)** to check bus/train schedules and fares for Dhaka → Cox's Bazar as your first step.

#SaintMartin #Bangladesh #BeachTravel #CoralIsland #KoyJabo #TravelBangladesh
`,bnContent:`
**সেন্ট মার্টিন দ্বীপ** (নারিকেল জিঞ্জিরা) বাংলাদেশের একমাত্র প্রবাল দ্বীপ। বঙ্গোপসাগরের তীরে অবস্থিত এই দ্বীপে রয়েছে নীলাভ জল, সাদা বালির সৈকত, প্রবাল প্রাচীর এবং তাজা সামুদ্রিক খাবার।

---

## 🚢 সেন্ট মার্টিন যাওয়ার উপায়

সেন্ট মার্টিন যাওয়ার একমাত্র পথ: **টেকনাফ থেকে জাহাজে**।

### ঢাকা থেকে সম্পূর্ণ রুট

**ধাপ ১: ঢাকা → কক্সবাজার**
- বাস: ১০–১২ ঘন্টা | ৳৯০০–২,৫০০ (সায়েদাবাদ টার্মিনাল)
- ট্রেন: কক্সবাজার এক্সপ্রেস (রাত ১০:৩০)
- ফ্লাইট: ৫৫ মিনিট | ৳৪,৫০০–১২,০০০

**ধাপ ২: কক্সবাজার → টেকনাফ**
- লোকাল বাস: ১.৫–২ ঘন্টা | ৳৮০–২০০

**ধাপ ৩: টেকনাফ → সেন্ট মার্টিন (জাহাজে)**
- সকাল ৯টায় জাহাজ ছাড়ে | একমুখী ভাড়া: ৳৫৫০–১,২০০

---

## 💰 সেন্ট মার্টিন ট্রিপের খরচ

| আইটেম | বাজেট | মধ্যম |
|--------|-------|-------|
| ঢাকা→কক্সবাজার বাস | ৳১,০০০ | ৳১,৫০০ |
| কক্সবাজার→টেকনাফ | ৳১৫০ | ৳২০০ |
| জাহাজ (আসা-যাওয়া) | ৳১,১০০ | ৳১,৬০০ |
| হোটেল (২ রাত) | ৳৮০০ | ৳২,০০০ |
| খাবার (২ দিন) | ৳৬০০ | ৳১,২০০ |
| **মোট** | **~৳৪,০০০** | **~৳৭,০০০** |

---

## 📅 যাওয়ার সেরা সময়

- ✅ **নভেম্বর – ফেব্রুয়ারি:** সেরা — শান্ত সমুদ্র, স্বচ্ছ পানি
- ✅ **মার্চ – এপ্রিল:** ভালো — উষ্ণ আবহাওয়া
- ❌ **জুন – অক্টোবর:** জাহাজ বন্ধ — ঘূর্ণিঝড়ের মৌসুম

**[KoyJabo.com](https://koyjabo.com)** ব্যবহার করে ঢাকা → কক্সবাজার বাস বা ট্রেনের তথ্য দেখুন।

#সেন্টমার্টিন #বাংলাদেশভ্রমণ #প্রবালদ্বীপ #কইযাবো
`},{id:"bangladesh-travel-guide-for-tourists-foreigners",slug:"bangladesh-travel-guide-for-tourists-foreigners",title:"Bangladesh Travel Guide for Tourists & Foreigners (2026): Everything You Need to Know",bnTitle:"বিদেশি পর্যটকদের জন্য বাংলাদেশ ভ্রমণ গাইড ২০২৬",excerpt:"Planning a trip to Bangladesh? This complete guide covers visa requirements, best places to visit, how to get around, safety, costs and insider tips — everything a foreign tourist needs to know.",bnExcerpt:"বাংলাদেশ ভ্রমণের পরিকল্পনা করছেন? ভিসা, সেরা জায়গা, যাতায়াত, নিরাপত্তা, খরচ এবং ভেতরের টিপস — বিদেশি পর্যটকের জানার সব কিছু।",coverImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/1200px-Flag_of_Bangladesh.svg.png",author:"KoyJabo Team",publishDate:"2026-05-11",readTime:"12 min read",keywords:["Bangladesh travel guide foreigners","visit Bangladesh 2026","Bangladesh tourism guide","Bangladesh visa on arrival","is Bangladesh safe for tourists","Bangladesh travel tips","budget travel Bangladesh","best things to do Bangladesh","Bangladesh itinerary","traveling in Bangladesh","Bangladesh transport for tourists","Dhaka tourist guide","KoyJabo tourists","bangladesh travel cost","Bangladesh backpacker guide"],category:"Travel Guide",content:`
Bangladesh is one of Asia's most underrated travel destinations. Lush river deltas, the world's longest sea beach, UNESCO-listed mangrove forests, ancient temples, and some of the most hospitable people on Earth — all at a fraction of the cost of neighbouring countries.

This guide covers everything you need to know as a foreign tourist visiting Bangladesh.

---

## 🛂 Visa Requirements

| Nationality | Visa Type |
|---|---|
| Most Western countries (USA, UK, EU, Australia, Canada) | Visa on Arrival (VOA) at Hazrat Shahjalal International Airport |
| India, Pakistan, China | Prior visa required |
| Most South/Southeast Asian | Visa on Arrival |

**Visa on Arrival:**
- Fee: **$50 USD**
- Duration: **30 days** (extendable)
- Available at Dhaka airport only (not at land borders)

> Check the Bangladesh immigration website for the latest visa rules before travel.

---

## ✈️ Getting to Bangladesh

**By Air:**
- **Hazrat Shahjalal International Airport (DAC), Dhaka** — main international hub
- Airlines: Biman Bangladesh, Qatar Airways, Emirates, Singapore Airlines, Thai Airways, IndiGo, Air India

**From Dhaka Airport to City:**
- Taxi: ৳500–800 to Motijheel/Gulshan
- Uber/Pathao: ৳300–500
- BRTC Airport Bus: ৳80 to Motijheel

---

## 🗺️ Top Destinations for Tourists

### 1. Cox's Bazar — World's Longest Sea Beach
- 120km unbroken beach
- Water sports, surfing, seafood
- 6–7 hrs from Dhaka by bus/train

### 2. Sundarbans — UNESCO Mangrove Forest
- Royal Bengal Tiger, crocodiles, dolphins
- 3h45m from Dhaka by train to Khulna, then boat

### 3. Saint Martin Island — Coral Paradise
- Bangladesh's only coral island
- Turquoise water, snorkelling, lobster
- Via Cox's Bazar → Teknaf → ship (9 AM daily, Nov–May)

### 4. Srimangal — Tea Capital
- Rolling tea gardens, rubber plantations, wildlife
- 3 hrs from Dhaka by train (Upaban Express)
- Famous for "7-layer tea"

### 5. Dhaka — Vibrant Capital
- Old Dhaka: Lalbagh Fort, Ahsan Manzil, Sadarghat river port
- Shopping: Bashundhara City, New Market, Jamuna Future Park
- Food: Kacchi biryani, hilsa curry, street food

### 6. Bandarban — Hill Tracts Adventure
- Blue Nilgiri hills, Boga Lake, tribal villages
- Trekking, zipline, camp stays
- 4 hrs from Chittagong by bus

### 7. Sylhet — Spiritual & Green
- Shrine of Hazrat Shah Jalal
- Tea estates, haor wetlands, Jaflong stone beach
- 6.5 hrs from Dhaka by train

---

## 🚌 Getting Around Bangladesh

Bangladesh has excellent intercity transport. Use **[KoyJabo.com](https://koyjabo.com)** to find routes and fares.

| Mode | Best For | Cost |
|------|----------|------|
| **Bus (AC)** | Intercity comfort | ৳500–2,500 |
| **Train** | Long distance, scenic | ৳200–2,656 |
| **Domestic flight** | Fast, Chittagong/Cox's Bazar | ৳4,500–12,000 |
| **Launch/ferry** | River routes, experience | ৳300–3,000 |
| **Uber/Pathao** | City travel | ৳80–300 |
| **Rickshaw** | Short distances | ৳20–60 |
| **Metro Rail (MRT-6)** | Dhaka north-south | ৳20–100 |

---

## 💵 Budget Guide (per person, per day)

| Style | Daily Budget |
|-------|-------------|
| Backpacker | $15–25 USD (৳1,600–2,700) |
| Mid-range | $35–60 USD (৳3,800–6,500) |
| Comfort | $80–150 USD (৳8,700–16,000) |
| Luxury | $200+ USD (৳22,000+) |

**Bangladesh is extremely affordable.** A full meal costs ৳100–250 (under $3). A comfortable hotel room: ৳1,500–3,000 ($15–30).

---

## 🛡️ Safety for Tourists

Bangladesh is **generally safe for tourists.** Common sense applies:

- ✅ Dhaka, Cox's Bazar, Sylhet, Chittagong are all tourist-friendly
- ✅ Locals are extremely welcoming and helpful to foreigners
- ⚠️ Avoid Chittagong Hill Tracts border areas without permits
- ⚠️ Standard petty theft caution in crowded areas (Sadarghat, markets)
- ⚠️ Traffic in Dhaka is chaotic — use Uber over street rickshaws for longer trips

---

## 🍛 Food to Try

| Dish | What it is |
|------|-----------|
| Kacchi Biryani | Slow-cooked lamb biryani, Dhaka's signature dish |
| Hilsa Curry | National fish, must-try in Dhaka or Chandpur |
| Shorshe Ilish | Hilsa in mustard gravy |
| Panta Bhaat | Fermented rice dish |
| Mishti Doi | Sweet yogurt, Bogura is famous for it |
| Street food | Fuchka (like gol gappa), chotpoti, jhalmuri |

---

## 📱 Useful Apps & Tools

| Tool | Use |
|------|-----|
| **KoyJabo.com** | Find bus, train, metro routes & fares |
| **Pathao** | Ride-sharing (motorcycle + car) |
| **Uber** | Ride-sharing (car) |
| **bKash** | Mobile payments (get someone local to help set up) |
| **Google Maps** | Navigation (works well in major cities) |

---

## 📋 Quick Essential Info

- **Currency:** Bangladeshi Taka (BDT). 1 USD ≈ ৳110
- **Language:** Bengali (Bangla). English understood in cities and tourist areas.
- **Religion:** Majority Muslim. Dress modestly outside tourist areas.
- **Power:** 220V, Type C/G plugs
- **SIM card:** Get Grameenphone or Robi SIM at airport (৳200 with data pack)
- **Emergency:** Police 999 | Ambulance 199 | Fire 199

---

## 🗓️ Suggested 7-Day Bangladesh Itinerary

| Day | Destination |
|-----|-------------|
| Day 1 | Arrive Dhaka, Old Dhaka tour (Lalbagh Fort, Sadarghat) |
| Day 2 | Dhaka museums, shopping, evening food walk |
| Day 3 | Train to Cox's Bazar (Cox's Bazar Express, 10:30 PM overnight) |
| Day 4 | Cox's Bazar beach, Himchari waterfall |
| Day 5 | Teknaf → Saint Martin Island by ship (9 AM) |
| Day 6 | Saint Martin — beach, snorkel, sunset |
| Day 7 | Return Teknaf → Cox's Bazar → fly Dhaka → depart |

---

Bangladesh will surprise you. Plan your transport with **[KoyJabo.com](https://koyjabo.com)** — the free bilingual app covering every bus, train, and metro route in the country.

#BangladeshTravel #VisitBangladesh #TravelAsia #BackpackBangladesh #KoyJabo #TouristGuide
`,bnContent:`
বাংলাদেশ এশিয়ার সবচেয়ে কম মূল্যায়িত ভ্রমণ গন্তব্যগুলোর একটি। পৃথিবীর দীর্ঘতম সমুদ্র সৈকত, UNESCO-তালিকাভুক্ত ম্যানগ্রোভ বন, প্রাচীন মন্দির — সব কিছু প্রতিবেশী দেশগুলোর চেয়ে অনেক কম খরচে।

---

## 🗺️ পর্যটকদের জন্য সেরা গন্তব্য

১. **কক্সবাজার** — বিশ্বের দীর্ঘতম সমুদ্র সৈকত (১২০ কিমি)
২. **সুন্দরবন** — UNESCO ম্যানগ্রোভ বন, রয়েল বেঙ্গল টাইগার
৩. **সেন্ট মার্টিন** — প্রবাল দ্বীপ, স্বচ্ছ জল
৪. **সিলেট** — চা বাগান, হাওর, ঝর্ণা
৫. **বান্দরবান** — পাহাড়, ট্রেকিং, উপজাতীয় সংস্কৃতি
৬. **ঢাকা** — লালবাগ কেল্লা, আহসান মঞ্জিল, সদরঘাট

---

## 🚌 যাতায়াত

বাংলাদেশে যাতায়াতের জন্য **[KoyJabo.com](https://koyjabo.com)** ব্যবহার করুন।

| মাধ্যম | সেরা ব্যবহার | খরচ |
|--------|-------------|------|
| এসি বাস | আন্তঃজেলা | ৳৫০০–২,৫০০ |
| ট্রেন | দীর্ঘ দূরত্ব | ৳২০০–২,৬৫৬ |
| ঘরোয়া ফ্লাইট | দ্রুত যাতায়াত | ৳৪,৫০০–১২,০০০ |
| উবার/পাঠাও | শহরে | ৳৮০–৩০০ |
| মেট্রো রেল | ঢাকায় | ৳২০–১০০ |

---

## 💵 বাজেট গাইড (প্রতিদিন, প্রতিজন)

- ব্যাকপ্যাকার: $১৫–২৫ (৳১,৬০০–২,৭০০)
- মধ্যম: $৩৫–৬০ (৳৩,৮০০–৬,৫০০)
- আরামদায়ক: $৮০–১৫০ (৳৮,৭০০–১৬,০০০)

বাংলাদেশ অত্যন্ত সাশ্রয়ী। একটি পূর্ণ খাবার ৳১০০–২৫০ ($৩ এর কম)।

#বাংলাদেশভ্রমণ #পর্যটনগাইড #কইযাবো #ভিজিটবাংলাদেশ
`},{id:"bangladesh-visa-guide-uk-us-uae-canada-2026",slug:"bangladesh-visa-guide-uk-us-uae-canada-2026",title:"Bangladesh Visa Guide 2026: UK, US, UAE, Canada & EU Citizens — Fees, Requirements & How to Apply",bnTitle:"বাংলাদেশ ভিসা গাইড ২০২৬: ব্রিটেন, আমেরিকা, ইউএই, কানাডা ও ইউরোপ থেকে আবেদন পদ্ধতি",excerpt:"Everything you need to know about getting a Bangladesh visa in 2026 — visa on arrival, e-visa, tourist visa fees, required documents, and step-by-step application guide for UK, US, UAE, Canada and EU passport holders.",bnExcerpt:"ব্রিটেন, আমেরিকা, ইউএই ও কানাডা থেকে বাংলাদেশ ভিসা পাওয়ার সম্পূর্ণ গাইড — ভিসা অন অ্যারাইভাল, ই-ভিসা, প্রয়োজনীয় কাগজপত্র ও আবেদন প্রক্রিয়া।",coverImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/1200px-Flag_of_Bangladesh.svg.png",author:"KoyJabo Team",publishDate:"2026-05-10",readTime:"10 min read",keywords:["Bangladesh visa UK citizens 2026","Bangladesh tourist visa USA","Bangladesh visa on arrival","Bangladesh e-visa apply online","Bangladesh visa fee 2026","Bangladesh visa requirements","how to get Bangladesh visa from UK","Bangladesh visa from USA","Bangladesh visa Dubai","Bangladesh visa Canada","Bangladesh visa EU citizens","Bangladesh immigration","visit Bangladesh visa","Bangladesh tourist visa documents","Bangladesh visa application"],category:"Travel Guide",content:`
Planning a trip to Bangladesh? Getting your visa sorted is the first step. This complete guide covers everything UK, US, UAE, Canada and EU citizens need to know about Bangladesh visas in 2026.

---

## 🛂 Do You Need a Visa for Bangladesh?

Most Western passport holders can enter Bangladesh through one of three routes:

| Nationality | Visa Option |
|---|---|
| UK, USA, Canada, Australia, EU | Visa on Arrival (VOA) at Dhaka Airport |
| UAE residents | Visa on Arrival |
| Most South Asian nationalities | Prior visa required at embassy |
| Indian nationals | Special tourist visa — apply in advance |

> **Important:** Visa on Arrival is only available at **Hazrat Shahjalal International Airport (DAC), Dhaka** — NOT at land borders.

---

## 💳 Bangladesh Visa on Arrival (VOA) — 2026

The easiest option for most Western travellers.

**Eligibility:** Citizens of UK, USA, Canada, Australia, New Zealand, most EU countries, UAE, and 50+ other nationalities.

**Fee:** $50 USD (paid in cash at the airport)

**Duration:** 30 days (can be extended up to 90 days at the Department of Immigration in Dhaka)

**Documents required at airport:**
- Valid passport (minimum 6 months validity)
- Return/onward flight ticket
- Hotel booking confirmation or invitation letter
- Proof of sufficient funds ($50 per day recommended)
- 2 passport-size photographs
- Completed visa form (available at airport)

**Processing time:** 30–60 minutes at the airport immigration desk.

---

## 💻 Bangladesh E-Visa — Apply Online Before You Travel

Bangladesh now offers an **e-visa** that you can apply for before departure — avoiding airport queues.

**Apply at:** [evisa.immigration.gov.bd](https://evisa.immigration.gov.bd)

**Processing time:** 3–5 working days

**Fee:** $52 USD (including service charge), paid by card online

**Documents needed:**
- Scanned passport (bio-data page)
- Recent passport photo (JPEG, white background)
- Hotel booking or invitation letter
- Bank statement (last 3 months)
- Travel itinerary

**Steps to apply:**
1. Go to Bangladesh e-visa portal
2. Select "Tourist Visa"
3. Fill in personal and travel details
4. Upload documents
5. Pay the fee online
6. Receive e-visa approval by email (print or save on phone)
7. Present at airport immigration

---

## 🏛️ Bangladesh Tourist Visa from Embassy/High Commission

If you prefer to apply in person before travelling:

**UK — Bangladesh High Commission London:**
- Address: 28 Queen's Gate, London SW7 5JA
- Processing: 2–3 working days (standard), 1 day (express +£20)
- Fee: £35 (single entry), £55 (multiple entry)
- Tel: 020 7584 0081

**USA — Bangladesh Embassy Washington DC:**
- Address: 3510 International Dr NW, Washington DC 20008
- Processing: 5–7 business days
- Fee: $160 (single entry tourist visa)
- Also in: New York, Los Angeles, Houston

**UAE — Bangladesh Embassy Abu Dhabi / Consulate Dubai:**
- Processing: 3–5 days
- Fee: AED 130–200

**Canada — Bangladesh High Commission Ottawa:**
- Processing: 5–10 business days
- Fee: CAD 60 (single entry)

---

## ⏳ Extending Your Bangladesh Visa

If you're staying longer than 30 days, you can extend at:

**Department of Immigration & Passports, Dhaka**
- Address: Agargaon, Dhaka 1207
- Max extension: 90 days total
- Fee: ৳3,000–5,000 (approx $30–50)

---

## 🚫 Common Visa Mistakes to Avoid

- ❌ Arriving at a land border expecting VOA — it's only available at Dhaka airport
- ❌ Insufficient cash — the $50 VOA fee must be in USD, not local currency
- ❌ No return ticket — immigration may ask for proof of onward travel
- ❌ Applying too late — e-visa takes 3–5 days, don't leave it to the last minute

---

## ✅ Quick Checklist for Bangladesh Visa

- [ ] Check if your nationality qualifies for Visa on Arrival
- [ ] Book flights and hotel first (needed for visa application)
- [ ] Prepare passport photos (2 copies, recent)
- [ ] Bring $50–60 USD cash for VOA fee
- [ ] Print your e-visa approval if applying online
- [ ] Check passport expiry (must be valid 6+ months)

---

## 🗺️ Planning Your Bangladesh Trip?

Once your visa is sorted, use **[KoyJabo.com](https://koyjabo.com)** to plan all your transport in Bangladesh — Dhaka bus routes, Metro Rail, intercity buses, trains, and flights.

#BangladeshVisa #VisitBangladesh2026 #BangladeshTourism #UKtoBangladesh #USAtoBangladesh
`,bnContent:`
বাংলাদেশ ভ্রমণের পরিকল্পনা করছেন? ভিসার বিষয়টি আগে থেকে জেনে নিন। এই গাইডে যুক্তরাজ্য, আমেরিকা, ইউএই ও কানাডার নাগরিকদের জন্য বাংলাদেশ ভিসার সম্পূর্ণ তথ্য দেওয়া হয়েছে।

---

## 🛂 কারা ভিসা অন অ্যারাইভালে আসতে পারবেন?

| দেশ | ভিসার ধরন |
|---|---|
| ব্রিটেন, আমেরিকা, কানাডা, অস্ট্রেলিয়া, ইইউ | ভিসা অন অ্যারাইভাল |
| ইউএই | ভিসা অন অ্যারাইভাল |
| ভারত, পাকিস্তান | আগাম ভিসা লাগবে |

**গুরুত্বপূর্ণ:** ভিসা অন অ্যারাইভাল শুধুমাত্র **হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর, ঢাকা** — স্থলসীমান্তে পাওয়া যায় না।

---

## 💳 ভিসা অন অ্যারাইভাল ২০২৬

- **ফি:** $৫০ মার্কিন ডলার (নগদ)
- **মেয়াদ:** ৩০ দিন (৯০ দিন পর্যন্ত বাড়ানো যাবে)
- **প্রয়োজনীয় কাগজ:** পাসপোর্ট, রিটার্ন টিকেট, হোটেল বুকিং, ২ কপি ছবি

---

## 💻 ই-ভিসা অনলাইনে আবেদন

- **ওয়েবসাইট:** evisa.immigration.gov.bd
- **প্রসেসিং টাইম:** ৩–৫ কার্যদিবস
- **ফি:** $৫২ মার্কিন ডলার (অনলাইন কার্ডে পেমেন্ট)

---

## 🏛️ দেশ ভিত্তিক দূতাবাস তথ্য

- **যুক্তরাজ্য:** বাংলাদেশ হাই কমিশন, লন্ডন — ফি £৩৫
- **আমেরিকা:** বাংলাদেশ দূতাবাস, ওয়াশিংটন ডিসি — ফি $১৬০
- **ইউএই:** বাংলাদেশ দূতাবাস, আবুধাবি — ফি AED ১৩০–২০০
- **কানাডা:** বাংলাদেশ হাই কমিশন, অটোয়া — ফি CAD ৬০

---

বাংলাদেশে এসে যাতায়াতের জন্য **[KoyJabo.com](https://koyjabo.com)** ব্যবহার করুন।

#বাংলাদেশভিসা #ভিজিটবাংলাদেশ #কইযাবো
`},{id:"best-hotels-coxs-bazar-accommodation-guide-2026",slug:"best-hotels-coxs-bazar-accommodation-guide-2026",title:"Best Hotels & Resorts in Cox's Bazar 2026: Where to Stay (Budget to Luxury)",bnTitle:"কক্সবাজারে সেরা হোটেল ও রিসোর্ট ২০২৬: বাজেট থেকে বিলাসবহুল",excerpt:"Looking for the best place to stay in Cox's Bazar? This complete hotel guide covers budget guesthouses, mid-range hotels and luxury beach resorts — with prices, locations and booking tips for 2026.",bnExcerpt:"কক্সবাজারে কোথায় থাকবেন? এই গাইডে বাজেট গেস্টহাউস থেকে শুরু করে লাক্সারি বিচ রিসোর্ট পর্যন্ত সেরা হোটেলের তালিকা, দাম ও বুকিং টিপস।",coverImage:"/blog/ai-traffic-system-dhaka.jpg",author:"KoyJabo Team",publishDate:"2026-05-09",readTime:"9 min read",keywords:["Cox's Bazar hotels 2026","best hotels Cox's Bazar","Cox's Bazar beach resort","Cox's Bazar accommodation","where to stay Cox's Bazar","Cox's Bazar luxury hotel","Cox's Bazar budget hotel","Hotel Sea Crown Cox's Bazar","Long Beach Hotel Cox's Bazar","Saifuls Beach Resort","Cox's Bazar hotel booking","Cox's Bazar hotel price","Cox's Bazar hotel near beach","koxs bazar best resort","Bangladesh beach hotel"],category:"Travel Guide",content:`
Cox's Bazar is home to the world's longest natural sea beach — 120km of unbroken coastline. Whether you're looking for a budget guesthouse or a five-star resort with an ocean view, this guide covers the best places to stay in 2026.

---

## 🏨 Best Luxury Hotels in Cox's Bazar

### 1. Long Beach Hotel ⭐⭐⭐⭐⭐
One of the most popular luxury hotels right on Cox's Bazar beach. Stunning sea views, rooftop pool, multiple restaurants.
- **Price:** ৳8,000–18,000/night
- **Location:** Kolatoli Road (main beach strip)
- **Highlights:** Direct beach access, sea-view rooms, infinity pool

### 2. Ocean Paradise Hotel & Resort ⭐⭐⭐⭐⭐
Massive resort complex with private beach area, water park, and conference facilities.
- **Price:** ৳7,500–20,000/night
- **Location:** Kolatoli, Cox's Bazar
- **Highlights:** Water park, multiple pools, children's play area

### 3. Hotel Saifuls ⭐⭐⭐⭐
Well-established beachfront hotel with excellent service and great seafood restaurant.
- **Price:** ৳5,000–12,000/night
- **Location:** Kolatoli Beach
- **Highlights:** Beachfront, seafood restaurant, rooftop bar

### 4. Cox's Bazar Marriott Hotel ⭐⭐⭐⭐⭐
The newest international brand hotel in Cox's Bazar. World-class amenities.
- **Price:** ৳12,000–30,000/night
- **Highlights:** International standard, gym, spa, business centre

---

## 🏩 Best Mid-Range Hotels (৳2,000–6,000/night)

### Hotel Motel Zone (Main Options)
The "Hotel-Motel Zone" (মোটেল জোন) on Kolatoli Road is the main tourist strip with 50+ mid-range hotels.

| Hotel | Price/Night | Notable Feature |
|---|---|---|
| Hotel Seagull | ৳2,500–4,500 | Great views, central location |
| Hotel Cox Today | ৳2,000–4,000 | Good value, clean rooms |
| Hotel Unique | ৳2,500–5,000 | Beachfront access |
| Hotel Praasad Paradise | ৳3,000–6,000 | Sea-view rooms |
| Hotel Coral Reef | ৳2,000–3,500 | Budget-friendly, clean |

**Best areas to stay:**
- **Kolatoli Beach Road** — main tourist strip, closest to the beach
- **Sugandha Beach Area** — quieter, more upscale
- **Laboni Beach Area** — near bus terminal, convenient

---

## 🛏️ Budget Accommodation (Under ৳2,000/night)

If you're travelling on a tight budget, there are plenty of decent guesthouses:

- **Hotel Hill Side** — ৳600–1,200/night, clean, near beach
- **Hotel Sun Rise** — ৳800–1,500/night
- **Various guest houses** in Kolatoli area — ৳500–1,000/night

> **Tip:** Book in advance for weekends and public holidays — Cox's Bazar fills up fast during Eid and winter peak season (November–February).

---

## 🏕️ Eco-Resorts & Unique Stays

### Inani Beach Area
About 20km south of Cox's Bazar, Inani Beach is quieter and more scenic. Great for couples and nature lovers.
- **Inani Beach Resort** — ৳3,000–8,000/night
- **BWTC Eco Resort** — government-run, affordable

### Himchori
- Waterfalls, hills, rice paddies
- A few boutique eco-lodges available

---

## 📅 Best Time to Book

| Season | Dates | Notes |
|---|---|---|
| Peak | November–February | Book 1–2 weeks in advance |
| Shoulder | March–May | Good deals, less crowded |
| Monsoon | June–October | Very cheap but rough sea |
| Eid holidays | Varies | Book 1 month+ in advance |

---

## 💡 Hotel Booking Tips for Cox's Bazar

1. **Book directly** with the hotel for the best price (many hotels give 10–20% discount vs OTA)
2. **Compare on Booking.com / Agoda** for international travellers
3. **For local bookings**, Shohoz.com and Pathao are popular
4. **Always request a sea-view room** — worth the upgrade
5. **Check if breakfast is included** — many hotels in the ৳3,000+ range include it

---

## 🚌 Getting to Cox's Bazar from Dhaka

Use **[KoyJabo.com](https://koyjabo.com)** to find all transport options:

| Mode | Journey Time | Cost |
|---|---|---|
| AC Bus (Green Line/Hanif) | 10–12 hrs | ৳900–2,500 |
| Train (Cox's Bazar Express) | 10 hrs | ৳745–2,656 |
| Flight (Biman/US-Bangla/Novoair) | 1 hr | ৳4,500–12,000 |

#CoxsBazar #BangladeshHotels #CoxsBazarResort #BangladeshBeach #VisitBangladesh2026
`,bnContent:`
কক্সবাজার — পৃথিবীর দীর্ঘতম প্রাকৃতিক সমুদ্র সৈকত। এই গাইডে ২০২৬ সালের সেরা হোটেল ও রিসোর্টের তালিকা, দাম এবং বুকিং টিপস দেওয়া হয়েছে।

---

## 🏨 সেরা বিলাসবহুল হোটেল

### ১. লং বিচ হোটেল ⭐⭐⭐⭐⭐
- **দাম:** ৳৮,০০০–১৮,০০০/রাত
- **সুবিধা:** সরাসরি বিচ অ্যাক্সেস, ইনফিনিটি পুল, সি-ভিউ রুম

### ২. ওশান প্যারাডাইস হোটেল ⭐⭐⭐⭐⭐
- **দাম:** ৳৭,৫০০–২০,০০০/রাত
- **সুবিধা:** ওয়াটার পার্ক, প্রাইভেট বিচ

### ৩. হোটেল সাইফুলস ⭐⭐⭐⭐
- **দাম:** ৳৫,০০০–১২,০০০/রাত
- **সুবিধা:** বিচফ্রন্ট, সিফুড রেস্তোরাঁ

---

## 🏩 মধ্যম মানের হোটেল (৳২,০০০–৬,০০০/রাত)

কলাতলী রোডের "হোটেল-মোটেল জোন"-এ ৫০টিরও বেশি হোটেল আছে।

| হোটেল | দাম/রাত | বিশেষত্ব |
|---|---|---|
| হোটেল সীগাল | ৳২,৫০০–৪,৫০০ | কেন্দ্রীয় অবস্থান |
| কক্স টুডে হোটেল | ৳২,০০০–৪,০০০ | সাশ্রয়ী, পরিষ্কার |
| হোটেল ইউনিক | ৳২,৫০০–৫,০০০ | বিচ অ্যাক্সেস |

---

## 🚌 ঢাকা থেকে কক্সবাজার যাওয়ার উপায়

রুট ও ভাড়া জানতে **[KoyJabo.com](https://koyjabo.com)** ব্যবহার করুন।

| মাধ্যম | সময় | ভাড়া |
|---|---|---|
| এসি বাস | ১০–১২ ঘন্টা | ৳৯০০–২,৫০০ |
| ট্রেন | ১০ ঘন্টা | ৳৭৪৫–২,৬৫৬ |
| ফ্লাইট | ১ ঘন্টা | ৳৪,৫০০–১২,০০০ |

#কক্সবাজার #হোটেল #বাংলাদেশপর্যটন #কইযাবো
`},{id:"cheap-flights-from-bangladesh-dubai-london-usa-2026",slug:"cheap-flights-from-bangladesh-dubai-london-usa-2026",title:"Cheap Flights from Bangladesh 2026: Dhaka to Dubai, London, USA, Malaysia & More",bnTitle:"বাংলাদেশ থেকে সস্তায় বিদেশ যাওয়ার উপায় ২০২৬: দুবাই, লন্ডন, আমেরিকা, মালয়েশিয়া",excerpt:"How to find the cheapest international flights from Dhaka (DAC) in 2026. Best airlines, cheapest routes, booking tips and price comparison for Bangladesh to Dubai, UK, USA, Malaysia, Singapore, Saudi Arabia and more.",bnExcerpt:"ঢাকা থেকে দুবাই, লন্ডন, আমেরিকা, মালয়েশিয়া যাওয়ার সবচেয়ে সস্তা বিমান কোথায় পাবেন? এয়ারলাইন্স তুলনা, বুকিং টিপস এবং ২০২৬ সালের সর্বনিম্ন ভাড়া।",coverImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/1200px-Flag_of_Bangladesh.svg.png",author:"KoyJabo Team",publishDate:"2026-05-08",readTime:"11 min read",keywords:["cheap flights Dhaka 2026","Bangladesh to Dubai cheap flight","Dhaka to London cheap ticket","Bangladesh to USA cheap flight","Dhaka to Malaysia flight price","Dhaka to Saudi Arabia flight","Biman Bangladesh flights","Emirates flights from Dhaka","Qatar Airways Dhaka","cheap international flights Bangladesh","DAC airport flights","Bangladesh to UK flight cost","Dhaka to Singapore flight","Dhaka to Canada flight","best airlines from Bangladesh"],category:"Travel Guide",content:`
Dhaka's Hazrat Shahjalal International Airport (DAC) is well-connected to the world. Whether you're heading to the Middle East for work, the UK to visit family, or Southeast Asia for a holiday, this guide shows you how to find the cheapest flights from Bangladesh.

---

## ✈️ Major Airlines Flying from Dhaka

| Airline | Key Routes | Known For |
|---|---|---|
| **Biman Bangladesh** | Dubai, London, New York, Kuala Lumpur | National carrier, good prices |
| **Emirates** | Dubai hub → worldwide | Comfort, best connections |
| **Qatar Airways** | Doha hub → worldwide | Award-winning service |
| **Saudi Arabian Airlines** | Riyadh, Jeddah, Medina | Popular for Hajj/Umrah |
| **Air Arabia** | Sharjah/UAE | Cheapest to UAE |
| **flydubai** | Dubai | Budget-friendly |
| **AirAsia** | Kuala Lumpur | Cheapest to Malaysia |
| **Singapore Airlines** | Singapore | Premium, great connections |
| **IndiGo / Air India** | India connections | Short hops to India |
| **Thai Airways** | Bangkok | Good price to Southeast Asia |
| **US-Bangla Airlines** | Regional + international | Dhaka–Kolkata–regional |
| **Novoair** | Regional Bangladesh | Domestic only |

---

## 💰 Average Flight Prices from Dhaka (2026)

### Dhaka to Dubai (UAE)
- **Economy one-way:** $280–520
- **Cheapest options:** Air Arabia, flydubai (via Sharjah/Dubai)
- **Flight time:** 5–6 hours
- **Tip:** Book 6–8 weeks in advance for best prices

### Dhaka to London (UK)
- **Economy one-way:** $450–900
- **Cheapest options:** Biman Bangladesh direct, or Gulf carriers (1 stop)
- **Flight time:** 10–12 hrs direct; 14–16 hrs with 1 stop
- **Tip:** Biman's direct Dhaka–London Heathrow is often cheapest ($450–600)

### Dhaka to New York / USA
- **Economy round trip:** $900–1,800
- **Common routes:** Dhaka → Dubai/Doha → New York JFK/Newark
- **Airlines:** Emirates, Qatar, Biman (to New York via London)
- **Flight time:** 18–22 hours total

### Dhaka to Kuala Lumpur (Malaysia)
- **Economy one-way:** $120–280
- **Cheapest:** AirAsia, Biman, Malindo Air
- **Flight time:** 4–5 hours
- **Tip:** Malaysia visa-free for Bangladeshi nationals

### Dhaka to Singapore
- **Economy one-way:** $200–400
- **Airlines:** Singapore Airlines, SilkAir, Biman, IndiGo (via Kolkata)
- **Flight time:** 4–5 hours

### Dhaka to Saudi Arabia (Riyadh / Jeddah)
- **Economy one-way:** $180–400
- **Airlines:** Saudi Arabian Airlines, Biman, Air Arabia, flydubai
- **Flight time:** 5–6 hours
- **Tip:** Book 2–3 months in advance for Umrah season (best prices)

### Dhaka to Toronto / Canada
- **Economy round trip:** $1,100–2,200
- **Routes:** Via London, Dubai, or New York
- **Airlines:** Biman+Air Canada, Emirates+AC, Qatar+AC

---

## 🗓️ When to Book for Cheapest Prices

| Booking Window | Savings |
|---|---|
| 3–4 months in advance | Up to 40% cheaper |
| 6–8 weeks in advance | 20–30% cheaper |
| Last minute | Usually expensive |

**Cheapest travel months from Dhaka:**
- **To Middle East:** February–March, September–October
- **To UK/Europe:** January–March (avoid June–August peak)
- **To Southeast Asia:** May–June, September–November

---

## 🔍 How to Find Cheap Flights from Bangladesh

### Best Comparison Sites
1. **Google Flights** — best for comparing and tracking prices
2. **Skyscanner** — great for flexible date search
3. **Kayak** — good for alerts
4. **Booking.com Flights** — occasional exclusive deals
5. **Official airline websites** — sometimes cheaper than OTAs (Biman Bangladesh especially)

### Money-Saving Tips
- **Use "Explore" on Google Flights** — shows cheapest months visually
- **Set price alerts** on Skyscanner — get notified when prices drop
- **Clear cookies or use incognito** when booking — prices sometimes increase after repeat visits
- **Book domestic Dhaka flights** on KoyJabo for onward connections
- **Check nearby airports** — Chittagong (CGP) sometimes cheaper for Middle East routes

---

## 🛫 Dhaka Airport (DAC) — Terminal Info

**Hazrat Shahjalal International Airport (DAC)**
- Terminal 1: Domestic flights (Biman, US-Bangla, Novoair)
- Terminal 2: All international flights
- **Getting to airport from Dhaka:** Uber/Pathao ৳300–500, taxi ৳500–700
- **Metro Rail:** Take MRT-6 to Uttara North, then rickshaw/CNG (10 min)

---

## 🌍 New: Terminal 3 Under Construction

The new Terminal 3 at Dhaka airport (scheduled 2027) will significantly increase capacity. International airline routes are expected to expand.

---

Use **[KoyJabo.com](https://koyjabo.com)** to find domestic transport options once you arrive in Bangladesh.

#CheapFlightsBangladesh #DhakaFlights #BimandBangladesh #Bangladesh2026 #VisitBangladesh
`,bnContent:`
ঢাকার হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর (DAC) থেকে সারা বিশ্বে ফ্লাইট রয়েছে। এই গাইডে সবচেয়ে কম দামে বিদেশ যাওয়ার উপায় দেওয়া হয়েছে।

---

## ✈️ ঢাকা থেকে প্রধান আন্তর্জাতিক ফ্লাইট

| এয়ারলাইন | রুট | বৈশিষ্ট্য |
|---|---|---|
| **বিমান বাংলাদেশ** | দুবাই, লন্ডন, নিউ ইয়র্ক | জাতীয় বাহক, ভালো দাম |
| **এমিরেটস** | দুবাই হয়ে বিশ্বব্যাপী | আরামদায়ক |
| **কাতার এয়ারওয়েজ** | দোহা হয়ে বিশ্বব্যাপী | পুরস্কারজয়ী সেবা |
| **এয়ার আরাবিয়া** | শারজাহ/ইউএই | ইউএই-তে সবচেয়ে সস্তা |
| **এয়ারএশিয়া** | কুয়ালালামপুর | মালয়েশিয়ায় সস্তা |

---

## 💰 গড় একমুখী ভাড়া (২০২৬)

| গন্তব্য | ভাড়া |
|---|---|
| দুবাই | $২৮০–৫২০ |
| লন্ডন | $৪৫০–৯০০ |
| নিউ ইয়র্ক | $৯০০–১,৮০০ (রাউন্ড ট্রিপ) |
| কুয়ালালামপুর | $১২০–২৮০ |
| সিঙ্গাপুর | $২০০–৪০০ |
| রিয়াদ/জেদ্দা | $১৮০–৪০০ |

---

## 🔍 সস্তায় টিকেট পাওয়ার উপায়

১. **Google Flights**-এ মূল্য ট্র্যাক করুন
২. **Skyscanner**-এ প্রাইস অ্যালার্ট সেট করুন
৩. **৩–৪ মাস আগে বুক করুন** — ৪০% পর্যন্ত সাশ্রয়
৪. **ইনকগনিটো মোডে বুক করুন** — বারবার সার্চ করলে দাম বাড়তে পারে

---

বাংলাদেশের অভ্যন্তরীণ যাতায়াতের জন্য **[KoyJabo.com](https://koyjabo.com)** ব্যবহার করুন।

#ঢাকাফ্লাইট #সস্তাটিকেট #বিমানবাংলাদেশ #কইযাবো
`},{id:"bangladesh-tour-packages-2026-travel-agency-guide",slug:"bangladesh-tour-packages-2026-travel-agency-guide",title:"Bangladesh Tour Packages 2026: Best Holiday Deals, Prices & Travel Agency Guide",bnTitle:"বাংলাদেশ ট্যুর প্যাকেজ ২০২৬: সেরা ছুটির ডিল, দাম ও ট্রাভেল এজেন্সি গাইড",excerpt:"Looking for the best Bangladesh tour packages in 2026? Compare Cox's Bazar, Sundarbans, Sylhet, Saint Martin, Bandarban and Dhaka tour packages with prices, inclusions and top travel agencies.",bnExcerpt:"কক্সবাজার, সুন্দরবন, সিলেট, সেন্ট মার্টিন ও বান্দরবান ট্যুর প্যাকেজের দাম ও সেরা ট্রাভেল এজেন্সির তালিকা।",coverImage:"/blog/ai-traffic-system-dhaka.jpg",author:"KoyJabo Team",publishDate:"2026-05-07",readTime:"10 min read",keywords:["Bangladesh tour packages 2026","Cox's Bazar tour package price","Sundarbans tour package Dhaka","Saint Martin tour package","Bandarban tour package","Sylhet tour package Bangladesh","Bangladesh holiday package","Bangladesh travel agency","cheap Bangladesh tour","Bangladesh group tour","Bangladesh honeymoon package","Dhaka day tour","Bangladesh adventure tour","best travel agency Bangladesh","Bangladesh eco tour"],category:"Travel Guide",content:`
Bangladesh has some of Southeast Asia's most affordable and rewarding travel destinations. Whether you want a beach holiday at Cox's Bazar, a wildlife adventure in the Sundarbans, or a cultural journey through Dhaka — there's a tour package for every budget.

This guide covers the most popular Bangladesh tour packages in 2026, with prices, inclusions and how to find the best deals.

---

## 🏖️ Cox's Bazar Tour Packages

The most popular destination in Bangladesh — the world's longest natural sea beach.

### 3 Nights / 4 Days Cox's Bazar Package
**Includes:** Dhaka–Cox's Bazar transport (AC bus), 3-night hotel, breakfast daily, local sightseeing

| Budget Type | Cost Per Person | Hotel Standard |
|---|---|---|
| Budget | ৳4,500–6,000 | 2-star guesthouse |
| Mid-range | ৳7,000–12,000 | 3-star hotel |
| Premium | ৳15,000–25,000 | 4–5 star beachfront |

**What to see:**
- Laboni Beach (main beach)
- Inani Beach (scenic, 27km south)
- Himchori waterfall
- Maheshkhali Island day trip
- Ramu Buddhist temples

### Cox's Bazar + Saint Martin Extension
Add 2 nights at Saint Martin Island (coral island, November–April only):
- Extra cost: ৳3,000–6,000 per person
- Includes: Teknaf–Saint Martin ship, island accommodation

---

## 🌿 Sundarbans Tour Packages (from Dhaka/Khulna)

The Sundarbans is the world's largest mangrove forest and a UNESCO World Heritage Site. Home to the Royal Bengal Tiger.

### 2 Nights / 3 Days Sundarbans Package
**Route:** Dhaka → Khulna → Sundarbans by boat

| Package Type | Cost Per Person |
|---|---|
| Budget (shared boat) | ৳5,000–8,000 |
| Mid-range (private cabin) | ৳10,000–15,000 |
| Premium (luxury cruise) | ৳20,000–40,000 |

**Includes:** Return transport Dhaka–Khulna, boat hire, accommodation, meals, forest entry permit, guide

**Best time:** November–February (dry season, tiger sightings more likely)

---

## 🏔️ Bandarban Hill Tracts Tour Packages

Bangladesh's most scenic hill district — perfect for trekking, tribal culture and waterfalls.

### 2 Nights / 3 Days Bandarban Package
- **Cost:** ৳4,000–9,000 per person
- **Includes:** Chittagong/Dhaka transport, accommodation, local guide

**Top spots:**
- Nilgiri Hills (highest accessible peak, 2,200 ft)
- Boga Lake (crater lake)
- Chimbuk Hill
- Tribal village stays (Marma, Murung communities)
- Nafakhum Waterfall (2-day trek, permit required)

> **Note:** Some areas in Bandarban require a permit. Your tour operator will arrange this.

---

## 🍵 Sylhet Tour Packages

Sylhet is famous for tea gardens, haor wetlands and the Shrine of Hazrat Shah Jalal.

### 2 Nights / 3 Days Sylhet Package
- **Cost:** ৳4,500–10,000 per person
- **Highlights:** Tea estates (Srimangal), Jaflong stone beach, Ratargul swamp forest, Bichanakandi

---

## 🏛️ Dhaka City Tour (Day Tour)

Perfect for transit passengers or first-time visitors.
- **Half-day (4 hrs):** ৳800–1,500 per person
- **Full day (8 hrs):** ৳1,500–3,000 per person

**Covers:** Lalbagh Fort, Ahsan Manzil (Pink Palace), Sadarghat river port, Old Dhaka food tour

---

## 🏢 Top Travel Agencies in Bangladesh

### For International Tourists
- **Guide Tours Ltd** — highly rated for Sundarbans and Bandarban
- **Bengal Tours** — eco-tourism specialist
- **Ruposhi Bangla Tours** — budget-friendly packages
- **Bangladesh Eco Tours** — sustainable travel

### For Online Booking
- **Shohoz.com** — buses, trains, hotels
- **Booking.com** — international hotel booking
- **Agoda** — hotels in Cox's Bazar and Dhaka
- **GetYourGuide** — day tours and activities

---

## 💡 Tips for Booking Bangladesh Tour Packages

1. **Book directly with the agency** for the best price (OTAs add 15–25% markup)
2. **Ask what's included** — some packages exclude meals, permits and entry fees
3. **Group discounts:** Most agencies give 10–20% discount for groups of 4+
4. **Read reviews on TripAdvisor and Google** before booking
5. **Peak season surcharges:** Expect 30–50% higher prices during Eid holidays

---

## 🚌 Getting Around Bangladesh on Your Own

Prefer independent travel? Use **[KoyJabo.com](https://koyjabo.com)** to find bus, train, metro and intercity transport routes across Bangladesh — free, bilingual, and works offline.

#BangladeshTourPackages #VisitBangladesh2026 #CoxsBazarTour #SundarbansTrip #BangladeshHoliday
`,bnContent:`
বাংলাদেশের সেরা পর্যটন গন্তব্যগুলো সাশ্রয়ী মূল্যে পরিদর্শন করুন। এই গাইডে কক্সবাজার, সুন্দরবন, বান্দরবান, সিলেট ও ঢাকার ট্যুর প্যাকেজের দাম ও তথ্য দেওয়া হয়েছে।

---

## 🏖️ কক্সবাজার ট্যুর প্যাকেজ

### ৩ রাত / ৪ দিন প্যাকেজ

| বাজেট | জনপ্রতি খরচ |
|---|---|
| কম বাজেট | ৳৪,৫০০–৬,০০০ |
| মধ্যম | ৳৭,০০০–১২,০০০ |
| প্রিমিয়াম | ৳১৫,০০০–২৫,০০০ |

---

## 🌿 সুন্দরবন ট্যুর প্যাকেজ

### ২ রাত / ৩ দিন

| প্যাকেজ | জনপ্রতি খরচ |
|---|---|
| বাজেট | ৳৫,০০০–৮,০০০ |
| মধ্যম | ৳১০,০০০–১৫,০০০ |
| লাক্সারি | ৳২০,০০০–৪০,০০০ |

---

## 🏔️ বান্দরবান ট্যুর প্যাকেজ

- **খরচ:** ৳৪,০০০–৯,০০০ জনপ্রতি
- **গন্তব্য:** নীলগিরি, বগা লেক, চিম্বুক, নাফাখুম

---

## 🍵 সিলেট ট্যুর প্যাকেজ

- **খরচ:** ৳৪,৫০০–১০,০০০ জনপ্রতি
- **গন্তব্য:** চা বাগান, জাফলং, রাতারগুল

---

## 💡 ট্যুর বুকিং টিপস

১. সরাসরি এজেন্সিতে বুক করুন — ১৫–২৫% সাশ্রয়
২. প্যাকেজে কী কী অন্তর্ভুক্ত তা নিশ্চিত করুন
৩. ৪ জনের বেশি গ্রুপে ১০–২০% ছাড় পাওয়া যায়

---

স্বাধীনভাবে ভ্রমণ করতে চাইলে **[KoyJabo.com](https://koyjabo.com)** ব্যবহার করুন।

#বাংলাদেশট্যুর #কক্সবাজার #সুন্দরবন #কইযাবো #ভিজিটবাংলাদেশ
`},{id:"visiting-bangladesh-for-eid-guide-uk-us-uae-canada",slug:"visiting-bangladesh-for-eid-guide-uk-us-uae-canada",title:"Visiting Bangladesh for Eid from UK, USA, UAE & Canada: Complete NRB Travel Guide (2026)",bnTitle:"ঈদে বাংলাদেশ আসা: যুক্তরাজ্য, আমেরিকা, ইউএই ও কানাডা থেকে সম্পূর্ণ গাইড",excerpt:"Planning your Eid trip back to Bangladesh from the UK, USA, UAE or Canada? This NRB guide covers when to book flights, how to get around, what to expect, and tips for reuniting with family — from landing at DAC to getting to your hometown.",bnExcerpt:"ঈদে বাংলাদেশে আসার পরিকল্পনা করছেন? ফ্লাইট বুকিং, বিমানবন্দর থেকে যাতায়াত ও পরিবারের সাথে পুনর্মিলনের সম্পূর্ণ গাইড।",coverImage:"/blog/ai-traffic-system-dhaka.jpg",author:"KoyJabo Team",publishDate:"2026-05-14",readTime:"10 min read",keywords:["Eid travel Bangladesh from UK","visiting Bangladesh for Eid","NRB Eid holiday Bangladesh","flight to Bangladesh Eid","Bangladesh Eid travel guide diaspora","UK Bangladeshi Eid trip","USA Bangladesh Eid flight","UAE Bangladesh Eid flight","Eid holiday Bangladesh 2026","Non-Resident Bangladeshi travel","Dhaka Eid rush","Bangladesh family visit","KoyJabo NRB guide","Biman Bangladesh Eid","Canada Bangladesh Eid"],category:"Travel Guide",content:`
Every year, hundreds of thousands of Non-Resident Bangladeshis (NRBs) make the journey home for Eid. Whether you're flying from London Heathrow, JFK New York, Dubai International, or Toronto Pearson — this guide will help you plan your trip smoothly.

---

## ✈️ When to Book Your Eid Flight

Eid flights from the UK, US, UAE and Canada sell out **3–4 months in advance**. During Eid-ul-Fitr and Eid-ul-Adha, prices can triple compared to off-peak fares.

**Best booking windows:**
| Departure | Book By |
|---|---|
| Eid-ul-Fitr (March/April) | December–January |
| Eid-ul-Adha (June) | February–March |
| Eid holidays (school summer) | January–February |

**Price guide (return, economy):**
| Route | Off-Peak | Eid Season |
|---|---|---|
| London → Dhaka | £450–600 | £800–1,400 |
| New York → Dhaka | $700–900 | $1,200–1,800 |
| Dubai → Dhaka | AED 800–1,200 | AED 1,500–2,500 |
| Toronto → Dhaka | CAD 900–1,200 | CAD 1,600–2,400 |

> **Tip:** Book directly with Biman Bangladesh Airlines, Qatar Airways, or Emirates for better prices and flexibility during Eid.

---

## 🛬 Arriving at Hazrat Shahjalal International Airport (DAC)

Dhaka's airport can be chaotic during Eid — especially on the 3–5 days before the holiday. Here's what to expect:

### Immigration & Customs
- NRBs can use the **general immigration lane** (no dedicated NRB fast-track)
- Declare goods over BDT 1 lakh in customs
- Baggage check is standard but thorough during peak periods

### Getting from DAC to the City
| Transport | Cost | Time to Gulshan |
|---|---|---|
| Uber/Pathao (app) | ৳400–600 | 30–60 min |
| CNG auto-rickshaw | ৳500–800 | 40–70 min |
| BRTC Airport Bus | ৳80 | 60–90 min |
| Pre-booked private car | ৳800–1,200 | 30–50 min |

**Use [KoyJabo.com](https://koyjabo.com) to check live bus routes and traffic** before leaving the airport.

---

## 🚌 Getting Around Bangladesh During Eid

### Dhaka City
- Dhaka's **MRT Line 6 (Metro Rail)** runs from Uttara to Motijheel — highly recommended for avoiding Eid traffic
- Use KoyJabo to find bus routes
- Avoid road travel on Eid day itself — roads are largely empty or chaotic depending on direction

### Intercity Travel (Going to the Village)
During Eid, intercity buses are overwhelmed. Book **in advance** or use the intercity tab on KoyJabo.

**Top routes for NRBs:**
| Destination | Mode | Booking |
|---|---|---|
| Sylhet | Bus (6h) or Train | Book 2–3 weeks ahead |
| Chittagong | Bus (5h) or Train | Book 1–2 weeks ahead |
| Comilla | Bus (2h) | Same day usually fine |
| Barisal | Launch (overnight) | Book 1 week ahead |
| Rajshahi | Bus (6h) | Book 1–2 weeks ahead |

---

## 💰 Money & Spending During Eid

- **ATMs** are widely available in Dhaka (Visa/Mastercard accepted at major banks)
- Outside Dhaka, carry **cash in Taka** — card machines are rare in rural areas
- Current exchange rate: approximately £1 = ৳150, $1 = ৳120, AED 1 = ৳33
- **Mobile banking (bKash/Nagad)** is widely used — recipients in Bangladesh can receive money instantly if you send remittances before travel

**Eid gift budget (for reference):**
- Eid salami for children: ৳100–500 per child
- Clothing (new outfit per family member): ৳500–2,000 per person
- Family meal costs: ৳2,000–8,000 for a large gathering

---

## 📱 Essential Apps for Your Bangladesh Trip

- **KoyJabo** ([koyjabo.com](https://koyjabo.com)) — bus routes, metro fares, intercity planner, AI assistant
- **Uber** / **Pathao** — ride-hailing in Dhaka and Chittagong
- **bKash** / **Nagad** — mobile money for daily expenses
- **Shohoz** — intercity bus booking
- **Shohoz / e-Ticket BD** — train ticket booking online

---

## 🕌 Eid Day Logistics

- Most transport is disrupted on Eid day morning
- Markets, shops close for 1–2 days (vary by location)
- Mosques fill up for Eid prayer from 7–9 AM
- Streets are quieter than usual early morning — this is the best time to travel

---

## 🧳 What to Pack

Coming from the UK/US in summer, Bangladesh in Eid season (typically spring or summer) will be **hot and humid** (30–36°C):

- Light cotton clothes (avoid synthetics)
- Mosquito repellent
- Any UK/US medications you use — bring enough for the whole trip
- A power adapter (Type D/G — Type G same as UK, but Type D is common in Bangladesh too)
- Gifts from abroad are always appreciated (chocolates, perfume, cosmetics)

---

## Summary: Your Eid Travel Checklist

- [ ] Book flights 3–4 months before Eid
- [ ] Arrange visa if needed (UK, US, Canada, Australia — Visa on Arrival available)
- [ ] Book intercity bus/train if travelling outside Dhaka
- [ ] Install KoyJabo for local transport
- [ ] Carry cash in BDT for rural areas
- [ ] Pack for heat and rain

Eid Mubarak — and safe travels home! 🌙

*Use [KoyJabo.com](https://koyjabo.com) to navigate Bangladesh transport with ease.*
`,bnContent:`
প্রতি বছর লক্ষ লক্ষ প্রবাসী বাংলাদেশি ঈদে দেশে আসেন। লন্ডন, নিউ ইয়র্ক, দুবাই বা টরন্টো — যেখান থেকেই আসুন, এই গাইড আপনাকে সাহায্য করবে।

---

## ✈️ ফ্লাইট বুকিং কখন করবেন

ঈদের আগে ৩–৪ মাস আগেই টিকিট বুক করুন। দাম দ্রুত বাড়ে।

**বুকিং সময়:**
- ঈদুল ফিতর: ডিসেম্বর–জানুয়ারিতে বুক করুন
- ঈদুল আযহা: ফেব্রুয়ারি–মার্চে বুক করুন

---

## 🛬 ঢাকা বিমানবন্দর থেকে শহরে যাওয়া

| যানবাহন | ভাড়া | সময় |
|---|---|---|
| Uber/Pathao | ৳৪০০–৬০০ | ৩০–৬০ মিনিট |
| CNG | ৳৫০০–৮০০ | ৪০–৭০ মিনিট |
| BRTC বাস | ৳৮০ | ৬০–৯০ মিনিট |

---

## 🚌 ঈদে দূরের যাত্রা

আগেভাগে বুক করুন:
- সিলেট: ২–৩ সপ্তাহ আগে
- চট্টগ্রাম: ১–২ সপ্তাহ আগে
- বরিশাল (লঞ্চ): ১ সপ্তাহ আগে

---

## 💡 গুরুত্বপূর্ণ টিপস

- গ্রামের জন্য নগদ টাকা নিন
- KoyJabo অ্যাপ ব্যবহার করুন বাস ও মেট্রো তথ্যের জন্য
- ঈদের দিন সকালে যাতায়াত কম থাকে

ঈদ মোবারক! 🌙
`},{id:"dhaka-airport-arrival-guide-nrb-bangladeshi-diaspora",slug:"dhaka-airport-arrival-guide-nrb-bangladeshi-diaspora",title:"Dhaka Airport Arrival Guide for NRBs: Transport, SIM Cards & First 24 Hours in Dhaka (2026)",bnTitle:"ঢাকা বিমানবন্দর আগমন গাইড: পরিবহন, সিম কার্ড ও প্রথম ২৪ ঘণ্টা (২০২৬)",excerpt:"Just landed at Hazrat Shahjalal International Airport? This step-by-step guide covers immigration, customs, SIM cards, transport to the city, and what to do in your first 24 hours in Dhaka — written for NRBs and returning Bangladeshis.",bnExcerpt:"হজরত শাহজালাল বিমানবন্দরে নেমেছেন? ইমিগ্রেশন, কাস্টমস, সিম কার্ড, শহরে যাওয়া এবং প্রথম ২৪ ঘণ্টার সম্পূর্ণ গাইড।",coverImage:"/blog/ai-traffic-system-dhaka.jpg",author:"KoyJabo Team",publishDate:"2026-05-14",readTime:"8 min read",keywords:["Dhaka airport arrival guide","HSIA arrival guide NRB","Dhaka airport to city transport","Hazrat Shahjalal airport guide","NRB returning Bangladesh","Dhaka airport SIM card","Bangladesh airport customs","first time Dhaka arrival","Bangladesh airport taxi","Dhaka airport Uber","DAC airport guide","Bangladesh arrival checklist","Dhaka airport BRTC bus","returning Bangladeshi diaspora","KoyJabo airport guide"],category:"Travel Guide",content:`
Whether you've been away for 2 years or 20, arriving at Hazrat Shahjalal International Airport (DAC) in Dhaka can be overwhelming. This guide walks you through every step — from the moment you land to getting settled in the city.

---

## 🛬 Step 1: Immigration

**For NRBs (Bangladeshi passport holders):**
- Use the **Bangladeshi Nationals** immigration lane
- Processing time: 10–30 minutes during peak hours
- Have your **Bangladesh passport** ready with any visa/entry stamps if required

**For foreign nationals visiting Bangladesh:**
- Visa on Arrival available at the airport for most Western passport holders (UK, USA, EU, Australia, Canada) — **$50 USD fee, cash preferred**
- Join the **Visa on Arrival** queue before immigration
- Duration: 30 days (extendable)

**NRB Tip:** If you have dual nationality, use your **Bangladesh passport** at Dhaka airport — it's faster and avoids the VOA process.

---

## 🧳 Step 2: Baggage & Customs

- Collect baggage from the carousel (check screens for your flight number)
- **Customs declaration limit:** BDT 1 lakh in goods (beyond that, duty applies)
- Electronics, gold, and large amounts of cash must be declared
- Red Channel (to declare) vs. Green Channel (nothing to declare)

**What you can bring in without duty:**
- Personal electronics (laptop, phone, camera — 1 unit each)
- Clothing for personal use
- Up to 200 cigarettes or 50 cigars
- Up to 1 litre of alcohol (for non-Muslim travellers)

---

## 📱 Step 3: Get a SIM Card

Right inside the arrivals hall, you'll find SIM card counters for all major operators:

| Operator | Best For | Data Package (30 days) |
|---|---|---|
| Grameenphone (GP) | Coverage nationwide | ৳250–500 |
| Robi | Data speed | ৳200–450 |
| Banglalink | Budget | ৳150–350 |
| Teletalk | Government services | ৳100–300 |

**Requirements:** NID or passport for registration. The SIM will be activated within a few minutes.

> **Tip:** Buy a SIM card **before leaving the airport** — it's easier here than in the city, and you'll need data for Uber, Google Maps, and KoyJabo.

---

## 💵 Step 4: Get Local Currency (BDT)

- **ATMs** are available inside the terminal (Visa/Mastercard accepted)
- **Money exchange counters** in arrivals — rates are reasonable
- Current rates (approximate): £1 ≈ ৳150, $1 ≈ ৳120, AED 1 ≈ ৳33, MYR 1 ≈ ৳28
- Avoid exchanging too much upfront — ATMs in Dhaka city centre are widely available

---

## 🚖 Step 5: Transport from Airport to City

The airport is located in **Kurmitola**, about 15–20km north of central Dhaka (Motijheel/Old Dhaka) and 5–10km from Uttara/Gulshan.

### Ride-Hailing Apps (Recommended)
- **Uber** — reliable, fixed price, card or cash
- **Pathao** — cheaper, also reliable
- Install on your phone before arrival and use your regular account

**Fare estimates (from DAC):**
| Destination | Uber/Pathao | CNG |
|---|---|---|
| Gulshan / Baridhara | ৳350–500 | ৳500–700 |
| Uttara | ৳200–300 | ৳300–500 |
| Motijheel / Old Dhaka | ৳500–700 | ৳700–1,000 |
| Dhanmondi | ৳450–650 | ৳600–900 |

### BRTC Airport Bus (Cheapest)
- Route: Airport → Motijheel (City Centre)
- Fare: **৳80**
- Journey time: 60–90 minutes (depending on traffic)
- Runs frequently, but no AC — not ideal with heavy luggage

### Private Car (Pre-arranged)
- Ask your family to send a driver with the car — safest option
- Many Bangladeshis pre-arrange this from abroad via WhatsApp

---

## 🗺️ Using KoyJabo from the Airport

Once you have a SIM and data:

1. Open **[KoyJabo.com](https://koyjabo.com)** in your phone browser (no app download needed)
2. The app works offline after first load
3. Search your destination to find bus routes, metro info, and transport options
4. Use the **AI assistant** if you need personalised help

**For Uttara residents:** The **MRT Line 6 Metro** starts at Uttara North — if you're staying in Uttara, this is the fastest way to access central Dhaka.

---

## 🏨 Your First 24 Hours in Dhaka

### First night
- Get to your accommodation — rest is essential after a long flight
- Avoid a full sightseeing day on Day 1
- Dhaka's heat (30–36°C in summer) can be a shock after UK/US winters

### Day 1 essentials
- ✅ Register your SIM with NID (at any mobile shop)
- ✅ Get BDT from an ATM
- ✅ Buy a local rechargeable travel card for Metro (at Uttara/Motijheel metro station)
- ✅ Catch up with family
- ✅ Try local food (paratha, dal, bhuna khichuri — your childhood favourites await)

---

## 🚇 Getting Around Dhaka: Quick Reference

| Mode | Best For | Cost |
|---|---|---|
| MRT Metro (Line 6) | Uttara ↔ Motijheel fast | ৳20–100 |
| Uber/Pathao | Door-to-door, no haggling | ৳100–600 |
| CNG auto-rickshaw | Short trips, budget | ৳60–300 |
| Local bus | Cheapest, slow | ৳5–30 |
| Rickshaw | Last-mile, very short | ৳20–80 |

Use **KoyJabo** to find the right bus, plan metro journeys, and get route info across Dhaka.

---

*For intercity travel from Dhaka to Sylhet, Chittagong, Cox's Bazar and beyond — check the [KoyJabo Intercity planner](https://koyjabo.com).*
`,bnContent:`
হজরত শাহজালাল বিমানবন্দরে নামার পর কী করবেন — ধাপে ধাপে গাইড।

---

## ধাপ ১: ইমিগ্রেশন

বাংলাদেশি পাসপোর্ট থাকলে বাংলাদেশি নাগরিক লাইনে যান। সময় লাগতে পারে ১০–৩০ মিনিট।

---

## ধাপ ২: সিম কার্ড নিন

আগমন হলে ভেতরেই কাউন্টার আছে:
- গ্রামীণফোন, রবি, বাংলালিংক
- ৳১৫০–৫০০ (৩০ দিনের ডেটা সহ)
- পাসপোর্ট দিয়ে নিবন্ধন করুন

---

## ধাপ ৩: শহরে যাওয়া

| গন্তব্য | Uber/Pathao | CNG |
|---|---|---|
| গুলশান | ৳৩৫০–৫০০ | ৳৫০০–৭০০ |
| উত্তরা | ৳২০০–৩০০ | ৳৩০০–৫০০ |
| মতিঝিল | ৳৫০০–৭০০ | ৳৭০০–১,০০০ |

BRTC বাস সবচেয়ে সস্তা — মাত্র ৳৮০ মতিঝিল পর্যন্ত।

---

## 💡 গুরুত্বপূর্ণ টিপস

- বিমানবন্দরে সিম কিনুন — শহরে পরে ঝামেলা কম
- Uber/Pathao অ্যাপ আগে থেকেই ইনস্টল রাখুন
- [KoyJabo.com](https://koyjabo.com) খুলুন — বাস রুট ও মেট্রো তথ্য পাবেন
`},{id:"uk-bangladeshi-travel-guide-sylhet-chittagong-dhaka-2026",slug:"uk-bangladeshi-travel-guide-sylhet-chittagong-dhaka-2026",title:"UK Bangladeshi Travel Guide: Visiting Sylhet, Chittagong & Dhaka in 2026",bnTitle:"যুক্তরাজ্যে বসবাসকারী বাংলাদেশিদের জন্য সিলেট, চট্টগ্রাম ও ঢাকা ভ্রমণ গাইড ২০২৬",excerpt:"For the 600,000 Bangladeshis living in the UK — whether you're visiting Sylhet to see your roots, exploring Chittagong's coastline, or navigating Dhaka for the first time in years — this is your practical travel guide for 2026.",bnExcerpt:"যুক্তরাজ্যে বসবাসকারী বাংলাদেশিদের জন্য সিলেট, চট্টগ্রাম ও ঢাকায় ভ্রমণের সম্পূর্ণ গাইড।",coverImage:"/blog/ai-traffic-system-dhaka.jpg",author:"KoyJabo Team",publishDate:"2026-05-14",readTime:"11 min read",keywords:["UK Bangladeshi visit Bangladesh","British Bangladeshi travel guide","Sylhet travel guide UK","visiting Sylhet from UK","Sylhet roots tourism","Chittagong travel guide UK Bangladeshi","Dhaka travel guide British Bangladeshi","Bangladesh from London","UK NRB Bangladesh travel","Sylhet jaflong travel","Ratargul Sylhet","visiting Bangladesh family","British Bangladeshi homeland visit","Sylhet airport UK","Bangladesh roots trip 2026"],category:"Travel Guide",content:`
Over 600,000 people of Bangladeshi origin live in the UK — the largest Bangladeshi diaspora community in the world outside South Asia. The vast majority trace their roots to **Sylhet Division**, with significant communities from **Chittagong** and **Dhaka** as well.

Whether you're making your first visit, returning after many years, or bringing UK-born children to see where the family comes from — this guide is for you.

---

## ✈️ Getting to Bangladesh from the UK

### From London Heathrow (LHR)
- **Biman Bangladesh Airlines:** Direct flights to Dhaka (DAC) — ~10h 30min
- **Qatar Airways:** Via Doha — ~14h total, often cheaper
- **Emirates:** Via Dubai — ~13h total
- **Turkish Airlines:** Via Istanbul — ~15h total, competitive prices

### From London Gatwick / Manchester / Birmingham
- Usually 1 stop via Doha, Dubai, Istanbul or Muscat
- Manchester and Birmingham have larger Bangladeshi communities — more charter flights during Eid

**Price guide (return, economy from Heathrow):**
| Time of Year | Approx. Price |
|---|---|
| Off-peak (Oct–Feb excl. Christmas) | £420–580 |
| Standard (March–May, Sep) | £550–750 |
| Eid season (2 weeks before Eid) | £800–1,400 |
| Summer school holidays | £650–950 |

> **Tip:** For Sylhet, you can fly directly to **Osmani International Airport (ZYL)** from some UK airports via charter or indirect routes — check Biman and Regent Airways for domestic connections.

---

## 🌿 Sylhet: The Ancestral Home

Most UK Bangladeshis have family roots in Sylhet. Even if you've been before, Sylhet has changed significantly — here's what to see in 2026.

### Getting to Sylhet from Dhaka
| Mode | Duration | Cost |
|---|---|---|
| Bus (Hanif, Shyamoli, Green Line) | 5–6 hours | ৳500–900 |
| Train (Upaban, Parabat Express) | 6–7 hours | ৳350–1,200 |
| Domestic flight (Biman/Novoair) | 45 minutes | ৳3,000–6,000 |

### Top Places in Sylhet

**1. Jaflong — India Border & Crystal Clear Rivers**
- Located at the Bangladesh–India border in Gowainghat
- Famous for stone-laden rivers, tribal Khasi villages, and misty mountains
- 1.5 hours from Sylhet city
- Best visited October–March

**2. Ratargul Swamp Forest**
- Bangladesh's only freshwater swamp forest
- Boat trips through submerged trees — magical in monsoon (July–September)
- 30 minutes from Sylhet city

**3. Srimangal — Tea Garden Capital**
- 2 hours from Sylhet (or via Dhaka–Chittagong rail line)
- Walk through endless tea gardens
- Try 7-layer tea (local Sylheti tradition)
- Visit: Lawachara National Park (monkeys, birds, leeches!)

**4. Madhabkunda Waterfall**
- Bangladesh's highest waterfall (162 feet)
- Near Moulvibazar district
- 2.5 hours from Sylhet city
- Best in monsoon season

**5. Baishnabpara — Hindu Temples**
- Ancient temples near Sylhet city
- Historical and spiritual significance

**Staying in Sylhet:**
- Rose View Hotel (5-star): ৳5,000–8,000/night
- Hotel Noorjahan Grand: ৳3,000–5,000/night
- Budget guesthouses near Kumarpara: ৳800–2,000/night

---

## 🌊 Chittagong: Port City & Sea

UK Bangladeshis from Chittagong often visit the port city and its stunning surrounding coastline.

### Getting to Chittagong from Dhaka
| Mode | Duration | Cost |
|---|---|---|
| Bus (AC, Hanif/Shyamoli) | 5–6 hours | ৳600–1,000 |
| Train (Sonar Bangla Express) | 5–6 hours | ৳350–1,100 |
| Domestic flight | 45 minutes | ৳3,000–5,500 |

### Top Places in & Around Chittagong

**1. Patenga Beach**
- 14km from Chittagong city
- Sunsets over the Bay of Bengal
- Seafood at local restaurants

**2. Foy's Lake**
- Artificial lake in the hills — picturesque
- Amusement park, picnic spots

**3. Kaptai Lake**
- Largest man-made lake in Bangladesh
- Boat trips through tribal villages
- 2 hours from Chittagong

**4. Cox's Bazar** (from Chittagong)
- 2.5 hours south — the world's longest sea beach
- Lahkudi beachfront drive

---

## 🏙️ Dhaka for UK Returnees

Dhaka has changed dramatically. Here's what to expect in 2026:

### New in Dhaka (Since You Last Visited)
- **MRT Line 6 Metro Rail** — from Uttara to Motijheel, clean, air-conditioned, ৳20–100 fare
- **Hatirjheel** — beautiful lakeside development, evening walks and cafes
- **Bashundhara City & Jamuna Future Park** — massive malls
- **Food scene** — Dhanmondi, Gulshan, Banani now have hundreds of cafes, restaurants and rooftop dining
- **Ride-hailing (Uber/Pathao)** — no more haggling with CNG drivers

### Dhaka Neighbourhoods for UK Visitors
| Area | Known For |
|---|---|
| Gulshan 1 & 2 | Embassies, restaurants, expat-friendly |
| Dhanmondi | Cafes, food, Rabindra Sarobar lake |
| Banani | Bars (licensed), restaurants, cosmopolitan |
| Old Dhaka | History, authentic food, Buriganga River |
| Uttara | Metro-accessible, newer, spacious |

---

## 📱 Navigating Bangladesh with KoyJabo

[KoyJabo.com](https://koyjabo.com) is Bangladesh's first bilingual transport app — free, offline-capable, and designed for both locals and returning diaspora.

**What you can do:**
- Find bus routes across Dhaka (200+ routes)
- Check MRT Line 6 metro fares and schedules
- Plan intercity trips (bus, train, plane, launch)
- Ask the AI assistant questions in English or Bengali

**No app store download needed** — works directly in your phone browser.

---

## 💡 Tips for UK Bangladeshis

1. **Language:** Even if your Sylheti/Chittagonian dialect is rusty, people will appreciate the effort — mix English and Bengali freely
2. **Money:** UK bank cards work at most Dhaka ATMs (Visa/Mastercard) — Standard Chartered, HSBC, and Dutch Bangla Bank branches are reliable
3. **Safety:** Dhaka is generally safe for visitors — normal urban caution applies
4. **Health:** Drink bottled water only; eat at established restaurants in the city
5. **Weather:** November–February is the coolest and most comfortable time to visit (18–26°C)

---

*Plan your Bangladesh journey with [KoyJabo.com](https://koyjabo.com) — transport, routes, and AI assistance, all in one place.*
`,bnContent:`
যুক্তরাজ্যে ৬ লক্ষেরও বেশি বাংলাদেশি বসবাস করেন। বেশিরভাগের শিকড় সিলেটে। এই গাইড তাদের জন্য।

---

## ✈️ যুক্তরাজ্য থেকে বাংলাদেশে আসার উপায়

- **বিমান বাংলাদেশ:** লন্ডন থেকে সরাসরি ঢাকা (~১০.৩০ ঘণ্টা)
- **কাতার এয়ারওয়েজ:** দোহা হয়ে (~১৪ ঘণ্টা)
- **এমিরেটস:** দুবাই হয়ে (~১৩ ঘণ্টা)

---

## 🌿 সিলেট: পূর্বপুরুষের ভূমি

**ঢাকা থেকে সিলেট:**
- বাস: ৫–৬ ঘণ্টা, ৳৫০০–৯০০
- ট্রেন: ৬–৭ ঘণ্টা, ৳৩৫০–১,২০০

**সেরা স্থান:**
- জাফলং — ভারত সীমান্তে স্বচ্ছ নদী
- রাতারগুল — মিঠাপানির জলাবন
- শ্রীমঙ্গল — চা বাগান

---

## 🏙️ ঢাকার নতুন আকর্ষণ

- মেট্রো রেল (MRT লাইন ৬) — উত্তরা থেকে মতিঝিল
- হাতিরঝিল — লেকসাইড পার্ক
- নতুন মল, রেস্তোরাঁ, ক্যাফে

[KoyJabo.com](https://koyjabo.com) দিয়ে বাস, মেট্রো ও অন্যান্য যানবাহনের তথ্য পান।
`},{id:"bangladesh-travel-guide-for-workers-in-uae-malaysia-2026",slug:"bangladesh-travel-guide-for-workers-in-uae-malaysia-2026",title:"Bangladesh Travel Guide for Workers in UAE & Malaysia: Coming Home in 2026",bnTitle:"ইউএই ও মালয়েশিয়ায় কর্মরত বাংলাদেশিদের জন্য দেশে ফেরার গাইড ২০২৬",excerpt:"For the 3 million+ Bangladeshi workers in the UAE and Malaysia — this guide covers the cheapest flights home, what has changed since you left, how to get around Bangladesh, and how to make the most of your annual leave back home.",bnExcerpt:"ইউএই ও মালয়েশিয়ায় কর্মরত বাংলাদেশিদের জন্য সস্তায় দেশে আসার টিপস, বিমানবন্দর গাইড ও যাতায়াত তথ্য।",coverImage:"/blog/ai-traffic-system-dhaka.jpg",author:"KoyJabo Team",publishDate:"2026-05-14",readTime:"9 min read",keywords:["Bangladesh from UAE travel guide","Bangladesh from Malaysia travel guide","Dubai to Dhaka flight cheap","Kuala Lumpur to Dhaka flight","Bangladeshi workers UAE return","Malaysia Bangladeshi come home","cheap flight Dubai Dhaka","AirAsia Dhaka Malaysia","flydubai Dhaka UAE","Bangladesh remittance workers travel","annual leave Bangladesh","Eid flight UAE Bangladesh","cheapest way Bangladesh from Dubai","NRB UAE Bangladesh","Bangladeshi Malaysia return visit"],category:"Travel Guide",content:`
Over **1.5 million Bangladeshis** live and work in the UAE, and another **800,000+** in Malaysia. Most work in construction, manufacturing, hospitality, or domestic services — sending remittances home and saving for annual visits.

This guide is written for you: how to get home affordably, what's changed, and how to make the most of your time with family.

---

## ✈️ Cheapest Flights from UAE to Bangladesh

### From Dubai (DXB / DWC)

| Airline | Route | Approx. Price (One Way) |
|---|---|---|
| flydubai | Dubai → Dhaka (direct, ~4.5h) | AED 350–700 |
| Air Arabia | Sharjah → Dhaka | AED 300–650 |
| Biman Bangladesh | Dubai → Dhaka (direct) | AED 500–900 |
| Emirates | Dubai → Dhaka (via) | AED 800–1,500 |
| IndiGo | Dubai → Dhaka (via Delhi) | AED 500–900 |

> **Best deal:** Check flydubai and Air Arabia on Tuesdays/Wednesdays — budget seats go fast.

### From Abu Dhabi (AUH)
- Air Arabia Abu Dhabi: AED 280–600 to Dhaka
- Etihad: AED 600–1,200

### From Sharjah (SHJ)
- Air Arabia: AED 300–650 direct to Dhaka

---

## ✈️ Cheapest Flights from Malaysia to Bangladesh

### From Kuala Lumpur (KUL / KLIA2)

| Airline | Route | Approx. Price (One Way) |
|---|---|---|
| AirAsia | KLIA2 → Dhaka (direct, ~4h) | MYR 350–700 |
| Biman Bangladesh | KLIA → Dhaka | MYR 500–900 |
| Malindo Air / Batik Air | KLIA → Dhaka | MYR 450–850 |
| IndiGo | KLIA → Dhaka (via Chennai) | MYR 500–900 |

> **Best deal:** AirAsia offers promotions (sale fares) 2–4 times a year — check their website and subscribe to alerts.

---

## 🛬 Arriving at Dhaka Airport

After a long shift or contract abroad, arriving home is emotional — but the airport can be hectic. Here's what to know:

1. **Immigration:** Use the Bangladeshi Nationals lane — queue is usually 15–30 minutes
2. **Customs:** No duty on personal items; declare electronics/goods over BDT 1 lakh
3. **SIM card:** Get a GP or Robi SIM inside the terminal (৳150–300 with data)
4. **Transport to city:**
   - Uber/Pathao: ৳350–600 to Gulshan/Dhanmondi
   - BRTC Airport Bus: ৳80 to Motijheel (cheapest)
   - Family driver: best option if possible

---

## 🏘️ Getting to Your Home District

Most workers from UAE/Malaysia are from rural Bangladesh — Cumilla, Brahmanbaria, Noakhali, Mymensingh, Jashore, Rajshahi.

**Getting from Dhaka to your district:**

| Destination | Bus | Train | Fare (AC Bus) |
|---|---|---|---|
| Cumilla | 2 hours | 2.5 hours | ৳250–350 |
| Brahmanbaria | 2.5 hours | 3 hours | ৳300–400 |
| Noakhali | 4 hours | — | ৳400–600 |
| Mymensingh | 3 hours | 3.5 hours | ৳300–500 |
| Jashore | 5 hours | 6 hours | ৳500–800 |
| Rajshahi | 6 hours | 7 hours | ৳600–900 |

Use **[KoyJabo Intercity](https://koyjabo.com)** to check bus routes and schedules.

---

## 💰 Money Matters

### Sending Money Before Your Trip
- Send remittances via **bKash, Nagad, or bank transfer** — your family will have BDT ready when you arrive
- Exchange rates: AED 1 ≈ ৳33–34, MYR 1 ≈ ৳26–28 (check live rate before sending)
- Western Union, MoneyGram, Brac Bank, and Dutch Bangla Bank all offer competitive rates

### Spending in Bangladesh
- Daily cost in rural Bangladesh: ৳300–500/day (meals, local transport, basics)
- Daily cost in Dhaka: ৳600–1,200/day depending on lifestyle
- Carry cash in rural areas — cards/ATMs are rare

---

## 📱 New Technology to Know About

Bangladesh has changed since 2016–2018 when many workers left:

- **Metro Rail (MRT-6):** Air-conditioned metro from Uttara to Motijheel — ৳20–100 per trip
- **Uber/Pathao:** Ride-hailing everywhere in Dhaka and Chittagong — no haggling
- **bKash/Nagad:** Mobile money — used for everything, even at small shops
- **KoyJabo.com:** Free transport app for bus routes, metro, intercity — works offline

---

## ⏰ Making the Most of Annual Leave (14–30 Days)

**Sample 2-week itinerary for a worker returning from UAE:**

| Day | Plan |
|---|---|
| Day 1–3 | Dhaka airport → village home, rest, family reunion |
| Day 4–7 | Spend time in village, attend local events, visit relatives |
| Day 8–9 | Dhaka sightseeing (Metro, Hatirjheel, Old Dhaka) |
| Day 10–11 | Cox's Bazar or Sylhet trip (optional) |
| Day 12–13 | Shopping in Dhaka (Bashundhara City, New Market) |
| Day 14 | Rest, pack, return flight |

---

## 💡 Practical Tips for Workers Returning Home

1. **Book flights 2–3 months in advance** — prices spike 1 month before departure, especially before Eid
2. **Your National ID (NID) card is essential** — many services require it; apply for a new card if yours has expired
3. **Update bKash/Nagad** with your Bangladeshi number while home
4. **Check your passport expiry** — Bangladesh passport must have 6 months validity for re-entry to UAE/Malaysia
5. **Medical checkup** while home — access to cheap, quality healthcare in Bangladesh

---

*Navigate Bangladesh transport easily with [KoyJabo.com](https://koyjabo.com) — free, offline-ready, bilingual.*
`,bnContent:`
ইউএই ও মালয়েশিয়ায় কর্মরত ১৫ লক্ষেরও বেশি বাংলাদেশির জন্য এই গাইড।

---

## ✈️ সস্তায় দেশে আসার উপায়

### দুবাই থেকে
- flydubai: AED ৩৫০–৭০০
- Air Arabia: AED ৩০০–৬৫০
- বিমান বাংলাদেশ: AED ৫০০–৯০০

### কুয়ালালামপুর থেকে
- AirAsia: MYR ৩৫০–৭০০
- বিমান: MYR ৫০০–৯০০

---

## 💰 টাকা পাঠানোর আগে

- bKash/Nagad বা ব্যাংক ট্রান্সফারে টাকা পাঠান
- বর্তমান রেট: AED ১ ≈ ৳৩৩–৩৪, MYR ১ ≈ ৳২৬–২৮

---

## 📱 নতুন কী আছে বাংলাদেশে

- মেট্রো রেল (MRT লাইন ৬) — উত্তরা থেকে মতিঝিল
- Uber/Pathao — ঢাকায় ভাড়া নিয়ে ঝামেলা নেই
- [KoyJabo.com](https://koyjabo.com) — বিনামূল্যে পরিবহন গাইড, অফলাইনেও কাজ করে
`},{id:"what-changed-bangladesh-2026-nrb-returning-guide",slug:"what-changed-bangladesh-2026-nrb-returning-guide",title:"Bangladesh in 2026: What's New for NRBs Returning Home (Metro, Transport, Tech & More)",bnTitle:"বাংলাদেশ ২০২৬: প্রবাসীরা ফিরে এসে যা নতুন দেখবেন (মেট্রো, প্রযুক্তি ও পরিবহন)",excerpt:"If you haven't been back to Bangladesh in 2–5 years, you'll be surprised. Dhaka has a metro rail, ride-hailing is everywhere, new highways connect the country, and tech has transformed daily life. Here's everything that has changed.",bnExcerpt:"২–৫ বছর দেশে না আসলে অনেক কিছু বদলে গেছে। মেট্রো রেল, রাইড-হেইলিং, নতুন সেতু ও প্রযুক্তি — সব কিছু জানুন।",coverImage:"/blog/ai-traffic-system-dhaka.jpg",author:"KoyJabo Team",publishDate:"2026-05-14",readTime:"8 min read",keywords:["Bangladesh changed 2026 NRB","what is new in Bangladesh 2026","Dhaka metro rail for NRBs","Bangladesh transport changes 2026","returning to Bangladesh NRB","Bangladesh development 2026","Dhaka modern city 2026","Bangladesh tech changes","Padma Bridge Bangladesh","MRT Line 6 Dhaka metro","Bangladesh digital 2026","NRB returning home Bangladesh","Bangladesh infrastructure 2026","changes in Dhaka 2024 2025 2026","Bangladesh economy 2026"],category:"Travel Guide",content:`
If you left Bangladesh in 2019 or 2020 and haven't been back, you're in for a surprise. Bangladesh has transformed in ways that will genuinely impress you — new infrastructure, new technology, and a new way of living for Dhaka residents.

Here's everything that has changed, written for the NRB coming home.

---

## 🚇 1. Dhaka Now Has a Metro Rail

The biggest change in Dhaka's transport history: **MRT Line 6** opened in 2022 and is now fully operational from **Uttara North to Motijheel**.

**What it means for you:**
- Commute from Uttara to Motijheel in **35 minutes** — what used to take 90–120 minutes in traffic
- Air-conditioned, clean, affordable (৳20–100 per trip)
- 16 stations across 21km
- Runs from 7 AM to 10 PM (last train)
- Uses a rechargeable **MRT Pass** card

**Stations:** Uttara North · Uttara Centre · Uttara South · Pallabi · Mirpur 11 · Mirpur 10 · Kazipara · Shewrapara · Agargaon · Bijoy Sarani · Farmgate · Kawranbazar · Shahbagh · Dhaka University · Bangladesh Secretariat · Motijheel

> Check metro fares and plan your trip on [KoyJabo.com](https://koyjabo.com)

---

## 🌉 2. The Padma Bridge is Open

The **Padma Multipurpose Bridge** opened in June 2022, connecting Dhaka to southern Bangladesh across the Padma River.

**What changed:**
- **Barisal, Khulna, Kushtia, Faridpur** — journey times cut by 2–3 hours
- No more ferry wait at Mawa/Shimulia crossing
- Dhaka to Barisal: now 4 hours (was 6–7 hours via ferry)
- Dhaka to Khulna (Sundarban entry): now 5 hours (was 7–8 hours)

---

## 🚗 3. Ride-Hailing is Everywhere

In 2019, Uber and Pathao were new. In 2026, they are **the default** way Dhaka residents get around.

**Apps to use:**
- **Uber** — global app, card/cash, most reliable
- **Pathao** — Bangladeshi app, often cheaper, motorbikes and cars
- **Shohoz** — bikes and cars, competitive pricing

**What this means:** No more haggling with CNG drivers. Open an app, see the price upfront, and go.

---

## 🏗️ 4. Major Infrastructure Changes

| Project | Status in 2026 |
|---|---|
| MRT Line 6 (Uttara–Motijheel) | Fully operational |
| Padma Bridge | Open (2022) |
| Bangabandhu Tunnel (Chittagong) | Open (2023) — first underwater road tunnel in Bangladesh |
| Elevated Expressway (Dhaka) | Partially open, ongoing |
| MRT Line 1 (Airport–Kamalapur) | Under construction |
| MRT Line 5 (Hemayetpur–Vatara) | Under construction |

---

## 📱 5. Tech & Digital Services Have Changed

### Mobile Payments
- **bKash** and **Nagad** are now used for almost everything — grocery shops, pharmacies, even street food vendors
- You can pay utility bills, buy bus tickets, and send money via mobile

### Online Shopping
- **Chaldal** — groceries delivered in 1 hour in Dhaka
- **Shajgoj** — cosmetics/beauty
- **Daraz** — everything (like Amazon for Bangladesh)
- **Shohoz, Ekhanei.com** — local e-commerce

### Food Delivery
- **Foodpanda** and **Shohoz Food** now deliver to most Dhaka areas within 30–45 minutes
- Prices are affordable — BDT 200–600 for a full meal delivered

---

## 🏙️ 6. Dhaka's New Neighbourhoods & Attractions

**Hatirjheel:**
The waterfront lake development in Rampura/Badda has transformed into a beautiful public space. Evening walks, boat rides, cafes, and restaurants. Free to visit.

**Bashundhara City:**
Still one of Asia's largest shopping malls — now even more shops, food courts, and a cinema.

**Jamuna Future Park:**
The second mega-mall in Dhaka — well worth a visit.

**New Cafes & Restaurants:**
Dhaka's food scene has exploded. Dhanmondi, Gulshan, and Banani now have hundreds of cafes, from local cha (tea) stalls to international cuisine. Instagram-worthy spots everywhere.

---

## 💊 7. Healthcare Has Improved

- **Evercare Hospital** and **Square Hospital** offer world-class facilities
- **Lab Aid, Popular Diagnostic Centre** have branches across Dhaka for tests and checkups
- Private healthcare is still far cheaper than UK/US/UAE — use your trip to get checkups done

---

## 🌾 8. Outside Dhaka: New Highways

- **Dhaka Elevated Expressway** reduces city travel times
- **Dhaka–Chittagong** route improved with road upgrades
- **New bridges** across river crossings in northern Bangladesh

---

## 📋 Quick Reference: Then vs. Now

| Then (2019) | Now (2026) |
|---|---|
| No metro — all traffic on roads | MRT Line 6 cuts Uttara–Motijheel to 35 min |
| Ferry required to cross Padma | Padma Bridge (drive across in 5 min) |
| Haggle with CNGs | Uber/Pathao fixed price on app |
| Cash for everything | bKash/Nagad everywhere |
| Limited food delivery | Foodpanda/Shohoz Food 30-min delivery |
| No Chittagong tunnel | Bangabandhu Tunnel (under Karnaphuli) open |

---

## 💡 Tips for Returning NRBs

1. **Download Uber/Pathao before landing** — register with your international number
2. **Get a local SIM at the airport** — Grameenphone or Robi, with data package
3. **Use KoyJabo** for all transport navigation — [koyjabo.com](https://koyjabo.com)
4. **bKash app** — link to your Bangladesh account before arrival if possible
5. **The heat:** If you're coming from a cold country, give yourself 2–3 days to adjust to Dhaka's climate

---

*Use [KoyJabo.com](https://koyjabo.com) to navigate the new Bangladesh transport network — metro, buses, intercity, and more.*
`,bnContent:`
২–৫ বছর দেশে না আসলে অনেক কিছু বদলে গেছে। প্রধান পরিবর্তনগুলো:

---

## 🚇 মেট্রো রেল

MRT লাইন ৬ এখন পুরোপুরি চালু — উত্তরা থেকে মতিঝিল মাত্র ৩৫ মিনিটে।
- ১৬টি স্টেশন
- ভাড়া: ৳২০–১০০
- এসি পরিবেশ

---

## 🌉 পদ্মা সেতু

জুন ২০২২ থেকে খোলা। ঢাকা থেকে বরিশাল এখন মাত্র ৪ ঘণ্টা।

---

## 🚗 রাইড-হেইলিং

Uber ও Pathao এখন ঢাকার সর্বত্র। দরদাম নেই — অ্যাপে দাম দেখেই চড়ুন।

---

## 💳 মোবাইল পেমেন্ট

bKash ও Nagad দিয়ে সব কিছু — বাজার, ওষুধ, বাস টিকিট।

[KoyJabo.com](https://koyjabo.com) দিয়ে বাস, মেট্রো ও ইন্টারসিটি রুট পরিকল্পনা করুন।
`},{id:"bangladesh-railway-senior-citizen-disability-fare-discount-2026",slug:"bangladesh-railway-senior-citizen-disability-fare-discount-2026",title:"Bangladesh Railway 25% Fare Discount: Senior Citizens & Disabled Passengers Guide (2026)",bnTitle:"বাংলাদেশ রেলওয়েতে ২৫% ভাড়া ছাড়: প্রবীণ ও প্রতিবন্ধী যাত্রীদের সম্পূর্ণ গাইড (২০২৬)",excerpt:"Bangladesh Railway now offers 25% fare discount for passengers aged 65+ and holders of the Suborno disability card. Effective from 25 May 2026, available both online and at counters. Here's how to claim it.",bnExcerpt:"২৫ মে ২০২৬ থেকে বাংলাদেশ রেলওয়েতে ৬৫ বছর বা তদূর্ধ্ব যাত্রী এবং সুবর্ণ কার্ডধারী প্রতিবন্ধী যাত্রীদের জন্য ২৫% ভাড়া ছাড় কার্যকর। অনলাইন ও কাউন্টার উভয় মাধ্যমেই পাওয়া যাবে।",coverImage:"https://media.licdn.com/dms/image/v2/D5622AQGu2OcR20uvJw/feedshare-shrink_1280/B56Z68egKoJQAM-/0/1781278573550?e=1782950400&v=beta&t=uzo4wP2_peEuT6ihcQXRZgcHWhWhK3l8meXywgZqgTU",author:"KoyJabo Team",publishDate:"2026-06-12",readTime:"5 min read",keywords:["Bangladesh Railway fare discount 2026","senior citizen train discount Bangladesh","railway discount 65 years Bangladesh","Suborno card disability discount train","বাংলাদেশ রেলওয়ে ভাড়া ছাড়","প্রবীণ ট্রেন ছাড়","সুবর্ণ কার্ড রেলওয়ে","disabled passenger train Bangladesh","inclusive transport Bangladesh","railway NID verification discount","train ticket discount Bangladesh","Bangladesh Railway gazette 2026","KoyJabo train guide","railway concession Bangladesh"],category:"Train & Railway",content:`
Bangladesh Railway has taken a landmark step toward **inclusive and passenger-friendly public transport**. From **25 May 2026**, two groups now receive a **25% discount on base fares**: citizens aged 65 and above, and holders of the government-issued 'Suborno' disability card.

This policy was formalised through a **government gazette notification** and applies across both the online ticketing system and physical counters nationwide.

---

## 👴 Discount for Senior Citizens (65+ Years)

### Who Qualifies?
Any Bangladeshi citizen whose age is **65 years or older as verified by their National Identity Card (NID)**.

### Key Rules

| Rule | Detail |
|------|--------|
| **Age verification** | NID-based — exact date of birth on NID used |
| **Discount amount** | 25% off the base fare |
| **Where applicable** | Online (eticket.railway.gov.bd) and all counter stations |
| **Registration** | Must register in the Bangladesh Railway system with NID verification |
| **Usage limit** | Maximum **2 discounted tickets per week** |
| **Ticket classes** | All classes on intercity and other eligible trains |

### How to Claim the Senior Citizen Discount

1. **Online:** Log into [eticket.railway.gov.bd](https://eticket.railway.gov.bd), complete NID verification during registration, and the discount will apply automatically when booking.
2. **Counter:** Present your **original NID** at the ticket counter. The station staff will verify age and apply the 25% discount.

> **Important:** The 2-per-week limit resets every week. Plan your journeys accordingly if you travel frequently.

---

## ♿ Discount for Passengers with Disabilities (Suborno Card Holders)

### Who Qualifies?
Passengers holding the official **'সুবর্ণ' (Suborno) identity card** issued by the government to persons with disabilities.

### Key Rules

| Rule | Detail |
|------|--------|
| **Eligibility card** | Government-issued Suborno disability identity card |
| **Discount amount** | 25% off the base fare |
| **Train types** | Designated classes on intercity (আন্তঃনগর) and other trains |
| **Companion benefit** | A provision exists for the accompanying companion — check at the counter for the latest terms |
| **Where applicable** | Online and all counter stations |

### Accessibility Support on Bangladesh Railway

- Dedicated **wheelchair-accessible spaces** available on many intercity trains
- **Priority seating** for passengers with mobility limitations
- Station staff assistance available — ask at the help desk

---

## 📅 When Did This Start?

**Effective date: 25 May 2026**

Both the senior citizen and disability fare concessions became operational simultaneously under the same gazette order.

---

## 🎟️ Step-by-Step: How to Book a Discounted Train Ticket

### Online Booking
1. Visit **[eticket.railway.gov.bd](https://eticket.railway.gov.bd)**
2. Register or log in to your account
3. Complete **NID verification** (for senior citizens) or **Suborno card details** (for disabled passengers)
4. Search for your train route and date
5. The 25% discount will apply automatically on the fare displayed
6. Complete payment and save your ticket

### Counter Booking
1. Go to any Bangladesh Railway ticket counter
2. Request a discounted ticket — mention "senior citizen" or "Suborno card"
3. Present your **original NID** (65+) or **original Suborno card**
4. Counter staff verifies and issues the discounted ticket

---

## 💰 How Much Do You Actually Save?

Here are some example savings on popular routes (based on 2026 Shuvon Chair class fares):

| Route | Normal Fare | After 25% Discount | You Save |
|-------|------------|-------------------|---------|
| Dhaka → Chittagong | ৳300 | ৳225 | ৳75 |
| Dhaka → Sylhet | ৳305 | ৳229 | ৳76 |
| Dhaka → Rajshahi | ৳345 | ৳259 | ৳86 |
| Dhaka → Khulna | ৳390 | ৳293 | ৳97 |

For higher classes (Snigdha, AC Berth), the savings are even greater.

---

## 🔍 Frequently Asked Questions

**Q: Can I book the discounted ticket for someone else?**
No — the discount is personal. The NID/Suborno cardholder must travel on the ticket.

**Q: What if my NID shows I'm 64 but I'm turning 65 soon?**
Eligibility is checked at the time of booking. You must be 65 or older on the day of travel or booking.

**Q: Does the companion discount for disabled passengers require a separate application?**
Check at your nearest railway station — the companion provision details are handled at the counter level.

**Q: Does this apply to all train types?**
Senior citizen discount applies broadly. Disability discounts apply on **designated classes of intercity and other trains** — confirm the specific train when booking.

**Q: Is there a limit on how many tickets a disabled passenger can buy?**
The gazette focuses the 2-per-week limit on senior citizens. For Suborno card holders, confirm the current limit at the counter or the eticket portal.

---

## 🚆 Why This Matters

Bangladesh has over **16 million citizens aged 60+**, a number growing every year. Affordable rail travel for this group directly improves their access to healthcare, family visits, and essential services across the country.

For persons with disabilities — who often depend heavily on rail travel due to lower mobility costs — the Suborno card discount combined with accessibility provisions marks a genuine improvement in **inclusive public transport**.

---

## 📲 Plan Your Rail Journey with KoyJabo

**[KoyJabo.com](https://koyjabo.com)** helps you:
- Search train schedules and fares across Bangladesh Railway's network
- Find the right intercity train for your route
- Check bus connections to and from railway stations
- Plan multi-modal journeys: bus + train, metro + train

Whether you're a senior citizen planning a visit to your home district or a caregiver helping a family member — plan your train journey at KoyJabo first.

🔗 **[koyjabo.com](https://koyjabo.com)**

---

*Source: Bangladesh Railway gazette notification, effective 25 May 2026.*

#BangladeshRailway #SeniorCitizen #DisabilitySupport #SubornoCard #TrainTicket #RailwayUpdate #AccessibleTransport #PublicTransport #KoyJabo #Bangladesh #InclusiveTransport
`,bnContent:`
বাংলাদেশ রেলওয়ে **যাত্রীবান্ধব ও অন্তর্ভুক্তিমূলক গণপরিবহন** গড়ে তোলার পথে একটি গুরুত্বপূর্ণ পদক্ষেপ নিয়েছে। **২৫ মে ২০২৬** থেকে দুটি শ্রেণির যাত্রী **মূল ভাড়ায় ২৫% ছাড়** পাবেন: ৬৫ বছর বা তদূর্ধ্ব নাগরিক এবং সরকার প্রদত্ত 'সুবর্ণ' পরিচয়পত্রধারী প্রতিবন্ধী যাত্রী।

এই সুবিধা **সরকারি গেজেট বিজ্ঞপ্তির** মাধ্যমে আনুষ্ঠানিকভাবে কার্যকর হয়েছে এবং অনলাইন টিকিটিং সিস্টেম ও দেশব্যাপী সব কাউন্টারে প্রযোজ্য।

---

## 👴 প্রবীণ যাত্রীদের জন্য ছাড় (৬৫+ বছর)

### কারা পাবেন?
**জাতীয় পরিচয়পত্র (NID) অনুযায়ী** যাঁদের বয়স ৬৫ বছর বা তার বেশি।

### মূল শর্তসমূহ

| শর্ত | বিস্তারিত |
|------|----------|
| **বয়স যাচাই** | NID-এর জন্ম তারিখ অনুযায়ী |
| **ছাড়ের পরিমাণ** | মূল ভাড়ার ২৫% |
| **প্রযোজ্যতা** | অনলাইন (eticket.railway.gov.bd) ও সব কাউন্টার |
| **নিবন্ধন** | বাংলাদেশ রেলওয়ে সিস্টেমে NID ভেরিফিকেশনসহ নিবন্ধন প্রয়োজন |
| **সীমা** | সপ্তাহে সর্বোচ্চ **২টি** ছাড়যুক্ত টিকিট |

### কীভাবে পাবেন?

**অনলাইনে:** [eticket.railway.gov.bd](https://eticket.railway.gov.bd)-এ অ্যাকাউন্ট খুলুন, NID ভেরিফিকেশন সম্পন্ন করুন — টিকিট বুকিংয়ের সময় স্বয়ংক্রিয়ভাবে ছাড় প্রযোজ্য হবে।

**কাউন্টারে:** মূল NID নিয়ে যান। কাউন্টার কর্মী বয়স যাচাই করে ২৫% ছাড়ে টিকিট ইস্যু করবেন।

---

## ♿ প্রতিবন্ধী যাত্রীদের জন্য ছাড় (সুবর্ণ কার্ড)

### কারা পাবেন?
সরকার প্রদত্ত **'সুবর্ণ' পরিচয়পত্রধারী** প্রতিবন্ধী নাগরিক।

### মূল শর্তসমূহ

| শর্ত | বিস্তারিত |
|------|----------|
| **পরিচয়পত্র** | সরকারি সুবর্ণ পরিচয়পত্র |
| **ছাড়ের পরিমাণ** | মূল ভাড়ার ২৫% |
| **ট্রেনের ধরন** | নির্ধারিত শ্রেণির আন্তঃনগর ও অন্যান্য ট্রেন |
| **সহযাত্রী সুবিধা** | সহযাত্রীর জন্যও বিশেষ বিধান রয়েছে — কাউন্টারে বিস্তারিত জানুন |

---

## 💰 কত টাকা সাশ্রয় হবে?

জনপ্রিয় রুটে শোভন চেয়ার শ্রেণিতে উদাহরণ (২০২৬ ভাড়া অনুযায়ী):

| রুট | সাধারণ ভাড়া | ২৫% ছাড়ে | সাশ্রয় |
|-----|-----------|---------|-------|
| ঢাকা → চট্টগ্রাম | ৳৩০০ | ৳২২৫ | ৳৭৫ |
| ঢাকা → সিলেট | ৳৩০৫ | ৳২২৯ | ৳৭৬ |
| ঢাকা → রাজশাহী | ৳৩৪৫ | ৳২৫৯ | ৳৮৬ |
| ঢাকা → খুলনা | ৳৩৯০ | ৳২৯৩ | ৳৯৭ |

স্নিগ্ধা বা এসি বার্থ শ্রেণিতে সাশ্রয়ের পরিমাণ আরও বেশি।

---

## 🎟️ টিকিট কাটার ধাপে ধাপে নির্দেশিকা

### অনলাইনে
১. **[eticket.railway.gov.bd](https://eticket.railway.gov.bd)**-এ যান
২. অ্যাকাউন্টে লগইন করুন
৩. NID ভেরিফিকেশন / সুবর্ণ কার্ডের তথ্য পূরণ করুন
৪. রুট ও তারিখ সার্চ করুন — ছাড়সহ ভাড়া স্বয়ংক্রিয়ভাবে দেখাবে
৫. পেমেন্ট করুন ও টিকিট সংরক্ষণ করুন

### কাউন্টারে
১. যেকোনো রেলওয়ে স্টেশনের টিকিট কাউন্টারে যান
২. "প্রবীণ ছাড়" বা "সুবর্ণ কার্ড" উল্লেখ করুন
৩. মূল NID বা সুবর্ণ কার্ড দেখান
৪. কর্মী যাচাই করে ছাড়সহ টিকিট ইস্যু করবেন

---

## ❓ সাধারণ প্রশ্নোত্তর

**প্রশ্ন: অন্যের জন্য কি এই ছাড়ে টিকিট কাটা যাবে?**
না — এই ছাড় ব্যক্তিগত। NID/সুবর্ণ কার্ডধারীকে নিজেই যাত্রা করতে হবে।

**প্রশ্ন: সব ট্রেনে কি এই ছাড় পাওয়া যাবে?**
প্রবীণ ছাড় ব্যাপকভাবে প্রযোজ্য। প্রতিবন্ধী ছাড় নির্দিষ্ট শ্রেণির আন্তঃনগর ও অন্যান্য ট্রেনে — বুকিংয়ের সময় নিশ্চিত করুন।

---

## 🌟 কেন এটি গুরুত্বপূর্ণ?

বাংলাদেশে **৬০ বছরের উপরে নাগরিকের সংখ্যা ১ কোটি ৬০ লাখেরও বেশি** এবং এই সংখ্যা প্রতি বছর বাড়ছে। এই শ্রেণির জন্য সাশ্রয়ী ট্রেন ভ্রমণ চিকিৎসাসেবা, পরিবার পরিদর্শন এবং প্রয়োজনীয় কাজের সুযোগ সরাসরি বাড়িয়ে দেয়।

প্রতিবন্ধী যাত্রীদের জন্য — যাঁরা প্রায়ই কম গতিশীলতার কারণে ট্রেন ভ্রমণের উপর বেশি নির্ভরশীল — সুবর্ণ কার্ড ছাড় এবং প্রবেশযোগ্যতার সুবিধা মিলে একটি বাস্তব পরিবর্তন আনছে।

এটি **যাত্রীবান্ধব ও অন্তর্ভুক্তিমূলক গণপরিবহন** গড়ে তোলার পথে একটি প্রশংসনীয় উদ্যোগ।

---

## 📲 KoyJabo দিয়ে ট্রেন যাত্রা পরিকল্পনা করুন

**[KoyJabo.com](https://koyjabo.com)** আপনাকে সাহায্য করে:
- বাংলাদেশ রেলওয়ের ট্রেন সময়সূচি ও ভাড়া খুঁজতে
- আপনার রুটের জন্য সঠিক আন্তঃনগর ট্রেন নির্বাচন করতে
- রেলওয়ে স্টেশনে যাওয়া বা আসার বাস সংযোগ খুঁজতে
- বাস + ট্রেন, মেট্রো + ট্রেন মিলিয়ে মাল্টি-মোডাল যাত্রা পরিকল্পনা করতে

🔗 **[koyjabo.com](https://koyjabo.com)**

---

*সূত্র: বাংলাদেশ রেলওয়ে গেজেট বিজ্ঞপ্তি, কার্যকর ২৫ মে ২০২৬।*

#বাংলাদেশরেলওয়ে #প্রবীণছাড় #সুবর্ণকার্ড #TrainTicket #KoyJabo #সবারজন্যযাতায়াত
`},{id:"usa-canada-bangladeshi-travel-guide-visit-bangladesh-2026",slug:"usa-canada-bangladeshi-travel-guide-visit-bangladesh-2026",title:"USA & Canada Bangladeshi Travel Guide: Visiting Bangladesh from North America (2026)",bnTitle:"আমেরিকা ও কানাডা প্রবাসী বাংলাদেশিদের জন্য দেশ ভ্রমণ গাইড ২০২৬",excerpt:"For the 300,000+ Bangladeshis living in the USA and Canada — this guide covers the best routes to fly home, visa tips, travel costs, and how to make the most of your visit to Bangladesh in 2026.",bnExcerpt:"আমেরিকা ও কানাডায় বসবাসকারী বাংলাদেশিদের জন্য বিমান টিকিট, ভিসা, খরচ ও ভ্রমণ টিপস।",coverImage:"/blog/ai-traffic-system-dhaka.jpg",author:"KoyJabo Team",publishDate:"2026-05-14",readTime:"10 min read",keywords:["USA Bangladeshi visit Bangladesh","Canada Bangladeshi travel guide Bangladesh","New York to Dhaka flight","Toronto to Dhaka flight","cheapest flight USA to Bangladesh","Bangladeshi American travel","North America Bangladesh flight","NRB USA travel Bangladesh","Bangladesh from New York","Bangladesh from Toronto","Bengali American travel guide","Bangladeshi diaspora USA travel","visit Bangladesh from America","Jackson Heights Bangladesh","Bronx Bangladeshi community travel"],category:"Travel Guide",content:`
The United States and Canada are home to over **350,000 Bangladeshis** — concentrated in New York City (Jackson Heights, the Bronx, Jamaica), Detroit, Los Angeles, Washington DC, Toronto, and Montreal.

Whether you're a first-generation immigrant visiting family, a 1.5-gen visiting for the first time as an adult, or a second-generation American-Bangladeshi discovering your roots — this guide is for you.

---

## ✈️ Flights from North America to Bangladesh

### From New York (JFK / EWR)

| Airline | Route | Approx. Return Price | Duration |
|---|---|---|---|
| Qatar Airways | JFK → Doha → Dhaka | $900–1,400 | 17–19h |
| Emirates | JFK → Dubai → Dhaka | $950–1,500 | 18–20h |
| Turkish Airlines | JFK → Istanbul → Dhaka | $800–1,200 | 20–22h |
| Etihad Airways | JFK → Abu Dhabi → Dhaka | $900–1,400 | 18–20h |
| Biman Bangladesh | Various routing | $1,000–1,600 | 18–22h |

### From Washington DC (IAD / DCA)
- Similar airlines and prices to New York; add ~$50–100 for smaller hub
- Turkish Airlines via Istanbul often the best value

### From Toronto (YYZ)
| Airline | Approx. Return Price | Duration |
|---|---|---|
| Qatar Airways | CAD 1,100–1,700 | 17–20h |
| Emirates | CAD 1,200–1,800 | 18–21h |
| Turkish Airlines | CAD 1,000–1,500 | 20–23h |

### From Los Angeles (LAX)
- Japan Airlines via Tokyo to Dhaka: $1,000–1,500 return (shorter flight time)
- Qatar/Emirates via Middle East: $950–1,400

> **Best booking tip:** Use Google Flights, set a price alert 3–4 months before travel. Prices are cheapest October–January (off-peak). Jackson Heights travel agents sometimes offer group rates for Eid season.

---

## 🛂 Visa Information

**US & Canada passport holders:**
- **Visa on Arrival** at Dhaka airport — $50 USD, valid 30 days
- No pre-approval needed; simply join the VOA queue on arrival
- Extendable to 60 days at the Department of Immigration, Dhaka

**Bangladesh-origin US/Canada citizens (Dual nationals):**
- If you hold a Bangladesh passport, use it — no visa needed, faster immigration
- If you only have US/Canadian passport and lost Bangladesh citizenship — apply for No Visa Required (NVR) endorsement (longer process, check Bangladesh embassy)

---

## 💱 Currency & Spending

**Exchange rates (approximate):**
- $1 USD ≈ ৳120–125
- CAD 1 ≈ ৳89–95

**How to access BDT:**
- US/Canadian Visa and Mastercard cards work at ATMs of Standard Chartered, HSBC, Dutch Bangla Bank, BRAC Bank
- Airport exchange counters for initial cash

**Cost of living reference:**
| Item | BDT | USD Equivalent |
|---|---|---|
| Restaurant meal (local) | ৳150–300 | $1.25–2.50 |
| Restaurant meal (nice) | ৳500–1,500 | $4–12 |
| Hotel (Dhaka, mid-range) | ৳3,000–6,000/night | $24–50 |
| Hotel (Dhaka, 5-star) | ৳15,000–30,000/night | $120–240 |
| CNG/rickshaw short trip | ৳50–200 | $0.40–1.65 |

Bangladesh is extremely affordable for North American visitors. $50/day covers accommodation, meals, and transport comfortably.

---

## 🗺️ What to Do: Bangladesh for American-Bangladeshis

### Dhaka: The Capital City
- **Metro Rail (MRT-6):** Take the metro — it's clean, air-conditioned, and a completely different experience from old Dhaka
- **Old Dhaka:** Ahsan Manzil (Pink Palace), Lalbagh Fort, Sadarghat boat terminal, 400-year-old Mosque City
- **Hatirjheel:** Beautiful lake park, cafes, evening walks
- **Food:** Try biryani at Haji's in Old Dhaka, fuchka and chotpoti at Dhanmondi Lake

### Cox's Bazar
- The world's longest natural sea beach (120km)
- 5.5 hours from Dhaka by AC bus or 45 minutes by domestic flight
- **Inani Beach** for cleaner, quieter sand
- **Saint Martin Island** for snorkeling (November–April only)

### Sylhet
- Tea gardens, Jaflong crystal river, Ratargul swamp forest
- Many NYC Bangladeshis trace roots here

### Sundarbans
- UNESCO World Heritage mangrove forest
- Royal Bengal Tigers
- 2-day boat tour from Khulna (now easier with Padma Bridge — 4h from Dhaka)

---

## 📱 Navigate Bangladesh with KoyJabo

**[KoyJabo.com](https://koyjabo.com)** is free, works offline, and covers all transport in Bangladesh:
- 200+ Dhaka bus routes with maps
- MRT Line 6 metro fares and schedules
- Intercity bus/train planner
- AI travel assistant in English and Bengali

No app download needed — works in any mobile browser. Install to home screen for offline use.

---

## 📸 For Second-Generation Bangladeshi Americans

If you're visiting Bangladesh as an American-born Bangladeshi (ABD) for the first time or first time as an adult:

1. **Language:** Your parents' Bangla dialect will be understood everywhere. English is spoken by educated Bangladeshis in Dhaka
2. **Culture shock:** Traffic, heat, and crowds can be overwhelming — be patient with yourself
3. **Food safety:** Eat at established restaurants; drink bottled water; ice is generally fine in hotels
4. **Safety:** Bangladesh is generally safe for visitors; petty theft is the main concern in crowds
5. **Phone:** Your US SIM may roam; a local SIM from the airport (৳150–300) is cheaper for a long stay
6. **Power:** Bangladesh uses Type D/G sockets (220V); US plugs (Type A/B) need an adapter

---

## 🛍️ Shopping: What to Bring Back

| Item | Why Buy in Bangladesh |
|---|---|
| Muslin fabric / jamdani sari | UNESCO-listed, origin country |
| Hilsa fish (frozen, exported) | National fish, distinct flavour |
| Nakshi kantha (quilt embroidery) | Traditional folk art |
| Brass/bronze crafts | Old Dhaka artisan work |
| Dried spices (turmeric, mustard) | Fresher and cheaper than US stores |
| Jute products | Eco-friendly, sustainable |

---

*Plan your Bangladesh journey with [KoyJabo.com](https://koyjabo.com) — Bangladesh's #1 free transport guide.*
`,bnContent:`
আমেরিকা ও কানাডায় বসবাসকারী ৩৫০,০০০+ বাংলাদেশি প্রবাসীর জন্য এই গাইড।

---

## ✈️ উত্তর আমেরিকা থেকে বাংলাদেশে আসার উপায়

- কাতার এয়ারওয়েজ (JFK → ঢাকা): $৯০০–১,৪০০
- এমিরেটস: $৯৫০–১,৫০০
- টার্কিশ এয়ারলাইন্স: $৮০০–১,২০০

---

## 🛂 ভিসা তথ্য

মার্কিন/কানাডিয়ান পাসপোর্টধারীরা ঢাকা বিমানবন্দরে ভিসা অন অ্যারাইভাল পাবেন — $৫০ ডলার, ৩০ দিন।

---

## 💡 জানার মতো নতুন বিষয়

- মেট্রো রেল (MRT লাইন ৬): উত্তরা থেকে মতিঝিল মাত্র ৩৫ মিনিট
- পদ্মা সেতু: দক্ষিণবঙ্গে যাওয়া এখন ২–৩ ঘণ্টা কম সময়ের
- Uber/Pathao: ঢাকায় ভাড়া ঠিক করার ঝামেলা নেই

[KoyJabo.com](https://koyjabo.com) দিয়ে বাংলাদেশের সব পরিবহন তথ্য পান — বিনামূল্যে, অফলাইনে।
`}],Qr={Metro:["#1e3a8a","#3b82f6"],Intercity:["#064e3b","#10b981"],Launch:["#075985","#0ea5e9"],Tips:["#b45309","#f59e0b"],Train:["#5b21b6","#8b5cf6"],Flights:["#b91c1c","#ef4444"],Guide:["#065f46","#34d399"],News:["#1e3a8a","#6366f1"]};function Xr(a){return Qr[a]??["#374151","#6b7280"]}const Pa=jt.map(a=>{var i;const[o,d]=Xr(a.category),n=new Date(a.publishDate).toLocaleDateString("en-US",{month:"short",day:"numeric"});return{id:a.slug,titleEn:a.title,titleBn:a.bnTitle||a.title,date:n,category:a.category,readTime:a.readTime,tags:((i=a.keywords)==null?void 0:i.slice(0,3))??[],from:o,to:d,coverImage:a.coverImage||null}});function Ea({blog:a,tk:o,lang:d,onNav:t}){const n=(i,r)=>l(d,r,i);return e.jsxs("div",{onClick:()=>t("blog-detail",{slug:a.id}),style:{background:o.panel,backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",border:`1px solid ${o.line}`,borderRadius:16,overflow:"hidden",cursor:"pointer",transition:"transform 0.15s ease, box-shadow 0.15s ease"},role:"button",tabIndex:0,onKeyDown:i=>i.key==="Enter"&&t("blog-detail",{slug:a.id}),children:[e.jsxs("div",{style:{background:a.coverImage?`url(${a.coverImage}) center/cover no-repeat, linear-gradient(135deg, ${a.from} 0%, ${a.to} 100%)`:`linear-gradient(135deg, ${a.from} 0%, ${a.to} 100%)`,height:140,position:"relative",display:"flex",alignItems:"flex-end",padding:"12px 14px"},children:[e.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(0,0,0,0.5) 30%, transparent 100%)"}}),e.jsx("span",{style:{background:"rgba(0,0,0,0.35)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",borderRadius:6,padding:"3px 9px",fontFamily:c,fontSize:11,fontWeight:600,color:"#fff",letterSpacing:.3},children:a.category})]}),e.jsxs("div",{style:{padding:"16px 16px 18px"},children:[e.jsx("h3",{style:{fontFamily:d==="bn"?m:c,fontSize:14,fontWeight:700,color:o.text,margin:"0 0 8px",lineHeight:1.45},children:n(a.titleEn,a.titleBn)}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:10},children:[e.jsx("span",{style:{fontFamily:c,fontSize:11,color:o.textFaint},children:a.date}),e.jsx("span",{style:{color:o.line,fontSize:10},children:"·"}),e.jsxs("span",{style:{fontFamily:c,fontSize:11,color:o.textFaint},children:[a.readTime," ",n("read","পড়া")]})]}),e.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap"},children:a.tags.map(i=>e.jsxs("span",{style:{background:o.chipBg,borderRadius:6,padding:"2px 8px",fontFamily:c,fontSize:10,fontWeight:500,color:o.chipText},children:["#",i]},i))})]})]})}function Zr(a){const{theme:o,lang:d,device:t}=a,n=ae[o],i=t==="mobile",r=(h,u)=>l(d,u,h),s=Pa.slice(0,3),p=Pa.slice(3);return e.jsx(ne,{...a,children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto",padding:i?"0 16px 80px":"0 40px 80px"},children:[e.jsxs("div",{style:{paddingTop:32,marginBottom:28},children:[e.jsx("h1",{style:{fontFamily:m,fontSize:i?24:32,fontWeight:800,color:n.text,margin:"0 0 8px"},children:r("Blog","ব্লগ")}),e.jsx("p",{style:{fontFamily:d==="bn"?m:c,fontSize:14,color:n.textDim,margin:0},children:r("Guides, tips and transport news","গাইড, টিপস এবং পরিবহন সংবাদ")})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:i?"1fr":"repeat(3, 1fr)",gap:16,marginBottom:24},children:s.map(h=>e.jsx(Ea,{blog:h,tk:n,lang:d,onNav:a.onNav},h.id))}),e.jsx("div",{style:{marginBottom:24,display:"flex",justifyContent:"center"},children:e.jsx(ee,{tk:n,lang:d,kind:i?"mob-banner":"mid-rect"})}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:i?"1fr":"repeat(3, 1fr)",gap:16,marginBottom:40},children:p.map(h=>e.jsx(Ea,{blog:h,tk:n,lang:d,onNav:a.onNav},h.id))}),e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:e.jsx(ee,{tk:n,lang:d,kind:i?"mob-banner":"leaderboard"})})]})})}function es(a,o,d){if(!a)return null;const t=d?m:c,n=a.split(`
`),i=[];let r=0;const s=p=>p.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((u,f)=>u.startsWith("**")&&u.endsWith("**")?e.jsx("strong",{style:{color:o.text},children:u.slice(2,-2)},f):u.startsWith("*")&&u.endsWith("*")?e.jsx("em",{children:u.slice(1,-1)},f):u);for(;r<n.length;){const p=n[r];if(!p.trim()){r++;continue}if(p.startsWith("# "))i.push(e.jsx("h1",{style:{fontFamily:t,fontSize:22,fontWeight:800,color:o.text,margin:"20px 0 10px"},children:s(p.slice(2))},r));else if(p.startsWith("## "))i.push(e.jsx("h2",{style:{fontFamily:t,fontSize:18,fontWeight:700,color:o.text,margin:"18px 0 8px"},children:s(p.slice(3))},r));else if(p.startsWith("### "))i.push(e.jsx("h3",{style:{fontFamily:t,fontSize:15,fontWeight:700,color:o.text,margin:"14px 0 6px"},children:s(p.slice(4))},r));else if(p.startsWith("- ")||p.startsWith("* ")){const h=[];for(;r<n.length&&(n[r].startsWith("- ")||n[r].startsWith("* "));)h.push(e.jsx("li",{style:{marginBottom:4},children:s(n[r].slice(2))},r)),r++;i.push(e.jsx("ul",{style:{fontFamily:t,fontSize:14,color:o.textDim,lineHeight:1.7,paddingLeft:20,margin:"8px 0"},children:h},`ul-${r}`));continue}else i.push(e.jsx("p",{style:{fontFamily:t,fontSize:14,color:o.textDim,lineHeight:1.8,margin:"10px 0"},children:s(p)},r));r++}return i}const Gt={Metro:["#1e3a8a","#3b82f6"],Intercity:["#064e3b","#10b981"],Launch:["#075985","#0ea5e9"],Tips:["#b45309","#f59e0b"],Train:["#5b21b6","#8b5cf6"],Flights:["#b91c1c","#ef4444"],Guide:["#065f46","#34d399"]};function ts(a){var C;const{theme:o,device:d,lang:t,onNav:n,params:i}=a,r=ae[o],s=d==="mobile",p=(i==null?void 0:i.slug)??"",h=jt.find(I=>I.slug===p||I.id===p)??jt[0],[u,f]=Gt[h.category]??["#1e3a8a","#4338ca"],v=t==="bn"&&h.bnTitle?h.bnTitle:h.title,k=t==="bn"&&h.bnContent?h.bnContent:h.content,j=t==="bn"&&h.bnExcerpt?h.bnExcerpt:h.excerpt,A=t==="bn"?m:c,z=jt.filter(I=>I.category===h.category&&I.slug!==h.slug).slice(0,3);return e.jsx(ne,{...a,children:e.jsxs("div",{style:{padding:s?"16px 16px 48px":"28px 40px 48px",maxWidth:800,margin:"0 auto"},children:[e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",marginBottom:12,flexWrap:"wrap"},children:[e.jsx(Ne,{tk:r,tone:"primary",children:h.category}),e.jsxs("span",{style:{fontFamily:c,fontSize:12,color:r.textFaint},children:[h.publishDate," · ",h.readTime]}),e.jsxs("button",{onClick:()=>{var I;return(I=navigator.clipboard)==null?void 0:I.writeText(window.location.href)},style:{marginLeft:"auto",background:"none",border:0,color:r.textFaint,cursor:"pointer",fontFamily:c,fontSize:12,display:"flex",alignItems:"center",gap:4},children:["🔗 ",l(t,"শেয়ার","Share")]})]}),e.jsxs("div",{style:{height:s?200:340,background:h.coverImage?`url(${h.coverImage}) center/cover no-repeat, linear-gradient(135deg,${u},${f})`:`linear-gradient(135deg,${u},${f})`,borderRadius:18,marginBottom:16,display:"flex",alignItems:"flex-end",padding:20,position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(0,0,0,0.75) 40%, transparent 100%)",borderRadius:18}}),e.jsx("h1",{style:{fontFamily:A,fontWeight:700,fontSize:s?20:26,color:"#fff",margin:0,textShadow:"0 2px 8px rgba(0,0,0,0.4)",lineHeight:1.3,position:"relative",zIndex:1},children:v})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:20},children:[e.jsx("div",{style:{width:36,height:36,borderRadius:999,background:`linear-gradient(135deg,${u},${f})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontFamily:c,fontWeight:700,fontSize:14},children:"KJ"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:c,fontWeight:600,fontSize:13,color:r.text},children:h.author}),e.jsx("div",{style:{fontFamily:c,fontSize:11,color:r.textFaint},children:h.publishDate})]}),e.jsx("div",{style:{marginLeft:"auto",display:"flex",gap:6,flexWrap:"wrap"},children:(C=h.keywords)==null?void 0:C.slice(0,3).map(I=>e.jsx("span",{style:{background:r.panelMuted,border:`1px solid ${r.line}`,borderRadius:999,padding:"3px 8px",fontFamily:c,fontSize:11,color:r.textDim},children:I},I))})]}),j&&e.jsx("div",{style:{background:r.panelMuted,border:`1px solid ${r.line}`,borderRadius:12,padding:"14px 16px",marginBottom:20,fontFamily:A,fontSize:14,color:r.textDim,lineHeight:1.7,fontStyle:"italic"},children:j}),e.jsx(ee,{tk:r,lang:t,kind:s?"mob-banner":"leaderboard"}),e.jsx("div",{style:{marginTop:20},children:es(k,r,t==="bn")}),e.jsx(ee,{tk:r,lang:t,kind:s?"mob-banner":"leaderboard"}),z.length>0&&e.jsxs("div",{style:{marginTop:32},children:[e.jsx("div",{style:{fontFamily:c,fontSize:13,fontWeight:700,color:r.textFaint,textTransform:"uppercase",letterSpacing:.5,marginBottom:14},children:l(t,"আরও পড়ুন","Related posts")}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:z.map(I=>{var w,D;return e.jsxs("div",{onClick:()=>n("blog-detail",{slug:I.slug}),style:{background:r.panel,border:`1px solid ${r.line}`,borderRadius:14,padding:"12px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:12},children:[e.jsx("div",{style:{width:40,height:40,borderRadius:10,background:`linear-gradient(135deg,${((w=Gt[I.category])==null?void 0:w[0])??"#1e3a8a"},${((D=Gt[I.category])==null?void 0:D[1])??"#3b82f6"})`,flexShrink:0}}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:t==="bn"?m:c,fontSize:13,fontWeight:600,color:r.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:t==="bn"&&I.bnTitle?I.bnTitle:I.title}),e.jsxs("div",{style:{fontFamily:c,fontSize:11,color:r.textFaint,marginTop:2},children:[I.publishDate," · ",I.readTime]})]})]},I.id)})})]})]})})}const as=a=>[{q:l(a,"গুলশান থেকে মতিঝিল কোন বাসে যাবো?","Which bus goes from Gulshan to Motijheel?"),a:l(a,"গ্রীন লাইন, হানিফ, বিআরটিসি এই রুটে চলে। গ্রীন লাইন দ্রুততম — ৪৮ মিনিট, ভাড়া ৳৬০। গুলশান ২ বাস স্টপ থেকে উঠুন।","Green Line, Hanif, BRTC go this route. Green Line is fastest at 48 min, fare ৳60. Take from Gulshan 2 bus stop.")},{q:l(a,"উত্তরা থেকে মতিঝিল মেট্রো ভাড়া কত?","How much is Metro fare from Uttara to Motijheel?"),a:l(a,"পুরো যাত্রায় ৳১০০। কন্টাক্টলেস কার্ড বা টোকেন। স্টেশনে কিনুন।","৳100 for full journey. Contactless card or token. Buy at station.")},{q:l(a,"ঢাকা থেকে কক্সবাজার কীভাবে যাবো?","How to go Cox's Bazar from Dhaka?"),a:l(a,"বাস (গ্রীন লাইন/হানিফ): ৳৯০০–২৫০০, রাতের বাস, ১০–১২ ঘণ্টা। ট্রেন (কক্সবাজার এক্সপ্রেস): ৳২০০–১২০০, ৯ ঘণ্টা। ফ্লাইট (বিমান/ইউএস বাংলা): ৳৪৫০০+, ৫৫ মিনিট।","Bus (Green Line/Hanif): ৳900–2500, overnight, 10–12h. Train (Cox's Bazar Express): ৳200–1200, 9h. Flight (Biman/US-Bangla): ৳4500+, 55 min.")},{q:l(a,"সদরঘাট লঞ্চের সময়সূচি কী?","What is Sadarghat launch schedule?"),a:l(a,"বরিশাল, ভোলা, পটুয়াখালীর লঞ্চ সন্ধ্যা ৭–১০টায় ছাড়ে। পরদিন ভোরে পৌঁছায়।","Launches for Barisal, Bhola, Patuakhali depart 7–10PM. Arrive next morning.")},{q:l(a,"ট্রেনের টিকেট অনলাইনে কীভাবে কিনবো?","How to buy train ticket online?"),a:l(a,"eticket.railway.gov.bd ভিজিট করুন। কই যাবো শুধু তথ্য দেখায় — টিকেট বিক্রি করে না।","Visit eticket.railway.gov.bd. KoyJabo shows info only — purchase from official site.")},{q:l(a,"কই যাবো কি অফলাইনে কাজ করে?","Does KoyJabo work offline?"),a:l(a,"হ্যাঁ! PWA হিসেবে ইনস্টল করুন। রুট, ভাড়া, সময়সূচি ইন্টারনেট ছাড়াও কাজ করে।","Yes! Install as PWA. Routes, fares, schedules work without internet.")},{q:l(a,"কই যাবো কি বিনামূল্যে?","Is KoyJabo free?"),a:l(a,"১০০% বিনামূল্যে চিরকালের জন্য। অ-হস্তক্ষেপকারী বিজ্ঞাপন দ্বারা সমর্থিত।","100% free forever. Supported by non-intrusive ads.")},{q:l(a,"ভুল তথ্য কীভাবে জানাবো?","How do I report wrong information?"),a:l(a,"আমাদের সাথে koyjabo.com/contact পেজে যোগাযোগ করুন।","Contact us at koyjabo.com/contact.")}];function is(a){const{theme:o,device:d,lang:t}=a,n=ae[o],i=d==="mobile",[r,s]=b.useState(null),[p,h]=b.useState(""),u=as(t).filter(f=>!p||f.q.toLowerCase().includes(p.toLowerCase())||f.a.toLowerCase().includes(p.toLowerCase()));return e.jsx(ne,{...a,children:e.jsxs("div",{style:{padding:i?"16px 16px 48px":"28px 40px 48px",maxWidth:760,margin:"0 auto"},children:[e.jsx("h1",{style:{fontFamily:m,fontWeight:700,fontSize:i?22:28,color:n.text,marginBottom:6},children:l(t,"প্রশ্নোত্তর","Q & A")}),e.jsx("p",{style:{fontFamily:m,fontSize:14,color:n.textDim,marginBottom:20},children:l(t,"সাধারণ প্রশ্নের উত্তর","Answers to common questions")}),e.jsxs("div",{style:{background:n.inputBg,border:`1px solid ${n.line}`,borderRadius:14,padding:"12px 14px",display:"flex",gap:10,marginBottom:20},children:[e.jsx("span",{style:{fontSize:16},children:"🔍"}),e.jsx("input",{value:p,onChange:f=>h(f.target.value),placeholder:l(t,"প্রশ্ন খুঁজুন...","Search questions..."),style:{flex:1,background:"transparent",border:0,color:n.text,fontFamily:m,fontSize:14,outline:"none"}})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:u.map((f,v)=>e.jsxs("div",{style:{background:n.panel,border:`1px solid ${r===v?n.primary:n.line}`,borderRadius:14,overflow:"hidden",transition:"border-color .2s"},children:[e.jsxs("button",{onClick:()=>s(k=>k===v?null:v),style:{width:"100%",background:"transparent",border:0,padding:"16px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,cursor:"pointer",textAlign:"left"},children:[e.jsx("span",{style:{fontFamily:m,fontWeight:600,fontSize:15,color:n.text,flex:1},children:f.q}),e.jsx("span",{style:{fontFamily:c,fontWeight:700,fontSize:18,color:r===v?n.primary:n.textFaint,transition:"color .2s,transform .2s",display:"inline-block",transform:r===v?"rotate(45deg)":"none"},children:"+"})]}),r===v&&e.jsx("div",{style:{padding:"0 18px 16px",fontFamily:m,fontSize:14,color:n.textDim,lineHeight:1.7,borderTop:`1px solid ${n.line}`,paddingTop:12},children:f.a})]},v))}),u.length===0&&e.jsx("div",{style:{textAlign:"center",padding:40,color:n.textFaint,fontFamily:m},children:l(t,"কোনো ফলাফল নেই।","No results found.")}),e.jsx(ee,{tk:n,lang:t,kind:i?"mob-banner":"leaderboard"})]})})}function ns(a){const{theme:o,device:d,lang:t}=a,n=ae[o],i=d==="mobile",r=(u=16)=>({background:n.panel,border:`1px solid ${n.line}`,borderRadius:u,padding:16}),[s,p]=b.useState("General"),h=["General","Bug Report","Feature Request","Content Error"];return e.jsx(ne,{...a,children:e.jsxs("div",{style:{padding:i?"16px 16px 48px":"28px 40px 48px",maxWidth:700,margin:"0 auto"},children:[e.jsx("h1",{style:{fontFamily:m,fontWeight:700,fontSize:i?22:28,color:n.text,marginBottom:6},children:l(t,"যোগাযোগ করুন","Contact Us")}),e.jsx("p",{style:{fontFamily:m,fontSize:14,color:n.textDim,marginBottom:24},children:l(t,"আমরা ২৪-৪৮ ঘণ্টার মধ্যে উত্তর দিই।","We respond within 24-48 hours.")}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:i?"1fr":"1fr 1fr",gap:12,marginBottom:24},children:[{e:"📧",l:"Email",v:"koyjabo@gmail.com",c:n.primarySoft,fc:n.primary},{e:"📘",l:"Facebook",v:"facebook.com/koyjabo",c:"#1877f22a",fc:"#1877f2"},{e:"💼",l:"LinkedIn",v:"linkedin.com/company/koy-jabo",c:n.chipBg,fc:n.text},{e:"📝",l:l(t,"ভুল তথ্য জানান","Report issue"),v:"Contact form",c:n.accentSoft,fc:n.accent}].map((u,f)=>e.jsxs("div",{style:{...r(14),background:u.c,borderColor:u.fc+"33",display:"flex",alignItems:"center",gap:12,cursor:"pointer"},children:[e.jsx("span",{style:{fontSize:24},children:u.e}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:c,fontWeight:700,fontSize:13,color:u.fc},children:u.l}),e.jsx("div",{style:{fontFamily:c,fontSize:12,color:n.textDim},children:u.v})]})]},f))}),e.jsxs("div",{style:{...r(20)},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:16,color:n.text,marginBottom:16},children:l(t,"বার্তা পাঠান","Send a message")}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontFamily:c,fontSize:11,fontWeight:700,color:n.textFaint,textTransform:"uppercase",letterSpacing:1,display:"block",marginBottom:6},children:l(t,"নাম","Name")}),e.jsx("input",{placeholder:l(t,"আপনার নাম","Your name"),style:{width:"100%",background:n.inputBg,border:`1px solid ${n.line}`,borderRadius:12,padding:"12px 14px",color:n.text,fontFamily:m,fontSize:14,outline:"none",boxSizing:"border-box"}})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontFamily:c,fontSize:11,fontWeight:700,color:n.textFaint,textTransform:"uppercase",letterSpacing:1,display:"block",marginBottom:6},children:"Email"}),e.jsx("input",{type:"email",placeholder:"your@email.com",style:{width:"100%",background:n.inputBg,border:`1px solid ${n.line}`,borderRadius:12,padding:"12px 14px",color:n.text,fontFamily:c,fontSize:14,outline:"none",boxSizing:"border-box"}})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontFamily:c,fontSize:11,fontWeight:700,color:n.textFaint,textTransform:"uppercase",letterSpacing:1,display:"block",marginBottom:6},children:l(t,"বিষয়","Subject")}),e.jsx("select",{value:s,onChange:u=>p(u.target.value),style:{width:"100%",background:n.inputBg,border:`1px solid ${n.line}`,borderRadius:12,padding:"12px 14px",color:n.text,fontFamily:c,fontSize:14,outline:"none",boxSizing:"border-box"},children:h.map(u=>e.jsx("option",{children:u},u))})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontFamily:c,fontSize:11,fontWeight:700,color:n.textFaint,textTransform:"uppercase",letterSpacing:1,display:"block",marginBottom:6},children:l(t,"বার্তা","Message")}),e.jsx("textarea",{placeholder:l(t,"আপনার বার্তা লিখুন...","Write your message..."),style:{width:"100%",minHeight:120,background:n.inputBg,border:`1px solid ${n.line}`,borderRadius:12,padding:"12px 14px",color:n.text,fontFamily:m,fontSize:14,outline:"none",resize:"vertical",boxSizing:"border-box"}})]}),e.jsxs("button",{style:{background:n.primary,color:n.primaryInk,border:0,borderRadius:12,padding:"13px 20px",fontFamily:c,fontWeight:700,fontSize:14,cursor:"pointer"},children:[l(t,"পাঠান","Send message")," →"]})]})]}),e.jsx(ee,{tk:n,lang:t,kind:i?"mob-banner":"leaderboard"})]})})}const os=[{version:"1.2.0",date:"2026-04-30",type:"minor",features:["New AI-Driven Traffic Awareness Blog Post","Global Multi-language Notification System (Toasts)","Enhanced Community Gallery with instant deletion feedback"],bnFeatures:["নতুন AI-ভিত্তিক ট্রাফিক সচেতনতা বিষয়ক ব্লগ পোস্ট","গ্লোবাল বহুভাষিক নোটিফিকেশন সিস্টেম (Toasts)","উন্নত কমিউনিটি গ্যালারি ও তাৎক্ষণিক ডিলিট ফিডব্যাক"],fixes:["Resolved image deletion errors on specific browsers","Fixed path resolution issues in build environment","Standardized success messages across all forms"],bnFixes:["নির্দিষ্ট ব্রাউজারে ইমেজ ডিলিট করার সমস্যা সমাধান","বিল্ড এনভায়রনমেন্টে পাথ রেজোলিউশন সমস্যা সমাধান","সব ফর্মের জন্য একই মানের সাকসেস মেসেজ নিশ্চিতকরণ"],improvements:["Better mobile responsiveness for notification toasts","Optimized image loading in blog sections","Improved cross-language consistency for UI labels"],bnImprovements:["মোবাইল ডিভাইসে নোটিফিকেশন টোস্টের উন্নত রেসপন্সিভনেস","ব্লগ সেকশনে ইমেজ লোডিং অপ্টিমাইজেশন","ইউজার ইন্টারফেস লেবেলে ভাষার উন্নত সামঞ্জস্য"]},{version:"1.1.5",date:"2026-04-28",type:"patch",features:["Integrated Train Photo Gallery","Added Bus & Train ratings system"],bnFeatures:["ট্রেন ফটো গ্যালারি যুক্ত করা হয়েছে","বাস ও ট্রেনের জন্য রেটিং সিস্টেম যুক্ত করা হয়েছে"],fixes:["Fixed minor UI glitches in mobile navigation","Resolved search result duplication in intercity guide"],bnFixes:["মোবাইল নেভিগেশনে ছোটখাটো ইউআই সমস্যা সমাধান","আন্তঃনগর গাইডে সার্চ রেজাল্ট ডুপ্লিকেট হওয়া সমাধান"],improvements:["Updated 64 district transport guides with better landmarks","Enhanced search speed for bus routes"],bnImprovements:["৬৪ জেলার ট্রান্সপোর্ট গাইডে নতুন ল্যান্ডমার্ক যুক্ত করা হয়েছে","বাস রুট খোঁজার গতি বৃদ্ধি করা হয়েছে"]}],rs=[{v:"v1.6.0",date:"Jun 20, 2026",items:["Cloudflare Workers AI (Llama 3.3 70B) — smarter answers","GPS-based location detection for AI routing","Route direction fix: destination always correctly detected","Direct buses shown first in route results","Human-friendly route format with 💡 reasoning","Transport knowledge layer with verified source labels","Location consent modal + Settings location toggle"]},{v:"v1.5.2",date:"Jun 17, 2026",items:["Fixed footer overlap on install app page for mobile devices","Removed live chat, hotline, and GitHub issues from contact page"]},{v:"v1.5.1",date:"Jun 15, 2026",items:["Fixed blog post URL routing to show detail page on direct navigation","Fix blog navigation and remove ad placeholder text"]},{v:"v1.5.0",date:"Jun 12, 2026",items:["Full futuristic UI redesign with glassmorphism and neon animations","Added 3D animated vehicle illustrations","Improved ad system across all pages"]},{v:"v1.4.0",date:"May 28, 2026",items:["New: Domestic Flights hub (4 airlines, 8 airports)","Flight info for Biman, US-Bangla, Novoair, Air Astra"]},{v:"v1.3.0",date:"May 15, 2026",items:["New: Launch & Steamer hub (Sadarghat terminal)","Cabin class info and tonight's launches"]},{v:"v1.2.0",date:"May 1, 2026",items:["New: Train hub (Bangladesh Railway, 5 classes, PNR check)","Added Cox's Bazar Express and popular trains"]},{v:"v1.1.0",date:"Apr 15, 2026",items:["New: Metro Rail MRT-6 full hub (17 stations)","Station map, fares, tokens, Rapid Pass info"]},{v:"v1.0.0",date:"Apr 1, 2026",items:["Initial launch — Local Bus routes + AI Assistant","Bilingual (বাংলা/English) support from day one","PWA offline support"]}],ss=os.map(a=>({v:`v${a.version}`,date:new Date(a.date).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),items:[...a.features||[],...a.fixes||[],...a.improvements||[]],bnItems:[...a.bnFeatures||[],...a.bnFixes||[],...a.bnImprovements||[]]})),Jt=[...rs,...ss];function ls(a){const{theme:o,device:d,lang:t}=a,n=ae[o],i=d==="mobile";return e.jsx(ne,{...a,children:e.jsxs("div",{style:{padding:i?"16px 16px 48px":"28px 40px 48px",maxWidth:760,margin:"0 auto"},children:[e.jsx("h1",{style:{fontFamily:m,fontWeight:700,fontSize:i?22:28,color:n.text,marginBottom:6},children:l(t,"রিলিজ নোট","Release Notes")}),e.jsx("p",{style:{fontFamily:m,fontSize:14,color:n.textDim,marginBottom:24},children:l(t,"কই যাবো কী নতুন আনলো","What's new in KoyJabo")}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:16},children:Jt.map((r,s)=>{var p;return e.jsxs("div",{style:{display:"flex",gap:16},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0},children:[e.jsx("div",{style:{width:12,height:12,borderRadius:999,background:s===0?n.primary:n.line,marginTop:4,boxShadow:s===0?`0 0 0 4px ${n.primarySoft}`:""}}),s<Jt.length-1&&e.jsx("div",{style:{width:2,flex:1,background:n.line,marginTop:6}})]}),e.jsxs("div",{style:{flex:1,paddingBottom:s<Jt.length-1?16:0},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:8},children:[e.jsx("span",{style:{background:s===0?n.primary:n.panelMuted,color:s===0?n.primaryInk:n.textDim,fontFamily:c,fontWeight:800,fontSize:12,padding:"4px 10px",borderRadius:999},children:r.v}),e.jsx("span",{style:{fontFamily:c,fontSize:12,color:n.textFaint},children:r.date})]}),e.jsx("ul",{style:{margin:0,padding:"0 0 0 14px"},children:(t==="bn"&&((p=r.bnItems)!=null&&p.length)?r.bnItems:r.items).map((h,u)=>e.jsx("li",{style:{fontFamily:m,fontSize:13,color:n.textDim,lineHeight:1.7,marginBottom:2},children:h},u))})]})]},s)})}),e.jsx(ee,{tk:n,lang:t,kind:i?"mob-banner":"leaderboard"})]})})}function ds(a){const{theme:o,device:d,lang:t}=a,n=ae[o],i=d==="mobile",r=(h=16)=>({background:n.panel,border:`1px solid ${n.line}`,borderRadius:h,padding:16}),s=[l(t,"আমরা কী তথ্য সংগ্রহ করি","Data we collect"),l(t,"কীভাবে ব্যবহার করি","How we use it"),l(t,"তৃতীয় পক্ষ","Third parties"),l(t,"আপনার অধিকার","Your rights"),l(t,"কুকিজ","Cookies"),l(t,"যোগাযোগ","Contact")],p=[{h:s[0],body:l(t,"আমরা আপনার অবস্থান (আপনার অনুমতিতে), অনুসন্ধানের ইতিহাস এবং ডিভাইস তথ্য সংগ্রহ করি।","We collect your location (with permission), search history, and device info.")},{h:s[1],body:l(t,"রুট উন্নত করতে এবং প্রাসঙ্গিক বিজ্ঞাপন দেখাতে ব্যবহার করা হয়।","Used to improve routes and show relevant ads.")},{h:s[2],body:l(t,"Google AdSense এবং Firebase Analytics ব্যবহার করা হয়।","Google AdSense and Firebase Analytics are used.")}];return e.jsx(ne,{...a,children:e.jsxs("div",{style:{padding:i?"16px 16px 48px":"28px 40px 48px",maxWidth:760,margin:"0 auto"},children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,fontWeight:700,color:n.textFaint,letterSpacing:1.4,textTransform:"uppercase",marginBottom:8},children:l(t,"আপডেট করা হয়েছে জুন ২০২৬","Updated June 2026")}),e.jsx("h1",{style:{fontFamily:m,fontWeight:700,fontSize:i?22:28,color:n.text,marginBottom:8},children:l(t,"গোপনীয়তা নীতি","Privacy Policy")}),e.jsx("p",{style:{fontFamily:m,fontSize:14,color:n.textDim,lineHeight:1.7,marginBottom:20},children:l(t,"কই যাবো আপনার গোপনীয়তাকে গুরুত্ব দেয়। এই নীতি ব্যাখ্যা করে আমরা কোন তথ্য সংগ্রহ করি, কেন করি, এবং কীভাবে রক্ষা করি।","KoyJabo takes your privacy seriously. This policy explains what we collect, why, and how we keep it safe.")}),e.jsxs("div",{style:{...r(14),marginBottom:20},children:[e.jsx("div",{style:{fontFamily:c,fontSize:10,fontWeight:700,color:n.textFaint,letterSpacing:1.4,textTransform:"uppercase",marginBottom:10},children:l(t,"বিষয়সূচি","On this page")}),s.map((h,u)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"6px 0"},children:[e.jsx("span",{style:{fontFamily:c,fontSize:11,fontWeight:600,color:n.textFaint},children:String(u+1).padStart(2,"0")}),e.jsx("span",{style:{fontFamily:m,fontSize:13,color:n.primary,fontWeight:600},children:h})]},u))]}),p.map((h,u)=>e.jsxs("section",{style:{marginBottom:20},children:[e.jsxs("h2",{style:{fontFamily:m,fontWeight:700,fontSize:17,color:n.text,margin:"0 0 10px",display:"flex",alignItems:"center",gap:8},children:[e.jsxs("span",{style:{width:24,height:24,borderRadius:8,background:n.primarySoft,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:c,fontWeight:700,fontSize:12,color:n.primary},children:["0",u+1]}),h.h]}),e.jsx("p",{style:{fontFamily:m,fontSize:14,color:n.textDim,lineHeight:1.7,margin:0},children:h.body})]},u)),e.jsxs("div",{style:{...r(14),background:n.primarySoft,borderColor:n.primary},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:n.primary,marginBottom:6},children:l(t,"আরও পড়ুন","Read full policy")}),e.jsx("div",{style:{fontFamily:m,fontSize:13,color:n.textDim},children:l(t,"সম্পূর্ণ নীতির জন্য আমাদের সাথে যোগাযোগ করুন: koyjabo@gmail.com","For the full policy contact us at: koyjabo@gmail.com")})]}),e.jsx(ee,{tk:n,lang:t,kind:i?"mob-banner":"leaderboard"})]})})}function cs(a){const{theme:o,device:d,lang:t}=a,n=ae[o],i=d==="mobile",r=(h=16)=>({background:n.panel,border:`1px solid ${n.line}`,borderRadius:h,padding:16}),s=[l(t,"তথ্য-মাত্র সেবা","Information only"),l(t,"ব্যবহারকারীর আচরণ","User conduct"),l(t,"মেধাস্বত্ব","Intellectual property"),l(t,"দায়বদ্ধতা সীমাবদ্ধতা","Limitation of liability"),l(t,"পরিবর্তন","Changes"),l(t,"যোগাযোগ","Contact")],p=[{h:s[0],body:l(t,"কই যাবো শুধুমাত্র তথ্য প্রদান করে — কোনো টিকেট বিক্রি করে না। টিকেটের জন্য সরাসরি অপারেটরের সাইটে যান।","KoyJabo provides information only — no ticket sales. Purchase tickets directly at operator websites or counters.")},{h:s[1],body:l(t,"আপনি এই সেবা আইনি উদ্দেশ্যে ব্যবহার করতে সম্মত। স্প্যাম বা ক্ষতিকর বিষয়বস্তু নিষিদ্ধ।","You agree to use this service for lawful purposes. Spam or harmful content is prohibited.")},{h:s[2],body:l(t,"কই যাবো এবং এর লোগো নিবন্ধিত ট্রেডমার্ক। কোড MIT লাইসেন্সের অধীনে।","KoyJabo and its logo are trademarks. Code is under MIT license.")}];return e.jsx(ne,{...a,children:e.jsxs("div",{style:{padding:i?"16px 16px 48px":"28px 40px 48px",maxWidth:760,margin:"0 auto"},children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,fontWeight:700,color:n.textFaint,letterSpacing:1.4,textTransform:"uppercase",marginBottom:8},children:l(t,"আপডেট করা হয়েছে জুন ২০২৬","Updated June 2026")}),e.jsx("h1",{style:{fontFamily:m,fontWeight:700,fontSize:i?22:28,color:n.text,marginBottom:8},children:l(t,"সেবার শর্তাবলি","Terms of Service")}),e.jsx("p",{style:{fontFamily:m,fontSize:14,color:n.textDim,lineHeight:1.7,marginBottom:20},children:l(t,"কই যাবো ব্যবহার করে আপনি এই শর্তাবলিতে সম্মত হন। অনুগ্রহ করে মনোযোগ দিয়ে পড়ুন।","By using KoyJabo, you agree to these terms. Please read them carefully.")}),e.jsxs("div",{style:{...r(14),marginBottom:20},children:[e.jsx("div",{style:{fontFamily:c,fontSize:10,fontWeight:700,color:n.textFaint,letterSpacing:1.4,textTransform:"uppercase",marginBottom:10},children:l(t,"বিষয়সূচি","On this page")}),s.map((h,u)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"6px 0"},children:[e.jsx("span",{style:{fontFamily:c,fontSize:11,fontWeight:600,color:n.textFaint},children:String(u+1).padStart(2,"0")}),e.jsx("span",{style:{fontFamily:m,fontSize:13,color:n.primary,fontWeight:600},children:h})]},u))]}),p.map((h,u)=>e.jsxs("section",{style:{marginBottom:20},children:[e.jsxs("h2",{style:{fontFamily:m,fontWeight:700,fontSize:17,color:n.text,margin:"0 0 10px",display:"flex",alignItems:"center",gap:8},children:[e.jsxs("span",{style:{width:24,height:24,borderRadius:8,background:n.amberSoft,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:c,fontWeight:700,fontSize:12,color:n.amber},children:["0",u+1]}),h.h]}),e.jsx("p",{style:{fontFamily:m,fontSize:14,color:n.textDim,lineHeight:1.7,margin:0},children:h.body})]},u)),e.jsxs("div",{style:{...r(14),background:n.amberSoft,borderColor:n.amber},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:n.amber,marginBottom:6},children:l(t,"প্রশ্ন আছে?","Have questions?")}),e.jsx("div",{style:{fontFamily:m,fontSize:13,color:n.textDim},children:"koyjabo@gmail.com"})]}),e.jsx(ee,{tk:n,lang:t,kind:i?"mob-banner":"leaderboard"})]})})}function hs(a){const{theme:o,device:d,lang:t}=a,n=ae[o],i=d==="mobile",r=(u=16)=>({background:n.panel,border:`1px solid ${n.line}`,borderRadius:u,padding:16}),[s,p]=b.useState("android"),h={android:[{icon:"🌐",t:l(t,"Chrome-এ koyjabo.com খুলুন","Open koyjabo.com in Chrome")},{icon:"⋮",t:l(t,"ডানে উপরে ⋮ মেনুতে ট্যাপ করুন","Tap ⋮ menu (top right)")},{icon:"➕",t:l(t,'"হোম স্ক্রিনে যোগ করুন" ট্যাপ করুন','Tap "Add to Home Screen"')},{icon:"✅",t:l(t,'"ইনস্টল" ট্যাপ করুন','Tap "Install"')}],ios:[{icon:"🌐",t:l(t,"Safari-এ koyjabo.com খুলুন","Open koyjabo.com in Safari")},{icon:"📤",t:l(t,"নিচে শেয়ার বাটনে ট্যাপ করুন","Tap Share button (bottom center)")},{icon:"📱",t:l(t,'"হোম স্ক্রিনে যোগ করুন" ট্যাপ করুন','Scroll down, tap "Add to Home Screen"')},{icon:"✅",t:l(t,'"যোগ করুন" ট্যাপ করুন','Tap "Add"')}],desktop:[{icon:"🌐",t:l(t,"Chrome বা Edge-এ koyjabo.com খুলুন","Open koyjabo.com in Chrome or Edge")},{icon:"⊕",t:l(t,"অ্যাড্রেস বারে ইনস্টল আইকনে ক্লিক করুন","Click install icon (⊕) in address bar")},{icon:"💾",t:l(t,'"ইনস্টল করুন" ক্লিক করুন','Click "Install"')},{icon:"🖥️",t:l(t,"অ্যাপ নিজস্ব উইন্ডোতে খুলবে","App opens in its own window")}]};return e.jsx(ne,{...a,children:e.jsxs("div",{style:{padding:i?"16px 16px 48px":"28px 40px 48px",maxWidth:700,margin:"0 auto"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",marginBottom:32,padding:"24px 20px"},children:[e.jsx("div",{style:{animation:"kjFloatY 2.2s ease-in-out infinite",marginBottom:16},children:e.jsx(Ve,{tk:n,size:72})}),e.jsx("h1",{style:{fontFamily:m,fontWeight:700,fontSize:i?24:32,color:n.text,margin:"0 0 8px"},children:l(t,"কই যাবো ইনস্টল করুন","Install KoyJabo")}),e.jsx("p",{style:{fontFamily:m,fontSize:15,color:n.textDim,margin:0,maxWidth:400},children:l(t,"কোনো অ্যাপ স্টোর নেই · সরাসরি ব্রাউজার থেকে ইনস্টল করুন","No app store needed · install directly from your browser")})]}),e.jsx("div",{style:{display:"flex",gap:4,background:n.panelMuted,borderRadius:14,padding:4,marginBottom:24},children:["android","ios","desktop"].map(u=>e.jsxs("button",{onClick:()=>p(u),style:{flex:1,padding:"10px",border:0,borderRadius:10,background:s===u?n.panel:"transparent",color:s===u?n.text:n.textDim,fontFamily:c,fontWeight:600,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6},children:[u==="android"?"🤖":u==="ios"?"🍎":"💻",u==="android"?"Android":u==="ios"?"iPhone":"Desktop"]},u))}),e.jsxs("div",{style:{...r(20),marginBottom:24},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:15,color:n.text,marginBottom:16},children:l(t,"কীভাবে ইনস্টল করবেন","How to install")}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:14},children:h[s].map((u,f)=>e.jsxs("div",{style:{display:"flex",gap:14,alignItems:"flex-start"},children:[e.jsx("div",{style:{width:40,height:40,borderRadius:12,background:n.primarySoft,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0},children:u.icon}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{width:20,height:20,borderRadius:999,background:n.primary,color:n.primaryInk,display:"inline-flex",alignItems:"center",justifyContent:"center",fontFamily:c,fontWeight:800,fontSize:11,marginBottom:4},children:f+1}),e.jsx("div",{style:{fontFamily:m,fontSize:14,color:n.text,lineHeight:1.5},children:u.t})]})]},f))})]}),e.jsxs("div",{style:{marginBottom:24},children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:15,color:n.text,marginBottom:12},children:l(t,"ইনস্টলের সুবিধা","Why install?")}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:i?"1fr 1fr":"repeat(4,1fr)",gap:10},children:[{e:"📶",t:l(t,"অফলাইনে কাজ করে","Works offline")},{e:"⚡",t:l(t,"দ্রুত লোড হয়","Faster loads")},{e:"📱",t:l(t,"ফুলস্ক্রিন","Full-screen")},{e:"🔔",t:l(t,"পুশ নোটিফিকেশন","Push notifications")}].map((u,f)=>e.jsxs("div",{style:{...r(14),display:"flex",flexDirection:"column",alignItems:"center",gap:8,textAlign:"center"},children:[e.jsx("span",{style:{fontSize:28},children:u.e}),e.jsx("span",{style:{fontFamily:m,fontSize:12,color:n.textDim},children:u.t})]},f))})]}),e.jsx("div",{style:{...r(14),background:n.primarySoft,borderColor:n.primary,marginBottom:24},children:e.jsx("div",{style:{display:"grid",gridTemplateColumns:i?"1fr 1fr":"repeat(4,1fr)",gap:10},children:[l(t,"অ্যাপ স্টোর নেই","No app store"),l(t,"সবসময় আপডেট","Always updated"),l(t,"সব ফিচার","Same features"),l(t,"মাত্র ৫০০KB","Only 500KB")].map((u,f)=>e.jsxs("div",{style:{fontFamily:m,fontSize:12,color:n.primary,display:"flex",alignItems:"center",gap:6},children:["✓ ",u]},f))})}),e.jsx(ee,{tk:n,lang:t,kind:i?"mob-banner":"leaderboard"})]})})}function ps({tone:a,status:o,icon:d}){return e.jsxs("div",{style:{position:"relative",width:210,height:210,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto"},children:[e.jsx("div",{style:{position:"absolute",inset:0,borderRadius:999,background:`radial-gradient(circle, ${a}33 0%, transparent 68%)`,animation:"kjpulse 3.4s ease-in-out infinite"}}),e.jsxs("svg",{viewBox:"0 0 210 210",width:"210",height:"210",style:{position:"absolute",inset:0},children:[e.jsx("circle",{cx:"105",cy:"105",r:"80",stroke:"rgba(255,255,255,0.06)",strokeWidth:"3",fill:"none"}),e.jsx("circle",{cx:"105",cy:"105",r:"80",stroke:a,strokeWidth:"2.5",fill:"none",strokeDasharray:"3 25",strokeLinecap:"round",style:{animation:"kj-dash 1.1s linear infinite"}}),e.jsx("circle",{cx:"105",cy:"25",r:"5",fill:a})]}),e.jsx("div",{style:{width:72,height:72,borderRadius:22,background:"rgba(13,22,42,0.72)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,animation:"kjFloatY 3.8s ease-in-out infinite",position:"relative",zIndex:1},children:d}),e.jsx("div",{style:{position:"absolute",top:"18%",background:a+"22",color:a,fontFamily:c,fontWeight:800,fontSize:11,letterSpacing:3,textTransform:"uppercase",padding:"4px 12px",borderRadius:999},children:o})]})}function Nt({theme:a,lang:o,tone:d,icon:t,status:n,titleBn:i,titleEn:r,bodyBn:s,bodyEn:p,buttons:h}){const u=ae[a];return e.jsxs("div",{style:{minHeight:"100vh",background:u.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:"24px 20px",flexDirection:"column",gap:0,position:"relative",overflow:"hidden"},children:[e.jsx("div",{className:"kj-future-bg",style:{position:"absolute",inset:0,pointerEvents:"none",zIndex:0}}),e.jsxs("div",{style:{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",maxWidth:400},children:[e.jsx(ps,{tone:d,status:n,icon:t}),e.jsx("h1",{style:{fontFamily:m,fontWeight:700,fontSize:28,color:u.text,margin:"24px 0 12px",letterSpacing:-.4,textWrap:"balance"},children:l(o,i,r)}),e.jsx("p",{style:{fontFamily:m,fontSize:15,color:u.textDim,lineHeight:1.65,margin:"0 0 28px",maxWidth:280,textWrap:"pretty"},children:l(o,s,p)}),e.jsx("div",{style:{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"},children:h.map((f,v)=>e.jsx("button",{onClick:f.onClick,style:{background:f.primary?d:"transparent",color:f.primary?"#fff":d,border:`1px solid ${d}`,borderRadius:14,padding:"13px 22px",fontFamily:c,fontWeight:700,fontSize:14,cursor:"pointer",...f.primary?{boxShadow:`0 6px 20px -8px ${d}`}:{}},children:l(o,f.labelBn,f.labelEn)},v))})]})]})}function us({theme:a,lang:o,onHome:d}){return e.jsx(Nt,{theme:a,lang:o,tone:ae[a].primary,icon:"🔍",status:"404",titleBn:"পেজ পাওয়া যায়নি",titleEn:"Page Not Found",bodyBn:"আপনি যে রুটটি খুঁজছেন সেটি বিদ্যমান নেই।",bodyEn:"The route you're looking for doesn't exist.",buttons:[{labelBn:"হোমে যান",labelEn:"Go Home",primary:!0,onClick:d},{labelBn:"পিছনে",labelEn:"Go Back"}]})}function ms({theme:a,lang:o}){return e.jsx(Nt,{theme:a,lang:o,tone:ae[a].accent,icon:"⚡",status:"500",titleBn:"সার্ভার ত্রুটি",titleEn:"Server Error",bodyBn:"আমাদের পাশ থেকে কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।",bodyEn:"Something went wrong on our end. Try again.",buttons:[{labelBn:"আবার চেষ্টা",labelEn:"Retry",primary:!0},{labelBn:"হোমে যান",labelEn:"Go Home"}]})}function gs({theme:a,lang:o}){return e.jsx(Nt,{theme:a,lang:o,tone:ae[a].primary,icon:"📶",status:"OFFLINE",titleBn:"ইন্টারনেট নেই",titleEn:"No Connection",bodyBn:"আপনি অফলাইনে আছেন। সেভ করা রুট এখনও কাজ করছে!",bodyEn:"You're offline. Saved routes still work!",buttons:[{labelBn:"আবার চেষ্টা",labelEn:"Try Again",primary:!0},{labelBn:"অফলাইন ব্রাউজ করুন",labelEn:"Browse Offline"}]})}function fs({theme:a,lang:o}){return e.jsx(Nt,{theme:a,lang:o,tone:ae[a].amber,icon:"⚙️",status:"503",titleBn:"রক্ষণাবেক্ষণ চলছে",titleEn:"Under Maintenance",bodyBn:"কই যাবো এখন রক্ষণাবেক্ষণের জন্য বন্ধ। শীঘ্রই ফিরে আসছি।",bodyEn:"KoyJabo is down for maintenance. Check back soon.",buttons:[{labelBn:"00:45:00 পরে চেষ্টা করুন",labelEn:"Back in 00:45:00",primary:!0}]})}const La={BG:{name:{bn:"বিমান বাংলাদেশ",en:"Biman Bangladesh"},dep:"07:15",arr:"08:15",dur:"1h 0m",stop:"Nonstop",fare:"4,499",seats:9,col:["#006a4e","#10b981"],rating:4.2,reviews:1240,aircraft:"Boeing 737-800",website:"biman.com.bd",phone:"13600",baggage:{bn:"20kg চেকড + 7kg কেবিন",en:"20kg checked + 7kg cabin"},amenities:[{e:"🍽️",bn:"খাবার",en:"Meal"},{e:"❄️",bn:"AC",en:"AC"},{e:"🔌",bn:"USB চার্জার",en:"USB charger"},{e:"🎬",bn:"বিনোদন",en:"IFE"},{e:"🛟",bn:"লাইফ জ্যাকেট",en:"Life jacket"}],cabins:[{cls:{bn:"বিজনেস",en:"Business"},fare:"12,500",col:"#7c3aed"},{cls:{bn:"ইকোনমি",en:"Economy"},fare:"4,499",col:"#10b981"}]},BS:{name:{bn:"ইউএস-বাংলা",en:"US-Bangla"},dep:"09:40",arr:"10:45",dur:"1h 5m",stop:"Nonstop",fare:"4,199",seats:14,col:["#0c4a6e","#0ea5e9"],rating:4.5,reviews:2310,aircraft:"ATR 72-600",website:"us-bangla.com",phone:"09612-333111",baggage:{bn:"20kg চেকড + 7kg কেবিন",en:"20kg checked + 7kg cabin"},amenities:[{e:"🍿",bn:"স্ন্যাকস",en:"Snacks"},{e:"❄️",bn:"AC",en:"AC"},{e:"🔌",bn:"USB চার্জার",en:"USB charger"},{e:"📶",bn:"WiFi",en:"WiFi"},{e:"🛟",bn:"লাইফ জ্যাকেট",en:"Life jacket"}],cabins:[{cls:{bn:"বিজনেস",en:"Business"},fare:"11,500",col:"#7c3aed"},{cls:{bn:"ইকোনমি প্লাস",en:"Economy Plus"},fare:"6,500",col:"#0ea5e9"},{cls:{bn:"ইকোনমি",en:"Economy"},fare:"4,199",col:"#10b981"}],note:{bn:"সর্বোচ্চ রেটিং · সবচেয়ে বেশি যাত্রী বেছে নেন",en:"Highest rated · most passengers choose"}},VQ:{name:{bn:"নোভোএয়ার",en:"NOVOAIR"},dep:"12:20",arr:"13:25",dur:"1h 5m",stop:"Nonstop",fare:"4,650",seats:6,col:["#b45309","#f59e0b"],rating:4.3,reviews:980,aircraft:"ATR 72-500",website:"flynovoair.com",phone:"01777-700700",baggage:{bn:"20kg চেকড + 5kg কেবিন",en:"20kg checked + 5kg cabin"},amenities:[{e:"🍿",bn:"স্ন্যাকস",en:"Snacks"},{e:"❄️",bn:"AC",en:"AC"},{e:"🔌",bn:"USB চার্জার",en:"USB charger"},{e:"🛟",bn:"লাইফ জ্যাকেট",en:"Life jacket"}],cabins:[{cls:{bn:"বিজনেস",en:"Business"},fare:"12,000",col:"#7c3aed"},{cls:{bn:"ইকোনমি",en:"Economy"},fare:"4,650",col:"#f59e0b"}]},"2A":{name:{bn:"এয়ার আস্ট্রা",en:"Air Astra"},dep:"16:05",arr:"17:10",dur:"1h 5m",stop:"Nonstop",fare:"3,990",seats:3,col:["#7c3aed","#a855f7"],rating:4.1,reviews:410,aircraft:"ATR 72-600",website:"airastra.com",phone:"16578",baggage:{bn:"15kg চেকড + 5kg কেবিন",en:"15kg checked + 5kg cabin"},amenities:[{e:"🍿",bn:"স্ন্যাকস",en:"Snacks"},{e:"❄️",bn:"AC",en:"AC"},{e:"🛟",bn:"লাইফ জ্যাকেট",en:"Life jacket"}],cabins:[{cls:{bn:"সেভার",en:"Saver"},fare:"3,990",col:"#a855f7"},{cls:{bn:"ইকোনমি",en:"Economy"},fare:"4,500",col:"#7c3aed"}],note:{bn:"সবচেয়ে সস্তা ভাড়া · নতুন এয়ারলাইন",en:"Cheapest fare · newest airline"}}};function ys(a){const{theme:o,device:d,lang:t,params:n,onNav:i}=a,r=ae[o],s=d==="mobile",p=(n==null?void 0:n.code)??"BS",h=La[p]??La.BS,u=(n==null?void 0:n.flightNo)||`${p}001`,f=(n==null?void 0:n.dep)||h.dep,v=(n==null?void 0:n.arr)||h.arr,k=(n==null?void 0:n.dur)||h.dur,j=(n==null?void 0:n.fromIATA)||"DAC",A=(n==null?void 0:n.toIATA)||"CXB",z=(n==null?void 0:n.fromName)||"Dhaka (Shahjalal)",C=(n==null?void 0:n.toName)||"Cox's Bazar",I=n!=null&&n.fare?parseInt(n.fare).toLocaleString():h.fare,w=Fn(),[D,B]=b.useState("info"),H=(P=16)=>({background:r.panel,border:`1px solid ${r.line}`,borderRadius:16,padding:P}),U=[{key:"info",bn:"ফ্লাইট তথ্য",en:"Flight info"},{key:"cabins",bn:"কেবিন ক্লাস",en:"Cabin classes"},{key:"amenities",bn:"সুবিধা",en:"Amenities"},{key:"book",bn:"টিকিট কিনুন",en:"Book ticket"}],q=`linear-gradient(135deg,${h.col[0]},${h.col[1]})`;return e.jsx(ne,{...a,children:e.jsxs("div",{style:{padding:s?"0 0 80px":"0 0 48px"},children:[e.jsxs("div",{style:{background:q,padding:s?"24px 20px":"32px 48px",color:"#fff"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16,marginBottom:16},children:[e.jsx("div",{style:{width:56,height:56,borderRadius:16,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:c,fontWeight:800,fontSize:18},children:p}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:s?20:26},children:l(t,h.name.bn,h.name.en)}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,marginTop:4},children:[e.jsx(Dt,{value:h.rating,size:11}),e.jsx("span",{style:{fontFamily:c,fontWeight:700,fontSize:12},children:h.rating}),e.jsxs("span",{style:{fontFamily:c,fontSize:11,opacity:.75},children:["(",h.reviews," ",l(t,"রিভিউ","reviews"),")"]})]})]})]}),e.jsxs("div",{style:{background:"rgba(255,255,255,0.15)",borderRadius:14,padding:"14px 18px",display:"flex",alignItems:"center",gap:12},children:[e.jsxs("div",{style:{textAlign:"center",flex:1},children:[e.jsx("div",{style:{fontFamily:c,fontWeight:800,fontSize:22},children:f}),e.jsx("div",{style:{fontFamily:c,fontSize:12,opacity:.9,fontWeight:700},children:j}),e.jsx("div",{style:{fontFamily:c,fontSize:11,opacity:.7},children:z.split("(")[0].trim()})]}),e.jsxs("div",{style:{flexShrink:0,textAlign:"center"},children:[e.jsx("div",{style:{height:2,background:"rgba(255,255,255,0.5)",borderRadius:999,margin:"8px 0",width:40}}),e.jsxs("div",{style:{fontFamily:c,fontSize:11,opacity:.9,fontWeight:700},children:[k," · ",h.stop]}),e.jsx("div",{style:{fontSize:16,marginTop:2},children:"✈️"})]}),e.jsxs("div",{style:{textAlign:"center",flex:1},children:[e.jsx("div",{style:{fontFamily:c,fontWeight:800,fontSize:22},children:v}),e.jsx("div",{style:{fontFamily:c,fontSize:12,opacity:.9,fontWeight:700},children:A}),e.jsx("div",{style:{fontFamily:c,fontSize:11,opacity:.7},children:C.split("(")[0].trim()})]})]}),h.note&&e.jsxs("div",{style:{marginTop:10,fontFamily:m,fontSize:12,background:"rgba(255,255,255,0.18)",borderRadius:999,padding:"5px 14px",display:"inline-block"},children:["★ ",l(t,h.note.bn,h.note.en)]})]}),e.jsxs("div",{style:{padding:s?"16px 16px":"24px 48px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:10},children:[e.jsxs("div",{children:[e.jsxs("span",{style:{fontFamily:c,fontSize:12,color:r.textFaint},children:[l(t,"শুরু থেকে","Starts from")," "]}),e.jsxs("span",{style:{fontFamily:c,fontWeight:800,fontSize:26,color:r.text},children:["৳ ",I]}),e.jsx("div",{style:{fontFamily:c,fontSize:11,color:r.textFaint},children:l(t,"অফিসিয়াল সাইটে যাচাই করুন","verify on official site")})]}),e.jsxs("div",{style:{background:h.seats<=5?"#ff2a6d22":r.primarySoft,border:`1px solid ${h.seats<=5?"#ff2a6d":r.primary}`,borderRadius:999,padding:"6px 14px",fontFamily:c,fontWeight:700,fontSize:12,color:h.seats<=5?"#ff2a6d":r.primary},children:[h.seats," ",l(t,"আসন বাকি","seats left")]})]}),e.jsx("div",{style:{display:"flex",gap:6,marginBottom:16,overflowX:"auto",paddingBottom:4},children:U.map(P=>e.jsx("button",{onClick:()=>B(P.key),style:{...ye(r),whiteSpace:"nowrap",background:D===P.key?r.primary:r.panelMuted,color:D===P.key?r.primaryInk:r.text,borderColor:D===P.key?r.primary:r.line,fontWeight:D===P.key?700:500},children:l(t,P.bn,P.en)},P.key))}),D==="info"&&e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:e.jsxs("div",{style:H(),children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:r.text,marginBottom:12},children:l(t,"ফ্লাইট বিস্তারিত","Flight details")}),[{l:l(t,"ফ্লাইট নম্বর","Flight No"),v:u},{l:l(t,"রুট","Route"),v:`${j} → ${A} · ${z.split("(")[0].trim()} → ${C.split("(")[0].trim()}`},{l:l(t,"ছাড়বে","Departs"),v:`${f} · ${z}`},{l:l(t,"পৌঁছাবে","Arrives"),v:`${v} · ${C}`},{l:l(t,"সময়","Duration"),v:`${k} · ${l(t,h.stop,h.stop)}`},{l:l(t,"বিমান","Aircraft"),v:h.aircraft},{l:l(t,"লাগেজ","Baggage"),v:l(t,h.baggage.bn,h.baggage.en)}].map((P,W)=>e.jsxs("div",{style:{display:"flex",gap:12,padding:"9px 0",borderTop:W?`1px dashed ${r.line}`:""},children:[e.jsx("div",{style:{fontFamily:c,fontSize:12,color:r.textFaint,minWidth:90},children:P.l}),e.jsx("div",{style:{fontFamily:m,fontSize:13,color:r.text,fontWeight:600},children:P.v})]},W))]})}),D==="cabins"&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[h.cabins.map((P,W)=>e.jsxs("div",{style:{...H(14),display:"flex",alignItems:"center",gap:14},children:[e.jsx("div",{style:{width:40,height:40,borderRadius:12,background:`${P.col}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20},children:"💺"}),e.jsx("div",{style:{flex:1},children:e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:r.text},children:l(t,P.cls.bn,P.cls.en)})}),e.jsxs("div",{style:{fontFamily:c,fontWeight:800,fontSize:16,color:P.col},children:["৳ ",P.fare]})]},W)),e.jsx("div",{style:{...H(12),background:r.amberSoft,borderColor:r.amber},children:e.jsxs("div",{style:{fontFamily:m,fontSize:12,color:r.amber},children:["ℹ️ ",l(t,"চূড়ান্ত ভাড়া এয়ারলাইনের অফিসিয়াল সাইটে যাচাই করুন। ভাড়া পরিবর্তন হতে পারে।","Final fares vary — always verify on the official airline website.")]})})]}),D==="amenities"&&e.jsxs("div",{style:H(),children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:r.text,marginBottom:12},children:l(t,"বিমানের সুবিধাসমূহ","In-flight amenities")}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(100px,1fr))",gap:10},children:h.amenities.map((P,W)=>e.jsxs("div",{style:{background:r.panelMuted,border:`1px solid ${r.line}`,borderRadius:12,padding:"12px 10px",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:22,marginBottom:6},children:P.e}),e.jsx("div",{style:{fontFamily:m,fontSize:12,color:r.text,fontWeight:600},children:l(t,P.bn,P.en)})]},W))})]}),D==="book"&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsxs("div",{style:H(),children:[e.jsx("div",{style:{fontFamily:m,fontWeight:700,fontSize:14,color:r.text,marginBottom:12},children:l(t,"টিকিট কোথায় পাবেন","Where to buy tickets")}),[{e:"🌐",l:l(t,"অফিসিয়াল ওয়েবসাইট","Official website"),v:h.website},{e:"📞",l:l(t,"হেল্পলাইন","Helpline"),v:h.phone},{e:"🏢",l:l(t,"বিমানবন্দর কাউন্টার","Airport counter"),v:l(t,"শাহজালাল বিমানবন্দর, ঢাকা","Shahjalal Airport, Dhaka")}].map((P,W)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderTop:W?`1px dashed ${r.line}`:""},children:[e.jsx("div",{style:{width:36,height:36,borderRadius:10,background:r.primarySoft,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0},children:P.e}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,color:r.textFaint},children:P.l}),e.jsx("div",{style:{fontFamily:m,fontWeight:600,fontSize:13,color:r.text},children:P.v})]})]},W))]}),e.jsxs("button",{onClick:()=>i("flights-hub"),style:{background:q,color:"#fff",border:0,borderRadius:14,padding:"14px 20px",fontFamily:c,fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8},children:["✈️ ",l(t,"সব ফ্লাইট দেখুন","View all flights")]})]}),!w&&e.jsx(ee,{tk:r,lang:t,kind:s?"mob-banner":"mid-rect"})]})]})})}const bs=[{heading:{bn:"এক্সপ্লোর",en:"Explore"},links:[{bn:"হোম",en:"Home",route:"home"},{bn:"লোকাল বাস",en:"Local Bus",route:"bus-hub"},{bn:"মেট্রো",en:"Metro",route:"metro-hub"},{bn:"ট্রেন",en:"Train",route:"train-hub"},{bn:"আন্তঃজেলা",en:"Intercity",route:"intercity"},{bn:"লঞ্চ",en:"Launch",route:"launch-hub"},{bn:"ফ্লাইট",en:"Flights",route:"flights-hub"},{bn:"ভাড়া",en:"Fare",route:"fare"},{bn:"AI সহায়ক",en:"AI Assistant",route:"ai"}]},{heading:{bn:"অ্যাকাউন্ট",en:"Account"},links:[{bn:"প্রোফাইল",en:"Profile",route:"profile"},{bn:"সেভড",en:"Favorites",route:"favorites"},{bn:"ইতিহাস",en:"History",route:"history"},{bn:"সেটিংস",en:"Settings",route:"settings"},{bn:"সাইন ইন",en:"Sign In",route:"signin"}]},{heading:{bn:"কোম্পানি",en:"Company"},links:[{bn:"কেন KoyJabo",en:"Why KoyJabo",route:"why"},{bn:"আমাদের সম্পর্কে",en:"About",route:"about"},{bn:"ব্লগ",en:"Blog",route:"blogs"},{bn:"QA",en:"QA",route:"qa"},{bn:"যোগাযোগ",en:"Contact",route:"contact"},{bn:"রিলিজ",en:"Release",route:"release"}]},{heading:{bn:"আইনি",en:"Legal"},links:[{bn:"গোপনীয়তা",en:"Privacy",route:"privacy"},{bn:"শর্তাবলী",en:"Terms",route:"terms"}]}];function xs({open:a,onClose:o,onNav:d,theme:t,lang:n,activeRoute:i,isLoggedIn:r}){const s=ae[t],p=h=>{d(h),o()};return e.jsxs(e.Fragment,{children:[e.jsx("div",{onClick:o,style:{position:"fixed",inset:0,zIndex:99,background:"rgba(0,0,0,0.5)",backdropFilter:a?"blur(4px)":"none",WebkitBackdropFilter:a?"blur(4px)":"none",opacity:a?1:0,pointerEvents:a?"auto":"none",transition:"opacity 0.3s cubic-bezier(.2,.8,.2,1)"}}),e.jsx("div",{onClick:o,style:{position:"fixed",inset:0,zIndex:100,overflow:"hidden",overscrollBehavior:"contain",pointerEvents:a?"auto":"none"},children:e.jsxs("div",{onClick:h=>h.stopPropagation(),style:{position:"absolute",top:0,right:0,bottom:0,width:"min(360px, 86vw)",background:s.panel,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderLeft:`1px solid ${s.line}`,display:"flex",flexDirection:"column",transform:a?"translateX(0)":"translateX(105%)",transition:"transform 0.3s cubic-bezier(.2,.8,.2,1)",height:"100dvh",maxHeight:"100dvh",overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"16px 20px",borderBottom:`1px solid ${s.line}`,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx(Ve,{tk:s,size:32}),e.jsx("span",{style:{fontFamily:"'Hind Siliguri', system-ui, sans-serif",fontWeight:800,fontSize:18,background:`linear-gradient(135deg, ${s.primary} 0%, #a855f7 100%)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"},children:"KoyJabo"})]}),e.jsx("button",{onClick:o,style:{background:s.panelMuted,border:`1px solid ${s.line}`,borderRadius:999,width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:s.textDim,fontSize:18,lineHeight:1},"aria-label":l(n,"মেনু বন্ধ করুন","Close menu"),children:"×"})]}),e.jsx("div",{style:{padding:"12px 0 28px",flex:"1 1 auto",minHeight:0,overflowY:"auto",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain"},children:bs.map(h=>e.jsxs("div",{style:{marginBottom:8},children:[e.jsx("div",{style:{padding:"8px 20px 4px",fontFamily:c,fontSize:10,fontWeight:700,letterSpacing:.8,textTransform:"uppercase",color:s.textFaint},children:l(n,h.heading.bn,h.heading.en)}),h.links.filter(u=>!(u.route==="signin"&&r)).map(u=>{const f=i===u.route;return e.jsxs("button",{onClick:()=>p(u.route),style:{width:"100%",background:f?s.primarySoft:"none",border:"none",borderLeft:f?`3px solid ${s.primary}`:"3px solid transparent",padding:"11px 20px",display:"flex",alignItems:"center",gap:10,cursor:"pointer",textAlign:"left",transition:"all 0.15s"},children:[e.jsx("span",{style:{width:6,height:6,borderRadius:999,background:f?s.primary:s.line,flexShrink:0,transition:"background 0.15s"}}),e.jsx("span",{style:{flex:1,fontFamily:n==="bn"?m:c,fontSize:14,fontWeight:f?700:400,color:f?s.primary:s.text,transition:"color 0.15s"},children:l(n,u.bn,u.en)}),e.jsx("span",{style:{color:f?s.primary:s.textFaint,display:"flex",alignItems:"center"},children:e.jsx(te.arrowR,{s:14})})]},u.route)})]},h.heading.en))})]})})]})}const vs=`
@keyframes kjAiFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
@keyframes kjAiRing {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.7); opacity: 0; }
}
@keyframes kjAiThink {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
  40% { transform: scale(1); opacity: 1; }
}
@keyframes kj-ai-eye-blink {
  0%, 90%, 100% { transform: scaleY(1); }
  95% { transform: scaleY(0.1); }
}
@keyframes kj-ai-eye2-blink {
  0%, 85%, 100% { transform: scaleY(1); }
  90% { transform: scaleY(0.1); }
}
`;let $a=!1;function js(){if($a||typeof document>"u")return;const a=document.createElement("style");a.textContent=vs,document.head.appendChild(a),$a=!0}function ks({tk:a,lang:o,onNav:d}){js();const[t,n]=b.useState(!1);return e.jsxs("div",{style:{position:"fixed",right:20,bottom:90,zIndex:9998,display:"flex",alignItems:"center",gap:10},children:[e.jsx("div",{style:{background:a.panel,border:`1px solid ${a.line}`,borderRadius:10,padding:"7px 12px",fontFamily:o==="bn"?m:c,fontSize:12,fontWeight:600,color:a.text,whiteSpace:"nowrap",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",boxShadow:a.shadow,opacity:t?1:0,transform:t?"translateX(0)":"translateX(8px)",transition:"opacity 0.2s ease, transform 0.2s ease",pointerEvents:"none"},children:l(o,"AI সহায়ক · জিজ্ঞাসা করুন","AI Assistant · ask me")}),e.jsxs("div",{style:{position:"relative",flexShrink:0},children:[e.jsx("div",{style:{position:"absolute",inset:-4,borderRadius:999,border:`2px solid ${a.primary}`,animation:"kjAiRing 2.4s ease-out infinite",pointerEvents:"none"}}),e.jsx("div",{style:{position:"absolute",inset:-4,borderRadius:999,border:`2px solid ${a.accent}`,animation:"kjAiRing 2.4s ease-out infinite 1.2s",pointerEvents:"none"}}),e.jsx("div",{style:{position:"absolute",top:-12,right:-6,display:"flex",gap:3,alignItems:"flex-end",pointerEvents:"none"},children:[0,.2,.4].map((i,r)=>e.jsx("div",{style:{width:5,height:5,borderRadius:999,background:a.primary,animation:`kjAiThink 1.4s ease-in-out infinite ${i}s`}},r))}),e.jsx("button",{onClick:d,onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),"aria-label":l(o,"AI সহায়ক","AI Assistant"),style:{width:62,height:62,borderRadius:999,border:"none",cursor:"pointer",background:`linear-gradient(140deg, ${a.primary}, ${a.accent})`,display:"flex",alignItems:"center",justifyContent:"center",animation:"kjAiFloat 3.2s ease-in-out infinite",boxShadow:`0 8px 32px -8px ${a.primary}80`,position:"relative"},children:e.jsxs("svg",{width:"36",height:"36",viewBox:"0 0 36 36",fill:"none",children:[e.jsx("line",{x1:"18",y1:"4",x2:"18",y2:"10",stroke:"white",strokeWidth:"2",strokeLinecap:"round"}),e.jsx("circle",{cx:"18",cy:"3.5",r:"2",fill:"white"}),e.jsx("rect",{x:"8",y:"10",width:"20",height:"16",rx:"4",fill:"white",fillOpacity:"0.2",stroke:"white",strokeWidth:"1.5"}),e.jsx("rect",{x:"11",y:"14",width:"5",height:"5",rx:"1.5",fill:"white",style:{transformOrigin:"13.5px 16.5px",animation:"kj-ai-eye-blink 3s ease-in-out infinite"}}),e.jsx("rect",{x:"20",y:"14",width:"5",height:"5",rx:"1.5",fill:"white",style:{transformOrigin:"22.5px 16.5px",animation:"kj-ai-eye2-blink 3.5s ease-in-out infinite 0.5s"}}),e.jsx("path",{d:"M13 22 Q18 26 23 22",stroke:"white",strokeWidth:"1.5",strokeLinecap:"round",fill:"none"}),e.jsx("rect",{x:"5",y:"14",width:"3",height:"6",rx:"1.5",fill:"white",fillOpacity:"0.5"}),e.jsx("rect",{x:"28",y:"14",width:"3",height:"6",rx:"1.5",fill:"white",fillOpacity:"0.5"})]})})]})]})}const Ss=[{bn:"হোম",en:"Home",route:"home",ic:"🏠"},{bn:"লোকাল বাস",en:"Local Bus",route:"bus-hub",ic:"🚌"},{bn:"মেট্রো",en:"Metro",route:"metro-hub",ic:"🚇"},{bn:"ট্রেন",en:"Train",route:"train-hub",ic:"🚆"},{bn:"আন্তঃজেলা",en:"Intercity",route:"intercity",ic:"🧭"},{bn:"লঞ্চ",en:"Launch",route:"launch-hub",ic:"⛴️"},{bn:"ফ্লাইট",en:"Flights",route:"flights-hub",ic:"✈️"}];function ws({tk:a,lang:o,theme:d,device:t,activeRoute:n,onNav:i,onLang:r,onTheme:s,onMenu:p,user:h}){const u=t==="mobile",f=((h==null?void 0:h.displayName)||(h==null?void 0:h.username)||"KJ").slice(0,2).toUpperCase(),v={background:a.panelMuted,border:`1px solid ${a.line}`,borderRadius:999,padding:"5px 10px",fontFamily:c,fontSize:12,fontWeight:600,color:a.text,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:4,whiteSpace:"nowrap"},k={background:a.panelMuted,border:`1px solid ${a.line}`,borderRadius:999,width:36,height:36,display:"inline-flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:a.text,flexShrink:0};return e.jsx("div",{style:{position:"fixed",top:0,left:0,right:0,zIndex:200,background:a.panel,backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",borderBottom:`1px solid ${a.line}`,width:"100%",boxSizing:"border-box"},children:e.jsxs("div",{style:{padding:u?"0 12px":"0 24px",height:u?52:60,display:"flex",alignItems:"center",gap:u?8:16},children:[e.jsxs("button",{onClick:()=>i("home"),style:{background:"none",border:"none",padding:0,cursor:"pointer",display:"flex",alignItems:"center",gap:8,flexShrink:0},"aria-label":"KoyJabo Home",children:[e.jsx(Ve,{tk:a,size:u?32:36}),!u&&e.jsx("span",{style:{fontFamily:m,fontWeight:800,fontSize:18,color:a.text},children:"কই যাবো"})]}),!u&&e.jsx("nav",{style:{display:"flex",alignItems:"center",gap:1,marginLeft:"auto",marginRight:12,minWidth:0,overflowX:"auto",scrollbarWidth:"none",flexShrink:1},children:Ss.map(j=>{const A=n===j.route;return e.jsxs("button",{onClick:()=>i(j.route),style:{background:A?a.primarySoft:"none",border:`1px solid ${A?a.primary+"60":"transparent"}`,borderRadius:8,padding:"6px 7px",fontFamily:o==="bn"?m:c,fontSize:12,fontWeight:A?700:500,color:A?a.primary:a.textDim,cursor:"pointer",display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap",transition:"all 0.15s"},children:[e.jsx("span",{style:{fontSize:14},children:j.ic}),l(o,j.bn,j.en)]},j.route)})}),u&&e.jsx("div",{style:{flex:1}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,flexShrink:0},children:[!u&&(h!=null&&h.avatarUrl?e.jsx("img",{src:h.avatarUrl,alt:f,onClick:()=>i("profile"),style:{width:34,height:34,borderRadius:999,objectFit:"cover",flexShrink:0,cursor:"pointer",border:`2px solid ${a.primarySoft}`}}):e.jsx("div",{onClick:()=>i("profile"),style:{width:34,height:34,borderRadius:999,background:a.primarySoft,color:a.primaryDeep,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:c,fontWeight:700,fontSize:12,flexShrink:0,cursor:"pointer"},children:f})),!u&&e.jsx("button",{onClick:p,style:k,title:"Menu",children:e.jsx(te.menu,{s:18})}),e.jsxs("button",{onClick:r,style:v,children:[e.jsx(te.globe,{s:14}),e.jsx("span",{children:o==="bn"?"বাং":"EN"})]}),e.jsx("button",{onClick:s,style:k,"aria-label":"Toggle theme",children:d==="dark"?e.jsx(te.sun,{s:16}):e.jsx(te.moon,{s:16})}),!u&&e.jsx("button",{onClick:()=>i("install"),style:{...k,background:a.text,color:a.bg,border:"none"},title:l(o,"অ্যাপ ইনস্টল","Install app"),children:e.jsx(te.download,{s:16})}),u&&e.jsxs(e.Fragment,{children:[h!=null&&h.avatarUrl?e.jsx("img",{src:h.avatarUrl,alt:f,onClick:()=>i("profile"),style:{width:36,height:36,borderRadius:999,objectFit:"cover",flexShrink:0,cursor:"pointer",border:`2px solid ${a.primarySoft}`}}):e.jsx("div",{onClick:()=>i("profile"),style:{width:36,height:36,borderRadius:999,background:a.primarySoft,color:a.primaryDeep,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:c,fontWeight:700,fontSize:13,flexShrink:0,cursor:"pointer"},children:f}),e.jsx("button",{onClick:p,style:k,"aria-label":"Open menu",children:e.jsx(te.menu,{s:20})})]})]})]})})}const Bs=[{bn:"হোম",en:"Home",route:"home",icon:"home"},{bn:"খুঁজুন",en:"Search",route:"intercity",icon:"search"},{bn:"সেভড",en:"Saved",route:"favorites",icon:"star"},{bn:"AI",en:"AI",route:"ai",icon:"spark"},{bn:"আপনি",en:"You",route:"profile",icon:"user"}];function Cs({tk:a,lang:o,activeRoute:d,onNav:t}){return e.jsx("div",{style:{position:"fixed",bottom:0,left:0,right:0,zIndex:150,background:a.panel,backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",borderTop:`1px solid ${a.line}`,padding:"8px 10px 14px",display:"grid",gridTemplateColumns:"repeat(5, 1fr)",width:"100%",boxSizing:"border-box"},children:Bs.map(n=>{const i=d===n.route,r=te[n.icon];return e.jsxs("button",{onClick:()=>t(n.route),style:{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"4px 0 0",color:i?a.primary:a.textFaint,position:"relative"},"aria-label":l(o,n.bn,n.en),children:[i&&e.jsx("div",{style:{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:24,height:3,borderRadius:999,background:a.primary}}),e.jsx(r,{s:20}),e.jsx("span",{style:{fontFamily:o==="bn"?m:c,fontSize:10,fontWeight:i?600:400,lineHeight:1},children:l(o,n.bn,n.en)})]},n.route)})})}const Ts={home:"home","bus-hub":"search","metro-hub":"search","train-hub":"search","launch-hub":"search","flights-hub":"search",intercity:"search",ai:"ai",favorites:"saved",profile:"you",history:"you",settings:"you"},Fs=new Set(["bus-detail","train-detail","metro-detail","intercity-detail","vehicle","rate-review","metro-token","metro-pass","blog-detail","edit-profile","password","devices","results","install","flight-detail"]),sa={home:"/","bus-hub":"/local-bus","metro-hub":"/metro","train-hub":"/train","launch-hub":"/launch","flights-hub":"/air",intercity:"/intercity",fare:"/fare",ai:"/ai",favorites:"/favorites",history:"/history",profile:"/profile",settings:"/settings",signin:"/signin",signup:"/signup",why:"/why",about:"/about",blogs:"/blogs",qa:"/qa",contact:"/contact",release:"/release",privacy:"/privacy",terms:"/terms",install:"/install"},Be=a=>a.toLowerCase().trim().replace(/&/g,"and").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");function Ds(a){const o=pe.find(d=>d.id===a);return Be((o==null?void 0:o.name)||a||"bus")}function As(a,o={}){const d=new URLSearchParams;o.from&&d.set("from",Be(o.from)),o.to&&d.set("to",Be(o.to));const t=d.toString()?`?${d.toString()}`:"";if(a==="blog-detail")return`/blogs/${o.slug||"post"}`;if(a==="bus-detail")return`/bus/${Ds(o.busId)}${t}`;if(a==="metro-detail")return`/metro/${Be(o.stationId||o.id||"detail")}${t}`;if(a==="train-detail")return`/train/${Be(o.trainId||o.id||"detail")}${t}`;if(a==="intercity-detail"){const n=Be(o.operator||o.id||"detail"),i=new URLSearchParams;o.from&&i.set("from",o.from),o.to&&i.set("to",o.to);const r=i.toString()?`?${i.toString()}`:"";return`/intercity/${n}${r}`}if(a==="vehicle")return`/launch/${Be(o.id||o.name||"detail")}${t}`;if(a==="flight-detail"){const n=(o.flightNo||o.code||"flight").toLowerCase(),i=new URLSearchParams;o.fromIATA&&i.set("from",o.fromIATA),o.toIATA&&i.set("to",o.toIATA);const r=i.toString()?`?${i.toString()}`:"";return`/air/${n}${r}`}return sa[a]||"/"}function Ns(a){var o,d,t;if(["bus-detail","metro-detail","train-detail","intercity-detail","vehicle","flight-detail","blog-detail"].includes(a.route))return As(a.route,a.params||{});if(a.route==="results"){const n=new URLSearchParams;return(o=a.params)!=null&&o.from&&n.set("from",a.params.from),(d=a.params)!=null&&d.to&&n.set("to",a.params.to),(t=a.params)!=null&&t.search&&n.set("search",a.params.search),`/local-bus/results${n.toString()?`?${n.toString()}`:""}`}return sa[a.route]||"/"}function _a(){const a=window.location.pathname.replace(/\/+$/,"")||"/",o=new URLSearchParams(window.location.search),d=Object.fromEntries(o.entries());if(a.startsWith("/bus/")){const n=a.split("/")[2]||"",i=pe.find(r=>Be(r.name)===n||Be(r.id)===n);return{route:"bus-detail",params:{...d,busId:(i==null?void 0:i.id)||n}}}if(a.startsWith("/local-bus/results"))return{route:"results",params:d};if(a.startsWith("/metro/")&&a!=="/metro")return{route:"metro-detail",params:{...d,stationId:a.split("/")[2]||""}};if(a.startsWith("/train/")&&a!=="/train")return{route:"train-detail",params:{...d,trainId:a.split("/")[2]||""}};if(a.startsWith("/intercity/")&&a!=="/intercity")return{route:"intercity-detail",params:{...d,id:a.split("/")[2]||""}};if(a.startsWith("/launch/")&&a!=="/launch")return{route:"vehicle",params:{...d,id:a.split("/")[2]||""}};if(a.startsWith("/air/")&&a!=="/air")return{route:"flight-detail",params:{...d,code:(a.split("/")[2]||"").toUpperCase()}};if(a.startsWith("/blogs/")&&a!=="/blogs")return{route:"blog-detail",params:{...d,slug:a.split("/")[2]||""}};const t=Object.entries(sa).find(([,n])=>n===a);return{route:(t==null?void 0:t[0])||"home"}}function Rs(){const{user:a}=xi(),[o,d]=b.useState("dark"),[t,n]=b.useState("en"),[i,r]=b.useState(!1),[s,p]=b.useState(()=>[_a()]),[h,u]=b.useState(!1),[f,v]=b.useState("fwd"),[k,j]=b.useState(!1),[A,z]=b.useState(!0),[C,I]=b.useState(!1),[w,D]=b.useState(!0),[B,H]=b.useState(window.innerWidth),[U,q]=b.useState(!1),P=b.useRef(null),W=b.useRef(0);b.useEffect(()=>{Hi()},[]),b.useEffect(()=>{Dn()},[]),b.useEffect(()=>{const K=setTimeout(()=>{z(!1);const Q=document.getElementById("kj-splash");Q&&(Q.style.opacity="0",Q.style.visibility="hidden",setTimeout(()=>Q.remove(),600)),localStorage.getItem("kj-location-consent")||q(!0)},1400);return()=>clearTimeout(K)},[]),b.useEffect(()=>(W.current=window.setTimeout(()=>I(!0),18e4),()=>clearTimeout(W.current)),[]),b.useEffect(()=>{const K=()=>H(window.innerWidth);return window.addEventListener("resize",K),()=>window.removeEventListener("resize",K)},[]);const M=s[s.length-1],E=s.length>1,_=ae[o],L=b.useCallback((K,Q=!1)=>{const G=Ns(K),ie=`${window.location.pathname}${window.location.search}`;G!==ie&&(Q?window.history.replaceState(K,"",G):window.history.pushState(K,"",G))},[]);b.useEffect(()=>{L(s[s.length-1],!0);const K=()=>{v("back"),p([_a()]),P.current&&(P.current.scrollTop=0)};return window.addEventListener("popstate",K),()=>window.removeEventListener("popstate",K)},[]);const J=B<1024&&!i?"mobile":"desktop",R=b.useCallback((K,Q)=>{const G={route:K,params:Q};v("fwd"),j(!0),L(G),setTimeout(()=>{p(ie=>[...ie,G]),j(!1),P.current&&(P.current.scrollTop=0)},160)},[L]),N=b.useCallback(K=>{const Q={route:K};v("fwd"),L(Q),p([Q]),P.current&&(P.current.scrollTop=0)},[L]),$=b.useCallback(()=>{if(s.length<=1)return;const K=s[s.length-2];v("back"),p(Q=>Q.slice(0,-1)),L(K),P.current&&(P.current.scrollTop=0)},[s,L]);b.useEffect(()=>{const K=Q=>{(Q.key==="Escape"||Q.key==="Backspace")&&!["INPUT","TEXTAREA"].includes(Q.target.tagName)&&!Q.target.isContentEditable&&E&&(Q.preventDefault(),$())};return window.addEventListener("keydown",K),()=>window.removeEventListener("keydown",K)},[E,$]);const X=E&&Fs.has(M.route),Z={theme:o,device:J,lang:t,route:M.route,params:M.params??{},canBack:X,onBack:$,onNav:R,onNavTab:N,onLang:()=>n(K=>K==="bn"?"en":"bn"),onTheme:()=>d(K=>K==="dark"?"light":"dark"),onMenu:()=>u(!0)};Ts[M.route];const F=J==="desktop"&&B>=1500,x=w&&J==="desktop",y=J==="mobile";function g(K,Q){const G={...Z,params:Q};switch(K){case"home":return e.jsx(Bn,{...G});case"bus-hub":return e.jsx(In,{...G});case"metro-hub":return e.jsx(Mn,{...G});case"train-hub":return e.jsx(Ln,{...G});case"launch-hub":return e.jsx(_n,{...G});case"flights-hub":return e.jsx(Hn,{...G});case"ai":return e.jsx(ro,{...G});case"intercity":return e.jsx(ho,{...G});case"results":return e.jsx(fo,{...G});case"fare":return e.jsx(bo,{...G});case"intercity-detail":return e.jsx(Uo,{...G});case"bus-detail":return e.jsx(er,{...G});case"metro-detail":return e.jsx(or,{...G});case"train-detail":return e.jsx(sr,{...G});case"vehicle":return e.jsx(dr,{...G});case"flight-detail":return e.jsx(ys,{...G});case"rate-review":return e.jsx(cr,{...G});case"metro-token":return e.jsx(hr,{...G});case"metro-pass":return e.jsx(pr,{...G});case"profile":return e.jsx(mr,{...G});case"favorites":return e.jsx(gr,{...G});case"history":return e.jsx(kr,{...G});case"settings":return e.jsx(Sr,{...G});case"edit-profile":return e.jsx(Lr,{...G});case"password":return e.jsx($r,{...G});case"devices":return e.jsx(_r,{...G});case"signin":return e.jsx(Ur,{...G});case"signup":return e.jsx(Hr,{...G});case"why":return e.jsx(Gr,{...G});case"about":return e.jsx(Vr,{...G});case"blogs":return e.jsx(Zr,{...G});case"blog-detail":return e.jsx(ts,{...G});case"qa":return e.jsx(is,{...G});case"contact":return e.jsx(ns,{...G});case"release":return e.jsx(ls,{...G});case"privacy":return e.jsx(ds,{...G});case"terms":return e.jsx(cs,{...G});case"install":return e.jsx(hs,{...G});case"500":return e.jsx(ms,{theme:o,lang:t});case"offline":return e.jsx(gs,{theme:o,lang:t});case"maintenance":return e.jsx(fs,{theme:o,lang:t});default:return e.jsx(us,{theme:o,lang:t,onHome:()=>N("home")})}}const T=`${s.length}:${M.route}`,V=e.jsx("div",{className:`kj-screen kj-${f}`,style:{minHeight:"100%"},children:g(M.route,M.params)},T),O=M.route!=="ai"?e.jsx("div",{style:{position:"fixed",right:16,bottom:y?"calc(92px + env(safe-area-inset-bottom))":x?"calc(96px + env(safe-area-inset-bottom))":24,zIndex:9200,pointerEvents:"auto"},children:e.jsx(ks,{tk:_,lang:t,onNav:()=>R("ai")})}):null;let S;return S=e.jsx("div",{ref:P,style:{width:"100%",height:"100vh",overflowX:i?"auto":"hidden",overflowY:"auto",background:_.bg,position:"relative",WebkitOverflowScrolling:"touch",paddingLeft:F?184:0,paddingRight:F?184:0,paddingBottom:x?96:0,boxSizing:"border-box"},children:e.jsx("div",{style:{minWidth:i?1280:"auto"},children:V})}),e.jsxs(e.Fragment,{children:[A&&e.jsx(Ki,{}),e.jsx(ws,{tk:_,lang:t,theme:o,device:J,activeRoute:M.route,canBack:E,onBack:$,onNav:R,onLang:()=>n(K=>K==="bn"?"en":"bn"),onTheme:()=>d(K=>K==="dark"?"light":"dark"),onMenu:()=>u(!0),user:a}),y&&e.jsx(Cs,{tk:_,lang:t,activeRoute:M.route,onNav:N}),S,O,e.jsx(xs,{open:h,theme:o,lang:t,activeRoute:M.route,isLoggedIn:!!a,onClose:()=>u(!1),onNav:K=>{u(!1),R(K)}}),F&&e.jsxs(e.Fragment,{children:[e.jsx(ga,{tk:_,lang:t,side:"left"}),e.jsx(ga,{tk:_,lang:t,side:"right"})]}),x&&e.jsx(tn,{tk:_,lang:t,onClose:()=>D(!1)}),e.jsx(an,{tk:_,lang:t,open:C,onClose:()=>I(!1)}),e.jsx(Oi,{tk:_,lang:t,open:U,onNav:K=>{q(!1),R(K)},onAllow:()=>{var K;localStorage.setItem("kj-location-consent","yes"),q(!1),(K=navigator.geolocation)==null||K.getCurrentPosition(Q=>{const{latitude:G,longitude:ie}=Q.coords,oe=Object.values(ge).filter(se=>se.lat&&se.lng);let re=oe[0],he=1/0;for(const se of oe){const le=(se.lat-G)**2+(se.lng-ie)**2;le<he&&(he=le,re=se)}localStorage.setItem("kj-location-area",(re==null?void 0:re.name)||"Dhaka")},()=>{},{timeout:8e3,maximumAge:0})},onDeny:()=>{localStorage.setItem("kj-location-consent","no"),q(!1)}})]})}class Is extends Ee.Component{constructor(o){super(o),this.state={hasError:!1,error:null}}static getDerivedStateFromError(o){return{hasError:!0,error:o}}componentDidCatch(o,d){console.error("Uncaught error:",o,d)}render(){var o;return this.state.hasError?e.jsx("div",{className:"flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6",children:e.jsxs("div",{className:"bg-white p-8 rounded-2xl shadow-xl border border-kj-line max-w-md",children:[e.jsx("div",{className:"w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-8 w-8",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})})}),e.jsx("h1",{className:"text-2xl font-bold text-kj-text mb-2",children:"Something went wrong"}),e.jsx("p",{className:"text-kj-text-dim mb-6 text-sm",children:"We encountered an unexpected error. Please try reloading the page."}),e.jsx("div",{className:"bg-gray-100 p-3 rounded-lg text-left mb-6 overflow-auto max-h-32",children:e.jsx("code",{className:"text-xs text-red-600 font-mono break-all",children:((o=this.state.error)==null?void 0:o.message)||"Unknown Error"})}),e.jsx("button",{onClick:()=>window.location.reload(),className:"w-full bg-red-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-red-600 transition-colors",children:"Reload Application"})]})}):this.props.children}}const Ua=document.getElementById("root");Ua&&wi.createRoot(Ua).render(e.jsx(Ee.StrictMode,{children:e.jsx(Is,{children:e.jsx(Er,{children:e.jsx(wo,{children:e.jsx(Bo,{children:e.jsx(Rs,{})})})})})}));async function zs(){try{(await Ae(()=>import("./virtual_pwa-register-BQqNblwi.js"),__vite__mapDeps([5,6,3,4,7,8,0,1,2,9]))).registerSW({immediate:!0,onNeedRefresh(){window.location.reload()},onOfflineReady(){window.dispatchEvent(new CustomEvent("pwa-offline-ready"))}})}catch{}}zs();"serviceWorker"in navigator&&navigator.serviceWorker.addEventListener("controllerchange",()=>{window.location.reload()});export{Ae as _};
