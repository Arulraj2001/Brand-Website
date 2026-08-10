'use client';

import React from 'react';
import Link from 'next/link';
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
import IconBox from '@/components/ui/IconBox';
import GradientText from '@/components/ui/GradientText';
import Card from '@/components/ui/Card';

export default function ServicesBentoSection() {
  return (
    <section className="py-14 bg-[#F9FAFB] border-t border-[#E5E7EB] relative overflow-hidden bg-line-pattern">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] text-xs font-bold border border-[#E5E7EB]">
            <Sparkles size={13} className="text-[#1C1C1C]" />
            8 Core International Capabilities
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] tracking-tight">
            Specialized Web Engineering & <GradientText>Growth Services</GradientText>
          </h2>
          <p className="text-sm text-[#6B7280]">
            From sub-second web & mobile development to old site speed overhauls and high-ROAS UGC video ads for international brands worldwide.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Featured Large Card (7 Cols): Old Website Upgrade & Speed Overhaul */}
          <div className="lg:col-span-7 flex">
            <Card isFeatured className="flex flex-col justify-between w-full p-5 sm:p-6 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <IconBox icon={Gauge} size={20} variant="secondary" />
                  <span className="px-2 py-0.5 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] text-[11px] font-extrabold tracking-wide border border-[#E5E7EB]">
                    HIGH DEMAND SERVICE
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#1C1C1C] mb-1.5 group-hover:text-[#FF9D00] transition-colors">
                  Old Website Upgrade / Speed & SEO Overhaul
                </h3>

                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed mb-3">
                  Is your website slow, outdated, or dropping on Google rankings? We audit and fix sluggish legacy sites, eliminating plugin bloat to guarantee 100/100 Core Web Vitals and sub-second page loads.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-[#1C1C1C] pt-1">
                  <div className="flex items-center gap-1.5">
                    <Check size={13} className="text-[#10B981] shrink-0" />
                    <span>Sub-Second Page Load Times</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={13} className="text-[#10B981] shrink-0" />
                    <span>100/100 Mobile Core Web Vitals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={13} className="text-[#10B981] shrink-0" />
                    <span>Technical SEO Cleanup & Schema</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={13} className="text-[#10B981] shrink-0" />
                    <span>Modern High-Converting Redesign</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded-[4px]">
                  Speed & SEO Upgrade
                </span>
                <Link
                  href="/services#website-upgrade"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#FF9D00] hover:underline"
                >
                  <span>Fix My Slow Website</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </Card>
          </div>

          {/* Right Column (5 Cols): UGC Video Ads */}
          <div className="lg:col-span-5 flex">
            <Card className="flex flex-col justify-between w-full p-5 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <IconBox icon={Video} size={20} variant="accent" />
                  <span className="text-[10px] font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded-[4px]">
                    UGC Ads Agency
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#1C1C1C] mb-1.5 group-hover:text-[#FF9D00] transition-colors">
                  UGC Video Ads for E-Commerce & DTC
                </h3>

                <p className="text-xs text-[#6B7280] leading-relaxed mb-3">
                  User-Generated Content video ad hooks produced by real creators. Outperform expensive studio ads with high-converting native TikTok, Meta & Instagram ad creatives.
                </p>

                <div className="space-y-1.5 text-xs font-semibold text-[#1C1C1C]">
                  <div className="flex items-center gap-1.5">
                    <Check size={13} className="text-[#10B981]" />
                    <span>Authentic Creator Hook Scripting</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check size={13} className="text-[#10B981]" />
                    <span>Rapid A/B Video Creative Testing</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check size={13} className="text-[#10B981]" />
                    <span>5.2x Verified ROAS Results</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                <span className="font-mono-stats font-bold text-[#FF9D00] text-xs">High-ROAS Hooks</span>
                <Link href="/services#ugc-ads" className="text-[#FF9D00] font-bold text-xs hover:underline">
                  View UGC Ads →
                </Link>
              </div>
            </Card>
          </div>
        </div>

        {/* 6 Grid Service Cards below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          <Card className="p-4 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <IconBox icon={Code2} size={16} variant="secondary" />
                <span className="text-[10px] font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded-[4px]">
                  Web Dev
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#1C1C1C]">Website Development</h3>
              <p className="text-xs text-[#6B7280]">
                Custom business sites, landing pages, and e-commerce portals built with zero plugin bloat.
              </p>
            </div>
            <Link href="/services#web-dev" className="text-[#FF9D00] text-xs font-bold hover:underline pt-2 border-t border-[#E5E7EB] flex items-center justify-between">
              <span>Learn More</span>
              <ArrowUpRight size={13} />
            </Link>
          </Card>

          <Card className="p-4 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <IconBox icon={Smartphone} size={16} variant="accent" />
                <span className="text-[10px] font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded-[4px]">
                  App Dev
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#1C1C1C]">App Development</h3>
              <p className="text-xs text-[#6B7280]">
                Scalable web applications and iOS / Android mobile apps with real-time database backends.
              </p>
            </div>
            <Link href="/services#app-dev" className="text-[#FF9D00] text-xs font-bold hover:underline pt-2 border-t border-[#E5E7EB] flex items-center justify-between">
              <span>Learn More</span>
              <ArrowUpRight size={13} />
            </Link>
          </Card>

          <Card className="p-4 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <IconBox icon={Search} size={16} variant="success" />
                <span className="text-[10px] font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded-[4px]">
                  SEO
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#1C1C1C]">SEO Optimization</h3>
              <p className="text-xs text-[#6B7280]">
                Rank top 3 on Google for commercial intent buyer queries across English-speaking global markets.
              </p>
            </div>
            <Link href="/services#seo" className="text-[#FF9D00] text-xs font-bold hover:underline pt-2 border-t border-[#E5E7EB] flex items-center justify-between">
              <span>Learn More</span>
              <ArrowUpRight size={13} />
            </Link>
          </Card>

          <Card className="p-4 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <IconBox icon={MapPin} size={16} variant="secondary" />
                <span className="text-[10px] font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded-[4px]">
                  Local SEO
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#1C1C1C]">Local Business Marketing</h3>
              <p className="text-xs text-[#6B7280]">
                Google Business Profile optimization, local map packs, and localized ads for brick & mortar clients.
              </p>
            </div>
            <Link href="/services#local-business" className="text-[#FF9D00] text-xs font-bold hover:underline pt-2 border-t border-[#E5E7EB] flex items-center justify-between">
              <span>Learn More</span>
              <ArrowUpRight size={13} />
            </Link>
          </Card>

          <Card className="p-4 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <IconBox icon={Target} size={16} variant="accent" />
                <span className="text-[10px] font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded-[4px]">
                  Meta Ads
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#1C1C1C]">Meta & LinkedIn Ads</h3>
              <p className="text-xs text-[#6B7280]">
                Full Facebook & Instagram ad management, conversion tracking API (CAPI), and scalable ad copy.
              </p>
            </div>
            <Link href="/services#meta-ads" className="text-[#FF9D00] text-xs font-bold hover:underline pt-2 border-t border-[#E5E7EB] flex items-center justify-between">
              <span>Learn More</span>
              <ArrowUpRight size={13} />
            </Link>
          </Card>

          <Card className="p-4 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <IconBox icon={Zap} size={16} variant="success" />
                <span className="text-[10px] font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded-[4px]">
                  CRO & Leads
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#1C1C1C]">Sales Growth & Lead Gen</h3>
              <p className="text-xs text-[#6B7280]">
                High-converting lead funnels, landing page CRO, and automated consultation booking workflows.
              </p>
            </div>
            <Link href="/services#sales-growth" className="text-[#FF9D00] text-xs font-bold hover:underline pt-2 border-t border-[#E5E7EB] flex items-center justify-between">
              <span>Learn More</span>
              <ArrowUpRight size={13} />
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}
