"use client";
import { Playfair_Display, Roboto } from "next/font/google";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { Parallax } from "react-parallax";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ContactBody = () => {
  return (
    <div className="bg-[#fffcfc] px-4 md:px-8 py-8 flex flex-col lg:flex-row">
      <div className="flex flex-col gap-6 w-full lg:max-w-[873px]">
        <div
          className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-10 py-12 px-6 shadow-sm`}
        >
          <div className="flex flex-col gap-4">
            <h1 className={` text-[35px] font-medium leading-[45px]`}>
              Jglobal properties
            </h1>
            <h3 className="text-[18px]">
              S Deasant Valley Lekki Ajah Expressway
            </h3>
            <div className="flex items-center gap-3">
              <FaFacebookF className="h-[20px] w-[20px]" />
              <FaWhatsapp className="h-[20px] w-[20px]" />
              <FaInstagram className="h-[20px] w-[20px]" />
              <FaLinkedinIn className="h-[20px] w-[20px]" />
              <FaYoutube className="h-[20px] w-[20px]" />
            </div>
            <div className="flex flex-col gap-2 items-start">
              <div className="flex gap-6 items-start text-[15px]">
                <h4 className="font-medium leading-[23px]">Phone:</h4>
                <p className="">+234 816 432 2663</p>
              </div>
              <div className="flex gap-6 items-start text-[15px]">
                <h4 className="font-medium leading-[23px]">Mobile:</h4>
                <p className="">+234 816 432 2663</p>
              </div>
              <div className="flex gap-6 items-start text-[15px]">
                <h4 className="font-medium leading-[23px]">Email:</h4>
                <p className="">info@jglobalproperties.com</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 text-[14px] leading-[23px]">
            <p>
              Whether you’re looking for property for sale in New York area or
              property for rent, WP Residence makes searching easy. Use our
              unique geolocation mapping feature to root-out your ideal villa,
              townhouse or apartment and contact the owners direct. We will help
              you find your dream house in just a few seconds.
            </p>
            <p>
              We offer our clients a wealth of knowledge regarding all aspects
              of purchasing or selling a home. Whether it is helping you search
              for your dream home, discussing new New York real estate
              developments, or assisting with the sale of your property, we
              would love the opportunity to help. Please feel free to contact us
              with any questions!
            </p>
          </div>
          <Image
            src={"/team/joan.webp"}
            alt="ceo"
            width={819}
            height={819}
            className="w-full rounded-[5px] object-cover"
          />
        </div>
        <div
          className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-5 py-12 px-6 shadow-sm`}
        >
          <h2 className="text-[18px] font-medium leading-[23px]">Contact Me</h2>
          <form className="flex flex-col gap-3 w-full text-[14px]">
            <div className="flex flex-col md:flex-row md:justify-between gap-3 w-full">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
              />
              <input
                type="text"
                placeholder="Your Phone"
                className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
              />
            </div>
            <textarea className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out" rows={7}></textarea>
            <button className="bg-black rounded-[5px] text-white w-full md:w-[139px] py-3 font-medium hover:bg-white hover:border hover:text-black transition-all duration-500 ease-in-out cursor-pointer">Send Email</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactBody;
