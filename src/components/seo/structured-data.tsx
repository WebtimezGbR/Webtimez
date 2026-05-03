const SITE_URL = "https://webtimez.com";
const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Johann-Reintgen-Straße 19",
  postalCode: "50999",
  addressLocality: "Köln",
  addressRegion: "NRW",
  addressCountry: "DE",
} as const;

const GEO = {
  "@type": "GeoCoordinates",
  latitude: 50.8669,
  longitude: 6.9885,
} as const;

const AREA_SERVED = [
  { "@type": "City", name: "Köln" },
  { "@type": "City", name: "Bonn" },
  { "@type": "City", name: "Düsseldorf" },
  { "@type": "AdministrativeArea", name: "Nordrhein-Westfalen" },
  { "@type": "Country", name: "Deutschland" },
];

const FOUNDERS = [
  {
    "@type": "Person",
    "@id": `${SITE_URL}#julius`,
    name: "Julius Sturm",
    jobTitle: "Gründer",
    worksFor: { "@id": `${SITE_URL}#organization` },
    sameAs: [
      "https://www.linkedin.com/in/julius-constantin-kuhnigk-9bb099340/",
    ],
  },
  {
    "@type": "Person",
    "@id": `${SITE_URL}#simon`,
    name: "Simon Engel",
    jobTitle: "Gründer",
    worksFor: { "@id": `${SITE_URL}#organization` },
  },
  {
    "@type": "Person",
    "@id": `${SITE_URL}#jonas`,
    name: "Jonas Engel",
    jobTitle: "Gründer",
    worksFor: { "@id": `${SITE_URL}#organization` },
  },
];

const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
];

const SERVICE_OFFERS = [
  {
    name: "Webdesign",
    description: "Modernes, responsives Design abgestimmt auf eure Marke.",
  },
  {
    name: "Webentwicklung",
    description: "Saubere, performante Umsetzung mit aktuellen Technologien.",
  },
  {
    name: "Hosting",
    description: "Sicheres, schnelles Hosting mit deutscher Infrastruktur.",
  },
  {
    name: "Optimierung",
    description: "Performance, SEO und kontinuierliche Verbesserung.",
  },
  {
    name: "Kontrolle",
    description: "Laufende Pflege, Updates und Monitoring.",
  },
];

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
        name: "Webtimez GbR",
        alternateName: "Webtimez",
        legalName: "Webtimez GbR",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo.png`,
          width: 512,
          height: 512,
        },
        image: `${SITE_URL}/og-image.png`,
        description:
          "Webagentur aus Köln. Webdesign, Webentwicklung und Hosting für kleine und regionale Unternehmen — persönlich, flexibel und auf Augenhöhe.",
        email: "team@webtimez.com",
        address: ADDRESS,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: "team@webtimez.com",
            areaServed: "DE",
            availableLanguage: ["German", "English"],
          },
        ],
        areaServed: AREA_SERVED,
        founder: FOUNDERS,
        knowsLanguage: ["de", "en"],
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
        logo: `${SITE_URL}/logo.png`,
        priceRange: "€€",
        description:
          "Professionelle Websites für kleine und regionale Unternehmen aus Köln und NRW. Von Design über Entwicklung bis Hosting — alles aus einer Hand.",
        address: ADDRESS,
        geo: GEO,
        areaServed: AREA_SERVED,
        serviceType: [
          "Webdesign",
          "Webentwicklung",
          "Suchmaschinenoptimierung",
          "Webhosting",
          "Website-Wartung",
          "Responsive Webdesign",
          "Performance-Optimierung",
        ],
        openingHoursSpecification: OPENING_HOURS,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Webtimez Leistungen",
          itemListElement: SERVICE_OFFERS.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.name,
              description: s.description,
              provider: { "@id": `${SITE_URL}#organization` },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        url: SITE_URL,
        name: "Webtimez",
        description:
          "Webdesign & Webentwicklung aus Köln für kleine und regionale Unternehmen.",
        publisher: { "@id": `${SITE_URL}#organization` },
        inLanguage: "de-DE",
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}#webpage`,
        url: SITE_URL,
        name: "Webtimez – Webdesign & Webentwicklung aus Köln",
        isPartOf: { "@id": `${SITE_URL}#website` },
        about: { "@id": `${SITE_URL}#organization` },
        inLanguage: "de-DE",
        primaryImageOfPage: `${SITE_URL}/og-image.png`,
      },
      ...FOUNDERS,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
