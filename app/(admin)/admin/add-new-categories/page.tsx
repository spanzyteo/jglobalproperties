/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AddNewCategory = () => {
  const router = useRouter();

  // Category information
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validation
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    if (!description.trim()) {
      toast.error("Category description is required");
      return;
    }

    setLoading(true);

    try {
      const requestData = {
        name: name.trim(),
        description: description.trim(),
      };

      const response = await axios.post(
        "https://api.jglobalproperties.com/api/v1/categories",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Category added successfully!");
        router.push("/admin/categories");
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const message =
        error.response?.data?.message ||
        "An error occurred while adding the category";
      toast.error(message);
    }
  };

  return (
    <div className="bg-white flex flex-col pb-12">
      <form onSubmit={handleSubmit}>
        <div className="xl:ml-108 mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-194.25 rounded-xl mx-auto mb-8 pb-8">
          <h1 className="text-xl font-semibold mt-4">Category Information</h1>

          {/* Name */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Name</h1>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between mt-6 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Description</h1>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Category description"
              rows={4}
              className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568] resize-vertical"
              required
            />
          </div>

          {/* Info Note */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> The category slug will be automatically
              generated from the name.
            </p>
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

export default AddNewCategory;
