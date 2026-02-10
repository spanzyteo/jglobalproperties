"use client";
import { Playfair_Display, Roboto } from "next/font/google";
import { Parallax } from "react-parallax";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const HouseHero = () => {
  return (
    <Parallax
      strength={800}
      bgImage="/house-bg.webp"
      bgImageStyle={{
        objectFit: "cover",
        objectPosition: "center",
        width: "100%",
        height: "100%",
      }}
      className="relative min-h-125 md:min-h-150 lg:min-h-137.5"
    >
      <div className="absolute inset-0 bg-linear-to-b from-[#111111]/60 via-[#111111]/70 to-[#111111]/80 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-125 md:min-h-150 lg:min-h-137.5 text-white gap-3 md:gap-4 px-5">
        <h1
          className={`${playfair.className} text-[31px] md:text-[55px] lg:text-[65px] leading-9.5 md:leading-15 lg:leading-17.75 text-center max-w-[90%] md:max-w-[80%]`}
        >
          Find Your Dream Home in Nigeria
        </h1>
        <h3
          className={`${roboto.className} text-[19px] leading-5.75 md:leading-7.5 text-center max-w-71.25 md:max-w-100 font-normal`}
        >
          Explore finished and off-plan homes tailored to your lifestyle
        </h3>
      </div>
    </Parallax>
  );
};

export default HouseHero;
