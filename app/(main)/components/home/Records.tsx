/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Playfair_Display, Roboto_Slab } from "next/font/google";
import { motion, useMotionValue, useTransform, animate, easeOut } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Counter animation component
const Counter = ({
  value,
  suffix = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const { ref, inView } = useInView({
    // triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration });
      return controls.stop;
    }
  }, [inView, count, value, duration]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

// Individual stat card component
const StatCard = ({ number, suffix, description, index }: any) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: easeOut,
      },
    },
  };

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.2 + 0.3,
        ease: easeOut,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2 + 0.5,
        ease: easeOut,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-2 items-center md:items-start"
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
    >
      <motion.h2
        className={`${playfair.className} text-[37px] font-medium leading-[56px]`}
        variants={numberVariants}
      >
        <Counter value={number} suffix={suffix} duration={2} />
      </motion.h2>
      <motion.p
        className={`${robotoSlab.className} text-[14px] leading-[35px] uppercase text-center md:text-left`}
        variants={textVariants}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

// Divider component with animation
const AnimatedDivider = ({ index }: { index: number }) => {
  const { ref, inView } = useInView({
    // triggerOnce: true,
    threshold: 0.5,
  });

  const dividerVariants = {
    hidden: { opacity: 0, scaleY: 0 },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.2,
        ease: easeOut,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="hidden md:block w-[0.05rem] h-44 bg-[#941A1A]"
      variants={dividerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ originY: 0 }}
    />
  );
};

const Records = () => {
  const stats = [
    {
      number: 500,
      suffix: "+",
      description: "Active properties listed across Nigeria",
    },
    {
      number: 99,
      suffix: "%",
      description: "User satisfaction with our services",
    },
    { number: 50, suffix: "+", description: "Consultations booked each month" },
  ];

  return (
    <div className="flex flex-col md:flex-row py-5 md:py-10 px-5 md:px-6 gap-4 md:gap-8 md:justify-between items-center">
      <AnimatedDivider index={0} />

      {stats.map((stat, index) => (
        <div key={index} className="flex items-center gap-4 md:gap-8">
          <StatCard
            number={stat.number}
            suffix={stat.suffix}
            description={stat.description}
            index={index}
          />
          {index < stats.length - 1 && <AnimatedDivider index={index + 1} />}
        </div>
      ))}

      <AnimatedDivider index={stats.length} />
    </div>
  );
};

export default Records;
