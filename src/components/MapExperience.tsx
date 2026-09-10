import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MAP_CAMERA_STAGES, PROJECTS_REGISTRY, type ProjectLocation } from '../data/mapConfig';
import { Compass, Navigation, Volume2, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface MapExperienceProps {
  onProjectSelect?: (project: ProjectLocation) => void;
  selectedProjectId?: string;
}

export const MapExperience: React.FC<MapExperienceProps> = ({
  onProjectSelect,
  selectedProjectId = 'jamming-studio',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const mapViewportRef = useRef<HTMLDivElement>(null);
  const mapLayerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroImgTagRef = useRef<HTMLImageElement>(null);
  const projectOverlayRef = useRef<HTMLDivElement>(null);
  const architecturalMarkerRef = useRef<HTMLDivElement>(null);
  const hudStageRef = useRef<HTMLSpanElement>(null);
  const hudScaleRef = useRef<HTMLSpanElement>(null);
  const hudCoordsRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [currentStageName, setCurrentStageName] = useState("01 — CITY");
  const [currentScaleLabel, setCurrentScaleLabel] = useState("1:75,000");
  const [currentCoords, setCurrentCoords] = useState("19°08'22.4\"N 72°49'51.2\"E");
  const [activeProject, setActiveProject] = useState<ProjectLocation>(
    PROJECTS_REGISTRY.find(p => p.id === selectedProjectId) || PROJECTS_REGISTRY[0]
  );

  useEffect(() => {
    const container = containerRef.current;
    const sticky = stickyRef.current;
    const mapLayer = mapLayerRef.current;
    const heroImage = heroImageRef.current;
    const heroImgTag = heroImgTagRef.current;
    const projectOverlay = projectOverlayRef.current;
    const marker = architecturalMarkerRef.current;
    const progressBar = progressBarRef.current;

    if (!container || !sticky || !mapLayer || !heroImage || !projectOverlay) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Create GSAP ScrollTrigger timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=3800", // 3800px scroll budget for ultra-smooth continuous travel
          pin: sticky,
          scrub: prefersReducedMotion ? 0.2 : 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Update progress bar width
            if (progressBar) {
              progressBar.style.width = `${progress * 100}%`;
            }

            // Determine active stage for HUD telemetry
            const stage = [...MAP_CAMERA_STAGES].reverse().find(s => progress >= s.progress) || MAP_CAMERA_STAGES[0];
            if (stage) {
              setCurrentStageName(stage.stageName);
              setCurrentScaleLabel(stage.cartoScale);
            }
          }
        }
      });

      if (prefersReducedMotion) {
        // Simplified accessible timeline
        tl.to(mapLayer, { opacity: 0.3, duration: 0.7 })
          .to(heroImage, { opacity: 1, duration: 0.3 }, "-=0.2")
          .to(projectOverlay, { opacity: 1, duration: 0.3 });
        return;
      }

      // =========================================================================
      // CINEMATIC CAMERA TRAVEL TIMELINE (0.00 -> 1.00)
      // =========================================================================

      // Initial state
      gsap.set(mapLayer, {
        scale: 1,
        xPercent: 0,
        yPercent: 0,
        transformOrigin: "75% 39%",
        opacity: 1,
        filter: "blur(0px)",
      });

      gsap.set(heroImage, {
        opacity: 0,
        scale: 1.08,
        clipPath: "circle(0% at 39.2% 32.0%)",
      });

      gsap.set(heroImgTag, {
        scale: 1.15,
      });

      gsap.set(projectOverlay, {
        opacity: 0,
        y: 40,
      });

      gsap.set(marker, {
        opacity: 0,
        scale: 0.5,
      });

      // -------------------------------------------------------------------------
      // STAGE 01 -> 02: CITY TO APPROACH (0.00 -> 0.20)
      // -------------------------------------------------------------------------
      tl.to(mapLayer, {
        scale: 1.25,
        x: "-2%",
        y: "-1%",
        ease: "power2.inOut",
        duration: 0.20,
      }, 0);

      // -------------------------------------------------------------------------
      // STAGE 02 -> 03: APPROACH TO ANDHERI WEST (0.20 -> 0.40)
      // -------------------------------------------------------------------------
      tl.to(mapLayer, {
        scale: 1.7,
        x: "-6%",
        y: "-4%",
        ease: "power2.inOut",
        duration: 0.20,
      }, 0.20);

      // -------------------------------------------------------------------------
      // STAGE 03 -> 04: NEIGHBOURHOOD & STREET GRID (0.40 -> 0.60)
      // -------------------------------------------------------------------------
      tl.to(mapLayer, {
        scale: 2.25,
        x: "-10%",
        y: "-7%",
        ease: "power2.inOut",
        duration: 0.20,
      }, 0.40);

      // -------------------------------------------------------------------------
      // STAGE 04 -> 05: PROJECT VICINITY & ARCHITECTURAL PIN (0.55 -> 0.75)
      // -------------------------------------------------------------------------
      tl.to(mapLayer, {
        scale: 3,
        x: "-14%",
        y: "-9%",
        ease: "power2.out",
        duration: 0.20,
      }, 0.60);

      // Architectural Marker reveal (Dot -> Line -> Text)
      tl.to(marker, {
        opacity: 1,
        scale: 1,
        ease: "back.out(1.7)",
        duration: 0.12,
      }, 0.62);

      // -------------------------------------------------------------------------
      // STAGE 05 -> 06: MASKED ARCHITECTURE DISSOLVE (0.75 -> 0.92)
      // -------------------------------------------------------------------------
      // Map continues forward motion while softening
      tl.to(mapLayer, {
        scale: 3.8,
        x: "-18%",
        y: "-12%",
        opacity: 0.15,
        filter: "blur(6px)",
        ease: "power1.inOut",
        duration: 0.18,
      }, 0.75);

      // Marker fades out gracefully as image arrives
      tl.to(marker, {
        opacity: 0,
        scale: 1.3,
        ease: "power1.in",
        duration: 0.08,
      }, 0.78);

      // Hero image expands via radial aperture mask centered at Plot 42
      tl.to(heroImage, {
        opacity: 1,
        clipPath: "circle(150% at 39.2% 32.0%)",
        ease: "power2.inOut",
        duration: 0.20,
      }, 0.76);

      // Settle hero photo scale from 1.15 to 1.00 (arrival feel)
      tl.to(heroImgTag, {
        scale: 1.00,
        ease: "power2.out",
        duration: 0.24,
      }, 0.76);

      // Map fully dissolves
      tl.to(mapLayer, {
        opacity: 0,
        duration: 0.08,
      }, 0.90);

      // -------------------------------------------------------------------------
      // STAGE 07 -> 08: FULL ARCHITECTURAL TITLE & METADATA (0.88 -> 1.00)
      // -------------------------------------------------------------------------
      tl.to(projectOverlay, {
        opacity: 1,
        y: 0,
        ease: "power3.out",
        duration: 0.14,
      }, 0.86);

    }, container);

    return () => ctx.revert();
  }, [activeProject]);

  const handleProjectSwitch = (proj: ProjectLocation) => {
    setActiveProject(proj);
    setCurrentCoords(`${proj.coords.lat} ${proj.coords.lng}`);
    if (onProjectSelect) onProjectSelect(proj);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#fcfbf9] text-[#121212]"
      style={{ height: "420vh" }}
    >
      {/* Sticky Viewport Container */}
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between"
      >
        {/* ===================================================================== */}
        {/* HUD TELEMETRY BAR: TOP */}
        {/* ===================================================================== */}
        <div className="relative z-40 w-full px-6 md:px-12 pt-6 pb-4 flex items-center justify-between pointer-events-auto border-b border-black/[0.04] bg-[#fcfbf9]/80 backdrop-blur-md">
          {/* Left: Studio & Cartography Title */}
          <div className="flex items-center space-x-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#111111] animate-pulse" />
            <div>
              <div className="text-[10px] md:text-xs font-mono-tech tracking-[0.2em] text-[#666660] uppercase">
                SPATIAL RECONNAISSANCE
              </div>
              <h2 className="text-sm md:text-base font-semibold tracking-tight text-[#111111]">
                URBAN ARCHITECTURAL CARTOGRAPHY
              </h2>
            </div>
          </div>

          {/* Center: Stage Indicator */}
          <div className="hidden lg:flex items-center space-x-6 px-4 py-1.5 rounded-full border border-black/[0.08] bg-white/60 shadow-xs">
            <div className="flex items-center space-x-2">
              <Compass className="w-3.5 h-3.5 text-[#111111] animate-spin" style={{ animationDuration: '24s' }} />
              <span
                ref={hudStageRef}
                className="text-xs font-mono-tech font-medium tracking-wider text-[#111111]"
              >
                {currentStageName}
              </span>
            </div>
            <div className="w-[1px] h-3 bg-black/[0.1]" />
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono-tech text-[#888880]">SCALE</span>
              <span
                ref={hudScaleRef}
                className="text-xs font-mono-tech font-bold text-[#111111]"
              >
                {currentScaleLabel}
              </span>
            </div>
          </div>

          {/* Right: Coordinates Tracker & Project Indicator */}
          <div className="flex items-center space-x-4 text-right">
            <div className="hidden sm:block">
              <div className="text-[10px] font-mono-tech tracking-wider text-[#888880]">
                TARGET DATUM
              </div>
              <div
                ref={hudCoordsRef}
                className="text-xs font-mono-tech font-semibold text-[#111111]"
              >
                {currentCoords}
              </div>
            </div>
            <div className="w-9 h-9 rounded-full border border-black/[0.08] bg-white/80 flex items-center justify-center shadow-xs">
              <Navigation className="w-4 h-4 text-[#111111]" />
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* CORE SPATIAL VIEWPORT: MAP & CAMERA LAYERS */}
        {/* ===================================================================== */}
        <div
          ref={mapViewportRef}
          className="relative flex-1 w-full h-full overflow-hidden flex items-center justify-center bg-[#fbfaf7]"
        >
          {/* Layer 0: Map Vector Canvas */}
          <div
            ref={mapLayerRef}
            className="absolute inset-0 w-full h-full will-change-transform flex items-center justify-center"
            style={{ transformOrigin: "75% 39%" }}
          >
            <div className="relative h-full w-full" style={{ perspective: '900px' }}>
              <img
                src="/vancouver-cartography.png"
                alt="Vancouver urban cartography"
                className="h-full w-full object-contain select-none pointer-events-none"
                draggable={false}
              />
              {PROJECTS_REGISTRY.map((project, index) => {
                const isActive = project.id === activeProject.id;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => handleProjectSwitch(project)}
                    aria-pressed={isActive}
                    aria-label={`View ${project.title}`}
                    data-cursor="VIEW PROJECT"
                    className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                    style={{ left: `${project.coords.x / 10}%`, top: `${project.coords.y / 10}%` }}
                  >
                    <span
                      className={`relative block h-7 w-7 border border-black/35 transition-transform duration-500 ${isActive ? 'bg-[#d9381e] shadow-[0_18px_20px_rgba(0,0,0,0.28)]' : 'bg-[#222222] shadow-[0_10px_12px_rgba(0,0,0,0.2)] group-hover:bg-[#d9381e]'}`}
                      style={{ transform: `rotateX(58deg) rotateZ(-45deg) translateZ(${isActive ? 18 : 6}px)` }}
                    >
                      <span className="absolute -left-2 top-full h-3 w-7 origin-top -skew-x-[45deg] bg-black/55" />
                      <span className="absolute left-full top-2 h-7 w-3 origin-left -skew-y-[45deg] bg-black/35" />
                      <span className="absolute inset-0 border border-white/35" />
                    </span>
                    <span className={`absolute left-5 top-[-28px] whitespace-nowrap rounded-sm border px-2 py-1 font-mono-tech text-[9px] font-bold tracking-wider transition-all duration-300 ${isActive ? 'border-black bg-black text-white opacity-100' : 'border-black/15 bg-white/90 text-black opacity-0 group-hover:opacity-100'}`}>
                      {String(index + 1).padStart(2, '0')} · {project.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Layer 1: Floating Architectural Marker (Appears during Stage 05-06) */}
          <div
            ref={architecturalMarkerRef}
            className="absolute z-20 pointer-events-none flex flex-col items-center"
            style={{
              left: `${activeProject.coords.x / 10}%`,
              top: `${activeProject.coords.y / 10}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Pulsing focal beacon */}
            <div className="relative flex items-center justify-center">
              <div className="absolute w-12 h-12 rounded-full border border-[#111111]/30 animate-ping" />
              <div className="w-4 h-4 rounded-full bg-[#111111] border-2 border-white shadow-lg" />
            </div>
            
            {/* Vertical leader line */}
            <div className="w-[1px] h-10 bg-linear-to-b from-[#111111] to-transparent my-1" />

            {/* Architectural Callout Card */}
            <div className="bg-white/95 backdrop-blur-md border border-black/10 px-4 py-2.5 rounded-lg shadow-xl text-center min-w-[200px]">
              <span className="inline-block px-2 py-0.5 rounded-full bg-black text-white text-[9px] font-mono-tech tracking-wider uppercase mb-1">
                LOCATION CONFIRMED
              </span>
              <h4 className="text-xs font-bold tracking-tight text-[#111111]">
                {activeProject.title}
              </h4>
              <p className="text-[10px] font-mono-tech text-[#666660]">
                {activeProject.area}, {activeProject.city}
              </p>
            </div>
          </div>

          {/* Layer 2: Masked Project Hero Reveal (Destination Arrival) */}
          <div
            ref={heroImageRef}
            className="absolute inset-0 w-full h-full z-30 pointer-events-none will-change-transform overflow-hidden bg-black"
          >
            <img
              ref={heroImgTagRef}
              src={activeProject.heroImage}
              alt={activeProject.title}
              className="w-full h-full object-cover will-change-transform opacity-90"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/30" />
          </div>

          {/* Layer 3: Project Title & Information Overlay */}
          <div
            ref={projectOverlayRef}
            className="absolute inset-0 z-40 pointer-events-none flex flex-col justify-end p-8 md:p-16 lg:p-24 text-white"
          >
            <div className="max-w-4xl">
              <div className="flex items-center space-x-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono-tech tracking-widest uppercase">
                  {activeProject.category}
                </span>
                <span className="text-xs font-mono-tech text-white/70">
                  {activeProject.year}
                </span>
                <span className="text-xs font-mono-tech text-white/50">•</span>
                <span className="text-xs font-mono-tech text-white/70">
                  {activeProject.area}
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-3">
                {activeProject.title}
              </h1>

              <div className="text-lg md:text-2xl font-light text-white/80 mb-6 tracking-wide">
                CLIENT: <span className="font-semibold text-white">{activeProject.client}</span> — {activeProject.area}, {activeProject.city}
              </div>

              <p className="text-sm md:text-base text-white/70 font-normal leading-relaxed max-w-2xl mb-8">
                {activeProject.description}
              </p>

              <div className="flex items-center space-x-4 pointer-events-auto">
                <a
                  href="#project-narrative"
                  className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase flex items-center space-x-2 hover:bg-neutral-200 transition-all duration-300 shadow-lg group cursor-pointer"
                >
                  <span>EXPLORE 10-IMAGE SPATIAL NARRATIVE</span>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                </a>

                <div className="hidden sm:flex items-center space-x-3 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono-tech text-white/80">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>CALIBRATED ACOUSTIC ARCHITECTURE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* HUD BOTTOM BAR: CONTROLS & PROJECT SELECTOR */}
        {/* ===================================================================== */}
        <div className="relative z-40 w-full px-6 md:px-12 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-black/[0.04] bg-[#fcfbf9]/85 backdrop-blur-md pointer-events-auto gap-4">
          {/* Scroll instruction indicator */}
          <div className="flex items-center space-x-3">
            <div className="w-5 h-8 rounded-full border border-black/20 flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-[#111111] animate-bounce" />
            </div>
            <div className="text-[11px] font-mono-tech text-[#666660]">
              SCROLL TO TRAVEL THROUGH CITY → ARCHITECTURAL SPACE
            </div>
          </div>

          {/* Multi-Project Selector Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
            {PROJECTS_REGISTRY.map((proj) => {
              const isActive = proj.id === activeProject.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => handleProjectSwitch(proj)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-mono-tech tracking-wider uppercase transition-all duration-300 flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#111111] text-white shadow-xs font-medium'
                      : 'bg-black/[0.04] hover:bg-black/[0.08] text-[#555550]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-black/30'}`} />
                  <span>{proj.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Global Scroll Progress Line */}
        <div className="w-full h-[2px] bg-black/[0.06] relative">
          <div
            ref={progressBarRef}
            className="absolute top-0 left-0 h-full bg-[#111111] transition-all duration-75"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </div>
  );
};
