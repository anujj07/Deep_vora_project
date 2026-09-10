export interface NarrativeImage {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  imageUrl: string;
  aspect: string;
  description: string;
  revealType: "aperture" | "lens-expand" | "split-wipe" | "angled-slice" | "color-dissolve" | "radial-bloom" | "typographic-mask" | "macro-zoom" | "soft-pan" | "hero-elevation";
  technicalSpecs: {
    material?: string;
    acousticCoeff?: string;
    lighting?: string;
    dimensions?: string;
    caliperData?: string;
  };
}

export const JAMMING_STUDIO_IMAGES = {
  hero: '/projects/jamming-studio/JAMMING_STUDIO_01.png',
  spatial: '/projects/jamming-studio/JAMMING_STUDIO_02.png',
  detail: '/projects/jamming-studio/JAMMING_STUDIO_03.png',
} as const;

export const JAMMING_STUDIO_METADATA = {
  title: 'JAMMING STUDIO',
  client: 'Parthiv Gohil',
  location: 'Andheri West, Mumbai',
  typology: 'Interior / Acoustic Design',
  focus: 'Acoustic Treatment · Materiality · Lighting · Technical Integration',
  overview: 'A high-performance acoustic studio designed as a vibrant creative environment. Layered acoustic panels, bold geometric color-blocking, integrated lighting, and technical infrastructure transform the space into a functional yet expressive setting for musical creation.',
};

export const JAMMING_STUDIO_NARRATIVE: NarrativeImage[] = [
  {
    id: 'JAMMING_STUDIO_01',
    number: '01',
    title: 'JAMMING STUDIO',
    subtitle: 'Hero / Overall Project Image',
    category: 'INTERIOR / ACOUSTIC DESIGN',
    imageUrl: JAMMING_STUDIO_IMAGES.hero,
    aspect: '4/3',
    description: JAMMING_STUDIO_METADATA.overview,
    revealType: 'aperture',
    technicalSpecs: { material: 'Flame red, stone, charcoal, black and grey surfaces', lighting: 'Integrated LED backlighting' },
  },
  {
    id: 'JAMMING_STUDIO_02',
    number: '02',
    title: 'ACOUSTIC ARTISTRY',
    subtitle: 'Design / Spatial Image',
    category: 'SPATIAL DESIGN',
    imageUrl: JAMMING_STUDIO_IMAGES.spatial,
    aspect: '4/3',
    description: '50mm acoustic panels are arranged as layered architectural surfaces, combining sound absorption with visual expression.',
    revealType: 'lens-expand',
    technicalSpecs: { material: '50mm layered acoustic panels', acousticCoeff: 'Sound absorption integrated with visual expression' },
  },
  {
    id: 'JAMMING_STUDIO_03',
    number: '03',
    title: 'ATMOSPHERIC LIGHTING',
    subtitle: 'Detail / Material / Atmosphere Image',
    category: 'MATERIALITY & LIGHTING',
    imageUrl: JAMMING_STUDIO_IMAGES.detail,
    aspect: '4/3',
    description: 'Integrated LED backlighting behind acoustic panels creates depth and a floating architectural effect, while acoustic, AV, lighting and electrical infrastructure remain visually integrated.',
    revealType: 'split-wipe',
    technicalSpecs: { material: 'Flame red acoustic panels with charcoal and black framing', lighting: 'Integrated LED backlighting', caliperData: 'Acoustic, AV, lighting and electrical integration' },
  },
];
