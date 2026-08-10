'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Rocket, TrendingUp } from 'lucide-react';
import IconBox from './IconBox';

const STEPS = [
  {
    number: '01',
    title: 'Discovery & Audit',
    description: 'In-depth analysis of your target audience, local and international market landscape, competitor positioning, and conversion funnels.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Growth Blueprint',
    description: 'Custom architectural plan detailing technical stack, keyword targeting, ad audience segmentation, and ROI milestones.',
    icon: Compass,
  },
  {
    number: '03',
    title: 'Agile Execution',
    description: 'Rapid sprint execution — high-performance code build, conversion copy, high-converting ad creative launch, and tracking setup.',
    icon: Rocket,
  },
  {
    number: '04',
    title: 'Scale & Optimization',
    description: 'Continuous A/B testing, speed optimization, and lead quality refining to maximize return on ad spend and organic dominance.',
    icon: TrendingUp,
  },
];

export default function ProcessTimeline() {
  return (
    <div className="relative py-12">
      {/* Connected Gradient Line (Desktop) */}
      <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#0EA5E9] -translate-y-8 z-0 opacity-30 rounded-full" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {STEPS.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
            className="bg-white border border-[#E7E8F0] rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(79,70,229,0.06)] hover:border-[#7C3AED]/30 transition-all group relative"
          >
            <div className="flex items-center justify-between mb-4">
              <IconBox icon={step.icon} variant={idx % 2 === 0 ? 'primary' : 'secondary'} />
              <span className="text-3xl font-extrabold text-[#9497AC]/30 group-hover:text-[#4F46E5]/40 transition-colors">
                {step.number}
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#0F1222] mb-2 group-hover:text-[#4F46E5] transition-colors">
              {step.title}
            </h3>

            <p className="text-sm text-[#4B4F63] leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
