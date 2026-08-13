'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { BlogCategory } from '@/types';
import { getBlogCtaConfig } from '@/lib/blogCtaConfig';

interface BlogMidCalloutProps {
  category: BlogCategory;
  postSlug?: string;
}

export default function BlogMidCallout({ category }: BlogMidCalloutProps) {
  const ctaConfig = getBlogCtaConfig(category);

  return (
    <div className="my-8 p-5 sm:p-6 bg-gradient-to-r from-[#FFFDF5] via-[#FFF9E6] to-[#FFFDF5] border-l-4 border-[#FF9D00] border-y border-r border-[#FFD21E]/60 rounded-r-2xl shadow-2xs space-y-3 relative overflow-hidden group">
      {/* Background Accent Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] text-[11px] font-extrabold uppercase tracking-wide">
            <Sparkles size={12} />
            <span>Growth Insight</span>
          </span>
          <span className="text-xs font-bold text-[#FF9D00] uppercase tracking-wider hidden sm:inline">
            {ctaConfig.serviceTitle}
          </span>
        </div>

        <Link
          href={ctaConfig.serviceUrl}
          className="text-xs font-bold text-[#1C1C1C] hover:text-[#FF9D00] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
        >
          <span>{ctaConfig.ctaButtonText}</span>
          <ArrowRight size={13} className="text-[#FF9D00]" />
        </Link>
      </div>

      <div className="space-y-1">
        <h4 className="text-base sm:text-lg font-extrabold text-[#1C1C1C]">
          {ctaConfig.midCalloutTitle}
        </h4>
        <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
          {ctaConfig.midCalloutText}
        </p>
      </div>

      <div className="pt-1 flex items-center justify-between border-t border-[#FFD21E]/40 text-xs">
        <span className="text-[#6B7280] font-medium">
          Need custom engineering or audit for your site?
        </span>
        <Link
          href={ctaConfig.serviceUrl}
          className="font-bold text-[#FF9D00] hover:underline inline-flex items-center gap-1 shrink-0"
        >
          <Zap size={12} />
          <span>Get Free Proposal →</span>
        </Link>
      </div>
    </div>
  );
}
