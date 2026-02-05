/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Playfair_Display, Roboto } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLandsByStatus } from "../../features/lands";
import LandSkeleton from "../skeletons/LandSkeleton";
import EmptyState from "../houses/EmptyState";
import { getOptimizedImageProps } from "@/app/utils/imageOptimization";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const LandBody = () => {
  const forSale = useLandsByStatus("FOR_SALE", 8);
  const sold = useLandsByStatus("SOLD", 8);

  // State to track current image index for each land
  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: string]: number;
  }>({});

  // Track slide direction
  const [slideDirection, setSlideDirection] = useState<{
    [key: string]: number;
  }>({});

  const handleNextImage = (landId: string, totalImages: number) => {
    if (totalImages <= 1) {
      return;
    }
    setSlideDirection((prev) => ({ ...prev, [landId]: 1 }));
    setCurrentImageIndex((prev) => {
      const newIndex = ((prev[landId] || 0) + 1) % totalImages;
      return {
        ...prev,
        [landId]: newIndex,
      };
    });
  };

  const handlePrevImage = (landId: string, totalImages: number) => {
    if (totalImages <= 1) {
      return;
    }
    setSlideDirection((prev) => ({ ...prev, [landId]: -1 }));
    setCurrentImageIndex((prev) => {
      const newIndex = ((prev[landId] || 0) - 1 + totalImages) % totalImages;
      return {
        ...prev,
        [landId]: newIndex,
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

  const renderLandCard = (item: any) => {
    // Handle case when item has no images
    if (!item.images || item.images.length === 0) {
      console.warn(`Land ${item.id} has no images`);
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
              href={`/pages/lands/${item.slug}`}
              className="text-[18px] font-medium leading-5.75 hover:text-[#941A1A] hover:underline transition-all duration-500 ease-in-out"
            >
              {item.title}
            </Link>
            <h4 className={`text-[14px] leading-5.75`}>{item.status}</h4>
          </div>
          <div
            className={`${roboto.className} flex items-center justify-between px-4 border-t border-t-gray-200`}
          >
            <h2 className="text-[18px] font-medium leading-[18.2px]">
              {item.units[0] &&
                `₦${parseInt(item.units[0].price).toLocaleString()}`}
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
        className="flex flex-col gap-0 rounded-[5px] shadow-lg overflow-hidden"
      >
        <div className="relative group overflow-hidden h-55">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "tween", duration: 0.3, ease: "easeInOut" },
              }}
              className="absolute inset-0"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <Image
                  {...getOptimizedImageProps(currentImage.url, item.title)}
                  className="rounded-t-[5px] object-cover h-full w-full"
                  width={500}
                  height={500}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Placeholder to maintain height */}
          <Image
            {...getOptimizedImageProps(currentImage.url, item.title)}
            className="rounded-t-[5px] object-cover h-full w-full invisible"
            width={500}
            height={500}
          />

          {/* Navigation Arrows */}
          {item.images.length > 1 && (
            <>
              <button
                onClick={() => handlePrevImage(item.id, item.images.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                aria-label="Previous image"
              >
                <span className="text-lg">‹</span>
              </button>
              <button
                onClick={() => handleNextImage(item.id, item.images.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                aria-label="Next image"
              >
                <span className="text-lg">›</span>
              </button>
            </>
          )}

          {/* Image indicator dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {item.images.map((_: any, index: number) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-white w-4" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        <div
          className={`${roboto.className} py-3 pl-4 flex flex-col gap-2 h-35`}
        >
          <Link
            href={`/pages/lands/${item.slug}`}
            className="text-[18px] font-medium leading-5.75 hover:text-[#941A1A] hover:underline transition-all duration-500 ease-in-out"
          >
            {item.title}
          </Link>
          <h4 className={`text-[14px] leading-5.75`}>{item.status}</h4>
        </div>

        <div
          className={`${roboto.className} flex items-center justify-between px-4 border-t border-t-gray-200`}
        >
          <h2 className="text-[18px] font-medium leading-[18.2px]">
            {item.units[0] &&
              `₦${parseInt(item.units[0].price).toLocaleString()}`}
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
  };

  const renderCategorySection = (
    landData: ReturnType<typeof useLandsByStatus>,
    title: string,
  ) => {
    const { lands, loading, error, pagination, currentPage, goToPage } =
      landData;

    // Show loading state
    if (loading && lands.length === 0) {
      return (
        <div key={title}>
          <h1
            className={`${playfair.className} text-[34px] font-medium leading-11`}
          >
            {title}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
            {[...Array(8)].map((_, index) => (
              <LandSkeleton key={index} />
            ))}
          </div>
        </div>
      );
    }

    // Show error state
    if (error && lands.length === 0) {
      return (
        <div key={title}>
          <h1
            className={`${playfair.className} text-[34px] font-medium leading-11`}
          >
            {title}
          </h1>
          <div className="mt-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              Error loading lands: {error}
            </div>
          </div>
        </div>
      );
    }

    // Show empty state
    if (lands.length === 0) {
      return (
        <div key={title}>
          <h1
            className={`${playfair.className} text-[34px] font-medium leading-11`}
          >
            {title}
          </h1>
          <div className="mt-4">
            <EmptyState
              title={`No ${title.toLowerCase()} available`}
              description={`Check back later for new listings`}
            />
          </div>
        </div>
      );
    }

    return (
      <div key={title}>
        <h1
          className={`${playfair.className} text-[34px] font-medium leading-11`}
        >
          {title}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
          {lands.map((item) => renderLandCard(item))}
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
      {renderCategorySection(forSale, "For Sale")}
      {renderCategorySection(sold, "Sold")}
    </div>
  );
};

export default LandBody;
