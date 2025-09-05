"use client";
import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";

const About = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef(null);
  const videoSectionRef = useRef(null);

  // Check if section is in view for animations
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Check if video section is in view for autoplay
  const isVideoInView = useInView(videoSectionRef, {
    once: false,
    amount: 0.5,
  });

  // Handle video play/pause based on visibility
  useEffect(() => {
    if (videoRef.current) {
      if (isVideoInView) {
        videoRef.current.play().catch((error) => {
          console.log("Auto-play was prevented:", error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVideoInView]);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const videoVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.9,
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: [0.42, 0, 0.58, 1],
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  return (
    <motion.div
      ref={sectionRef}
      className="flex flex-col gap-[3.25rem] pt-[3rem] lg:pt-[9.13rem] px-[2rem] lg:px-[11.19rem] bg-gray-50 pb-[3rem] lg:pb-[5rem]"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-6">
          <motion.h1
            className="text-[1.5rem] lg:text-[3rem] font-bold text-center leading-[1.75rem] lg:leading-[3.25rem]"
            variants={itemVariants}
          >
            About JGLOBAL Properties
          </motion.h1>
          <motion.p
            className="max-w-[67.625rem] text-[#616161] text-[1rem] lg:text-[1.5rem] font-normal lg:leading-[1.75rem] leading-[1.25rem] text-justify"
            variants={itemVariants}
          >
            Jglobal Properties is guided by a clear vision to help individuals
            identify and leverage the opportunities in the real estate market
            significantly to increase their cash flow while providing extensive
            support in navigating the complexities of the real estate market.
            Our approach is centered around personalized strategies, as we
            prioritize understanding your unique needs and goals, recognizing
            that each client&apos;s investment objectives are distinct.
          </motion.p>
        </div>
        <motion.button
          className="flex items-center justify-center lg:py-4 py-3 lg:px-8 px-6 rounded-[0.5rem] bg-[#941A1A] text-white cursor-pointer"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <p className="text-[0.875rem] lg:text-[1rem] font-medium leading-[1.125rem] lg:leading-[1.25rem]">
            Learn More
          </p>
        </motion.button>
      </div>

      <motion.div
        ref={videoSectionRef}
        variants={videoVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <video
          ref={videoRef}
          controls
          muted
          playsInline
          src="/ceo.mp4"
          className="rounded-[1.25rem] lg:rounded-[2.8125rem] h-[12.31131rem] lg:h-[38.27831rem] video-class object-cover w-full"
        />
      </motion.div>
    </motion.div>
  );
};

export default About;
