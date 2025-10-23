export type EventData = {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string; // e.g. "2025-11-05"
  time: string; // e.g. "10:00 AM - 4:00 PM"
  image: string; // event cover image
  organizer: string; // name of the organizer (e.g. J-Global Properties)
  isPast: boolean; // true if the event has already happened
};

const events: EventData[] = [
  {
    id: 1,
    title: "Luxury Apartment Open House",
    description:
      "Join us for an exclusive tour of our newly listed luxury apartments in Port Harcourt. Enjoy light refreshments and meet our property experts.",
    location: "Golf Estate, Port Harcourt, Rivers State",
    date: "2025-11-08",
    time: "10:00 AM - 2:00 PM",
    image: "/houses/house1.webp",
    organizer: "J-Global Properties",
    isPast: false,
  },
  {
    id: 2,
    title: "Real Estate Investment Seminar",
    description:
      "A deep dive into smart property investments in Nigeria. Learn from top industry experts about ROI strategies and legal frameworks.",
    location: "Landmark Centre, Victoria Island, Lagos",
    date: "2025-10-05",
    time: "9:00 AM - 3:00 PM",
    image: "/houses/house2.jpg",
    organizer: "J-Global Properties",
    isPast: true,
  },
  {
    id: 3,
    title: "Site Inspection — Pearl Estate Phase II",
    description:
      "An on-site visit to Pearl Estate Phase II for potential investors and clients. Experience the serene environment firsthand.",
    location: "Pearl Estate Phase II, Aba Road, Port Harcourt",
    date: "2025-11-15",
    time: "11:00 AM - 1:00 PM",
    image: "/houses/house3.webp",
    organizer: "J-Global Properties",
    isPast: false,
  },
  {
    id: 4,
    title: "Customer Appreciation Gala Night",
    description:
      "A night to celebrate our esteemed clients and partners. Expect fine dining, entertainment, and networking opportunities.",
    location: "Hotel Presidential, Port Harcourt",
    date: "2025-09-20",
    time: "6:00 PM - 10:00 PM",
    image: "/houses/house4.webp",
    organizer: "J-Global Properties",
    isPast: true,
  },
  {
    id: 5,
    title: "Affordable Housing Awareness Campaign",
    description:
      "An outreach event promoting affordable housing options and government-backed mortgage programs for young professionals.",
    location: "University of Port Harcourt, Rivers State",
    date: "2025-12-02",
    time: "9:00 AM - 1:00 PM",
    image: "/houses/house5.webp",
    organizer: "J-Global Properties",
    isPast: false,
  },
];

export default events;
