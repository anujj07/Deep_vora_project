import React from 'react';
import { LEGACY_PROJECTS_REGISTRY, PROJECTS_REGISTRY, type ProjectLocation } from '../data/mapConfig';

const findProject = (projects: ProjectLocation[], id: string) => projects.find((project) => project.id === id)!;
const projects = [
  findProject(LEGACY_PROJECTS_REGISTRY, 'jamming-studio'),
  findProject(PROJECTS_REGISTRY, 'tedx-gateway'),
  findProject(LEGACY_PROJECTS_REGISTRY, 'housing-one'),
  findProject(PROJECTS_REGISTRY, 'loop'),
  findProject(PROJECTS_REGISTRY, 'mithchowki-transformation'),
  findProject(PROJECTS_REGISTRY, 'urban-traction'),
  findProject(PROJECTS_REGISTRY, 'production-design'),
];
const desktopColumnStarts = [
  'md:col-start-1',
  'md:col-start-5',
  'md:col-start-9',
  'md:col-start-1',
  'md:col-start-5',
  'md:col-start-9',
  'md:col-start-1',
];

const formatProjectTitle = (title: string) => title.split(' ').map((word) => (
  word.toLowerCase() === 'tedx'
    ? 'TEDx'
    : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
)).join(' ');

const ProjectMeta: React.FC<{ project: ProjectLocation }> = ({ project }) => (
  <>
    <p className="mt-0.5 font-project-meta text-xs leading-[1.4] text-[#696963]">{project.area}, {project.city}</p>
    <p className="mt-1 font-project-meta text-xs leading-[1.4] text-[#696963]">{project.category}</p>
  </>
);

interface WorkPageBodyProps { headingLevel?: 1 | 2; }

export const WorkPageBody: React.FC<WorkPageBodyProps> = ({ headingLevel = 1 }) => {
  const Heading = headingLevel === 1 ? 'h1' : 'h2';

  return (
<div data-reveal-section className={`bg-white px-10 pt-16 text-[#121212] sm:px-6 sm:pt-15 md:px-12 lg:px-20 ${headingLevel === 2 ? 'pb-0' : 'pb-24 lg:pb-32'}`}>      <div className="mx-auto max-w-[92rem]">
        <header data-reveal className="flex flex-col justify-between gap-8 border-t border-black/[0.12] pt--6 md:flex-row md:items-end">
          <div>
            
            <Heading className="mt-3 text-5xl font-semibold leading-[0.9] tracking-[-0.06em] sm:text-10xl">Work</Heading>
          </div>
        </header>

  <section
    className="
      mt-8
      grid
      grid-cols-1
      gap-x-10
      md:grid-cols-12
      lg:mt-12
      lg:gap-x-8
    "
    aria-label="Project grid"
  >
    {projects.map((project, index) => {
      const preserveImageRatio = project.id === 'tedx-gateway' || project.id === 'housing-one';

      return (
      <article
        key={`${project.id}-${index}`}
        data-reveal
        className={`group mb-14 break-inside-avoid md:col-span-4 ${desktopColumnStarts[index]}`}
      >
        <a
          href={`/work/${project.id}`}
          className="block"
          aria-label={`View ${project.title}`}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e8e7e3]">
            {preserveImageRatio && (
              <img
                src={project.heroImage}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl"
              />
            )}
            <img
              src={project.heroImage}
              alt={project.title}
              loading={index < 4 ? 'eager' : 'lazy'}
              className={`relative block h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.025] ${preserveImageRatio ? 'object-contain' : 'object-cover'}`}
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
              <h2 className="font-project-title text-xl leading-[1.15]">
                {formatProjectTitle(project.title)}
              </h2>
            </div>

            <ProjectMeta project={project} />
          </div>
        </a>
      </article>
      );
    })}
  </section>
      </div>
    </div>
  );
};

export const WorkPage: React.FC = () => (
  <main className="min-h-screen bg-white text-[#121212]">
    <WorkPageBody />
  </main>
);
