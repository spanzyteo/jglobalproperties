/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReviewTableRow from "./components/ReviewTableRow";
import ReviewFilters from "./components/ReviewFilters";
import Pagination from "./components/Pagination";
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
  data: {
    reviews: ReviewType[];
    pagination?: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNext: boolean;
      hasPrevious: boolean;
    };
  };
};

const Review = () => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<ReviewType[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: page.toString(),
          ...(search && { search }),
          ...(statusFilter !== "ALL" && { status: statusFilter }),
        });

        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews?${params}`,
          { withCredentials: true }
        );

        const { data } = response.data;
        setReviews(data.reviews || data);
        if (data.pagination) {
          setTotalPages(data.pagination.totalPages);
        }
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching reviews";
        toast.error(message);
      }
    };

    fetchReviews();
  }, [search, page, statusFilter]);

  // Client-side filtering for property type
  useEffect(() => {
    let filtered = [...reviews];

    if (typeFilter !== "ALL") {
      filtered = filtered.filter((review) => {
        if (typeFilter === "LAND") {
          return review.land !== null || review.landId !== null;
        } else if (typeFilter === "HOUSE") {
          return review.house !== null || review.houseId !== null;
        }
        return true;
      });
    }

    setFilteredReviews(filtered);
  }, [reviews, typeFilter]);

  // Handle actions
  const handleApprove = async (id: string) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${id}/approve`,
        {},
        { withCredentials: true }
      );

      setReviews((prev) =>
        prev.map((review) =>
          review.id === id ? { ...review, status: "APPROVED" as const } : review
        )
      );
      toast.success("Review approved successfully");
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "An error occurred while approving review";
      toast.error(message);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${id}/reject`,
        {},
        { withCredentials: true }
      );

      setReviews((prev) =>
        prev.map((review) =>
          review.id === id ? { ...review, status: "REJECTED" as const } : review
        )
      );
      toast.success("Review rejected successfully");
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "An error occurred while rejecting review";
      toast.error(message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      if (!confirm("Are you sure you want to delete this review?")) return;

      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${id}`,
        { withCredentials: true }
      );

      setReviews((prev) => prev.filter((review) => review.id !== id));
      toast.success("Review deleted successfully");
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "An error occurred while deleting review";
      toast.error(message);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const resetPage = () => {
    setPage(1);
  };

  return (
    <div className="bg-white min-h-screen w-full flex flex-col pb-12">
      <div className="xl:ml-80 mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-253.5 rounded-xl mx-auto mb-8 pb-8">
        <div className="flex items-center justify-between mt-4">
          <h1 className="font-semibold sm:text-xl text-lg">
            Reviews Management
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-4">
          <div className="text-sm text-gray-600">
            Total: {filteredReviews.length} reviews
            {typeFilter !== "ALL" && ` (${typeFilter.toLowerCase()} reviews)`}
          </div>

          <ReviewFilters
            statusFilter={statusFilter}
            typeFilter={typeFilter}
            search={search}
            onStatusChange={setStatusFilter}
            onTypeChange={setTypeFilter}
            onSearchChange={setSearch}
            onPageReset={resetPage}
          />
        </div>

        <div className="mt-8 overflow-x-auto relative">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader />
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-gray-500">No reviews found</p>
            </div>
          ) : (
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="text-left bg-gray-200 rounded-md text-[#4A5568]">
                  <th className="px-4 py-2 whitespace-nowrap">Reviewer</th>
                  <th className="px-4 py-2 whitespace-nowrap">Property</th>
                  <th className="px-4 py-2 whitespace-nowrap">Rating</th>
                  <th className="px-4 py-2 whitespace-nowrap">Comment</th>
                  <th className="px-4 py-2 whitespace-nowrap">Status</th>
                  <th className="px-4 py-2 whitespace-nowrap">Verified</th>
                  <th className="px-4 py-2 whitespace-nowrap">Created At</th>
                  <th className="px-4 py-2 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map((review) => (
                  <ReviewTableRow
                    key={review.id}
                    review={review}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Review;
