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

type HouseImage = {
  id: string;
  url: string;
  publicId: string;
  caption: string | null;
  isPrimary: boolean;
  order: number;
};

type HouseUnit = {
  id: string;
  size: string;
  unit: string;
  price: string;
  available: boolean;
  houseId: string;
  createdAt: string;
  updatedAt: string;
};

type HouseReview = {
  id: string;
  rating: number;
  comment: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type HouseType = {
  id: string;
  title: string;
  slug: string;
  overview: string;
  location: string;
  state: string;
  country: string;
  price: string;
  category: string;
  averageRating: number | null;
  totalReviews: number;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: string;
  updatedAt: string;
  units: HouseUnit[];
  images: HouseImage[];
  reviews: HouseReview[];
  _count: {
    reviews: number;
    favorites: number;
  };
};

type ApiResponse = {
  success: boolean;
  data: HouseType;
};

const HouseId = () => {
  const { id: houseId } = useParams();
  const router = useRouter();
  const [house, setHouse] = useState<HouseType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/houses/${houseId}`,
          {
            withCredentials: true,
          }
        );

        const { data } = response.data;
        setHouse(data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching house details";
        toast.error(message);
      }
    };

    if (houseId) {
      fetchHouse();
    }
  }, [houseId]);

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

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

  if (!house) {
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
              House not found.
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
            Back to Houses
          </button>
          <div className="flex items-center justify-between">
            <h1 className="font-semibold sm:text-xl text-lg">
              House Details - {house.title}
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/admin/houses/edit/${house.id}`)}
                className="px-4 py-2 bg-[#941A1A] text-white rounded hover:bg-[#941A1A]/80 text-sm cursor-pointer transition-all ease-in-out duration-500"
              >
                Edit House
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
                    <td className="p-3 text-gray-700">{house.id}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Title</td>
                    <td className="p-3 text-gray-700">{house.title}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Slug</td>
                    <td className="p-3 text-gray-700">{house.slug}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Overview</td>
                    <td className="p-3 text-gray-700">{house.overview}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Location</td>
                    <td className="p-3 text-gray-700 capitalize">
                      {house.location}
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">State</td>
                    <td className="p-3 text-gray-700 capitalize">
                      {house.state}
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Country</td>
                    <td className="p-3 text-gray-700">{house.country}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Price</td>
                    <td className="p-3 text-gray-700">
                      {formatPrice(house.price)}
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">
                      Created At
                    </td>
                    <td className="p-3 text-gray-700">
                      {formatDate(house.createdAt)}
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">
                      Updated At
                    </td>
                    <td className="p-3 text-gray-700">
                      {formatDate(house.updatedAt)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SEO Information */}
          {(house.metaTitle || house.metaDescription) && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                SEO Information
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <tbody>
                    {house.metaTitle && (
                      <tr className="border border-gray-300">
                        <td className="p-3 font-semibold bg-gray-200 w-1/4">
                          Meta Title
                        </td>
                        <td className="p-3 text-gray-700">{house.metaTitle}</td>
                      </tr>
                    )}
                    {house.metaDescription && (
                      <tr className="border border-gray-300">
                        <td className="p-3 font-semibold bg-gray-200">
                          Meta Description
                        </td>
                        <td className="p-3 text-gray-700">
                          {house.metaDescription}
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
              Images ({house.images.length})
            </h2>
            {house.images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {house.images
                  .sort((a, b) => a.order - b.order)
                  .map((image) => (
                    <div key={image.id} className="relative">
                      <Image
                        src={image.url}
                        alt={image.caption || `House image ${image.order + 1}`}
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
                No images available for this house.
              </p>
            )}
          </div>

          {/* Units */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Available Units ({house.units.length})
            </h2>
            {house.units.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-3 text-left">
                        Size
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Unit
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Price
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Available
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {house.units.map((unit) => (
                      <tr key={unit.id}>
                        <td className="border border-gray-300 p-3 text-gray-700">
                          {unit.size.toLocaleString()}
                        </td>
                        <td className="border border-gray-300 p-3 text-gray-700">
                          {unit.unit}
                        </td>
                        <td className="border border-gray-300 p-3 text-gray-700 font-medium">
                          {formatPrice(unit.price)}
                        </td>
                        <td className="border border-gray-300 p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              unit.available
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {unit.available ? "Available" : "Not Available"}
                          </span>
                        </td>
                        <td className="border border-gray-300 p-3 text-gray-700 text-sm">
                          {formatDate(unit.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No units defined for this house.</p>
            )}
          </div>

          {/* Reviews & Statistics */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Reviews & Statistics
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <tbody>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200 w-1/4">
                      Total Reviews
                    </td>
                    <td className="p-3 text-gray-700">
                      {house._count.reviews}
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">
                      Average Rating
                    </td>
                    <td className="p-3 text-gray-700">
                      {house.averageRating ? (
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-500">★</span>
                          <span>{house.averageRating.toFixed(1)}</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">No ratings yet</span>
                      )}
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">
                      Total Favorites
                    </td>
                    <td className="p-3 text-gray-700">
                      {house._count.favorites}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Recent Reviews */}
            {house.reviews && house.reviews.length > 0 && (
              <div className="mt-6">
                <h3 className="text-md font-semibold mb-3 text-gray-800">
                  Recent Reviews
                </h3>
                <div className="space-y-3">
                  {house.reviews.slice(0, 5).map((review) => (
                    <div key={review.id} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-500">★</span>
                          <span className="font-medium">{review.rating}/5</span>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            review.status === "APPROVED"
                              ? "bg-green-100 text-green-800"
                              : review.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {review.status}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm mb-2">
                        {review.comment}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseId;
