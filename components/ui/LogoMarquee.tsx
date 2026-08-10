'use client';

import React from 'react';
import { useSiteSettings } from '@/lib/useSiteData';
import { INITIAL_SITE_SETTINGS } from '@/lib/supabase/data';

export default function LogoMarquee() {
  const { settings } = useSiteSettings();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const activeSettings = mounted ? settings : INITIAL_SITE_SETTINGS;
  const DEFAULT_LOGOS = [
    { name: 'NovaPay', category: 'FinTech SaaS' },
    { name: 'Aether AI', category: 'Generative AI' },
    { name: 'Lumina Labs', category: 'E-Commerce' },
    { name: 'Apex Capital', category: 'Venture Capital' },
    { name: 'Veloce Speed', category: 'Speed Overhaul' },
    { name: 'Hyperion', category: 'Cloud Systems' },
  ];

  const parsedLogos = activeSettings.trust_logos_text
    ? activeSettings.trust_logos_text
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [name, category] = line.split('|');
          return { name: name?.trim() || 'Client', category: category?.trim() || 'Partner' };
        })
    : [];

  const displayLogos = parsedLogos.length > 0 ? parsedLogos : DEFAULT_LOGOS;

  return (
    <div className="w-full py-8 bg-white border-y border-[#E5E7EB] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 text-center mb-5">
        <p className="text-xs uppercase tracking-widest font-bold text-[#6B7280]">
          Trusted by high-growth international brands & venture-backed startups
        </p>
      </div>

      <div className="group flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex shrink-0 animate-marquee gap-8 group-hover:[animation-play-state:paused] items-center">
          {displayLogos.concat(displayLogos).concat(displayLogos).map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] shadow-xs shrink-0 hover:border-[#FF9D00] transition-colors"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF9D00]" />
              <span className="font-extrabold text-[#1C1C1C] tracking-tight text-sm">
                {logo.name}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-[4px] bg-[#FFF9E6] text-[#FF9D00] border border-[#FFD21E]">
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
