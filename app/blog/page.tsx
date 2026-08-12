import React from 'react';
import { getBlogPosts } from '@/lib/supabase/data';
import BlogPageClient from './BlogPageClient';

export const revalidate = 60; // Revalidate blog page every 60s

export default async function BlogPage() {
  const posts = await getBlogPosts(true);

  return <BlogPageClient initialPosts={posts} />;
}
