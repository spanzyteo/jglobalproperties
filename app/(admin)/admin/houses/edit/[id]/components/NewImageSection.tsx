/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { MdClose } from "react-icons/md";

export type ImageDetail = {
  caption: string;
  isPrimary: boolean;
  order: number;
};

interface NewImagesSectionProps {
  newImages: File[];
  setNewImages: (files: File[]) => void;
  newImageDetails: ImageDetail[];
  setNewImageDetails: (details: ImageDetail[]) => void;
  existingCount: number;
}

const NewImagesSection: React.FC<NewImagesSectionProps> = ({
  newImages,
  setNewImages,
  newImageDetails,
  setNewImageDetails,
  existingCount,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setNewImages([...newImages, ...fileArray]);

      // Create image details for new images
      const newDetails = fileArray.map((_, index) => ({
        caption: "",
        isPrimary: newImages.length === 0 && existingCount === 0 && index === 0,
        order: newImages.length + existingCount + index,
      }));

      setNewImageDetails([...newImageDetails, ...newDetails]);
    }
  };

  const removeImage = (index: number) => {
    setNewImages(newImages.filter((_, i) => i !== index));
    setNewImageDetails(newImageDetails.filter((_, i) => i !== index));
  };

  const updateImageDetail = (
    index: number,
    field: keyof ImageDetail,
    value: any,
  ) => {
    setNewImageDetails(
      newImageDetails.map((detail, i) =>
        i === index ? { ...detail, [field]: value } : detail,
      ),
    );
  };

  const setPrimaryImage = (index: number) => {
    setNewImageDetails(
      newImageDetails.map((detail, i) => ({
        ...detail,
        isPrimary: i === index,
      })),
    );
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-[#4A5568] mb-4">
        Add New Images
      </h2>

      {/* File Input */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-6">
        <h1 className="font-semibold text-[#4A5568] lg:w-32">Images</h1>
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
              {newImages.length > 0
                ? `${newImages.length} file(s) selected`
                : "No files chosen"}
            </span>
          </label>
        </div>
      </div>

      {/* New Images Preview */}
      {newImages.length > 0 && (
        <div className="space-y-4">
          {newImages.map((image, index) => (
            <ImagePreviewCard
              key={index}
              index={index}
              image={image}
              detail={newImageDetails[index]}
              onRemove={() => removeImage(index)}
              onUpdateDetail={(field, value) =>
                updateImageDetail(index, field, value)
              }
              onSetPrimary={() => setPrimaryImage(index)}
            />
          ))}
        </div>
      )}

      {newImages.length === 0 && (
        <div className="p-4 bg-gray-50 rounded border border-gray-200">
          <p className="text-sm text-gray-500 italic">
            No new images selected. Upload images to add them to the gallery.
          </p>
        </div>
      )}
    </div>
  );
};

interface ImagePreviewCardProps {
  index: number;
  image: File;
  detail: ImageDetail;
  onRemove: () => void;
  onUpdateDetail: (field: keyof ImageDetail, value: any) => void;
  onSetPrimary: () => void;
}

const ImagePreviewCard: React.FC<ImagePreviewCardProps> = ({
  index,
  image,
  detail,
  onRemove,
  onUpdateDetail,
  onSetPrimary,
}) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white">
      <div className="flex items-start gap-4">
        <Image
          src={URL.createObjectURL(image)}
          alt={`Preview ${index + 1}`}
          width={80}
          height={80}
          className="w-20 h-20 object-cover rounded shrink-0"
          unoptimized
        />

        <div className="flex-1 space-y-3">
          {/* File Name */}
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-700 truncate">{image.name}</h4>
            <button
              type="button"
              onClick={onRemove}
              className="text-red-500 hover:text-red-700 shrink-0"
              title="Remove image"
            >
              <MdClose className="h-5 w-5" />
            </button>
          </div>

          {/* Caption and Order */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Caption
              </label>
              <input
                type="text"
                value={detail?.caption || ""}
                onChange={(e) => onUpdateDetail("caption", e.target.value)}
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
                value={detail?.order || index}
                onChange={(e) =>
                  onUpdateDetail("order", parseInt(e.target.value) || index)
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Primary Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`primary-${index}`}
              checked={detail?.isPrimary || false}
              onChange={(e) => {
                if (e.target.checked) {
                  onSetPrimary();
                }
              }}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor={`primary-${index}`}
              className="text-sm font-medium text-gray-700"
            >
              Set as primary image
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewImagesSection;
