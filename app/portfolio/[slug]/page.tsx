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
      title: 'Case Study | Ostrune Portfolio',
    };
  }

  const location = project.client_location || project.client_city || 'Global';

  return {
    title: `${project.title} | ${project.client_name} (${location})`,
    description: `${project.short_description} Results: ${project.results}`,
    openGraph: {
      title: `${project.title} - ${project.client_name}`,
      description: project.short_description,
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
