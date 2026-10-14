import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { JAMMING_STUDIO_NARRATIVE } from '../data/jammingStudioData';
import { LEGACY_PROJECTS_REGISTRY, PROJECTS_REGISTRY, type ProjectLocation } from '../data/mapConfig';
import { WORK_WRITE_UPS } from '../data/workWriteUps';

const indexOrder = [
  'jamming-studio',
  'urban-traction',
  'tedx-gateway',
  'mithchowki-transformation',
  'loop',
  'production-design',
  'housing-one',
];

const allProjects = [...PROJECTS_REGISTRY, ...LEGACY_PROJECTS_REGISTRY];

const projects = indexOrder.map((id) => allProjects.find((project) => project.id === id)).filter((project): project is ProjectLocation => Boolean(project));

type ProjectMedia = { imageUrl: string; narrative?: string };

function projectMedia(project: ProjectLocation): ProjectMedia[] {
  if (project.id === 'jamming-studio') return JAMMING_STUDIO_NARRATIVE.map(({ imageUrl, description }) => ({ imageUrl, narrative: description }));
  return project.galleryImages?.map(({ imageUrl, caption }) => ({ imageUrl, narrative: caption })) ?? [{ imageUrl: project.heroImage }];
}

function navigateToProject(id: string) {
  window.history.pushState({}, '', `/work/${id}`);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
}

