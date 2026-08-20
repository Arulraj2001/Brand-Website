import React from 'react';
import type { Metadata } from 'next';
import { getPortfolioProjects } from '@/lib/supabase/data';
import PortfolioClient from './PortfolioClient';

export const metadata: Metadata = {
  title: 'Portfolio & Case Studies | Web Development & SEO',
  description:
    'Explore verified client case studies: sub-second web platforms, speed overhauls, and high-ROAS ad campaigns engineered by Ostrune.',
  alternates: {
    canonical: 'https://ostrune.netlify.app/portfolio',
  },
  openGraph: {
    title: 'Portfolio & Case Studies | Ostrune',
    description:
      'Explore verified client case studies: sub-second web platforms, speed overhauls, and high-ROAS ad campaigns engineered by Ostrune.',
    url: 'https://ostrune.netlify.app/portfolio',
    type: 'website',
    images: [
      {
        url: 'https://ostrune.netlify.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ostrune Portfolio & Case Studies',
      },
    ],
  },
};

export const revalidate = 60; // Refresh cache every minute

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects();

  return <PortfolioClient initialProjects={projects} />;
}