import React from 'react';
import { ServicesSection } from './ServicesSection';
import { SheetFrame } from './ArchitecturePage';
import { LEGACY_PROJECTS_REGISTRY, PROJECTS_REGISTRY, type ProjectLocation } from '../data/mapConfig';

const findProject = (projects: ProjectLocation[], id: string) => projects.find((project) => project.id === id)!;

const featuredProjects = [
  findProject(LEGACY_PROJECTS_REGISTRY, 'jamming-studio'),
  findProject(PROJECTS_REGISTRY, 'urban-traction'),
  findProject(LEGACY_PROJECTS_REGISTRY, 'housing-one'),
  findProject(PROJECTS_REGISTRY, 'tedx-gateway'),
];

const ProjectInfo: React.FC<{ project: ProjectLocation; number: string }> = ({ project, number }) => (
  <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono-tech text-[10px] uppercase tracking-[0.13em] text-[#696963] sm:text-[11px]">
    <span className="text-[#111111]">{number}</span>
    <span>{project.category}</span>
    <span>{project.area}, {project.city}</span>
    <span>{project.year}</span>
  </div>
);

export const ServicesPage: React.FC = () => {
  const [jammingStudio, urbanTraction, housingOne, tedxGateway] = featuredProjects;

  return (
    <main className="min-h-screen bg-white pb-24 pt-20 text-[#111111] lg:pb-32">
      <SheetFrame src="/works-map.html" title="Selected Works 2023/24" />
      <ServicesSection />

      <section data-reveal-section className="px-5 pb-24 sm:px-8 md:px-12 lg:px-20" aria-label="Selected project studies">
        <div className="mx-auto max-w-7xl border-t border-black/[0.09] pt-8">
          <div data-reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono-tech text-[10px] uppercase tracking-[0.17em] text-[#696963] sm:text-[11px]">Selected studies</p>
              <h1 className="mt-3 text-4xl font-semibold leading-[0.92] tracking-[-0.05em] sm:text-6xl">Work across scales.</h1>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#5a5a55]">A focused selection of spatial, urban, and delivery work.</p>
          </div>

          <div className="mt-16">
            <article data-reveal className="group">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e7e3] sm:aspect-[16/9]">
                <img src={jammingStudio.heroImage} alt={jammingStudio.title} className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]" />
                <a href={`/work/${jammingStudio.id}`} className="absolute inset-0" aria-label={`View ${jammingStudio.title}`} />
              </div>
              <div className="grid gap-5 pt-5 lg:grid-cols-12 lg:items-end lg:gap-10">
                <div className="lg:col-span-8"><ProjectInfo project={jammingStudio} number="01" /><h2 className="mt-3 text-4xl font-semibold leading-[0.9] tracking-[-0.05em] sm:text-6xl">JAMMING STUDIO</h2></div>
              </div>
            </article>

            <div className="mt-24 grid gap-x-10 gap-y-16 border-t border-black/[0.09] pt-5 md:grid-cols-2">
              {[urbanTraction, housingOne].map((project, index) => (
                <article key={project.id} data-reveal className={`group ${index === 1 ? 'md:pt-16' : ''}`}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e7e3]"><img src={project.heroImage} alt={project.title} loading="lazy" className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035]" /><a href={`/work/${project.id}`} className="absolute inset-0" aria-label={`View ${project.title}`} /></div>
                  <div className="mt-4"><ProjectInfo project={project} number={`0${index + 2}`} /><h2 className="mt-3 text-2xl font-semibold leading-[0.95] tracking-[-0.035em] sm:text-4xl">{project.title}</h2></div>
                </article>
              ))}
            </div>

            <article data-reveal className="group mt-24 grid gap-6 border-t border-black/[0.09] pt-5 md:grid-cols-12 md:items-end md:gap-10">
              <div className="md:col-span-5"><ProjectInfo project={tedxGateway} number="04" /><h2 className="mt-3 text-3xl font-semibold leading-[0.92] tracking-[-0.04em] sm:text-5xl">TEDx GATEWAY<br />STAGE DESIGN</h2></div>
              <div className="relative aspect-[16/10] overflow-hidden bg-[#e8e7e3] md:col-span-7"><img src={tedxGateway.heroImage} alt={tedxGateway.title} loading="lazy" className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]" /><a href={`/work/${tedxGateway.id}`} className="absolute inset-0" aria-label={`View ${tedxGateway.title}`} /></div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};
