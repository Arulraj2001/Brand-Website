import React from 'react';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { webPageSchema, breadcrumbListSchema } from '@/lib/schema';
import { getOgImageUrl, getSiteUrl, getSiteName, seoRobots } from '@/lib/seo';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us | Web Development & SEO Agency',
  description:
    'Ostrune delivers high-quality web software, old website speed overhauls, technical SEO, and high-ROAS UGC video ads for startups and enterprises worldwide at affordable rates.',
  alternates: {
    canonical: `${getSiteUrl()}/about`,
  },
  openGraph: {
    title: 'About Ostrune | Web Development & SEO Agency',
    description:
      'Ostrune delivers high-quality web software, old website speed overhauls, technical SEO, and high-ROAS UGC video ads for startups and enterprises worldwide at affordable rates.',
    url: `${getSiteUrl()}/about`,
    type: 'website',
    siteName: getSiteName(),
    images: [
      {
        url: getOgImageUrl({ title: 'Ostrune — Web Development & SEO Agency', description: 'Ostrune delivers high-quality web software, old website speed overhauls, technical SEO, and high-ROAS UGC video ads for startups and enterprises worldwide at affordable rates.', type: 'page' }),
        width: 1200,
        height: 630,
        alt: 'About Ostrune',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Ostrune | Web Development & SEO Agency',
    description:
      'Ostrune delivers high-quality web software, old website speed overhauls, technical SEO, and high-ROAS UGC video ads for startups and enterprises worldwide at affordable rates.',
    images: [getOgImageUrl({ title: 'Ostrune — Web Development & SEO Agency', description: 'Ostrune delivers high-quality web software, old website speed overhauls, technical SEO, and high-ROAS UGC video ads for startups and enterprises worldwide at affordable rates.', type: 'page' })],
  },
  robots: seoRobots(),
};

export default function AboutPage() {
  const aboutSchema = [
    webPageSchema({ url: `${getSiteUrl()}/about`, name: 'About Ostrune | Web Development & SEO Agency', description: 'Ostrune delivers high-quality web software, old website speed overhauls, technical SEO, and high-ROAS UGC video ads for startupsand enterprises worldwide at affordable rates.' }),
    breadcrumbListSchema([
      { name: 'Home', item: getSiteUrl() },
      { name: 'About Us', item: `${getSiteUrl()}/about` },
    ]),
  ];
  return (
    <>
      <JsonLd data={aboutSchema} />
      <AboutClient />
    </>
  );
}