import { JAMMING_STUDIO_IMAGES } from './jammingStudioData';

export interface CameraStage {
  progress: number;
  scale: number;
  xPercent: number; // Center focal point X %
  yPercent: number; // Center focal point Y %
  perspective: number;
  rotateX: number;
  rotateZ: number;
  blurUnselected: number;
  label: string;
  stageName: string;
  cartoScale: string; // e.g. "1:100,000"
}

export interface ProjectLocation {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  category: string;
  year: string;
  area: string;
  city: string;
  coords: {
    lat: string;
    lng: string;
    x: number; // % on SVG map (0 - 1000)
    y: number; // % on SVG map (0 - 1000)
  };
  highlightArea: string;
  description: string;
  heroImage: string;
  galleryImages?: readonly ProjectImage[];
  focus?: string;
  camera: {
    targetScale: number;
    targetX: number;
    targetY: number;
  };
}

export interface ProjectImage {
  id: string;
  imageUrl: string;
  caption: string;
}

export const MAP_CAMERA_STAGES: CameraStage[] = [
  {
    progress: 0.00,
    scale: 1.0,
    xPercent: 50,
    yPercent: 50,
    perspective: 1200,
    rotateX: 0,
    rotateZ: 0,
    blurUnselected: 0,
    label: "MUMBAI METROPOLITAN REGION",
    stageName: "01 — CITY",
    cartoScale: "1:75,000",
  },
  {
    progress: 0.15,
    scale: 1.85,
    xPercent: 47,
    yPercent: 44,
    perspective: 1100,
    rotateX: 1.5,
    rotateZ: -0.5,
    blurUnselected: 0.5,
    label: "WESTERN SUBURBS CORRIDOR",
    stageName: "02 — APPROACH",
    cartoScale: "1:35,000",
  },
  {
    progress: 0.30,
    scale: 3.4,
    xPercent: 43.5,
    yPercent: 38.5,
    perspective: 1000,
    rotateX: 3.0,
    rotateZ: -1.0,
    blurUnselected: 1.5,
    label: "ANDHERI WEST / JUHU REGION",
    stageName: "03 — REGIONAL FOCUS",
    cartoScale: "1:15,000",
  },
  {
    progress: 0.45,
    scale: 6.8,
    xPercent: 40.8,
    yPercent: 34.2,
    perspective: 900,
    rotateX: 4.5,
    rotateZ: -1.2,
    blurUnselected: 2.5,
    label: "LOKHANDWALA & VEERA DESAI SECTOR",
    stageName: "04 — NEIGHBOURHOOD",
    cartoScale: "1:4,000",
  },
  {
    progress: 0.60,
    scale: 11.5,
    xPercent: 39.6,
    yPercent: 32.7,
    perspective: 800,
    rotateX: 5.5,
    rotateZ: -1.5,
    blurUnselected: 3.5,
    label: "OFF LINK ROAD — SITE VICINITY",
    stageName: "05 — PROJECT VICINITY",
    cartoScale: "1:1,000",
  },
  {
    progress: 0.75,
    scale: 16.5,
    xPercent: 39.3,
    yPercent: 32.2,
    perspective: 750,
    rotateX: 6.0,
    rotateZ: -1.8,
    blurUnselected: 4.0,
    label: "JAMMING STUDIO — SITE PLOT 42",
    stageName: "06 — PROJECT LOCATION",
    cartoScale: "1:250",
  },
  {
    progress: 0.90,
    scale: 22.0,
    xPercent: 39.2,
    yPercent: 32.0,
    perspective: 700,
    rotateX: 4.0,
    rotateZ: -0.8,
    blurUnselected: 5.0,
    label: "SPATIAL APERTURE TRANSITION",
    stageName: "07 — ARCHITECTURE TRANSITION",
    cartoScale: "1:50",
  },
  {
    progress: 1.00,
    scale: 26.0,
    xPercent: 39.2,
    yPercent: 32.0,
    perspective: 600,
    rotateX: 0,
    rotateZ: 0,
    blurUnselected: 6.0,
    label: "INTERIOR ACOUSTIC SPACE",
    stageName: "08 — ARCHITECTURAL SPACE",
    cartoScale: "1:1",
  }
];

