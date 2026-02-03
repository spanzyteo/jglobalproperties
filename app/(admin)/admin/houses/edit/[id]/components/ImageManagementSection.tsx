import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import Image from "next/image";
import ExistingImagesSection from "./ExistingImageSection";
import NewImagesSection from "./NewImageSection";

export type HouseImage = {
  id: string;
  url: string;
  publicId: string;
  caption: string | null;
  isPrimary: boolean;
  order: number;
};

export type ImageDetail = {
  caption: string;
  isPrimary: boolean;
  order: number;
};

interface ImageManagementSectionProps {
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
  newImages: File[];
  setNewImages: (files: File[]) => void;
  newImageDetails: ImageDetail[];
  setNewImageDetails: (details: ImageDetail[]) => void;
}

const ImageManagementSection: React.FC<ImageManagementSectionProps> = ({
  existingImages,
  imagesToKeep,
  setImagesToKeep,
  imagesToDelete,
  setImagesToDelete,
  newImages,
  setNewImages,
  newImageDetails,
  setNewImageDetails,
}) => {
  return (
    <div className="space-y-8">
      {/* Existing Images Section */}
      {existingImages.length > 0 && (
        <ExistingImagesSection
          existingImages={existingImages}
          imagesToKeep={imagesToKeep}
          setImagesToKeep={setImagesToKeep}
          imagesToDelete={imagesToDelete}
          setImagesToDelete={setImagesToDelete}
        />
      )}

      {/* New Images Section */}
      <NewImagesSection
        newImages={newImages}
        setNewImages={setNewImages}
        newImageDetails={newImageDetails}
        setNewImageDetails={setNewImageDetails}
        existingCount={existingImages.length}
      />
    </div>
  );
};

export default ImageManagementSection;
