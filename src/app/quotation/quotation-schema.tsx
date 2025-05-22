import Script from 'next/script';

export default function QuotationPageSchema() {
  return (
    <Script id="quotation-schema" type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Solar Quotation Calculator - Solar City Solutions",
          "description": "Get an instant quote for your solar installation. Our calculator helps you estimate costs, savings, and ROI for your solar energy system.",
          "url": "https://www.solarcitysolutions.in/quotation",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Solar City Solutions",
            "url": "https://www.solarcitysolutions.in"
          },
          "mainEntity": {
            "@type": "SoftwareApplication",
            "name": "Solar Quotation Calculator",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
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
                  "@id": "https://www.solarcitysolutions.in/quotation",
                  "name": "Solar Quotation Calculator"
                }
              }
            ]
          },
          "speakable": {
            "@type": "SpeakableSpecification",
            "cssSelector": [".calculator-heading", ".calculator-description", ".results-summary"]
          },
          "potentialAction": {
            "@type": "Action",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://www.solarcitysolutions.in/contact"
            },
            "name": "Contact Us for Detailed Quote"
          }
        }
      `}
    </Script>
  );
} 