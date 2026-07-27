'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Mail, Phone, MapPin, Globe } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { useSiteSettings } from '@/lib/useSiteData';

export default function Footer() {
  const pathname = usePathname();
  const { settings } = useSiteSettings();

  // Hide footer completely on all admin routes (/admin, /admin/login)
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ApexPulse Digital Agency',
    image: 'https://apexpulse.in/logo.png',
    '@id': 'https://apexpulse.in',
    url: 'https://apexpulse.in',
    telephone: settings.phone,
    email: settings.email,
    priceRange: '$500 - $10,000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.address,
      addressLocality: 'Austin',
      addressRegion: 'TX',
      postalCode: '78701',
      addressCountry: 'US',
    },
    areaServed: [
      'United States',
      'United Kingdom',
      'Canada',
      'Australia',
      'Europe',
    ],
  };

  const whatsappClean = settings.whatsapp_number.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-[#F9FAFB] text-[#6B7280] pt-12 pb-10 border-t border-[#E5E7EB]">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#E5E7EB]">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFD21E] text-[#1C1C1C] flex items-center justify-center font-bold border border-[#E5E7EB]">
                <Sparkles size={16} />
              </div>
              <span className="font-extrabold text-xl text-[#1C1C1C] tracking-tight">
                Apex<span className="text-[#FF9D00]">Pulse</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-[#6B7280]">
              Affordable premium web engineering, old website speed overhauls, UGC video ads, and SEO dominance for growing businesses across the US, UK, Canada, Australia & Europe.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              {settings.linkedin_url && (
                <a
                  href={settings.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white border border-[#E5E7EB] hover:border-[#FF9D00] hover:text-[#FF9D00] text-[#1C1C1C] flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                  aria-label="ApexPulse LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
              )}
              {settings.twitter_url && (
                <a
                  href={settings.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white border border-[#E5E7EB] hover:border-[#FF9D00] hover:text-[#FF9D00] text-[#1C1C1C] flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                  aria-label="ApexPulse Twitter"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
              )}
              {settings.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white border border-[#E5E7EB] hover:border-[#FF9D00] hover:text-[#FF9D00] text-[#1C1C1C] flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                  aria-label="ApexPulse Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
              <a
                href={`https://wa.me/${whatsappClean}?text=Hi%20ApexPulse!%20I%20want%20to%20book%20a%20strategy%20call.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#25D366] text-white flex items-center justify-center hover:bg-[#20bd5a] transition-colors min-h-[44px] min-w-[44px]"
                aria-label="ApexPulse WhatsApp"
              >
                <WhatsAppIcon size={20} fill="white" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-[#1C1C1C] font-bold text-sm">Company</h4>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link href="/" className="hover:text-[#FF9D00] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FF9D00] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#FF9D00] transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#FF9D00] transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#FF9D00] transition-colors">
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FF9D00] transition-colors">
                  Book a Strategy Call
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-[#FF9D00] transition-colors text-xs text-[#9CA3AF]">
                  Admin Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-2.5">
            <h4 className="text-[#1C1C1C] font-bold text-sm">Services</h4>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link href="/services#website-upgrade" className="hover:text-[#FF9D00] transition-colors">
                  Old Website Upgrade
                </Link>
              </li>
              <li>
                <Link href="/services#ugc-ads" className="hover:text-[#FF9D00] transition-colors">
                  UGC Video Ads
                </Link>
              </li>
              <li>
                <Link href="/services#web-dev" className="hover:text-[#FF9D00] transition-colors">
                  Website Development
                </Link>
              </li>
              <li>
                <Link href="/services#app-dev" className="hover:text-[#FF9D00] transition-colors">
                  App Development
                </Link>
              </li>
              <li>
                <Link href="/services#seo" className="hover:text-[#FF9D00] transition-colors">
                  SEO Optimization
                </Link>
              </li>
              <li>
                <Link href="/services#local-business" className="hover:text-[#FF9D00] transition-colors">
                  Local Business Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-2.5">
            <h4 className="text-[#1C1C1C] font-bold text-sm">Global HQ</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="text-[#FF9D00] shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-[#FF9D00] shrink-0" />
                <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#FF9D00]">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-[#FF9D00] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-[#FF9D00]">
                  {settings.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Reach Footer Line */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#6B7280]">
          <div className="flex items-center gap-1.5">
            <Globe size={14} className="text-[#3B82F6]" />
            <span>
              <strong>Serving Clients Worldwide:</strong> United States • United Kingdom • Canada • Australia • Europe
            </span>
          </div>
          <p>© {new Date().getFullYear()} ApexPulse Global Digital Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
