"use client";

import Link from "next/link";
import React from "react";
import BlogCard from "./BlogCard";
import BlogSkeleton from "../skeletons/BlogSkeleton";
import { useHomepageBlogs } from "../../features/blogs";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const BlogsSection: React.FC = () => {
  const { blogs, loading, error } = useHomepageBlogs(8);

  if (error) {
    return (
      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-[5px] text-red-700">
        Failed to load blogs. Please try again later.
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <BlogSkeleton count={8} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <Link href={`/blog/${blog.slug}`} key={blog.id}>
                <BlogCard blog={blog} index={index} />
              </Link>
            ))
          ) : (
            <div
              className={`${roboto.className} col-span-full text-center py-8 text-gray-500`}
            >
              No blogs available at the moment.
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BlogsSection;
