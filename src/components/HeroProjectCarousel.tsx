import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { LEGACY_PROJECTS_REGISTRY, PROJECTS_REGISTRY, type ProjectLocation } from '../data/mapConfig';

const findProject = (registry: ProjectLocation[], id: string) => registry.find((project) => project.id === id)!;

// A hero-specific ordering; all imagery comes from the existing project registry.
const heroProjects = [
  findProject(PROJECTS_REGISTRY, 'tedx-gateway'),
  findProject(LEGACY_PROJECTS_REGISTRY, 'jamming-studio'),
  findProject(PROJECTS_REGISTRY, 'urban-traction'),
  findProject(PROJECTS_REGISTRY, 'green-catalyst'),
  findProject(PROJECTS_REGISTRY, 'loop'),
  findProject(PROJECTS_REGISTRY, 'mithchowki-transformation'),
];

const wrappedIndex = (value: number) => (value + heroProjects.length) % heroProjects.length;

export function HeroProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const activeProject = heroProjects[activeIndex];
  const goTo = useCallback((index: number) => setActiveIndex(wrappedIndex(index)), []);
  const previous = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [next, previous]);

  useEffect(() => {
    const autoplay = window.setInterval(next, 4000);
    return () => window.clearInterval(autoplay);
  }, [next]);

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    const end = event.changedTouches[0];
    touchStart.current = null;
    if (!start || !end) return;
    const deltaX = end.clientX - start.x;
    const deltaY = end.clientY - start.y;
    if (Math.abs(deltaX) > 42 && Math.abs(deltaX) > Math.abs(deltaY)) deltaX < 0 ? next() : previous();
  };

  return (
    <div className="w-full">
      <div className="relative aspect-[1/1.04] overflow-hidden sm:aspect-[5/4] lg:aspect-[2.25/1]" aria-roledescription="carousel" aria-label="Selected projects" onTouchStart={(event) => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }} onTouchEnd={handleTouchEnd}>
        {heroProjects.map((project, index) => {
          let offset = index - activeIndex;
          if (offset > heroProjects.length / 2) offset -= heroProjects.length;
          if (offset < -heroProjects.length / 2) offset += heroProjects.length;
          const isActive = offset === 0;
          return (
            <motion.a key={project.id} href={`/work/${project.id}`} className="absolute left-[7%] top-1/2 block w-[86%] -translate-y-1/2 overflow-hidden rounded-[18px] bg-[#ebeae6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:left-[22%] sm:w-[56%] lg:left-[33%] lg:w-[34%]" style={{ zIndex: isActive ? 2 : 1, pointerEvents: Math.abs(offset) > 1 ? 'none' : 'auto' }} animate={{ x: `${offset * 108}%`, clipPath: isActive ? 'inset(0% 0% 0% 0% round 18px)' : 'inset(15% 0% 15% 0% round 18px)', opacity: Math.abs(offset) > 1 ? 0 : 1 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.62, ease: [0.22, 1, 0.36, 1] }} aria-label={`${project.title} project`} aria-hidden={Math.abs(offset) > 1}>
              <div className="aspect-[4/5] w-full"><img src={project.heroImage} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.015]" loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} /></div>
            </motion.a>
          );
        })}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between bg-gradient-to-t from-black/50 to-transparent px-4 pb-4 pt-16 text-[9px] font-mono-tech uppercase tracking-[0.14em] text-white sm:px-5 sm:pb-5 sm:text-[10px]"><span>Selected work / {String(activeIndex + 1).padStart(2, '0')}</span><span className="max-w-[48%] text-right">{activeProject.title}</span></div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-4 text-[10px] font-mono-tech uppercase tracking-[0.13em] text-[#777771] sm:text-[11px]">
        <div className="flex items-center gap-1"><button type="button" onClick={previous} aria-label="Previous slide" className="flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.14] text-[#222] transition-colors hover:bg-black hover:text-white"><ArrowLeft className="h-3.5 w-3.5" /></button><button type="button" onClick={next} aria-label="Next slide" className="flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.14] text-[#222] transition-colors hover:bg-black hover:text-white"><ArrowRight className="h-3.5 w-3.5" /></button></div>
        <div className="flex items-center gap-2" aria-label="Carousel pagination">{heroProjects.map((project, index) => <button key={project.id} type="button" onClick={() => goTo(index)} aria-label={`Go to slide ${index + 1}`} aria-current={index === activeIndex ? 'true' : undefined} className={`h-1.5 rounded-full transition-all ${index === activeIndex ? 'w-4 bg-black' : 'w-1.5 bg-black/[0.17] hover:bg-black/[0.42]'}`} />)}</div>
        <span className="hidden sm:inline">{activeProject.city}</span>
      </div>
    </div>
  );
}
