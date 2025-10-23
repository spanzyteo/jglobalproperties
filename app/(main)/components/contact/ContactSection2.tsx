/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { searchState } from "../../store/searchSlice";
import houses from "../../utils/houses";
import blogs from "../../utils/blogs";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ContactSection2 = () => {
  const search = useAppSelector((state) => state.search.searchOption);
  const dispatch = useAppDispatch();

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  const formVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="flex flex-col gap-6 w-full lg:max-w-[365px]">
      {/* Advanced Search */}
      <SearchCard
        search={search}
        dispatch={dispatch}
        roboto={roboto}
        cardVariants={cardVariants}
        formVariants={formVariants}
      />

      {/* Latest Listings */}
      <LatestListingsCard
        houses={houses}
        roboto={roboto}
        cardVariants={cardVariants}
        listItemVariants={listItemVariants}
      />

      {/* Recent Posts */}
      <RecentPostsCard
        blogs={blogs}
        roboto={roboto}
        cardVariants={cardVariants}
        listItemVariants={listItemVariants}
      />
    </div>
  );
};

// Search Card Component
const SearchCard = ({
  search,
  dispatch,
  roboto,
  cardVariants,
  formVariants,
}: any) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-4 py-12 px-6 shadow-sm`}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="font-medium leading-[25px] text-[16px]">
        Advanced Search
      </h2>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 mx-auto text-[14px]">
          <motion.button
            onClick={() => dispatch(searchState("lands"))}
            className={`py-2 px-4 rounded-[5px] cursor-pointer ${
              search === "lands"
                ? "bg-black text-white"
                : "bg-gray-300 border border-gray-400 text-black"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Lands
          </motion.button>
          <motion.button
            onClick={() => dispatch(searchState("houses"))}
            className={`py-2 px-4 rounded-[5px] cursor-pointer ${
              search === "houses"
                ? "bg-black text-white"
                : "bg-gray-300 border border-gray-400 text-black"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            House
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {search === "lands" && (
            <motion.form
              key="lands"
              className="w-full flex flex-col gap-2"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.input
                type="text"
                placeholder="Property Name"
                className="border border-gray-200 py-2 px-3 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
                whileFocus={{ scale: 1.02, borderColor: "#941A1A" }}
              />
              <motion.input
                type="text"
                placeholder="Location"
                className="border border-gray-200 py-2 px-3 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
                whileFocus={{ scale: 1.02, borderColor: "#941A1A" }}
              />
              <motion.input
                type="text"
                placeholder="State"
                className="border border-gray-200 py-2 px-3 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
                whileFocus={{ scale: 1.02, borderColor: "#941A1A" }}
              />
              <motion.button
                className="bg-black rounded-[5px] text-white w-full py-2 font-medium hover:bg-white hover:border hover:text-black transition-all duration-500 ease-in-out cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Search
              </motion.button>
            </motion.form>
          )}
          {search === "houses" && (
            <motion.form
              key="houses"
              className="w-full flex flex-col gap-2"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.input
                type="text"
                placeholder="Property Name"
                className="border border-gray-200 py-2 px-3 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
                whileFocus={{ scale: 1.02, borderColor: "#941A1A" }}
              />
              <motion.input
                type="text"
                placeholder="Location"
                className="border border-gray-200 py-2 px-3 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
                whileFocus={{ scale: 1.02, borderColor: "#941A1A" }}
              />
              <motion.input
                type="text"
                placeholder="State"
                className="border border-gray-200 py-2 px-3 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
                whileFocus={{ scale: 1.02, borderColor: "#941A1A" }}
              />
              <motion.button
                className="bg-black rounded-[5px] text-white w-full py-2 font-medium hover:bg-white hover:border hover:text-black transition-all duration-500 ease-in-out cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Search
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Latest Listings Component
const LatestListingsCard = ({
  houses,
  roboto,
  cardVariants,
  listItemVariants,
}: any) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-4 py-12 px-6 shadow-sm`}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="font-medium leading-[25px] text-[16px]">
        Latest Listings
      </h2>
      <div className="flex flex-col gap-4">
        {houses.slice(0, 3).map((item: any, index: number) => {
          const images = item.image[0];
          return (
            <motion.div
              key={item.id}
              className="flex gap-2 items-center cursor-pointer"
              custom={index}
              variants={listItemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover={{ x: 5, transition: { duration: 0.3 } }}
            >
              <div className="h-[70px] w-[105px]">
                {images && (
                  <div className="h-full w-full overflow-hidden rounded-[5px]">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      className="h-full w-full"
                    >
                      <Image
                        src={images.url}
                        alt="image"
                        height={70}
                        width={105}
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap- text-[14px] font-medium max-w-[150px] md:max-w-[190px]">
                <h4>{item.title}</h4>
                <h4>₦{item.price.toLocaleString()}</h4>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

// Recent Posts Component
const RecentPostsCard = ({
  blogs,
  roboto,
  cardVariants,
  listItemVariants,
}: any) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-4 py-12 px-6 shadow-sm`}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="font-medium leading-[25px] text-[28px]">Recent Posts</h1>
      <div className="flex flex-col gap-3">
        {blogs.slice(0, 5).map((item: any, index: number) => (
          <motion.div
            key={item.id}
            custom={index}
            variants={listItemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover={{
              x: 5,
              color: "#941A1A",
              transition: { duration: 0.3 },
            }}
            className="cursor-pointer"
          >
            <h4 className="text-[13px]">{item.title}</h4>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ContactSection2;
