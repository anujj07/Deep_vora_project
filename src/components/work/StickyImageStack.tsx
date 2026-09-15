import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StickyImageStackProps {
  images: readonly string[];
  projectTitle: string;
}

export const StickyImageStack: React.FC<StickyImageStackProps> = ({ images, projectTitle }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cards = imageRefs.current.filter((image): image is HTMLImageElement => image !== null);
    if (!section || cards.length < 2) return;

    const context = gsap.context(() => {
      gsap.set(cards[0], { autoAlpha: 1, scale: 1, transformOrigin: '50% 50%' });
      gsap.set(cards.slice(1), { autoAlpha: 0, scale: 0.28, transformOrigin: '50% 50%' });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${window.innerHeight * (cards.length - 1) * 1.35}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      cards.slice(0, -1).forEach((card, index) => {
        const nextCard = cards[index + 1];
        timeline
          .to(card, { scale: 2.4, duration: 0.7, ease: 'none' })
          .to(nextCard, { autoAlpha: 1, scale: 1, duration: 0.7, ease: 'none' }, '<0.35')
          .to(card, { autoAlpha: 0, duration: 0.35, ease: 'none' }, '<0.2');
      });
    }, section);

    return () => context.revert();
  }, [images]);

  return (
    <section ref={sectionRef} className="relative mt-16 h-[100svh] overflow-hidden bg-[#e8e7e3] sm:mt-20" aria-label={`${projectTitle} image sequence`}>
      <div className="relative h-full w-full p-4 sm:p-8 lg:p-12">
        <div className="relative mx-auto h-full max-w-6xl overflow-hidden bg-[#d8d6d0]">
          {images.map((image, index) => (
            <img
              key={image}
              ref={(element) => { imageRefs.current[index] = element; }}
              src={image}
              alt={`${projectTitle} view ${index + 1}`}
              loading={index === 0 ? 'eager' : 'lazy'}
              className="absolute inset-0 h-full w-full origin-center object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
