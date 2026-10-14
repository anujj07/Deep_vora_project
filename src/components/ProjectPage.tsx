import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { JAMMING_STUDIO_IMAGES } from '../data/jammingStudioData';
import { LEGACY_PROJECTS_REGISTRY, PROJECTS_REGISTRY, type ProjectLocation } from '../data/mapConfig';
import { WORK_WRITE_UPS } from '../data/workWriteUps';

const HousingOneStepSequences = React.lazy(() => import('./projects/housing-one/HousingOneStepSequences').then((module) => ({ default: module.HousingOneStepSequences })));
const JammingStudioCollage = React.lazy(() => import('./projects/jamming-studio/JammingStudioCollage').then((module) => ({ default: module.JammingStudioCollage })));
const LoopCollage = React.lazy(() => import('./projects/loop/LoopCollage').then((module) => ({ default: module.LoopCollage })));
const LoopRow = React.lazy(() => import('./projects/loop/LoopRow').then((module) => ({ default: module.LoopRow })));
const RoadNetwork = React.lazy(() => import('./projects/urban-traction/RoadNetwork').then((module) => ({ default: module.RoadNetwork })));
const UrbanTractionCollage = React.lazy(() => import('./projects/urban-traction/UrbanTractionCollage').then((module) => ({ default: module.UrbanTractionCollage })));
const UrbanTractionComparisons = React.lazy(() => import('./projects/urban-traction/UrbanTractionComparisons').then((module) => ({ default: module.UrbanTractionComparisons })));
const UrbanTractionStudy = React.lazy(() => import('./projects/urban-traction/UrbanTractionStudy').then((module) => ({ default: module.UrbanTractionStudy })));
const ProductionDesignCollage = React.lazy(() => import('./projects/production-design/ProductionDesignCollage').then((module) => ({ default: module.ProductionDesignCollage })));

gsap.registerPlugin(ScrollTrigger);

const formatProjectTitle = (title: string) => title.split(' ').map((word) => (
  word.toLowerCase() === 'tedx'
    ? 'TEDx'
    : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
)).join(' ');

const urbanTractionSequenceLayoutCss = `
html,body,#main{height:100%;min-height:100%}
body{display:block;min-height:100%;font-family:Inter,-apple-system,'Helvetica Neue',Arial,sans-serif;text-align:center}
#main{display:block;width:100%}
.seq{display:flex;width:100%;height:100%;min-height:100%;flex-direction:column;max-width:none;margin:0 auto;padding:clamp(18px,3.2vh,44px) clamp(18px,4vw,48px)}
.seq__head{flex:none;text-align:center;margin-bottom:clamp(20px,2.6vw,34px)}
.seq__head h2{font-family:Inter,-apple-system,'Helvetica Neue',Arial,sans-serif;font-size:12.5px;font-weight:500;line-height:1.2;letter-spacing:.16em;text-transform:uppercase;color:#1a1a1a}
.seq__head p{font-family:Inter,-apple-system,'Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:400;line-height:1.4;letter-spacing:.12em;text-transform:uppercase;color:#8a8a8a;margin-top:6px}
.stage{flex:none;width:min(100%,632px);aspect-ratio:1486/829;height:auto;max-width:none;margin-inline:auto}
.caption{flex:none;min-height:74px;text-align:center;margin-top:clamp(18px,2.4vw,30px);padding-inline:clamp(0px,6vw,110px)}
.caption p{font-family:Inter,-apple-system,'Helvetica Neue',Arial,sans-serif;font-size:13.5px;font-weight:400;line-height:1.55;letter-spacing:0;color:#1a1a1a}
.caption .key{font-weight:500}
.counter{flex:none;text-align:center;margin-top:8px;padding-top:0;font-family:Inter,-apple-system,'Helvetica Neue',Arial,sans-serif;font-size:13px;font-weight:400;line-height:1.4;letter-spacing:.06em;color:#1a1a1a}
.counter .now{color:#8a8a8a}
.track{flex:none;display:flex;gap:4px;justify-content:center;margin-top:14px}
.hint{flex:none;text-align:center;margin-top:16px;padding-bottom:4px;font-family:Inter,-apple-system,'Helvetica Neue',Arial,sans-serif;font-size:10px;font-weight:400;line-height:1.4;letter-spacing:.14em;text-transform:uppercase;color:#8a8a8a}
`;

