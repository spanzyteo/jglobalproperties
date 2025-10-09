import { Playfair_Display, Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTiktok, FaYoutube } from "react-icons/fa";
import { MdOutlineArrowRightAlt } from "react-icons/md";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Ceo = () => {
  return (
    <div className="py-20 px-5 md:px-6 flex flex-col md:flex-row items-center md:justify-between gap-8 bg-gray-50">
      <div className="lg:h-[546px] md:h-[503px] h-[452px]">
        <Image
          src={"/team/joan.webp"}
          alt="ceo"
          width={520}
          height={546}
          className="bg-[#F4E8E8] h-full w-full md:max-w-[520px] object-cover rounded-tr-[5px] rounded-tl-[50px] rounded-br-[50px] rounded-bl-[5px]"
        />
      </div>
      <div className="flex flex-col items-center md:items-start gap-8">
        <div className="flex items-center gap-3 text-[15px]">
          <div className="h-3 w-3 rounded-full border-2 border-[#941A1A]"></div>
          <h1>WHY WORK WITH US</h1>
        </div>
        <h1
          className={`${playfair.className} text-[34px] md:text-[45px] max-w-[625px] text-center md:text-left`}
        >
          Joan Obi-Okuhon
        </h1>
        <p
          className={`${roboto.className} max-w-[650px] text-[18px] leading-[32px] text-center md:text-left`}
        >
          Joan is a driven professional committed to delivering exceptional
          service and steadfast support to her clients. Her extensive expertise
          in the real estate industry and dedication to client satisfaction have
          garnered her numerous positive referrals from those she served.
        </p>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full">
          <Link
            href={"/contact"}
            className={`${roboto.className} py-3 px-7 bg-white rounded-[5px] text-[18px] hover:border-[#941A1A] hover:text-[#941A1A] transition-all duration-500 ease-in-out border flex gap-2 items-center`}
          >
            <h3>Contact Me</h3>
            <MdOutlineArrowRightAlt className="h-[30px] w-[30px]" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-[35px] h-[35px] rounded-full border flex items-center justify-center">
              <FaFacebookF className="" />
            </div>
            <div className="w-[35px] h-[35px] rounded-full border flex items-center justify-center">
              <FaLinkedinIn />
            </div>
            <div className="w-[35px] h-[35px] rounded-full border flex items-center justify-center">
              <FaYoutube />
            </div>
            <div className="w-[35px] h-[35px] rounded-full border flex items-center justify-center">
              <FaTiktok />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ceo;
