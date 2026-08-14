'use client';

import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Award, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';
import FreeAuditLeadForm from './FreeAuditLeadForm';
import { BlogCategory } from '@/types';
import { getBlogCtaConfig } from '@/lib/blogCtaConfig';
import { INITIAL_PORTFOLIO } from '@/lib/supabase/data';

interface BlogEndCtaProps {
  category: BlogCategory;
  postSlug: string;
  postTitle: string;
}

export default function BlogEndCta({ category, postSlug, postTitle }: BlogEndCtaProps) {
  const ctaConfig = getBlogCtaConfig(category);

  // Find a matching portfolio case study for social proof
  const matchedCaseStudy = INITIAL_PORTFOLIO.find(
    (p) => p.service_type === (category as string)
  ) || INITIAL_PORTFOLIO[0];

  return (
    <div className="space-y-6 my-10">
      {/* Primary End-of-Post CTA Box */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-[#FFD21E] bg-white p-6 sm:p-8 shadow-sm">
        {/* Top Accent Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FFD21E] via-[#FF9D00] to-[#3B82F6]" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (6 Cols): Service Offer & Value Props */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] text-xs font-extrabold uppercase tracking-wide">
              <Sparkles size={13} />
              <span>{ctaConfig.auditBadge}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1C] leading-tight">
              {ctaConfig.auditTitle}
            </h3>

            <p className="text-sm text-[#4B5563] leading-relaxed">
              {ctaConfig.auditDescription}
            </p>

            <div className="space-y-2.5 pt-1 text-xs font-semibold text-[#1C1C1C]">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#10B981] shrink-0" />
                <span>Custom proposal & engineering audit delivered in 12 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#10B981] shrink-0" />
                <span>Zero obligations, 100% free technical evaluation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#10B981] shrink-0" />
                <span>Stripe & PayPal billing at 60% lower rates than Western agencies</span>
              </div>
            </div>

            {/* Case Study Benchmark Snippet */}
            {matchedCaseStudy && (
              <div className="mt-4 p-4 rounded-xl bg-[#FFF9E6] border border-[#FFD21E]/70 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-extrabold text-[#FF9D00] uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Award size={13} /> Proven Benchmark Case Study
                  </span>
                  <span className="text-[#6B7280] font-normal">{matchedCaseStudy.client_name}</span>
                </div>
                <p className="text-xs font-bold text-[#1C1C1C] leading-snug">
                  &ldquo;{matchedCaseStudy.results}&rdquo;
                </p>
              </div>
            )}

            {/* Link to Full Service Page */}
            <div className="pt-2 flex items-center gap-3">
              <Button href={ctaConfig.serviceUrl} variant="secondary" size="sm">
                <span>{ctaConfig.ctaButtonText}</span>
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>

          {/* Right Column (6 Cols): Embedded Audit Lead Form */}
          <div className="lg:col-span-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-5 sm:p-6">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#FF9D00] pb-3 mb-3 border-b border-[#E5E7EB]">
              <Zap size={14} />
              <span>Submit Your Site for a Free Audit</span>
            </div>

            <FreeAuditLeadForm
              category={category}
              postSlug={postSlug}
              postTitle={postTitle}
              compact
            />
          </div>
        </div>
      </div>
    </div>
  );
}
