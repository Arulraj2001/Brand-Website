import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Calendar, Clock, User, BookOpen } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import Card from '@/components/ui/Card';

export const metadata = {
  title: 'Blog & Insights | Technical SEO & Web Engineering India',
  description: 'Articles on web application performance, commercial keyword targeting, Meta Ads ROAS, and lead qualification for Indian businesses.',
};

const BLOG_POSTS = [
  {
    title: 'How Much Does Custom Web & App Development Cost in India (2026 Breakdown)',
    slug: 'nextjs-website-cost-india-2026',
    excerpt: 'Detailed pricing guide comparing WordPress template costs vs custom web software engineering ROI for Tier 1 Indian companies.',
    category: 'Engineering',
    date: 'July 24, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Commercial Intent Keyword SEO Strategy for Bengaluru & Mumbai Brands',
    slug: 'commercial-keyword-seo-strategy-india',
    excerpt: 'How to rank top 3 across local search results in major metro hubs using JSON-LD schemas and high-authority Indian media backlinks.',
    category: 'SEO',
    date: 'July 18, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Scaling Meta Ads ROAS to 5x+ with Instant WhatsApp Lead Funnels',
    slug: 'scaling-meta-ads-whatsapp-funnel-india',
    excerpt: 'Step-by-step guide to eliminating fake ad clicks and routing verified +91 mobile leads straight to your sales team.',
    category: 'Performance Ads',
    date: 'July 10, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
  },
];

export default function BlogPage() {
  return (
    <div className="pt-32 pb-24 bg-[#F7F8FB] min-h-screen bg-line-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1F0FE] text-[#4F46E5] text-xs font-bold uppercase tracking-wider border border-[#4F46E5]/20">
            <BookOpen size={14} /> Knowledge & SEO Hub
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F1222] tracking-tight">
            Growth Insights & <GradientText>Web Engineering Guides</GradientText>
          </h1>
          <p className="text-lg text-[#4B4F63] leading-relaxed">
            Actionable strategies on web application speed, search engine dominance, and performance marketing in India.
          </p>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <Card
              key={post.slug}
              className="flex flex-col justify-between bg-white border border-[#E7E8F0] rounded-3xl overflow-hidden hover:border-[#7C3AED]/40 hover:shadow-[0_12px_36px_rgba(79,70,229,0.12)] transition-all group p-0"
            >
              <div className="relative h-56 w-full overflow-hidden bg-[#F1F0FE]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#4F46E5]">
                  {post.category}
                </span>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-[#9497AC]">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-[#0F1222] group-hover:text-[#4F46E5] transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-sm text-[#4B4F63] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E7E8F0] flex items-center justify-between">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0F1222] group-hover:text-[#4F46E5] transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
