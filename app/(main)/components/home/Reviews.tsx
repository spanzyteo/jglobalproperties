"use client";

import { useState, useEffect } from "react";
import { Parallax } from "react-parallax";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";
import { Playfair_Display, Roboto } from "next/font/google";
import { BsStarFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { reviewsData } from "../../utils/review";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + reviewsData.length) % reviewsData.length
    );
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentReview = reviewsData[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <>
      <Parallax
        strength={300}
        bgImage="/review-bg.jpg"
        bgImageStyle={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        className="py-10 px-5 md:px-6"
      >
        <div className="bg-black/89 w-full md:max-w-[970px] min-h-[500px] md:min-h-[600px] py-20 px-2 md:px-6 mx-auto rounded-tl-[5px] rounded-tr-[50px] rounded-bl-[50px] rounded-br-[5px] flex items-center justify-between relative">
          <div
            onClick={handlePrev}
            className="p-2 rounded-[6px] bg-white cursor-pointer hover:bg-[#941A1A] hover:text-white transition-all duration-500 ease-in-out z-10"
          >
            <PiArrowLeft className="h-[20px] w-[20px]" />
          </div>

          <div className="flex-1 max-w-[770px] px-4 overflow-hidden relative h-[400px] md:h-[450px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                }}
                className="flex flex-col items-center gap-8 absolute inset-0"
              >
                <p
                  className={`${roboto.className} uppercase text-[14px] text-[#FF6725C9] text-center`}
                >
                  {currentReview.title}
                </p>
                <p
                  className={`text-[16px] md:text-[31px] ${playfair.className} text-white text-center leading-[30px md:leading-[44px]`}
                >
                  {currentReview.content}
                </p>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center text-yellow-400 mx-auto gap-1">
                    {[...Array(5)].map((_, index) => (
                      <BsStarFill
                        key={index}
                        className={
                          index < currentReview.rating
                            ? "text-yellow-400"
                            : "text-gray-500"
                        }
                      />
                    ))}
                  </div>
                  <p
                    className={`${roboto.className} text-[14px] font-medium text-white`}
                  >
                    {currentReview.name}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            onClick={handleNext}
            className="p-2 rounded-[6px] bg-white cursor-pointer hover:bg-[#941A1A] hover:text-white transition-all duration-500 ease-in-out z-10"
          >
            <PiArrowRight className="h-[20px] w-[20px]" />
          </div>

          <div className="flex absolute bottom-5 left-1/2 transform -translate-x-1/2 justify-center gap-3">
            {reviewsData.map((_, index) => (
              <motion.div
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 w-2 rounded-full cursor-pointer ${
                  index === currentIndex ? "bg-[#FF6725]" : "bg-gray-400"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: index === currentIndex ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </div>
      </Parallax>
    </>
  );
};

export default Reviews;
