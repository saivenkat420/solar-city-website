import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
  colorScheme: 'light',
}

export const metadata: Metadata = {
  title: {
    template: '%s | Solar City - Power Your Future',
    default: 'Solar City - Power Your Future'
  },
  description: "High-quality, affordable solar solutions for homes and businesses. Reduce your energy costs and carbon footprint with Solar City.",
  keywords: ['solar panels', 'renewable energy', 'solar installation', 'energy savings', 'home solar', 'business solar', 'clean energy', 'green power'],
  authors: [{ name: 'Solar City' }],
  creator: 'Solar City',
  publisher: 'Solar City',
  metadataBase: new URL('https://solarcity.com'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Solar City - Power Your Future',
    description: 'High-quality, affordable solar solutions for homes and businesses. Reduce your energy costs and carbon footprint.',
    url: 'https://solarcity.com',
    siteName: 'Solar City',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/solar-city-hero-page-md-img.jpg',
        width: 1200,
        height: 630,
        alt: 'Solar City - Renewable Energy Solutions'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solar City - Power Your Future',
    description: 'High-quality, affordable solar solutions for homes and businesses',
    images: ['/solar-city-hero-page-md-img.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
