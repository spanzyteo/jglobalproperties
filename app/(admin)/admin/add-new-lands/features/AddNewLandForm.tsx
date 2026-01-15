/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Main AddNewLand Container Component
 * Integrates all form sections and handles submission
 */

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAddNewLandState, useAddNewLandActions } from "./hooks";
import { useImageFilesContext } from "./ImageFilesContext";
import { validateLandForm, buildFormData } from "./formUtils";
import { landApi } from "./landApi";
import {
  BasicInformationSection,
  OverviewSection,
  ImagesSection,
  UnitsSection,
} from "./components";

export const AddNewLandFormContent: React.FC = () => {
  const router = useRouter();
  const state = useAddNewLandState();
  const { setIsSubmitting, resetForm } = useAddNewLandActions();
  const { getAllFiles, imageMetadata, clearImageFiles } =
    useImageFilesContext();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Get actual File objects
    const imageFiles = getAllFiles();

    // Validate form
    const validation = validateLandForm({
      title: state.title,
      overview: state.overview,
      location: state.location,
      state: state.state,
      country: state.country,
      status: state.status,
      metaTitle: state.metaTitle,
      metaDescription: state.metaDescription,
      images: imageFiles,
      imageDetails: imageMetadata,
      units: state.units,
    });

    if (!validation.isValid) {
      validation.errors.forEach((error) => toast.error(error));
      return;
    }

    setIsSubmitting(true);

    try {
      // Build form data with actual File objects
      const formData = buildFormData({
        title: state.title,
        overview: state.overview,
        location: state.location,
        state: state.state,
        country: state.country,
        status: state.status,
        metaTitle: state.metaTitle,
        metaDescription: state.metaDescription,
        images: imageFiles,
        imageDetails: imageMetadata,
        units: state.units,
      });

      // Submit to API
      const response = await landApi.createLand(formData);

      if (response.success) {
        toast.success("Land added successfully!");
        resetForm();
        clearImageFiles();
        router.push("/admin/lands");
      } else {
        toast.error(response.message || "Failed to add land");
      }
    } catch (error: any) {
      const errorMessage = error.message || "An error occurred";
      toast.error(errorMessage);
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="xl:ml-108 mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-194.25 rounded-xl mx-auto mb-8 pb-8">
        <h1 className="text-xl font-semibold mt-4">Land Information</h1>

        <div className="mt-6 space-y-6">
          {/* Basic Information */}
          <BasicInformationSection />

          {/* Overview */}
          <OverviewSection />

          {/* Images */}
          <ImagesSection />

          {/* Units */}
          <UnitsSection />
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex gap-4">
          <button
            type="submit"
            disabled={state.isSubmitting}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {state.isSubmitting ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Submitting...
              </>
            ) : (
              "Add Land"
            )}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
