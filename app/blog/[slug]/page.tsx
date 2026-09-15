import React, { cache } from 'react';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts, getRelatedBlogPosts } from '@/lib/supabase/data';
import { seoRobots, getSiteUrl, getOgImageUrl, getSiteName } from '@/lib/seo';
import BlogPostClientView from './BlogPostClientView';

export const dynamicParams = true;
// ISR: pre-render all blog posts at build, cache at the edge, revalidate in background.
// Kills latency by serving from cache and revalidating asynchronously.
export const revalidate = 300;
export const dynamic = 'auto';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const getCachedPost = cache(async (slug: string) => {
  return getBlogPostBySlug(slug);
});

export async function generateStaticParams() {
  const posts = await getBlogPosts(true);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getCachedPost(slug);

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
  const post = await getCachedPost(slug);

  if (!post || !post.is_published) {
    notFound();
  }

  const finalRelated = await getRelatedBlogPosts(post.slug, post.category, 3);

  return (
    <BlogPostClientView
      slug={slug}
      serverPost={post}
      serverRelated={finalRelated}
    />
  );
}

