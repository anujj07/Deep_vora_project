import React from 'react';
// import { HeroProjectCarousel } from './HeroProjectCarousel';
import { HomeFilm } from './HomeFilm';

export const HeroSection: React.FC = () => (
  <section id="index" className="relative z-[1] w-full bg-transparent">
    {/* CAROUSEL DISABLED — replaced by <HomeFilm />. Restore by uncommenting. */}
    {/*
    <figure><HeroProjectCarousel /><figcaption>Design · Construction · Urban Systems</figcaption></figure>
    */}
    <HomeFilm />
  </section>
);
