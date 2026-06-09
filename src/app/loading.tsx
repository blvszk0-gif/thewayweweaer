import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-black pt-20 px-6">
      <div className="container mx-auto animate-pulse space-y-12">
        {/* Hero Skeleton */}
        <div className="h-20 w-1/3 bg-white/5 rounded-xl mb-8"></div>
        <div className="grid grid-cols-4 gap-4 aspect-[16/9]">
          <div className="bg-white/5 rounded-3xl h-full"></div>
          <div className="bg-white/5 rounded-3xl h-full"></div>
          <div className="bg-white/5 rounded-3xl h-full"></div>
          <div className="bg-white/5 rounded-3xl h-full"></div>
        </div>

        {/* Sections Skeleton */}
        <div className="space-y-6 pt-24">
          <div className="h-12 w-1/4 bg-white/5 rounded-lg mx-auto"></div>
          <div className="grid grid-cols-3 gap-8">
            <div className="aspect-[3/4] bg-white/5 rounded-3xl"></div>
            <div className="aspect-[3/4] bg-white/5 rounded-3xl"></div>
            <div className="aspect-[3/4] bg-white/5 rounded-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
