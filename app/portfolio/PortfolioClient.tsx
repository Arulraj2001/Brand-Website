'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MapPin, Sparkles, Star, ExternalLink } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import Card from '@/components/ui/Card';
import DeviceStudio3D from '@/components/3d/DeviceStudio3D';
import { PortfolioProject } from '@/types';
import { getPortfolioProjects } from '@/lib/supabase/data';
import { getSiteUrl } from '@/lib/seo';

interface PortfolioClientProps {
  initialProjects?: PortfolioProject[];
}

export default function PortfolioClient({ initialProjects = [] }: PortfolioClientProps) {
  const siteUrl = getSiteUrl();
  const [projects, setProjects] = useState<PortfolioProject[]>(initialProjects);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(initialProjects.length === 0);

  useEffect(() => {
    let active = true;

    async function loadData() {
      const data = await getPortfolioProjects();
      if (active) {
        setProjects(data);
        setLoading(false);
      }
    }
    loadData();

    const handleUpdate = async () => {
      const data = await getPortfolioProjects();
      if (active) setProjects(data);
    };

    window.addEventListener('ostrune_portfolio_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      active = false;
      window.removeEventListener('ostrune_portfolio_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
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
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Portfolio',
        item: `${siteUrl}/portfolio`,
      },
    ],
  };

  return (
    <div className="pt-32 pb-24 bg-[#05060A] text-white min-h-screen relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FFB800]/10 blur-[180px] pointer-events-none" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-12 relative z-10">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.04] text-[#FFB800] text-xs font-mono font-bold border border-white/[0.1] shadow-xs">
            <Sparkles size={14} className="text-[#FFB800]" />
            <span>Verified Engineering Track Record</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-[-0.035em]">
            Case Studies &amp; <GradientText>Verified Deployments</GradientText>
          </h1>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            Discover how Ostrune engineered sub-second web platforms, mobile MVPs, and high-ROAS marketing funnels for ambitious brands worldwide.
          </p>
        </div>

        {/* Flagship Interactive 3D Device Showcase */}
        <div className="cyber-glass rounded-3xl p-6 sm:p-10 border border-white/10 shadow-[0_16px_50px_rgba(0,0,0,0.6)]">
          <div className="text-center max-w-xl mx-auto mb-4 space-y-1.5">
            <span className="text-xs font-mono font-bold text-[#FFB800] uppercase tracking-wider">
              Cross-Platform Production Builds
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Cross-Platform <GradientText>Engineering Studio</GradientText>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto">
              Production web applications and mobile architectures engineered for sub-second Core Web Vitals and scale.
            </p>
          </div>
          <DeviceStudio3D />
        </div>

        {/* Filter Pills Bar */}
        <div className="space-y-4">
          <h2 className="sr-only">Filter Case Studies by Capability</h2>
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
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all min-h-[40px] cursor-pointer ${
                  filter === item.id
                    ? 'bg-gradient-to-r from-[#FFB800] to-[#FF9500] text-black font-extrabold shadow-md'
                    : 'bg-white/[0.04] text-neutral-300 border border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clean, Aligned 3-Column Portfolio Card Grid */}
        {loading ? (
          <div className="py-16 text-center text-[#6B7280] font-medium text-sm">Loading live projects...</div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Verified Deployments
              </h2>
              <span className="text-xs font-mono font-bold text-neutral-400">
                {filteredProjects.length} {filteredProjects.length === 1 ? 'Case Study' : 'Case Studies'}
              </span>
            </div>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
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
                    <div
                      className="cyber-glass rounded-2xl flex flex-col justify-between w-full p-0 overflow-hidden group border border-white/10 hover:border-[#FFB800]/40 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                    >
                      {/* Image Container with Top-Aligned Preview (h-52) */}
                      <div className="relative h-52 w-full overflow-hidden bg-neutral-900">
                        <Image
                          src={project.cover_image_url}
                          alt={`${project.title} - ${project.client_name}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                        {/* Top Badges Pills */}
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

                      {/* Content Body with Balanced Compact Spacing */}
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

                        {/* Action Buttons Bar */}
                        <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2">
                          <Link
                            href={`/portfolio/${project.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-mono font-bold text-black bg-gradient-to-r from-[#FFB800] to-[#FF9500] hover:scale-105 transition-all px-3 py-1.5 rounded-lg shadow-xs"
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
            </AnimatePresence>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}