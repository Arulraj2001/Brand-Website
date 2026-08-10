'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Sparkles, PhoneCall, Menu, X, ArrowRight, Globe } from 'lucide-react';
import Button from './Button';
import ArusythApexLogo from './ArusythApexLogo';
import { useSiteSettings } from '@/lib/useSiteData';
import { INITIAL_SITE_SETTINGS } from '@/lib/supabase/data';

export default function Navbar() {
  const { settings } = useSiteSettings();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
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
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#E5E7EB] h-[56px] flex items-center">
      <div className="max-w-[1200px] w-full mx-auto px-4 flex items-center justify-between">
        {/* Logo Left */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <ArusythApexLogo size={32} className="group-hover:scale-105 transition-transform" />
          <div className="flex items-center gap-1">
            <span className="font-extrabold text-lg text-[#1C1C1C] tracking-tight">
              {activeSettings.brand_name || 'Ostrune'}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#3B82F6] bg-[#3B82F6]/10 px-1.5 py-0.5 rounded-[4px] flex items-center gap-0.5">
              <Globe size={10} /> Global
            </span>
          </div>
        </Link>

        {/* Desktop Links Center */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[15px] font-semibold transition-colors relative py-1 ${
                  isActive
                    ? 'text-[#FF9D00]'
                    : 'text-[#1C1C1C] hover:text-[#FF9D00]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF9D00] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Right */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${cleanPhoneTel}`}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] hover:text-[#FF9D00] transition-colors"
          >
            <PhoneCall size={14} className="text-[#FF9D00]" />
            {activeSettings.phone}
          </a>
          <Button href="/contact" variant="primary" size="sm">
            <span>Book a Call</span>
            <ArrowRight size={14} />
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
        <div className="absolute top-[56px] left-0 right-0 md:hidden bg-white border-b border-[#E5E7EB] px-4 pt-3 pb-5 shadow-lg space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold py-2 px-3 rounded-lg ${
                  pathname === link.href
                    ? 'bg-[#FFF9E6] text-[#FF9D00]'
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
              className="flex items-center justify-center gap-2 text-xs font-semibold text-[#1C1C1C] py-2 bg-[#F9FAFB] rounded-lg"
            >
              <PhoneCall size={14} className="text-[#FF9D00]" />
              Call {settings.phone}
            </a>
            <Button href="/contact" variant="primary" size="sm" className="w-full">
              Book a Free Strategy Call
            </Button>
          </div>
        </div>
      )}

      {/* Left to Right Scroll Progress Indicator Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E5E7EB]/50 pointer-events-none overflow-hidden z-50">
        <div
          className="h-full bg-gradient-to-r from-[#FFD21E] via-[#FF9D00] to-[#10B981] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(255,157,0,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}
