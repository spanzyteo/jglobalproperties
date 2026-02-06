/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion, easeOut } from "framer-motion";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { RiArrowRightSLine } from "react-icons/ri";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { useEventsByPastStatus } from "../../features/events";
import EventSkeleton from "../skeletons/EventSkeleton";
import EmptyState from "./EmptyState";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const PastEvent = ({ item, index }: any) => {
  const { ref, inView } = useInView({
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

  // Get the first image or use a fallback
  const imageUrl =
    item.image && item.image.length > 0
      ? item.image[0].url
      : "/houses/house1.webp";

  // Format the date
  const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
            src={imageUrl}
            alt={item.title}
            className="object-cover w-full h-full"
            width={500}
            height={500}
          />
        </motion.div>
      </div>

      {/* Text Content */}
      <div
        className={`${roboto.className} py-3 px-4 flex flex-col gap-2 max-h-[280px]`}
      >
        <h3 className="text-[18px] font-medium leading-[23px]">{item.title}</h3>
        <h4 className="text-[13px] text-gray-500">{formattedDate}</h4>
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

const PastEventSection = () => {
  const { events, loading, error } = useEventsByPastStatus(true, 8);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <EventSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error || events.length === 0) {
    return (
      <EmptyState
        title="No Past Events"
        description="Join us for upcoming events! Check our upcoming events section above."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 h-full">
      {events.map((item, index) => (
        <Link href={`/pages/events/${item.slug}`} key={item.id}>
          <PastEvent item={item} index={index} />
        </Link>
      ))}
    </div>
  );
};

export default PastEventSection;
