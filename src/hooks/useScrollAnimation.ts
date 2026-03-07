import { useEffect, useRef, useState } from 'react';
import type { UseScrollAnimationReturn } from '../types';

/**
 * Custom hook that uses the IntersectionObserver API to detect when
 * an element enters the viewport. Triggers animation once on mount.
 *
 * @param threshold - Percentage of element visibility to trigger (0–1)
 * @param rootMargin - Margin around the root viewport
 */
export function useScrollAnimation(
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px',
): UseScrollAnimationReturn {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}
