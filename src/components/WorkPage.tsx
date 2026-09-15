import React, { useState } from 'react';
import { MapExperience } from './MapExperience';
import { LEGACY_PROJECTS_REGISTRY, PROJECTS_REGISTRY, type ProjectLocation } from '../data/mapConfig';

type View = 'grid' | 'map';

const findProject = (projects: ProjectLocation[], id: string) => projects.find((project) => project.id === id)!;
const projects = [
  findProject(LEGACY_PROJECTS_REGISTRY, 'jamming-studio'),
  findProject(PROJECTS_REGISTRY, 'urban-traction'),
  findProject(LEGACY_PROJECTS_REGISTRY, 'housing-one'),
  findProject(PROJECTS_REGISTRY, 'tedx-gateway'),
  ...PROJECTS_REGISTRY.filter((project) => project.id !== 'urban-traction' && project.id !== 'tedx-gateway'),
];

const footerPrimaryLinks = ['Work', 'Purpose', 'Insights', 'People', 'Studios'];
const footerSecondaryLinks = ['News', 'Careers', 'Contact'];
const footerProjectLinks = [
  'Selected Projects', 'Adaptive Transformation', 'Advisory Services', 'Aviation',
  'Branded Environments', 'Corporate and Commercial', 'Cultural and Civic', 'Federal',
  'Health', 'Health Education', 'Higher Education',
];
const footerSectorLinks = [
  'Hospitality', 'K-12 Education', 'Landscape Architecture', 'Residential', 'Retail',
  'Science and Technology', 'Sports, Recreation, and Entertainment', 'Transportation',
  'Urban Design', 'Workplace',
];

const WorkFooter: React.FC = () => (
  <footer data-reveal-section className="bg-black px-5 pb-7 pt-12 text-white sm:px-8 sm:pt-16 md:px-12 lg:px-20 lg:pb-8 lg:pt-20">
    <div className="mx-auto max-w-[92rem]">
      <div data-reveal className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-[minmax(9rem,1fr)_minmax(13rem,1fr)_minmax(15rem,1fr)_minmax(12rem,1fr)] lg:gap-x-14">
        <div className="flex flex-col gap-10">
          <nav className="flex flex-col items-start gap-2" aria-label="Primary footer navigation">
            {footerPrimaryLinks.map((label) => (
              <a key={label} href={label === 'Work' ? '/work' : `/${label.toLowerCase()}`} className="text-base font-semibold tracking-[-0.035em] transition-opacity hover:opacity-60 sm:text-lg">{label}</a>
            ))}
          </nav>
          <nav className="flex flex-col items-start gap-2" aria-label="Secondary footer navigation">
            {footerSecondaryLinks.map((label) => (
              <a key={label} href={label === 'Contact' ? '/contact' : '#'} className="text-sm font-semibold transition-opacity hover:opacity-60">{label}</a>
            ))}
          </nav>
        </div>

        <nav className="flex flex-col items-start gap-2" aria-label="Project disciplines">
          {footerProjectLinks.map((label) => <a key={label} href="#" className="text-xs font-semibold leading-snug transition-opacity hover:opacity-60 sm:text-sm">{label}</a>)}
        </nav>

        <nav className="flex flex-col items-start gap-2" aria-label="Project sectors">
          {footerSectorLinks.map((label) => <a key={label} href="#" className="text-xs font-semibold leading-snug transition-opacity hover:opacity-60 sm:text-sm">{label}</a>)}
        </nav>

        <a href="mailto:architectdeepvora@gmail.com" className="self-start text-lg font-semibold tracking-[-0.04em] transition-opacity hover:opacity-60 sm:text-xl">Join our Mailing List</a>
      </div>

      <div data-reveal className="mt-16 flex flex-col gap-10 sm:mt-20 lg:mt-24">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <a href="/" className="text-2xl font-semibold tracking-[-0.06em] sm:text-3xl">DEEP<span className="font-normal">VORA</span></a>
          <nav className="flex items-center gap-6" aria-label="Social media">
            <a href="#" aria-label="Facebook" className="text-base font-bold leading-none transition-opacity hover:opacity-60">f</a>
            <a href="#" aria-label="Instagram" className="grid h-4 w-4 place-items-center rounded-[4px] border border-current transition-opacity hover:opacity-60"><span className="h-1.5 w-1.5 rounded-full border border-current" /></a>
            <a href="#" aria-label="X" className="text-lg leading-none transition-opacity hover:opacity-60">𝕏</a>
            <a href="#" aria-label="LinkedIn" className="text-sm font-bold leading-none transition-opacity hover:opacity-60">in</a>
            <a href="#" aria-label="Vimeo" className="text-lg font-bold italic leading-none transition-opacity hover:opacity-60">v</a>
          </nav>
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-3 font-mono-tech text-[9px] font-semibold uppercase tracking-[0.06em] text-white/90 sm:text-[10px]">
          <span>© 2026 DEEP VORA</span>
          <a href="#" className="transition-opacity hover:opacity-60">Privacy Policy</a>
          <a href="#" className="transition-opacity hover:opacity-60">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
);

const ProjectMeta: React.FC<{ project: ProjectLocation }> = ({ project }) => (
  <>
    <p className="mt-2 font-project-meta text-xs leading-snug text-[#696963] sm:text-[13px]">{project.area}, {project.city}</p>
    <p className="mt-1 font-project-meta text-[11px] leading-snug text-[#696963] sm:text-xs">{project.category}</p>
  </>
);

export const WorkPage: React.FC = () => {
  const [view, setView] = useState<View>('grid');

  return (
    <>
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
          {(['grid', 'map'] as const).map((item) => (
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
              <h2 className="font-project-title text-xl leading-[1.15] sm:text-2xl">
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
    <WorkFooter />
    </>
  );
};
