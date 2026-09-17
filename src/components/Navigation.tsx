import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, Moon, Sun } from 'lucide-react';
import { LEGACY_PROJECTS_REGISTRY, PROJECTS_REGISTRY } from '../data/mapConfig';

interface NavigationProps {
  onNavigate: (id: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const links = [
  { label: 'Work', id: 'work' },
  { label: 'Architecture', id: 'architecture' },
  { label: 'Services', id: 'services' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

const routeLabel = (path: string) => path === '/work' ? 'WORK' : path === '/architecture' ? 'ARCHITECTURE' : path === '/services' ? 'SERVICES' : path === '/about' ? 'ABOUT' : path === '/contact' ? 'CONTACT' : null;

export const Navigation: React.FC<NavigationProps> = ({ onNavigate, theme, onToggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('index');
  const [routePath, setRoutePath] = useState(() => window.location.pathname);
  const [isCompact, setIsCompact] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLButtonElement>(null);
  const wasMenuOpenRef = useRef(false);
  const reducedMotion = useReducedMotion();
  const isProjectPage = routePath.startsWith('/work/');
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
      setActiveId(path === '/work' || path.startsWith('/work/') ? 'work' : path === '/architecture' ? 'architecture' : path === '/services' ? 'services' : path === '/about' ? 'about' : path === '/contact' ? 'contact' : 'index');
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
    setRoutePath(id === 'work' || id === 'architecture' || id === 'services' || id === 'about' || id === 'contact' ? `/${id}` : '/');
    setMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[70] flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--nav-bg)] px-5 text-[var(--nav-text)] transition-[padding,background-color,color] duration-300 sm:px-8 md:px-12 lg:px-20 ${isCompact ? 'py-3 md:py-4' : 'py-5 md:py-7'}`}>
        <div className="flex min-w-0 items-center gap-3 font-mono-tech text-[10px] uppercase tracking-[0.14em] sm:text-[11px]">
          <a href="/" className="shrink-0 font-semibold transition-opacity hover:opacity-65 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4">DEEP VORA</a>
          {breadcrumb.length > 0 && <span className="hidden min-w-0 items-center gap-2 opacity-[0.55] md:flex" aria-label={`Current page: Deep Vora, ${breadcrumb.join(', ')}`}>{breadcrumb.map((item) => <React.Fragment key={item}><span>/</span><span className="truncate">{item}</span></React.Fragment>)}</span>}
        </div>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 font-mono-tech text-[10px] uppercase tracking-[0.13em] md:flex lg:left-[20%] lg:translate-x-0 lg:gap-10" aria-label="Main navigation">
          {links.map((link) => {
            const isActive = activeId === link.id;
            return <button key={link.id} type="button" aria-current={isActive ? 'page' : undefined} onClick={() => handleNavigate(link.id)} className="group relative py-1 transition-opacity hover:opacity-65 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4">{link.label}<span className={`absolute -bottom-1 left-0 h-px bg-current transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} /></button>;
          })}
        </nav>

        <div className="ml-auto flex items-center gap-4 font-mono-tech text-[10px] uppercase tracking-[0.13em] sm:gap-5 sm:text-[11px]">
          {isProjectPage && <button type="button" onClick={() => handleNavigate('work')} aria-label="Back to Work" className="hidden items-center gap-1.5 transition-opacity hover:opacity-65 md:flex"><ChevronLeft className="h-3.5 w-3.5" strokeWidth={1.5} />Back to Work</button>}
          <span className="hidden md:inline" aria-label="Current language">EN</span>
          <button type="button" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} className="grid h-7 w-7 place-items-center rounded-full border border-current/35 transition-colors hover:bg-current hover:text-[var(--bg-primary)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3">{theme === 'light' ? <Moon className="h-3.5 w-3.5" strokeWidth={1.5} /> : <Sun className="h-3.5 w-3.5" strokeWidth={1.5} />}</button>
          <button ref={menuButtonRef} type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="site-menu" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} className="group flex items-center gap-2 transition-opacity hover:opacity-65 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4"><span className="hidden md:inline">Menu</span><span className="relative grid h-4 w-4 place-items-center"><motion.span animate={{ y: menuOpen ? 0 : -5, rotate: menuOpen ? 45 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.2 }} className="absolute h-px w-4 bg-current" /><motion.span animate={{ opacity: menuOpen ? 0 : 1 }} transition={{ duration: reducedMotion ? 0 : 0.12 }} className="absolute h-px w-4 bg-current" /><motion.span animate={{ y: menuOpen ? 0 : 5, rotate: menuOpen ? -45 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.2 }} className="absolute h-px w-4 bg-current" /></span></button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && <motion.div id="site-menu" role="dialog" aria-modal="true" aria-label="Site navigation" initial={reducedMotion ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: reducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-0 z-[60] flex min-h-screen flex-col justify-between bg-[var(--bg-primary)] px-5 pb-8 pt-28 text-[var(--text-primary)] sm:px-8 sm:pb-10 sm:pt-32 md:px-12 lg:px-20"><nav className="border-t border-[var(--border-subtle)]" aria-label="Fullscreen navigation">{links.map((link, index) => <motion.button key={link.id} ref={index === 0 ? firstMenuLinkRef : undefined} type="button" onClick={() => handleNavigate(link.id)} initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.28, delay: reducedMotion ? 0 : 0.06 + index * 0.05, ease: [0.22, 1, 0.36, 1] }} className="group flex w-full items-center justify-between border-b border-[var(--border-subtle)] py-5 text-left text-[clamp(2.8rem,7vw,6.5rem)] font-medium leading-[0.88] tracking-[-0.06em] transition-colors hover:opacity-60 sm:py-7">{link.label}<span className="font-mono-tech text-[10px] tracking-[0.14em] opacity-40 transition-transform duration-300 group-hover:translate-x-1">0{index + 1}</span></motion.button>)}</nav><div className="flex items-end justify-between border-t border-[var(--border-subtle)] pt-5 font-mono-tech text-[10px] uppercase tracking-[0.14em] opacity-50 sm:text-[11px]"><span>Deep Vora / Architecture</span><span>EN</span></div></motion.div>}
      </AnimatePresence>
    </>
  );
};
