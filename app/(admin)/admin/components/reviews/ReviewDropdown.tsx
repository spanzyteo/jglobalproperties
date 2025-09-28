import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeSidebar } from '../../store/mobileSidebarSlice';
import { toggleReviews } from '../../store/sidebarSlice';
import { AnimatePresence, motion } from "framer-motion";
import { MdOutlineRateReview } from 'react-icons/md';
import Link from 'next/link';
import { IoIosArrowDown } from 'react-icons/io';


const ReviewDropdown = () => {
   const sections = useAppSelector((state) => state.sidebar);
    const dispatch = useAppDispatch();
  
    const handleCloseSidebar = () => {
      dispatch(closeSidebar());
    };
  
    const handleReviewClick = () => {
      dispatch(toggleReviews());
    };
  return (
    <>
      <div
        onClick={() => handleReviewClick()}
        className="flex items-center justify-between w-[230px] cursor-pointer"
      >
        <div className="flex flex-row items-center justify-between gap-8">
          <MdOutlineRateReview className="h-[20px] w-[20px]" />
          <h1>Reviews</h1>
        </div>
        <div className="">
          <motion.div
            animate={{ rotate: sections.reviews ? 180 : 0 }}
            initial={{ rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <IoIosArrowDown className="cursor-pointer" />
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {sections.reviews && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden flex flex-col gap-4 mt- ml-14"
          >
            <Link href={"/admin/reviews"} onClick={() => handleCloseSidebar()}>
              Reviews
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ReviewDropdown