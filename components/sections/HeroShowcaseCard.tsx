'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import {
  Laptop,
  ShoppingBag,
  Smartphone,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
} from 'lucide-react';

interface ShowcaseTab {
  id: 'webapp' | 'ecommerce' | 'mobile';
  label: string;
  icon: typeof Laptop;
  badge: string;
  tech: string;
  url: string;
  image: string;
  speed: string;
  highlight: string;
}

const SHOWCASE_TABS: ShowcaseTab[] = [
  {
    id: 'webapp',
    label: 'Custom Web App',
    icon: Laptop,
    badge: 'Next.js / Node / Python',
    tech: 'Full-Stack Custom Code',
    url: 'nexus.agency-platform.io',
    image: '/images/hero-showcase.jpg',
    speed: '100/100 Speed',
    highlight: 'Sub-Second Global Edge Load Time',
  },
  {
    id: 'ecommerce',
    label: 'Shopify / E-Commerce',
    icon: ShoppingBag,
    badge: 'Shopify / WooCommerce',
    tech: 'High-Converting Online Store',
    url: 'aura-luxury.store',
    image: '/images/ecommerce-showcase.jpg',
    speed: '3.8x Conversion',
    highlight: 'Seamless Checkout & Mobile First',
  },
  {
    id: 'mobile',
    label: 'Mobile App',
    icon: Smartphone,
    badge: 'iOS & Android (React Native)',
    tech: 'Cross-Platform App',
    url: 'ios.appstore.com/client',
    image: '/images/mobile-showcase.jpg',
    speed: '60 FPS Native',
    highlight: 'Real-Time Sync & In-App Payments',
  },
];

export default function HeroShowcaseCard() {
  const [activeTab, setActiveTab] = useState<'webapp' | 'ecommerce' | 'mobile'>('webapp');

  const current = SHOWCASE_TABS.find((t) => t.id === activeTab) || SHOWCASE_TABS[0];

  // Mouse tilt physics for the 3D perspective display
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-180, 180], [4, -4]);
  const rotateY = useTransform(mouseX, [-180, 180], [-4, 4]);

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
    <motion.div
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative cyber-glass rounded-3xl p-4 sm:p-6 border border-white/[0.14] shadow-[0_24px_70px_rgba(0,0,0,0.85)] overflow-hidden text-white"
    >
      {/* Top Interactive Switcher Tabs */}
      <div className="flex items-center justify-between gap-2 border-b border-white/[0.08] pb-3 mb-3.5">
        <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] rounded-xl border border-white/[0.08]">
          {SHOWCASE_TABS.map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FFB800] to-[#FF9500] text-black font-black shadow-xs'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <IconComp size={13} className={isActive ? 'text-black' : 'text-neutral-400'} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.id === 'webapp' ? 'Web' : tab.id === 'ecommerce' ? 'Shopify' : 'App'}</span>
              </button>
            );
          })}
        </div>

        {/* Live Performance Badge */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-mono font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>{current.speed}</span>
        </div>
      </div>

      {/* Browser / Device Chrome Header */}
      <div className="bg-[#090C16] px-3.5 py-2 rounded-t-xl border-t border-x border-white/[0.1] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80" />
        </div>

        <div className="flex items-center gap-1.5 bg-black/40 px-3 py-0.5 rounded-md border border-white/[0.06] text-[11px] font-mono text-neutral-400 max-w-[200px] truncate">
          <span className="text-emerald-400">🔒</span>
          <span>https://{current.url}</span>
        </div>

        <span className="text-[10px] font-mono text-[#FFB800] bg-[#FFB800]/10 px-2 py-0.5 rounded border border-[#FFB800]/25">
          {current.badge}
        </span>
      </div>

      {/* High-Resolution Website UI Viewport */}
      <div className="relative aspect-[16/10] w-full rounded-b-xl overflow-hidden border-b border-x border-white/[0.1] bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={current.image}
              alt={current.tech}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 550px"
              className="object-cover object-top"
            />
            {/* Subtle glass reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Bottom floating highlights */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
              <div className="bg-[#0A0D1A]/90 backdrop-blur-md px-3 py-1 rounded-lg border border-white/[0.12] text-xs font-medium text-white flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                <span className="truncate">{current.highlight}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Live Action Bar */}
      <div className="mt-3.5 pt-3 border-t border-white/[0.08] flex items-center justify-between">
        <div className="text-xs text-neutral-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="font-medium">Ready for custom launch</span>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFB800] to-[#FF9500] hover:scale-105 text-black text-xs font-black transition-all shadow-md"
        >
          <span>Get Similar Website</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </motion.div>
  );
}
