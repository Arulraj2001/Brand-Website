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
        className="p-6 bg-[#ECFDF5] border border-[#10B981]/40 rounded-xl text-center space-y-3"
      >
        <div className="w-12 h-12 rounded-full bg-[#10B981]/20 text-[#10B981] mx-auto flex items-center justify-center">
          <CheckCircle2 size={28} />
        </div>
        <h4 className="text-lg font-bold text-[#1C1C1C]">Audit Request Received!</h4>
        <p className="text-xs text-[#374151] max-w-sm mx-auto leading-relaxed">
          Thank you! Our engineering team will analyze your website and email your free{' '}
          <strong className="text-[#1C1C1C]">{ctaConfig.auditBadge.toLowerCase()}</strong> report
          within 12 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs font-bold text-[#10B981] hover:underline pt-1"
        >
          Submit another website
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
      {submitError && (
        <div className="p-3 rounded-lg bg-[#FEF2F2] border border-[#EF4444]/30 text-xs text-[#DC2626] flex items-center gap-2">
          <AlertCircle size={14} className="shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <div className={`grid grid-cols-1 ${compact ? 'gap-3' : 'sm:grid-cols-2 gap-3.5'}`}>
        {/* Name */}
        <div>
          <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
            Full Name <span className="text-[#EF4444]">*</span>
          </label>
          <input
            {...register('name')}
            type="text"
            placeholder="e.g. Sarah Miller"
            className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-xs text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00] bg-white transition-colors"
          />
          {errors.name && (
            <p className="text-[11px] text-[#EF4444] font-semibold mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
            Work Email <span className="text-[#EF4444]">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="e.g. sarah@company.com"
            className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-xs text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00] bg-white transition-colors"
          />
          {errors.email && (
            <p className="text-[11px] text-[#EF4444] font-semibold mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Website URL */}
      <div>
        <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
          Website URL <span className="text-[#EF4444]">*</span>
        </label>
        <div className="relative">
          <div className="absolute left-3 top-2.5 text-[#9CA3AF]">
            <Globe size={14} />
          </div>
          <input
            {...register('website_url')}
            type="text"
            placeholder="e.g. mycompany.com or https://example.com"
            className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-[#E5E7EB] text-xs text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00] bg-white transition-colors"
          />
        </div>
        {errors.website_url && (
          <p className="text-[11px] text-[#EF4444] font-semibold mt-1">
            {errors.website_url.message}
          </p>
        )}
      </div>

      {/* Optional Message */}
      <div>
        <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
          Current Goal / Main Pain Point <span className="text-[#9CA3AF] font-normal">(Optional)</span>
        </label>
        <textarea
          {...register('message')}
          rows={compact ? 2 : 3}
          placeholder="e.g. Slow load time, dropping search rank, low ROAS..."
          className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] text-xs text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00] bg-white transition-colors resize-none"
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
          <span>Analyzing Site & Sending...</span>
        ) : (
          <>
            <Sparkles size={15} />
            <span>Request {ctaConfig.auditTitle.replace('Get a ', '')}</span>
            <Send size={14} />
          </>
        )}
      </Button>
      <p className="text-[11px] text-[#9CA3AF] text-center">
        100% Free • No credit card required • Response within 12 hours
      </p>
    </form>
  );
}
