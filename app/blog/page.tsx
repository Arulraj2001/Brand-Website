import React from 'react';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { webPageSchema, breadcrumbListSchema } from '@/lib/schema';
import { getOgImageUrl, getSiteUrl, getSiteName, seoRobots } from '@/lib/seo';
import { getBlogPosts } from '@/lib/supabase/data';
import BlogPageClient from './BlogPageClient';

const blogTitle = 'Technical SEO, Web Dev & Growth Guides | Ostrune Blog';
const blogDescription =
  'In-depth technical engineering guides on Next.js web performance, legacy code refactoring, high-ROAS ad funnels, and scalable organic search architecture.';

export const metadata: Metadata = {
  title: {
    absolute: blogTitle,
  },
  description: blogDescription,
  alternates: {
    canonical: `${getSiteUrl()}/blog`,
  },
  openGraph: {
    title: blogTitle,
    description: blogDescription,
    url: `${getSiteUrl()}/blog`,
    type: 'website',
    siteName: getSiteName(),
    images: [
      {
        url: getOgImageUrl({ title: blogTitle, description: blogDescription, type: 'blog' }),
        width: 1200,
        height: 630,
        alt: 'Ostrune Engineering Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: blogTitle,
    description: blogDescription,
    images: [getOgImageUrl({ title: blogTitle, description: blogDescription, type: 'blog' })],
  },
  robots: seoRobots(),
};

// ISR: pre-render at build, cache at the edge, revalidate in background.
// Refresh new published posts in the background every 5 minutes instead of every request.
export const revalidate = 300;
export const dynamic = 'auto';

export default async function BlogPage() {
  const blogIndexSchema = [
    webPageSchema({
      url: `${getSiteUrl()}/blog`,
      name: blogTitle,
      description: blogDescription,
    }),
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
