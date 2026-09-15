import React, { cache } from 'react';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getPortfolioProjects } from '@/lib/supabase/data';
import { seoRobots, getSiteUrl, getOgImageUrl, getSiteName } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { caseStudySchema, breadcrumbListSchema } from '@/lib/schema';
import CaseStudyClientView from './CaseStudyClientView';

export const dynamicParams = true;

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

const getCachedProject = cache(async (slug: string) => {
  return getProjectBySlug(slug);
});

export async function generateStaticParams() {
  const projects = await getPortfolioProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = await getCachedProject(slug);

  if (!project) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const cleanedTitle = project.title.split(/[–—-]/)[0].trim();
  const rawTitle = `${cleanedTitle} Case Study | Ostrune`;
  const metaTitle = rawTitle.length > 58 ? `${cleanedTitle.slice(0, 42).trim()} | Ostrune` : rawTitle;

  const cleanRawDesc = (project.short_description || project.full_description || '')
    .replace(/\r?\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const resultsSuffix = project.results ? ` Results: ${project.results}.` : '';
  const combinedDesc = `${cleanRawDesc}${resultsSuffix}`;
  const metaDescription =
    combinedDesc.length > 155 ? `${combinedDesc.slice(0, 151)}...` : combinedDesc;

  return {
    title: {
      absolute: metaTitle,
    },
    description: metaDescription,
    alternates: {
      canonical: `${siteUrl}/portfolio/${project.slug}`,
    },
    robots: seoRobots(),
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `${siteUrl}/portfolio/${project.slug}`,
      images: [
        { url: project.cover_image_url },
        getOgImageUrl({ title: metaTitle, description: metaDescription, type: 'article' }),
      ],
      siteName: getSiteName(),
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [
        project.cover_image_url ||
          getOgImageUrl({ title: metaTitle, description: metaDescription, type: 'article' }),
      ],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = await getCachedProject(slug);

  if (!project) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const cleanRawDesc = (project.short_description || project.full_description || '')
    .replace(/\r?\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const resultsSuffix = project.results ? ` Results: ${project.results}.` : '';
  const combinedDesc = `${cleanRawDesc}${resultsSuffix}`;
  const caseStudyDescription =
    combinedDesc.length > 155 ? `${combinedDesc.slice(0, 151)}...` : combinedDesc;

  const caseStudyJsonLd = [
    caseStudySchema({
      title: project.title,
      url: `${siteUrl}/portfolio/${project.slug}`,
      description: caseStudyDescription,
      clientName: project.client_name,
      clientLocation: project.client_location || project.client_city || 'Global',
      image: project.cover_image_url,
      datePublished: project.created_at,
      authorName: 'Ostrune',
      techStack: project.tech_stack,
      results: project.results,
    }),
    breadcrumbListSchema([
      { name: 'Home', item: siteUrl },
      { name: 'Portfolio', item: `${siteUrl}/portfolio` },
      { name: project.title, item: `${siteUrl}/portfolio/${project.slug}` },
    ]),
  ];

  return (
    <>
      <JsonLd data={caseStudyJsonLd} />
      <CaseStudyClientView
        slug={slug}
        serverProject={project}
      />
    </>
  );
}

