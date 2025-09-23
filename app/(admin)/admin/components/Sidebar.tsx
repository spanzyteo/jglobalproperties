"use client";

import Link from "next/link";
import { LuLogOut } from "react-icons/lu";
import { MdSpaceDashboard } from "react-icons/md";
import LandSidebarSection from "./land/LandSidebarSection";
import BlogSidebarSection from "./blogs/BlogSidebarSection";
import CategoriesSidebarSection from "./categories/CategoriesSidebarSection";
import HouseSidebarSection from "./houses/HouseSidebarSection";
import ReviewSidebarSection from "./reviews/ReviewSidebarSection";
import TagSidebarSection from "./tags/TagSidebarSection";

const Sidebar = () => {
  return (
    <>
      <div className="bg-white fixed w-[300px] xl:flex flex-col hidden top-2 bottom-0 left-3 rounded-xl shadow-2xl z-50 overflow-y-auto">
        <div className=" h-[120px] w-[300px] flex items-center justify-center">
          <h1 className="text-2xl font-semibold ">JGlobalProperties</h1>
        </div>
        <div className="flex flex-col items-start ml-8 gap-4">
          <div className="flex items-center justify-between w-[230px]">
            <Link
              href={"/admin"}
              className="flex flex-row items-center justify-between gap-8"
            >
              <MdSpaceDashboard className="h-[20px] w-[20px]" />
              <h1>Dashboard</h1>
            </Link>
          </div>
          <LandSidebarSection />
          <BlogSidebarSection />
          <CategoriesSidebarSection />
          <HouseSidebarSection />
          <ReviewSidebarSection />
          <TagSidebarSection />
          <button className="flex items-center gap-8 cursor-pointer w-[230px]">
            <LuLogOut className="h-[20px] w-[20px]" />
            <h1>Logout</h1>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
