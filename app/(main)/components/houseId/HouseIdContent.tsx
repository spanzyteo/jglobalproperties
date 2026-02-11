"use client";

import { useAppSelector } from "../../store/hooks";
import { Playfair_Display, Roboto } from "next/font/google";
import { IoLocation } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { useSubmitReview } from "../../features/reviews";
import { toast } from "sonner";
import SimilarHouses from "./SimilarHouses";

interface HouseHeroProps {
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

const HouseIdContent = ({ loading = false }: HouseHeroProps) => {
  const house = useAppSelector((state) => state.house.currentHouse);
  const { submit: submitReview, loading: submitting } = useSubmitReview();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    comment: "",
  });

  const OverviewContent = () => {
    if (!house?.overview) return null;

    // Check if overview is HTML content (from tiptap)
    const isHTML = /<[^>]*>/g.test(house.overview);

    if (isHTML) {
      return (
        <div
          className="text-[14px] leading-5.75 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: house.overview }}
        />
      );
    }

    return <p className="text-[14px] leading-5.75">{house.overview}</p>;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (formData.rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!formData.comment.trim()) {
      toast.error("Please write a comment");
      return;
    }
    if (!house?.id) {
      toast.error("House ID not found");
      return;
    }

    try {
      await submitReview({
        name: formData.name,
        email: formData.email,
        rating: formData.rating,
        comment: formData.comment,
        houseId: house.id,
      });

      toast.success("Review submitted successfully!");
      // Reset form
      setFormData({
        name: "",
        email: "",
        rating: 0,
        comment: "",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to submit review";
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6 w-full lg:max-w-218.25 mt-28 md:mt-0">
        <div className="bg-white rounded-[5px] flex flex-col gap-2 py-12 px-6 shadow-sm animate-pulse">
          <div className="h-6 w-20 bg-gray-200 rounded"></div>
          <div className="h-8 w-full bg-gray-200 rounded mt-4"></div>
          <div className="h-4 w-64 bg-gray-200 rounded mt-4"></div>
          <div className="h-20 w-full bg-gray-200 rounded mt-4"></div>
        </div>
      </div>
    );
  }

  if (!house) {
    return (
      <div className="flex flex-col gap-6 w-full lg:max-w-218.25 mt-28 md:mt-0">
        <div className="bg-white rounded-[5px] flex flex-col gap-2 py-12 px-6 shadow-sm">
          <p className="text-gray-500">House data not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full lg:w-[70%] mt-28 md:mt-0">
      <div
        className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-2 py-12 px-6 shadow-sm`}
      >
        <h3 className="bg-[#303438] text-white w-30 text-[14px] leading-5.5 px-4 py-1 flex items-center justify-center rounded-[5px]">
          {house?.category}
        </h3>
        <h1
          className={`${playfair.className} text-[34px] font-medium leading-11`}
        >
          {house?.title}
        </h1>
        <div className="flex gap-2 items-center">
          <IoLocation />
          <h3 className="text-[14px] leading-5.75">
            {house?.location}, {house?.state}, {house?.country}
          </h3>
        </div>
        <h2 className="text-[14px] leading-5.75 font-medium mt-4">Overview</h2>
        <OverviewContent />
      </div>

      {/* Form for reply */}
      <div
        className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-5 py-12 px-6 shadow-sm`}
      >
        <h2 className="text-[18px] font-medium leading-5.75">Leave a Reply</h2>
        <form className="flex flex-col gap-3 w-full text-[14px]" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row md:justify-between gap-3 w-full">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
            />
            <div className="w-full flex items-center gap-2">
              <span className="text-[12px] font-medium">Rating:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="transition-colors duration-200"
                  >
                    <FaStar
                      size={20}
                      className={
                        formData.rating >= star
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <textarea
            name="comment"
            placeholder="Your Comment"
            value={formData.comment}
            onChange={handleInputChange}
            className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
            rows={7}
          ></textarea>
          <button
            type="submit"
            disabled={submitting}
            className="bg-black rounded-[5px] text-white w-full md:w-34.75 py-3 font-medium hover:bg-white hover:border hover:text-black transition-all duration-500 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Post Comment"}
          </button>
        </form>
      </div>

      {/* Similar houses */}
      <SimilarHouses />
    </div>
  );
};

export default HouseIdContent;