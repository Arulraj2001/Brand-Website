'use client';

import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { TrendingUp, CheckCircle2, Sparkles, Globe, Zap, Gauge, ShieldCheck } from 'lucide-react';
import { useSiteSettings } from '@/lib/useSiteData';
import { INITIAL_SITE_SETTINGS } from '@/lib/supabase/data';

export default function HeroMockup() {
  const { settings } = useSiteSettings();
  const [mounted, setMounted] = React.useState(false);

  // Mouse Gyroscope 3D Tilt Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-150, 150], [8, -8]);
  const rotateY = useTransform(mouseX, [-150, 150], [-8, 8]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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

  const activeSettings = mounted ? settings : INITIAL_SITE_SETTINGS;
  const feedTitle = activeSettings.hero_feed_title || 'Verified Strategy Consultation Call';
  const feedSubtitle = activeSettings.hero_feed_subtitle || 'Budget: $1,000–$3,000 • Sub-Second Speed Upgrade';
  const feedBadge = activeSettings.hero_feed_badge || 'Just Now';

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-xl mx-auto cursor-pointer group"
    >
      {/* Dynamic Cursor Spotlight Halo */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(400px circle at calc(50% + ${mouseX.get()}px) calc(50% + ${mouseY.get()}px), rgba(255, 157, 0, 0.18), transparent 80%)`,
        }}
      />

      {/* Main Glass Dashboard Container */}
      <div className="relative bg-white/95 backdrop-blur-md border-2 border-[#FFD21E] rounded-2xl p-5 sm:p-6 shadow-xl space-y-4 overflow-hidden z-20">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFD21E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            <span className="ml-2 text-xs font-bold text-[#1C1C1C] font-mono-stats">
              {activeSettings.brand_name ? `${activeSettings.brand_name.toLowerCase()}.netlify.app/growth-vitals` : 'ostrune.netlify.app/growth-vitals'}
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#FFF9E6] border border-[#FFD21E] text-[#1C1C1C] text-[11px] font-extrabold flex items-center gap-1">
            <Sparkles size={12} className="text-[#FF9D00] animate-spin-slow" />
            Live Client Feed
          </span>
        </div>

        {/* 3 Metric Cards Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] p-3 rounded-xl hover:border-[#3B82F6] transition-colors">
            <p className="text-[11px] font-bold text-[#6B7280]">Monthly Leads</p>
            <p className="text-xl font-extrabold text-[#1C1C1C] font-mono-stats mt-0.5">1,480+</p>
            <span className="text-[10px] text-[#10B981] font-extrabold flex items-center gap-0.5 mt-1">
              <TrendingUp size={10} /> +340% YoY
            </span>
          </div>

          <div className="bg-[#F9FAFB] border border-[#E5E7EB] p-3 rounded-xl hover:border-[#FF9D00] transition-colors">
            <p className="text-[11px] font-bold text-[#6B7280]">Avg ROAS</p>
            <p className="text-xl font-extrabold text-[#FF9D00] font-mono-stats mt-0.5">5.2x</p>
            <span className="text-[10px] text-[#3B82F6] font-extrabold flex items-center gap-0.5 mt-1">
              Verified Ads
            </span>
          </div>

          <div className="bg-[#FFF9E6] border border-[#FFD21E] p-3 rounded-xl hover:border-[#FF9D00] transition-colors">
            <p className="text-[11px] font-bold text-[#6B7280]">Page Speed</p>
            <p className="text-xl font-extrabold text-[#10B981] font-mono-stats mt-0.5">0.68s</p>
            <span className="text-[10px] text-[#10B981] font-extrabold flex items-center gap-0.5 mt-1">
              100/100 Vitals
            </span>
          </div>
        </div>

        {/* Live SVG Graph Stream */}
        <div className="bg-[#1C1C1C] border border-[#2A2A2A] p-4 rounded-xl space-y-2 text-white shadow-inner">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-[#FFD21E] flex items-center gap-1.5">
              <Gauge size={13} className="text-[#10B981]" />
              Core Web Vitals Engine
            </span>
            <span className="text-[#10B981] font-bold text-[11px] flex items-center gap-1.5">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </div>
              Live Speed Stream
            </span>
          </div>

          <div className="h-20 w-full relative overflow-hidden pt-1">
            <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
              <path
                d="M0 80 Q 50 65, 100 35 T 200 45 T 300 15 T 400 5 L 400 100 L 0 100 Z"
                fill="url(#heroNeonGradient)"
                opacity="0.3"
              />
              <path
                d="M0 80 Q 50 65, 100 35 T 200 45 T 300 15 T 400 5"
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
              />
              <defs>
                <linearGradient id="heroNeonGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#FFD21E" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Live Incoming Lead Pill */}
        <div className="bg-white border border-[#E5E7EB] p-3.5 rounded-xl flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#10B981]/10 text-[#10B981] flex items-center justify-center font-bold shrink-0 border border-[#10B981]/20">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1C1C1C]">{feedTitle}</p>
              <p className="text-[11px] text-[#6B7280] font-semibold">{feedSubtitle}</p>
            </div>
          </div>
          <span className="text-[10px] font-extrabold text-[#3B82F6] bg-[#3B82F6]/10 px-2.5 py-1 rounded-full border border-[#3B82F6]/20 shrink-0">
            {feedBadge}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
