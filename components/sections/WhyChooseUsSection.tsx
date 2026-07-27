'use client';

import React from 'react';
import StatCounter from '@/components/ui/StatCounter';
import GradientText from '@/components/ui/GradientText';
import Card from '@/components/ui/Card';
import { ShieldCheck, Award, TrendingUp, Users, Sparkles } from 'lucide-react';

export default function WhyChooseUsSection() {
  return (
    <section className="py-16 bg-white border-t border-[#E5E7EB] relative overflow-hidden bg-dot-pattern">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] text-xs font-bold border border-[#E5E7EB]">
            <Sparkles size={14} className="text-[#1C1C1C]" />
            Proven Track Record
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] tracking-tight">
            Why High-Growth Brands <GradientText>Partner With Us</GradientText>
          </h2>
          <p className="text-base text-[#6B7280]">
            We bridge the gap between custom web software engineering and revenue-driven performance marketing.
          </p>
        </div>

        {/* Bento Grid: 1 Featured Story Card + 4 StatCounter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Story Card (6 cols) */}
          <div className="lg:col-span-6 flex">
            <Card isFeatured className="w-full p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-[#FFD21E] text-[#1C1C1C] flex items-center justify-center font-bold border border-[#E5E7EB]">
                  <ShieldCheck size={20} />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#1C1C1C] leading-snug">
                  No Vanity Metrics. Just <span className="text-[#FF9D00]">Verified INR Revenue Growth</span> & Enterprise Code.
                </h3>

                <p className="text-sm text-[#6B7280] leading-relaxed">
                  Most agencies deliver slow template sites and generate fake clicks. We build custom web & mobile platforms engineered for speed, target high-intent commercial keywords across India, and route verified +91 lead pipelines straight to your team.
                </p>
              </div>

              <div className="pt-3 border-t border-[#FFD21E]/60 flex items-center gap-4 text-xs font-bold text-[#1C1C1C]">
                <div className="flex items-center gap-1">
                  <Award size={14} className="text-[#FF9D00]" />
                  <span>100% Code Ownership</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp size={14} className="text-[#10B981]" />
                  <span>Zero Swallowed Exceptions</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right 4 StatCounter Cards (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-4 flex flex-col justify-between space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center font-bold">
                <Users size={16} />
              </div>
              <div className="font-mono-stats text-2xl font-extrabold text-[#1C1C1C]">
                <StatCounter value={80} suffix="+" />
              </div>
              <p className="text-xs font-bold text-[#1C1C1C]">Projects Delivered</p>
              <p className="text-[11px] text-[#6B7280]">Web platforms & app portals across Tier 1 Indian cities</p>
            </Card>

            <Card className="p-4 flex flex-col justify-between space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFD21E] text-[#1C1C1C] flex items-center justify-center font-bold border border-[#E5E7EB]">
                <Award size={16} />
              </div>
              <div className="font-mono-stats text-2xl font-extrabold text-[#FF9D00]">
                <StatCounter value={96} suffix="%" />
              </div>
              <p className="text-xs font-bold text-[#1C1C1C]">Client Retention %</p>
              <p className="text-[11px] text-[#6B7280]">Long-term retainer contracts for SEO & performance ads</p>
            </Card>

            <Card className="p-4 flex flex-col justify-between space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 text-[#10B981] flex items-center justify-center font-bold">
                <TrendingUp size={16} />
              </div>
              <div className="font-mono-stats text-2xl font-extrabold text-[#10B981]">
                <StatCounter value={340} suffix="%" />
              </div>
              <p className="text-xs font-bold text-[#1C1C1C]">Avg Lead Increase</p>
              <p className="text-[11px] text-[#6B7280]">Verified inbound growth measured within 90 days</p>
            </Card>

            <Card className="p-4 flex flex-col justify-between space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center font-bold">
                <ShieldCheck size={16} />
              </div>
              <div className="font-mono-stats text-2xl font-extrabold text-[#3B82F6]">
                <StatCounter value={100} suffix="%" />
              </div>
              <p className="text-xs font-bold text-[#1C1C1C]">Core Web Vitals</p>
              <p className="text-[11px] text-[#6B7280]">Sub-second speed score across Indian mobile networks</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
