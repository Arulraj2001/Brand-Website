import { NextResponse } from 'next/server';

export const revalidate = 86400; // Cache on server for 24 hours (86400 seconds)

const FALLBACK_RATES: Record<string, number> = {
  USD: 1.0,
  INR: 83.5,
  EUR: 0.92,
  GBP: 0.79,
  AUD: 1.52,
  CAD: 1.36,
};

export async function GET() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      throw new Error(`Exchange rate API responded with status ${res.status}`);
    }

    const data = await res.json();
    const liveRates = data.rates || {};

    const filteredRates: Record<string, number> = {
      USD: 1.0,
      INR: liveRates.INR || FALLBACK_RATES.INR,
      EUR: liveRates.EUR || FALLBACK_RATES.EUR,
      GBP: liveRates.GBP || FALLBACK_RATES.GBP,
      AUD: liveRates.AUD || FALLBACK_RATES.AUD,
      CAD: liveRates.CAD || FALLBACK_RATES.CAD,
    };

    return NextResponse.json({
      base: 'USD',
      rates: filteredRates,
      updated_at: new Date().toISOString(),
    });
  } catch (error) {
    console.warn('Using fallback exchange rates due to network/API error:', error);
    return NextResponse.json({
      base: 'USD',
      rates: FALLBACK_RATES,
      is_fallback: true,
      updated_at: new Date().toISOString(),
    });
  }
}
