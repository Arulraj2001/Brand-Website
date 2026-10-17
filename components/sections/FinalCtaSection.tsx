'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';

export default function FinalCtaSection() {
  return (
    <section className="py-24 bg-[#05060A] border-t border-white/[0.08] relative overflow-hidden text-white">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FFB800]/10 blur-[180px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10 text-center">
        <div className="cyber-glass rounded-3xl p-10 sm:p-16 space-y-7 max-w-4xl mx-auto border border-white/10 shadow-[0_16px_50px_rgba(0,0,0,0.6)]">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.04] text-[#FFB800] text-xs font-mono font-bold border border-white/[0.1] shadow-xs">
            <Sparkles size={14} className="text-[#FFB800]" />
            <span>Ready to Build or Redesign Your Website?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-[-0.035em] leading-[1.08] max-w-3xl mx-auto">
            Build a Faster, High-Converting Website That{' '}
            <GradientText>Drives Growth</GradientText>
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Whether you need a custom-engineered web application from scratch or an expertly crafted store on Shopify, WordPress, or Wix, our team delivers high-performance websites that rank high on Google and convert visitors into clients.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-black bg-gradient-to-r from-[#FFB800] to-[#FF9500] text-black shadow-[0_0_28px_rgba(255,184,0,0.35)] hover:shadow-[0_0_42px_rgba(255,184,0,0.55)] hover:scale-105 active:scale-95 transition-all w-full sm:w-auto justify-center"
            >
              <span>Get a Free Consultation &amp; Quote</span>
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-mono text-neutral-400 pt-4 border-t border-white/[0.08]">
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#FFB800]" />
              Fast Turnaround &amp; Milestones
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#10B981]" />
              Free Technical &amp; Speed Consultation
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#00F0FF]" />
              100% Code &amp; Asset Ownership
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
