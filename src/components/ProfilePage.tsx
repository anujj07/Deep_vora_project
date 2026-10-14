import React from 'react';

interface ProfilePageProps {
  page: 'about' | 'contact';
  onBack: () => void;
  onContact: () => void;
}

interface AboutPageBodyProps {
  headingLevel?: 1 | 2;
}

export function AboutPageBody({
  headingLevel = 1,
}: AboutPageBodyProps) {
  const Heading = headingLevel === 1 ? 'h1' : 'h2';

  const services = [
    'Architecture & Urban Design',
    'Interior Designing',
    'Set & Production Design',
    'Design Visualization & 3D Rendering',
    'Website Designing',
    'Project Coordination & Construction Support',
  ];

  return (
    <div
      data-reveal-section
      className={`bg-[var(--bg-primary)] px-5 sm:px-8 md:px-12 lg:px-20 ${
        headingLevel === 2
          ? 'pb-12 pt-0 sm:pb-14 sm:pt-0 lg:pb-20 lg:pt-0'
          : 'pb-16 pt-28 sm:pt-32'
      }`}
    >
      <div className="mx-auto max-w-[92rem]">

        {/* =========================================================
            ABOUT — PROFILE + BIOGRAPHY
        ========================================================= */}
        <div className="grid grid-cols-1 gap-x-[clamp(3rem,5vw,6rem)] gap-y-12 lg:grid-cols-[minmax(0,36%)_minmax(0,1fr)] lg:gap-y-0">

          {/* LEFT — PROFILE */}
          <div className="self-start">
            <Heading
              data-reveal
              className="font-project-title text-sm font-medium tracking-[-0.02em]"
            >
              About me
            </Heading>

            <img
              data-reveal
              src="/deep-sir-photo.jpg"
              alt="Deep Vora"
              width="2550"
              height="3300"
              loading="lazy"
              className="mt-7 aspect-[0.97] w-full max-w-[520px] self-start object-cover object-top"
            />
          </div>

          {/* RIGHT — BIOGRAPHY */}
          <div
            data-reveal
            className="max-w-none text-[18px] leading-[1.65] text-[var(--text-primary)] lg:mt-15 lg:pl-2"
          >
            <p>
              <strong>Architect Deep Vora</strong> is an independent
              architecture and urban design practice working across scales —
              from individual buildings to neighbourhoods, streets, and public
              installations — with roots in both Mumbai and Vancouver. The work
              is held together by one recurring idea: that good design acts as a{' '}
              <em>catalyst</em>. Whether it's a fully affordable mixed-use
              development along the Arbutus greenway, a resilient neighbourhood
              plan for Grandview-Woodland, or a safer, more human junction in
              Mumbai, every project begins from the same question — how can this
              space bring people closer together? The practice treats roads as
              public realm rather than conduits, green networks as social
              infrastructure rather than decoration, and the line between public
              and private as something to blur instead of defend.
            </p>

            <p className="mt-7">
              This way of working moves fluidly between the intimate and the
              civic. At the building scale, it shapes courtyards, terraces, and
              pavilions that frame everyday encounters — the{' '}
              <em>Production Design</em> draws on the traditional Indian
              pavilion, while a mixed-use block turns its commercial edge and
              green nodes into gathering points. At the neighbourhood scale, it
              maps mobility, commercial, and ecological corridors that stitch a
              community back together and prepare it to be more resilient. And
              it extends to the street itself, where redesigned junctions and
              shared green streets reclaim asphalt for people. Grounded in
              ecological thinking and real community life, the practice designs
              for what happens <em>between</em> buildings as much as inside them —
              spaces that are shared, adaptable, and built to bring people
              together.
            </p>
          </div>
        </div>

        {/* =========================================================
            SERVICES — FULL WIDTH EDITORIAL GRID
        ========================================================= */}
        <section
          className="mt-0 sm:mt-1 lg:mt-2"
          aria-label="Services"
        >
          <h2
            data-reveal
            className="text-2xl font-semibold leading-tight tracking-[-0.03em]"
          >
            Services
          </h2>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 md:[grid-template-columns:repeat(3,minmax(0,1fr))]">
            {[
              [services[0], services[3]],
              [services[1], services[4]],
              [services[2], services[5]],
            ].map((column, columnIndex) => (
              <div key={columnIndex} className="min-w-0">
                {column.map((service) => (
                  <div
                    key={service}
                    data-reveal
                    className="flex min-h-[58px] items-center pr-6 text-base font-medium leading-snug"
                  >
                    {service}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  page,
}) => {
  const isAbout = page === 'about';

  /* =============================================================
     ABOUT
  ============================================================= */
  if (isAbout) {
    return (
      <main className="min-h-screen bg-[var(--bg-primary)]">
        <AboutPageBody />
      </main>
    );
  }

  /* =============================================================
     CONTACT
     Intentionally blank for now.
  ============================================================= */
  return (
    <main
      className="min-h-screen bg-[var(--bg-primary)]"
      aria-label="Contact"
    />
  );
};
