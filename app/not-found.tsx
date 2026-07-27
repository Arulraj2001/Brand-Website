import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Compass } from 'lucide-react';
import Button from '@/components/ui/Button';
import GradientText from '@/components/ui/GradientText';

export const metadata = {
  title: '404 - Page Not Found | ApexPulse Digital',
  description: 'The requested page could not be found.',
};

export default function NotFoundPage() {
  return (
    <div className="pt-36 pb-28 bg-[#F7F8FB] min-h-screen flex items-center justify-center px-4 bg-line-pattern">
      <div className="max-w-md w-full text-center space-y-6 bg-white border border-[#E7E8F0] p-8 sm:p-10 rounded-3xl shadow-[0_12px_40px_rgba(79,70,229,0.08)]">
        <div className="w-16 h-16 rounded-2xl bg-[#F1F0FE] text-[#4F46E5] flex items-center justify-center mx-auto border border-[#4F46E5]/20">
          <Compass size={32} />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#4F46E5]">
            404 ERROR
          </span>
          <h1 className="text-3xl font-extrabold text-[#0F1222]">
            Page Not <GradientText>Found</GradientText>
          </h1>
          <p className="text-sm text-[#4B4F63] leading-relaxed">
            The page or case study route you were looking for does not exist or may have been relocated.
          </p>
        </div>

        <div className="pt-2">
          <Button href="/" variant="primary" size="md" className="w-full">
            <ArrowLeft size={16} />
            <span>Return to Homepage</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
