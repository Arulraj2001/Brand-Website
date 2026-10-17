'use client';

import React from 'react';
import { useClientLogos } from '@/lib/useSiteData';

export default function LogoMarquee() {
  const { logos } = useClientLogos();

  const realLogos = (logos || []).filter((l) => l && l.name);

  // Requirement: If fewer than ~3 real logos exist, remove the "Trusted by" section entirely
  if (realLogos.length < 3) {
    return null;
  }

  return (
    <div className="w-full py-8 bg-[#05060A] border-y border-white/[0.08] relative overflow-hidden text-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 text-center mb-5">
        <p className="text-[11px] uppercase tracking-widest font-mono font-bold text-neutral-400">
          Trusted by high-growth international brands &amp; venture-backed startups
        </p>
      </div>

      <div className="group flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex shrink-0 animate-marquee gap-6 group-hover:[animation-play-state:paused] items-center">
          {realLogos.concat(realLogos).concat(realLogos).map((logo, idx) => {
            const content = (
              <div
                key={idx}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 shadow-xs shrink-0 hover:border-[#FFB800]/40 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-[#FFB800]" />
                <span className="font-bold text-neutral-200 tracking-tight text-xs font-mono">
                  {logo.name}
                </span>
                {logo.category && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/[0.05] text-[#FFB800] border border-[#FFB800]/30">
                    {logo.category}
                  </span>
                )}
              </div>
            );

            if (logo.link_url) {
              return (
                <a
                  key={idx}
                  href={logo.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline"
                >
                  {content}
                </a>
              );
            }
            return content;
          })}
        </div>
      </div>
    </div>
  );
}
