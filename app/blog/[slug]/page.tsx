import React from 'react';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/supabase/data';
import type { BlogPost } from '@/types';
import { seoRobots, getSiteUrl, getOgImageUrl, getSiteName } from '@/lib/seo';
import BlogPostClientView from './BlogPostClientView';

export const dynamicParams = true;
// ISR: pre-render all blog posts at build, cache at the edge, revalidate in background.
// Kills the 3-5s on every request by avoiding a per-request serverless + Supabase round trip.
export const revalidate = 300;
export const dynamic = 'auto';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts(true);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.is_published) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt || `Read ${post.title} on Ostrune.`,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      type: 'article',
      publishedTime: post.published_at || post.created_at,
      authors: [post.author_name || 'Ostrune'],
      siteName: getSiteName(),
      images: [
        {
          url:
            post.cover_image_url ||
            getOgImageUrl({ title: post.title, description: post.excerpt || '', type: 'article' }),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    robots: seoRobots(),
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url:
            post.cover_image_url ||
            getOgImageUrl({ title: post.title, description: post.excerpt || '', type: 'article' }),
          alt: post.title,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const allPublished = await getBlogPosts(true);
  const post = allPublished.find((p) => p.slug === slug) || (await getBlogPostBySlug(slug));

  let finalRelated: BlogPost[] = [];
  if (post) {
    const relatedPosts = allPublished
      .filter((p) => p.slug !== post.slug && p.category === post.category)
      .slice(0, 3);
    finalRelated =
      relatedPosts.length > 0
        ? relatedPosts
        : allPublished.filter((p) => p.slug !== post.slug).slice(0, 3);
  }

  return (
    <BlogPostClientView
      slug={slug}
      serverPost={post && post.is_published ? post : null}
      serverRelated={finalRelated}
    />
  );
}
