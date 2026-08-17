import React from 'react';
import type { Metadata } from 'next';
import StudentProjectsClient from './StudentProjectsClient';

export const metadata: Metadata = {
  title: 'Final Year CS Projects, IEEE Reports & MSME Certifications | Ostrune',
  description:
    'Complete final year project guidance for BCA, MCA, B.Sc CS, M.Sc CS, B.Tech CS & IT branches under MSME registered Learnithm. 80+ students cleared their Viva.',
  alternates: {
    canonical: 'https://ostrune.netlify.app/student-projects',
  },
  openGraph: {
    title: 'Final Year CS Projects, IEEE Reports & MSME Certifications | Ostrune',
    description:
      'Complete final year project guidance for BCA, MCA, B.Sc CS, M.Sc CS, B.Tech CS & IT branches under MSME registered Learnithm. 80+ students cleared their Viva.',
    url: 'https://ostrune.netlify.app/student-projects',
    type: 'website',
    images: [
      {
        url: 'https://ostrune.netlify.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ostrune Student Projects',
      },
    ],
  },
};

export default function StudentProjectsPage() {
  return <StudentProjectsClient />;
}