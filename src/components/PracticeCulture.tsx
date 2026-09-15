import React from 'react';

export const PracticeCulture: React.FC = () => (
  <section data-reveal-section className="bg-black px-5 pb-16 text-white sm:px-8 sm:pb-20 md:px-12 lg:px-20 lg:pb-24" aria-labelledby="practice-heading">
    <div className="mx-auto max-w-[105rem] border-t border-white/20 pt-12 sm:pt-16">
      <div data-reveal className="grid gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <p className="max-w-2xl text-sm leading-relaxed text-white/80">Thoughtful products and spaces begin with the people who use them. From material studies to technical coordination, the practice connects design intent with craft, performance, and the realities of making.</p>
          <a href="/services" className="group mt-7 block overflow-hidden bg-white/10">
            <img src="/projects/tedx-gateway/TEDX_GATEWAY_02_DESIGN_FABRICATION.png" alt="TEDx Gateway fabrication study" loading="lazy" className="aspect-[16/9] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
          </a>
        </div>
        <div className="self-start lg:col-span-3 lg:pt-16">
          <p className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-white/55">Practice note</p>
          <h2 id="practice-heading" className="mt-2 text-2xl font-medium leading-tight tracking-[-0.035em]">Designing for the life of a project</h2>
          <a href="/services" className="mt-5 inline-block text-sm text-white/65 underline underline-offset-4 transition-colors hover:text-white">Explore services ↗</a>
        </div>
      </div>
      <div data-reveal className="mt-16 grid gap-8 border-t border-white/20 pt-10 lg:grid-cols-12 lg:gap-14">
        <div className="overflow-hidden bg-white/10 lg:col-span-3"><img src="/projects/urban-traction/URBAN_TRACTION_03_EXISTING_PROPOSED.png" alt="Urban design study" loading="lazy" className="aspect-[4/3] h-full w-full object-cover" /></div>
        <div className="lg:col-span-8 lg:pt-3">
          <p className="font-narrative max-w-3xl text-2xl leading-[1.28] tracking-[-0.035em] sm:text-3xl">“The most meaningful work is made in collaboration—when ambitious ideas are carried carefully from the first sketch to the lived experience of a place.”</p>
          <p className="mt-7 font-mono-tech text-[10px] uppercase tracking-[0.14em] text-white/55">Deep Vora / Architecture + Urban Systems</p>
          <a href="/contact" className="mt-7 inline-block border border-white/65 px-5 py-2.5 font-mono-tech text-[10px] uppercase tracking-[0.14em] transition-colors hover:bg-white hover:text-black">Start a conversation</a>
        </div>
      </div>
    </div>
  </section>
);
