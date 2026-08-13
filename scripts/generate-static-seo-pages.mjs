#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BUS_PAIRS, INTERCHANGE_PAIRS, pairPath, interchangePath } from './bus-pairs.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
const baseUrl = 'https://koyjabo.com';
const templatePath = path.join(dist, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html not found. Run this after vite build.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripMarkdown(value) {
  return String(value ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/[#*_>|-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(value, max = 155) {
  const clean = stripMarkdown(value);
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/paribahan/g, '')
    .replace(/&/g, ' and ')
    .normalize('NFKD')
    .replace(/[^\w\sঀ-৿-]/g, ' ')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function replaceMeta(html, name, content) {
  const escaped = escapeHtml(content);
  const re = new RegExp(`<meta\\s+name="${name}"\\s+content="[^"]*"\\s*/?>`, 'i');
  if (re.test(html)) return html.replace(re, `<meta name="${name}" content="${escaped}" />`);
  return html.replace('</head>', `  <meta name="${name}" content="${escaped}" />\n</head>`);
}

function replaceProperty(html, property, content) {
  const escaped = escapeHtml(content);
  const re = new RegExp(`<meta\\s+property="${property}"\\s+content="[^"]*"\\s*/?>`, 'i');
  if (re.test(html)) return html.replace(re, `<meta property="${property}" content="${escaped}" />`);
  return html.replace('</head>', `  <meta property="${property}" content="${escaped}" />\n</head>`);
}

function replaceLink(html, rel, href) {
  const escaped = escapeHtml(href);
  const re = new RegExp(`<link\\s+rel="${rel}"\\s+href="[^"]*"\\s*/?>`, 'i');
  if (re.test(html)) return html.replace(re, `<link rel="${rel}" href="${escaped}" />`);
  return html.replace('</head>', `  <link rel="${rel}" href="${escaped}" />\n</head>`);
}

function jsonLdScript(id, data) {
  return `<script type="application/ld+json" data-static-seo="${id}">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

function canonicalPath(pathname) {
  return pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`;
}

// Legacy URLs (id-form: underscore bus slugs, train ids with -NN number) no longer have
// static pages — the SPA switched to name-derived dash slugs. Serve meta-refresh redirect
// pages so GH Pages returns 200 and Google follows to the canonical URL.
function renderRedirectPage(fromPath, toPath) {
  const url = `${baseUrl}${canonicalPath(toPath)}`;
  const outDir = path.join(dist, fromPath.replace(/^\/+/, ''), 'index.html');
  fs.mkdirSync(path.dirname(outDir), { recursive: true });
  const html = `<!doctype html>
<html lang="bn">
<head>
<meta charset="utf-8" />
<title>Redirecting…</title>
<meta name="robots" content="noindex" />
<meta name="description" content="Redirecting to ${escapeHtml(url)}" />
<link rel="canonical" href="${escapeHtml(url)}" />
<meta http-equiv="refresh" content="0; url=${escapeHtml(url)}" />
</head>
<body>
<script>location.replace(${JSON.stringify(url)});</script>
<p>Redirecting to <a href="${escapeHtml(url)}">${escapeHtml(url)}</a></p>
</body>
</html>`;
  fs.writeFileSync(outDir, html, 'utf8');
}

function renderPage({ path: pagePath, title, description, keywords = [], bodyHtml, schema, faq }) {
  const url = `${baseUrl}${canonicalPath(pagePath)}`;
  const fullTitle = title.includes('KoyJabo') || title.includes('কই যাবো') ? title : `${title} | KoyJabo`;
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(fullTitle)}</title>`);
  html = replaceMeta(html, 'description', description);
  html = replaceMeta(html, 'aeo-description', description);
  html = replaceMeta(html, 'summary', description);
  html = replaceMeta(html, 'keywords', keywords.join(', '));
  html = replaceMeta(html, 'twitter:title', fullTitle);
  html = replaceMeta(html, 'twitter:description', description);
  html = replaceProperty(html, 'og:title', fullTitle);
  html = replaceProperty(html, 'og:description', description);
  html = replaceProperty(html, 'og:url', url);
  html = replaceLink(html, 'canonical', url);
  html = html.replace('</head>', `  ${jsonLdScript('route', schema)}${faq ? `\n  ${jsonLdScript('faq', { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq })}` : ''}\n</head>`);
  html = html.replace('<div id="root"></div>', `<main class="kj-static-seo" style="position:absolute;left:-9999px;top:0;width:1px;overflow:hidden" aria-hidden="true">${bodyHtml}</main>\n  <div id="root"></div>`);

  const outDir = path.join(dist, pagePath.replace(/^\/+/, ''), 'index.html');
  fs.mkdirSync(path.dirname(outDir), { recursive: true });
  fs.writeFileSync(outDir, html, 'utf8');
  return outDir;
}

function extractBlogPosts() {
  const content = fs.readFileSync(path.join(root, 'data', 'blogPosts.ts'), 'utf8');
  const values = field => [...content.matchAll(new RegExp(`${field}:\\s*'([^']+)'`, 'g'))].map(match => match[1]);
  const ids = values('id');
  const slugs = values('slug');
  const titles = values('title');
  const excerpts = values('excerpt');
  const dates = values('publishDate');
  const categories = values('category');
  // Post bodies are backtick template literals — capture the text between
  // `content:` and the next field, then trim the surrounding backticks.
  const bodyRe = /content:\s*`([\s\S]*?)`\s*,\s*\n\s*bnContent:/g;
  const bodies = [...content.matchAll(bodyRe)].map(m => m[1]);
  return slugs.map((slug, index) => ({
    id: ids[index] || slug,
    slug,
    title: titles[index] || slug.replace(/-/g, ' '),
    excerpt: excerpts[index] || 'KoyJabo Bangladesh transport and travel guide.',
    publishDate: dates[index] || new Date().toISOString().slice(0, 10),
    category: categories[index] || 'Guide',
    content: bodies[index] || '',
  }));
}

