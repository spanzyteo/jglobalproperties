"use client";
import { Playfair_Display, Roboto } from "next/font/google";
import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaTag } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { getBlogBySlug, getBlogs } from "../../features/blogs";
import { useSubmitBlogComment } from "../../features/blogs/comments";
import type { FormattedBlog } from "../../features/blogs";

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
  const [blog, setBlog] = useState<FormattedBlog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<FormattedBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });
  const { loading: submitting, submitComment } = useSubmitBlogComment();

  useEffect(() => {
    const fetchBlogAndRelated = async () => {
      try {
        setLoading(true);
        const slug = Array.isArray(currentBlogId)
          ? currentBlogId[0]
          : currentBlogId;

        // Fetch current blog
        const blogData = await getBlogBySlug(slug);
        setBlog(blogData);

        // Fetch related blogs (first page with 10 posts to find related ones)
        if (blogData) {
          const { blogs: allBlogs } = await getBlogs(1, 10);
          const related = allBlogs.filter(
            (item) =>
              item.categories &&
              blogData.categories &&
              item.categories.some((cat) =>
                blogData.categories?.includes(cat),
              ) &&
              item.id !== blogData.id,
          );
          setRelatedBlogs(related.slice(0, 2));
        }
      } catch (error) {
        console.error("Failed to fetch blog:", error);
        setBlog(null);
        setRelatedBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    if (currentBlogId) {
      fetchBlogAndRelated();
    }
  }, [currentBlogId]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("📝 Form submitted");

    // Validation
    if (!formData.name.trim()) {
      console.warn("Name validation failed");
      toast.error("Please enter your name");
      return;
    }
    if (!formData.email.trim()) {
      console.warn("Email validation failed - empty");
      toast.error("Please enter your email");
      return;
    }
    if (!formData.email.includes("@")) {
      console.warn("Email validation failed - invalid format");
      toast.error("Please enter a valid email");
      return;
    }
    if (!formData.comment.trim()) {
      console.warn("Comment validation failed");
      toast.error("Please enter a comment");
      return;
    }

    if (!blog) {
      console.error("Blog is null");
      toast.error("Blog not found");
      return;
    }

    console.log("✓ All validations passed, preparing payload...");
    console.log("Blog ID:", blog.id, "Type:", typeof blog.id);

    try {
      console.log("🚀 Sending comment to API...");
      const payload = {
        post: blog.id,
        author_name: formData.name.trim(),
        author_email: formData.email.trim(),
        content: formData.comment.trim(),
      };
      console.log("📦 Comment payload:", payload);

      const result = await submitComment(payload);

      console.log("✅ Comment submitted successfully:", result);
      toast.success(
        "Comment posted successfully! It will appear after moderation.",
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        comment: "",
      });
    } catch (error) {
      console.error("❌ Form submission error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to post comment. Please try again.";
      console.error("Error message to display:", errorMessage);
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6 w-full lg:max-w-218.25">
        <div
          className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-10 py-12 px-6 shadow-sm`}
        >
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col gap-6 w-full lg:max-w-218.25">
        <div
          className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-10 py-12 px-6 shadow-sm text-center text-gray-500`}
        >
          Blog not found
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full lg:w-[70%] mt-28 md:mt-0">
      <div
        className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-10 py-12 px-6 shadow-sm`}
      >
        <h1
          className={`${playfair.className} text-[34px] font-medium leading-11`}
        >
          {blog.title}
        </h1>
        <div className="flex flex-col md:flex-row gap-1 md:gap-4 items-start md:items-center">
          <div className="flex items-center gap-2">
            <FaCalendarAlt />
            <h3 className="text-[13px] leading-5.75 mt-1">
              Posted on {blog.date}
            </h3>
          </div>
          {blog.category && (
            <div className="flex items-center gap-2">
              <FaTag />
              <h3 className="text-[13px] leading-5.75 mt-1">{blog.category}</h3>
            </div>
          )}
        </div>
        <Image
          src={blog.image}
          alt={blog.title}
          width={819}
          height={409}
          className="w-full rounded-[5px] object-cover"
          quality={75}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 873px"
        />
        <div
          className="prose prose-sm max-w-none text-[14px] leading-7 text-gray-700"
          dangerouslySetInnerHTML={{ __html: blog.fullContent }}
        />
      </div>

      {/* Form for comment */}
      <div
        className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-5 py-12 px-6 shadow-sm`}
      >
        <h2 className="text-[18px] font-medium leading-5.75">Leave a Reply</h2>
        <form
          onSubmit={handleSubmitComment}
          className="flex flex-col gap-3 w-full text-[14px]"
        >
          <div className="flex flex-col md:flex-row md:justify-between gap-3 w-full">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleFormChange}
              disabled={submitting}
              className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out disabled:opacity-50"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleFormChange}
              disabled={submitting}
              className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out disabled:opacity-50"
            />
            <input
              type="text"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleFormChange}
              disabled={submitting}
              className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out disabled:opacity-50"
            />
          </div>
          <textarea
            name="comment"
            placeholder="Leave your comment here..."
            value={formData.comment}
            onChange={handleFormChange}
            disabled={submitting}
            className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out disabled:opacity-50"
            rows={7}
          ></textarea>
          <button
            type="submit"
            disabled={submitting}
            className="bg-black rounded-[5px] text-white w-full md:w-34.75 py-3 font-medium hover:bg-white hover:border hover:text-black transition-all duration-500 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      </div>

      {/* Related blogs */}
      {relatedBlogs.length > 0 && (
        <div className={`${roboto.className} flex flex-col gap-4`}>
          <h1 className="text-[24px] font-medium leading-7.75">
            Related Posts
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {relatedBlogs.map((item) => {
              return (
                <Link
                  href={`/blog/${item.slug}`}
                  key={item.id}
                  className="flex flex-col gap-0 rounded-[5px] shadow-lg overflow-hidden"
                >
                  <div className="relative overflow-hidden rounded-t-[5px]">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        className="rounded-t-[5px] object-cover h-full w-full"
                        height={300}
                        width={400}
                        quality={75}
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </motion.div>
                  </div>

                  <div
                    className={`${roboto.className} py-3 px-4 flex flex-col gap-2 bg-white`}
                  >
                    <h3
                      className={`text-[18px] font-medium leading-5.75 line-clamp-2`}
                    >
                      {item.title}
                    </h3>
                    <h4 className={`text-[13px] text-gray-500`}>{item.date}</h4>
                    <h4
                      className={`text-[14px] leading-5.5 text-gray-700 line-clamp-2`}
                    >
                      {item.excerpt}
                    </h4>
                    <div
                      className={`flex gap-1 text-[15px] hover:text-[#941A1A] transition-all duration-500 ease-in-out font-medium items-center`}
                    >
                      <p>Continue reading</p>
                      <RiArrowRightSLine className="h-5 w-5" />
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
