"use client";

import { Playfair_Display, Roboto } from "next/font/google";
import { easeOut, motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const OurServices = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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

  const leftSideVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  const dividerVariants = {
    hidden: { opacity: 0, scaleY: 0 },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  const rightSideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeOut,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="flex flex-col md:flex-row py-20 px-5 md:px-6 items-center md:justify-between gap-4 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div
        className="flex flex-col items-center md:items-start gap-8"
        variants={leftSideVariants}
      >
        <motion.div
          className="flex items-center gap-3 text-[15px]"
          variants={badgeVariants}
        >
          <div className="h-3 w-3 rounded-full border-2 border-[#941A1A]"></div>
          <h1>OUR SERVICES</h1>
        </motion.div>
        <motion.h1
          className={`${playfair.className} text-[34px] md:text-[45px] max-w-[625px] text-center md:text-left`}
          variants={titleVariants}
        >
          Passionate About Being Different & Loyal
        </motion.h1>
      </motion.div>

      <motion.div
        className="hidden md:block w-[0.1rem] h-44 bg-[#941A1A]"
        variants={dividerVariants}
        style={{ originY: 0 }}
      />

      <motion.div
        className="flex justify-center max-w-[597px] text-[18px] md:pl-8"
        variants={rightSideVariants}
      >
        <h3
          className={`${roboto.className} md:leading-[28px] leading-[25px] max-w-[597px] text-center md:text-left`}
        >
          jglobalproperties stands out to all—clients, developers, vendors, and
          industry professionals alike—for her exceptional talents, innovative
          spirit, and unwavering dedication in guiding buyers and sellers. Her
          ability to navigate the complexities of the market with ease and
          precision sets her apart.
        </h3>
      </motion.div>
    </motion.div>
  );
};

export default OurServices;
