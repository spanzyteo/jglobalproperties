/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import Loader from "@/app/components/shared/Loader";
// import Editor from "../../components/editor/TipTapEditor";
import Editor from "../../../components/editor/TipTapEditor";

type EventImage = {
  id: string;
  url: string;
  publicId: string;
};

type EventType = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  organizer: string;
  isPast: boolean;
  createdAt: string;
  updatedAt: string;
  image: EventImage[];
};

const EditEvent = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // Event information
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [organizer, setOrganizer] = useState("jglobalproperties");

  // Image
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<EventImage | null>(null);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setFetching(true);
        const response = await axios.get<{
          success: boolean;
          data: EventType;
        }>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events/${id}`, {
          withCredentials: true,
        });

        const event = response.data.data;

        setTitle(event.title);
        setDescription(event.description);
        setLocation(event.location);
        setDate(event.date);
        setOrganizer(event.organizer);

        if (event.image && event.image.length > 0) {
          setExistingImage(event.image[0]);
          setImagePreview(event.image[0].url);
        }

        setFetching(false);
      } catch (error: any) {
        setFetching(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching the event";
        toast.error(message);
        router.push("/admin/events");
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id, router]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Clear existing image if new one is uploaded
      setExistingImage(null);
    }
  };

  const removeImage = () => {
    setImage(null);
    setExistingImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Validation
      if (!title.trim()) {
        toast.error("Title is required");
        setLoading(false);
        return;
      }

      if (!description.trim()) {
        toast.error("Description is required");
        setLoading(false);
        return;
      }

      if (!location.trim()) {
        toast.error("Location is required");
        setLoading(false);
        return;
      }

      if (!date) {
        toast.error("Date is required");
        setLoading(false);
        return;
      }

      if (!image && !existingImage) {
        toast.error("Image is required");
        setLoading(false);
        return;
      }

      const formData = new FormData();

      // Add event data
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("date", new Date(date).toISOString());
      formData.append("organizer", organizer);

      // Add image only if new image is selected
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/events/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (response.data.success) {
        toast.success("Event updated successfully!");
        router.push("/admin/events");
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const message =
        error.response?.data?.message ||
        "An error occurred while updating the event";
      toast.error(message);
    }
  };

  // Convert date to input format (YYYY-MM-DDTHH:mm)
  const formatDateForInput = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  if (fetching) {
    return (
      <div className="bg-white min-h-screen w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-col pb-12 xl:pl-80">
      <form onSubmit={handleSubmit}>
        <div className="mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-full rounded-xl mx-auto mb-8 pb-8">
          <h1 className="text-xl font-semibold mt-4">Edit Event Information</h1>

          {/* Title */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Title</h1>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event title"
              className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between mt-6 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Description</h1>
            <div className="lg:w-134.75 w-full">
              <Editor
                value={description}
                onChange={(val) => setDescription(val || "")}
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
              placeholder="e.g., Lagos, Victoria Island"
              className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
              required
            />
          </div>

          {/* Date */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Date & Time</h1>
            <input
              type="datetime-local"
              value={formatDateForInput(date)}
              onChange={(e) => setDate(e.target.value)}
              className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
              required
            />
          </div>

          {/* Organizer */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-3 lg:gap-0">
            <h1 className="font-semibold text-[#4A5568]">Organizer</h1>
            <input
              type="text"
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
              placeholder="Event organizer"
              className="border border-[#EFEFEF] bg-[#F9F9F6] lg:w-134.75 w-full py-2.5 pl-3 focus:outline-none rounded-[5px] text-[#4A5568]"
              required
            />
          </div>

          {/* Image Section */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-[#4A5568] mb-4">
              Event Image
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Only one image is accepted for the event. It will be used as the
              event thumbnail.
            </p>

            <div className="border-2 border-dashed border-[#EFEFEF] rounded-lg p-6 bg-[#F9F9F6]">
              {imagePreview ? (
                <div className="relative inline-block">
                  <Image
                    src={imagePreview}
                    alt="Event image preview"
                    width={200}
                    height={200}
                    className="w-48 h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-all duration-300"
                  >
                    <MdClose className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <label className="link-blue cursor-pointer">
                    <span className="text-[#941A1A] font-semibold">
                      Click to upload
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="text-gray-600 text-sm">or drag and drop</p>
                  <p className="text-gray-500 text-xs mt-2">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center lg:justify-end w-[90%] lg:w-full lg:pr-8 mx-auto gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-8 py-3 border border-[#941A1A] text-[#941A1A] rounded-[5px] font-semibold hover:bg-[#f0f0f0] transition-all duration-500 ease-in-out"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-[#941A1A] rounded-[5px] text-white font-semibold hover:opacity-75 active:opacity-60 disabled:opacity-50 transition-all duration-500 ease-in-out cursor-pointer"
          >
            {loading ? "Updating..." : "Update Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEvent;
