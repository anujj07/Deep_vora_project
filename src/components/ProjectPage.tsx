import React from 'react';
import { JAMMING_STUDIO_IMAGES } from '../data/jammingStudioData';
import { LEGACY_PROJECTS_REGISTRY, PROJECTS_REGISTRY, type ProjectLocation } from '../data/mapConfig';
import { EditorialProjectNarrative } from './work/EditorialProjectNarrative';

const findProject = (projects: ProjectLocation[], id: string) => projects.find((project) => project.id === id)!;

const projectOrder = ['jamming-studio', 'urban-traction', 'housing-one', 'tedx-gateway', 'green-catalyst', 'mithchowki-transformation', 'loop'];
const projectsById: Record<string, ProjectLocation> = {
  'jamming-studio': findProject(LEGACY_PROJECTS_REGISTRY, 'jamming-studio'),
  'urban-traction': findProject(PROJECTS_REGISTRY, 'urban-traction'),
  'housing-one': findProject(LEGACY_PROJECTS_REGISTRY, 'housing-one'),
  'tedx-gateway': findProject(PROJECTS_REGISTRY, 'tedx-gateway'),
  'green-catalyst': findProject(PROJECTS_REGISTRY, 'green-catalyst'),
  'mithchowki-transformation': findProject(PROJECTS_REGISTRY, 'mithchowki-transformation'),
  'loop': findProject(PROJECTS_REGISTRY, 'loop'),
};

const projectStories: Record<string, { heading: string; paragraphs: string[] }> = {
  'jamming-studio': {
    heading: 'A Room Tuned for Creative Energy',
    paragraphs: [
      'Jamming Studio was conceived as a focused, high-performance room for making music. The design brings acoustic control, technical infrastructure, and a strong visual identity into one compact creative environment.',
      'Layered acoustic panels shape the room’s character while bold geometric colour blocking gives the space a sense of rhythm and direction. Integrated lighting supports the atmosphere of a working studio—precise when it needs to be, expressive when the session takes over.',
    ],
  },
  'urban-traction': {
    heading: 'Making the Street a Shared Resource',
    paragraphs: [
      'Urban Traction reframes the everyday street as a connected public landscape. The proposal brings movement, green infrastructure, and active edges together to make space for a more social and resilient urban life.',
      'Rather than treating mobility and public realm as separate systems, the strategy uses each to strengthen the other: more comfortable walking routes, legible connections, and places to pause within a changing neighbourhood fabric.',
    ],
  },
  'housing-one': {
    heading: 'Density with Room to Breathe',
    paragraphs: [
      'Housing One explores a more generous model of high-density living. A mass-timber residential cluster is organized around porous breezeways, shared terraces, and daily encounters between neighbours.',
      'The project uses its climate as an active design material. Stepped communal spaces, shade, and rainwater collection work together to give the housing a lighter environmental footprint and a stronger relationship to collective life.',
    ],
  },
  'tedx-gateway': {
    heading: 'A Stage for Ideas in Motion',
    paragraphs: [
      'TEDx Gateway Stage Design translates the energy of exchange into a spatial backdrop. A modular tessellated system creates an undulating field behind speakers—dynamic enough for the event, but disciplined enough to fabricate, transport, and assemble.',
      'The stage was developed as a coordinated performance environment, balancing projection, coloured light, visibility, and a clear central focus. Its geometry changes with the light, giving each moment on stage a distinct sense of depth.',
    ],
  },
  'loop': {
    heading: 'A Resilient Neighbourhood, Connected by Everyday Life',
    paragraphs: [
      'What if James Bay became a hub for socio-cultural activity that not only boosts local and international tourism, but also transforms it into a resilient neighbourhood? LOOP responds by connecting key activity anchors with the surrounding socio-ecological infrastructure network.',
      'The proposal recognizes three complementary corridors. A mobility corridor improves pedestrian and public-transportation connectivity; a commercial corridor supports local businesses, active streets, and community activity; and a green corridor strengthens ecological connections, public spaces, and landscape networks.',
      'Programmes for eco-tourism and community interaction create vibrant gathering spaces and stepping stones of activity throughout the neighbourhood. Together, these interventions connect James Bay’s waterways, public spaces, cultural destinations, and neighbourhood communities into one continuous network—connected, vibrant, resilient, and socially active.',
    ],
  },
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
  const story = projectStories[project.id] ?? { heading: project.subtitle, paragraphs: [project.description] };
  const verticalImage = images.find((image) => !image.includes('images.unsplash.com'))
    ?? (project.id === 'housing-one' ? findProject(PROJECTS_REGISTRY, 'green-catalyst').heroImage : undefined);

  return (
    <section className="min-h-screen bg-white px-5 pb-16 pt-28 text-[#111111] sm:px-8 sm:pt-32 md:px-12 lg:px-20 lg:pb-24">
      <div data-reveal-section className="mx-auto max-w-[105rem]">
        {verticalImage && (
          <figure data-reveal className="mx-auto mb-16 max-w-7xl sm:mb-24 lg:mb-28">
            <div className="aspect-[12/5] w-full overflow-hidden">
              <img src={verticalImage} alt={`${project.title} — project view`} loading="eager" className="h-full w-full object-cover" />
            </div>
          </figure>
        )}
        <header data-reveal>
          <a href="/work" className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#686862] transition-colors hover:text-black sm:text-[11px]">Work / {String(index + 1).padStart(2, '0')}</a>
          <h1 className="mt-7 max-w-5xl text-4xl font-semibold leading-[1.03] tracking-[-0.04em] sm:text-6xl lg:text-7xl">{project.title}</h1>
          <p className="mt-5 text-base text-[#565650] sm:text-lg">{project.area}, {project.city}</p>
        </header>

        <section data-reveal className="mt-16 grid gap-12 border-t border-black/[0.09] pt-8 lg:mt-20 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <p className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#777771] sm:text-[11px]">Project story</p>
            <h2 className="mt-6 max-w-3xl text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">{story.heading}</h2>
            <div className="mt-7 max-w-3xl space-y-6 font-narrative text-lg leading-[1.58] text-[#222222] sm:text-xl">
              {story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <aside className="border-t border-black/[0.09] pt-6 lg:col-span-4 lg:col-start-9 lg:border-t-0 lg:pt-0">
            <dl className="space-y-4 text-base leading-relaxed text-[#555550] sm:text-lg">
              <div><dt className="inline font-semibold text-[#111111]">Client: </dt><dd className="inline">{project.client}</dd></div>
              <div><dt className="inline font-semibold text-[#111111]">Project type: </dt><dd className="inline">{project.category}</dd></div>
              <div><dt className="inline font-semibold text-[#111111]">Completion date: </dt><dd className="inline">{project.year}</dd></div>
              <div><dt className="inline font-semibold text-[#111111]">Location: </dt><dd className="inline">{project.area}, {project.city}</dd></div>
              {project.focus && <div className="pt-5"><dt className="font-semibold text-[#111111]">Focus:</dt><dd className="mt-2 text-base">{project.focus}</dd></div>}
            </dl>
          </aside>
        </section>

        <EditorialProjectNarrative projectId={project.id} projectTitle={project.title} images={images} />

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
