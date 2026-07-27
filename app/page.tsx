import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import LogoMarquee from '@/components/ui/LogoMarquee';
import ServicesBentoSection from '@/components/sections/ServicesBentoSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import PortfolioPreviewSection from '@/components/sections/PortfolioPreviewSection';
import ProcessTimeline from '@/components/ui/ProcessTimeline';
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel';
import CitiesServedSection from '@/components/sections/CitiesServedSection';
import FinalCtaSection from '@/components/sections/FinalCtaSection';
import { getPortfolioProjects, getTestimonials } from '@/lib/supabase/data';

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
      <section className="py-24 bg-white border-t border-[#E7E8F0] relative overflow-hidden bg-dot-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1F0FE] text-[#4F46E5] text-xs font-bold uppercase tracking-wider">
              Methodology
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F1222] tracking-tight">
              Our Connected <span className="gradient-text">Execution Process</span>
            </h2>
            <p className="text-base sm:text-lg text-[#4B4F63]">
              A disciplined four-stage pipeline designed for rapid deployment and continuous performance scaling.
            </p>
          </div>

          <ProcessTimeline />
        </div>
      </section>

      {/* 7. TESTIMONIALS CAROUSEL */}
      <TestimonialsCarousel testimonials={testimonials} />

      {/* 8. CITIES WE SERVE */}
      <CitiesServedSection />

      {/* 9. FINAL CTA BAND */}
      <FinalCtaSection />
    </div>
  );
}
