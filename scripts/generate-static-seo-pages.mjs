#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

function renderPage({ path: pagePath, title, description, keywords = [], bodyHtml, schema }) {
  const url = `${baseUrl}${pagePath}`;
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
  html = html.replace('</head>', `  ${jsonLdScript('route', schema)}\n</head>`);
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
  return slugs.map((slug, index) => ({
    id: ids[index] || slug,
    slug,
    title: titles[index] || slug.replace(/-/g, ' '),
    excerpt: excerpts[index] || 'KoyJabo Bangladesh transport and travel guide.',
    publishDate: dates[index] || new Date().toISOString().slice(0, 10),
    category: categories[index] || 'Guide',
  }));
}

function extractBusRoutes() {
  const content = fs.readFileSync(path.join(root, 'constants.ts'), 'utf8');
  const start = content.indexOf('export const BUS_DATA');
  if (start === -1) return [];
  const section = content.slice(start);
  const nextExport = section.indexOf('\nexport const ', 10);
  const bounded = nextExport !== -1 ? section.slice(0, nextExport) : section;
  const routes = [];
  const objectRe = /id:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'[\s\S]*?bnName:\s*'([^']+)'/g;
  let match;
  while ((match = objectRe.exec(bounded)) !== null) {
    routes.push({
      id: match[1],
      name: match[2],
      bnName: match[3],
      slug: slugify(match[2] || match[1]),
    });
  }
  return routes;
}

function extractTrainRoutes() {
  const content = fs.readFileSync(path.join(root, 'data', 'bangladeshTrainData.ts'), 'utf8');
  const start = content.indexOf('export const BD_TRAIN_ROUTES');
  if (start === -1) return [];
  const section = content.slice(start);
  const nextExport = section.indexOf('\nexport ', 10);
  const bounded = nextExport !== -1 ? section.slice(0, nextExport) : section;
  const routes = [];
  const objectRe = /id:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'[\s\S]*?bnName:\s*'([^']+)'[\s\S]*?number:\s*'([^']+)'[\s\S]*?from:\s*'([^']+)'[\s\S]*?to:\s*'([^']+)'[\s\S]*?offDay:\s*'([^']+)'[\s\S]*?totalDuration:\s*'([^']+)'/g;
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
      url: `${baseUrl}${hub.path}`,
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
    url: `${baseUrl}/local-bus`,
    description: 'Find Dhaka bus routes, stops and fares in Bengali or English.',
    inLanguage: ['en', 'bn'],
  },
}));

for (const post of extractBlogPosts()) {
  pages.push(renderPage({
    path: `/blog/${post.slug}`,
    title: post.title,
    description: truncate(post.excerpt),
    keywords: [post.category, 'KoyJabo', 'Bangladesh transport', 'Bangladesh travel guide'],
    bodyHtml: `
      <article>
        <h1>${escapeHtml(post.title)}</h1>
        <p>${escapeHtml(post.excerpt)}</p>
      </article>
    `,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: truncate(post.excerpt),
      url: `${baseUrl}/blog/${post.slug}`,
      datePublished: post.publishDate,
      dateModified: post.publishDate,
      publisher: { '@type': 'Organization', name: 'KoyJabo' },
    },
  }));
}

for (const route of extractBusRoutes()) {
  pages.push(renderPage({
    path: `/bus/${route.slug}`,
    title: `${route.name} Bus Route - ${route.bnName}`,
    description: `${route.name} bus route in Dhaka. See stops, fare guidance and route details in Bengali and English on KoyJabo.`,
    keywords: [`${route.name} bus route`, `${route.bnName} বাস রুট`, 'dhaka bus route', 'ঢাকা বাস রুট'],
    bodyHtml: `
      <article>
        <h1>${escapeHtml(route.name)} Bus Route - ${escapeHtml(route.bnName)}</h1>
        <p>${escapeHtml(route.name)} is a Dhaka local bus route listed on KoyJabo with route details, stops and fare guidance.</p>
      </article>
    `,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${route.name} Bus Route`,
      url: `${baseUrl}/bus/${route.slug}`,
      description: `${route.name} bus route in Dhaka.`,
      about: { '@type': 'BusTrip', name: `${route.name} Bus Route` },
    },
  }));
}

for (const train of extractTrainRoutes()) {
  pages.push(renderPage({
    path: `/train/${train.slug}`,
    title: `${train.name} Train Schedule, Fare & Route - ${train.bnName}`,
    description: `${train.name} (${train.number}) train route from ${train.from} to ${train.to}. See schedule, off day ${train.offDay}, duration ${train.duration} and fare guidance.`,
    keywords: [`${train.name} train schedule`, `${train.name} train fare`, `${train.bnName} ট্রেন`, 'Bangladesh train schedule'],
    bodyHtml: `
      <article>
        <h1>${escapeHtml(train.name)} Train Schedule - ${escapeHtml(train.bnName)}</h1>
        <p>${escapeHtml(train.name)} (${escapeHtml(train.number)}) runs from ${escapeHtml(train.from)} to ${escapeHtml(train.to)}. Duration: ${escapeHtml(train.duration)}. Off day: ${escapeHtml(train.offDay)}.</p>
      </article>
    `,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${train.name} Train Schedule`,
      url: `${baseUrl}/train/${train.slug}`,
      description: `${train.name} train route, schedule and fare guide.`,
      about: {
        '@type': 'TrainTrip',
        name: `${train.name} ${train.number}`,
        departureStation: { '@type': 'TrainStation', name: train.from },
        arrivalStation: { '@type': 'TrainStation', name: train.to },
      },
    },
  }));
}

console.log(`Generated ${pages.length} static SEO pages in dist`);
