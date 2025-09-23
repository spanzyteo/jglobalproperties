import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeSidebar } from "../../store/mobileSidebarSlice";
import { toggleBlogs } from "../../store/sidebarSlice";
import { HiOutlineDocumentText } from "react-icons/hi";import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";


const BlogDropdown = () => {
  const sections = useAppSelector((state) => state.sidebar);
  const dispatch = useAppDispatch();

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  const handleBlogsClick = () => {
    dispatch(toggleBlogs());
  };
  return (
    <>
      <div
        onClick={() => handleBlogsClick()}
        className="flex items-center justify-between w-[230px] cursor-pointer"
      >
        <div className="flex flex-row items-center justify-between gap-8">
          <HiOutlineDocumentText className="h-[20px] w-[20px]" />
          <h1>Blogs</h1>
        </div>
        <div className="">
          <motion.div
            animate={{ rotate: sections.blogs ? 180 : 0 }}
            initial={{ rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <IoIosArrowDown className="cursor-pointer" />
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {sections.blogs && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden flex flex-col gap-4 mt- ml-14"
          >
            <Link href={"/admin/blogs"} onClick={() => handleCloseSidebar()}>
              Blogs
            </Link>
            <Link
              href={"/admin/add-new-blogs"}
              onClick={() => handleCloseSidebar()}
            >
              Add New Blogs
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BlogDropdown;
