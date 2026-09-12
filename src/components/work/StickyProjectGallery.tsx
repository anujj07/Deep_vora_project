import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

interface StickyProjectGalleryProps {
  images: readonly string[];
  projectTitle: string;
}

interface StickyProjectCardProps {
  image: string;
  imageIndex: number;
  imageCount: number;
  projectTitle: string;
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
  isMobile: boolean;
}

const StickyProjectCard: React.FC<StickyProjectCardProps> = ({ image, imageIndex, imageCount, projectTitle, progress, reduceMotion, isMobile }) => {
  const scaleReduction = isMobile ? 0.035 : 0.06;
  const targetScale = reduceMotion ? 1 : Math.max(isMobile ? 0.93 : 0.84, 1 - (imageCount - imageIndex - 1) * scaleReduction);
  const scale = useTransform(progress, [imageIndex / imageCount, 1], [1, targetScale]);

  return (
    <div className="sticky top-[8svh] flex min-h-[76svh] items-center justify-center" style={{ zIndex: imageIndex + 1 }}>
      <motion.figure style={{ scale }} className="w-full origin-top">
        <div className="flex max-h-[66svh] min-h-[18rem] items-center justify-center overflow-hidden rounded-xl bg-[#e8e7e3] p-2 sm:p-3">
          <img src={image} alt={`${projectTitle} — project view ${imageIndex + 1}`} loading={imageIndex === 0 ? 'eager' : 'lazy'} className="h-auto max-h-[64svh] w-auto max-w-full object-contain" />
        </div>
        <figcaption className="mt-3 font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#777771] sm:text-[11px]">{projectTitle} / {String(imageIndex + 1).padStart(2, '0')}</figcaption>
      </motion.figure>
    </div>
  );
};

export const StickyProjectGallery: React.FC<StickyProjectGalleryProps> = ({ images, projectTitle }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 639px)').matches);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  useEffect(() => {
    const media = window.matchMedia('(max-width: 639px)');
    const updateViewport = () => setIsMobile(media.matches);
    media.addEventListener('change', updateViewport);
    return () => media.removeEventListener('change', updateViewport);
  }, []);

  return (
    <div ref={containerRef} className="relative mt-10 pb-[10svh] sm:mt-14" aria-label={`${projectTitle} image gallery`}>
      {images.map((image, imageIndex) => (
        <StickyProjectCard key={image} image={image} imageIndex={imageIndex} imageCount={images.length} projectTitle={projectTitle} progress={scrollYProgress} reduceMotion={reduceMotion} isMobile={isMobile} />
      ))}
    </div>
  );
};
