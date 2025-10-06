"use client";
import { Playfair_Display } from "next/font/google";
import { Roboto } from "next/font/google";
import { team } from "../../utils/team";
import Image from "next/image";
import { motion } from "framer-motion";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Team = () => {
  return (
    <div className="flex flex-col py-20 px-5 md:px-6 gap-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
        <div className="flex flex-col items-center md:items-start gap-8">
          <div className="flex items-center gap-3 text-[15px]">
            <div className="h-3 w-3 rounded-full border-2 border-[#941A1A]"></div>
            <h1>THE TEAM</h1>
          </div>
          <h1
            className={`${playfair.className} text-[34px] md:text-[45px] max-w-[625px] text-center md:text-left`}
          >
            Your Trusted Real Estate Partners
          </h1>
        </div>
        <div className="hidden md:block w-[0.1rem] h-44 bg-[#941A1A]"></div>
        <div className="flex justify-center max-w-[597px] text-[18px] md:pl-8">
          <h3
            className={`${roboto.className} md:leading-[28px] leading-[25px] max-w-[597px] text-center md:text-left`}
          >
            Whether you&apos;re a first-time buyer exploring your options or a
            seasoned investor seeking strategic advice, our agents are here to
            empower you with knowledge and guide you towards your goals. Here,
            we bring together a network of seasoned professionals.
          </h3>
        </div>
      </div>

      {/* Team Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {team.map((item) => (
          <div
            key={item.id}
            className="h-[408px] md:h-[450px] lg:h-[400px] relative overflow-hidden rounded-tl-[5px] rounded-tr-[50px] rounded-bl-[50px] rounded-br-[5px]"
          >
            {/* Only the image inside scales */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full w-full"
            >
              <Image
                src={item.image}
                width={601}
                height={400}
                alt="team"
                className="object-cover h-full w-full"
              />
            </motion.div>

            {/* Text overlay stays fixed */}
            <div
              className={`absolute bottom-8 left-8 flex flex-col text-white ${roboto.className}`}
            >
              <h3 className="text-[18px] font-medium leading-[23px]">
                {item.name}
              </h3>
              <h4 className="text-[14px] leading-[30px]">{item.role}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
