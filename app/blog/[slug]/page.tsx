import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface BlogArticleProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: 'nextjs-website-cost-india-2026' },
    { slug: 'commercial-keyword-seo-strategy-india' },
    { slug: 'scaling-meta-ads-whatsapp-funnel-india' },
  ];
}

export async function generateMetadata({ params }: BlogArticleProps) {
  const { slug } = await params;
  const title = slug.replace(/-/g, ' ').toUpperCase();
  return {
    title: `${title} | ApexPulse India Blog`,
    description: `Read technical insights on ${title} for Indian business growth.`,
  };
}

export default async function BlogArticlePage({ params }: BlogArticleProps) {
  const { slug } = await params;

  return (
    <div className="pt-32 pb-24 bg-[#F7F8FB] min-h-screen bg-line-pattern">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#4B4F63] hover:text-[#4F46E5] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to All Articles</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs text-[#9497AC]">
            <span className="bg-[#F1F0FE] text-[#4F46E5] font-bold px-3 py-1 rounded-full uppercase">
              Engineering & Growth
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar size={14} /> July 2026
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={14} /> 6 min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F1222] tracking-tight leading-tight">
            How Much Does Custom Web & App Development Cost in India? <GradientText>(2026 Guide)</GradientText>
          </h1>
        </div>

        {/* Hero Image */}
        <div className="relative h-96 w-full rounded-3xl overflow-hidden border border-[#E7E8F0] shadow-md">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
            alt="Custom Web & Mobile App Development Cost India"
            fill
            className="object-cover"
          />
        </div>

        {/* Body Content */}
        <Card className="bg-white p-8 sm:p-12 space-y-6 text-[#4B4F63] leading-relaxed">
          <h2 className="text-2xl font-bold text-[#0F1222]">The Evolution of Web Development in India</h2>
          <p>
            For over a decade, Indian agencies defaulted to cheap WordPress or PHP templates. While these worked for basic brochure sites, they quickly become slow, bloated with plugins, and vulnerable to security breaches as traffic scales.
          </p>

          <h3 className="text-xl font-bold text-[#0F1222]">Why Modern Ambitious Brands Choose Custom Web Software</h3>
          <p>
            Modern server-rendered web architectures provide static generation and edge API routes that load in less than 0.8 seconds even on mobile networks across Tier 2 Indian cities.
          </p>

          <div className="p-6 bg-[#F1F0FE] border-l-4 border-[#4F46E5] rounded-r-2xl space-y-2">
            <p className="font-bold text-[#0F1222] text-sm">Key Takeaway for Founders:</p>
            <p className="text-xs text-[#4B4F63]">
              A custom engineered web portal reduces user drop-off by up to 40% compared to legacy WordPress templates, delivering immediate return on investment for ad campaigns.
            </p>
          </div>

          <h3 className="text-xl font-bold text-[#0F1222]">Budget Ranges for Web & App Development in India</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 font-semibold text-[#0F1222]">
              <CheckCircle2 size={16} className="text-[#10B981]" />
              <strong>₹25,000 – ₹50,000:</strong> Custom Web & App Marketing Site (5-8 Pages + Supabase Integration)
            </div>
            <div className="flex items-center gap-2 font-semibold text-[#0F1222]">
              <CheckCircle2 size={16} className="text-[#10B981]" />
              <strong>₹50,000 – ₹100,000:</strong> High-Converting Web Application + Custom Dashboard & WhatsApp Lead Webhooks
            </div>
            <div className="flex items-center gap-2 font-semibold text-[#0F1222]">
              <CheckCircle2 size={16} className="text-[#10B981]" />
              <strong>₹100,000+:</strong> Enterprise Platform with Multi-Tenant Auth, Payment Gateway & Custom Database
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="bg-[#F1F0FE] border border-[#7C3AED]/20 p-8 sm:p-12 rounded-3xl text-center space-y-4">
          <h2 className="text-2xl font-extrabold text-[#0F1222]">Ready to Build a Custom Web & App Platform?</h2>
          <p className="text-sm text-[#4B4F63] max-w-md mx-auto">
            Book a free strategy session with our lead architects in Bengaluru.
          </p>
          <Button href="/contact" variant="primary" size="lg">
            <span>Get a Custom Proposal</span>
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
