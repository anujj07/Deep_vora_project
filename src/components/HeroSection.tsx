import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import { HeroProjectCarousel } from './HeroProjectCarousel';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => {
      gsap.from('[data-hero-reveal]', { autoAlpha: 0, y: 22, duration: 0.8, stagger: 0.1, ease: 'power3.out', clearProps: 'opacity,visibility,transform' });
      const overlay = section.querySelector<HTMLElement>('[data-hero-scroll-overlay]');
      const projectListing = document.querySelector<HTMLElement>('[data-home-project-listing]');
      gsap.to(overlay, { opacity: 0.34, ease: 'none', scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true } });
      if (projectListing) gsap.fromTo(projectListing, { autoAlpha: 0.45, y: 24, clipPath: 'inset(8% 0 0 0)' }, { autoAlpha: 1, y: 0, clipPath: 'inset(0% 0 0 0)', ease: 'none', scrollTrigger: { trigger: projectListing, start: 'top 92%', end: 'top 42%', scrub: true } });
    }, section);
    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} id="index" className="relative min-h-[100svh] w-full overflow-hidden bg-white px-5 pb-6 pt-28 text-[#111111] sm:px-8 sm:pt-32 md:px-12 lg:px-20 lg:pb-8">
      <div data-hero-reveal className="flex items-center justify-between border-b border-black/[0.09] pb-4 text-[10px] font-mono-tech uppercase tracking-[0.15em] text-[#5f5f59] sm:text-[11px]"><span>Deep Vora</span><span>Architecture / Urban Systems</span></div>
      <div className="pt-7 lg:min-h-[calc(100svh-12rem)] lg:pt-10">
        <figure data-hero-reveal><HeroProjectCarousel /><figcaption className="mt-3 flex justify-between text-[10px] font-mono-tech uppercase tracking-[0.13em] text-[#777771] sm:text-[11px]"><span>Design · Construction · Urban Systems</span><span className="hidden sm:inline">Selected projects</span></figcaption></figure>
      </div>
      <div data-hero-reveal className="mt-8 flex items-center justify-between border-t border-black/[0.09] pt-4 lg:mt-6"><a href="#work" className="group flex items-center gap-3 text-[10px] font-mono-tech uppercase tracking-[0.14em] text-[#222222] sm:text-[11px]"><span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.16] transition-transform duration-300 group-hover:translate-y-1"><ArrowDown className="h-3.5 w-3.5" /></span>Explore selected projects</a><span className="hidden text-[10px] font-mono-tech uppercase tracking-[0.14em] text-[#777771] sm:inline">2025—26</span></div>
      <div data-hero-scroll-overlay className="pointer-events-none absolute inset-0 bg-black opacity-0" aria-hidden="true" />
    </section>
  );
};
