'use client';

import React from 'react';
import StatCounter from '@/components/ui/StatCounter';
import GradientText from '@/components/ui/GradientText';
import { ShieldCheck, Award, TrendingUp, Users, Sparkles, Clock, Globe } from 'lucide-react';
import { useSiteStats } from '@/lib/useSiteData';

export default function WhyChooseUsSection() {
  const { stats } = useSiteStats();

  const validStats = (stats || []).filter(
    (s) => s && Boolean(s.label) && typeof s.value === 'number' && s.value > 0
  );

  const hasStats = validStats.length > 0;

  return (
    <section className="py-20 bg-[#05060A] border-t border-white/[0.08] relative overflow-hidden text-white">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FFB800]/5 blur-[160px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] text-[#FFB800] text-xs font-mono font-bold border border-white/[0.1]">
            <Sparkles size={14} className="text-[#FFB800]" />
            <span>Proven Global Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Why High-Growth Brands <GradientText>Partner With Us</GradientText>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Top-tier software engineering and performance growth engines delivered at competitive rates with zero bloated management layers.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Story Card */}
          <div className={hasStats ? 'lg:col-span-6 flex' : 'lg:col-span-12 flex'}>
            <div className="cyber-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 w-full border border-white/10 hover:border-[#FFB800]/40 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/30 flex items-center justify-center font-bold">
                  <ShieldCheck size={24} />
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug tracking-tight">
                  Websites Engineered for Speed, Growth, &amp; <span className="text-[#FFB800]">Real Business Results</span>.
                </h3>

                <p className="text-sm text-neutral-300 leading-relaxed">
                  Whether you need a custom-engineered web application from scratch or an expertly crafted store on Shopify, WordPress, or Wix, we build tailored solutions that load lightning-fast, rank high on Google, and turn visitors into loyal clients.
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-4 text-xs font-mono font-bold text-neutral-300">
                <div className="flex items-center gap-1.5 bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/[0.06]">
                  <Clock size={14} className="text-[#FFB800]" />
                  <span>Fast Agile Turnaround</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/[0.06]">
                  <Globe size={14} className="text-[#00F0FF]" />
                  <span>Any Tech or CMS</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/[0.06]">
                  <ShieldCheck size={14} className="text-[#10B981]" />
                  <span>Direct Developer Access</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right StatCounter Cards */}
          {hasStats && (
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {validStats.slice(0, 4).map((stat, index) => {
                const cardColors = [
                  'text-[#00F0FF] bg-[#00F0FF]/10 border-[#00F0FF]/20',
                  'text-[#FFB800] bg-[#FFB800]/10 border-[#FFB800]/20',
                  'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20',
                  'text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/20',
                ];
                const valueStyles = ['text-[#00F0FF]', 'text-[#FFB800]', 'text-[#10B981]', 'text-[#3B82F6]'];
                const icons = [<Users key="users" size={16} />, <Award key="award" size={16} />, <TrendingUp key="trending" size={16} />, <ShieldCheck key="shield" size={16} />];

                return (
                  <div
                    key={stat.id || stat.label}
                    className="cyber-glass rounded-2xl p-5 flex flex-col justify-between space-y-3 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className={`w-9 h-9 rounded-xl ${cardColors[index % cardColors.length]} border flex items-center justify-center font-bold`}>
                      {icons[index % icons.length]}
                    </div>
                    <div>
                      <div className={`font-mono text-3xl font-black ${valueStyles[index % valueStyles.length]}`}>
                        <StatCounter value={stat.value} suffix={stat.suffix || ''} />
                      </div>
                      <p className="text-xs font-mono font-bold text-neutral-200 mt-1">{stat.label}</p>
                      {stat.description && (
                        <p className="text-[11px] text-neutral-400 mt-0.5 leading-snug">{stat.description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
