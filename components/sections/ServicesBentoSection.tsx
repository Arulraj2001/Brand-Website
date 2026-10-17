'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import {
  Code2,
  Search,
  Target,
  Zap,
  ArrowUpRight,
  Check,
  Sparkles,
  Smartphone,
  Gauge,
  MapPin,
  Video,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import IconBox from '@/components/ui/IconBox';
import GradientText from '@/components/ui/GradientText';

interface ServiceItem {
  id: string;
  category: 'engineering' | 'growth';
  isFeaturedLarge?: boolean;
  isFeaturedRight?: boolean;
  icon: LucideIcon;
  iconVariant: 'secondary' | 'accent' | 'success';
  badge: string;
  title: string;
  description: string;
  bullets?: string[];
  linkText?: string;
  linkHref: string;
  tag?: string;
}

// 3D Motion Card with Spotlight Halo & Cursor Gyroscope Tilt
function MotionCardWrapper({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-180, 180], [5, -5]);
  const rotateY = useTransform(mouseX, [-180, 180], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`relative group cursor-pointer cyber-glass rounded-3xl border border-white/[0.12] hover:border-[#FFB800]/50 transition-all text-white p-6 sm:p-8 flex flex-col justify-between ${className}`}
    >
      {/* Dynamic Cursor Spotlight Halo */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(350px circle at calc(50% + ${mouseX.get()}px) calc(50% + ${mouseY.get()}px), rgba(255, 184, 0, 0.16), transparent 80%)`,
        }}
      />
      <div className="relative z-20 h-full flex flex-col justify-between">{children}</div>
    </motion.div>
  );
}

export default function ServicesBentoSection() {
  const standardServices: ServiceItem[] = [
    {
      id: 'website-upgrade',
      category: 'engineering',
      icon: Gauge,
      iconVariant: 'secondary',
      badge: 'Speed Overhaul',
      title: 'Old Website Upgrade / Speed & SEO',
      description:
        'Audit and eliminate sluggish legacy plugins to guarantee 100/100 Core Web Vitals and sub-second page loads.',
      linkHref: '/services/website-speed-upgrade',
    },
    {
      id: 'ugc-ads',
      category: 'growth',
      icon: Video,
      iconVariant: 'accent',
      badge: 'High-ROAS Hooks',
      title: 'UGC Video Ads for Brands',
      description:
        'Creator video ad hooks produced for TikTok, Meta & Instagram to outperform traditional studio ads with authentic hooks.',
      linkHref: '/services/ugc-video-ads',
    },
    {
      id: 'sales-growth',
      category: 'growth',
      icon: Zap,
      iconVariant: 'success',
      badge: 'Lead Engines',
      title: 'B2B & Commercial Lead Generation',
      description:
        'Automated client acquisition funnels, high-converting CRO landing pages, and multi-channel qualification systems.',
      linkHref: '/services/sales-growth-cro',
    },
    {
      id: 'seo',
      category: 'growth',
      icon: Search,
      iconVariant: 'success',
      badge: 'SEO Dominance',
      title: 'SEO & Organic Growth',
      description:
        'Rank top 3 on Google for high-intent buyer keywords across competitive English-speaking global markets.',
      linkHref: '/services/seo-optimization',
    },
    {
      id: 'local-business',
      category: 'growth',
      icon: MapPin,
      iconVariant: 'secondary',
      badge: 'Local SEO',
      title: 'Local Business Marketing',
      description:
        'Google Business Profile optimization, local map pack dominance, and localized ads for brick & mortar companies.',
      linkHref: '/services/local-business-marketing',
    },
    {
      id: 'meta-ads',
      category: 'growth',
      icon: Target,
      iconVariant: 'accent',
      badge: 'Paid Ads',
      title: 'Meta & LinkedIn Ads',
      description:
        'Full paid advertising management with server-side CAPI pixel setup, custom audiences, and high-converting creative.',
      linkHref: '/services/meta-ads',
    },
  ];

  return (
    <section className="py-24 bg-[#05060A] border-t border-white/[0.08] relative overflow-hidden text-white">
      {/* Ambient Nebula Blooms */}
      <motion.div
        animate={{ y: [0, -25, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-12 left-1/4 w-80 h-80 bg-[#FFB800]/10 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 25, 0], x: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-12 right-1/4 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-[160px] pointer-events-none"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] text-[#FFB800] text-xs font-mono font-bold border border-white/[0.1] shadow-2xs">
            <Sparkles size={14} className="text-[#FFB800]" />
            <span>Digital Capabilities &amp; Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Custom Web, Mobile &amp; <GradientText>Lead Gen Engines</GradientText>
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            From client-specified custom tech stacks and cross-platform mobile apps to sub-second speed overhauls and predictable B2B acquisition funnels.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="space-y-6">
          {/* Top Row: Large Featured Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Featured Left Card (7 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 flex"
            >
              <MotionCardWrapper className="w-full space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <IconBox icon={Code2} size={24} variant="secondary" />
                    <span className="px-3 py-1 rounded-full bg-[#FFB800]/15 text-[#FFB800] text-xs font-mono font-bold border border-[#FFB800]/30 shadow-xs">
                      CORE PILLAR 1 • ANY TECH STACK
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 group-hover:text-[#FFB800] transition-colors tracking-tight">
                    Custom Website Engineering
                  </h3>

                  <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-light">
                    We build tailor-made business websites, web applications, and e-commerce portals on the exact tech stack you require (Next.js, React, Node, Python, Vue, or Headless CMS). Guaranteed sub-second speeds and zero plugin bloat.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono text-neutral-200 pt-2">
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-[#10B981] shrink-0" />
                      <span>Custom Stack (Next.js, React, Node, Python)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-[#10B981] shrink-0" />
                      <span>Sub-Second Global Edge Latency</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-[#10B981] shrink-0" />
                      <span>Custom Web Apps &amp; Headless Portals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-[#10B981] shrink-0" />
                      <span>JSON-LD Schemas &amp; Semantic SEO</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">7–14 Day Delivery Sprint</span>
                  <Link
                    href="/services/website-development"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-[#FFB800] text-[#FFB800] hover:text-black font-bold text-xs border border-[#FFB800]/30 transition-all"
                  >
                    <span>Build Custom Website</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </MotionCardWrapper>
            </motion.div>

            {/* Featured Right Card (5 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5 flex"
            >
              <MotionCardWrapper className="w-full space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <IconBox icon={Smartphone} size={24} variant="accent" />
                    <span className="px-3 py-1 rounded-full bg-[#00F0FF]/15 text-[#00F0FF] text-xs font-mono font-bold border border-[#00F0FF]/30 shadow-xs">
                      CORE PILLAR 2 • IOS &amp; ANDROID
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-[#00F0FF] transition-colors tracking-tight">
                    Mobile Application Development
                  </h3>

                  <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-light">
                    Scalable cross-platform and native mobile apps built with React Native and Flutter. Fast database synchronization, native 60fps UX, and guaranteed app store approvals.
                  </p>

                  <div className="space-y-2.5 text-xs font-mono text-neutral-200">
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-[#10B981] shrink-0" />
                      <span>Unified iOS &amp; Android Codebases</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-[#10B981] shrink-0" />
                      <span>Supabase &amp; Cloud Real-Time DB</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-[#10B981] shrink-0" />
                      <span>Stripe Subscriptions &amp; In-App Pay</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">iOS &amp; Android Ready</span>
                  <Link
                    href="/services/app-development"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-[#00F0FF] text-[#00F0FF] hover:text-black font-bold text-xs border border-[#00F0FF]/30 transition-all"
                  >
                    <span>Build Mobile App</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </MotionCardWrapper>
            </motion.div>
          </div>

          {/* Bottom Grid: 6 Standard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standardServices.map((service, index) => {
              const IconComp = service.icon;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  className="flex"
                >
                  <MotionCardWrapper className="p-6 space-y-4 flex flex-col justify-between w-full">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <IconBox icon={IconComp} size={20} variant={service.iconVariant} />
                        <span className="text-[11px] font-mono font-bold text-[#FFB800] bg-[#FFB800]/10 border border-[#FFB800]/25 px-2.5 py-0.5 rounded-full">
                          {service.badge}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-white group-hover:text-[#FFB800] transition-colors tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-xs text-neutral-300 leading-relaxed font-light">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                      <Link
                        href={service.linkHref}
                        className="text-[#FFB800] text-xs font-bold hover:underline inline-flex items-center justify-between w-full group/link"
                      >
                        <span>Explore Protocol</span>
                        <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </MotionCardWrapper>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
