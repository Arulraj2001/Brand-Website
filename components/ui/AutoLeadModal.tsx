'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, CheckCircle2, ShieldCheck, Clock, DollarSign } from 'lucide-react';
import { submitLead } from '@/lib/supabase/data';
import CurrencySelector from '@/components/ui/CurrencySelector';
import { useCurrency, CURRENCIES } from '@/components/ui/CurrencyContext';
import { getBudgetOptionsForCurrency } from '@/lib/budgetOptions';

export default function AutoLeadModal() {
  const pathname = usePathname();
  const { currency, rates } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
    // Don't trigger popup on admin routes
    if (pathname?.startsWith('/admin')) {
      return;
    }

    // 24-hour dismissal check
    const DISMISS_KEY = 'ostrune_lead_modal_dismissed_at';
    const lastDismissed = localStorage.getItem(DISMISS_KEY);
    if (lastDismissed) {
      const elapsed = Date.now() - parseInt(lastDismissed, 10);
      if (elapsed < 24 * 60 * 60 * 1000) {
        return; // Suppressed for 24 hours
      }
    }

    // Session check
    if (sessionStorage.getItem('hasSeenLeadModal')) {
      return;
    }

    let triggered = false;
    const triggerModal = () => {
      if (triggered) return;
      triggered = true;
      setIsOpen(true);
      sessionStorage.setItem('hasSeenLeadModal', 'true');
      cleanup();
    };

    // Trigger 1: Fallback timer (25s)
    const timer = setTimeout(() => {
      triggerModal();
    }, 25000);

    // Trigger 2: Exit intent (desktop mouse leaving viewport top)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 15) {
        triggerModal();
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);

    // Trigger 3: 50% scroll depth
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0 && scrollY / totalHeight >= 0.5) {
        triggerModal();
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const cleanup = () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };

    return cleanup;
  }, [pathname]);

  // Keep pre-selected budget tier in sync when user toggles any currency (USD, INR, EUR, GBP, AUD, CAD)
  useEffect(() => {
    Promise.resolve().then(() => {
      setFormData((prev) => ({ ...prev, budget_range: defaultPopularBudget }));
    });
  }, [defaultPopularBudget]);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

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
      localStorage.setItem('ostrune_lead_modal_dismissed_at', Date.now().toString());
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    localStorage.setItem('ostrune_lead_modal_dismissed_at', Date.now().toString());
    sessionStorage.setItem('hasSeenLeadModal', 'true');
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
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg cyber-form-panel overflow-hidden z-10 my-8 backdrop-blur-2xl text-white"
          >
            {/* Top Accent Gradient Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#FFB800] via-[#00F0FF] to-[#10B981]" />

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/[0.08] transition-colors z-20"
              aria-label="Close popup"
            >
              <X size={20} />
            </button>

            <div className="p-6 sm:p-7 space-y-5">
              {submitted ? (
                /* Success State */
                <div className="py-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#10B981]/20 text-[#10B981] mx-auto flex items-center justify-center border border-[#10B981]/30 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
                    <CheckCircle2 size={32} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-white">
                      Architecture &amp; Scope Request Received
                    </h3>
                    <p className="text-sm text-gray-300 max-w-sm mx-auto font-light">
                      Our lead technical architect will review your project and transmit a custom dossier and stack scope within 12 hours.
                    </p>
                  </div>
                  <div className="p-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-left space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#FFB800] uppercase">
                      <Sparkles size={13} />
                      <span>Immediate Direct Consultation</span>
                    </div>
                    <p className="text-xs text-gray-300 font-light">
                      Connect directly with engineering leadership on WhatsApp for real-time scope validation and instant quote.
                    </p>
                    <a
                      href="https://wa.me/919943632731?text=Hi%20Ostrune%2C%20I%20just%20submitted%20a%20project%20inquiry%20and%20want%20to%20discuss%20the%20scope."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-[#25D366] text-black rounded-xl text-xs font-bold transition-all shadow-lg shadow-green-500/20 hover:bg-[#20bd5a]"
                    >
                      <span>Chat on WhatsApp Now</span>
                    </a>
                  </div>
                  <button
                    onClick={closeModal}
                    className="px-6 py-2 bg-white/[0.06] hover:bg-white/[0.1] text-gray-300 hover:text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Got It, Close Terminal
                  </button>
                </div>
              ) : (
                /* Form State */
                <>
                  {/* Header */}
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/30 text-xs font-mono font-bold">
                      <Sparkles size={13} className="animate-pulse text-[#FFB800]" />
                      <span>FREE ARCHITECTURE &amp; SCOPE REVIEW</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                      Tell Us What You&apos;re Building — Get Architecture &amp; Quote in 12h
                    </h2>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      Custom websites (any stack), mobile applications (iOS/Android), or predictable lead generation — our lead architects will prepare your scope today.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Johnson"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-white/[0.1] text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB800] focus:ring-1 focus:ring-[#FFB800]/40 bg-white/[0.04] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@company.com"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-white/[0.1] text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB800] focus:ring-1 focus:ring-[#FFB800]/40 bg-white/[0.04] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
                          WhatsApp / Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Your WhatsApp number (with country code)"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-white/[0.1] text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB800] focus:ring-1 focus:ring-[#FFB800]/40 bg-white/[0.04] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
                          Service Interested *
                        </label>
                        <select
                          required
                          value={formData.service_interested}
                          onChange={(e) => setFormData({ ...formData, service_interested: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-white/[0.1] text-white bg-[#101322] focus:outline-none focus:border-[#FFB800] transition-colors"
                        >
                          <option value="" disabled>Select a Service *</option>
                          <option value="Custom Website Development">Custom Website (Any Tech Stack: Next.js/React/Node/Python)</option>
                          <option value="Mobile App Development">Mobile App Development (iOS &amp; Android)</option>
                          <option value="Predictable Lead Generation">Predictable B2B &amp; E-Commerce Lead Generation</option>
                          <option value="Website Speed Upgrade">Old Website Speed &amp; 100/100 Core Web Vitals</option>
                          <option value="Technical SEO & Ads">Technical SEO, Meta &amp; LinkedIn Ads</option>
                        </select>
                      </div>
                    </div>

                    {/* Budget Range UI with Currency Switcher */}
                    <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-gray-200 uppercase flex items-center gap-1.5">
                          <div className="w-4 h-4 rounded bg-[#FFB800]/20 text-[#FFB800] flex items-center justify-center font-bold text-[10px] shrink-0 border border-[#FFB800]/40">
                            <DollarSign size={11} className="stroke-[2.5]" />
                          </div>
                          <span>Budget Allocation ({activeCurrencyConfig.code} {activeCurrencyConfig.symbol})</span>
                        </label>
                        <CurrencySelector />
                      </div>

                      <select
                        value={formData.budget_range}
                        onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-white/[0.1] text-white bg-[#101322] font-bold focus:outline-none focus:border-[#FFB800] transition-colors font-mono cursor-pointer"
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
                      className="w-full py-3 bg-gradient-to-r from-[#FFB800] to-[#FF9500] hover:from-[#FF9500] hover:to-[#FFB800] text-black font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,184,0,0.25)] transition-all disabled:opacity-50 cursor-pointer"
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
                  <div className="pt-2 flex items-center justify-between text-[11px] text-gray-400 font-medium border-t border-white/[0.08]">
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-[#FFB800]" /> Fast Turnaround
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={12} className="text-[#00F0FF]" /> No Obligation
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
