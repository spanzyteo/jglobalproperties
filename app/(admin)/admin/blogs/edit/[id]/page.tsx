/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdArrowBack, MdClose } from "react-icons/md";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Image from "next/image";
import Loader from "@/app/components/shared/Loader";

type BlogsImage = {
  id: string;
  url: string;
  publicId: string;
  caption: string | null;
  isPrimary: boolean;
  order: number;
};

type BlogTag = {
  id: string;
  name: string;
  slug: string;
};

type BlogCategory = {
  id: string;
  name: string;
  slug: string;
};

type ImageDetail = {
  caption: string;
  isPrimary: boolean;
  order: number;
};

const EditBlog = () => {
  const { id } = useParams();
  const router = useRouter();

  const mdParser = new MarkdownIt();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("DRAFT");
  const [categoryId, setCategoryId] = useState("");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");


  // Available options
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [availableTags, setAvailableTags] = useState<BlogTag[]>([]);

  // Images state
  const [images, setImages] = useState<File[]>([]);
  const [imageDetails, setImageDetails] = useState<ImageDetail[]>([]);
  const [existingImages, setExistingImages] = useState<BlogsImage[]>([]);

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  const statusOptions = [
    { value: "DRAFT", label: "Draft" },
    { value: "PUBLISHED", label: "Published" },
    { value: "ARCHIVED", label: "Archived" },
    { value: "SCHEDULED", label: "Scheduled" },
  ];

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setFetchLoading(true);
        const response = await axios.get(
          `https://jglobalproperties-api.onrender.com/api/v1/blogs/${id}/admin`,
          {
            withCredentials: true,
          }
        );

        const { data } = response.data;
        console.log("Fetched blog data:", data);

        setTitle(data.title || "");
        setExcerpt(data.excerpt || "");
        setContent(data.content || "");
        setStatus(data.status || "DRAFT");
        setCategoryId(data.category.id || "");
        setMetaTitle(data.metaTitle || "");
        setMetaDescription(data.metaDescription || "");

        // Set selected tags
        if (data.tags && data.tags.length > 0) {
          const tagIds = data.tags.map(
            (tagRelation: any) => tagRelation.tag.id
          );
          setSelectedTagIds(tagIds);
        }

        // Set existing images
        if (data.images && data.images.length > 0) {
          setExistingImages(
            data.images.sort(
              (a: BlogsImage, b: BlogsImage) => a.order - b.order
            )
          );
        }

        setFetchLoading(false);
      } catch (error: any) {
        setFetchLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching blog data";
        toast.error(message);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `https://jglobalproperties-api.onrender.com/api/v1/categories`,
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          setCategories(response.data.data);
        }
      } catch (error: any) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(
          `https://jglobalproperties-api.onrender.com/api/v1/tags`,
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          setAvailableTags(response.data.data);
        }
      } catch (error: any) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  // Handle tag selection
  const handleTagToggle = (tagId: string) => {
    setSelectedTagIds((prev) => {
      if (prev.includes(tagId)) {
        return prev.filter((id) => id !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
  };

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validation
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!content.trim()) {
      toast.error("Content is required");
      return;
    }

    if (!categoryId) {
      toast.error("Category is required");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // Add basic blog data
      formData.append("title", title);
      if (excerpt) formData.append("excerpt", excerpt);
      formData.append("content", content);
      formData.append("status", status);
      formData.append("categoryId", categoryId);

      // Add tag IDs
      if (selectedTagIds.length > 0) {
        selectedTagIds.forEach((tagId) => {
          formData.append("tagIds", tagId);
        });
      }

      // Add optional fields
      if (metaTitle) formData.append("metaTitle", metaTitle);
      if (metaDescription) formData.append("metaDescription", metaDescription);

      // Add images - only if there are new images to upload
      if (images.length > 0) {
        images.forEach((image) => {
          formData.append("images", image);
        });

        // Add image details
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
        `https://jglobalproperties-api.onrender.com/api/v1/blogs/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Blog updated successfully!");
        router.push("/admin/blogs");
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const message =
        error.response?.data?.message ||
        "An error occurred while updating the blog";
      toast.error(message);
      console.error("Error updating blog:", error);
    }
  };

  if (fetchLoading) {
    return (
      <div className="bg-white min-h-screen w-full flex flex-col pb-[3rem]">
        <div className="xl:ml-[27rem] mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-[777px] rounded-xl mx-auto mb-8 pb-8">
          <div className="flex items-center justify-center py-16">
            <Loader />
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
              Back to blogs
            </button>
            <h1 className="text-xl font-semibold">Edit Blog Information</h1>
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
                placeholder="Blog title"
                className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-[539px] w-full py-[10px] pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
                required
              />
            </div>

            {/* Excerpt */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
              <h1 className="font-semibold text-[#4A5568] lg:w-32">Excerpt</h1>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief description of the blog post..."
                rows={3}
                className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-[539px] w-full py-[10px] pl-3 focus:outline-none rounded-[5px] text-[#4A5568] resize-vertical"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
              <h1 className="font-semibold text-[#4A5568] lg:w-32">Content</h1>
              <div className="lg:w-[539px] w-full">
                <MdEditor
                  value={content}
                  style={{ height: "400px" }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={({ text }) => setContent(text)}
                  placeholder="Write your blog content here..."
                />
              </div>
            </div>

            {/* Category */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <h1 className="font-semibold text-[#4A5568] lg:w-32">Category</h1>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="focus:outline-none border border-[#EFEFEF] bg-[#F9F9F6] lg:w-[539px] w-full py-[10px] rounded-[5px] text-[#4A5568] pl-3"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
              <h1 className="font-semibold text-[#4A5568] lg:w-32">Tags</h1>
              <div className="lg:w-[539px] w-full">
                <div className="border border-[#EFEFEF] bg-[#F9F9F6] rounded-[5px] p-3 max-h-40 overflow-y-auto">
                  {availableTags.length > 0 ? (
                    <div className="space-y-2">
                      {availableTags.map((tag) => (
                        <label
                          key={tag.id}
                          className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={selectedTagIds.includes(tag.id)}
                            onChange={() => handleTagToggle(tag.id)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-[#4A5568]">
                            {tag.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No tags available</p>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Select multiple tags for your blog post
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <h1 className="font-semibold text-[#4A5568] lg:w-32">Status</h1>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="focus:outline-none border border-[#EFEFEF] bg-[#F9F9F6] lg:w-[539px] w-full py-[10px] rounded-[5px] text-[#4A5568] pl-3"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
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
                className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-[539px] w-full py-[10px] pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
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
                className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-[539px] w-full py-[10px] pl-3 focus:outline-none rounded-[5px] text-[#4A5568] resize-vertical"
              />
            </div>
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
              <div className="custom-file-input-wrapper overflow-hidden lg:w-[539px] w-full">
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
                  className="custom-file-label border border-gray-200 bg-[#F9F9F6] w-full h-[40px] focus:outline-none rounded-[5px] text-[#4A5568] flex items-center cursor-pointer"
                >
                  <span className="file-label-text bg-gray-200 h-[40px] px-3 text-black flex items-center whitespace-nowrap">
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
                                  e.target.value
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
                                  parseInt(e.target.value) || index
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
        <div className="xl:ml-[27rem] flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#941A1A] flex items-center justify-center h-[40px] w-[140px] text-white rounded-[5px] mb-10 text-[14px] font-semibold hover:opacity-75 active:opacity-55 transition-all duration-500 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
