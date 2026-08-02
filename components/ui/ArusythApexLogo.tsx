import React from 'react';

interface ArusythApexLogoProps {
  className?: string;
  size?: number;
}

export default function ArusythApexLogo({ className = '', size = 32 }: ArusythApexLogoProps) {
  return (
    <div
      className={`relative rounded-lg overflow-hidden bg-gradient-to-br from-[#FFD21E] via-[#FFC000] to-[#FF9D00] p-1.5 flex items-center justify-center border border-[#FFD21E] shadow-xs shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-[#1C1C1C]"
      >
        {/* Sleek Apex Geometric 'A' Emblem */}
        <path
          d="M12 2L3 20H8.5L12 12.5L15.5 20H21L12 2Z"
          fill="#1C1C1C"
        />
        <path
          d="M12 7.5L8.5 15H15.5L12 7.5Z"
          fill="#FFD21E"
        />
      </svg>
    </div>
  );
}
