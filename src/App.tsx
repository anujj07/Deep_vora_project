import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { MultiProjectIndex } from './components/MultiProjectIndex';
import { CustomCursor } from './components/CustomCursor';
import { Footer } from './components/Footer';
import { JournalEmbed } from './components/JournalEmbed';
import { ProfilePage } from './components/ProfilePage';
import { ServicesPage } from './components/ServicesPage';
import { WorkPage } from './components/WorkPage';
import { ProjectPage } from './components/ProjectPage';
import { ArchitecturePage } from './components/ArchitecturePage';
import { PROJECTS_REGISTRY, type ProjectLocation } from './data/mapConfig';
import { PagePreloader } from './components/PagePreloader';
import { useSectionRevealAnimations } from './hooks/useSectionRevealAnimations';

gsap.registerPlugin(ScrollTrigger);

const resolvePage = (path: string): 'home' | 'work' | 'project' | 'architecture' | 'services' | 'about' | 'contact' => {
  if (path.startsWith('/work/')) return 'project';
  return path === '/work' ? 'work' : path === '/architecture' ? 'architecture' : path === '/services' ? 'services' : path === '/contact' ? 'contact' : path === '/about' ? 'about' : 'home';
};

export function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<'home' | 'work' | 'project' | 'architecture' | 'services' | 'about' | 'contact'>(() => resolvePage(window.location.pathname));
  const [isLoading, setIsLoading] = useState(true);
  const [isProjectDrawerOpen, setIsProjectDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectLocation>(PROJECTS_REGISTRY[0]);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');
  const reducedMotion = useReducedMotion();
  useSectionRevealAnimations(appRef, !isLoading);
  const finishLoading = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

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

  const handleSelectProject = (proj: ProjectLocation) => {
    setSelectedProject(proj);
  };

  const handleNavigate = (id: string) => {
    if (id === 'work' || id === 'architecture' || id === 'services' || id === 'about' || id === 'contact') {
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
    <div ref={appRef} data-theme-root={theme} className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-black selection:text-white">
      {isLoading && <PagePreloader onComplete={finishLoading} />}
      {!isLoading && <>
      {/* Custom Inertial Trailing Cursor */}
      <CustomCursor />

      {/* Persistent Navigation & HUD */}
      <Navigation
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={() => setTheme((current) => current === 'light' ? 'dark' : 'light')}
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={page}
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {page === 'about' || page === 'contact' ? (
            <ProfilePage page={page} onBack={() => handleNavigate('index')} onContact={() => handleNavigate('contact')} />
          ) : page === 'work' ? (
            <WorkPage />
          ) : page === 'architecture' ? (
            <ArchitecturePage />
          ) : page === 'services' ? (
            <ServicesPage />
          ) : page === 'project' ? (
            <ProjectPage projectId={window.location.pathname.slice('/work/'.length)} />
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

      <JournalEmbed />
      <Footer />
            </>
          )}
        </motion.main>
      </AnimatePresence>
      </>}
    </div>
  );
}

export default App;
