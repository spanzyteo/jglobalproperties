import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "../../store/hooks";
import { useAppDispatch } from "@/app/(main)/store/hooks";
import { toggleCategories } from "../../store/sidebarSlice";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { BiCategory } from "react-icons/bi";

const CategoriesSidebarSection = () => {
  const sections = useAppSelector((state) => state.sidebar);
  const dispatch = useAppDispatch();

  const handleCategoryClick = () => {
    dispatch(toggleCategories());
  };
  return (
    <>
      <div
        onClick={() => handleCategoryClick()}
        className="flex items-center justify-between w-[230px] cursor-pointer"
      >
        <div className="flex flex-row items-center justify-between gap-8">
          <BiCategory className="h-[20px] w-[20px]" />
          <h1>Category</h1>
        </div>
        <div className="">
          <motion.div
            animate={{ rotate: sections.categories ? 180 : 0 }}
            initial={{ rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <IoIosArrowDown className="cursor-pointer" />
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {sections.categories && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden flex flex-col gap-4 mt-2 ml-14"
          >
            <Link href={"/admin/categories"}>Categories</Link>
            <Link href={"/admin/add-new-categories"}>Add New Categories</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CategoriesSidebarSection;
