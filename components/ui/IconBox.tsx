import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconBoxProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'success';
}

export default function IconBox({
  icon: Icon,
  size = 20,
  className = '',
  variant = 'primary',
}: IconBoxProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-white/[0.05] text-white border-white/[0.1]';
      case 'accent':
        return 'bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF]/30 shadow-[0_0_15px_rgba(0,240,255,0.15)]';
      case 'success':
        return 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]';
      default:
        return 'bg-[#FFB800]/15 text-[#FFB800] border-[#FFB800]/30 shadow-[0_0_15px_rgba(255,184,0,0.15)]';
    }
  };

  return (
    <div
      className={`w-10 h-10 rounded-xl flex items-center justify-center border ${getVariantStyles()} ${className}`}
    >
      <Icon size={size} strokeWidth={2} />
    </div>
  );
}
