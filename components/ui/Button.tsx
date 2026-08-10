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
    'inline-flex items-center justify-center font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98] select-none';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1 rounded-lg gap-1.5 shadow-xs min-h-[32px]',
    md: 'text-[15px] px-[20px] py-[10px] rounded-xl gap-2 shadow-sm min-h-[44px]',
    lg: 'text-base px-7 py-3.5 rounded-xl gap-2.5 shadow-md min-h-[48px]',
  };

  const variantStyles = {
    primary:
      'btn-shimmer-effect bg-gradient-to-r from-[#FF9D00] to-[#FFAE1A] text-white hover:from-[#E68E00] hover:to-[#FF9D00] hover:shadow-[0_6px_20px_rgba(255,157,0,0.35)] hover:-translate-y-0.5 border border-[#FFB833]/40',
    secondary:
      'bg-white text-[#1C1C1C] border border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-[#FF9D00]/60 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:-translate-y-0.5',
    ghost:
      'text-[#1C1C1C] hover:bg-[#FF9D00]/10 hover:text-[#FF9D00]',
    featured:
      'bg-gradient-to-r from-[#FFFDF5] to-[#FFF9E6] text-[#1C1C1C] border border-[#FFD21E] hover:border-[#FF9D00] hover:shadow-[0_4px_16px_rgba(255,210,30,0.3)] hover:-translate-y-0.5',
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
