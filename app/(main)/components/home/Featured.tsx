import { Playfair_Display } from "next/font/google";
import { Roboto } from "next/font/google";
import houses from "../../utils/houses";
import Image from "next/image";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Featured = () => {
  return (
    <div className="py-20 px-5 md:px-6 flex flex-col">
      <div className="flex flex-col items-center md:items-start gap-2">
        <div className="flex items-center gap-3 text-[15px]">
          <div className="h-3 w-3 rounded-full border-2 border-[#941A1A]"></div>
          <h1>EXCLUSIVE</h1>
        </div>
        <h1
          className={`${playfair.className} text-[34px] md:text-[45px] max-w-[625px] text-center md:text-left`}
        >
          Featured Properties
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
        {houses.map((item) => {
          const firstImage = item.image[0];
          return (
            <div
              key={item.id}
              className="flex flex-col gap- rounded-[5px] shadow-lg"
            >
              {firstImage && (
                <div className="relative">
                  <Image
                    src={firstImage.url}
                    alt="img"
                    className="rounded-t-[5px] object-cover h-full w-full"
                    height={500}
                    width={500}
                  />
                  <div className={`${roboto} absolute top-4 left-4 text-white bg-[#941A1A] py-[0.1rem] px-2 text-[12px] rounded-[4px]`}>
                    Featured
                  </div>
                </div>
              )}
              <div className="py-3 pl-4 flex flex-col gap-2 h-[100px]">
                <h3 className="text-[18px] font-medium leading-[23px]">
                  {item.title}
                </h3>
                <h4 className={`${roboto} text-[14px] leading-[23px]`}>
                  {item.category}
                </h4>
              </div>
              <div className="flex items-center justify-between px-4 border-t border-t-gray-200 ">
                <h2 className="text-[18px] font-medium leading-[18.2px]">
                  ₦{item.price.toLocaleString()}
                </h2>
                <div className="p-[10px] border-l border-l-gray-200">
                  <Image
                    src={"/joan.png"}
                    alt="ceo"
                    height={40}
                    width={40}
                    className="rounded-[5px]"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Link href={'/properties/houses'} className={`${roboto} py-2 px-4 bg-black text-white rounded-[5px] mx-auto mt-10 text-[15px] hover:opacity-85 transition-all duration-500 ease-in-out font-medium`}>Load More Listings</Link>
    </div>
  );
};

export default Featured;
