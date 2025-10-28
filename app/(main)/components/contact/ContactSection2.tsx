"use client";
import { Roboto } from "next/font/google";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import houses from "../../utils/houses";
import blogs from "../../utils/blogs";
import LatestHouseListings from "./LatestHouseListings";
import LatestLandListings from "./LatestLandListings";
import lands from "../../utils/lands";
import RecentPostCard from "./RecentPostCard";
import SearchCard from "./SearchCard";

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
      <LatestHouseListings
        houses={houses}
        roboto={roboto}
        cardVariants={cardVariants}
        listItemVariants={listItemVariants}
      />

      <LatestLandListings
        lands={lands}
        roboto={roboto}
        cardVariants={cardVariants}
        listItemVariants={listItemVariants}
      />

      {/* Recent Posts */}
      <RecentPostCard
        blogs={blogs}
        roboto={roboto}
        cardVariants={cardVariants}
        listItemVariants={listItemVariants}
      />
    </div>
  );
};

export default ContactSection2;
