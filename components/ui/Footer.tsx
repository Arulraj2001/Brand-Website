'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Sparkles, Mail, Phone, MapPin, Globe, ShieldCheck } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import ArusythApexLogo from './ArusythApexLogo';
import {
  LinkedInIcon,
  TwitterXIcon,
  InstagramIcon,
  GitHubIcon,
  YouTubeIcon,
  FacebookIcon,
} from './SocialIcons';
import { useSiteSettings } from '@/lib/useSiteData';
import { INITIAL_SITE_SETTINGS } from '@/lib/supabase/data';

export default function Footer() {
  const pathname = usePathname();
  const { settings } = useSiteSettings();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Hide footer completely on all admin routes (/admin, /admin/login)
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const activeSettings = mounted ? settings : INITIAL_SITE_SETTINGS;

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: activeSettings.brand_name || 'Ostrune',
    image: 'https://ostrune.netlify.app/logo.png',
    '@id': 'https://ostrune.netlify.app',
    url: 'https://ostrune.netlify.app',
    telephone: activeSettings.phone,
    email: activeSettings.email,
    priceRange: '$100 - $10,000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: activeSettings.address,
      addressCountry: 'Worldwide',
    },
    areaServed: 'Worldwide',
  };

  const whatsappClean = activeSettings.whatsapp_number.replace(/[^0-9]/g, '');

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
            <Link href="/" className="flex items-center gap-2.5">
              <ArusythApexLogo size={32} />
              <span className="font-extrabold text-xl text-[#1C1C1C] tracking-tight">
                {activeSettings.brand_name || 'Ostrune'}
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-[#6B7280]">
              Affordable premium web engineering, old website speed overhauls, UGC video ads, and SEO dominance for growing businesses worldwide.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {activeSettings.linkedin_url && (
                <a
                  href={activeSettings.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white border border-[#E5E7EB] hover:border-[#0A66C2] hover:text-[#0A66C2] text-[#1C1C1C] flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
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
                  className="w-9 h-9 rounded-lg bg-white border border-[#E5E7EB] hover:border-[#1DA1F2] hover:text-[#1DA1F2] text-[#1C1C1C] flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
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
                  className="w-9 h-9 rounded-lg bg-white border border-[#E5E7EB] hover:border-[#E4405F] hover:text-[#E4405F] text-[#1C1C1C] flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                  aria-label={`${activeSettings.brand_name || 'Ostrune'} Instagram`}
                >
                  <InstagramIcon size={16} />
                </a>
              )}
              <a
                href={`https://wa.me/${whatsappClean}?text=${encodeURIComponent(`Hi ${activeSettings.brand_name || 'Ostrune'}! I want to book a strategy call.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity min-h-[44px] min-w-[44px]"
                aria-label={`${activeSettings.brand_name || 'Ostrune'} WhatsApp`}
              >
                <WhatsAppIcon size={16} fill="white" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-[#1C1C1C] font-bold text-sm">Company</h4>
            <ul className="space-y-2 text-sm">
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
                <Link href="/student-projects" className="hover:text-[#FF9D00] transition-colors flex items-center gap-1 text-[#FF9D00] font-medium">
                  Student Projects (Learnithm)
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#FF9D00] transition-colors">
                  Engineering Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FF9D00] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-2.5">
            <h4 className="text-[#1C1C1C] font-bold text-sm">Growth Solutions</h4>
            <ul className="space-y-2 text-sm">
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
                <span>{activeSettings.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-[#FF9D00] shrink-0" />
                <a href={`tel:${activeSettings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#FF9D00]">
                  {activeSettings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-[#FF9D00] shrink-0" />
                <a href={`mailto:${activeSettings.email}`} className="hover:text-[#FF9D00]">
                  {activeSettings.email}
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
              <strong>Serving Clients Worldwide</strong>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <p>© {new Date().getFullYear()} {activeSettings.brand_name || 'Ostrune'}. All rights reserved.</p>
            <Link
              href="/admin/login"
              className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#FF9D00] hover:bg-white border border-transparent hover:border-[#E5E7EB] transition-colors"
              title="Admin Portal Login"
              aria-label="Admin Portal Login"
            >
              <ShieldCheck size={16} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
