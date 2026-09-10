import React from 'react';
import { ArrowDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section id="index" className="relative w-full min-h-[90vh] flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 lg:px-20 bg-[#fcfbf9] text-[#121212] overflow-hidden architect-grid">
      {/* Top Meta info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-black/[0.06] pb-6 gap-4">
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 rounded-full bg-[#111111]" />
          <span className="text-xs font-mono-tech tracking-[0.2em] uppercase text-[#666660]">
            DEEP VORA · PROJECT COORDINATION PORTFOLIO
          </span>
        </div>
        <div className="flex items-center space-x-6 text-xs font-mono-tech text-[#888880]">
          <span>LAT 19°08'22.4&quot;N</span>
          <span>LONG 72°49'51.2&quot;E</span>
          <span className="hidden sm:inline">DATUM WGS-84</span>
        </div>
      </div>

      {/* Main Title Hero */}
      <div className="my-auto py-16 max-w-6xl">
        <div className="inline-block px-3 py-1 rounded-full border border-black/10 bg-white/70 text-[11px] font-mono-tech uppercase tracking-widest text-[#555550] mb-6 shadow-xs">
          INFRASTRUCTURE · URBAN DESIGN · DELIVERY
        </div>

        <h1 className="sr-only">
          CITY <span className="text-neutral-400 font-light">→</span> REGION <span className="text-neutral-400 font-light">→</span> NEIGHBOURHOOD <span className="text-neutral-400 font-light">→</span> ARCHITECTURE
        </h1>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#111111] leading-[1.05]">
          DEEP VORA
        </h1>

        <h2 className="mt-3 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.03em] text-[#333330] leading-[1.08]">
          DESIGN <span aria-hidden="true">×</span> CONSTRUCTION <span aria-hidden="true">×</span> URBAN SYSTEMS
        </h2>

        <p className="mt-8 text-sm sm:text-base md:text-lg font-mono-tech uppercase tracking-[0.08em] text-[#555550]">
          Project Coordinator · Architectural Technologist · Urban Design
        </p>

        <p className="mt-5 text-base sm:text-lg md:text-xl font-light text-[#555550] max-w-3xl leading-relaxed">
          Working across architecture, urban design, infrastructure, and construction delivery — connecting design intent with technical coordination and the realities of the site.
        </p>
      </div>

      {/* Bottom Scroll prompt */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-t border-black/[0.06] pt-8 gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full border border-black/15 bg-white/60 flex items-center justify-center animate-bounce">
            <ArrowDown className="w-4 h-4 text-[#111111]" />
          </div>
          <div>
            <div className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#111111]">
              EXPLORE SELECTED PROJECTS
            </div>
            <div className="text-[11px] font-mono-tech text-[#888880]">
              SIX PROJECTS ACROSS CANADA & INDIA
            </div>
          </div>
        </div>

        <div className="text-left sm:text-right text-xs font-mono-tech text-[#777770]">
          CURRENT ROLE: <span className="text-[#111111] font-semibold">DESIGN PROJECT COORDINATOR</span> · VANCOUVER, BC
        </div>
      </div>
    </section>
  );
};
