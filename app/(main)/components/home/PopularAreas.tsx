/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Playfair_Display, Roboto, Bodoni_Moda } from "next/font/google";
import Link from "next/link";
import { popular } from "../../utils/popular";
import Image from "next/image";
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

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Separate component for each image card with its own scroll trigger
const PopularCard = ({ item, index }: any) => {
  const { ref, inView } = useInView({
    // triggerOnce: true,
    threshold: 0.3,
  });

  const imageCardVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.85,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: easeOut,
      },
    },
  };

  const overlayVariants = {
    initial: { opacity: 0.25 },
    hover: {
      opacity: 0.6,
      transition: { duration: 0.3 },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.15,
      rotate: 2,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  const textOverlayVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.3, duration: 0.5 },
    },
    hover: {
      scale: 1.1,
      y: -5,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-tl-[5px] rounded-tr-[50px] rounded-bl-[50px] rounded-br-[5px] cursor-pointer"
      variants={imageCardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover="hover"
    >
      <motion.div className="relative" variants={imageVariants}>
        <Image
          alt="popular"
          src={item.image}
          height={480}
          width={600}
          className="h-[260px] md:h-[480px] w-full md:max-w-[270px] object-cover rounded-tl-[5px] rounded-tr-[50px] rounded-bl-[50px] rounded-br-[5px]"
        />
      </motion.div>

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/25 z-0 rounded-tl-[5px] rounded-tr-[50px] rounded-bl-[50px] rounded-br-[5px]"
        variants={overlayVariants}
        initial="initial"
      />

      <motion.h3
        className={`${bodoni.className} absolute inset-0 flex items-center justify-center text-center font-semibold text-[18px] md:text-[20px] text-white z-10 px-4`}
        variants={textOverlayVariants}
        initial="initial"
        animate={inView ? "animate" : "initial"}
      >
        {item.name}
      </motion.h3>
    </motion.div>
  );
};

const PopularAreas = () => {
  const { ref: leftRef, inView: leftInView } = useInView({
    // triggerOnce: true,
    threshold: 0.3,
  });

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.7,
        ease: easeOut,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
        delay: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: easeOut,
        delay: 0.4,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
        delay: 0.6,
      },
    },
  };

  return (
    <div className="py-20 px-5 md:px-6 bg-black flex flex-col lg:flex-row gap-8 lg:gap-4 justify-between overflow-hidden">
      {/* LEFT SECTION */}
      <motion.div
        ref={leftRef}
        className="flex flex-col items-center md:items-start gap-8 text-white"
        initial="hidden"
        animate={leftInView ? "visible" : "hidden"}
      >
        <motion.div
          className="flex items-center gap-3 text-[15px]"
          variants={badgeVariants}
        >
          <div className="h-3 w-3 rounded-full border-2 border-[#941A1A]"></div>
          <h1>EXCLUSIVE</h1>
        </motion.div>

        <motion.h1
          className={`${playfair.className} text-[34px] md:text-[45px] max-w-[625px] text-center md:text-left`}
          variants={titleVariants}
        >
          Popular Areas
        </motion.h1>

        <motion.p
          className={`${roboto.className} max-w-[480px] text-[18px] leading-[32px] text-center md:text-left`}
          variants={textVariants}
        >
          Our dynamic approach and tireless commitment to facilitating
          transactions for buyers and sellers sets us apart.
          <br />
          Across Nigeria&apos;s thriving cities and emerging neighborhoods, we
          are trusted by residents, property developers, local businesses, and
          real estate professionals for our expertise and dedication to
          excellence.
        </motion.p>

        <motion.div variants={linkVariants}>
          <Link
            href={"/contact"}
            className="text-[18px] leading-[32px] text-[#FF6725C9] hover:underline transition-all duration-300"
          >
            Contact Us
          </Link>
        </motion.div>
      </motion.div>

      {/* RIGHT SECTION - IMAGES */}
      <div className="flex flex-col md:flex-row gap-4">
        {popular.map((item, index) => (
          <PopularCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default PopularAreas;
