import React from 'react';
import { Building2, Compass, Layers3 } from 'lucide-react';
import { LEGACY_PROJECTS_REGISTRY, PROJECTS_REGISTRY, type ProjectLocation } from '../data/mapConfig';

const services = [
  { icon: Compass, number: '01', title: 'Urban strategy', text: 'Connected plans for neighbourhoods, public realm, mobility, and resilient growth.' },
  { icon: Building2, number: '02', title: 'Architecture', text: 'Thoughtful civic, workplace, cultural, and mixed-use spaces from concept to delivery.' },
  { icon: Layers3, number: '03', title: 'Project coordination', text: 'Clear coordination across teams, drawing packages, consultants, and construction milestones.' },
];

const jammingStudio = LEGACY_PROJECTS_REGISTRY.find((project) => project.id === 'jamming-studio')!;
const urbanTraction = PROJECTS_REGISTRY.find((project) => project.id === 'urban-traction')!;
const housingOne = LEGACY_PROJECTS_REGISTRY.find((project) => project.id === 'housing-one')!;
const tedxGateway = PROJECTS_REGISTRY.find((project) => project.id === 'tedx-gateway')!;
const supportingProjects = PROJECTS_REGISTRY.filter(
  (project) => project.id !== 'urban-traction' && project.id !== 'tedx-gateway',
);

interface ProjectMetaProps {
  number: string;
  project: ProjectLocation;
  category: string;
}

