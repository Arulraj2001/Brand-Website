'use client';

import React from 'react';
import { MapPin, Compass, Sparkles } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';

const CITIES = [
  { name: 'Bengaluru', tier: 'IT & FinTech Hub', state: 'Karnataka' },
  { name: 'Mumbai', tier: 'Financial Capital', state: 'Maharashtra' },
  { name: 'Delhi NCR', tier: 'Corporate & D2C', state: 'Delhi/Haryana/UP' },
  { name: 'Hyderabad', tier: 'Pharma & Tech Hub', state: 'Telangana' },
  { name: 'Chennai', tier: 'SaaS & Enterprise', state: 'Tamil Nadu' },
  { name: 'Pune', tier: 'Automotive & SaaS', state: 'Maharashtra' },
  { name: 'Ahmedabad', tier: 'Manufacturing & Commerce', state: 'Gujarat' },
  { name: 'Kolkata', tier: 'Trade & Logistics', state: 'West Bengal' },
];

export default function CitiesServedSection() {
  return (
    <section className="py-16 bg-[#F9FAFB] border-t border-[#E5E7EB] relative overflow-hidden bg-line-pattern">
      <div className="max-w-[1200px] mx-auto px-4 text-center">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] text-xs font-bold border border-[#E5E7EB]">
            <Compass size={14} className="text-[#1C1C1C]" />
            National Service Footprint
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] tracking-tight">
            Serving Growing Businesses <GradientText>Across India</GradientText>
          </h2>
          <p className="text-sm text-[#6B7280]">
            Deep understanding of local commercial search behavior, regional buyer personas, and multi-state compliance.
          </p>
        </div>

        {/* City Pills Tag Grid */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {CITIES.map((city, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-[4px] bg-white border border-[#E5E7EB] shadow-xs hover:border-[#FF9D00] transition-colors group"
            >
              <div className="w-7 h-7 rounded-[4px] bg-[#FFD21E] text-[#1C1C1C] flex items-center justify-center font-bold">
                <MapPin size={14} />
              </div>
              <div className="text-left">
                <p className="font-bold text-[#1C1C1C] text-xs group-hover:text-[#FF9D00] transition-colors">
                  {city.name}
                </p>
                <p className="text-[10px] text-[#6B7280]">{city.tier}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
