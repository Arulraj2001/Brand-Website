import React from 'react';
import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/supabase/data';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Technical SEO, Web Dev & Growth Guides | Engineering Blog',
  description:
    'In-depth technical guides on Next.js web performance, old website refactoring, high-ROAS ad funnels, and organic search architecture.',
  alternates: {
    canonical: 'https://ostrune.netlify.app/blog',
  },
  openGraph: {
    title: 'Technical SEO, Web Dev & Growth Guides | Engineering Blog | Ostrune',
    description:
      'In-depth technical guides on Next.js web performance, old website refactoring, high-ROAS ad funnels, and organic search architecture.',
    url: 'https://ostrune.netlify.app/blog',
    type: 'website',
    images: [
      {
        url: 'https://ostrune.netlify.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ostrune Engineering Blog',
      },
    ],
  },
};

export const revalidate = 0; // Fetch fresh published posts on every page load
export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await getBlogPosts(true);

  return <BlogPageClient initialPosts={posts} />;
}
