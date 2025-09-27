/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ThreeCircles } from "react-loader-spinner";
import { MdArrowBack } from "react-icons/md";

const EditTag = () => {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setFetchLoading(true);
        const response = await axios.get(
          `https://jglobalproperties-api.onrender.com/api/v1/tags/${id}`,
          {
            withCredentials: true,
          }
        );

        const { data } = response.data;

        // Set basic information
        setName(data.name || "");
        setFetchLoading(false);
      } catch (error: any) {
        setFetchLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching tags data";
        toast.error(message);
      }
    };

    if (id) {
      fetchTags();
    }
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);

      const response = await axios.patch(
        `https://jglobalproperties-api.onrender.com/api/v1/tags/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Tags updated successfully!");
        router.push("/admin/tags");
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const message =
        error.response?.data?.message ||
        "An error occurred while updating the tags";
      toast.error(message);
    }
  };

  if (fetchLoading) {
    return (
      <div className="bg-white min-h-screen w-full flex flex-col pb-[3rem]">
        <div className="xl:ml-[27rem] mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-[777px] rounded-xl mx-auto mb-8 pb-8">
          <div className="flex items-center justify-center py-16">
            <ThreeCircles
              visible={true}
              height="50"
              width="50"
              color="#000000"
              ariaLabel="three-circles-loading"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen w-full flex flex-col pb-[3rem]">
      <form onSubmit={handleSubmit}>
        <div className="xl:ml-[27rem] mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-[777px] rounded-xl mx-auto mb-8 pb-8">
          {/* Header */}
          <div className="mt-4 mb-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
            >
              <MdArrowBack className="h-5 w-5" />
              Back to Tags
            </button>
            <h1 className="text-xl font-semibold">Edit Tags Information</h1>
          </div>

          {/* Basic Information */}
          <div className="space-y-6">
            {/* Name */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <h1 className="font-semibold text-[#4A5568] lg:w-32">Name</h1>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tags title"
                className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-[539px] w-full py-[10px] pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
                required
              />
            </div>

          </div>
        </div>

        {/* Submit Button */}
        <div className="xl:ml-[27rem] flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#941A1A] flex items-center justify-center h-[40px] w-[140px] text-white rounded-[5px] mb-10 text-[14px] font-semibold hover:opacity-75 active:opacity-55 transition-all duration-500 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Tags"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTag;
