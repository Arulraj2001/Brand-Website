import React from 'react';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { webPageSchema } from '@/lib/schema';
import { seoRobots, getOgImageUrl, getSiteUrl, getSiteName } from '@/lib/seo';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  SERVICES_DETAIL_MAP,
  getServiceBySlug,
} from '@/lib/servicesData';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import BenchmarkImpactBadge from '@/components/ui/BenchmarkImpactBadge';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Clock,
  HelpCircle,
} from 'lucide-react';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(SERVICES_DETAIL_MAP).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/services/${service.slug}`;

  return {
    title: {
      absolute: service.metaTitle,
    },
    description: service.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: canonicalUrl,
      type: 'website',
      siteName: getSiteName(),
      images: [
        {
          url: getOgImageUrl({ title: service.metaTitle, description: service.metaDescription, type: 'service' }),
          width: 1200,
          height: 630,
          alt: `${service.title} - Ostrune`,
        },
      ],
    },
    robots: seoRobots(),
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle,
      description: service.metaDescription,
      images: [getOgImageUrl({ title: service.metaTitle, description: service.metaDescription, type: 'service' })],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;
  const siteUrl = getSiteUrl();

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${siteUrl}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `${siteUrl}/services/${service.slug}`,
      },
    ],
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    provider: {
      '@type': 'Organization',
      name: 'Ostrune',
      url: siteUrl,
    },
    areaServed: 'Worldwide',
    description: service.metaDescription,
    url: `${siteUrl}/services/${service.slug}`,
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="pt-32 pb-24 bg-[#05060A] text-white min-h-screen relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#FFB800]/10 blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#00F0FF]/5 blur-[200px] pointer-events-none" />

      <JsonLd data={[webPageSchema({ url: `${siteUrl}/services/${service.slug}`, name: service.title, description: service.metaDescription })]} />
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-12 relative z-10">
        {/* Back to Services Hub Link */}
        <div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gray-400 hover:text-[#FFB800] transition-colors group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            <span>&larr; Return to Capabilities Matrix</span>
          </Link>
        </div>

        {/* Page Hero Header */}
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFB800]/10 text-[#FFB800] text-xs font-mono font-bold border border-[#FFB800]/25 shadow-xs">
            <Icon size={14} className="text-[#FFB800]" />
            <span>{service.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            {service.h1}
          </h1>

          <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed">
            {service.tagline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="flex items-center gap-2 cyber-glass px-3.5 py-1.5 rounded-full border border-white/[0.08] text-xs font-mono text-gray-300">
              <Clock size={13} className="text-[#FFB800]" /> Global Time-Zone Coverage
            </span>
            <span className="flex items-center gap-2 cyber-glass px-3.5 py-1.5 rounded-full border border-white/[0.08] text-xs font-mono text-gray-300">
              <CheckCircle2 size={13} className="text-[#10B981]" /> Direct Developer Access
            </span>
            <span className="flex items-center gap-2 cyber-glass px-3.5 py-1.5 rounded-full border border-white/[0.08] text-xs font-mono text-gray-300">
              <ShieldCheck size={13} className="text-[#00F0FF]" /> Guaranteed Milestones
            </span>
          </div>
        </div>

        {/* Main Content Box: Pain Points vs Deliverables */}
        <div className="cyber-glass border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
          {/* Running Laser Accent Border */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFB800] to-transparent opacity-60" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pain Points */}
            <div className="bg-red-500/[0.03] border border-red-500/20 p-6 sm:p-8 rounded-2xl space-y-4">
              <h2 className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-red-400 tracking-wider">
                <AlertCircle size={16} />
                <span>Bottlenecks We Eliminate</span>
              </h2>
              <ul className="space-y-3 text-xs sm:text-sm text-gray-300 font-light">
                {service.painPoints.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-red-400 font-bold text-base shrink-0 leading-none">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables & Fix Process */}
            <div className="bg-cyan-500/[0.03] border border-cyan-500/20 p-6 sm:p-8 rounded-2xl space-y-4">
              <h2 className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-cyan-400 tracking-wider">
                <CheckCircle2 size={16} />
                <span>Our Engineering &amp; Execution Protocol</span>
              </h2>
              <ul className="space-y-3 text-xs sm:text-sm text-gray-300 font-light">
                {service.auditProcess.map((ap, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{ap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Benchmark Results Ticker */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
              Guaranteed Performance &amp; Deliverable Benchmarks
            </h2>
            <BenchmarkImpactBadge results={service.results} />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="cyber-glass border border-white/[0.08] rounded-3xl p-6 sm:p-10 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/30 flex items-center justify-center font-bold">
              <HelpCircle size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Technical FAQ
              </h2>
              <p className="text-xs font-mono text-gray-400">
                Detailed architecture and execution parameters for {service.title}.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors space-y-2.5"
              >
                <h3 className="text-sm font-bold text-white">
                  {faq.question}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div className="relative overflow-hidden p-10 sm:p-14 cyber-glass-glow rounded-3xl border border-[#FFB800]/30 text-center space-y-6 shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#FFB800]/10 blur-[120px] pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight relative z-10">
            Ready for Guaranteed {service.title} Results?
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed relative z-10 font-light">
            Book a 15-minute technical strategy session and receive your custom implementation brief within 12 hours.
          </p>
          <div className="pt-2 flex justify-center relative z-10">
            <Button href="/contact" variant="primary" size="lg">
              <span>Initiate Free Strategy Call</span>
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
