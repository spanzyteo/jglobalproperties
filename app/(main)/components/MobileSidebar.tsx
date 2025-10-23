import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeSidebar } from "../store/mobileSidebarSlice";

const MobileSidebar = () => {
  const sidebar = useAppSelector((state) => state.mobileSidebar.mobileSidebar);
  const dispatch = useAppDispatch();
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  const toggleProperties = () => {
    setIsPropertiesOpen(!isPropertiesOpen);
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

  // Animation variants for dropdown container
  const dropdownContainerVariants = {
    hidden: {
      height: 0,
      opacity: 0,
    },
    visible: {
      height: "auto",
      opacity: 1,
    },
    exit: {
      height: 0,
      opacity: 0,
    },
  };

  // Animation variants for dropdown items
  const dropdownItemVariants = {
    hidden: {
      opacity: 0,
      x: -10,
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
    { href: "/", label: "Home", type: "link" },
    {
      label: "Pages",
      type: "dropdown",
      subItems: [
        { href: "/pages/lands", label: "Lands" },
        { href: "/pages/houses", label: "Houses" },
        { href: "/pages/events", label: "Events" },
      ],
    },
    { href: "/about", label: "About us", type: "link" },
    { href: "/blog", label: "Blog", type: "link" },
    { href: "/contact", label: "Contact us", type: "link" },
  ];

  return (
    <AnimatePresence mode="wait">
      {sidebar && (
        <motion.div
          className="fixed z-[60] top-0 w-full lg:hidden flex flex-col pb-9 items-start bg-black shadow-lg"
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
                className="w-8 h-8 cursor-pointer text-white hover:text-gray-200"
              />
            </motion.div>
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
          </motion.div>

          <motion.div className="flex flex-col items-start gap-2 w-full">
            {menuItems.map((item) => (
              <motion.div
                key={item.label}
                className="w-full"
                variants={menuItemVariants}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                {item.type === "dropdown" ? (
                  <div className="w-full">
                    {/* Dropdown Header */}
                    <motion.div
                      className="flex h-12 py-2 px-4 items-center justify-between w-full border-b border-b-gray-500 cursor-pointer"
                      onClick={toggleProperties}
                      whileTap={{
                        scale: 0.98,
                        transition: { duration: 0.1 },
                      }}
                    >
                      <span className="text-[1rem] font-medium leading-[1.25rem] text-white hover:text-blue-600 transition-colors duration-200">
                        {item.label}
                      </span>
                      <motion.div
                        animate={{ rotate: isPropertiesOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {isPropertiesOpen ? (
                          <MdKeyboardArrowUp className="w-6 h-6 text-white" />
                        ) : (
                          <MdKeyboardArrowDown className="w-6 h-6 text-white" />
                        )}
                      </motion.div>
                    </motion.div>

                    {/* Dropdown Items */}
                    <AnimatePresence>
                      {isPropertiesOpen && (
                        <motion.div
                          className="flex flex-col overflow-hidden"
                          variants={dropdownContainerVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          transition={{
                            duration: 0.3,
                            ease: [0.04, 0.62, 0.23, 0.98],
                          }}
                        >
                          {item.subItems?.map((subItem, subIndex) => (
                            <motion.div
                              key={subItem.href}
                              className="flex h-10 py-2 px-8 items-center w-full border-b border-b-gray-700"
                              variants={dropdownItemVariants}
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              transition={{
                                duration: 0.2,
                                delay: subIndex * 0.05,
                              }}
                              whileTap={{
                                scale: 0.98,
                                transition: { duration: 0.1 },
                              }}
                            >
                              <Link
                                href={subItem.href}
                                className="text-[0.95rem] font-normal leading-[1.25rem] text-gray-300 hover:text-[#941A1A] transition-colors duration-200"
                                onClick={handleCloseSidebar}
                              >
                                {subItem.label}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    className="flex h-12 py-2 px-4 items-center gap-2 w-full border-b border-b-gray-500"
                    whileTap={{
                      scale: 0.98,
                      transition: { duration: 0.1 },
                    }}
                  >
                    <Link
                      href={item.href || "/"}
                      className="text-[1rem] font-medium leading-[1.25rem] text-white hover:text-blue-600 transition-colors duration-200"
                      onClick={handleCloseSidebar}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;
