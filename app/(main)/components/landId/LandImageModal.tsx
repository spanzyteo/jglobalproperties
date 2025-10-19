"use client";
import { useEffect, useState } from "react";
import { LandImage } from "../../utils/lands";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

interface ImageModalProps {
  images: LandImage[];
  initialIndex: number;
  onClose: () => void;
  landTitle: string;
}

const LandImageModal = ({
  images,
  initialIndex,
  onClose,
  landTitle,
}: ImageModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    // Add animation on mount
    setIsAnimating(true);

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300 ${
        isAnimating ? "bg-opacity-95" : "bg-opacity-0"
      }`}
      onClick={handleBackdropClick}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200"
        aria-label="Close modal"
      >
        <X className="w-8 h-8 text-white" />
      </button>

      {/* Image Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Main Image Container */}
      <div
        className={`relative w-[95vw] h-[90vh] flex items-center justify-center transition-all duration-300 ${
          isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-4 bg-white/90 hover:bg-white rounded-full shadow-2xl transition-all duration-200 hover:scale-110"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-8 h-8 text-gray-800" />
        </button>

        {/* Image */}
        <div className="relative w-[800px] h-[500px] flex items-center justify-center">
          <Image
            width={500}
            height={500}
            src={images[currentIndex].url}
            alt={`${landTitle} - Image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            style={{
              imageRendering: "-webkit-optimize-contrast",
            }}
          />
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-4 bg-white/90 hover:bg-white rounded-full shadow-2xl transition-all duration-200 hover:scale-110"
          aria-label="Next image"
        >
          <ChevronRight className="w-8 h-8 text-gray-800" />
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-[90vw] overflow-x-auto">
        <div className="flex gap-2 px-4">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 w-20 h-14 rounded overflow-hidden transition-all duration-200 ${
                idx === currentIndex
                  ? "ring-4 ring-white scale-110"
                  : "ring-2 ring-white/30 hover:ring-white/60"
              }`}
            >
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${img.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandImageModal;
