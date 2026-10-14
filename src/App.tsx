import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { MultiProjectIndex } from './components/MultiProjectIndex';
// Replaced by <WorkPageBody /> in the single-page homepage scroll.
import { AboutPageBody, ProfilePage } from './components/ProfilePage';
import { WorkPage, WorkPageBody } from './components/WorkPage';
import { ContactPage, ContactPageBody } from './components/ContactPage';
import { LegalPage } from './components/LegalPage';
import { NotFoundPage } from './components/NotFoundPage';
import { LEGACY_PROJECTS_REGISTRY, PROJECTS_REGISTRY, type ProjectLocation } from './data/mapConfig';
import { useSectionRevealAnimations } from './hooks/useSectionRevealAnimations';

const ProjectPage = lazy(() => import('./components/ProjectPage').then((module) => ({ default: module.ProjectPage })));

gsap.registerPlugin(ScrollTrigger);

type Page = 'home' | 'work' | 'project' | 'about' | 'contact' | 'privacy' | 'terms' | 'not-found';

const resolvePage = (path: string): Page => {
  if (path.startsWith('/work/')) return [...PROJECTS_REGISTRY, ...LEGACY_PROJECTS_REGISTRY].some((project) => project.id === path.slice('/work/'.length)) ? 'project' : 'not-found';
  if (path === '/') return 'home';
  return path === '/work' ? 'work' : path === '/contact' ? 'contact' : path === '/about' ? 'about' : path === '/privacy' ? 'privacy' : path === '/terms' ? 'terms' : 'not-found';
};

export function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<Page>(() => resolvePage(window.location.pathname));
  const isLoading = false;
  const [isProjectDrawerOpen, setIsProjectDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectLocation>(PROJECTS_REGISTRY[0]);
  const [theme] = useState<'light' | 'dark'>(() => localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');
  const reducedMotion = useReducedMotion();
  useSectionRevealAnimations(appRef, !isLoading);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const project = page === 'project' ? [...PROJECTS_REGISTRY, ...LEGACY_PROJECTS_REGISTRY].find((item) => item.id === window.location.pathname.slice('/work/'.length)) : undefined;
    const metadata: Record<Page, [string, string]> = {
      home: ['Deep Vora', 'Deep Vora is an independent architectural practice working across architecture, urban design, and project delivery.'], work: ['Work — Deep Vora', 'Selected architecture, urban design, and construction work by Deep Vora.'], project: [`${project?.title ?? 'Project'} — Deep Vora`, project?.description ?? 'Selected work by Deep Vora.'], about: ['About — Deep Vora', 'About Deep Vora, an independent architectural practice.'], contact: ['Contact — Deep Vora', 'Contact Deep Vora about architecture, urban design, and project coordination.'], privacy: ['Privacy Policy — Deep Vora', 'Privacy information for the Deep Vora portfolio website.'], terms: ['Terms of Use — Deep Vora', 'Terms of use for the Deep Vora portfolio website.'], 'not-found': ['Page Not Found — Deep Vora', 'The requested page could not be found.'],
    };
    const [title, description] = metadata[page];
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
  }, [page]);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    // Initialize Lenis smooth inertia scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setPage(resolvePage(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (page !== 'home') return;
    const refresh = () => ScrollTrigger.refresh();
    const frame = requestAnimationFrame(refresh);
    window.addEventListener('load', refresh, { once: true });
    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(refresh);
    if (appRef.current) observer?.observe(appRef.current);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('load', refresh);
      observer?.disconnect();
    };
  }, [page]);

  const handleSelectProject = (proj: ProjectLocation) => {
    setSelectedProject(proj);
  };

  const handleNavigate = (id: string) => {
    if (id === 'work' || id === 'about' || id === 'contact') {
      window.history.pushState({}, '', `/${id}`);
      setPage(id);
      window.scrollTo(0, 0);
      return;
    }

    if (page !== 'home') {
      window.history.pushState({}, '', '/');
      setPage('home');
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div ref={appRef} data-theme-root={theme} className={`relative min-h-screen ${page === 'home' ? 'z-[1] bg-transparent' : 'bg-[var(--bg-primary)]'} text-[var(--text-primary)] selection:bg-black selection:text-white`}>
      {/* <PagePreloader onComplete={finishLoading} /> */}
      {!isLoading && <>
      {/* Persistent Navigation & HUD */}
      <Navigation
        onNavigate={handleNavigate}
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={page}
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {page === 'about' ? (
            <ProfilePage page={page} onBack={() => handleNavigate('index')} onContact={() => handleNavigate('contact')} />
          ) : page === 'contact' ? (
            <ContactPage />
          ) : page === 'privacy' ? (
            <LegalPage type="privacy" />
          ) : page === 'terms' ? (
            <LegalPage type="terms" />
          ) : page === 'not-found' ? (
            <NotFoundPage />
          ) : page === 'work' ? (
            <WorkPage />
          ) : page === 'project' ? (
            <Suspense fallback={<div className="min-h-screen bg-white" aria-busy="true" />}>
              <ProjectPage projectId={window.location.pathname.slice('/work/'.length)} />
            </Suspense>
          ) : (
            <>

      {/* Section 0: Studio Cartography Hero */}
      <HeroSection />

      {/* Multi-Project Drawer Modal */}
      <MultiProjectIndex
        isOpen={isProjectDrawerOpen}
        onClose={() => setIsProjectDrawerOpen(false)}
        onSelectProject={handleSelectProject}
        selectedProjectId={selectedProject.id}
      />

      <section id="work" className="relative z-[1] bg-[var(--bg-primary)]"><WorkPageBody headingLevel={2} /></section>
      <section id="about" className="relative z-[1] bg-[var(--bg-primary)]"><AboutPageBody headingLevel={2} /></section>
      <section id="contact" className="relative z-[1] bg-[var(--bg-primary)]"><ContactPageBody headingLevel={2} /></section>
            </>
          )}
        </motion.main>
      </AnimatePresence>
      </>}
    </div>
  );
}

export default App;
