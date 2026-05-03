const SITE_URL = "https://webtimez.com";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
        name: "Webtimez GbR",
        alternateName: "Webtimez",
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        image: `${SITE_URL}/og-image.png`,
        description:
          "Webagentur aus Köln. Webdesign, Webentwicklung und Hosting für kleine und regionale Unternehmen.",
        email: "team@webtimez.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Johann-Reintgen-Straße 19",
          postalCode: "50999",
          addressLocality: "Köln",
          addressRegion: "NRW",
          addressCountry: "DE",
        },
        areaServed: [
          { "@type": "City", name: "Köln" },
          { "@type": "AdministrativeArea", name: "Nordrhein-Westfalen" },
          { "@type": "Country", name: "Deutschland" },
        ],
        founder: [
          { "@type": "Person", name: "Julius Sturm" },
          { "@type": "Person", name: "Simon Engel" },
          { "@type": "Person", name: "Jonas Engel" },
        ],
        sameAs: [
          "https://www.linkedin.com/in/julius-constantin-kuhnigk-9bb099340/",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}#service`,
        name: "Webtimez",
        url: SITE_URL,
        image: `${SITE_URL}/og-image.png`,
        priceRange: "€€",
        description:
          "Professionelle Websites für kleine und regionale Unternehmen. Von Design über Entwicklung bis Hosting — alles aus einer Hand.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Johann-Reintgen-Straße 19",
          postalCode: "50999",
          addressLocality: "Köln",
          addressCountry: "DE",
        },
        areaServed: [
          { "@type": "City", name: "Köln" },
          { "@type": "AdministrativeArea", name: "Nordrhein-Westfalen" },
        ],
        serviceType: [
          "Webdesign",
          "Webentwicklung",
          "Suchmaschinenoptimierung",
          "Webhosting",
          "Website-Wartung",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Webtimez Leistungen",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Webdesign",
                description:
                  "Modernes, responsives Design abgestimmt auf eure Marke.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Webentwicklung",
                description:
                  "Saubere, performante Umsetzung mit aktuellen Technologien.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Hosting",
                description:
                  "Sicheres, schnelles Hosting mit deutscher Infrastruktur.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Optimierung",
                description:
                  "Performance, SEO und kontinuierliche Verbesserung.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Kontrolle",
                description: "Laufende Pflege, Updates und Monitoring.",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        url: SITE_URL,
        name: "Webtimez",
        publisher: { "@id": `${SITE_URL}#organization` },
        inLanguage: "de-DE",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
