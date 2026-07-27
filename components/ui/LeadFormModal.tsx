'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Sparkles, Send, DollarSign, ShieldCheck, Clock } from 'lucide-react';
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
  budget_range: z.string().min(1, 'Please select or enter your budget in USD ($)'),
  custom_budget: z.string().optional(),
  message: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

import CurrencySelector from './CurrencySelector';
import { useCurrency } from './CurrencyContext';
import { Info } from 'lucide-react';

export default function LeadFormModal({
  isOpen,
  onClose,
  defaultService = 'Website Development',
}: LeadFormModalProps) {
  const { settings } = useSiteSettings();
  const { formatBudgetLabel, isConverted } = useCurrency();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [budgetSelection, setBudgetSelection] = useState<string>('$1,000–$3,000');
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
      budget_range: '$1,000–$3,000',
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
    setBudgetSelection('$1,000–$3,000');
    setCustomAmount('');
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1C]/60 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-white border border-[#E5E7EB] rounded-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.15)] p-6 sm:p-8 space-y-6 my-8"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-[#6B7280] hover:text-[#1C1C1C] hover:bg-[#F9FAFB] transition-colors"
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
              <div className="w-16 h-16 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-bold text-[#1C1C1C]">Inquiry Received!</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed max-w-sm mx-auto">
                Thank you! Our technical strategy team has received your project details. We will review your requirements and reply within <strong className="text-[#1C1C1C]">12 hours</strong>.
              </p>
              <div className="pt-4 flex flex-col gap-2">
                <a
                  href={`https://wa.me/${whatsappClean}?text=Hi!%20I%20just%20submitted%20a%20project%20inquiry%20on%20your%20website.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] text-white text-sm font-bold shadow-xs hover:bg-[#20bd5a] transition-colors min-h-[44px]"
                >
                  <WhatsAppIcon size={20} fill="white" />
                  <span>Optional Quick WhatsApp Chat</span>
                </a>
                <Button onClick={handleClose} variant="secondary" size="md" className="w-full">
                  Close Window
                </Button>
              </div>
            </motion.div>
          ) : (
            /* Lead Form */
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] text-xs font-bold border border-[#E5E7EB]">
                  <Sparkles size={12} className="text-[#1C1C1C]" />
                  Instant Growth Proposal
                </div>
                <h3 className="text-xl font-bold text-[#1C1C1C]">Book a Strategy Call / Quote</h3>
                <p className="text-xs text-[#6B7280]">
                  Guaranteed response within 12 hours across US, UK, CA & AU time zones.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                    Your Name *
                  </label>
                  <input
                    {...register('name')}
                    placeholder="e.g. David Miller"
                    className="w-full px-3.5 py-[9px] text-sm text-[#1C1C1C] bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#FF9D00] transition-colors"
                  />
                  {errors.name && (
                    <p className="text-xs font-semibold text-[#EF4444] mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                      Email Address *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="david@company.com"
                      className="w-full px-3.5 py-[9px] text-sm text-[#1C1C1C] bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#FF9D00] transition-colors"
                    />
                    {errors.email && (
                      <p className="text-xs font-semibold text-[#EF4444] mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                      Phone Number *
                    </label>
                    <input
                      {...register('phone')}
                      placeholder="+1 (512) 555-0199"
                      className="w-full px-3.5 py-[9px] text-sm text-[#1C1C1C] bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#FF9D00] transition-colors"
                    />
                    {errors.phone && (
                      <p className="text-xs font-semibold text-[#EF4444] mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Country & Service Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                      Country / Location *
                    </label>
                    <input
                      {...register('country')}
                      list="country-suggestions-modal"
                      placeholder="e.g. United States, India, UK..."
                      className="w-full px-3.5 py-[9px] text-sm text-[#1C1C1C] bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#FF9D00] transition-colors"
                    />
                    <datalist id="country-suggestions-modal">
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
                      <p className="text-xs font-semibold text-[#EF4444] mt-1">{errors.country.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                      Service Interested *
                    </label>
                    <select
                      {...register('service_interested')}
                      className="w-full px-3.5 py-[9px] text-sm text-[#1C1C1C] bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#FF9D00] transition-colors"
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
                </div>

                {/* Budget Range (USD) with Custom Entry Support */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-[#1C1C1C]">
                      Project Budget (USD $) *
                    </label>
                    <CurrencySelector />
                  </div>
                  <select
                    value={budgetSelection}
                    onChange={handleBudgetDropdownChange}
                    className="w-full px-3.5 py-[9px] text-sm text-[#1C1C1C] bg-[#FFF9E6] border border-[#FFD21E] rounded-lg focus:outline-none focus:border-[#FF9D00] transition-colors font-mono-stats"
                  >
                    <option value="$500–$1,000">{formatBudgetLabel('$500–$1,000')}</option>
                    <option value="$1,000–$3,000">{formatBudgetLabel('$1,000–$3,000')}</option>
                    <option value="$3,000–$5,000">{formatBudgetLabel('$3,000–$5,000')}</option>
                    <option value="$5,000+">{formatBudgetLabel('$5,000+')}</option>
                    <option value="custom">✏️ Custom Amount (Enter exact USD $)...</option>
                  </select>

                  {isConverted && (
                    <p className="text-[11px] font-semibold text-[#6B7280] mt-1 flex items-center gap-1">
                      <Info size={12} className="text-[#FF9D00] shrink-0" />
                      <span>Approximate — final pricing and invoices are in USD ($).</span>
                    </p>
                  )}

                  {/* Custom Budget Text Input */}
                  {budgetSelection === 'custom' && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 relative"
                    >
                      <div className="absolute left-3 top-2.5 text-sm font-bold text-[#FF9D00] flex items-center">
                        $
                      </div>
                      <input
                        type="text"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        placeholder="Enter custom amount (e.g. 2,500 or 7,500)"
                        className="w-full pl-8 pr-3.5 py-[9px] text-sm text-[#1C1C1C] bg-[#FFF9E6] border border-[#FFD21E] rounded-lg focus:outline-none focus:border-[#FF9D00] font-mono-stats"
                      />
                    </motion.div>
                  )}

                  {errors.budget_range && (
                    <p className="text-xs font-semibold text-[#EF4444] mt-1">
                      {errors.budget_range.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                    Project Requirements / Website URL (Optional)
                  </label>
                  <textarea
                    {...register('message')}
                    rows={3}
                    placeholder="Provide your current website link or main project goals..."
                    className="w-full px-3.5 py-[9px] text-sm text-[#1C1C1C] bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#FF9D00] transition-colors"
                  />
                </div>

                {/* Trust Badges Note */}
                <div className="flex items-center justify-between text-[11px] text-[#6B7280] font-semibold pt-1 border-t border-[#E5E7EB]">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={13} className="text-[#3B82F6]" /> Stripe & PayPal Accepted
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} className="text-[#FF9D00]" /> 12-Hour Reply Guarantee
                  </span>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  variant="primary"
                  size="md"
                  className="w-full mt-2"
                >
                  <Send size={16} />
                  <span>{submitting ? 'Sending Request...' : 'Book Free Strategy Call'}</span>
                </Button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
