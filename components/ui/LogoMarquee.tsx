'use client';

import React from 'react';

const CLIENT_LOGOS = [
  { name: 'ZetaPay', category: 'Fintech' },
  { name: 'NutraPure', category: 'D2C Health' },
  { name: 'WorkSpace India', category: 'Commercial Real Estate' },
  { name: 'Skyline Homes', category: 'Luxury Housing' },
  { name: 'BharatLogistics', category: 'Supply Chain' },
  { name: 'KisanConnect', category: 'AgriTech' },
  { name: 'CloudScale Asia', category: 'SaaS Platform' },
  { name: 'OmniMed India', category: 'HealthTech' },
];

export default function LogoMarquee() {
  return (
    <div className="w-full py-10 bg-[#F7F8FB] border-y border-[#E7E8F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center mb-6">
        <p className="text-xs uppercase tracking-widest font-semibold text-[#9497AC]">
          Trusted by high-growth Indian brands & venture-backed startups
        </p>
      </div>

      <div className="group flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex shrink-0 animate-marquee gap-12 group-hover:[animation-play-state:paused] items-center">
          {CLIENT_LOGOS.concat(CLIENT_LOGOS).map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-6 py-2 rounded-xl bg-white border border-[#E7E8F0] shadow-sm shrink-0"
            >
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]" />
              <span className="font-bold text-[#0F1222] tracking-tight text-lg">
                {logo.name}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#F1F0FE] text-[#4F46E5] font-medium">
                {logo.category}
              </span>
            </div>
          ))}
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
