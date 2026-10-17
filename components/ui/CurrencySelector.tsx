'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useCurrency, CURRENCIES, CurrencyCode } from './CurrencyContext';

interface CurrencySelectorProps {
  className?: string;
  variant?: 'pill' | 'dropdown';
}

export default function CurrencySelector({ className = '' }: CurrencySelectorProps) {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeConfig = CURRENCIES[currency] || CURRENCIES.USD;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-gray-200 bg-white/[0.05] border border-white/[0.1] rounded-lg hover:border-[#FFB800]/50 hover:text-white transition-all shadow-xs cursor-pointer focus:outline-none"
        aria-label="Select display currency"
      >
        <span className="text-sm shrink-0">{activeConfig.flag}</span>
        <span>{activeConfig.code} ({activeConfig.symbol})</span>
        <ChevronDown size={12} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-44 rounded-xl bg-[#0C0E18] border border-white/[0.12] shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-50 py-1 text-xs font-medium focus:outline-none backdrop-blur-xl animate-in fade-in-50 zoom-in-95">
          <div className="px-3 py-1 text-[10px] uppercase tracking-wider font-mono font-extrabold text-gray-400 border-b border-white/[0.08]">
            Display Currency
          </div>
          {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
            const item = CURRENCIES[code];
            const isSelected = currency === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => {
                  setCurrency(code);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-white/[0.06] hover:text-[#FFB800] transition-colors cursor-pointer ${
                  isSelected ? 'bg-[#FFB800]/15 text-[#FFB800] font-bold' : 'text-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{item.flag}</span>
                  <span>{item.code} ({item.symbol})</span>
                </div>
                <span className="text-[11px] text-gray-400 font-mono">{item.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
