'use client'

import React from 'react';
import Hero from '../components/home/Hero';
import CalendarSignup from '../components/home/CalendarSignup';
import EventsSpotlight from '../components/home/EventsSpotlight';
import AtoutsMaison from '../components/home/AtoutsMaison';
import Testimonials from '../components/home/Testimonials';

/**
 * @param {{
 *   events?: import('../lib/payload-data').FrontendEvent[];
 *   initialIndex?: number;
 *   faits?: ReturnType<typeof import('../data/faits-maison').faitsDeLaSemaine>;
 * }} props
 */
const Home = ({ events = [], initialIndex = 0, faits }) => {
  return (
    <div style={{ width: '100%', background: 'var(--color-dark)' }}>
      <Hero />
      <EventsSpotlight events={events} initialIndex={initialIndex} />
      <AtoutsMaison faits={faits} />
      <Testimonials />
      <CalendarSignup />
    </div>
  );
};

export default Home;
