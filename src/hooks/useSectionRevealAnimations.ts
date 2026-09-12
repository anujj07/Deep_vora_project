import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** One-time, viewport-aware entrance treatment for editorial content sections. */
export function useSectionRevealAnimations(root: React.RefObject<HTMLElement | null>, enabled = true) {
  useEffect(() => {
    const element = root.current;
    if (!enabled || !element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const media = gsap.matchMedia();
    media.add(
      { mobile: '(max-width: 639px)', tablet: '(min-width: 640px) and (max-width: 1023px)', desktop: '(min-width: 1024px)' },
      (context) => {
        const { mobile, tablet } = context.conditions as { mobile: boolean; tablet: boolean };
        const distance = mobile ? 14 : tablet ? 20 : 30;
        const duration = mobile ? 0.48 : tablet ? 0.58 : 0.68;
        const delay = mobile ? 0.15 : 0.2;

        gsap.utils.toArray<HTMLElement>('[data-reveal-section], [data-reveal-section] section', element).forEach((section) => {
          const items = gsap.utils.toArray<HTMLElement>('[data-reveal]', section);
          const targets = items.length ? items : [section];

          gsap.from(targets, {
            autoAlpha: 0,
            y: distance,
            scale: 0.995,
            duration,
            delay,
            stagger: mobile ? 0.06 : 0.08,
            ease: 'power3.out',
            clearProps: 'opacity,visibility,transform',
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
              once: true,
            },
          });
        });
      },
    );

    return () => media.revert();
  }, [root, enabled]);
}
