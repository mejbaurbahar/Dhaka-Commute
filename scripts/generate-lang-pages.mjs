// Generates localized static landing pages (dist/{lang}/index.html) for all 10
// UI languages, so each country's Google can index koyjabo.com in its own
// language. Run post-build from vite.config.ts closeBundle (same as sitemap).
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'dist');

export const LANGS = [
  { code: 'bn', dirAttr: 'ltr', name: 'বাংলা', title: 'কই যাবো (Koy Jabo) – বাংলাদেশের বাস, মেট্রো, ট্রেন, লঞ্চ ও বিমানের রুট ফাইন্ডার', desc: 'ঢাকার ২০০+ লোকাল বাস রুট, মেট্রো রেল (MRT-6), সব ৬৪ জেলার আন্তঃনগর বাস/ট্রেন/লঞ্চ/ফ্লাইটের ভাড়া ও সময়সূচি। ১০ ভাষায়, বিনামূল্যে, অফলাইনে কাজ করে।', h1: 'কই যাবো? সব জায়গার রুট, ভাড়া ও সময় এক অ্যাপে।', body: 'বাংলাদেশের যেকোনো যাত্রার পরিকল্পনা করুন: লোকাল বাস, মেট্রো, আন্তঃনগর বাস, ট্রেন, লঞ্চ ও বিমান — ভাড়া, সময়সূচি ও সেরা রুট সহ। ৮৪+ পর্যটন স্থানের তথ্য ও ভ্রমণ পরিকল্পনা জেনারেটরও আছে।' },
  { code: 'en', dirAttr: 'ltr', name: 'English', title: 'Koy Jabo (কই যাবো) – Bangladesh Bus, Metro, Train, Launch & Flight Route Finder', desc: '200+ Dhaka local bus routes, Metro Rail MRT-6, intercity bus/train/launch/flight fares & schedules across all 64 districts. 10 languages, free, works offline.', h1: 'Where to go? Routes, fares & times for all of Bangladesh.', body: 'Plan any journey in Bangladesh: local buses, Metro Rail, intercity buses, trains, launches and flights — with fares, schedules and the best route. Also 84+ tourist destinations and a tour-plan generator.' },
  { code: 'hi', dirAttr: 'ltr', name: 'हिन्दी', title: 'Koy Jabo (কই যাবো) – बांग्लादेश बस, मेट्रो, ट्रेन, लॉन्च और फ्लाइट रूट फाइंडर', desc: 'ढाका की 200+ स्थानीय बसें, मेट्रो रेल MRT-6, 64 जिलों की इंटरसिटी बस/ट्रेन/लॉन्च/फ्लाइट किराया और समय-सारिणी। 10 भाषाओं में, मुफ़्त, ऑफ़लाइन काम करता है।', h1: 'कहाँ जाएँ? पूरे बांग्लादेश के रूट, किराया और समय।', body: 'बांग्लादेश की किसी भी यात्रा की योजना बनाएँ: लोकल बस, मेट्रो, इंटरसिटी बस, ट्रेन, लॉन्च और फ्लाइट — किराया, समय और सबसे अच्छा रूट। 84+ पर्यटन स्थल और टूर प्लान जेनरेटर भी।' },
  { code: 'ja', dirAttr: 'ltr', name: '日本語', title: 'Koy Jabo（কই যাবো）– バングラデシュのバス・メトロ・列車・フェリー・航空便ルート検索', desc: 'ダッカの200以上のローカルバス、メトロレールMRT-6、全64県の都市間バス・列車・フェリー・航空便の運賃と時刻表。10言語対応、無料、オフラインでも動作。', h1: 'どこへ行く？バングラデシュ全土のルート・運賃・所要時間。', body: 'バングラデシュのどんな旅も計画できます：ローカルバス、メトロ、都市間バス、列車、フェリー、航空便 — 運賃、時刻表、最適ルート付き。84以上の観光地と旅行プラン生成機能も搭載。' },
  { code: 'ko', dirAttr: 'ltr', name: '한국어', title: 'Koy Jabo (কই যাবো) – 방글라데시 버스·지하철·기차·페리·항공편 노선 검색', desc: '다카의 200개 이상 로컬 버스, 지하철 MRT-6, 전 64개 지역의 시외버스·기차·페리·항공편 요금과 시간표. 10개 언어, 무료, 오프라인 지원.', h1: '어디로 갈까? 방글라데시 전체의 노선·요금·소요시간.', body: '방글라데시의 모든 여행을 계획하세요: 로컬 버스, 지하철, 시외버스, 기차, 페리, 항공편 — 요금, 시간표, 최적 노선 포함. 84개 이상 관광지와 여행 일정 생성 기능도 제공.' },
  { code: 'zh', dirAttr: 'ltr', name: '中文', title: 'Koy Jabo（কই যাবো）– 孟加拉国巴士、地铁、火车、渡轮和航班路线查询', desc: '达卡200多条本地巴士、地铁MRT-6、全部64个县的城际巴士/火车/渡轮/航班票价和时间表。支持10种语言，免费，可离线使用。', h1: '去哪儿？全孟加拉国的路线、票价和时间。', body: '规划您在孟加拉国的任何旅程：本地巴士、地铁、城际巴士、火车、渡轮和航班——含票价、时刻表和最佳路线。还有84+旅游景点和行程生成器。' },
  { code: 'fr', dirAttr: 'ltr', name: 'Français', title: 'Koy Jabo (কই যাবো) – Recherche de bus, métro, train, bateau et vol au Bangladesh', desc: 'Plus de 200 bus locaux à Dhaka, le métro MRT-6, les tarifs et horaires des bus/trains/bateaux/vols interurbains dans les 64 districts. 10 langues, gratuit, fonctionne hors ligne.', h1: 'Où aller ? Routes, tarifs et horaires pour tout le Bangladesh.', body: 'Planifiez n’importe quel voyage au Bangladesh : bus locaux, métro, bus interurbains, trains, bateaux et vols — avec tarifs, horaires et meilleur itinéraire. Plus de 84 destinations touristiques et un générateur de circuits.' },
  { code: 'de', dirAttr: 'ltr', name: 'Deutsch', title: 'Koy Jabo (কই যাবো) – Bus-, U-Bahn-, Zug-, Fähr- und Flugrouten in Bangladesch', desc: 'Über 200 lokale Busrouten in Dhaka, Metro MRT-6, Preise und Fahrpläne für Überlandbusse/Züge/Fähren/Flüge in allen 64 Distrikten. 10 Sprachen, kostenlos, offline nutzbar.', h1: 'Wohin? Routen, Preise und Zeiten für ganz Bangladesch.', body: 'Planen Sie jede Reise in Bangladesch: lokale Busse, Metro, Überlandbusse, Züge, Fähren und Flüge — mit Preisen, Fahrplänen und der besten Route. Außerdem 84+ Touristenziele und ein Reiseplan-Generator.' },
  { code: 'es', dirAttr: 'ltr', name: 'Español', title: 'Koy Jabo (কই যাবো) – Buscador de rutas de bus, metro, tren, ferry y vuelos en Bangladés', desc: 'Más de 200 rutas de bus local en Daca, Metro MRT-6, tarifas y horarios de bus/tren/ferry/vuelos interurbanos en los 64 distritos. 10 idiomas, gratis, funciona sin conexión.', h1: '¿A dónde ir? Rutas, tarifas y horarios de todo Bangladés.', body: 'Planifica cualquier viaje en Bangladés: buses locales, metro, buses interurbanos, trenes, ferries y vuelos — con tarifas, horarios y la mejor ruta. También 84+ destinos turísticos y un generador de itinerarios.' },
  { code: 'ar', dirAttr: 'rtl', name: 'العربية', title: 'كوي جابو (কই যাবো) – البحث عن خطوط الحافلات والمترو والقطار والعبارات والطيران في بنغلاديش', desc: 'أكثر من 200 خط حافلات محلية في دكا، مترو MRT-6، أسعار ومواعيد الحافلات/القطارات/العبارات/الطيران بين المدن في 64 مقاطعة. 10 لغات، مجاني، يعمل دون إنترنت.', h1: 'إلى أين؟ خطوط وأسعار وأوقات لكل بنغلاديش.', body: 'خطط لأي رحلة في بنغلاديش: حافلات محلية، مترو، حافلات بين المدن، قطارات، عبارات وطيران — مع الأسعار والمواعيد وأفضل خط. وأيضاً أكثر من 84 وجهة سياحية ومولّد خطط السفر.' },
];

