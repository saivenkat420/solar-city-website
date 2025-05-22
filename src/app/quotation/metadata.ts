import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Solar Calculator & Quotation | Save Up to 90% on Energy Bills',
  description: 'Get an instant, accurate solar quotation for your home or business. Our advanced calculator helps you estimate savings, costs, and ROI for solar panel installation across India.',
  keywords: ['solar quote India', 'solar panel cost calculator', 'solar ROI calculator', 'solar savings calculator', 'free solar quotation', 'solar energy savings', 'rooftop solar calculator', 'solar system price India', 'solar subsidy calculator'],
  alternates: {
    canonical: 'https://www.solarcitysolutions.in/quotation'
  },
  openGraph: {
    title: 'Free Solar Calculator & Quotation | Solar City Solutions India',
    description: 'Calculate your potential solar savings with our free online tool. Get accurate cost estimates, ROI projections, and energy saving calculations for solar installations.',
    url: 'https://www.solarcitysolutions.in/quotation',
    images: [
      {
        url: '/solar-quotation-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Solar City Solutions - Solar Quotation Calculator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Solar Calculator & Quotation | Solar City Solutions India',
    description: 'Calculate your potential solar savings with our free online tool.',
    images: ['/solar-quotation-calculator-og.jpg']
  }
}; 