"use client";

import React from "react";

const SkeletonHouseCard: React.FC = () => {
  return (
    <div className="flex flex-col gap-0 rounded-[5px] shadow-lg overflow-hidden bg-white animate-pulse">
      {/* Image Skeleton */}
      <div className="h-55 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer rounded-t-[5px]" />

      {/* Content Skeleton */}
      <div className="py-3 pl-4 flex flex-col gap-2 h-25">
        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-5 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer" />
          <div className="h-5 w-5/6 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer" />
        </div>

        {/* Category Skeleton */}
        <div className="h-4 w-20 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer" />
      </div>

      {/* Footer Skeleton */}
      <div className="flex items-center justify-between px-4 border-t border-t-gray-200 py-3">
        {/* Price Skeleton */}
        <div className="h-5 w-32 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer" />

        {/* Avatar Skeleton */}
        <div className="p-2.5 border-l border-l-gray-200">
          <div className="rounded-[5px] h-15 w-15 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
        </div>
      </div>
    </div>
  );
};

interface HouseSkeletonProps {
  count?: number;
}

const HouseSkeleton: React.FC<HouseSkeletonProps> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonHouseCard key={index} />
      ))}
    </div>
  );
};

export default HouseSkeleton;
