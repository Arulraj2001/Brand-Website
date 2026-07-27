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
        return 'bg-[#FFF9E6] text-[#FF9D00] border-[#FFD21E]';
      case 'accent':
        return 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20';
      case 'success':
        return 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20';
      default:
        return 'bg-[#FFF9E6] text-[#1C1C1C] border-[#FFD21E]';
    }
  };

  return (
    <div
      className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getVariantStyles()} ${className}`}
    >
      <Icon size={size} strokeWidth={2} />
    </div>
  );
}
