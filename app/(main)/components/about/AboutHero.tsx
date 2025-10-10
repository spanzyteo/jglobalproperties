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

const AboutHero = () => {
  return (
    <>
      <Parallax
        strength={800}
        bgImage="/about/about-bg.webp"
        bgImageStyle={{
          objectFit: "cover",
          objectPosition: "center",
          width: "100%",
          height: "100%",
        }}
        className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[600px]"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/60 via-[#111111]/70 to-[#111111]/80 z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[500px] md:min-h-[600px] lg:min-h-[600px] text-white gap-3 px-5">
          <h1
            className={`${playfair.className} text-[31px] md:text-[55px] lg:text-[65px] leading-[38px] md:leading-[60px] lg:leading-[71px] text-center max-w-[90%] md:max-w-[80%]`}
          >
            About Jglobalproperties
          </h1>
          <h3
            className={`${roboto.className} text-[19px] leading-[23px] md:leading-[30px] text-center max-w-[285px] md:max-w-[400px] font-normal`}
          >
            Get To Know Our Talented Real Estate Team
          </h3>
        </div>
      </Parallax>
    </>
  );
};

export default AboutHero;
