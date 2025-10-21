import { Playfair_Display, Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Footer = () => {
  return (
    <div className="bg-black pt-20 pb-10 px-10 flex flex-col gap-14">
      <div className="flex flex-col gap-6 items-center text-white">
        <h1
          className={`${playfair.className} text-[34px] md:text-[51px] leading-[44px] md:leading-[56px]`}
        >
          Jglobal Properties
        </h1>
        <h3
          className={`${roboto.className} text-[17px] leading-[22px] md:leading-[17px]`}
        >
          Your Trusted Real Estate Partner
        </h3>
      </div>
      <div
        className={`${roboto.className} flex flex-col md:flex-row gap-2 md:gap-6 items-center justify-center text-white text-[18px] leading-[36px] md:leading-[23px]`}
      >
        <h3>+234 816 432 2663</h3>
        <h3 className="hidden md:inline-block h-6 bg-white w-[0.05rem]"></h3>
        <h3 className="text-center">S Deasant Valley Lekki Ajah Expressway</h3>
        <h3 className="hidden md:inline-block h-6 bg-white w-[0.05rem]"></h3>
        <h3>info@jglobalproperties.com</h3>
      </div>
      <Image
        src={"/logo1.svg"}
        alt="logo"
        width={100}
        height={100}
        className="mx-auto"
      />
      <div className="flex items-center justify-center gap-3 text-white">
        {/* <FaFacebookF /> */}
        <FaWhatsapp />
        <Link
          href={
            "https://www.instagram.com/jglobalproperties?igsh=M2x5NGtieTJkbTI4"
          }
          target="_blank"
        >
          <FaInstagram />
        </Link>
        <Link
          href={"https://www.linkedin.com/company/jglobal-property-solution/"}
          target="_blank"
        >
          <FaLinkedinIn />
        </Link>
        <Link
          href={"https://youtube.com/@jglobalproperties?si=gtcVve8oTV0uAEWQ"}
          target="_blank"
        >
          <FaYoutube />
        </Link>
      </div>
      <div
        className={`${roboto.className} flex flex-col md:flex-row items-center gap-3 justify-center w-full border-t border-t-gray-800 text-[#F0F0F0E3] pt-4 px-6 text-[14px] leading-[28px] md:leading-[23px]`}
      >
        <div className="flex items-center gap-3">
          <h3>Home</h3>
          <h3 className="h-[0.1rem] w-[0.1rem] bg-[#F0F0F0E3]"></h3>
          <h3>About</h3>
          <h3 className="h-[0.1rem] w-[0.1rem] bg-[#F0F0F0E3]"></h3>
          <h3>Properties</h3>
          <h3 className="h-[0.1rem] w-[0.1rem] bg-[#F0F0F0E3]"></h3>
          <h3>Blogs</h3>
          <h3 className="h-[0.1rem] w-[0.1rem] bg-[#F0F0F0E3]"></h3>
        </div>
        <h3>©2024 All Rights Reserved</h3>
      </div>
    </div>
  );
};

export default Footer;
