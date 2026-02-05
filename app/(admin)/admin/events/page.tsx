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

type ApiResponse = {
  success: boolean;
  data: {
    events: EventType[];
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

const Events = () => {
  const router = useRouter();
  const [events, setEvents] = useState<EventType[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/events?search=${search}&page=${page}`,
          {
            withCredentials: true,
          },
        );

        const { data } = response.data;

        setEvents(data.events);
        setTotalPages(data.pagination.totalPages);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const message =
          error.response?.data?.message ||
          "An error occurred while fetching events";
        toast.error(message);
      }
    };

    fetchEvents();
  }, [search, page]);

  const handleDelete = async (id: string) => {
    try {
      if (!confirm("Are you sure you want to delete this event?")) {
        return;
      }

      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/events/${id}`,
        {
          withCredentials: true,
        },
      );

      setEvents((prev) => prev.filter((item) => item.id !== id));
      toast.success("Event deleted successfully");
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "An error occurred while deleting event";
      toast.error(message);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
          <h1 className="font-semibold sm:text-xl text-lg">Events List</h1>
          <button
            onClick={() => router.push("/admin/add-new-events")}
            className="px-7 py-2 bg-[#941A1A] rounded-[5px] text-white text-[13px] font-semibold hover:opacity-75 active:opacity-60 transition-all duration-500 ease-in-out cursor-pointer"
          >
            Add New Event
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Total: {events.length} events
          </div>
          <div>
            <label className="mr-3">Search</label>
            <input
              type="text"
              placeholder="Search events..."
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
          ) : events.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-gray-500">No event found</p>
            </div>
          ) : (
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="text-left bg-gray-200 rounded-md text-[#4A5568]">
                  <th className="px-4 py-2 whitespace-nowrap">Title</th>
                  <th className="px-4 py-2 whitespace-nowrap">Description</th>
                  <th className="px-4 py-2 whitespace-nowrap">Location</th>
                  <th className="px-4 py-2 whitespace-nowrap">Date</th>
                  <th className="px-4 py-2 whitespace-nowrap">Organizer</th>
                  <th className="px-4 py-2 whitespace-nowrap">Image</th>
                  <th className="px-4 py-2 whitespace-nowrap">Status</th>
                  <th className="px-4 py-2 whitespace-nowrap">Created At</th>
                  <th className="px-4 py-2 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr
                    key={event.id}
                    className="even:bg-white odd:bg-[#F2F2F2] border-b"
                  >
                    <td className="px-4 py-3">
                      <h1 className="text-md text-[#4A5568] font-medium">
                        {truncateText(event.title, 3)}
                      </h1>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568] max-w-50">
                        {truncateText(event.description, 10)}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568] capitalize">
                        {event.location}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568]">
                        {formatDate(event.date)}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568]">
                        {event.organizer}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {event.image && event.image.length > 0 ? (
                          <div className="relative">
                            <Image
                              src={event.image[0].url}
                              alt={event.title}
                              width={40}
                              height={40}
                              className="w-10 h-10 object-cover rounded"
                            />
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">
                            No image
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          event.isPast
                            ? "bg-gray-200 text-gray-800"
                            : "bg-green-200 text-green-800"
                        }`}
                      >
                        {event.isPast ? "Past" : "Upcoming"}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-[#4A5568]">
                        {new Date(event.createdAt).toLocaleDateString("en-NG")}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() =>
                            router.push(`/admin/events/${event.id}`)
                          }
                          className="text-[#941A1A] hover:opacity-75 transition-all duration-300"
                          title="View event"
                        >
                          <MdOutlineRemoveRedEye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            router.push(`/admin/events/edit/${event.id}`)
                          }
                          className="text-blue-600 hover:opacity-75 transition-all duration-300"
                          title="Edit event"
                        >
                          <MdOutlineEdit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="text-red-600 hover:opacity-75 transition-all duration-300"
                          title="Delete event"
                        >
                          <RiDeleteBin5Line className="w-5 h-5" />
                        </button>
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
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-[#941A1A] text-white rounded-[5px] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-75 transition-all duration-300"
            >
              Previous
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 rounded-[5px] transition-all duration-300 ${
                      page === pageNum
                        ? "bg-[#941A1A] text-white"
                        : "bg-gray-200 text-[#4A5568] hover:bg-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                ),
              )}
            </div>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-[#941A1A] text-white rounded-[5px] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-75 transition-all duration-300"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
