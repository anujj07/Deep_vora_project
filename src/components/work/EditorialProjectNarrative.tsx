import React from 'react';
import { StickyImageStack } from './StickyImageStack';
import { URBAN_TRACTION_SCROLL_IMAGES } from '../../data/mapConfig';

type Chapter = { title: string; text: string };

const chaptersByProject: Record<string, { quote: string; chapters: Chapter[] }> = {
  'jamming-studio': {
    quote: '“The studio is designed as an instrument in its own right: precise in performance, vivid in character, and ready for the energy of a live session.”',
    chapters: [
      { title: 'Acoustics as Atmosphere', text: 'The room begins with performance. Acoustic surfaces are layered to manage reflection and reduce unwanted noise, creating a controlled field where voices and instruments can be heard with clarity. Rather than concealing this work, the treatment becomes part of the visual language of the studio.' },
      { title: 'Colour, Rhythm, and Focus', text: 'Bold geometric colour blocks give the compact interior a strong sense of movement. They frame zones for recording, listening, and gathering while turning technical surfaces into an expressive backdrop for creative work.' },
      { title: 'Built for the Session', text: 'Lighting and infrastructure are integrated into the composition so the space can shift between a concentrated recording environment and a more open, social setting. Every element supports a room made to be used, reconfigured, and remembered.' },
    ],
  },
  'urban-traction': {
    quote: '“A street can do more than move people through it. It can hold the everyday life of a neighbourhood.”',
    chapters: [
      { title: 'A Connected Public Realm', text: 'Urban Traction starts with the small connections that make a district usable: a more continuous walking network, safer crossings, and public space that makes room for daily pauses as well as movement.' },
      { title: 'Landscape in the Urban Fabric', text: 'Green infrastructure is treated as working civic space. Planting, shade, and water-sensitive systems bring comfort to the street while helping the neighbourhood respond to changing environmental conditions.' },
      { title: 'Change Through Layering', text: 'The proposal does not erase what is already there. It gives the existing fabric new capacity—supporting mixed-use activity, local identity, and a public realm that can evolve over time.' },
    ],
  },
  'housing-one': {
    quote: '“Density becomes more liveable when shared space, climate, and everyday routines are designed together.”',
    chapters: [
      { title: 'A Porous Residential Cluster', text: 'Housing One organizes homes around air, light, and collective space. Breezeways cut through the mass, connecting residents to shared terraces and allowing the building to feel open rather than sealed.' },
      { title: 'Living with Climate', text: 'The architecture takes its cues from local conditions. Shaded edges, stepped outdoor rooms, and rainwater collection make climate response visible in the daily life of the building.' },
      { title: 'The Value of Neighbours', text: 'At its centre, the project is a framework for community. Shared thresholds and terraces make room for informal encounters, building a more social form of density without sacrificing privacy at home.' },
    ],
  },
  'tedx-gateway': {
    quote: '“The backdrop was imagined as a field of ideas—modular, changing, and alive under light.”',
    chapters: [
      { title: 'A Geometry of Exchange', text: 'The TEDx Gateway stage uses tessellation to create an undulating spatial field behind the speaker. Its changing profile gives the event a memorable visual identity while keeping the central message in focus.' },
      { title: 'From Module to Moment', text: 'Fifteen coordinated panels were developed as a practical kit of parts: designed for fabrication, transport, and rapid assembly. The system turns construction constraints into the structure of the design.' },
      { title: 'A Stage That Changes with Light', text: 'Projection and coloured lighting bring out different depths in the surface throughout the program. The result is a performance environment that can feel precise, immersive, and continually in motion.' },
    ],
  },
};

interface EditorialProjectNarrativeProps { projectId: string; projectTitle: string; images: readonly string[]; }

export const EditorialProjectNarrative: React.FC<EditorialProjectNarrativeProps> = ({ projectId, projectTitle, images }) => {
  const story = chaptersByProject[projectId];
  if (!story) return null;
  const scrollImages = projectId === 'urban-traction' ? URBAN_TRACTION_SCROLL_IMAGES : null;

  return (
    <section data-reveal-section className="mt-24 sm:mt-32" aria-label={`${projectTitle} visual story`}>
      <blockquote data-reveal className="mx-auto max-w-4xl border-t border-black/[0.09] pt-8 text-2xl font-semibold leading-[1.28] tracking-[-0.035em] sm:text-4xl">
        {story.quote}
      </blockquote>
      <div className="mt-20 space-y-24 sm:mt-28 sm:space-y-36">
        {story.chapters.map((chapter, index) => {
          const image = images[index];
          const isReversed = index % 2 === 1;
          return (
            <article key={chapter.title} data-reveal className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-16 ${isReversed ? '' : ''}`}>
              {image && <figure className={`${isReversed ? 'lg:order-2 lg:col-span-5' : 'lg:col-span-7'}`}>
                <div className="overflow-hidden bg-[#e8e7e3]">
                  <img src={image} alt={`${projectTitle} — ${chapter.title}`} loading="lazy" className="aspect-[4/3] h-full w-full object-cover" />
                </div>
                <figcaption className="mt-3 font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#777771]">{String(index + 1).padStart(2, '0')} / {chapter.title}</figcaption>
              </figure>}
              <div className={`${image ? (isReversed ? 'lg:order-1 lg:col-span-5 lg:col-start-2' : 'lg:col-span-4 lg:col-start-9') : 'lg:col-span-6 lg:col-start-4'}`}>
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#777771]">{String(index + 1).padStart(2, '0')} / Narrative</p>
                <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-3xl">{chapter.title}</h3>
                <p className="mt-5 font-narrative text-lg leading-[1.58] text-[#33332f] sm:text-xl">{chapter.text}</p>
              </div>
            </article>
          );
        })}
      </div>
      {scrollImages && <StickyImageStack images={scrollImages} projectTitle={projectTitle} />}
    </section>
  );
};
