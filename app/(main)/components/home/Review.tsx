"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";

// Review data interface
interface Review {
  id: string;
  name: string;
  title: string;
  content: string;
  avatar?: string;
}

const reviewsData: Review[] = [
  {
    id: "1",
    name: "Mr Jude",
    title: "Land Investor",
    content:
      "Thank you for everything! From the very beginning, you have been there every step of the way, ensuring all my needs are met and my questions answered. Your support and transparency is immensely appreciated.",
  },
  {
    id: "2",
    name: "Mr James",
    title: "House Investor",
    content:
      "Jglobal Properties is a stress-free straight-to-the-point Real estate brokerage firm I used to acquire landed properties in Lagos. The company took me by the hand throughout the process and made sure I saved costs and money. I will highly recommend the company to anyone interested in land and property acquisition in Lagos state and Nigeria at large.",
  },
  {
    id: "3",
    name: "Mr Austin",
    title: "Real Estate Investor",
    content:
      "I got my first Property with Jglobal and I was amazed at the array of real estate investing at their disposal. I got the best deal because Jglobal team protected my interests.",
  },
  {
    id: "4",
    name: "Mrs Sarah",
    title: "Property Developer",
    content:
      "Working with Jglobal Properties has been an absolute game-changer for my investment portfolio. Their attention to detail and commitment to client satisfaction is unmatched in the industry.",
  },
  {
    id: "5",
    name: "Dr Michael",
    title: "Investment Consultant",
    content:
      "The professionalism and expertise demonstrated by the Jglobal team is remarkable. They guided me through every aspect of the property acquisition process with clarity and confidence.",
  },
];

const Review = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviewsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Get the reviews to display (previous, current, next)
  const getDisplayReviews = () => {
    const prevIndex =
      (currentIndex - 1 + reviewsData.length) % reviewsData.length;
    const nextIndex = (currentIndex + 1) % reviewsData.length;
    const nextNextIndex = (currentIndex + 2) % reviewsData.length;

    return [
      { ...reviewsData[prevIndex], position: "left", index: prevIndex },
      { ...reviewsData[currentIndex], position: "center", index: currentIndex },
      { ...reviewsData[nextIndex], position: "right", index: nextIndex },
      {
        ...reviewsData[nextNextIndex],
        position: "incoming",
        index: nextNextIndex,
      },
    ];
  };

  const displayReviews = getDisplayReviews();

  const goToReview = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full bg-gray-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Discover why thousands of investors trust Jglobal Properties
          </p>
        </div>

        {/* Reviews Display */}
        <div className="relative flex items-center justify-center min-h-[500px] md:min-h-[400px] mb-8 overflow-hidden">
          {/* Mobile view - scrolling effect */}
          <div className="md:hidden w-full">
            <div className="flex items-center justify-center">
              <motion.div
                key={currentIndex}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="bg-gray-800 text-white rounded-3xl p-6 shadow-2xl w-full max-w-sm"
              >
                {/* Header with name and title */}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-gray-300" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">
                      {reviewsData[currentIndex].name}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {reviewsData[currentIndex].title}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <p className="text-gray-100 leading-relaxed text-base">
                  {reviewsData[currentIndex].content}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Desktop view - true carousel scrolling */}
          <div className="hidden md:block w-full relative">
            <div className="flex items-center justify-center relative h-96">
              {displayReviews.map((review) => {
                let xPosition = 0;
                let scale = 0.8;
                let opacity = 0.6;
                let zIndex = 1;

                switch (review.position) {
                  case "left":
                    xPosition = -320; // Left position
                    scale = 0.8;
                    opacity = 0.6;
                    zIndex = 2;
                    break;
                  case "center":
                    xPosition = 0; // Center position
                    scale = 1;
                    opacity = 1;
                    zIndex = 10;
                    break;
                  case "right":
                    xPosition = 320; // Right position
                    scale = 0.8;
                    opacity = 0.6;
                    zIndex = 2;
                    break;
                  case "incoming":
                    xPosition = 640; // Far right, ready to enter
                    scale = 0.8;
                    opacity = 0;
                    zIndex = 1;
                    break;
                }

                return (
                  <motion.div
                    key={review.id}
                    initial={{ x: xPosition, scale, opacity, zIndex }}
                    animate={{ x: xPosition, scale, opacity, zIndex }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                      x: { type: "spring", stiffness: 100, damping: 20 },
                    }}
                    className={`
                      absolute rounded-3xl p-6 lg:p-8 shadow-2xl cursor-pointer
                      ${
                        review.position === "center"
                          ? "bg-gray-800 text-white w-80 lg:w-96"
                          : "bg-white text-gray-800 w-64 lg:w-72 h-64 lg:h-72"
                      }
                    `}
                    style={{ zIndex }}
                    onClick={() => {
                      if (review.position === "left") {
                        setCurrentIndex(
                          (currentIndex - 1 + reviewsData.length) %
                            reviewsData.length
                        );
                      } else if (review.position === "right") {
                        setCurrentIndex(
                          (currentIndex + 1) % reviewsData.length
                        );
                      }
                    }}
                  >
                    {/* Header with name and title */}
                    <div className="flex items-center mb-4 lg:mb-6">
                      <div
                        className={`
                        w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center mr-3 lg:mr-4
                        ${
                          review.position === "center"
                            ? "bg-gray-600"
                            : "bg-gray-200"
                        }
                      `}
                      >
                        <User
                          className={`
                          w-5 h-5 lg:w-6 lg:h-6 
                          ${
                            review.position === "center"
                              ? "text-gray-300"
                              : "text-gray-600"
                          }
                        `}
                        />
                      </div>
                      <div>
                        <h4
                          className={`
                          font-semibold lg:text-lg
                          ${
                            review.position === "center"
                              ? "text-white"
                              : "text-gray-900"
                          }
                        `}
                        >
                          {review.name}
                        </h4>
                        <p
                          className={`
                          text-sm lg:text-base
                          ${
                            review.position === "center"
                              ? "text-gray-300"
                              : "text-gray-500"
                          }
                        `}
                        >
                          {review.title}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <p
                      className={`
                      leading-relaxed text-sm lg:text-base
                      ${
                        review.position === "center"
                          ? "text-gray-100"
                          : "text-gray-700 line-clamp-6"
                      }
                    `}
                    >
                      {review.content}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center space-x-2 mb-4">
          {reviewsData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToReview(index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-300 
                ${
                  index === currentIndex
                    ? "bg-gray-800 scale-125"
                    : "bg-gray-400 hover:bg-gray-600"
                }
              `}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center">
          <div className="w-32 md:w-48 bg-gray-200 rounded-full h-1">
            <motion.div
              className="bg-gray-800 h-1 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              key={currentIndex}
              transition={{ duration: 5, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
