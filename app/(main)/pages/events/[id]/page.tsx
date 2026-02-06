"use client";

import ContactSection2 from "@/app/(main)/components/contact/ContactSection2";
import EventIdContent from "@/app/(main)/components/eventId/EventIdContent";
import EventIdHero from "@/app/(main)/components/eventId/EventIdHero";
import Contact from "@/app/(main)/components/home/Contact";
import { notFound, useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useEventBySlug } from "@/app/(main)/features/events";
import { useAppDispatch } from "@/app/(main)/store/hooks";
import {
  setCurrentEvent,
  clearCurrentEvent,
} from "@/app/(main)/store/eventSlice";

const EventId = () => {
  const { id: slug } = useParams();
  const dispatch = useAppDispatch();
  const { event, loading, error } = useEventBySlug(slug as string);

  // Clear Redux state when slug changes
  useEffect(() => {
    dispatch(clearCurrentEvent());
  }, [slug, dispatch]);

  // Dispatch event to Redux when fetched
  useEffect(() => {
    if (event) {
      dispatch(setCurrentEvent(event));
    }
  }, [event, dispatch]);

  // Debug logging
  useEffect(() => {
    console.log("Event route param (slug):", slug);
    console.log("Event data:", event);
    console.log("Loading state:", loading);
    console.log("Error:", error);
  }, [slug, event, loading, error]);

  // If slug not found, show 404
  if (!slug) {
    notFound();
  }

  if (error && !loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Event</h1>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <EventIdHero loading={loading} />
      <div className="bg-[#fffcfc] px-4 md:px-8 py-8 flex flex-col md:flex-row gap-4">
        <EventIdContent loading={loading} />
        <ContactSection2 />
      </div>
      <Contact />
    </div>
  );
};

export default EventId;
