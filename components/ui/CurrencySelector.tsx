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
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-[#1C1C1C] bg-white border border-[#E5E7EB] rounded-lg hover:border-[#FF9D00] transition-colors shadow-xs cursor-pointer focus:outline-none"
        aria-label="Select display currency"
      >
        <span className="text-sm shrink-0">{activeConfig.flag}</span>
        <span>{activeConfig.code} ({activeConfig.symbol})</span>
        <ChevronDown size={12} className={`text-[#6B7280] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-44 rounded-lg bg-white border border-[#E5E7EB] shadow-lg z-50 py-1 text-xs font-medium focus:outline-none animate-in fade-in-50 zoom-in-95">
          <div className="px-3 py-1 text-[10px] uppercase tracking-wider font-extrabold text-[#9CA3AF] border-b border-[#E5E7EB]">
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
                className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-[#FFF9E6] hover:text-[#FF9D00] transition-colors cursor-pointer ${
                  isSelected ? 'bg-[#FFF9E6] text-[#FF9D00] font-bold' : 'text-[#1C1C1C]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{item.flag}</span>
                  <span>{item.code} ({item.symbol})</span>
                </div>
                <span className="text-[11px] text-[#6B7280]">{item.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
