import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import LogoMarquee from '@/components/ui/LogoMarquee';
import ServicesBentoSection from '@/components/sections/ServicesBentoSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import PortfolioPreviewSection from '@/components/sections/PortfolioPreviewSection';
import ProcessTimeline from '@/components/ui/ProcessTimeline';
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel';
import FinalCtaSection from '@/components/sections/FinalCtaSection';
import { getPortfolioProjects, getTestimonials } from '@/lib/supabase/data';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Ostrune — Web Development, SEO & Performance Growth Agency',
  },
  description:
    'We build fast websites and run SEO & Meta Ads that get real clients for growing businesses worldwide. Free site audit — reply guaranteed in 12 hours.',
  alternates: {
    canonical: 'https://ostrune.netlify.app',
  },
};

export const revalidate = 60; // Refresh data every minute

export default async function HomePage() {
  const projects = await getPortfolioProjects();
  const testimonials = await getTestimonials();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. TRUSTED-BY MARQUEE */}
      <LogoMarquee />

      {/* 3. SERVICES BENTO GRID */}
      <ServicesBentoSection />

      {/* 4. WHY CHOOSE US BENTO GRID */}
      <WhyChooseUsSection />

      {/* 5. PORTFOLIO PREVIEW STAGGERED GRID */}
      <PortfolioPreviewSection projects={projects} />

      {/* 6. PROCESS TIMELINE */}
      <section className="py-16 bg-white border-t border-[#E5E7EB] relative overflow-hidden bg-dot-pattern">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] text-xs font-bold border border-[#E5E7EB]">
              Agile Methodology
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] tracking-tight">
              Our Async <span className="text-[#FF9D00]">Execution Process</span>
            </h2>
            <p className="text-sm text-[#6B7280]">
              A disciplined four-stage pipeline built for seamless time-zone overlap, rapid delivery, and transparent progress updates.
            </p>
          </div>

          <ProcessTimeline />
        </div>
      </section>

      {/* 7. TESTIMONIALS CAROUSEL */}
      <TestimonialsCarousel testimonials={testimonials} />

      {/* 8. FINAL CTA BAND */}
      <FinalCtaSection />
    </div>
  );
}
