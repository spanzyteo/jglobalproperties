import { Playfair_Display } from "next/font/google";
import BlogSection from "../Blogs";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const BlogBody = () => {
  return (
    <div className="px-4 md:px-8 py-12 flex flex-col gap-4">
      <h1 className={`${playfair.className} text-[34px] font-medium leading-[44px]`}>Blog List</h1>
      <BlogSection />
    </div>
  );
}

export default BlogBody