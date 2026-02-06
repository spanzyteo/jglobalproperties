"use client";

import React from "react";

const SkeletonEventCard: React.FC = () => {
  return (
    <div className="flex flex-col gap-0 rounded-[5px] shadow-lg overflow-hidden bg-white animate-pulse">
      {/* Image Skeleton */}
      <div className="h-55 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer rounded-t-[5px]" />

      {/* Content Skeleton */}
      <div className="py-3 px-4 flex flex-col gap-2 h-25">
        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-5 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer" />
          <div className="h-5 w-5/6 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer" />
        </div>

        {/* Date Skeleton */}
        <div className="h-4 w-32 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer" />

        {/* Description Skeleton */}
        <div className="space-y-1 mt-2">
          <div className="h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer" />
          <div className="h-4 w-4/5 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer" />
        </div>
      </div>
    </div>
  );
};

const EventSkeleton: React.FC = () => {
  return <SkeletonEventCard />;
};

export default EventSkeleton;