export function WorkIndex() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeImages, setActiveImages] = useState<Record<string, number>>({});
  const [housingSequencePaused, setHousingSequencePaused] = useState(false);
  const heroRefs = useRef(new Map<string, HTMLElement>());
  const workRootRef = useRef<HTMLElement>(null);
  const stripRefs = useRef(new Map<string, HTMLDivElement>());
  const slideRefs = useRef(new Map<string, HTMLElement>());
  const dragRef = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const toggle = (id: string) => {
    const hero = heroRefs.current.get(id);
    const before = hero?.getBoundingClientRect();
    const opening = openId !== id;
    if (opening) setActiveImages((current) => ({ ...current, [id]: 0 }));
    setOpenId(opening ? id : null);
    requestAnimationFrame(() => {
      const after = hero?.getBoundingClientRect();
      if (!hero || !before || !after || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      hero.animate(
        [{ transformOrigin: 'left top', transform: `scale(${before.width / after.width}, ${before.height / after.height})` }, { transformOrigin: 'left top', transform: 'none' }],
        { duration: 620, easing: 'cubic-bezier(.16,.84,.3,1)' },
      );
    });
  };

  const selectImage = (id: string, imageIndex: number, count: number) => {
    const nextIndex = Math.max(0, Math.min(imageIndex, count - 1));
    setActiveImages((current) => ({ ...current, [id]: nextIndex }));
    if (id === 'housing-one') return;
    requestAnimationFrame(() => {
      const strip = stripRefs.current.get(id);
      if (!strip) return;
      if (nextIndex === 0) {
        strip.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }
      slideRefs.current.get(`${id}-${nextIndex}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  };

  useEffect(() => {
    if (openId !== 'housing-one' || housingSequencePaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const housingImages = projectMedia(projects.find((project) => project.id === 'housing-one')!);
    const timer = window.setInterval(() => {
      setActiveImages((current) => ({ ...current, 'housing-one': ((current['housing-one'] ?? 0) + 1) % housingImages.length }));
    }, 4600);
    return () => window.clearInterval(timer);
  }, [housingSequencePaused, openId]);

  useEffect(() => {
    const root = workRootRef.current;
    if (!root) return;
    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const strip = target.closest<HTMLDivElement>('.work-index__scroll');
      if (!strip || !root.contains(strip)) return;
      const max = strip.scrollWidth - strip.clientWidth;
      const canScroll = event.deltaY > 0 ? strip.scrollLeft < max - 1 : strip.scrollLeft > 1;
      if (canScroll) {
        event.preventDefault();
        strip.scrollLeft += event.deltaY;
      }
    };
    root.addEventListener('wheel', handleWheel, { passive: false });
    return () => root.removeEventListener('wheel', handleWheel);
  }, []);

  const beginDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    dragRef.current = { x: event.clientX, left: event.currentTarget.scrollLeft, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const drag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const distance = event.clientX - dragRef.current.x;
    if (Math.abs(distance) > 3) dragRef.current.moved = true;
    event.currentTarget.scrollLeft = dragRef.current.left - distance;
  };

  const moveCursor = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const cursor = cursorRef.current;
    if (!cursor) return;
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    cursor.classList.toggle('is-flipped', event.clientX < rect.left + rect.width / 2);
  };

  const showCursor = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    moveCursor(event);
    cursorRef.current?.classList.add('is-visible');
  };

  const clickStrip = (event: MouseEvent<HTMLDivElement>, id: string, activeImage: number, count: number) => {
    if ((event.target as HTMLElement).closest('button')) return;
    if (dragRef.current?.moved) {
      dragRef.current = null;
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    selectImage(id, activeImage + (event.clientX < rect.left + rect.width / 2 ? -1 : 1), count);
  };

  return (
    <section ref={workRootRef} id="work" aria-label="Selected works" className="work-index relative z-[1] bg-[var(--bg-primary)]">
      <h1 className="sr-only">Selected works</h1>
      <span ref={cursorRef} className="work-index__cursor" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M13 8 28 20 13 32Z" /></svg></span>
      {projects.map((project, index) => {
        const writeUp = WORK_WRITE_UPS[project.id];
        const title = writeUp?.title ?? project.title;
        const facts = writeUp?.facts ?? [['Year', project.year], ['Client', project.client], ['Typology', project.category], ['Size', '[size]'], ['Status', '[status]']];
        const isOpen = openId === project.id;
        const media = projectMedia(project);
        const activeImage = activeImages[project.id] ?? 0;
        const isHousingSequence = project.id === 'housing-one';
        const stripId = `project-strip-${project.id}`;
        return (
          <article className={`work-index__row ${isOpen ? 'is-open' : ''}`} key={project.id} style={{ '--work-carousel-index': activeImage } as React.CSSProperties}>
            <div className="work-index__label">
              <span className="work-index__number">{String(index + 1).padStart(2, '0')}</span>
              <button className="work-index__title" onClick={() => toggle(project.id)} aria-expanded={isOpen} aria-controls={stripId}>{title}</button>
              <p className="work-index__location">{project.area}, {project.city}</p>
              {writeUp?.subtitle && <p className="work-index__subtitle">{writeUp.subtitle}</p>}
              <div className="work-index__metadata"><div>
                {facts.map(([label, value]) => <div className="work-index__pair" key={label}><dt>{label}</dt><dd className={value.startsWith('[') ? 'work-index__missing' : ''}>{value}</dd></div>)}
                <button className="work-index__link" onClick={() => navigateToProject(project.id)}>Full project →</button>
              </div></div>
            </div>
            <div className="work-index__media">
              <button className="work-index__hero" ref={(node) => { if (node) heroRefs.current.set(project.id, node); }} onClick={() => toggle(project.id)} aria-label={`Open ${title}`}>
                <img src={media[0].imageUrl} alt={title} />
              </button>
              <div id={stripId} className="work-index__strip" aria-hidden={!isOpen}>
                {isHousingSequence ? (
                  <div className="work-index__housing-sequence" onPointerEnter={() => setHousingSequencePaused(true)} onPointerLeave={() => setHousingSequencePaused(false)}>
                    <div className="work-index__housing-stage" aria-label="Housing One design sequence">
                      {media.map((item, itemIndex) => <figure className={itemIndex === activeImage ? 'is-active' : ''} key={item.imageUrl}><img src={item.imageUrl} alt={`${title}: ${item.narrative ?? `image ${itemIndex + 1}`}`} /></figure>)}
                      <button className="work-index__housing-half is-prev" onClick={() => selectImage(project.id, activeImage - 1, media.length)} aria-label="Previous housing image" />
                      <button className="work-index__housing-half is-next" onClick={() => selectImage(project.id, activeImage + 1, media.length)} aria-label="Next housing image" />
                    </div>
                    <p className="work-index__housing-caption" aria-live="polite">{media[activeImage].narrative}</p>
                    <div className="work-index__housing-track" aria-label="Housing sequence steps">{media.map((item, itemIndex) => <button aria-current={itemIndex === activeImage} aria-label={`Show housing image ${itemIndex + 1}`} key={item.imageUrl} onClick={() => selectImage(project.id, itemIndex, media.length)} />)}</div>
                  </div>
                ) : (
                <div className="work-index__scroll" ref={(node) => { if (node) stripRefs.current.set(project.id, node); }} onClick={(event) => clickStrip(event, project.id, activeImage, media.length)} onPointerDown={beginDrag} onPointerMove={(event) => { drag(event); moveCursor(event); }} onPointerEnter={showCursor} onPointerLeave={() => { dragRef.current = null; cursorRef.current?.classList.remove('is-visible'); }} onPointerCancel={() => { dragRef.current = null; }}>
                  <p className="work-index__brief">{writeUp?.narrative ?? project.description}</p>
                  {media.slice(1).map((item, offset) => (
                    <div className="work-index__carousel-slide" ref={(node) => { if (node) slideRefs.current.set(`${project.id}-${offset + 1}`, node); }} key={item.imageUrl}>
                      <figure className="work-index__image-box"><img src={item.imageUrl} alt="" /></figure>
                      {item.narrative && <p className="work-index__narrative-box">{item.narrative}</p>}
                    </div>
                  ))}
                  <button className="work-index__end" onClick={() => navigateToProject(project.id)}>Full project →</button>
                </div>
                )}
                <div className="work-index__controls"><button onClick={() => selectImage(project.id, activeImage - 1, media.length)} aria-label="Previous image" disabled={activeImage === 0}><ArrowLeft size={16} /></button><span aria-live="polite">{String(activeImage + 1).padStart(2, '0')} / {String(media.length).padStart(2, '0')}</span><button onClick={() => selectImage(project.id, activeImage + 1, media.length)} aria-label="Next image" disabled={activeImage === media.length - 1}><ArrowRight size={16} /></button></div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
