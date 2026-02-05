"use client";
import ContactSection2 from "@/app/(main)/components/contact/ContactSection2";
import HouseIdContent from "@/app/(main)/components/houseId/HouseIdContent";
import HouseIdHero from "@/app/(main)/components/houseId/HouseIdHero";
import { notFound, useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useHouseById } from "@/app/(main)/features/houses";
import { useAppDispatch } from "@/app/(main)/store/hooks";
import {
  setCurrentHouse,
  clearCurrentHouse,
} from "@/app/(main)/store/houseSlice";

const HouseId = () => {
  const { id: houseId } = useParams();
  const dispatch = useAppDispatch();
  const { house, loading, error } = useHouseById(houseId as string);

  // Clear Redux state when house ID changes
  useEffect(() => {
    dispatch(clearCurrentHouse());
  }, [houseId, dispatch]);

  // Dispatch house to Redux when fetched
  useEffect(() => {
    if (house) {
      dispatch(setCurrentHouse(house));
    }
  }, [house, dispatch]);

  // Debug logging
  useEffect(() => {
    console.log("HouseId route param:", houseId);
    console.log("House data:", house);
    console.log("Loading state:", loading);
    console.log("Error:", error);
  }, [houseId, house, loading, error]);

  // If house not found, show 404
  if (!houseId) {
    notFound();
  }

  if (error && !loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading House</h1>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HouseIdHero loading={loading} />
      <div className="bg-[#fffcfc] px-4 md:px-8 py-8 flex flex-col lg:flex-row lg:justify-between gap-4">
        <HouseIdContent loading={loading} />
        <div className="sticky top-8 h-fit">
          <ContactSection2 />
        </div>
      </div>
    </div>
  );
};

export default HouseId;
