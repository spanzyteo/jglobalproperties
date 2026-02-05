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
      <div className="mt-8 bg-[#F2F2F2] flex flex-col px-6 lg:px-8 py-8 rounded-xl mx-auto mb-8 pb-8 w-[95%] lg:w-full max-w-5xl lg:max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1A202C]">Add New Land</h1>
        </div>

        {/* Basic Information Section */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-[#4A5568] mb-6 pb-3 border-b border-gray-300">
            Basic Information
          </h2>
          <BasicInformationSection />
        </div>

        {/* Overview Section */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-[#4A5568] mb-6 pb-3 border-b border-gray-300">
            Overview
          </h2>
          <OverviewSection />
        </div>

        {/* Images Section */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-[#4A5568] mb-6 pb-3 border-b border-gray-300">
            Images
          </h2>
          <ImagesSection />
        </div>

        {/* Units Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#4A5568] mb-6 pb-3 border-b border-gray-300">
            Land Units
          </h2>
          <UnitsSection />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center lg:justify-start gap-4 mt-8">
          <button
            type="submit"
            disabled={state.isSubmitting}
            className="bg-[#941A1A] text-white px-8 py-3 rounded-[5px] hover:bg-[#7a1515] active:bg-[#5f0f0f] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold shadow-md hover:shadow-lg"
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
            className="bg-gray-400 text-gray-700 px-8 py-3 rounded-[5px] hover:bg-gray-500 transition-all duration-200 font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
