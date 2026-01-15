/**
 * Images Section Component
 */

"use client";

import React from "react";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import { useImageFilesContext } from "../ImageFilesContext";

export const ImagesSection: React.FC = () => {
  const {
    imageMetadata,
    addImageFiles,
    removeImageFile,
    updateImageMetadata,
    getImageFile,
  } = useImageFilesContext();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    addImageFiles(event.target.files);
  };

  return (
    <div className="space-y-6">
      {/* File Input */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-0">
        <h1 className="font-semibold text-[#4A5568]">Images</h1>
        <div className="custom-file-input-wrapper overflow-hidden lg:w-134.75 w-full">
          <input
            type="file"
            accept="image/*"
            id="images"
            name="images"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="images"
            className="custom-file-label border border-gray-200 bg-[#F9F9F6] w-full h-10 focus:outline-none rounded-[5px] text-[#4A5568] flex items-center cursor-pointer"
          >
            <span className="file-label-text bg-gray-200 h-10 px-3 text-black flex items-center whitespace-nowrap">
              Choose Images
            </span>
            <span className="file-name text-sm text-gray-500 ml-4">
              {imageMetadata.length > 0
                ? `${imageMetadata.length} file(s) selected`
                : "No files chosen"}
            </span>
          </label>
        </div>
      </div>

      {/* Image Preview and Details */}
      {imageMetadata.length > 0 && (
        <div className="space-y-4">
          {imageMetadata.map((metadata, index) => {
            const file = getImageFile(metadata.id);
            if (!file) return null;

            return (
              <div
                key={metadata.id}
                className="border border-gray-300 rounded-lg p-4 bg-white"
              >
                <div className="flex items-start gap-4">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded"
                    unoptimized
                  />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-700">
                        {metadata.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeImageFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <MdClose className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Caption
                        </label>
                        <input
                          type="text"
                          value={metadata.caption || ""}
                          onChange={(e) =>
                            updateImageMetadata(
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
                          value={metadata.order || index}
                          onChange={(e) =>
                            updateImageMetadata(
                              index,
                              "order",
                              parseInt(e.target.value) || index
                            )
                          }
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`primary-${metadata.id}`}
                        checked={metadata.isPrimary || false}
                        onChange={() => {
                          updateImageMetadata(index, "isPrimary", true);
                          // Set all others to false
                          imageMetadata.forEach((_, i) => {
                            if (i !== index) {
                              updateImageMetadata(i, "isPrimary", false);
                            }
                          });
                        }}
                        className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                      />
                      <label
                        htmlFor={`primary-${metadata.id}`}
                        className="text-sm text-gray-600 cursor-pointer"
                      >
                        Set as primary image
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
