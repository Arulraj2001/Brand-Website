import React from 'react';
import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Ostrune | Book a Free Strategy Call',
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
  return <ContactClient />;
}