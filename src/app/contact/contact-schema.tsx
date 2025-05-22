import Script from 'next/script';

export default function ContactPageSchema() {
  return (
    <Script id="contact-schema" type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Solar City Solutions",
          "description": "Get in touch with Solar City Solutions for inquiries about solar energy systems, installation, maintenance or consultations.",
          "url": "https://www.solarcitysolutions.in/contact",
          "mainEntity": {
            "@type": "Organization",
            "name": "Solar City Solutions",
            "url": "https://www.solarcitysolutions.in",
            "logo": "https://www.solarcitysolutions.in/logo.png",
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+91-1234567890",
                "contactType": "customer service",
                "areaServed": "IN",
                "availableLanguage": ["English", "Hindi"],
                "contactOption": "TollFree"
              },
              {
                "@type": "ContactPoint",
                "email": "info@solarcitysolutions.in",
                "contactType": "customer support"
              }
            ],
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "India",
              "addressLocality": "Your City",
              "addressRegion": "Your State",
              "postalCode": "123456",
              "streetAddress": "Your Address"
            }
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@id": "https://www.solarcitysolutions.in",
                  "name": "Home"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@id": "https://www.solarcitysolutions.in/contact",
                  "name": "Contact Us"
                }
              }
            ]
          },
          "potentialAction": {
            "@type": "CommunicateAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "tel:+91-1234567890",
              "inLanguage": "en-IN",
              "actionPlatform": [
                "http://schema.org/MobileWebPlatform",
                "http://schema.org/DesktopWebPlatform"
              ]
            },
            "name": "Call Now"
          },
          "speakable": {
            "@type": "SpeakableSpecification",
            "cssSelector": [".contact-heading", ".contact-info", ".contact-form"]
          }
        }
      `}
    </Script>
  );
} 