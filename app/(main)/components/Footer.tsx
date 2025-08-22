import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiSend } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook, FaYoutube } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="flex p-8 lg:pt-[5.62rem] lg:pb-[5.62rem] lg:px-[5rem] items-center gap-[0.625rem] bg-black lg:justify-center pb-20">
      <div className="flex flex-col lg:flex-row lg:items-center gap-[1.875rem] lg:gap-[13.5rem]">
        <div className="flex flex-col items-start w-[9.875rem] lg:w-[7.07144rem]">
          <Image
            src={"/logo1.svg"}
            alt="logo"
            height={88}
            width={85}
            className="w-[5.30356rem] h-[4.125rem] footer-logo"
          />
          <p className="text-[0.75rem] text-white leading-4">
            © 2025 All rights reserved.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-center lg:items-center lg:gap-[3.25rem] gap-[1.7rem]">
          <div className="flex flex-col items-start gap-[0.25rem] lg:shrink-0">
            <Link
              href={"/"}
              className="flex py-[0.125rem] px-[0.25rem] items-center gap-[0.625rem] text-[1rem] leading-[1.25rem] text-white"
            >
              Home
            </Link>
            <Link
              href={"/properties"}
              className="flex py-[0.125rem] px-[0.25rem] items-center gap-[0.625rem] text-[1rem] leading-[1.25rem] text-white"
            >
              Properties
            </Link>
            <Link
              href={"/about"}
              className="flex py-[0.125rem] px-[0.25rem] items-center gap-[0.625rem] text-[1rem] leading-[1.25rem] text-white"
            >
              About us
            </Link>
            <Link
              href={"/blog"}
              className="flex py-[0.125rem] px-[0.25rem] items-center gap-[0.625rem] text-[1rem] leading-[1.25rem] text-white"
            >
              Blog
            </Link>
            <Link
              href={"/contact"}
              className="flex py-[0.125rem] px-[0.25rem] items-center gap-[0.625rem] text-[1rem] leading-[1.25rem] text-white"
            >
              Contact Us
            </Link>
          </div>
          <div className="flex flex-col items-start gap-2 lg:shrink-0 ">
            <div className="flex gap-[0.34238rem] p-[0.34238rem] items-center">
              <div className="flex h-6 w-6  items-center justify-center rounded-full bg-white">
                <IoLogoInstagram className="text-gray-900 h-[0.58331rem w-[0.58331rem" />
              </div>
              <div className="flex h-6 w-6  items-center justify-center rounded-full bg-white">
                <FaLinkedin className="text-gray-900 h-[0.58331rem w-[0.58331rem" />
              </div>
              <div className="flex h-6 w-6  items-center justify-center rounded-full bg-white">
                <FaFacebook className="text-gray-900 h-[0.58331rem w-[0.58331rem" />
              </div>
              <div className="flex h-6 w-6  items-center justify-center rounded-full bg-white">
                <FaYoutube className="text-gray-900 h-[0.58331rem w-[0.58331rem" />
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Image
                src={"/footer/phone.png"}
                width={20}
                height={20}
                alt="phone"
                className="w-5 h-5"
              />
              <p className="text-white text-[1rem] leading-[1.25rem]">
                +234 816 432 2663
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Image
                src={"/footer/mail.png"}
                width={20}
                height={20}
                alt="phone"
                className="w-5 h-5"
              />
              <p className="text-white text-[1rem] leading-[1.25rem]">
                info@jglobalproperties.com
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Image
                src={"/footer/home.png"}
                width={20}
                height={20}
                alt="phone"
                className="w-5 h-5"
              />
              <p className="text-white text-[1rem] leading-[1.25rem]">
                S Deasant Valley Lekki Ajah Expressway
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <h1 className="text-2xl font-semibold text-white">
              Subscribe to our weekly newsletter
            </h1>
            <div className="flex items-start gap-1 ">
              <div className="flex h-12 px-4 bg-white rounded-[0.5rem] justify-center items-center ">
                <Image
                  src={"/footer/user.png"}
                  alt="user"
                  height={16}
                  width={16}
                  className="h-4 w-4"
                />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full focus:outline-none pr-[3.9375rem] flex items-center flex-1 h-[1.125rem] text-[0.875rem] leading-[1.125rem] text-[#888]"
                />
              </div>
              <div className="flex w-[3.4375rem] h-[3rem] items-center justify-center bg-white rounded-[0.5rem] ">
                <BiSend className="h-[20px] w-[20px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
