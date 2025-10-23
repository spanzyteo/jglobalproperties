"use client";
import { Playfair_Display, Roboto } from "next/font/google";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useMemo } from "react";
import events from "../../utils/events";
import { setCurrentEvent } from "../../store/eventSlice";
import { FaCalendarAlt, FaTag } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { RiArrowRightSLine } from "react-icons/ri";

interface EventContentProps {
  currentEventId: string | string[];
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const EventIdContent = ({ currentEventId }: EventContentProps) => {
  const dispatch = useAppDispatch();
  const event = useAppSelector((state) => state.events.currentEvent);

  useEffect(() => {
    const filteredEvent = events.find(
      (item) => item.id.toString() === currentEventId.toString()
    );
    if (filteredEvent) {
      dispatch(setCurrentEvent(filteredEvent));
    }
  }, [currentEventId, dispatch]);

  const previousEvents = useMemo(() => {
    if (!event) return [];
    return events.filter((item) => item.isPast && item.id !== event.id);
  }, [event]);

  const truncateText = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  return (
    <div className="flex flex-col gap-6 w-full lg:max-w-[873px]">
      <div
        className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-10 py-12 px-6 shadow-sm`}
      >
        <h1
          className={`${playfair.className} text-[34px] font-medium leading-[44px]`}
        >
          {event?.title}
        </h1>
        <div className="flex flex-col md:flex-row gap-1 md:gap-4 items-start md:items-center">
          <div className="flex items-center gap-2">
            <FaCalendarAlt />
            <h3 className="text-[13px] leading-[23px] mt-1">
              Posted on {event?.date}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <FaTag />
            <h3 className="text-[13px] leading-[23px] mt-1">
              by {event?.organizer}
            </h3>
          </div>
        </div>
        <Image
          src={event?.image || "/house-bg.webp"}
          alt={event?.title || "Blog image"}
          width={819}
          height={819}
          className="w-[819px] rounded-[5px] object-cover h-[250px] md:h-[500px]"
        />
        <p className="text-[14px] leading-[23px]">{event?.description}</p>
      </div>

      {/* Form for comment */}
      <div
        className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-5 py-12 px-6 shadow-sm`}
      >
        <h2 className="text-[18px] font-medium leading-[23px]">
          Say something about the event
        </h2>
        <form className="flex flex-col gap-3 w-full text-[14px]">
          <div className="flex flex-col md:flex-row md:justify-between gap-3 w-full">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
            />
            <input
              type="text"
              placeholder="Your Phone"
              className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
            />
          </div>
          <textarea
            className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
            rows={7}
          ></textarea>
          <button className="bg-black rounded-[5px] text-white w-full md:w-[139px] py-3 font-medium hover:bg-white hover:border hover:text-black transition-all duration-500 ease-in-out cursor-pointer">
            Post Comment
          </button>
        </form>
      </div>

      {/* Previous events */}
      {previousEvents.length > 0 && (
        <div className={`${roboto.className} flex flex-col gap-4`}>
          <h1 className="text-[24px] font-medium leading-[31px]">
            Previous Events
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {previousEvents.slice(0, 2).map((item) => {
              return (
                <Link
                  href={`/pages/events/${item.id}`}
                  key={item.id}
                  className="flex flex-col gap- rounded-[5px] shadow-lg"
                >
                  <div className="relative overflow-hidden rounded-t-[5px]">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={item.image}
                        alt="img"
                        className="rounded-t-[5px] object-cover h-[250px] w-full"
                        height={500}
                        width={500}
                      />
                    </motion.div>
                  </div>

                  <div
                    className={`${roboto.className} py-3 px-4 flex flex-col gap-2 max-h-[280px]`}
                  >
                    <h3 className={`text-[18px] font-medium leading-[23px]`}>
                      {item.title}
                    </h3>
                    <h4 className={`text-[14px] leading-[23px]`}>
                      {item.date}
                    </h4>
                    <h4 className={`text-[14px] space-x-2`}>
                      {truncateText(item.description, 15)}
                    </h4>
                    <div
                      className={`flex gap-1 text-[15px] hover:text-[#941A1A] transition-all duration-500 ease-in-out font-medium items-center`}
                    >
                      <p>Continue reading</p>
                      <RiArrowRightSLine className="h-[20px] w-[20px]" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventIdContent;
