export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EgoTax SRL",
    alternateName: "EgoTax",
    url: "https://egotax.md",
    logo: "https://egotax.md/logo.png",
    description:
      "Servicii profesionale de contabilitate, consultanță fiscală și suport pentru afaceri în Moldova",
    address: {
      "@type": "PostalAddress",
      streetAddress: "str. Alexandru cel Bun, 91, et. 2",
      addressLocality: "Chișinău",
      addressCountry: "MD",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+373-61-142-323",
      contactType: "customer service",
      availableLanguage: ["Romanian", "Russian"],
    },
    sameAs: [
      "https://www.facebook.com/egotax",
      "https://www.instagram.com/egotax",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: "EgoTax SRL",
    image: "https://egotax.md/og-image.jpg",
    url: "https://egotax.md",
    telephone: "+373-61-142-323",
    email: "info@egotax.md",
    address: {
      "@type": "PostalAddress",
      streetAddress: "str. Alexandru cel Bun, 91, et. 2",
      addressLocality: "Chișinău",
      addressCountry: "MD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.0105,
      longitude: 28.8638,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    areaServed: {
      "@type": "Country",
      name: "Moldova",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicii Contabile",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Servicii de evidență contabilă",
            description: "Ținerea evidenței contabile complete pentru afaceri",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Consultanță fiscală",
            description:
              "Consultanță profesională pentru optimizare fiscală legală",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Restabilirea evidenței contabile",
            description:
              "Reconstituirea și corectarea evidenței contabile pentru perioade anterioare",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Analiză și diagnostic financiar",
            description:
              "Analiza situației financiare și recomandări pentru optimizare",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Suport în inițierea afacerii",
            description:
              "Asistență completă pentru înregistrarea și lansarea afacerii",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: "EgoTax SRL",
      url: "https://egotax.md",
    },
    areaServed: {
      "@type": "Country",
      name: "Moldova",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
