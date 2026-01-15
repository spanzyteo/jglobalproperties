/**
 * Basic Information Section - Reusable in Add/Edit forms
 * Located at: app/(admin)/admin/lands/features/components/BasicInformationSection.tsx
 */

"use client";

import React from "react";
import { STATUS_OPTIONS } from "../constants";

interface BasicInformationSectionProps {
  title: string;
  overview: string;
  location: string;
  state: string;
  country: string;
  status: string;
  metaTitle: string;
  metaDescription: string;
  onTitleChange: (value: string) => void;
  onOverviewChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onStateChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onMetaTitleChange: (value: string) => void;
  onMetaDescriptionChange: (value: string) => void;
  readOnly?: boolean;
}

export const BasicInformationSection: React.FC<
  BasicInformationSectionProps
> = ({
  title,
  overview,
  location,
  state,
  country,
  status,
  metaTitle,
  metaDescription,
  onTitleChange,
  onOverviewChange,
  onLocationChange,
  onStateChange,
  onCountryChange,
  onStatusChange,
  onMetaTitleChange,
  onMetaDescriptionChange,
  readOnly = false,
}) => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-0">
        <h1 className="font-semibold text-[#4A5568]">Title</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Land title"
          disabled={readOnly}
          className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-[539px] w-full py-[10px] pl-3 focus:outline-none rounded-[5px] text-[#4A5568] disabled:opacity-50"
          required
        />
      </div>

      {/* Location */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-0">
        <h1 className="font-semibold text-[#4A5568]">Location</h1>
        <input
          type="text"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          placeholder="City or area"
          disabled={readOnly}
          className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-[539px] w-full py-[10px] pl-3 focus:outline-none rounded-[5px] text-[#4A5568] disabled:opacity-50"
          required
        />
      </div>

      {/* State */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-0">
        <h1 className="font-semibold text-[#4A5568]">State/Province</h1>
        <input
          type="text"
          value={state}
          onChange={(e) => onStateChange(e.target.value)}
          placeholder="State or province"
          disabled={readOnly}
          className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-[539px] w-full py-[10px] pl-3 focus:outline-none rounded-[5px] text-[#4A5568] disabled:opacity-50"
          required
        />
      </div>

      {/* Country */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-0">
        <h1 className="font-semibold text-[#4A5568]">Country</h1>
        <input
          type="text"
          value={country}
          onChange={(e) => onCountryChange(e.target.value)}
          placeholder="Country"
          disabled={readOnly}
          className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-[539px] w-full py-[10px] pl-3 focus:outline-none rounded-[5px] text-[#4A5568] disabled:opacity-50"
          required
        />
      </div>

      {/* Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-0">
        <h1 className="font-semibold text-[#4A5568]">Status</h1>
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          disabled={readOnly}
          className="focus:outline-none border border-[#EFEFEF] bg-[#F9F9F6] lg:w-[539px] w-full py-[10px] rounded-[5px] text-[#4A5568] pl-3 disabled:opacity-50"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Meta Title */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-0">
        <h1 className="font-semibold text-[#4A5568]">Meta Title (SEO)</h1>
        <input
          type="text"
          value={metaTitle}
          onChange={(e) => onMetaTitleChange(e.target.value)}
          placeholder="Page title for search engines"
          disabled={readOnly}
          className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568] disabled:opacity-50"
        />
      </div>

      {/* Meta Description */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 lg:gap-0">
        <h1 className="font-semibold text-[#4A5568]">Meta Description (SEO)</h1>
        <textarea
          value={metaDescription}
          onChange={(e) => onMetaDescriptionChange(e.target.value)}
          placeholder="Brief description for search engines"
          disabled={readOnly}
          rows={2}
          className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568] resize-vertical disabled:opacity-50"
        />
      </div>
    </div>
  );
};
