'use client';

import React, { useState } from 'react';
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
  RotateCcw,
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
  isFeatured = false,
}: {
  children: React.ReactNode;
  className?: string;
  isFeatured?: boolean;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-150, 150], [6, -6]);
  const rotateY = useTransform(mouseX, [-150, 150], [-6, 6]);

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

  const baseCardStyle = isFeatured ? 'hf-card-featured' : 'hf-card';

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group cursor-pointer ${baseCardStyle} ${className}`}
    >
      {/* Dynamic Cursor Spotlight Halo */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(350px circle at calc(50% + ${mouseX.get()}px) calc(50% + ${mouseY.get()}px), rgba(255, 157, 0, 0.18), transparent 80%)`,
        }}
      />
      <div className="relative z-20 h-full flex flex-col justify-between">{children}</div>
    </motion.div>
  );
}

export default function ServicesBentoSection() {
  const [isStacked, setIsStacked] = useState(true);

  const servicesData: ServiceItem[] = [
    {
      id: 'website-upgrade',
      category: 'engineering',
      isFeaturedLarge: true,
      icon: Gauge,
      iconVariant: 'secondary',
      badge: 'HIGH DEMAND SERVICE',
      title: 'Old Website Upgrade / Speed & SEO Overhaul',
      description:
        'Is your website slow, outdated, or dropping on Google rankings? We audit and fix sluggish legacy sites, eliminating plugin bloat to guarantee 100/100 Core Web Vitals and sub-second page loads.',
      bullets: [
        'Sub-Second Page Load Times',
        '100/100 Mobile Core Web Vitals',
        'Technical SEO Cleanup & Schema',
        'Modern High-Converting Redesign',
      ],
      linkText: 'Fix My Slow Website',
      linkHref: '/services#website-upgrade',
      tag: 'Speed & SEO Upgrade',
    },
    {
      id: 'ugc-ads',
      category: 'growth',
      isFeaturedRight: true,
      icon: Video,
      iconVariant: 'accent',
      badge: 'UGC Ads Agency',
      title: 'UGC Video Ads for E-Commerce & DTC',
      description:
        'User-Generated Content video ad hooks produced by real creators. Outperform expensive studio ads with high-converting native TikTok, Meta & Instagram ad creatives.',
      bullets: [
        'Authentic Creator Hook Scripting',
        'Rapid A/B Video Creative Testing',
        '5.2x Verified ROAS Results',
      ],
      linkText: 'View UGC Ads',
      linkHref: '/services#ugc-ads',
      tag: 'High-ROAS Hooks',
    },
    {
      id: 'web-dev',
      category: 'engineering',
      icon: Code2,
      iconVariant: 'secondary',
      badge: 'Web Dev',
      title: 'Website Development',
      description:
        'Custom business sites, landing pages, and e-commerce portals built with zero plugin bloat.',
      linkHref: '/services#web-dev',
    },
    {
      id: 'app-dev',
      category: 'engineering',
      icon: Smartphone,
      iconVariant: 'accent',
      badge: 'App Dev',
      title: 'App Development',
      description:
        'Scalable web applications and iOS / Android mobile apps with real-time database backends.',
      linkHref: '/services#app-dev',
    },
    {
      id: 'seo',
      category: 'growth',
      icon: Search,
      iconVariant: 'success',
      badge: 'SEO',
      title: 'SEO Optimization',
      description:
        'Rank top 3 on Google for commercial intent buyer queries across English-speaking global markets.',
      linkHref: '/services#seo',
    },
    {
      id: 'local-business',
      category: 'growth',
      icon: MapPin,
      iconVariant: 'secondary',
      badge: 'Local SEO',
      title: 'Local Business Marketing',
      description:
        'Google Business Profile optimization, local map packs, and localized ads for brick & mortar clients.',
      linkHref: '/services#local-business',
    },
    {
      id: 'meta-ads',
      category: 'growth',
      icon: Target,
      iconVariant: 'accent',
      badge: 'Meta Ads',
      title: 'Meta & LinkedIn Ads',
      description:
        'Full Facebook & Instagram ad management, conversion tracking API (CAPI), and scalable ad copy.',
      linkHref: '/services#meta-ads',
    },
    {
      id: 'sales-growth',
      category: 'growth',
      icon: Zap,
      iconVariant: 'success',
      badge: 'CRO & Leads',
      title: 'Sales Growth & Lead Gen',
      description:
        'High-converting lead funnels, landing page CRO, and automated consultation booking workflows.',
      linkHref: '/services#sales-growth',
    },
  ];

  return (
    <section className="py-16 bg-[#F9FAFB] border-t border-[#E5E7EB] relative overflow-hidden bg-line-pattern">
      {/* Ambient Physics Orbs */}
      <motion.div
        animate={{ y: [0, -25, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-12 left-1/4 w-80 h-80 bg-[#FFD21E]/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 25, 0], x: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-12 right-1/4 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-[1200px] mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] text-xs font-bold border border-[#E5E7EB] shadow-2xs">
            <Sparkles size={14} className="text-[#1C1C1C]" />
            8 Core International Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1C1C] tracking-tight">
            Specialized Web Engineering & <GradientText>Growth Services</GradientText>
          </h2>
          <p className="text-sm text-[#6B7280]">
            From sub-second web & mobile development to old site speed overhauls and high-ROAS UGC video ads for international brands worldwide.
          </p>

          {/* RESHUFFLE & ASSEMBLE GRID BUTTON */}
          <div className="pt-2 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsStacked(!isStacked)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border shadow-xs transition-all min-h-[42px] cursor-pointer ${
                isStacked
                  ? 'bg-[#1C1C1C] text-[#FFD21E] border-[#FFD21E]'
                  : 'bg-white text-[#1C1C1C] border-[#E5E7EB] hover:border-[#FF9D00]'
              }`}
            >
              <RotateCcw size={15} className={isStacked ? 'animate-spin text-[#FFD21E]' : 'text-[#FF9D00]'} />
              <span>{isStacked ? '🔀 Reshuffle & Assemble Grid' : '✨ Stack & Assemble Cards'}</span>
            </motion.button>
          </div>
        </div>

        {/* BENTO GRID / RUMMY DECK SHUFFLE */}
        <div className="space-y-5">
          {/* Top Row: Large Featured Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Featured Large Card */}
            <motion.div
              initial={
                isStacked
                  ? { x: 120, y: 40, rotate: -8, scale: 0.88, zIndex: 30 }
                  : { y: 20, opacity: 1 }
              }
              animate={
                isStacked
                  ? { x: 120, y: 40, rotate: -8, scale: 0.88, zIndex: 30 }
                  : { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 1 }
              }
              transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.05 }}
              className="lg:col-span-7 flex"
            >
              <MotionCardWrapper isFeatured className="w-full p-5 sm:p-7 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <IconBox icon={Gauge} size={22} variant="secondary" />
                    <span className="px-2.5 py-1 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] text-[11px] font-extrabold tracking-wide border border-[#E5E7EB]">
                      HIGH DEMAND SERVICE
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#1C1C1C] mb-2 group-hover:text-[#FF9D00] transition-colors">
                    Old Website Upgrade / Speed & SEO Overhaul
                  </h3>

                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed mb-4">
                    Is your website slow, outdated, or dropping on Google rankings? We audit and fix sluggish legacy sites, eliminating plugin bloat to guarantee 100/100 Core Web Vitals and sub-second page loads.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-[#1C1C1C] pt-1">
                    <div className="flex items-center gap-1.5">
                      <Check size={14} className="text-[#10B981] shrink-0" />
                      <span>Sub-Second Page Load Times</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-[#10B981] shrink-0" />
                      <span>100/100 Mobile Core Web Vitals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-[#10B981] shrink-0" />
                      <span>Technical SEO Cleanup & Schema</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-[#10B981] shrink-0" />
                      <span>Modern High-Converting Redesign</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2.5 py-1 rounded-[4px]">
                    Speed & SEO Upgrade
                  </span>
                  <Link
                    href="/services#website-upgrade"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF9D00] hover:underline"
                  >
                    <span>Fix My Slow Website</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </MotionCardWrapper>
            </motion.div>

            {/* Featured Right Card */}
            <motion.div
              initial={
                isStacked
                  ? { x: -140, y: 30, rotate: 6, scale: 0.86, zIndex: 20 }
                  : { y: 20, opacity: 1 }
              }
              animate={
                isStacked
                  ? { x: -140, y: 30, rotate: 6, scale: 0.86, zIndex: 20 }
                  : { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 1 }
              }
              transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
              className="lg:col-span-5 flex"
            >
              <MotionCardWrapper className="w-full p-5 sm:p-7 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <IconBox icon={Video} size={22} variant="accent" />
                    <span className="text-[11px] font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2.5 py-1 rounded-[4px]">
                      UGC Ads Agency
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#1C1C1C] mb-2 group-hover:text-[#FF9D00] transition-colors">
                    UGC Video Ads for E-Commerce & DTC
                  </h3>

                  <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                    User-Generated Content video ad hooks produced by real creators. Outperform expensive studio ads with high-converting native TikTok, Meta & Instagram ad creatives.
                  </p>

                  <div className="space-y-2 text-xs font-semibold text-[#1C1C1C]">
                    <div className="flex items-center gap-1.5">
                      <Check size={14} className="text-[#10B981]" />
                      <span>Authentic Creator Hook Scripting</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check size={14} className="text-[#10B981]" />
                      <span>Rapid A/B Video Creative Testing</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check size={14} className="text-[#10B981]" />
                      <span>5.2x Verified ROAS Results</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                  <span className="font-mono-stats font-bold text-[#FF9D00] text-xs">High-ROAS Hooks</span>
                  <Link href="/services#ugc-ads" className="text-[#FF9D00] font-bold text-xs hover:underline flex items-center gap-1">
                    <span>View UGC Ads</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </MotionCardWrapper>
            </motion.div>
          </div>

          {/* Bottom Grid: 6 Standard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {servicesData
              .filter((s) => !s.isFeaturedLarge && !s.isFeaturedRight)
              .map((service, index) => {
                const IconComp = service.icon;
                const stackRotation = (index % 2 === 0 ? 1 : -1) * (4 + index * 2);
                const stackOffsetX = (index - 2.5) * 35;

                return (
                  <motion.div
                    key={service.id}
                    initial={
                      isStacked
                        ? { x: stackOffsetX, y: -60, rotate: stackRotation, scale: 0.85, zIndex: 10 + index }
                        : { y: 20, opacity: 1 }
                    }
                    animate={
                      isStacked
                        ? { x: stackOffsetX, y: -60, rotate: stackRotation, scale: 0.85, zIndex: 10 + index }
                        : { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 1 }
                    }
                    transition={{
                      type: 'spring',
                      stiffness: 210,
                      damping: 17,
                      delay: 0.1 + index * 0.04,
                    }}
                    className="flex"
                  >
                    <MotionCardWrapper className="p-5 space-y-3 flex flex-col justify-between w-full">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <IconBox icon={IconComp} size={18} variant={service.iconVariant} />
                          <span className="text-[10px] font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded-[4px]">
                            {service.badge}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-[#1C1C1C] group-hover:text-[#FF9D00] transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-xs text-[#6B7280] leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                        <Link
                          href={service.linkHref}
                          className="text-[#FF9D00] text-xs font-bold hover:underline flex items-center justify-between w-full"
                        >
                          <span>Learn More</span>
                          <ArrowUpRight size={14} />
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
