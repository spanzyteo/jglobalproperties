/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MDEditor from "@uiw/react-markdown-editor";
import { MdClose, MdAdd } from "react-icons/md";
import Editor from "../components/editor/TipTapEditor";

type ImageDetail = {
  caption: string;
  isPrimary: boolean;
  order: number;
};

type Unit = {
  size: number;
  unit: string;
  price: string;
  available: boolean;
};

const AddNewHouse = () => {
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

  // Images
  const [images, setImages] = useState<File[]>([]);
  const [imageDetails, setImageDetails] = useState<ImageDetail[]>([]);

  // Units
  const [units, setUnits] = useState<Unit[]>([
    { size: 0, unit: "sqm", price: "", available: true },
  ]);

  const [loading, setLoading] = useState(false);

  const categoryOptions = [
    { value: "FINISHED_HOMES", label: "Finished Homes" },
    { value: "OFF_PLAN_HOMES", label: "Off Plan Homes" },
  ];

  const unitOptions = ["sqm", "sqft", "rooms", "bedrooms"];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImages(fileArray);

      // Create image details for each image
      const imageDetails = fileArray.map((_, index) => ({
        caption: "",
        isPrimary: index === 0, // First image is primary by default
        order: index,
      }));

      setImageDetails(imageDetails);
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

  // Unit management
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

  const updateUnit = (index: number, field: keyof Unit, value: any) => {
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
      formData.append("price", price);
      formData.append("category", category);

      if (metaTitle) formData.append("metaTitle", metaTitle);
      if (metaDescription) formData.append("metaDescription", metaDescription);

      // Add units
      units.forEach((unit, index) => {
        formData.append(`units[${index}][size]`, unit.size.toString());
        formData.append(`units[${index}][unit]`, unit.unit);
        formData.append(`units[${index}][price]`, unit.price);
        formData.append(
          `units[${index}][available]`,
          unit.available.toString()
        );
      });

      // Add images
      images.forEach((image, index) => {
        formData.append("images", image);
      });

      // Add image details
      imageDetails.forEach((detail, index) => {
        if (detail.caption) {
          formData.append(`imageDetails[${index}][caption]`, detail.caption);
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

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/houses`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("House added successfully!");
        router.push("/admin/houses");
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const message =
        error.response?.data?.message ||
        "An error occurred while adding the house";
      toast.error(message);
    }
  };

  return (
    <div className="bg-white flex flex-col pb-12">
      <form onSubmit={handleSubmit}>
        <div className="xl:ml-108 mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-194.25 rounded-xl mx-auto mb-8 pb-8">
          <h1 className="text-xl font-semibold mt-4">House Information</h1>

          {/* Title */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Title</h1>
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
          <div className="flex flex-col lg:flex-row lg:items-start justify-between mt-6 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Overview</h1>
            <div className="lg:w-134.75 w-full">
              <Editor
                value={overview}
                onChange={(val) => setOverview(val || "")}
              />
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Location</h1>
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
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">State</h1>
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
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Country</h1>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
              required
            />
          </div>

          {/* Price */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Price</h1>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g., 2300000"
              className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
              required
            />
          </div>

          {/* Category */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Category</h1>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="focus:outline-none border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 rounded-[5px] text-[#4A5568] pl-3"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
                      placeholder="e.g., 300"
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
                      placeholder="e.g., 5000000"
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

          {/* Images */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Images</h1>
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

          {/* Image Preview and Details */}
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

          {/* Meta Title */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Meta Title</h1>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="SEO meta title (optional)"
              className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
            />
          </div>

          {/* Meta Description */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between mt-4 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Meta Description</h1>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="SEO meta description (optional)"
              rows={3}
              className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568] resize-vertical"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#941A1A] flex items-center justify-center h-10 w-35 text-white rounded-[5px] mb-10 text-[14px] font-semibold xl:ml-108 mx-auto hover:opacity-75 active:opacity-55 transition-all duration-500 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddNewHouse;
