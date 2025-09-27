/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ThreeCircles } from "react-loader-spinner";
import { MdArrowBack } from "react-icons/md";

type TagsType = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse = {
  success: boolean;
  data: TagsType;
};

const TagsId = () => {
  const { id: tagsId } = useParams();
  const router = useRouter();
  const [tags, setTags] = useState<TagsType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTag = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse>(
          `https://jglobalproperties-api.onrender.com/api/v1/tags/${tagsId}`,
          {
            withCredentials: true,
          }
        );

        const { data } = response.data;
        console.log(data);
        setTags(data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching tags details";
        toast.error(message);
        console.log(message);
      }
    };

    if (tagsId) {
      fetchTag();
    }
  }, [tagsId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="bg-white flex flex-col h-[100vh]">
        <div className="xl:ml-[20rem] mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-[1014px] rounded-xl mx-auto mb-8 pb-8">
          <div className="flex items-center justify-center py-16">
            <ThreeCircles
              visible={true}
              height="50"
              width="50"
              color="#000000"
              ariaLabel="three-circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </div>
      </div>
    );
  }

  if (!tags) {
    return (
      <div className="bg-white flex flex-col h-[100vh]">
        <div className="xl:ml-[20rem] mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-[1014px] rounded-xl mx-auto mb-8 pb-8">
          <div className="mt-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
            >
              <MdArrowBack className="h-5 w-5" />
              Back
            </button>
            <h1 className="text-gray-600 text-lg text-center mt-8">
              Tag not found.
            </h1>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white flex flex-col min-h-screen">
      <div className="xl:ml-[20rem] mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-[1014px] rounded-xl mx-auto mb-8 pb-8">
        <div className="mt-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 cursor-pointer"
          >
            <MdArrowBack className="h-5 w-5" />
            Back to Tags
          </button>
          <div className="flex items-center justify-between">
            <h1 className="font-semibold sm:text-xl text-lg">
              Tags Details - {tags.name}
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/admin/tags/edit/${tags.id}`)}
                className="px-4 py-2 bg-[#941A1A] text-white rounded hover:bg-[#941A1A]/80 text-sm cursor-pointer transition-all ease-in-out duration-500"
              >
                Edit Tags
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Basic Information
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <tbody>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200 w-1/4">ID</td>
                    <td className="p-3 text-gray-700">{tags.id}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Name</td>
                    <td className="p-3 text-gray-700">{tags.name}</td>
                  </tr>

                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">
                      Created At
                    </td>
                    <td className="p-3 text-gray-700">
                      {formatDate(tags.createdAt)}
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">
                      Updated At
                    </td>
                    <td className="p-3 text-gray-700">
                      {formatDate(tags.updatedAt)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagsId;
