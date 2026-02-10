import { Playfair_Display, Roboto } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Contact = () => {
  return (
    <div className="relative py-20 flex flex-col items-center gap-6 px-10 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url(/contact-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Overlay with bottom gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/50 to-black/80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="flex items-center gap-3 text-[15px] text-white">
          <div className="h-3 w-3 rounded-full border-2 border-[#941A1A]"></div>
          <h1 className={`${roboto.className}`}>CONTACT US</h1>
        </div>
        <h1
          className={`text-white text-[34px] md:text-[65px] ${playfair.className} max-w-61.25 md:max-w-130 leading-8.5 md:leading-17.75 text-center`}
        >
          Are you looking to buy a home?
        </h1>
        <p
          className={`${roboto.className} text-white max-w-130 text-center text-[18px]`}
        >
          Explore Nigeria&apos;s finest real estate opportunities across Lagos,
          Abuja, Port Harcourt and beyond. Discover your dream home in one of
          Africa&apos;s most vibrant and rapidly growing property markets.
        </p>

        <Link
          href={"/contact"}
          className={`${roboto.className} py-3 px-7 bg-white rounded-[5px] mx-auto mt-10 text-[15px] hover:opacity-80 transition-all duration-500 ease-in-out font-medium`}
        >
          Contact Us Today
        </Link>
      </div>
    </div>
  );
};

export default Contact;
