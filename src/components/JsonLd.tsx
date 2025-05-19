"use client";

import { usePathname } from 'next/navigation';

interface JsonLdProps {
  type: 'Organization' | 'LocalBusiness' | 'WebSite' | 'BreadcrumbList' | 'Product' | 'Service' | 'Article';
  data?: any;
}

export default function JsonLd({ type, data }: JsonLdProps) {
  const pathname = usePathname();
  const baseUrl = 'https://solarcity.com';
  const url = `${baseUrl}${pathname}`;
  
  let jsonLd;
  
  switch(type) {
    case 'Organization':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Solar City',
        url: baseUrl,
        logo: `${baseUrl}/solarcity.svg`,
        sameAs: [
          'https://facebook.com/solarcity',
          'https://twitter.com/solarcity',
          'https://instagram.com/solarcity',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-800-SOLAR',
          contactType: 'customer service',
          availableLanguage: 'English'
        },
        ...data
      };
      break;
      
    case 'LocalBusiness':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Solar City',
        image: `${baseUrl}/solar-city-hero-page-md-img.jpg`,
        '@id': baseUrl,
        url: baseUrl,
        telephone: '+1-800-SOLAR',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '123 Energy Way',
          addressLocality: 'Solar City',
          addressRegion: 'CA',
          postalCode: '90001',
          addressCountry: 'US'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 34.0522,
          longitude: -118.2437
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday'
          ],
          opens: '09:00',
          closes: '17:00'
        },
        ...data
      };
      break;

    case 'WebSite':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Solar City',
        url: baseUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        },
        ...data
      };
      break;
      
    case 'BreadcrumbList':
      const paths = pathname.split('/').filter(Boolean);
      const breadcrumbs = [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: baseUrl
        },
        ...paths.map((path, index) => ({
          '@type': 'ListItem',
          position: index + 2,
          name: path.charAt(0).toUpperCase() + path.slice(1),
          item: `${baseUrl}/${paths.slice(0, index + 1).join('/')}`
        }))
      ];
      
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs,
        ...data
      };
      break;

    default:
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': type,
        ...data
      };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
} 