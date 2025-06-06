import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Solar City Solutions - Premium Solar Energy Systems',
    short_name: 'Solar City Solutions',
    description: 'Professional solar installation and renewable energy solutions for homes and businesses across India',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1a9f53',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-192-maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    related_applications: [
      {
        platform: 'web',
        url: 'https://www.solarcitysolutions.in'
      }
    ],
    categories: ['business', 'utilities', 'energy', 'sustainability']
  };
} 