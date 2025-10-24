"use client";

import { easeOut, motion } from "framer-motion";
import { Playfair_Display, Roboto, Roboto_Slab } from "next/font/google";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const WithUs = () => {
  const { ref: textRef, inView: textInView } = useInView({
    // triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: desktopImageRef, inView: desktopImageInView } = useInView({
    // triggerOnce: true,
    threshold: 0.3,
  });

  const { ref: mobileImageRef, inView: mobileImageInView } = useInView({
    // triggerOnce: true,
    threshold: 0.3,
  });

  const textVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: easeOut, delay: 0.3 },
    },
  };

  const mobileTextVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: easeOut },
    }),
  };

  const mobileImageVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  return (
    <div className="py-20 px-5 md:px-6 flex flex-col md:flex-row items-center md:justify-between gap-8 bg-gray-50 overflow-hidden">
      {/* TEXT SECTION */}
      <motion.div
        ref={textRef}
        className="flex flex-col items-center md:items-start gap-8"
        variants={textVariants}
        initial="hidden"
        animate={textInView ? "visible" : "hidden"}
      >
        <motion.div
          variants={mobileTextVariants}
          custom={0}
          initial="hidden"
          animate={textInView ? "visible" : "hidden"}
          className="flex items-center gap-3 text-[15px]"
        >
          <div className="h-3 w-3 rounded-full border-2 border-[#941A1A]"></div>
          <h1>WHY WORK WITH US</h1>
        </motion.div>

        <motion.h1
          variants={mobileTextVariants}
          custom={1}
          initial="hidden"
          animate={textInView ? "visible" : "hidden"}
          className={`${playfair.className} text-[34px] md:text-[45px] max-w-[625px] text-center md:text-left`}
        >
          Your Trusted Real Estate Partner
        </motion.h1>

        <motion.p
          variants={mobileTextVariants}
          custom={2}
          initial="hidden"
          animate={textInView ? "visible" : "hidden"}
          className={`${roboto.className} max-w-[650px] text-[18px] leading-[32px] text-center md:text-left`}
        >
          From start to finish, Jglobalsproperties made the entire process
          smooth and stress-free. Their expertise and guidance were invaluable,
          and we highly recommend them to anyone in need of real estate
          services. With her years of experience, impressive property portfolio,
          celebrity clientele, and unparalleled knowledge of the market and
          pedigree estates.
        </motion.p>

        <motion.div
          variants={mobileTextVariants}
          custom={3}
          initial="hidden"
          animate={textInView ? "visible" : "hidden"}
          className="flex items-center gap-4"
        >
          <Image
            src={"/ceo.jpg"}
            alt="ceo"
            height={60}
            width={60}
            className="h-[60px] w-[60px] object-cover rounded-full"
          />
          <div className="flex flex-col">
            <h3
              className={`${playfair.className} text-[18px] font-medium leading-[27px]`}
            >
              Joan Obi-Okuhon
            </h3>
            <h3
              className={`${robotoSlab.className} text-[#941A1A] leading-[31px] text-[15px]`}
            >
              CEO, Jglobalproperties
            </h3>
          </div>
        </motion.div>
      </motion.div>

      {/* DESKTOP IMAGE SECTION */}
      <motion.div
        ref={desktopImageRef}
        className="hidden md:block lg:h-[546px] md:h-[503px] lg:w-[520px]"
        variants={imageVariants}
        initial="hidden"
        animate={desktopImageInView ? "visible" : "hidden"}
      >
        <Image
          src={"/ceo.jpg"}
          alt="ceo"
          width={520}
          height={546}
          className="bg-[#F4E8E8] h-full w-full object-cover rounded-tr-[5px] rounded-tl-[50px] rounded-br-[50px] rounded-bl-[5px]"
        />
      </motion.div>

      {/* MOBILE IMAGE SECTION */}
      <motion.div
        ref={mobileImageRef}
        className="block md:hidden h-[452px] sm:h-[700px] w-full"
        variants={mobileImageVariants}
        initial="hidden"
        animate={mobileImageInView ? "visible" : "hidden"}
      >
        <Image
          src={"/ceo.jpg"}
          alt="ceo"
          width={520}
          height={546}
          className="bg-[#F4E8E8] h-full w-full object-cover rounded-tr-[5px] rounded-tl-[50px] rounded-br-[50px] rounded-bl-[5px]"
        />
      </motion.div>
    </div>
  );
};

export default WithUs;
