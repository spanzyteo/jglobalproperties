"use client";
import { Playfair_Display, Roboto } from "next/font/google";
import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import blogs from "../../utils/blogs";
import { setCurrentBlog } from "../../store/blogSlice";
import { FaCalendarAlt, FaTag } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";
import { motion } from "framer-motion";

interface BlogHeroProps {
  currentBlogId: string | string[];
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const BlogIdContent = ({ currentBlogId }: BlogHeroProps) => {
  const dispatch = useAppDispatch();
  const blog = useAppSelector((state) => state.blogs.currentBlog);

  useEffect(() => {
    const filteredBlog = blogs.find(
      (item) => item.id.toString() === currentBlogId.toString()
    );
    if (filteredBlog) {
      dispatch(setCurrentBlog(filteredBlog));
    }
  }, [currentBlogId, dispatch]);

  //Find similar blogs based on category (excluding current)
  const similarBlogs = useMemo(() => {
    if (!blog) return [];
    return blogs.filter(
      (item) => item.category === blog.category && item.id !== blog.id
    );
  }, [blog]);

  const truncateText = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  return (
    <div className="flex flex-col gap-6 w-full lg:max-w-[873px]">
      <div
        className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-10 py-12 px-6 shadow-sm`}
      >
        <h1
          className={`${playfair.className} text-[34px] font-medium leading-[44px]`}
        >
          {blog?.title}
        </h1>
        <div className="flex flex-col md:flex-row gap-1 md:gap-4 items-start md:items-center">
          <div className="flex items-center gap-2">
            <FaCalendarAlt />
            <h3 className="text-[13px] leading-[23px] mt-1">
              Posted on {blog?.createdAt}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <FaTag />
            <h3 className="text-[13px] leading-[23px] mt-1">
              {blog?.category}
            </h3>
          </div>
        </div>
        <Image
          src={blog?.image || "/house-bg.webp"}
          alt={blog?.title || "Blog image"}
          width={819}
          height={819}
          className="w-[819px] rounded-[5px] object-cover"
        />
        <p className="text-[14px] leading-[23px]">{blog?.content}</p>
      </div>

      {/* Form for comment */}
      <div
        className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-5 py-12 px-6 shadow-sm`}
      >
        <h2 className="text-[18px] font-medium leading-[23px]">
          Leave a Reply
        </h2>
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
          <textarea
            className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
            rows={7}
          ></textarea>
          <button className="bg-black rounded-[5px] text-white w-full md:w-[139px] py-3 font-medium hover:bg-white hover:border hover:text-black transition-all duration-500 ease-in-out cursor-pointer">
            Post Comment
          </button>
        </form>
      </div>

      {/* Similar blogs */}
      {similarBlogs.length > 0 && (
        <div className={`${roboto.className} flex flex-col gap-4`}>
          <h1 className="text-[24px] font-medium leading-[31px]">
            Related Posts
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {similarBlogs.slice(0, 2).map((item) => {
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
                    <h4 className={`text-[14px] leading-[23px]`}>
                      {item.createdAt}
                    </h4>
                    <h4 className={`text-[14px] space-x-2`}>
                      {truncateText(item.content, 15)}
                    </h4>
                    <div
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
        </div>
      )}
    </div>
  );
};

export default BlogIdContent;
