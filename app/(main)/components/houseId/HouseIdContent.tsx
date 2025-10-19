"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import houses from "../../utils/houses";
import { setCurrentHouse } from "../../store/houseSlice";
import { Playfair_Display, Roboto } from "next/font/google";
import { IoLocation } from "react-icons/io5";
import SimilarHouses from "./SimilarHouses";

interface HouseHeroProps {
  currentHouseId: string | string[];
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const HouseIdContent = ({ currentHouseId }: HouseHeroProps) => {
  const dispatch = useAppDispatch();
  const house = useAppSelector((state) => state.house.currentHouse);

  useEffect(() => {
    const filteredHouse = houses.find(
      (item) => item.id.toString() === currentHouseId.toString()
    );
    if (filteredHouse) {
      dispatch(setCurrentHouse(filteredHouse));
    }
  }, [currentHouseId, dispatch]);

  return (
    <div className="flex flex-col gap-6 w-full lg:max-w-[873px] mt-28 md:mt-0">
      <div
        className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-2 py-12 px-6 shadow-sm`}
      >
        <h3 className="bg-[#303438] text-white w-[120px] text-[14px] leading-[22px] px-2 py-1 rounded-[5px]">
          {house?.category}
        </h3>
        <h1
          className={`${playfair.className} text-[34px] font-medium leading-[44px]`}
        >
          {house?.title}
        </h1>
        <div className="flex gap-2 items-center">
          <IoLocation />
          <h3 className="text-[14px] leading-[23px]">
            {house?.location}, {house?.state}, {house?.country}
          </h3>
        </div>
        <h2 className="text-[14px] leading-[23px] font-medium mt-4">
          Overview
        </h2>
        <p className="text-[14px] leading-[23px]">{house?.overview}</p>
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

      {/* Similar houses */}
     <SimilarHouses />
    </div>
  );
};

export default HouseIdContent;
