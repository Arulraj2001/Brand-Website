'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FloatingBlobProps {
  className?: string;
  color?: 'indigo' | 'violet' | 'sky';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  delay?: number;
}

export default function FloatingBlob({
  className = '',
  color = 'indigo',
  size = 'lg',
  delay = 0,
}: FloatingBlobProps) {
  const colorClasses = {
    indigo: 'from-[#4F46E5]/40 to-[#7C3AED]/30',
    violet: 'from-[#7C3AED]/40 to-[#0EA5E9]/25',
    sky: 'from-[#0EA5E9]/35 to-[#4F46E5]/25',
  };

  const sizeClasses = {
    sm: 'w-64 h-64 blur-2xl',
    md: 'w-96 h-96 blur-3xl',
    lg: 'w-[480px] h-[480px] blur-3xl',
    xl: 'w-[640px] h-[640px] blur-3xl',
  };

  return (
    <motion.div
      initial={{ y: 0, scale: 1, rotate: 0 }}
      animate={{
        y: [-15, 20, -15],
        x: [-10, 15, -10],
        scale: [1, 1.08, 1],
        rotate: [0, 8, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      className={`absolute pointer-events-none rounded-full bg-gradient-to-tr ${colorClasses[color]} ${sizeClasses[size]} ${className}`}
    />
  );
}
