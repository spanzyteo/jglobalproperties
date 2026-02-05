/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { MdOutlineEdit, MdArrowBack } from "react-icons/md";
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

const EventDetails = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get<{
          success: boolean;
          data: EventType;
        }>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events/${id}`, {
          withCredentials: true,
        });

        setEvent(response.data.data);

        setLoading(false);
      } catch (error: any) {
        setLoading(false);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const stripHtmlTags = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="bg-white min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Event not found</p>
          <button
            onClick={() => router.push("/admin/events")}
            className="px-6 py-2 bg-[#941A1A] text-white rounded-[5px] hover:opacity-75 transition-all duration-300"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen w-full flex flex-col pb-12 xl:pl-80">
      <div className="mt-8 bg-[#F2F2F2] flex flex-col px-4 w-[90%] lg:w-253.5 rounded-xl mx-auto pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mt-4 mb-8">
          <button
            onClick={() => router.push("/admin/events")}
            className="flex items-center gap-2 text-[#941A1A] hover:opacity-75 transition-all duration-300"
          >
            <MdArrowBack className="w-5 h-5" />
            <span>Back to Events</span>
          </button>
          <button
            onClick={() => router.push(`/admin/events/edit/${event.id}`)}
            className="flex items-center gap-2 px-6 py-2 bg-[#941A1A] text-white rounded-[5px] hover:opacity-75 transition-all duration-300"
          >
            <MdOutlineEdit className="w-5 h-5" />
            <span>Edit Event</span>
          </button>
        </div>

        {/* Event Title */}
        <h1 className="text-3xl font-bold text-[#4A5568] mb-4">
          {event.title}
        </h1>

        {/* Event Status */}
        <div className="mb-6">
          <span
            className={`px-4 py-2 text-sm font-semibold rounded-full ${
              event.isPast
                ? "bg-gray-200 text-gray-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            {event.isPast ? "Past Event" : "Upcoming Event"}
          </span>
        </div>

        {/* Event Image */}
        {event.image && event.image.length > 0 && (
          <div className="mb-8">
            <Image
              src={event.image[0].url}
              alt={event.title}
              width={600}
              height={400}
              className="w-full h-auto max-h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Event Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Location */}
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold text-gray-600 mb-2">
              LOCATION
            </h2>
            <p className="text-lg text-[#4A5568]">{event.location}</p>
          </div>

          {/* Date & Time */}
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold text-gray-600 mb-2">
              DATE & TIME
            </h2>
            <p className="text-lg text-[#4A5568]">{formatDate(event.date)}</p>
          </div>

          {/* Organizer */}
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold text-gray-600 mb-2">
              ORGANIZER
            </h2>
            <p className="text-lg text-[#4A5568]">{event.organizer}</p>
          </div>

          {/* Created Date */}
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold text-gray-600 mb-2">
              CREATED
            </h2>
            <p className="text-lg text-[#4A5568]">
              {formatDate(event.createdAt)}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-[#4A5568] mb-4">DESCRIPTION</h2>
          <div
            className="prose prose-sm max-w-none text-[#4A5568]"
            dangerouslySetInnerHTML={{ __html: event.description }}
          />
        </div>

        {/* Additional Info */}
        <div className="bg-white border border-[#EFEFEF] rounded-lg p-6">
          <h2 className="text-lg font-bold text-[#4A5568] mb-4">
            ADDITIONAL INFORMATION
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-gray-600">Event ID:</span>
              <span className="text-[#4A5568] font-mono text-sm">
                {event.id}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-gray-600">Last Updated:</span>
              <span className="text-[#4A5568]">
                {formatDate(event.updatedAt)}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-gray-600">Image Count:</span>
              <span className="text-[#4A5568]">{event.image.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
