import React from "react";
import { toggleEvents } from "../../store/sidebarSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { MdEvent } from "react-icons/md";

const EventSidebarSection = () => {
  const sections = useAppSelector((state) => state.sidebar);
  const dispatch = useAppDispatch();

  const handleEventClick = () => {
    dispatch(toggleEvents());
  };
  return (
    <>
      <div
        onClick={() => handleEventClick()}
        className="flex items-center justify-between w-57.5 cursor-pointer"
      >
        <div className="flex flex-row items-center justify-between gap-8">
          <MdEvent className="h-5 w-5" />
          <h1>Events</h1>
        </div>
        <div className="">
          <motion.div
            animate={{ rotate: sections?.events ? 180 : 0 }}
            initial={{ rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <IoIosArrowDown className="cursor-pointer" />
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {sections?.events && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden flex flex-col gap-4 mt-2 ml-14"
          >
            <Link href={"/admin/events"}>Events</Link>
            <Link href={"/admin/add-new-events"}>Add New Event</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EventSidebarSection;
