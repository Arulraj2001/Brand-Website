import React from 'react';
import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | Book a Free Strategy Call',
  description:
    'Book a free 15-minute strategy call with Ostrune. Get a custom proposal and transparent budget options. Response guaranteed within 12 hours across all time zones.',
  alternates: {
    canonical: 'https://ostrune.netlify.app/contact',
  },
  openGraph: {
    title: 'Contact Ostrune | Book a Free Strategy Call',
    description:
      'Book a free 15-minute strategy call with Ostrune. Get a custom proposal and transparent budget options. Response guaranteed within 12 hours across all time zones.',
    url: 'https://ostrune.netlify.app/contact',
    type: 'website',
    images: [
      {
        url: 'https://ostrune.netlify.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Ostrune',
      },
    ],
  },
};

export default function ContactPage() {
  const jsonLdLocalBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Ostrune',
    url: 'https://ostrune.netlify.app/contact',
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
    image: 'https://ostrune.netlify.app/logo.png',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
      />
      <ContactClient />
    </>
  );
}