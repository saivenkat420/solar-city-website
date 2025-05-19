import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get a Free Solar Installation Quotation',
  description: 'Request a free, no-obligation quote for solar panel installation for your home or business. Find out how much you can save with Solar City.',
  keywords: ['solar quote', 'solar panel cost', 'solar installation quote', 'free solar quote', 'solar energy savings'],
  alternates: {
    canonical: '/quotation'
  },
  openGraph: {
    title: 'Get a Free Solar Installation Quotation | Solar City',
    description: 'Request a free, no-obligation quote for solar panel installation for your home or business. Find out how much you can save.',
    url: 'https://solarcity.com/quotation',
    images: [
      {
        url: '/solar-city-hero-page-md-img.jpg',
        width: 1200,
        height: 630,
        alt: 'Solar City - Quotation Page'
      }
    ]
  }
}; 