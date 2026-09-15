import React from 'react';

export default function BlogLoading() {
  return (
    <div className="pt-24 pb-20 bg-[#F9FAFB] min-h-screen">
      <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 space-y-10">
        {/* Header Skeleton */}
        <div className="text-center max-w-3xl mx-auto space-y-3 pt-6 animate-pulse">
          <div className="h-6 w-36 bg-gray-200 rounded-full mx-auto" />
          <div className="h-10 w-3/4 max-w-lg bg-gray-200 rounded-xl mx-auto" />
          <div className="h-4 w-2/3 max-w-md bg-gray-200 rounded-lg mx-auto" />
        </div>

        {/* Featured Card Skeleton */}
        <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 sm:p-8 shadow-xs animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Image Placeholder */}
            <div className="lg:col-span-7 h-64 sm:h-80 w-full bg-gray-200 rounded-2xl" />
            {/* Content Placeholder */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex gap-2">
                <div className="h-5 w-20 bg-gray-200 rounded" />
                <div className="h-5 w-28 bg-gray-200 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-7 w-full bg-gray-200 rounded-lg" />
                <div className="h-7 w-4/5 bg-gray-200 rounded-lg" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200" />
                  <div className="space-y-1">
                    <div className="h-3 w-20 bg-gray-200 rounded" />
                    <div className="h-2.5 w-14 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="h-9 w-28 bg-gray-200 rounded-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills Skeleton */}
        <div className="flex flex-wrap justify-center gap-2 animate-pulse">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="h-9 w-24 bg-gray-200 rounded-lg" />
          ))}
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden flex flex-col justify-between p-0 shadow-xs animate-pulse"
            >
              <div className="h-52 w-full bg-gray-200" />
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div className="h-3 w-16 bg-gray-200 rounded" />
                    <div className="h-3 w-20 bg-gray-200 rounded" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-5 w-full bg-gray-200 rounded" />
                    <div className="h-5 w-3/4 bg-gray-200 rounded" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-3.5 w-full bg-gray-200 rounded" />
                    <div className="h-3.5 w-4/5 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                  <div className="h-3 w-20 bg-gray-200 rounded" />
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
