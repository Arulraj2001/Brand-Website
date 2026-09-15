import React from 'react';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { webPageSchema, breadcrumbListSchema, educationalOrganizationSchema } from '@/lib/schema';
import { getOgImageUrl, getSiteUrl, getSiteName, seoRobots } from '@/lib/seo';
import StudentProjectsClient from './StudentProjectsClient';

const studentProjectsTitle = 'Final Year CS Projects & IEEE Viva Guidance | Learnithm';
const studentProjectsDescription =
  'Final year CS project guidance for BCA, MCA, B.Tech and M.Tech under MSME-registered Learnithm. Over 80 students cleared their IEEE viva with top grades.';

export const metadata: Metadata = {
  title: {
    absolute: studentProjectsTitle,
  },
  description: studentProjectsDescription,
  alternates: {
    canonical: `${getSiteUrl()}/student-projects`,
  },
  openGraph: {
    title: studentProjectsTitle,
    description: studentProjectsDescription,
    url: `${getSiteUrl()}/student-projects`,
    type: 'website',
    siteName: getSiteName(),
    images: [
      {
        url: getOgImageUrl({ title: studentProjectsTitle, description: studentProjectsDescription, type: 'page' }),
        width: 1200,
        height: 630,
        alt: 'Learnithm Student Projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: studentProjectsTitle,
    description: studentProjectsDescription,
    images: [getOgImageUrl({ title: studentProjectsTitle, description: studentProjectsDescription, type: 'page' })],
  },
  robots: seoRobots(),
};

export default function StudentProjectsPage() {
  const studentProjectsSchema = [
    educationalOrganizationSchema({
      name: 'Learnithm (Ostrune Academic Division)',
      url: `${getSiteUrl()}/student-projects`,
      description:
        'Academic engineering mentorship, IEEE final year computer science project development, full source code, and viva preparation.',
      parentOrganizationName: 'Ostrune',
      parentOrganizationUrl: getSiteUrl(),
    }),
    webPageSchema({
      url: `${getSiteUrl()}/student-projects`,
      name: studentProjectsTitle,
      description: studentProjectsDescription,
    }),
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