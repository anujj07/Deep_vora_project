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
  aspectRatio: number;
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
  { id: 'URBAN_TRACTION_01_KEY_MASTERPLAN', imageUrl: '/projects/urban-traction/URBAN_TRACTION_01_KEY_MASTERPLAN.png', aspectRatio: 1.982, caption: '01 — Overall Vision / Key Masterplan' },
  { id: 'URBAN_TRACTION_02_EXISTING_PROPOSED', imageUrl: '/projects/urban-traction/URBAN_TRACTION_02_EXISTING_PROPOSED.png', aspectRatio: 3.244, caption: '02 — Street Transformation / Existing → Proposed' },
  { id: 'URBAN_TRACTION_03_EXISTING_PROPOSED', imageUrl: '/projects/urban-traction/URBAN_TRACTION_03_EXISTING_PROPOSED.png', aspectRatio: 3.166, caption: '03 — Public Realm Transformation / Existing → Proposed' },
];

export const URBAN_TRACTION_SCROLL_IMAGES: readonly string[] = [
  '/projects/urban-traction/URBAN_TRACTION_01_PROPOSED_PUBLIC_REALM.png',
  '/projects/urban-traction/URBAN_TRACTION_02_EXISTING_STREET.png',
  '/projects/urban-traction/URBAN_TRACTION_03_PROPOSED_BOULEVARD.png',
  '/projects/urban-traction/URBAN_TRACTION_04_EXISTING_BOULEVARD.png',
];

export const TEDX_GATEWAY_IMAGES: readonly ProjectImage[] = [
  { id: 'TEDX_GATEWAY_01_FINAL_STAGE', imageUrl: '/projects/tedx-gateway/TEDX_GATEWAY_01_FINAL_STAGE.png', aspectRatio: 2.284, caption: 'FINAL STAGE / Undulating tessellated geometry with integrated colour lighting.' },
  { id: 'TEDX_GATEWAY_02_DESIGN_FABRICATION', imageUrl: '/projects/tedx-gateway/TEDX_GATEWAY_02_DESIGN_FABRICATION.png', aspectRatio: 2.142, caption: 'DESIGN + FABRICATION / 15 modules, approximately 4 feet wide each, developed for fabrication, transport, and on-site assembly.' },
];

export const MITHCHOWKI_TRANSFORMATION_IMAGES: readonly ProjectImage[] = [
  { id: 'MITHCHOWKI_TRANSFORMATION_01', imageUrl: '/projects/mithchowki-transformation/MITHCHOWKI_TRANSFORMATION_01.png', aspectRatio: 1.413, caption: '01 — Junction transformation' },
];

export const LOOP_IMAGES: readonly ProjectImage[] = [
  { id: 'LOOP_01_VISION', imageUrl: '/projects/loop/LOOP_01_VISION.jpg', aspectRatio: 1.413, caption: '01 — Neighbourhood vision' },
];

export const HOUSING_ONE_IMAGES: readonly ProjectImage[] = [
  { id: 'HOUSING_ONE_KEY', imageUrl: '/projects/housing-one/KEY_IMAGE_HOUSING_ONE.JPG', aspectRatio: 2.069, caption: '01 — Housing and greenway framework' },
  { id: 'HOUSING_ONE_STREET', imageUrl: '/projects/housing-one/HOUSING_IMAGE_01.png', aspectRatio: 2.312, caption: '02 — Street-level residential view' },
  { id: 'HOUSING_ONE_LANDSCAPE', imageUrl: '/projects/housing-one/HOUSING_IMAGE_02.png', aspectRatio: 2.375, caption: '03 — Shared landscape and housing view' },
];

export const PROJECTS_REGISTRY: ProjectLocation[] = [
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
    id: 'production-design', title: 'Production Design', subtitle: 'Production / Set Design — Live Music Performance', client: 'PARTHIV GOHIL', category: 'Production / Set Design', year: '2024', area: 'Kutch', city: 'Gujarat, India',
    coords: { lat: '19°07\'37.0"N', lng: '72°50\'03.0"E', x: 470, y: 570 }, highlightArea: 'Kutch, Gujarat',
    description: 'A culturally rooted live-performance set for Parthiv Gohil, drawing on Kutchi-Gujarati visual culture through a circular rangoli floor, carved-timber backdrops, and layered lighting and props.', heroImage: '/projects/production-design/pd_key.png', camera: { targetScale: 3, targetX: 47, targetY: 57 },
  },
  {
    id: 'tedx-gateway', title: 'TEDx Gateway — Stage Design', subtitle: 'Stage / Set Design', client: 'TEDx GATEWAY', category: 'Stage / Set Design', year: '2023', area: 'Mumbai', city: 'India',
    coords: { lat: '18°55\'38.0"N', lng: '72°49\'15.0"E', x: 355, y: 670 }, highlightArea: 'Mumbai',
    description: 'An undulating, tessellated stage concept expressing the free flow of ideas through modular construction, rear projection, and programmable colour lighting.', heroImage: TEDX_GATEWAY_IMAGES[0].imageUrl, galleryImages: TEDX_GATEWAY_IMAGES, focus: '60-foot stage · 15 modules, approximately 4 feet each · Lightweight wood framework with MDF cladding · Rear-projection screen · Plaster-and-paint finish · Programmable colour lighting · Three-day on-site fabrication, assembly, and finishing', camera: { targetScale: 2.7, targetX: 35, targetY: 67 },
  },
  {
    id: 'mithchowki-transformation', title: 'Mith Chowki Junction Transformation', subtitle: 'Urban Road-Safety / Street Redesign', client: 'BLOOMBERG INITIATIVE FOR GLOBAL ROAD SAFETY', category: 'Urban Road-Safety / Street Redesign', year: '2024', area: 'Mith Chowki Junction, Malad', city: 'Mumbai, India',
    coords: { lat: '19°11\'33.0"N', lng: '72°50\'06.0"E', x: 610, y: 520 }, highlightArea: 'Mith Chowki Junction',
    description: 'A safer, more inclusive junction redesign shaped by traffic and road-user analysis, site surveys, inventory mapping, and stakeholder interviews.', heroImage: MITHCHOWKI_TRANSFORMATION_IMAGES[0].imageUrl, galleryImages: MITHCHOWKI_TRANSFORMATION_IMAGES, camera: { targetScale: 3.2, targetX: 61, targetY: 52 },
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
    title: "AFFORDABLE HOUSING",
    subtitle: "Academic Project ? Master of Urban Design, University of British Columbia",
    client: "ACADEMIC PROJECT — UNIVERSITY OF BRITISH COLUMBIA",
    category: "Academic Project / Mixed-Use Affordable Neighbourhood",
    year: "2024",
    area: "Broadway Corridor & Arbutus Greenway",
    city: "Vancouver, BC",
    coords: {
      lat: "19°03'14.0\"N",
      lng: "72°49'48.0\"E",
      x: 440,
      y: 530,
    },
    highlightArea: "Broadway Corridor & Arbutus Greenway",
    description: "An academic proposal for a 100% affordable, pedestrian-first mixed-use neighbourhood, structured by connected green networks, pedestrian routes, and public spaces.",
    heroImage: HOUSING_ONE_IMAGES[0].imageUrl,
    galleryImages: HOUSING_ONE_IMAGES,
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
