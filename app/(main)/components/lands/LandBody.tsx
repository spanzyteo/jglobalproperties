/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Playfair_Display, Roboto } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import lands from "../../utils/lands";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const LandBody = () => {
  const forSale = lands.filter((item) => item.status === "FOR SALE");
  const sold = lands.filter((item) => item.status === "SOLD");

  // State to track current image index for each land - changed to string key
  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: string]: number;
  }>({});

  // Track slide direction - changed to string key
  const [slideDirection, setSlideDirection] = useState<{
    [key: string]: number;
  }>({});

  const handlePrevImage = (landId: string, totalImages: number) => {
    setSlideDirection((prev) => ({ ...prev, [landId]: -1 }));
    setCurrentImageIndex((prev) => ({
      ...prev,
      [landId]: ((prev[landId] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  const handleNextImage = (landId: string, totalImages: number) => {
    setSlideDirection((prev) => ({ ...prev, [landId]: 1 }));
    setCurrentImageIndex((prev) => ({
      ...prev,
      [landId]: ((prev[landId] || 0) + 1) % totalImages,
    }));
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
    }),
    center: {
      x: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
    }),
  };

  const renderLandCard = (item: any) => {
    const currentIndex = currentImageIndex[item.id] || 0;
    const currentImage = item.images[currentIndex];
    const direction = slideDirection[item.id] || 1;

    return (
      <div key={item.id} className="flex flex-col gap- rounded-[5px] shadow-lg">
        {currentImage && (
          <div className="relative group overflow-hidden h-[220px]">
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
                    src={currentImage.url}
                    alt="img"
                    className="rounded-t-[5px] object-cover h-full w-full"
                    height={500}
                    width={500}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Placeholder to maintain height */}
            <Image
              src={currentImage.url}
              alt="img"
              className="rounded-t-[5px] object-cover h-full w-full invisible"
              height={500}
              width={500}
            />

            {/* Navigation Arrows */}
            <button
              onClick={() => handlePrevImage(item.id, item.images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 cursor-pointer"
              aria-label="Previous image"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleNextImage(item.id, item.images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 cursor-pointer"
              aria-label="Next image"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
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
        )}
        <div
          className={`${roboto.className} py-3 pl-4 flex flex-col gap-2 h-[100px]`}
        >
          <Link
            href={`/properties/lands/${item.id}`}
            className="text-[18px] font-medium leading-[23px] hover:text-[#941A1A] hover:underline transition-all duration-500 ease-in-out"
          >
            {item.title}
          </Link>
          <h4 className={`text-[14px] leading-[23px]`}>{item.status}</h4>
        </div>
        <div
          className={`${roboto.className} flex items-center justify-between px-4 border-t border-t-gray-200 `}
        >
          <h2 className="text-[18px] font-medium leading-[18.2px]">
            {item.units[0] &&
              `₦${parseInt(item.units[0].price).toLocaleString()}`}
          </h2>
          <div className="p-[10px] border-l border-l-gray-200">
            <Image
              src={"/joan.png"}
              alt="ceo"
              height={40}
              width={40}
              className="rounded-[5px]"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 md:px-8 py-12 flex flex-col gap-4">
      <h1
        className={`${playfair.className} text-[34px] font-medium leading-[44px]`}
      >
        For Sale
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
        {forSale.map((item) => renderLandCard(item))}
      </div>
      <h1
        className={`${playfair.className} text-[34px] font-medium leading-[44px] mt-10`}
      >
        Sold
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
        {sold.map((item) => renderLandCard(item))}
      </div>
    </div>
  );
};

export default LandBody;