// Minimal markdown → HTML for static blog pages (headings, tables, lists,
// blockquotes, bold, links). Just enough for crawlable, content-rich pages.
function renderMarkdown(md) {
  const inline = (text) => text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
  const blocks = [];
  let list = null;
  let table = null;
  const pushList = () => {
    if (list) { blocks.push(`<ul>\n${list.map(li => `  <li>${inline(li)}</li>`).join('\n')}\n</ul>`); list = null; }
  };
  const pushTable = () => {
    if (!table) return;
    const [headerRow, ...bodyRows] = table;
    const cells = (row) => row.map(c => `<td>${inline(c)}</td>`).join('');
    const headHtml = headerRow ? `<thead><tr>${headerRow.map(c => `<th>${inline(c)}</th>`).join('')}</tr></thead>` : '';
    const bodyHtml = bodyRows.length ? `<tbody>${bodyRows.map(r => `<tr>${cells(r)}</tr>`).join('')}</tbody>` : '';
    blocks.push(`<table>${headHtml}${bodyHtml}</table>`);
    table = null;
  };
  for (const rawLine of md.split('\n')) {
    const line = rawLine.trimEnd();
    if (!line.trim()) { pushList(); pushTable(); continue; }
    if (line.startsWith('|') && line.endsWith('|')) {
      pushList();
      const cells = line.split('|').slice(1, -1).map(c => c.trim());
      if (cells.every(c => /^:?-{3,}:?$/.test(c))) continue; // separator row
      table = table || [];
      table.push(cells);
      continue;
    }
    pushTable();
    if (line.startsWith('## ')) { pushList(); blocks.push(`<h2>${inline(line.slice(3))}</h2>`); continue; }
    if (line.startsWith('### ')) { pushList(); blocks.push(`<h3>${inline(line.slice(4))}</h3>`); continue; }
    if (line.startsWith('- ')) { list = list || []; list.push(line.slice(2)); continue; }
    if (line.startsWith('> ')) { pushList(); blocks.push(`<blockquote>${inline(line.slice(2))}</blockquote>`); continue; }
    if (/^\s*---+/.test(line)) { pushList(); blocks.push('<hr />'); continue; }
    if (/^\d+\.\s/.test(line)) { list = list || []; list.push(line.replace(/^\d+\.\s/, '')); continue; }
    pushList();
    blocks.push(`<p>${inline(line)}</p>`);
  }
  pushList();
  pushTable();
  return blocks.join('\n');
}

function extractStationNames() {
  const content = fs.readFileSync(path.join(root, 'constants.ts'), 'utf8');
  const start = content.indexOf('export const STATIONS');
  if (start === -1) return {};
  const section = content.slice(start);
  const nextExport = section.indexOf('\nexport const ', 10);
  const bounded = nextExport !== -1 ? section.slice(0, nextExport) : section;
  const names = {};
  const objectRe = /'([^']+)':\s*\{\s*id:\s*'[^']+'\s*,\s*name:\s*'([^']+)'/g;
  let match;
  while ((match = objectRe.exec(bounded)) !== null) names[match[1]] = match[2];
  return names;
}

function extractBusRoutes() {
  const content = fs.readFileSync(path.join(root, 'constants.ts'), 'utf8');
  const start = content.indexOf('export const BUS_DATA');
  if (start === -1) return [];
  const section = content.slice(start);
  const nextExport = section.indexOf('\nexport const ', 10);
  const bounded = nextExport !== -1 ? section.slice(0, nextExport) : section;
  const routes = [];
  const objectRe = /id:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'[\s\S]*?bnName:\s*'([^']+)'[\s\S]*?stops:\s*\[([^\]]*)\]/g;
  let match;
  while ((match = objectRe.exec(bounded)) !== null) {
    routes.push({
      id: match[1],
      name: match[2],
      bnName: match[3],
      stops: match[4].split(',').map(s => s.trim().replace(/^'|'$/g, '')).filter(Boolean),
      slug: slugify(match[2] || match[1]),
    });
  }
  return routes;
}

function extractIntercityOperators() {
  const content = fs.readFileSync(path.join(root, 'data', 'intercityOperatorData.ts'), 'utf8');
  const start = content.indexOf('export const BUS_OPERATOR_DETAILS');
  if (start === -1) return [];
  const section = content.slice(start);
  const ops = [];
  // Same anchor as generate-sitemap.mjs — top-level operators only (id, name,
  // bnName, shortName sequence; route/stop objects don't carry all four).
  const opRe = /id:\s*'([^']+)'\s*,\s*name:\s*'([^']+)'\s*,\s*bnName:\s*'([^']+)'\s*,\s*shortName:\s*'([^']+)'/g;
  let m;
  while ((m = opRe.exec(section)) !== null) {
    const nextOp = opRe.lastIndex; // advance manually below
    const bodyEnd = section.indexOf('\n  {', nextOp);
    const body = bodyEnd === -1 ? section.slice(nextOp) : section.slice(nextOp, bodyEnd);
    const routes = [];
    const routeRe = /from:\s*'([^']+)'\s*,\s*to:\s*'([^']+)'\s*,\s*fromBn:\s*'[^']+'\s*,\s*toBn:\s*'[^']+'\s*,\s*dhakaCounters:\s*\[([^\]]*)\][\s\S]*?distanceKm:\s*(\d+)[\s\S]*?durationHrs:\s*'([^']+)'[\s\S]*?fareNonAC:\s*'([^']+)'(?:\s*,\s*fareAC:\s*'([^']+)')?\s*,\s*departureTimes:\s*\[([^\]]*)\]/g;
    let r;
    while ((r = routeRe.exec(body)) !== null) {
      routes.push({
        from: r[1], to: r[2],
        counters: r[3].split(',').map(s => s.trim().replace(/^'|'$/g, '')).filter(Boolean),
        distanceKm: Number(r[4]), duration: r[5],
        fareNonAC: r[6], fareAC: r[7] || '',
        departures: r[8].split(',').map(s => s.trim().replace(/^'|'$/g, '')).filter(Boolean),
      });
    }
    ops.push({ id: m[1], name: m[2], bnName: m[3], shortName: m[4], slug: slugify(m[2] || m[1]), routes });
  }
  return ops;
}

