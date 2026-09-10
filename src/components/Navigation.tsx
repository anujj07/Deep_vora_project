import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PROJECTS_REGISTRY, type ProjectLocation } from '../data/mapConfig';

interface NavigationProps {
  onOpenProjects: () => void;
  onSelectProject: (p: ProjectLocation) => void;
  onNavigate: (id: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onSelectProject, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
  };
  const links = [
    { label: 'Index', id: 'index' }, { label: 'Work', id: 'work' }, { label: 'Services', id: 'services' },
    { label: 'About', id: 'about' }, { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-5 flex items-center justify-between pointer-events-none">
        {/* Studio Identity */}
        <div className="pointer-events-auto flex items-center space-x-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-black/[0.08] shadow-xs">
          <div className="w-2.5 h-2.5 bg-[#111111] rounded-sm rotate-45" />
          <a href="#" className="text-xs font-bold tracking-widest uppercase text-[#111111] font-mono-tech">
            DEEP VORA
          </a>
          <span className="text-[10px] text-[#888880] font-mono-tech hidden sm:inline">| VANCOUVER, BC</span>
        </div>

        {/* Centered desktop navigation */}
        <nav aria-label="Main navigation" className="pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 items-center gap-4 rounded-full border border-black/[0.08] bg-white/80 px-4 py-2 text-[11px] font-mono-tech font-semibold uppercase backdrop-blur-md lg:flex">
          {links.map((link) => <button key={link.id} onClick={() => navigate(link.id)} className="cursor-pointer text-[#555550] transition-colors hover:text-black">{link.label}</button>)}
        </nav>

        {/* Menu control */}
        <div className="pointer-events-auto flex items-center">
          {/* Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 shadow-md cursor-pointer"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile / Modal Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#fcfbf9]/95 backdrop-blur-xl flex flex-col justify-between p-8 md:p-16 animate-fadeIn">
          <div className="pt-20">
            <div className="text-xs font-mono-tech text-[#888880] tracking-widest uppercase mb-6">
              PROJECT ATLAS & PROFESSIONAL PORTFOLIO
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 border-b border-black/[0.08] pb-8">
                {links.map((link) => <button key={link.id} type="button" onClick={() => navigate(link.id)} className="text-left text-xl font-bold tracking-tight text-[#111111] hover:translate-x-1 transition-transform">{link.label}</button>)}
              </div>
              <p className="pt-2 text-[10px] font-mono-tech tracking-[0.2em] text-[#888880]">PROJECT INDEX</p>
              {PROJECTS_REGISTRY.map((proj, idx) => (
                <button
                  type="button"
                  key={proj.id}
                  onClick={() => {
                    onSelectProject(proj);
                    setMenuOpen(false);
                  }}
                  className="group flex w-full items-baseline justify-between border-b border-black/[0.08] pb-4 text-left cursor-pointer hover:border-black transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                >
                  <div className="flex items-baseline space-x-4">
                    <span className="text-xs font-mono-tech text-[#888880]">0{idx + 1}</span>
                    <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#111111] group-hover:translate-x-2 transition-transform">
                      {proj.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono-tech text-[#666660] group-hover:text-black">
                    {proj.area} →
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-t border-black/[0.08] pt-6 text-xs font-mono-tech text-[#777770]">
            <div>
              MUMBAI MONOGRAPHS // 19°08'N 72°49'E
            </div>
            <div className="mt-4 sm:mt-0">
              © 2024 ATELIER ARCHITECT. ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