const findProject = (projects: ProjectLocation[], id: string) => projects.find((project) => project.id === id)!;
const projectsById: Record<string, ProjectLocation> = {
  'jamming-studio': findProject(LEGACY_PROJECTS_REGISTRY, 'jamming-studio'),
  'urban-traction': findProject(PROJECTS_REGISTRY, 'urban-traction'),
  'housing-one': findProject(LEGACY_PROJECTS_REGISTRY, 'housing-one'),
  'tedx-gateway': findProject(PROJECTS_REGISTRY, 'tedx-gateway'),
  'mithchowki-transformation': findProject(PROJECTS_REGISTRY, 'mithchowki-transformation'),
  'production-design': findProject(PROJECTS_REGISTRY, 'production-design'),
  loop: findProject(PROJECTS_REGISTRY, 'loop'),
};

type DetailImage = { imageUrl: string; caption: string; aspectRatio: number };
const jammingImages: DetailImage[] = [
  { imageUrl: JAMMING_STUDIO_IMAGES.hero, caption: '01 — Jamming Studio', aspectRatio: 1.25 },
  { imageUrl: JAMMING_STUDIO_IMAGES.spatial, caption: '02 — Acoustic studio view', aspectRatio: 1.25 },
  { imageUrl: JAMMING_STUDIO_IMAGES.detail, caption: '03 — Studio lighting detail', aspectRatio: 1.25 },
  { imageUrl: '/projects/jamming-studio/JAMMING_STUDIO_04_HIGH_QUALITY.png', caption: '04 — Acoustic performance space', aspectRatio: 1.248 },
  { imageUrl: '/projects/jamming-studio/JAMMING_STUDIO_05.png', caption: '05 — Studio interior', aspectRatio: 1.391 },
];

const projectImages = (project: ProjectLocation): DetailImage[] => {
  if (project.id === 'jamming-studio') return jammingImages;
  if (project.id === 'production-design') return [{ imageUrl: project.heroImage, caption: '01 — Production Design', aspectRatio: 2.25 }];
  return (project.galleryImages ?? []).map(({ imageUrl, caption, aspectRatio }) => ({ imageUrl, caption, aspectRatio }));
};

const SequenceFrame: React.FC<{ src: string; title: string; className: string; contentCss?: string; disableAutoHeight?: boolean; disableScroll?: boolean; preserveMinHeight?: boolean }> = ({ src, title, className, contentCss, disableAutoHeight, disableScroll, preserveMinHeight }) => {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let observer: ResizeObserver | undefined;
    const applyContentCss = () => {
      if (!contentCss) return;
      const doc = frame.contentDocument;
      if (!doc?.head) return;
      let style = doc.head.querySelector<HTMLStyleElement>('style[data-parent-layout-overrides]');
      if (!style) {
        style = doc.createElement('style');
        style.dataset.parentLayoutOverrides = '';
        doc.head.appendChild(style);
      }
      style.textContent = contentCss;
    };
    const fitFrame = () => {
      if (disableAutoHeight) return;
      const doc = frame.contentDocument;
      if (!doc?.body) return;
      if (preserveMinHeight) frame.style.height = '';
      const minHeight = preserveMinHeight ? frame.getBoundingClientRect().height : 0;
      const height = Math.max(doc.body.scrollHeight, doc.body.offsetHeight, minHeight);
      if (height > 0) frame.style.height = `${height}px`;
    };
    const observeContent = () => {
      applyContentCss();
      fitFrame();
      const doc = frame.contentDocument;
      if (doc?.body && typeof ResizeObserver !== 'undefined') {
        observer?.disconnect();
        observer = new ResizeObserver(fitFrame);
        observer.observe(doc.body);
      }
    };
    frame.addEventListener('load', observeContent);
    window.addEventListener('resize', fitFrame);
    return () => {
      observer?.disconnect();
      frame.removeEventListener('load', observeContent);
      window.removeEventListener('resize', fitFrame);
    };
  }, [contentCss, disableAutoHeight, preserveMinHeight]);

  return <iframe ref={frameRef} src={src} title={title} loading="lazy" scrolling={disableScroll ? 'no' : undefined} className={className} />;
};

interface ProjectPageProps { projectId: string; }

