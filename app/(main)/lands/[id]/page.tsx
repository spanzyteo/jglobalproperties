"use client";
import ContactSection2 from "@/app/(main)/components/contact/ContactSection2";
import LandIdContent from "@/app/(main)/components/landId/LandIdContent";
import LandIdHero from "@/app/(main)/components/landId/LandIdHero";
import { notFound, useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useLandBySlug } from "@/app/(main)/features/lands";
import { useAppDispatch } from "@/app/(main)/store/hooks";
import { setCurrentLand, clearCurrentLand } from "@/app/(main)/store/landSlice";

const LandId = () => {
  const { id: slug } = useParams();
  const dispatch = useAppDispatch();
  const { land, loading, error } = useLandBySlug(slug as string);

  // Clear Redux state when slug changes
  useEffect(() => {
    dispatch(clearCurrentLand());
  }, [slug, dispatch]);

  // Dispatch land to Redux when fetched
  useEffect(() => {
    if (land) {
      dispatch(setCurrentLand(land));
    }
  }, [land, dispatch]);

  // Debug logging
  useEffect(() => {
    console.log("LandId route param (slug):", slug);
    console.log("Land data:", land);
    console.log("Loading state:", loading);
    console.log("Error:", error);
  }, [slug, land, loading, error]);

  if (!slug) {
    notFound();
  }

  if (error && !loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Land</h1>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <LandIdHero loading={loading} />
      <div className="bg-[#fffcfc] px-4 md:px-8 py-8 flex flex-col lg:flex-row lg:justify-between gap-4">
        <LandIdContent loading={loading} />
        <div className="sticky top-8 h-fit lg:w-[30%]">
          <ContactSection2 />
        </div>
      </div>
    </div>
  );
};

export default LandId;
