#!/usr/bin/env node

// Generates dist/blog/feed.xml from data/blogPosts.ts — used by LinkedIn
// content sharing (RSS source) to auto-publish new blog posts to the page.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'dist', 'blog');
const BASE = 'https://koyjabo.com';

if (!fs.existsSync(path.join(root, 'dist', 'index.html'))) {
  console.error('dist/index.html not found. Run this after vite build.');
  process.exit(1);
}

function extractBlogPosts() {
  const content = fs.readFileSync(path.join(root, 'data', 'blogPosts.ts'), 'utf8');
  const posts = [];
  // Split into per-post chunks (each entry starts with an id line)
  const chunks = content.split(/^\t\{\n/m).slice(1);
  for (const chunk of chunks) {
    const get = (field) => {
      const m = chunk.match(new RegExp(`${field}:\\s*'([^']*)'`));
      return m ? m[1] : '';
    };
    const unescape = (s) => s.replace(/\\'/g, "'").replace(/\\n/g, '\n').replace(/\\\\/g, '\\');
    const post = {
      slug: unescape(get('slug')),
      title: unescape(get('title')),
      excerpt: unescape(get('excerpt')),
      publishDate: unescape(get('publishDate')),
      coverImage: unescape(get('coverImage')),
    };
    if (post.slug && post.title) posts.push(post);
  }
  return posts;
}

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function rfc822(dateStr) {
  // publishDate is YYYY-MM-DD → RFC 822 with GMT
  const [y, m, d] = dateStr.split('-').map(Number);
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d} ${MONTHS[m - 1]} ${y} 00:00:00 GMT`;
}

const posts = extractBlogPosts();
if (!posts.length) {
  console.error('No blog posts found in data/blogPosts.ts');
  process.exit(1);
}

// Newest first, cap at 20 items
posts.sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));
const items = posts.slice(0, 20).map((p) => {
  const link = `${BASE}/blog/${p.slug}/`;
  const description = p.excerpt
    ? `<![CDATA[<img src="${esc(BASE + p.coverImage)}" alt="" /><p>${esc(p.excerpt)}</p>]]>`
    : '';
  return `    <item>
      <title>${esc(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${rfc822(p.publishDate)}</pubDate>
      <description>${description}</description>
    </item>`;
});

const now = new Date().toUTCString();
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>KoyJabo Blog — Bangladesh Transport Guide</title>
    <link>${BASE}/blog/</link>
    <description>Bus routes, live bus tracking, metro rail, train schedules and travel guides for Bangladesh — from KoyJabo.</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <generator>KoyJabo generate-rss.mjs</generator>
    <atom:link href="${BASE}/blog/feed.xml" rel="self" type="application/rss+xml" />
${items.join('\n')}
  </channel>
</rss>
`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'feed.xml'), xml);
console.log(`✅ blog/feed.xml written — ${posts.length} posts available, ${items.length} in feed`);
