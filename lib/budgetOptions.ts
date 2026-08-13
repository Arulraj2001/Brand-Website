import { CurrencyCode, CURRENCIES } from '@/components/ui/CurrencyContext';

export interface BudgetOption {
  value: string;
  label: string;
}

export const USD_BUDGET_OPTIONS: BudgetOption[] = [
  { value: '$50–$200 (Starter)', label: '🌱 $50–$200 (Starter)' },
  { value: '$200–$500', label: '💼 $200–$500' },
  { value: '$500–$1,000', label: '⚡ $500–$1,000' },
  { value: '$1,000–$3,000 (Popular)', label: '🚀 $1,000–$3,000 (Popular)' },
  { value: '$3,000–$5,000 (Enterprise)', label: '⭐ $3,000–$5,000 (Enterprise)' },
  { value: '$5,000+ (Custom Scale)', label: '👑 $5,000+ (Custom Scale)' },
];

export const INR_BUDGET_OPTIONS: BudgetOption[] = [
  { value: '₹4,000–₹10,000 (Starter)', label: '🌱 ₹4,000–₹10,000 (Starter)' },
  { value: '₹10,000–₹25,000', label: '💼 ₹10,000–₹25,000' },
  { value: '₹25,000–₹50,000', label: '⚡ ₹25,000–₹50,000' },
  { value: '₹50,000–₹1,00,000 (Popular)', label: '🚀 ₹50,000–₹1,00,000 (Popular)' },
  { value: '₹1,00,000–₹2,50,000 (Enterprise)', label: '⭐ ₹1,00,000–₹2,50,000 (Enterprise)' },
  { value: '₹2,50,000+ (Custom Scale)', label: '👑 ₹2,50,000+ (Custom Scale)' },
];

export function getBudgetOptionsForCurrency(
  currency: CurrencyCode,
  rates?: Record<CurrencyCode, number>
): BudgetOption[] {
  if (currency === 'INR') {
    return INR_BUDGET_OPTIONS;
  }

  if (currency === 'USD') {
    return USD_BUDGET_OPTIONS;
  }

  const config = CURRENCIES[currency] || CURRENCIES.USD;
  const rate = (rates && rates[currency]) || 1.0;
  const sym = config.symbol;

  const formatVal = (usdVal: number) => {
    const converted = Math.round(usdVal * rate);
    if (converted >= 1000) {
      const rounded = Math.round(converted / 50) * 50;
      return `${sym}${rounded.toLocaleString()}`;
    }
    return `${sym}${converted.toLocaleString()}`;
  };

  const v1 = `${formatVal(50)}–${formatVal(200)} (Starter)`;
  const v2 = `${formatVal(200)}–${formatVal(500)}`;
  const v3 = `${formatVal(500)}–${formatVal(1000)}`;
  const v4 = `${formatVal(1000)}–${formatVal(3000)} (Popular)`;
  const v5 = `${formatVal(3000)}–${formatVal(5000)} (Enterprise)`;
  const v6 = `${formatVal(5000)}+ (Custom Scale)`;

  return [
    { value: v1, label: `🌱 ${v1}` },
    { value: v2, label: `💼 ${v2}` },
    { value: v3, label: `⚡ ${v3}` },
    { value: v4, label: `🚀 ${v4}` },
    { value: v5, label: `⭐ ${v5}` },
    { value: v6, label: `👑 ${v6}` },
  ];
}
