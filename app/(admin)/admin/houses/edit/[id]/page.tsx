/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdArrowBack, MdClose, MdAdd } from "react-icons/md";
import Image from "next/image";
import Loader from "@/app/components/shared/Loader";
import Editor from "../../../components/editor/TipTapEditor";

type HouseImage = {
  id: string;
  url: string;
  publicId: string;
  caption: string | null;
  isPrimary: boolean;
  order: number;
};

type HouseUnit = {
  id: string;
  size: number;
  unit: string;
  price: string;
  available: boolean;
};

type ImageDetail = {
  caption: string;
  isPrimary: boolean;
  order: number;
};

const EditHouse = () => {
  const { id } = useParams();
  const router = useRouter();

  // Basic house information
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("FINISHED_HOMES");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  // Units state
  const [units, setUnits] = useState<
    Array<{ size: number; unit: string; price: string; available: boolean }>
  >([{ size: 0, unit: "sqm", price: "", available: true }]);

  // Images state
  const [images, setImages] = useState<File[]>([]);
  const [imageDetails, setImageDetails] = useState<ImageDetail[]>([]);
  const [existingImages, setExistingImages] = useState<HouseImage[]>([]);

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  const categoriesOptions = [
    { value: "FINISHED_HOMES", label: "Finished Homes" },
    { value: "OFF_PLAN_HOMES", label: "Off Plan Homes" },
  ];

  const unitOptions = ["sqm", "acres", "hectares", "plots"];

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        setFetchLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/houses/${id}`,
          {
            withCredentials: true,
          }
        );

        const { data } = response.data;
        console.log("Fetched house data:", data);

        //Set basic information
        setTitle(data.title || "");
        setOverview(data.overview || "");
        setLocation(data.location || "");
        setState(data.state || "");
        setCountry(data.country || "Nigeria");
        setCategory(data.category || "FINISHED_HOMES");
        setPrice(data.price || "");
        setMetaTitle(data.metaTitle || "");
        setMetaDescription(data.metaDescription || "");

        // Set units
        if (data.units && data.units.length > 0) {
          setUnits(
            data.units.map((unit: HouseUnit) => ({
              size: unit.size,
              unit: unit.unit,
              price: unit.price,
              available: unit.available,
            }))
          );
        }

        // Set existing images
        if (data.images && data.images.length > 0) {
          setExistingImages(
            data.images.sort(
              (a: HouseImage, b: HouseImage) => a.order - b.order
            )
          );
        }

        setFetchLoading(false);
      } catch (error: any) {
        setFetchLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching house data";
        toast.error(message);
      }
    };

    if (id) {
      fetchHouse();
    }
  }, [id]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImages((prev) => [...prev, ...fileArray]);

      // Create image details for new images
      const newImageDetails = fileArray.map((_, index) => ({
        caption: "",
        isPrimary:
          images.length === 0 && existingImages.length === 0 && index === 0,
        order: images.length + existingImages.length + index,
      }));

      setImageDetails((prev) => [...prev, ...newImageDetails]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageDetails((prev) => prev.filter((_, i) => i !== index));
  };

  const updateImageDetail = (
    index: number,
    field: keyof ImageDetail,
    value: any
  ) => {
    setImageDetails((prev) =>
      prev.map((detail, i) =>
        i === index ? { ...detail, [field]: value } : detail
      )
    );
  };

  const setPrimaryImage = (index: number) => {
    setImageDetails((prev) =>
      prev.map((detail, i) => ({
        ...detail,
        isPrimary: i === index,
      }))
    );
  };

  const addUnit = () => {
    setUnits((prev) => [
      ...prev,
      { size: 0, unit: "sqm", price: "", available: true },
    ]);
  };

  const removeUnit = (index: number) => {
    if (units.length > 1) {
      setUnits((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const updateUnit = (
    index: number,
    field: keyof (typeof units)[0],
    value: any
  ) => {
    setUnits((prev) =>
      prev.map((unit, i) => (i === index ? { ...unit, [field]: value } : unit))
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Add basic house data
      formData.append("title", title);
      formData.append("overview", overview);
      formData.append("location", location);
      formData.append("state", state);
      formData.append("country", country);
      formData.append("category", category);
      formData.append("price", price);

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
          unit.available.toString()
        );
      });

      // Add images - only if there are new images to upload
      if (images.length > 0) {
        images.forEach((image, index) => {
          formData.append("images", image);
        });

        // Add image details - structure as form fields for proper validation
        if (imageDetails.length > 0) {
          imageDetails.forEach((detail, index) => {
            if (detail.caption) {
              formData.append(
                `imageDetails[${index}][caption]`,
                detail.caption
              );
            }
            formData.append(
              `imageDetails[${index}][isPrimary]`,
              detail.isPrimary.toString()
            );
            formData.append(
              `imageDetails[${index}][order]`,
              detail.order.toString()
            );
          });
        }
      }

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/houses/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      // Handle boolean or object response
      if (response.data.success) {
        toast.success("House updated successfully!");
        router.push("/admin/houses");
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const message =
        error.response?.data?.message ||
        "An error occurred while updating the house";
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
              Back to houses
            </button>
            <h1 className="text-xl font-semibold">Edit house Information</h1>
          </div>

          {/* Basic Information */}
          <div className="space-y-6">
            {/* Title */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <h1 className="font-semibold text-[#4A5568] lg:w-32">Title</h1>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="House title"
                className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
                required
              />
            </div>

            {/* Overview */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
              <h1 className="font-semibold text-[#4A5568] lg:w-32">Overview</h1>
              <div className="lg:w-134.75 w-full">
                <Editor
                  value={overview}
                  onChange={(val) => setOverview(val || "")}
                />
              </div>
            </div>

            {/* Location */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <h1 className="font-semibold text-[#4A5568] lg:w-32">Location</h1>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Victoria Island"
                className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
                required
              />
            </div>

            {/* State */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <h1 className="font-semibold text-[#4A5568] lg:w-32">State</h1>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="e.g., Lagos"
                className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
                required
              />
            </div>

            {/* Country */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <h1 className="font-semibold text-[#4A5568] lg:w-32">Country</h1>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
                required
              />
            </div>

            {/* Category */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <h1 className="font-semibold text-[#4A5568] lg:w-32">Category</h1>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="focus:outline-none border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 rounded-[5px] text-[#4A5568] pl-3"
                required
              >
                {categoriesOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <h1 className="font-semibold text-[#4A5568] lg:w-32">Price</h1>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
                required
              />
            </div>

            {/* Meta Title */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <h1 className="font-semibold text-[#4A5568] lg:w-32">
                Meta Title
              </h1>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="SEO meta title (optional)"
                className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
              />
            </div>

            {/* Meta Description */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
              <h1 className="font-semibold text-[#4A5568] lg:w-32">
                Meta Description
              </h1>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="SEO meta description (optional)"
                rows={3}
                className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568] resize-vertical"
              />
            </div>
          </div>

          {/* Units Section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#4A5568]">
                House Units
              </h2>
              <button
                type="button"
                onClick={addUnit}
                className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                <MdAdd className="h-4 w-4" />
                Add Unit
              </button>
            </div>

            {units.map((unit, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-4 mb-4 bg-white"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-700">
                    Unit #{index + 1}
                  </h3>
                  {units.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeUnit(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <MdClose className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Size
                    </label>
                    <input
                      type="number"
                      value={unit.size || ""}
                      onChange={(e) =>
                        updateUnit(
                          index,
                          "size",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      placeholder="e.g., 1000"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit Type
                    </label>
                    <select
                      value={unit.unit}
                      onChange={(e) =>
                        updateUnit(index, "unit", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                      {unitOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (₦)
                    </label>
                    <input
                      type="text"
                      value={unit.price}
                      onChange={(e) =>
                        updateUnit(index, "price", e.target.value)
                      }
                      placeholder="e.g., 2400000"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available
                    </label>
                    <select
                      value={unit.available.toString()}
                      onChange={(e) =>
                        updateUnit(
                          index,
                          "available",
                          e.target.value === "true",
                        )
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                      <option value="true">Available</option>
                      <option value="false">Not Available</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-[#4A5568] mb-4">
                Existing Images
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {existingImages.map((image) => (
                  <div
                    key={image.id}
                    className="relative border rounded-lg overflow-hidden"
                  >
                    <Image
                      src={image.url}
                      alt={image.caption || `Image ${image.order + 1}`}
                      width={300}
                      height={200}
                      className="w-full h-32 object-cover"
                      unoptimized
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      {image.isPrimary && (
                        <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                          Primary
                        </span>
                      )}
                      <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                        #{image.order + 1}
                      </span>
                    </div>
                    {image.caption && (
                      <div className="p-2 bg-gray-50">
                        <p className="text-sm text-gray-700">{image.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Note: To modify existing images, you&apos;ll need to upload new
                ones. Existing images will be replaced.
              </p>
            </div>
          )}

          {/* Add New Images */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-[#4A5568] mb-4">
              Add New Images
            </h2>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
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
                    {images.length > 0
                      ? `${images.length} file(s) selected`
                      : "No files chosen"}
                  </span>
                </label>
              </div>
            </div>

            {/* New Images Preview */}
            {images.length > 0 && (
              <div className="mt-6 space-y-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 rounded-lg p-4 bg-white"
                  >
                    <div className="flex items-start gap-4">
                      <Image
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded"
                        unoptimized
                      />
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-700">
                            {image.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <MdClose className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Caption
                            </label>
                            <input
                              type="text"
                              value={imageDetails[index]?.caption || ""}
                              onChange={(e) =>
                                updateImageDetail(
                                  index,
                                  "caption",
                                  e.target.value,
                                )
                              }
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
                              value={imageDetails[index]?.order || index}
                              onChange={(e) =>
                                updateImageDetail(
                                  index,
                                  "order",
                                  parseInt(e.target.value) || index,
                                )
                              }
                              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`primary-${index}`}
                            checked={imageDetails[index]?.isPrimary || false}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setPrimaryImage(index);
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
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="xl:ml-108 flex justify-center xl:justify-start">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#941A1A] flex items-center justify-center h-10 w-35 text-white rounded-[5px] mb-10 text-[14px] font-semibold hover:opacity-75 active:opacity-55 transition-all duration-500 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update House"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditHouse;
