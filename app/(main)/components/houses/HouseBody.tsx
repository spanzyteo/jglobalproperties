/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Playfair_Display, Roboto } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useHousesByCategory } from "../../features/houses";
import HouseSkeleton from "../skeletons/HouseSkeleton";
import EmptyState from "./EmptyState";
import { getOptimizedImageProps } from "@/app/utils/imageOptimization";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const HouseBody = () => {
  const finishedHomes = useHousesByCategory("FINISHED_HOMES", 8);
  const offPlanHomes = useHousesByCategory("OFF_PLAN_HOMES", 8);

  // State to track current image index for each house
  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: string]: number;
  }>({});

  // Track slide direction
  const [slideDirection, setSlideDirection] = useState<{
    [key: string]: number;
  }>({});

  const handleNextImage = (houseId: string, totalImages: number) => {
    if (totalImages <= 1) {
      return;
    }
    setSlideDirection((prev) => ({ ...prev, [houseId]: 1 }));
    setCurrentImageIndex((prev) => {
      const newIndex = ((prev[houseId] || 0) + 1) % totalImages;
      return {
        ...prev,
        [houseId]: newIndex,
      };
    });
  };

  const handlePrevImage = (houseId: string, totalImages: number) => {
    if (totalImages <= 1) {
      return;
    }
    setSlideDirection((prev) => ({ ...prev, [houseId]: -1 }));
    setCurrentImageIndex((prev) => {
      const newIndex = ((prev[houseId] || 0) - 1 + totalImages) % totalImages;
      return {
        ...prev,
        [houseId]: newIndex,
      };
    });
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const renderHouseCard = (item: any) => {
    // Handle case when item has no images
    if (!item.images || item.images.length === 0) {
      console.warn(`House ${item.id} has no images`);
      return (
        <div
          key={item.id}
          className="flex flex-col gap-0 rounded-[5px] shadow-lg"
        >
          <div className="relative group overflow-hidden h-55 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No images available</span>
          </div>
          <div
            className={`${roboto.className} py-3 pl-4 flex flex-col gap-2 h-35`}
          >
            <Link
              href={`/houses/${item.slug}`}
              className="text-[18px] font-medium leading-5.75 hover:text-[#941A1A] hover:underline transition-all duration-500 ease-in-out"
            >
              {item.title}
            </Link>
            <h4 className={`text-[14px] leading-5.75`}>{item.category}</h4>
          </div>
          <div
            className={`${roboto.className} flex items-center justify-between px-4 border-t border-t-gray-200 `}
          >
            <h2 className="text-[18px] font-medium leading-[18.2px]">
              {item.price}
            </h2>
            <div className="p-2.5 border-l border-l-gray-200">
              <Image
                src={"/ceo.JPG"}
                alt="ceo"
                height={100}
                width={100}
                className="rounded-[5px] h-15 w-15 object-cover"
              />
            </div>
          </div>
        </div>
      );
    }

    const currentIndex = currentImageIndex[item.id] || 0;
    const currentImage = item.images[currentIndex];
    const direction = slideDirection[item.id] || 1;

    return (
      <div
        key={item.id}
        className="flex flex-col gap-0 rounded-[5px] shadow-lg"
      >
        <div className="relative group overflow-hidden h-55 bg-gray-200">
          {/* Main animated image container */}
          <div className="relative w-full h-full">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30, mass: 1 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  {...getOptimizedImageProps(
                    currentImage.url,
                    `${item.title} - Image ${currentIndex + 1}`,
                    {
                      quality: 75,
                      sizes:
                        "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px",
                    },
                  )}
                  className="w-full h-full object-cover"
                  fill
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows - Hidden until multiple images are available */}
        </div>
        <div
          className={`${roboto.className} py-3 pl-4 flex flex-col gap-2 h-35`}
        >
          <Link
            href={`/houses/${item.slug}`}
            className="text-[18px] font-medium leading-5.75 hover:text-[#941A1A] hover:underline transition-all duration-500 ease-in-out"
          >
            {item.title}
          </Link>
          <h4 className={`text-[14px] leading-5.75`}>{item.category}</h4>
        </div>
        <div
          className={`${roboto.className} flex items-center justify-between px-4 border-t border-t-gray-200 `}
        >
          <h2 className="text-[18px] font-medium leading-[18.2px]">
            {item.price}
          </h2>
          <div className="p-2.5 border-l border-l-gray-200">
            <Image
              src={"/logo.png"}
              alt="ceo"
              height={350}
              width={350}
              className="rounded-[5px] h-15 w-15 object-cover"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderCategorySection = (
    categoryData: ReturnType<typeof useHousesByCategory>,
    title: string,
  ) => {
    const { houses, loading, pagination, currentPage, goToPage } = categoryData;

    if (loading) {
      return (
        <div key={title} className="flex flex-col gap-4">
          <h1
            className={`${playfair.className} text-[34px] font-medium leading-11`}
          >
            {title}
          </h1>
          <HouseSkeleton count={8} />
        </div>
      );
    }

    if (!houses || houses.length === 0) {
      return (
        <div key={title}>
          <h1
            className={`${playfair.className} text-[34px] font-medium leading-11`}
          >
            {title}
          </h1>
          <EmptyState
            title="No Houses Available"
            description={`Sorry, we don't have any ${title.toLowerCase()} available at the moment. Please check back later for new listings.`}
          />
        </div>
      );
    }

    return (
      <div key={title} className="flex flex-col gap-4">
        <h1
          className={`${playfair.className} text-[34px] font-medium leading-11`}
        >
          {title}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
          {houses.map((item) => renderHouseCard(item))}
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-[5px] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="flex gap-2">
              {Array.from({ length: pagination.totalPages }).map((_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`px-3 py-2 rounded-[5px] transition-colors ${
                      currentPage === pageNum
                        ? "bg-[#941A1A] text-white"
                        : "border border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() =>
                goToPage(Math.min(pagination.totalPages, currentPage + 1))
              }
              disabled={currentPage === pagination.totalPages}
              className="px-4 py-2 border border-gray-300 rounded-[5px] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="px-4 md:px-8 py-12 flex flex-col gap-12">
      {renderCategorySection(finishedHomes, "Finished Homes")}
      {renderCategorySection(offPlanHomes, "Off Plan Homes")}
    </div>
  );
};

export default HouseBody;
