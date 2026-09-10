import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { JAMMING_STUDIO_NARRATIVE } from '../data/jammingStudioData';

gsap.registerPlugin(ScrollTrigger);

export const JammingStudioNarrative: React.FC = () => {
  const narrativeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = narrativeContainerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animate each narrative item individually based on its bespoke revealType
      const items = gsap.utils.toArray<HTMLElement>('.narrative-item');

      items.forEach((item) => {
        const imageWrapper = item.querySelector<HTMLElement>('.narrative-img-wrapper');
        const img = item.querySelector<HTMLElement>('.narrative-img');
        const infoCard = item.querySelector<HTMLElement>('.narrative-info');
        const revealType = item.getAttribute('data-reveal-type');

        if (!imageWrapper || !img) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 75%',
            end: 'bottom 25%',
            toggleActions: 'play reverse play reverse',
          }
        });

        // Apply distinct architectural reveal transitions
        switch (revealType) {
          case 'aperture':
            // 01 ENTRY: Vertical sliding aperture
            gsap.set(imageWrapper, { clipPath: 'inset(40% 0% 40% 0%)' });
            gsap.set(img, { scale: 1.25 });
            tl.to(imageWrapper, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.inOut' })
              .to(img, { scale: 1.0, duration: 1.4, ease: 'power2.out' }, '<');
            break;

          case 'lens-expand':
            // 02 SPATIAL REVEAL: Expanding rectangular lens mask
            gsap.set(imageWrapper, { clipPath: 'polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)' });
            gsap.set(img, { scale: 1.3, filter: 'blur(8px)' });
            tl.to(imageWrapper, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.3, ease: 'power3.out' })
              .to(img, { scale: 1.0, filter: 'blur(0px)', duration: 1.3, ease: 'power2.out' }, '<');
            break;

          case 'split-wipe':
            // 03 MAIN JAMMING AREA: Horizontal curtain wipe
            gsap.set(imageWrapper, { clipPath: 'inset(0% 50% 0% 50%)' });
            gsap.set(img, { scale: 1.18 });
            tl.to(imageWrapper, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out' })
              .to(img, { scale: 1.0, duration: 1.4, ease: 'power2.out' }, '<');
            break;

          case 'angled-slice':
            // 04 ACOUSTIC WALL: Angled geometric slice
            gsap.set(imageWrapper, { clipPath: 'polygon(0% 100%, 100% 85%, 100% 100%, 0% 100%)' });
            gsap.set(img, { scale: 1.2 });
            tl.to(imageWrapper, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.3, ease: 'power3.inOut' })
              .to(img, { scale: 1.0, duration: 1.3, ease: 'power2.out' }, '<');
            break;

          case 'color-dissolve':
            // 05 COLOR BLOCKING: Color-tinted threshold dissolve
            gsap.set(img, { filter: 'saturate(200%) brightness(1.2)', scale: 1.15 });
            tl.to(img, { filter: 'saturate(100%) brightness(1.0)', scale: 1.0, duration: 1.4, ease: 'power2.out' });
            break;

          case 'radial-bloom':
            // 06 LED BACKLIGHTING: Radial bloom luminous mask
            gsap.set(imageWrapper, { clipPath: 'circle(10% at 50% 50%)' });
            gsap.set(img, { filter: 'brightness(1.5)', scale: 1.2 });
            tl.to(imageWrapper, { clipPath: 'circle(100% at 50% 50%)', duration: 1.4, ease: 'power2.inOut' })
              .to(img, { filter: 'brightness(1.0)', scale: 1.0, duration: 1.4, ease: 'power2.out' }, '<');
            break;

          case 'typographic-mask':
            // 07 GRAPHIC WALL: Geometric diagonal stripe wipe
            gsap.set(imageWrapper, { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' });
            gsap.set(img, { scale: 1.2 });
            tl.to(imageWrapper, { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1.2, ease: 'power3.inOut' })
              .to(img, { scale: 1.0, duration: 1.2, ease: 'power2.out' }, '<');
            break;

          case 'macro-zoom':
            // 08 TECHNICAL DETAIL: Precision caliper zoom
            gsap.set(img, { scale: 1.35 });
            tl.to(img, { scale: 1.0, duration: 1.5, ease: 'power2.out' });
            break;

          case 'soft-pan':
            // 09 LOUNGE: Soft-focus warm pan
            gsap.set(img, { scale: 1.15, xPercent: -4 });
            tl.to(img, { scale: 1.0, xPercent: 0, duration: 1.5, ease: 'power2.out' });
            break;

          case 'hero-elevation':
            // 10 FINAL HERO: Full architectural elevation zoom
            gsap.set(imageWrapper, { clipPath: 'inset(10% 10% 10% 10%)' });
            gsap.set(img, { scale: 1.2 });
            tl.to(imageWrapper, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'power3.out' })
              .to(img, { scale: 1.0, duration: 1.6, ease: 'power2.out' }, '<');
            break;
        }

        // Accompanying typography slide & fade
        if (infoCard) {
          gsap.set(infoCard, { opacity: 0, y: 30 });
          tl.to(infoCard, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.3);
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="project-narrative"
      ref={narrativeContainerRef}
      className="relative w-full bg-[#fcfbf9] text-[#121212] pt-24 pb-36 px-6 md:px-12 lg:px-20"
    >
      {/* Narrative Section Header */}
      <div className="max-w-6xl mx-auto mb-28 border-b border-black/[0.08] pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black text-white text-[10px] font-mono-tech tracking-widest uppercase mb-4">
              <span>ARCHITECTURAL MONOGRAPH</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111]">
              10-IMAGE SPATIAL NARRATIVE
            </h2>
            <p className="text-sm md:text-base font-mono-tech text-[#666660] mt-2">
              PARTHIV GOHIL JAMMING STUDIO — ANDHERI WEST, MUMBAI
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-left border-t md:border-t-0 md:border-l border-black/[0.08] pt-6 md:pt-0 md:pl-8">
            <div>
              <div className="text-[10px] font-mono-tech text-[#888880] uppercase">RT60 CALIBRATION</div>
              <div className="text-sm font-mono-tech font-bold text-[#111111]">0.38s @ 1kHz</div>
            </div>
            <div>
              <div className="text-[10px] font-mono-tech text-[#888880] uppercase">ACOUSTIC FLOOR</div>
              <div className="text-sm font-mono-tech font-bold text-[#111111]">-48 dB Ambient</div>
            </div>
            <div>
              <div className="text-[10px] font-mono-tech text-[#888880] uppercase">ENCLOSURE TYPE</div>
              <div className="text-sm font-mono-tech font-bold text-[#111111]">Trapezoidal Box</div>
            </div>
          </div>
        </div>
      </div>

      {/* 10-Image Narrative Grid Sequence */}
      <div className="max-w-6xl mx-auto space-y-36 md:space-y-48">
        {JAMMING_STUDIO_NARRATIVE.map((item, index) => {
          const isEven = index % 2 === 1;
          const isFullWidth = item.revealType === 'split-wipe' || item.revealType === 'hero-elevation';

          return (
            <div
              key={item.id}
              data-reveal-type={item.revealType}
              className={`narrative-item relative w-full flex flex-col ${
                isFullWidth
                  ? 'items-center'
                  : isEven
                  ? 'lg:flex-row-reverse items-center justify-between gap-12 lg:gap-20'
                  : 'lg:flex-row items-center justify-between gap-12 lg:gap-20'
              }`}
            >
              {/* Image Frame Container */}
              <div
                className={`narrative-img-wrapper relative overflow-hidden bg-[#e8e6df] rounded-sm shadow-xl ${
                  isFullWidth ? 'w-full max-w-5xl h-[60vh] md:h-[75vh]' : 'w-full lg:w-7/12 h-[50vh] md:h-[65vh]'
                }`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="narrative-img w-full h-full object-cover will-change-transform"
                />

                {/* Micro architectural corner markers */}
                <div className="absolute top-3 left-3 text-[9px] font-mono-tech text-white/80 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                  PLT_42 // {item.number}
                </div>
                <div className="absolute bottom-3 right-3 text-[9px] font-mono-tech text-white/80 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                  {item.category}
                </div>
              </div>

              {/* Text & Specification Card */}
              <div
                className={`narrative-info w-full ${
                  isFullWidth ? 'max-w-3xl mt-10 text-center' : 'lg:w-5/12 mt-6 lg:mt-0'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-xs font-mono-tech font-bold text-black border border-black/20 px-2.5 py-1 rounded">
                    {item.number} / 10
                  </span>
                  <span className="text-xs font-mono-tech tracking-wider text-[#777770] uppercase">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#111111] mb-2">
                  {item.title}
                </h3>
                <h4 className="text-sm font-mono-tech text-[#666660] mb-4">
                  {item.subtitle}
                </h4>

                <p className="text-sm md:text-base text-[#444440] leading-relaxed mb-6 font-normal">
                  {item.description}
                </p>

                {/* Technical Specification Caliper Box */}
                <div className="bg-[#f5f3ed] border border-black/[0.06] rounded-md p-4 text-left">
                  <div className="text-[10px] font-mono-tech tracking-widest text-[#888880] uppercase mb-2">
                    SPECIFICATION PARAMETERS
                  </div>
                  <div className="space-y-1.5 text-xs font-mono-tech text-[#333330]">
                    {item.technicalSpecs.material && (
                      <div className="flex justify-between border-b border-black/[0.04] pb-1">
                        <span className="text-[#777770]">MATERIAL:</span>
                        <span className="font-semibold">{item.technicalSpecs.material}</span>
                      </div>
                    )}
                    {item.technicalSpecs.acousticCoeff && (
                      <div className="flex justify-between border-b border-black/[0.04] pb-1">
                        <span className="text-[#777770]">ACOUSTICS:</span>
                        <span className="font-semibold">{item.technicalSpecs.acousticCoeff}</span>
                      </div>
                    )}
                    {item.technicalSpecs.lighting && (
                      <div className="flex justify-between border-b border-black/[0.04] pb-1">
                        <span className="text-[#777770]">LIGHTING:</span>
                        <span className="font-semibold">{item.technicalSpecs.lighting}</span>
                      </div>
                    )}
                    {item.technicalSpecs.dimensions && (
                      <div className="flex justify-between">
                        <span className="text-[#777770]">DIMENSIONS:</span>
                        <span className="font-semibold">{item.technicalSpecs.dimensions}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
