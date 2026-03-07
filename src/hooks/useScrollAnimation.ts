import { useEffect, useRef, useState } from 'react';
import type { UseScrollAnimationReturn } from '../types';

/**
 * Custom hook that uses the IntersectionObserver API to detect when
 * an element enters the viewport. Triggers animation once on mount.
 * Respects the `prefers-reduced-motion` media query — elements are
 * immediately marked visible when the user prefers reduced motion,
 * and the hook listens for live changes to the preference.
 *
 * @param threshold - Percentage of element visibility to trigger (0–1)
 * @param rootMargin - Margin around the root viewport
 */
export function useScrollAnimation(
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px',
): UseScrollAnimationReturn {
  const ref = useRef<HTMLDivElement>(null);

  const getReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getReducedMotion);
  const [isVisible, setIsVisible] = useState(getReducedMotion);

  // Keep prefersReducedMotion in sync if the OS preference changes at runtime
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setIsVisible(true);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    // Skip observer when motion is already reduced — sections are visible by default
    if (prefersReducedMotion) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect after first trigger — animate once
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, prefersReducedMotion]);

  return { ref, isVisible };
}
