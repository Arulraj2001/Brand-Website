'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Sparkles, Send, IndianRupee } from 'lucide-react';
import Button from './Button';
import WhatsAppIcon from './WhatsAppIcon';
import { submitLead } from '@/lib/supabase/data';

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

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function LeadFormModal({
  isOpen,
  onClose,
  defaultService = 'Web Development',
}: LeadFormModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [budgetSelection, setBudgetSelection] = useState<string>('₹25K–50K');
  const [customAmount, setCustomAmount] = useState<string>('');

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
      budget_range: '₹25K–50K',
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

    await submitLead({
      name: data.name,
      email: data.email,
      phone: `+91 ${data.phone}`,
      city: data.city,
      service_interested: data.service_interested,
      budget_range: finalBudget,
      message: data.message || '',
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setBudgetSelection('₹25K–50K');
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
              <h3 className="text-2xl font-bold text-[#1C1C1C]">Quote Request Received!</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed max-w-sm mx-auto">
                Thank you! Our lead strategy team in Bengaluru has received your inquiry. We will review your project requirements and respond within <strong className="text-[#1C1C1C]">24 hours</strong>.
              </p>
              <div className="pt-4 flex flex-col gap-2">
                <a
                  href="https://wa.me/919876543210?text=Hi!%20I%20just%20submitted%20a%20quote%20request%20on%20your%20website."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] text-white text-sm font-bold shadow-xs hover:bg-[#20bd5a] transition-colors min-h-[44px]"
                >
                  <WhatsAppIcon size={20} fill="white" />
                  <span>Quick Chat on WhatsApp</span>
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
                <h3 className="text-xl font-bold text-[#1C1C1C]">Request a Custom Quote</h3>
                <p className="text-xs text-[#6B7280]">
                  Tell us about your project. Response guaranteed within 2 hours.
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
                    placeholder="e.g. Vikram Sharma"
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
                      placeholder="vikram@company.in"
                      className="w-full px-3.5 py-[9px] text-sm text-[#1C1C1C] bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#FF9D00] transition-colors"
                    />
                    {errors.email && (
                      <p className="text-xs font-semibold text-[#EF4444] mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                      Mobile (+91) *
                    </label>
                    <input
                      {...register('phone')}
                      placeholder="9876543210"
                      className="w-full px-3.5 py-[9px] text-sm text-[#1C1C1C] bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#FF9D00] transition-colors"
                    />
                    {errors.phone && (
                      <p className="text-xs font-semibold text-[#EF4444] mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* City & Service Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                      City *
                    </label>
                    <input
                      {...register('city')}
                      placeholder="e.g. Bengaluru"
                      className="w-full px-3.5 py-[9px] text-sm text-[#1C1C1C] bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#FF9D00] transition-colors"
                    />
                    {errors.city && (
                      <p className="text-xs font-semibold text-[#EF4444] mt-1">{errors.city.message}</p>
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
                      <option value="Web Development">Website Engineering</option>
                      <option value="SEO Dominance">SEO Dominance</option>
                      <option value="Meta & LinkedIn Ads">Meta & LinkedIn Ads</option>
                      <option value="Lead Generation">Lead Generation</option>
                    </select>
                  </div>
                </div>

                {/* Budget Range (INR) with Custom Entry Support */}
                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                    Monthly Budget (INR ₹) *
                  </label>
                  <select
                    value={budgetSelection}
                    onChange={handleBudgetDropdownChange}
                    className="w-full px-3.5 py-[9px] text-sm text-[#1C1C1C] bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#FF9D00] transition-colors font-mono-stats"
                  >
                    <option value="₹10K–25K">₹10,000 – ₹25,000</option>
                    <option value="₹25K–50K">₹25,000 – ₹50,000</option>
                    <option value="₹50K–1L">₹50,000 – ₹1,00,000</option>
                    <option value="₹1L+">₹1,00,000+ (Enterprise)</option>
                    <option value="custom">✏️ Custom Amount (Enter exact INR ₹)...</option>
                  </select>

                  {/* Custom Budget Text Input */}
                  {budgetSelection === 'custom' && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 relative"
                    >
                      <div className="absolute left-3 top-2.5 text-sm font-bold text-[#FF9D00] flex items-center">
                        ₹
                      </div>
                      <input
                        type="text"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        placeholder="Enter custom amount (e.g. 75,000 or 2.5 Lakhs)"
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
                    Project Goals / Details (Optional)
                  </label>
                  <textarea
                    {...register('message')}
                    rows={3}
                    placeholder="Briefly describe your targets or timeline..."
                    className="w-full px-3.5 py-[9px] text-sm text-[#1C1C1C] bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#FF9D00] transition-colors"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  variant="primary"
                  size="md"
                  className="w-full mt-2"
                >
                  <Send size={16} />
                  <span>{submitting ? 'Submitting Request...' : 'Submit Quote Request'}</span>
                </Button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
