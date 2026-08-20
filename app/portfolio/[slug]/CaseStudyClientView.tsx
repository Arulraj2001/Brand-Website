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

interface CaseStudyClientViewProps {
  slug: string;
  serverProject: PortfolioProject | null;
}

export default function CaseStudyClientView({
  slug,
  serverProject,
}: CaseStudyClientViewProps) {
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
      <div className="pt-32 pb-20 bg-[#F9FAFB] min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#3B82F6] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-[#6B7280]">Loading Case Study...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-36 pb-28 bg-[#F7F8FB] min-h-screen flex items-center justify-center px-4 bg-line-pattern">
        <div className="max-w-md w-full text-center space-y-6 bg-white border border-[#E7E8F0] p-8 sm:p-10 rounded-3xl shadow-md">
          <div className="w-16 h-16 rounded-2xl bg-[#EFF6FF] text-[#3B82F6] flex items-center justify-center mx-auto border border-[#3B82F6]/30">
            <Compass size={32} />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#3B82F6]">
              CASE STUDY NOT FOUND
            </span>
            <h1 className="text-2xl font-extrabold text-[#1C1C1C]">
              Case Study Unavailable
            </h1>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              The portfolio project or case study route you were looking for does not exist or may have been relocated.
            </p>
          </div>

          <div className="pt-2">
            <Button href="/portfolio" variant="primary" size="md" className="w-full">
              <ArrowLeft size={16} />
              <span>Back to All Case Studies</span>
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
        item: 'https://ostrune.netlify.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Portfolio',
        item: 'https://ostrune.netlify.app/portfolio',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `https://ostrune.netlify.app/portfolio/${project.slug}`,
      },
    ],
  };

  return (
    <div className="pt-28 pb-20 bg-[#F9FAFB] min-h-screen bg-line-pattern">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        {/* Back Link */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#6B7280] hover:text-[#1C1C1C] transition-colors min-h-[44px]"
        >
          <ArrowLeft size={16} />
          <span>Back to All Case Studies</span>
        </Link>

        {/* Hero Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-[4px] bg-[#3B82F6] text-white text-xs font-bold uppercase">
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
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1C1C1C] bg-white px-2.5 py-0.5 rounded-[4px] border border-[#E5E7EB]">
              <MapPin size={11} className="text-[#3B82F6]" />
              {location}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1C1C1C] bg-white px-2.5 py-0.5 rounded-[4px] border border-[#E5E7EB]">
              <Building size={11} className="text-[#FF9D00]" />
              {project.client_name}
            </span>
            {project.project_duration && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1C1C1C] bg-white px-2.5 py-0.5 rounded-[4px] border border-[#E5E7EB]">
                <Clock size={11} className="text-[#10B981]" />
                Duration: {project.project_duration}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C1C1C] tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-base text-[#6B7280] leading-relaxed max-w-3xl">
            {project.short_description}
          </p>

          {/* Tech Stack Badges */}
          {techStack.length > 0 && (
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#6B7280] mr-1 flex items-center gap-1">
                <Code2 size={13} className="text-[#FF9D00]" /> Tech Architecture:
              </span>
              {techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white border border-[#E5E7EB] text-xs font-semibold text-[#1C1C1C] shadow-2xs"
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold shadow-xs transition-colors min-h-[44px]"
              >
                <span>Visit Live Website / Work</span>
                <ExternalLink size={14} />
              </a>
            </div>
          )}

          {/* Verified Impact Banner */}
          <div className="p-5 rounded-xl bg-[#FFF9E6] border border-[#FFD21E] text-[#1C1C1C] shadow-xs space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF9D00]">
              <Sparkles size={15} />
              <span>Verified Business Impact</span>
            </div>
            <p className="text-lg sm:text-xl font-extrabold font-mono-stats text-[#1C1C1C]">
              {project.results}
            </p>
          </div>
        </div>

        {/* BEFORE VS AFTER PERFORMANCE COMPARISON BAR */}
        {(project.before_metric || project.after_metric) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-[#FEF2F2] border border-[#EF4444]/30 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#EF4444]">
                <AlertTriangle size={15} />
                <span>Before Optimization</span>
              </div>
              <p className="text-sm font-bold text-[#1C1C1C] font-mono-stats">
                {project.before_metric || 'Sluggish page speed, low rankings, high visitor bounce rate.'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#ECFDF5] border border-[#10B981]/30 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#10B981]">
                <TrendingUp size={15} />
                <span>After Ostrune Overhaul</span>
              </div>
              <p className="text-sm font-bold text-[#1C1C1C] font-mono-stats">
                {project.after_metric || project.results}
              </p>
            </div>
          </div>
        )}

        {/* Hero Cover Image */}
        <div className="relative h-72 sm:h-[420px] w-full rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xs bg-white">
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
          <Card className="bg-white border-2 border-[#EF4444]/20 p-5 rounded-xl space-y-3">
            <div className="w-8 h-8 rounded-lg bg-[#EF4444]/10 text-[#EF4444] flex items-center justify-center font-bold">
              <AlertTriangle size={16} />
            </div>
            <h3 className="text-base font-bold text-[#1C1C1C]">1. The Challenge</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              {project.challenge_description || project.full_description}
            </p>
          </Card>

          <Card className="bg-white border-2 border-[#3B82F6]/20 p-5 rounded-xl space-y-3">
            <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center font-bold">
              <ShieldCheck size={16} />
            </div>
            <h3 className="text-base font-bold text-[#1C1C1C]">2. Engineering Fix</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              {project.solution_description ||
                'Engineered sub-second web software components, optimized Core Web Vitals, and deployed high-converting buyer funnels with instant strategy scheduling.'}
            </p>
          </Card>

          <Card className="bg-[#FFF9E6] border-2 border-[#FFD21E] p-5 rounded-xl space-y-3">
            <div className="w-8 h-8 rounded-lg bg-[#10B981]/15 text-[#10B981] flex items-center justify-center font-bold">
              <TrendingUp size={16} />
            </div>
            <h3 className="text-base font-bold text-[#1C1C1C]">3. The Impact</h3>
            <p className="text-xs font-bold text-[#FF9D00] leading-relaxed font-mono-stats">
              {project.results}
            </p>
          </Card>
        </div>

        {/* KEY DELIVERABLES CHECKLIST */}
        {deliverables.length > 0 && (
          <Card className="p-6 bg-white border border-[#E5E7EB] rounded-2xl space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFD21E] text-[#1C1C1C] flex items-center justify-center font-bold">
                <Layers size={16} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1C1C1C]">Key Deliverables Built</h3>
                <p className="text-xs text-[#6B7280]">Itemized features and scope executed for {project.client_name}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB]">
                  <div className="w-5 h-5 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} />
                  </div>
                  <span className="text-xs font-semibold text-[#1C1C1C]">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Gallery Component */}
        <GalleryLightbox images={project.gallery_urls || []} projectTitle={project.title} />

        {/* Client Testimonial Block */}
        {project.testimonial && (
          <Card className="bg-white border border-[#E5E7EB] p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-xs space-y-4">
            <Quote size={36} className="text-[#FFD21E] absolute top-4 right-4 opacity-40" />
            <p className="text-base sm:text-lg text-[#1C1C1C] font-medium leading-relaxed italic">
              &ldquo;{project.testimonial}&rdquo;
            </p>
            <div className="border-t border-[#E5E7EB] pt-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-[#1C1C1C] text-sm">{project.client_name}</p>
                <p className="text-xs text-[#3B82F6] font-semibold">{location}</p>
              </div>
            </div>
          </Card>
        )}

        {/* CTA */}
        <Card className="p-8 bg-white border-2 border-[#FFD21E] text-center space-y-4">
          <h3 className="text-2xl font-bold text-[#1C1C1C]">
            Want Similar Results for Your Business?
          </h3>
          <p className="text-xs text-[#6B7280] max-w-lg mx-auto">
            Book a free 15-minute strategy call and receive your custom technical proposal within 12 hours.
          </p>
          <Button href="/contact" variant="primary" size="md">
            <span>Book a Free Strategy Call</span>
            <ArrowRight size={16} />
          </Button>
        </Card>
      </div>
    </div>
  );
}
