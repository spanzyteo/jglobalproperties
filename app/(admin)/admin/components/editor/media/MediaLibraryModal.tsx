"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Upload, Trash2, Search, ImagePlus } from "lucide-react";
import axios from "axios";
import { MediaItem, MediaResponse, ImageInsertConfig } from "./types";
import { UploadModal } from "./UploadModal";
import { ImagePreviewModal } from "./ImagePreviewModal";

type MediaLibraryModalProps = {
  onClose: () => void;
  onSelect: (config: ImageInsertConfig) => void;
};

const API_BASE = "https://api.jglobalproperties.com/api/v1";

export const MediaLibraryModal: React.FC<MediaLibraryModalProps> = ({
  onClose,
  onSelect,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [filteredMedia, setFilteredMedia] = useState<MediaItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);
  const itemsPerPage = 15;

  useEffect(() => {
    fetchMedia();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = media.filter(
        (item) =>
          item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.alt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.caption?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredMedia(filtered);
    } else {
      setFilteredMedia(media);
    }
    setCurrentPage(1);
  }, [searchQuery, media]);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const response = await axios.get<MediaResponse>(
        `${API_BASE}/media`,
        { withCredentials: true },
      );
      console.log("Fetched media:", response.data);
      setMedia(response.data.data);
      setFilteredMedia(response.data.data);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMedia = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      await axios.delete(`${API_BASE}/media/${id}`, {
        withCredentials: true,
      });
      fetchMedia();
    } catch (error) {
      console.error("Error deleting media:", error);
      alert("Failed to delete image");
    }
  };

  const handleImageClick = (item: MediaItem) => {
    setSelectedImage(item);
    setShowPreview(true);
  };

  const handleInsert = (config: ImageInsertConfig) => {
    onSelect(config);
    setShowPreview(false);
    onClose();
  };

  // Pagination
  const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMedia = filteredMedia.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  if (!mounted) return null;

  const modalContent = (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800">
              Media Library
            </h2>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              type="button"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Search and Upload */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search images by filename, alt text, or caption..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowUpload(true);
                }}
                type="button"
                className="px-6 py-2 bg-[#941A1A] text-white rounded-lg hover:bg-[#7a1515] transition-colors flex items-center gap-2"
              >
                <Upload size={20} />
                Upload New
              </button>
            </div>
          </div>

          {/* Media Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading media...</div>
              </div>
            ) : paginatedMedia.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <ImagePlus size={48} className="mb-4 opacity-50" />
                <p className="text-lg">No images found</p>
                <p className="text-sm mt-2">
                  {searchQuery
                    ? "Try a different search term"
                    : "Upload your first image to get started"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {paginatedMedia.map((item) => (
                  <div
                    key={item.id}
                    className="group relative border-2 border-gray-200 rounded-lg overflow-hidden cursor-pointer transition-all hover:border-[#941A1A] hover:shadow-lg"
                    onClick={() => handleImageClick(item)}
                  >
                    <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.alt || item.filename}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 bg-white">
                      <p
                        className="text-xs text-gray-600 truncate"
                        title={item.filename}
                      >
                        {item.filename}
                      </p>
                    </div>
                    <button
                      onClick={(e) => deleteMedia(item.id, e)}
                      type="button"
                      className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-gray-200 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                type="button"
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                type="button"
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onSuccess={() => {
            fetchMedia();
            setShowUpload(false);
          }}
        />
      )}

      {/* Preview Modal */}
      {showPreview && selectedImage && (
        <ImagePreviewModal
          image={selectedImage}
          onInsert={handleInsert}
          onCancel={() => {
            setShowPreview(false);
            setSelectedImage(null);
          }}
        />
      )}
    </>
  );

  return createPortal(modalContent, document.body);
};
