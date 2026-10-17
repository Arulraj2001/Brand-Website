'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, MapPin, Sparkles } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import { Testimonial } from '@/types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex] || testimonials[0];
  const location = current?.client_location || current?.client_city || 'Global';

  if (!testimonials.length) {
    return null;
  }

  return (
    <section className="py-20 bg-[#07080E] border-t border-white/[0.08] relative overflow-hidden text-white">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FFB800]/5 blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] text-[#FFB800] text-xs font-mono font-bold border border-white/[0.1]">
            <Sparkles size={14} className="text-[#FFB800]" />
            <span>Verified Founder Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Endorsed by Ambitious <GradientText>Founders Worldwide</GradientText>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Hear how our web engineering sprints and acquisition engines accelerated growth for ambitious companies worldwide.
          </p>
        </div>

        {/* Carousel Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current?.id || currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="cyber-glass rounded-3xl p-8 sm:p-10 space-y-6 relative overflow-hidden border border-white/10 shadow-[0_16px_50px_rgba(0,0,0,0.6)]">
                <Quote size={48} className="text-[#FFB800] absolute top-6 right-6 opacity-20" />

                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#FFB800]">
                  {[...Array(current?.rating || 5)].map((_, i) => (
                    <Star key={i} size={16} fill="#FFB800" stroke="#FFB800" />
                  ))}
                  <span className="text-xs font-mono font-bold text-neutral-300 ml-2">5.0 / 5.0 Rating</span>
                </div>

                {/* Quote Text */}
                <p className="text-lg sm:text-xl text-neutral-200 font-medium leading-relaxed italic">
                  &ldquo;{current?.quote}&rdquo;
                </p>

                {/* Author Info */}
                <div className="pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-white text-base">{current?.client_name}</h3>
                    <p className="text-xs text-[#00F0FF] font-mono mt-0.5">{current?.client_company}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-300 bg-white/[0.04] px-3 py-1.5 rounded-full border border-white/10">
                    <MapPin size={12} className="text-[#FFB800]" />
                    <span>{location}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 pt-8">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors shadow-xs"
              aria-label="Previous review"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Pagination Indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === idx ? 'w-8 bg-[#FFB800]' : 'w-2 bg-white/20'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors shadow-xs"
              aria-label="Next review"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
