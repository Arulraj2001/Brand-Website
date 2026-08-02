'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, CheckCircle2, Send, Sparkles, Award, ShieldCheck, Globe, Info, DollarSign } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import CurrencySelector from '@/components/ui/CurrencySelector';
import { useCurrency } from '@/components/ui/CurrencyContext';
import { submitLead, INITIAL_SITE_SETTINGS } from '@/lib/supabase/data';
import { useSiteSettings } from '@/lib/useSiteData';

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(6, 'Please enter a valid contact phone number'),
  country: z.string().min(2, 'Please enter your country/location'),
  service_interested: z.string().min(1, 'Please select a service'),
  budget_range: z.string().min(1, 'Please select or enter your budget in USD ($)'),
  custom_budget: z.string().optional(),
  message: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

export default function ContactPage() {
  const { settings } = useSiteSettings();
  const { formatBudgetLabel, isConverted, convertAmount, currency } = useCurrency();
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [budgetSelection, setBudgetSelection] = useState<string>('$50–$500');
  const [customAmount, setCustomAmount] = useState<string>('');

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const activeSettings = mounted ? settings : INITIAL_SITE_SETTINGS;
  const whatsappClean = activeSettings.whatsapp_number.replace(/[^0-9]/g, '');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      budget_range: '$50–$500',
      service_interested: 'Website Development',
    },
  });

  const handleBudgetDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setBudgetSelection(val);
    if (val !== 'custom') {
      setValue('budget_range', val);
    } else {
      setValue('budget_range', customAmount ? `$${customAmount}` : '');
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    const cleanVal = val.replace(/^\$\s*/, '');
    setValue('budget_range', cleanVal ? `$${cleanVal}` : '');
  };

  const onSubmit = async (data: LeadFormData) => {
    setSubmitting(true);

    const finalBudget =
      budgetSelection === 'custom'
        ? customAmount.trim().startsWith('$')
          ? customAmount.trim()
          : `$${customAmount.trim()}`
        : data.budget_range;

    const result = await submitLead({
      name: data.name,
      email: data.email,
      phone: data.phone,
      country: data.country,
      service_interested: data.service_interested,
      budget_range: finalBudget,
      message: data.message || 'General Strategy Request',
    });
    setSubmitting(false);
    if (result.success) {
      setSubmitted(true);
      reset();
      setBudgetSelection('$50–$500');
      setCustomAmount('');
    }
  };

  return (
    <div className="pt-28 pb-20 bg-[#F9FAFB] min-h-screen bg-line-pattern">
      <div className="max-w-[1200px] mx-auto px-4 space-y-10">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] text-xs font-bold border border-[#E5E7EB]">
            <Sparkles size={14} className="text-[#1C1C1C]" />
            Book a Free Strategy Call & Proposal
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C1C1C] tracking-tight">
            Let’s Discuss Your <GradientText>Project & Growth Goals</GradientText>
          </h1>
          <p className="text-base text-[#6B7280] leading-relaxed">
            Fill out the form below to receive a custom proposal and 15-minute strategy call. Response guaranteed within 12 hours across US, UK, Canada & Australia.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-[#1C1C1C] pt-1">
            <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-[#E5E7EB]">
              <Clock size={13} className="text-[#FF9D00]" /> Time-Zone Friendly (US/UK/AU/EU)
            </span>
            <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-[#E5E7EB]">
              <ShieldCheck size={13} className="text-[#3B82F6]" /> Stripe & PayPal Accepted
            </span>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Lead Form (7 Cols) */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8">
              {submitted ? (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#10B981]/15 text-[#10B981] mx-auto flex items-center justify-center shadow-xs">
                    <CheckCircle2 size={36} />
                  </div>
                  <h2 className="text-2xl font-bold text-[#1C1C1C]">
                    Project Inquiry Received!
                  </h2>
                  <p className="text-sm text-[#6B7280] max-w-md mx-auto leading-relaxed">
                    Thank you! We'll get back to you within 12 hours with a custom project proposal and transparent USD ($) budget options.
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <Button
                      onClick={() => setSubmitted(false)}
                      variant="secondary"
                      size="md"
                    >
                      Submit Another Inquiry
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF9D00] pb-2 border-b border-[#E5E7EB]">
                    <Sparkles size={14} />
                    <span>Free 15-Minute Strategy & Architecture Session</span>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                        Full Name *
                      </label>
                      <input
                        {...register('name')}
                        type="text"
                        placeholder="e.g. David Miller"
                        className="w-full px-3.5 py-[9px] rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] bg-white transition-colors"
                      />
                      {errors.name && (
                        <p className="text-xs text-[#EF4444] font-semibold mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                        Work Email *
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="e.g. david@company.com"
                        className="w-full px-3.5 py-[9px] rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] bg-white transition-colors"
                      />
                      {errors.email && (
                        <p className="text-xs text-[#EF4444] font-semibold mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                        Phone Number *
                      </label>
                      <input
                        {...register('phone')}
                        type="tel"
                        placeholder="+1 (512) 555-0199"
                        className="w-full px-3.5 py-[9px] rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] bg-white transition-colors"
                      />
                      {errors.phone && (
                        <p className="text-xs text-[#EF4444] font-semibold mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                        Country / Location *
                      </label>
                      <input
                        {...register('country')}
                        type="text"
                        list="country-suggestions-contact"
                        placeholder="e.g. United States, India, UK..."
                        className="w-full px-3.5 py-[9px] rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] bg-white transition-colors"
                      />
                      <datalist id="country-suggestions-contact">
                        <option value="United States" />
                        <option value="India" />
                        <option value="United Kingdom" />
                        <option value="Canada" />
                        <option value="Australia" />
                        <option value="Germany" />
                        <option value="Singapore" />
                        <option value="United Arab Emirates" />
                      </datalist>
                      {errors.country && (
                        <p className="text-xs text-[#EF4444] font-semibold mt-1">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Service & USD Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                        Service Interested *
                      </label>
                      <select
                        {...register('service_interested')}
                        className="w-full px-3.5 py-[9px] rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] bg-white transition-colors"
                      >
                        <option value="Old Website Upgrade">Old Website Upgrade (Speed & SEO)</option>
                        <option value="UGC Ads">UGC Video Ads (E-Commerce)</option>
                        <option value="Website Development">Website Development</option>
                        <option value="App Development">App Development (Web & Mobile)</option>
                        <option value="SEO Optimization">SEO Optimization</option>
                        <option value="Local Business Marketing">Local Business Marketing</option>
                        <option value="Meta Ads">Meta & LinkedIn Ads</option>
                        <option value="Sales Growth">Sales Growth & Lead Gen</option>
                      </select>
                    </div>

                    {/* Enhanced Budget Range UI */}
                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#FFFDF5] via-[#FFF9E6] to-[#FFFDF5] border border-[#FFD21E] shadow-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-extrabold text-[#1C1C1C] flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-md bg-[#FFD21E] text-[#1C1C1C] flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                            <DollarSign size={13} className="stroke-[2.5]" />
                          </div>
                          <span>Budget Range (USD $) *</span>
                        </label>
                        <CurrencySelector />
                      </div>

                      <div className="relative">
                        <select
                          value={budgetSelection}
                          onChange={handleBudgetDropdownChange}
                          className="w-full pl-3.5 pr-8 py-2 text-xs md:text-sm font-bold text-[#1C1C1C] bg-white border border-[#FFD21E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9D00] focus:border-[#FF9D00] shadow-2xs transition-all font-mono-stats cursor-pointer"
                        >
                          <option value="$50–$500">🌱 {formatBudgetLabel('$50–$500')} (Starter)</option>
                          <option value="$500–$1,000">💼 {formatBudgetLabel('$500–$1,000')}</option>
                          <option value="$1,000–$3,000">🚀 {formatBudgetLabel('$1,000–$3,000')} (Popular)</option>
                          <option value="$3,000–$5,000">⭐ {formatBudgetLabel('$3,000–$5,000')} (Enterprise)</option>
                          <option value="$5,000+">👑 {formatBudgetLabel('$5,000+')} (Custom Scale)</option>
                          <option value="custom">✏️ Enter Custom Amount (USD $)...</option>
                        </select>
                      </div>

                      {isConverted && (
                        <p className="text-[11px] font-semibold text-[#6B7280] flex items-center gap-1.5 pt-0.5">
                          <Info size={13} className="text-[#FF9D00] shrink-0" />
                          <span>Currency converted live — invoices & billing are in USD ($).</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Custom Budget Text Input & Live Converted Output */}
                  {budgetSelection === 'custom' && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative mt-2 space-y-1.5"
                    >
                      <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                        Custom Budget Amount (USD $) *
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-2.5 text-xs font-extrabold text-[#FF9D00] flex items-center gap-1">
                          <DollarSign size={13} />
                          <span>USD</span>
                        </div>
                        <input
                          type="text"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          placeholder="e.g. 250 or 1,500"
                          className="w-full pl-14 pr-3.5 py-2 text-xs md:text-sm font-bold text-[#1C1C1C] bg-white border border-[#FFD21E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9D00] font-mono-stats"
                        />
                      </div>

                      {/* Live Conversion Output for Custom Amount */}
                      {isConverted && customAmount && !isNaN(Number(customAmount.replace(/[^0-9.]/g, ''))) && (
                        <div className="text-[11px] font-bold text-[#047857] bg-[#ECFDF5] px-3 py-1.5 rounded-lg flex items-center justify-between border border-[#10B981]/30">
                          <span>Live Converted Amount ({currency}):</span>
                          <span className="font-mono-stats text-xs font-extrabold text-[#065F46]">
                            {convertAmount(Number(customAmount.replace(/[^0-9.]/g, ''))).formatted} {currency}
                          </span>
                        </div>
                      )}

                      {errors.budget_range && (
                        <p className="text-xs text-[#EF4444] font-semibold mt-1">
                          {errors.budget_range.message}
                        </p>
                      )}
                    </motion.div>
                  )}

                  {/* Message (Optional) */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                      Project Goals / Current Site URL (Optional)
                    </label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      placeholder="Tell us about your current site speed, main pain points, or timeline..."
                      className="w-full px-3.5 py-[9px] rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] bg-white transition-colors"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    {submitting ? (
                      <span>Sending Request...</span>
                    ) : (
                      <>
                        <span>Book Free Strategy Call</span>
                        <Send size={16} />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Column 2: Trust Content & Contact Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* SLA Banner */}
            <Card className="p-5 space-y-2 bg-[#FFF9E6] border border-[#FFD21E]">
              <div className="flex items-center gap-1.5 text-[#FF9D00] text-xs font-bold uppercase">
                <Clock size={14} />
                <span>Response SLA Guarantee</span>
              </div>
              <h3 className="text-base font-bold text-[#1C1C1C]">
                Guaranteed Response Within 12 Hours
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Our lead technical strategists review incoming requests continuously across US, UK & Australian business hours.
              </p>
            </Card>

            {/* Why Work With Us */}
            <Card className="p-5 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#FF9D00]">
                <Award size={14} />
                <span>Offshore Value Proposition</span>
              </div>
              <h3 className="text-base font-bold text-[#1C1C1C]">
                Same Quality. 60% Lower Rates.
              </h3>
              <div className="space-y-2 text-xs text-[#6B7280]">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 size={15} className="text-[#10B981] shrink-0" />
                  <span>Sub-second Core Web Vitals speed scores</span>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 size={15} className="text-[#10B981] shrink-0" />
                  <span>Fluent English communication with zero friction</span>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 size={15} className="text-[#10B981] shrink-0" />
                  <span>Stripe & PayPal international billing accepted</span>
                </div>
              </div>
            </Card>

            {/* Office Info Card */}
            <Card className="p-5 space-y-3">
              <h3 className="text-base font-bold text-[#1C1C1C]">Global Remote HQ</h3>
              <div className="space-y-2 text-xs text-[#6B7280]">
                <div className="flex items-start gap-2">
                  <MapPin size={15} className="text-[#FF9D00] shrink-0 mt-0.5" />
                  <span>{activeSettings.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={15} className="text-[#FF9D00] shrink-0" />
                  <a href={`tel:${activeSettings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#FF9D00] font-semibold text-xs">
                    {activeSettings.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={15} className="text-[#FF9D00] shrink-0" />
                  <a href={`mailto:${activeSettings.email}`} className="hover:text-[#FF9D00] text-xs">
                    {activeSettings.email}
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
