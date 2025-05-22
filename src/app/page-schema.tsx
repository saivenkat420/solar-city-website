import Script from 'next/script';

export default function HomePageSchema() {
  return (
    <Script id="homepage-schema" type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Solar City Solutions - Premium Solar Energy Systems in India",
          "description": "Professional solar installation and energy solutions for residential, commercial, and industrial customers across India.",
          "url": "https://www.solarcitysolutions.in",
          "mainEntity": {
            "@type": "Organization",
            "name": "Solar City Solutions",
            "url": "https://www.solarcitysolutions.in",
            "logo": "https://www.solarcitysolutions.in/logo.png",
            "description": "Solar City Solutions provides premium solar energy systems for residential, commercial, and industrial applications across India. We offer end-to-end services from consultation to installation and maintenance.",
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
            }
          },
          "specialAnnouncement": {
            "@type": "SpecialAnnouncement",
            "name": "Government Solar Subsidy Available",
            "text": "Take advantage of up to 40% government subsidy on residential solar installations!",
            "datePosted": "2023-10-01T08:00:00+05:30",
            "expires": "2024-12-31T23:59:59+05:30",
            "category": "https://schema.org/GovernmentBenefitsType",
            "announcementLocation": {
              "@type": "Country",
              "name": "India"
            }
          },
          "mainContentOfPage": {
            "@type": "WebPageElement",
            "isPartOf": {
              "@id": "https://www.solarcitysolutions.in"
            },
            "mainEntityOfPage": "https://www.solarcitysolutions.in",
            "speakable": {
              "@type": "SpeakableSpecification",
              "cssSelector": [".hero-title", ".hero-subtitle", ".about-section"]
            }
          },
          "potentialAction": {
            "@type": "Action",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://www.solarcitysolutions.in/quotation"
            },
            "name": "Get a Free Solar Quote"
          },
          "awards": "Best Solar Solution Provider in India 2023",
          "keywords": "solar panels, solar energy, residential solar, commercial solar, industrial solar, solar installation, solar EPC, solar ROI, solar tax benefits, rooftop solar, solar city solutions"
        }
      `}
    </Script>
  );
} 