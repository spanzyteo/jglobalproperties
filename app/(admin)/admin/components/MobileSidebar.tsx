/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { motion, AnimatePresence } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import { closeSidebar } from "../store/mobileSidebarSlice";
import Link from "next/link";
import { MdSpaceDashboard } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import LandDropdown from "./land/LandDropdown";
import BlogDropdown from "./blogs/BlogDropdown";
import CategoriesDropdown from "./categories/CategoriesDropdown";
import HouseDropdown from "./houses/HouseDropdown";
import ReviewDropdown from "./reviews/ReviewDropdown";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

const MobileSidebar = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const sidebar = useAppSelector((state) => state.mobileSidebar.mobileSidebar);

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

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
    <AnimatePresence>
      {sidebar && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-white w-[300px] xl:hidden flex-col flex fixed top-2 bottom-2 left-3 rounded-xl shadow-lg z-10"
        >
          <div className="fixed h-[120px] w-[300px] flex items-center justify-between px-8">
            <h1 className="text-2xl font-semibold">JGlobalProperties</h1>
            <FaXmark
              onClick={handleCloseSidebar}
              className="h-[30px] w-[30px] cursor-pointer"
            />
          </div>
          <div className="flex flex-col items-start ml-8 mt-[130px] gap-4">
            <div className="flex items-center justify-between w-[230px]">
              <Link
                onClick={() => handleCloseSidebar()}
                href={"/admin"}
                className="flex flex-row items-center justify-between gap-8"
              >
                <MdSpaceDashboard className="h-[20px] w-[20px]" />
                <h1>Dashboard</h1>
              </Link>
            </div>
            <LandDropdown />
            <BlogDropdown />
            <CategoriesDropdown />
            <HouseDropdown />
            <ReviewDropdown />
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;
