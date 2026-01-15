/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Custom hook to manage File objects outside Redux
 * Since File objects are not serializable, we store them in component state
 * while metadata is stored in Redux
 */

import { useRef, useCallback } from "react";
import { useAddNewLandState, useAddNewLandActions } from "./hooks";
import { ImageDetail } from "./types";

export const useImageFiles = () => {
  const fileMapRef = useRef<Map<string, File>>(new Map());
  const { imageMetadata } = useAddNewLandState();
  const { setImages, updateImageDetail, removeImage } = useAddNewLandActions();

  const addImageFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const fileArray = Array.from(files);
      const currentCount = imageMetadata.length;

      // Add new files to map and create metadata
      const newMetadata = fileArray.map((file, index) => {
        const id = `${Date.now()}-${Math.random()}`;
        fileMapRef.current.set(id, file);

        return {
          id,
          name: file.name,
          caption: "",
          isPrimary: currentCount === 0 && index === 0, // First image is primary if no images exist
          order: currentCount + index,
        };
      });

      // Update Redux with metadata only (not File objects)
      setImages([...imageMetadata, ...newMetadata]);
    },
    [imageMetadata, setImages]
  );

  const removeImageFile = useCallback(
    (index: number) => {
      const metadata = imageMetadata[index];
      if (metadata) {
        fileMapRef.current.delete(metadata.id);
      }
      removeImage(index);
    },
    [imageMetadata, removeImage]
  );

  const updateImageMetadata = useCallback(
    (index: number, field: keyof ImageDetail, value: any) => {
      updateImageDetail(index, field, value);
    },
    [updateImageDetail]
  );

  const getImageFile = useCallback((id: string): File | undefined => {
    return fileMapRef.current.get(id);
  }, []);

  const getAllFiles = useCallback((): File[] => {
    return imageMetadata
      .map((metadata) => fileMapRef.current.get(metadata.id))
      .filter((f) => f !== undefined) as File[];
  }, [imageMetadata]);

  const clearImageFiles = useCallback(() => {
    fileMapRef.current.clear();
  }, []);

  return {
    imageMetadata,
    addImageFiles,
    removeImageFile,
    updateImageMetadata,
    getImageFile,
    getAllFiles,
    clearImageFiles,
  };
};
