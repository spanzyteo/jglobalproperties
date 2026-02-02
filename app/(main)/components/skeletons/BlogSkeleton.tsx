"use client";

import React from "react";

const SkeletonBlogCard: React.FC = () => {
  return (
    <div className="flex flex-col rounded-sm shadow-lg overflow-hidden bg-white animate-pulse">
      {/* Image Skeleton */}
      <div className="h-50 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer rounded-t-sm" />

      {/* Content Skeleton */}
      <div className="py-3 px-4 flex flex-col gap-3">
        {/* Category Skeleton */}
        <div className="h-5 w-20 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer" />

        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-5 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer" />
          <div className="h-5 w-5/6 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer" />
        </div>

        {/* Date Skeleton */}
        <div className="h-4 w-24 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer" />

        {/* Content Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer" />
          <div className="h-4 w-4/5 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer" />
        </div>

        {/* Link Skeleton */}
        <div className="h-4 w-28 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer mt-2" />
      </div>
    </div>
  );
};

interface BlogSkeletonProps {
  count?: number;
}

const BlogSkeleton: React.FC<BlogSkeletonProps> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonBlogCard key={index} />
      ))}
    </div>
  );
};

export default BlogSkeleton;
