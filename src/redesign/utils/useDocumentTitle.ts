import { useEffect } from 'react';

const HOME_TITLE = 'Dhaka Bus Route Finder - ঢাকা বাস রুট | KoyJabo';
const BASE_URL = 'https://koyjabo.com';

export function useDocumentTitle(title: string | null | undefined) {
  useEffect(() => {
    const next = title ? `${title} — কই যাবো` : HOME_TITLE;
    if (document.title !== next) document.title = next;
    return () => {
      if (document.title !== HOME_TITLE) document.title = HOME_TITLE;
    };
  }, [title]);
}

export function setCanonicalUrl(path: string) {
  const href = absoluteUrl(path);
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  if (link.href !== href) link.href = href;
}

export function absoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  const withLeadingSlash = path.startsWith('/') ? path : '/' + path;
  const [, pathname = '/', suffix = ''] = withLeadingSlash.match(/^([^?#]*)(.*)$/) ?? [];
  const canonicalPath = pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`;
  return `${BASE_URL}${canonicalPath}${suffix}`;
}

export function setMetaTag(name: string, content: string) {
  if (!content) return;
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.name = name;
    document.head.appendChild(tag);
  }
  if (tag.content !== content) tag.content = content;
}

export function setPropertyMetaTag(property: string, content: string) {
  if (!content) return;
  let tag = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  if (tag.content !== content) tag.content = content;
}

export function setJsonLd(id: string, data: Record<string, unknown>) {
  let tag = document.querySelector<HTMLScriptElement>(`script[type="application/ld+json"][data-kj-id="${id}"]`);
  if (!tag) {
    tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.dataset.kjId = id;
    document.head.appendChild(tag);
  }
  tag.textContent = JSON.stringify(data);
}
