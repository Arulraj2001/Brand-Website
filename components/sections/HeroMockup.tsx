'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import {
  Code2,
  Smartphone,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Send,
  Clock,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { submitLead } from '@/lib/supabase/data';
import { useSiteSettings } from '@/lib/useSiteData';

type PillarType = 'website' | 'mobile' | 'leadgen';

const PILLAR_CONFIG = {
  website: {
    label: 'Custom Website',
    icon: Code2,
    badge: 'Any Tech Stack',
    headline: 'Custom Web Engineering',
    subtext: 'Next.js, React, Node, Python, or Custom CMS — zero plugin bloat.',
    stacks: ['Next.js / React', 'Node.js Full-Stack', 'Python / AI Backends', 'Custom Headless CMS', 'High-Speed WordPress'],
    timeline: '7–14 Days Delivery',
    vitalBadge: '100/100 Mobile Vitals',
  },
  mobile: {
    label: 'Mobile App',
    icon: Smartphone,
    badge: 'iOS & Android',
    headline: 'Cross-Platform Mobile Apps',
    subtext: 'Native performance for iOS & Android with real-time cloud sync.',
    stacks: ['React Native (iOS + Android)', 'Flutter Cross-Platform', 'Native Swift / Kotlin', 'Supabase Real-Time Backend'],
    timeline: '2–4 Weeks Delivery',
    vitalBadge: 'App Store Ready',
  },
  leadgen: {
    label: 'Lead Generation',
    icon: TrendingUp,
    badge: 'High-ROAS',
    headline: 'Predictable Lead Funnels',
    subtext: 'Technical SEO dominance, high-converting CRO, and paid ad engines.',
    stacks: ['Technical SEO & Schema', 'Meta & LinkedIn Ads', 'High-Converting CRO Funnel', 'UGC Video Ad Creative'],
    timeline: 'Immediate Pipeline Launch',
    vitalBadge: 'Verified ROI / Leads',
  },
};

