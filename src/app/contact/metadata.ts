import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Solar City Solutions | Solar Energy Experts in India',
  description: 'Get in touch with Solar City Solutions for professional solar installation, maintenance, or consultations. Our solar energy experts are ready to help you harness the power of the sun.',
  keywords: ['solar contact India', 'solar energy experts', 'solar installation contact', 'solar maintenance India', 'solar consultation', 'solar city solutions contact', 'solar panel helpline', 'solar energy support'],
  alternates: {
    canonical: 'https://www.solarcitysolutions.in/contact'
  },
  openGraph: {
    title: 'Contact Solar City Solutions | Solar Energy Experts in India',
    description: 'Reach out to our team of solar energy experts for installation, maintenance or consultation services across India.',
    url: 'https://www.solarcitysolutions.in/contact',
    images: [
      {
        url: '/solar-contact-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Solar City Solutions - Contact Our Solar Experts'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Solar City Solutions | Solar Energy Experts',
    description: 'Reach out to our team of solar energy experts for installation, maintenance or consultation services.',
    images: ['/solar-contact-og-image.jpg']
  }
}; 