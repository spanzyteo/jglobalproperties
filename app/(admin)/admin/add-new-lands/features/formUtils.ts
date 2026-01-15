/**
 * Form utility functions for Add New Land
 */

import { ImageDetail, LandFormData } from "./types";

/**
 * Build FormData from land form data
 * This prepares the data in the format expected by the API
 */
export const buildFormData = (data: LandFormData): FormData => {
  const formData = new FormData();

  // Add basic land information
  formData.append("title", data.title);
  formData.append("overview", data.overview);
  formData.append("location", data.location);
  formData.append("state", data.state);
  formData.append("country", data.country);
  formData.append("status", data.status);

  // Add optional meta fields
  if (data.metaTitle) {
    formData.append("metaTitle", data.metaTitle);
  }
  if (data.metaDescription) {
    formData.append("metaDescription", data.metaDescription);
  }

  // Add units
  data.units.forEach((unit, index) => {
    formData.append(`units[${index}][size]`, unit.size.toString());
    formData.append(`units[${index}][unit]`, unit.unit);
    formData.append(`units[${index}][price]`, unit.price);
    formData.append(`units[${index}][available]`, unit.available.toString());
  });

  // Add images
  data.images.forEach((image) => {
    formData.append("images", image);
  });

  // Add image details
  data.imageDetails.forEach((detail, index) => {
    if (detail.caption) {
      formData.append(`imageDetails[${index}][caption]`, detail.caption);
    }
    formData.append(
      `imageDetails[${index}][isPrimary]`,
      detail.isPrimary.toString()
    );
    formData.append(`imageDetails[${index}][order]`, detail.order.toString());
  });

  return formData;
};

/**
 * Validate land form data before submission
 */
export const validateLandForm = (
  data: LandFormData
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.title.trim()) {
    errors.push("Title is required");
  }

  if (!data.overview.trim()) {
    errors.push("Overview is required");
  }

  if (!data.location.trim()) {
    errors.push("Location is required");
  }

  if (!data.state.trim()) {
    errors.push("State is required");
  }

  if (data.units.length === 0) {
    errors.push("At least one unit is required");
  }

  // Validate units
  data.units.forEach((unit, index) => {
    if (unit.size <= 0) {
      errors.push(`Unit ${index + 1}: Size must be greater than 0`);
    }
    if (!unit.price.trim()) {
      errors.push(`Unit ${index + 1}: Price is required`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Handle image file selection
 */
export const handleImageFiles = (
  files: FileList | null
): { images: File[]; imageDetails: ImageDetail[] } => {
  if (!files || files.length === 0) {
    return { images: [], imageDetails: [] };
  }

  const imageArray = Array.from(files);
  const imageDetails = imageArray.map((_, index) => ({
    caption: "",
    isPrimary: index === 0,
    order: index,
  }));

  return {
    images: imageArray,
    imageDetails,
  };
};
