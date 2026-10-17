'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, CheckCircle2, Send, Sparkles, Award, ShieldCheck, Info, DollarSign, Calendar, MessageSquare, ArrowRight } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import CurrencySelector from '@/components/ui/CurrencySelector';
import { useCurrency, CURRENCIES } from '@/components/ui/CurrencyContext';
import { submitLead } from '@/lib/supabase/data';
import { useSiteSettings } from '@/lib/useSiteData';
import { getBudgetOptionsForCurrency } from '@/lib/budgetOptions';

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(6, 'Please enter a valid contact phone number'),
  country: z.string().min(2, 'Please enter your country/location'),
  service_interested: z.string().min(1, 'Please select a service'),
  budget_range: z.string().min(1, 'Please select your budget range'),
  custom_budget: z.string().optional(),
  message: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

export default function ContactClient() {
  const { settings } = useSiteSettings();
  const { isConverted, currency, rates } = useCurrency();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [budgetSelection, setBudgetSelection] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<string>('');

  const activeSettings = settings;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      budget_range: '',
      service_interested: 'Website Development',
    },
  });

  const handleBudgetDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setBudgetSelection(val);
    if (val !== 'custom') {
      setValue('budget_range', val);
    } else {
      const symbol = currency === 'INR' ? '₹' : '$';
      setValue('budget_range', customAmount ? `${symbol}${customAmount}` : '');
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    const cleanVal = val.replace(/^[$\u20B9]\s*/, '');
    const symbol = currency === 'INR' ? '₹' : '$';
    setValue('budget_range', cleanVal ? `${symbol}${cleanVal}` : '');
  };

  const onSubmit = async (data: LeadFormData) => {
    setSubmitting(true);
    let finalBudget = data.budget_range;
    if (budgetSelection === 'custom' && customAmount) {
      const cleanVal = customAmount.replace(/^[$\u20B9]\s*/, '');
      const symbol = currency === 'INR' ? '₹' : '$';
      finalBudget = `${symbol}${cleanVal} (Custom)`;
    }

    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      country: data.country,
      service_interested: data.service_interested,
      budget_range: finalBudget,
      message: data.message || '',
    };

    const result = await submitLead(payload);
    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      reset();
      setBudgetSelection('');
      setCustomAmount('');
    }
  };

  return (
    <div className="pt-32 pb-24 bg-[#05060A] text-white min-h-screen relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FFB800]/10 blur-[180px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-12 relative z-10">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.04] text-[#FFB800] text-xs font-mono font-bold border border-white/[0.1] shadow-xs">
            <Sparkles size={14} className="text-[#FFB800]" />
            <span>Direct Project Consultation</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-[-0.035em]">
            Let&apos;s Build or Scale Your <GradientText>Website</GradientText>
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
            Tell us about your project below. Whether you need a custom web application from scratch or an optimized store on Shopify, WordPress, or Wix, our team will review your goals and provide an honest, transparent quote.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono font-bold text-neutral-300 pt-2">
            <span className="flex items-center gap-1.5 bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10">
              <Clock size={13} className="text-[#FFB800]" /> Quick, Friendly Response
            </span>
            <span className="flex items-center gap-1.5 bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10">
              <ShieldCheck size={13} className="text-[#00F0FF]" /> Flexible Payment Terms
            </span>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Lead Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="cyber-glass rounded-3xl p-6 sm:p-10 border border-white/10 shadow-[0_16px_50px_rgba(0,0,0,0.6)] text-white">
              {submitted ? (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#10B981]/20 text-[#10B981] mx-auto flex items-center justify-center border border-[#10B981]/30">
                    <CheckCircle2 size={36} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    Project Inquiry Received!
                  </h2>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out! Our team is reviewing your requirements and will get back to you with clear pricing, platform options, and next steps.
                  </p>
                  <div className="mt-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-left space-y-2 max-w-md mx-auto">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FFB800] uppercase">
                      <Sparkles size={14} />
                      <span>Prefer an instant discussion?</span>
                    </div>
                    <p className="text-xs text-neutral-300">
                      Reach us directly on WhatsApp at <strong className="text-white font-mono">{activeSettings.phone}</strong> for instant scoping.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono font-bold text-[#FFB800] hover:underline pt-2 inline-block"
                  >
                    Submit another project inquiry
                  </button>
                </motion.div>
              ) : (
                /* Form Fields */
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Currency Selector Banner */}
                  <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/[0.08] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-mono font-bold text-white">Currency Preference</p>
                      <p className="text-[11px] text-neutral-400">View pricing in your local currency</p>
                    </div>
                    <CurrencySelector />
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        {...register('name')}
                        type="text"
                        placeholder="e.g. David Miller"
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-sm text-white focus:outline-none focus:border-[#FFB800] bg-white/[0.04] placeholder-neutral-500 transition-colors font-mono"
                      />
                      {errors.name && (
                        <p className="text-xs text-[#EF4444] font-mono mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                        Work Email *
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="e.g. david@company.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-sm text-white focus:outline-none focus:border-[#FFB800] bg-white/[0.04] placeholder-neutral-500 transition-colors font-mono"
                      />
                      {errors.email && (
                        <p className="text-xs text-[#EF4444] font-mono mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                        Phone / WhatsApp *
                      </label>
                      <input
                        {...register('phone')}
                        type="tel"
                        placeholder="WhatsApp (with country code)"
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-sm text-white focus:outline-none focus:border-[#FFB800] bg-white/[0.04] placeholder-neutral-500 transition-colors font-mono"
                      />
                      {errors.phone && (
                        <p className="text-xs text-[#EF4444] font-mono mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                        Country / Location *
                      </label>
                      <input
                        {...register('country')}
                        type="text"
                        placeholder="e.g. London, UK"
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-sm text-white focus:outline-none focus:border-[#FFB800] bg-white/[0.04] placeholder-neutral-500 transition-colors font-mono"
                      />
                      {errors.country && (
                        <p className="text-xs text-[#EF4444] font-mono mt-1">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Service & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                        Service Interested *
                      </label>
                      <select
                        {...register('service_interested')}
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-sm text-white focus:outline-none focus:border-[#FFB800] bg-neutral-900 transition-colors font-mono"
                      >
                        <option value="Custom Website Development">Custom Website (Next.js / React / Node / Python)</option>
                        <option value="Shopify E-Commerce">Shopify / E-Commerce Store</option>
                        <option value="WordPress or Wix Site">CMS Website (WordPress / Wix / Webflow)</option>
                        <option value="Mobile App Development">Mobile App Development (iOS &amp; Android)</option>
                        <option value="Old Website Upgrade">Old Website Speed Upgrade (95+ Vitals)</option>
                        <option value="Technical SEO & Ads">Technical SEO, Google &amp; Meta Ads</option>
                        <option value="UGC Ads">UGC Video Ads for Brands</option>
                      </select>
                      {errors.service_interested && (
                        <p className="text-xs text-[#EF4444] font-mono mt-1">
                          {errors.service_interested.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                        Budget Range ({currency}) *
                      </label>
                      <select
                        value={budgetSelection}
                        onChange={handleBudgetDropdownChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-sm text-white focus:outline-none focus:border-[#FFB800] bg-neutral-900 transition-colors font-mono"
                      >
                        <option value="">Select budget range...</option>
                        {getBudgetOptionsForCurrency(currency).map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.budget_range && !budgetSelection && (
                        <p className="text-xs text-[#EF4444] font-mono mt-1">
                          {errors.budget_range.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Custom Budget Amount Input */}
                  {budgetSelection === 'custom' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-1.5"
                    >
                      <label className="block text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider">
                        Enter Custom Budget ({currency}) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-neutral-400">
                          {currency === 'INR' ? '₹' : '$'}
                        </span>
                        <input
                          type="text"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          placeholder={currency === 'INR' ? '50,000' : '2,500'}
                          className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-white/10 text-sm text-white focus:outline-none focus:border-[#FFB800] bg-white/[0.04] font-mono"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Project Goals / Current Site URL (Optional)
                    </label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      placeholder="Tell us about your current site speed, main pain points, or timeline..."
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-sm text-white focus:outline-none focus:border-[#FFB800] bg-white/[0.04] placeholder-neutral-500 transition-colors font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-gradient-to-r from-[#FFB800] to-[#FF9500] hover:scale-[1.01] active:scale-[0.99] text-black rounded-xl text-sm font-black flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(255,184,0,0.35)] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <span>Send Message &amp; Get Free Quote</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Fast-Track & Direct Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Direct Instant Booking Card */}
            <div className="cyber-glass-glow rounded-3xl p-6 sm:p-7 space-y-4 border border-[#FFB800]/40 text-white">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-[#FFB800]">
                <Calendar size={14} />
                <span>Fast-Track Discovery</span>
              </div>
              <h3 className="text-xl font-black text-white">
                Need to Start Immediately?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Connect directly with our team on WhatsApp to discuss project requirements, platform choices (Shopify, WordPress, Wix, or custom code), and get immediate answers.
              </p>
              <a
                href="https://wa.me/919943632731?text=Hi%20Ostrune%20Team%2C%20I%20am%20looking%20to%20start%20a%20new%20project%20(Website%20%2F%20App%20%2F%20Lead%20Gen)%20and%20would%20like%20a%20quick%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-2 px-4 py-3 bg-[#FFB800] hover:bg-[#FF9500] text-black font-black text-xs rounded-xl transition-all shadow-md"
              >
                <MessageSquare size={15} />
                <span>Chat Directly on WhatsApp</span>
                <ArrowRight size={14} />
              </a>
            </div>

            {/* Direct Communication Banner */}
            <div className="cyber-glass rounded-2xl p-6 space-y-2 border border-white/10 text-white">
              <div className="flex items-center gap-1.5 text-[#00F0FF] text-xs font-mono font-bold uppercase">
                <Clock size={14} />
                <span>Honest Consultation</span>
              </div>
              <h3 className="text-base font-bold text-white">
                Straightforward Guidance &amp; Clear Milestones
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                No high-pressure sales reps. You speak with builders who will honestly recommend whether custom code, Shopify, WordPress, or Wix is right for your budget.
              </p>
            </div>

            {/* Why Work With Us */}
            <div className="cyber-glass rounded-2xl p-6 space-y-3 border border-white/10 text-white">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-[#10B981]">
                <Award size={14} />
                <span>Why Clients Choose Us</span>
              </div>
              <h3 className="text-base font-bold text-white">
                Any Tech Stack. 100% Code Ownership.
              </h3>
              <div className="space-y-2.5 text-xs font-mono text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#10B981] shrink-0" />
                  <span>Sub-second page speeds &amp; 95+ Core Web Vitals</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#10B981] shrink-0" />
                  <span>Shopify, WordPress, Wix, or custom Next.js/React</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#10B981] shrink-0" />
                  <span>Clear pricing, weekly milestone demos, no hidden fees</span>
                </div>
              </div>
            </div>

            {/* Office Info Card */}
            <div className="cyber-glass rounded-2xl p-6 space-y-3 border border-white/10 text-white">
              <h3 className="text-base font-bold text-white">Global Remote HQ</h3>
              <div className="space-y-2.5 text-xs font-mono text-neutral-300">
                <div className="flex items-start gap-2">
                  <MapPin size={15} className="text-[#FFB800] shrink-0 mt-0.5" />
                  <span>{activeSettings.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={15} className="text-[#FFB800] shrink-0" />
                  <a href={`tel:${activeSettings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#FFB800]">
                    {activeSettings.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={15} className="text-[#FFB800] shrink-0" />
                  <a href={`mailto:${activeSettings.email}`} className="hover:text-[#FFB800]">
                    {activeSettings.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}