function extractTrainRoutes() {
  const content = fs.readFileSync(path.join(root, 'data', 'bangladeshTrainData.ts'), 'utf8');
  const start = content.indexOf('export const BD_TRAIN_ROUTES');
  if (start === -1) return [];
  const section = content.slice(start);
  const nextExport = section.indexOf('\nexport ', 10);
  const bounded = nextExport !== -1 ? section.slice(0, nextExport) : section;
  const routes = [];
  const objectRe = /id:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'[\s\S]*?bnName:\s*'([^']+)'[\s\S]*?number:\s*'([^']+)'[\s\S]*?from:\s*'([^']+)'[\s\S]*?to:\s*'([^']+)'[\s\S]*?offDay:\s*'([^']+)'[\s\S]*?totalDuration:\s*'([^']+)'[\s\S]*?fare:\{shuvan:(\d+)/g;
  let match;
  while ((match = objectRe.exec(bounded)) !== null) {
    routes.push({
      id: match[1],
      name: match[2],
      bnName: match[3],
      number: match[4],
      from: match[5],
      to: match[6],
      offDay: match[7],
      duration: match[8],
      shuvanFare: match[9],
      slug: slugify(match[2] || match[1]),
    });
  }
  return routes;
}

function renderHubPages() {
  const hubs = [
    {
      path: '/metro',
      title: 'Dhaka Metro Rail MRT Line 6 Fare, Route & Stations',
      description: 'Dhaka Metro Rail MRT Line 6 guide: Uttara to Motijheel route, station list, fare range, MRT Pass tips and Bengali-English travel help.',
      keywords: ['Dhaka Metro Rail', 'MRT Line 6', 'metro fare Dhaka', 'মেট্রো রেল ভাড়া'],
      heading: 'Dhaka Metro Rail MRT Line 6',
      text: 'Find Dhaka Metro Rail stations, MRT Line 6 fares, ticket guidance, MRT Pass information and bus connections around each station.',
      aboutType: 'TrainTrip',
    },
    {
      path: '/train',
      title: 'Bangladesh Train Schedule, Fare & Route Guide',
      description: 'Search Bangladesh Railway train routes, schedules, off days and fares from Dhaka to Chattogram, Sylhet, Cox’s Bazar, Rajshahi and more.',
      keywords: ['Bangladesh train schedule', 'train fare Bangladesh', 'Dhaka train route', 'বাংলাদেশ ট্রেন সময়সূচী'],
      heading: 'Bangladesh Train Schedule and Fare Guide',
      text: 'KoyJabo lists Bangladesh Railway train routes, departure times, off days, duration and fare guidance for major intercity trains.',
      aboutType: 'TrainTrip',
    },
    {
      path: '/intercity',
      title: 'Bangladesh Intercity Bus Routes & Fare Guide',
      description: 'Find intercity bus routes and fares from Dhaka to all major Bangladesh districts including Chattogram, Sylhet, Cox’s Bazar, Rajshahi and Khulna.',
      keywords: ['Bangladesh intercity bus', 'Dhaka to Chittagong bus', 'Dhaka to Cox’s Bazar bus', 'intercity bus fare Bangladesh'],
      heading: 'Bangladesh Intercity Bus Routes',
      text: 'Compare intercity bus routes, operators, terminals and fare guidance for travel from Dhaka to major districts across Bangladesh.',
      aboutType: 'BusTrip',
    },
    {
      path: '/blog',
      title: 'Bangladesh Transport Blog - Travel Guides & Updates',
      description: 'Read Bangladesh transport guides, Dhaka bus tips, Metro Rail explainers, train and intercity travel updates from KoyJabo.',
      keywords: ['Bangladesh transport blog', 'Dhaka travel guide', 'KoyJabo blog', 'Bangladesh bus guide'],
      heading: 'Bangladesh Transport Blog',
      text: 'KoyJabo blog covers Dhaka buses, Metro Rail, Bangladesh train routes, intercity buses, airport arrivals, travel costs and transport news.',
      aboutType: 'Blog',
    },
    {
      path: '/fare',
      title: 'Bangladesh Transport Fare Calculator',
      description: 'Estimate Dhaka bus, metro, train and intercity travel fares with KoyJabo’s Bangladesh transport fare calculator.',
      keywords: ['bus fare calculator Bangladesh', 'Dhaka bus fare', 'metro fare Dhaka', 'transport fare Bangladesh'],
      heading: 'Bangladesh Transport Fare Calculator',
      text: 'Estimate fares for Dhaka bus routes, Metro Rail, train and intercity transport using KoyJabo fare tools.',
      aboutType: 'WebApplication',
    },
    {
      path: '/air',
      title: 'Bangladesh Flight Routes & Airport Travel Guide',
      description: 'Plan domestic flights in Bangladesh, airport transfers and route options from Dhaka to Cox’s Bazar, Chattogram, Sylhet and more.',
      keywords: ['Bangladesh flight routes', 'Dhaka airport guide', 'domestic flight Bangladesh', 'Dhaka to Cox’s Bazar flight'],
      heading: 'Bangladesh Flight Routes',
      text: 'Find domestic flight routes, airport transfer tips and Bangladesh travel options around Dhaka, Cox’s Bazar, Chattogram and Sylhet.',
      aboutType: 'Flight',
    },
    {
      path: '/launch',
      title: 'Bangladesh Launch & River Route Guide',
      description: 'Find Bangladesh launch and river routes from Dhaka Sadarghat to Barisal, Chandpur, Khulna and other river destinations.',
      keywords: ['Bangladesh launch route', 'Dhaka Sadarghat launch', 'Dhaka to Barisal launch', 'river transport Bangladesh'],
      heading: 'Bangladesh Launch and River Routes',
      text: 'KoyJabo helps travelers plan launch and river journeys from Dhaka Sadarghat to southern Bangladesh destinations.',
      aboutType: 'BoatTrip',
    },
    {
      path: '/truck',
      title: 'Bangladesh Truck & Freight Fare Guide',
      description: 'Estimate truck and freight transport options in Bangladesh with vehicle types, route guidance and practical cost information.',
      keywords: ['truck fare Bangladesh', 'freight transport Bangladesh', 'Bangladesh truck booking', 'goods transport Bangladesh'],
      heading: 'Bangladesh Truck and Freight Guide',
      text: 'Plan truck and freight movement in Bangladesh with route guidance, vehicle type information and practical fare estimates.',
      aboutType: 'Service',
    },
    {
      path: '/ai',
      title: 'KoyJabo AI Transport Assistant',
      description: 'Ask KoyJabo AI for Bangladesh transport help in Bengali or English: Dhaka bus routes, metro fares, train schedules and travel planning.',
      keywords: ['KoyJabo AI', 'Bangladesh transport AI', 'Dhaka bus route assistant', 'বাংলা ট্রান্সপোর্ট AI'],
      heading: 'KoyJabo AI Transport Assistant',
      text: 'Use KoyJabo AI to ask route, fare, schedule and travel-planning questions for Dhaka and Bangladesh transport.',
      aboutType: 'WebApplication',
    },
    {
      path: '/about',
      title: 'About KoyJabo - Bangladesh Transport Guide',
      description: 'Learn about KoyJabo, a free Bengali-English Bangladesh transport guide for Dhaka buses, metro, trains, launches, flights and intercity travel.',
      keywords: ['about KoyJabo', 'Bangladesh transport guide', 'Dhaka bus app', 'কই যাবো'],
      heading: 'About KoyJabo',
      text: 'KoyJabo is a free Bangladesh transport guide built to make Dhaka and intercity travel easier in Bengali and English.',
      aboutType: 'Organization',
    },
    {
      path: '/faq',
      title: 'KoyJabo FAQ - Dhaka Bus, Metro & Bangladesh Travel',
      description: 'Answers to common KoyJabo questions about Dhaka bus routes, Metro Rail fares, train schedules, intercity travel and offline use.',
      keywords: ['KoyJabo FAQ', 'Dhaka bus FAQ', 'Bangladesh travel questions', 'metro fare FAQ'],
      heading: 'KoyJabo Frequently Asked Questions',
      text: 'Find answers about using KoyJabo for Dhaka bus routes, Metro Rail, Bangladesh Railway, intercity buses and travel fare planning.',
      aboutType: 'FAQPage',
    },
    {
      path: '/privacy',
      title: 'KoyJabo Privacy Policy',
      description: 'Read the KoyJabo privacy policy for the Bangladesh transport guide, including app data, location use, analytics and account information.',
      keywords: ['KoyJabo privacy', 'privacy policy', 'Bangladesh transport app privacy'],
      heading: 'KoyJabo Privacy Policy',
      text: 'KoyJabo explains how the app handles privacy, location features, analytics and user account data.',
      aboutType: 'WebPage',
    },
    {
      path: '/terms',
      title: 'KoyJabo Terms of Service',
      description: 'Read KoyJabo terms for using the Bangladesh transport guide, route data, fare estimates, AI assistant and travel planning tools.',
      keywords: ['KoyJabo terms', 'terms of service', 'transport guide terms'],
      heading: 'KoyJabo Terms of Service',
      text: 'KoyJabo terms explain how to use the transport guide, route data, fare estimates and AI assistant responsibly.',
      aboutType: 'WebPage',
    },
    {
      path: '/contact',
      title: 'Contact KoyJabo',
      description: 'Contact KoyJabo for Bangladesh transport guide feedback, Dhaka bus route corrections, advertising and support.',
      keywords: ['contact KoyJabo', 'Dhaka bus route correction', 'Bangladesh transport support'],
      heading: 'Contact KoyJabo',
      text: 'Contact the KoyJabo team for support, feedback, route corrections, partnership and advertising questions.',
      aboutType: 'ContactPage',
    },
    {
      path: '/for-ai',
      title: 'KoyJabo Data for AI and Search Crawlers',
      description: 'Machine-readable KoyJabo transport data and crawler guidance for AI assistants, search engines and Bangladesh travel discovery.',
      keywords: ['KoyJabo AI data', 'llms.txt', 'Bangladesh transport data', 'crawler guidance'],
      heading: 'KoyJabo for AI and Search Crawlers',
      text: 'KoyJabo provides machine-readable transport summaries, sitemap data and crawler guidance for search engines and AI assistants.',
      aboutType: 'Dataset',
    },
    {
      path: '/history',
      title: 'KoyJabo Travel History',
      description: 'KoyJabo travel history helps users revisit recent Bangladesh transport searches, routes and trip planning activity.',
      keywords: ['KoyJabo history', 'travel history', 'route search history'],
      heading: 'KoyJabo Travel History',
      text: 'KoyJabo lets users revisit recent route searches and transport planning activity inside the app.',
      aboutType: 'WebPage',
    },
    {
      path: '/advertise',
      title: 'Advertise on KoyJabo',
      description: 'Advertise with KoyJabo to reach Bangladesh commuters and travelers searching for Dhaka bus routes, metro, train and intercity travel.',
      keywords: ['advertise KoyJabo', 'Bangladesh travel advertising', 'Dhaka commuter ads'],
      heading: 'Advertise on KoyJabo',
      text: 'Reach Bangladesh transport users, Dhaka commuters and travelers through KoyJabo advertising and partnership options.',
      aboutType: 'Service',
    },
  ];

  return hubs.map(hub => renderPage({
    path: hub.path,
    title: hub.title,
    description: hub.description,
    keywords: hub.keywords,
    bodyHtml: `
      <article>
        <h1>${escapeHtml(hub.heading)}</h1>
        <p>${escapeHtml(hub.text)}</p>
      </article>
    `,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: hub.heading,
      url: `${baseUrl}${canonicalPath(hub.path)}`,
      description: hub.description,
      about: { '@type': hub.aboutType, name: hub.heading },
      inLanguage: ['en', 'bn'],
    },
  }));
}

