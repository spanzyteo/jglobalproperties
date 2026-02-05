import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeSidebar } from '../../store/mobileSidebarSlice';
import { toggleEvents } from '../../store/sidebarSlice';
import { AnimatePresence, motion } from "framer-motion";
import { FaHome } from 'react-icons/fa';
import Link from 'next/link';
import { IoIosArrowDown } from 'react-icons/io';


const EventDropdown = () => {
  const sections = useAppSelector((state) => state.sidebar);
  const dispatch = useAppDispatch();

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

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
          <FaHome className="h-5 w-5" />
          <h1>Events</h1>
        </div>
        <div className="">
          <motion.div
            animate={{ rotate: sections.events ? 180 : 0 }}
            initial={{ rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <IoIosArrowDown className="cursor-pointer" />
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {sections.events && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden flex flex-col gap-4 mt- ml-14"
          >
            <Link href={"/admin/events"} onClick={() => handleCloseSidebar()}>
              Events
            </Link>
            <Link
              href={"/admin/add-new-events"}
              onClick={() => handleCloseSidebar()}
            >
              Add New Events
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EventDropdown