"use client";

import React from "react";
import { Playfair_Display, Roboto } from "next/font/google";
import { MdLocationOn } from "react-icons/md";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface EmptyStateProps {
  title?: string;
  description?: string;
  showIcon?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Houses Found",
  description = "Sorry, we couldn't find any houses in this category. Check back later for new listings.",
  showIcon = true,
}) => {
  return (
    <div
      className={`${roboto.className} flex flex-col items-center justify-center gap-6 py-24 px-4 text-center`}
    >
      {showIcon && (
        <div className="text-6xl text-gray-300">
          <MdLocationOn />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h2
          className={`${playfair.className} text-[32px] font-medium leading-10 text-gray-800`}
        >
          {title}
        </h2>
        <p className="text-[16px] leading-6 text-gray-500 max-w-md">
          {description}
        </p>
      </div>

      <button className="mt-4 px-6 py-3 bg-[#941A1A] text-white rounded-[5px] hover:bg-[#7a1414] transition-colors duration-300 ease-in-out">
        Browse Other Categories
      </button>
    </div>
  );
};

export default EmptyState;
