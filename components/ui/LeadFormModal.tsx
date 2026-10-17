'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Sparkles, Send, DollarSign, ShieldCheck, Clock, Info } from 'lucide-react';
import Button from './Button';
import WhatsAppIcon from './WhatsAppIcon';
import { submitLead } from '@/lib/supabase/data';
import { useSiteSettings } from '@/lib/useSiteData';

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(6, 'Please enter a valid contact phone number'),
  country: z.string().min(2, 'Please enter your country/location'),
  service_interested: z.string().min(1, 'Please select a service'),
  budget_range: z.string().optional(),
  custom_budget: z.string().optional(),
  message: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  hideBudget?: boolean;
  isStudentModal?: boolean;
}

import CurrencySelector from './CurrencySelector';
import { useCurrency } from './CurrencyContext';

export default function LeadFormModal({
  isOpen,
  onClose,
  defaultService = 'Website Development',
  hideBudget = false,
  isStudentModal = false,
}: LeadFormModalProps) {
  const { settings } = useSiteSettings();
  const { formatBudgetLabel, isConverted, convertAmount, currency } = useCurrency();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [budgetSelection, setBudgetSelection] = useState<string>('$50–$500');
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
      service_interested: defaultService,
      budget_range: '$50–$500',
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

    const finalBudget = hideBudget
      ? 'Academic Guidance'
      : budgetSelection === 'custom'
      ? customAmount.trim().startsWith('$')
        ? customAmount.trim()
        : `$${customAmount.trim()}`
      : data.budget_range || '$50–$500';

    await submitLead({
      name: data.name,
      email: data.email,
      phone: data.phone,
      country: data.country,
      service_interested: data.service_interested,
      budget_range: finalBudget,
      message: data.message || '',
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setBudgetSelection('$50–$500');
    setCustomAmount('');
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto cyber-form-panel p-5 sm:p-7 space-y-5 my-auto backdrop-blur-2xl text-white"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.08] transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {submitted ? (
            /* Animated Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.3)] border border-[#10B981]/40">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-black text-white">Inquiry Received</h3>
              <p className="text-sm text-gray-300 leading-relaxed max-w-sm mx-auto font-light">
                Transmission verified. Our technical strategy foundry has logged your project dossier and will respond within <strong className="text-[#FFB800]">12 hours</strong>.
              </p>
              <div className="pt-4 flex flex-col gap-2">
                <a
                  href={`https://wa.me/${whatsappClean}?text=Hi!%20I%20just%20submitted%20a%20project%20inquiry%20on%20your%20website.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-black text-sm font-bold shadow-lg shadow-green-500/20 hover:bg-[#20bd5a] transition-all min-h-[44px]"
                >
                  <WhatsAppIcon size={20} fill="black" />
                  <span>Optional Direct WhatsApp Dispatch</span>
                </a>
                <Button onClick={handleClose} variant="secondary" size="md" className="w-full">
                  Close Terminal
                </Button>
              </div>
            </motion.div>
          ) : (
            /* Lead Form */
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB800]/15 text-[#FFB800] text-xs font-mono font-bold border border-[#FFB800]/30 shadow-[0_0_15px_rgba(255,184,0,0.15)]">
                  <Sparkles size={12} className="text-[#FFB800]" />
                  INSTANT STRATEGY PROPOSAL
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">Book Strategy Call / Quote</h3>
                <p className="text-xs text-gray-400 font-light">
                  Direct review by engineering leadership. Guaranteed reply within 12 hours worldwide.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    {...register('name')}
                    placeholder="e.g. David Miller"
                    className="w-full px-3.5 py-[9px] text-sm text-white placeholder-gray-500 bg-white/[0.04] border border-white/[0.1] rounded-xl focus:outline-none focus:border-[#FFB800] focus:ring-1 focus:ring-[#FFB800]/40 transition-colors"
                  />
                  {errors.name && (
                    <p className="text-xs font-semibold text-[#EF4444] mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="david@company.com"
                      className="w-full px-3.5 py-[9px] text-sm text-white placeholder-gray-500 bg-white/[0.04] border border-white/[0.1] rounded-xl focus:outline-none focus:border-[#FFB800] focus:ring-1 focus:ring-[#FFB800]/40 transition-colors"
                    />
                    {errors.email && (
                      <p className="text-xs font-semibold text-[#EF4444] mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      {...register('phone')}
                      placeholder="+91 8637474067"
                      className="w-full px-3.5 py-[9px] text-sm text-white placeholder-gray-500 bg-white/[0.04] border border-white/[0.1] rounded-xl focus:outline-none focus:border-[#FFB800] focus:ring-1 focus:ring-[#FFB800]/40 transition-colors"
                    />
                    {errors.phone && (
                      <p className="text-xs font-semibold text-[#EF4444] mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Country & Service Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Country / Location *
                    </label>
                    <input
                      {...register('country')}
                      placeholder="e.g. Your city / country"
                      className="w-full px-3.5 py-[9px] text-sm text-white placeholder-gray-500 bg-white/[0.04] border border-white/[0.1] rounded-xl focus:outline-none focus:border-[#FFB800] focus:ring-1 focus:ring-[#FFB800]/40 transition-colors"
                    />
                    {errors.country && (
                      <p className="text-xs font-semibold text-[#EF4444] mt-1">{errors.country.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Service Interested *
                    </label>
                    <select
                      {...register('service_interested')}
                      className="w-full px-3.5 py-[9px] text-sm text-white bg-[#101322] border border-white/[0.1] rounded-xl focus:outline-none focus:border-[#FFB800] transition-colors"
                    >
                      {isStudentModal ? (
                        <>
                          <option value="Student Project - Web Development">🎓 Website Engineering & Web App Project</option>
                          <option value="Student Project - Machine Learning">🧠 Machine Learning (ML) Final Year Project</option>
                          <option value="Student Project - Deep Learning">👁️ Deep Learning (DL) & Computer Vision Project</option>
                          <option value="Student Project - Custom Domain">🌐 Custom Domain & Cloud Deployment</option>
                          <option value="Student Project - IEEE Documentation">📑 IEEE Report, Synopsis & Documentation</option>
                          <option value="Student Project - Viva PPT Deck">📊 Viva PPT Presentation & Slide Deck</option>
                          <option value="Student Project - MSME Certificate">🏆 MSME Registered Learnithm Certificate</option>
                          <option value="Student Project - 1-on-1 Viva Prep">💬 1-on-1 Viva Code Explanation & Defense Prep</option>
                        </>
                      ) : (
                        <>
                          <option value="Old Website Upgrade">Old Website Upgrade (Speed & SEO)</option>
                          <option value="UGC Ads">UGC Video Ads (E-Commerce)</option>
                          <option value="Website Development">Website Development</option>
                          <option value="App Development">App Development (Web & Mobile)</option>
                          <option value="SEO Optimization">SEO Optimization</option>
                          <option value="Local Business Marketing">Local Business Marketing</option>
                          <option value="Meta Ads">Meta & LinkedIn Ads</option>
                          <option value="Sales Growth">Sales Growth & Lead Gen</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                {/* Budget Range (USD) with Enhanced UI & Currency Selector */}
                {!hideBudget && (
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-200 flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-md bg-[#FFB800]/20 text-[#FFB800] flex items-center justify-center font-bold text-xs shrink-0 border border-[#FFB800]/40">
                          <DollarSign size={13} className="stroke-[2.5]" />
                        </div>
                        <span>Budget Allocation (USD $) *</span>
                      </label>
                      <CurrencySelector />
                    </div>

                    <div className="relative">
                      <select
                        value={budgetSelection}
                        onChange={handleBudgetDropdownChange}
                        className="w-full pl-3.5 pr-8 py-2 text-xs md:text-sm font-bold text-white bg-[#101322] border border-white/[0.1] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FFB800] focus:border-[#FFB800] transition-all font-mono cursor-pointer"
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
                      <p className="text-[11px] font-semibold text-gray-400 flex items-center gap-1.5 pt-0.5">
                        <Info size={13} className="text-[#FFB800] shrink-0" />
                        <span>Currency converted live — billing invoices settle in USD ($).</span>
                      </p>
                    )}

                    {/* Custom Budget Text Input & Live Converted Display */}
                    {budgetSelection === 'custom' && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 space-y-1.5"
                      >
                        <div className="relative">
                          <div className="absolute left-3 top-2.5 text-xs font-bold text-[#FFB800] flex items-center gap-1 font-mono">
                            <DollarSign size={13} />
                            <span>USD</span>
                          </div>
                          <input
                            type="text"
                            value={customAmount}
                            onChange={handleCustomAmountChange}
                            placeholder="e.g. 250 or 1,500"
                            className="w-full pl-14 pr-3.5 py-2 text-xs md:text-sm font-bold text-white bg-[#101322] border border-[#FFB800]/40 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FFB800] font-mono"
                          />
                        </div>

                        {/* Live Conversion Output for Custom Amount */}
                        {isConverted && customAmount && !isNaN(Number(customAmount.replace(/[^0-9.]/g, ''))) && (
                          <div className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl flex items-center justify-between border border-emerald-500/20">
                            <span>Live Converted Amount ({currency}):</span>
                            <span className="font-mono text-xs font-black text-emerald-300">
                              {convertAmount(Number(customAmount.replace(/[^0-9.]/g, ''))).formatted} {currency}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {errors.budget_range && (
                      <p className="text-xs font-semibold text-[#EF4444] mt-1">
                        {errors.budget_range.message}
                      </p>
                    )}
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Project Requirements / Website URL (Optional)
                  </label>
                  <textarea
                    {...register('message')}
                    rows={3}
                    placeholder="Provide your current website link or main project goals..."
                    className="w-full px-3.5 py-[9px] text-sm text-white placeholder-gray-500 bg-white/[0.04] border border-white/[0.1] rounded-xl focus:outline-none focus:border-[#FFB800] focus:ring-1 focus:ring-[#FFB800]/40 transition-colors"
                  />
                </div>

                {/* Trust Badges Note */}
                <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium pt-2 border-t border-white/[0.08]">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-[#00F0FF]" /> 100% Free Consultation
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} className="text-[#FFB800]" /> Fast Response
                  </span>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  variant="primary"
                  size="md"
                  className="w-full mt-2 shadow-[0_0_25px_rgba(255,184,0,0.25)]"
                >
                  <Send size={16} />
                  <span>{submitting ? 'Sending Inquiry...' : 'Submit Inquiry & Get Free Quote'}</span>
                </Button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
