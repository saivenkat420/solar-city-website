import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solar City Solutions - Premium Solar Energy Systems in India',
  description: 'Solar City Solutions offers affordable solar panel installation for homes and businesses across India. Save up to 90% on electricity bills with our expert solar solutions.',
  keywords: ['solar panels', 'solar energy', 'renewable energy', 'solar installation India', 'commercial solar', 'residential solar', 'solar inverters', 'solar battery', 'solar city solutions', 'green energy India', 'clean power', 'solar ROI', 'solar tax benefits', 'solar EPC', 'solar consultancy'],
  alternates: {
    canonical: 'https://www.solarcitysolutions.in'
  },
  authors: [{ name: 'Solar City Solutions' }],
  metadataBase: new URL('https://www.solarcitysolutions.in'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Solar City Solutions - Premium Solar Energy Systems in India',
    description: 'Transform your energy consumption with Solar City Solutions. Professional solar panel installation, maintenance, and energy consulting services.',
    url: 'https://www.solarcitysolutions.in',
    siteName: 'Solar City Solutions',
    images: [
      {
        url: '/solar-city-solutions-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Solar City Solutions - Renewable Energy Systems in India'
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solar City Solutions - Premium Solar Energy Systems in India',
    description: 'Transform your energy consumption with Solar City Solutions. Save up to 90% on electricity bills with professional solar installation.',
    images: ['/solar-city-solutions-og-image.jpg'],
    creator: '@solarcitysolutions',
  },
  verification: {
    google: 'placeholder-for-google-verification-code',
  },
  category: 'renewable energy'
}; 