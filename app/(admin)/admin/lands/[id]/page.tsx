/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import { ThreeCircles } from "react-loader-spinner";
import { MdArrowBack } from "react-icons/md";

type LandImage = {
  id: string;
  url: string;
  publicId: string;
  caption: string | null;
  isPrimary: boolean;
  order: number;
};

type LandUnit = {
  id: string;
  size: number;
  unit: string;
  price: string;
  available: boolean;
  landId: string;
  createdAt: string;
  updatedAt: string;
};

type LandReview = {
  id: string;
  rating: number;
  comment: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type LandsType = {
  id: string;
  title: string;
  slug: string;
  overview: string;
  location: string;
  state: string;
  country: string;
  status: string;
  averageRating: number | null;
  totalReviews: number;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: string;
  updatedAt: string;
  units: LandUnit[];
  images: LandImage[];
  reviews: LandReview[];
  _count: {
    reviews: number;
    favorites: number;
  };
};

type ApiResponse = {
  success: boolean;
  data: LandsType;
};

const LandId = () => {
  const { id: landId } = useParams();
  const router = useRouter();
  const [land, setLand] = useState<LandsType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLand = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse>(
          `https://jglobalproperties-api.onrender.com/api/v1/lands/${landId}`,
          {
            withCredentials: true,
          }
        );

        const { data } = response.data;
        setLand(data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching land details";
        toast.error(message);
      }
    };

    if (landId) {
      fetchLand();
    }
  }, [landId]);

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

  if (!land) {
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
              Land not found.
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
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <MdArrowBack className="h-5 w-5" />
            Back to Lands
          </button>
          <div className="flex items-center justify-between">
            <h1 className="font-semibold sm:text-xl text-lg">
              Land Details - {land.title}
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/admin/lands/edit/${land.id}`)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm cursor-pointer"
              >
                Edit Land
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
                    <td className="p-3 text-gray-700">{land.id}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Title</td>
                    <td className="p-3 text-gray-700">{land.title}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Slug</td>
                    <td className="p-3 text-gray-700">{land.slug}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Overview</td>
                    <td className="p-3 text-gray-700">{land.overview}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Location</td>
                    <td className="p-3 text-gray-700 capitalize">
                      {land.location}
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">State</td>
                    <td className="p-3 text-gray-700 capitalize">
                      {land.state}
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Country</td>
                    <td className="p-3 text-gray-700">{land.country}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">Status</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          land.status === "FOR_SALE"
                            ? "bg-green-100 text-green-800"
                            : land.status === "SOLD"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {land.status.replace("_", " ")}
                      </span>
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">
                      Created At
                    </td>
                    <td className="p-3 text-gray-700">
                      {formatDate(land.createdAt)}
                    </td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">
                      Updated At
                    </td>
                    <td className="p-3 text-gray-700">
                      {formatDate(land.updatedAt)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SEO Information */}
          {(land.metaTitle || land.metaDescription) && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                SEO Information
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <tbody>
                    {land.metaTitle && (
                      <tr className="border border-gray-300">
                        <td className="p-3 font-semibold bg-gray-200 w-1/4">
                          Meta Title
                        </td>
                        <td className="p-3 text-gray-700">{land.metaTitle}</td>
                      </tr>
                    )}
                    {land.metaDescription && (
                      <tr className="border border-gray-300">
                        <td className="p-3 font-semibold bg-gray-200">
                          Meta Description
                        </td>
                        <td className="p-3 text-gray-700">
                          {land.metaDescription}
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
              Images ({land.images.length})
            </h2>
            {land.images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {land.images
                  .sort((a, b) => a.order - b.order)
                  .map((image) => (
                    <div key={image.id} className="relative">
                      <Image
                        src={image.url}
                        alt={image.caption || `Land image ${image.order + 1}`}
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
                No images available for this land.
              </p>
            )}
          </div>

          {/* Units */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Available Units ({land.units.length})
            </h2>
            {land.units.length > 0 ? (
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
                    {land.units.map((unit) => (
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
              <p className="text-gray-500">No units defined for this land.</p>
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
                    <td className="p-3 text-gray-700">{land._count.reviews}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 font-semibold bg-gray-200">
                      Average Rating
                    </td>
                    <td className="p-3 text-gray-700">
                      {land.averageRating ? (
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-500">★</span>
                          <span>{land.averageRating.toFixed(1)}</span>
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
                      {land._count.favorites}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Recent Reviews */}
            {land.reviews && land.reviews.length > 0 && (
              <div className="mt-6">
                <h3 className="text-md font-semibold mb-3 text-gray-800">
                  Recent Reviews
                </h3>
                <div className="space-y-3">
                  {land.reviews.slice(0, 5).map((review) => (
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

export default LandId;
