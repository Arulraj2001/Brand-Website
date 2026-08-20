import React from 'react';
import type { Metadata } from 'next';
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
    return {
      title: 'Service Not Found',
    };
  }

  const siteUrl = 'https://ostrune.netlify.app';
  const canonicalUrl = `${siteUrl}/services/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${service.title} - Ostrune`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle,
      description: service.metaDescription,
      images: [`${siteUrl}/og-image.jpg`],
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
  const siteUrl = 'https://ostrune.netlify.app';

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
    <div className="pt-28 pb-20 bg-[#F9FAFB] min-h-screen bg-line-pattern">
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

      <div className="max-w-[1200px] mx-auto px-4 space-y-12">
        {/* Back to Services Hub Link */}
        <div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#6B7280] hover:text-[#1C1C1C] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to All Growth Services</span>
          </Link>
        </div>

        {/* Page Hero Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#FFF9E6] text-[#FF9D00] text-xs font-bold border border-[#FFD21E]">
            <Icon size={14} className="text-[#FF9D00]" />
            <span>{service.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C1C1C] tracking-tight leading-tight">
            {service.h1}
          </h1>

          <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed">
            {service.tagline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-[#1C1C1C] pt-2">
            <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-[#E5E7EB]">
              <Clock size={13} className="text-[#FF9D00]" /> Global Time-Zone Coverage
            </span>
            <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-[#E5E7EB]">
              <CheckCircle2 size={13} className="text-[#10B981]" /> 12-Hour Reply SLA
            </span>
            <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-[#E5E7EB]">
              <ShieldCheck size={13} className="text-[#3B82F6]" /> Guaranteed Results
            </span>
          </div>
        </div>

        {/* Main Content Box: Pain Points vs Deliverables */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
          {/* Running Laser Accent Border */}
          <div className="relative h-1 bg-gradient-to-r from-[#FFD21E] via-[#FF9D00] to-[#3B82F6] rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pain Points */}
            <div className="bg-[#FFF9E6]/70 border border-[#FFD21E]/60 p-6 rounded-xl space-y-4">
              <div className="flex items-center gap-2 text-sm font-extrabold uppercase text-[#FF9D00] tracking-wider">
                <AlertCircle size={16} />
                <span>Common Challenges We Solve</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-[#1C1C1C] font-semibold">
                {service.painPoints.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#FF9D00] font-bold text-base shrink-0 leading-none">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables & Fix Process */}
            <div className="bg-[#F4F6F8] border border-[#E5E7EB] p-6 rounded-xl space-y-4">
              <div className="flex items-center gap-2 text-sm font-extrabold uppercase text-[#3B82F6] tracking-wider">
                <CheckCircle2 size={16} />
                <span>Our Engineering & Fix Process</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-[#1C1C1C]">
                {service.auditProcess.map((ap, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                    <span>{ap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Benchmark Results Ticker */}
          <BenchmarkImpactBadge results={service.results} />
        </div>

        {/* FAQ Section */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#FFF9E6] text-[#FF9D00] border border-[#FFD21E] flex items-center justify-center font-bold">
              <HelpCircle size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1C1C1C]">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-[#6B7280]">
                Everything you need to know about our {service.title} service.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-2"
              >
                <h3 className="text-sm font-bold text-[#1C1C1C]">
                  {faq.question}
                </h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <Card className="p-8 sm:p-10 bg-white border-2 border-[#FFD21E] text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1C]">
            Ready for Guaranteed {service.title} Results?
          </h3>
          <p className="text-sm text-[#6B7280] max-w-xl mx-auto leading-relaxed">
            Book a free 15-minute strategy call and receive your custom technical proposal within 12 hours.
          </p>
          <div className="pt-2 flex justify-center">
            <Button href="/contact" variant="primary" size="lg">
              <span>Book a Free Strategy Call</span>
              <ArrowRight size={18} />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
