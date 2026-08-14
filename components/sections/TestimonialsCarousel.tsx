'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, MapPin, Sparkles } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import Card from '@/components/ui/Card';
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
    <section className="py-16 bg-white border-t border-[#E5E7EB] relative overflow-hidden bg-dot-pattern">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] text-xs font-bold border border-[#E5E7EB]">
            <Sparkles size={14} className="text-[#1C1C1C]" />
            Verified Global Reviews
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] tracking-tight">
            Loved by Ambitious <GradientText>Founders Worldwide</GradientText>
          </h2>
          <p className="text-base text-[#6B7280]">
            Hear how our web engineering & ROI pipelines accelerated growth for ambitious companies worldwide.
          </p>
        </div>

        {/* Carousel Card (Warm Surface #FFF9E6) */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current?.id || currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card isFeatured className="p-6 sm:p-8 space-y-6 relative overflow-hidden">
                <Quote size={40} className="text-[#FFD21E] absolute top-4 right-4 opacity-50" />

                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#FFD21E]">
                  {[...Array(current?.rating || 5)].map((_, i) => (
                    <Star key={i} size={16} fill="#FFD21E" stroke="#FFD21E" />
                  ))}
                  <span className="text-xs font-bold text-[#1C1C1C] ml-2 font-mono-stats">5.0 / 5.0 Rating</span>
                </div>

                {/* Quote Text */}
                <p className="text-base sm:text-lg text-[#1C1C1C] font-medium leading-relaxed italic">
                  &ldquo;{current?.quote}&rdquo;
                </p>

                {/* Author Info */}
                <div className="pt-4 border-t border-[#FFD21E]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-[#1C1C1C] text-base">{current?.client_name}</h3>
                    <p className="text-xs text-[#3B82F6] font-semibold">{current?.client_company}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#6B7280] bg-white px-2.5 py-1 rounded-[4px] border border-[#E5E7EB]">
                    <MapPin size={12} className="text-[#FF9D00]" />
                    {location}
                  </span>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 pt-6">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-lg bg-white border border-[#E5E7EB] hover:border-[#FF9D00] text-[#1C1C1C] hover:text-[#FF9D00] flex items-center justify-center transition-colors shadow-xs"
              aria-label="Previous review"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Pagination Indicators */}
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === idx ? 'w-6 bg-[#FF9D00]' : 'w-2 bg-[#E5E7EB]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-lg bg-white border border-[#E5E7EB] hover:border-[#FF9D00] text-[#1C1C1C] hover:text-[#FF9D00] flex items-center justify-center transition-colors shadow-xs"
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
