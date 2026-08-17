import React from 'react';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/supabase/data';
import type { BlogPost } from '@/types';
import BlogPostClientView from './BlogPostClientView';

export const dynamicParams = true;
export const revalidate = 0;
export const dynamic = 'force-dynamic';

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

  const siteUrl = 'https://ostrune.netlify.app';
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | Ostrune`,
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
      images: [
        {
          url:
            post.cover_image_url ||
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url:
            post.cover_image_url ||
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
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
  const post = await getBlogPostBySlug(slug);

  let finalRelated: BlogPost[] = [];
  if (post) {
    const allPublished = await getBlogPosts(true);
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
