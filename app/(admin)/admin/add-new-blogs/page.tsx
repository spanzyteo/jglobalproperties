/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MDEditor from "@uiw/react-markdown-editor";
import { MdClose } from "react-icons/md";

type ImageDetail = {
  caption: string;
  isPrimary: boolean;
  order: number;
};

type CategoryType = {
  id: string;
  name: string;
  slug: string;
};

type TagType = {
  id: string;
  name: string;
  slug: string;
};

const AddNewBlog = () => {
  const router = useRouter();

  // Basic blog information
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("DRAFT");
  const [categoryId, setCategoryId] = useState("");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  // const [readTimeMinutes, setReadTimeMinutes] = useState<number | "">("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  // Available options
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [availableTags, setAvailableTags] = useState<TagType[]>([]);

  // Images
  const [images, setImages] = useState<File[]>([]);
  const [imageDetails, setImageDetails] = useState<ImageDetail[]>([]);

  const [loading, setLoading] = useState(false);

  const statusOptions = [
    { value: "DRAFT", label: "Draft" },
    { value: "PUBLISHED", label: "Published" },
    { value: "ARCHIVED", label: "Archived" },
    { value: "SCHEDULED", label: "Scheduled" },
  ];

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://api.jglobalproperties.com/api/v1/categories",
          { withCredentials: true }
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
          "https://api.jglobalproperties.com/api/v1/tags",
          { withCredentials: true }
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
          formData.append("tagIds[]", tagId);
        });
      }

      // Add optional fields
      if (metaTitle) formData.append("metaTitle", metaTitle);
      if (metaDescription) formData.append("metaDescription", metaDescription);

      // Add images
      images.forEach((image) => {
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
        "https://api.jglobalproperties.com/api/v1/blogs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Blog added successfully!");
        router.push("/admin/blogs");
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const message =
        error.response?.data?.message ||
        "An error occurred while adding the blog";
      toast.error(message);
      console.log(message)
    }
  };

  return (
    <div className="bg-white flex flex-col pb-12">
      <form onSubmit={handleSubmit}>
        <div className="xl:ml-108 mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-194.25 rounded-xl mx-auto mb-8 pb-8">
          <h1 className="text-xl font-semibold mt-4">Blog Information</h1>

          {/* Title */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Title</h1>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog title"
              className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
              required
            />
          </div>

          {/* Excerpt */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between mt-6 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Excerpt</h1>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description of the blog post..."
              rows={3}
              className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568] resize-vertical"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between mt-6 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Content</h1>
            <div className="lg:w-134.75 w-full">
              <MDEditor
                value={content}
                height="400px"
                onChange={(val) => setContent(val || "")}
                enablePreview
              />
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Category</h1>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="focus:outline-none border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 rounded-[5px] text-[#4A5568] pl-3"
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
          <div className="flex flex-col lg:flex-row lg:items-start justify-between mt-6 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Tags</h1>
            <div className="lg:w-134.75 w-full">
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
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Status</h1>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="focus:outline-none border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 rounded-[5px] text-[#4A5568] pl-3"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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

export default AddNewBlog;
