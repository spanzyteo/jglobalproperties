import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeSidebar } from "../../store/mobileSidebarSlice";
import { toggleLands } from "../../store/sidebarSlice";
import { FaMapMarkedAlt } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";

const LandDropdown = () => {
  const sections = useAppSelector((state) => state.sidebar);
  const dispatch = useAppDispatch();

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  const handleLandClick = () => {
    dispatch(toggleLands());
  };
  return (
    <>
      <div
        onClick={() => handleLandClick()}
        className="flex items-center justify-between w-[230px] cursor-pointer"
      >
        <div className="flex flex-row items-center justify-between gap-8">
          <FaMapMarkedAlt className="h-[20px] w-[20px]" />
          <h1>Lands</h1>
        </div>
        <div className="">
          <motion.div
            animate={{ rotate: sections.lands ? 180 : 0 }}
            initial={{ rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <IoIosArrowDown className="cursor-pointer" />
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {sections.lands && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden flex flex-col gap-4 mt- ml-14"
          >
            <Link href={"/admin/lands"} onClick={() => handleCloseSidebar()}>
              Lands
            </Link>
            <Link
              href={"/admin/add-new-lands"}
              onClick={() => handleCloseSidebar()}
            >
              Add New Lands
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LandDropdown;
