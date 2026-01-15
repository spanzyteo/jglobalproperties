/**
 * Land Details Display Component - for viewing land details
 * Located at: app/(admin)/admin/lands/features/components/LandDetailsView.tsx
 */

"use client";

import React from "react";
import { Land } from "../types";
import { BasicInformationSection } from "./BasicInformationSection";
import { OverviewSection } from "./OverviewSection";
import { ImagesSection } from "./ImagesSection";
import { UnitsSection } from "./UnitsSection";

interface LandDetailsViewProps {
  land: Land;
  onDelete?: () => void;
  onEdit?: () => void;
  isLoading?: boolean;
}

export const LandDetailsView: React.FC<LandDetailsViewProps> = ({
  land,
  onDelete,
  onEdit,
  isLoading = false,
}) => {
  return (
    <div className="space-y-8">
      {/* Header with Actions */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">{land.title}</h1>
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              disabled={isLoading}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 disabled:opacity-50"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Basic Information
        </h2>
        <BasicInformationSection
          title={land.title}
          overview={land.overview}
          location={land.location}
          state={land.state}
          country={land.country}
          status={land.status}
          metaTitle={land.metaTitle || ""}
          metaDescription={land.metaDescription || ""}
          onTitleChange={() => {}}
          onOverviewChange={() => {}}
          onLocationChange={() => {}}
          onStateChange={() => {}}
          onCountryChange={() => {}}
          onStatusChange={() => {}}
          onMetaTitleChange={() => {}}
          onMetaDescriptionChange={() => {}}
          readOnly={true}
        />
      </div>

      {/* Overview */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Overview</h2>
        <OverviewSection
          overview={land.overview}
          onOverviewChange={() => {}}
          readOnly={true}
        />
      </div>

      {/* Images */}
      {land.images.length > 0 && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Images</h2>
          <ImagesSection
            images={[]}
            imageDetails={[]}
            existingImages={land.images}
            onImageFilesChange={() => {}}
            onImageDetailChange={() => {}}
            onRemoveImage={() => {}}
            onSetPrimaryImage={() => {}}
            readOnly={true}
          />
        </div>
      )}

      {/* Units */}
      {land.units.length > 0 && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Units</h2>
          <UnitsSection
            units={land.units}
            onAddUnit={() => {}}
            onRemoveUnit={() => {}}
            onUpdateUnit={() => {}}
            readOnly={true}
          />
        </div>
      )}

      {/* Reviews Stats */}
      {land._count && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600 text-sm">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-800">
                {land._count.reviews}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600 text-sm">Favorites</p>
              <p className="text-2xl font-bold text-gray-800">
                {land._count.favorites}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600 text-sm">Average Rating</p>
              <p className="text-2xl font-bold text-gray-800">
                {land.averageRating?.toFixed(1) || "N/A"}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600 text-sm">Total Units</p>
              <p className="text-2xl font-bold text-gray-800">
                {land.units.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
