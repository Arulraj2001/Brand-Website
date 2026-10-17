import React from 'react';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { webPageSchema, breadcrumbListSchema, professionalServiceSchema } from '@/lib/schema';
import { getOgImageUrl, getSiteUrl, getSiteName, seoRobots } from '@/lib/seo';
import ContactClient from './ContactClient';

const contactTitle = 'Contact Us | Web Development, Shopify & App Consultation | Ostrune';
const contactDescription =
  'Get in touch with Ostrune for custom web development, Shopify, WordPress, Wix, or mobile app projects. Transparent pricing, honest recommendations, and friendly consultation.';

export const metadata: Metadata = {
  title: {
    absolute: contactTitle,
  },
  description: contactDescription,
  alternates: {
    canonical: `${getSiteUrl()}/contact`,
  },
  openGraph: {
    title: contactTitle,
    description: contactDescription,
    url: `${getSiteUrl()}/contact`,
    type: 'website',
    siteName: getSiteName(),
    images: [
      {
        url: getOgImageUrl({ title: contactTitle, description: contactDescription, type: 'page' }),
        width: 1200,
        height: 630,
        alt: 'Contact Ostrune',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: contactTitle,
    description: contactDescription,
    images: [getOgImageUrl({ title: contactTitle, description: contactDescription, type: 'page' })],
  },
  robots: seoRobots(),
};

export default function ContactPage() {
  const contactSchema = [
    professionalServiceSchema({
      name: 'Ostrune',
      url: `${getSiteUrl()}/contact`,
      telephone: '+91 8637474067',
      email: 'arulraj8637@gmail.com',
      priceRange: '$$',
      address: {
        streetAddress: 'Tiruvannamalai',
        addressLocality: 'Tiruvannamalai',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'India',
      },
      geo: {
        latitude: 12.2253,
        longitude: 79.0747,
      },
      openingHours: ['Mo-Sa 09:00-21:00'],
      areaServed: ['Worldwide', 'United States', 'United Kingdom', 'Canada', 'Australia', 'India', 'Europe', 'Singapore', 'UAE'],
      image: `${getSiteUrl()}/logo.png`,
    }),
    webPageSchema({
      url: `${getSiteUrl()}/contact`,
      name: contactTitle,
      description: contactDescription,
    }),
    breadcrumbListSchema([
      { name: 'Home', item: getSiteUrl() },
      { name: 'Contact', item: `${getSiteUrl()}/contact` },
    ]),
  ];

  return (
    <>
      <JsonLd data={contactSchema} />
      <ContactClient />
    </>
  );
}