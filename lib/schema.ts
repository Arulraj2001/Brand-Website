// JSON-LD schema template builders.
// Each function returns a serializable object meant to be injected via <JsonLd />.

export type JsonLdObject = { '@context'?: string; '@type'?: string; [key: string]: unknown };

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export interface SiteAddress {
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  addressCountry?: string;
}

export interface OrganizationOptions {
  url: string;
  name?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  address?: SiteAddress;
  contactPoint?: {
    telephone: string;
    contactType?: string;
    email?: string;
    availableLanguage?: string[];
  };
  knowsAbout?: string[];
  areaServed?: string | string[];
  hasOfferCatalog?: {
    name: string;
    itemListElement: {
      '@type': 'Offer';
      itemOffered: {
        '@type': 'Service';
        name: string;
        url?: string;
        description?: string;
      };
    }[];
  };
}

export function organizationSchema(opts: OrganizationOptions): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${opts.url}/#organization`,
    name: opts.name || 'Ostrune',
    url: opts.url,
    ...(opts.logo ? { logo: { '@type': 'ImageObject', url: opts.logo } } : {}),
    ...(opts.description ? { description: opts.description } : {}),
    ...(opts.sameAs && opts.sameAs.length ? { sameAs: opts.sameAs } : {}),
    ...(opts.address ? { address: { '@type': 'PostalAddress', ...opts.address } } : {}),
    ...(opts.knowsAbout ? { knowsAbout: opts.knowsAbout } : {}),
    ...(opts.areaServed ? { areaServed: opts.areaServed } : {}),
    ...(opts.hasOfferCatalog ? { hasOfferCatalog: opts.hasOfferCatalog } : {}),
    ...(opts.contactPoint
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            ...opts.contactPoint,
          },
        }
      : {}),
  };
}

export function webSiteSchema(opts: { url: string; name?: string; searchUrl?: string }): JsonLdObject {
  const searchBase = opts.searchUrl || `${opts.url}/search?q=`;
  const hasTemplate =
    searchBase.includes('{search_term_string}') || searchBase.includes('{query}') || searchBase.includes('%s');

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${opts.url}/#website`,
    url: opts.url,
    name: opts.name || 'Ostrune',
    publisher: { '@id': `${opts.url}/#organization` },
    ...(hasTemplate
      ? {
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: searchBase,
            },
            'query-input': 'required name=search_term_string',
          },
        }
      : {}),
  };
}

export function webPageSchema(opts: {
  url: string;
  name?: string;
  description?: string;
  isPartOf?: string;
  dateModified?: string | Date;
  image?: string;
}): JsonLdObject {
  const partOf = opts.isPartOf || getOriginFromUrl(opts.url);
  const dateModified = opts.dateModified ? new Date(opts.dateModified).toISOString() : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.name,
    url: opts.url,
    ...(opts.description ? { description: opts.description } : {}),
    isPartOf: partOf,
    ...(dateModified ? { dateModified } : {}),
    ...(opts.image ? { primaryImageOfPage: { '@type': 'ImageObject', url: opts.image } } : {}),
  };
}

export function articleSchema(opts: {
  headline: string;
  description?: string;
  url: string;
  image?: string;
  datePublished?: string | Date;
  dateModified?: string | Date;
  authorName?: string;
  authorUrl?: string;
  publisherLogo?: string;
  publisherName?: string;
}): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    ...(opts.description ? { description: opts.description } : {}),
    url: opts.url,
    ...(opts.image ? { image: opts.image } : {}),
    ...(opts.datePublished ? { datePublished: new Date(opts.datePublished).toISOString() } : {}),
    ...(opts.dateModified ? { dateModified: new Date(opts.dateModified).toISOString() } : {}),
    author: {
      '@type': 'Person',
      name: opts.authorName || 'Ostrune Team',
      ...(opts.authorUrl ? { url: opts.authorUrl } : {}),
    },
    publisher: {
      '@type': 'Organization',
      name: opts.publisherName || 'Ostrune',
      ...(opts.publisherLogo ? { logo: { '@type': 'ImageObject', url: opts.publisherLogo } } : {}),
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
  };
}

export function breadcrumbListSchema(items: BreadcrumbItem[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  url: string;
  description: string;
  providerName?: string;
  providerUrl?: string;
  serviceType?: string;
  areaServed?: string | string[];
}): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    url: opts.url,
    description: opts.description,
    serviceType: opts.serviceType || opts.name,
    areaServed: opts.areaServed || 'Worldwide',
    provider: {
      '@type': 'Organization',
      name: opts.providerName || 'Ostrune',
      url: opts.providerUrl || getOriginFromUrl(opts.url),
    },
  };
}

export function caseStudySchema(opts: {
  title: string;
  url: string;
  description: string;
  clientName?: string;
  clientLocation?: string;
  image?: string;
  datePublished?: string;
  authorName?: string;
  techStack?: string[];
  results?: string;
}): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    headline: opts.title,
    url: opts.url,
    description: opts.description,
    ...(opts.image ? { image: opts.image } : {}),
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    author: {
      '@type': 'Organization',
      name: opts.authorName || 'Ostrune',
    },
    ...(opts.clientName
      ? {
          sponsor: {
            '@type': 'Organization',
            name: opts.clientName,
            ...(opts.clientLocation ? { address: opts.clientLocation } : {}),
          },
        }
      : {}),
    ...(opts.techStack && opts.techStack.length ? { keywords: opts.techStack.join(', ') } : {}),
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
  };
}

export function professionalServiceSchema(opts: {
  name: string;
  url: string;
  telephone: string;
  email: string;
  priceRange?: string;
  address?: SiteAddress;
  geo?: { latitude: number; longitude: number };
  openingHours?: string[];
  areaServed?: string | string[];
  image?: string;
}): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: opts.name,
    url: opts.url,
    telephone: opts.telephone,
    email: opts.email,
    ...(opts.priceRange ? { priceRange: opts.priceRange } : {}),
    ...(opts.address ? { address: { '@type': 'PostalAddress', ...opts.address } } : {}),
    ...(opts.geo ? { geo: { '@type': 'GeoCoordinates', ...opts.geo } } : {}),
    ...(opts.openingHours ? { openingHours: opts.openingHours } : {}),
    ...(opts.areaServed ? { areaServed: opts.areaServed } : {}),
    ...(opts.image ? { image: opts.image } : {}),
  };
}

export function educationalOrganizationSchema(opts: {
  name: string;
  url: string;
  description: string;
  parentOrganizationName?: string;
  parentOrganizationUrl?: string;
}): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: opts.name,
    url: opts.url,
    description: opts.description,
    ...(opts.parentOrganizationName
      ? {
          parentOrganization: {
            '@type': 'Organization',
            name: opts.parentOrganizationName,
            ...(opts.parentOrganizationUrl ? { url: opts.parentOrganizationUrl } : {}),
          },
        }
      : {}),
  };
}

// Returns just the origin (scheme://host) for a given URL.
function getOriginFromUrl(url: string): string {
  try {
    return new URL(url).origin;
  } catch {
    return url;
  }
}