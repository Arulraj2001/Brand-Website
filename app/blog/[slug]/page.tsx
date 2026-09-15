import React, { cache } from 'react';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts, getRelatedBlogPosts } from '@/lib/supabase/data';
import { seoRobots, getSiteUrl, getOgImageUrl, getSiteName } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { articleSchema, breadcrumbListSchema } from '@/lib/schema';
import BlogPostClientView from './BlogPostClientView';

export const dynamicParams = true;

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
  const rawExcerpt = post.excerpt || `Read ${post.title} on Ostrune. Technical insights on web development and SEO.`;
  const postDescription = rawExcerpt.length > 155 ? `${rawExcerpt.slice(0, 151)}...` : rawExcerpt;
  const postMetaTitle = post.title.length > 58 ? `${post.title.slice(0, 55)}...` : post.title;

  return {
    title: {
      absolute: postMetaTitle,
    },
    description: postDescription,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: postMetaTitle,
      description: postDescription,
      url: postUrl,
      type: 'article',
      publishedTime: post.published_at || post.created_at,
      authors: [post.author_name || 'Ostrune'],
      siteName: getSiteName(),
      images: [
        {
          url:
            post.cover_image_url ||
            getOgImageUrl({ title: post.title, description: postDescription, type: 'article' }),
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
      description: postDescription,
      images: [
        {
          url:
            post.cover_image_url ||
            getOgImageUrl({ title: post.title, description: postDescription, type: 'article' }),
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

  const siteUrl = getSiteUrl();
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const postImageUrl =
    post.cover_image_url ||
    getOgImageUrl({ title: post.title, description: post.excerpt || '', type: 'article' });

  const blogPostSchema = [
    articleSchema({
      headline: post.title,
      description: post.excerpt || undefined,
      url: postUrl,
      image: postImageUrl,
      datePublished: post.published_at || post.created_at,
      dateModified: post.created_at,
      authorName: post.author_name || 'Arulraj',
      authorUrl: `${siteUrl}/about`,
      publisherName: 'Ostrune',
      publisherLogo: `${siteUrl}/logo.png`,
    }),
    breadcrumbListSchema([
      { name: 'Home', item: siteUrl },
      { name: 'Blog', item: `${siteUrl}/blog` },
      { name: post.title, item: postUrl },
    ]),
  ];

  const finalRelated = await getRelatedBlogPosts(post.slug, post.category, 3);

  return (
    <>
      <JsonLd data={blogPostSchema} />
      <BlogPostClientView
        slug={slug}
        serverPost={post}
        serverRelated={finalRelated}
      />
    </>
  );
}

