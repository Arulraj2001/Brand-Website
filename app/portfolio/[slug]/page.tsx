import React from 'react';
import { getProjectBySlug, getPortfolioProjects } from '@/lib/supabase/data';
import CaseStudyClientView from './CaseStudyClientView';

export const dynamicParams = true;

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getPortfolioProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Case Study | Client Project',
    };
  }

  const location = project.client_location || project.client_city || 'Global';
  const siteUrl = 'https://ostrune.netlify.app';

  return {
    title: `${project.title} | ${project.client_name} (${location})`,
    description: `${project.short_description} Results: ${project.results}`,
    alternates: {
      canonical: `${siteUrl}/portfolio/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} - ${project.client_name}`,
      description: project.short_description,
      url: `${siteUrl}/portfolio/${project.slug}`,
      images: [{ url: project.cover_image_url }],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return (
    <CaseStudyClientView
      slug={slug}
      serverProject={project}
    />
  );
}
