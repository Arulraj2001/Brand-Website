'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Sparkles, ExternalLink } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { PortfolioProject } from '@/types';

interface PortfolioPreviewProps {
  projects: PortfolioProject[];
}

export default function PortfolioPreviewSection({ projects }: PortfolioPreviewProps) {
  const displayProjects = projects.slice(0, 3);

  return (
    <section className="py-14 bg-[#F9FAFB] border-t border-[#E5E7EB] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] text-xs font-bold border border-[#E5E7EB]">
              <Sparkles size={13} className="text-[#1C1C1C]" />
              Global Case Studies
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] tracking-tight">
              Real Impact for <GradientText>International Brands</GradientText>
            </h2>
            <p className="text-sm text-[#6B7280]">
              Explore how we engineer custom web experiences, speed overhauls, and UGC ad funnels across the US, UK, Canada & Australia.
            </p>
          </div>
          <Button href="/portfolio" variant="secondary" size="sm" className="shrink-0">
            <span>Explore All Case Studies</span>
            <ArrowUpRight size={14} />
          </Button>
        </div>

        {/* Clean, Aligned 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {displayProjects.map((project, idx) => {
            const isFeatured = project.is_featured;
            const location = project.client_location || project.client_city || 'Austin, USA';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="flex"
              >
                <Card isFeatured={isFeatured} className="flex flex-col justify-between w-full p-0 overflow-hidden group">
                  {/* Compact Cover Image Container (h-44) */}
                  <div className="relative h-44 w-full overflow-hidden bg-[#F9FAFB]">
                    <Image
                      src={project.cover_image_url}
                      alt={`${project.title} - ${project.client_name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/60 via-transparent to-transparent opacity-80" />

                    {/* Service Badge (Blue #3B82F6) */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="bg-[#3B82F6] text-white px-2 py-0.5 rounded-[4px] text-[11px] font-bold uppercase">
                        {project.service_type === 'web_dev'
                          ? 'Web Dev'
                          : project.service_type === 'app_dev'
                          ? 'App Dev'
                          : project.service_type === 'website_upgrade'
                          ? 'Speed & SEO'
                          : project.service_type === 'ugc_ads'
                          ? 'UGC Ads'
                          : project.service_type === 'local_business'
                          ? 'Local SEO'
                          : project.service_type === 'meta_ads'
                          ? 'Meta Ads'
                          : project.service_type === 'seo'
                          ? 'SEO'
                          : 'Lead Gen'}
                      </span>
                    </div>

                    <div className="absolute top-2.5 right-2.5 bg-[#1C1C1C]/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-[4px] flex items-center gap-1 backdrop-blur-xs">
                      <MapPin size={10} className="text-[#3B82F6]" />
                      {location}
                    </div>
                  </div>

                  {/* Body Content with Tight Padding */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                        {project.client_name}
                      </p>
                      <h3 className="font-bold text-[#1C1C1C] group-hover:text-[#FF9D00] transition-colors text-sm sm:text-base line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed">
                        {project.short_description}
                      </p>
                    </div>

                    {/* Key Result Stat */}
                    <div className="p-2 rounded-md bg-[#FFF9E6] border border-[#FFD21E]/70 text-xs font-bold text-[#FF9D00] flex items-center gap-1.5">
                      <Sparkles size={13} className="shrink-0 text-[#FF9D00]" />
                      <span className="truncate font-mono-stats text-[11px]">{project.results}</span>
                    </div>

                    {/* Action Links Bar: Read Case Study & Visit Live Work */}
                    <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between gap-2">
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#1C1C1C] hover:text-[#FF9D00] transition-colors min-h-[44px]"
                      >
                        <span>Read Case Study</span>
                        <ArrowUpRight size={13} />
                      </Link>

                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#3B82F6] hover:underline min-h-[44px]"
                        >
                          <span>Visit Live Work</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
