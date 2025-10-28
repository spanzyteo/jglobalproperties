"use client";
import Image from "next/image";
import Link from "next/link";
import { IoMdMenu } from "react-icons/io";
import { useAppDispatch } from "../store/hooks";
import { openSidebar } from "../store/mobileSidebarSlice";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleOpenSidebar = () => {
    dispatch(openSidebar());
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if current path is under pages section
  const isPagesActive = pathname.startsWith("/pages");
  const isBlogActive = pathname.startsWith("/blog");

  // Check if on a dynamic ID page (lands/[id] or houses/[id])
  const isOnDetailPage =
    /^\/pages\/lands\/[^/]+$/.test(pathname) ||
    /^\/pages\/houses\/[^/]+$/.test(pathname) ||
    /^\/pages\/events\/[^/]+$/.test(pathname) ||
    /^\/advanced-search/.test(pathname);

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  // Dropdown item animation variants
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -10,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <div
      className={`flex h-[4.1875rem] lg:h-[6rem] px-4 py-4 lg:py-[1.25rem] lg:px-[5rem] justify-center flex-col gap-[0.625rem] fixed z-50 transition-all duration-300 ease-in-out bg-black 
        ${
          isScrolled || isOnDetailPage
            ? "top-0 left-0 right-0 bg-black/85 backdrop-blur-md "
            : "top-0 w-full lg:bg-black/0"
        }
      `}
    >
      <div className="flex justify-between items-center">
        <IoMdMenu
          onClick={handleOpenSidebar}
          className="w-[3rem] h-[3rem] lg:hidden text-white"
        />
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={90}
          height={70}
          className="w-[5.62rem] h-[4.374rem] object-cover"
        />
        <div className="lg:flex hidden p-2 items-center gap-2 justify-between text-white">
          <Link
            href={"/"}
            className={`text-[1.05rem] w-[5rem] font-semibold leading-[1.25rem] py-4 flex flex-col items-center justify-center hover:text-gray-300 transition-all duration-500 ease-in-out relative`}
          >
            <h1>Home</h1>
            <div
              className={`${
                pathname === "/"
                  ? "opacity-100 w-[2.4375rem] bg-[#941A1A] h-[3px] absolute bottom-[0.4375rem] rounded-4xl"
                  : "opacity-0"
              }`}
            ></div>
          </Link>
          <div
            className="relative h-[6rem] flex items-center"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <div
              className={`text-[1.05rem] w-[5rem] font-semibold leading-[1.25rem] py-4 flex flex-col items-center justify-center hover:text-gray-300 transition-all duration-500 ease-in-out relative`}
            >
              <h1>Pages</h1>
              <div
                className={`${
                  isPagesActive
                    ? "opacity-100 w-[2.4375rem] bg-[#941A1A] h-[3px] absolute bottom-[0.4375rem] rounded-4xl"
                    : "opacity-0"
                }`}
              ></div>
            </div>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  className="absolute py-2 top-[6rem] left-0 bg-black rounded-sm w-[14rem] z-[60] shadow-lg overflow-hidden"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{
                    duration: 0.6,
                    ease: [0.04, 0.62, 0.23, 0.98],
                  }}
                >
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                      duration: 0.2,
                      delay: 0.05,
                    }}
                  >
                    <Link
                      href="/pages/lands"
                      className={`block px-4 py-3 text-[0.875rem] font-medium text-white hover:bg-gray-900 transition-all duration-200 relative overflow-hidden group ${
                        pathname.startsWith("/pages/lands")
                          ? "bg-gray-900"
                          : ""
                      }`}
                    >
                      <span className="relative z-10">Lands</span>
                      <motion.div
                        className="absolute inset-0 bg-[#941A1A] opacity-0"
                        whileHover={{
                          opacity: 0.1,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                      />
                    </Link>
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                      duration: 0.2,
                      delay: 0.1,
                    }}
                  >
                    <Link
                      href="/pages/houses"
                      className={`block px-4 py-3 text-[0.875rem] font-medium text-white hover:bg-gray-900 transition-all duration-200 relative overflow-hidden group ${
                        pathname.startsWith("/pages/houses")
                          ? "bg-gray-900"
                          : ""
                      }`}
                    >
                      <span className="relative z-10">Houses</span>
                      <motion.div
                        className="absolute inset-0 bg-[#941A1A] opacity-0"
                        whileHover={{
                          opacity: 0.1,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                      />
                    </Link>
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                      duration: 0.2,
                      delay: 0.1,
                    }}
                  >
                    <Link
                      href="/pages/events"
                      className={`block px-4 py-3 text-[0.875rem] font-medium text-white hover:bg-gray-900 transition-all duration-200 relative overflow-hidden group ${
                        pathname.startsWith("/pages/events")
                          ? "bg-gray-900"
                          : ""
                      }`}
                    >
                      <span className="relative z-10">Events</span>
                      <motion.div
                        className="absolute inset-0 bg-[#941A1A] opacity-0"
                        whileHover={{
                          opacity: 0.1,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                      />
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link
            href={"/about"}
            className={`text-[1.05rem] w-[5rem] font-semibold leading-[1.25rem] py-4 flex flex-col items-center justify-center hover:text-gray-300 transition-all duration-500 ease-in-out relative`}
          >
            About
            <div
              className={`${
                pathname === "/about"
                  ? "opacity-100 w-[2.4375rem] bg-[#941A1A] h-[3px] absolute bottom-[0.4375rem] rounded-4xl"
                  : "opacity-0"
              }`}
            ></div>
          </Link>
          <Link
            href={"/blog"}
            className={`text-[1.05rem] w-[5rem] font-semibold leading-[1.25rem] py-4 flex flex-col items-center justify-center hover:text-gray-300 transition-all duration-500 ease-in-out relative`}
          >
            <h1>Blog</h1>
            <div
              className={`${
                isBlogActive
                  ? "opacity-100 w-[2.4375rem] bg-[#941A1A] h-[3px] absolute bottom-[0.4375rem] rounded-4xl"
                  : "opacity-0"
              }`}
            ></div>
          </Link>
          <Link
            href={"/contact"}
            className={`text-[1.05rem] w-[5rem] font-semibold leading-[1.25rem] py-4 flex flex-col items-center justify-center hover:text-gray-300 transition-all duration-500 ease-in-out relative`}
          >
            <h1>Contact</h1>
            <div
              className={`${
                pathname === "/contact"
                  ? "opacity-100 w-[2.4375rem] bg-[#941A1A] h-[3px] absolute bottom-[0.4375rem] rounded-4xl"
                  : "opacity-0"
              }`}
            ></div>
          </Link>
        </div>
        <div className="lg:flex hidden gap-2 text-white items-center">
          <FaPhoneAlt className="h-[25px] w-[25px]" />
          <h2 className="text-[1.05rem] font-semibold leading-[1.25rem] ">
            +234 816 432 2663
          </h2>
        </div>
        <div className="block lg:hidden"></div>
      </div>
    </div>
  );
};

export default Navbar;
