import React from 'react';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { webPageSchema, breadcrumbListSchema } from '@/lib/schema';
import { getOgImageUrl, getSiteUrl, getSiteName, seoRobots } from '@/lib/seo';
import { getBlogPosts } from '@/lib/supabase/data';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Technical SEO, Web Dev & Growth Guides | Engineering Blog',
  description:
    'In-depth technical guides on Next.js web performance, old website refactoring, high-ROAS ad funnels, and organic search architecture.',
  alternates: {
    canonical: `${getSiteUrl()}/blog`,
  },
  openGraph: {
    title: 'Technical SEO, Web Dev & Growth Guides | Engineering Blog | Ostrune',
    description:
      'In-depth technical guides on Next.js web performance, old website refactoring, high-ROAS ad funnels, and organic search architecture.',
    url: `${getSiteUrl()}/blog`,
    type: 'website',
    siteName: getSiteName(),
    images: [
      {
        url: getOgImageUrl({ title: 'Technical SEO, Web Dev & Growth Guides | Engineering Blog', description: 'In-depth technical guides on Next.js web performance, old website refactoring, high-ROAS ad funnels,and organic search architecture.', type: 'blog' }),
        width: 1200,
        height: 630,
        alt: 'Ostrune Engineering Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technical SEO, Web Dev & Growth Guides | Engineering Blog | Ostrune',
    description:
      'In-depth technical guides on Next.js web performance, old website refactoring, high-ROAS ad funnels,and organic search architecture.',
    images: [getOgImageUrl({ title: 'Technical SEO, Web Dev & Growth Guides | Engineering Blog', description: 'In-depth technical guides on Next.js web performance, old website refactoring, high-ROAS ad funnels,and organic search architecture.', type: 'blog' })],
  },
  robots: seoRobots(),
};

// ISR: pre-render at build, cache at the edge, revalidate in background.
// Refresh new published posts in the background every 5 minutes instead of every request.
export const revalidate = 300;
export const dynamic = 'auto';

export default async function BlogPage() {
  const blogIndexSchema = [
    webPageSchema({ url: `${getSiteUrl()}/blog`, name: 'Technical SEO, Web Dev & Growth Guides | Engineering Blog', description: 'In-depth technical guides on Next.js web performance, old website refactoring, high-ROAS ad funnels,and organic search architecture.' }),
    breadcrumbListSchema([
      { name: 'Home', item: getSiteUrl() },
      { name: 'Blog', item: `${getSiteUrl()}/blog` },
    ]),
  ];
  const posts = await getBlogPosts(true);

  return (
    <>
      <JsonLd data={blogIndexSchema} />
      <BlogPageClient initialPosts={posts} />
    </>
  );
}
