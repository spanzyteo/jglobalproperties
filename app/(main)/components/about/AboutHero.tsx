"use client";
import { Playfair_Display, Roboto } from "next/font/google";
import { Parallax } from "react-parallax";
import { easeOut, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const AboutHero = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: easeOut,
      },
    },
  };

  const subtitleVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  const lineVariants = {
    hidden: {
      width: 0,
      opacity: 0,
    },
    visible: {
      width: "80px",
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: easeOut,
        delay: 0.8,
      },
    },
  };

  return (
    <>
      <Parallax
        strength={800}
        bgImage="/about/about-bg.webp"
        bgImageStyle={{
          objectFit: "cover",
          objectPosition: "center",
          width: "100%",
          height: "100%",
        }}
        className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[600px]"
      >
        {/* Animated overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-[#111111]/60 via-[#111111]/70 to-[#111111]/80 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          ref={ref}
          className="relative z-10 flex flex-col items-center justify-center h-full min-h-[500px] md:min-h-[600px] lg:min-h-[600px] text-white gap-6 px-5"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Decorative line top */}
          <motion.div
            className="h-[2px] bg-[#941A1A]"
            variants={lineVariants}
          />

          {/* Main title with word animation */}
          <motion.h1
            className={`${playfair.className} text-[31px] md:text-[55px] lg:text-[65px] leading-[38px] md:leading-[60px] lg:leading-[71px] text-center max-w-[90%] md:max-w-[80%]`}
            variants={titleVariants}
          >
            {["About", "Jglobalproperties"].map((word, wordIndex) => (
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + wordIndex * 0.2,
                  ease: "easeOut",
                }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.h3
            className={`${roboto.className} text-[19px] leading-[23px] md:leading-[30px] text-center max-w-[285px] md:max-w-[400px] font-normal`}
            variants={subtitleVariants}
          >
            Get To Know Our Talented Real Estate Team
          </motion.h3>

          {/* Decorative line bottom */}
          <motion.div
            className="h-[2px] bg-[#941A1A]"
            variants={lineVariants}
          />

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.2,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 0.3,
            }}
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
              <motion.div
                className="w-1 h-2 bg-white rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </Parallax>
    </>
  );
};

export default AboutHero;
