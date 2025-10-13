'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import blogs from "../utils/blogs";
import { Roboto } from "next/font/google";
import { motion } from "framer-motion";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const BlogSection = () => {
  const truncateText = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
      {blogs.map((item) => {
        return (
          <Link
            href={`/blog/${item.id}`}
            key={item.id}
            className="flex flex-col gap- rounded-[5px] shadow-lg"
          >
            <div className="relative overflow-hidden rounded-t-[5px]">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <Image
                  src={item.image}
                  alt="img"
                  className="rounded-t-[5px] object-cover h-full w-full"
                  height={500}
                  width={500}
                />
              </motion.div>
            </div>

            <div
              className={`${roboto.className} py-3 px-4 flex flex-col gap-2 max-h-[280px]`}
            >
              <h3 className={`text-[18px] font-medium leading-[23px]`}>
                {item.title}
              </h3>
              <h4 className={`text-[14px] leading-[23px]`}>{item.createdAt}</h4>
              <h4 className={`text-[14px] space-x-2`}>
                {truncateText(item.content, 15)}
              </h4>
              <div
                // href={`/blogs/${item.id}`}
                className={`flex gap-1 text-[15px] hover:text-[#941A1A] transition-all duration-500 ease-in-out font-medium items-center`}
              >
                <p>Continue reading</p>
                <RiArrowRightSLine className="h-[20px] w-[20px]" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BlogSection;
