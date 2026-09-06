import React from 'react';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { webPageSchema } from '@/lib/schema';
import { getOgImageUrl, getSiteUrl, getSiteName, seoRobots } from '@/lib/seo';
import { getPortfolioProjects } from '@/lib/supabase/data';
import PortfolioClient from './PortfolioClient';

export const metadata: Metadata = {
  title: 'Portfolio & Case Studies | Web Development & SEO',
  description:
    'Explore verified client case studies: sub-second web platforms, speed overhauls, and high-ROAS ad campaigns engineered by Ostrune.',
  alternates: {
    canonical: `${getSiteUrl()}/portfolio`,
  },
  openGraph: {
    title: 'Portfolio & Case Studies | Ostrune',
    description:
      'Explore verified client case studies: sub-second web platforms, speed overhauls, and high-ROAS ad campaigns engineered by Ostrune.',
    url: `${getSiteUrl()}/portfolio`,
    type: 'website',
    siteName: getSiteName(),
    images: [
      {
        url: getOgImageUrl({ title: 'Portfolio & Case Studies | Web Development & SEO', description: 'Explore verified client case studies: sub-second web platforms, speed overhauls,and high-ROAS ad campaigns engineered by Ostrune.', type: 'page' }),
        width: 1200,
        height: 630,
        alt: 'Ostrune Portfolio & Case Studies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio & Case Studies | Ostrune',
    description:
      'Explore verified client case studies: sub-second web platforms, speed overhauls,and high-ROAS ad campaigns engineered by Ostrune.',
    images: [getOgImageUrl({ title: 'Portfolio & Case Studies | Web Development & SEO', description: 'Explore verified client case studies: sub-second web platforms, speed overhauls,and high-ROAS ad campaigns engineered by Ostrune.', type: 'page' })],
  },
  robots: seoRobots(),
};

export const revalidate = 60; // Refresh cache every minute

export default async function PortfolioPage() {
  const portfolioIndexSchema = webPageSchema({
    url: `${getSiteUrl()}/portfolio`,
    name: 'Portfolio & Case Studies | Web Development & SEO',
    description: 'Explore verified client case studies: sub-second web platforms, speed overhauls,and high-ROAS ad campaigns engineered by Ostrune.',
  });
  const projects = await getPortfolioProjects();

  return (
    <>
      <JsonLd data={portfolioIndexSchema} />
      <PortfolioClient initialProjects={projects} />
    </>
  );
}