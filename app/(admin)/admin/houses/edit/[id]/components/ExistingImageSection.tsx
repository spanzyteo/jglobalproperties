import React, { useState } from "react";
import Image from "next/image";
import { MdClose, MdEdit } from "react-icons/md";

export type HouseImage = {
  id: string;
  url: string;
  publicId: string;
  caption: string | null;
  isPrimary: boolean;
  order: number;
};

interface ExistingImagesSectionProps {
  existingImages: HouseImage[];
  imagesToKeep: Array<{
    id: string;
    caption?: string;
    isPrimary?: boolean;
    order?: number;
  }>;
  setImagesToKeep: (
    images: Array<{
      id: string;
      caption?: string;
      isPrimary?: boolean;
      order?: number;
    }>,
  ) => void;
  imagesToDelete: string[];
  setImagesToDelete: (ids: string[]) => void;
}

const ExistingImagesSection: React.FC<ExistingImagesSectionProps> = ({
  existingImages,
  imagesToKeep,
  setImagesToKeep,
  imagesToDelete,
  setImagesToDelete,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<{
    caption: string;
    order: number;
    isPrimary: boolean;
  } | null>(null);

  const getImageData = (imageId: string) => {
    return imagesToKeep.find((img) => img.id === imageId);
  };

  const isImageMarkedForDelete = (imageId: string) => {
    return imagesToDelete.includes(imageId);
  };

  const toggleDeleteImage = (imageId: string) => {
    if (imagesToDelete.includes(imageId)) {
      setImagesToDelete(imagesToDelete.filter((id) => id !== imageId));
    } else {
      setImagesToDelete([...imagesToDelete, imageId]);
    }
  };

  const startEditImage = (image: HouseImage) => {
    const data = getImageData(image.id);
    setEditingId(image.id);
    setEditData({
      caption: data?.caption || image.caption || "",
      order: data?.order ?? image.order,
      isPrimary: data?.isPrimary ?? image.isPrimary,
    });
  };

  const saveImageEdit = () => {
    if (!editingId || !editData) return;

    const updated = imagesToKeep.map((img) =>
      img.id === editingId ? { ...img, ...editData } : img,
    );

    // If setting as primary, unset others
    if (editData.isPrimary) {
      const finalUpdated = updated.map((img) => ({
        ...img,
        isPrimary: img.id === editingId,
      }));
      setImagesToKeep(finalUpdated);
    } else {
      setImagesToKeep(updated);
    }

    setEditingId(null);
    setEditData(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[#4A5568]">
          Existing Images ({existingImages.length})
        </h2>
        <span className="text-sm text-red-500 font-medium">
          {imagesToDelete.length > 0 &&
            `${imagesToDelete.length} marked for deletion`}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {existingImages.map((image) => {
          const isDeleted = isImageMarkedForDelete(image.id);
          const isEditing = editingId === image.id;
          const data = getImageData(image.id);

          return (
            <div
              key={image.id}
              className={`relative border rounded-lg overflow-hidden transition-all ${
                isDeleted
                  ? "opacity-50 border-red-300 bg-red-50"
                  : "border-gray-300"
              }`}
            >
              {isDeleted && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-500 bg-opacity-30 z-10">
                  <span className="text-white font-bold text-center">
                    Marked for deletion
                  </span>
                </div>
              )}

              <Image
                src={image.url}
                alt={image.caption || `Image ${image.order + 1}`}
                width={300}
                height={200}
                className={`w-full h-32 object-cover ${
                  isDeleted ? "opacity-50" : ""
                }`}
                unoptimized
              />

              {/* Image Badges */}
              <div className="absolute top-2 right-2 flex gap-1">
                {data?.isPrimary && (
                  <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                    Primary
                  </span>
                )}
                <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                  #
                  {data?.order !== undefined ? data.order + 1 : image.order + 1}
                </span>
              </div>

              {/* Caption & Controls */}
              {isEditing && editData ? (
                <div className="p-3 bg-blue-50 space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Caption
                    </label>
                    <input
                      type="text"
                      value={editData.caption}
                      onChange={(e) =>
                        setEditData({ ...editData, caption: e.target.value })
                      }
                      placeholder="Image caption"
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Order
                      </label>
                      <input
                        type="number"
                        value={editData.order}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            order: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="flex items-end">
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editData.isPrimary}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              isPrimary: e.target.checked,
                            })
                          }
                          className="w-4 h-4 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-xs font-medium text-gray-700">
                          Primary
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={saveImageEdit}
                      className="flex-1 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="flex-1 bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs font-medium hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-2 bg-gray-50 flex items-start justify-between">
                  <div className="flex-1">
                    {data?.caption && (
                      <p className="text-xs text-gray-700 truncate">
                        {data.caption}
                      </p>
                    )}
                    {!data?.caption && image.caption && (
                      <p className="text-xs text-gray-700 truncate">
                        {image.caption}
                      </p>
                    )}
                    {!data?.caption && !image.caption && (
                      <p className="text-xs text-gray-500 italic">No caption</p>
                    )}
                  </div>
                  <div className="flex gap-1 ml-2">
                    <button
                      type="button"
                      onClick={() => startEditImage(image)}
                      className="text-blue-500 hover:text-blue-700 p-1"
                      title="Edit image"
                    >
                      <MdEdit className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleDeleteImage(image.id)}
                      className={`p-1 ${
                        isDeleted
                          ? "text-red-700 hover:text-red-800"
                          : "text-red-500 hover:text-red-700"
                      }`}
                      title="Mark for deletion"
                    >
                      <MdClose className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
        <p className="text-sm text-blue-700">
          <strong>✓ Keep & Modify:</strong> Click edit icon to change caption,
          order, or set as primary
        </p>
        <p className="text-sm text-red-700 mt-1">
          <strong>✗ Delete:</strong> Click close icon to mark for deletion
        </p>
      </div>
    </div>
  );
};

export default ExistingImagesSection;
