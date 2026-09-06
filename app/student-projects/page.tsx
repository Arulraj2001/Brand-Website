import React from 'react';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { webPageSchema, breadcrumbListSchema } from '@/lib/schema';
import { getOgImageUrl, getSiteUrl, getSiteName, seoRobots } from '@/lib/seo';
import StudentProjectsClient from './StudentProjectsClient';

export const metadata: Metadata = {
  title: 'Final Year CS Projects, IEEE Reports & MSME Certifications',
  description:
    'Complete final year project guidance for BCA, MCA, B.Sc CS, M.Sc CS, B.Tech CS & IT branches under MSME registered Learnithm. 80+ students cleared their Viva.',
  alternates: {
    canonical: `${getSiteUrl()}/student-projects`,
  },
  openGraph: {
    title: 'Final Year CS Projects, IEEE Reports & MSME Certifications | Ostrune',
    description:
      'Complete final year project guidance for BCA, MCA, B.Sc CS, M.Sc CS, B.Tech CS & IT branches under MSME registered Learnithm. 80+ students cleared their Viva.',
    url: `${getSiteUrl()}/student-projects`,
    type: 'website',
    siteName: getSiteName(),
    images: [
      {
        url: getOgImageUrl({ title: 'Final Year CS Projects, IEEE Reports & MSME Certifications', description: 'Complete final year project guidance for BCA, MCA, B.Sc CS, M.Sc CS, B.Tech CS & IT branches under MSME registered Learnithm. 80+ students cleared their Viva.', type: 'page' }),
        width: 1200,
        height: 630,
        alt: 'Ostrune Student Projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Final Year CS Projects, IEEE Reports & MSME Certifications | Ostrune',
    description:
      'Complete final year project guidance for BCA, MCA, B.Sc CS, M.Sc CS, B.Tech CS & IT branches under MSME registered Learnithm. 80+ students cleared their Viva.',
    images: [getOgImageUrl({ title: 'Final Year CS Projects, IEEE Reports & MSME Certifications', description: 'Complete final year project guidance for BCA, MCA, B.Sc CS, M.Sc CS, B.Tech CS & IT branches under MSME registered Learnithm. 80+ students cleared their Viva.', type: 'page' })],
  },
  robots: seoRobots(),
};

export default function StudentProjectsPage() {
  const studentProjectsSchema = [
    webPageSchema({ url: `${getSiteUrl()}/student-projects`, name: 'Final Year CS Projects, IEEE Reports & MSME Certifications', description: 'Complete final year project guidance for BCA, MCA, B.Sc CS, M.Sc CS, B.Tech CS & IT branches under MSME registered Learnithm. 80+ students cleared their Viva.' }),
    breadcrumbListSchema([
      { name: 'Home', item: getSiteUrl() },
      { name: 'Student Projects', item: `${getSiteUrl()}/student-projects` },
    ]),
  ];
  return (
    <>
      <JsonLd data={studentProjectsSchema} />
      <StudentProjectsClient />
    </>
  );
}