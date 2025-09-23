import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleTags } from "../../store/sidebarSlice";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { FaTags } from "react-icons/fa";

const TagSidebarSection = () => {
  const sections = useAppSelector((state) => state.sidebar);
  const dispatch = useAppDispatch();

  const handleTagsClick = () => {
    dispatch(toggleTags());
  };
  return (
    <>
      <div
        onClick={() => handleTagsClick()}
        className="flex items-center justify-between w-[230px] cursor-pointer"
      >
        <div className="flex flex-row items-center justify-between gap-8">
          <FaTags className="h-[20px] w-[20px]" />
          <h1>Tags</h1>
        </div>
        <div className="">
          <motion.div
            animate={{ rotate: sections.tags ? 180 : 0 }}
            initial={{ rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <IoIosArrowDown className="cursor-pointer" />
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {sections.tags && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden flex flex-col gap-4 mt-2 ml-14"
          >
            <Link href={"/admin/tags"}>Tags</Link>
            <Link href={"/admin/add-new-tags"}>Add New Tags</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TagSidebarSection;
