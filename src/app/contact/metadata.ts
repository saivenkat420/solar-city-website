import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Solar City for inquiries about solar installation, maintenance, or general questions. Our expert team is ready to help you.',
  keywords: ['solar contact', 'solar energy inquiries', 'solar installation help', 'solar consultation', 'solar city contact'],
  alternates: {
    canonical: '/contact'
  },
  openGraph: {
    title: 'Contact Us | Solar City',
    description: 'Get in touch with Solar City for inquiries about solar installation, maintenance, or general questions.',
    url: 'https://solarcity.com/contact',
    images: [
      {
        url: '/solar-city-hero-page-md-img.jpg',
        width: 1200,
        height: 630,
        alt: 'Solar City - Contact Page'
      }
    ]
  }
}; 