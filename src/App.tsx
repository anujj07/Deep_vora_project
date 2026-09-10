import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { MapExperience } from './components/MapExperience';
import { JammingStudioNarrative } from './components/JammingStudioNarrative';
import { MultiProjectIndex } from './components/MultiProjectIndex';
import { CustomCursor } from './components/CustomCursor';
import { Footer } from './components/Footer';
import { ProfilePage } from './components/ProfilePage';
import { ServicesSection } from './components/ServicesSection';
import { PROJECTS_REGISTRY, type ProjectLocation } from './data/mapConfig';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [page, setPage] = useState<'home' | 'about' | 'contact'>(() => window.location.pathname === '/contact' ? 'contact' : window.location.pathname === '/about' ? 'about' : 'home');
  const [isProjectDrawerOpen, setIsProjectDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectLocation>(PROJECTS_REGISTRY[0]);

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
    const handlePopState = () => setPage(window.location.pathname === '/contact' ? 'contact' : window.location.pathname === '/about' ? 'about' : 'home');
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectProject = (proj: ProjectLocation) => {
    setSelectedProject(proj);
  };

  const handleNavigate = (id: string) => {
    if (id === 'about' || id === 'contact') {
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
    <div className="min-h-screen bg-[#fcfbf9] text-[#121212] selection:bg-black selection:text-white relative">
      {/* Custom Inertial Trailing Cursor */}
      <CustomCursor />

      {/* Persistent Navigation & HUD */}
      <Navigation
        onOpenProjects={() => setIsProjectDrawerOpen(true)}
        onSelectProject={handleSelectProject}
        onNavigate={handleNavigate}
      />

      {page !== 'home' ? (
        <ProfilePage page={page} onBack={() => handleNavigate('index')} onContact={() => handleNavigate('contact')} />
      ) : (
        <>

      {/* Section 0: Studio Cartography Hero */}
      <HeroSection />

      {/* Section 1: Cinematic Map Experience (Pinned Camera Travel) */}
      <section id="work">
        <MapExperience
          key={selectedProject.id}
          selectedProjectId={selectedProject.id}
          onProjectSelect={handleSelectProject}
        />
      </section>

      {/* Section 2: Jamming Studio 10-Image Architectural Narrative */}
      <JammingStudioNarrative />

      <ServicesSection />

      {/* Multi-Project Drawer Modal */}
      <MultiProjectIndex
        isOpen={isProjectDrawerOpen}
        onClose={() => setIsProjectDrawerOpen(false)}
        onSelectProject={handleSelectProject}
        selectedProjectId={selectedProject.id}
      />

      {/* Section 3: Spatial Manifesto & Colophon Footer */}
      <Footer />
        </>
      )}
    </div>
  );
}

export default App;
