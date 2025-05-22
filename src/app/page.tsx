"use client";

import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import { Suspense } from 'react';
import HomePageSchema from './page-schema';

// Dynamically import components that are not needed for initial page render
const Services = dynamic(() => import('../components/Services'), { 
  loading: () => <div style={{ minHeight: '300px' }}></div>,
  ssr: true
});

const Catalogue = dynamic(() => import('../components/Catalogue').then(mod => ({ default: mod.Catalogue })), {
  loading: () => <div style={{ minHeight: '300px' }}></div>,
  ssr: true
});

const About = dynamic(() => import('../components/About'), {
  loading: () => <div style={{ minHeight: '300px' }}></div>,
  ssr: true
});

export default function Home() {
  return (
    <Layout>
      <HomePageSchema />
      <Hero
        title="Power Your Future with Solar City Solutions"
        subtitle="Premium solar energy systems for homes and businesses across India"
        ctaText="Get a Free Quote"
        ctaLink="/quotation"
      />
      <Suspense fallback={<div style={{ minHeight: '300px' }}></div>}>
        <div id="services">
          <Services />
        </div>
      </Suspense>
      <Suspense fallback={<div style={{ minHeight: '300px' }}></div>}>
        <div id="solutions">
          <Catalogue />
        </div>
      </Suspense>
      <Suspense fallback={<div style={{ minHeight: '300px' }}></div>}>
        <div id="about">
          <About />
        </div>
      </Suspense>
    </Layout>
  );
}