export const ProjectPage: React.FC<ProjectPageProps> = ({ projectId }) => {
  const rootRef = useRef<HTMLElement>(null);
  const mithchowkiVideoRef = useRef<HTMLVideoElement>(null);
  const project = projectsById[projectId];
  const writeUp = WORK_WRITE_UPS[projectId];

  useEffect(() => {
    if (projectId !== 'mithchowki-transformation') return;
    const video = mithchowkiVideoRef.current;
    if (!video) return;
    const startTime = 14;
    const endTime = 38;
    const setStartTime = () => { video.currentTime = startTime; };
    const constrainTime = () => {
      if (video.currentTime < startTime) video.currentTime = startTime;
      if (video.currentTime > endTime) video.currentTime = endTime;
    };
    const stopAtEnd = () => {
      if (video.currentTime >= endTime) {
        video.currentTime = endTime;
        video.pause();
      }
    };
    const restartFromStart = () => {
      if (video.currentTime >= endTime) video.currentTime = startTime;
    };
    video.addEventListener('loadedmetadata', setStartTime);
    video.addEventListener('seeking', constrainTime);
    video.addEventListener('timeupdate', stopAtEnd);
    video.addEventListener('play', restartFromStart);
    if (video.readyState >= 1) setStartTime();
    return () => {
      video.removeEventListener('loadedmetadata', setStartTime);
      video.removeEventListener('seeking', constrainTime);
      video.removeEventListener('timeupdate', stopAtEnd);
      video.removeEventListener('play', restartFromStart);
    };
  }, [projectId]);

  useEffect(() => {
    if (projectId !== 'mithchowki-transformation') return;
    const video = mithchowkiVideoRef.current;
    if (!video || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
    }, { threshold: 0.01 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [projectId]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => {
      const textBlocks = gsap.utils.toArray<HTMLElement>('.project-detail__reveal-text', root);
      gsap.set(textBlocks, { autoAlpha: 0, y: 14 });
      textBlocks.forEach((block) => gsap.to(block, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: block, start: 'top 85%', once: true } }));
      const plates = gsap.utils.toArray<HTMLElement>('.project-detail__plate', root);
      plates.forEach((plate) => {
        const image = plate.querySelector('img');
        gsap.set(plate, { clipPath: 'inset(0 0 100% 0)' });
        gsap.set(image, { scale: 1.06 });
        const timeline = gsap.timeline({ scrollTrigger: { trigger: plate, start: 'top 85%', once: true } });
        timeline.to(plate, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power3.out' }).to(image, { scale: 1, duration: 1.1, ease: 'power3.out' }, '<');
      });
      const timeout = window.setTimeout(() => gsap.set([...textBlocks, ...plates], { autoAlpha: 1, y: 0, clipPath: 'inset(0 0 0 0)' }), 3000);
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', refresh, { once: true });
      return () => { window.clearTimeout(timeout); window.removeEventListener('load', refresh); };
    }, root);
    return () => context.revert();
  }, [projectId]);

  if (!project) return <section className="min-h-screen bg-[var(--bg-primary)] px-5 pb-16 pt-28"><p className="font-mono-tech text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)]">Project not found</p></section>;

  const images = projectImages(project);
  const [keyImage, ...galleryImages] = images;
  const title = writeUp?.title ?? project.title;
  const facts = writeUp?.facts ?? [];
  const location = facts.find(([label]) => label === 'Location')?.[1];
  return (
    <section ref={rootRef} className="project-detail min-h-screen bg-white pb-16 pt-10 text-[#121212] sm:pb-24 sm:pt-21">
      <noscript><style>{'.project-detail__reveal-text,.project-detail__plate{opacity:1!important;transform:none!important;clip-path:none!important}'}</style></noscript>
      {keyImage && <figure className={`project-detail__plate project-detail__key w-full ${projectId === 'jamming-studio' ? 'project-detail__key--jamming' : projectId === 'urban-traction' ? 'project-detail__key--urban-traction' : projectId === 'housing-one' ? 'project-detail__key--housing' : 'h-[min(44vw,670px)]'}`} style={{ '--ar': 2.25 } as React.CSSProperties}>{projectId === 'housing-one' && <img className="project-detail__key-housing-blur" src={keyImage.imageUrl} alt="" aria-hidden="true" /> }<img className={projectId === 'housing-one' ? 'project-detail__key-housing-image' : undefined} src={projectId === 'jamming-studio' ? '/projects/jamming-studio/JAMMING_STUDIO_KEY.png' : projectId === 'urban-traction' ? '/projects/urban-traction/URBAN_TRACTION_KEY_TRY.png' : keyImage.imageUrl} alt={`${title} — project view`} loading="eager" /></figure>}
      <div className="mx-auto max-w-[1400px] px-5 sm:px-10 lg:px-0">
        <header className="project-detail__reveal-text mt-10 sm:mt-15">
          <div>
            <h1 className="mt-2 max-w-[720px] text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[4.25rem]">{formatProjectTitle(title)}</h1>
            {location && <p className="mt-2 text-sm text-[#121212] sm:text-base">{location}</p>}
          </div>
          <div className="mt-2 grid grid-cols-1 gap-9 sm:mt-4 lg:grid-cols-12 lg:gap-20">
            {writeUp?.narrative && <div className="lg:col-span-7"><p className="font-narrative max-w-[750px] text-base leading-[1.50] text-[#121212]">{writeUp.narrative}</p></div>}
            {facts.length > 0 && <div className="project-detail__facts self-start mt-16 sm:mt-20 lg:mt-0 lg:col-span-4 lg:col-start-9"><dl className="text-xs leading-[1.55] text-[#121212]">{facts.map(([label, value]) => <div key={label} className="mb-5"><dt className="font-semibold">{label}:</dt><dd>{value}</dd></div>)}</dl></div>}
          </div>
        </header>

        {projectId === 'mithchowki-transformation' && <section className="mt-12 sm:mt-16" aria-label={`${title} supporting video`}>
          <video ref={mithchowkiVideoRef} controls playsInline preload="metadata" className="mx-auto block h-auto w-full max-w-3xl">
            <source src="/projects/mithchowki-transformation/Video%20Project.mp4" type="video/mp4" />
          </video>
        </section>}

        {projectId === 'jamming-studio' && <section className="mt-13" aria-label={`${title} visual narrative`}><React.Suspense fallback={<div className="jamming-collage-frame" aria-hidden="true" />}><JammingStudioCollage title="Jamming Studio image collage" className="jamming-collage-frame" /></React.Suspense></section>}

        {projectId === 'urban-traction' && (
          <>
            <section className="mt-10 sm:mt-8 lg:mt-8" aria-label="Urban Step and Road Network sequences">
              <div className="mx-auto grid w-full max-w-[1300px] grid-cols-1 items-start gap-y-12 sm:gap-y-20 md:grid-cols-2 md:gap-x-6 md:gap-y-0">
                <figure className="min-w-0 w-full">
                  <React.Suspense fallback={<div className="h-[700px] w-full" aria-hidden="true" />}>
                    <UrbanTractionStudy
                      title="Urban Traction urban step sequence"
                      className="!block !h-[700px] !w-full overflow-hidden border-0"
                      contentCss={urbanTractionSequenceLayoutCss}
                      disableAutoHeight
                      disableScroll
                    />
                  </React.Suspense>
                </figure>
                <figure className="min-w-0 w-full">
                  <React.Suspense fallback={<div className="h-[700px] w-full" aria-hidden="true" />}>
                    <RoadNetwork
                      title="Urban Traction road network sequence"
                      className="!block !h-[700px] !w-full overflow-hidden border-0"
                      contentCss={urbanTractionSequenceLayoutCss}
                      disableAutoHeight
                      disableScroll
                    />
                  </React.Suspense>
                </figure>
              </div>
            </section>
            <section className="relative left-1/2 mt-3 w-screen -translate-x-1/2 bg-white sm:mt-4" aria-label="Urban Traction transformation comparison and image collage">
              <React.Suspense fallback={<div className="h-[620px] w-full" aria-hidden="true" />}>
                <UrbanTractionComparisons
                  title="Urban Traction existing and proposed comparisons"
                  className="block w-full border-0"
                />
              </React.Suspense>
              <React.Suspense fallback={<div className="h-[calc(100svh-120px)] w-full" aria-hidden="true" />}>
                <UrbanTractionCollage
                  title="Urban Traction image collage"
                  className="block h-[calc(100svh-120px)] w-full border-0"
                  disableAutoHeight
                />
              </React.Suspense>
            </section>
          </>
        )}

        {projectId === 'housing-one' && (
          <section className="mt-12 sm:mt-8 lg:mt-16" aria-label="Affordable Housing unit mix, site study, massing sequence, and image collage">
            <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-start gap-y-12 sm:gap-y-20 md:grid-cols-2 md:gap-x-6 md:gap-y-0">
              <figure>
                <React.Suspense fallback={<div className="h-[834px] w-full" aria-hidden="true" />}>
                  <HousingOneStepSequences
                    title="Housing One site study step sequence"
                    className="!block !h-[834px] w-full border-0"
                    contentCss=".seq__head,.study__head{margin-bottom:34px}.stage{aspect-ratio:1358/933}.caption{min-height:78px;margin-top:26px}.counter{margin-top:21px}.track{margin-top:15px}.hint{margin-top:17px}"
                    disableAutoHeight
                  />
                </React.Suspense>
              </figure>
              <figure>
                <SequenceFrame
                  src="/housing-massing-sequence.html"
                  title="Housing One massing step sequence"
                  className="!block !h-[700px] w-full border-0"
                  contentCss=".seq__head,.study__head{margin-bottom:34px}.stage{aspect-ratio:1358/933}.caption{min-height:78px;margin-top:26px}.counter{margin-top:21px}.track{margin-top:15px}.hint{margin-top:17px}"
                  disableAutoHeight
                />
              </figure>
            </div>
            <div className="relative left-1/2 mt-12 w-screen -translate-x-1/2 sm:mt-16">
              <SequenceFrame
                src="/housing-standalone.html"
                title="Housing One project image collage"
                className="block h-[100svh] w-full border-0"
              />
            </div>
          </section>
        )}

        {projectId === 'production-design' && (
          <section className="relative left-1/2 w-screen -translate-x-1/2" aria-label={`${title} visual narrative`}>
            <React.Suspense fallback={<div className="h-[400px] w-full" aria-hidden="true" />}>
              <ProductionDesignCollage
                title={`${title} visual narrative`}
                className="block h-[800px] w-full border-0"
              />
            </React.Suspense>
          </section>
        )}

        {projectId !== 'jamming-studio' && projectId !== 'urban-traction' && projectId !== 'housing-one' && projectId !== 'production-design' && galleryImages.length > 0 && <section className="mt-12 sm:mt-8 lg:mt-16" aria-label={`${title} visual narrative`}>
          <div className="grid grid-cols-1 gap-y-12 sm:gap-y-20 lg:grid-cols-12 lg:gap-y-20">
            {galleryImages.map((image, imageIndex) => <figure key={`${image.imageUrl}-${imageIndex}`} className={imageIndex % 2 === 0 ? 'lg:col-span-12 lg:pl-[42%]' : 'lg:col-span-12 lg:pr-[42%] lg:mt-24'}>
              <div className="project-detail__plate project-detail__image" style={{ '--ar': image.aspectRatio } as React.CSSProperties}><img src={image.imageUrl} alt={image.caption} loading="lazy" /></div>
              <figcaption className="project-detail__reveal-text font-narrative mt-4 max-w-[40ch] leading-relaxed text-[#121212]">{image.caption}</figcaption>
            </figure>)}
          </div>
        </section>}

        {projectId === 'loop' && (
          <>
            <section className="relative left-1/2 mt-28 w-screen -translate-x-1/2 sm:mt-40" aria-label="Loop project step sequence">
              <React.Suspense fallback={<div className="h-[834px] w-full" aria-hidden="true" />}>
                <LoopRow
                  title="Loop neighbourhood analysis step sequences"
                  className="block h-[834px] w-full border-0"
                />
              </React.Suspense>
            </section>
            <section className="relative left-1/2 mt-12 w-screen -translate-x-1/2 sm:mt-16" aria-label="Loop project collage">
              <React.Suspense fallback={<div className="h-[100svh] w-full" aria-hidden="true" />}>
                <LoopCollage
                  title="Loop project collage"
                  className="block h-[100svh] w-full border-0"
                />
              </React.Suspense>
            </section>
          </>
        )}

        <nav className={`project-detail__reveal-text flex justify-end border-t border-[#121212] pt-6 ${projectId === 'urban-traction' ? 'mt-0' : projectId === 'housing-one' ? 'mt-12 sm:mt-16' : 'mt-28 sm:mt-40'}`} aria-label="Project navigation">
          <a href="/work" className="text-right text-[11px] uppercase tracking-[0.12em] text-[#121212] hover:text-[#777] sm:text-xs">Work →</a>
        </nav>
      </div>
    </section>
  );
};
