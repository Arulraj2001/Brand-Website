'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Quote,
  Building,
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
  ExternalLink,
  Clock,
  Code2,
  Layers,
  Check,
  Compass,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import GalleryLightbox from '@/components/ui/GalleryLightbox';
import { PortfolioProject } from '@/types';
import { getProjectBySlug } from '@/lib/supabase/data';
import { getSiteUrl } from '@/lib/seo';

interface CaseStudyClientViewProps {
  slug: string;
  serverProject: PortfolioProject | null;
}

export default function CaseStudyClientView({
  slug,
  serverProject,
}: CaseStudyClientViewProps) {
  const siteUrl = getSiteUrl();
  const [project, setProject] = useState<PortfolioProject | null>(serverProject);
  const [loading, setLoading] = useState<boolean>(!serverProject);

  useEffect(() => {
    let active = true;

    async function loadFreshProject() {
      try {
        const fresh = await getProjectBySlug(slug);
        if (active && fresh) {
          setProject(fresh);
        }
      } catch (e) {
        console.warn('Error loading fresh portfolio project', e);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadFreshProject();

    const handleUpdate = async () => {
      try {
        const fresh = await getProjectBySlug(slug);
        if (active && fresh) {
          setProject(fresh);
        }
      } catch {}
    };

    window.addEventListener('ostrune_portfolio_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      active = false;
      window.removeEventListener('ostrune_portfolio_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 bg-[#05060A] text-white min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-3 border-[#FFB800] border-t-transparent rounded-full animate-spin mx-auto shadow-lg shadow-[#FFB800]/20" />
          <p className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Decrypting Case Study Telemetry...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-36 pb-28 bg-[#05060A] text-white min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#FFB800]/10 blur-[150px] pointer-events-none" />
        <div className="max-w-md w-full text-center space-y-6 cyber-glass border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.04] text-[#FFB800] flex items-center justify-center mx-auto border border-[#FFB800]/30 shadow-lg">
            <Compass size={32} />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FFB800]">
              TELEMETRY ERROR 404
            </span>
            <h1 className="text-2xl font-black text-white">
              Case Study Unavailable
            </h1>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              The project record you requested has either been archived or restricted in the current deployment matrix.
            </p>
          </div>

          <div className="pt-2">
            <Button href="/portfolio" variant="primary" size="md" className="w-full">
              <ArrowLeft size={16} />
              <span>Return to Portfolio Grid</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const location = project.client_location || project.client_city || 'Global';
  const techStack = project.tech_stack || [];
  const deliverables = project.deliverables || [];

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
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `${siteUrl}/portfolio/${project.slug}`,
      },
    ],
  };

  return (
    <div className="pt-32 pb-24 bg-[#05060A] text-white min-h-screen relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#FFB800]/10 blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#00F0FF]/5 blur-[200px] pointer-events-none" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12 relative z-10">
        {/* Back Link */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gray-400 hover:text-[#FFB800] transition-colors group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          <span>&larr; Return to Case Study Matrix</span>
        </Link>

        {/* Hero Header */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/30 text-xs font-mono font-bold uppercase tracking-wider">
              {project.service_type === 'web_dev'
                ? 'Web Development'
                : project.service_type === 'app_dev'
                ? 'App Development'
                : project.service_type === 'website_upgrade'
                ? 'Old Website Upgrade'
                : project.service_type === 'ugc_ads'
                ? 'UGC Video Ads'
                : project.service_type === 'local_business'
                ? 'Local Business Marketing'
                : project.service_type === 'meta_ads'
                ? 'Meta Ads'
                : project.service_type === 'seo'
                ? 'SEO Optimization'
                : 'Lead Generation'}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-300 cyber-glass px-3 py-1 rounded-full border border-white/[0.08]">
              <MapPin size={12} className="text-[#00F0FF]" />
              {location}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-300 cyber-glass px-3 py-1 rounded-full border border-white/[0.08]">
              <Building size={12} className="text-[#FFB800]" />
              {project.client_name}
            </span>
            {project.project_duration && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-300 cyber-glass px-3 py-1 rounded-full border border-white/[0.08]">
                <Clock size={12} className="text-[#10B981]" />
                Duration: {project.project_duration}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed max-w-3xl">
            {project.short_description}
          </p>

          {/* Tech Stack Badges */}
          {techStack.length > 0 && (
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-gray-400 mr-1 flex items-center gap-1.5">
                <Code2 size={13} className="text-[#FFB800]" /> Architecture Stack:
              </span>
              {techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {project.live_url && (
            <div className="pt-2">
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFB800] hover:bg-[#FFD21E] text-black text-xs font-mono font-bold shadow-lg shadow-[#FFB800]/20 transition-all hover:scale-105"
              >
                <span>Launch Live System</span>
                <ExternalLink size={14} />
              </a>
            </div>
          )}

          {/* Verified Impact Banner */}
          <div className="p-6 rounded-2xl cyber-glass-glow border border-[#FFB800]/35 shadow-2xl space-y-1 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFB800] to-transparent opacity-80" />
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FFB800]">
              <Sparkles size={15} />
              <span>Verified Revenue &amp; Speed Metrics</span>
            </div>
            <p className="text-xl sm:text-2xl font-black font-mono text-white tracking-tight">
              {project.results}
            </p>
          </div>
        </div>

        {/* BEFORE VS AFTER PERFORMANCE COMPARISON BAR */}
        {(project.before_metric || project.after_metric) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-red-500/[0.03] border border-red-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-red-400">
                <AlertTriangle size={15} />
                <span>Baseline Bottleneck</span>
              </div>
              <p className="text-sm font-semibold text-gray-200 font-mono">
                {project.before_metric || 'Sluggish page speed, low rankings, high visitor bounce rate.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                <TrendingUp size={15} />
                <span>Post-Deployment Benchmark</span>
              </div>
              <p className="text-sm font-semibold text-emerald-300 font-mono">
                {project.after_metric || project.results}
              </p>
            </div>
          </div>
        )}

        {/* Hero Cover Image */}
        <div className="relative h-72 sm:h-[460px] w-full rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl bg-[#090A12]">
          <Image
            src={project.cover_image_url}
            alt={`${project.title} - ${project.client_name} ${location}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="object-cover"
          />
        </div>

        {/* Problem -> Solution -> Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="cyber-glass border border-red-500/20 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center font-bold border border-red-500/20">
              <AlertTriangle size={18} />
            </div>
            <h3 className="text-base font-bold text-white">1. The Obstacle</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              {project.challenge_description || project.full_description}
            </p>
          </div>

          <div className="cyber-glass border border-cyan-500/20 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold border border-cyan-500/20">
              <ShieldCheck size={18} />
            </div>
            <h3 className="text-base font-bold text-white">2. Architecture Fix</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              {project.solution_description ||
                'Engineered sub-second web software components, optimized Core Web Vitals, and deployed high-converting buyer funnels with instant strategy scheduling.'}
            </p>
          </div>

          <div className="cyber-glass border border-[#FFB800]/30 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFB800]/10 text-[#FFB800] flex items-center justify-center font-bold border border-[#FFB800]/20">
              <TrendingUp size={18} />
            </div>
            <h3 className="text-base font-bold text-white">3. Verified Impact</h3>
            <p className="text-xs font-mono font-bold text-[#FFB800] leading-relaxed">
              {project.results}
            </p>
          </div>
        </div>

        {/* KEY DELIVERABLES CHECKLIST */}
        {deliverables.length > 0 && (
          <div className="cyber-glass border border-white/[0.08] p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/30 flex items-center justify-center font-bold">
                <Layers size={18} />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">Technical Deliverables Executed</h3>
                <p className="text-xs font-mono text-gray-400">Complete architectural milestones for {project.client_name}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} />
                  </div>
                  <span className="text-xs text-gray-300 font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Component */}
        <GalleryLightbox images={project.gallery_urls || []} projectTitle={project.title} />

        {/* Client Testimonial Block */}
        {project.testimonial && (
          <div className="cyber-glass-glow border border-[#FFB800]/30 p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-2xl space-y-4">
            <Quote size={48} className="text-[#FFB800] absolute top-6 right-6 opacity-20" />
            <p className="text-base sm:text-xl text-gray-200 font-light leading-relaxed italic relative z-10">
              &ldquo;{project.testimonial}&rdquo;
            </p>
            <div className="border-t border-white/[0.08] pt-4 flex items-center justify-between relative z-10">
              <div>
                <p className="font-black text-white text-sm">{project.client_name}</p>
                <p className="text-xs font-mono text-[#00F0FF]">{location}</p>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="relative overflow-hidden p-10 sm:p-14 cyber-glass-glow rounded-3xl border border-[#FFB800]/30 text-center space-y-6 shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#FFB800]/10 blur-[120px] pointer-events-none" />

          <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight relative z-10">
            Scale Similar Velocity for Your Brand
          </h3>
          <p className="text-sm sm:text-base text-gray-400 max-w-lg mx-auto relative z-10 font-light">
            Book a 15-minute technical sprint briefing and get our architectural roadmap within 12 hours.
          </p>
          <div className="pt-2 flex justify-center relative z-10">
            <Button href="/contact" variant="primary" size="lg">
              <span>Initiate Free Technical Brief</span>
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
