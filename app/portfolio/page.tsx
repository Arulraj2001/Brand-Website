import React from 'react';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { webPageSchema } from '@/lib/schema';
import { getOgImageUrl, getSiteUrl, getSiteName, seoRobots } from '@/lib/seo';
import { getPortfolioProjects } from '@/lib/supabase/data';
import PortfolioClient from './PortfolioClient';

const portfolioTitle = 'Client Portfolio & Verified Web Case Studies | Ostrune';
const portfolioDescription =
  'Explore real client case studies: sub-second web platforms, speed overhauls, and high-ROAS ad campaigns engineered by Ostrune for global businesses.';

export const metadata: Metadata = {
  title: {
    absolute: portfolioTitle,
  },
  description: portfolioDescription,
  alternates: {
    canonical: `${getSiteUrl()}/portfolio`,
  },
  openGraph: {
    title: 'Client Portfolio & Verified Web Case Studies | Ostrune',
    description:
      'Explore real client case studies: sub-second web platforms, speed overhauls, and high-ROAS ad campaigns engineered by Ostrune for global businesses.',
    url: `${getSiteUrl()}/portfolio`,
    type: 'website',
    siteName: getSiteName(),
    images: [
      {
        url: getOgImageUrl({ title: 'Client Portfolio & Verified Web Case Studies | Ostrune', description: 'Explore real client case studies: sub-second web platforms, speed overhauls, and high-ROAS ad campaigns engineered by Ostrune for global businesses.', type: 'page' }),
        width: 1200,
        height: 630,
        alt: 'Ostrune Portfolio & Case Studies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Portfolio & Verified Web Case Studies | Ostrune',
    description:
      'Explore real client case studies: sub-second web platforms, speed overhauls, and high-ROAS ad campaigns engineered by Ostrune for global businesses.',
    images: [getOgImageUrl({ title: 'Client Portfolio & Verified Web Case Studies | Ostrune', description: 'Explore real client case studies: sub-second web platforms, speed overhauls, and high-ROAS ad campaigns engineered by Ostrune for global businesses.', type: 'page' })],
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