export const URBAN_TRACTION_IMAGES: readonly ProjectImage[] = [
  { id: 'URBAN_TRACTION_01_KEY_MASTERPLAN', imageUrl: '/projects/urban-traction/URBAN_TRACTION_01_KEY_MASTERPLAN.png', caption: '01 — Overall Vision / Key Masterplan' },
  { id: 'URBAN_TRACTION_02_EXISTING_PROPOSED', imageUrl: '/projects/urban-traction/URBAN_TRACTION_02_EXISTING_PROPOSED.png', caption: '02 — Street Transformation / Existing → Proposed' },
  { id: 'URBAN_TRACTION_03_EXISTING_PROPOSED', imageUrl: '/projects/urban-traction/URBAN_TRACTION_03_EXISTING_PROPOSED.png', caption: '03 — Public Realm Transformation / Existing → Proposed' },
];

export const URBAN_TRACTION_SCROLL_IMAGES: readonly string[] = [
  '/projects/urban-traction/URBAN_TRACTION_01_PROPOSED_PUBLIC_REALM.png',
  '/projects/urban-traction/URBAN_TRACTION_02_EXISTING_STREET.png',
  '/projects/urban-traction/URBAN_TRACTION_03_PROPOSED_BOULEVARD.png',
  '/projects/urban-traction/URBAN_TRACTION_04_EXISTING_BOULEVARD.png',
];

export const TEDX_GATEWAY_IMAGES: readonly ProjectImage[] = [
  { id: 'TEDX_GATEWAY_01_FINAL_STAGE', imageUrl: '/projects/tedx-gateway/TEDX_GATEWAY_01_FINAL_STAGE.png', caption: 'FINAL STAGE / Dynamic tessellated backdrop and lighting experience.' },
  { id: 'TEDX_GATEWAY_02_DESIGN_FABRICATION', imageUrl: '/projects/tedx-gateway/TEDX_GATEWAY_02_DESIGN_FABRICATION.png', caption: 'DESIGN + FABRICATION / 15 modular panels developed as a coordinated system for fabrication, transportation and on-site assembly.' },
];

export const CATALYST_IMAGES: readonly ProjectImage[] = [
  { id: 'CATALYST_01_MASTERPLAN', imageUrl: '/projects/catalyst/CATALYST_01_MASTERPLAN.png', caption: '01 — Proposed neighbourhood masterplan' },
  { id: 'CATALYST_02_DESIGN_INTENT', imageUrl: '/projects/catalyst/CATALYST_02_DESIGN_INTENT.png', caption: '02 — Design intent diagrams' },
];

export const MITHCHOWKI_TRANSFORMATION_IMAGES: readonly ProjectImage[] = [
  { id: 'MITHCHOWKI_TRANSFORMATION_01', imageUrl: '/projects/mithchowki-transformation/MITHCHOWKI_TRANSFORMATION_01.png', caption: '01 — Junction transformation' },
];

export const LOOP_IMAGES: readonly ProjectImage[] = [
  { id: 'LOOP_01_VISION', imageUrl: '/projects/loop/LOOP_01_VISION.png', caption: '01 — Neighbourhood vision' },
];

