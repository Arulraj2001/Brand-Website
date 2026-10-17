'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import HeroShowcaseCard from './HeroShowcaseCard';
import GradientText from '@/components/ui/GradientText';

const ROTATING_CAPABILITIES = [
  'Custom Next.js & React Web Apps',
  'Shopify & WordPress E-Commerce Stores',
  'Cross-Platform iOS & Android Mobile Apps',
  'Speed Optimization & 100/100 Core Web Vitals',
];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_CAPABILITIES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#05060A] text-white">
      {/* Ambient Atmospheric Glows */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.28, 0.15],
          x: [0, 40, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-[#FFB800]/20 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.12, 0.22, 0.12],
          y: [0, -50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 -right-32 w-[600px] h-[600px] bg-[#3B82F6]/20 rounded-full blur-[160px] pointer-events-none"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Clear, High-Converting Agency Copy (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-7"
          >
            {/* Clean Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono font-medium text-neutral-300 backdrop-blur-md shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span className="text-white font-bold">Full-Service Web &amp; Mobile Development Agency</span>
            </div>

            {/* Clear Headline with Editorial Serif Accent */}
            <h1 className="text-4xl sm:text-6xl lg:text-[62px] font-black tracking-[-0.035em] leading-[1.08] text-white">
              We Build High-Speed Websites &amp; Apps That{' '}
              <GradientText>Grow Your Business</GradientText>.
            </h1>

            {/* Rotating Tech Capability Banner */}
            <div className="flex items-center gap-2 text-sm sm:text-base font-mono text-[#00F0FF]">
              <span className="text-neutral-500 font-bold">&gt;&gt;</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="font-bold tracking-wide"
                >
                  {ROTATING_CAPABILITIES[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Natural, Human Description */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl font-light">
              From bespoke custom architectures (Next.js, React, Node.js, Python) to high-converting stores on Shopify, WordPress, and Wix. We design and engineer websites that look world-class, load in under a second, and turn visitors into paying customers.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-black tracking-tight bg-gradient-to-r from-[#FFB800] to-[#FF9500] text-black shadow-[0_0_28px_rgba(255,184,0,0.35)] hover:shadow-[0_0_40px_rgba(255,184,0,0.55)] hover:scale-105 active:scale-95 transition-all group"
              >
                <span>Get a Free Project Quote</span>
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-neutral-200 bg-white/[0.04] border border-white/[0.12] hover:bg-white/[0.08] hover:text-white transition-all backdrop-blur-md"
              >
                <span>View Our Client Work</span>
              </Link>
            </div>

            {/* Real, Honest Value Badges */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/[0.08]">
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <div className="flex items-center gap-1.5 text-[#10B981] font-mono text-xs font-bold">
                  <CheckCircle2 size={14} />
                  <span>100/100 Speed</span>
                </div>
                <p className="text-xs text-neutral-300 font-light">Sub-second page loads certified on Google Mobile Vitals.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <div className="flex items-center gap-1.5 text-[#FFB800] font-mono text-xs font-bold">
                  <Sparkles size={14} />
                  <span>Any Tech Stack</span>
                </div>
                <p className="text-xs text-neutral-300 font-light">Custom code, Shopify, WordPress, Wix, or Webflow.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <div className="flex items-center gap-1.5 text-[#00F0FF] font-mono text-xs font-bold">
                  <CheckCircle2 size={14} />
                  <span>Direct Communication</span>
                </div>
                <p className="text-xs text-neutral-300 font-light">Speak directly with senior engineers with transparent updates.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Live Interactive Website & App Showcase (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <HeroShowcaseCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
