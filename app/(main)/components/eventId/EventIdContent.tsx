"use client";
import { Playfair_Display, Roboto } from "next/font/google";
import { useAppSelector } from "../../store/hooks";
import { FaCalendarAlt, FaTag } from "react-icons/fa";
import Image from "next/image";

interface EventContentProps {
  loading?: boolean;
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const EventIdContent = ({ loading = false }: EventContentProps) => {
  const event = useAppSelector((state) => state.events.currentEvent);

  const truncateText = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  // Get the main image
  const mainImageUrl =
    event?.image && event.image.length > 0
      ? event.image[0].url
      : "/house-bg.webp";

  // Format the date
  const formattedDate = event?.date
    ? new Date(event.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // Description rendering with HTML support
  const DescriptionContent = () => {
    if (!event?.description) return null;

    // Check if description is HTML content (from tiptap)
    const isHTML = /<[^>]*>/g.test(event.description);

    if (isHTML) {
      return (
        <div
          className="text-[14px] leading-5.75 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: event.description }}
        />
      );
    }

    return <p className="text-[14px] leading-5.75">{event.description}</p>;
  };

  if (!event) {
    return (
      <div className="flex flex-col gap-6 w-full lg:max-w-218.25">
        <div
          className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-10 py-12 px-6 shadow-sm`}
        >
          <p className="text-gray-500">Event data not available</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-6 w-full lg:max-w-218.25">
        <div
          className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-10 py-12 px-6 shadow-sm`}
        >
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-64 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full lg:max-w-218.25">
      <div
        className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-10 py-12 px-6 shadow-sm`}
      >
        <h1
          className={`${playfair.className} text-[34px] font-medium leading-11`}
        >
          {event?.title}
        </h1>
        <div className="flex flex-col md:flex-row gap-1 md:gap-4 items-start md:items-center">
          <div className="flex items-center gap-2">
            <FaCalendarAlt />
            <h3 className="text-[13px] leading-5.75 mt-1">
              Posted on {formattedDate}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <FaTag />
            <h3 className="text-[13px] leading-[23px] mt-1">
              by {event?.organizer}
            </h3>
          </div>
        </div>
        <Image
          src={mainImageUrl}
          alt={event.title || "Event image"}
          width={819}
          height={500}
          className="rounded-[5px] object-cover h-[250px] md:h-[500px] w-full"
        />
        <DescriptionContent />
      </div>

      {/* Form for comment */}
      <div
        className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-5 py-12 px-6 shadow-sm`}
      >
        <h2 className="text-[18px] font-medium leading-[23px]">
          Say something about the event
        </h2>
        <form className="flex flex-col gap-3 w-full text-[14px]">
          <div className="flex flex-col md:flex-row md:justify-between gap-3 w-full">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
            />
            <input
              type="text"
              placeholder="Your Phone"
              className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
            />
          </div>
          <textarea
            className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
            rows={7}
          ></textarea>
          <button className="bg-black rounded-[5px] text-white w-full md:w-[139px] py-3 font-medium hover:bg-white hover:border hover:text-black transition-all duration-500 ease-in-out cursor-pointer">
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventIdContent;
