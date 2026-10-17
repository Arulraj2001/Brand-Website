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
import { getSiteUrl } from '@/lib/seo';

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
  const siteUrl = getSiteUrl();
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
      <div className="pt-32 pb-20 bg-[#05060A] text-white min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-3 border-[#FFB800] border-t-transparent rounded-full animate-spin mx-auto shadow-lg shadow-[#FFB800]/20" />
          <p className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Decrypting Telemetry Article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-36 pb-28 bg-[#05060A] text-white min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#FFB800]/10 blur-[150px] pointer-events-none" />
        <div className="max-w-md w-full text-center space-y-6 cyber-glass border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.04] text-[#FFB800] flex items-center justify-center mx-auto border border-[#FFB800]/30 shadow-lg">
            <Compass size={32} />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FFB800]">
              TELEMETRY ERROR 404
            </span>
            <h1 className="text-2xl font-black text-white">
              Article Unavailable
            </h1>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              This intelligence brief may have been archived or relocated in the active deployment index.
            </p>
          </div>

          <div className="pt-2">
            <Button href="/blog" variant="primary" size="md" className="w-full">
              <ArrowLeft size={16} />
              <span>Return to Intelligence Hub</span>
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
        month: 'short',
        year: 'numeric',
      })
    : 'Recent';

  // Extract FAQ items for FAQPage Schema
  const faqItems: { question: string; answer: string }[] = [];
  if (post.content) {
    const lines = post.content.split('\n');
    let currentQ = '';
    let currentA: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const headingMatch = line.match(/^#{2,4}\s+(.+)/);
      const boldQuestionMatch = line.match(/^\*\*(?:Q:\s*|)(.+\?)\*\*/);

      const isQuestion =
        (headingMatch && headingMatch[1].trim().endsWith('?')) ||
        boldQuestionMatch;

      if (isQuestion) {
        if (currentQ && currentA.length > 0) {
          faqItems.push({ question: currentQ, answer: currentA.join(' ').trim() });
        }
        currentQ = (boldQuestionMatch ? boldQuestionMatch[1] : headingMatch ? headingMatch[1] : line)
          .replace(/^\*\*(Q:\s*)?|\*\*$/g, '')
          .trim();
        currentA = [];
      } else if (currentQ && line && !line.startsWith('#')) {
        const cleanLine = line.replace(/^\*\*(A:\s*)?|\*\*$/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
        if (cleanLine) currentA.push(cleanLine);
      }
    }
    if (currentQ && currentA.length > 0) {
      faqItems.push({ question: currentQ, answer: currentA.join(' ').trim() });
    }
  }

  // Cover image alt text under 125 chars derived from prompt or title
  const coverAltText = (
    post.cover_image_prompt && post.cover_image_prompt.length < 125
      ? post.cover_image_prompt
      : `${post.title} - ${post.category.replace('_', ' ')} guide by Ostrune`
  ).slice(0, 124);

  // FAQPage JSON-LD Schema (rendered uniquely on client view)
  const faqJsonLd =
    faqItems.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <div className="pt-32 pb-24 bg-[#05060A] text-white min-h-screen relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#FFB800]/10 blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#00F0FF]/5 blur-[200px] pointer-events-none" />

      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <article className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10 relative z-10">
        {/* Back Link */}
        <Link
          href="/blog"
          prefetch={true}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gray-400 hover:text-[#FFB800] transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>&larr; Return to Intelligence Hub</span>
        </Link>

        {/* Hero Header */}
        <div className="space-y-5 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/30 text-xs font-mono font-bold uppercase tracking-wider">
              {post.category.replace('_', ' ')}
            </span>

            {post.city && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-300 cyber-glass px-3 py-1 rounded-full border border-white/[0.08]">
                <MapPin size={11} className="text-[#00F0FF]" />
                {post.city}
              </span>
            )}

            {post.target_keyword && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#FFB800] bg-[#FFB800]/10 px-3 py-1 rounded-full border border-[#FFB800]/25">
                <Tag size={11} />
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
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-gray-400 cyber-glass px-2.5 py-0.5 rounded-full border border-white/[0.06]"
                  >
                    #{cleanKw.replace(/\s+/g, '-')}
                  </span>
                );
              })}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs font-mono text-gray-400 pt-1">
            <Link href="/about" className="flex items-center gap-1.5 hover:text-[#FFB800] transition-colors">
              <User size={13} className="text-[#FFB800]" /> <span>{post.author_name || 'Ostrune Team'}</span>
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-[#00F0FF]" /> {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-[#10B981]" /> {readTimeMinutes} min read
            </span>
          </div>
        </div>

        {/* Hero Cover Image with Alt Text */}
        <div className="relative h-64 sm:h-[440px] w-full rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl bg-[#090A12]">
          <Image
            src={
              post.cover_image_url ||
              `/api/blog-banner?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}&excerpt=${encodeURIComponent(post.excerpt || '')}&city=${encodeURIComponent(post.city || 'Global')}`
            }
            alt={coverAltText}
            fill
            sizes="(max-width: 768px) 100vw, 90vw"
            className="object-cover blur-xl opacity-30 scale-110"
          />
          <Image
            src={
              post.cover_image_url ||
              `/api/blog-banner?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}&excerpt=${encodeURIComponent(post.excerpt || '')}&city=${encodeURIComponent(post.city || 'Global')}`
            }
            alt={coverAltText}
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
          <div className="pt-10 border-t border-white/[0.08] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-white">Related Intelligence</h3>
              <Link href="/blog" prefetch={true} className="text-xs font-mono font-bold text-[#FFB800] hover:text-[#FFD21E] transition-colors">
                View All Dossiers &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedPosts.map((rel) => (
                <div key={rel.id} className="cyber-glass p-5 rounded-2xl border border-white/[0.08] hover:border-[#FFB800]/40 transition-all flex flex-col justify-between space-y-3 group">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-[#00F0FF] uppercase">
                      {rel.category.replace('_', ' ')}
                    </span>
                    <h4 className="font-bold text-sm text-white line-clamp-2 group-hover:text-[#FFB800] transition-colors">
                      <Link href={`/blog/${rel.slug}`} prefetch={true}>{rel.title}</Link>
                    </h4>
                  </div>
                  <Link
                    href={`/blog/${rel.slug}`}
                    prefetch={true}
                    className="text-xs font-mono font-bold text-[#FFB800] hover:text-[#FFD21E] inline-flex items-center gap-1 pt-1"
                  >
                    <span>Read Dossier</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
