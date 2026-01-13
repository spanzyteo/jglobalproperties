/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdOutlineRemoveRedEye, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

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
  _count: {
    reviews: number;
    favorites: number;
  };
};

type ApiResponse = {
  success: boolean;
  data: {
    lands: LandsType[];
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

const Lands = () => {
  const router = useRouter();
  const [lands, setLands] = useState<LandsType[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLands = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse>(
          `https://api.jglobalproperties.com/api/v1/lands?search=${search}&page=${page}`,
          {
            withCredentials: true,
          }
        );

        const { data } = response.data;
        console.log("Lands data:", data);

        setLands(data.lands);
        setTotalPages(data.pagination.totalPages);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching lands";
        console.error(message);
        toast.error(message);
      }
    };

    fetchLands();
  }, [search, page]);

  const handleDelete = async (id: string) => {
    try {
      if (!confirm("Are you sure you want to delete this land?")) {
        return;
      }

      await axios.delete(
        `https://jglobalproperties-api.onrender.com/api/v1/lands/${id}`,
        {
          withCredentials: true,
        }
      );

      setLands((prev) => prev.filter((item) => item.id !== id));
      toast.success("Land deleted successfully");
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "An error occurred while deleting land";
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
    <div className="bg-white min-h-screen w-full flex flex-col pb-[3rem]">
      <div className="xl:ml-[20rem] mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-[1014px] rounded-xl mx-auto mb-8 pb-8">
        <div className="flex items-center justify-between mt-4">
          <h1 className="font-semibold sm:text-xl text-lg">Lands List</h1>
          <button
            onClick={() => router.push("/admin/add-new-lands")}
            className="px-7 py-2 bg-[#941A1A] rounded-[5px] text-white text-[13px] font-semibold hover:opacity-75 active:opacity-60 transition-all duration-500 ease-in-out cursor-pointer"
          >
            Add Lands
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Total: {lands.length} lands
          </div>
          <div>
            <label className="mr-3">Search</label>
            <input
              type="text"
              placeholder="Search lands..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              title="search"
              className="border bg-inherit border-black focus:outline-none pl-2 h-[35px] w-[150px] rounded-[4px]"
            />
          </div>
        </div>

        <div className="mt-8 overflow-x-auto relative">
          {loading ? (
            <div className="flex items-center justify-center py-8">
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
          ) : lands.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-gray-500">No lands found</p>
            </div>
          ) : (
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="text-left bg-gray-200 rounded-[6px] text-[#4A5568]">
                  <th className="px-4 py-2 whitespace-nowrap">Title</th>
                  <th className="px-4 py-2 whitespace-nowrap">Overview</th>
                  <th className="px-4 py-2 whitespace-nowrap">Location</th>
                  <th className="px-4 py-2 whitespace-nowrap">State</th>
                  <th className="px-4 py-2 whitespace-nowrap">Country</th>
                  <th className="px-4 py-2 whitespace-nowrap">Images</th>
                  <th className="px-4 py-2 whitespace-nowrap">Units</th>
                  <th className="px-4 py-2 whitespace-nowrap">Status</th>
                  <th className="px-4 py-2 whitespace-nowrap">Reviews</th>
                  <th className="px-4 py-2 whitespace-nowrap">Created At</th>
                  <th className="px-4 py-2 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {lands.map((land) => (
                  <tr
                    key={land.id}
                    className="even:bg-white odd:bg-[#F2F2F2] border-b"
                  >
                    <td className="px-4 py-3">
                      <h1 className="text-md text-[#4A5568] font-medium">
                        {truncateText(land.title, 3)}
                      </h1>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568] max-w-[200px]">
                        {truncateText(land.overview, 10)}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568] capitalize">
                        {land.location}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568] capitalize">
                        {land.state}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568]">{land.country}</p>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {land.images.length > 0 ? (
                          <div className="flex -space-x-2">
                            {land.images.slice(0, 3).map((image, index) => (
                              <div key={image.id} className="relative">
                                <Image
                                  width={40}
                                  height={40}
                                  src={image.url}
                                  alt={
                                    image.caption || `Land image ${index + 1}`
                                  }
                                  className="h-10 w-10 object-cover rounded-full border-2 border-white"
                                  unoptimized
                                />
                              </div>
                            ))}
                            {land.images.length > 3 && (
                              <div className="h-10 w-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                                +{land.images.length - 3}
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
                        {land.units.length > 0 ? (
                          <div>
                            <p className="font-medium text-[#4A5568]">
                              {land.units.length} unit
                              {land.units.length > 1 ? "s" : ""}
                            </p>
                            {land.units.slice(0, 2).map((unit, index) => (
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
                            {land.units.length > 2 && (
                              <p className="text-xs text-gray-500 mt-1">
                                +{land.units.length - 2} more
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
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
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

                    <td className="px-4 py-3">
                      <div className="text-sm text-[#4A5568]">
                        <p>{land._count.reviews} reviews</p>
                        <p className="text-xs text-gray-500">
                          {land._count.favorites} favorites
                        </p>
                        {land.averageRating && (
                          <p className="text-xs text-yellow-600">
                            ★ {land.averageRating.toFixed(1)}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568]">
                        {new Date(land.createdAt).toLocaleDateString()}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/lands/${land.id}`}>
                          <MdOutlineRemoveRedEye className="h-5 w-5 text-purple-400 hover:text-purple-300 cursor-pointer" />
                        </Link>
                        <Link href={`/admin/lands/edit/${land.id}`}>
                          <MdOutlineEdit className="h-5 w-5 text-blue-400 hover:text-blue-300 cursor-pointer" />
                        </Link>
                        <RiDeleteBin5Line
                          onClick={() => handleDelete(land.id)}
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

export default Lands;
