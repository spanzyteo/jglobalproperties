"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCurrentHouse } from "../../store/houseSlice";
import { useHouseById } from "../../features/houses";
import { Roboto } from "next/font/google";

interface HouseHeroProps {
  currentHouseId: string | string[];
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Properties = ({ currentHouseId }: HouseHeroProps) => {
  const dispatch = useAppDispatch();
  const house = useAppSelector((state) => state.house.currentHouse);
  const { house: fetchedHouse } = useHouseById(currentHouseId as string);

  useEffect(() => {
    if (fetchedHouse) {
      dispatch(setCurrentHouse(fetchedHouse));
    }
  }, [fetchedHouse, dispatch]);

  const formattedDate = house?.createdAt
    ? new Date(house.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="bg-[#f7f7f7] w-full md:pt-4 md:pb-22 flex items-center justify-center">
      <div className="bg-white md:bg-white/80 md:rounded-[10px] w-full lg:w-[96%] lg:-mt-6 py-6 md:py-10 absolute lg:bottom-6 px-8 shadow-md">
        <div
          className={`${roboto.className} grid grid-cols-3 md:flex flex-wrap md:justify-between gap-6 text-[14px] font-medium leading-5 w-full`}
        >
          <div className="flex flex-col min-w-0">
            <h3>Updated On:</h3>
            <h3 className="truncate">{formattedDate}</h3>
          </div>
          <div className="flex flex-col min-w-0">
            <h3>Category:</h3>
            <h3 className="truncate">{house?.category}</h3>
          </div>
          <div className="flex flex-col min-w-0">
            <h3>Location:</h3>
            <h3 className="truncate">{house?.location}</h3>
          </div>
          <div className="flex flex-col min-w-0">
            <h3>State:</h3>
            <h3 className="truncate">{house?.state}</h3>
          </div>
          <div className="flex flex-col min-w-0">
            <h3>Country:</h3>
            <h3 className="truncate">{house?.country}</h3>
          </div>
          <div className="flex flex-col min-w-0">
            <h3>Price:</h3>
            <h3 className="truncate">{house?.price}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
