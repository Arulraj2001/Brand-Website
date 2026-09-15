import React from 'react';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { breadcrumbListSchema } from '@/lib/schema';
import { getOgImageUrl, getSiteUrl, getSiteName, seoRobots } from '@/lib/seo';
import AboutClient from './AboutClient';

const aboutTitle = 'About Ostrune | Global Web Engineering & Growth Agency';
const aboutDescription =
  'Discover Ostrune\'s engineering ethos: zero-plugin modern tech, sub-second web architecture, verified client ROAS, and transparent global delivery.';

export const metadata: Metadata = {
  title: {
    absolute: aboutTitle,
  },
  description: aboutDescription,
  alternates: {
    canonical: `${getSiteUrl()}/about`,
  },
  openGraph: {
    title: 'About Ostrune | Global Web Engineering & Performance Agency',
    description:
      'Learn about Ostrune\'s engineering ethos: zero-plugin modern stacks, sub-second web architecture, verified client ROAS, and transparent global delivery.',
    url: `${getSiteUrl()}/about`,
    type: 'website',
    siteName: getSiteName(),
    images: [
      {
        url: getOgImageUrl({ title: 'About Ostrune — Global Web Engineering & Performance Agency', description: 'Learn about Ostrune\'s engineering ethos: zero-plugin modern stacks, sub-second web architecture, verified client ROAS, and transparent global delivery.', type: 'page' }),
        width: 1200,
        height: 630,
        alt: 'About Ostrune',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Ostrune | Global Web Engineering & Performance Agency',
    description:
      'Learn about Ostrune\'s engineering ethos: zero-plugin modern stacks, sub-second web architecture, verified client ROAS, and transparent global delivery.',
    images: [getOgImageUrl({ title: 'About Ostrune — Global Web Engineering & Performance Agency', description: 'Learn about Ostrune\'s engineering ethos: zero-plugin modern stacks, sub-second web architecture, verified client ROAS, and transparent global delivery.', type: 'page' })],
  },
  robots: seoRobots(),
};

export default function AboutPage() {
  const siteUrl = getSiteUrl();
  const aboutSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Ostrune | Global Web Engineering & Performance Agency',
      url: `${siteUrl}/about`,
      description:
        'Learn about Ostrune\'s engineering ethos: zero-plugin modern stacks, sub-second web architecture, verified client ROAS, and transparent global delivery.',
      mainEntity: {
        '@type': 'Organization',
        name: 'Ostrune',
        url: siteUrl,
        founder: {
          '@type': 'Person',
          name: 'Arulraj',
          jobTitle: 'Lead Software & Growth Engineer',
        },
      },
    },
    breadcrumbListSchema([
      { name: 'Home', item: siteUrl },
      { name: 'About Us', item: `${siteUrl}/about` },
    ]),
  ];
  return (
    <>
      <JsonLd data={aboutSchema} />
      <AboutClient />
    </>
  );
}