"use client";
import Image from "next/image";
import Link from "next/link";
import { IoMdMenu } from "react-icons/io";
import { useAppDispatch } from "../store/hooks";
import { openSidebar } from "../store/mobileSidebarSlice";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

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
      setIsScrolled(scrollTop > 50); // Trigger effect after 50px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`flex h-[4.1875rem] lg:h-[6rem] px-4 py-4 lg:py-[1.25rem] lg:px-[5rem] justify-center flex-col gap-[0.625rem] fixed z-50 shadow-lg transition-all duration-300 ease-in-out
        ${
          isScrolled
            ? "top-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl lg:top-6 lg:left-6 lg:right-6 lg:w-auto lg:mx-6"
            : "top-0 w-full bg-[#FFF]"
        }
      `}
    >
      <div className="flex justify-between items-center">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={90}
          height={70}
          className="w-[5.62rem] h-[4.374rem] object-cover"
        />
        <IoMdMenu
          onClick={handleOpenSidebar}
          className="w-[3rem] h-[3rem] lg:hidden"
        />
        <div className="lg:flex hidden p-2 items-center gap-2 justify-between">
          <Link
            href={"/"}
            className={`text-[1rem] font-medium leading-[1.25rem] py-4 w-[6.8rem] h-[3rem] flex flex-col items-center justify-center hover:text-gray-600 transition-all duration-500 ease-in-out relative`}
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
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Link
              href={"/properties"}
              className={`text-[1rem] font-medium leading-[1.25rem] py-4 px-2 w-[7.8rem] h-[3rem] flex items-center justify-center hover:text-gray-600 transition-all duration-500 ease-in-out relative`}
            >
              <h1>Properties</h1>
              <div
                className={`${
                  pathname === "/properties"
                    ? "opacity-100 w-[2.4375rem] bg-[#941A1A] h-[3px] absolute bottom-[0.4375rem] rounded-4xl"
                    : "opacity-0"
                }`}
              ></div>
            </Link>
            {isDropdownOpen && (
              <div className="absolute top-[3rem] left-0 bg-white shadow-lg border border-gray-200 rounded-md w-[8.8rem] z-[60]">
                <Link
                  href="/properties/land"
                  className="block px-4 py-3 text-[0.875rem] font-medium text-gray-700 hover:bg-gray-50 hover:text-[#941A1A] transition-colors duration-200"
                >
                  Land
                </Link>
                <Link
                  href="/properties/houses"
                  className="block px-4 py-3 text-[0.875rem] font-medium text-gray-700 hover:bg-gray-50 hover:text-[#941A1A] transition-colors duration-200"
                >
                  Houses
                </Link>
                <Link
                  href="/properties/apartments"
                  className="block px-4 py-3 text-[0.875rem] font-medium text-gray-700 hover:bg-gray-50 hover:text-[#941A1A] transition-colors duration-200"
                >
                  Apartments
                </Link>
              </div>
            )}
          </div>
          <Link
            href={"/about"}
            className={`text-[1rem] font-medium leading-[1.25rem] py-4 px-2 w-[7.8rem] h-[3rem] flex items-center justify-center hover:text-gray-600 transition-all duration-500 ease-in-out relative`}
          >
            About us
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
            className={`text-[1rem] font-medium leading-[1.25rem] py-4 px-2 w-[7.8rem] h-[3rem] flex items-center justify-center hover:text-gray-600 transition-all duration-500`}
          >
            <h1>Blog</h1>
            <div
              className={`${
                pathname === "/blog"
                  ? "opacity-100 w-[2.4375rem] bg-[#941A1A] h-[3px] absolute bottom-[0.4375rem] rounded-4xl"
                  : "opacity-0"
              }`}
            ></div>
          </Link>
          <Link
            href={"/contact"}
            className={`text-[1rem] font-medium leading-[1.25rem] py-4 w-[6.8rem] h-[3rem] flex flex-col items-center justify-center hover:text-gray-600 transition-all duration-500 ease-in-out relative`}
          >
            <h1>Contact Us</h1>
            <div
              className={`${
                pathname === "/contact"
                  ? "opacity-100 w-[2.4375rem] bg-[#941A1A] h-[3px] absolute bottom-[0.4375rem] rounded-4xl"
                  : "opacity-0"
              }`}
            ></div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
