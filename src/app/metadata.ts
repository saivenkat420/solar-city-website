import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solar City - Power Your Future with Clean Energy',
  description: 'Solar City provides affordable solar solutions for homes and businesses. Reduce your electricity bills and carbon footprint with our expert installation services.',
  keywords: ['solar panels', 'solar energy', 'renewable energy', 'home solar', 'business solar', 'solar installation', 'energy savings', 'green energy', 'clean power'],
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Solar City - Power Your Future with Clean Energy',
    description: 'Solar City provides affordable solar solutions for homes and businesses. Reduce your electricity bills and carbon footprint.',
    url: 'https://solarcity.com',
    siteName: 'Solar City',
    images: [
      {
        url: '/solar-city-hero-page-md-img.jpg',
        width: 1200,
        height: 630,
        alt: 'Solar City - Renewable Energy Solutions'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solar City - Power Your Future with Clean Energy',
    description: 'Solar City provides affordable solar solutions for homes and businesses',
    images: ['/solar-city-hero-page-md-img.jpg'],
  }
}; 