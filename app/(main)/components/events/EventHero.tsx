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

const EventHero = () => {
  return (
    <Parallax
      strength={800}
      bgImage="/review-bg.jpg"
      bgImageStyle={{
        objectFit: "cover",
        objectPosition: "center",
        width: "100%",
        height: "100%",
      }}
      className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[550px]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/60 via-[#111111]/70 to-[#111111]/80 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[500px] md:min-h-[600px] lg:min-h-[550px] text-white gap-3 md:gap-4 px-5">
        <h1
          className={`${playfair.className} text-[31px] md:text-[55px] lg:text-[65px] leading-[38px] md:leading-[60px] lg:leading-[71px] text-center max-w-[90%] md:max-w-[80%]`}
        >
          Explore Our Events & Experiences
        </h1>
        <h3
          className={`${roboto.className} text-[19px] leading-[23px] md:leading-[30px] text-center max-w-[285px] md:max-w-[400px] font-normal`}
        >
          Stay connected with J-Global Properties through our property tours,
          investment seminars, and past events that shaped our community.
        </h3>
      </div>
    </Parallax>
  );
};

export default EventHero;
