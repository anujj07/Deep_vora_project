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
      .fromTo('[data-preload-name]', { autoAlpha: 0, y: 18, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out' })
      .fromTo('[data-preload-detail]', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.32, stagger: 0.08, ease: 'power2.out' }, '-=0.1')
      .to('[data-preloader]', { autoAlpha: 0, duration: 0.42, ease: 'power2.inOut' }, '+=0.35');
    return () => {
      timeline.kill();
    };
  }, [onComplete]);

  return (
    <div data-preloader className="fixed inset-0 z-[100] flex items-center justify-center bg-[#fcfbf9] text-[#111111]">
      <div className="flex flex-col items-center gap-4 font-mono-tech text-xs tracking-[0.2em] uppercase">
        <span data-preload-name className="text-lg font-bold tracking-[0.16em]">DEEP VORA</span>
        <span data-preload-detail className="h-px w-8 bg-black/30" />
        <span data-preload-detail className="text-[10px] text-[#777770]">Portfolio / 2026</span>
      </div>
    </div>
  );
}
