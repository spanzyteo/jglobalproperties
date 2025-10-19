"use client";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { searchState } from "../../store/searchSlice";
import houses from "../../utils/houses";
import blogs from "../../utils/blogs";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ContactSection2 = () => {
  const search = useAppSelector((state) => state.search.searchOption);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-6 w-full lg:max-w-[365px] ">
      <div
        className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-4 py-12 px-6 shadow-sm`}
      >
        <h2 className="font-medium leading-[25px] text-[16px]">
          Advanced Search
        </h2>
        <div className="flex flex-col gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-2 mx-auto text-[14px]">
            <button
              onClick={() => dispatch(searchState("lands"))}
              className={`py-2 px-4 rounded-[5px] cursor-pointer ${
                search === "lands"
                  ? "bg-black text-white"
                  : "bg-gray-300 border border-gray-400 text-black"
              }`}
            >
              Lands
            </button>
            <button
              onClick={() => dispatch(searchState("houses"))}
              className={`py-2 px-4 rounded-[5px] cursor-pointer ${
                search === "houses"
                  ? "bg-black text-white"
                  : "bg-gray-300 border border-gray-400 text-black"
              }`}
            >
              House
            </button>
          </div>
          {search === "lands" && (
            <form className="w-full flex flex-col gap-2">
              <input
                type="text"
                placeholder="Property Name"
                className="border border-gray-200 py-2 px-3 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
              />
              <input
                type="text"
                placeholder="Location"
                className="border border-gray-200 py-2 px-3 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
              />
              <input
                type="text"
                placeholder="State"
                className="border border-gray-200 py-2 px-3 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
              />
              <button className="bg-black rounded-[5px] text-white w-full py-2 font-medium hover:bg-white hover:border hover:text-black transition-all duration-500 ease-in-out cursor-pointer">
                Search
              </button>
            </form>
          )}
          {search === "houses" && (
            <form className="w-full flex flex-col gap-2">
              <input
                type="text"
                placeholder="Property Name"
                className="border border-gray-200 py-2 px-3 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
              />
              <input
                type="text"
                placeholder="Location"
                className="border border-gray-200 py-2 px-3 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
              />
              <input
                type="text"
                placeholder="State"
                className="border border-gray-200 py-2 px-3 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
              />
              <button className="bg-black rounded-[5px] text-white w-full py-2 font-medium hover:bg-white hover:border hover:text-black transition-all duration-500 ease-in-out cursor-pointer">
                Search
              </button>
            </form>
          )}
        </div>
      </div>
      <div
        className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-4 py-12 px-6 shadow-sm`}
      >
        <h2 className="font-medium leading-[25px] text-[16px]">
          Latest Listings
        </h2>
        <div className="flex flex-col gap-4">
          {houses.slice(0, 3).map((item) => {
            const images = item.image[0];
            return (
              <div key={item.id} className="flex gap-2 items-center">
                <div className="h-[70px] w-[105px]">
                  {images && (
                    <div className="h-full w-full">
                      <Image
                        src={images.url}
                        alt="image"
                        height={70}
                        width={105}
                        className="rounded-[5px] h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap- text-[14px] font-medium max-w-[150px] md:max-w-[190px]">
                  <h4 className="">{item.title}</h4>
                  <h4 className="">₦{item.price.toLocaleString()}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-4 py-12 px-6 shadow-sm`}
      >
        <h1 className="font-medium leading-[25px] text-[28px]">Recent Posts</h1>
        <div className="flex flex-col gap-3">
          {blogs.slice(0, 5).map((item) => (
            <div key={item.id} >
              <h4 className="text-[13px]">{item.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div> 
  );
};

export default ContactSection2;
