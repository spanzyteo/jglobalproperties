/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import { MdArrowBack } from "react-icons/md";
import Loader from "@/app/components/shared/Loader";

type BlogsImage = {
  id: string;
  url: string;
  publicId: string;
  caption: string | null;
  isPrimary: boolean;
  order: number;
};

type Tag = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

type BlogTag = {
  id: string;
  blogId: string;
  tagId: string;
  tag: Tag; // Single tag object, not array
};

type BlogCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

type BlogsType = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  status: string;
  viewCount: number;
  readTimeMinutes: number | null;
  category: BlogCategory;
  tags: BlogTag[]; // Array of BlogTag relationships
  images: BlogsImage[];
  totalComments: number;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: string;
  updatedAt: string;
  _count: {
    comments: number;
  };
};

type ApiResponse = {
  success: boolean;
  data: BlogsType;
};

const BlogId = () => {
  const { id: blogId } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<BlogsType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse>(
          `https://api.jglobalproperties.com/api/v1/blogs/${blogId}/admin`,
          {
            withCredentials: true,
          }
        );

        const { data } = response.data;
        console.log("Blog data:", data);
        setBlog(data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching blog details";
        toast.error(message);
        console.log("Error:", message);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateText = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
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

  if (!blog) {
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
              Blog not found.
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
            Back to Blogs
          </button>
          <div className="flex items-center justify-between">
            <h1 className="font-semibold sm:text-xl text-lg">
              Blog Details - {blog.title}
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/admin/blogs/edit/${blog.id}`)}
                className="px-4 py-2 bg-[#941A1A] text-white rounded hover:bg-[#941A1A]/80 text-sm cursor-pointer transition-all ease-in-out duration-500"
              >
                Edit Blog
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
                    <td className="p-3 text-gray-700">{blog.id}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Title</td>
                    <td className="p-3 text-gray-700">{blog.title}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Slug</td>
                    <td className="p-3 text-gray-700">{blog.slug}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Excerpt</td>
                    <td className="p-3 text-gray-700">
                      {blog.excerpt || "No excerpt available"}
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Content</td>
                    <td className="p-3 text-gray-700">
                      {truncateText(blog.content, 20)}
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Status</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          blog.status === "PUBLISHED"
                            ? "bg-green-100 text-green-800"
                            : blog.status === "DRAFT"
                            ? "bg-yellow-100 text-yellow-800"
                            : blog.status === "ARCHIVED"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">
                      View Count
                    </td>
                    <td className="p-3 text-gray-700">{blog.viewCount}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Read Time</td>
                    <td className="p-3 text-gray-700">
                      {blog.readTimeMinutes
                        ? `${blog.readTimeMinutes} minutes`
                        : "Not specified"}
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Category</td>
                    <td className="p-3 text-gray-700">
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {blog.category.name}
                      </span>
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Tags</td>
                    <td className="p-3">
                      {blog.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {blog.tags.map((tagRelation) => (
                            <span
                              key={tagRelation.id}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                            >
                              {tagRelation.tag.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400 italic">
                          No tags assigned
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">
                      Total Comments
                    </td>
                    <td className="p-3 text-gray-700">{blog.totalComments}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">
                      Created At
                    </td>
                    <td className="p-3 text-gray-700">
                      {formatDate(blog.createdAt)}
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">
                      Updated At
                    </td>
                    <td className="p-3 text-gray-700">
                      {formatDate(blog.updatedAt)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SEO Information */}
          {(blog.metaTitle || blog.metaDescription) && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                SEO Information
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <tbody>
                    {blog.metaTitle && (
                      <tr className="border border-gray-300">
                        <td className="p-3 font-semibold bg-gray-200 w-1/4">
                          Meta Title
                        </td>
                        <td className="p-3 text-gray-700">{blog.metaTitle}</td>
                      </tr>
                    )}
                    {blog.metaDescription && (
                      <tr className="border border-gray-300">
                        <td className="p-3 font-semibold bg-gray-200">
                          Meta Description
                        </td>
                        <td className="p-3 text-gray-700">
                          {blog.metaDescription}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Images */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Images ({blog.images.length})
            </h2>
            {blog.images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {blog.images
                  .sort((a, b) => a.order - b.order)
                  .map((image) => (
                    <div key={image.id} className="relative">
                      <Image
                        src={image.url}
                        alt={image.caption || `Blog image ${image.order + 1}`}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg"
                        unoptimized
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        {image.isPrimary && (
                          <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Primary
                          </span>
                        )}
                        <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                          #{image.order + 1}
                        </span>
                      </div>
                      {image.caption && (
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                            {image.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-500">
                No images available for this blog.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogId;
