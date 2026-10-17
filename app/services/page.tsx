import React from 'react';
import Link from 'next/link';
import {
  Code2,
  Smartphone,
  Search,
  Gauge,
  MapPin,
  Target,
  Video,
  Zap,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
  ExternalLink,
} from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import BenchmarkImpactBadge from '@/components/ui/BenchmarkImpactBadge';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { webPageSchema } from '@/lib/schema';
import { getOgImageUrl, getSiteUrl, getSiteName, seoRobots } from '@/lib/seo';

const servicesTitle = 'Web Development, SEO, UGC Ads & Speed Upgrades | Ostrune';
const servicesDescription =
  'Explore Ostrune\'s 8 core digital capabilities: custom web apps, legacy site overhauls, technical SEO, UGC video ads, and Meta ad management worldwide.';

export const metadata: Metadata = {
  title: {
    absolute: servicesTitle,
  },
  description: servicesDescription,
  alternates: {
    canonical: `${getSiteUrl()}/services`,
  },
  openGraph: {
    title: 'Web Development, SEO, UGC Ads & Speed Upgrades | Ostrune',
    description:
      'Explore Ostrune\'s 8 core digital capabilities: custom web apps, legacy site overhauls, technical SEO, UGC video ads, and Meta ad management worldwide.',
    url: `${getSiteUrl()}/services`,
    type: 'website',
    siteName: getSiteName(),
    images: [
      {
        url: getOgImageUrl({ title: 'Web Development, SEO, UGC Ads & Speed Upgrades | Ostrune', description: 'Explore Ostrune\'s 8 core digital capabilities: custom web apps, legacy site overhauls, technical SEO, UGC video ads, and Meta ad management worldwide.', type: 'page' }),
        width: 1200,
        height: 630,
        alt: 'Ostrune Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Development, SEO, UGC Ads & Speed Upgrades | Ostrune',
    description:
      'Explore Ostrune\'s 8 core digital capabilities: custom web apps, legacy site overhauls, technical SEO, UGC video ads, and Meta ad management worldwide.',
    images: [getOgImageUrl({ title: 'Web Development, SEO, UGC Ads & Speed Upgrades | Ostrune', description: 'Explore Ostrune\'s 8 core digital capabilities: custom web apps, legacy site overhauls, technical SEO, UGC video ads, and Meta ad management worldwide.', type: 'page' })],
  },
  robots: seoRobots(),
};

const SERVICES = [
  {
    id: 'website-upgrade',
    slug: 'website-speed-upgrade',
    icon: Gauge,
    badge: 'HIGH DEMAND INTERNATIONAL SERVICE',
    title: 'Old Website Upgrade / Speed & SEO Overhaul',
    tagline: 'Transform your sluggish legacy website into a sub-second, 100/100 Core Web Vitals sales engine.',
    painPoints: [
      'Is your website taking 3 to 6 seconds to load on mobile?',
      'Has your organic Google ranking dropped unexpectedly?',
      'Are prospective buyers bouncing due to an outdated visual design?',
    ],
    auditProcess: [
      'Core Web Vitals & Code Audit: Eliminate heavy plugins, uncompressed assets, and render-blocking scripts.',
      'Technical SEO Cleanup: Fix broken canonical links, missing schema, and indexation errors.',
      'Modern High-Converting Redesign: Upgrade to responsive, lightning-fast UI components with instant CTAs.',
    ],
    results: '0.8s Avg Load Speed • 100/100 Mobile Vitals • +220% Organic Leads',
  },
  {
    id: 'ugc-ads',
    slug: 'ugc-video-ads',
    icon: Video,
    badge: 'HIGH ROAS CREATIVE ENGINE',
    title: 'UGC Video Ads for E-Commerce & DTC',
    tagline: 'Authentic user-generated video ad hooks that beat expensive studio commercials on Meta & TikTok.',
    painPoints: [
      'High cost-per-acquisition (CPA) on traditional static image ads?',
      'Ad creatives fatigue after just 5 to 7 days on Meta & Instagram?',
      'Struggling to find native creator hooks that stop the thumb scroll?',
    ],
    auditProcess: [
      'Creator Hook Scripting: Write 5-10 native video hooks focused on customer pain points & solutions.',
      'Rapid Video Editing: Deliver polished 15-30s UGC ad variations formatted for Reels, Shorts & TikTok.',
      'A/B Creative Testing: Scale top-performing video hooks to achieve 4x-6x verified ROAS.',
    ],
    results: '5.2x Verified ROAS • $24 Cost Per Acquisition • 4x Creative Lifespan',
  },
  {
    id: 'web-dev',
    slug: 'website-development',
    icon: Code2,
    badge: 'CORE ENGINEERING & CMS',
    title: 'Website Development (Custom & CMS)',
    tagline: 'Custom Next.js & React web apps, or expertly crafted stores on Shopify, WordPress, and Wix.',
    painPoints: ['Need a website that fits your exact workflow, budget, and business goals?', 'Current website is slow, hard to manage, or looks dated?'],
    auditProcess: ['Flexible platform selection: Next.js, Node.js, Python, Shopify, WordPress, Wix.', 'Speed optimization, mobile-first design, and conversion-focused UX.'],
    results: '99.9% Uptime • Sub-Second Page Speeds • Any Tech Stack',
  },
  {
    id: 'app-dev',
    slug: 'app-development',
    icon: Smartphone,
    badge: 'WEB & MOBILE APPS',
    title: 'App Development',
    tagline: 'Scalable web applications and iOS / Android mobile apps built with modern cloud databases.',
    painPoints: ['High traditional agency app development quotes ($50k+)?', 'Need real-time database backends and fast user authentication?'],
    auditProcess: ['Full-stack web & mobile app engineering.', 'Real-time database sync and automated API endpoints.'],
    results: 'Cross-Platform Ready • Real-Time Database Sync • Enterprise Security',
  },
  {
    id: 'seo',
    slug: 'seo-optimization',
    icon: Search,
    badge: 'ORGANIC DOMINANCE',
    title: 'SEO Optimization',
    tagline: 'Capture top 3 commercial search rankings across English-speaking global markets.',
    painPoints: ['Stuck on Page 3 for high-intent buyer keywords?', 'Wasting money on cheap spam link-building services?'],
    auditProcess: ['Commercial intent keyword mapping.', 'JSON-LD Organization & Product schema wiring.'],
    results: '140+ Rank 1 Keywords • +480% Organic Search Traffic Surge',
  },
  {
    id: 'local-business',
    slug: 'local-business-marketing',
    icon: MapPin,
    badge: 'LOCAL MAP PACKS',
    title: 'Local Business Marketing',
    tagline: 'Dominate local Google Map packs and capture local customer inquiries for brick-and-mortar businesses.',
    painPoints: ['Competitors outranking you on local Google Map searches?', 'Inconsistent online business listings across maps?'],
    auditProcess: ['Google Business Profile optimization.', 'Local citation building & customer review automated workflows.'],
    results: '#1 Local Map Rank • 850+ Monthly Consultations • 68% Conversion Rate',
  },
  {
    id: 'meta-ads',
    slug: 'meta-ads',
    icon: Target,
    badge: 'PERFORMANCE ADS',
    title: 'Meta & LinkedIn Ads',
    tagline: 'Full-funnel Facebook, Instagram & LinkedIn ad management for verified revenue growth.',
    painPoints: ['Unpredictable ad performance after iOS privacy updates?', 'Lack of Conversion API (CAPI) pixel tracking setup?'],
    auditProcess: ['Server-side CAPI pixel implementation.', 'High-converting ad copy and retargeting funnel sequences.'],
    results: '5.2x Verified ROAS • $1.2M Ad Revenue Generated',
  },
  {
    id: 'sales-growth',
    slug: 'sales-growth-cro',
    icon: Zap,
    badge: 'CRO & LEAD FUNNELS',
    title: 'Sales Growth & Conversion Rate Optimization (CRO)',
    tagline: 'Turn cold site visitors into qualified consultation bookings with interactive funnels.',
    painPoints: ['Getting website traffic but zero inquiry form submissions?', 'Slow manual follow-ups losing warm leads?'],
    auditProcess: ['Interactive multi-step qualification forms.', 'Automated CRM routing & Instant Email/SMS booking alerts.'],
    results: '+340% Inquiry Rate • Instant Lead Alerts • Higher Client LTV',
  },
];

export default function ServicesPage() {
  const servicesIndexSchema = [webPageSchema({
    url: `${getSiteUrl()}/services`,
    name: 'Affordable Web & App Development, SEO, UGC Ads & Speed Upgrades',
    description: 'Full-service digital agency for international clients worldwide. High quality, competitive rates, sub-second web speed, UGC video ads,and SEO dominance.',
  })];
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How fast can you overhaul an old slow website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most website speed and SEO overhauls are completed within 5 to 7 business days, achieving guaranteed sub-second load times and 100/100 Core Web Vitals scores.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you work with international clients in different time zones?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We support clients worldwide across North America, Europe, Middle East, and Asia-Pacific with scheduled calls matching your working hours and direct asynchronous updates.',
        },
      },
      {
        '@type': 'Question',
        name: 'What results can I expect from UGC Video Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our user-generated video ad creatives consistently deliver 3.5x to 5.2x ROAS on Meta and TikTok by stopping scroll with native UGC hooks.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does your pricing compare to traditional agencies?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our async lean engineering model allows us to deliver high quality engineering and growth support at 60% lower cost than traditional Western agencies.',
        },
      },
    ],
  };

  return (
    <div className="pt-32 pb-24 bg-[#05060A] text-white min-h-screen relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#FFB800]/10 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#00F0FF]/5 blur-[200px] pointer-events-none" />

      <JsonLd data={servicesIndexSchema} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-16 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.04] text-[#FFB800] text-xs font-mono font-bold border border-white/[0.1] shadow-xs">
            <Sparkles size={14} className="text-[#FFB800]" />
            Full-Stack Digital Engineering Capabilities
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Elite Web Systems, Technical SEO & <GradientText>Scale Infrastructure</GradientText>
          </h1>
          <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed">
            Engineered for high-performing brands worldwide: sub-second web apps, legacy architecture overhauls, high-converting UGC creative engines, and organic SEO dominance.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="flex items-center gap-2 cyber-glass px-3.5 py-1.5 rounded-full border border-white/[0.08] text-xs font-mono text-gray-300">
              <Clock size={13} className="text-[#FFB800]" /> 24/7 Global Time-Zone Coverage
            </span>
            <span className="flex items-center gap-2 cyber-glass px-3.5 py-1.5 rounded-full border border-white/[0.08] text-xs font-mono text-gray-300">
              <CheckCircle2 size={13} className="text-[#10B981]" /> Sub-Second Load Times
            </span>
            <span className="flex items-center gap-2 cyber-glass px-3.5 py-1.5 rounded-full border border-white/[0.08] text-xs font-mono text-gray-300">
              <ShieldCheck size={13} className="text-[#00F0FF]" /> Verified Stripe & Escrow Security
            </span>
          </div>
        </div>

        {/* Detailed Service Cards Hub */}
        <div className="space-y-8">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            const itemNumber = (idx + 1).toString().padStart(2, '0');

            return (
              <section
                key={service.id}
                id={service.id}
                className="relative overflow-hidden border border-white/[0.08] rounded-3xl cyber-glass p-6 sm:p-10 hover:border-[#FFB800]/40 transition-all duration-300 group space-y-8 shadow-2xl"
              >
                {/* Accent Laser Beam */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFB800] to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />

                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/[0.08] pb-6 relative">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFB800]/20 to-[#FF9500]/5 border border-[#FFB800]/30 text-[#FFB800] flex items-center justify-center font-extrabold shadow-lg shadow-[#FFB800]/10 group-hover:scale-105 transition-transform shrink-0">
                      <Icon size={26} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/25 px-2.5 py-0.5 rounded-full tracking-wider">
                        {service.badge}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 group-hover:text-[#FFB800] transition-colors tracking-tight">
                        <Link href={`/services/${service.slug}`} className="hover:underline">
                          {service.title}
                        </Link>
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-mono text-3xl sm:text-4xl font-black text-white/[0.08] group-hover:text-[#FFB800]/30 transition-colors select-none">
                      #{itemNumber}
                    </span>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-white/[0.06] hover:bg-[#FFB800] text-white hover:text-black border border-white/[0.1] hover:border-transparent transition-all shadow-md group/btn"
                    >
                      <span>Explore Protocol</span>
                      <ExternalLink size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
                  {service.tagline}
                </p>

                {/* 2-Column Split: Pain Points vs Deliverables */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pain Points Box */}
                  <div className="bg-red-500/[0.03] border border-red-500/20 p-6 rounded-2xl space-y-3.5 relative overflow-hidden">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-red-400 tracking-wider">
                      <AlertCircle size={15} className="text-red-400 shrink-0" />
                      <span>Bottlenecks We Eliminate</span>
                    </div>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300 font-normal">
                      {service.painPoints.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 leading-snug">
                          <span className="text-red-400 font-bold text-base shrink-0 leading-none">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Audit & Deliverables Box */}
                  <div className="bg-cyan-500/[0.03] border border-cyan-500/20 p-6 rounded-2xl space-y-3.5 relative overflow-hidden">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-cyan-400 tracking-wider">
                      <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                      <span>Engineering Deliverables</span>
                    </div>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300 font-normal">
                      {service.auditProcess.map((ap, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2.5 leading-snug">
                          <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{ap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Dynamic Running Impact Ticker Badge & Link */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <BenchmarkImpactBadge results={service.results} />
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#FFB800] hover:text-[#FFD21E] transition-colors"
                  >
                    <span>View Technical Breakdown &amp; FAQs</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </section>
            );
          })}
        </div>

        {/* Global CTA Bottom Card */}
        <div className="relative overflow-hidden p-10 sm:p-14 cyber-glass-glow rounded-3xl border border-[#FFB800]/30 text-center space-y-6 shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#FFB800]/10 blur-[120px] pointer-events-none" />

          <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight relative z-10">
            Ready to Accelerate Your <GradientText>Digital Revenue</GradientText>?
          </h3>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed relative z-10 font-light">
            Receive a thorough technical teardown, Core Web Vitals audit, and fixed-scope sprint proposal from our engineering team in under 12 hours.
          </p>
          <div className="pt-2 flex justify-center relative z-10">
            <Button href="/contact" variant="primary" size="lg">
              <span>Initiate Technical Brief</span>
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