const pages = [];

pages.push(...renderHubPages());

pages.push(renderPage({
  path: '/local-bus',
  title: 'Dhaka Bus Route Finder - ঢাকা বাস রুট',
  description: 'Find Dhaka bus routes, stops and fares in Bengali or English. Search 200+ local buses including BRTC, Shikor, Victor Classic and Ajmeri Glory.',
  keywords: ['dhaka bus route', 'ঢাকা বাস রুট', 'dhaka local bus route', 'bus route dhaka', 'dhaka bus service'],
  bodyHtml: `
    <h1>Dhaka Bus Route Finder - ঢাকা বাস রুট</h1>
    <p>KoyJabo helps riders search Dhaka local bus routes, stops and fares for 200+ bus services. Popular searches include dhaka bus route, bus route dhaka, ঢাকা বাস রুট, Dhaka local bus route, Shikor bus route, Victor Classic bus route and Ajmeri Glory bus route.</p>
  `,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Dhaka Bus Route Finder',
    url: `${baseUrl}/local-bus/`,
    description: 'Find Dhaka bus routes, stops and fares in Bengali or English.',
    inLanguage: ['en', 'bn'],
  },
}));

for (const post of extractBlogPosts()) {
  // Full post body when available (substantial content), excerpt-only fallback.
  const bodyParts = [];
  if (post.content.length > 400) {
    const lines = post.content.split('\n');
    const splitAt = Math.ceil(lines.length / 2);
    bodyParts.push(renderMarkdown(lines.slice(0, splitAt).join('\n')));
    bodyParts.push(
      '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-8425219156685369" data-ad-slot="9568870428" data-ad-format="fluid" data-full-width-responsive="true"></ins>\n        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>'
    );
    bodyParts.push(renderMarkdown(lines.slice(splitAt).join('\n')));
  } else {
    bodyParts.push(`<p>${escapeHtml(post.excerpt)}</p>`);
  }
  pages.push(renderPage({
    path: `/blog/${post.slug}`,
    title: post.title,
    description: truncate(post.excerpt),
    keywords: [post.category, 'KoyJabo', 'Bangladesh transport', 'Bangladesh travel guide'],
    bodyHtml: `
      <article>
        <h1>${escapeHtml(post.title)}</h1>
        ${bodyParts.join('\n        ')}
      </article>
    `,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: truncate(post.excerpt),
      url: `${baseUrl}/blog/${post.slug}/`,
      datePublished: post.publishDate,
      dateModified: post.publishDate,
      publisher: { '@type': 'Organization', name: 'KoyJabo' },
    },
  }));
}

