/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdArrowBack } from "react-icons/md";
import Loader from "@/app/components/shared/Loader";

type CategoriesType = {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    blogs: number;
  };
};

type ApiResponse = {
  success: boolean;
  data: CategoriesType;
};

const CategoriesId = () => {
  const { id: categoryId } = useParams();
  const router = useRouter();
  const [category, setCategory] = useState<CategoriesType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/${categoryId}`,
          {
            withCredentials: true,
          }
        );

        const { data } = response.data;
        setCategory(data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching category details";
        toast.error(message);
        console.log(message);
      }
    };

    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);

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
      <div className="bg-white flex flex-col h-screen">
        <div className="xl:ml-80 mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-253.5 rounded-xl mx-auto mb-8 pb-8">
          <div className="flex items-center justify-center py-16">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="bg-white flex flex-col h-screen">
        <div className="xl:ml-80 mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-253.5 rounded-xl mx-auto mb-8 pb-8">
          <div className="mt-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
            >
              <MdArrowBack className="h-5 w-5" />
              Back
            </button>
            <h1 className="text-gray-600 text-lg text-center mt-8">
              Category not found.
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-col min-h-screen">
      <div className="xl:ml-80 mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-253.5 rounded-xl mx-auto mb-8 pb-8">
        <div className="mt-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 cursor-pointer"
          >
            <MdArrowBack className="h-5 w-5" />
            Back to Categories
          </button>
          <div className="flex items-center justify-between">
            <h1 className="font-semibold sm:text-xl text-lg">
              Category Details - {category.name}
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  router.push(`/admin/categories/edit/${category.id}`)
                }
                className="px-4 py-2 bg-[#941A1A] text-white rounded hover:bg-[#941A1A]/80 text-sm cursor-pointer transition-all ease-in-out duration-500"
              >
                Edit Category
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
                    <td className="p-3 text-gray-700">{category.id}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Name</td>
                    <td className="p-3 text-gray-700">{category.name}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Slug</td>
                    <td className="p-3 text-gray-700">{category.slug}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">
                      Description
                    </td>
                    <td className="p-3 text-gray-700">
                      {category.description}
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">
                      Created At
                    </td>
                    <td className="p-3 text-gray-700">
                      {formatDate(category.createdAt)}
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">
                      Updated At
                    </td>
                    <td className="p-3 text-gray-700">
                      {formatDate(category.updatedAt)}
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

export default CategoriesId;
