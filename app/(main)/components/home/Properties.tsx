/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef } from "react";
import { FaAngleRight } from "react-icons/fa";
import { motion, useInView } from "framer-motion";

const Properties = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-160px" });

  return (
    <div
      ref={ref}
      className="flex flex-col lg:flex-row items-center gap-[2.5rem] lg:gap-[4.4375rem] px-[2rem] lg:px-[8.31rem] mt-[5.5rem] lg:mt-[9rem]"
    >
      {/* LEFT SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative flex flex-col lg:w-[25.25rem] p-[0.625rem] gap-4 lg:gap-8"
      >
        <div className="flex flex-col gap-2 lg:gap-4 items-start">
          <h1 className="lg:text-[3rem] text-[1.5rem] font-bold leading-[3.25rem]">
            Our Latest Properties
          </h1>
          <p className="lg:text-[1.5rem] text-[1rem] leading-[1.25rem] lg:leading-[1.75rem] text-[#616161]">
            Unlock the potential rewards of investing in real estate.
          </p>
        </div>
        <button className="flex items-center justify-center lg:py-4 py-3 lg:px-8 px-6 rounded-[0.5rem] bg-[#941A1A] text-white cursor-pointer gap-2">
          <p className="text-[0.875rem] lg:text-[1rem] font-medium leading-[1.125rem] lg:leading-[1.25rem]">
            See All Properties
          </p>
          <FaAngleRight />
        </button>
      </motion.div>

      {/* RIGHT SECTION (GRID) */}
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.7,
          ease: "easeOut",
          delay: 0.9, // slightly after the left section
        }}
        className="grid grid-cols-2 lg:w-[43.6875rem] gap-2 lg:gap-4 z-10"
      >
        {["prop1", "prop2", "prop3", "prop4"].map((prop, index) => (
          <div key={index} className="relative cursor-pointer group">
            <img
              src={`/prop/${prop}.png`}
              alt={`Property ${index + 1}`}
              className="w-full h-full object-cover rounded-md"
            />
            <div className="pointer-events-none absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
            <button
              type="button"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5.5rem] py-[0.5rem] px-4 rounded-[0.5rem] bg-[#F9F9F9] text-[0.75rem] font-medium leading-4 text-[#941A1A] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label={`View property ${index + 1}`}
            >
              View
            </button>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Properties;