const stationNames = extractStationNames();
for (const route of extractBusRoutes()) {
  const startName = stationNames[route.stops[0]] ?? route.stops[0] ?? '';
  const endName = stationNames[route.stops[route.stops.length - 1]] ?? route.stops[route.stops.length - 1] ?? '';
  const routeLabel = startName && endName ? `${startName} ⇄ ${endName}` : route.name;
  const approxFare = route.name ? (route.name.includes('AC') || route.name.toLowerCase().includes('ac') ? 60 : 30) : 30;
  const stopListHtml = route.stops
    .map((stopId) => `<li>${escapeHtml(stationNames[stopId] ?? stopId)}</li>`)
    .join('');
  pages.push(renderPage({
    path: `/bus/${route.slug}`,
    title: `${route.name} Bus: ${routeLabel} Route & Fare`,
    description: `${route.name} bus route ${routeLabel ? `from ${startName} to ${endName}` : ''}. See stops, approx fare ৳${approxFare}, route map and live location in Bengali and English on KoyJabo.`,
    keywords: [`${route.name} bus route`, `${route.bnName} বাস রুট`, `${startName} to ${endName} bus`, 'dhaka bus route', 'ঢাকা বাস রুট'],
    bodyHtml: `
      <article>
        <h1>${escapeHtml(route.name)} Bus Route - ${escapeHtml(route.bnName)}</h1>
        <p>${escapeHtml(route.name)} (${escapeHtml(route.bnName)}) is a Dhaka local bus route listed on KoyJabo with route details, stops and fare guidance.${routeLabel ? ` The route runs from ${escapeHtml(startName)} to ${escapeHtml(endName)}.` : ''} Riders can search the route in Bengali or English and see the live bus location on the full page.</p>
        <h2>Stops on the ${escapeHtml(route.name)} route</h2>
        <p>The ${escapeHtml(route.name)} bus passes through ${route.stops.length} stops in Dhaka. Full stop list in order:</p>
        <ol>
          ${stopListHtml}
        </ol>
        <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-8425219156685369" data-ad-slot="9568870428" data-ad-format="fluid" data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        <h2>Fare and travel tips for ${escapeHtml(route.name)}</h2>
        <p>The ${escapeHtml(route.name)} bus fare is distance-based, roughly ৳${approxFare} for the full route. The exact fare between any two stops depends on distance — use the KoyJabo fare calculator to check.</p>
        <p>Dhaka buses are busiest during office peak hours (8:00-10:00 AM and 5:00-8:00 PM). For a faster trip, travel outside peak hours and board near the start of the route, where seats are still available. The live location and route map for ${escapeHtml(route.name)} are available on KoyJabo.</p>
      </article>
    `,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${route.name} Bus Route`,
      url: `${baseUrl}/bus/${route.slug}/`,
      description: `${route.name} bus route in Dhaka.`,
      about: { '@type': 'BusTrip', name: `${route.name} Bus Route` },
    },
    faq: [
      {
        '@type': 'Question',
        name: `What is the route of the ${route.name} bus in Dhaka?`,
        acceptedAnswer: { '@type': 'Answer', text: `The ${route.name} bus route is listed on KoyJabo with its full stop list, route map and fare guidance for Dhaka.` },
      },
      {
        '@type': 'Question',
        name: `What is the fare of the ${route.name} bus?`,
        acceptedAnswer: { '@type': 'Answer', text: `The ${route.name} bus fare is distance-based (approx ৳${approxFare} full route). Use the KoyJabo fare calculator to find the exact fare between any two stops.` },
      },
    ],
  }));
}

for (const train of extractTrainRoutes()) {
  const fromLabel = train.from.charAt(0).toUpperCase() + train.from.slice(1);
  const toLabel = train.to.charAt(0).toUpperCase() + train.to.slice(1);
  pages.push(renderPage({
    path: `/train/${train.slug}`,
    title: `${train.name} (${train.number}) Train: ${fromLabel} → ${toLabel} Schedule & Fare`,
    description: `${train.name} (${train.number}) train from ${fromLabel} to ${toLabel}. Schedule, off day ${train.offDay}, duration ${train.duration} and fare from ৳${train.shuvanFare}.`,
    keywords: [`${train.name} train schedule`, `${train.name} train fare`, `${train.bnName} ট্রেন`, 'Bangladesh train schedule'],
    bodyHtml: `
      <article>
        <h1>${escapeHtml(train.name)} Train Schedule - ${escapeHtml(train.bnName)}</h1>
        <p>${escapeHtml(train.name)} (${escapeHtml(train.number)}) runs from ${escapeHtml(fromLabel)} to ${escapeHtml(toLabel)}. Duration: ${escapeHtml(train.duration)}. Off day: ${escapeHtml(train.offDay)}.</p>
      </article>
    `,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${train.name} Train Schedule`,
      url: `${baseUrl}/train/${train.slug}/`,
      description: `${train.name} train route, schedule and fare guide.`,
      about: {
        '@type': 'TrainTrip',
        name: `${train.name} ${train.number}`,
        departureStation: { '@type': 'TrainStation', name: train.from },
        arrivalStation: { '@type': 'TrainStation', name: train.to },
      },
    },
    faq: [
      {
        '@type': 'Question',
        name: `What is the schedule of the ${train.name} train?`,
        acceptedAnswer: { '@type': 'Answer', text: `The ${train.name} (${train.number}) train runs from ${train.from} to ${train.to}. Off day: ${train.offDay}. Duration: ${train.duration}. See the station-by-station schedule on KoyJabo.` },
      },
      {
        '@type': 'Question',
        name: `What is the fare of the ${train.name} train?`,
        acceptedAnswer: { '@type': 'Answer', text: `The ${train.name} train has Shovan, Shovan Chair, Snigdha and berth classes with fares starting from ৳${train.shuvanFare}. Compare all class fares on KoyJabo.` },
      },
      {
        '@type': 'Question',
        name: `Which stations does the ${train.name} train stop at?`,
        acceptedAnswer: { '@type': 'Answer', text: `The ${train.name} train runs from ${train.from} to ${train.to}. See the complete stop list and timings on KoyJabo.` },
      },
    ],
  }));
}

