/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdArrowBack, MdCheck, MdClose } from "react-icons/md";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Loader from "@/app/components/shared/Loader";

type LandInfo = {
  id: string;
  title: string;
  slug: string;
};

type HouseInfo = {
  id: string;
  title: string;
  slug: string;
};

type ReviewType = {
  id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  isVerified: boolean;
  landId: string | null;
  houseId: string | null;
  createdAt: string;
  updatedAt: string;
  land: LandInfo | null;
  house: HouseInfo | null;
};

type ApiResponse = {
  success: boolean;
  data: ReviewType;
};

const ReviewId = () => {
  const { id: reviewId } = useParams();
  const router = useRouter();
  const [review, setReview] = useState<ReviewType | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse>(
          `https://jglobalproperties-api.onrender.com/api/v1/reviews/${reviewId}`,
          {
            withCredentials: true,
          }
        );

        const { data } = response.data;
        console.log("Review data:", data);
        setReview(data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching review details";
        toast.error(message);
        console.log("Error:", message);
      }
    };

    if (reviewId) {
      fetchReview();
    }
  }, [reviewId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  const getPropertyInfo = () => {
    if (!review) return null;

    if (review.land) {
      return {
        type: "Land",
        title: review.land.title,
        id: review.land.id,
        slug: review.land.slug,
      };
    } else if (review.house) {
      return {
        type: "House",
        title: review.house.title,
        id: review.house.id,
        slug: review.house.slug,
      };
    }
    return {
      type: "Unknown",
      title: "Property not found",
      id: "",
      slug: "",
    };
  };

  const handleApprove = async () => {
    if (!review) return;

    try {
      setActionLoading(true);
      await axios.put(
        `https://jglobalproperties-api.onrender.com/api/v1/reviews/${review.id}/approve`,
        {},
        { withCredentials: true }
      );

      setReview((prev) => (prev ? { ...prev, status: "APPROVED" } : null));
      toast.success("Review approved successfully");
      setActionLoading(false);
    } catch (error: any) {
      setActionLoading(false);
      const message = error.response?.data?.message || "Error approving review";
      toast.error(message);
    }
  };

  const handleReject = async () => {
    if (!review) return;

    try {
      setActionLoading(true);
      await axios.put(
        `https://jglobalproperties-api.onrender.com/api/v1/reviews/${review.id}/reject`,
        {},
        { withCredentials: true }
      );

      setReview((prev) => (prev ? { ...prev, status: "REJECTED" } : null));
      toast.success("Review rejected successfully");
      setActionLoading(false);
    } catch (error: any) {
      setActionLoading(false);
      const message = error.response?.data?.message || "Error rejecting review";
      toast.error(message);
    }
  };

  if (loading) {
    return (
      <div className="bg-white flex flex-col h-[100vh]">
        <div className="xl:ml-[20rem] mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-[1014px] rounded-xl mx-auto mb-8 pb-8">
          <div className="flex items-center justify-center py-16">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  if (!review) {
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
              Review not found.
            </h1>
          </div>
        </div>
      </div>
    );
  }

  const propertyInfo = getPropertyInfo();

  return (
    <div className="bg-white flex flex-col min-h-screen">
      <div className="xl:ml-[20rem] mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-[1014px] rounded-xl mx-auto mb-8 pb-8">
        <div className="mt-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 cursor-pointer"
          >
            <MdArrowBack className="h-5 w-5" />
            Back to Reviews
          </button>
          <div className="flex items-center justify-between">
            <h1 className="font-semibold sm:text-xl text-lg">
              Review Details - {review.name}
            </h1>
            <div className="flex gap-2">
              {review.status === "PENDING" && (
                <>
                  <button
                    onClick={handleApprove}
                    disabled={actionLoading}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm cursor-pointer transition-all ease-in-out duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <MdCheck className="h-4 w-4" />
                    {actionLoading ? "Processing..." : "Approve"}
                  </button>
                  <button
                    onClick={handleReject}
                    disabled={actionLoading}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm cursor-pointer transition-all ease-in-out duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <MdClose className="h-4 w-4" />
                    {actionLoading ? "Processing..." : "Reject"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {/* Review Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Review Information
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <tbody>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200 w-1/4">ID</td>
                    <td className="p-3 text-gray-700">{review.id}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">
                      Reviewer Name
                    </td>
                    <td className="p-3 text-gray-700">{review.name}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Email</td>
                    <td className="p-3 text-gray-700">{review.email}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Rating</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-gray-600 text-sm">
                          ({review.rating}/5)
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Comment</td>
                    <td className="p-3 text-gray-700">
                      <div className="max-w-2xl">{review.comment}</div>
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Status</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          review.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : review.status === "APPROVED"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {review.status}
                      </span>
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Verified</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          review.isVerified
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {review.isVerified ? "Verified" : "Unverified"}
                      </span>
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">
                      Created At
                    </td>
                    <td className="p-3 text-gray-700">
                      {formatDate(review.createdAt)}
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">
                      Updated At
                    </td>
                    <td className="p-3 text-gray-700">
                      {formatDate(review.updatedAt)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Property Information */}
          {propertyInfo && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Property Information
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <tbody>
                    <tr className="border border-gray-300">
                      <td className="p-3 font-semibold bg-gray-200 w-1/4">
                        Property Type
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            propertyInfo.type === "Land"
                              ? "bg-green-100 text-green-800"
                              : propertyInfo.type === "House"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {propertyInfo.type}
                        </span>
                      </td>
                    </tr>
                    <tr className="border border-gray-300">
                      <td className="p-3 font-semibold bg-gray-200">
                        Property Title
                      </td>
                      <td className="p-3 text-gray-700">
                        {propertyInfo.title}
                      </td>
                    </tr>
                    <tr className="border border-gray-300">
                      <td className="p-3 font-semibold bg-gray-200">
                        Property ID
                      </td>
                      <td className="p-3 text-gray-700 font-mono text-sm">
                        {propertyInfo.id}
                      </td>
                    </tr>
                    <tr className="border border-gray-300">
                      <td className="p-3 font-semibold bg-gray-200">
                        Property Slug
                      </td>
                      <td className="p-3 text-gray-700 font-mono text-sm">
                        {propertyInfo.slug}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewId;
