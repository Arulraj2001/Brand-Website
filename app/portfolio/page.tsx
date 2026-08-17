import React from 'react';
import type { Metadata } from 'next';
import PortfolioClient from './PortfolioClient';

export const metadata: Metadata = {
  title: 'Portfolio & Case Studies | Ostrune',
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

export default function PortfolioPage() {
  return <PortfolioClient />;
}