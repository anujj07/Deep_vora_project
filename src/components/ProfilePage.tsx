import React from 'react';
import { ArrowLeft, Mail, MapPin } from 'lucide-react';

interface ProfilePageProps {
  page: 'about' | 'contact';
  onBack: () => void;
  onContact: () => void;
}

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="font-mono-tech text-xs tracking-[0.2em] text-neutral-500">{children}</p>
);

export const ProfilePage: React.FC<ProfilePageProps> = ({ page, onBack, onContact }) => {
  const isAbout = page === 'about';

  return (
    <main data-reveal-section className="min-h-screen bg-[#111111] px-6 pb-16 pt-32 text-[#fcfbf9] md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <button data-reveal onClick={onBack} className="mb-16 inline-flex items-center gap-2 text-xs font-mono-tech tracking-[0.16em] text-neutral-400 transition-colors hover:text-white">
          <ArrowLeft className="h-4 w-4" /> RETURN TO INDEX
        </button>

        {isAbout ? (
          <div data-reveal className="space-y-24 sm:space-y-32">
            <section className="border-t border-neutral-800 pt-8">
              <Label>ABOUT / DEEP VORA</Label>
              <h1 className="mt-8 max-w-5xl text-5xl font-bold leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl">DEEP VORA</h1>
              <p className="mt-8 max-w-3xl text-lg font-medium leading-tight text-neutral-200 sm:text-2xl">ARCHITECTURE <span className="text-neutral-600">×</span> URBAN DESIGN <span className="text-neutral-600">×</span> CONSTRUCTION</p>
              <p className="mt-12 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">Working across architecture, urban design and construction delivery — connecting design intent with technical coordination and the realities of the site.</p>
            </section>

            <section className="grid gap-10 border-t border-neutral-800 pt-8 lg:grid-cols-12 lg:gap-20">
              <div className="lg:col-span-3"><Label>01 / PROFILE</Label></div>
              <div className="lg:col-span-9">
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">DESIGNING. COORDINATING. DELIVERING.</h2>
                <p className="mt-8 max-w-2xl text-base leading-relaxed text-neutral-400">Deep Vora is a project coordinator with 7 years of experience across design and construction. His experience spans architectural documentation, urban design, green building research and large-scale transit infrastructure delivery.</p>
                <div className="mt-14 grid gap-x-8 gap-y-10 border-t border-neutral-800 pt-8 sm:grid-cols-2 lg:grid-cols-4">
                  {[['07+', 'YEARS / DESIGN + CONSTRUCTION'], ['$2.8B', 'TRANSIT INFRASTRUCTURE'], ['10+', 'CONSULTANT + CONTRACTOR DISCIPLINES'], ['06', 'TRANSIT STATIONS']].map(([value, label]) => <div key={label}><p className="text-4xl font-bold tracking-tight sm:text-5xl">{value}</p><p className="mt-2 text-[10px] font-mono-tech tracking-[0.14em] text-neutral-500">{label}</p></div>)}
                </div>
              </div>
            </section>

            <section className="grid gap-10 border-t border-neutral-800 pt-8 lg:grid-cols-12 lg:gap-20">
              <div className="lg:col-span-3"><Label>02 / PROFESSIONAL JOURNEY</Label></div>
              <div className="lg:col-span-9">
                <div className="divide-y divide-neutral-800 border-y border-neutral-800">
                  {[['2022', 'UNIVERSITY OF BRITISH COLUMBIA', 'Graduate Teaching + Green Building Research Assistant'], ['2022–2023', 'ATELIER PACIFIC ARCHITECTURE', 'Architectural Technologist'], ['2023–PRESENT', 'BROADWAY SUBWAY PROJECT', 'Design Project Coordinator']].map(([year, title, role]) => <div key={year} className="grid gap-3 py-7 sm:grid-cols-4"><p className="font-mono-tech text-xs text-neutral-500">{year}</p><div className="sm:col-span-3"><h3 className="text-xl font-semibold">{title}</h3><p className="mt-1 text-sm text-neutral-400">{role}</p></div></div>)}
                </div>
                <p className="mt-10 font-mono-tech text-xs leading-loose tracking-[0.16em] text-neutral-500">RESEARCH<br />↓<br />ARCHITECTURAL PRACTICE<br />↓<br />CONSTRUCTION<br />↓<br />LARGE-SCALE INFRASTRUCTURE</p>
              </div>
            </section>

            <section className="grid gap-10 border-t border-neutral-800 pt-8 lg:grid-cols-12 lg:gap-20">
              <div className="lg:col-span-3"><Label>03 / CURRENT PRACTICE</Label></div>
              <div className="lg:col-span-9"><h2 className="text-3xl font-bold tracking-tight sm:text-5xl">PROJECT COORDINATION</h2><p className="mt-5 text-neutral-400">Currently supporting delivery of a $2.8B subway extension.</p><div className="mt-10 grid border-t border-neutral-800 text-sm sm:grid-cols-2">{['Project Planning', 'Scheduling + Budget Control', 'RFIs + Design Changes', 'Shop Drawing Review', 'Contract + Specification Review', 'Subcontractor + Consultant Coordination', 'Procurement', 'Cost Tracking', 'Construction Coordination'].map((item, index) => <p key={item} className="border-b border-neutral-800 py-4 text-neutral-300"><span className="mr-4 font-mono-tech text-xs text-neutral-600">0{index + 1}</span>{item}</p>)}</div></div>
            </section>

            <section className="grid gap-10 border-t border-neutral-800 pt-8 lg:grid-cols-12 lg:gap-20">
              <div className="lg:col-span-3"><Label>04 / DESIGN BACKGROUND</Label></div>
              <div className="lg:col-span-9"><h2 className="text-3xl font-bold tracking-tight sm:text-5xl">ARCHITECTURAL TECHNOLOGY</h2><p className="mt-6 max-w-2xl text-neutral-400">Architectural practice experience across multi-family, townhouse and affordable housing projects.</p><p className="mt-10 max-w-3xl border-l border-neutral-700 pl-5 text-lg leading-relaxed text-neutral-300">Design Documentation · Drawings + Specifications · Tender Packages · Building Code Review · Permit Coordination · Site Inspections · Deficiency Reviews · Consultant + Contractor Coordination</p></div>
            </section>

            <section className="grid gap-10 border-t border-neutral-800 pt-8 lg:grid-cols-12 lg:gap-20">
              <div className="lg:col-span-3"><Label>05 / URBAN + GREEN BUILDING</Label></div>
              <div className="grid gap-8 text-neutral-300 sm:grid-cols-3 lg:col-span-9"><div><p className="text-lg font-semibold">Master of Urban Design</p><p className="mt-2 text-sm text-neutral-500">University of British Columbia · 2022</p></div><div><p className="text-lg font-semibold">LEED Green Associate</p><p className="mt-2 text-sm text-neutral-500">USGBC</p></div><div><p className="text-lg font-semibold">Green Building Research</p><p className="mt-2 text-sm text-neutral-500">UBC Green Building Action Plan</p></div></div>
            </section>

            <section className="grid gap-10 border-t border-neutral-800 pt-8 lg:grid-cols-12 lg:gap-20">
              <div className="lg:col-span-3"><Label>06 / TOOLKIT</Label></div>
              <div className="lg:col-span-9"><h2 className="text-3xl font-bold tracking-tight sm:text-5xl">TOOLS + METHODS</h2><p className="mt-8 text-lg leading-relaxed text-neutral-300">Project Controls · Design Review · Construction Coordination · Procurement + Tendering · Technical Reporting</p><p className="mt-5 font-mono-tech text-xs tracking-[0.14em] text-neutral-500">PROCORE · ACONEX · AUTOCAD · REVIT · MS OFFICE</p></div>
            </section>

            <section className="grid gap-10 border-t border-neutral-800 pt-8 lg:grid-cols-12 lg:gap-20">
              <div className="lg:col-span-3"><Label>07 / EDUCATION + CREDENTIALS</Label></div>
              <div className="grid gap-12 lg:col-span-9 sm:grid-cols-2"><div><h2 className="text-xl font-semibold">EDUCATION</h2><div className="mt-6 space-y-5 text-sm leading-relaxed text-neutral-400"><p><strong className="text-neutral-200">Master of Urban Design</strong><br />University of British Columbia · 2022</p><p><strong className="text-neutral-200">Bachelor of Architecture</strong><br />Kamla Raheja Vidyanidhi Institute for Architecture · 2018</p></div></div><div><h2 className="text-xl font-semibold">CERTIFICATIONS</h2><p className="mt-6 text-sm leading-loose text-neutral-400">Building Construction — BCIT<br />BC Building Code Part 3 — BCIT<br />LEED Green Associate — USGBC<br />GIS: Geospatial Data — Seneca Polytechnic</p></div></div>
            </section>

            <section className="border-y border-neutral-800 py-16 sm:py-24"><Label>DESIGN INTENT</Label><p className="mt-8 max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">From drawing to delivery, the work sits between design ambition, technical coordination and the realities of construction.</p><button onClick={onContact} className="mt-12 border border-neutral-600 px-5 py-3 text-xs font-mono-tech tracking-[0.16em] transition-colors hover:border-white hover:bg-white hover:text-black">CONTACT / CONNECT</button></section>
          </div>
        ) : (
          <>
          <section className="hidden grid gap-12 border-t border-neutral-800 pt-8 lg:grid-cols-12 lg:gap-20">
            <p className="font-mono-tech text-xs tracking-[0.2em] text-neutral-400 lg:col-span-3">CONTACT / 02</p>
            <div className="lg:col-span-8"><h1 className="text-5xl font-bold leading-[0.98] tracking-tight sm:text-7xl">Personal details</h1><div className="mt-12 grid max-w-3xl gap-px overflow-hidden rounded-xl border border-neutral-800 bg-neutral-800 sm:grid-cols-2"><div className="bg-[#111111] p-7"><p className="mb-4 font-mono-tech text-xs tracking-[0.16em] text-neutral-500">NAME</p><p className="text-xl font-semibold">Deep Vora</p></div><div className="bg-[#111111] p-7"><p className="mb-4 font-mono-tech text-xs tracking-[0.16em] text-neutral-500">LOCATION</p><p className="flex items-center gap-2 text-xl font-semibold"><MapPin className="h-4 w-4" /> Vancouver, BC</p></div><a href="mailto:architectdeepvora@gmail.com" className="bg-[#111111] p-7 transition-colors hover:bg-neutral-900 sm:col-span-2"><p className="mb-4 font-mono-tech text-xs tracking-[0.16em] text-neutral-500">EMAIL</p><p className="flex items-center gap-3 text-lg font-semibold underline underline-offset-4 sm:text-xl"><Mail className="h-5 w-5" /> architectdeepvora@gmail.com</p></a></div><p className="mt-8 max-w-xl text-sm leading-relaxed text-neutral-400">Open to relocation within the GTA. Accepting select architectural and acoustic commissions for 2025–2026.</p></div>
          </section>
          <div data-reveal className="space-y-24 sm:space-y-32">
            <section className="border-t border-neutral-800 pt-8">
              <Label>CONTACT / DEEP VORA</Label>
              <h1 className="mt-8 max-w-5xl text-5xl font-bold leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl">LET&apos;S WORK<br />TOGETHER.</h1>
              <p className="mt-8 text-xl font-medium text-neutral-200 sm:text-3xl">Design, coordinate, build.</p>
              <p className="mt-12 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">Open to conversations around architecture, urban design, construction coordination and project delivery.</p>
            </section>

            <section className="grid gap-10 border-t border-neutral-800 pt-8 lg:grid-cols-12 lg:gap-20">
              <div className="lg:col-span-3"><Label>CONTACT</Label></div>
              <div className="lg:col-span-9">
                <div className="border-y border-neutral-800">
                  <div className="grid gap-4 py-7 sm:grid-cols-4"><Label>EMAIL</Label><a href="mailto:architectdeepvora@gmail.com" className="text-2xl font-semibold tracking-tight underline decoration-neutral-600 underline-offset-8 transition-colors hover:text-neutral-400 sm:col-span-3 sm:text-4xl">architectdeepvora@gmail.com</a></div>
                  <div className="grid gap-4 border-t border-neutral-800 py-7 sm:grid-cols-4"><Label>LOCATION</Label><p className="text-lg leading-relaxed text-neutral-300 sm:col-span-3">Vancouver, BC<br /><span className="text-neutral-500">Open to Relocation</span></p></div>
                  <div className="grid gap-4 border-t border-neutral-800 py-7 sm:grid-cols-4"><Label>LINKEDIN</Label><a href="https://linkedin.com/in/deep-vora" target="_blank" rel="noreferrer" className="text-lg text-neutral-300 underline decoration-neutral-700 underline-offset-4 transition-colors hover:text-white sm:col-span-3">linkedin.com/in/deep-vora</a></div>
                </div>
              </div>
            </section>

            <section className="grid gap-10 border-t border-neutral-800 pt-8 lg:grid-cols-12 lg:gap-20">
              <div className="lg:col-span-3"><Label>COLLABORATION</Label></div>
              <div className="lg:col-span-9"><h2 className="text-3xl font-bold tracking-tight sm:text-5xl">WHAT CAN WE TALK ABOUT?</h2><p className="mt-10 max-w-3xl border-l border-neutral-700 pl-5 text-lg leading-loose text-neutral-300">Architecture<br />Urban Design<br />Construction &amp; Project Coordination<br />Infrastructure<br />Design + Technical Coordination</p></div>
            </section>

            <section className="border-y border-neutral-800 py-16 sm:py-24"><Label>FINAL NOTE</Label><p className="mt-8 max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">From design intent to delivery — let&apos;s build something meaningful.</p><div className="mt-12"><Label>GET IN TOUCH →</Label><a href="mailto:architectdeepvora@gmail.com" className="mt-4 inline-block text-xl font-semibold underline decoration-neutral-600 underline-offset-8 transition-colors hover:text-neutral-400 sm:text-2xl">architectdeepvora@gmail.com</a></div></section>
          </div>
          </>
        )}
      </div>
    </main>
  );
};
