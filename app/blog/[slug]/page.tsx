import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  MapPin,
  Tag,
  Share2,
  BookOpen,
} from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/supabase/data';

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
    return {
      title: 'Article Not Found',
    };
  }

  const siteUrl = 'https://apexpulse.in';
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | ApexPulse Growth Hub`,
    description: post.excerpt || `Read ${post.title} on ApexPulse India.`,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      type: 'article',
      publishedTime: post.published_at || post.created_at,
      authors: [post.author_name || 'ApexPulse Team'],
      images: [
        {
          url: post.cover_image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
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
      images: [post.cover_image_url],
    },
  };
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.is_published) {
    notFound();
  }

  const allPublished = await getBlogPosts(true);
  const relatedPosts = allPublished
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  // Fallback to general related if no category match
  const finalRelated =
    relatedPosts.length > 0
      ? relatedPosts
      : allPublished.filter((p) => p.slug !== post.slug).slice(0, 3);

  const wordCount = post.content ? post.content.split(/\s+/).length : 300;
  const readTimeMinutes = Math.max(2, Math.ceil(wordCount / 200));

  const pubDate = post.published_at || post.created_at;
  const formattedDate = pubDate
    ? new Date(pubDate).toLocaleDateString('en-IN', {
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
    image: post.cover_image_url,
    datePublished: post.published_at || post.created_at,
    author: {
      '@type': 'Person',
      name: post.author_name || 'ApexPulse Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ApexPulse Digital Agency India',
      logo: {
        '@type': 'ImageObject',
        url: 'https://apexpulse.in/logo.png',
      },
    },
  };

  return (
    <div className="pt-28 pb-20 bg-[#F9FAFB] min-h-screen bg-line-pattern">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="max-w-4xl mx-auto px-4 space-y-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B7280] hover:text-[#1C1C1C] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to All Articles</span>
        </Link>

        {/* Hero Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-[4px] bg-[#3B82F6] text-white text-xs font-bold uppercase">
              {post.category === 'web_dev'
                ? 'Web Engineering'
                : post.category === 'seo'
                ? 'SEO Dominance'
                : post.category === 'meta_ads'
                ? 'Meta Ads'
                : post.category === 'lead_gen'
                ? 'Lead Generation'
                : 'General'}
            </span>

            {post.city && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1C1C1C] bg-white px-2.5 py-0.5 rounded-[4px] border border-[#E5E7EB]">
                <MapPin size={11} className="text-[#3B82F6]" />
                {post.city}, India
              </span>
            )}

            {post.target_keyword && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF9D00] bg-[#FFF9E6] px-2.5 py-0.5 rounded-[4px] border border-[#FFD21E]/60">
                <Tag size={11} className="text-[#FF9D00]" />
                {post.target_keyword}
              </span>
            )}
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
        <div className="relative h-64 sm:h-[400px] w-full rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xs bg-white">
          <Image
            src={
              post.cover_image_url ||
              'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
            }
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover"
          />
        </div>

        {/* Main Content Body */}
        <Card className="p-6 sm:p-10 bg-white border border-[#E5E7EB] space-y-6 text-[#1C1C1C] leading-relaxed">
          {post.excerpt && (
            <p className="text-base sm:text-lg font-semibold text-[#6B7280] italic border-l-4 border-[#FF9D00] pl-4 py-1">
              "{post.excerpt}"
            </p>
          )}

          {/* Simple Structured Markdown / HTML Renderer */}
          <div className="space-y-4 text-sm sm:text-base text-[#1C1C1C] whitespace-pre-line font-sans">
            {post.content}
          </div>
        </Card>

        {/* Free Consultation CTA Block */}
        <Card className="p-6 sm:p-8 bg-white border-2 border-[#FFD21E] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] text-xs font-bold">
              <Sparkles size={13} /> Ready to Scale Your Organic Pipeline?
            </div>
            <h3 className="text-xl font-bold text-[#1C1C1C]">
              Get a Free Growth & Technical SEO Audit
            </h3>
            <p className="text-xs text-[#6B7280]">
              Our engineering team will analyze your site speed, keyword gaps, and conversion funnel for free.
            </p>
          </div>

          <Button href="/contact" variant="primary" size="md" className="shrink-0">
            <span>Get Free Consultation</span>
            <ArrowRight size={15} />
          </Button>
        </Card>

        {/* Related Posts Section (2-3 posts from same category) */}
        {finalRelated.length > 0 && (
          <div className="pt-8 border-t border-[#E5E7EB] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#1C1C1C]">Related Articles</h3>
              <Link href="/blog" className="text-xs font-bold text-[#FF9D00] hover:underline">
                View All Articles →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {finalRelated.map((rel) => (
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
