'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, CheckCircle2, ShieldCheck, Clock, Phone, Mail, DollarSign } from 'lucide-react';
import { submitLead, INITIAL_SITE_SETTINGS } from '@/lib/supabase/data';
import { useSiteSettings } from '@/lib/useSiteData';

export default function AutoLeadModal() {
  const pathname = usePathname();
  const { settings } = useSiteSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    service_interested: 'Website Development',
    budget_range: '$1,000–$3,000',
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

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const activeSettings = mounted ? settings : INITIAL_SITE_SETTINGS;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
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
      message: formData.message || '5-Second Auto Popup Strategy Request',
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
                    <h2 className="text-2xl font-extrabold text-[#1C1C1C] tracking-tight">
                      Ready to Scale Your Website & Sales?
                    </h2>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      Get a free technical audit & 60% offshore engineering rate card delivered to your inbox.
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
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-[#E5E7EB] text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] bg-[#F9FAFB] focus:bg-white transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-extrabold text-[#1C1C1C] uppercase mb-1">
                          Service Interested
                        </label>
                        <select
                          value={formData.service_interested}
                          onChange={(e) => setFormData({ ...formData, service_interested: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-[#E5E7EB] text-[#1C1C1C] focus:outline-none focus:border-[#FF9D00] bg-[#F9FAFB] focus:bg-white transition-colors"
                        >
                          <option value="Website Development">Website Development</option>
                          <option value="Old Website Upgrade">Old Website Speed & SEO</option>
                          <option value="UGC Ads">UGC Video Ads</option>
                          <option value="App Development">App Development</option>
                          <option value="SEO Dominance">SEO Dominance</option>
                          <option value="Local Business Growth">Local Business Growth</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold text-[#1C1C1C] uppercase mb-1">
                        Budget Range (USD $)
                      </label>
                      <select
                        value={formData.budget_range}
                        onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#FFD21E] text-[#1C1C1C] bg-[#FFF9E6] font-bold focus:outline-none focus:border-[#FF9D00] transition-colors font-mono-stats"
                      >
                        <option value="$50–$500">🌱 $50–$500 (Starter)</option>
                        <option value="$500–$1,000">💼 $500–$1,000</option>
                        <option value="$1,000–$3,000">🚀 $1,000–$3,000 (Popular)</option>
                        <option value="$3,000–$5,000">⭐ $3,000–$5,000 (Enterprise)</option>
                        <option value="$5,000+">👑 $5,000+ (Custom Scale)</option>
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
