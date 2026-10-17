'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Rocket, TrendingUp } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'Discovery & Architecture',
    description: 'Deep technical analysis of your product goals, target audience, stack requirements, and sub-second performance benchmarks.',
    icon: Search,
    color: '#00F0FF',
  },
  {
    number: '02',
    title: 'Sprint Blueprint',
    description: 'Custom engineering blueprint detailing component structure, database schemas (Supabase/Postgres), and API endpoints.',
    icon: Compass,
    color: '#FFB800',
  },
  {
    number: '03',
    title: 'Agile 14-Day Build',
    description: 'Rapid sprint execution — clean Next.js/React Native builds, 100/100 Core Web Vitals compliance, and continuous staging deployments.',
    icon: Rocket,
    color: '#10B981',
  },
  {
    number: '04',
    title: 'Scale & Conversion',
    description: 'Production launch, technical SEO schema indexing, A/B conversion rate testing, and automated lead generation pipeline deployment.',
    icon: TrendingUp,
    color: '#3B82F6',
  },
];

export default function ProcessTimeline() {
  return (
    <div className="relative py-8">
      {/* Connected Gradient Line (Desktop) */}
      <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00F0FF]/40 via-[#FFB800]/50 to-[#10B981]/40 -translate-y-6 z-0" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="cyber-glass rounded-3xl p-7 border border-white/10 hover:border-[#FFB800]/40 transition-all group relative text-white shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center border"
                  style={{
                    backgroundColor: `${step.color}15`,
                    borderColor: `${step.color}35`,
                    color: step.color,
                  }}
                >
                  <Icon size={20} />
                </div>
                <span className="text-3xl font-mono font-black text-white/20 group-hover:text-[#FFB800]/40 transition-colors">
                  {step.number}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white mb-2 group-hover:text-[#FFB800] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
