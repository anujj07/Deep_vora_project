import React from 'react';
import { JAMMING_STUDIO_IMAGES } from '../data/jammingStudioData';
import { LEGACY_PROJECTS_REGISTRY, PROJECTS_REGISTRY, type ProjectLocation } from '../data/mapConfig';
import { StickyProjectGallery } from './work/StickyProjectGallery';

const findProject = (projects: ProjectLocation[], id: string) => projects.find((project) => project.id === id)!;

const projectOrder = ['jamming-studio', 'urban-traction', 'housing-one', 'tedx-gateway'];
const projectsById: Record<string, ProjectLocation> = {
  'jamming-studio': findProject(LEGACY_PROJECTS_REGISTRY, 'jamming-studio'),
  'urban-traction': findProject(PROJECTS_REGISTRY, 'urban-traction'),
  'housing-one': findProject(LEGACY_PROJECTS_REGISTRY, 'housing-one'),
  'tedx-gateway': findProject(PROJECTS_REGISTRY, 'tedx-gateway'),
};

const projectImages = (project: ProjectLocation) => {
  if (project.id === 'jamming-studio') return [JAMMING_STUDIO_IMAGES.hero, JAMMING_STUDIO_IMAGES.spatial, JAMMING_STUDIO_IMAGES.detail];
  return [project.heroImage, ...(project.galleryImages?.map((image) => image.imageUrl) ?? [])]
    .filter((image, index, images) => images.indexOf(image) === index);
};

interface ProjectPageProps {
  projectId: string;
}

export const ProjectPage: React.FC<ProjectPageProps> = ({ projectId }) => {
  const project = projectsById[projectId];
  if (!project) {
    return <section className="min-h-screen bg-white px-5 pb-16 pt-28 sm:px-8 sm:pt-32 md:px-12 lg:px-20"><p className="font-mono-tech text-xs uppercase tracking-[0.15em] text-[#686862]">Project not found</p></section>;
  }
  const images = projectImages(project);
  const index = projectOrder.indexOf(projectId);
  const nextProject = projectsById[projectOrder[(index + 1) % projectOrder.length]];

  return (
    <section className="min-h-screen bg-white px-5 pb-16 pt-28 text-[#111111] sm:px-8 sm:pt-32 md:px-12 lg:px-20 lg:pb-24">
      <div data-reveal-section className="mx-auto max-w-7xl">
        <header data-reveal className="border-b border-black/[0.09] pb-9 lg:grid lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <a href="/work" className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#686862] transition-colors hover:text-black sm:text-[11px]">Work / {String(index + 1).padStart(2, '0')}</a>
            <h1 className="mt-6 text-5xl font-semibold leading-[0.88] tracking-[-0.06em] sm:text-7xl lg:text-8xl">{project.title}</h1>
            <p className="mt-5 font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#686862]">{project.area}, {project.city}</p>
          </div>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-[#565650] lg:col-span-4 lg:mt-0">{project.description}</p>
        </header>

        <div data-reveal className="mt-7 grid gap-4 border-b border-black/[0.09] pb-7 font-mono-tech text-[10px] uppercase tracking-[0.13em] text-[#686862] sm:grid-cols-3 sm:text-[11px]">
          <div><span className="block text-[#9a9a94]">Type</span>{project.category}</div>
          <div><span className="block text-[#9a9a94]">Client</span>{project.client}</div>
          <div><span className="block text-[#9a9a94]">Year</span>{project.year}</div>
        </div>

        <StickyProjectGallery images={images} projectTitle={project.title} />

        <nav data-reveal className="mt-24 flex items-end justify-between border-t border-black/[0.09] pt-6 sm:mt-32" aria-label="Project navigation">
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#777771] sm:text-[11px]">Next project</span>
          <a href={`/work/${nextProject.id}`} className="group text-right">
            <span className="block font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#777771] sm:text-[11px]">{nextProject.area}, {nextProject.city}</span>
            <span className="mt-2 block text-2xl font-semibold leading-none tracking-[-0.04em] transition-transform duration-300 group-hover:translate-x-1 sm:text-4xl">{nextProject.title} →</span>
          </a>
        </nav>
      </div>
    </section>
  );
};
