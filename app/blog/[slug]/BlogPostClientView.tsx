'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Tag,
  Compass,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import RichArticleContent from '@/components/blog/RichArticleContent';
import BlogEndCta from '@/components/blog/BlogEndCta';
import { BlogPost } from '@/types';
import { getBlogPosts } from '@/lib/supabase/data';

interface BlogPostClientViewProps {
  slug: string;
  serverPost: BlogPost | null;
  serverRelated: BlogPost[];
}

export default function BlogPostClientView({
  slug,
  serverPost,
  serverRelated,
}: BlogPostClientViewProps) {
  const [post, setPost] = useState<BlogPost | null>(serverPost);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>(serverRelated);
  const [loading, setLoading] = useState<boolean>(!serverPost);

  useEffect(() => {
    if (serverPost) return;

    async function loadPublishedPost() {
      try {
        const publishedPosts = await getBlogPosts(true);
        const found = publishedPosts.find((p) => p.slug === slug) || null;
        setPost(found);

        if (found) {
          const relatedByCategory = publishedPosts
            .filter((p) => p.slug !== slug && p.category === found.category)
            .slice(0, 3);
          setRelatedPosts(
            relatedByCategory.length > 0
              ? relatedByCategory
              : publishedPosts.filter((p) => p.slug !== slug).slice(0, 3)
          );
        }
      } catch (e) {
        console.warn('Error loading published blog post', e);
      } finally {
        setLoading(false);
      }
    }

    loadPublishedPost();
  }, [slug, serverPost]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 bg-[#F9FAFB] min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#FF9D00] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-[#6B7280]">Loading Article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-36 pb-28 bg-[#F7F8FB] min-h-screen flex items-center justify-center px-4 bg-line-pattern">
        <div className="max-w-md w-full text-center space-y-6 bg-white border border-[#E7E8F0] p-8 sm:p-10 rounded-3xl shadow-md">
          <div className="w-16 h-16 rounded-2xl bg-[#FFF9E6] text-[#FF9D00] flex items-center justify-center mx-auto border border-[#FFD21E]/60">
            <Compass size={32} />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF9D00]">
              ARTICLE NOT FOUND
            </span>
            <h1 className="text-2xl font-extrabold text-[#1C1C1C]">
              Article Relocated or Unavailable
            </h1>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              This blog article may have been unpublished, relocated, or deleted by the author.
            </p>
          </div>

          <div className="pt-2">
            <Button href="/blog" variant="primary" size="md" className="w-full">
              <ArrowLeft size={16} />
              <span>Back to All Articles</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const wordCount = post.content ? post.content.split(/\s+/).length : 300;
  const readTimeMinutes = Math.max(2, Math.ceil(wordCount / 200));

  const pubDate = post.published_at || post.created_at;
  const formattedDate = pubDate
    ? new Date(pubDate).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Recent';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    datePublished: post.published_at || post.created_at,
    author: {
      '@type': 'Person',
      name: post.author_name || 'Ostrune Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ostrune',
    },
  };

  return (
    <div className="pt-28 pb-20 bg-[#F9FAFB] min-h-screen bg-line-pattern">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="max-w-6xl mx-auto px-4 space-y-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B7280] hover:text-[#1C1C1C] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to All Articles</span>
        </Link>

        {/* Hero Header */}
        <div className="space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-[4px] bg-[#3B82F6] text-white text-xs font-bold uppercase">
              {post.category.replace('_', ' ')}
            </span>

            {post.city && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1C1C1C] bg-white px-2.5 py-0.5 rounded-[4px] border border-[#E5E7EB]">
                <MapPin size={11} className="text-[#3B82F6]" />
                {post.city}
              </span>
            )}

            {post.target_keyword && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF9D00] bg-[#FFF9E6] px-2.5 py-0.5 rounded-[4px] border border-[#FFD21E]/60">
                <Tag size={11} className="text-[#FF9D00]" />
                #{post.target_keyword.replace(/\s+/g, '-')}
              </span>
            )}

            {post.secondary_keywords &&
              (Array.isArray(post.secondary_keywords)
                ? post.secondary_keywords
                : post.secondary_keywords.split(',')
              ).map((kw, idx) => {
                const cleanKw = kw.trim();
                if (!cleanKw) return null;
                return (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#6B7280] bg-white px-2 py-0.5 rounded-[4px] border border-[#E5E7EB]"
                  >
                    #{cleanKw.replace(/\s+/g, '-')}
                  </span>
                );
              })}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C1C1C] tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs font-semibold text-[#6B7280] pt-1">
            <span className="flex items-center gap-1">
              <User size={13} className="text-[#FF9D00]" /> {post.author_name}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar size={13} /> {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={13} /> {readTimeMinutes} min read
            </span>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="relative h-64 sm:h-[420px] w-full rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-sm bg-[#1C1C1C]">
          <Image
            src={
              post.cover_image_url ||
              `/api/blog-banner?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}&excerpt=${encodeURIComponent(post.excerpt || '')}&city=${encodeURIComponent(post.city || 'Global')}`
            }
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 90vw"
            className="object-cover blur-xl opacity-40 scale-110"
          />
          <Image
            src={
              post.cover_image_url ||
              `/api/blog-banner?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}&excerpt=${encodeURIComponent(post.excerpt || '')}&city=${encodeURIComponent(post.city || 'Global')}`
            }
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 90vw"
            className="object-contain p-4 relative z-10"
          />
        </div>

        {/* Rich Article Renderer */}
        <RichArticleContent
          content={post.content}
          excerpt={post.excerpt}
          title={post.title}
          category={post.category}
          postSlug={post.slug}
        />

        {/* End of Post CTA */}
        <BlogEndCta
          category={post.category}
          postSlug={post.slug}
          postTitle={post.title}
        />

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="pt-8 border-t border-[#E5E7EB] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#1C1C1C]">Related Articles</h3>
              <Link href="/blog" className="text-xs font-bold text-[#FF9D00] hover:underline">
                View All Articles →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedPosts.map((rel) => (
                <Card key={rel.id} className="p-4 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-[#3B82F6] uppercase">
                      {rel.category.replace('_', ' ')}
                    </span>
                    <h4 className="font-bold text-sm text-[#1C1C1C] line-clamp-2 hover:text-[#FF9D00] transition-colors">
                      <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                    </h4>
                  </div>
                  <Link
                    href={`/blog/${rel.slug}`}
                    className="text-xs font-bold text-[#FF9D00] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={12} />
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
