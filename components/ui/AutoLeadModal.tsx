'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, CheckCircle2, ShieldCheck, Clock, DollarSign } from 'lucide-react';
import { submitLead, INITIAL_SITE_SETTINGS } from '@/lib/supabase/data';
import { useSiteSettings } from '@/lib/useSiteData';
import CurrencySelector from '@/components/ui/CurrencySelector';
import { useCurrency, CURRENCIES } from '@/components/ui/CurrencyContext';
import { getBudgetOptionsForCurrency } from '@/lib/budgetOptions';

export default function AutoLeadModal() {
  const pathname = usePathname();
  const { settings } = useSiteSettings();
  const { currency, rates } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const activeCurrencyConfig = CURRENCIES[currency] || CURRENCIES.USD;
  const budgetTiers = getBudgetOptionsForCurrency(currency, rates);
  const defaultPopularBudget = budgetTiers.find((t) => t.value.includes('Popular'))?.value || budgetTiers[3]?.value || budgetTiers[0].value;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    service_interested: '',
    budget_range: defaultPopularBudget,
    message: '',
  });

  useEffect(() => {
    setMounted(true);
    // Don't trigger popup on admin routes
    if (pathname?.startsWith('/admin')) {
      return;
    }

    // Check if user has already seen popup in this browser session
    const hasSeen = sessionStorage.getItem('hasSeenLeadModal');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenLeadModal', 'true');
      }, 10000); // 10 Seconds Auto Popup Trigger

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Keep pre-selected budget tier in sync when user toggles any currency (USD, INR, EUR, GBP, AUD, CAD)
  useEffect(() => {
    const popularTier = budgetTiers.find((t) => t.value.includes('Popular'))?.value || budgetTiers[3]?.value || budgetTiers[0].value;
    setFormData((prev) => ({ ...prev, budget_range: popularTier }));
  }, [currency]);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const activeSettings = mounted ? settings : INITIAL_SITE_SETTINGS;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.service_interested) {
      return;
    }
    setSubmitting(true);
    const result = await submitLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      country: formData.country || 'Global Remote',
      service_interested: formData.service_interested,
      budget_range: formData.budget_range,
      message: formData.message || 'Auto Popup Strategy Request',
    });
    setSubmitting(false);
    if (result.success) {
      setSubmitted(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white border border-[#E5E7EB] rounded-2xl shadow-2xl overflow-hidden z-10 my-8"
          >
            {/* Top Accent Gradient Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#FFD21E] via-[#FF9D00] to-[#10B981]" />

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#6B7280] hover:text-[#1C1C1C] hover:bg-[#F9FAFB] transition-colors z-20"
              aria-label="Close popup"
            >
              <X size={20} />
            </button>

            <div className="p-6 sm:p-7 space-y-5">
              {submitted ? (
                /* Success State */
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#10B981]/15 text-[#10B981] mx-auto flex items-center justify-center border border-[#10B981]/30">
                    <CheckCircle2 size={32} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-[#1C1C1C]">
                      Strategy Request Received!
                    </h3>
                    <p className="text-sm text-[#6B7280] max-w-sm mx-auto">
                      Our lead technical architect will review your project and email a custom proposal within 12 hours.
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="px-6 py-2.5 bg-[#1C1C1C] text-white rounded-xl text-xs font-bold hover:bg-[#FF9D00] transition-colors"
                  >
                    Got It, Close Window
                  </button>
                </div>
              ) : (
                /* Form State */
                <>
                  {/* Header */}
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9E6] text-[#FF9D00] border border-[#FFD21E] text-xs font-extrabold">
                      <Sparkles size={13} className="animate-pulse text-[#FF9D00]" />
                      <span>Free 15-Min Strategy Call & Custom Quote</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#1C1C1C] tracking-tight leading-snug">
                      Get a Free Audit — We’ll Show You Exactly What’s Holding Your Site Back
                    </h2>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      Tell us your goal — we’ll send a free audit and a clear action plan within 12 hours.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-extrabold text-[#1C1C1C] uppercase mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Johnson"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-[#E5E7EB] text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] bg-[#F9FAFB] focus:bg-white transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-extrabold text-[#1C1C1C] uppercase mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@company.com"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-[#E5E7EB] text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] bg-[#F9FAFB] focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-extrabold text-[#1C1C1C] uppercase mb-1">
                          WhatsApp / Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Your WhatsApp number (with country code)"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-[#E5E7EB] text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] bg-[#F9FAFB] focus:bg-white transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-extrabold text-[#1C1C1C] uppercase mb-1">
                          Service Interested *
                        </label>
                        <select
                          required
                          value={formData.service_interested}
                          onChange={(e) => setFormData({ ...formData, service_interested: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-[#E5E7EB] text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] bg-[#F9FAFB] focus:bg-white transition-colors"
                        >
                          <option value="" disabled>Select a Service *</option>
                          <option value="Website Development">Website Development</option>
                          <option value="Old Website Upgrade">Old Website Speed & SEO</option>
                          <option value="UGC Ads">UGC Video Ads</option>
                          <option value="App Development">App Development</option>
                          <option value="SEO Dominance">SEO Dominance</option>
                          <option value="Local Business Growth">Local Business Growth</option>
                        </select>
                      </div>
                    </div>

                    {/* Budget Range UI with Currency Switcher */}
                    <div className="p-3 rounded-xl bg-gradient-to-r from-[#FFFDF5] via-[#FFF9E6] to-[#FFFDF5] border border-[#FFD21E] shadow-2xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-extrabold text-[#1C1C1C] uppercase flex items-center gap-1.5">
                          <div className="w-4 h-4 rounded bg-[#FFD21E] text-[#1C1C1C] flex items-center justify-center font-bold text-[10px] shrink-0">
                            <DollarSign size={11} className="stroke-[2.5]" />
                          </div>
                          <span>Budget Range ({activeCurrencyConfig.code} {activeCurrencyConfig.symbol})</span>
                        </label>
                        <CurrencySelector />
                      </div>

                      <select
                        value={formData.budget_range}
                        onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#FFD21E] text-[#1C1C1C] bg-white font-bold focus:outline-none focus:border-[#FF9D00] transition-colors font-mono-stats cursor-pointer"
                      >
                        {budgetTiers.map((tier) => (
                          <option key={tier.value} value={tier.value}>
                            {tier.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 bg-gradient-to-r from-[#FF9D00] to-[#FFAE1A] text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:from-[#E68E00] hover:to-[#FF9D00] transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {submitting ? (
                        <span>Submitting Proposal Request...</span>
                      ) : (
                        <>
                          <span>Get Free Proposal & Strategy Call</span>
                          <Send size={14} />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Trust Footer Badges */}
                  <div className="pt-2 flex items-center justify-between text-[11px] text-[#6B7280] font-semibold border-t border-[#E5E7EB]">
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-[#FF9D00]" /> 12h SLA Reply
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={12} className="text-[#3B82F6]" /> No Obligation
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-[#10B981]" /> 100% Confidential
                    </span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