for (const op of extractIntercityOperators()) {
  const routeListHtml = op.routes.length
    ? `<h2>Routes of ${escapeHtml(op.name)} from Dhaka</h2><ul>${op.routes.map(r => {
        const times = r.departures.length ? ` — departs ${escapeHtml(r.departures.join(', '))}` : '';
        const fare = `${escapeHtml(r.fareNonAC)}${r.fareAC ? ` / AC ${escapeHtml(r.fareAC)}` : ''}`;
        return `<li><strong>${escapeHtml(r.from)} → ${escapeHtml(r.to)}</strong> — ${escapeHtml(r.duration)}, ${fare}${times}</li>`;
      }).join('')}</ul>`
    : '';
  pages.push(renderPage({
    path: `/intercity/${op.slug}`,
    title: `${op.name} Intercity Bus: Routes, Fares & Schedule`,
    description: `${op.name} (${op.bnName}) intercity bus from Dhaka. Routes${op.routes.length ? ` to ${[...new Set(op.routes.map(r => r.to))].slice(0, 3).join(', ')}` : ''}, fares from ${op.routes[0]?.fareNonAC ?? ''} and departure times on KoyJabo.`,
    keywords: [`${op.name} bus`, `${op.bnName} বাস`, `${op.name} Dhaka to ${op.routes[0]?.to ?? ''} bus`, 'Bangladesh intercity bus', 'intercity bus schedule'],
    bodyHtml: `
      <article>
        <h1>${escapeHtml(op.name)} Intercity Bus - ${escapeHtml(op.bnName)}</h1>
        <p>${escapeHtml(op.name)} (${escapeHtml(op.bnName)}) is an intercity bus operator running services from Dhaka across Bangladesh. KoyJabo lists the operator's routes, fares, departure times and boarding counters.</p>
        ${routeListHtml}
        <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-8425219156685369" data-ad-slot="9568870428" data-ad-format="fluid" data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        <h2>Boarding counters for ${escapeHtml(op.name)}</h2>
        <p>Pick up ${escapeHtml(op.name)} buses at the operator's Dhaka counters. Fares are per person, one-way; AC services cost more than non-AC. Use KoyJabo to compare intercity operators before booking.</p>
      </article>
    `,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${op.name} Intercity Bus`,
      url: `${baseUrl}/intercity/${op.slug}/`,
      description: `${op.name} intercity bus routes and fares.`,
      about: { '@type': 'BusTrip', name: `${op.name} Intercity Bus` },
    },
  }));
}

// From→to bus answer pages (mined from Google Search Console queries):
// /bus/gulistan-to-dhanmondi/ — "which bus goes from X to Y" / "X থেকে Y বাস"
const allRoutes = extractBusRoutes();
for (const { pair, buses } of BUS_PAIRS.map(p => ({
  pair: p,
  buses: allRoutes.filter(r =>
    r.stops.some(s => s.startsWith(p.from)) && r.stops.some(s => s.startsWith(p.to))
  ),
}))) {
  const fromName = { en: pair.fromEn, bn: pair.fromBn };
  const toName = { en: pair.toEn, bn: pair.toBn };
  const busList = buses.map(r => `${r.name} (${r.bnName})`).join(', ');
  pages.push(renderPage({
    path: pairPath(pair),
    title: `Which Bus Goes from ${fromName.en} to ${toName.en} in Dhaka? (${buses.length} Buses)`,
    description: `Which bus goes from ${fromName.en} to ${toName.en} in Dhaka? ${buses.length} bus${buses.length === 1 ? '' : 'es'} cover this route. See the full bus list, stops, fares and live location on KoyJabo.`,
    keywords: [`${fromName.en} to ${toName.en} bus`, `${fromName.bn} থেকে ${toName.bn} বাস`, 'dhaka bus route', 'ঢাকা বাস রুট'],
    bodyHtml: `
      <article>
        <h1>Which Bus Goes from ${escapeHtml(fromName.en)} to ${escapeHtml(toName.en)} in Dhaka?</h1>
        <p>${buses.length} bus${buses.length === 1 ? '' : 'es'} on KoyJabo cover the ${escapeHtml(fromName.en)} to ${escapeHtml(toName.en)} route in Dhaka: ${escapeHtml(busList)}. Open any bus to see its full stop list, fare guidance and live location.</p>
        ${buses.length > 0 ? `
        <h2>Buses from ${escapeHtml(fromName.en)} to ${escapeHtml(toName.en)}</h2>
        <p>The easiest way to travel from ${escapeHtml(fromName.en)} to ${escapeHtml(toName.en)} is one of the ${buses.length} bus${buses.length === 1 ? '' : 'es'} below. Each route lists its stops in order and an approximate fare so you can plan the trip:</p>
        <ul>
          ${buses.map(r => `<li>${escapeHtml(r.name)} (${escapeHtml(r.bnName)})</li>`).join('')}
        </ul>
        <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-8425219156685369" data-ad-slot="9568870428" data-ad-format="fluid" data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        <h2>How to get from ${escapeHtml(fromName.en)} to ${escapeHtml(toName.en)}</h2>
        <p>Board the bus at the ${escapeHtml(fromName.en)} stop and get off at the ${escapeHtml(toName.en)} stop. Travel during off-peak hours (before 8 AM or after 8 PM) for a less crowded ride. Bus fares are distance-based, so the trip between these two stops costs less than a full-route fare. You can also see the live location of each bus on its KoyJabo route page.</p>
        ` : ''}
      </article>
    `,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `Bus from ${fromName.en} to ${toName.en} in Dhaka`,
      url: `${baseUrl}${pairPath(pair)}`,
      description: `Which bus goes from ${fromName.en} to ${toName.en} in Dhaka? ${buses.length} buses cover this route.`,
      about: { '@type': 'BusTrip', name: `${fromName.en} to ${toName.en} bus route` },
    },
    faq: [
      {
        '@type': 'Question',
        name: `Which bus goes from ${fromName.en} to ${toName.en} in Dhaka?`,
        acceptedAnswer: { '@type': 'Answer', text: `${buses.length} bus${buses.length === 1 ? '' : 'es'} on KoyJabo cover the ${fromName.en} to ${toName.en} route: ${busList}. Tap any bus for its full stop list, fare and live location.` },
      },
      {
        '@type': 'Question',
        name: `How much is the bus fare from ${fromName.en} to ${toName.en}?`,
        acceptedAnswer: { '@type': 'Answer', text: `The bus fare from ${fromName.en} to ${toName.en} is distance-based (typically ৳10–৳40 depending on bus type and distance). Use the KoyJabo fare calculator for the exact amount.` },
      },
      {
        '@type': 'Question',
        name: `How many buses run from ${fromName.en} to ${toName.en}?`,
        acceptedAnswer: { '@type': 'Answer', text: `${buses.length} bus${buses.length === 1 ? '' : 'es'} cover the ${fromName.en} to ${toName.en} route on KoyJabo. See the full list above with stops and schedules.` },
      },
    ],
  }));
}

// Interchange pages: no direct bus between pair → answer with a two-leg ride
// (from→via, then via→to). e.g. /bus/badda-to-dhanmondi-via-mohakhali/
for (const pair of INTERCHANGE_PAIRS) {
  const viaBuses = allRoutes.filter(r =>
    r.stops.some(s => s.startsWith(pair.from)) && r.stops.some(s => s.startsWith(pair.via))
  );
  const toBuses = allRoutes.filter(r =>
    r.stops.some(s => s.startsWith(pair.via)) && r.stops.some(s => s.startsWith(pair.to))
  );
  const viaList = viaBuses.map(r => r.name).slice(0, 12).join(', ');
  const toList = toBuses.map(r => r.name).slice(0, 12).join(', ');
  pages.push(renderPage({
    path: interchangePath(pair),
    title: `How to Go from ${pair.fromEn} to ${pair.toEn} by Bus? Change at ${pair.viaEn}`,
    description: `No direct bus from ${pair.fromEn} to ${pair.toEn}. Take ${viaBuses.length} bus${viaBuses.length === 1 ? '' : 'es'} to ${pair.viaEn}, then ${toBuses.length} bus${toBuses.length === 1 ? '' : 'es'} to ${pair.toEn}. Step-by-step guide on KoyJabo.`,
    keywords: [`${pair.fromEn} to ${pair.toEn} bus`, `${pair.fromBn} থেকে ${pair.toBn} বাস`, 'bus change dhaka', 'ঢাকায় বাস বদল'],
    bodyHtml: `
      <article>
        <h1>How to Go from ${escapeHtml(pair.fromEn)} to ${escapeHtml(pair.toEn)} by Bus?</h1>
        <p>There is no direct bus from ${escapeHtml(pair.fromEn)} to ${escapeHtml(pair.toEn)}. Take a ${escapeHtml(pair.fromEn)} bus to ${escapeHtml(pair.viaEn)} (${viaBuses.length} bus${viaBuses.length === 1 ? '' : 'es'} serve this leg: ${escapeHtml(viaList)}), then change to a ${escapeHtml(pair.viaEn)} bus to ${escapeHtml(pair.toEn)} (${toBuses.length} bus${toBuses.length === 1 ? '' : 'es'}: ${escapeHtml(toList)}).</p>
      </article>
    `,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `Bus from ${pair.fromEn} to ${pair.toEn} via ${pair.viaEn}`,
      url: `${baseUrl}${interchangePath(pair)}`,
      description: `No direct bus from ${pair.fromEn} to ${pair.toEn} — change at ${pair.viaEn}.`,
      about: { '@type': 'BusTrip', name: `${pair.fromEn} to ${pair.toEn} bus route` },
    },
    faq: [
      {
        '@type': 'Question',
        name: `Is there a direct bus from ${pair.fromEn} to ${pair.toEn}?`,
        acceptedAnswer: { '@type': 'Answer', text: `No direct bus runs from ${pair.fromEn} to ${pair.toEn}. The fastest way is to take a ${pair.fromEn} bus to ${pair.viaEn} and change there for a ${pair.toEn} bus.` },
      },
      {
        '@type': 'Question',
        name: `How do I go from ${pair.fromEn} to ${pair.toEn} by bus?`,
        acceptedAnswer: { '@type': 'Answer', text: `Take any of ${viaBuses.length} buses from ${pair.fromEn} to ${pair.viaEn} (${viaList}), get off at ${pair.viaEn}, then take one of ${toBuses.length} buses to ${pair.toEn} (${toList}).` },
      },
      {
        '@type': 'Question',
        name: `How much is the bus fare from ${pair.fromEn} to ${pair.toEn}?`,
        acceptedAnswer: { '@type': 'Answer', text: `The fare is the sum of two legs: ${pair.fromEn}→${pair.viaEn} plus ${pair.viaEn}→${pair.toEn}, typically ৳20–৳60 in total. Use the KoyJabo fare calculator for the exact amount.` },
      },
    ],
  }));
}

// Legacy id-form URLs → redirect to current dash-slug pages (recovers old Google index
// entries and external links: e.g. /bus/trust_1/ → /bus/trust-1/).
for (const route of extractBusRoutes()) {
  if (route.id !== route.slug) renderRedirectPage(`/bus/${route.id}`, `/bus/${route.slug}`);
}
for (const train of extractTrainRoutes()) {
  if (train.id !== train.slug) renderRedirectPage(`/train/${train.id}`, `/train/${train.slug}`);
}

console.log(`Generated ${pages.length} static SEO pages in dist`);
