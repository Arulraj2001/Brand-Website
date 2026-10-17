'use client';

import React, { use, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Phone,
  MessageSquare,
  Star,
  MapPin,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Calendar,
  Clock,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Award,
} from 'lucide-react';
import ArusythApexLogo from '@/components/ui/ArusythApexLogo';

interface PreviewClientViewProps {
  paramsPromise: Promise<{ niche: string }>;
}

export default function PreviewClientView({ paramsPromise }: PreviewClientViewProps) {
  const params = use(paramsPromise);
  const searchParams = useSearchParams();

  const businessName = searchParams.get('name') || 'Premier Realty & Construction';
  const phone = searchParams.get('phone') || '+91 9841844698';
  const cleanDigits = phone.replace(/\D/g, '');
  const displayPhone = cleanDigits.length === 10 ? `+91 ${cleanDigits}` : phone;
  const whatsappPhone = cleanDigits.startsWith('91') ? cleanDigits : `91${cleanDigits}`;

  const city = searchParams.get('city') || 'Chennai';
  const rating = parseFloat(searchParams.get('rating') || '5.0').toFixed(1);
  const reviews = parseInt(searchParams.get('reviews') || '40', 10);
  const category = searchParams.get('category') || 'Real Estate & Construction';

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    requirement: 'Residential Plot / Villa',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0E] text-white font-sans selection:bg-[#6366F1] selection:text-white pb-24 md:pb-12">
      {/* AGENCY PROOF / PREVIEW BAR */}
      <div className="bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#7C3AED] text-white px-4 py-2.5 text-xs font-semibold flex flex-col sm:flex-row items-center justify-between gap-2 shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="bg-white/20 text-white px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider">
            Live Preview
          </span>
          <span>
            Crafted for <strong className="underline underline-offset-2">{businessName}</strong> by Ostrune Web Architecture
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline text-white/90">
            Ready to launch on your domain in 48 hours
          </span>
          <a
            href="https://wa.me/918637474067?text=Hi%20Arulraj,%20I%20saw%20the%20website%20preview%20for%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#4F46E5] px-3 py-1 rounded-full text-xs font-bold hover:bg-gray-100 transition shadow-sm flex items-center gap-1"
          >
            Claim This Website
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* HEADER / NAVIGATION */}
      <header className="border-b border-white/10 bg-[#0E0E14]/80 backdrop-blur-md sticky top-[41px] z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#A855F7] flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-500/20">
              {businessName.charAt(0)}
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white block leading-tight">
                {businessName}
              </span>
              <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#6366F1]" />
                {city}, Tamil Nadu
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${cleanDigits}`}
              className="hidden sm:flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-white bg-white/5 border border-white/10 px-3.5 py-2 rounded-lg transition"
            >
              <Phone className="w-3.5 h-3.5 text-[#6366F1]" />
              {displayPhone}
            </a>
            <a
              href={`https://web.whatsapp.com/send?phone=${whatsappPhone}&text=Hello%20${encodeURIComponent(
                businessName
              )},%20I%20am%20interested%20in%20your%20projects.`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-black px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-green-500/20"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-black" />
              WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#6366F1]/20 to-[#A855F7]/20 blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-amber-300">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span>
              <strong>{rating} Rating</strong> on Google Maps ({reviews} Verified Customer Reviews)
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Building Trusted Homes & High-Value Properties in{' '}
            <span className="bg-gradient-to-r from-[#818CF8] via-[#C084FC] to-[#F472B6] bg-clip-text text-transparent">
              {city}
            </span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            From approved residential plots to turnkey luxury construction. Delivering 100% legal transparency, modern architectural plans, and on-time handover for every family.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href="#inquiry"
              className="w-full sm:w-auto bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#4F46E5] hover:to-[#7C3AED] text-white px-7 py-3 rounded-xl font-bold text-sm shadow-xl shadow-indigo-500/25 transition flex items-center justify-center gap-2"
            >
              Request Free Site Visit & Floor Plans
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`tel:${cleanDigits}`}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/15 border border-white/15 text-white px-6 py-3 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              Direct Call: {displayPhone}
            </a>
          </div>

          {/* Highlights Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-white/10 text-left">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
              <div className="text-xl font-extrabold text-white">100%</div>
              <div className="text-xs text-gray-400 mt-0.5">CMDA / DTCP Approved</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
              <div className="text-xl font-extrabold text-white">{reviews}+</div>
              <div className="text-xs text-gray-400 mt-0.5">Satisfied Clients</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
              <div className="text-xl font-extrabold text-white">₹0</div>
              <div className="text-xs text-gray-400 mt-0.5">Zero Hidden Charges</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
              <div className="text-xl font-extrabold text-white">On-Time</div>
              <div className="text-xs text-gray-400 mt-0.5">Guaranteed Handover</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES / PLOTS */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[#818CF8] uppercase tracking-wider">
              {category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Current Projects & Offerings
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-2 md:mt-0 max-w-md">
            Prime locations across {city} with ready-to-construct infrastructure, blacktop roads, and 24/7 sweet water facility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-gradient-to-b from-[#14141E] to-[#0E0E16] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#6366F1]/50 transition group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[#818CF8]">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#818CF8] transition">
                Gated Community Plots
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                CMDA and RERA approved residential villa plots in fast-growing appreciation corridors. Clear legal titles and bank loan approvals up to 80%.
              </p>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Plots from 600 to 2400 sq.ft
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Ready for immediate construction
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Fast document registration support
                </li>
              </ul>
            </div>
            <a
              href="#inquiry"
              className="mt-6 w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-center transition block"
            >
              Inquire Project Details
            </a>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-b from-[#14141E] to-[#0E0E16] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#A855F7]/50 transition group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#C084FC]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#C084FC] transition">
                Custom Villa Construction
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Turnkey residential construction with branded materials (Tata Steel, UltraTech, Teak wood). Complete 2D/3D elevation and structural planning included.
              </p>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Starting at ₹2,100 / sq.ft
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Weekly photo updates via WhatsApp
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  10-year structural warranty
                </li>
              </ul>
            </div>
            <a
              href="#inquiry"
              className="mt-6 w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-center transition block"
            >
              Get Cost Estimation
            </a>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-b from-[#14141E] to-[#0E0E16] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-pink-500/50 transition group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[#F472B6]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#F472B6] transition">
                Commercial & Renovation
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Specialized architectural design, office interior fit-outs, and second-floor additions with maximum space utilization and Vastu compliance.
              </p>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Commercial complex execution
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Complete building restoration
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Civil engineers on site daily
                </li>
              </ul>
            </div>
            <a
              href="#inquiry"
              className="mt-6 w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-center transition block"
            >
              Consult an Engineer
            </a>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE FORM SECTION */}
      <section id="inquiry" className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="bg-[#12121A] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-xl mx-auto text-center space-y-3 mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Schedule a Free Site Inspection
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Leave your details below and the team at{' '}
              <strong className="text-white">{businessName}</strong> will call you back within 30 minutes with layout maps and pricing.
            </p>
          </div>

          {formSubmitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-6 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400" />
              <h3 className="text-base font-bold">Inquiry Received!</h3>
              <p className="text-xs text-gray-300">
                This is a live working demonstration. The team at {businessName} would receive this lead directly via WhatsApp & SMS.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-3 text-xs underline text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 max-w-md mx-auto">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6366F1]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Mobile Number (for WhatsApp updates)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 98410 XXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6366F1]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Requirement</label>
                <select
                  value={formData.requirement}
                  onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                  className="w-full bg-[#1A1A24] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#6366F1]"
                >
                  <option value="Residential Plot">Residential Plot / Land</option>
                  <option value="Individual Villa Construction">Individual Villa Construction</option>
                  <option value="Commercial Complex">Commercial Complex</option>
                  <option value="House Renovation">House Renovation</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#4F46E5] hover:to-[#7C3AED] text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/30 transition flex items-center justify-center gap-2"
              >
                Send Request to {businessName}
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-gray-500 text-center">
                🔒 We respect your privacy. No spam calls. 100% verified documentation.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 px-4 text-center text-xs text-gray-500 space-y-2">
        <p>
          © {new Date().getFullYear()} {businessName}. All rights reserved. Registered office in {city}, Tamil Nadu.
        </p>
        <p className="text-[11px] text-gray-600">
          Website designed and powered by <strong className="text-gray-400">Ostrune Web Architecture</strong>.
        </p>
      </footer>

      {/* MOBILE STICKY FLOATING ACTION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0E0E14]/95 border-t border-white/10 p-3 flex gap-3 backdrop-blur-md z-50">
        <a
          href={`tel:${cleanDigits}`}
          className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-white/15"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-400" />
          Call
        </a>
        <a
          href={`https://web.whatsapp.com/send?phone=${whatsappPhone}&text=Hello%20${encodeURIComponent(
            businessName
          )},%20I%20am%20interested%20in%20your%20projects.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#25D366] text-black py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-green-500/20"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-black" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
