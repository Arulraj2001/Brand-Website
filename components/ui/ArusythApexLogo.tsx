import React from 'react';

interface OstruneLogoProps {
  className?: string;
  size?: number;
}

export default function ArusythApexLogo({ className = '', size = 32 }: OstruneLogoProps) {
  return (
    <div
      className={`relative rounded-lg overflow-hidden bg-gradient-to-br from-[#FFD21E] via-[#FFC000] to-[#FF9D00] flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: size * 0.7, height: size * 0.7 }}
      >
        {/* Ostrune "O" with orbit arc — clean geometric mark */}
        {/* Outer O ring */}
        <circle cx="12" cy="12" r="7.5" stroke="#1C1C1C" strokeWidth="2.8" fill="none" />
        {/* Inner highlight dot */}
        <circle cx="12" cy="12" r="1.6" fill="#1C1C1C" />
        {/* Diagonal orbit arc slashing through */}
        <path
          d="M5.5 18.5 Q10 8 18.5 5.5"
          stroke="#1C1C1C"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
