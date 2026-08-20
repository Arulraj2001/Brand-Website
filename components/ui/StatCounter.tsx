'use client';

import React, { useEffect, useState, useRef } from 'react';

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export default function StatCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 1.5,
  className = '',
}: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (hasAnimatedRef.current) return;

    const element = ref.current;
    if (!element) return;

    const startAnimation = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      let start = 0;
      const end = value;
      if (end === 0) {
        setCount(0);
        return;
      }

      const totalSteps = 40;
      const stepTime = (duration * 1000) / totalSteps;
      const increment = end / totalSteps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.round(start));
        }
      }, stepTime);
    };

    // 1. Immediately trigger animation if element is already in the viewport on load
    const rect = element.getBoundingClientRect();
    const inViewport =
      rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom > 0;

    if (inViewport) {
      startAnimation();
      return;
    }

    // 2. Fallback to IntersectionObserver for scroll-triggered items lower down
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0] && entries[0].isIntersecting) {
            startAnimation();
            observer.disconnect();
          }
        },
        { threshold: 0.01 }
      );
      observer.observe(element);
      return () => observer.disconnect();
    } else {
      startAnimation();
    }
  }, [value, duration]);

  return (
    <span ref={ref} className={`font-extrabold tracking-tight ${className}`}>
      {prefix}
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}
