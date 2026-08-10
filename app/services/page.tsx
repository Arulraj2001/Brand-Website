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
  Globe,
} from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import BenchmarkImpactBadge from '@/components/ui/BenchmarkImpactBadge';

export const metadata = {
  title: 'Affordable Web & App Development, SEO, UGC Ads & Speed Upgrades | Ostrune',
  description: 'Full-service digital agency for international clients worldwide. High quality, competitive rates, sub-second web speed, UGC video ads, and SEO dominance.',
};

const SERVICES = [
  {
    id: 'website-upgrade',
    icon: Gauge,
    badge: 'HIGH DEMAND INTERNATIONAL SERVICE',
    title: 'Old Website Upgrade / Speed & SEO Overhaul',
    seoTitle: 'Website Speed & SEO Upgrade Services | Fix a Slow or Outdated Website',
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
    icon: Video,
    badge: 'HIGH ROAS CREATIVE ENGINE',
    title: 'UGC Video Ads for E-Commerce & DTC',
    seoTitle: 'UGC Ads Agency | User-Generated Content Ads for Ecommerce Brands',
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
    icon: Code2,
    badge: 'CORE ENGINEERING',
    title: 'Website Development',
    seoTitle: 'Affordable Website Development Agency | Business & E-Commerce Sites',
    tagline: 'Custom business websites, high-converting landing pages, and e-commerce portals.',
    painPoints: ['Clunky WordPress templates that break during updates?', 'Slow server speeds causing high abandonment rates?'],
    auditProcess: ['Modern architecture with zero plugin bloat.', 'Stripe & PayPal international checkout integration.'],
    results: '99.9% Uptime • Sub-Second Page Speeds • Global Edge Deployment',
  },
  {
    id: 'app-dev',
    icon: Smartphone,
    badge: 'WEB & MOBILE APPS',
    title: 'App Development',
    seoTitle: 'Affordable App Development Company | Web & Mobile Apps',
    tagline: 'Scalable web applications and iOS / Android mobile apps built with modern cloud databases.',
    painPoints: ['High traditional agency app development quotes ($50k+)?', 'Need real-time database backends and fast user authentication?'],
    auditProcess: ['Full-stack web & mobile app engineering.', 'Real-time database sync and automated API endpoints.'],
    results: 'Cross-Platform Ready • Real-Time Database Sync • Enterprise Security',
  },
  {
    id: 'seo',
    icon: Search,
    badge: 'ORGANIC DOMINANCE',
    title: 'SEO Optimization',
    seoTitle: 'Affordable SEO Agency for Small Business & Startups',
    tagline: 'Capture top 3 commercial search rankings across English-speaking global markets.',
    painPoints: ['Stuck on Page 3 for high-intent buyer keywords?', 'Wasting money on cheap spam link-building services?'],
    auditProcess: ['Commercial intent keyword mapping.', 'JSON-LD Organization & Product schema wiring.'],
    results: '140+ Rank 1 Keywords • +480% Organic Search Traffic Surge',
  },
  {
    id: 'local-business',
    icon: MapPin,
    badge: 'LOCAL MAP PACKS',
    title: 'Local Business Marketing',
    seoTitle: 'Local Business Marketing & Google Business Profile Optimization',
    tagline: 'Dominate local Google Map packs and capture local customer inquiries for brick-and-mortar businesses.',
    painPoints: ['Competitors outranking you on local Google Map searches?', 'Inconsistent online business listings across maps?'],
    auditProcess: ['Google Business Profile optimization.', 'Local citation building & customer review automated workflows.'],
    results: '#1 Local Map Rank • 850+ Monthly Consultations • 68% Conversion Rate',
  },
  {
    id: 'meta-ads',
    icon: Target,
    badge: 'PERFORMANCE ADS',
    title: 'Meta & LinkedIn Ads',
    seoTitle: 'Meta Ads Agency & Facebook Ad Management Company',
    tagline: 'Full-funnel Facebook, Instagram & LinkedIn ad management for verified revenue growth.',
    painPoints: ['Unpredictable ad performance after iOS privacy updates?', 'Lack of Conversion API (CAPI) pixel tracking setup?'],
    auditProcess: ['Server-side CAPI pixel implementation.', 'High-converting ad copy and retargeting funnel sequences.'],
    results: '5.2x Verified ROAS • $1.2M Ad Revenue Generated',
  },
  {
    id: 'sales-growth',
    icon: Zap,
    badge: 'CRO & LEAD FUNNELS',
    title: 'Sales Growth & Conversion Rate Optimization (CRO)',
    seoTitle: 'Conversion Rate Optimization & B2B Lead Generation Agency',
    tagline: 'Turn cold site visitors into qualified consultation bookings with interactive funnels.',
    painPoints: ['Getting website traffic but zero inquiry form submissions?', 'Slow manual follow-ups losing warm leads?'],
    auditProcess: ['Interactive multi-step qualification forms.', 'Automated CRM routing & Instant Email/SMS booking alerts.'],
    results: '+340% Inquiry Rate • 12-Hour SLA Reply • Higher Client LTV',
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-20 bg-[#F9FAFB] min-h-screen bg-line-pattern">
      <div className="max-w-[1200px] mx-auto px-4 space-y-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] text-xs font-bold border border-[#E5E7EB]">
            <Sparkles size={14} className="text-[#1C1C1C]" />
            Complete Digital Growth Suite
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C1C1C] tracking-tight leading-tight">
            Affordable Web Engineering, SEO & <GradientText>Performance Growth Services</GradientText>
          </h1>
          <p className="text-base text-[#6B7280] leading-relaxed">
            High-quality development and digital marketing at a fraction of traditional agency costs. Fluent English communication, time-zone friendly scheduling, and guaranteed 12-hour reply times.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-[#1C1C1C] pt-2">
            <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-[#E5E7EB]">
              <Clock size={13} className="text-[#FF9D00]" /> Global Time-Zone Coverage
            </span>
            <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-[#E5E7EB]">
              <CheckCircle2 size={13} className="text-[#10B981]" /> 12-Hour Reply SLA
            </span>
            <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-[#E5E7EB]">
              <ShieldCheck size={13} className="text-[#3B82F6]" /> Stripe & PayPal Accepted
            </span>
          </div>
        </div>

        {/* Detailed Service Sections */}
        <div className="space-y-12">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            const itemNumber = (idx + 1).toString().padStart(2, '0');

            return (
              <section
                key={service.id}
                id={service.id}
                className="relative overflow-hidden scroll-mt-32 border border-[#E5E7EB] rounded-2xl bg-white p-6 sm:p-8 shadow-xs hover:shadow-xl hover:border-[#FF9D00]/50 transition-all duration-300 group space-y-6"
              >
                {/* RUNNING LASER BEAM ON TOP OF RECTANGLE CARD BORDER OUTLINE */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl z-20 overflow-visible">
                  <defs>
                    <linearGradient id={`card-laser-${service.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFD21E" />
                      <stop offset="50%" stopColor="#FF9D00" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="1"
                    y="1"
                    width="calc(100% - 2px)"
                    height="calc(100% - 2px)"
                    rx="16"
                    fill="none"
                    stroke={`url(#card-laser-${service.id})`}
                    strokeWidth="2.5"
                    className="animate-running-border opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </svg>

                {/* Top Accent Gradient Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFD21E] via-[#FF9D00] to-[#3B82F6] opacity-80" />

                {/* Card Header & Watermark Number */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5 relative">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-[#FFD21E] text-[#1C1C1C] flex items-center justify-center font-extrabold border border-[#E5E7EB] shadow-2xs group-hover:scale-105 transition-transform shrink-0">
                      <Icon size={24} />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase bg-[#FFF9E6] text-[#FF9D00] border border-[#FFD21E]/60 px-2.5 py-0.5 rounded-full tracking-wide">
                        {service.badge}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-[#1C1C1C] mt-1 group-hover:text-[#FF9D00] transition-colors">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-mono-stats text-3xl sm:text-4xl font-extrabold text-[#E5E7EB] group-hover:text-[#FFD21E]/60 transition-colors select-none">
                      #{itemNumber}
                    </span>
                    <Button href="/contact" variant="primary" size="sm" className="shrink-0">
                      <span>Book Strategy Call</span>
                      <ArrowRight size={14} />
                    </Button>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#6B7280] font-medium leading-relaxed">
                  {service.tagline}
                </p>

                {/* 2-Column Split: Pain Points vs Deliverables */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pain Points Box */}
                  <div className="bg-[#FFF9E6]/70 border border-[#FFD21E]/60 p-5 rounded-xl space-y-3 relative overflow-hidden">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase text-[#FF9D00] tracking-wider">
                      <AlertCircle size={14} className="text-[#FF9D00]" />
                      <span>Common Pain Points We Solve</span>
                    </div>
                    <ul className="space-y-2.5 text-xs text-[#1C1C1C] font-semibold">
                      {service.painPoints.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 leading-snug">
                          <span className="text-[#FF9D00] font-bold text-sm shrink-0 leading-none">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Audit & Deliverables Box */}
                  <div className="bg-[#F4F6F8] border border-[#E5E7EB] p-5 rounded-xl space-y-3 relative overflow-hidden">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase text-[#3B82F6] tracking-wider">
                      <CheckCircle2 size={14} className="text-[#3B82F6]" />
                      <span>Our Deliverables & Fix Process</span>
                    </div>
                    <ul className="space-y-2.5 text-xs text-[#1C1C1C]">
                      {service.auditProcess.map((ap, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2 leading-snug">
                          <CheckCircle2 size={14} className="text-[#10B981] shrink-0 mt-0.5" />
                          <span>{ap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Dynamic Running Impact Ticker Badge */}
                <BenchmarkImpactBadge results={service.results} />
              </section>
            );
          })}
        </div>

        {/* Global CTA Bottom Card */}
        <Card className="p-8 sm:p-10 bg-white border-2 border-[#FFD21E] text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1C]">
            Ready to Upgrade Your Web Speed & Digital Growth?
          </h3>
          <p className="text-sm text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            Get a free 15-minute technical audit and strategy proposal from our engineering team within 12 hours.
          </p>
          <div className="pt-2 flex justify-center">
            <Button href="/contact" variant="primary" size="lg">
              <span>Request Free Proposal & Call</span>
              <ArrowRight size={18} />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
