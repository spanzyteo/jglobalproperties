"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import houses from "../../utils/houses";
import { setCurrentHouse } from "../../store/houseSlice";
import { Roboto } from "next/font/google";

interface HouseHeroProps {
  currentHouseId: number;
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Properties = ({ currentHouseId }: HouseHeroProps) => {
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
    <div className="bg-[#f7f7f7] w-full md:pt-4 md:pb-22 flex items-center justify-center">
      <div className="bg-white md:bg-white/80 md:rounded-[10px] w-full lg:w-[96%] lg:-mt-6 py-6 md:py-10 absolute lg:bottom-6 px-8 shadow-md">
        <div
          className={`${roboto.className} grid grid-cols-3 md:flex flex-wrap md:justify-between gap-6 text-[14px] font-medium leading-[20px]`}
        >
          <div className="flex flex-col">
            <h3>Updated On:</h3>
            <h3>June 11 2025</h3>
          </div>
          <div className="flex flex-col">
            <h3>Category:</h3>
            <h3>{house?.category}</h3>
          </div>
          <div className="flex flex-col">
            <h3>Property ID:</h3>
            <h3>{house?.id}</h3>
          </div>
          <div className="flex flex-col">
            <h3>Location:</h3>
            <h3>{house?.location}</h3>
          </div>
          <div className="flex flex-col">
            <h3>State:</h3>
            <h3>{house?.state}</h3>
          </div>
          <div className="flex flex-col">
            <h3>Country:</h3>
            <h3>{house?.country}</h3>
          </div>
          <div className="flex flex-col">
            <h3>Price:</h3>
            <h3>{house?.price.toLocaleString()}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
