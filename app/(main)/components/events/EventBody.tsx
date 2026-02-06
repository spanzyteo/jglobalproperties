import { Playfair_Display } from "next/font/google";
import EventSection from "./UpcomingEvents";
import PastEventSection from "./PastEvents";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const EventBody = () => {
  return (
    <div className="px-4 md:px-8 py-12 flex flex-col gap-4">
      <h1
        className={`${playfair.className} text-[34px] font-medium leading-11`}
      >
        Upcoming Events
      </h1>
      <EventSection />
      <h1
        className={`${playfair.className} text-[34px] font-medium leading-11`}
      >
        Past Events
      </h1>
      <PastEventSection />
    </div>
  );
}

export default EventBody