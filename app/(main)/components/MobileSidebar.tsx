import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeSidebar } from "../store/mobileSidebarSlice";

const MobileSidebar = () => {
  const sidebar = useAppSelector((state) => state.mobileSidebar.mobileSidebar);
  const dispatch = useAppDispatch();

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  // Animation variants for the sidebar container
  const sidebarVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  // Animation variants for menu items
  const menuItemVariants = {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  // Animation variants for the header (logo and close button)
  const headerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  // Animation variants for the close button
  const closeButtonVariants = {
    hidden: {
      opacity: 0,
      rotate: -90,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
    },
    hover: {
      scale: 1.1,
      rotate: 90,
    },
    tap: {
      scale: 0.9,
    },
  };

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "Properties" },
    { href: "/about", label: "About us" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact us" },
  ];

  return (
    <AnimatePresence mode="wait">
      {sidebar && (
        <motion.div
          className="fixed z-[60] top-0 w-full lg:hidden flex flex-col p-4 items-start gap-2 bg-white shadow-lg"
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{
            duration: 0.4,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.1,
            delayChildren: 0.1,
          }}
        >
          <motion.div
            className="flex p-4 items-center justify-between w-full"
            variants={headerVariants}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: 0.1,
              }}
            >
              <Image
                src={"/logo.svg"}
                alt="logo"
                width={90}
                height={70}
                className="w-[5.62rem] h-[4.374rem] object-cover"
              />
            </motion.div>
            <motion.div
              variants={closeButtonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: 0.2,
              }}
            >
              <IoMdClose
                onClick={handleCloseSidebar}
                className="w-10 h-10 cursor-pointer text-gray-600 hover:text-gray-800"
              />
            </motion.div>
          </motion.div>

          <motion.div className="flex flex-col items-start gap-2 w-full">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.href}
                className="flex h-12 py-2 px-4 items-center gap-2 w-full rounded-lg hover:bg-gray-50 transition-colors duration-200"
                variants={menuItemVariants}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                whileHover={{
                  x: 8,
                  transition: {
                    duration: 0.2,
                    ease: "easeOut",
                  },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 },
                }}
              >
                <Link
                  href={item.href}
                  className="text-[1rem] font-medium leading-[1.25rem] text-gray-800 hover:text-blue-600 transition-colors duration-200"
                  onClick={handleCloseSidebar}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;
