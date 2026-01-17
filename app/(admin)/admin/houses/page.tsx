/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdOutlineRemoveRedEye, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
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
  _count: {
    reviews: number;
    favorites: number;
  };
};

type ApiResponse = {
  success: boolean;
  data: {
    house: HouseType[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNext: boolean;
      hasPrevious: boolean;
    };
  };
};

const Houses = () => {
  const router = useRouter();
  const [houses, setHouses] = useState<HouseType[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/houses?search=${search}&page=${page}`,
          {
            withCredentials: true,
          }
        );

        const { data } = response.data;

        setHouses(data.house);
        setTotalPages(data.pagination.totalPages);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching houses";
        toast.error(message);
      }
    };

    fetchHouses();
  }, [search, page]);

  const handleDelete = async (id: string) => {
    try {
      if (!confirm("Are you sure you want to delete this house?")) {
        return;
      }

      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/houses/${id}`,
        {
          withCredentials: true,
        }
      );

      setHouses((prev) => prev.filter((item) => item.id !== id));
      toast.success("House deleted successfully");
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "An error occurred while deleting house";
      toast.error(message);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const truncateText = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  return (
    <div className="bg-white min-h-screen w-full flex flex-col pb-12">
      <div className="xl:ml-80 mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-253.5 rounded-xl mx-auto mb-8 pb-8">
        <div className="flex items-center justify-between mt-4">
          <h1 className="font-semibold sm:text-xl text-lg">Houses List</h1>
          <button
            onClick={() => router.push("/admin/add-new-houses")}
            className="px-7 py-2 bg-[#941A1A] rounded-[5px] text-white text-[13px] font-semibold hover:opacity-75 active:opacity-60 transition-all duration-500 ease-in-out cursor-pointer"
          >
            Add New House
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Total: {houses.length} houses
          </div>
          <div>
            <label className="mr-3">Search</label>
            <input
              type="text"
              placeholder="Search houses..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              title="search"
              className="border bg-inherit border-black focus:outline-none pl-2 h-8.75 w-37.5 rounded-sm"
            />
          </div>
        </div>

        <div className="mt-8 overflow-x-auto relative">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader />
            </div>
          ) : houses.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-gray-500">No house found</p>
            </div>
          ) : (
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="text-left bg-gray-200 rounded-md text-[#4A5568]">
                  <th className="px-4 py-2 whitespace-nowrap">Title</th>
                  <th className="px-4 py-2 whitespace-nowrap">Overview</th>
                  <th className="px-4 py-2 whitespace-nowrap">Location</th>
                  <th className="px-4 py-2 whitespace-nowrap">State</th>
                  <th className="px-4 py-2 whitespace-nowrap">Country</th>
                  <th className="px-4 py-2 whitespace-nowrap">Images</th>
                  <th className="px-4 py-2 whitespace-nowrap">Units</th>
                  <th className="px-4 py-2 whitespace-nowrap">Price</th>
                  <th className="px-4 py-2 whitespace-nowrap">Category</th>
                  <th className="px-4 py-2 whitespace-nowrap">Reviews</th>
                  <th className="px-4 py-2 whitespace-nowrap">Created At</th>
                  <th className="px-4 py-2 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {houses.map((house) => (
                  <tr
                    key={house.id}
                    className="even:bg-white odd:bg-[#F2F2F2] border-b"
                  >
                    <td className="px-4 py-3">
                      <h1 className="text-md text-[#4A5568] font-medium">
                        {truncateText(house.title, 3)}
                      </h1>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568] max-w-50">
                        {truncateText(house.overview, 10)}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568] capitalize">
                        {house.location}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568] capitalize">
                        {house.state}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568]">{house.country}</p>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {house.images.length > 0 ? (
                          <div className="flex -space-x-2">
                            {house.images.slice(0, 3).map((image, index) => (
                              <div key={image.id} className="relative">
                                <Image
                                  width={40}
                                  height={40}
                                  src={image.url}
                                  alt={
                                    image.caption || `House image ${index + 1}`
                                  }
                                  className="h-10 w-10 object-cover rounded-full border-2 border-white"
                                  unoptimized
                                />
                              </div>
                            ))}
                            {house.images.length > 3 && (
                              <div className="h-10 w-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                                +{house.images.length - 3}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs text-gray-500">
                              No img
                            </span>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="text-sm">
                        {house.units.length > 0 ? (
                          <div>
                            <p className="font-medium text-[#4A5568]">
                              {house.units.length} unit
                              {house.units.length > 1 ? "s" : ""}
                            </p>
                            {house.units.slice(0, 2).map((unit, index) => (
                              <div
                                key={unit.id}
                                className="text-xs text-gray-600 mt-1"
                              >
                                <span>
                                  {unit.size} {unit.unit} -{" "}
                                  {formatPrice(unit.price)}
                                </span>
                              </div>
                            ))}
                            {house.units.length > 2 && (
                              <p className="text-xs text-gray-500 mt-1">
                                +{house.units.length - 2} more
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-500">
                            No units
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568]">{house.price}</p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568]">{house.category}</p>
                    </td>

                    <td className="px-4 py-3">
                      <div className="text-sm text-[#4A5568]">
                        <p>{house._count.reviews} reviews</p>
                        <p className="text-xs text-gray-500">
                          {house._count.favorites} favorites
                        </p>
                        {house.averageRating && (
                          <p className="text-xs text-yellow-600">
                            ★ {house.averageRating.toFixed(1)}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568]">
                        {new Date(house.createdAt).toLocaleDateString()}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/houses/${house.id}`}>
                          <MdOutlineRemoveRedEye className="h-5 w-5 text-purple-400 hover:text-purple-300 cursor-pointer" />
                        </Link>
                        <Link href={`/admin/houses/edit/${house.id}`}>
                          <MdOutlineEdit className="h-5 w-5 text-blue-400 hover:text-blue-300 cursor-pointer" />
                        </Link>
                        <RiDeleteBin5Line
                          onClick={() => handleDelete(house.id)}
                          className="h-5 w-5 text-red-400 hover:text-red-300 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center mt-6 gap-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
            >
              Previous
            </button>

            <span className="px-4 py-1 text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Houses;
