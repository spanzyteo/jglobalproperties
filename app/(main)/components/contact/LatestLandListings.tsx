/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const LatestLandListings = ({
  lands,
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
        Latest Lands Listings
      </h2>
      <div className="flex flex-col gap-4">
        {lands.slice(0, 3).map((item: any, index: number) => {
          const images = item.images[0];
          return (
            <motion.a
              href={`/pages/lands/${item.slug}`}
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
                <h4>{item.units[0] &&
              `₦${parseInt(item.units[0].price).toLocaleString()}`}</h4>
              </div>
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
};

export default LatestLandListings;
