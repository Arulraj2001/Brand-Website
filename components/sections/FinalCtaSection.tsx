'use client';

import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function FinalCtaSection() {
  return (
    <section className="py-16 bg-[#FFF9E6] border-t border-[#FFD21E] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] text-xs font-bold border border-[#E5E7EB] shadow-xs">
          <Sparkles size={14} className="text-[#1C1C1C]" />
          <span>Ready to Upgrade Your Digital Platform?</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C1C1C] tracking-tight leading-tight max-w-3xl mx-auto">
          Scale Your Business with Sub-Second Engineering & <span className="text-[#FF9D00]">Verified Growth</span>
        </h2>

        <p className="text-base text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
          Partner with senior software architects and performance leads to replace legacy websites, achieve 100/100 Core Web Vitals speed scores, and launch high-converting UGC video ad campaigns. Receive your custom strategy proposal within 12 hours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button href="/contact" variant="primary" size="lg" className="w-full sm:w-auto">
            <span>Book a Free Strategy Call</span>
            <ArrowRight size={18} />
          </Button>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-5 text-xs font-semibold text-[#6B7280] pt-2">
          <span className="flex items-center gap-1.5">
            <Clock size={15} className="text-[#FF9D00]" />
            Guaranteed 12-Hour Reply SLA
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={15} className="text-[#10B981]" />
            Free Technical & Speed Audit Included
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={15} className="text-[#3B82F6]" />
            Stripe & PayPal Accepted Worldwide
          </span>
        </div>
      </div>
    </section>
  );
}
