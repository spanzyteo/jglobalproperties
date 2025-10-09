import React from "react";
import Image from "next/image";
import { Playfair_Display, Roboto } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const MissionAndVision = () => {
  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Left Image - Fixed height 883px on desktop */}
      <div className="w-full md:w-1/3 h-[400px] md:h-[883px] relative xl:w-[675px]">
        <Image
          src={"/about/about1.webp"}
          alt="about"
          fill
          className="object-cover rounded-tl-[120px]"
        />
      </div>

      {/* Right Section - 2x2 Grid */}
      <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-2 w-full md:w-2/3">
        {/* Vision Image - Top Left (order-1 on mobile) */}
        <div className="relative w-full h-[400px] md:h-[441.5px] order-1 md:order-none">
          <Image
            src={"/about/about2.jpeg"}
            alt="about"
            fill
            className="object-cover"
          />
        </div>

        {/* Mission Text - Top Right (order-4 on mobile) */}
        <div className="bg-[#FFFFFF] flex flex-col h-[400px] md:h-[441.5px] p-[45px] items-center md:items-start gap-4 justify-center order-4 md:order-none">
          <h2
            className={`${playfair.className} text-[34px] md:text-[32px] leading-[40px] md:leading-[38px] text-center md:text-left`}
          >
            Our Mission
          </h2>
          <p
            className={`${roboto.className} text-[18px] md:text-[14px] lg:text-[18px] leading-[28px] text-center md:text-left`}
          >
            We understand that real estate is more than buying a home—it&apos;s
            a pathway to building wealth and creating a legacy. We tailor our
            strategies to your specific needs, ensuring your investment exceeds
            expectations with strong returns and sustainable income. Partner
            with us on your journey to financial success.
          </p>
        </div>

        {/* Vision Text - Bottom Left (order-2 on mobile) */}
        <div className="bg-[#FFFFFF] flex flex-col h-[400px] md:h-[441.5px] p-[45px] items-center md:items-start gap-4 justify-center order-2 md:order-none">
          <h2
            className={`${playfair.className} text-[34px] md:text-[32px] leading-[40px] md:leading-[38px] text-center md:text-left`}
          >
            Our Vision
          </h2>
          <p
            className={`${roboto.className} text-[18px] md:text-[14px] lg:text-[18px] leading-[28px] text-center md:text-left`}
          >
            Jglobal Properties is guided by a clear vision to help individuals
            identify and leverage real estate opportunities to increase their
            cash flow. Our personalized approach prioritizes understanding your
            unique needs and goals, recognizing that each client&apos;s
            investment objectives are distinct.
          </p>
        </div>

        {/* Mission Image - Bottom Right (order-3 on mobile) */}
        <div className="relative w-full h-[400px] md:h-[441.5px] order-3 md:order-none">
          <Image
            src={"/about/about3.jpeg"}
            alt="about"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default MissionAndVision;
