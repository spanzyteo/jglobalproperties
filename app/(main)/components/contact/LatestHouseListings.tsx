"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";
import { useFeaturedHouses } from "../../features/houses/hooks";

const LatestHouseListings = ({
  roboto,
  cardVariants,
  listItemVariants,
}: any) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const { houses, loading } = useFeaturedHouses(3);

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
      <h2 className="font-medium leading-6.25 text-[16px]">
        Latest House Listings
      </h2>
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="flex flex-col gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-2 items-center animate-pulse">
                <div className="h-17.5 w-26.25 bg-gray-200 rounded-[5px]" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          houses.slice(0, 3).map((item: any, index: number) => {
            const imageUrl = item.images && item.images[0]?.url;
            return (
              <motion.a
                href={`/pages/houses/${item.id}`}
                key={item.id}
                className="flex gap-2 items-center cursor-pointer"
                custom={index}
                variants={listItemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                whileHover={{ x: 5, transition: { duration: 0.3 } }}
              >
                <div className="h-17.5 w-26.25">
                  {imageUrl && (
                    <div className="h-full w-full overflow-hidden rounded-[5px]">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        className="h-full w-full"
                      >
                        <Image
                          src={imageUrl}
                          alt={item.title}
                          height={70}
                          width={105}
                          className="h-full w-full object-cover"
                        />
                      </motion.div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap- text-[14px] font-medium max-w-37.5 md:max-w-47.5">
                  <h4>{item.title}</h4>
                  <h4>{item.price.toLocaleString()}</h4>
                </div>
              </motion.a>
            );
          })
        )}
      </div>
    </motion.div>
  );
};

export default LatestHouseListings;
