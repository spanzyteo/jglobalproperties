/**
 * Display/View Components for Lands List
 * Located at: app/(admin)/admin/lands/features/components/LandCard.tsx
 */

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineRemoveRedEye, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Land } from "../types";
import { formatDate, getStatusColor } from "../formUtils";

interface LandCardProps {
  land: Land;
  onDelete?: (id: string) => void;
  isLoading?: boolean;
}

export const LandCard: React.FC<LandCardProps> = ({
  land,
  onDelete,
  isLoading = false,
}) => {
  const primaryImage = land.images.find((img) => img.isPrimary);
  const statusColor = getStatusColor(land.status);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      {primaryImage && (
        <div className="relative h-48 w-full bg-gray-200">
          <Image
            src={primaryImage.url}
            alt={land.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-lg text-gray-800 truncate">
          {land.title}
        </h3>

        {/* Location */}
        <p className="text-sm text-gray-600">
          📍 {land.location}, {land.state}
        </p>

        {/* Status */}
        <div
          className={`inline-block px-3 py-1 rounded text-xs font-medium ${statusColor}`}
        >
          {land.status.replace("_", " ")}
        </div>

        {/* Stats */}
        <div className="flex justify-between text-sm text-gray-600">
          <span>{land.units.length} Units</span>
          <span>{land.totalReviews} Reviews</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <Link
            href={`/admin/lands/${land.id}`}
            className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 rounded text-sm"
          >
            <MdOutlineRemoveRedEye className="h-4 w-4" />
            View
          </Link>

          <Link
            href={`/admin/lands/edit/${land.id}`}
            className="flex-1 flex items-center justify-center gap-1 bg-green-50 text-green-600 hover:bg-green-100 py-2 rounded text-sm"
          >
            <MdOutlineEdit className="h-4 w-4" />
            Edit
          </Link>

          {onDelete && (
            <button
              onClick={() => onDelete(land.id)}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-600 hover:bg-red-100 py-2 rounded text-sm disabled:opacity-50"
            >
              <RiDeleteBin5Line className="h-4 w-4" />
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
