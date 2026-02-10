// components/CompanyInfo.tsx

"use client";

import { Roboto } from "next/font/google";
import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { easeOut, motion } from "framer-motion";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

const socialIconVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: easeOut,
    },
  }),
};

const socialIcons = [
  {
    Icon: FaInstagram,
    href: "https://www.instagram.com/jglobalproperties?igsh=M2x5NGtieTJkbTI4",
  },
  {
    Icon: FaLinkedinIn,
    href: "https://www.linkedin.com/company/jglobal-property-solution/",
  },
  {
    Icon: FaYoutube,
    href: "https://youtube.com/@jglobalproperties?si=gtcVve8oTV0uAEWQ",
  },
];

export default function CompanyInfo() {
  return (
    <motion.div
      className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-10 py-12 px-6 shadow-sm`}
      variants={cardVariants}
      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-4">
        <motion.h1
          className="text-[35px] font-medium leading-11.25"
          variants={titleVariants}
        >
          Jglobal properties
        </motion.h1>

        <motion.h3
          className="text-[18px]"
          variants={titleVariants}
          transition={{ delay: 0.1 }}
        >
          S Deasant Valley Lekki Ajah Expressway
        </motion.h3>

        <div className="flex items-center gap-3">
          {socialIcons.map(({ Icon, href }, index) => (
            <motion.a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              custom={index}
              variants={socialIconVariants}
              whileHover={{
                scale: 1.3,
                color: "#941A1A",
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon className="h-5 w-5 cursor-pointer" />
            </motion.a>
          ))}
        </div>

        <motion.div
          className="flex flex-col gap-2 items-start"
          variants={cardVariants}
        >
          <div className="flex gap-6 items-start text-[15px]">
            <h4 className="font-medium leading-5.75">Phone:</h4>
            <p>+234 816 432 2663</p>
          </div>
          <div className="flex gap-6 items-start text-[15px]">
            <h4 className="font-medium leading-5.75">Mobile:</h4>
            <p>+234 816 432 2663</p>
          </div>
          <div className="flex gap-6 items-start text-[15px]">
            <h4 className="font-medium leading-5.75">Email:</h4>
            <p>info@jglobalproperties.com</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="flex flex-col gap-5 text-[14px] leading-5.75"
        variants={cardVariants}
      >
        <p>
          Whether you&apos;re looking for property for sale in Lagos or property
          for rent, Jglobal Properties makes searching easy. We specialize in
          helping you identify prime real estate opportunities that align with
          your investment goals. From luxury apartments to commercial
          properties, we connect you with the perfect property to build your
          wealth and secure your future.
        </p>
        <p>
          We offer our clients a wealth of knowledge regarding all aspects of
          purchasing or selling property. Whether it&apos;s helping you find
          your dream home, exploring lucrative investment opportunities, or
          providing expert guidance on property sales, we&apos;re committed to
          your success. Please feel free to contact us with any questions about
          navigating the real estate market!
        </p>
      </motion.div>
    </motion.div>
  );
}
