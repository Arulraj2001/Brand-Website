import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'featured';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  prefetch?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  prefetch,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-bold tracking-tight transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98] select-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-xl gap-1.5 shadow-xs min-h-[34px]',
    md: 'text-sm px-5 py-2.5 rounded-xl gap-2 shadow-sm min-h-[44px]',
    lg: 'text-base px-7 py-3.5 rounded-2xl gap-2.5 shadow-lg min-h-[50px]',
  };

  const variantStyles = {
    primary:
      'btn-shimmer-effect bg-gradient-to-r from-[#FFB800] via-[#FFD21E] to-[#FF9500] text-black font-extrabold hover:shadow-[0_0_30px_rgba(255,184,0,0.45)] hover:-translate-y-0.5 border border-[#FFB800]/60',
    secondary:
      'bg-white/[0.05] text-white border border-white/[0.12] hover:bg-white/[0.1] hover:border-[#FFB800]/50 hover:shadow-[0_0_20px_rgba(255,184,0,0.15)] hover:-translate-y-0.5 backdrop-blur-md',
    ghost:
      'text-gray-300 hover:text-white hover:bg-white/[0.06]',
    featured:
      'cyber-glass text-white border border-[#FFB800]/40 hover:border-[#FFB800] hover:shadow-[0_0_25px_rgba(255,184,0,0.25)] hover:-translate-y-0.5',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} prefetch={prefetch} className={combinedClasses}>
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
