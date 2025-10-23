/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, easeOut } from "framer-motion";
import { Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";
import { useInView } from "react-intersection-observer";
import events from "../../utils/events";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const UpcomingEvents = ({ item, index }: any) => {
  const { ref, inView } = useInView({
    // triggerOnce: true,
    threshold: 0.2,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: easeOut, delay: index * 0.1 },
    },
  };

  // const categoryVariants = {
  //   initial: { x: -100, opacity: 0 },
  //   animate: {
  //     x: 0,
  //     opacity: 1,
  //     transition: { delay: 0.3, duration: 0.5 },
  //   },
  // };


  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3 } }}
      className="flex flex-col rounded-[5px] shadow-lg overflow-hidden bg-white cursor-pointer h-full relative pb-7"
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-[5px] h-[200px]">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full"
        >
          <Image
            src={item.image}
            alt={item.title}
            className="object-cover w-full h-full"
            width={500}
            height={500}
          />
        </motion.div>
        {/* <motion.div
          className={`${roboto.className} absolute top-4 left-4 text-white bg-[#941A1A] py-1 px-3 text-[12px] rounded-[4px]`}
          variants={categoryVariants}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          {item.category}
        </motion.div> */}
      </div>

      {/* Text Content */}
      <div
        className={`${roboto.className} py-3 px-4 flex flex-col gap-2 max-h-[280px] `}
      >
        <h3 className="text-[18px] font-medium leading-[23px]">{item.title}</h3>
        <h4 className="text-[13px] text-gray-500">{item.date}</h4>
        <p className="text-[14px] text-gray-700 leading-[22px]">
          {truncateText(item.description, 15)}
        </p>

        <div className="flex gap-1 text-[15px] hover:text-[#941A1A] transition-all duration-500 ease-in-out font-medium items-center absolute bottom-1">
          <p>Continue reading</p>
          <RiArrowRightSLine className="h-[20px] w-[20px]" />
        </div>
      </div>
    </motion.div>
  );
};

// Helper function to shorten content
const truncateText = (text: string, maxWords: number) => {
  const words = text.split(" ");
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
};

const EventSection = () => {
  const upcomingEvents = events.filter((item) => !item.isPast)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 h-full">
      {upcomingEvents.map((item, index) => (
        <Link href={`/pages/events/${item.id}`} key={item.id}>
          <UpcomingEvents item={item} index={index} />
        </Link>
      ))}
    </div>
  );
}

export default EventSection;
