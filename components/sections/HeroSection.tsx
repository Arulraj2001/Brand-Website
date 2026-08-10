'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Globe, Sparkles, Clock, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';
import GradientText from '@/components/ui/GradientText';
import HeroMockup from './HeroMockup';

const ROTATING_WORDS = [
  'Digital Growth',
  'Sub-Second Speed',
  'High-ROAS UGC Ads',
  'Top 3 Google SEO',
];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-dot-pattern bg-white">
      {/* Ultra-Level Ambient Quantum Orbs & Light Spotlights */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-10 w-96 h-96 bg-[#FFD21E]/15 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.25, 0.45, 0.25],
          y: [0, -30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 right-10 w-96 h-96 bg-[#3B82F6]/15 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-[1200px] mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Asymmetrical Copy (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Top Brand Tag Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF9E6] text-[#1C1C1C] text-xs font-bold border border-[#FFD21E] shadow-2xs">
              <Sparkles size={14} className="text-[#FF9D00] animate-pulse" />
              <span>Affordable Premium Web Engineering & Growth Services</span>
              <span className="text-[#1C1C1C]/40">•</span>
              <span className="flex items-center gap-1 font-semibold text-[#3B82F6]">
                <Globe size={12} /> Serving Clients Worldwide
              </span>
            </div>

            {/* Dynamic H1 Headline with Rotating Word Flip */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#1C1C1C] tracking-[-0.02em] leading-[1.12]">
              Affordable Web Engineering &{' '}
              <span className="inline-block min-w-[280px] sm:min-w-[320px] text-left">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="inline-block"
                  >
                    <GradientText>{ROTATING_WORDS[wordIndex]}</GradientText>
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#6B7280] leading-[1.6] max-w-2xl font-medium">
              High-impact web engineering, sub-second speed upgrades, high-ROAS UGC video ads, and SEO dominance for ambitious brands worldwide. Guaranteed 12-hour reply times across all global time zones.
            </p>

            {/* CTA Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Button href="/contact" variant="primary" size="lg" className="shadow-md hover:shadow-lg">
                <span>Book a Free Strategy Call</span>
                <ArrowRight size={18} />
              </Button>
              <Button href="/portfolio" variant="secondary" size="lg" className="border-2">
                <span>View Case Studies</span>
              </Button>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-5 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#6B7280] border-t border-[#E5E7EB]">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E5E7EB] shadow-2xs">
                <CheckCircle2 size={15} className="text-[#10B981]" />
                <span>Same Quality, 60% Lower Cost</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E5E7EB] shadow-2xs">
                <Clock size={15} className="text-[#FF9D00]" />
                <span>Global Time-Zone Coverage</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E5E7EB] shadow-2xs">
                <ShieldCheck size={15} className="text-[#3B82F6]" />
                <span>Stripe & PayPal Accepted</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Ultra 3D Dashboard Mockup (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <HeroMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
