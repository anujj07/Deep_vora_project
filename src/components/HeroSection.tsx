import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.from('[data-hero-reveal]', { autoAlpha: 0, y: 22, duration: 0.8, stagger: 0.1, ease: 'power3.out', clearProps: 'opacity,visibility,transform' });
      gsap.from('[data-hero-image]', { autoAlpha: 0, scale: 1.035, duration: 1.25, delay: 0.12, ease: 'power3.out', clearProps: 'opacity,visibility,transform' });

      const overlay = section.querySelector<HTMLElement>('[data-hero-scroll-overlay]');
      const visual = section.querySelector<HTMLElement>('[data-hero-visual]');
      const vignette = section.querySelector<HTMLElement>('[data-hero-vignette]');
      const projectListing = document.querySelector<HTMLElement>('[data-home-project-listing]');

      const media = gsap.matchMedia();
      media.add(
        {
          desktop: '(min-width: 768px)',
          mobile: '(max-width: 767px)',
        },
        (mediaContext) => {
          const isMobile = mediaContext.conditions?.mobile;

          gsap.to(overlay, {
            opacity: 0.34,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });

          gsap.to(visual, {
            filter: `blur(${isMobile ? 1 : 2}px)`,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });

          gsap.to(vignette, {
            opacity: isMobile ? 0.18 : 0.28,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });

          if (projectListing) {
            gsap.fromTo(
              projectListing,
              { autoAlpha: 0.45, y: isMobile ? 12 : 24, clipPath: 'inset(8% 0 0 0)' },
              {
                autoAlpha: 1,
                y: 0,
                clipPath: 'inset(0% 0 0 0)',
                ease: 'none',
                scrollTrigger: {
                  trigger: projectListing,
                  start: 'top 92%',
                  end: 'top 42%',
                  scrub: true,
                },
              },
            );
          }
        },
      );

      return () => media.revert();
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} id="index" className="relative min-h-[100svh] w-full overflow-hidden bg-white px-5 pb-6 pt-28 text-[#111111] sm:px-8 sm:pt-32 md:px-12 lg:px-20 lg:pb-8">
      <div data-hero-reveal className="flex items-center justify-between border-b border-black/[0.09] pb-4 text-[10px] font-mono-tech uppercase tracking-[0.15em] text-[#5f5f59] sm:text-[11px]">
        <span>Deep Vora</span>
        <span>Architecture / Urban Systems</span>
      </div>

      <div className="grid gap-8 pt-7 lg:min-h-[calc(100svh-12rem)] lg:grid-cols-12 lg:items-end lg:gap-10 lg:pt-10">
        <div className="order-2 flex flex-col justify-between lg:order-1 lg:col-span-4 lg:min-h-[59vh] lg:pb-1">
          <div>
            <p data-hero-reveal className="mb-5 font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#777771] sm:text-[11px]">Project Coordinator · Architectural Technologist</p>
            <h1 data-hero-reveal className="max-w-md text-[clamp(3.15rem,6.2vw,6.6rem)] font-semibold leading-[0.88] tracking-[-0.07em] text-[#111111]">DEEP<br />VORA</h1>
          </div>
          <div data-hero-reveal className="mt-8 max-w-sm border-t border-black/[0.09] pt-4 text-sm leading-relaxed text-[#555550] sm:text-[15px] lg:mt-0">Working across architecture, urban design, infrastructure, and construction delivery—connecting design intent with the realities of the site.</div>
        </div>

        <figure data-hero-reveal className="order-1 lg:order-2 lg:col-span-8">
          <div data-hero-visual className="relative aspect-[4/3] overflow-hidden bg-[#ebeae6] sm:aspect-[16/10] lg:aspect-[1.52/1]">
            <img data-hero-image src="/projects/tedx-gateway/TEDX_GATEWAY_01_FINAL_STAGE.png" alt="A spatial installation defined by layered, illuminated planes" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/[0.04]" aria-hidden="true" />
            <div data-hero-vignette className="pointer-events-none absolute inset-0 opacity-0" style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0, 0, 0, 0.46) 100%)' }} aria-hidden="true" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between bg-gradient-to-t from-black/45 to-transparent px-4 pb-4 pt-14 text-[10px] font-mono-tech uppercase tracking-[0.14em] text-white sm:px-5 sm:pb-5"><span>Selected work / 01</span><span>Spatial practice</span></div>
          </div>
          <figcaption className="mt-3 flex justify-between text-[10px] font-mono-tech uppercase tracking-[0.13em] text-[#777771] sm:text-[11px]"><span>Design · Construction · Urban Systems</span><span className="hidden sm:inline">Vancouver, BC</span></figcaption>
        </figure>
      </div>

      <div data-hero-reveal className="mt-8 flex items-center justify-between border-t border-black/[0.09] pt-4 lg:mt-6">
        <a href="#work" className="group flex items-center gap-3 text-[10px] font-mono-tech uppercase tracking-[0.14em] text-[#222222] sm:text-[11px]"><span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.16] transition-transform duration-300 group-hover:translate-y-1"><ArrowDown className="h-3.5 w-3.5" /></span>Explore selected projects</a>
        <span className="hidden text-[10px] font-mono-tech uppercase tracking-[0.14em] text-[#777771] sm:inline">2025—26</span>
      </div>
      <div data-hero-scroll-overlay className="pointer-events-none absolute inset-0 bg-black opacity-0" aria-hidden="true" />
    </section>
  );
};
