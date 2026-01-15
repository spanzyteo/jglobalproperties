/**
 * Basic Information Form Section Component
 */

"use client";

import React from "react";
import { useAddNewLandState, useAddNewLandActions } from "../hooks";
import { STATUS_OPTIONS } from "../constants";

export const BasicInformationSection: React.FC = () => {
  const {
    title,
    location,
    state,
    country,
    status,
    metaTitle,
    metaDescription,
  } = useAddNewLandState();
  const {
    setTitle,
    setLocation,
    setState,
    setCountry,
    setStatus,
    setMetaTitle,
    setMetaDescription,
  } = useAddNewLandActions();

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-0">
        <h1 className="font-semibold text-[#4A5568]">Title</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Land title"
          className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
          required
        />
      </div>

      {/* Location */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-0">
        <h1 className="font-semibold text-[#4A5568]">Location</h1>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City or area"
          className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
          required
        />
      </div>

      {/* State */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-0">
        <h1 className="font-semibold text-[#4A5568]">State/Province</h1>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State or province"
          className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
          required
        />
      </div>

      {/* Country */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-0">
        <h1 className="font-semibold text-[#4A5568]">Country</h1>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
          required
        />
      </div>

      {/* Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-0">
        <h1 className="font-semibold text-[#4A5568]">Status</h1>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="focus:outline-none border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 rounded-[5px] text-[#4A5568] pl-3"
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
          onChange={(e) => setMetaTitle(e.target.value)}
          placeholder="Page title for search engines"
          className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
        />
      </div>

      {/* Meta Description */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 lg:gap-0">
        <h1 className="font-semibold text-[#4A5568]">Meta Description (SEO)</h1>
        <textarea
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          placeholder="Brief description for search engines"
          rows={2}
          className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568] resize-vertical"
        />
      </div>
    </div>
  );
};
