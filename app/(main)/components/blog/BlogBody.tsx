"use client";

import { Playfair_Display, Roboto } from "next/font/google";
import Link from "next/link";
import React from "react";
import BlogSkeleton from "../skeletons/BlogSkeleton";
import { usePaginatedBlogs } from "../../features/blogs";
import BlogCard from "../blogs/BlogCard";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ITEMS_PER_PAGE = 8;

const BlogBody: React.FC = () => {
  const { blogs, loading, error, currentPage, totalPages, goToPage } =
    usePaginatedBlogs(ITEMS_PER_PAGE);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  if (error) {
    return (
      <div className="px-4 md:px-8 py-12 flex flex-col gap-4">
        <h1 className={`${playfair.className} text-3xl font-medium leading-11`}>
          Blog List
        </h1>
        <div className="p-4 bg-red-50 border border-red-200 rounded-sm text-red-700">
          Failed to load blogs. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-12 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1
          className={`${playfair.className} text-3xl md:text-4xl font-medium leading-11 md:leading-13.75`}
        >
          Blog List
        </h1>
        <p className={`${roboto.className} text-gray-600`}>
          Read the latest articles and insights about real estate
        </p>
      </div>

      {/* Blogs Grid */}
      {loading ? (
        <BlogSkeleton count={ITEMS_PER_PAGE} />
      ) : (
        <>
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {blogs.map((blog, index) => (
                <Link href={`/blog/${blog.slug}`} key={blog.id}>
                  <BlogCard blog={blog} index={index} />
                </Link>
              ))}
            </div>
          ) : (
            <div
              className={`${roboto.className} col-span-full text-center py-12 text-gray-500`}
            >
              No blogs available at the moment.
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-6 mt-8">
              {/* Page Info */}
              <p className={`${roboto.className} text-gray-600 text-[14px]`}>
                Page {currentPage} of {totalPages}
              </p>

              {/* Pagination Controls */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                {/* Previous Button */}
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`${roboto.className} flex items-center gap-1 px-3 py-2 rounded-[5px] border transition-all duration-300 ${
                    currentPage === 1
                      ? "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
                  }`}
                  aria-label="Previous page"
                >
                  <span>&larr;</span>
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {generatePageNumbers().map((page, index) => (
                    <React.Fragment key={`${page}-${index}`}>
                      {page === "..." ? (
                        <span
                          className={`${roboto.className} px-2 text-gray-500`}
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          onClick={() => goToPage(page as number)}
                          className={`${roboto.className} w-9 h-9 rounded-[5px] transition-all duration-300 text-[14px] font-medium ${
                            currentPage === page
                              ? "bg-[#941A1A] text-white"
                              : "border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
                          }`}
                          aria-label={`Go to page ${page}`}
                          aria-current={
                            currentPage === page ? "page" : undefined
                          }
                        >
                          {page}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`${roboto.className} flex items-center gap-1 px-3 py-2 rounded-[5px] border transition-all duration-300 ${
                    currentPage === totalPages
                      ? "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
                  }`}
                  aria-label="Next page"
                >
                  <span className="hidden sm:inline">Next</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BlogBody;
