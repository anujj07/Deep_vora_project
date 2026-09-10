import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => (
  <footer className="relative w-full border-t border-neutral-800 bg-[#111111] px-6 py-16 text-[#fcfbf9] md:px-12 lg:px-20">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-xs font-mono-tech text-neutral-500 sm:flex-row">
      <div>© 2024 ATELIER ARCHITECT. CARTOGRAPHIC & SPATIAL MONOGRAPHS.</div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex cursor-pointer items-center space-x-2 text-neutral-300 transition-colors hover:text-white"
      >
        <span>RETURN TO TOP</span>
        <ArrowUp className="h-3.5 w-3.5" />
      </button>
    </div>
  </footer>
);
