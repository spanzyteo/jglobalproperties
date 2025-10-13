'use client'
import { notFound, useParams } from "next/navigation";
import BlogIdHero from "../../components/blogId/BlogIdHero";
import BlogIdContent from "../../components/blogId/BlogIdContent";
import ContactSection2 from "../../components/contact/ContactSection2";

const BlogId = () => {
  const { id: blogId } = useParams()
  console.log(`BlogId: ${blogId}`)

  // If blog not found, show 404
  if (!blogId) {
    notFound();
  }
  return (
    <>
      <BlogIdHero currentBlogId={blogId} />
      <div className="bg-[#fffcfc] px-4 md:px-8 py-8 flex flex-col md:flex-row gap-4">
        <BlogIdContent currentBlogId={blogId} />
        <ContactSection2 />
      </div>
    </>
  );
};

export default BlogId;
