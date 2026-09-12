import React, { useState } from 'react';
import { MapExperience } from './MapExperience';
import { LEGACY_PROJECTS_REGISTRY, PROJECTS_REGISTRY, type ProjectLocation } from '../data/mapConfig';

type View = 'grid' | 'map' | 'list';

const findProject = (projects: ProjectLocation[], id: string) => projects.find((project) => project.id === id)!;
const projects = [
  findProject(LEGACY_PROJECTS_REGISTRY, 'jamming-studio'),
  findProject(PROJECTS_REGISTRY, 'urban-traction'),
  findProject(LEGACY_PROJECTS_REGISTRY, 'housing-one'),
  findProject(PROJECTS_REGISTRY, 'tedx-gateway'),
  ...PROJECTS_REGISTRY.filter((project) => project.id !== 'urban-traction' && project.id !== 'tedx-gateway'),
];

const gridVariants = [
  'md:col-span-7',
  'md:col-span-5 md:pt-16',
  'md:col-span-4 lg:col-start-2',
  'md:col-span-6 md:pt-24',
  'md:col-span-5',
  'md:col-span-4 md:pt-14',
  'md:col-span-6',
  'md:col-span-5 md:pt-20',
];

const imageVariants = [
  'aspect-[2/2]',
  'aspect-square',
  'aspect-[3/4]',
  'aspect-[5/3]',
  'aspect-[3/4]',
  'aspect-[3/2]',
  'aspect-[6/3]',
  'aspect-[3/4]',
];

const ProjectMeta: React.FC<{ project: ProjectLocation }> = ({ project }) => (
  <>
    <p className="mt-2 font-mono-tech text-[10px] uppercase tracking-[0.13em] text-[#696963] sm:text-[11px]">{project.area}, {project.city}</p>
    <p className="mt-1 font-mono-tech text-[10px] uppercase tracking-[0.13em] text-[#696963] sm:text-[11px]">{project.category}</p>
  </>
);

export const WorkPage: React.FC = () => {
  const [view, setView] = useState<View>('grid');

  return (
    <main className="min-h-screen bg-[#fcfbf9] px-5 pb-24 pt-28 text-[#111111] sm:px-8 sm:pt-32 md:px-12 lg:px-20 lg:pb-32">
      <div data-reveal-section className="mx-auto max-w-[92rem]">
        <header data-reveal className="flex flex-col justify-between gap-8 border-t border-black/[0.12] pt-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono-tech text-[10px] uppercase tracking-[0.17em] text-[#696963] sm:text-[11px]">Selected projects</p>
            <h1 className="mt-4 text-5xl font-semibold leading-[0.9] tracking-[-0.06em] sm:text-7xl">Featured Work</h1>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[#5a5a55]">Architecture, urban design, and construction work shaped by place and performance.</p>
        </header>

        <nav data-reveal className="mt-12 flex border-b border-black/[0.12]" aria-label="Project view">
          {(['grid', 'map', 'list'] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setView(item)}
              aria-pressed={view === item}
              className={`border-b px-0 pb-3 pr-7 font-mono-tech text-[10px] uppercase tracking-[0.14em] transition-colors sm:text-[11px] ${view === item ? 'border-black text-[#111111]' : 'border-transparent text-[#777771] hover:text-[#111111]'}`}
            >
              {item}
            </button>
          ))}
        </nav>

        {view === 'grid' && (
  <section
    className="
      mt-14
      columns-1
      gap-10
      md:columns-4
      md:gap-10
      lg:mt-20
      lg:columns-4
      lg:gap-8
    "
    aria-label="Project grid"
  >
    {projects.map((project, index) => (
      <article
        key={`${project.id}-${index}`}
        data-reveal
        className="group mb-14 break-inside-avoid"
      >
        <a
          href={`/work/${project.id}`}
          className="block"
          aria-label={`View ${project.title}`}
        >
          <div className="w-full overflow-hidden bg-[#e8e7e3]">
            <img
              src={project.heroImage}
              alt={project.title}
              loading={index < 4 ? 'eager' : 'lazy'}
              className="
                block
                h-auto
                w-full
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-[1.025]
              "
            />
          </div>

          <div
            className="
              mt-4
              border-t
              border-black/[0.1]
              pt-3
              transition-transform
              duration-300
              ease-out
              group-hover:translate-x-1
            "
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-2xl">
                {project.title}
              </h2>

              <span className="font-mono-tech text-[10px] tracking-[0.12em] text-[#696963]">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <ProjectMeta project={project} />
          </div>
        </a>
      </article>
    ))}
  </section>
)}

        {view === 'list' && (
          <section data-reveal className="mt-14 lg:mt-20" aria-label="Project list">
            <div className="hidden grid-cols-12 border-b border-black/[0.12] pb-3 font-mono-tech text-[10px] uppercase tracking-[0.13em] text-[#696963] md:grid">
              <span className="col-span-4">Title</span><span className="col-span-3">Location</span><span className="col-span-2">Year</span><span className="col-span-3">Type / Discipline</span>
            </div>
            {projects.map((project) => (
              <a key={project.id} href={`/work/${project.id}`} className="grid gap-2 border-b border-black/[0.1] py-5 transition-colors hover:bg-black/[0.025] md:grid-cols-12 md:items-baseline md:gap-4">
                <h2 className="text-xl font-semibold tracking-[-0.035em] md:col-span-4">{project.title}</h2>
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.13em] text-[#696963] md:col-span-3 sm:text-[11px]">{project.area}, {project.city}</p>
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.13em] text-[#696963] md:col-span-2 sm:text-[11px]">{project.year}</p>
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.13em] text-[#696963] md:col-span-3 sm:text-[11px]">{project.category}</p>
              </a>
            ))}
          </section>
        )}

        {view === 'map' && (
          <section className="mt-14 lg:mt-20" aria-label="Project map">
            <p data-reveal className="mb-6 max-w-md text-sm leading-relaxed text-[#5a5a55]">Browse the existing project map experience. Its camera travel and interaction system are preserved unchanged.</p>
            <div data-reveal className="overflow-hidden border-y border-black/[0.12]">
              <MapExperience />
            </div>
          </section>
        )}
      </div>
    </main>
  );
};
