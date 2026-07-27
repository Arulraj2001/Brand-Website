'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Award, MapPin, Zap, ArrowRight, Code2, Target, User, Globe, Clock } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import Card from '@/components/ui/Card';
import IconBox from '@/components/ui/IconBox';
import Button from '@/components/ui/Button';
import { useTeamMembers } from '@/lib/useSiteData';

export default function AboutPage() {
  const { teamMembers } = useTeamMembers();

  return (
    <div className="pt-28 pb-20 bg-[#F9FAFB] space-y-16 bg-line-pattern">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center px-4 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] text-xs font-bold border border-[#E5E7EB]">
          Global Agency Origins & Philosophy
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C1C1C] tracking-tight">
          Affordable Engineering & Performance Growth <GradientText>For International Brands</GradientText>
        </h1>
        <p className="text-base text-[#6B7280] leading-relaxed">
          ApexPulse delivers high-quality web software, old website speed overhauls, and high-ROAS UGC video ads at a fraction of US & UK agency rates.
        </p>
      </div>

      {/* Story Section */}
      <div className="max-w-[1200px] mx-auto px-4">
        <Card className="p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 Cols: Story Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] bg-[#10B981]/15 text-[#10B981] text-xs font-bold border border-[#10B981]/20">
                The Offshore Advantage
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1C] tracking-tight leading-tight">
                High Quality. 60% Lower Rates. Async Time-Zone Coverage.
              </h2>

              <p className="text-sm text-[#6B7280] leading-relaxed">
                Western agencies often charge $10,000+ for slow WordPress templates and bloated project management layers. ApexPulse brings together senior software architects and performance growth leads to deliver custom engineering at affordable rates.
              </p>

              <p className="text-sm text-[#6B7280] leading-relaxed">
                We operate around your local time zone (US EST/PST, GMT & AEST) with fluent English communication, guaranteed 12-hour reply SLAs, and secure international payments via Stripe and PayPal.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
                  <p className="text-2xl font-bold text-[#FF9D00] font-mono-stats">60% Lower</p>
                  <p className="text-xs font-bold text-[#1C1C1C]">Cost Compared to US/UK Agencies</p>
                  <p className="text-[11px] text-[#6B7280]">Same or superior code quality</p>
                </div>
                <div className="p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
                  <p className="text-2xl font-bold text-[#10B981] font-mono-stats">&lt; 12 Hours</p>
                  <p className="text-xs font-bold text-[#1C1C1C]">Guaranteed Reply SLA</p>
                  <p className="text-[11px] text-[#6B7280]">Seamless async collaboration</p>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Core Pillars */}
            <div className="lg:col-span-5 space-y-3">
              <Card isFeatured className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FFD21E] text-[#1C1C1C] flex items-center justify-center font-bold text-sm">
                    01
                  </div>
                  <h3 className="font-bold text-[#1C1C1C] text-sm">Sub-Second Code Speed</h3>
                </div>
                <p className="text-xs text-[#6B7280]">Zero plugin bloat, 100/100 Core Web Vitals speed scores.</p>
              </Card>

              <Card className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#3B82F6] text-white flex items-center justify-center font-bold text-sm">
                    02
                  </div>
                  <h3 className="font-bold text-[#1C1C1C] text-sm">High-ROAS UGC Ad Hooks</h3>
                </div>
                <p className="text-xs text-[#6B7280]">Authentic user-generated video ad creatives for e-commerce brands.</p>
              </Card>

              <Card className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#10B981] text-white flex items-center justify-center font-bold text-sm">
                    03
                  </div>
                  <h3 className="font-bold text-[#1C1C1C] text-sm">Global Technical SEO</h3>
                </div>
                <p className="text-xs text-[#6B7280]">Structured JSON-LD schema & commercial intent keyword dominance.</p>
              </Card>
            </div>
          </div>
        </Card>
      </div>

      {/* Team Section */}
      <div className="max-w-[1200px] mx-auto px-4 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] bg-[#FFF9E6] text-[#FF9D00] text-xs font-bold border border-[#FFD21E]">
            Senior Leadership
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1C]">
            Meet the Growth <GradientText>Architects</GradientText>
          </h2>
          <p className="text-sm text-[#6B7280]">
            Our engineering & performance leads bring experience building web applications and scaling ad campaigns worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id} className="space-y-4 p-6 bg-white border border-[#E5E7EB] hover:border-[#FF9D00] group transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#F9FAFB] border border-[#E5E7EB] shrink-0">
                  {member.profile_image_url ? (
                    <Image
                      src={member.profile_image_url}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#FF9D00] bg-[#FFF9E6]">
                      <User size={24} />
                    </div>
                  )}
                </div>

                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] border border-[#E5E7EB]">
                  {member.badge || 'ENGINEER'}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#1C1C1C] group-hover:text-[#FF9D00] transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-[#FF9D00] mt-0.5">{member.role}</p>
                <div className="inline-flex items-center gap-1 text-[11px] text-[#6B7280] mt-1">
                  <Globe size={12} className="text-[#3B82F6]" />
                  <span>{member.location}</span>
                </div>
              </div>

              <p className="text-xs text-[#6B7280] leading-relaxed border-t border-[#E5E7EB] pt-3">
                {member.bio}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="max-w-[1200px] mx-auto px-4 text-center">
        <Card isFeatured className="p-8 sm:p-10 space-y-4">
          <h2 className="text-2xl font-bold text-[#1C1C1C]">Ready to Upgrade Your Platform & Growth?</h2>
          <p className="text-sm text-[#6B7280] max-w-lg mx-auto">
            Book a 15-minute strategy call and receive your proposal within 12 hours.
          </p>
          <Button href="/contact" variant="primary" size="md">
            <span>Book a Free Strategy Call</span>
            <ArrowRight size={16} />
          </Button>
        </Card>
      </div>
    </div>
  );
}
