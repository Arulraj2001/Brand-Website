import React from 'react';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { webPageSchema, breadcrumbListSchema } from '@/lib/schema';
import { getOgImageUrl, getSiteUrl, getSiteName, seoRobots } from '@/lib/seo';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | Book a Free Strategy Call',
  description:
    'Book a free 15-minute strategy call with Ostrune. Get a custom proposal and transparent budget options. Response guaranteed within 12 hours across all time zones.',
  alternates: {
    canonical: `${getSiteUrl()}/contact`,
  },
  openGraph: {
    title: 'Contact Ostrune | Book a Free Strategy Call',
    description:
      'Book a free 15-minute strategy call with Ostrune. Get a custom proposal and transparent budget options. Response guaranteed within 12 hours across all time zones.',
    url: `${getSiteUrl()}/contact`,
    type: 'website',
    siteName: getSiteName(),
    images: [
      {
        url: getOgImageUrl({ title: 'Contact Ostrune | Book a Free Strategy Call', description: 'Book a free 15-minute strategy call with Ostrune. Get a custom proposal and transparent budget options. Response guaranteed within 12 hours across all time zones.', type: 'page' }),
        width: 1200,
        height: 630,
        alt: 'Contact Ostrune',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Ostrune | Book a Free Strategy Call',
    description:
      'Book a free 15-minute strategy call with Ostrune. Get a custom proposal and transparent budget options. Response guaranteed within 12 hours across all time zones.',
    images: [getOgImageUrl({ title: 'Contact Ostrune | Book a Free Strategy Call', description: 'Book a free 15-minute strategy call with Ostrune. Get a custom proposal and transparent budget options. Response guaranteed within 12 hours across all time zones.', type: 'page' })],
  },
  robots: seoRobots(),
};

export default function ContactPage() {
  const jsonLdLocalBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Ostrune',
    url: `${getSiteUrl()}/contact`,
    telephone: '+91 8637474067',
    email: 'arulraj8637@gmail.com',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Tiruvannamalai',
      addressLocality: 'Tiruvannamalai',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'India',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.2253,
      longitude: 79.0747,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '21:00',
    },
    areaServed: ['India', 'Global'],
    image: `${getSiteUrl()}/logo.png`,
  };

  const contactSchema = [
    webPageSchema({ url: `${getSiteUrl()}/contact`, name: 'Contact Us | Book a Free Strategy Call', description: 'Book a free 15-minute strategy call with Ostrune. Get a custom proposal and transparent budget options. Response guaranteed within 12 hours across all time zones.' }),
    breadcrumbListSchema([
      { name: 'Home', item: getSiteUrl() },
      { name: 'Contact', item: `${getSiteUrl()}/contact` },
    ]),
  ];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
      />
      <JsonLd data={contactSchema} />
      <ContactClient />
    </>
  );
}