"use client";
import ContactSection2 from "@/app/(main)/components/contact/ContactSection2";
import LandIdContent from "@/app/(main)/components/landId/LandIdContent";
import LandIdHero from "@/app/(main)/components/landId/LandIdHero";
import { notFound, useParams } from "next/navigation";
import React from "react";

const LandId = () => {
  const { id: landId } = useParams();

  if (!landId) {
    notFound();
  }
  return (
    <div>
      <LandIdHero currentLandId={landId} />
      <div className="bg-[#fffcfc] px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-4">
        <LandIdContent currentLandId={landId} />
        <div className="sticky top-8 h-fit">
          <ContactSection2 />
        </div>
      </div>
    </div>
  );
};

export default LandId;
