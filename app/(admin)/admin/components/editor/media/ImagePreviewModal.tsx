"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { MediaItem, ImageInsertConfig } from "./types";

type ImagePreviewModalProps = {
  image: MediaItem;
  onInsert: (config: ImageInsertConfig) => void;
  onCancel: () => void;
};

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  image,
  onInsert,
  onCancel,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  const [width, setWidth] = useState<number>(600);
  const [height, setHeight] = useState<number>(400);
  const [alignment, setAlignment] = useState<"left" | "center" | "right">(
    "center",
  );
  const [alt, setAlt] = useState(image.alt || "");

  const handleInsert = () => {
    onInsert({
      url: image.url,
      alt: alt || image.filename,
      width,
      height,
      alignment,
    });
  };

  if (!mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
    >
      <div
        className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Insert Image</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            type="button"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image Preview */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-3">Preview</p>
            <div className="bg-white p-4 rounded border border-gray-300 overflow-auto">
              <div
                className={`${
                  alignment === "left"
                    ? "mr-auto"
                    : alignment === "right"
                      ? "ml-auto"
                      : "mx-auto"
                }`}
                style={{ width: `${width}px` }}
              >
                <img
                  src={image.url}
                  alt={alt || image.filename}
                  className="w-full h-auto rounded-lg"
                  style={{ height: `${height}px`, objectFit: "cover" }}
                />
                {image.caption && (
                  <p className="text-sm text-gray-600 mt-2 italic">
                    {image.caption}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Width */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Width (px)
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                min="50"
                max="2000"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height (px)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                min="50"
                max="2000"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Alignment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alignment
              </label>
              <select
                value={alignment}
                onChange={(e) =>
                  setAlignment(e.target.value as "left" | "center" | "right")
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>

            {/* Alt Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alt Text
              </label>
              <input
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Describe the image..."
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Image Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Filename:</strong> {image.filename} <br />
              <strong>Size:</strong> {(image.size / 1024).toFixed(2)} KB
              {image.width && image.height && (
                <>
                  <br />
                  <strong>Original Dimensions:</strong> {image.width} x{" "}
                  {image.height} px
                </>
              )}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-2 border-t border-gray-200">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onCancel();
              }}
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleInsert();
              }}
              type="button"
              className="px-6 py-2 bg-[#941A1A] text-white rounded-lg hover:bg-[#7a1515] transition-colors"
            >
              Insert Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
