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
    <div className="w-full py-8 bg-white border-y border-[#E5E7EB] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 text-center mb-5">
        <p className="text-xs uppercase tracking-widest font-bold text-[#6B7280]">
          Trusted by high-growth international brands & regional industry leaders
        </p>
      </div>

      <div className="group flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex shrink-0 animate-marquee gap-8 group-hover:[animation-play-state:paused] items-center">
          {realLogos.concat(realLogos).concat(realLogos).map((logo, idx) => {
            const content = (
              <div
                key={idx}
                className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] shadow-xs shrink-0 hover:border-[#FF9D00] transition-colors"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF9D00]" />
                <span className="font-extrabold text-[#1C1C1C] tracking-tight text-sm">
                  {logo.name}
                </span>
                {logo.category && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-[4px] bg-[#FFF9E6] text-[#FF9D00] border border-[#FFD21E]">
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

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
