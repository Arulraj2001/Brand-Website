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
    <div className="space-y-6 my-12">
      {/* Primary End-of-Post CTA Box */}
      <div className="relative overflow-hidden rounded-3xl border border-[#FFB800]/30 cyber-glass-glow p-8 sm:p-10 shadow-2xl">
        {/* Top Accent Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFB800] to-transparent opacity-80" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (6 Cols): Service Offer & Value Props */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB800]/15 text-[#FFB800] text-xs font-mono font-bold uppercase tracking-wider border border-[#FFB800]/30">
              <Sparkles size={13} />
              <span>{ctaConfig.auditBadge}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {ctaConfig.auditTitle}
            </h3>

            <p className="text-sm text-gray-300 font-light leading-relaxed">
              {ctaConfig.auditDescription}
            </p>

            <div className="space-y-2.5 pt-1 text-xs font-mono text-gray-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-[#10B981] shrink-0" />
                <span>Custom proposal &amp; engineering audit delivered in &lt;12 hours</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-[#10B981] shrink-0" />
                <span>Zero obligations, 100% free technical evaluation</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-[#10B981] shrink-0" />
                <span>Stripe &amp; Escrow backed sprint agreements</span>
              </div>
            </div>

            {/* Case Study Benchmark Snippet */}
            {matchedCaseStudy && (
              <div className="mt-4 p-4 rounded-2xl bg-white/[0.03] border border-[#FFB800]/30 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#FFB800] uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Award size={13} /> Benchmark Case Study
                  </span>
                  <span className="text-gray-400 font-normal">{matchedCaseStudy.client_name}</span>
                </div>
                <p className="text-xs font-mono font-bold text-white leading-snug">
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
          <div className="lg:col-span-6 cyber-glass border border-white/[0.08] rounded-2xl p-6">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#FFB800] pb-3 mb-3 border-b border-white/[0.08]">
              <Zap size={14} />
              <span>Submit Site for Free Architectural Audit</span>
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