export const PROJECTS_REGISTRY: ProjectLocation[] = [
  {
    id: 'green-catalyst', title: 'CATALYST', subtitle: 'Mixed Use Development', client: 'GREEN CATALYST DEVELOPMENT', category: 'Mixed Use Development', year: '2024', area: 'Vancouver', city: 'Canada',
    coords: { lat: '49°16\'42.0"N', lng: '123°06\'52.0"W', x: 760, y: 350 }, highlightArea: 'Vancouver',
    description: 'A mixed-use urban development that connects landscape, living, and public life through layered green infrastructure.', heroImage: CATALYST_IMAGES[0].imageUrl, galleryImages: CATALYST_IMAGES, camera: { targetScale: 3.4, targetX: 76, targetY: 35 },
  },
  {
    id: 'loop', title: 'LOOP', subtitle: 'Neighbourhood Planning and Design', client: 'LOOP PLANNING COLLECTIVE', category: 'Neighbourhood Planning & Design', year: '2024', area: 'Victoria', city: 'Canada',
    coords: { lat: '48°25\'13.0"N', lng: '123°21\'43.0"W', x: 520, y: 245 }, highlightArea: 'Victoria',
    description: 'A connected neighbourhood framework that turns James Bay into a resilient socio-cultural hub through mobility, commercial, and green corridors.', heroImage: LOOP_IMAGES[0].imageUrl, galleryImages: LOOP_IMAGES, focus: 'Mobility Corridor · Commercial Corridor · Green Corridor · Eco-tourism · Community Interaction', camera: { targetScale: 2.8, targetX: 52, targetY: 25 },
  },
  {
    id: 'urban-traction', title: 'URBAN TRACTION', subtitle: 'Urban Design / Masterplanning', client: 'GRANDVIEW WOODLAND', category: 'Urban Design / Masterplanning', year: '2023', area: 'Grandview Woodland, Vancouver', city: 'Canada',
    coords: { lat: '49°16\'48.0"N', lng: '123°04\'46.0"W', x: 790, y: 455 }, highlightArea: 'Grandview Woodland',
    description: 'A transformation strategy that reimagines the existing urban fabric through connected streets, public space, green infrastructure, mobility and mixed-use development.', heroImage: URBAN_TRACTION_IMAGES[0].imageUrl, galleryImages: URBAN_TRACTION_IMAGES, focus: 'Urban Transformation · Streetscape · Public Realm · Green Infrastructure · Mobility · Mixed-Use Development', camera: { targetScale: 3.5, targetX: 79, targetY: 45 },
  },
  {
    id: 'student-community-centre', title: 'STUDENT COMMUNITY CENTRE', subtitle: 'Institute Design', client: 'BHAVANS CAMPUS', category: 'Institute Design', year: '2024', area: 'Andheri', city: 'Mumbai, India',
    coords: { lat: '19°07\'37.0"N', lng: '72°50\'03.0"E', x: 470, y: 570 }, highlightArea: 'Bhavans Campus',
    description: 'A campus commons designed as an adaptable social heart for student learning, gathering, and creative exchange.', heroImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2400&q=90', camera: { targetScale: 3, targetX: 47, targetY: 57 },
  },
  {
    id: 'tedx-gateway', title: 'TEDx GATEWAY STAGE DESIGN', subtitle: 'Stage Design / Fabrication', client: 'TEDx GATEWAY', category: 'Stage Design / Fabrication', year: '2023', area: 'Mumbai', city: 'India',
    coords: { lat: '18°55\'38.0"N', lng: '72°49\'15.0"E', x: 355, y: 670 }, highlightArea: 'Mumbai',
    description: 'A dynamic and free-flowing stage design inspired by tessellations, creating an undulating backdrop that represents the free flow of ideas.', heroImage: TEDX_GATEWAY_IMAGES[0].imageUrl, galleryImages: TEDX_GATEWAY_IMAGES, focus: '60-foot-long stage · 15 modular 4-foot partitions · Wood + MDF framework · Central back-projection screen · 3-day on-site assembly and finishing · Dynamic colored lighting', camera: { targetScale: 2.7, targetX: 35, targetY: 67 },
  },
  {
    id: 'mithchowki-transformation', title: 'MITHCHOWKI TRANSFORMATION', subtitle: 'Street Design', client: 'MALAD STREET INITIATIVE', category: 'Street Design', year: '2024', area: 'Malad Mithchowki Junction', city: 'Mumbai, India',
    coords: { lat: '19°11\'33.0"N', lng: '72°50\'06.0"E', x: 610, y: 520 }, highlightArea: 'Mithchowki Junction',
    description: 'A street transformation that rebalances a busy junction around safer movement, shade, and public life.', heroImage: MITHCHOWKI_TRANSFORMATION_IMAGES[0].imageUrl, galleryImages: MITHCHOWKI_TRANSFORMATION_IMAGES, camera: { targetScale: 3.2, targetX: 61, targetY: 52 },
  },
];

