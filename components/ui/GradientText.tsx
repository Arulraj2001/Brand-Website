import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function GradientText({ children, className = '' }: GradientTextProps) {
  return (
    <span
      className={`font-serif italic font-normal text-[#FFB800] tracking-normal inline transition-all drop-shadow-[0_0_18px_rgba(255,184,0,0.35)] ${className}`}
      style={{ fontFamily: 'var(--font-playfair), Georgia, "Times New Roman", serif' }}
    >
      {children}
    </span>
  );
}
