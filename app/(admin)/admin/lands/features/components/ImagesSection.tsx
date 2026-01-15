/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Images Section - Reusable for Add/Edit/View
 * Located at: app/(admin)/admin/lands/features/components/ImagesSection.tsx
 */

"use client";

import React from "react";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import { LandImage, ImageDetail } from "../types";

interface ImagesSectionProps {
  images: File[];
  imageDetails: ImageDetail[];
  existingImages?: LandImage[];
  onImageFilesChange: (files: FileList | null) => void;
  onImageDetailChange: (
    index: number,
    field: keyof ImageDetail,
    value: any
  ) => void;
  onRemoveImage: (index: number) => void;
  onSetPrimaryImage: (index: number) => void;
  onRemoveExistingImage?: (imageId: string) => void;
  readOnly?: boolean;
}

export const ImagesSection: React.FC<ImagesSectionProps> = ({
  images,
  imageDetails,
  existingImages = [],
  onImageFilesChange,
  onImageDetailChange,
  onRemoveImage,
  onSetPrimaryImage,
  onRemoveExistingImage,
  readOnly = false,
}) => {
  return (
    <div className="space-y-6">
      {/* File Input */}
      {!readOnly && (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-0">
          <h1 className="font-semibold text-[#4A5568]">Add Images</h1>
          <div className="custom-file-input-wrapper overflow-hidden lg:w-[539px] w-full">
            <input
              type="file"
              accept="image/*"
              id="images"
              name="images"
              multiple
              onChange={(e) => onImageFilesChange(e.target.files)}
              className="hidden"
            />
            <label
              htmlFor="images"
              className="custom-file-label border border-gray-200 bg-[#F9F9F6] w-full h-[40px] focus:outline-none rounded-[5px] text-[#4A5568] flex items-center cursor-pointer"
            >
              <span className="file-label-text bg-gray-200 h-[40px] px-3 text-black flex items-center whitespace-nowrap">
                Choose Images
              </span>
              <span className="file-name text-sm text-gray-500 ml-4">
                {images.length > 0
                  ? `${images.length} file(s) selected`
                  : "No files chosen"}
              </span>
            </label>
          </div>
        </div>
      )}

      {/* Existing Images */}
      {existingImages.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold text-[#4A5568]">Existing Images</h3>
          <div className="space-y-4">
            {existingImages.map((image) => (
              <div
                key={image.id}
                className="border border-gray-300 rounded-lg p-4 bg-white"
              >
                <div className="flex items-start gap-4">
                  <Image
                    src={image.url}
                    alt={image.caption || "Land image"}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-700">
                        {image.caption || "No caption"}
                      </p>
                      {!readOnly && onRemoveExistingImage && (
                        <button
                          type="button"
                          onClick={() => onRemoveExistingImage(image.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <MdClose className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    {image.isPrimary && (
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        Primary Image
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Images Preview */}
      {images.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-[#4A5568]">New Images</h3>
          {images.map((image, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 bg-white"
            >
              <div className="flex items-start gap-4">
                <Image
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded"
                  unoptimized
                />
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-700">{image.name}</h4>
                    {!readOnly && (
                      <button
                        type="button"
                        onClick={() => onRemoveImage(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <MdClose className="h-5 w-5" />
                      </button>
                    )}
                  </div>

                  {!readOnly && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Caption
                        </label>
                        <input
                          type="text"
                          value={imageDetails[index]?.caption || ""}
                          onChange={(e) =>
                            onImageDetailChange(
                              index,
                              "caption",
                              e.target.value
                            )
                          }
                          placeholder="Image caption (optional)"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Order
                        </label>
                        <input
                          type="number"
                          value={imageDetails[index]?.order || index}
                          onChange={(e) =>
                            onImageDetailChange(
                              index,
                              "order",
                              parseInt(e.target.value) || index
                            )
                          }
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`primary-${index}`}
                      checked={imageDetails[index]?.isPrimary || false}
                      onChange={() => onSetPrimaryImage(index)}
                      disabled={readOnly}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer disabled:opacity-50"
                    />
                    <label
                      htmlFor={`primary-${index}`}
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Set as primary image
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
