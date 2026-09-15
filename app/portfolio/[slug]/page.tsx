import React, { cache } from 'react';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getPortfolioProjects } from '@/lib/supabase/data';
import { seoRobots, getSiteUrl, getOgImageUrl, getSiteName } from '@/lib/seo';
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

  const location = project.client_location || project.client_city || 'Global';
  const siteUrl = getSiteUrl();

  return {
    title: `${project.title} | ${project.client_name} (${location})`,
    description: `${project.short_description} Results: ${project.results}`,
    alternates: {
      canonical: `${siteUrl}/portfolio/${project.slug}`,
    },
    robots: seoRobots(),
    openGraph: {
      title: `${project.title} - ${project.client_name}`,
      description: project.short_description,
      url: `${siteUrl}/portfolio/${project.slug}`,
      images: [
        { url: project.cover_image_url },
        getOgImageUrl({ title: `${project.title} - ${project.client_name}`, description: project.short_description, type: 'article' }),
      ],
      siteName: getSiteName(),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - ${project.client_name}`,
      description: project.short_description,
      images: [
        project.cover_image_url || getOgImageUrl({ title: `${project.title} - ${project.client_name}`, description: project.short_description, type: 'article' }),
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

  return (
    <CaseStudyClientView
      slug={slug}
      serverProject={project}
    />
  );
}

