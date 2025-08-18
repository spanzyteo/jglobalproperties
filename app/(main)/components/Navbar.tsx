'use client'
import Image from "next/image";
import Link from "next/link";
import { IoMdMenu } from "react-icons/io";
// import { Poppins } from "next/font/google";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
// });

const Navbar = () => {
  return (
    <div className="flex h-[7.5rem] p-4 lg:py-[1.25rem] lg:px-[5rem] justify-center flex-col gap-[0.625rem] lg:bg-[#FFF] mt-[3.25rem] lg:mt-0 fixed w-full top-0 z-50">
      <div className="flex justify-between items-center">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={90}
          height={70}
          className="w-[5.62rem] h-[4.374rem] object-cover hidden lg:block"
        />
        <Image
          src={"/logo1.svg"}
          alt="logo"
          width={90}
          height={70}
          className="w-[5.62rem] h-[4.374rem] object-cover block lg:hidden"
        />
        <IoMdMenu className="text-[#FFF] w-[3rem] h-[3rem] lg:hidden" />
        <div className="lg:flex hidden p-2 items-center gap-2 justify-between">
          <Link
            href={"/"}
            className={`text-[1rem] font-medium leading-[1.25rem] py-4 px-2 w-[7.8rem] h-[3rem] flex items-center justify-center`}
          >
            Home
          </Link>
          <Link
            href={"/properties"}
            className={`text-[1rem] font-medium leading-[1.25rem] py-4 px-2 w-[7.8rem] h-[3rem] flex items-center justify-center`}
          >
            Properties
          </Link>
          <Link
            href={"/about-us"}
            className={`text-[1rem] font-medium leading-[1.25rem] py-4 px-2 w-[7.8rem] h-[3rem] flex items-center justify-center`}
          >
            About us
          </Link>
          <Link
            href={"/blog"}
            className={`text-[1rem] font-medium leading-[1.25rem] py-4 px-2 w-[7.8rem] h-[3rem] flex items-center justify-center`}
          >
            Blog
          </Link>
          <Link
            href={"/contact-us"}
            className={`text-[1rem] font-medium leading-[1.25rem] py-4 px-2 w-[7.8rem] h-[3rem] flex items-center justify-center`}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
