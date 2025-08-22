"use client";
import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineFlag } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";

const Hero = () => {
  return (
    <div className="lg:h-[44.8125rem] h-[41.562rem] bg-center bg-cover bg-no-repeat bg-[url(/hero.png)] lg:mt-[6rem] flex flex-col">
      <div className="flex flex-col items-center gap-[3.0625rem] lg:gap-30 mt-[13.1rem] lg:mt-[8.19rem]">
        <div className="flex flex-col items-center gap-6 lg:gap-0 lg:w-[47.75rem] w-[90%] relative">
          <Image
            width={917}
            height={264}
            src={"/shadow.png"}
            alt="shadow"
            className="w-[57.3125rem] h-[16.5rem] hidden lg:block"
          />
          <h1 className="lg:leading-[4.5rem] leading-[2.5rem] lg:absolute lg:top-0 text-white text-[2rem] lg:text-[4rem] font-bold text-center">
            Leveraging Real Estate Market Opportunities
          </h1>
          <button className="flex items-center justify-center lg:py-4 py-3 lg:px-8 px-6 rounded-[0.5rem] bg-[#941A1A] text-white cursor-pointer lg:mt-[-4rem]">
            <p
              className={`text-[0.875rem] lg:text-[1rem] font-medium leading-[1.125rem] lg:leading-[1.25rem] `}
            >
              Get Started
            </p>
          </button>
        </div>
        <div className="flex flex-wrap justify-center items-center w-[90%] lg:w-[55rem] max-w-full h-auto px-4 py-3 gap-2 lg:gap-4 rounded-md lg:rounded-xl bg-[#F8F8F8] search-box">
          {/* Location */}
          <div className="flex flex-1 min-w-[6rem] lg:min-w-[12rem] h-[2.5rem] lg:h-[3rem] p-1 lg:p-2 items-center gap-1 lg:gap-2 bg-white rounded-md">
            <SlLocationPin className="w-3 lg:w-4 h-3 lg:h-4" />
            <p className="text-[0.75rem] lg:text-[1rem] font-normal">
              Location
            </p>
          </div>

          {/* Property Type */}
          <div className="flex flex-1 min-w-[6rem] lg:min-w-[12rem] h-[2.5rem] lg:h-[3rem] p-1 lg:p-2 items-center gap-1 lg:gap-2 bg-white rounded-md">
            <MdOutlineFlag className="w-3 lg:w-4 h-3 lg:h-4" />
            <p className="text-[0.75rem] lg:text-[1rem] font-normal">
              Property Type
            </p>
          </div>

          {/* Search */}
          <div className="flex-1 min-w-[10rem] lg:min-w-[20rem] h-[2.5rem] lg:h-[3rem] relative">
            <input
              placeholder="Search Property"
              className="w-full h-full px-2 lg:px-4 py-1 lg:py-2 rounded-md bg-white focus:outline-none text-[0.75rem] lg:text-[1rem]"
            />
            <IoSearchOutline className="absolute right-2 lg:right-3 top-2 lg:top-3 w-3 lg:w-4 h-3 lg:h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
