import React from "react";
import { toggleHouses } from "../../store/sidebarSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

const HouseSidebarSection = () => {
  const sections = useAppSelector((state) => state.sidebar);
  const dispatch = useAppDispatch();

  const handleHouseClick = () => {
    dispatch(toggleHouses());
  };
  return (
    <>
      <div
        onClick={() => handleHouseClick()}
        className="flex items-center justify-between w-[230px] cursor-pointer"
      >
        <div className="flex flex-row items-center justify-between gap-8">
          <FaHome className="h-[20px] w-[20px]" />
          <h1>Houses</h1>
        </div>
        <div className="">
          <motion.div
            animate={{ rotate: sections.houses ? 180 : 0 }}
            initial={{ rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <IoIosArrowDown className="cursor-pointer" />
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {sections.houses && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden flex flex-col gap-4 mt-2 ml-14"
          >
            <Link href={"/admin/houses"}>Houses</Link>
            <Link href={"/admin/add-new-houses"}>Add New Houses</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HouseSidebarSection;
