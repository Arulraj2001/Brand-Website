'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import ArusythApexLogo from './ArusythApexLogo';
import {
  LinkedInIcon,
  TwitterXIcon,
  InstagramIcon,
} from './SocialIcons';
import { useSiteSettings } from '@/lib/useSiteData';
import { getSiteUrl } from '@/lib/seo';

export default function Footer() {
  const siteUrl = getSiteUrl();
  const pathname = usePathname();
  const { settings } = useSiteSettings();

  // Hide footer completely on all admin routes (/admin, /admin/login)
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const activeSettings = settings;

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: activeSettings.brand_name || 'Ostrune',
    image: `${siteUrl}/logo.png`,
    '@id': siteUrl,
    url: siteUrl,
    telephone: activeSettings.phone || '+91 8637474067',
    email: activeSettings.email || 'arulraj8637@gmail.com',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: activeSettings.address || 'Tiruvannamalai, Tamil Nadu, India',
      addressCountry: 'India',
    },
    areaServed: ['India', 'Global'],
  };

  const whatsappClean = activeSettings.whatsapp_number.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-[#05060A] text-neutral-400 pt-16 pb-12 border-t border-white/[0.08] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#FFB800]/5 blur-[160px] pointer-events-none" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.08]">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <ArusythApexLogo size={32} />
              <span className="font-extrabold text-xl text-white tracking-tight">
                {activeSettings.brand_name || 'Ostrune'}
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-neutral-400">
              High-performance custom web engineering, cross-platform mobile apps, and high-ROAS acquisition engines for ambitious businesses worldwide.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {activeSettings.linkedin_url && (
                <a
                  href={activeSettings.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#0A66C2] hover:text-[#0A66C2] text-neutral-300 flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                  aria-label={`${activeSettings.brand_name || 'Ostrune'} LinkedIn`}
                >
                  <LinkedInIcon size={16} />
                </a>
              )}
              {activeSettings.twitter_url && (
                <a
                  href={activeSettings.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#1DA1F2] hover:text-[#1DA1F2] text-neutral-300 flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                  aria-label={`${activeSettings.brand_name || 'Ostrune'} Twitter / X`}
                >
                  <TwitterXIcon size={15} />
                </a>
              )}
              {activeSettings.instagram_url && (
                <a
                  href={activeSettings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#E4405F] hover:text-[#E4405F] text-neutral-300 flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                  aria-label={`${activeSettings.brand_name || 'Ostrune'} Instagram`}
                >
                  <InstagramIcon size={16} />
                </a>
              )}
              <a
                href={`https://wa.me/${whatsappClean}?text=${encodeURIComponent(`Hi ${activeSettings.brand_name || 'Ostrune'}! I want to book a strategy call.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity min-h-[44px] min-w-[44px] shadow-sm"
                aria-label={`${activeSettings.brand_name || 'Ostrune'} WhatsApp`}
              >
                <WhatsAppIcon size={16} fill="white" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3 font-mono">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-[#FFB800] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FFB800] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#FFB800] transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/student-projects" className="hover:text-[#FFB800] transition-colors flex items-center gap-1 text-[#FFB800]">
                  Student Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#FFB800] transition-colors">
                  Engineering Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FFB800] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-3 font-mono">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/website-speed-upgrade" className="hover:text-[#FFB800] transition-colors">
                  Old Website Upgrade
                </Link>
              </li>
              <li>
                <Link href="/services/ugc-video-ads" className="hover:text-[#FFB800] transition-colors">
                  UGC Video Ads
                </Link>
              </li>
              <li>
                <Link href="/services/website-development" className="hover:text-[#FFB800] transition-colors">
                  Website Engineering
                </Link>
              </li>
              <li>
                <Link href="/services/app-development" className="hover:text-[#FFB800] transition-colors">
                  Mobile App Development
                </Link>
              </li>
              <li>
                <Link href="/services/seo-optimization" className="hover:text-[#FFB800] transition-colors">
                  Technical SEO &amp; Schema
                </Link>
              </li>
              <li>
                <Link href="/services/local-business-marketing" className="hover:text-[#FFB800] transition-colors">
                  Lead Gen Funnels
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-3 font-mono">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Global Operations</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-[#FFB800] shrink-0 mt-0.5" />
                <span>{activeSettings.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-[#FFB800] shrink-0" />
                <a href={`tel:${activeSettings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#FFB800]">
                  {activeSettings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-[#FFB800] shrink-0" />
                <a href={`mailto:${activeSettings.email}`} className="hover:text-[#FFB800]">
                  {activeSettings.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Reach Footer Line */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-[#00F0FF]" />
            <span>Serving Clients Worldwide • Next.js, React, Node, Python • Shopify, WordPress &amp; Wix</span>
          </div>
          <div className="flex items-center gap-3">
            <p>© {new Date().getFullYear()} {activeSettings.brand_name || 'Ostrune'}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
