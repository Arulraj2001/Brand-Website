'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Globe, Sparkles, Clock } from 'lucide-react';
import Button from '@/components/ui/Button';
import GradientText from '@/components/ui/GradientText';
import HeroMockup from './HeroMockup';

export default function HeroSection() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-dot-pattern bg-white">
      <div className="max-w-[1200px] mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Asymmetrical Copy (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-5"
          >
            {/* Top Brand Yellow Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] text-xs font-bold border border-[#E5E7EB] shadow-xs">
              <Sparkles size={14} className="text-[#1C1C1C]" />
              <span>Affordable Premium Web Engineering & Performance Marketing</span>
              <span className="text-[#1C1C1C]/40">•</span>
              <span className="flex items-center gap-1 font-semibold">
                <Globe size={12} /> US • UK • IN • CA • AU • EU
              </span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#1C1C1C] tracking-[-0.01em] leading-[1.15]">
              Affordable Web Development, SEO & <GradientText>Digital Growth Agency</GradientText>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#6B7280] leading-[1.6] max-w-2xl">
              High-quality web engineering, old website speed overhauls, UGC video ads, and SEO dominance at a fraction of US & UK agency rates. Fluent English communication with 12-hour reply guarantees across all time zones.
            </p>

            {/* CTA Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button href="/contact" variant="primary" size="md">
                <span>Book a Free Strategy Call</span>
                <ArrowRight size={16} />
              </Button>
              <Button href="/portfolio" variant="secondary" size="md">
                View Live Projects
              </Button>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#6B7280] border-t border-[#E5E7EB]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#10B981]" />
                <span>Same Quality, 60% Lower Cost</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={15} className="text-[#FF9D00]" />
                <span>Time-Zone Friendly (US/UK/AU)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-[#3B82F6]" />
                <span>Stripe & PayPal Accepted</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Abstract UI Mockup (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <HeroMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
