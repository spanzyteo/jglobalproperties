
"use client";

import { Roboto } from "next/font/google";
import ContactSection2 from "./ContactSection2";
import ContactForm from "./ContactForm";
import CompanyInfo from "./CompanyInfo";
import { easeOut, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ContactBody = () => {
  const { ref: leftRef, inView: leftInView } = useInView({
    threshold: 0.1,
  });

  const { ref: rightRef, inView: rightInView } = useInView({
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  return (
    <div className="bg-[#fffcfc] px-4 md:px-8 py-8 flex flex-col md:flex-row gap-4 overflow-hidden">
      <motion.div
        ref={leftRef}
        className={`${roboto.className} flex flex-col gap-6 w-full lg:max-w-218.25`}
        variants={containerVariants}
        initial="hidden"
        animate={leftInView ? "visible" : "hidden"}
      >
        {/* Company Info */}
        <motion.div variants={cardVariants}>
          <CompanyInfo />
        </motion.div>

        {/* Contact Form */}
        <motion.div variants={cardVariants}>
          <ContactForm />
        </motion.div>
      </motion.div>

      <motion.div
        ref={rightRef}
        initial="hidden"
        animate={rightInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <ContactSection2 />
      </motion.div>
    </div>
  );
};

export default ContactBody;
