/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Playfair_Display, Roboto } from "next/font/google";
import { team } from "../../utils/team";
import Image from "next/image";
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

// Separate component for each team member card
const TeamMemberCard = ({ item }: any) => {
  const { ref, inView } = useInView({
    // triggerOnce: true,
    threshold: 0.3,
  });

  const cardVariants = {
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
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.3, duration: 0.5 },
    },
    hover: {
      y: -5,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="h-102 md:h-112.5 lg:h-100 relative overflow-hidden rounded-tl-[5px] rounded-tr-[50px] rounded-bl-[50px] rounded-br-[5px] group cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover="hover"
    >
      {/* Image that scales on hover */}
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

      {/* Dark overlay that appears on hover */}
      <motion.div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

      {/* Text overlay */}
      <motion.div
        className={`absolute bottom-8 left-8 flex flex-col text-white ${roboto.className}`}
        variants={textVariants}
        initial="initial"
        animate={inView ? "animate" : "initial"}
      >
        <h3 className="text-[18px] font-medium leading-5.75">{item.name}</h3>
        <h4 className="text-[14px] leading-7.5">{item.role}</h4>
      </motion.div>
    </motion.div>
  );
};

const Team = () => {
  const { ref, inView } = useInView({
    // triggerOnce: true,
    threshold: 0.3,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const leftSideVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  const dividerVariants = {
    hidden: { opacity: 0, scaleY: 0 },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  const rightSideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
        delay: 0.2,
      },
    },
  };

  return (
    <div className="flex flex-col py-20 px-5 md:px-6 gap-20 overflow-hidden">
      {/* Header */}
      <motion.div
        ref={ref}
        className="flex flex-col md:flex-row items-center md:justify-between gap-4"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div
          className="flex flex-col items-center md:items-start gap-8"
          variants={leftSideVariants}
        >
          <motion.div
            className="flex items-center gap-3 text-[15px]"
            variants={badgeVariants}
          >
            <div className="h-3 w-3 rounded-full border-2 border-[#941A1A]"></div>
            <h1>THE TEAM</h1>
          </motion.div>
          <motion.h1
            className={`${playfair.className} text-[34px] md:text-[45px] max-w-156.25 text-center md:text-left`}
            variants={titleVariants}
          >
            Your Trusted Real Estate Partners
          </motion.h1>
        </motion.div>
        <motion.div
          className="hidden md:block w-[0.1rem] h-44 bg-[#941A1A]"
          variants={dividerVariants}
          style={{ originY: 0 }}
        />
        <motion.div
          className="flex justify-center max-w-149.25 text-[18px] md:pl-8"
          variants={rightSideVariants}
        >
          <h3
            className={`${roboto.className} md:leading-7 leading-6.25 max-w-149.25 text-center md:text-left`}
          >
            Whether you&apos;re a first-time buyer exploring your options or a
            seasoned investor seeking strategic advice, our agents are here to
            empower you with knowledge and guide you towards your goals. Here,
            we bring together a network of seasoned professionals.
          </h3>
        </motion.div>
      </motion.div>

      {/* Team Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
        {team.map((item, index) => (
          <TeamMemberCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Team;
