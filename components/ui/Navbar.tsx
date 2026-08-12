'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PhoneCall, Menu, X, ArrowRight, Globe } from 'lucide-react';
import Button from './Button';
import ArusythApexLogo from './ArusythApexLogo';
import { useSiteSettings } from '@/lib/useSiteData';
import { INITIAL_SITE_SETTINGS } from '@/lib/supabase/data';

export default function Navbar() {
  const { settings } = useSiteSettings();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Student Projects', href: '/student-projects' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const activeSettings = mounted ? settings : INITIAL_SITE_SETTINGS;
  const cleanPhoneTel = activeSettings.phone.replace(/[^0-9+]/g, '');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-2 px-2 sm:px-4' : 'py-0'
      }`}
    >
      <div
        className={`max-w-[1200px] w-full mx-auto px-4 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border border-[#E5E7EB] rounded-2xl shadow-md h-[52px]'
            : 'bg-white border-b border-[#E5E7EB] h-[56px]'
        }`}
      >
        {/* Logo Left */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <ArusythApexLogo size={30} className="group-hover:scale-105 transition-transform" />
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-base sm:text-lg text-[#1C1C1C] tracking-tight">
              {activeSettings.brand_name || 'Ostrune'}
            </span>
            <span className="text-[10px] font-mono-stats font-bold text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/30 px-2 py-0.5 rounded-full hidden sm:flex items-center gap-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10B981]" />
              </span>
              <span>12h SLA</span>
            </span>
          </div>
        </Link>

        {/* Desktop Links Center */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-all duration-200 ${
                  isActive
                    ? 'bg-[#FFF9E6] text-[#FF9D00] border border-[#FFD21E]/80 px-3.5 py-1 rounded-full text-[14px] font-extrabold shadow-2xs'
                    : 'text-[#1C1C1C] hover:text-[#FF9D00] hover:bg-[#F9FAFB] px-3 py-1 rounded-lg text-[14px] font-bold'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA Right */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href={`tel:${cleanPhoneTel}`}
            className="flex items-center gap-2 text-xs font-bold text-[#1C1C1C] hover:text-[#10B981] transition-colors group"
          >
            <div className="relative w-7 h-7 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/40 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
              <span className="absolute inset-0 rounded-full bg-[#10B981]/20 animate-ping opacity-60" />
              <PhoneCall size={13} className="animate-phone-ring relative z-10 text-[#10B981]" />
            </div>
            <span className="font-mono-stats">{activeSettings.phone}</span>
          </a>
          <Button href="/contact" variant="primary" size="sm">
            <span>Book a Call</span>
            <ArrowRight size={13} />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-lg text-[#1C1C1C] hover:bg-[#F9FAFB]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-[56px] left-2 right-2 md:hidden bg-white border border-[#E5E7EB] rounded-2xl px-4 pt-3 pb-5 shadow-xl space-y-3 mt-1 z-50">
          <nav className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-xs font-bold py-2.5 px-3.5 rounded-xl transition-colors ${
                  pathname === link.href
                    ? 'bg-[#FFF9E6] text-[#FF9D00] border border-[#FFD21E]'
                    : 'text-[#1C1C1C] hover:bg-[#F9FAFB]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-2 border-t border-[#E5E7EB] flex flex-col gap-2">
            <a
              href={`tel:${cleanPhoneTel}`}
              className="flex items-center justify-center gap-2 text-xs font-bold text-[#1C1C1C] py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl hover:border-[#10B981] transition-colors"
            >
              <PhoneCall size={15} className="text-[#10B981] animate-phone-ring" />
              <span>Call {settings.phone}</span>
            </a>
            <Button href="/contact" variant="primary" size="sm" className="w-full">
              Book a Free Strategy Call
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
