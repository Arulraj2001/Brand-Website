'use client';

import React from 'react';
import Link from 'next/link';
import { Code2, Search, Target, Zap, ArrowUpRight, Check, Sparkles } from 'lucide-react';
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
            Core Growth Offerings
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] tracking-tight">
            Specialized Engineering & <GradientText>Growth Capabilities</GradientText>
          </h2>
          <p className="text-sm text-[#6B7280]">
            We break away from generic templates by deploying hyper-focused web engineering and data-backed performance channels tailored for Indian enterprises.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Featured Large Card (7 Cols): Web & App Engineering */}
          <div className="lg:col-span-7 flex">
            <Card isFeatured className="flex flex-col justify-between w-full p-5 sm:p-6 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <IconBox icon={Code2} size={20} variant="secondary" />
                  <span className="px-2 py-0.5 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] text-[11px] font-extrabold tracking-wide border border-[#E5E7EB]">
                    FLAGSHIP CAPABILITY
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#1C1C1C] mb-1.5 group-hover:text-[#FF9D00] transition-colors">
                  Custom Web & Mobile App Development
                </h3>

                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed mb-3">
                  Sub-second page speeds, enterprise security, and dynamic Indian payment gateway readiness (Razorpay, PayU, Cashfree). Built with modern cloud architectures, serverless databases, and instant API integrations.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-[#1C1C1C] pt-1">
                  <div className="flex items-center gap-1.5">
                    <Check size={13} className="text-[#10B981] shrink-0" />
                    <span>100/100 Core Web Vitals Guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={13} className="text-[#10B981] shrink-0" />
                    <span>Supabase DB & Auth Integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={13} className="text-[#10B981] shrink-0" />
                    <span>Instant UPI Payment Processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={13} className="text-[#10B981] shrink-0" />
                    <span>Zero Plugin Dependency</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded-[4px]">
                  Web Engineering
                </span>
                <Link
                  href="/services#web-dev"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#FF9D00] hover:underline"
                >
                  <span>Explore Deliverables</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </Card>
          </div>

          {/* Right Column (5 Cols): 3 Stacked Sub-Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            {/* Sub-Card 1: National & Local SEO */}
            <Card className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconBox icon={Search} size={16} variant="accent" />
                  <h3 className="text-sm font-bold text-[#1C1C1C]">National & Local SEO</h3>
                </div>
                <span className="text-[10px] font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded-[4px]">
                  SEO
                </span>
              </div>
              <p className="text-xs text-[#6B7280]">
                Capture top 3 commercial rankings across Bengaluru, Mumbai, Delhi NCR, and Tier 1 hubs.
              </p>
              <div className="pt-1 flex items-center justify-between text-xs">
                <span className="font-mono-stats font-bold text-[#10B981] text-[11px]">+480% Organic Traffic</span>
                <Link href="/services#seo" className="text-[#FF9D00] font-bold text-[11px] hover:underline">
                  View Strategy →
                </Link>
              </div>
            </Card>

            {/* Sub-Card 2: Meta & LinkedIn Performance Ads */}
            <Card className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconBox icon={Target} size={16} variant="secondary" />
                  <h3 className="text-sm font-bold text-[#1C1C1C]">Meta & LinkedIn Ads</h3>
                </div>
                <span className="text-[10px] font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded-[4px]">
                  Meta Ads
                </span>
              </div>
              <p className="text-xs text-[#6B7280]">
                High-converting video hooks & audience targeting sequences designed for verified INR revenue.
              </p>
              <div className="pt-1 flex items-center justify-between text-xs">
                <span className="font-mono-stats font-bold text-[#FF9D00] text-[11px]">5.2x Verified ROAS</span>
                <Link href="/services#meta-ads" className="text-[#FF9D00] font-bold text-[11px] hover:underline">
                  View Campaigns →
                </Link>
              </div>
            </Card>

            {/* Sub-Card 3: Automated B2B Lead Gen */}
            <Card className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconBox icon={Zap} size={16} variant="success" />
                  <h3 className="text-sm font-bold text-[#1C1C1C]">B2B Lead Qualification</h3>
                </div>
                <span className="text-[10px] font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded-[4px]">
                  Lead Gen
                </span>
              </div>
              <p className="text-xs text-[#6B7280]">
                Interactive multi-step questionnaire funnels that deliver verified +91 phone leads directly to WhatsApp.
              </p>
              <div className="pt-1 flex items-center justify-between text-xs">
                <span className="font-mono-stats font-bold text-[#10B981] text-[11px]">850+ Monthly Leads</span>
                <Link href="/services#lead-gen" className="text-[#FF9D00] font-bold text-[11px] hover:underline">
                  View Funnel →
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
