"use client";

import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Services from '../components/Services';
import QuotationMaker from '../components/QuotationMaker';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <Layout>
      <Hero
        title="Power Your Future with Solar City"
        subtitle="Affordable solar solutions for homes and businesses"
        ctaText="Get a Free Quote"
        ctaLink="/quotation"
      />
      <Services />
      <QuotationMaker />
      <Contact />
    </Layout>
  );
}
