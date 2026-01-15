/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Context for managing image files across the entire form
 * This ensures all components share the same file Map instance
 */

import React, { createContext, useContext, useRef, useCallback } from "react";
import { ImageDetail } from "./types";

interface ImageFilesContextType {
  imageMetadata: Array<{ id: string; name: string } & ImageDetail>;
  addImageFiles: (files: FileList | null) => void;
  removeImageFile: (index: number) => void;
  updateImageMetadata: (
    index: number,
    field: keyof ImageDetail,
    value: any
  ) => void;
  getImageFile: (id: string) => File | undefined;
  getAllFiles: () => File[];
  clearImageFiles: () => void;
  setImageMetadata: (
    metadata: Array<{ id: string; name: string } & ImageDetail>
  ) => void;
}

const ImageFilesContext = createContext<ImageFilesContextType | null>(null);

export const ImageFilesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const fileMapRef = useRef<Map<string, File>>(new Map());
  const [imageMetadata, setImageMetadata] = React.useState<
    Array<{ id: string; name: string } & ImageDetail>
  >([]);

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
          isPrimary: currentCount === 0 && index === 0,
          order: currentCount + index,
        };
      });

      // Update metadata
      setImageMetadata((prev) => [...prev, ...newMetadata]);
    },
    [imageMetadata.length]
  );

  const removeImageFile = useCallback((index: number) => {
    setImageMetadata((prev) => {
      const metadata = prev[index];
      if (metadata) {
        fileMapRef.current.delete(metadata.id);
      }
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const updateImageMetadata = useCallback(
    (index: number, field: keyof ImageDetail, value: any) => {
      setImageMetadata((prev) =>
        prev.map((metadata, i) =>
          i === index ? { ...metadata, [field]: value } : metadata
        )
      );
    },
    []
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
    setImageMetadata([]);
  }, []);

  const value: ImageFilesContextType = {
    imageMetadata,
    addImageFiles,
    removeImageFile,
    updateImageMetadata,
    getImageFile,
    getAllFiles,
    clearImageFiles,
    setImageMetadata,
  };

  return (
    <ImageFilesContext.Provider value={value}>
      {children}
    </ImageFilesContext.Provider>
  );
};

export const useImageFilesContext = (): ImageFilesContextType => {
  const context = useContext(ImageFilesContext);
  if (!context) {
    throw new Error(
      "useImageFilesContext must be used within ImageFilesProvider"
    );
  }
  return context;
};
