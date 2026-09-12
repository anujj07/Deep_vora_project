import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

interface NavigationProps {
  onNavigate: (id: string) => void;
}

const links = [
  { label: 'Work', id: 'work' },
  { label: 'Services', id: 'services' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

export const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('index');
  const [routePath, setRoutePath] = useState(() => window.location.pathname);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLButtonElement>(null);
  const wasMenuOpenRef = useRef(false);
  const reducedMotion = useReducedMotion();
  const isProjectPage = routePath.startsWith('/work/');

  useEffect(() => {
    const updateRouteState = () => {
      const path = window.location.pathname;
      setRoutePath(path);
      setActiveId(path === '/work' || path.startsWith('/work/') ? 'work' : path === '/services' ? 'services' : path === '/about' ? 'about' : path === '/contact' ? 'contact' : 'index');
    };

    updateRouteState();
    window.addEventListener('popstate', updateRouteState);
    return () => window.removeEventListener('popstate', updateRouteState);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    window.requestAnimationFrame(() => firstMenuLinkRef.current?.focus());
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      wasMenuOpenRef.current = true;
      return;
    }
    if (wasMenuOpenRef.current) {
      menuButtonRef.current?.focus();
      wasMenuOpenRef.current = false;
    }
  }, [menuOpen]);

  const handleNavigate = (id: string) => {
    setActiveId(id);
    setRoutePath(id === 'work' || id === 'services' || id === 'about' || id === 'contact' ? `/${id}` : '/');
    setMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[70] flex items-center justify-between border-b border-white/15 bg-[#161616]/95 px-5 py-5 text-[#fcfbf9] sm:px-8 md:px-12 md:py-7 lg:px-20">
        <a href="/" className="font-mono-tech text-[11px] font-semibold uppercase tracking-[0.14em] transition-opacity hover:opacity-65 sm:text-xs">DEEP VORA</a>

        {isProjectPage ? (
          <button type="button" onClick={() => handleNavigate('work')} aria-label="Back to Work" className="group absolute left-1/2 flex -translate-x-1/2 items-center gap-2 font-mono-tech text-[10px] uppercase tracking-[0.13em] transition-opacity hover:opacity-65 sm:text-[11px]">
            <span className="relative grid h-4 w-4 place-items-center"><ChevronLeft className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-x-0.5" strokeWidth={1.5} /><span className="absolute left-[5px] h-px w-2 origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" /></span>
            Back
          </button>
        ) : (
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 font-mono-tech text-[10px] uppercase tracking-[0.13em] md:flex lg:gap-10" aria-label="Main navigation">
            {links.map((link) => {
              const isActive = activeId === link.id;
              return <button key={link.id} type="button" aria-current={isActive ? 'page' : undefined} onClick={() => handleNavigate(link.id)} className="group relative py-1 transition-opacity hover:opacity-65">{link.label}<span className={`absolute -bottom-1 left-0 h-px bg-current transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} /></button>;
            })}
          </nav>
        )}

        <div className="flex items-center gap-5 font-mono-tech text-[10px] uppercase tracking-[0.13em] sm:text-[11px]">
          {!isProjectPage && <span className="hidden md:inline" aria-label="Current language">EN</span>}
          <button ref={menuButtonRef} type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="site-menu" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} className="group flex items-center gap-2 transition-opacity hover:opacity-65">
            <span className="hidden md:inline">Menu</span>
            <span className="relative grid h-4 w-4 place-items-center">
              <motion.span animate={{ y: menuOpen ? 0 : -5, rotate: menuOpen ? 45 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.2 }} className="absolute h-px w-4 bg-current" />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} transition={{ duration: reducedMotion ? 0 : 0.12 }} className="absolute h-px w-4 bg-current" />
              <motion.span animate={{ y: menuOpen ? 0 : 5, rotate: menuOpen ? -45 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.2 }} className="absolute h-px w-4 bg-current" />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div id="site-menu" role="dialog" aria-modal="true" aria-label="Site navigation" initial={reducedMotion ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: reducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-0 z-[60] flex min-h-screen flex-col justify-between bg-[#111111] px-5 pb-8 pt-28 text-[#fcfbf9] sm:px-8 sm:pb-10 sm:pt-32 md:px-12 lg:px-20">
            <nav className="border-t border-white/15" aria-label="Fullscreen navigation">
              {links.map((link, index) => (
                <motion.button key={link.id} ref={index === 0 ? firstMenuLinkRef : undefined} type="button" onClick={() => handleNavigate(link.id)} initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.28, delay: reducedMotion ? 0 : 0.06 + index * 0.05, ease: [0.22, 1, 0.36, 1] }} className="group flex w-full items-center justify-between border-b border-white/15 py-5 text-left text-[clamp(2.8rem,7vw,6.5rem)] font-medium leading-[0.88] tracking-[-0.06em] transition-colors hover:text-white/60 sm:py-7">
                  {link.label}<span className="font-mono-tech text-[10px] tracking-[0.14em] text-white/40 transition-transform duration-300 group-hover:translate-x-1">0{index + 1}</span>
                </motion.button>
              ))}
            </nav>
            <div className="flex items-end justify-between border-t border-white/15 pt-5 font-mono-tech text-[10px] uppercase tracking-[0.14em] text-white/50 sm:text-[11px]">
              <span>Deep Vora / Architecture</span>
              <span>EN</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