export const LEGACY_PROJECTS_REGISTRY: ProjectLocation[] = [
  {
    id: "jamming-studio",
    title: "JAMMING STUDIO",
    subtitle: "Interior / Acoustic Design",
    client: "Parthiv Gohil",
    category: "Interior / Acoustic Design",
    year: "2024",
    area: "Andheri West",
    city: "Mumbai",
    coords: {
      lat: "19°08'22.4\"N",
      lng: "72°49'51.2\"E",
      x: 392, // SVG coordinate space (out of 1000)
      y: 320,
    },
    highlightArea: "Andheri West",
    description: "A high-performance acoustic studio designed as a vibrant creative environment. Layered acoustic panels, bold geometric color-blocking, integrated lighting, and technical infrastructure transform the space into a functional yet expressive setting for musical creation.",
    heroImage: JAMMING_STUDIO_IMAGES.hero,
    camera: {
      targetScale: 16.5,
      targetX: 39.3,
      targetY: 32.2,
    }
  },
  {
    id: "tedx-gateway",
    title: "TEDx GATEWAY PAVILION",
    subtitle: "Temporary Ephemeral Amphitheater & Spatial Scenography",
    client: "TEDx INDIA",
    category: "Civic / Scenography",
    year: "2023",
    area: "Nariman Point",
    city: "Mumbai",
    coords: {
      lat: "18°55'38.1\"N",
      lng: "72°49'14.6\"E",
      x: 480,
      y: 840,
    },
    highlightArea: "South Mumbai",
    description: "A cantilevered wooden acoustic shell engineered for 2,500 simultaneous listeners, framed against the Arabian Sea shoreline.",
    heroImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2400&q=90",
    camera: {
      targetScale: 12.0,
      targetX: 48.0,
      targetY: 84.0,
    }
  },
  {
    id: "housing-one",
    title: "HOUSING ONE — CATALYST",
    subtitle: "Modular High-Density Timber Residential Prototype",
    client: "URBAN METROPOLIS FOUNDATION",
    category: "Residential Architecture",
    year: "2024",
    area: "Bandra West",
    city: "Mumbai",
    coords: {
      lat: "19°03'14.0\"N",
      lng: "72°49'48.0\"E",
      x: 440,
      y: 530,
    },
    highlightArea: "Bandra Reclamation",
    description: "A bioclimatic mass-timber residential cluster featuring porous breeze corridors, stepped communal sky terraces, and integrated rainwater collection.",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90",
    camera: {
      targetScale: 13.0,
      targetX: 44.0,
      targetY: 53.0,
    }
  },
  {
    id: "urban-traction",
    title: "URBAN TRACTION CIVIC HUB",
    subtitle: "Intermodal Transit Canopy & Public Landscape",
    client: "MMRDA METRO INFRASTRUCTURE",
    category: "Infrastructure / Public Space",
    year: "2023",
    area: "Bandra Kurla Complex",
    city: "Mumbai",
    coords: {
      lat: "19°04'05.2\"N",
      lng: "72°52'11.8\"E",
      x: 580,
      y: 490,
    },
    highlightArea: "BKC",
    description: "A dynamic tensile membrane roof connecting metro line interchanges with an elevated 3-hectare urban botanical canopy.",
    heroImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2400&q=90",
    camera: {
      targetScale: 13.5,
      targetX: 58.0,
      targetY: 49.0,
    }
  }
];
