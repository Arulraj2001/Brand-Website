'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurrencyCode = 'USD' | 'INR' | 'EUR' | 'GBP' | 'AUD' | 'CAD';

export interface CurrencyConfig {
  code: CurrencyCode;
  name: string;
  symbol: string;
  flag: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  INR: { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  AUD: { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  CAD: { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
};

const DEFAULT_RATES: Record<CurrencyCode, number> = {
  USD: 1.0,
  INR: 83.5,
  EUR: 0.92,
  GBP: 0.79,
  AUD: 1.52,
  CAD: 1.36,
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  rates: Record<CurrencyCode, number>;
  formatBudgetLabel: (usdRange: string) => string;
  convertAmount: (usdAmount: number) => { amount: number; formatted: string };
  isConverted: boolean;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'USD',
  setCurrency: () => {},
  rates: DEFAULT_RATES,
  formatBudgetLabel: (range) => range,
  convertAmount: (amt) => ({ amount: amt, formatted: `$${amt.toLocaleString()}` }),
  isConverted: false,
});

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [rates, setRates] = useState<Record<CurrencyCode, number>>(DEFAULT_RATES);

  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch('/api/exchange-rates');
        if (res.ok) {
          const data = await res.json();
          if (data.rates) {
            setRates((prev) => ({ ...prev, ...data.rates }));
          }
        }
      } catch (err) {
        console.warn('Failed to load exchange rates from API, using default rates', err);
      }
    }
    fetchRates();
  }, []);

  const rate = rates[currency] || 1.0;
  const config = CURRENCIES[currency] || CURRENCIES.USD;
  const isConverted = currency !== 'USD';

  const convertAmount = (usdAmount: number) => {
    const converted = Math.round(usdAmount * rate);
    const formatted = `${config.symbol}${converted.toLocaleString()}`;
    return { amount: converted, formatted };
  };

  const formatBudgetLabel = (usdRange: string): string => {
    if (currency === 'USD') return usdRange;

    // Parse USD ranges like "$50–$500", "$500–$1,000", "$1,000–$3,000", "$3,000–$5,000", "$5,000+"
    if (usdRange.includes('$50') && usdRange.includes('$500')) {
      const min = convertAmount(50).formatted;
      const max = convertAmount(500).formatted;
      return `$50 – $500 (≈ ${min} – ${max})`;
    }
    if (usdRange.includes('$500') && usdRange.includes('$1,000')) {
      const min = convertAmount(500).formatted;
      const max = convertAmount(1000).formatted;
      return `$500 – $1,000 (≈ ${min} – ${max})`;
    }
    if (usdRange.includes('$1,000') && usdRange.includes('$3,000')) {
      const min = convertAmount(1000).formatted;
      const max = convertAmount(3000).formatted;
      return `$1,000 – $3,000 (≈ ${min} – ${max})`;
    }
    if (usdRange.includes('$3,000') && usdRange.includes('$5,000')) {
      const min = convertAmount(3000).formatted;
      const max = convertAmount(5000).formatted;
      return `$3,000 – $5,000 (≈ ${min} – ${max})`;
    }
    if (usdRange.includes('$5,000+')) {
      const min = convertAmount(5000).formatted;
      return `$5,000+ (≈ ${min}+ Retainer)`;
    }

    return usdRange;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        rates,
        formatBudgetLabel,
        convertAmount,
        isConverted,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
