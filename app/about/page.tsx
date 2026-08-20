import React from 'react';
import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us | Web Development & SEO Agency',
  description:
    'Ostrune delivers high-quality web software, old website speed overhauls, technical SEO, and high-ROAS UGC video ads for startups and enterprises worldwide at affordable rates.',
  alternates: {
    canonical: 'https://ostrune.netlify.app/about',
  },
  openGraph: {
    title: 'About Ostrune | Web Development & SEO Agency',
    description:
      'Ostrune delivers high-quality web software, old website speed overhauls, technical SEO, and high-ROAS UGC video ads for startups and enterprises worldwide at affordable rates.',
    url: 'https://ostrune.netlify.app/about',
    type: 'website',
    images: [
      {
        url: 'https://ostrune.netlify.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'About Ostrune',
      },
    ],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}