const ProjectMeta: React.FC<ProjectMetaProps> = ({ number, project, category }) => (
  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono-tech text-[10px] tracking-[0.14em] text-[#666660] uppercase">
    <span className="text-[#111111]">{number}</span>
    <span>{category}</span>
    <span>{project.area}, {project.city}</span>
    <span>{project.year}</span>
  </div>
);

export const ServicesSection: React.FC = () => (
  <section id="services" className="bg-[#e9e7e1] px-6 py-24 md:px-12 lg:px-20">
    <div className="mx-auto max-w-6xl">
      <div className="mb-16 flex flex-col justify-between gap-8 border-b border-black/10 pb-8 md:flex-row md:items-end">
        <div>
          <p className="mb-4 text-xs font-mono-tech tracking-[0.2em] text-[#666660]">SERVICES / SELECTED STUDIES</p>
          <h2 className="max-w-3xl text-4xl font-bold leading-[1.03] tracking-tight text-[#111111] sm:text-6xl">Spaces that connect people, systems, and place.</h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-[#555550]">A multidisciplinary practice spanning strategy, design, and coordinated project delivery.</p>
      </div>

      <div className="grid gap-px overflow-hidden rounded-xl border border-black/10 bg-black/10 md:grid-cols-3">
        {services.map(({ icon: Icon, number, title, text }) => (
          <article key={title} className="bg-[#e9e7e1] p-7 transition-colors hover:bg-white md:p-8">
            <div className="mb-12 flex items-start justify-between"><Icon className="h-5 w-5" /><span className="font-mono-tech text-xs text-[#777770]">{number}</span></div>
            <h3 className="mb-3 text-2xl font-bold tracking-tight">{title}</h3>
            <p className="text-sm leading-relaxed text-[#666660]">{text}</p>
          </article>
        ))}
      </div>

      <div className="mt-28 border-t border-black/10 pt-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-mono-tech tracking-[0.2em] text-[#666660]">SELECTED WORK</p>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-[#111111] sm:text-5xl">Project index</h3>
          </div>
          <span className="hidden text-xs font-mono-tech text-[#666660] sm:block">{(supportingProjects.length + 4).toString().padStart(2, '0')} SELECTED WORKS</span>
        </div>

        <div className="mt-16 space-y-20">
          <article className="group grid gap-8 border-t border-black/10 pt-5 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-8">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#d8d6d0]">
                <img src={jammingStudio.heroImage} alt={jammingStudio.title} className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
              </div>
            </div>
            <div className="pb-1 lg:col-span-4">
              <ProjectMeta number="01" project={jammingStudio} category="Architecture / Interior / Acoustic Design" />
              <h4 className="mt-5 text-4xl font-bold leading-[0.94] tracking-tight text-[#111111] sm:text-5xl">JAMMING<br />STUDIO</h4>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#555550]">{jammingStudio.description}</p>
            </div>
          </article>

          <article className="group grid gap-8 border-t border-black/10 pt-5 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="order-2 pb-1 lg:order-1 lg:col-span-5">
              <ProjectMeta number="02" project={urbanTraction} category="Urban Design / Masterplanning" />
              <h4 className="mt-5 text-3xl font-bold leading-[0.96] tracking-tight text-[#111111] sm:text-5xl">URBAN<br />TRACTION</h4>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#555550]">{urbanTraction.description}</p>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-7">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#d8d6d0]">
                <img src={urbanTraction.heroImage} alt={urbanTraction.title} className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
              </div>
            </div>
            <div className="order-3 grid gap-8 border-t border-black/10 pt-8 md:grid-cols-2 lg:col-span-12">
              {urbanTraction.galleryImages?.slice(1).map((image) => (
                <figure key={image.id}>
                  <div className="overflow-hidden bg-[#d8d6d0]">
                    <img src={image.imageUrl} alt={`${urbanTraction.title} — ${image.caption}`} className="h-auto w-full transition duration-700 group-hover:scale-[1.02]" />
                  </div>
                  <figcaption className="mt-3 font-mono-tech text-[10px] tracking-[0.14em] text-[#666660] uppercase">
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </article>

          <article className="group grid gap-8 border-t border-black/10 pt-5 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#d8d6d0]">
                <img src={housingOne.heroImage} alt={housingOne.title} className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
              </div>
            </div>
            <div className="pb-1 lg:col-span-6 lg:pl-10">
              <ProjectMeta number="03" project={housingOne} category="Urban Design / Masterplanning / Public Realm" />
              <h4 className="mt-5 text-3xl font-bold leading-[0.96] tracking-tight text-[#111111] sm:text-4xl">HOUSING ONE —<br />CATALYST</h4>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[#555550]">Exploring how movement, development, landscape, and public space can act as catalysts for urban transformation.</p>
              <p className="mt-7 font-mono-tech text-[10px] tracking-[0.14em] text-[#666660] uppercase">Site → Urban Strategy → Public Realm → Urban Form</p>
            </div>
          </article>

          <article className="group grid gap-6 border-t border-black/10 pt-5 md:grid-cols-12 md:items-center">
            <div className="md:col-span-3">
              <ProjectMeta number="04" project={tedxGateway} category={tedxGateway.category} />
              <h4 className="mt-4 text-2xl font-bold leading-[0.96] tracking-tight text-[#111111] sm:text-3xl">TEDx GATEWAY</h4>
            </div>
            <div className="md:col-span-5">
              <p className="max-w-md text-sm leading-relaxed text-[#555550]">{tedxGateway.description}</p>
            </div>
            <div className="md:col-span-4">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#d8d6d0]">
                <img src={tedxGateway.heroImage} alt={tedxGateway.title} className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
              </div>
            </div>
          </article>
        </div>

        <div className="mt-24 border-t border-black/10 pt-8">
          <div className="flex items-baseline justify-between gap-6">
            <p className="text-xs font-mono-tech tracking-[0.2em] text-[#666660]">05+ / SUPPORTING WORK</p>
            <span className="text-xs font-mono-tech text-[#666660]">{supportingProjects.length.toString().padStart(2, '0')} PROJECTS</span>
          </div>
          <div className="mt-8 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {supportingProjects.map((project, index) => (
              <article key={project.id} className="group border-t border-black/10 pt-4">
                {index < 2 && (
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#d8d6d0]">
                    <img src={project.heroImage} alt={project.title} className="h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
                  </div>
                )}
                <div className={`${index < 2 ? 'mt-4' : ''} flex items-start justify-between gap-5`}>
                  <div>
                    <ProjectMeta number={`0${index + 5}`} project={project} category={project.category} />
                    <h4 className="mt-3 text-xl font-bold tracking-tight text-[#111111]">{project.title}</h4>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#666660]">{project.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
