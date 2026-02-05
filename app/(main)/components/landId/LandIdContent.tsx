"use client";

import { Playfair_Display, Roboto } from "next/font/google";
import { useAppSelector } from "../../store/hooks";
import { useState } from "react";
import { IoLocation } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useSubmitReview } from "../../features/reviews";
import { toast } from "sonner";
import SimilarLands from "./SimilarLands";

interface LandContentProps {
  loading?: boolean;
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const LandIdContent = ({ loading = false }: LandContentProps) => {
  const land = useAppSelector((state) => state.land.currentLand);
  const { submit: submitReview, loading: submitting } = useSubmitReview();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    comment: "",
  });

  const OverviewContent = () => {
    if (!land?.overview) return null;

    // Check if overview is HTML content (from tiptap)
    const isHTML = /<[^>]*>/g.test(land.overview);

    if (isHTML) {
      return (
        <div
          className="text-[14px] leading-5.75 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: land.overview }}
        />
      );
    }

    return <p className="text-[14px] leading-5.75">{land.overview}</p>;
  };

  const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.comment) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    try {
      await submitReview({
        name: formData.name,
        email: formData.email,
        rating: formData.rating,
        comment: formData.comment,
        landId: land?.id,
      });

      toast.success("Review submitted successfully!");
      setFormData({ name: "", email: "", rating: 0, comment: "" });
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
      console.error("Review submission error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6 w-full lg:max-w-218.25 mt-28 md:mt-0">
        <div className="bg-gray-200 h-96 animate-pulse rounded-[5px]" />
      </div>
    );
  }

  if (!land) {
    return (
      <div className="flex flex-col gap-6 w-full lg:max-w-218.25 mt-28 md:mt-0">
        <div className="text-center py-12">
          <p className="text-gray-500">No land data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full lg:max-w-218.25 mt-28 md:mt-0">
      {/* Land Details Section */}
      <div
        className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-2 py-12 px-6 shadow-sm`}
      >
        <div className="bg-[#303438] rounded-[5px] w-22.5 flex justify-center py-1">
          <h3 className="text-white text-[14px] leading-5.5">{land?.status}</h3>
        </div>
        <h1
          className={`${playfair.className} text-[34px] font-medium leading-11`}
        >
          {land?.title}
        </h1>
        <div className="flex gap-2 items-center">
          <IoLocation />
          <h3 className="text-[14px] leading-5.75">
            {land?.location}, {land?.state}, {land?.country}
          </h3>
        </div>
        <h2 className="text-[14px] leading-5.75 font-medium mt-4">Overview</h2>
        <OverviewContent />
      </div>

      {/* Review Submission Form */}
      <div
        className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-5 py-12 px-6 shadow-sm`}
      >
        <h2 className="text-[18px] font-medium leading-5.75">Leave a Review</h2>
        <form
          onSubmit={handleSubmitReview}
          className="flex flex-col gap-4 w-full"
        >
          {/* Name and Email */}
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={submitting}
              className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:border-[#941A1A] transition-all duration-500 ease-in-out disabled:bg-gray-100"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={submitting}
              className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:border-[#941A1A] transition-all duration-500 ease-in-out disabled:bg-gray-100"
            />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <label className="text-[14px] font-medium">Rating:</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  disabled={submitting}
                  className="transition-all duration-200"
                >
                  <FaStar
                    className={`w-5 h-5 ${
                      star <= formData.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <textarea
            placeholder="Your Review"
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
            disabled={submitting}
            className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:border-[#941A1A] transition-all duration-500 ease-in-out disabled:bg-gray-100"
            rows={6}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="bg-[#941A1A] rounded-[5px] text-white w-full md:w-34.75 py-3 font-medium hover:bg-[#7a1515] transition-all duration-500 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>

      {/* Similar Lands */}
      <SimilarLands />
    </div>
  );
};

export default LandIdContent;
