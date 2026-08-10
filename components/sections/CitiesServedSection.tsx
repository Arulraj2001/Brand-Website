'use client';

import React from 'react';
import { Globe, Clock, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';

const GLOBAL_REGIONS = [
  { flag: '🌎', name: 'North America', detail: 'Serving businesses across the continent' },
  { flag: '🌍', name: 'Europe', detail: 'Premium engineering for European brands' },
  { flag: '🌏', name: 'Asia Pacific', detail: 'Scaling startups & enterprises across APAC' },
  { flag: '🌐', name: 'Worldwide', detail: 'Remote-first, any time zone, any industry' },
];

export default function CitiesServedSection() {
  return (
    <section className="py-14 bg-[#F9FAFB] border-t border-[#E5E7EB] relative overflow-hidden bg-line-pattern">
      <div className="max-w-[1200px] mx-auto px-4 text-center">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] text-xs font-bold border border-[#E5E7EB]">
            <Globe size={14} className="text-[#1C1C1C]" />
            Global Client Footprint
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] tracking-tight">
            Trusted by Clients <GradientText>Across US, UK, India & Worldwide</GradientText>
          </h2>
          <p className="text-sm text-[#6B7280]">
            Affordable premium web engineering, speed overhaul, and performance ad growth with guaranteed 12-hour reply times.
          </p>
        </div>

        {/* Region Tags Grid */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-6">
          {GLOBAL_REGIONS.map((region, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-4 py-2.5 rounded-[4px] bg-white border border-[#E5E7EB] shadow-xs hover:border-[#FF9D00] transition-colors group"
            >
              <span className="text-xl shrink-0">{region.flag}</span>
              <div className="text-left">
                <p className="font-bold text-[#1C1C1C] text-xs group-hover:text-[#FF9D00] transition-colors">
                  {region.name}
                </p>
                <p className="text-[10px] text-[#6B7280]">{region.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* International Trust Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#1C1C1C] pt-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5E7EB]">
            <Clock size={13} className="text-[#FF9D00]" />
            <span>Time-Zone Friendly (US EST/PST, GMT & AEST)</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5E7EB]">
            <CheckCircle2 size={13} className="text-[#10B981]" />
            <span>Guaranteed 12-Hour Reply SLA</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5E7EB]">
            <ShieldCheck size={13} className="text-[#3B82F6]" />
            <span>Stripe & PayPal International Payments</span>
          </div>
        </div>
      </div>
    </section>
  );
}
