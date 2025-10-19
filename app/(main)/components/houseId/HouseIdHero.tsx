"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import houses from "../../utils/houses";
import { setCurrentHouse } from "../../store/houseSlice";
import ImageModal from "./ImageModal";
import Properties from "./Properties";

interface HouseHeroProps {
  currentHouseId: string | string[];
}

const HouseIdHero = ({ currentHouseId }: HouseHeroProps) => {
  const dispatch = useAppDispatch();
  const house = useAppSelector((state) => state.house.currentHouse);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  useEffect(() => {
    const filteredHouse = houses.find(
      (item) => item.id.toString() === currentHouseId.toString()
    );
    if (filteredHouse) {
      dispatch(setCurrentHouse(filteredHouse));
      setCurrentIndex(filteredHouse.image.length);
    }
  }, [currentHouseId, dispatch]);

  if (!house || !house.image || house.image.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
        No images available
      </div>
    );
  }

  const totalImages = house.image.length;
  const extendedImages = [...house.image, ...house.image, ...house.image];

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);

    if (newIndex < totalImages) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalImages * 2 - 1);
      }, 300);
    } else {
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);

    if (newIndex >= totalImages * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalImages);
      }, 300);
    } else {
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const handleImageClick = (idx: number) => {
    const actualIndex = idx % totalImages;
    setModalImageIndex(actualIndex);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full relative">
      {/* Desktop View - 3 images */}
      <div className="hidden lg:block relative w-full h-[600px] overflow-hidden bg-black">
        <div
          className={`flex h-full ${
            isTransitioning
              ? "transition-transform duration-300 ease-in-out"
              : ""
          }`}
          style={{ transform: `translateX(calc(-${currentIndex * 100}% / 3))` }}
        >
          {extendedImages.map((img, idx) => (
            <div
              key={`desktop-${idx}`}
              className="w-[33.3333%] h-full flex-shrink-0 cursor-pointer relative group"
              onClick={() => handleImageClick(idx)}
              style={{
                backgroundImage: `url(${img.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        <button
          onClick={handlePrev}
          disabled={isTransitioning}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white disabled:opacity-50 p-3 rounded-full shadow-lg transition-all z-10"
          aria-label="Previous images"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={handleNext}
          disabled={isTransitioning}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white disabled:opacity-50 p-3 rounded-full shadow-lg transition-all z-10"
          aria-label="Next images"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      {/* Tablet View - 2 images */}
      <div className="hidden md:block lg:hidden relative w-full h-[600px] overflow-hidden bg-black">
        <div
          className={`flex h-full ${
            isTransitioning
              ? "transition-transform duration-300 ease-in-out"
              : ""
          }`}
          style={{ transform: `translateX(calc(-${currentIndex * 100}% / 2))` }}
        >
          {extendedImages.map((img, idx) => (
            <div
              key={`tablet-${idx}`}
              className="w-[50%] h-full flex-shrink-0 cursor-pointer relative group"
              onClick={() => handleImageClick(idx)}
              style={{
                backgroundImage: `url(${img.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        <button
          onClick={handlePrev}
          disabled={isTransitioning}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white disabled:opacity-50 p-3 rounded-full shadow-lg transition-all z-10"
          aria-label="Previous images"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800" />
        </button>
        <button
          onClick={handleNext}
          disabled={isTransitioning}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white disabled:opacity-50 p-3 rounded-full shadow-lg transition-all z-10"
          aria-label="Next images"
        >
          <ChevronRight className="w-5 h-5 text-gray-800" />
        </button>
      </div>

      {/* Mobile View - 1 image */}
      <div className="block md:hidden relative w-full h-[600px] overflow-hidden bg-black">
        <div
          className={`flex h-full ${
            isTransitioning
              ? "transition-transform duration-300 ease-in-out"
              : ""
          }`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {extendedImages.map((img, idx) => (
            <div
              key={`mobile-${idx}`}
              className="w-full h-full flex-shrink-0 cursor-pointer relative group"
              onClick={() => handleImageClick(idx)}
              style={{
                backgroundImage: `url(${img.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        <button
          onClick={handlePrev}
          disabled={isTransitioning}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white disabled:opacity-50 p-2 rounded-full shadow-lg transition-all z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800" />
        </button>
        <button
          onClick={handleNext}
          disabled={isTransitioning}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white disabled:opacity-50 p-2 rounded-full shadow-lg transition-all z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 text-gray-800" />
        </button>
      </div>

      {isModalOpen && house && (
        <ImageModal
          images={house.image}
          initialIndex={modalImageIndex}
          onClose={handleCloseModal}
          houseTitle={house.title}
        />
      )}
      <Properties currentHouseId={house.id}/>
    </div>
  );
};

export default HouseIdHero;
