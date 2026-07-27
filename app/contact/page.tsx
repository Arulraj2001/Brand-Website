'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, CheckCircle2, Send, Sparkles, Award } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { submitLead } from '@/lib/supabase/data';
import { useSiteSettings } from '@/lib/useSiteData';

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)'),
  city: z.string().min(2, 'Please enter your city'),
  service_interested: z.string().min(1, 'Please select a service'),
  budget_range: z.string().min(1, 'Please select or enter your budget in INR ₹'),
  custom_budget: z.string().optional(),
  message: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

export default function ContactPage() {
  const { settings } = useSiteSettings();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [budgetSelection, setBudgetSelection] = useState<string>('₹25K–50K');
  const [customAmount, setCustomAmount] = useState<string>('');

  const whatsappClean = settings.whatsapp_number.replace(/[^0-9]/g, '');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      budget_range: '₹25K–50K',
      service_interested: 'Web Development',
    },
  });

  const handleBudgetDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setBudgetSelection(val);
    if (val !== 'custom') {
      setValue('budget_range', val);
    } else {
      setValue('budget_range', customAmount ? `₹${customAmount}` : '');
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    const cleanVal = val.replace(/^₹\s*/, '');
    setValue('budget_range', cleanVal ? `₹${cleanVal}` : '');
  };

  const onSubmit = async (data: LeadFormData) => {
    setSubmitting(true);

    const finalBudget =
      budgetSelection === 'custom'
        ? customAmount.trim().startsWith('₹')
          ? customAmount.trim()
          : `₹${customAmount.trim()}`
        : data.budget_range;

    const result = await submitLead({
      name: data.name,
      email: data.email,
      phone: `+91 ${data.phone}`,
      city: data.city,
      service_interested: data.service_interested,
      budget_range: finalBudget,
      message: data.message || 'General Quote Request',
    });
    setSubmitting(false);
    if (result.success) {
      setSubmitted(true);
      reset();
      setBudgetSelection('₹25K–50K');
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
            Get a Custom Proposal
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C1C1C] tracking-tight">
            Let’s Discuss Your <GradientText>Growth Goals</GradientText>
          </h1>
          <p className="text-base text-[#6B7280] leading-relaxed">
            Fill out the form below or chat directly with our team on WhatsApp. Response guaranteed under 2 hours during business hours.
          </p>
        </div>

        {/* Two-Column Layout: Form on Left, Trust Content on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: India Lead Form (7 Cols) */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8">
              {submitted ? (
                /* Animated Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#10B981]/15 text-[#10B981] mx-auto flex items-center justify-center shadow-xs">
                    <CheckCircle2 size={36} />
                  </div>
                  <h2 className="text-2xl font-bold text-[#1C1C1C]">
                    Quote Request Received!
                  </h2>
                  <p className="text-sm text-[#6B7280] max-w-md mx-auto leading-relaxed">
                    Thank you! We'll get back to you within 24 hours with a custom project blueprint and transparent INR budget options.
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <Button
                      onClick={() => setSubmitted(false)}
                      variant="secondary"
                      size="md"
                    >
                      Submit Another Inquiry
                    </Button>
                    <a
                      href={`https://wa.me/${whatsappClean}?text=Hi%20ApexPulse!%20I%20just%20submitted%20a%20quote%20request.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] text-white font-bold text-sm shadow-xs hover:bg-[#20bd5a] transition-colors min-h-[44px]"
                    >
                      <WhatsAppIcon size={18} fill="white" />
                      <span>Instant WhatsApp Chat</span>
                    </a>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF9D00] pb-2 border-b border-[#E5E7EB]">
                    <Sparkles size={14} />
                    <span>Free 30-Minute Strategy & Architecture Session</span>
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
                        placeholder="e.g. Vikram Sharma"
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
                        placeholder="e.g. vikram@company.in"
                        className="w-full px-3.5 py-[9px] rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] bg-white transition-colors"
                      />
                      {errors.email && (
                        <p className="text-xs text-[#EF4444] font-semibold mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone (+91) & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                        Mobile Number (+91) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-sm font-bold text-[#6B7280]">
                          +91
                        </span>
                        <input
                          {...register('phone')}
                          type="tel"
                          placeholder="9876543210"
                          className="w-full pl-12 pr-3.5 py-[9px] rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] bg-white transition-colors"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-xs text-[#EF4444] font-semibold mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                        City *
                      </label>
                      <input
                        {...register('city')}
                        type="text"
                        placeholder="e.g. Bengaluru, Mumbai"
                        className="w-full px-3.5 py-[9px] rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] bg-white transition-colors"
                      />
                      {errors.city && (
                        <p className="text-xs text-[#EF4444] font-semibold mt-1">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Service & INR Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                        Service Interested *
                      </label>
                      <select
                        {...register('service_interested')}
                        className="w-full px-3.5 py-[9px] rounded-lg border border-[#E5E7EB] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] bg-white transition-colors"
                      >
                        <option value="Web Development">Website & Mobile App Engineering</option>
                        <option value="SEO Dominance">SEO & Search Dominance</option>
                        <option value="Meta Ads">Meta & LinkedIn Paid Ads</option>
                        <option value="Lead Generation">B2B Lead Generation Funnel</option>
                        <option value="Full Retainer">Full 360° Retainer</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                        Budget Range (INR ₹) *
                      </label>
                      <select
                        value={budgetSelection}
                        onChange={handleBudgetDropdownChange}
                        className="w-full px-3.5 py-[9px] rounded-lg border border-[#E5E7EB] text-sm font-semibold text-[#FF9D00] focus:outline-none focus:border-[#FF9D00] bg-white transition-colors font-mono-stats"
                      >
                        <option value="₹10K–25K">₹10,000 – ₹25,000</option>
                        <option value="₹25K–50K">₹25,000 – ₹50,000</option>
                        <option value="₹50K–1L">₹50,000 – ₹1,00,000</option>
                        <option value="₹1L+">₹1,00,000+ (Enterprise)</option>
                        <option value="custom">✏️ Custom Amount (Enter exact INR ₹)...</option>
                      </select>
                    </div>
                  </div>

                  {/* Custom Budget Text Input */}
                  {budgetSelection === 'custom' && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative"
                    >
                      <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                        Custom Budget Amount (INR ₹) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-sm font-bold text-[#FF9D00]">
                          ₹
                        </span>
                        <input
                          type="text"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          placeholder="Enter custom budget (e.g. 75,000 or 2.5 Lakhs)"
                          className="w-full pl-8 pr-3.5 py-[9px] text-sm text-[#1C1C1C] bg-[#FFF9E6] border border-[#FFD21E] rounded-lg focus:outline-none focus:border-[#FF9D00] font-mono-stats"
                        />
                      </div>
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
                      Project Notes (Optional)
                    </label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      placeholder="Tell us about your project objectives, timeline, or current challenge..."
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
                      <span>Submitting Request...</span>
                    ) : (
                      <>
                        <span>Submit Proposal Request</span>
                        <Send size={16} />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Column 2: Trust Content & Quick Options (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Instant WhatsApp Option */}
            <Card isFeatured className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#25D366] text-white flex items-center justify-center">
                  <WhatsAppIcon size={20} fill="white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1C1C1C]">Prefer Instant WhatsApp Chat?</h3>
                  <p className="text-xs text-[#6B7280]">Direct line to senior engineering team</p>
                </div>
              </div>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Message our technical team on WhatsApp for instant answers regarding stack choices, pricing range, or project timelines.
              </p>
              <a
                href={`https://wa.me/${whatsappClean}?text=Hi%20ApexPulse!%20I%20want%20to%20get%20a%20quick%20quote.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-[#25D366] text-white font-bold text-sm shadow-xs hover:bg-[#20bd5a] transition-colors min-h-[44px]"
              >
                <WhatsAppIcon size={18} fill="white" />
                <span>Chat on WhatsApp ({settings.phone})</span>
              </a>
            </Card>

            {/* Mini "Why Work With Us" Recap */}
            <Card className="p-5 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#FF9D00]">
                <Award size={14} />
                <span>Why Work With ApexPulse</span>
              </div>
              <h3 className="text-base font-bold text-[#1C1C1C]">
                Zero Templates. Verified Revenue ROI.
              </h3>
              <div className="space-y-2 text-xs text-[#6B7280]">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 size={15} className="text-[#10B981] shrink-0" />
                  <span>Sub-second page speeds across Tier 1 & Tier 2 India</span>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 size={15} className="text-[#10B981] shrink-0" />
                  <span>SLA guarantees on deliverables & code quality</span>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 size={15} className="text-[#10B981] shrink-0" />
                  <span>Transparent INR pricing & custom retainer plans</span>
                </div>
              </div>
            </Card>

            {/* Response Time SLA Banner */}
            <Card className="p-5 space-y-2 bg-[#FFF9E6] border border-[#FFD21E]">
              <div className="flex items-center gap-1.5 text-[#FF9D00] text-xs font-bold uppercase">
                <Clock size={14} />
                <span>Response SLA Guarantee</span>
              </div>
              <h3 className="text-base font-bold text-[#1C1C1C]">
                Guaranteed Response Within 24 Hours
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                During IST business hours, our lead technical strategists review incoming requests within 2 hours and issue full proposals within 24 hours.
              </p>
            </Card>

            {/* Office Info Card */}
            <Card className="p-5 space-y-3">
              <h3 className="text-base font-bold text-[#1C1C1C]">India HQ Contact</h3>
              <div className="space-y-2 text-xs text-[#6B7280]">
                <div className="flex items-start gap-2">
                  <MapPin size={15} className="text-[#FF9D00] shrink-0 mt-0.5" />
                  <span>{settings.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={15} className="text-[#FF9D00] shrink-0" />
                  <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#FF9D00] font-semibold text-xs">
                    {settings.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={15} className="text-[#FF9D00] shrink-0" />
                  <a href={`mailto:${settings.email}`} className="hover:text-[#FF9D00] text-xs">
                    {settings.email}
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
