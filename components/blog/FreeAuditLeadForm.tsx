'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Globe, Sparkles, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { submitLead } from '@/lib/supabase/data';
import { BlogCategory } from '@/types';
import { getBlogCtaConfig } from '@/lib/blogCtaConfig';

const auditFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  website_url: z
    .string()
    .min(3, 'Please enter your website URL')
    .refine((val) => {
      // Basic check for URL or domain format (e.g. example.com or https://example.com)
      return /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/.*)?$/i.test(val.trim());
    }, 'Please enter a valid website URL (e.g., mysite.com)'),
  message: z.string().optional(),
});

type AuditFormData = z.infer<typeof auditFormSchema>;

interface FreeAuditLeadFormProps {
  category: BlogCategory;
  postSlug: string;
  postTitle?: string;
  compact?: boolean;
}

export default function FreeAuditLeadForm({
  category,
  postSlug,
  postTitle,
  compact = false,
}: FreeAuditLeadFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const ctaConfig = getBlogCtaConfig(category);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuditFormData>({
    resolver: zodResolver(auditFormSchema),
  });

  const onSubmit = async (data: AuditFormData) => {
    setSubmitting(true);
    setSubmitError(null);

    const cleanWebsiteUrl = data.website_url.trim().startsWith('http')
      ? data.website_url.trim()
      : `https://${data.website_url.trim()}`;

    // Structure Lead payload so category & blog slug are clearly saved in Supabase
    const leadPayload = {
      name: data.name.trim(),
      email: data.email.trim(),
      phone: 'Not Provided (Blog Audit Request)',
      country: 'Global',
      service_interested: `${ctaConfig.serviceTitle} (Blog: ${postSlug})`,
      budget_range: 'Free Audit Request',
      message: `[Blog Source: /blog/${postSlug} | Category: ${category} | Title: "${postTitle || postSlug}"]\nWebsite URL: ${cleanWebsiteUrl}\nNote: ${data.message || 'Free audit requested via blog post CTA.'}`,
    };

    try {
      const result = await submitLead(leadPayload);
      setSubmitting(false);

      if (result.success) {
        setSubmitted(true);
        reset();
      } else {
        setSubmitError(result.message || 'Could not submit audit request. Please try again.');
      }
    } catch {
      setSubmitting(false);
      setSubmitError('An unexpected error occurred. Please try again.');
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 bg-emerald-500/[0.05] border border-emerald-500/25 rounded-2xl text-center space-y-3"
      >
        <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/25">
          <CheckCircle2 size={24} />
        </div>
        <h4 className="text-lg font-black text-white">Audit Request Received!</h4>
        <p className="text-xs text-gray-300 font-light max-w-sm mx-auto leading-relaxed">
          Our engineering team will analyze your website architecture and send your free{' '}
          <strong className="text-[#FFB800]">{ctaConfig.auditBadge.toLowerCase()}</strong> brief
          within 12 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs font-mono font-bold text-[#FFB800] hover:underline pt-1"
        >
          Submit another website
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {submitError && (
        <div className="p-3 rounded-xl bg-red-500/[0.05] border border-red-500/20 text-xs text-red-400 flex items-center gap-2 font-mono">
          <AlertCircle size={14} className="shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <div className={`grid grid-cols-1 ${compact ? 'gap-3' : 'sm:grid-cols-2 gap-3.5'}`}>
        {/* Name */}
        <div>
          <label className="block text-xs font-mono font-bold text-gray-300 mb-1.5">
            Full Name <span className="text-[#FFB800]">*</span>
          </label>
          <input
            {...register('name')}
            type="text"
            placeholder="e.g. Sarah Miller"
            className="w-full px-4 py-2.5 rounded-xl border border-white/[0.1] text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB800] bg-white/[0.04] transition-colors"
          />
          {errors.name && (
            <p className="text-[11px] text-red-400 font-mono mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-mono font-bold text-gray-300 mb-1.5">
            Work Email <span className="text-[#FFB800]">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="e.g. sarah@company.com"
            className="w-full px-4 py-2.5 rounded-xl border border-white/[0.1] text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB800] bg-white/[0.04] transition-colors"
          />
          {errors.email && (
            <p className="text-[11px] text-red-400 font-mono mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Website URL */}
      <div>
        <label className="block text-xs font-mono font-bold text-gray-300 mb-1.5">
          Website URL <span className="text-[#FFB800]">*</span>
        </label>
        <div className="relative">
          <div className="absolute left-3.5 top-3 text-gray-400">
            <Globe size={14} />
          </div>
          <input
            {...register('website_url')}
            type="text"
            placeholder="e.g. mycompany.com or https://example.com"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/[0.1] text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB800] bg-white/[0.04] transition-colors"
          />
        </div>
        {errors.website_url && (
          <p className="text-[11px] text-red-400 font-mono mt-1">
            {errors.website_url.message}
          </p>
        )}
      </div>

      {/* Optional Message */}
      <div>
        <label className="block text-xs font-mono font-bold text-gray-300 mb-1.5">
          Current Goal / Main Bottleneck <span className="text-gray-500 font-normal">(Optional)</span>
        </label>
        <textarea
          {...register('message')}
          rows={compact ? 2 : 3}
          placeholder="e.g. Slow load time, dropping organic rank, low ROAS..."
          className="w-full px-4 py-2.5 rounded-xl border border-white/[0.1] text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB800] bg-white/[0.04] transition-colors resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={submitting}
        variant="primary"
        size="md"
        className="w-full justify-center"
      >
        {submitting ? (
          <span>Analyzing Site &amp; Sending...</span>
        ) : (
          <>
            <Sparkles size={15} />
            <span>Request {ctaConfig.auditTitle.replace('Get a ', '')}</span>
            <Send size={14} />
          </>
        )}
      </Button>
      <p className="text-[11px] font-mono text-gray-500 text-center">
        100% Free &bull; No credit card required &bull; Response within 12 hours
      </p>
    </form>
  );
}
