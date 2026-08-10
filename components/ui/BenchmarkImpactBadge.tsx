'use client';

import React from 'react';
import { TrendingUp, Zap, CheckCircle2 } from 'lucide-react';

export default function BenchmarkImpactBadge({ results }: { results: string }) {
  // Split the results string by bullet points into items if applicable
  const items = results.split('•').map((item) => item.trim());

  return (
    <div className="relative overflow-hidden rounded-xl border border-[#10B981]/30 bg-[#1C1C1C] p-3.5 shadow-md group hover:border-[#10B981] transition-all duration-300">
      {/* Subtle Glow Background Flare */}
      <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-[#10B981]/15 rounded-full blur-2xl pointer-events-none group-hover:bg-[#10B981]/25 transition-all" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Label with Live Pulse Beacon */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="relative flex h-3 w-3 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#FFD21E]">
            <TrendingUp size={14} className="text-[#10B981]" />
            <span>Proven Benchmark Impact</span>
          </div>
        </div>

        {/* Right: Dynamic Running Metric Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {items.map((metric, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#2A2A2A] border border-white/10 text-white text-xs font-mono-stats font-bold shadow-xs hover:border-[#10B981]/50 transition-colors"
            >
              <Zap size={12} className="text-[#FF9D00] shrink-0" />
              <span className="text-[#10B981]">{metric}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Running Animated Bottom Highlight Strip */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#10B981] to-transparent opacity-80 animate-pulse" />
    </div>
  );
}
