import React from 'react'
import { info } from '../../utils/info';
import Image from 'next/image';
import { Playfair_Display } from "next/font/google";
import { Roboto } from "next/font/google";
import Link from 'next/link';
import { GoArrowRight } from 'react-icons/go';

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Info = () => {
  return (
    <div className="px-5 md:px-6 grid md:grid-cols-3 grid-cols-1 gap-4 pb-10">
      {info.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center md:items-start gap-6"
        >
          <div className="h-[260px] md:h-[480px] w-full ">
            <Image
              src={item.image}
              alt="image"
              height={480}
              width={413}
              className="h-full w-full object-cover bg-no-repeat bg-center rounded-tr-[50px] rounded-tl-[5px] rounded-br-[5px] rounded-bl-[50px]"
            />
          </div>
          <h2
            className={`${playfair.className} text-[30px] font-medium leading-[36px]`}
          >
            {item.name}
          </h2>
          <p
            className={`${roboto.className} text-[18px] leading-[21px] md:leading-[27px] text-center md:text-left`}
          >
            {item.description}
          </p>
          <Link
            href={item.link}
            className="flex items-center gap-2 hover:text-[#941A1A] transition-colors duration-500 ease-in-out"
          >
            <p className={`${roboto.className}`}>Read More</p>
            <GoArrowRight />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Info