'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Sparkles, ExternalLink, Star } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import { PortfolioProject } from '@/types';

interface PortfolioPreviewProps {
  projects: PortfolioProject[];
}

export default function PortfolioPreviewSection({ projects }: PortfolioPreviewProps) {
  const displayProjects = projects.slice(0, 3);

  return (
    <section className="py-20 bg-[#07080E] border-t border-white/[0.08] relative overflow-hidden text-white">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[300px] bg-[#00F0FF]/5 blur-[160px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] text-[#FFB800] text-xs font-mono font-bold border border-white/[0.1]">
              <Sparkles size={13} className="text-[#FFB800]" />
              <span>Verified Engineering Track Record</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Real Impact for <GradientText>Global Brands</GradientText>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400">
              Explore how we engineer custom web experiences, mobile MVPs, and high-ROAS acquisition funnels for growing brands worldwide.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold text-neutral-200 bg-white/[0.04] border border-white/10 hover:border-[#FFB800]/40 hover:text-white transition-all shrink-0"
          >
            <span>Explore All Deployments</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Clean, Aligned 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {displayProjects.map((project, idx) => {
            const isFeatured = project.is_featured;
            const location = project.client_location || project.client_city || 'Global';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="flex"
              >
                <div className="cyber-glass rounded-2xl flex flex-col justify-between w-full p-0 overflow-hidden group border border-white/10 hover:border-[#FFB800]/40 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                  {/* Cover Image Container */}
                  <div className="relative h-52 w-full overflow-hidden bg-neutral-900">
                    <Image
                      src={project.cover_image_url}
                      alt={`${project.title} - ${project.client_name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/30 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase shadow-2xs">
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
                        <span className="bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/30 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 shadow-2xs">
                          <Star size={10} fill="#FFB800" />
                          FEATURED
                        </span>
                      )}
                    </div>

                    <div className="absolute top-2.5 right-2.5 bg-black/70 text-neutral-300 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-md border border-white/10">
                      <MapPin size={10} className="text-[#00F0FF]" />
                      {location}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                        {project.client_name}
                      </p>
                      <h3 className="font-bold text-white group-hover:text-[#FFB800] transition-colors text-base line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {project.short_description}
                      </p>
                    </div>

                    {/* Tech Result Pill */}
                    <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono font-bold text-[#FFB800] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 truncate">
                        <Sparkles size={13} className="shrink-0 text-[#FFB800]" />
                        <span className="truncate text-[11px]">{project.results}</span>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2">
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-mono font-bold text-black bg-gradient-to-r from-[#FFB800] to-[#FF9500] hover:scale-105 transition-all px-3.5 py-1.5 rounded-lg shadow-xs"
                      >
                        <span>Case Study</span>
                        <ArrowUpRight size={13} />
                      </Link>

                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono text-neutral-300 hover:text-white bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all px-3 py-1.5 rounded-lg"
                        >
                          <span>Live Site</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
