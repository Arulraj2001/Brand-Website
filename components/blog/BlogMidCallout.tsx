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

function withBlogSource(url: string, postSlug?: string): string {
  if (!postSlug) return url;

  const [baseUrl, hash] = url.split('#');
  const separator = baseUrl.includes('?') ? '&' : '?';
  const trackedUrl = `${baseUrl}${separator}source=blog&post=${encodeURIComponent(postSlug)}`;
  return hash ? `${trackedUrl}#${hash}` : trackedUrl;
}

export default function BlogMidCallout({ category, postSlug }: BlogMidCalloutProps) {
  const ctaConfig = getBlogCtaConfig(category);
  const serviceUrl = withBlogSource(ctaConfig.serviceUrl, postSlug);

  return (
    <div className="my-8 p-6 cyber-glass-glow border-l-4 border-l-[#FFB800] border border-[#FFB800]/25 rounded-2xl shadow-2xl space-y-3.5 relative overflow-hidden group">
      {/* Background Accent Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB800]/15 text-[#FFB800] text-xs font-mono font-bold uppercase tracking-wider border border-[#FFB800]/30">
            <Sparkles size={12} />
            <span>Telemetry Insight</span>
          </span>
          <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider hidden sm:inline">
            {ctaConfig.serviceTitle}
          </span>
        </div>

        <Link
          href={serviceUrl}
          className="text-xs font-mono font-bold text-[#FFB800] hover:text-[#FFD21E] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
        >
          <span>{ctaConfig.ctaButtonText}</span>
          <ArrowRight size={13} className="text-[#FFB800]" />
        </Link>
      </div>

      <div className="space-y-1.5">
        <h4 className="text-base sm:text-lg font-black text-white">
          {ctaConfig.midCalloutTitle}
        </h4>
        <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
          {ctaConfig.midCalloutText}
        </p>
      </div>

      <div className="pt-2 flex items-center justify-between border-t border-white/[0.08] text-xs font-mono">
        <span className="text-gray-400">
          Need custom architecture or audit for your site?
        </span>
        <Link
          href={serviceUrl}
          className="font-bold text-[#FFB800] hover:underline inline-flex items-center gap-1 shrink-0"
        >
          <Zap size={12} />
          <span>Get Free Proposal &rarr;</span>
        </Link>
      </div>
    </div>
  );
}
