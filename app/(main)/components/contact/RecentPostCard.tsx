"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useHomepageBlogs } from "../../features/blogs/hooks";

const RecentPostCard = ({ roboto, cardVariants, listItemVariants }: any) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const { blogs, loading } = useHomepageBlogs(5);

  return (
    <motion.div
      ref={ref}
      className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-4 py-12 px-6 shadow-sm`}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="font-medium leading-6.25 text-[28px]">Recent Posts</h1>
      <div className="flex flex-col gap-3">
        {loading ? (
          <div className="flex flex-col gap-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"
              />
            ))}
          </div>
        ) : (
          blogs.slice(0, 5).map((item: any, index: number) => (
            <motion.a
              href={`/blog/${item.slug}`}
              key={item.id}
              custom={index}
              variants={listItemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover={{
                x: 5,
                color: "#941A1A",
                transition: { duration: 0.3 },
              }}
              className="cursor-pointer"
            >
              <h4 className="text-[13px]">{item.title}</h4>
            </motion.a>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default RecentPostCard;
