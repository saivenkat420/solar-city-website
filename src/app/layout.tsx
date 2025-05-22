import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a9f53',
  colorScheme: 'light',
}

export const metadata: Metadata = {
  title: {
    template: '%s | Solar City Solutions - Premium Solar Energy Systems',
    default: 'Solar City Solutions - Premium Solar Energy Systems in India'
  },
  description: "Professional solar installation services across India. Reduce energy costs by up to 90% with our residential, commercial, and industrial solar power solutions.",
  keywords: ['solar panels India', 'solar energy solutions', 'solar installation services', 'energy savings', 'home solar India', 'commercial solar', 'industrial solar', 'solar EPC', 'solar tax benefits', 'solar ROI', 'rooftop solar', 'solar city solutions'],
  authors: [{ name: 'Solar City Solutions' }],
  creator: 'Solar City Solutions',
  publisher: 'Solar City Solutions',
  metadataBase: new URL('https://www.solarcitysolutions.in'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Solar City Solutions - Premium Solar Energy Systems in India',
    description: 'Professional solar installation services across India. Reduce energy costs by up to 90% with our residential, commercial, and industrial solar solutions.',
    url: 'https://www.solarcitysolutions.in',
    siteName: 'Solar City Solutions',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/solar-city-solutions-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Solar City Solutions - Premium Solar Energy Systems in India'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solar City Solutions - Premium Solar Energy Systems in India',
    description: 'Professional solar installation services across India. Reduce energy costs by up to 90% with our residential, commercial, and industrial solar solutions.',
    images: ['/solar-city-solutions-og-image.jpg'],
    creator: '@solarcitysolutions'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    }
  },
  verification: {
    google: 'placeholder-for-google-verification-code',
  },
  category: 'renewable energy'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <Script id="schema-org" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Solar City Solutions",
              "url": "https://www.solarcitysolutions.in",
              "logo": "https://www.solarcitysolutions.in/logo.png",
              "sameAs": [
                "https://www.facebook.com/solarcitysolutions",
                "https://www.instagram.com/solarcitysolutions",
                "https://www.linkedin.com/company/solarcitysolutions",
                "https://twitter.com/solarcitysolutions"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-1234567890",
                "contactType": "customer service",
                "availableLanguage": ["English", "Hindi"]
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "India"
              },
              "description": "Solar City Solutions provides premium solar energy systems for residential, commercial, and industrial applications across India. We offer end-to-end services from consultation to installation and maintenance."
            }
          `}
        </Script>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
