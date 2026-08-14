'use client';

import React from 'react';
import StatCounter from '@/components/ui/StatCounter';
import GradientText from '@/components/ui/GradientText';
import Card from '@/components/ui/Card';
import { ShieldCheck, Award, TrendingUp, Users, Sparkles, Clock, Globe } from 'lucide-react';
import { useSiteSettings } from '@/lib/useSiteData';

export default function WhyChooseUsSection() {
  const { settings } = useSiteSettings();

  const activeSettings = settings;
  const statEntries = (activeSettings.stat_counters_text || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, value, suffix] = line.split('|');
      return { label: label?.trim() || 'Metric', value: Number(value?.trim() || 0), suffix: suffix?.trim() || '', description: 'Admin-managed metric' };
    });

  const defaultStats = [
    { label: 'Global Projects Delivered', value: 80, suffix: '+', description: 'Web platforms & speed overhauls for clients worldwide' },
    { label: 'Client Retention Rate', value: 96, suffix: '%', description: 'Long-term retainer contracts for SEO & performance growth' },
    { label: 'Avg Lead Increase', value: 340, suffix: '%', description: 'Verified inbound growth measured within 90 days' },
    { label: 'Core Web Vitals', value: 100, suffix: '%', description: 'Sub-second speed scores guaranteed for upgraded sites' },
  ];

  const visibleStats = statEntries.length > 0 ? statEntries : defaultStats;
  return (
    <section className="py-16 bg-white border-t border-[#E5E7EB] relative overflow-hidden bg-dot-pattern">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] text-xs font-bold border border-[#E5E7EB]">
            <Sparkles size={14} className="text-[#1C1C1C]" />
            Proven Global Track Record
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] tracking-tight">
            Why International Brands <GradientText>Partner With Us</GradientText>
          </h2>
          <p className="text-base text-[#6B7280]">
            Same high-quality web software engineering and performance marketing as top traditional agencies, delivered at 60% lower rates.
          </p>
        </div>

        {/* Bento Grid: 1 Featured Story Card + 4 StatCounter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Story Card (6 cols) */}
          <div className="lg:col-span-6 flex">
            <Card isFeatured className="w-full p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-[#FFD21E] text-[#1C1C1C] flex items-center justify-center font-bold border border-[#E5E7EB]">
                  <ShieldCheck size={20} />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#1C1C1C] leading-snug">
                  No Overpriced Overhead. Just <span className="text-[#FF9D00]">Verified Revenue Growth</span> & Sub-Second Code.
                </h3>

                <p className="text-sm text-[#6B7280] leading-relaxed">
                  Most traditional agencies charge $10,000+ for slow WordPress templates. We engineer sub-second web platforms, overhaul sluggish legacy sites to 100/100 Core Web Vitals, and run high-converting UGC video ad campaigns for clients worldwide.
                </p>
              </div>

              <div className="pt-3 border-t border-[#FFD21E]/60 flex flex-wrap items-center gap-4 text-xs font-bold text-[#1C1C1C]">
                <div className="flex items-center gap-1">
                  <Clock size={14} className="text-[#FF9D00]" />
                  <span>12-Hour Reply SLA</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe size={14} className="text-[#3B82F6]" />
                  <span>Global Time-Zone Coverage</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-[#10B981]" />
                  <span>Stripe / PayPal Accepted</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right 4 StatCounter Cards (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visibleStats.slice(0, 4).map((stat, index) => {
              const cardStyles = [
                'bg-[#3B82F6]/10 text-[#3B82F6]',
                'bg-[#FFD21E] text-[#1C1C1C] border border-[#E5E7EB]',
                'bg-[#10B981]/10 text-[#10B981]',
                'bg-[#3B82F6]/10 text-[#3B82F6]',
              ];
              const valueStyles = ['text-[#1C1C1C]', 'text-[#FF9D00]', 'text-[#10B981]', 'text-[#3B82F6]'];
              const icons = [<Users key="users" size={16} />, <Award key="award" size={16} />, <TrendingUp key="trending" size={16} />, <ShieldCheck key="shield" size={16} />];

              return (
                <Card key={stat.label} className="p-4 flex flex-col justify-between space-y-2">
                  <div className={`w-8 h-8 rounded-lg ${cardStyles[index % cardStyles.length]} flex items-center justify-center font-bold`}>
                    {icons[index % icons.length]}
                  </div>
                  <div className={`font-mono-stats text-2xl font-extrabold ${valueStyles[index % valueStyles.length]}`}>
                    <StatCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-xs font-bold text-[#1C1C1C]">{stat.label}</p>
                  <p className="text-[11px] text-[#6B7280]">{stat.description || 'Admin-managed metric'}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
