import React from 'react';
import { getBlogPosts } from '@/lib/supabase/data';
import BlogPageClient from './BlogPageClient';

export const revalidate = 0; // Fetch fresh published posts on every page load
export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await getBlogPosts(true);

  return <BlogPageClient initialPosts={posts} />;
}
