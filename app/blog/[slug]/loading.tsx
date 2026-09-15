import React from 'react';

export default function BlogPostLoading() {
  return (
    <div className="pt-24 pb-20 bg-[#F9FAFB] min-h-screen">
      <article className="max-w-[840px] w-full mx-auto px-4 sm:px-6 space-y-8 animate-pulse">
        {/* Top Breadcrumb & Back Link */}
        <div className="flex items-center justify-between pt-4">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>

        {/* Header Block */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-5 w-24 bg-gray-200 rounded" />
            <div className="h-5 w-20 bg-gray-200 rounded" />
          </div>

          <div className="space-y-2">
            <div className="h-10 w-full bg-gray-200 rounded-xl" />
            <div className="h-10 w-4/5 bg-gray-200 rounded-xl" />
          </div>

          {/* Author & Meta Line */}
          <div className="flex items-center gap-4 pt-2">
            <div className="w-9 h-9 rounded-full bg-gray-200" />
            <div className="space-y-1">
              <div className="h-3.5 w-28 bg-gray-200 rounded" />
              <div className="h-3 w-40 bg-gray-200 rounded" />
            </div>
          </div>
        </div>

        {/* Hero Image Skeleton */}
        <div className="relative aspect-[16/9] w-full rounded-2xl bg-gray-200 overflow-hidden shadow-xs" />

        {/* Content Body Placeholder Lines */}
        <div className="space-y-6 pt-4 bg-white p-6 sm:p-10 rounded-2xl border border-[#E5E7EB]">
          <div className="space-y-2.5">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-11/12 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-4/5 bg-gray-200 rounded" />
          </div>

          <div className="h-7 w-1/3 bg-gray-200 rounded-lg pt-4" />

          <div className="space-y-2.5">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
          </div>

          <div className="h-36 w-full bg-gray-100 rounded-xl border border-dashed border-gray-200 p-4" />

          <div className="space-y-2.5">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Related Articles Skeleton */}
        <div className="pt-8 border-t border-[#E5E7EB] space-y-4">
          <div className="h-6 w-36 bg-gray-200 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-[#E5E7EB] p-4 space-y-3">
                <div className="h-3 w-16 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-3 w-20 bg-gray-200 rounded pt-2" />
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
