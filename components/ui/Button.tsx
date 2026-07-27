import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'featured';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer min-h-[44px]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-[15px] px-[18px] py-[9px] rounded-lg gap-2',
    lg: 'text-base px-6 py-3 rounded-lg gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#FF9D00] text-white hover:bg-[#E68E00] active:bg-[#CC7E00] shadow-sm',
    secondary:
      'bg-white text-[#1C1C1C] border border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-[#9CA3AF]',
    ghost:
      'text-[#1C1C1C] hover:bg-[#F9FAFB] hover:text-[#FF9D00]',
    featured:
      'bg-[#FFF9E6] text-[#1C1C1C] border border-[#FFD21E] hover:bg-[#FFEFA6]',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
