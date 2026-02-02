"use client";

import Image from "next/image";
import { RiArrowRightSLine } from "react-icons/ri";
import { motion, easeOut } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { FormattedBlog } from "../../features/blogs";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface BlogCardProps {
  blog: FormattedBlog;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, index }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: easeOut, delay: index * 0.1 },
    },
  };

  const categoryVariants = {
    initial: { x: -100, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { delay: 0.3, duration: 0.5 },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3 } }}
      className="flex flex-col rounded-[5px] shadow-lg overflow-hidden bg-white cursor-pointer h-full"
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-sm h-50">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full"
        >
          <Image
            src={blog.image}
            alt={blog.title}
            className="object-cover w-full h-full"
            width={500}
            height={200}
            priority={index < 4}
            quality={75}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
          />
        </motion.div>

        {/* Category Badge */}
        {blog.category && (
          <motion.div
            className={`${roboto.className} absolute top-4 left-4 text-white bg-[#941A1A] py-1 px-3 text-xs rounded-sm`}
            variants={categoryVariants}
            initial="initial"
            animate={inView ? "animate" : "initial"}
          >
            {blog.category}
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className={`${roboto.className} py-3 px-4 flex flex-col gap-2 grow`}>
        <h3 className="text-base font-medium leading-6 line-clamp-2">
          {blog.title}
        </h3>
        <h4 className="text-sm text-gray-500">{blog.date}</h4>
        <p className="text-sm text-gray-700 leading-6 line-clamp-3 grow">
          {blog.excerpt}
        </p>

        <div className="flex gap-1 text-sm hover:text-[#941A1A] transition-all duration-500 ease-in-out font-medium items-center mt-auto">
          <p>Continue reading</p>
          <RiArrowRightSLine className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
