import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function GradientText({ children, className = '' }: GradientTextProps) {
  return (
    <span
      className={`text-[#FF9D00] bg-[#FFF9E6] px-1.5 py-[1px] rounded-[3px] border border-[#FFD21E]/60 inline-block leading-tight ${className}`}
    >
      {children}
    </span>
  );
}