const FEATURES = [
  '🚌 200+ Dhaka local bus routes',
  '🚇 Metro Rail MRT-6 fares & stations',
  '🚆 Intercity trains with seats & fares',
  '⛴️ Launch routes from Sadarghat',
  '✈️ Domestic flights (Cox\'s Bazar, Sylhet…)',
  '🧭 84+ tourist destinations',
  '📅 Tour-plan generator',
  '🤖 AI transport assistant',
];

function hreflangBlock() {
  return LANGS.map(l =>
    `    <link rel="alternate" hreflang="${l.code}" href="https://koyjabo.com/${l.code}/" />`
  ).join('\n');
}

function page(l) {
  return `<!DOCTYPE html>
<html lang="${l.code}" dir="${l.dirAttr}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${l.title}</title>
  <meta name="description" content="${l.desc}" />
  <link rel="canonical" href="https://koyjabo.com/${l.code}/" />
${hreflangBlock()}
    <link rel="alternate" hreflang="x-default" href="https://koyjabo.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://koyjabo.com/${l.code}/" />
  <meta property="og:title" content="${l.title}" />
  <meta property="og:description" content="${l.desc}" />
  <meta property="og:site_name" content="Koy Jabo" />
  <meta name="robots" content="index,follow" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Koy Jabo (কই যাবো)",
    "url": "https://koyjabo.com/${l.code}/",
    "inLanguage": "${l.code}",
    "description": "${l.desc}",
    "potentialAction": { "@type": "SearchAction", "target": "https://koyjabo.com/?q={search_term_string}", "query-input": "required name=search_term_string" }
  }
  </script>
  <style>
    body { margin:0; font-family: -apple-system, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color:#e2e8f0; line-height:1.7; }
    .wrap { max-width: 760px; margin: 0 auto; padding: 48px 24px 72px; }
    h1 { font-size: 30px; margin: 16px 0 12px; line-height: 1.3; }
    p { font-size: 16px; color:#94a3b8; }
    .cta { display:inline-block; margin-top: 20px; background: #22d3ee; color:#0f172a; font-weight:700; text-decoration:none; padding: 14px 28px; border-radius: 999px; font-size: 17px; }
    .feat { display:grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 28px 0 0; padding:0; list-style:none; }
    .feat li { background:#1e293b; border:1px solid #334155; border-radius:12px; padding:12px 14px; font-size:14px; }
    @media (max-width:560px){ .feat { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <div class="wrap">
    <div style="font-size:13px;letter-spacing:2px;color:#22d3ee;font-weight:700">KOY JABO · কই যাবো</div>
    <h1>${l.h1}</h1>
    <p>${l.body}</p>
    <a class="cta" href="/">Open Koy Jabo →</a>
    <ul class="feat">
      ${FEATURES.map(f => `<li>${f}</li>`).join('\n      ')}
    </ul>
  </div>
</body>
</html>
`;
}

for (const l of LANGS) {
  const dir = join(OUT, l.code);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), page(l));
  console.log(`✅ ${join(dir, 'index.html')} — ${l.name}`);
}
console.log(`✅ ${LANGS.length} localized landing pages`);
