import{_ as Pt}from"./ai-service-MJ4nxqJs.js";var we={exports:{}},ye={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xe;function gn(){return Xe||(Xe=1,(function(n){function e(h,m){var g=h.length;h.push(m);e:for(;0<g;){var v=g-1>>>1,A=h[v];if(0<i(A,m))h[v]=m,h[g]=A,g=v;else break e}}function t(h){return h.length===0?null:h[0]}function s(h){if(h.length===0)return null;var m=h[0],g=h.pop();if(g!==m){h[0]=g;e:for(var v=0,A=h.length,ce=A>>>1;v<ce;){var le=2*(v+1)-1,be=h[le],K=le+1,ue=h[K];if(0>i(be,g))K<A&&0>i(ue,be)?(h[v]=ue,h[K]=g,v=K):(h[v]=be,h[le]=g,v=le);else if(K<A&&0>i(ue,g))h[v]=ue,h[K]=g,v=K;else break e}}return m}function i(h,m){var g=h.sortIndex-m.sortIndex;return g!==0?g:h.id-m.id}if(n.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var r=performance;n.unstable_now=function(){return r.now()}}else{var a=Date,o=a.now();n.unstable_now=function(){return a.now()-o}}var c=[],l=[],f=1,u=null,d=3,w=!1,b=!1,y=!1,C=!1,O=typeof setTimeout=="function"?setTimeout:null,I=typeof clearTimeout=="function"?clearTimeout:null,R=typeof setImmediate<"u"?setImmediate:null;function N(h){for(var m=t(l);m!==null;){if(m.callback===null)s(l);else if(m.startTime<=h)s(l),m.sortIndex=m.expirationTime,e(c,m);else break;m=t(l)}}function Q(h){if(y=!1,N(h),!b)if(t(c)!==null)b=!0,$||($=!0,P());else{var m=t(l);m!==null&&x(Q,m.startTime-h)}}var $=!1,F=-1,S=5,T=-1;function D(){return C?!0:!(n.unstable_now()-T<S)}function L(){if(C=!1,$){var h=n.unstable_now();T=h;var m=!0;try{e:{b=!1,y&&(y=!1,I(F),F=-1),w=!0;var g=d;try{t:{for(N(h),u=t(c);u!==null&&!(u.expirationTime>h&&D());){var v=u.callback;if(typeof v=="function"){u.callback=null,d=u.priorityLevel;var A=v(u.expirationTime<=h);if(h=n.unstable_now(),typeof A=="function"){u.callback=A,N(h),m=!0;break t}u===t(c)&&s(c),N(h)}else s(c);u=t(c)}if(u!==null)m=!0;else{var ce=t(l);ce!==null&&x(Q,ce.startTime-h),m=!1}}break e}finally{u=null,d=g,w=!1}m=void 0}}finally{m?P():$=!1}}}var P;if(typeof R=="function")P=function(){R(L)};else if(typeof MessageChannel<"u"){var k=new MessageChannel,Z=k.port2;k.port1.onmessage=L,P=function(){Z.postMessage(null)}}else P=function(){O(L,0)};function x(h,m){F=O(function(){h(n.unstable_now())},m)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(h){h.callback=null},n.unstable_forceFrameRate=function(h){0>h||125<h?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):S=0<h?Math.floor(1e3/h):5},n.unstable_getCurrentPriorityLevel=function(){return d},n.unstable_next=function(h){switch(d){case 1:case 2:case 3:var m=3;break;default:m=d}var g=d;d=m;try{return h()}finally{d=g}},n.unstable_requestPaint=function(){C=!0},n.unstable_runWithPriority=function(h,m){switch(h){case 1:case 2:case 3:case 4:case 5:break;default:h=3}var g=d;d=h;try{return m()}finally{d=g}},n.unstable_scheduleCallback=function(h,m,g){var v=n.unstable_now();switch(typeof g=="object"&&g!==null?(g=g.delay,g=typeof g=="number"&&0<g?v+g:v):g=v,h){case 1:var A=-1;break;case 2:A=250;break;case 5:A=1073741823;break;case 4:A=1e4;break;default:A=5e3}return A=g+A,h={id:f++,callback:m,priorityLevel:h,startTime:g,expirationTime:A,sortIndex:-1},g>v?(h.sortIndex=g,e(l,h),t(c)===null&&h===t(l)&&(y?(I(F),F=-1):y=!0,x(Q,g-v))):(h.sortIndex=A,e(c,h),b||w||(b=!0,$||($=!0,P()))),h},n.unstable_shouldYield=D,n.unstable_wrapCallback=function(h){var m=d;return function(){var g=d;d=m;try{return h.apply(this,arguments)}finally{d=g}}}})(ye)),ye}var Qe;function $r(){return Qe||(Qe=1,we.exports=gn()),we.exports}/*! Capacitor: https://capacitorjs.com/ - MIT License */var te;(function(n){n.Unimplemented="UNIMPLEMENTED",n.Unavailable="UNAVAILABLE"})(te||(te={}));class ve extends Error{constructor(e,t,s){super(e),this.message=e,this.code=t,this.data=s}}const mn=n=>{var e,t;return n!=null&&n.androidBridge?"android":!((t=(e=n==null?void 0:n.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||t===void 0)&&t.bridge?"ios":"web"},pn=n=>{const e=n.CapacitorCustomPlatform||null,t=n.Capacitor||{},s=t.Plugins=t.Plugins||{},i=()=>e!==null?e.name:mn(n),r=()=>i()!=="web",a=u=>{const d=l.get(u);return!!(d!=null&&d.platforms.has(i())||o(u))},o=u=>{var d;return(d=t.PluginHeaders)===null||d===void 0?void 0:d.find(w=>w.name===u)},c=u=>n.console.error(u),l=new Map,f=(u,d={})=>{const w=l.get(u);if(w)return console.warn(`Capacitor plugin "${u}" already registered. Cannot register plugins twice.`),w.proxy;const b=i(),y=o(u);let C;const O=async()=>(!C&&b in d?C=typeof d[b]=="function"?C=await d[b]():C=d[b]:e!==null&&!C&&"web"in d&&(C=typeof d.web=="function"?C=await d.web():C=d.web),C),I=(S,T)=>{var D,L;if(y){const P=y==null?void 0:y.methods.find(k=>T===k.name);if(P)return P.rtype==="promise"?k=>t.nativePromise(u,T.toString(),k):(k,Z)=>t.nativeCallback(u,T.toString(),k,Z);if(S)return(D=S[T])===null||D===void 0?void 0:D.bind(S)}else{if(S)return(L=S[T])===null||L===void 0?void 0:L.bind(S);throw new ve(`"${u}" plugin is not implemented on ${b}`,te.Unimplemented)}},R=S=>{let T;const D=(...L)=>{const P=O().then(k=>{const Z=I(k,S);if(Z){const x=Z(...L);return T=x==null?void 0:x.remove,x}else throw new ve(`"${u}.${S}()" is not implemented on ${b}`,te.Unimplemented)});return S==="addListener"&&(P.remove=async()=>T()),P};return D.toString=()=>`${S.toString()}() { [capacitor code] }`,Object.defineProperty(D,"name",{value:S,writable:!1,configurable:!1}),D},N=R("addListener"),Q=R("removeListener"),$=(S,T)=>{const D=N({eventName:S},T),L=async()=>{const k=await D;Q({eventName:S,callbackId:k},T)},P=new Promise(k=>D.then(()=>k({remove:L})));return P.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await L()},P},F=new Proxy({},{get(S,T){switch(T){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return y?$:N;case"removeListener":return Q;default:return R(T)}}});return s[u]=F,l.set(u,{name:u,proxy:F,platforms:new Set([...Object.keys(d),...y?[b]:[]])}),F};return t.convertFileSrc||(t.convertFileSrc=u=>u),t.getPlatform=i,t.handleError=c,t.isNativePlatform=r,t.isPluginAvailable=a,t.registerPlugin=f,t.Exception=ve,t.DEBUG=!!t.DEBUG,t.isLoggingEnabled=!!t.isLoggingEnabled,t},bn=n=>n.Capacitor=pn(n),Me=bn(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),se=Me.registerPlugin;class ae{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let s=!1;this.listeners[e]||(this.listeners[e]=[],s=!0),this.listeners[e].push(t);const r=this.windowListeners[e];r&&!r.registered&&this.addWindowListener(r),s&&this.sendRetainedArgumentsForEvent(e);const a=async()=>this.removeListener(e,t);return Promise.resolve({remove:a})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,s){const i=this.listeners[e];if(!i){if(s){let r=this.retainedEventArguments[e];r||(r=[]),r.push(t),this.retainedEventArguments[e]=r}return}i.forEach(r=>r(t))}hasListeners(e){var t;return!!(!((t=this.listeners[e])===null||t===void 0)&&t.length)}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:s=>{this.notifyListeners(t,s)}}}unimplemented(e="not implemented"){return new Me.Exception(e,te.Unimplemented)}unavailable(e="not available"){return new Me.Exception(e,te.Unavailable)}async removeListener(e,t){const s=this.listeners[e];if(!s)return;const i=s.indexOf(t);this.listeners[e].splice(i,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(s=>{this.notifyListeners(e,s)}))}}const Ze=n=>encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),et=n=>n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class wn extends ae{async getCookies(){const e=document.cookie,t={};return e.split(";").forEach(s=>{if(s.length<=0)return;let[i,r]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");i=et(i).trim(),r=et(r).trim(),t[i]=r}),t}async setCookie(e){try{const t=Ze(e.key),s=Ze(e.value),i=e.expires?`; expires=${e.expires.replace("expires=","")}`:"",r=(e.path||"/").replace("path=",""),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${s||""}${i}; path=${r}; ${a};`}catch(t){return Promise.reject(t)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}se("CapacitorCookies",{web:()=>new wn});const yn=async n=>new Promise((e,t)=>{const s=new FileReader;s.onload=()=>{const i=s.result;e(i.indexOf(",")>=0?i.split(",")[1]:i)},s.onerror=i=>t(i),s.readAsDataURL(n)}),vn=(n={})=>{const e=Object.keys(n);return Object.keys(n).map(i=>i.toLocaleLowerCase()).reduce((i,r,a)=>(i[r]=n[e[a]],i),{})},_n=(n,e=!0)=>n?Object.entries(n).reduce((s,i)=>{const[r,a]=i;let o,c;return Array.isArray(a)?(c="",a.forEach(l=>{o=e?encodeURIComponent(l):l,c+=`${r}=${o}&`}),c.slice(0,-1)):(o=e?encodeURIComponent(a):a,c=`${r}=${o}`),`${s}&${c}`},"").substr(1):null,En=(n,e={})=>{const t=Object.assign({method:n.method||"GET",headers:n.headers},e),i=vn(n.headers)["content-type"]||"";if(typeof n.data=="string")t.body=n.data;else if(i.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[a,o]of Object.entries(n.data||{}))r.set(a,o);t.body=r.toString()}else if(i.includes("multipart/form-data")||n.data instanceof FormData){const r=new FormData;if(n.data instanceof FormData)n.data.forEach((o,c)=>{r.append(c,o)});else for(const o of Object.keys(n.data))r.append(o,n.data[o]);t.body=r;const a=new Headers(t.headers);a.delete("content-type"),t.headers=a}else(i.includes("application/json")||typeof n.data=="object")&&(t.body=JSON.stringify(n.data));return t};class Sn extends ae{async request(e){const t=En(e,e.webFetchExtra),s=_n(e.params,e.shouldEncodeUrlParams),i=s?`${e.url}?${s}`:e.url,r=await fetch(i,t),a=r.headers.get("content-type")||"";let{responseType:o="text"}=r.ok?e:{};a.includes("application/json")&&(o="json");let c,l;switch(o){case"arraybuffer":case"blob":l=await r.blob(),c=await yn(l);break;case"json":c=await r.json();break;case"document":case"text":default:c=await r.text()}const f={};return r.headers.forEach((u,d)=>{f[d]=u}),{data:c,headers:f,status:r.status,url:r.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}se("CapacitorHttp",{web:()=>new Sn});var tt;(function(n){n.Dark="DARK",n.Light="LIGHT",n.Default="DEFAULT"})(tt||(tt={}));var nt;(function(n){n.StatusBar="StatusBar",n.NavigationBar="NavigationBar"})(nt||(nt={}));class Cn extends ae{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}se("SystemBars",{web:()=>new Cn});const In=se("App",{web:()=>Pt(()=>Promise.resolve().then(()=>ii),void 0).then(n=>new n.AppWeb)}),xr=Object.freeze(Object.defineProperty({__proto__:null,App:In},Symbol.toStringTag,{value:"Module"})),An=()=>{};var st={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tn={SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Le=function(n,e){if(!n)throw Rn(e)},Rn=function(n){return new Error("Firebase Database ("+Tn.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kt=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++s)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Pn=function(n){const e=[];let t=0,s=0;for(;t<n.length;){const i=n[t++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=n[t++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=n[t++],a=n[t++],o=n[t++],c=((i&7)<<18|(r&63)<<12|(a&63)<<6|o&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{const r=n[t++],a=n[t++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|a&63)}}return e.join("")},Dt={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<n.length;i+=3){const r=n[i],a=i+1<n.length,o=a?n[i+1]:0,c=i+2<n.length,l=c?n[i+2]:0,f=r>>2,u=(r&3)<<4|o>>4;let d=(o&15)<<2|l>>6,w=l&63;c||(w=64,a||(d=64)),s.push(t[f],t[u],t[d],t[w])}return s.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(kt(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Pn(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<n.length;){const r=t[n.charAt(i++)],o=i<n.length?t[n.charAt(i)]:0;++i;const l=i<n.length?t[n.charAt(i)]:64;++i;const u=i<n.length?t[n.charAt(i)]:64;if(++i,r==null||o==null||l==null||u==null)throw new kn;const d=r<<2|o>>4;if(s.push(d),l!==64){const w=o<<4&240|l>>2;if(s.push(w),u!==64){const b=l<<6&192|u;s.push(b)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class kn extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Dn=function(n){const e=kt(n);return Dt.encodeByteArray(e,!0)},Mt=function(n){return Dn(n).replace(/\./g,"")},Mn=function(n){try{return Dt.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ln(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const On=()=>Ln().__FIREBASE_DEFAULTS__,Nn=()=>{if(typeof process>"u"||typeof st>"u")return;const n=st.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Fn=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Mn(n[1]);return e&&JSON.parse(e)},Bn=()=>{try{return An()||On()||Nn()||Fn()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Lt=()=>{var n;return(n=Bn())==null?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}function Ve(){try{return typeof indexedDB=="object"}catch{return!1}}function Ot(){return new Promise((n,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(s),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var r;e(((r=i.error)==null?void 0:r.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xn="FirebaseError";class W extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=xn,Object.setPrototypeOf(this,W.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ge.prototype.create)}}class ge{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},i=`${this.service}/${e}`,r=this.errors[e],a=r?jn(r,s):"Error",o=`${this.serviceName}: ${a} (${i}).`;return new W(i,o,s)}}function jn(n,e){return n.replace(Un,(t,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const Un=/\{\$([^}]+)}/g;function he(n,e){if(n===e)return!0;const t=Object.keys(n),s=Object.keys(e);for(const i of t){if(!s.includes(i))return!1;const r=n[i],a=e[i];if(it(r)&&it(a)){if(!he(r,a))return!1}else if(r!==a)return!1}for(const i of s)if(!t.includes(i))return!1;return!0}function it(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hn=1e3,Vn=2,zn=14400*1e3,Wn=.5;function Nt(n,e=Hn,t=Vn){const s=e*Math.pow(t,n),i=Math.round(Wn*s*(Math.random()-.5)*2);return Math.min(zn,s+i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(n){return n&&n._delegate?n._delegate:n}class J{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const q="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new $n;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Gn(e))try{this.getOrInitializeService({instanceIdentifier:q})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=q){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=q){return this.instances.has(e)}getOptions(e=q){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[r,a]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(r);s===o&&a.resolve(i)}return i}onInit(e,t){const s=this.normalizeInstanceIdentifier(t),i=this.onInitCallbacks.get(s)??new Set;i.add(e),this.onInitCallbacks.set(s,i);const r=this.instances.get(s);return r&&e(r,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const i of s)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:qn(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=q){return this.component?this.component.multipleInstances?e:q:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function qn(n){return n===q?void 0:n}function Gn(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Kn(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var p;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(p||(p={}));const Yn={debug:p.DEBUG,verbose:p.VERBOSE,info:p.INFO,warn:p.WARN,error:p.ERROR,silent:p.SILENT},Xn=p.INFO,Qn={[p.DEBUG]:"log",[p.VERBOSE]:"log",[p.INFO]:"info",[p.WARN]:"warn",[p.ERROR]:"error"},Zn=(n,e,...t)=>{if(e<n.logLevel)return;const s=new Date().toISOString(),i=Qn[e];if(i)console[i](`[${s}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ft{constructor(e){this.name=e,this._logLevel=Xn,this._logHandler=Zn,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in p))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Yn[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,p.DEBUG,...e),this._logHandler(this,p.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,p.VERBOSE,...e),this._logHandler(this,p.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,p.INFO,...e),this._logHandler(this,p.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,p.WARN,...e),this._logHandler(this,p.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,p.ERROR,...e),this._logHandler(this,p.ERROR,...e)}}const es=(n,e)=>e.some(t=>n instanceof t);let rt,at;function ts(){return rt||(rt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ns(){return at||(at=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Bt=new WeakMap,Oe=new WeakMap,$t=new WeakMap,_e=new WeakMap,ze=new WeakMap;function ss(n){const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("success",r),n.removeEventListener("error",a)},r=()=>{t(H(n.result)),i()},a=()=>{s(n.error),i()};n.addEventListener("success",r),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Bt.set(t,n)}).catch(()=>{}),ze.set(e,n),e}function is(n){if(Oe.has(n))return;const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",a),n.removeEventListener("abort",a)},r=()=>{t(),i()},a=()=>{s(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",r),n.addEventListener("error",a),n.addEventListener("abort",a)});Oe.set(n,e)}let Ne={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Oe.get(n);if(e==="objectStoreNames")return n.objectStoreNames||$t.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return H(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function rs(n){Ne=n(Ne)}function as(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=n.call(Ee(this),e,...t);return $t.set(s,e.sort?e.sort():[e]),H(s)}:ns().includes(n)?function(...e){return n.apply(Ee(this),e),H(Bt.get(this))}:function(...e){return H(n.apply(Ee(this),e))}}function os(n){return typeof n=="function"?as(n):(n instanceof IDBTransaction&&is(n),es(n,ts())?new Proxy(n,Ne):n)}function H(n){if(n instanceof IDBRequest)return ss(n);if(_e.has(n))return _e.get(n);const e=os(n);return e!==n&&(_e.set(n,e),ze.set(e,n)),e}const Ee=n=>ze.get(n);function xt(n,e,{blocked:t,upgrade:s,blocking:i,terminated:r}={}){const a=indexedDB.open(n,e),o=H(a);return s&&a.addEventListener("upgradeneeded",c=>{s(H(a.result),c.oldVersion,c.newVersion,H(a.transaction),c)}),t&&a.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),o.then(c=>{r&&c.addEventListener("close",()=>r()),i&&c.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),o}const cs=["get","getKey","getAll","getAllKeys","count"],ls=["put","add","delete","clear"],Se=new Map;function ot(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Se.get(e))return Se.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,i=ls.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(i||cs.includes(t)))return;const r=async function(a,...o){const c=this.transaction(a,i?"readwrite":"readonly");let l=c.store;return s&&(l=l.index(o.shift())),(await Promise.all([l[t](...o),i&&c.done]))[0]};return Se.set(e,r),r}rs(n=>({...n,get:(e,t,s)=>ot(e,t)||n.get(e,t,s),has:(e,t)=>!!ot(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(ds(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function ds(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Fe="@firebase/app",ct="0.14.12";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const B=new Ft("@firebase/app"),hs="@firebase/app-compat",fs="@firebase/analytics-compat",gs="@firebase/analytics",ms="@firebase/app-check-compat",ps="@firebase/app-check",bs="@firebase/auth",ws="@firebase/auth-compat",ys="@firebase/database",vs="@firebase/data-connect",_s="@firebase/database-compat",Es="@firebase/functions",Ss="@firebase/functions-compat",Cs="@firebase/installations",Is="@firebase/installations-compat",As="@firebase/messaging",Ts="@firebase/messaging-compat",Rs="@firebase/performance",Ps="@firebase/performance-compat",ks="@firebase/remote-config",Ds="@firebase/remote-config-compat",Ms="@firebase/storage",Ls="@firebase/storage-compat",Os="@firebase/firestore",Ns="@firebase/ai",Fs="@firebase/firestore-compat",Bs="firebase",$s="12.13.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Be="[DEFAULT]",xs={[Fe]:"fire-core",[hs]:"fire-core-compat",[gs]:"fire-analytics",[fs]:"fire-analytics-compat",[ps]:"fire-app-check",[ms]:"fire-app-check-compat",[bs]:"fire-auth",[ws]:"fire-auth-compat",[ys]:"fire-rtdb",[vs]:"fire-data-connect",[_s]:"fire-rtdb-compat",[Es]:"fire-fn",[Ss]:"fire-fn-compat",[Cs]:"fire-iid",[Is]:"fire-iid-compat",[As]:"fire-fcm",[Ts]:"fire-fcm-compat",[Rs]:"fire-perf",[Ps]:"fire-perf-compat",[ks]:"fire-rc",[Ds]:"fire-rc-compat",[Ms]:"fire-gcs",[Ls]:"fire-gcs-compat",[Os]:"fire-fst",[Fs]:"fire-fst-compat",[Ns]:"fire-vertex","fire-js":"fire-js",[Bs]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ie=new Map,js=new Map,$e=new Map;function lt(n,e){try{n.container.addComponent(e)}catch(t){B.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function ne(n){const e=n.name;if($e.has(e))return B.debug(`There were multiple attempts to register component ${e}.`),!1;$e.set(e,n);for(const t of ie.values())lt(t,n);for(const t of js.values())lt(t,n);return!0}function We(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Us={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},V=new ge("app","Firebase",Us);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(e,t,s){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new J("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw V.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ut=$s;function Vs(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const s={name:Be,automaticDataCollectionEnabled:!0,...e},i=s.name;if(typeof i!="string"||!i)throw V.create("bad-app-name",{appName:String(i)});if(t||(t=Lt()),!t)throw V.create("no-options");const r=ie.get(i);if(r){if(he(t,r.options)&&he(s,r.config))return r;throw V.create("duplicate-app",{appName:i})}const a=new Jn(i);for(const c of $e.values())a.addComponent(c);const o=new Hs(t,s,a);return ie.set(i,o),o}function zs(n=Be){const e=ie.get(n);if(!e&&n===Be&&Lt())return Vs();if(!e)throw V.create("no-app",{appName:n});return e}function jr(){return Array.from(ie.values())}function z(n,e,t){let s=xs[n]??n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),r=e.match(/\s|\//);if(i||r){const a=[`Unable to register library "${s}" with version "${e}":`];i&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&r&&a.push("and"),r&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),B.warn(a.join(" "));return}ne(new J(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ws="firebase-heartbeat-database",Ks=1,re="firebase-heartbeat-store";let Ce=null;function jt(){return Ce||(Ce=xt(Ws,Ks,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(re)}catch(t){console.warn(t)}}}}).catch(n=>{throw V.create("idb-open",{originalErrorMessage:n.message})})),Ce}async function qs(n){try{const t=(await jt()).transaction(re),s=await t.objectStore(re).get(Ut(n));return await t.done,s}catch(e){if(e instanceof W)B.warn(e.message);else{const t=V.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});B.warn(t.message)}}}async function dt(n,e){try{const s=(await jt()).transaction(re,"readwrite");await s.objectStore(re).put(e,Ut(n)),await s.done}catch(t){if(t instanceof W)B.warn(t.message);else{const s=V.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});B.warn(s.message)}}}function Ut(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gs=1024,Js=30;class Ys{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Qs(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=ht();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(a=>a.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:i}),this._heartbeatsCache.heartbeats.length>Js){const a=Zs(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){B.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=ht(),{heartbeatsToSend:s,unsentEntries:i}=Xs(this._heartbeatsCache.heartbeats),r=Mt(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return B.warn(t),""}}}function ht(){return new Date().toISOString().substring(0,10)}function Xs(n,e=Gs){const t=[];let s=n.slice();for(const i of n){const r=t.find(a=>a.agent===i.agent);if(r){if(r.dates.push(i.date),ft(t)>e){r.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),ft(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class Qs{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ve()?Ot().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await qs(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return dt(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return dt(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function ft(n){return Mt(JSON.stringify({version:2,heartbeats:n})).length}function Zs(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let s=1;s<n.length;s++)n[s].date<t&&(t=n[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ei(n){ne(new J("platform-logger",e=>new us(e),"PRIVATE")),ne(new J("heartbeat",e=>new Ys(e),"PRIVATE")),z(Fe,ct,n),z(Fe,ct,"esm2020"),z("fire-js","")}ei("");var ti="firebase",ni="12.13.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */z(ti,ni,"app");class si extends ae{constructor(){super(),this.handleVisibilityChange=()=>{const e={isActive:document.hidden!==!0};this.notifyListeners("appStateChange",e),document.hidden?this.notifyListeners("pause",null):this.notifyListeners("resume",null)},document.addEventListener("visibilitychange",this.handleVisibilityChange,!1)}exitApp(){throw this.unimplemented("Not implemented on web.")}async getInfo(){throw this.unimplemented("Not implemented on web.")}async getLaunchUrl(){return{url:""}}async getState(){return{isActive:document.hidden!==!0}}async minimizeApp(){throw this.unimplemented("Not implemented on web.")}async toggleBackButtonHandler(){throw this.unimplemented("Not implemented on web.")}async getAppLanguage(){return{value:navigator.language.split("-")[0].toLowerCase()}}}const ii=Object.freeze(Object.defineProperty({__proto__:null,AppWeb:si},Symbol.toStringTag,{value:"Module"})),ri=se("PushNotifications",{}),Ur=Object.freeze(Object.defineProperty({__proto__:null,PushNotifications:ri},Symbol.toStringTag,{value:"Module"}));var xe;(function(n){n[n.Sunday=1]="Sunday",n[n.Monday=2]="Monday",n[n.Tuesday=3]="Tuesday",n[n.Wednesday=4]="Wednesday",n[n.Thursday=5]="Thursday",n[n.Friday=6]="Friday",n[n.Saturday=7]="Saturday"})(xe||(xe={}));const ai=se("LocalNotifications",{web:()=>Pt(()=>Promise.resolve().then(()=>kr),void 0).then(n=>new n.LocalNotificationsWeb)}),Hr=Object.freeze(Object.defineProperty({__proto__:null,LocalNotifications:ai,get Weekday(){return xe}},Symbol.toStringTag,{value:"Module"})),Ht="@firebase/installations",Ke="0.6.22";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vt=1e4,zt=`w:${Ke}`,Wt="FIS_v2",oi="https://firebaseinstallations.googleapis.com/v1",ci=3600*1e3,li="installations",ui="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const di={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Y=new ge(li,ui,di);function Kt(n){return n instanceof W&&n.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qt({projectId:n}){return`${oi}/projects/${n}/installations`}function Gt(n){return{token:n.token,requestStatus:2,expiresIn:fi(n.expiresIn),creationTime:Date.now()}}async function Jt(n,e){const s=(await e.json()).error;return Y.create("request-failed",{requestName:n,serverCode:s.code,serverMessage:s.message,serverStatus:s.status})}function Yt({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function hi(n,{refreshToken:e}){const t=Yt(n);return t.append("Authorization",gi(e)),t}async function Xt(n){const e=await n();return e.status>=500&&e.status<600?n():e}function fi(n){return Number(n.replace("s","000"))}function gi(n){return`${Wt} ${n}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mi({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const s=qt(n),i=Yt(n),r=e.getImmediate({optional:!0});if(r){const l=await r.getHeartbeatsHeader();l&&i.append("x-firebase-client",l)}const a={fid:t,authVersion:Wt,appId:n.appId,sdkVersion:zt},o={method:"POST",headers:i,body:JSON.stringify(a)},c=await Xt(()=>fetch(s,o));if(c.ok){const l=await c.json();return{fid:l.fid||t,registrationStatus:2,refreshToken:l.refreshToken,authToken:Gt(l.authToken)}}else throw await Jt("Create Installation",c)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qt(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pi(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bi=/^[cdef][\w-]{21}$/,je="";function wi(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=yi(n);return bi.test(t)?t:je}catch{return je}}function yi(n){return pi(n).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(n){return`${n.appName}!${n.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zt=new Map;function en(n,e){const t=me(n);tn(t,e),vi(t,e)}function tn(n,e){const t=Zt.get(n);if(t)for(const s of t)s(e)}function vi(n,e){const t=_i();t&&t.postMessage({key:n,fid:e}),Ei()}let G=null;function _i(){return!G&&"BroadcastChannel"in self&&(G=new BroadcastChannel("[Firebase] FID Change"),G.onmessage=n=>{tn(n.data.key,n.data.fid)}),G}function Ei(){Zt.size===0&&G&&(G.close(),G=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Si="firebase-installations-database",Ci=1,X="firebase-installations-store";let Ie=null;function qe(){return Ie||(Ie=xt(Si,Ci,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(X)}}})),Ie}async function fe(n,e){const t=me(n),i=(await qe()).transaction(X,"readwrite"),r=i.objectStore(X),a=await r.get(t);return await r.put(e,t),await i.done,(!a||a.fid!==e.fid)&&en(n,e.fid),e}async function nn(n){const e=me(n),s=(await qe()).transaction(X,"readwrite");await s.objectStore(X).delete(e),await s.done}async function pe(n,e){const t=me(n),i=(await qe()).transaction(X,"readwrite"),r=i.objectStore(X),a=await r.get(t),o=e(a);return o===void 0?await r.delete(t):await r.put(o,t),await i.done,o&&(!a||a.fid!==o.fid)&&en(n,o.fid),o}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ge(n){let e;const t=await pe(n.appConfig,s=>{const i=Ii(s),r=Ai(n,i);return e=r.registrationPromise,r.installationEntry});return t.fid===je?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function Ii(n){const e=n||{fid:wi(),registrationStatus:0};return sn(e)}function Ai(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(Y.create("app-offline"));return{installationEntry:e,registrationPromise:i}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},s=Ti(n,t);return{installationEntry:t,registrationPromise:s}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:Ri(n)}:{installationEntry:e}}async function Ti(n,e){try{const t=await mi(n,e);return fe(n.appConfig,t)}catch(t){throw Kt(t)&&t.customData.serverCode===409?await nn(n.appConfig):await fe(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function Ri(n){let e=await gt(n.appConfig);for(;e.registrationStatus===1;)await Qt(100),e=await gt(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:s}=await Ge(n);return s||t}return e}function gt(n){return pe(n,e=>{if(!e)throw Y.create("installation-not-found");return sn(e)})}function sn(n){return Pi(n)?{fid:n.fid,registrationStatus:0}:n}function Pi(n){return n.registrationStatus===1&&n.registrationTime+Vt<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ki({appConfig:n,heartbeatServiceProvider:e},t){const s=Di(n,t),i=hi(n,t),r=e.getImmediate({optional:!0});if(r){const l=await r.getHeartbeatsHeader();l&&i.append("x-firebase-client",l)}const a={installation:{sdkVersion:zt,appId:n.appId}},o={method:"POST",headers:i,body:JSON.stringify(a)},c=await Xt(()=>fetch(s,o));if(c.ok){const l=await c.json();return Gt(l)}else throw await Jt("Generate Auth Token",c)}function Di(n,{fid:e}){return`${qt(n)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Je(n,e=!1){let t;const s=await pe(n.appConfig,r=>{if(!rn(r))throw Y.create("not-registered");const a=r.authToken;if(!e&&Oi(a))return r;if(a.requestStatus===1)return t=Mi(n,e),r;{if(!navigator.onLine)throw Y.create("app-offline");const o=Fi(r);return t=Li(n,o),o}});return t?await t:s.authToken}async function Mi(n,e){let t=await mt(n.appConfig);for(;t.authToken.requestStatus===1;)await Qt(100),t=await mt(n.appConfig);const s=t.authToken;return s.requestStatus===0?Je(n,e):s}function mt(n){return pe(n,e=>{if(!rn(e))throw Y.create("not-registered");const t=e.authToken;return Bi(t)?{...e,authToken:{requestStatus:0}}:e})}async function Li(n,e){try{const t=await ki(n,e),s={...e,authToken:t};return await fe(n.appConfig,s),t}catch(t){if(Kt(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await nn(n.appConfig);else{const s={...e,authToken:{requestStatus:0}};await fe(n.appConfig,s)}throw t}}function rn(n){return n!==void 0&&n.registrationStatus===2}function Oi(n){return n.requestStatus===2&&!Ni(n)}function Ni(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+ci}function Fi(n){const e={requestStatus:1,requestTime:Date.now()};return{...n,authToken:e}}function Bi(n){return n.requestStatus===1&&n.requestTime+Vt<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $i(n){const e=n,{installationEntry:t,registrationPromise:s}=await Ge(e);return s?s.catch(console.error):Je(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xi(n,e=!1){const t=n;return await ji(t),(await Je(t,e)).token}async function ji(n){const{registrationPromise:e}=await Ge(n);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ui(n){if(!n||!n.options)throw Ae("App Configuration");if(!n.name)throw Ae("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw Ae(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function Ae(n){return Y.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const an="installations",Hi="installations-internal",Vi=n=>{const e=n.getProvider("app").getImmediate(),t=Ui(e),s=We(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:s,_delete:()=>Promise.resolve()}},zi=n=>{const e=n.getProvider("app").getImmediate(),t=We(e,an).getImmediate();return{getId:()=>$i(t),getToken:i=>xi(t,i)}};function Wi(){ne(new J(an,Vi,"PUBLIC")),ne(new J(Hi,zi,"PRIVATE"))}Wi();z(Ht,Ke);z(Ht,Ke,"esm2020");const Te="@firebase/remote-config",pt="0.8.3";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cn="remote-config",bt=100,wt=250,yt=500;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ki={"already-initialized":"Remote Config already initialized","registration-window":"Undefined window object. This SDK only supports usage in a browser environment.","registration-project-id":"Undefined project identifier. Check Firebase app initialization.","registration-api-key":"Undefined API key. Check Firebase app initialization.","registration-app-id":"Undefined app identifier. Check Firebase app initialization.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","storage-delete":"Error thrown when deleting from storage. Original error: {$originalErrorMessage}.","fetch-client-network":"Fetch client failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-timeout":'The config fetch request timed out.  Configure timeout using "fetchTimeoutMillis" SDK setting.',"fetch-throttle":'The config fetch request timed out while in an exponential backoff state. Configure timeout using "fetchTimeoutMillis" SDK setting. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.',"fetch-client-parse":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","indexed-db-unavailable":"Indexed DB is not supported by current browser","custom-signal-max-allowed-signals":"Setting more than {$maxSignals} custom signals is not supported.","stream-error":"The stream was not able to connect to the backend: {$originalErrorMessage}.","realtime-unavailable":"The Realtime service is unavailable: {$originalErrorMessage}","update-message-invalid":"The stream invalidation message was unparsable: {$originalErrorMessage}","update-not-fetched":"Unable to fetch the latest config: {$originalErrorMessage}","analytics-unavailable":"Connection to Firebase Analytics failed: {$originalErrorMessage}"},E=new ge("remoteconfig","Remote Config",Ki);function qi(n,e){return n instanceof W&&n.code.indexOf(e)!==-1}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gi=!1,Ji="",vt=0,Yi=["1","true","t","yes","y","on"];class Re{constructor(e,t=Ji){this._source=e,this._value=t}asString(){return this._value}asBoolean(){return this._source==="static"?Gi:Yi.indexOf(this._value.toLowerCase())>=0}asNumber(){if(this._source==="static")return vt;let e=Number(this._value);return isNaN(e)&&(e=vt),e}getSource(){return this._source}}class Xi{constructor(e){this.storage=e._storage,this.logger=e._logger,this.analyticsProvider=e._analyticsProvider}async updateActiveExperiments(e){const t=await this.storage.getActiveExperiments()||new Set,s=this.createExperimentInfoMap(e);return this.addActiveExperiments(s),this.removeInactiveExperiments(t,s),this.storage.setActiveExperiments(new Set(s.keys()))}createExperimentInfoMap(e){const t=new Map;for(const s of e)t.set(s.experimentId,s);return t}addActiveExperiments(e){const t={};for(const[s,i]of e.entries())t[`firebase${s}`]=i.variantId;this.addExperimentToAnalytics(t)}removeInactiveExperiments(e,t){const s={};for(const i of e)t.has(i)||(s[`firebase${i}`]=null);this.addExperimentToAnalytics(s)}addExperimentToAnalytics(e){if(Object.keys(e).length!==0)try{const t=this.analyticsProvider.getImmediate({optional:!0});t?(t.setUserProperties(e),t.logEvent("set_firebase_experiment_state")):this.logger.warn("Analytics import failed. Verify if you have imported Firebase Analytics in your app code.")}catch(t){throw E.create("analytics-unavailable",{originalErrorMessage:t==null?void 0:t.message})}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qi(n=zs(),e={}){var i,r;n=M(n);const t=We(n,cn);if(t.isInitialized()){const a=t.getOptions();if(he(a,e))return t.getImmediate();throw E.create("already-initialized")}t.initialize({options:e});const s=t.getImmediate();return e.initialFetchResponse&&(s._initializePromise=Promise.all([s._storage.setLastSuccessfulFetchResponse(e.initialFetchResponse),s._storage.setActiveConfigEtag(((i=e.initialFetchResponse)==null?void 0:i.eTag)||""),s._storage.setActiveConfigTemplateVersion(e.initialFetchResponse.templateVersion||0),s._storageCache.setLastSuccessfulFetchTimestampMillis(Date.now()),s._storageCache.setLastFetchStatus("success"),s._storageCache.setActiveConfig(((r=e.initialFetchResponse)==null?void 0:r.config)||{})]).then(),s._isInitializationComplete=!0),s}async function ln(n){const e=M(n),[t,s]=await Promise.all([e._storage.getLastSuccessfulFetchResponse(),e._storage.getActiveConfigEtag()]);if(!t||!t.config||!t.eTag||!t.templateVersion||t.eTag===s)return!1;const i=new Xi(e),r=t.experiments?i.updateActiveExperiments(t.experiments):Promise.resolve();return await Promise.all([e._storageCache.setActiveConfig(t.config),e._storage.setActiveConfigEtag(t.eTag),e._storage.setActiveConfigTemplateVersion(t.templateVersion),r]),!0}function un(n){const e=M(n);return e._initializePromise||(e._initializePromise=e._storageCache.loadFromStorage().then(()=>{e._isInitializationComplete=!0})),e._initializePromise}async function dn(n){const e=M(n),t=new on;setTimeout(async()=>{t.abort()},e.settings.fetchTimeoutMillis);const s=e._storageCache.getCustomSignals();s&&e._logger.debug(`Fetching config with custom signals: ${JSON.stringify(s)}`);try{await e._client.fetch({cacheMaxAgeMillis:e.settings.minimumFetchIntervalMillis,signal:t,customSignals:s}),await e._storageCache.setLastFetchStatus("success")}catch(i){const r=qi(i,"fetch-throttle")?"throttle":"failure";throw await e._storageCache.setLastFetchStatus(r),i}}function Zi(n){const e=M(n);return ir(e._storageCache.getActiveConfig(),e.defaultConfig).reduce((t,s)=>(t[s]=oe(n,s),t),{})}function er(n,e){return oe(M(n),e).asBoolean()}function tr(n,e){return oe(M(n),e).asNumber()}function nr(n,e){return oe(M(n),e).asString()}function oe(n,e){const t=M(n);t._isInitializationComplete||t._logger.debug(`A value was requested for key "${e}" before SDK initialization completed. Await on ensureInitialized if the intent was to get a previously activated value.`);const s=t._storageCache.getActiveConfig();return s&&s[e]!==void 0?new Re("remote",s[e]):t.defaultConfig&&t.defaultConfig[e]!==void 0?new Re("default",String(t.defaultConfig[e])):(t._logger.debug(`Returning static value for key "${e}". Define a default or remote value if this is unintentional.`),new Re("static"))}function sr(n,e){const t=M(n);switch(e){case"debug":t._logger.logLevel=p.DEBUG;break;case"silent":t._logger.logLevel=p.SILENT;break;default:t._logger.logLevel=p.ERROR}}function ir(n={},e={}){return Object.keys({...n,...e})}async function rr(n,e){const t=M(n);if(Object.keys(e).length!==0){for(const s in e){if(s.length>wt){t._logger.error(`Custom signal key ${s} is too long, max allowed length is ${wt}.`);return}const i=e[s];if(typeof i=="string"&&i.length>yt){t._logger.error(`Value supplied for custom signal ${s} is too long, max allowed length is ${yt}.`);return}}try{await t._storageCache.setCustomSignals(e)}catch(s){t._logger.error(`Error encountered while setting custom signals: ${s}`)}}}function ar(n,e){const t=M(n);return t._realtimeHandler.addObserver(e),()=>{t._realtimeHandler.removeObserver(e)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class or{constructor(e,t,s,i){this.client=e,this.storage=t,this.storageCache=s,this.logger=i}isCachedDataFresh(e,t){if(!t)return this.logger.debug("Config fetch cache check. Cache unpopulated."),!1;const s=Date.now()-t,i=s<=e;return this.logger.debug(`Config fetch cache check. Cache age millis: ${s}. Cache max age millis (minimumFetchIntervalMillis setting): ${e}. Is cache hit: ${i}.`),i}async fetch(e){const[t,s]=await Promise.all([this.storage.getLastSuccessfulFetchTimestampMillis(),this.storage.getLastSuccessfulFetchResponse()]);if(s&&this.isCachedDataFresh(e.cacheMaxAgeMillis,t))return s;e.eTag=s&&s.eTag;const i=await this.client.fetch(e),r=[this.storageCache.setLastSuccessfulFetchTimestampMillis(Date.now())];return i.status===200&&r.push(this.storage.setLastSuccessfulFetchResponse(i)),await Promise.all(r),i}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cr(n=navigator){return n.languages&&n.languages[0]||n.language}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr{constructor(e,t,s,i,r,a){this.firebaseInstallations=e,this.sdkVersion=t,this.namespace=s,this.projectId=i,this.apiKey=r,this.appId=a}async fetch(e){const[t,s]=await Promise.all([this.firebaseInstallations.getId(),this.firebaseInstallations.getToken()]),r=`${window.FIREBASE_REMOTE_CONFIG_URL_BASE||"https://firebaseremoteconfig.googleapis.com"}/v1/projects/${this.projectId}/namespaces/${this.namespace}:fetch?key=${this.apiKey}`,a={"Content-Type":"application/json","Content-Encoding":"gzip","If-None-Match":e.eTag||"*"},o={sdk_version:this.sdkVersion,app_instance_id:t,app_instance_id_token:s,app_id:this.appId,language_code:cr(),custom_signals:e.customSignals},c={method:"POST",headers:a,body:JSON.stringify(o)},l=fetch(r,c),f=new Promise((I,R)=>{e.signal.addEventListener(()=>{const N=new Error("The operation was aborted.");N.name="AbortError",R(N)})});let u;try{await Promise.race([l,f]),u=await l}catch(I){let R="fetch-client-network";throw(I==null?void 0:I.name)==="AbortError"&&(R="fetch-timeout"),E.create(R,{originalErrorMessage:I==null?void 0:I.message})}let d=u.status;const w=u.headers.get("ETag")||void 0;let b,y,C,O;if(u.status===200){let I;try{I=await u.json()}catch(R){throw E.create("fetch-client-parse",{originalErrorMessage:R==null?void 0:R.message})}b=I.entries,y=I.state,C=I.templateVersion,O=I.experimentDescriptions}if(y==="INSTANCE_STATE_UNSPECIFIED"?d=500:y==="NO_CHANGE"?d=304:(y==="NO_TEMPLATE"||y==="EMPTY_CONFIG")&&(b={},O=[]),d!==304&&d!==200)throw E.create("fetch-status",{httpStatus:d});return{status:d,eTag:w,config:b,templateVersion:C,experiments:O}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ur(n,e){return new Promise((t,s)=>{const i=Math.max(e-Date.now(),0),r=setTimeout(t,i);n.addEventListener(()=>{clearTimeout(r),s(E.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function dr(n){if(!(n instanceof W)||!n.customData)return!1;const e=Number(n.customData.httpStatus);return e===429||e===500||e===503||e===504}class hr{constructor(e,t){this.client=e,this.storage=t}async fetch(e){const t=await this.storage.getThrottleMetadata()||{backoffCount:0,throttleEndTimeMillis:Date.now()};return this.attemptFetch(e,t)}async attemptFetch(e,{throttleEndTimeMillis:t,backoffCount:s}){await ur(e.signal,t);try{const i=await this.client.fetch(e);return await this.storage.deleteThrottleMetadata(),i}catch(i){if(!dr(i))throw i;const r={throttleEndTimeMillis:Date.now()+Nt(s),backoffCount:s+1};return await this.storage.setThrottleMetadata(r),this.attemptFetch(e,r)}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fr=60*1e3,gr=720*60*1e3;class mr{get fetchTimeMillis(){return this._storageCache.getLastSuccessfulFetchTimestampMillis()||-1}get lastFetchStatus(){return this._storageCache.getLastFetchStatus()||"no-fetch-yet"}constructor(e,t,s,i,r,a,o){this.app=e,this._client=t,this._storageCache=s,this._storage=i,this._logger=r,this._realtimeHandler=a,this._analyticsProvider=o,this._isInitializationComplete=!1,this.settings={fetchTimeoutMillis:fr,minimumFetchIntervalMillis:gr},this.defaultConfig={}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function de(n,e){const t=n.target.error||void 0;return E.create(e,{originalErrorMessage:t&&(t==null?void 0:t.message)})}const U="app_namespace_store",pr="firebase_remote_config",br=1;function wr(){return new Promise((n,e)=>{try{const t=indexedDB.open(pr,br);t.onerror=s=>{e(de(s,"storage-open"))},t.onsuccess=s=>{n(s.target.result)},t.onupgradeneeded=s=>{const i=s.target.result;switch(s.oldVersion){case 0:i.createObjectStore(U,{keyPath:"compositeKey"})}}}catch(t){e(E.create("storage-open",{originalErrorMessage:t==null?void 0:t.message}))}})}class hn{getLastFetchStatus(){return this.get("last_fetch_status")}setLastFetchStatus(e){return this.set("last_fetch_status",e)}getLastSuccessfulFetchTimestampMillis(){return this.get("last_successful_fetch_timestamp_millis")}setLastSuccessfulFetchTimestampMillis(e){return this.set("last_successful_fetch_timestamp_millis",e)}getLastSuccessfulFetchResponse(){return this.get("last_successful_fetch_response")}setLastSuccessfulFetchResponse(e){return this.set("last_successful_fetch_response",e)}getActiveConfig(){return this.get("active_config")}setActiveConfig(e){return this.set("active_config",e)}getActiveConfigEtag(){return this.get("active_config_etag")}setActiveConfigEtag(e){return this.set("active_config_etag",e)}getActiveExperiments(){return this.get("active_experiments")}setActiveExperiments(e){return this.set("active_experiments",e)}getThrottleMetadata(){return this.get("throttle_metadata")}setThrottleMetadata(e){return this.set("throttle_metadata",e)}deleteThrottleMetadata(){return this.delete("throttle_metadata")}getCustomSignals(){return this.get("custom_signals")}getRealtimeBackoffMetadata(){return this.get("realtime_backoff_metadata")}setRealtimeBackoffMetadata(e){return this.set("realtime_backoff_metadata",e)}getActiveConfigTemplateVersion(){return this.get("last_known_template_version")}setActiveConfigTemplateVersion(e){return this.set("last_known_template_version",e)}}class yr extends hn{constructor(e,t,s,i=wr()){super(),this.appId=e,this.appName=t,this.namespace=s,this.openDbPromise=i}async setCustomSignals(e){const s=(await this.openDbPromise).transaction([U],"readwrite"),i=await this.getWithTransaction("custom_signals",s),r=fn(e,i||{});return await this.setWithTransaction("custom_signals",r,s),r}async getWithTransaction(e,t){return new Promise((s,i)=>{const r=t.objectStore(U),a=this.createCompositeKey(e);try{const o=r.get(a);o.onerror=c=>{i(de(c,"storage-get"))},o.onsuccess=c=>{const l=c.target.result;s(l?l.value:void 0)}}catch(o){i(E.create("storage-get",{originalErrorMessage:o==null?void 0:o.message}))}})}async setWithTransaction(e,t,s){return new Promise((i,r)=>{const a=s.objectStore(U),o=this.createCompositeKey(e);try{const c=a.put({compositeKey:o,value:t});c.onerror=l=>{r(de(l,"storage-set"))},c.onsuccess=()=>{i()}}catch(c){r(E.create("storage-set",{originalErrorMessage:c==null?void 0:c.message}))}})}async get(e){const s=(await this.openDbPromise).transaction([U],"readonly");return this.getWithTransaction(e,s)}async set(e,t){const i=(await this.openDbPromise).transaction([U],"readwrite");return this.setWithTransaction(e,t,i)}async delete(e){const t=await this.openDbPromise;return new Promise((s,i)=>{const a=t.transaction([U],"readwrite").objectStore(U),o=this.createCompositeKey(e);try{const c=a.delete(o);c.onerror=l=>{i(de(l,"storage-delete"))},c.onsuccess=()=>{s()}}catch(c){i(E.create("storage-delete",{originalErrorMessage:c==null?void 0:c.message}))}})}createCompositeKey(e){return[this.appId,this.appName,this.namespace,e].join()}}class vr extends hn{constructor(){super(...arguments),this.storage={}}async get(e){return Promise.resolve(this.storage[e])}async set(e,t){return this.storage[e]=t,Promise.resolve(void 0)}async delete(e){return this.storage[e]=void 0,Promise.resolve()}async setCustomSignals(e){const t=this.storage.custom_signals||{};return this.storage.custom_signals=fn(e,t),Promise.resolve(this.storage.custom_signals)}}function fn(n,e){const t={...e,...n},s=Object.fromEntries(Object.entries(t).filter(([i,r])=>r!==null).map(([i,r])=>typeof r=="number"?[i,r.toString()]:[i,r]));if(Object.keys(s).length>bt)throw E.create("custom-signal-max-allowed-signals",{maxSignals:bt});return s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _r{constructor(e){this.storage=e}getLastFetchStatus(){return this.lastFetchStatus}getLastSuccessfulFetchTimestampMillis(){return this.lastSuccessfulFetchTimestampMillis}getActiveConfig(){return this.activeConfig}getCustomSignals(){return this.customSignals}async loadFromStorage(){const e=this.storage.getLastFetchStatus(),t=this.storage.getLastSuccessfulFetchTimestampMillis(),s=this.storage.getActiveConfig(),i=this.storage.getCustomSignals(),r=await e;r&&(this.lastFetchStatus=r);const a=await t;a&&(this.lastSuccessfulFetchTimestampMillis=a);const o=await s;o&&(this.activeConfig=o);const c=await i;c&&(this.customSignals=c)}setLastFetchStatus(e){return this.lastFetchStatus=e,this.storage.setLastFetchStatus(e)}setLastSuccessfulFetchTimestampMillis(e){return this.lastSuccessfulFetchTimestampMillis=e,this.storage.setLastSuccessfulFetchTimestampMillis(e)}setActiveConfig(e){return this.activeConfig=e,this.storage.setActiveConfig(e)}async setCustomSignals(e){this.customSignals=await this.storage.setCustomSignals(e)}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er{constructor(e){this.allowedEvents_=e,this.listeners_={},Le(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,t)}}on(e,t,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:s});const i=this.getInitialEvent(e);i&&t.apply(s,i)}off(e,t,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===t&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){Le(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye extends Er{static getInstance(){return new Ye}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return Le(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sr="X-Goog-Api-Key",Cr="X-Goog-Firebase-Installations-Auth",Pe=8,_t=3,Et=-1,St=0,Ct="featureDisabled",It="retryIntervalSeconds",At="latestTemplateVersionNumber";class Ir{constructor(e,t,s,i,r,a,o,c,l,f){this.firebaseInstallations=e,this.storage=t,this.sdkVersion=s,this.namespace=i,this.projectId=r,this.apiKey=a,this.appId=o,this.logger=c,this.storageCache=l,this.cachingClient=f,this.observers=new Set,this.isConnectionActive=!1,this.isRealtimeDisabled=!1,this.httpRetriesRemaining=Pe,this.isInBackground=!1,this.decoder=new TextDecoder("utf-8"),this.isClosingConnection=!1,this.propagateError=u=>this.observers.forEach(d=>{var w;return(w=d.error)==null?void 0:w.call(d,u)}),this.isStatusCodeRetryable=u=>!u||[408,429,502,503,504].includes(u),this.setRetriesRemaining(),Ye.getInstance().on("visible",this.onVisibilityChange,this)}async setRetriesRemaining(){const e=await this.storage.getRealtimeBackoffMetadata(),t=(e==null?void 0:e.numFailedStreams)||0;this.httpRetriesRemaining=Math.max(Pe-t,1)}async updateBackoffMetadataWithLastFailedStreamConnectionTime(e){var i;const t=(((i=await this.storage.getRealtimeBackoffMetadata())==null?void 0:i.numFailedStreams)||0)+1,s=Nt(t,6e4,2);await this.storage.setRealtimeBackoffMetadata({backoffEndTimeMillis:new Date(e.getTime()+s),numFailedStreams:t})}async updateBackoffMetadataWithRetryInterval(e){const t=Date.now(),s=e*1e3,i=new Date(t+s);await this.storage.setRealtimeBackoffMetadata({backoffEndTimeMillis:i,numFailedStreams:0}),await this.retryHttpConnectionWhenBackoffEnds()}async closeRealtimeHttpConnection(){if(!this.isClosingConnection){this.isClosingConnection=!0;try{this.reader&&await this.reader.cancel()}catch{this.logger.debug("Failed to cancel the reader, connection was lost.")}finally{this.reader=void 0}this.controller&&(await this.controller.abort(),this.controller=void 0),this.isClosingConnection=!1}}async resetRealtimeBackoff(){await this.storage.setRealtimeBackoffMetadata({backoffEndTimeMillis:new Date(-1),numFailedStreams:0})}resetRetryCount(){this.httpRetriesRemaining=Pe}async establishRealtimeConnection(e,t,s,i){const r=await this.storage.getActiveConfigEtag(),a=await this.storage.getActiveConfigTemplateVersion(),o={[Sr]:this.apiKey,[Cr]:s,"Content-Type":"application/json",Accept:"application/json","If-None-Match":r||"*","Content-Encoding":"gzip"},c={project:this.projectId,namespace:this.namespace,lastKnownVersionNumber:a,appId:this.appId,sdkVersion:this.sdkVersion,appInstanceId:t};return await fetch(e,{method:"POST",headers:o,body:JSON.stringify(c),signal:i})}getRealtimeUrl(){const t=`${window.FIREBASE_REMOTE_CONFIG_URL_BASE||"https://firebaseremoteconfigrealtime.googleapis.com"}/v1/projects/${this.projectId}/namespaces/${this.namespace}:streamFetchInvalidations?key=${this.apiKey}`;return new URL(t)}async createRealtimeConnection(){const[e,t]=await Promise.all([this.firebaseInstallations.getId(),this.firebaseInstallations.getToken(!1)]);this.controller=new AbortController;const s=this.getRealtimeUrl();return await this.establishRealtimeConnection(s,e,t,this.controller.signal)}async retryHttpConnectionWhenBackoffEnds(){let e=await this.storage.getRealtimeBackoffMetadata();e||(e={backoffEndTimeMillis:new Date(Et),numFailedStreams:St});const t=new Date(e.backoffEndTimeMillis).getTime(),s=Date.now(),i=Math.max(0,t-s);await this.makeRealtimeHttpConnection(i)}setIsHttpConnectionRunning(e){this.isConnectionActive=e}checkAndSetHttpConnectionFlagIfNotRunning(){const e=this.canEstablishStreamConnection();return e&&this.setIsHttpConnectionRunning(!0),e}fetchResponseIsUpToDate(e,t){return e.config!=null&&e.templateVersion?e.templateVersion>=t:this.storageCache.getLastFetchStatus()==="success"}parseAndValidateConfigUpdateMessage(e){const t=e.indexOf("{"),s=e.indexOf("}",t);return t<0||s<0||t>=s?"":e.substring(t,s+1)}isEventListenersEmpty(){return this.observers.size===0}getRandomInt(e){return Math.floor(Math.random()*e)}executeAllListenerCallbacks(e){this.observers.forEach(t=>t.next(e))}getChangedParams(e,t){const s=new Set,i=new Set(Object.keys(e||{})),r=new Set(Object.keys(t||{}));for(const a of i)(!r.has(a)||e[a]!==t[a])&&s.add(a);for(const a of r)i.has(a)||s.add(a);return s}async fetchLatestConfig(e,t){const s=e-1,i=_t-s,r=this.storageCache.getCustomSignals();r&&this.logger.debug(`Fetching config with custom signals: ${JSON.stringify(r)}`);const a=new on;try{const o={cacheMaxAgeMillis:0,signal:a,customSignals:r,fetchType:"REALTIME",fetchAttempt:i},c=await this.cachingClient.fetch(o);let l=await this.storage.getActiveConfig();if(!this.fetchResponseIsUpToDate(c,t)){this.logger.debug("Fetched template version is the same as SDK's current version. Retrying fetch."),await this.autoFetch(s,t);return}if(c.config==null){this.logger.debug("The fetch succeeded, but the backend had no updates.");return}l==null&&(l={});const f=this.getChangedParams(c.config,l);if(f.size===0){this.logger.debug("Config was fetched, but no params changed.");return}const u={getUpdatedKeys(){return new Set(f)}};this.executeAllListenerCallbacks(u)}catch(o){const c=o instanceof Error?o.message:String(o),l=E.create("update-not-fetched",{originalErrorMessage:`Failed to auto-fetch config update: ${c}`});this.propagateError(l)}}async autoFetch(e,t){if(e===0){const r=E.create("update-not-fetched",{originalErrorMessage:"Unable to fetch the latest version of the template."});this.propagateError(r);return}const i=this.getRandomInt(4)*1e3;await new Promise(r=>setTimeout(r,i)),await this.fetchLatestConfig(e,t)}async handleNotifications(e){let t,s="";for(;;){const{done:i,value:r}=await e.read();if(i)break;if(t=this.decoder.decode(r,{stream:!0}),s+=t,t.includes("}")){if(s=this.parseAndValidateConfigUpdateMessage(s),s.length===0)continue;try{const a=JSON.parse(s);if(this.isEventListenersEmpty())break;if(Ct in a&&a[Ct]===!0){const o=E.create("realtime-unavailable",{originalErrorMessage:"The server is temporarily unavailable. Try again in a few minutes."});this.propagateError(o);break}if(At in a){const o=await this.storage.getActiveConfigTemplateVersion(),c=Number(a[At]);o&&c>o&&await this.autoFetch(_t,c)}if(It in a){const o=Number(a[It]);await this.updateBackoffMetadataWithRetryInterval(o)}}catch(a){this.logger.debug("Unable to parse latest config update message.",a);const o=a instanceof Error?a.message:String(a);this.propagateError(E.create("update-message-invalid",{originalErrorMessage:o}))}s=""}}}async listenForNotifications(e){try{await this.handleNotifications(e)}catch{this.isInBackground||this.logger.debug("Real-time connection was closed due to an exception.")}}async prepareAndBeginRealtimeHttpStream(){if(!this.checkAndSetHttpConnectionFlagIfNotRunning())return;let e=await this.storage.getRealtimeBackoffMetadata();e||(e={backoffEndTimeMillis:new Date(Et),numFailedStreams:St});const t=e.backoffEndTimeMillis.getTime();if(Date.now()<t){await this.retryHttpConnectionWhenBackoffEnds();return}let s,i;try{if(s=await this.createRealtimeConnection(),i=s.status,s.ok&&s.body){this.resetRetryCount(),await this.resetRealtimeBackoff();const r=s.body.getReader();this.reader=r,await this.listenForNotifications(r)}}catch(r){this.isInBackground?this.resetRetryCount():this.logger.debug("Exception connecting to real-time RC backend. Retrying the connection...:",r)}finally{await this.closeRealtimeHttpConnection(),this.setIsHttpConnectionRunning(!1);const r=!this.isInBackground&&(i===void 0||this.isStatusCodeRetryable(i));if(r&&await this.updateBackoffMetadataWithLastFailedStreamConnectionTime(new Date),r||s!=null&&s.ok)await this.retryHttpConnectionWhenBackoffEnds();else{const a=`Unable to connect to the server. HTTP status code: ${i}`,o=E.create("stream-error",{originalErrorMessage:a});this.propagateError(o)}}}canEstablishStreamConnection(){const e=this.observers.size>0,t=!this.isRealtimeDisabled,s=!this.isConnectionActive,i=!this.isInBackground;return e&&t&&s&&i}async makeRealtimeHttpConnection(e){if(this.canEstablishStreamConnection()){if(this.httpRetriesRemaining>0)this.httpRetriesRemaining--,await new Promise(t=>setTimeout(t,e)),this.prepareAndBeginRealtimeHttpStream();else if(!this.isInBackground){const t=E.create("stream-error",{originalErrorMessage:"Unable to connect to the server. Check your connection and try again."});this.propagateError(t)}}}async beginRealtime(){this.observers.size>0&&await this.makeRealtimeHttpConnection(0)}addObserver(e){this.observers.add(e),this.beginRealtime()}removeObserver(e){this.observers.has(e)&&this.observers.delete(e)}async onVisibilityChange(e){this.isInBackground=!e,e?e&&await this.beginRealtime():await this.closeRealtimeHttpConnection()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ar(){ne(new J(cn,n,"PUBLIC").setMultipleInstances(!0)),z(Te,pt),z(Te,pt,"esm2020");function n(e,{options:t}){const s=e.getProvider("app").getImmediate(),i=e.getProvider("installations-internal").getImmediate(),r=e.getProvider("analytics-internal"),{projectId:a,apiKey:o,appId:c}=s.options;if(!a)throw E.create("registration-project-id");if(!o)throw E.create("registration-api-key");if(!c)throw E.create("registration-app-id");const l=(t==null?void 0:t.templateId)||"firebase",f=Ve()?new yr(c,s.name,l):new vr,u=new _r(f),d=new Ft(Te);d.logLevel=p.ERROR;const w=new lr(i,ut,l,a,o,c),b=new hr(w,f),y=new or(b,f,u,d),C=new Ir(i,f,ut,l,a,o,c,d,u,y),O=new mr(s,y,u,f,d,C,r);return un(O),O}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tr(n){return n=M(n),await dn(n),ln(n)}async function Rr(){if(!Ve())return!1;try{return await Ot()}catch{return!1}}Ar();const Vr=Object.freeze(Object.defineProperty({__proto__:null,activate:ln,ensureInitialized:un,fetchAndActivate:Tr,fetchConfig:dn,getAll:Zi,getBoolean:er,getNumber:tr,getRemoteConfig:Qi,getString:nr,getValue:oe,isSupported:Rr,onConfigUpdate:ar,setCustomSignals:rr,setLogLevel:sr},Symbol.toStringTag,{value:"Module"}));class Pr extends ae{constructor(){super(...arguments),this.pending=[],this.deliveredNotifications=[],this.hasNotificationSupport=()=>{if(!("Notification"in window)||!Notification.requestPermission)return!1;if(Notification.permission!=="granted")try{new Notification("")}catch(e){if(e instanceof Error&&e.name==="TypeError")return!1}return!0}}async getDeliveredNotifications(){const e=[];for(const t of this.deliveredNotifications){const s={title:t.title,id:parseInt(t.tag),body:t.body};e.push(s)}return{notifications:e}}async removeDeliveredNotifications(e){for(const t of e.notifications){const s=this.deliveredNotifications.find(i=>i.tag===String(t.id));s==null||s.close(),this.deliveredNotifications=this.deliveredNotifications.filter(()=>!s)}}async removeAllDeliveredNotifications(){for(const e of this.deliveredNotifications)e.close();this.deliveredNotifications=[]}async createChannel(){throw this.unimplemented("Not implemented on web.")}async deleteChannel(){throw this.unimplemented("Not implemented on web.")}async listChannels(){throw this.unimplemented("Not implemented on web.")}async schedule(e){if(!this.hasNotificationSupport())throw this.unavailable("Notifications not supported in this browser.");for(const t of e.notifications)this.sendNotification(t);return{notifications:e.notifications.map(t=>({id:t.id}))}}async getPending(){return{notifications:this.pending}}async registerActionTypes(){throw this.unimplemented("Not implemented on web.")}async cancel(e){this.pending=this.pending.filter(t=>!e.notifications.find(s=>s.id===t.id))}async areEnabled(){const{display:e}=await this.checkPermissions();return{value:e==="granted"}}async changeExactNotificationSetting(){throw this.unimplemented("Not implemented on web.")}async checkExactNotificationSetting(){throw this.unimplemented("Not implemented on web.")}async requestPermissions(){if(!this.hasNotificationSupport())throw this.unavailable("Notifications not supported in this browser.");return{display:this.transformNotificationPermission(await Notification.requestPermission())}}async checkPermissions(){if(!this.hasNotificationSupport())throw this.unavailable("Notifications not supported in this browser.");return{display:this.transformNotificationPermission(Notification.permission)}}transformNotificationPermission(e){switch(e){case"granted":return"granted";case"denied":return"denied";default:return"prompt"}}sendPending(){var e;const t=[],s=new Date().getTime();for(const i of this.pending)!((e=i.schedule)===null||e===void 0)&&e.at&&i.schedule.at.getTime()<=s&&(this.buildNotification(i),t.push(i));this.pending=this.pending.filter(i=>!t.find(r=>r===i))}sendNotification(e){var t;if(!((t=e.schedule)===null||t===void 0)&&t.at){const s=e.schedule.at.getTime()-new Date().getTime();this.pending.push(e),setTimeout(()=>{this.sendPending()},s);return}this.buildNotification(e)}buildNotification(e){const t=new Notification(e.title,{body:e.body,tag:String(e.id)});return t.addEventListener("click",this.onClick.bind(this,e),!1),t.addEventListener("show",this.onShow.bind(this,e),!1),t.addEventListener("close",()=>{this.deliveredNotifications=this.deliveredNotifications.filter(()=>!this)},!1),this.deliveredNotifications.push(t),t}onClick(e){const t={actionId:"tap",notification:e};this.notifyListeners("localNotificationActionPerformed",t)}onShow(e){this.notifyListeners("localNotificationReceived",e)}}const kr=Object.freeze(Object.defineProperty({__proto__:null,LocalNotificationsWeb:Pr},Symbol.toStringTag,{value:"Module"}));try{self["workbox:window:7.3.0"]&&_()}catch{}function Ue(n,e){return new Promise((function(t){var s=new MessageChannel;s.port1.onmessage=function(i){t(i.data)},n.postMessage(e,[s.port2])}))}function Tt(n,e){(e==null||e>n.length)&&(e=n.length);for(var t=0,s=Array(e);t<e;t++)s[t]=n[t];return s}function Dr(n,e){for(var t=0;t<e.length;t++){var s=e[t];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(n,Lr(s.key),s)}}function Mr(n,e){var t=typeof Symbol<"u"&&n[Symbol.iterator]||n["@@iterator"];if(t)return(t=t.call(n)).next.bind(t);if(Array.isArray(n)||(t=(function(i,r){if(i){if(typeof i=="string")return Tt(i,r);var a={}.toString.call(i).slice(8,-1);return a==="Object"&&i.constructor&&(a=i.constructor.name),a==="Map"||a==="Set"?Array.from(i):a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Tt(i,r):void 0}})(n))||e){t&&(n=t);var s=0;return function(){return s>=n.length?{done:!0}:{done:!1,value:n[s++]}}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function He(n,e){return He=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,s){return t.__proto__=s,t},He(n,e)}function Lr(n){var e=(function(t,s){if(typeof t!="object"||!t)return t;var i=t[Symbol.toPrimitive];if(i!==void 0){var r=i.call(t,s);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)})(n,"string");return typeof e=="symbol"?e:e+""}try{self["workbox:core:7.3.0"]&&_()}catch{}var ke=function(){var n=this;this.promise=new Promise((function(e,t){n.resolve=e,n.reject=t}))};function De(n,e){var t=location.href;return new URL(n,t).href===new URL(e,t).href}var ee=function(n,e){this.type=n,Object.assign(this,e)};function j(n,e,t){return t?e?e(n):n:(n&&n.then||(n=Promise.resolve(n)),e?n.then(e):n)}function Or(){}var Nr={type:"SKIP_WAITING"};function Rt(n,e){return n&&n.then?n.then(Or):Promise.resolve()}var Fr=(function(n){function e(r,a){var o,c;return a===void 0&&(a={}),(o=n.call(this)||this).nn={},o.tn=0,o.rn=new ke,o.en=new ke,o.on=new ke,o.un=0,o.an=new Set,o.cn=function(){var l=o.fn,f=l.installing;o.tn>0||!De(f.scriptURL,o.sn.toString())||performance.now()>o.un+6e4?(o.vn=f,l.removeEventListener("updatefound",o.cn)):(o.hn=f,o.an.add(f),o.rn.resolve(f)),++o.tn,f.addEventListener("statechange",o.ln)},o.ln=function(l){var f=o.fn,u=l.target,d=u.state,w=u===o.vn,b={sw:u,isExternal:w,originalEvent:l};!w&&o.mn&&(b.isUpdate=!0),o.dispatchEvent(new ee(d,b)),d==="installed"?o.wn=self.setTimeout((function(){d==="installed"&&f.waiting===u&&o.dispatchEvent(new ee("waiting",b))}),200):d==="activating"&&(clearTimeout(o.wn),w||o.en.resolve(u))},o.yn=function(l){var f=o.hn,u=f!==navigator.serviceWorker.controller;o.dispatchEvent(new ee("controlling",{isExternal:u,originalEvent:l,sw:f,isUpdate:o.mn})),u||o.on.resolve(f)},o.gn=(c=function(l){var f=l.data,u=l.ports,d=l.source;return j(o.getSW(),(function(){o.an.has(d)&&o.dispatchEvent(new ee("message",{data:f,originalEvent:l,ports:u,sw:d}))}))},function(){for(var l=[],f=0;f<arguments.length;f++)l[f]=arguments[f];try{return Promise.resolve(c.apply(this,l))}catch(u){return Promise.reject(u)}}),o.sn=r,o.nn=a,navigator.serviceWorker.addEventListener("message",o.gn),o}var t,s;s=n,(t=e).prototype=Object.create(s.prototype),t.prototype.constructor=t,He(t,s);var i=e.prototype;return i.register=function(r){var a=(r===void 0?{}:r).immediate,o=a!==void 0&&a;try{var c=this;return j((function(l,f){var u=l();return u&&u.then?u.then(f):f(u)})((function(){if(!o&&document.readyState!=="complete")return Rt(new Promise((function(l){return window.addEventListener("load",l)})))}),(function(){return c.mn=!!navigator.serviceWorker.controller,c.dn=c.pn(),j(c.bn(),(function(l){c.fn=l,c.dn&&(c.hn=c.dn,c.en.resolve(c.dn),c.on.resolve(c.dn),c.dn.addEventListener("statechange",c.ln,{once:!0}));var f=c.fn.waiting;return f&&De(f.scriptURL,c.sn.toString())&&(c.hn=f,Promise.resolve().then((function(){c.dispatchEvent(new ee("waiting",{sw:f,wasWaitingBeforeRegister:!0}))})).then((function(){}))),c.hn&&(c.rn.resolve(c.hn),c.an.add(c.hn)),c.fn.addEventListener("updatefound",c.cn),navigator.serviceWorker.addEventListener("controllerchange",c.yn),c.fn}))})))}catch(l){return Promise.reject(l)}},i.update=function(){try{return this.fn?j(Rt(this.fn.update())):j()}catch(r){return Promise.reject(r)}},i.getSW=function(){return this.hn!==void 0?Promise.resolve(this.hn):this.rn.promise},i.messageSW=function(r){try{return j(this.getSW(),(function(a){return Ue(a,r)}))}catch(a){return Promise.reject(a)}},i.messageSkipWaiting=function(){this.fn&&this.fn.waiting&&Ue(this.fn.waiting,Nr)},i.pn=function(){var r=navigator.serviceWorker.controller;return r&&De(r.scriptURL,this.sn.toString())?r:void 0},i.bn=function(){try{var r=this;return j((function(a,o){try{var c=a()}catch(l){return o(l)}return c&&c.then?c.then(void 0,o):c})((function(){return j(navigator.serviceWorker.register(r.sn,r.nn),(function(a){return r.un=performance.now(),a}))}),(function(a){throw a})))}catch(a){return Promise.reject(a)}},(function(r,a,o){return a&&Dr(r.prototype,a),Object.defineProperty(r,"prototype",{writable:!1}),r})(e,[{key:"active",get:function(){return this.en.promise}},{key:"controlling",get:function(){return this.on.promise}}])})((function(){function n(){this.Pn=new Map}var e=n.prototype;return e.addEventListener=function(t,s){this.jn(t).add(s)},e.removeEventListener=function(t,s){this.jn(t).delete(s)},e.dispatchEvent=function(t){t.target=this;for(var s,i=Mr(this.jn(t.type));!(s=i()).done;)(0,s.value)(t)},e.jn=function(t){return this.Pn.has(t)||this.Pn.set(t,new Set),this.Pn.get(t)},n})());const zr=Object.freeze(Object.defineProperty({__proto__:null,Workbox:Fr,WorkboxEvent:ee,messageSW:Ue},Symbol.toStringTag,{value:"Module"}));export{xr as a,Ur as b,Hr as c,Vr as d,jr as g,Vs as i,$r as r,zr as w};
