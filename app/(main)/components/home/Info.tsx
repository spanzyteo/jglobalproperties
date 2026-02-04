"use client";

import React, { useEffect, useState } from "react";
import { info } from "../../utils/info";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { Roboto } from "next/font/google";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { easeOut, motion } from "framer-motion";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.7, // delay between each card (desktop only)
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: easeOut,
    },
  },
};

const Info = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect screen size
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* DESKTOP VIEW - Group Animation */}
      {!isMobile ? (
        <motion.div
          className="px-5 md:px-6 grid md:grid-cols-3 grid-cols-1 gap-6 pb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {info.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              className="flex flex-col items-center md:items-start gap-6"
            >
              <motion.div
                className="h-65 md:h-120 w-full overflow-hidden rounded-tr-[50px] rounded-tl-[5px] rounded-br-[5px] rounded-bl-[50px]"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  height={480}
                  width={413}
                  className="h-full w-full object-cover bg-no-repeat bg-center"
                />
              </motion.div>

              <motion.h2
                className={`${playfair.className} text-[28px] md:text-[30px] font-medium leading-9 text-center md:text-left`}
              >
                {item.name}
              </motion.h2>

              <motion.p
                className={`${roboto.className} text-[17px] md:text-[18px] leading-6 md:leading-6.75 text-center md:text-left text-gray-700`}
              >
                {item.description}
              </motion.p>

              <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.3 }}>
                <Link
                  href={item.link}
                  className="flex items-center gap-2 hover:text-[#941A1A] transition-colors duration-500 ease-in-out"
                >
                  <p className={`${roboto.className}`}>Read More</p>
                  <GoArrowRight />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        // MOBILE VIEW - Individual Animation on Scroll
        <div className="px-5 grid grid-cols-1 gap-8 pb-10">
          {info.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOut }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col items-center gap-6"
            >
              <motion.div
                className="h-65 w-full overflow-hidden rounded-tr-[50px] rounded-tl-[5px] rounded-br-[5px] rounded-bl-[50px]"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  height={480}
                  width={413}
                  className="h-full w-full object-cover bg-no-repeat bg-center"
                />
              </motion.div>

              <h2
                className={`${playfair.className} text-[28px] font-medium leading-9 text-center`}
              >
                {item.name}
              </h2>

              <p
                className={`${roboto.className} text-[17px] leading-6 text-center text-gray-700`}
              >
                {item.description}
              </p>

              <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.3 }}>
                <Link
                  href={item.link}
                  className="flex items-center gap-2 hover:text-[#941A1A] transition-colors duration-500 ease-in-out"
                >
                  <p className={`${roboto.className}`}>Read More</p>
                  <GoArrowRight />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

export default Info;
