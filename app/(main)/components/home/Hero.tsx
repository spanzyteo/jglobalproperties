"use client";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Playfair_Display } from "next/font/google";
import { FaPlay } from "react-icons/fa";
import { useState, useEffect } from "react";
import Search from "./Search";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Hero = () => {

  // Background images array
  const backgroundImages = ["/bg1.webp", "/bg2.jpg"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transitionEffect, setTransitionEffect] = useState(0);

  // Duration for each image display (in milliseconds)
  const IMAGE_DISPLAY_DURATION = 6000; // 6 seconds

  // Array of different transition effects
  const transitionEffects = [
    "fade",
    "slideLeft",
    "slideRight",
    "zoomOut",
    "rotate",
    "blur",
  ];

  // Auto-rotate background images with random effects
  useEffect(() => {
    const interval = setInterval(() => {
      // Pick a random transition effect
      setTransitionEffect(Math.floor(Math.random() * transitionEffects.length));

      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, IMAGE_DISPLAY_DURATION);

    return () => clearInterval(interval);
  }, );

  // Animation variants for content
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const titleVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Background image animation variants with multiple effects
  const getBackgroundVariants = (effect: number) => {
    const effects = [
      // Fade effect
      {
        initial: { scale: 1, opacity: 0 },
        animate: {
          scale: 1.1,
          opacity: 1,
          transition: {
            duration: IMAGE_DISPLAY_DURATION / 1000,
            scale: { duration: IMAGE_DISPLAY_DURATION / 1000 },
            opacity: { duration: 1 },
          },
        },
        exit: {
          opacity: 0,
          transition: { duration: 1 },
        },
      },
      // Slide from left
      {
        initial: { scale: 1, opacity: 0, x: -100 },
        animate: {
          scale: 1.1,
          opacity: 1,
          x: 0,
          transition: {
            duration: IMAGE_DISPLAY_DURATION / 1000,
            scale: { duration: IMAGE_DISPLAY_DURATION / 1000 },
            opacity: { duration: 0.8 },
            x: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
          },
        },
        exit: {
          opacity: 0,
          x: 100,
          transition: { duration: 0.8 },
        },
      },
      // Slide from right
      {
        initial: { scale: 1, opacity: 0, x: 100 },
        animate: {
          scale: 1.1,
          opacity: 1,
          x: 0,
          transition: {
            duration: IMAGE_DISPLAY_DURATION / 1000,
            scale: { duration: IMAGE_DISPLAY_DURATION / 1000 },
            opacity: { duration: 0.8 },
            x: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
          },
        },
        exit: {
          opacity: 0,
          x: -100,
          transition: { duration: 0.8 },
        },
      },
      // Zoom out effect
      {
        initial: { scale: 1.5, opacity: 0 },
        animate: {
          scale: 1.1,
          opacity: 1,
          transition: {
            duration: IMAGE_DISPLAY_DURATION / 1000,
            scale: { duration: IMAGE_DISPLAY_DURATION / 1000 },
            opacity: { duration: 1 },
          },
        },
        exit: {
          scale: 0.8,
          opacity: 0,
          transition: { duration: 1 },
        },
      },
      // Rotate effect
      {
        initial: { scale: 1.2, opacity: 0, rotate: -5 },
        animate: {
          scale: 1.1,
          opacity: 1,
          rotate: 0,
          transition: {
            duration: IMAGE_DISPLAY_DURATION / 1000,
            scale: { duration: IMAGE_DISPLAY_DURATION / 1000 },
            opacity: { duration: 1 },
            rotate: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
          },
        },
        exit: {
          opacity: 0,
          rotate: 5,
          transition: { duration: 0.8 },
        },
      },
      // Blur to focus effect
      {
        initial: { scale: 1, opacity: 0, filter: "blur(20px)" },
        animate: {
          scale: 1.1,
          opacity: 1,
          filter: "blur(0px)",
          transition: {
            duration: IMAGE_DISPLAY_DURATION / 1000,
            scale: { duration: IMAGE_DISPLAY_DURATION / 1000 },
            opacity: { duration: 1 },
            filter: { duration: 1.5 },
          },
        },
        exit: {
          opacity: 0,
          filter: "blur(20px)",
          transition: { duration: 0.8 },
        },
      },
    ];

    return effects[effect] || effects[0];
  };

  return (
    <div className="lg:h-[44.8125rem] h-[41.562rem flex flex-col relative px-5 md:px-10 pb-6 overflow-hidden">
      {/* Animated Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
          }}
          variants={getBackgroundVariants(transitionEffect)}
          initial="initial"
          animate="animate"
          exit="exit"
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Content */}
      <motion.div
        className="z-10 flex flex-col md:flex-row gap-[3.0625rem] md:gap-0 mt-[13.1rem] lg:mt-[12rem] items-center md:justify-between"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex flex-col items-center md:items-start gap-6 lg:gap-10 max-w-[759px]">
          <motion.h1
            className={`${playfair.className} lg:leading-[4.5rem] md:leading-[3.5rem] leading-[2.5rem] text-white text-[2rem] md:text-[3rem] lg:text-[4rem] font-normal text-center md:text-left`}
            variants={titleVariants}
          >
            Leveraging Real Estate Market Opportunities
          </motion.h1>
          <motion.p
            className="text-white text-[18px] font-medium text-center md:text-left"
            variants={titleVariants}
          >
            Explore Nigeria&apos;s real estate opportunities and discover your
            next home in one of West Africa&apos;s most vibrant and rapidly
            growing property markets.
          </motion.p>
          <div className="flex gap-6 items-center">
            <div className="flex items-center justify-center w-[73px] h-[73px] rounded-full bg-[#941A1A]/65 cursor-pointer">
              <FaPlay className="text-white h-[25px] w-[25px]" />
            </div>
            <h3 className="font-medium text-white hover:text-[#941A1A] text-[1.2rem] cursor-pointer">
              Watch Video
            </h3>
          </div>
        </div>
        <Search />
      </motion.div>
    </div>
  );
};

export default Hero;
