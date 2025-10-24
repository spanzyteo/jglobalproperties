/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";
import { Playfair_Display, Roboto } from "next/font/google";
import { easeOut, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Individual component for each section with scroll trigger
const ImageSection = ({ src, alt, className }: any) => {
  const { ref, inView } = useInView({
    // triggerOnce: true,
    threshold: 0.3,
  });

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`${className} overflow-hidden`} // overflow-hidden ensures inner scaling doesn’t break layout
      variants={imageVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.div
        className="relative w-full h-full" // no overflow hidden here
        whileHover={{ scale: 1.05 }} // only inner scales
        transition={{ duration: 0.5, ease: easeOut }}
      >
        <Image src={src} alt={alt} fill className="object-cover" />
        <motion.div
          className="absolute inset-0 bg-black/0"
          whileHover={{ backgroundColor: "rgba(0,0,0,0.2)" }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

const TextSection = ({ title, content, className }: any) => {
  const { ref, inView } = useInView({
    // triggerOnce: true,
    threshold: 0.3,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: easeOut,
      },
    },
  };

  const lineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "60px",
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: easeOut,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.h2
        className={`${playfair.className} text-[34px] md:text-[32px] leading-[40px] md:leading-[38px] text-center md:text-left`}
        variants={titleVariants}
      >
        {title}
      </motion.h2>

      <motion.div className="h-[2px] bg-[#941A1A]" variants={lineVariants} />

      <motion.p
        className={`${roboto.className} text-[18px] md:text-[14px] lg:text-[18px] leading-[28px] text-center md:text-left`}
        variants={textVariants}
      >
        {content}
      </motion.p>
    </motion.div>
  );
};

const MissionAndVision = () => {
  const { ref: leftImageRef, inView: leftImageInView } = useInView({
    // triggerOnce: true,
    threshold: 0.2,
  });

  const leftImageVariants = {
    hidden: {
      opacity: 0,
      x: -80,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: easeOut,
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row w-full overflow-hidden">
      {/* Left Image - Fixed height 883px on desktop */}
      <motion.div
        ref={leftImageRef}
        className="w-full md:w-1/3 h-[400px] md:h-[883px] relative xl:w-[675px]"
        variants={leftImageVariants}
        initial="hidden"
        animate={leftImageInView ? "visible" : "hidden"}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative w-full h-full overflow-hidden rounded-tl-[120px]">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-full"
          >
            <Image
              src={"/about/about1.webp"}
              alt="about"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </motion.div>

      {/* Right Section - 2x2 Grid */}
      <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-2 w-full md:w-2/3">
        {/* Vision Image - Top Left (order-1 on mobile) */}
        <ImageSection
          src="/about/about2.jpeg"
          alt="about"
          className="relative w-full h-[400px] md:h-[441.5px] order-1 md:order-none"
          index={0}
        />

        {/* Mission Text - Top Right (order-4 on mobile) */}
        <TextSection
          title="Our Mission"
          content="We understand that real estate is more than buying a home—it's a pathway to building wealth and creating a legacy. We tailor our strategies to your specific needs, ensuring your investment exceeds expectations with strong returns and sustainable income. Partner with us on your journey to financial success."
          className="bg-[#FFFFFF] flex flex-col h-[400px] md:h-[441.5px] p-[45px] items-center md:items-start gap-4 justify-center order-4 md:order-none"
          index={1}
        />

        {/* Vision Text - Bottom Left (order-2 on mobile) */}
        <TextSection
          title="Our Vision"
          content="Jglobal Properties is guided by a clear vision to help individuals identify and leverage real estate opportunities to increase their cash flow. Our personalized approach prioritizes understanding your unique needs and goals, recognizing that each client's investment objectives are distinct."
          className="bg-[#FFFFFF] flex flex-col h-[400px] md:h-[441.5px] p-[45px] items-center md:items-start gap-4 justify-center order-2 md:order-none"
          index={2}
        />

        {/* Mission Image - Bottom Right (order-3 on mobile) */}
        <ImageSection
          src="/about/about3.jpeg"
          alt="about"
          className="relative w-full h-[400px] md:h-[441.5px] order-3 md:order-none"
          index={3}
        />
      </div>
    </div>
  );
};

export default MissionAndVision;
