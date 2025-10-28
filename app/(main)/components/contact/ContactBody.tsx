"use client";
import { Roboto } from "next/font/google";
import Image from "next/image";
import {
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import ContactSection2 from "./ContactSection2";
import { easeOut, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ContactBody = () => {
  const { ref: leftRef, inView: leftInView } = useInView({
    // triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: rightRef, inView: rightInView } = useInView({
    // triggerOnce: true,
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

  const titleVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: easeOut,
      },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  const socialIcons = [
    // { Icon: FaFacebookF, href: "#" },
    // { Icon: FaWhatsapp, href: "#" },
    {
      Icon: FaInstagram,
      href: "https://www.instagram.com/jglobalproperties?igsh=M2x5NGtieTJkbTI4",
    },
    {
      Icon: FaLinkedinIn,
      href: "https://www.linkedin.com/company/jglobal-property-solution/",
    },
    {
      Icon: FaYoutube,
      href: "https://youtube.com/@jglobalproperties?si=gtcVve8oTV0uAEWQ",
    },
  ];

  return (
    <div className="bg-[#fffcfc] px-4 md:px-8 py-8 flex flex-col md:flex-row gap-4 overflow-hidden">
      <motion.div
        ref={leftRef}
        className="flex flex-col gap-6 w-full lg:max-w-[873px]"
        variants={containerVariants}
        initial="hidden"
        animate={leftInView ? "visible" : "hidden"}
      >
        <motion.div
          className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-10 py-12 px-6 shadow-sm`}
          variants={cardVariants}
          whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col gap-4">
            <motion.h1
              className="text-[35px] font-medium leading-[45px]"
              variants={titleVariants}
            >
              Jglobal properties
            </motion.h1>
            <motion.h3
              className="text-[18px]"
              variants={titleVariants}
              transition={{ delay: 0.1 }}
            >
              S Deasant Valley Lekki Ajah Expressway
            </motion.h3>

            <div className="flex items-center gap-3">
              {socialIcons.map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  custom={index}
                  variants={socialIconVariants}
                  whileHover={{
                    scale: 1.3,
                    color: "#941A1A",
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="h-[20px] w-[20px] cursor-pointer" />
                </motion.a>
              ))}
            </div>

            <motion.div
              className="flex flex-col gap-2 items-start"
              variants={cardVariants}
            >
              <div className="flex gap-6 items-start text-[15px]">
                <h4 className="font-medium leading-[23px]">Phone:</h4>
                <p>+234 816 432 2663</p>
              </div>
              <div className="flex gap-6 items-start text-[15px]">
                <h4 className="font-medium leading-[23px]">Mobile:</h4>
                <p>+234 816 432 2663</p>
              </div>
              <div className="flex gap-6 items-start text-[15px]">
                <h4 className="font-medium leading-[23px]">Email:</h4>
                <p>info@jglobalproperties.com</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col gap-5 text-[14px] leading-[23px]"
            variants={cardVariants}
          >
            <p>
              Whether you&apos;re looking for property for sale in Lagos or
              property for rent, Jglobal Properties makes searching easy. We
              specialize in helping you identify prime real estate opportunities
              that align with your investment goals. From luxury apartments to
              commercial properties, we connect you with the perfect property to
              build your wealth and secure your future.
            </p>
            <p>
              We offer our clients a wealth of knowledge regarding all aspects
              of purchasing or selling property. Whether it&apos;s helping you
              find your dream home, exploring lucrative investment
              opportunities, or providing expert guidance on property sales,
              we&apos;re committed to your success. Please feel free to contact
              us with any questions about navigating the real estate market!
            </p>
          </motion.div>

          <motion.div variants={imageVariants}>
            <Image
              src={"/ceo.JPG"}
              alt="ceo"
              width={900}
              height={819}
              className="w-full rounded-[5px] object-cover"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-5 py-12 px-6 shadow-sm`}
          variants={cardVariants}
          whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-[18px] font-medium leading-[23px]">Contact Me</h2>
          <form className="flex flex-col gap-3 w-full text-[14px]">
            <div className="flex flex-col md:flex-row md:justify-between gap-3 w-full">
              <motion.input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
                whileFocus={{ scale: 1.02, borderColor: "#941A1A" }}
              />
              <motion.input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
                whileFocus={{ scale: 1.02, borderColor: "#941A1A" }}
              />
              <motion.input
                type="text"
                placeholder="Your Phone"
                className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
                whileFocus={{ scale: 1.02, borderColor: "#941A1A" }}
              />
            </div>
            <motion.textarea
              className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
              rows={7}
              whileFocus={{ scale: 1.02, borderColor: "#941A1A" }}
            ></motion.textarea>
            <motion.button
              className="bg-black rounded-[5px] text-white w-full md:w-[139px] py-3 font-medium hover:bg-white hover:border hover:text-black transition-all duration-500 ease-in-out cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Email
            </motion.button>
          </form>
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
