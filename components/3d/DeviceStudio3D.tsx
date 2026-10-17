'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Smartphone, Laptop, Sparkles, CheckCircle2, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

interface DeviceStudio3DProps {
  className?: string;
  projectTitle?: string;
  projectUrl?: string;
  webScreenshot?: string;
  mobileScreenshot?: string;
  speedScore?: number;
  roasMetric?: string;
}

export default function DeviceStudio3D({
  className = '',
  projectTitle = 'Global SaaS Web & Mobile Platform',
  projectUrl = 'https://ostrune.com',
  webScreenshot = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  mobileScreenshot = 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80',
  speedScore = 100,
  roasMetric = '3.8x ROAS',
}: DeviceStudio3DProps) {
  const [activeDevice, setActiveDevice] = useState<'both' | 'laptop' | 'mobile'>('both');

  // Mouse tilt physics for the 3D studio stage
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-200, 200], [10, -10]);
  const rotateY = useTransform(mouseX, [-200, 200], [-12, 12]);
  const laptopZ = useTransform(mouseX, [-200, 200], [-15, 15]);
  const phoneZ = useTransform(mouseX, [-200, 200], [25, 45]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-4xl mx-auto py-8 px-4 select-none perspective-[1400px] ${className}`}
    >
      {/* 3D Perspective Stage */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        className="relative w-full min-h-[420px] sm:min-h-[480px] flex items-center justify-center"
      >
        {/* Ambient Glow Aura */}
        <div className="absolute w-[80%] h-[70%] bg-gradient-to-tr from-[#FFD21E]/15 via-[#FF9D00]/20 to-[#3B82F6]/15 blur-3xl rounded-full pointer-events-none -z-10" />

        {/* 1. 3D Floating MacBook Laptop */}
        <motion.div
          style={{
            z: laptopZ,
            transformStyle: 'preserve-3d',
          }}
          className={`relative w-[92%] sm:w-[82%] max-w-[620px] transition-all duration-500 ${
            activeDevice === 'mobile' ? 'opacity-30 blur-[1px] scale-95' : 'opacity-100'
          }`}
        >
          {/* Laptop Screen Bezel */}
          <div className="relative bg-[#1A1A1E] p-2.5 sm:p-3 rounded-t-2xl shadow-2xl border border-neutral-700/80">
            {/* Top Bar with Camera & Status */}
            <div className="flex items-center justify-between pb-2 px-1">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              </div>
              <div className="w-2 h-2 rounded-full bg-neutral-600 mx-auto" />
              <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                <span>Next.js 16 • Sub-Second Vitals</span>
              </div>
            </div>

            {/* Laptop Display Content */}
            <div className="relative aspect-[16/10] bg-neutral-950 rounded-lg overflow-hidden border border-neutral-800">
              <Image
                src={webScreenshot}
                alt={projectTitle}
                fill
                sizes="(max-width: 768px) 100vw, 620px"
                className="object-cover object-top"
                priority
              />

              {/* Dynamic Reflection Glare across Screen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />

              {/* Floating Benchmark Hologram Badge inside Screen */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-neutral-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-700 text-xs font-mono text-white shadow-lg">
                <Zap size={14} className="text-[#FFD21E] fill-[#FFD21E]" />
                <span>PageSpeed: <strong className="text-[#10B981] font-bold">{speedScore}/100</strong></span>
              </div>
            </div>
          </div>

          {/* Laptop Bottom Base / Keyboard Lip */}
          <div className="relative h-3 sm:h-4 bg-gradient-to-b from-[#2B2B30] to-[#1F1F24] rounded-b-xl shadow-2xl border-t border-neutral-600">
            <div className="w-20 h-1 bg-neutral-500/60 mx-auto rounded-full mt-0.5" />
          </div>
        </motion.div>

        {/* 2. 3D Floating iPhone in Foreground (Overlapping at Right) */}
        <motion.div
          style={{
            z: phoneZ,
            transformStyle: 'preserve-3d',
          }}
          className={`absolute -right-2 sm:right-6 -bottom-4 sm:bottom-0 w-[140px] sm:w-[175px] transition-all duration-500 z-30 ${
            activeDevice === 'laptop' ? 'opacity-30 blur-[1px] scale-95' : 'opacity-100'
          }`}
        >
          {/* iPhone Frame */}
          <div className="relative bg-[#0F0F12] p-2 rounded-[32px] sm:rounded-[36px] shadow-2xl border-2 border-neutral-700">
            {/* Dynamic Island Pill */}
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-black rounded-full z-40 flex items-center justify-end px-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
            </div>

            {/* Mobile Screen */}
            <div className="relative aspect-[9/19] bg-neutral-900 rounded-[24px] sm:rounded-[28px] overflow-hidden border border-neutral-800">
              <Image
                src={mobileScreenshot}
                alt={`${projectTitle} Mobile`}
                fill
                sizes="180px"
                className="object-cover"
              />

              {/* Glass Reflection */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/40 pointer-events-none" />

              {/* Bottom Home Indicator Bar */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/70 rounded-full" />
            </div>
          </div>

          {/* Metric Pill Attached to Mobile */}
          <div className="absolute -left-6 bottom-8 bg-neutral-900/95 text-white px-2.5 py-1 rounded-full border border-[#FFD21E] shadow-xl text-[10px] font-mono font-bold flex items-center gap-1 backdrop-blur-md">
            <Sparkles size={11} className="text-[#FF9D00]" />
            <span>{roasMetric}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Device Switcher Controls */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <button
          onClick={() => setActiveDevice('both')}
          className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
            activeDevice === 'both'
              ? 'bg-[#FFD21E] text-black shadow-md'
              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
          }`}
        >
          Dual 3D Studio
        </button>
        <button
          onClick={() => setActiveDevice('laptop')}
          className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1 ${
            activeDevice === 'laptop'
              ? 'bg-[#FFD21E] text-black shadow-md'
              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
          }`}
        >
          <Laptop size={12} />
          Web View
        </button>
        <button
          onClick={() => setActiveDevice('mobile')}
          className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1 ${
            activeDevice === 'mobile'
              ? 'bg-[#FFD21E] text-black shadow-md'
              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
          }`}
        >
          <Smartphone size={12} />
          Mobile App View
        </button>
      </div>
    </div>
  );
}
