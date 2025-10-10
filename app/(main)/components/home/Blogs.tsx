import { Playfair_Display, Roboto } from "next/font/google";
import Link from "next/link";
import BlogSection from "../Blogs";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Blogs = () => {
  return (
    <div className="py-20 px-5 md:px-6 flex flex-col">
      <div className="flex flex-col items-center md:items-start gap-2">
        <div className="flex items-center gap-3 text-[15px]">
          <div className="h-3 w-3 rounded-full border-2 border-[#941A1A]"></div>
          <h1 className={`${roboto.className}`}>News</h1>
        </div>
        <h1
          className={`${playfair.className} text-[34px] md:text-[45px] max-w-[625px] text-center md:text-left`}
        >
          Our Blog
        </h1>
      </div>
      {/* Blogs */}
      <BlogSection />
      <Link
        href={"/blogs"}
        className={`${roboto} py-2 px-7 bg-black text-white rounded-[5px] mx-auto mt-10 text-[15px] hover:bg-white hover:border hover:text-black transition-all duration-500 ease-in-out font-medium`}
      >
        Load Articles
      </Link>
    </div>
  );
};

export default Blogs;
