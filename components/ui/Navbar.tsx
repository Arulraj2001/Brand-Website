'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PhoneCall, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import ArusythApexLogo from './ArusythApexLogo';
import { useSiteSettings } from '@/lib/useSiteData';

export default function Navbar() {
  const { settings } = useSiteSettings();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hide public navbar completely on admin routes (/admin, /admin/login)
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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

  const activeSettings = settings;
  const cleanPhoneTel = activeSettings.phone.replace(/[^0-9+]/g, '');

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 pt-3 pointer-events-none transition-all duration-300">
      <div
        className={`max-w-[1200px] w-full mx-auto px-4 sm:px-5 flex items-center justify-between transition-all duration-300 pointer-events-auto rounded-full ${
          scrolled
            ? 'h-[54px] bg-[#090A12]/80 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'h-[58px] bg-[#090A12]/60 backdrop-blur-xl border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
        }`}
      >
        {/* Logo Left */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <ArusythApexLogo size={28} className="group-hover:scale-105 transition-transform" />
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-tight text-white group-hover:text-[#FFB800] transition-colors">
              {activeSettings.brand_name || 'Ostrune'}
            </span>
            <span className="text-[10px] font-mono font-bold text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20 px-2 py-0.5 rounded-full hidden sm:flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
              <span>Available for Projects</span>
            </span>
          </div>
        </Link>

        {/* Desktop Links Center */}
        <nav className="hidden lg:flex items-center gap-1 p-1 bg-white/[0.03] border border-white/[0.06] rounded-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                prefetch={true}
                className={`relative px-3.5 py-1 text-xs font-bold transition-all duration-200 rounded-full ${
                  isActive
                    ? 'text-[#FFB800] bg-white/[0.08] border border-[#FFB800]/30 shadow-xs'
                    : 'text-neutral-300 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Group */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href={`tel:${cleanPhoneTel}`}
            className="flex items-center gap-2 text-xs font-mono font-semibold text-neutral-300 hover:text-white transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 flex items-center justify-center">
              <PhoneCall size={12} className="animate-phone-ring text-[#10B981]" />
            </div>
            <span className="hidden xl:inline">{activeSettings.phone}</span>
          </a>

          <Link
            href="/contact"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black tracking-tight bg-gradient-to-r from-[#FFB800] to-[#FF9500] text-black shadow-[0_0_20px_rgba(255,184,0,0.35)] hover:shadow-[0_0_28px_rgba(255,184,0,0.5)] hover:scale-105 active:scale-95 transition-all"
          >
            <span>Start Sprint</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer (Frosted Smoked Glass) */}
      {mobileMenuOpen && (
        <div className="mt-2 max-w-[1200px] mx-auto lg:hidden bg-[#090A12]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl pointer-events-auto space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                prefetch={true}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-xs font-bold py-2.5 px-3.5 rounded-xl transition-colors ${
                  pathname === link.href
                    ? 'bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/30'
                    : 'text-neutral-300 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <a
              href={`tel:${cleanPhoneTel}`}
              className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-neutral-200 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl"
            >
              <PhoneCall size={14} className="text-[#10B981]" />
              <span>Call {settings.phone}</span>
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-[#FFB800] to-[#FF9500] text-black shadow-lg"
            >
              <span>Book Free Strategy Sprint</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
