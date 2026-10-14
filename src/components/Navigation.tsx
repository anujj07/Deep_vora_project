import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, X } from 'lucide-react';
import { LEGACY_PROJECTS_REGISTRY, PROJECTS_REGISTRY } from '../data/mapConfig';

interface NavigationProps {
  onNavigate: (id: string) => void;
}

const links = [
  { label: 'Work', id: 'work' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

const routeLabel = (path: string) => path === '/work' ? 'WORK' : path === '/about' ? 'ABOUT' : path === '/contact' ? 'CONTACT' : null;

export const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('index');
  const [routePath, setRoutePath] = useState(() => window.location.pathname);
  const [isCompact, setIsCompact] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLButtonElement>(null);
  const wasMenuOpenRef = useRef(false);
  const reducedMotion = useReducedMotion();
  const isProjectPage = routePath.startsWith('/work/');
  const isHomePage = routePath === '/';
  const breadcrumb = useMemo(() => {
    if (isProjectPage) {
      const projectId = routePath.slice('/work/'.length);
      const project = [...PROJECTS_REGISTRY, ...LEGACY_PROJECTS_REGISTRY].find((item) => item.id === projectId);
      return ['WORK', project?.title ?? 'PROJECT'];
    }
    const label = routeLabel(routePath);
    return label ? [label] : [];
  }, [isProjectPage, routePath]);

  useEffect(() => {
    const updateRouteState = () => {
      const path = window.location.pathname;
      setRoutePath(path);
      setActiveId(path === '/work' || path.startsWith('/work/') ? 'work' : path === '/about' ? 'about' : path === '/contact' ? 'contact' : 'index');
    };
    updateRouteState();
    window.addEventListener('popstate', updateRouteState);
    return () => window.removeEventListener('popstate', updateRouteState);
  }, []);

  useEffect(() => {
    const updateCompact = () => setIsCompact(window.scrollY > 24);
    updateCompact();
    window.addEventListener('scroll', updateCompact, { passive: true });
    return () => window.removeEventListener('scroll', updateCompact);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    window.requestAnimationFrame(() => firstMenuLinkRef.current?.focus());
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) { wasMenuOpenRef.current = true; return; }
    if (wasMenuOpenRef.current) { menuButtonRef.current?.focus(); wasMenuOpenRef.current = false; }
  }, [menuOpen]);

  const handleNavigate = (id: string) => {
    setActiveId(id);
    setRoutePath(id === 'work' || id === 'about' || id === 'contact' ? `/${id}` : '/');
    setMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header className={`fixed inset-x-0 z-[70] flex items-center justify-between bg-transparent backdrop-blur-sm text-[#121212] transition-[padding] duration-300 ${isHomePage ? 'top-2 px-4 sm:top-3 sm:px-5 md:px-6 lg:px-6' : 'top-3 px-5 sm:top-4 sm:px-6 md:px-8 lg:px-8'} ${isCompact ? (isHomePage ? 'py-2.5' : 'py-3') : (isHomePage ? 'py-3 md:py-4' : 'py-4 md:py-5')}`}>
        <div className="flex min-w-0 items-center gap-3 font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#121212] sm:text-[11px]">
          <a href="/" className="shrink-0 font-semibold text-[#121212] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4">Architect Deep Vora</a>
          {breadcrumb.length > 0 && <span className="hidden min-w-0 items-center gap-2 opacity-[0.55] md:flex" aria-label={`Current page: Deep Vora, ${breadcrumb.join(', ')}`}>{breadcrumb.map((item) => <React.Fragment key={item}><span>/</span><span className="truncate">{item}</span></React.Fragment>)}</span>}
        </div>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 font-mono-tech text-[11px] font-extrabold uppercase tracking-[0.13em] text-[#121212] md:flex lg:gap-10" aria-label="Main navigation">
          {links.map((link) => {
            const isActive = activeId === link.id;
            return <button key={link.id} type="button" aria-current={isActive ? 'page' : undefined} onClick={() => handleNavigate(link.id)} className="group relative py-1 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4">{link.label}<span className={`absolute -bottom-1 left-0 h-px bg-current transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} /></button>;
          })}
        </nav>

        <div className="ml-auto flex items-center gap-4 font-mono-tech text-[10px] uppercase tracking-[0.13em] text-[#121212] sm:gap-5 sm:text-[11px]">
          {isProjectPage && <button type="button" onClick={() => handleNavigate('work')} aria-label="Back to Work" className="hidden items-center gap-1.5 text-[#121212] transition-opacity hover:opacity-65 md:flex"><ChevronLeft className="h-3.5 w-3.5" strokeWidth={1.5} />Back to Work</button>}
          <button ref={menuButtonRef} type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="site-menu" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} className="group flex items-center transition-opacity hover:opacity-65 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4"><span className="relative grid h-4 w-4 place-items-center"><motion.span animate={{ y: menuOpen ? 0 : -5, rotate: menuOpen ? 45 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.2 }} className="absolute h-px w-4 bg-current" /><motion.span animate={{ opacity: menuOpen ? 0 : 1 }} transition={{ duration: reducedMotion ? 0 : 0.12 }} className="absolute h-px w-4 bg-current" /><motion.span animate={{ y: menuOpen ? 0 : 5, rotate: menuOpen ? -45 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.2 }} className="absolute h-px w-4 bg-current" /></span></button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && <>
          <motion.button type="button" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[79] cursor-default bg-black/10" />
          <motion.aside id="site-menu" role="dialog" aria-modal="true" aria-label="Site navigation" initial={reducedMotion ? false : { x: '100%' }} animate={{ x: 0 }} exit={reducedMotion ? undefined : { x: '100%' }} transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }} className="fixed right-0 top-0 z-[80] h-screen w-[min(380px,88vw)] bg-white px-10 pt-10 text-black shadow-2xl sm:px-12">
            <button type="button" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} className="ml-auto grid h-8 w-8 place-items-center"><X size={28} strokeWidth={2.5} /></button>
            <nav className="mt-6 flex flex-col items-start gap-6" aria-label="Main navigation">
              {links.map((link, index) => <motion.button key={link.id} ref={index === 0 ? firstMenuLinkRef : undefined} type="button" onClick={() => handleNavigate(link.id)} initial={reducedMotion ? false : { opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reducedMotion ? 0 : 0.22, delay: reducedMotion ? 0 : index * 0.05 }} className="text-left text-xl font-bold leading-tight hover:opacity-60 focus-visible:outline focus-visible:outline-1">{link.label}</motion.button>)}
            </nav>
          </motion.aside>
        </>}
      </AnimatePresence>
    </>
  );
};
