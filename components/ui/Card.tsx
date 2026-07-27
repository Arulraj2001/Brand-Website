import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  isFeatured?: boolean;
  id?: string;
  onClick?: () => void;
}

export default function Card({
  children,
  className = '',
  isFeatured = false,
  id,
  onClick,
}: CardProps) {
  const baseCard = isFeatured ? 'hf-card-featured' : 'hf-card';

  return (
    <div
      id={id}
      onClick={onClick}
      className={`${baseCard} ${className}`}
    >
      {children}
    </div>
  );
}
