/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const Modal = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show modal after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    // Cleanup timer if component unmounts
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setIsVisible(false);
  };

  const handleOverlayClick = (e: any) => {
    // Close modal if clicking on the overlay (background)
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.14)]"
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex max-w-[58rem] lg:h-[33rem] pt-14 pb-5 lg:py-0 px-4 lg:px-[3rem] flex-col gap-16 bg-white rounded-[1.75rem] relative justify-center"
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 50,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              y: 50,
            }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <IoMdClose
              className="w-4 h-4 cursor-pointer text-gray-600 hover:text-gray-800 absolute top-6 right-8"
              onClick={closeModal}
            />
            <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-16">
              <div className="flex flex-col lg:w-[28rem] items-start gap-4">
                <div className="flex flex-col items-start gap-1 lg:gap-3">
                  <h1 className="lg:text-[2rem] text-[1rem] font-semibold lg:leading-[2.3rem] leading-[1.5rem]">
                    Essential Updates for Investors and Homebuyers
                  </h1>
                  <p className="lg:text-[1.125rem] text-[0.7rem] font-medium leading-[0.9rem] lg:leading-[1.375rem]">
                    Sign up for our weekly newsletter
                  </p>
                </div>
                <form className="flex flex-col items-start gap-[0.4rem] lg:gap-[0.875rem] w-full">
                  <div className="flex flex-col items-start gap-1 lg:gap-2 w-full">
                    <input
                      type="text"
                      placeholder="Name"
                      className="flex flex-col h-12 px-4 border rounded-[0.5rem] text-[0.875rem] leading-[1.125rem] text-black w-full focus:outline-none border-[#D9D9D9]"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="flex flex-col h-12 px-4 border rounded-[0.5rem] text-[0.875rem] leading-[1.125rem] text-black w-full focus:outline-none border-[#D9D9D9]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="py-[0.78rem] lg:py-4 px-[1.5rem] lg:px-8 flex items-center justify-center rounded-[0.5rem] bg-[#941A1A] text-[0.78rem] lg:text-[1rem] leading-[1rem] lg:leading-[1.25rem] text-white w-full hover:bg-[#7a1616] transition-colors"
                  >
                    Sign up
                  </button>
                </form>
              </div>
              <Image
                src={"/modal.png"}
                width={313}
                height={344}
                alt="modal"
                className="lg:w-[19.6rem] w-full h-[21.5rem] modal mt-4 object-cover rounded-[1.25rem]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
