import { useEffect } from 'react';
import gsap from 'gsap';

interface PagePreloaderProps {
  onComplete: () => void;
}

export function PagePreloader({ onComplete }: PagePreloaderProps) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      onComplete();
      return;
    }

    const timeline = gsap.timeline({ onComplete });
    timeline
      .fromTo('[data-preload-projects]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.65, ease: 'power2.out' })
      .fromTo('[data-preload-name]', { autoAlpha: 0, y: 18, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: 'power3.out' }, '-=0.25')
      .fromTo('[data-preload-detail]', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.14, ease: 'power2.out' }, '-=0.05')
      .to('[data-preloader]', { autoAlpha: 0, duration: 0.65, ease: 'power2.inOut' }, '+=0.85');
    return () => {
      timeline.kill();
    };
  }, [onComplete]);

  return (
    <div data-preloader className="fixed inset-0 z-[100] overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <iframe data-preload-projects src="/projects-row.html" title="Selected projects" className="pointer-events-none absolute inset-0 h-full w-full border-0" />
      <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-col items-center gap-5 bg-gradient-to-b from-white/85 via-white/45 to-transparent px-5 pb-20 pt-8 font-mono-tech text-xs tracking-[0.2em] uppercase sm:pt-10">
        <span data-preload-name className="text-lg font-bold tracking-[0.16em]">DEEP VORA</span>
        <span data-preload-detail className="h-px w-8 bg-current opacity-30" />
        <span data-preload-detail className="text-[10px] text-[var(--text-muted)]">Portfolio / 2026</span>
      </div>
    </div>
  );
}
