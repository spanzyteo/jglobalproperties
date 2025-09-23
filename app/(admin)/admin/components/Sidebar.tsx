/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

const Sidebar = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "/api/auth/logout",
        {},
        { withCredentials: true }
      );

      const data = await response.data;

      if (response.status === 200) {
        toast.success(data.message || "Logged out successfully");

        router.push("/");
        router.refresh();
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during logout");
    } finally {
      setLoading(false);
    }
  };

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

          {/* Logout button with loading effect */}
          <button
            className={`flex items-center gap-8 cursor-pointer w-[230px] transition-all duration-200 ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-red-50 hover:text-red-600 rounded-lg p-2 -ml-2"
            }`}
            onClick={handleLogout}
            disabled={loading}
          >
            <div className="flex items-center gap-3">
              {loading ? (
                <div className="flex items-center gap-2">
                  <TailSpin
                    height="18"
                    width="18"
                    color="#ef4444"
                    ariaLabel="logging-out"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                  <span className="text-red-500 font-medium">
                    Logging out...
                  </span>
                </div>
              ) : (
                <>
                  <LuLogOut className="h-[20px] w-[20px]" />
                  <h1>Logout</h1>
                </>
              )}
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
