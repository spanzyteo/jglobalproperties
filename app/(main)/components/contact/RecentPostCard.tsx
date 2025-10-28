/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const RecentPostCard = ({
  blogs,
  roboto,
  cardVariants,
  listItemVariants,
}: any) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
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
      <h1 className="font-medium leading-[25px] text-[28px]">Recent Posts</h1>
      <div className="flex flex-col gap-3">
        {blogs.slice(0, 5).map((item: any, index: number) => (
          <motion.a
            href={`/blog/${item.id}`}
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
        ))}
      </div>
    </motion.div>
  );
};

export default RecentPostCard;
