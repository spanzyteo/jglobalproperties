import { Playfair_Display, Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import blogs from "../../utils/blogs";
import { RiArrowRightSLine } from "react-icons/ri";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const truncateText = (text: string, maxWords: number) => {
  const words = text.split(" ");
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
};

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
        {blogs.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col gap- rounded-[5px] shadow-lg"
            >
              <div className="relative">
                <Image
                  src={item.image}
                  alt="img"
                  className="rounded-t-[5px] object-cover h-full w-full"
                  height={500}
                  width={500}
                />
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
                <Link
                  href={`/blogs/${item.id}`}
                  className={`flex gap-1 text-[15px] hover:text-[#941A1A] transition-all duration-500 ease-in-out font-medium items-center`}
                >
                  <p>Continue reading</p>
                  <RiArrowRightSLine className="h-[20px] w-[20px]" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
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
