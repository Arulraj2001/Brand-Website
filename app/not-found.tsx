import React from 'react';
import { ArrowLeft, Compass } from 'lucide-react';
import Button from '@/components/ui/Button';
import GradientText from '@/components/ui/GradientText';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The requested page could not be found.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundPage() {
  return (
    <div className="pt-36 pb-28 bg-[#05060A] text-[#F3F4F6] min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#FFB800]/10 via-[#00F0FF]/10 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none -z-10" />

      <div className="max-w-lg w-full text-center space-y-6 cyber-glass-glow p-8 sm:p-12 rounded-3xl border border-white/[0.08] relative backdrop-blur-xl">
        <div className="w-20 h-20 rounded-2xl bg-[#FFB800]/10 text-[#FFB800] flex items-center justify-center mx-auto border border-[#FFB800]/30 shadow-[0_0_30px_rgba(255,184,0,0.2)]">
          <Compass size={38} className="animate-spin-slow" />
        </div>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono uppercase tracking-widest text-[#00F0FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
            ERR_COORDINATES_UNRESOLVED // 404
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Vector Not <GradientText>Found</GradientText>
          </h1>

          <p className="text-sm text-gray-400 leading-relaxed font-light max-w-sm mx-auto">
            The requested quadrant, case dossier, or protocol route does not exist within the active network grid.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/" variant="primary" size="md" className="w-full sm:w-auto shadow-[0_0_25px_rgba(255,184,0,0.25)]">
            <ArrowLeft size={16} />
            <span>Return to Foundry</span>
          </Button>
          <Button href="/services" variant="secondary" size="md" className="w-full sm:w-auto">
            <span>Explore Solutions</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
