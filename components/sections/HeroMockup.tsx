'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle2, Sparkles, Globe } from 'lucide-react';

export default function HeroMockup() {
  return (
    <motion.div
      animate={{ y: [-4, 4, -4] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="relative w-full max-w-xl mx-auto"
    >
      {/* Main Glass Dashboard Card */}
      <div className="relative bg-white border border-[#E5E7EB] rounded-[10px] p-5 sm:p-6 shadow-md space-y-4">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFD21E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            <span className="ml-2 text-xs font-semibold text-[#6B7280]">
              apexpulse.in/growth-dashboard
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-[4px] bg-[#FFF9E6] border border-[#FFD21E] text-[#1C1C1C] text-xs font-bold flex items-center gap-1">
            <Sparkles size={12} className="text-[#FF9D00]" />
            Global Client Feed
          </span>
        </div>

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] p-2.5 rounded-lg">
            <p className="text-[11px] font-semibold text-[#6B7280]">Monthly Leads</p>
            <p className="text-lg font-bold text-[#1C1C1C] font-mono-stats">1,480+</p>
            <span className="text-[10px] text-[#10B981] font-bold flex items-center gap-0.5 mt-0.5">
              <TrendingUp size={10} /> +340% YoY
            </span>
          </div>

          <div className="bg-[#F9FAFB] border border-[#E5E7EB] p-2.5 rounded-lg">
            <p className="text-[11px] font-semibold text-[#6B7280]">Avg ROAS</p>
            <p className="text-lg font-bold text-[#FF9D00] font-mono-stats">5.2x</p>
            <span className="text-[10px] text-[#3B82F6] font-bold flex items-center gap-0.5 mt-0.5">
              Verified USD ($)
            </span>
          </div>

          <div className="bg-[#FFF9E6] border border-[#FFD21E] p-2.5 rounded-lg">
            <p className="text-[11px] font-semibold text-[#6B7280]">Page Speed</p>
            <p className="text-lg font-bold text-[#10B981] font-mono-stats">0.8s</p>
            <span className="text-[10px] text-[#10B981] font-bold flex items-center gap-0.5 mt-0.5">
              100/100 Vitals
            </span>
          </div>
        </div>

        {/* SVG Wave Graph */}
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] p-4 rounded-lg space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#1C1C1C]">Qualified Inquiry Stream (US / UK / CA / AU)</span>
            <span className="text-[#3B82F6] font-bold flex items-center gap-1">
              <Globe size={11} /> Live Stream
            </span>
          </div>

          <div className="h-24 w-full relative overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
              <path
                d="M0 80 Q 50 70, 100 40 T 200 50 T 300 20 T 400 10 L 400 100 L 0 100 Z"
                fill="url(#orangeGradient)"
                opacity="0.2"
              />
              <path
                d="M0 80 Q 50 70, 100 40 T 200 50 T 300 20 T 400 10"
                fill="none"
                stroke="#FF9D00"
                strokeWidth="3"
              />
              <defs>
                <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF9D00" />
                  <stop offset="100%" stopColor="#FFD21E" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Floating Verified Lead Pill */}
        <div className="bg-white border border-[#E5E7EB] p-3 rounded-lg flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center font-bold">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1C1C1C]">New Verified Client Strategy Call</p>
              <p className="text-[10px] text-[#6B7280]">Austin, TX (USA) • Budget: $3,000–$5,000 • Web & Speed Overhaul</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded-[4px]">
            Just Now
          </span>
        </div>
      </div>
    </motion.div>
  );
}
