"use client";

import { Playfair_Display, Roboto } from "next/font/google";
import Link from "next/link";
import BlogsSection from "../blogs/BlogsSection";
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

const Blogs = () => {
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const { ref: buttonRef, inView: buttonInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: easeOut,
        delay: 0.2,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  return (
    <div className="py-20 px-5 md:px-6 flex flex-col">
      <motion.div
        ref={headerRef}
        className="flex flex-col items-center md:items-start gap-2"
        initial="hidden"
        animate={headerInView ? "visible" : "hidden"}
      >
        <motion.div
          className="flex items-center gap-3 text-[15px]"
          variants={badgeVariants}
        >
          <div className="h-3 w-3 rounded-full border-2 border-[#941A1A]"></div>
          <h1 className={`${roboto.className}`}>News</h1>
        </motion.div>
        <motion.h1
          className={`${playfair.className} text-[34px] md:text-[45px] max-w-156.25 text-center md:text-left`}
          variants={titleVariants}
        >
          Our Blog
        </motion.h1>
      </motion.div>

      {/* Blogs */}
      <BlogsSection />

      <motion.div
        ref={buttonRef}
        initial="hidden"
        animate={buttonInView ? "visible" : "hidden"}
        variants={buttonVariants}
      >
        <Link
          href={"/blog"}
          className={`${roboto.className} py-2 px-7 bg-black text-white rounded-[5px] mx-auto mt-10 text-[15px] hover:bg-white hover:border hover:text-black transition-all duration-500 ease-in-out font-medium block w-fit`}
        >
          Load Articles
        </Link>
      </motion.div>
    </div>
  );
};

export default Blogs;
