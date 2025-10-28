import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { searchState } from "../../store/searchSlice";
import { useRouter } from "next/navigation";
import { state as nigeriaState } from "locations-ng";

const Search = () => {
  const search = useAppSelector((state) => state.search.searchOption);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const states = nigeriaState.all()

  const [formData, setFormData] = useState({
    propertyName: "",
    location: "",
    state: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Build query params
    const params = new URLSearchParams();
    params.append("type", search);
    if (formData.propertyName) params.append("title", formData.propertyName);
    if (formData.location) params.append("location", formData.location);
    if (formData.state) params.append("state", formData.state);

    // Navigate to advanced search with params
    router.push(`/advanced-search?${params.toString()}`);
  };

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
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-b-[0.5rem] rounded-tr-[0.5rem] rounded-tl-[0.5rem] md:rounded-tl-none flex flex-col gap-8 w-full p-4"
        >
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="propertyName">Property Name</label>
            <input
              type="text"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleInputChange}
              placeholder="Name Of Property"
              className="border-b border-b-gray-300 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="location">Property Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Location Of Property"
              className="border-b border-b-gray-300 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="state">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="border-b border-b-gray-300 focus:outline-none"
            >
              <option value="" className="text-gray-300">
                All States
              </option>
              {states.map((st) => (
                <option key={st.name} value={st.name}>
                  {st.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="flex gap-1 items-center justify-center bg-black py-3 rounded-[0.5rem] text-white cursor-pointer hover:bg-white hover:border hover:text-black transition-all duration-500 ease-in-out"
          >
            <BiSearch className="h-[25px] w-[25px]" />
            <h2 className="font-medium">SEARCH</h2>
          </button>
        </form>
      )}
      {search === "houses" && (
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-b-[0.5rem] rounded-tr-[0.5rem] rounded-tl-[0.5rem] md:rounded-tl-none flex flex-col gap-8 w-full p-4"
        >
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="propertyName">Property Name</label>
            <input
              type="text"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleInputChange}
              placeholder="Name Of Property"
              className="border-b border-b-gray-300 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="location">Property Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Location Of Property"
              className="border-b border-b-gray-300 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="state">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="border-b border-b-gray-300 focus:outline-none"
            >
              <option value="">
                All States
              </option>
              {states.map((st) => (
                <option key={st.name} value={st.name}>
                  {st.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="flex gap-1 items-center justify-center bg-black py-3 rounded-[0.5rem] text-white cursor-pointer hover:bg-white hover:border hover:text-black transition-all duration-500 ease-in-out"
          >
            <BiSearch className="h-[25px] w-[25px]" />
            <h2 className="font-medium">SEARCH</h2>
          </button>
        </form>
      )}
    </div>
  );
};

export default Search;