export default function HeroMockup() {
  const { settings } = useSiteSettings();
  const [pillar, setPillar] = useState<PillarType>('website');
  const [selectedStack, setSelectedStack] = useState<string>(PILLAR_CONFIG.website.stacks[0]);
  const [contactInput, setContactInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Mouse Gyroscope 3D Tilt Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-150, 150], [6, -6]);
  const rotateY = useTransform(mouseX, [-150, 150], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handlePillarChange = (newPillar: PillarType) => {
    setPillar(newPillar);
    setSelectedStack(PILLAR_CONFIG[newPillar].stacks[0]);
  };

  const handleSubmitEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInput.trim()) return;

    setSubmitting(true);
    const isEmail = contactInput.includes('@');
    const isPhone = !isEmail;

    const result = await submitLead({
      name: 'Hero Estimator Lead',
      email: isEmail ? contactInput.trim() : 'lead-via-phone@ostrune.com',
      phone: isPhone ? contactInput.trim() : 'Provided via Hero Estimator',
      country: 'Global Remote',
      service_interested: PILLAR_CONFIG[pillar].label,
      budget_range: 'Custom Scope Estimate',
      message: `Selected Pillar: ${PILLAR_CONFIG[pillar].label} | Tech Stack: ${selectedStack} | Contact: ${contactInput.trim()}`,
    });

    setSubmitting(false);
    if (result.success) {
      setSubmitted(true);
    }
  };

  const activeConfig = PILLAR_CONFIG[pillar];

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-xl mx-auto cursor-default group"
    >
      {/* Dynamic Cursor Spotlight Halo */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(400px circle at calc(50% + ${mouseX.get()}px) calc(50% + ${mouseY.get()}px), rgba(255, 184, 0, 0.15), transparent 80%)`,
        }}
      />

      {/* Main Interactive Cyber Container */}
      <div className="relative cyber-glass rounded-3xl p-5 sm:p-6 border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)] space-y-4 overflow-hidden z-20 text-white">
        {/* Top Header & Live SLA Indicator */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs font-mono font-bold text-neutral-200 tracking-wider uppercase">
              Project Scope Estimator
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-[#FFB800]/30 text-[#FFB800] text-[11px] font-mono font-bold flex items-center gap-1">
            <Zap size={12} className="text-[#FFB800]" />
            12h SLA
          </span>
        </div>

        {/* Step 1: 3-Pillar Selector Tabs */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono font-bold uppercase text-neutral-400 tracking-wider block">
            1. Select Engineering Pillar
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-white/[0.03] rounded-xl border border-white/[0.08]">
            {(['website', 'mobile', 'leadgen'] as PillarType[]).map((key) => {
              const cfg = PILLAR_CONFIG[key];
              const Icon = cfg.icon;
              const isActive = pillar === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handlePillarChange(key)}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white/10 text-[#FFB800] border border-[#FFB800]/30 shadow-xs'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-[#FFB800]' : 'text-neutral-500'} />
                  <span className="mt-1 leading-none text-[11px] font-medium">{cfg.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Dynamic Tech Stack Chips */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-mono font-bold uppercase text-neutral-400 tracking-wider">
              2. Preferred Tech Stack
            </label>
            <span className="text-[10px] font-mono font-bold text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20 px-2 py-0.5 rounded-full">
              {activeConfig.vitalBadge}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {activeConfig.stacks.map((stack) => {
              const isSelected = selectedStack === stack;
              return (
                <button
                  key={stack}
                  type="button"
                  onClick={() => setSelectedStack(stack)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#FFB800] to-[#FF9500] text-black border-transparent font-bold shadow-xs'
                      : 'bg-white/[0.03] text-neutral-300 border-white/[0.08] hover:border-white/20 hover:bg-white/[0.06]'
                  }`}
                >
                  {stack}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Architecture & Sprint Snapshot */}
        <div className="p-3 bg-white/[0.02] rounded-xl border border-white/[0.08] text-xs space-y-1">
          <div className="flex items-center justify-between text-white font-bold">
            <span className="flex items-center gap-1.5 text-[#FFB800]">
              <Sparkles size={13} /> {activeConfig.headline}
            </span>
            <span className="font-mono text-[11px] text-[#10B981]">{activeConfig.timeline}</span>
          </div>
          <p className="text-[11px] text-neutral-400 leading-snug">{activeConfig.subtext}</p>
        </div>

        {/* Step 3: Instant 1-Click Lead Capture */}
        {submitted ? (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 text-center space-y-2"
            >
              <div className="w-10 h-10 rounded-full bg-[#10B981]/20 text-[#10B981] mx-auto flex items-center justify-center">
                <CheckCircle2 size={22} />
              </div>
              <h4 className="text-sm font-bold text-white">Scope &amp; Quote Request Dispatched</h4>
              <p className="text-xs text-neutral-300">
                Our technical lead will review your {activeConfig.label} project and transmit a custom proposal within 12 hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setContactInput('');
                }}
                className="text-[11px] font-mono font-bold text-[#FFB800] hover:underline pt-1"
              >
                Configure another project estimate
              </button>
            </motion.div>
          </AnimatePresence>
        ) : (
          <form onSubmit={handleSubmitEstimate} className="space-y-2 pt-1">
            <label className="text-[11px] font-mono font-bold uppercase text-neutral-400 tracking-wider block">
              3. Deliver Architecture Blueprint To:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                required
                value={contactInput}
                onChange={(e) => setContactInput(e.target.value)}
                placeholder="Your work email or WhatsApp (with country code)"
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder-neutral-500 focus:bg-white/[0.07] focus:outline-none focus:border-[#FFB800] transition-colors font-mono"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-gradient-to-r from-[#FFB800] to-[#FF9500] hover:scale-105 text-black rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md transition-all disabled:opacity-50 cursor-pointer shrink-0"
              >
                {submitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Get Quote</span>
                    <Send size={13} />
                  </>
                )}
              </button>
            </div>

            {/* Micro Trust Proof */}
            <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono pt-1">
              <span className="flex items-center gap-1">
                <Clock size={11} className="text-[#FFB800]" /> 12h SLA
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={11} className="text-[#3B82F6]" /> 60% Lower Cost
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 size={11} className="text-[#10B981]" /> Free Strategy
              </span>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
}
