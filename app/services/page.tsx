import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Code2, Search, Target, Zap, Check, ArrowRight, Sparkles } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import Button from '@/components/ui/Button';
import IconBox from '@/components/ui/IconBox';
import Card from '@/components/ui/Card';

export const metadata = {
  title: 'Specialized Services | Web Engineering, SEO, Meta Ads & Lead Gen | ApexPulse',
  description: 'Full breakdown of ApexPulse digital services with alternating split layouts, deliverables, and service-specific execution processes.',
};

const SERVICES_FULL = [
  {
    id: 'web-dev',
    icon: Code2,
    badge: 'SERVICE 01 • ENGINEERING',
    title: 'Custom Web & Mobile App Development',
    tagline: 'Sub-Second Speeds, Enterprise Security & Dynamic UPI Integration',
    description:
      'We build high-performance web applications and custom digital platforms that convert visitors into paying clients. Utilizing modern cloud architectures, serverless databases, and optimized frontend engineering, we achieve 100/100 performance scores and guarantee instant Indian payment gateway readiness.',
    deliverables: [
      'Modern High-Performance Web & App Architecture',
      'Supabase Database & Auth API Integration',
      'Razorpay, Cashfree & PayU Payment Gateway Integration',
      '100/100 Core Web Vitals Performance Optimization',
      'Custom Tailwind Design System & UI Components',
      'Mobile-First Responsive Layouts & SEO Schema',
    ],
    process: [
      { step: '01', name: 'Tech Architecture', desc: 'Define schema, API endpoints & component structure' },
      { step: '02', name: 'Sprint Development', desc: 'Write clean TypeScript & responsive CSS' },
      { step: '03', name: 'Gateway & DB Sync', desc: 'Link Supabase Auth & Razorpay UPI webhooks' },
      { step: '04', name: 'Vitals Optimization', desc: 'Achieve sub-second loading score across India' },
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    metric: '0.8s Page Speed • 99.9% Uptime',
    ctaText: 'Request Custom Web Development Proposal',
    imagePosition: 'left',
  },
  {
    id: 'seo',
    icon: Search,
    badge: 'SERVICE 02 • ORGANIC DOMINANCE',
    title: 'National & Local Search Engine Dominance',
    tagline: 'Capture Top 3 Positions Across High-Intent Indian Metro Searches',
    description:
      'Our SEO engine targets active buyers in Bengaluru, Mumbai, Delhi NCR, and 12+ metro markets. We audit underlying technical code, deploy rich JSON-LD LocalBusiness schemas, eliminate speed bottlenecks, and build high-authority media backlinks that hold rank over time.',
    deliverables: [
      'Commercial Intent Keyword Research & Mapping',
      'Full Technical Code Audit & Core Web Vitals Fixes',
      'JSON-LD LocalBusiness & Organization Schema',
      'Tier 1 & Tier 2 City Landing Page Scale',
      'High-Authority Indian Media PR & Backlinks',
      'Monthly Transparent Rank & Revenue Reports',
    ],
    process: [
      { step: '01', name: 'Technical Audit', desc: 'Crawl errors, schema fixes & page speed boosts' },
      { step: '02', name: 'Keyword Strategy', desc: 'Map commercial intent keywords in target cities' },
      { step: '03', name: 'Content Scaling', desc: 'Deploy optimized landing pages for metro regions' },
      { step: '04', name: 'Link Authority', desc: 'Acquire high-DR Indian media editorial placements' },
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    metric: '4.8x Organic Traffic Surge',
    ctaText: 'Get Free SEO Growth Audit',
    imagePosition: 'right',
  },
  {
    id: 'meta-ads',
    icon: Target,
    badge: 'SERVICE 03 • PAID ACQUISITION',
    title: 'Meta & LinkedIn Performance Ad Campaigns',
    tagline: 'High-ROAS Visual Funnels Designed for Verified INR Revenue',
    description:
      'Stop burning ad budgets on vanity impressions. We design scroll-stopping video hooks, high-converting ad creative sequences, and precise audience targeting across Instagram, Facebook, and LinkedIn for maximum customer acquisition.',
    deliverables: [
      'High-Converting Video Hooks & Graphic Ad Creatives',
      'Hyper-Targeted Demographics & Interests Mapping',
      'CAPI (Conversions API) & Meta Pixel Integration',
      'A/B Creative Hook Testing & Scale Matrix',
      'Landing Page Conversion Rate Optimization (CRO)',
      'Weekly ROAS & Cost-Per-Acquisition Optimization',
    ],
    process: [
      { step: '01', name: 'Creative Angle Research', desc: 'Identify emotional hooks & buyer pain points' },
      { step: '02', name: 'Funnel Build', desc: 'Design landing page & CAPI pixel tracking' },
      { step: '03', name: 'Rapid A/B Testing', desc: 'Test 10+ creative variations in Week 1' },
      { step: '04', name: 'Scale Winning Ads', desc: 'Reallocate ad spend to highest ROAS creatives' },
    ],
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1000&q=80',
    metric: '5.2x Verified Ad ROAS',
    ctaText: 'Scale Paid Meta & LinkedIn Ads',
    imagePosition: 'left',
  },
  {
    id: 'lead-gen',
    icon: Zap,
    badge: 'SERVICE 04 • LEAD AUTOMATION',
    title: 'Automated B2B & Real Estate Lead Generation',
    tagline: 'Pre-Qualified Inquiries Routed Directly to WhatsApp',
    description:
      'Transform cold visitors into verified buyers. We design interactive multi-step questionnaire funnels that qualify prospective clients by budget range and phone number before instant routing to your sales team’s WhatsApp.',
    deliverables: [
      'Interactive Multi-Step Lead Qualification Funnel',
      '+91 Mobile Number & OTP Verification Integration',
      'Automated Instant WhatsApp Sales Alert Routing',
      'CRM Integration (HubSpot, Zoho, Salesforce)',
      'Lead Magnet & Whitepaper Download Engine',
      'Real-Time Lead Status Analytics Dashboard',
    ],
    process: [
      { step: '01', name: 'Qualification Design', desc: 'Build interactive budget & intent questions' },
      { step: '02', name: '+91 OTP Verification', desc: 'Ensure zero spam phone numbers' },
      { step: '03', name: 'WhatsApp Webhook', desc: 'Deliver instant lead alerts to sales reps' },
      { step: '04', name: 'CRM Integration', desc: 'Sync leads automatically into Zoho/HubSpot' },
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    metric: '850+ Verified Monthly Leads',
    ctaText: 'Build Automated WhatsApp Funnel',
    imagePosition: 'right',
  },
];

export default function ServicesPage() {
  const serviceSchemaLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Digital Engineering & Marketing Services',
    provider: {
      '@type': 'LocalBusiness',
      name: 'ApexPulse Digital Agency India',
      address: 'Bengaluru, Karnataka 560034',
    },
    areaServed: 'India',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Core Services Catalog',
      itemListElement: SERVICES_FULL.map((s, idx) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.description,
        },
        position: idx + 1,
      })),
    },
  };

  return (
    <div className="pt-28 pb-20 bg-[#F9FAFB] space-y-16 bg-line-pattern">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchemaLd) }}
      />

      {/* Services Header */}
      <div className="max-w-3xl mx-auto text-center px-4 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] text-xs font-bold border border-[#E5E7EB]">
          <Sparkles size={14} className="text-[#1C1C1C]" />
          Core Capabilities
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C1C1C] tracking-tight">
          Engineering & Growth Solutions Built for <GradientText>Market Leadership</GradientText>
        </h1>
        <p className="text-base text-[#6B7280] leading-relaxed">
          Each offering is custom-crafted with clear deliverables, service-specific process pipelines, and verified ROI metrics for businesses across India.
        </p>
      </div>

      {/* 4 Compact, Well-Aligned Service Sections */}
      <div className="max-w-[1200px] mx-auto px-4 space-y-10">
        {SERVICES_FULL.map((service) => {
          const isImageLeft = service.imagePosition === 'left';
          const Icon = service.icon;

          return (
            <Card
              key={service.id}
              id={service.id}
              className="p-6 sm:p-8 scroll-mt-24"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Visual Image Column */}
                <div
                  className={`lg:col-span-5 relative ${
                    isImageLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="relative h-64 sm:h-[320px] w-full rounded-xl overflow-hidden border border-[#E5E7EB] shadow-xs group">
                    <Image
                      src={service.image}
                      alt={`${service.title} - ApexPulse Digital Service`}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/70 via-transparent to-transparent" />

                    <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs p-3 rounded-lg border border-[#E5E7EB] flex items-center justify-between shadow-xs">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF9D00]">
                        <Sparkles size={14} className="text-[#FF9D00]" />
                        <span>Verified Result</span>
                      </div>
                      <span className="text-xs font-bold text-[#1C1C1C] font-mono-stats">
                        {service.metric}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Text Content Column */}
                <div
                  className={`lg:col-span-7 space-y-4 ${
                    isImageLeft ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <IconBox icon={Icon} size={20} variant="primary" />
                    <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider bg-[#3B82F6]/10 px-2.5 py-0.5 rounded-[4px] border border-[#3B82F6]/20">
                      {service.badge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1C] tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-xs font-semibold text-[#FF9D00]">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                    {service.description}
                  </p>

                  {/* What's Included */}
                  <div className="space-y-2 pt-1">
                    <h3 className="text-xs font-bold text-[#1C1C1C] uppercase tracking-wider">
                      What's Included:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.deliverables.map((item, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-[#1C1C1C] font-semibold">
                          <Check size={13} className="text-[#10B981] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Process Steps */}
                  <div className="space-y-2 pt-2 border-t border-[#E5E7EB]">
                    <h3 className="text-xs font-bold text-[#1C1C1C] uppercase tracking-wider">
                      Execution Process:
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {service.process.map((step, idx) => (
                        <div key={idx} className="bg-[#F9FAFB] border border-[#E5E7EB] p-2.5 rounded-lg space-y-0.5">
                          <span className="text-[11px] font-extrabold text-[#FF9D00]">
                            {step.step}
                          </span>
                          <p className="text-xs font-bold text-[#1C1C1C] leading-tight truncate">
                            {step.name}
                          </p>
                          <p className="text-[10px] text-[#6B7280] leading-tight line-clamp-2">
                            {step.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button href="/contact" variant="primary" size="md">
                      <span>{service.ctaText}</span>
                      <ArrowRight size={15} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
