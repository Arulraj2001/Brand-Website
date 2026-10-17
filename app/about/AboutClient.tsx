'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, User, Globe, Zap, Clock, ShieldCheck, Sparkles, Code2, Cpu, Rocket } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import { useTeamMembers } from '@/lib/useSiteData';

const Globe3DCanvas = dynamic(() => import('@/components/3d/Globe3DCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#FFB800] animate-spin" />
    </div>
  ),
});

export default function AboutClient() {
  const { teamMembers } = useTeamMembers();

  return (
    <div className="pt-32 pb-24 bg-[#05060A] text-white space-y-24 min-h-screen relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FFB800]/10 blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#00F0FF]/5 blur-[160px] pointer-events-none" />

      {/* 1. Monumental Hero Manifesto */}
      <div className="max-w-4xl mx-auto text-center px-4 space-y-5 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] text-[#FFB800] text-xs font-mono font-bold border border-white/[0.1] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
          <span>Agency Ethos &amp; Technical Philosophy</span>
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-[-0.035em] leading-[1.08]">
          Built By Engineers.{' '}
          <br className="hidden sm:inline" />
          <span className="font-serif italic font-normal text-[#FFB800]">Focused On Pure Velocity.</span>
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Ostrune was founded on a simple premise: traditional agency models are broken. We deliver bespoke software engineering, sub-second speed overhauls, and high-ROAS marketing funnels with zero bloated overhead.
        </p>
      </div>

      {/* 2. Flagship 3D Global Delivery Network */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="cyber-glass rounded-3xl p-6 sm:p-10 border border-white/10 shadow-[0_16px_50px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Collaboration & Principles */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] text-[#00F0FF] text-xs font-mono font-bold border border-white/[0.1]">
                <Globe size={13} />
                <span>Global Client Collaboration</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
                Building Websites for <GradientText>Clients Worldwide</GradientText>
              </h2>

              <p className="text-sm text-neutral-300 leading-relaxed">
                We collaborate with business owners, growing startups, and brands across the globe. From bespoke custom code to Shopify, WordPress, and Wix, our workflow is built for direct communication, fast delivery, and measurable growth.
              </p>

              <div className="space-y-3 pt-2 font-mono">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-2">
                      <span className="text-base">🌐</span>
                      <span>Flexible Time Zone Overlap</span>
                    </span>
                    <span className="text-[#10B981] font-bold bg-[#10B981]/15 px-2 py-0.5 rounded text-[11px] border border-[#10B981]/30">
                      Worldwide
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-sans leading-normal pl-6">
                    We schedule calls, sprint reviews, and async updates to align comfortably with your working day.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-2">
                      <span className="text-base">💬</span>
                      <span>Direct Developer Communication</span>
                    </span>
                    <span className="text-[#00F0FF] font-bold bg-[#00F0FF]/15 px-2 py-0.5 rounded text-[11px] border border-[#00F0FF]/30">
                      Direct Access
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-sans leading-normal pl-6">
                    No middlemen or junior account managers playing telephone. You speak directly with the engineers building your site.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-2">
                      <span className="text-base">🎯</span>
                      <span>Weekly Live Staging Demos</span>
                    </span>
                    <span className="text-[#FFB800] font-bold bg-[#FFB800]/15 px-2 py-0.5 rounded text-[11px] border border-[#FFB800]/30">
                      Zero Surprises
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-sans leading-normal pl-6">
                    Inspect your live development site every week, test features on mobile, and provide immediate feedback.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive 3D WebGL Earth */}
            <div className="lg:col-span-7 relative min-h-[440px] sm:min-h-[500px] flex items-center justify-center bg-gradient-to-b from-[#0A0E1F]/90 via-[#060914]/95 to-[#03050C] rounded-2xl border border-white/[0.14] overflow-hidden shadow-[inset_0_0_80px_rgba(0,240,255,0.08),0_10px_40px_rgba(0,0,0,0.6)]">
              {/* Soft ambient backlight bloom behind globe */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.12),rgba(255,184,0,0.06)_40%,transparent_70%)] pointer-events-none" />
              <Globe3DCanvas />
            </div>
          </div>
        </div>
      </div>

      {/* 3. The 3 Technical Pillars */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-mono font-bold text-[#FFB800] uppercase tracking-wider">
            Execution Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Our Core Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="cyber-glass rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-[#FFB800]/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/30 flex items-center justify-center font-bold">
              <Code2 size={24} />
            </div>
            <h3 className="text-xl font-black text-white">01 / Any Modern Tech or CMS</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              From bespoke Next.js and React web applications to easily managed stores on Shopify, WordPress, and Wix, we choose the right technology for your specific goals and budget.
            </p>
          </div>

          <div className="cyber-glass rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-[#00F0FF]/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 flex items-center justify-center font-bold">
              <Rocket size={24} />
            </div>
            <h3 className="text-xl font-black text-white">02 / Fast Turnaround &amp; Agile Sprints</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Why wait 3 to 6 months for a website launch? Our modular architecture allows us to build, QA, and deploy full production-ready platforms in two-week agile sprints.
            </p>
          </div>

          <div className="cyber-glass rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-[#10B981]/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 flex items-center justify-center font-bold">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-black text-white">03 / 100% Code Ownership &amp; Transparency</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              You receive full administrative access and 100% ownership of your codebase, domains, and design files upon launch. No proprietary lock-ins or surprise fees.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Leadership & Architects */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-10 relative z-10">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] text-[#FFB800] text-xs font-mono font-bold border border-white/[0.1]">
            <Sparkles size={13} />
            <span>Senior Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Meet the Growth <GradientText>Architects</GradientText>
          </h2>
          <p className="text-sm text-neutral-400">
            Engineers and growth strategists building scalable software and high-converting campaigns.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="cyber-glass rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-[#FFB800]/40 transition-all w-full sm:w-[360px] space-y-4 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shrink-0">
                  {member.profile_image_url ? (
                    <Image
                      src={member.profile_image_url}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#FFB800] bg-white/[0.05]">
                      <User size={28} />
                    </div>
                  )}
                </div>

                <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/30">
                  {member.badge || 'LEAD ARCHITECT'}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#FFB800] transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-mono font-semibold text-[#00F0FF] mt-0.5">{member.role}</p>
                <div className="inline-flex items-center gap-1.5 text-xs text-neutral-400 mt-2 font-mono">
                  <Globe size={13} className="text-[#3B82F6]" />
                  <span>{member.location}</span>
                </div>
              </div>

              {member.bio && (
                <p className="text-xs text-neutral-400 leading-relaxed border-t border-white/[0.08] pt-3">
                  {member.bio}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 5. Final Dispatch CTA */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10 text-center">
        <div className="cyber-glass-glow rounded-3xl p-10 sm:p-14 space-y-6 max-w-3xl mx-auto border border-[#FFB800]/30">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Ready to Build or Upgrade Your Website?
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 max-w-lg mx-auto">
            Book a quick 15-minute consultation with our engineering team to discuss your project requirements, technology options, and receive a free transparent quote.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-black bg-gradient-to-r from-[#FFB800] to-[#FF9500] text-black shadow-[0_0_30px_rgba(255,184,0,0.4)] hover:shadow-[0_0_45px_rgba(255,184,0,0.6)] hover:scale-105 active:scale-95 transition-all"
            >
              <span>Get a Free Consultation &amp; Quote</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}