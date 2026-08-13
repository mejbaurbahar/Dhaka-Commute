import { useEffect, useRef, useState } from 'react';

/**
 * useInViewOnce — true once the element enters the viewport, then stays true.
 * Powers scroll-triggered entrance animations (devxhub-style staggered reveals).
 * Respects prefers-reduced-motion: returns true immediately so no animation runs.
 */
export function useInViewOnce<T extends HTMLElement>(rootMargin = '0px 0px -60px 0px'): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin, threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return [ref, inView];
}
