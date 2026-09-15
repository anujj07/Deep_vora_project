import React from 'react';

const stories = [
  {
    label: 'Field note',
    title: 'Designing Rooms That Listen as Closely as They Speak',
    date: 'Acoustic environments / 2024',
    href: '/work/jamming-studio',
    image: '/projects/jamming-studio/JAMMING_STUDIO_01.png',
    alt: 'Jamming Studio interior',
  },
  {
    label: 'Project story',
    title: 'The Street as a Living Framework for Public Life',
    date: 'Urban Traction / 2023',
    href: '/work/urban-traction',
    image: '/projects/urban-traction/URBAN_TRACTION_01_KEY_MASTERPLAN.png',
    alt: 'Urban Traction masterplan',
  },
  {
    label: 'Design journal',
    title: 'A Stage System Built for Ideas in Motion',
    date: 'TEDx Gateway / 2023',
    href: '/work/tedx-gateway',
    image: '/projects/tedx-gateway/TEDX_GATEWAY_01_FINAL_STAGE.png',
    alt: 'TEDx Gateway stage design',
  },
  {
    label: 'Material study',
    title: 'Light, Texture, and the Craft of a Creative Interior',
    date: 'Jamming Studio / 2024',
    href: '/work/jamming-studio',
    image: '/projects/jamming-studio/JAMMING_STUDIO_03.png',
    alt: 'Jamming Studio material and lighting detail',
  },
];

export const StudioStories: React.FC = () => (
  <section data-reveal-section className="bg-black px-5 py-16 text-white sm:px-8 sm:py-20 md:px-12 lg:px-20 lg:py-24" aria-labelledby="stories-heading">
    <div className="mx-auto max-w-[105rem]">
      <div data-reveal className="mb-10 flex items-end justify-between border-b border-white/20 pb-4 sm:mb-12">
        <div>
          <p className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-white/55 sm:text-[11px]">Journal / 2026</p>
          <h2 id="stories-heading" className="mt-3 text-3xl font-semibold leading-none tracking-[-0.05em] sm:text-4xl">Stories from the practice</h2>
        </div>
        <a href="/work" className="hidden font-mono-tech text-[10px] uppercase tracking-[0.14em] text-white/70 transition-colors hover:text-white sm:block">View all work ↗</a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
        {stories.map((story) => (
          <a key={story.title} data-reveal href={story.href} className="group border-t border-white/20 py-4 first:border-t-0 sm:border-l sm:border-t-0 sm:px-5 sm:first:pl-0 lg:px-5 lg:last:pr-0">
            <div className="aspect-[1.32/1] overflow-hidden bg-white/10">
              <img src={story.image} alt={story.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]" />
            </div>
            <p className="mt-5 font-mono-tech text-[10px] uppercase tracking-[0.14em] text-white/60 sm:text-[11px]">{story.label}</p>
            <h3 className="mt-3 max-w-[19rem] text-xl font-medium leading-[1.12] tracking-[-0.035em] text-white transition-opacity group-hover:opacity-65 sm:text-2xl">{story.title}</h3>
            <p className="mt-4 text-sm text-white/45">{story.date}</p>
          </a>
        ))}
      </div>
    </div>
  </section>
);
