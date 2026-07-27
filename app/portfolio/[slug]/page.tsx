import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Quote, Building, AlertTriangle, ShieldCheck, TrendingUp, ExternalLink } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import GalleryLightbox from '@/components/ui/GalleryLightbox';
import { getProjectBySlug, getPortfolioProjects } from '@/lib/supabase/data';

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getPortfolioProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Case Study Not Found',
    };
  }

  return {
    title: `${project.title} | ${project.client_name} ${project.client_city}`,
    description: `${project.short_description} Results: ${project.results}`,
    openGraph: {
      title: `${project.title} - ${project.client_name}`,
      description: project.short_description,
      images: [{ url: project.cover_image_url }],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://apexpulse.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Portfolio',
        item: 'https://apexpulse.in/portfolio',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `https://apexpulse.in/portfolio/${project.slug}`,
      },
    ],
  };

  return (
    <div className="pt-32 pb-24 bg-[#F7F8FB] min-h-screen bg-line-pattern">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#4B4F63] hover:text-[#4F46E5] transition-colors min-h-[44px]"
        >
          <ArrowLeft size={16} />
          <span>Back to All Case Studies</span>
        </Link>

        {/* Hero Header */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-[#F1F0FE] text-[#4F46E5] text-xs font-extrabold uppercase tracking-wider border border-[#4F46E5]/20">
              {project.service_type === 'web_dev'
                ? 'Web Development'
                : project.service_type === 'seo'
                ? 'SEO Dominance'
                : project.service_type === 'meta_ads'
                ? 'Meta Ads'
                : 'Lead Generation'}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#4B4F63] bg-white px-3 py-1 rounded-full border border-[#E7E8F0]">
              <MapPin size={12} className="text-[#0EA5E9]" />
              {project.client_city}, India
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#4B4F63] bg-white px-3 py-1 rounded-full border border-[#E7E8F0]">
              <Building size={12} className="text-[#7C3AED]" />
              {project.client_name}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F1222] tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-lg text-[#4B4F63] leading-relaxed">
            {project.short_description}
          </p>

          {project.live_url && (
            <div className="pt-1">
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold shadow-xs transition-colors min-h-[44px]"
              >
                <span>Visit Live Website</span>
                <ExternalLink size={14} />
              </a>
            </div>
          )}

          {/* Results Summary Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#0EA5E9] text-white shadow-lg space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/80">
              <Sparkles size={16} />
              <span>Verified Impact Metrics</span>
            </div>
            <p className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {project.results}
            </p>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="relative h-96 sm:h-[480px] w-full rounded-3xl overflow-hidden border border-[#E7E8F0] shadow-md">
          <Image
            src={project.cover_image_url}
            alt={`${project.title} - ${project.client_name} ${project.client_city}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="object-cover"
          />
        </div>

        {/* Structured Problem → Solution → Results Matrix */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1222]">
              Case Study <GradientText>Breakdown Matrix</GradientText>
            </h2>
            <p className="text-sm text-[#4B4F63]">
              How we diagnosed the bottleneck, built custom code, and scaled revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Problem */}
            <Card className="bg-white border-2 border-red-100 p-6 rounded-3xl space-y-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                <AlertTriangle size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#0F1222]">1. The Problem</h3>
              <p className="text-xs text-[#4B4F63] leading-relaxed">
                {project.full_description}
              </p>
              <div className="pt-2 border-t border-[#E7E8F0] text-xs font-semibold text-red-600">
                • High drop-off rate & unverified leads
              </div>
            </Card>

            {/* 2. Solution */}
            <Card className="bg-white border-2 border-[#4F46E5]/20 p-6 rounded-3xl space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#4F46E5]/10 text-[#4F46E5] flex items-center justify-center font-bold">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#0F1222]">2. The Solution</h3>
              <p className="text-xs text-[#4B4F63] leading-relaxed">
                Engineered custom web software architecture with high-speed server-rendered pages, automated WhatsApp qualification webhooks, and targeted local SEO schema for Tier 1 Indian cities.
              </p>
              <div className="pt-2 border-t border-[#E7E8F0] text-xs font-semibold text-[#4F46E5]">
                • Custom Web & App + Supabase build
              </div>
            </Card>

            {/* 3. Results */}
            <Card className="bg-[#F1F0FE] border-2 border-[#10B981]/30 p-6 rounded-3xl space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center font-bold">
                <TrendingUp size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#0F1222]">3. The Results</h3>
              <p className="text-xs font-bold text-[#10B981] leading-relaxed">
                {project.results}
              </p>
              <div className="pt-2 border-t border-[#10B981]/20 text-xs font-semibold text-[#10B981]">
                • Sustained 300%+ pipeline growth
              </div>
            </Card>
          </div>
        </div>

        {/* Gallery Component with Interactive Lightbox */}
        <GalleryLightbox images={project.gallery_urls || []} />

        {/* Client Testimonial Block */}
        {project.testimonial && (
          <Card className="bg-[#0F1222] text-white p-8 sm:p-10 rounded-3xl relative overflow-hidden border-none shadow-xl">
            <Quote size={48} className="text-white/10 absolute top-6 right-6" />
            <p className="text-lg sm:text-xl font-medium italic text-white leading-relaxed mb-6">
              "{project.testimonial}"
            </p>
            <div className="border-t border-white/10 pt-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-white text-base">{project.client_name}</p>
                <p className="text-xs text-[#0EA5E9] font-medium">{project.client_city}, India</p>
              </div>
            </div>
          </Card>
        )}

        {/* "Get Similar Results" CTA */}
        <div className="bg-[#F1F0FE] border border-[#7C3AED]/20 rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-[#0F1222]">
            Want Similar Results for Your <GradientText>Indian Brand?</GradientText>
          </h2>
          <p className="text-base text-[#4B4F63] max-w-xl mx-auto">
            Book a free 30-minute consultation and get a tailored growth proposal within 2 hours.
          </p>
          <Button href="/contact" variant="primary" size="lg">
            <span>Get Similar Results — Get a Quote</span>
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
