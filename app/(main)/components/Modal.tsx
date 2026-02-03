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
            className="flex w-[92%] lg:max-w-232 lg:h-132 pt-14 pb-5 lg:py-0 px-4 lg:px-12 flex-col gap-16 bg-white rounded-xl relative justify-center"
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
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-16 justify-center">
              <div className="flex flex-col w-full md:w-md items-start gap-4">
                <div className="flex flex-col items-start gap-1 lg:gap-3">
                  <h1 className="lg:text-[2rem] text-[1rem] font-semibold lg:leading-[2.3rem] leading-6">
                    Essential Updates for Investors and Homebuyers
                  </h1>
                  <p className="lg:text-[1.125rem] text-[0.7rem] font-medium leading-[0.9rem] lg:leading-5.5">
                    Sign up for our weekly newsletter
                  </p>
                </div>
                <form className="flex flex-col items-start gap-[0.4rem] lg:gap-3.5 w-full">
                  <div className="flex flex-col items-start gap-1 lg:gap-2 w-full">
                    <input
                      type="text"
                      placeholder="Name"
                      className="flex flex-col h-12 px-4 border rounded-lg text-[0.875rem] leading-4.5 text-black w-full focus:outline-none border-[#D9D9D9]"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="flex flex-col h-12 px-4 border rounded-lg text-[0.875rem] leading-4.5 text-black w-full focus:outline-none border-[#D9D9D9]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="py-[0.78rem] lg:py-4 px-6 lg:px-8 flex items-center justify-center rounded-lg bg-[#941A1A] text-[0.78rem] lg:text-[1rem] leading-4 lg:leading-5 text-white w-full hover:bg-[#7a1616] transition-colors"
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
                className="md:w-[19.6rem] w-full h-68 lg:h-86 modal mt-4 object-cover rounded-[1.25rem]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
