import React from 'react';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-[#E7E8F0] rounded-xl ${className}`}
    />
  );
}

export function TableSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3 py-2">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex items-center justify-between gap-4 p-3 bg-[#F7F8FB] rounded-xl">
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-5 w-1/6" />
          <Skeleton className="h-5 w-1/6" />
          <Skeleton className="h-5 w-1/8" />
        </div>
      ))}
    </div>
  );
}
