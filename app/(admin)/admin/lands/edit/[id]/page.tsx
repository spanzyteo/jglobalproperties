/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { MdArrowBack } from "react-icons/md";
import Loader from "@/app/components/shared/Loader";

import BasicInfoSection from "./components/BasicInfoSection";
import UnitsSection from "./components/UnitSection";
import ImageManagementSection from "./components/ImageManagementSection";

export type LandImage = {
  id: string;
  url: string;
  publicId: string;
  caption: string | null;
  isPrimary: boolean;
  order: number;
};

export type LandUnit = {
  id?: string;
  size: number;
  unit: string;
  price: string;
  available: boolean;
};

export type ImageDetail = {
  caption: string;
  isPrimary: boolean;
  order: number;
};

export type ManageImagesData = {
  keep?: Array<{
    id: string;
    caption?: string;
    isPrimary?: boolean;
    order?: number;
  }>;
  delete?: string[];
  newImageDetails?: ImageDetail[];
};

const EditLand = () => {
  const { id } = useParams();
  const router = useRouter();

  // Basic land information
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [status, setStatus] = useState("FOR_SALE");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  // Units state
  const [units, setUnits] = useState<LandUnit[]>([
    { size: 0, unit: "sqm", price: "", available: true },
  ]);

  // Images state
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImageDetails, setNewImageDetails] = useState<ImageDetail[]>([]);
  const [existingImages, setExistingImages] = useState<LandImage[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [imagesToKeep, setImagesToKeep] = useState<
    Array<{ id: string; caption?: string; isPrimary?: boolean; order?: number }>
  >([]);

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  // Fetch land data
  useEffect(() => {
    const fetchLand = async () => {
      try {
        setFetchLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/lands/${id}`,
          { withCredentials: true },
        );

        const { data } = response.data;

        // Set basic information
        setTitle(data.title || "");
        setOverview(data.overview || "");
        setLocation(data.location || "");
        setState(data.state || "");
        setCountry(data.country || "Nigeria");
        setStatus(data.status || "FOR_SALE");
        setMetaTitle(data.metaTitle || "");
        setMetaDescription(data.metaDescription || "");

        // Set units
        if (data.units && data.units.length > 0) {
          setUnits(data.units);
        }

        // Set existing images
        if (data.images && data.images.length > 0) {
          const sorted = [...data.images].sort(
            (a: LandImage, b: LandImage) => a.order - b.order,
          );
          setExistingImages(sorted);
          // Initialize imagesToKeep with all existing images
          setImagesToKeep(
            sorted.map((img: LandImage) => ({
              id: img.id,
              caption: img.caption || undefined,
              isPrimary: img.isPrimary,
              order: img.order,
            })),
          );
        }

        setFetchLoading(false);
      } catch (error: any) {
        setFetchLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching land data";
        toast.error(message);
      }
    };

    if (id) {
      fetchLand();
    }
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Add basic land data
      formData.append("title", title);
      formData.append("overview", overview);
      formData.append("location", location);
      formData.append("state", state);
      formData.append("country", country);
      formData.append("status", status);

      if (metaTitle) formData.append("metaTitle", metaTitle);
      if (metaDescription) formData.append("metaDescription", metaDescription);

      // Add units data - structure as form fields for proper validation
      const validUnits = units.filter((unit) => unit.size > 0 && unit.price);
      validUnits.forEach((unit, index) => {
        formData.append(`units[${index}][size]`, unit.size.toString());
        formData.append(`units[${index}][unit]`, unit.unit);
        formData.append(`units[${index}][price]`, unit.price);
        formData.append(
          `units[${index}][available]`,
          unit.available.toString(),
        );
      });

      // Add new images to formData (field name is "image" - singular)
      if (newImages.length > 0) {
        newImages.forEach((image) => {
          formData.append("image", image);
        });
      }

      // Build manageImages data as JSON object and stringify it
      const manageImagesData: ManageImagesData = {};

      if (imagesToKeep.length > 0) {
        const activeImages = imagesToKeep.filter(
          (img) => !imagesToDelete.includes(img.id),
        );

        if (activeImages.length > 0) {
          manageImagesData.keep = activeImages.map((img) => {
            const keepItem: any = { id: img.id };
            if (img.caption !== undefined) keepItem.caption = img.caption;
            if (img.isPrimary !== undefined) keepItem.isPrimary = img.isPrimary;
            if (img.order !== undefined) keepItem.order = img.order;
            return keepItem;
          });
        }
      }

      if (imagesToDelete.length > 0) {
        manageImagesData.delete = imagesToDelete;
      }

      if (newImageDetails.length > 0) {
        manageImagesData.newImageDetails = newImageDetails;
      }

      // Send as JSON string (ONLY way - don't add duplicate nested array notation!)
      if (
        manageImagesData.keep ||
        manageImagesData.delete ||
        manageImagesData.newImageDetails
      ) {
        formData.append("manageImages", JSON.stringify(manageImagesData));
      }

      console.log("FormData being sent:", {
        manageImages: manageImagesData,
        newImagesCount: newImages.length,
        imagesToDeleteCount: imagesToDelete.length,
      });

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/lands/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (response.data.success) {
        toast.success("Land updated successfully!");
        router.push("/admin/lands");
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const message =
        error.response?.data?.message ||
        "An error occurred while updating the land";
      toast.error(message);
    }
  };

  if (fetchLoading) {
    return (
      <div className="bg-white min-h-screen w-full flex flex-col pb-12">
        <div className="xl:ml-108 mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-194.25 rounded-xl mx-auto mb-8 pb-8">
          <div className="flex items-center justify-center py-16">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen w-full flex flex-col pb-12">
      <form onSubmit={handleSubmit}>
        <div className="xl:ml-108 mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-194.25 rounded-xl mx-auto mb-8 pb-8">
          {/* Header */}
          <div className="mt-4 mb-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
            >
              <MdArrowBack className="h-5 w-5" />
              Back to lands
            </button>
            <h1 className="text-xl font-semibold">Edit Land Information</h1>
          </div>

          {/* Basic Information Section */}
          <BasicInfoSection
            title={title}
            setTitle={setTitle}
            overview={overview}
            setOverview={setOverview}
            location={location}
            setLocation={setLocation}
            state={state}
            setState={setState}
            country={country}
            setCountry={setCountry}
            status={status}
            setStatus={setStatus}
            metaTitle={metaTitle}
            setMetaTitle={setMetaTitle}
            metaDescription={metaDescription}
            setMetaDescription={setMetaDescription}
          />

          {/* Units Section */}
          <UnitsSection units={units} setUnits={setUnits} />

          {/* Image Management Section */}
          <ImageManagementSection
            existingImages={existingImages}
            imagesToKeep={imagesToKeep}
            setImagesToKeep={setImagesToKeep}
            imagesToDelete={imagesToDelete}
            setImagesToDelete={setImagesToDelete}
            newImages={newImages}
            setNewImages={setNewImages}
            newImageDetails={newImageDetails}
            setNewImageDetails={setNewImageDetails}
          />
        </div>

        {/* Submit Button */}
        <div className="xl:ml-108 flex justify-center xl:justify-start">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#941A1A] flex items-center justify-center h-10 w-35 text-white rounded-[5px] mb-10 text-[14px] font-semibold hover:opacity-75 active:opacity-55 transition-all duration-500 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Land"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditLand;
