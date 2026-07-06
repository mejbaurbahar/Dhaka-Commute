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

const pages = [];

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

console.log(`Generated ${pages.length} static SEO pages in dist`);
