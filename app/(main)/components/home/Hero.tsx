"use client";
import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineFlag } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { motion, Variants } from "framer-motion";

const Hero = () => {
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const titleVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smooth effect
      },
    },
  };

  const shadowVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94], // easeOut equivalent
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // easeOut equivalent
        delay: 0.3,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: [0.42, 0, 0.58, 1], // easeInOut equivalent
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const searchBoxVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.4,
      },
    },
  };

  const searchItemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94], // easeOut equivalent
      },
    },
  };

  const searchItemsContainer: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6,
      },
    },
  };

  return (
    <motion.div
      className="lg:h-[44.8125rem] h-[41.562rem] bg-center bg-cover bg-no-repeat bg-[url(/hero.png)] lg:mt-[6rem] flex flex-col"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex flex-col items-center gap-[3.0625rem] lg:gap-30 mt-[13.1rem] lg:mt-[8.19rem]">
        <div className="flex flex-col items-center gap-6 lg:gap-0 lg:w-[47.75rem] w-[90%] relative">
          <motion.div variants={shadowVariants}>
            <Image
              width={917}
              height={264}
              src={"/shadow.png"}
              alt="shadow"
              className="w-[57.3125rem] h-[16.5rem] hidden lg:block"
            />
          </motion.div>

          <motion.h1
            className="lg:leading-[4.5rem] leading-[2.5rem] lg:absolute lg:top-0 text-white text-[2rem] lg:text-[4rem] font-bold text-center"
            variants={titleVariants}
          >
            Leveraging Real Estate Market Opportunities
          </motion.h1>

          <motion.button
            className="flex items-center justify-center lg:py-4 py-3 lg:px-8 px-6 rounded-[0.5rem] bg-[#941A1A] text-white cursor-pointer lg:mt-[-4rem]"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <p
              className={`text-[0.875rem] lg:text-[1rem] font-medium leading-[1.125rem] lg:leading-[1.25rem] `}
            >
              Get Started
            </p>
          </motion.button>
        </div>

        <motion.div
          className="flex flex-wrap justify-center items-center w-[90%] lg:w-[55rem] max-w-full h-auto px-4 py-3 gap-2 lg:gap-4 rounded-md lg:rounded-xl bg-[#F8F8F8] search-box"
          variants={searchBoxVariants}
        >
          <motion.div
            variants={searchItemsContainer}
            initial="hidden"
            animate="visible"
            className="contents"
          >
            {/* Location */}
            <motion.div
              className="flex flex-1 min-w-[6rem] lg:min-w-[12rem] h-[2.5rem] lg:h-[3rem] p-1 lg:p-2 items-center gap-1 lg:gap-2 bg-white rounded-md"
              variants={searchItemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: { duration: 0.2 },
              }}
            >
              <SlLocationPin className="w-3 lg:w-4 h-3 lg:h-4" />
              <p className="text-[0.75rem] lg:text-[1rem] font-normal">
                Location
              </p>
            </motion.div>

            {/* Property Type */}
            <motion.div
              className="flex flex-1 min-w-[6rem] lg:min-w-[12rem] h-[2.5rem] lg:h-[3rem] p-1 lg:p-2 items-center gap-1 lg:gap-2 bg-white rounded-md"
              variants={searchItemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: { duration: 0.2 },
              }}
            >
              <MdOutlineFlag className="w-3 lg:w-4 h-3 lg:h-4" />
              <p className="text-[0.75rem] lg:text-[1rem] font-normal">
                Property Type
              </p>
            </motion.div>

            {/* Search */}
            <motion.div
              className="flex-1 min-w-[10rem] lg:min-w-[20rem] h-[2.5rem] lg:h-[3rem] relative"
              variants={searchItemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <input
                placeholder="Search Property"
                className="w-full h-full px-2 lg:px-4 py-1 lg:py-2 rounded-md bg-white focus:outline-none text-[0.75rem] lg:text-[1rem] transition-all duration-200 focus:ring-2 focus:ring-[#941A1A]/20 focus:shadow-lg"
              />
              <IoSearchOutline className="absolute right-2 lg:right-3 top-2 lg:top-3 w-3 lg:w-4 h-3 lg:h-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
