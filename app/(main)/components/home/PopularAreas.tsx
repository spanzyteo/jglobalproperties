import { Playfair_Display, Roboto, Bodoni_Moda } from "next/font/google";
import Link from "next/link";
import { popular } from "../../utils/popular";
import Image from "next/image";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const PopularAreas = () => {
  return (
    <div className="py-20 px-5 md:px-6 bg-black flex flex-col lg:flex-row gap-4 justify-between">
      <div className="flex flex-col items-center md:items-start gap-8 text-white">
        <div className="flex items-center gap-3 text-[15px]">
          <div className="h-3 w-3 rounded-full border-2 border-[#941A1A]"></div>
          <h1>EXCLUSIVE</h1>
        </div>
        <h1
          className={`${playfair.className} text-[34px] md:text-[45px] max-w-[625px] text-center md:text-left`}
        >
          Popular Areas
        </h1>
        <p
          className={`${roboto.className} max-w-[480px] text-[18px] leading-[32px] text-center md:text-left`}
        >
          Our dynamic approach and tireless commitment to facilitating
          transactions for buyers and sellers sets us apart.
          <br />
          Across Nigeria&apos;s thriving cities and emerging neighborhoods, we
          are trusted by residents, property developers, local businesses, and
          real estate professionals for our expertise and dedication to
          excellence.
        </p>
        <Link
          href={"/contact"}
          className="text-[18px] leading-[32px] text-[#FF6725C9] hover:underline"
        >
          Contact Us
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        {popular.map((item) => (
          <div key={item.id} className="relative">
            <Image
              alt="popular"
              src={item.image}
              height={480}
              width={600}
              className="h-[260px] md:h-[480px] w-full md:max-w-[270px] object-cover rounded-tl-[5px] rounded-tr-[50px] rounded-bl-[50px] rounded-br-[5px] relative bg-no-repeat bg-center"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/25 z-0" />
            <h3
              className={`${bodoni.className} absolute inset-0 flex items-center justify-center text-center font-semibold text-[18px] text-white z-10`}
            >
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularAreas;
