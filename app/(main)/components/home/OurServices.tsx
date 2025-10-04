import React from 'react'
import { Playfair_Display } from "next/font/google";
import { Roboto } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const OurServices = () => {
  return (
    <div className="flex flex-col md:flex-row py-20 px-5 md:px-10 items-center md:justify-between gap-4">
      <div className="flex flex-col items-center md:items-start gap-8">
        <div className="flex items-center gap-3 text-[15px]">
          <div className="h-3 w-3 rounded-full border-2 border-[#941A1A]"></div>
          <h1>OUR SERVICES</h1>
        </div>
        <h1
          className={`${playfair.className} text-[34px] md:text-[45px] max-w-[625px] text-center md:text-left`}
        >
          Passionate About Being Different & Loyal
        </h1>
      </div>
      <div className="hidden md:block w-[0.1rem] h-44 bg-[#941A1A]"></div>
      <div className="flex justify-center max-w-[597px] text-[18px] font-medium md:pl-8">
        <h3 className={`${roboto.className} md:leading-[28px] leading-[25px] max-w-[597px] text-center md:text-left`}>
          jglobalproperties stands out to all—clients, developers, vendors, and industry
          professionals alike—for her exceptional talents, innovative spirit,
          and unwavering dedication in guiding buyers and sellers. Her ability
          to navigate the complexities of the market with ease and precision
          sets her apart.
        </h3>
      </div>
    </div>
  );
}

export default OurServices