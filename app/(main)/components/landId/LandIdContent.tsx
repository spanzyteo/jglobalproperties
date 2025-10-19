"use client";

import { Playfair_Display, Roboto } from "next/font/google";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import lands from "../../utils/lands";
import { setCurrentLand } from "../../store/landSlice";
import { useEffect } from "react";
import { IoLocation } from "react-icons/io5";
import SimilarLands from "./SimilarLands";

interface LandHeroProps {
  currentLandId: string | string[];
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const LandIdContent = ({ currentLandId }: LandHeroProps) => {
  const dispatch = useAppDispatch();
  const land = useAppSelector((state) => state.land.currentLand);

  useEffect(() => {
    const filteredLand = lands.find(
      (item) => item.id.toString() === currentLandId.toString()
    );
    if (filteredLand) {
      dispatch(setCurrentLand(filteredLand));
    }
  }, [currentLandId, dispatch]);

  return (
    <div className="flex flex-col gap-6 w-full lg:max-w-[873px] mt-28 md:mt-0">
      <div
        className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-2 py-12 px-6 shadow-sm`}
      >
        <div className="bg-[#303438] rounded-[5px] w-[90px] flex justify-center py-1">
          <h3 className="text-white text-[14px] leading-[22px]">
            {land?.status}
          </h3>
        </div>
        <h1
          className={`${playfair.className} text-[34px] font-medium leading-[44px] `}
        >
          {land?.title}
        </h1>
        <div className="flex gap-2 items-center">
          <IoLocation />
          <h3 className="text-[14px] leading-[23px]">
            {land?.location}, {land?.state}, {land?.country}
          </h3>
        </div>
        <h2 className="text-[14px] leading-[23px] font-medium mt-4">
          Overview
        </h2>
        <p className="text-[14px] leading-[23px]">{land?.overview}</p>
      </div>

      {/* Form for reply */}
      <div
        className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-5 py-12 px-6 shadow-sm`}
      >
        <h2 className="text-[18px] font-medium leading-[23px]">
          Leave a Reply
        </h2>
        <form className="flex flex-col gap-3 w-full text-[14px]">
          <div className="flex flex-col md:flex-row md:justify-between gap-3 w-full">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
            />
            <input
              type="text"
              placeholder="Your Phone"
              className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
            />
          </div>
          <textarea
            className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
            rows={7}
          ></textarea>
          <button className="bg-black rounded-[5px] text-white w-full md:w-[139px] py-3 font-medium hover:bg-white hover:border hover:text-black transition-all duration-500 ease-in-out cursor-pointer">
            Post Comment
          </button>
        </form>
      </div>

      {/* Similar lands */}
      <SimilarLands />
    </div>
  );
};

export default LandIdContent;
