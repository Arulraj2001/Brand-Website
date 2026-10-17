import React, { Suspense } from 'react';
import PreviewClientView from './PreviewClientView';

export const metadata = {
  title: 'Client Demo Preview | Ostrune Web Architecture',
  description: 'Instant customized business website preview built by Ostrune.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PreviewPage({ params }: { params: Promise<{ niche: string }> }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0E0E12] flex items-center justify-center text-white">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-400">Loading customized business preview...</p>
          </div>
        </div>
      }
    >
      <PreviewClientView paramsPromise={params} />
    </Suspense>
  );
}
