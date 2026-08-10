'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MapPin, Sparkles, Star, ExternalLink } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import Card from '@/components/ui/Card';
import { PortfolioProject } from '@/types';
import { getPortfolioProjects } from '@/lib/supabase/data';

export default function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getPortfolioProjects();
      setProjects(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.service_type === filter);

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://ostrune.netlify.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Portfolio',
        item: 'https://ostrune.netlify.app/portfolio',
      },
    ],
  };

  return (
    <div className="pt-28 pb-20 bg-[#F9FAFB] min-h-screen bg-line-pattern">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="max-w-[1200px] mx-auto px-4 space-y-10">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] text-xs font-bold border border-[#E5E7EB]">
            <Sparkles size={14} className="text-[#1C1C1C]" />
            Global Client Case Studies
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C1C1C] tracking-tight">
            Case Studies & <GradientText>Verified Client Results</GradientText>
          </h1>
          <p className="text-base text-[#6B7280] leading-relaxed">
            Discover how Ostrune engineered sub-second web platforms, speed overhauls, and high-ROAS ad campaigns for clients across US, UK, Canada & Australia.
          </p>
        </div>

        {/* Filter Pills Bar */}
        <div className="flex flex-wrap justify-center items-center gap-2">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'web_dev', label: 'Web Dev' },
            { id: 'app_dev', label: 'App Dev' },
            { id: 'website_upgrade', label: 'Speed & SEO' },
            { id: 'ugc_ads', label: 'UGC Ads' },
            { id: 'seo', label: 'SEO' },
            { id: 'local_business', label: 'Local Business' },
            { id: 'meta_ads', label: 'Meta Ads' },
            { id: 'sales_growth', label: 'Lead Gen' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[44px] ${
                filter === item.id
                  ? 'bg-[#FF9D00] text-white shadow-xs'
                  : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:text-[#1C1C1C]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Clean, Aligned 3-Column Portfolio Card Grid */}
        {loading ? (
          <div className="py-16 text-center text-[#6B7280] font-medium text-sm">Loading live projects...</div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            <AnimatePresence>
              {filteredProjects.map((project) => {
                const isFeatured = project.is_featured;
                const location = project.client_location || project.client_city || 'Global';

                return (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="flex col-span-1"
                  >
                    <Card
                      isFeatured={isFeatured}
                      className="flex flex-col justify-between w-full p-0 overflow-hidden group"
                    >
                      {/* Image Container with Hover Zoom (h-48) */}
                      <div className="relative h-48 w-full overflow-hidden bg-[#F9FAFB]">
                        <Image
                          src={project.cover_image_url}
                          alt={`${project.title} - ${project.client_name}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/60 via-transparent to-transparent opacity-80" />

                        {/* Top Badges */}
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
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
                          {isFeatured && (
                            <span className="bg-[#FFD21E] text-[#1C1C1C] px-2 py-0.5 rounded-[4px] text-[10px] font-extrabold flex items-center gap-1 border border-[#E5E7EB]">
                              <Star size={10} fill="#1C1C1C" />
                              FEATURED
                            </span>
                          )}
                        </div>

                        <div className="absolute top-2.5 right-2.5 bg-[#1C1C1C]/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-[4px] flex items-center gap-1 backdrop-blur-xs">
                          <MapPin size={10} className="text-[#3B82F6]" />
                          {location}
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                            {project.client_name}
                          </p>
                          <h3 className="font-bold text-[#1C1C1C] group-hover:text-[#FF9D00] transition-colors text-base line-clamp-1">
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
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
