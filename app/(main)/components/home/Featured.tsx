/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Playfair_Display, Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { easeOut, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useFeaturedHouses } from "../../features/houses";
import HouseSkeleton from "../skeletons/HouseSkeleton";
import { getOptimizedImageProps } from "@/app/utils/imageOptimization";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Featured = () => {
  const { ref: headerRef, inView: headerInView } = useInView({
    // triggerOnce: true,
    threshold: 0.2,
  });

  const { houses, loading } = useFeaturedHouses(8);

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

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
          <h1>EXCLUSIVE</h1>
        </motion.div>
        <motion.h1
          className={`${playfair.className} text-[34px] md:text-[45px] max-w-156.25 text-center md:text-left`}
          variants={headerVariants}
        >
          Featured Properties
        </motion.h1>
      </motion.div>

      {loading ? (
        <HouseSkeleton count={8} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
          {houses.map((item, index) => {
            const firstImage = item.images?.[0];
            return (
              <PropertyCard
                key={item.id}
                item={item}
                firstImage={firstImage}
                index={index}
                roboto={roboto}
              />
            );
          })}
        </div>
      )}

      <LoadMoreButton roboto={roboto} />
    </div>
  );
};

// Separate component for each card with its own scroll trigger
const PropertyCard = ({ item, firstImage, roboto }: any) => {
  const { ref, inView } = useInView({
    // triggerOnce: true,
    threshold: 0.2,
  });

  const cardVariants = {
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
        duration: 0.5,
        ease: easeOut,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap- rounded-[5px] shadow-lg group overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
    >
      {firstImage && (
        <div className="relative h-55 overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full"
          >
            <Image
              {...getOptimizedImageProps(firstImage.url, item.title, {
                width: 400,
                height: 300,
                quality: 75,
                sizes:
                  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px",
              })}
              className="rounded-t-[5px] object-cover h-full w-full"
            />
          </motion.div>
          <motion.div
            className={`${roboto.className} absolute top-4 left-4 text-white bg-[#941A1A] py-[0.1rem] px-2 text-[12px] rounded-sm`}
            initial={{ x: -100, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Featured
          </motion.div>
        </div>
      )}
      <div className="py-3 pl-4 flex flex-col gap-2 h-35">
        <Link
          href={`/houses/${item.slug}`}
          className="text-[18px] font-medium leading-5.75 hover:text-[#941A1A] hover:underline transition-colors duration-300"
        >
          {item.title}
        </Link>
        <h4 className={`${roboto.className} text-[14px] leading-5.75`}>
          {item.category}
        </h4>
      </div>
      <div className="flex items-center justify-between px-4 border-t border-t-gray-200">
        <h2 className="text-[18px] font-medium leading-[18.2px]">
          {item.price}
        </h2>
        <div className="p-2 border-l border-l-gray-200">
          <Image
            src={"/logo.png"}
            alt="ceo"
            height={350}
            width={350}
            className="rounded-[5px] h-15 w-15 object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};

// Separate component for Load More button with its own scroll trigger
const LoadMoreButton = ({ roboto }: any) => {
  const { ref, inView } = useInView({
    // triggerOnce: true,
    threshold: 0.5,
  });

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
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={buttonVariants}
    >
      <Link
        href={"/houses"}
        className={`${roboto.className} py-2 px-4 bg-black text-white rounded-[5px] mx-auto mt-10 text-[15px] hover:opacity-85 transition-all duration-500 ease-in-out font-medium block w-fit`}
      >
        Load More Listings
      </Link>
    </motion.div>
  );
};

export default Featured;
