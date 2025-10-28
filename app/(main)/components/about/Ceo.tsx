"use client";

import { Playfair_Display, Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { easeOut, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Ceo = () => {
  const { ref: imageRef, inView: imageInView } = useInView({
    // triggerOnce: true,
    threshold: 0.3,
  });

  const { ref: contentRef, inView: contentInView } = useInView({
    // triggerOnce: true,
    threshold: 0.3,
  });

  const imageVariants = {
    hidden: {
      opacity: 0,
      x: -80,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: easeOut,
        delay: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: easeOut,
        delay: 0.4,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
        delay: 0.6,
      },
    },
  };

  const socialContainerVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
        delay: 0.7,
        staggerChildren: 0.1,
      },
    },
  };

  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.4,
        ease: easeOut,
      },
    },
  };

  const socialIcons = [
    {
      Icon: FaLinkedinIn,
      href: "https://www.linkedin.com/company/jglobal-property-solution/",
    },
    {
      Icon: FaYoutube,
      href: "https://youtube.com/@jglobalproperties?si=gtcVve8oTV0uAEWQ",
    },
    {
      Icon: FaInstagram,
      href: "https://www.instagram.com/jglobalproperties?igsh=M2x5NGtieTJkbTI4",
    },
  ];

  return (
    <div className="py-20 px-5 md:px-6 flex flex-col md:flex-row items-center md:justify-between gap-8 bg-gray-50 overflow-hidden">
      {/* Image Section */}
      <motion.div
        ref={imageRef}
        className="lg:h-[546px] md:h-[503px] h-[452px]"
        variants={imageVariants}
        initial="hidden"
        animate={imageInView ? "visible" : "hidden"}
        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      >
        <motion.div
          className="relative overflow-hidden rounded-tr-[5px] rounded-tl-[50px] rounded-br-[50px] rounded-bl-[5px] h-full"
          whileHover="hover"
        >
          <motion.div
            variants={{
              hover: { scale: 1.1 },
            }}
            transition={{ duration: 0.5 }}
            className="h-full w-full lg:w-[520px]"
          >
            <Image
              src={"/ceo.JPG"}
              alt="ceo"
              width={520}
              height={546}
              className="bg-[#F4E8E8] h-full w-full md:max-w-[520px] object-cover"
            />
          </motion.div>
          {/* Overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-black/0"
            variants={{
              hover: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        ref={contentRef}
        className="flex flex-col items-center md:items-start gap-8"
        initial="hidden"
        animate={contentInView ? "visible" : "hidden"}
      >
        <motion.div
          className="flex items-center gap-3 text-[15px]"
          variants={badgeVariants}
        >
          <div className="h-3 w-3 rounded-full border-2 border-[#941A1A]"></div>
          <h1>WHY WORK WITH US</h1>
        </motion.div>

        <motion.h1
          className={`${playfair.className} text-[34px] md:text-[45px] max-w-[625px] text-center md:text-left`}
          variants={titleVariants}
        >
          Joan Obi-Okuhon
        </motion.h1>

        <motion.p
          className={`${roboto.className} max-w-[650px] text-[18px] leading-[32px] text-center md:text-left`}
          variants={textVariants}
        >
          Joan is a driven professional committed to delivering exceptional
          service and steadfast support to her clients. Her extensive expertise
          in the real estate industry and dedication to client satisfaction have
          garnered her numerous positive referrals from those she served.
        </motion.p>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full">
          {/* Contact Button */}
          <motion.div variants={buttonVariants}>
            <Link
              href={"/contact"}
              className={`${roboto.className} py-3 px-7 bg-white rounded-[5px] text-[18px] hover:border-[#941A1A] hover:text-[#941A1A] transition-all duration-500 ease-in-out border flex gap-2 items-center group`}
            >
              <h3>Contact Me</h3>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <MdOutlineArrowRightAlt className="h-[30px] w-[30px] group-hover:translate-x-2 transition-transform duration-300" />
              </motion.div>
            </Link>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            className="flex items-center gap-2"
            variants={socialContainerVariants}
          >
            {socialIcons.map(({ Icon, href }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                variants={socialIconVariants}
                whileHover={{
                  scale: 1.2,
                  rotate: 360,
                  backgroundColor: "#941A1A",
                  color: "#fff",
                  borderColor: "#941A1A",
                  transition: { duration: 0.4 },
                }}
                whileTap={{ scale: 0.9 }}
                className="w-[35px] h-[35px] rounded-full border flex items-center justify-center cursor-pointer transition-colors duration-300"
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Ceo;
