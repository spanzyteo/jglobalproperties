import React from "react";
import { BiSearch } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { searchState } from "../../store/searchSlice";

const Search = () => {
  const search = useAppSelector((state) => state.search.searchOption);
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col items-center md:items-start w-full md:max-w-[390px] lg:max-w-[460px]">
      {/* Tab */}
      <div className="flex items-center gap-1">
        <div
          onClick={() => dispatch(searchState("lands"))}
          className={`cursor-pointer rounded-t-[0.25rem] px-6 py-3 ${
            search === "lands"
              ? "bg-[#941A1A]/80 text-white"
              : "bg-white hover:text-[#941A1A]"
          }`}
        >
          <p>LANDS</p>
        </div>
        <div
          onClick={() => dispatch(searchState("houses"))}
          className={`cursor-pointer rounded-t-[0.5rem] px-6 py-3 ${
            search === "houses"
              ? "bg-[#941A1A]/80 text-white"
              : "bg-white hover:text-[#941A1A]"
          }`}
        >
          <p>HOUSES</p>
        </div>
      </div>
      {search === "lands" && (
        <form className="bg-white rounded-b-[0.5rem] rounded-tr-[0.5rem] rounded-tl-[0.5rem] md:rounded-tl-none flex flex-col gap-8 w-full p-4">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="">Property Name</label>
            <input
              type="text"
              placeholder="Name Of Property"
              className="border-b border-b-gray-300 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="">Property Location</label>
            <input
              type="text"
              placeholder="Location Of Property"
              className="border-b border-b-gray-300 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="">State</label>
            <input
              type="text"
              placeholder="State"
              className="border-b border-b-gray-300 focus:outline-none"
            />
          </div>
          <button className="flex gap-1 items-center justify-center bg-black py-3 rounded-[0.5rem] text-white cursor-pointer hover:bg-white hover:border hover:text-black transition-all duration-500 ease-in-out">
            <BiSearch className="h-[25px] w-[25px]" />
            <h2 className="font-medium">SEARCH</h2>
          </button>
        </form>
      )}
      {search === "houses" && (
        <form className="bg-white rounded-b-[0.5rem] rounded-tr-[0.5rem] rounded-tl-[0.5rem] md:rounded-tl-none flex flex-col gap-8 w-full p-4">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="">Property Name</label>
            <input
              type="text"
              placeholder="Name Of Property"
              className="border-b border-b-gray-300 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="">Property Location</label>
            <input
              type="text"
              placeholder="Location Of Property"
              className="border-b border-b-gray-300 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="">State</label>
            <input
              type="text"
              placeholder="State"
              className="border-b border-b-gray-300 focus:outline-none"
            />
          </div>
          <button className="flex gap-1 items-center justify-center bg-black py-3 rounded-[0.5rem] text-white cursor-pointer hover:bg-white hover:border hover:text-black transition-all duration-500 ease-in-out">
            <BiSearch className="h-[25px] w-[25px]" />
            <h2 className="font-medium">SEARCH</h2>
          </button>
        </form>
      )}
    </div>
  );
};

export default Search;
