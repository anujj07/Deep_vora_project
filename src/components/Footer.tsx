import React from 'react';
import { ArrowUp } from 'lucide-react';

const navigationLinks = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const Footer: React.FC = () => (
  <footer data-reveal-section className="relative w-full bg-[#111111] px-5 pb-6 pt-10 text-[#fcfbf9] sm:px-8 sm:pt-14 md:px-12 lg:px-20 lg:pt-16">
    <div className="mx-auto max-w-7xl">
      <div data-reveal className="border-b border-white/15 pb-8 sm:pb-10">
        <p className="font-mono-tech text-[10px] uppercase tracking-[0.17em] text-white/50 sm:text-[11px]">Independent architectural practice</p>
        <div className="mt-6 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.8] tracking-[-0.075em]">DEEP<br />VORA</h2>
          <a href="mailto:architectdeepvora@gmail.com" className="group max-w-sm text-xl font-medium leading-tight tracking-[-0.025em] text-white sm:text-3xl">
            Let&apos;s make space for ambitious ideas.
            <span className="mt-4 block font-mono-tech text-[10px] uppercase tracking-[0.15em] text-white/55 transition-colors duration-300 group-hover:text-white sm:text-[11px]">architectdeepvora@gmail.com ↗</span>
          </a>
        </div>
      </div>

      <div data-reveal className="grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-10">
        <div className="lg:col-span-5">
          <p className="max-w-xs text-sm leading-relaxed text-white/60">Architecture, urban systems, and technical coordination shaped through a clear, collaborative process.</p>
        </div>
        <nav className="grid grid-cols-2 gap-x-8 gap-y-4 lg:col-span-3" aria-label="Footer navigation">
          {navigationLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-lg font-medium tracking-[-0.02em] text-white/85 transition-colors hover:text-white">{link.label}</a>
          ))}
        </nav>
        <div className="lg:col-span-4 lg:text-right">
          <a href="https://linkedin.com/in/deep-vora" target="_blank" rel="noreferrer" className="block font-mono-tech text-[10px] uppercase tracking-[0.15em] text-white/55 transition-colors hover:text-white sm:text-[11px]">LinkedIn ↗</a>
          <a href="mailto:architectdeepvora@gmail.com" className="mt-4 block font-mono-tech text-[10px] uppercase tracking-[0.15em] text-white/55 transition-colors hover:text-white sm:text-[11px]">Email / Contact ↗</a>
        </div>
      </div>

      <div data-reveal className="flex flex-col gap-5 border-t border-white/15 pt-5 font-mono-tech text-[10px] uppercase tracking-[0.13em] text-white/45 sm:flex-row sm:items-center sm:justify-between sm:text-[11px]">
        <span>© 2026 Deep Vora. All rights reserved.</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group flex w-fit items-center gap-2 text-white/65 transition-colors hover:text-white">
          Return to top <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  </footer>
);
