import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const mobileQuery = '(max-width: 760px)';
const portraitMobileQuery = '(max-width: 760px) and (orientation: portrait)';
const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

function getHomeFilmSource() {
  if (!window.matchMedia(mobileQuery).matches) return '/media/updated_video_images_1-13.mp4';
  if (window.matchMedia(portraitMobileQuery).matches) {
    return '/media/mobile_user_vidoes/mobile-1080.mp4';
  }

  const effectiveScreenWidth = window.screen.width * window.devicePixelRatio;
  return effectiveScreenWidth <= 600
    ? '/media/mobile_user_vidoes/mobile_480p_16x9.mp4'
    : '/media/mobile_user_vidoes/mobile-720.mp4';
}

gsap.registerPlugin(ScrollTrigger);

export function HomeFilm() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(mobileQuery).matches);
  const [isPortraitMobile, setIsPortraitMobile] = useState(() => window.matchMedia(portraitMobileQuery).matches);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => window.matchMedia(reducedMotionQuery).matches);
  const [filmSource, setFilmSource] = useState(getHomeFilmSource);
  const spacerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const filmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mobileMedia = window.matchMedia(mobileQuery);
    const portraitMobileMedia = window.matchMedia(portraitMobileQuery);
    const reducedMotionMedia = window.matchMedia(reducedMotionQuery);
    const updateMobile = () => setIsMobile(mobileMedia.matches);
    const updatePortraitMobile = () => setIsPortraitMobile(portraitMobileMedia.matches);
    const updateReducedMotion = () => setPrefersReducedMotion(reducedMotionMedia.matches);
    const updateFilmSource = () => setFilmSource(getHomeFilmSource());

    updateMobile();
    updatePortraitMobile();
    updateReducedMotion();
    mobileMedia.addEventListener('change', updateMobile);
    portraitMobileMedia.addEventListener('change', updatePortraitMobile);
    reducedMotionMedia.addEventListener('change', updateReducedMotion);
    window.addEventListener('resize', updateFilmSource);
    window.addEventListener('orientationchange', updateFilmSource);
    return () => {
      mobileMedia.removeEventListener('change', updateMobile);
      portraitMobileMedia.removeEventListener('change', updatePortraitMobile);
      reducedMotionMedia.removeEventListener('change', updateReducedMotion);
      window.removeEventListener('resize', updateFilmSource);
      window.removeEventListener('orientationchange', updateFilmSource);
    };
  }, []);

  useEffect(() => {
    const spacer = spacerRef.current;
    const film = filmRef.current;
    if (!spacer || !film || prefersReducedMotion) return;

    const context = gsap.context(() => {
      gsap.to(film, {
        scale: 1.05,
        opacity: 0.85,
        ease: 'none',
        scrollTrigger: { trigger: spacer, start: 'top top', end: 'bottom top', scrub: true },
      });
    });
    return () => context.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    const spacer = spacerRef.current;
    const video = videoRef.current;
    if (!spacer || !video || prefersReducedMotion) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play().catch(() => undefined);
      else video.pause();
    }, { threshold: 0 });
    observer.observe(spacer);
    return () => observer.disconnect();
  }, [filmSource, isMobile, prefersReducedMotion]);

  const mediaClassName = isPortraitMobile ? 'h-full w-full object-contain' : 'h-full w-full object-cover';
  const film = (
    <div ref={filmRef} className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-white [height:100svh]" style={{ transformOrigin: 'center center' }} aria-hidden="true">
      {prefersReducedMotion ? (
        <div className="h-full w-full bg-white" />
      ) : (
        <video ref={videoRef} key={filmSource} muted loop playsInline preload="none" className={mediaClassName}>
          <source src={filmSource} type="video/mp4" />
        </video>
      )}
    </div>
  );

  return <>{createPortal(film, document.body)}<section ref={spacerRef} aria-label="ADV — Architect Deep Vora" className="h-screen w-full bg-transparent [height:100svh]" /></>;
}
