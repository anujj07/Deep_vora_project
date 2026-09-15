import React from 'react';
import { Building2, Compass, Layers3 } from 'lucide-react';
import { LEGACY_PROJECTS_REGISTRY, PROJECTS_REGISTRY } from '../data/mapConfig';

const services = [
  { icon: Compass, number: '01', title: 'Urban strategy', text: 'Connected plans for neighbourhoods, public realm, mobility, and resilient growth.' },
  { icon: Building2, number: '02', title: 'Architecture', text: 'Thoughtful civic, workplace, cultural, and mixed-use spaces from concept to delivery.' },
  { icon: Layers3, number: '03', title: 'Project coordination', text: 'Clear coordination across teams, drawing packages, consultants, and construction milestones.' },
];

const findProject = (projects: typeof PROJECTS_REGISTRY, id: string) => projects.find((project) => project.id === id)!;
const homeProjects = [
  findProject(LEGACY_PROJECTS_REGISTRY, 'jamming-studio'),
  findProject(PROJECTS_REGISTRY, 'urban-traction'),
  findProject(LEGACY_PROJECTS_REGISTRY, 'housing-one'),
  findProject(PROJECTS_REGISTRY, 'tedx-gateway'),
];

export const ServicesSection: React.FC = () => (
  <section id="services" data-reveal-section className="bg-white px-6 py-24 md:px-12 lg:px-20">
    <div className="mx-auto max-w-6xl">
      <div data-reveal className="mb-16 flex flex-col justify-between gap-8 border-b border-black/10 pb-8 md:flex-row md:items-end">
        <div>
          <p className="mb-4 text-xs font-mono-tech tracking-[0.2em] text-[#666660]">SERVICES / SELECTED STUDIES</p>
          <h2 className="max-w-3xl text-4xl font-bold leading-[1.03] tracking-tight text-[#111111] sm:text-6xl">Spaces that connect people, systems, and place.</h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-[#555550]">A multidisciplinary practice spanning strategy, design, and coordinated project delivery.</p>
      </div>

      <div data-reveal className="grid gap-px overflow-hidden rounded-xl border border-black/10 bg-black/10 md:grid-cols-3">
        {services.map(({ icon: Icon, number, title, text }) => (
          <article key={title} className="bg-[#e9e7e1] p-7 transition-colors hover:bg-white md:p-8">
            <div className="mb-12 flex items-start justify-between"><Icon className="h-5 w-5" /><span className="font-mono-tech text-xs text-[#777770]">{number}</span></div>
            <h3 className="mb-3 text-2xl font-bold tracking-tight">{title}</h3>
            <p className="text-sm leading-relaxed text-[#666660]">{text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export const HomeProjectListing: React.FC = () => (
  <section data-reveal-section className="bg-white px-6 py-14 md:px-12 md:py-20 lg:px-20 lg:py-24" aria-label="Selected projects">
    <div data-home-project-listing className="bg-[#090909] px-4 py-12 text-[#f5f4f0] md:px-6 md:py-16 lg:px-8 lg:py-20">
      <div className="mb-10 flex items-baseline justify-between px-1 md:mb-12">
        <p className="font-mono-tech text-[10px] uppercase tracking-[0.17em] text-white/55 sm:text-[11px]">Selected projects</p>
        <a href="/work" className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-white/55 transition-colors hover:text-white sm:text-[11px]">View all work ↗</a>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4">
        {homeProjects.map((project, index) => (
          <article key={project.id} className={`group min-w-0 border-t border-white/20 px-1 pb-10 pt-4 md:px-4 md:pb-12 lg:border-t-0 lg:pt-0 ${index > 0 ? 'lg:border-l lg:border-white/20 lg:pl-5' : ''} ${index % 2 === 1 ? 'md:border-l md:border-white/20' : ''}`}>
            <a href={`/work/${project.id}`} className="block">
              <div className="aspect-[16/10] overflow-hidden bg-[#222222]">
                <img src={project.heroImage} alt={project.title} loading="lazy" className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035]" />
              </div>
              <div className="pt-5">
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.13em] text-white/55 sm:text-[11px]">{project.category}</p>
                <h3 className="mt-3 font-project-title text-2xl leading-[1.15] text-white sm:text-3xl">{project.title}</h3>
                <p className="mt-3 font-project-meta text-xs leading-snug text-white/65 sm:text-[13px]">{project.area}, {project.city}</p>
                <p className="mt-4 font-mono-tech text-[10px] uppercase tracking-[0.13em] text-white/45 sm:text-[11px]">{project.year} · {project.area}, {project.city}</p>
              </div>
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
);
