export interface Images {
  id: number;
  url: string;
}

export interface HouseData {
  id: number;
  title: string;
  category: string;
  price: number;
  overview: string;
  location: string;
  state: string;
  country: string;
  image: Images[];
}

const houses: HouseData[] = [
  {
    id: 1,
    title: "Luxury 5-Bedroom Duplex with Pool",
    category: "Off Plan Homes",
    price: 120000000,
    overview:
      "This luxurious 5-bedroom duplex is designed for elegance and comfort. Located in the heart of Lekki Phase 1, it features a private swimming pool, modern kitchen fittings, high ceilings, and an open-plan living space that blends seamlessly with natural lighting. The home is built with top-grade materials and offers a perfect blend of aesthetics and functionality. Its spacious balcony overlooks the serene neighborhood, making it ideal for families and professionals seeking a premium lifestyle. The environment is secure, with proximity to shopping malls, good schools, and business districts.",
    location: "Lekki Phase 1",
    state: "Lagos",
    country: "Nigeria",
    image: [
      { id: 1, url: "/houses/house1.webp" },
      { id: 2, url: "/houses/house2.jpg" },
      { id: 3, url: "/houses/house3.webp" },
      { id: 4, url: "/houses/house4.webp" },
      { id: 5, url: "/houses/house5.webp" },
    ],
  },
  {
    id: 2,
    title: "Modern 3-Bedroom Apartment in Abuja",
    category: "Finished Homes",
    price: 4500000,
    overview:
      "A tastefully furnished 3-bedroom apartment situated in Wuse II, Abuja. This apartment boasts spacious interiors with high-quality finishes, an elegant dining area, and a fully equipped kitchen. Perfect for families or corporate executives, it provides 24-hour power supply, ample parking, and round-the-clock security. The living room opens to a balcony with a beautiful city view. Residents enjoy easy access to restaurants, banks, and recreational parks, making it one of the most convenient places to live in Abuja.",
    location: "Wuse II",
    state: "Abuja",
    country: "Nigeria",
    image: [
      { id: 1, url: "/houses/house2.jpg" },
      { id: 2, url: "/houses/house3.webp" },
      { id: 3, url: "/houses/house4.webp" },
      { id: 4, url: "/houses/house5.webp" },
      { id: 5, url: "/houses/house6.webp" },
    ],
  },
  {
    id: 3,
    title: "Beachfront 4-Bedroom Villa",
    category: "Finished Homes",
    price: 95000000,
    overview:
      "Wake up to the sound of the ocean in this stunning 4-bedroom beachfront villa located along Oniru Beach, Victoria Island. Designed for luxury and relaxation, the villa features floor-to-ceiling glass windows offering a panoramic sea view. Its open-concept kitchen and lounge flow into a spacious deck and infinity pool. Perfect for vacation homes or investment properties, this villa redefines coastal living in Lagos with top-notch architecture and a private serene atmosphere.",
    location: "Oniru Beach",
    state: "Lagos",
    country: "Nigeria",
    image: [
      { id: 1, url: "/houses/house3.webp" },
      { id: 2, url: "/houses/house4.webp" },
      { id: 3, url: "/houses/house5.webp" },
      { id: 4, url: "/houses/house6.webp" },
      { id: 5, url: "/houses/house7.webp" },
    ],
  },
  {
    id: 4,
    title: "Affordable 2-Bedroom Bungalow",
    category: "Off Plan Homes",
    price: 20000000,
    overview:
      "An affordable 2-bedroom bungalow located in Port Harcourt for small families or first-time homeowners. It features tiled floors, a fitted kitchen, modern bathroom fittings, and ample compound space for parking. Built with durable materials, it offers a good balance between comfort and cost-efficiency. The house is in a secure gated estate with good drainage and proximity to schools, markets, and hospitals. It’s an ideal choice for anyone looking for a cozy and peaceful residential environment.",
    location: "Rumuokoro",
    state: "Rivers",
    country: "Nigeria",
    image: [
      { id: 1, url: "/houses/house4.webp" },
      { id: 2, url: "/houses/house5.webp" },
      { id: 3, url: "/houses/house6.webp" },
      { id: 4, url: "/houses/house7.webp" },
      { id: 5, url: "/houses/house8.webp" },
    ],
  },
  {
    id: 5,
    title: "Elegant Studio Apartment",
    category: "Off Plan Homes",
    price: 1800000,
    overview:
      "A stylish and compact studio apartment perfect for young professionals or students. Located in Yaba, Lagos, it provides quick access to the University of Lagos, commercial centers, and transportation routes. Despite its compact size, the apartment comes with modern amenities such as a kitchenette, en-suite bathroom, and high-speed internet. The building features 24/7 security, backup power, and a clean water system, ensuring a comfortable living experience.",
    location: "Yaba",
    state: "Lagos",
    country: "Nigeria",
    image: [
      { id: 1, url: "/houses/house5.webp" },
      { id: 2, url: "/houses/house6.webp" },
      { id: 3, url: "/houses/house7.webp" },
      { id: 4, url: "/houses/house8.webp" },
      { id: 5, url: "/houses/house1.webp" },
    ],
  },
  {
    id: 6,
    title: "Spacious 4-Bedroom Terrace Duplex",
    category: "Off Plan Homes",
    price: 65000000,
    overview:
      "This contemporary 4-bedroom terrace duplex located in Gwarinpa, Abuja, offers modern living in a serene and secure environment. The home features en-suite rooms, an elegant master suite with a walk-in closet, and a large family lounge. Its open-plan kitchen connects to a bright dining area, while the outdoor terrace is ideal for evening relaxation. The property is within a gated estate with modern infrastructure, 24-hour security, and backup power. Perfect for growing families or investors looking for high-value properties in Abuja.",
    location: "Gwarinpa",
    state: "Abuja",
    country: "Nigeria",
    image: [
      { id: 1, url: "/houses/house6.webp" },
      { id: 2, url: "/houses/house7.webp" },
      { id: 3, url: "/houses/house8.webp" },
      { id: 4, url: "/houses/house1.webp" },
      { id: 5, url: "/houses/house2.jpg" },
    ],
  },
  {
    id: 7,
    title: "Cozy 2-Bedroom Apartment in Enugu",
    category: "Finished Homes",
    price: 1500000,
    overview:
      "Located in Independence Layout, Enugu, this cozy 2-bedroom apartment is ideal for small families or young couples. It features spacious bedrooms, a fitted kitchen, and a well-ventilated living room. The environment is peaceful and neatly maintained, offering easy access to schools, shopping centers, and healthcare facilities. With good road networks and constant water supply, residents enjoy convenience and comfort at an affordable rate.",
    location: "Independence Layout",
    state: "Enugu",
    country: "Nigeria",
    image: [
      { id: 1, url: "/houses/house7.webp" },
      { id: 2, url: "/houses/house8.webp" },
      { id: 3, url: "/houses/house1.webp" },
      { id: 4, url: "/houses/house2.jpg" },
      { id: 5, url: "/houses/house3.webp" },
    ],
  },
  {
    id: 8,
    title: "Classic 5-Bedroom Mansion in Ikoyi",
    category: "Finished Homes",
    price: 250000000,
    overview:
      "This elegant 5-bedroom mansion located in the prestigious Ikoyi neighborhood exemplifies timeless architecture and sophistication. Each room is tastefully designed with high-end finishes, chandeliers, and marble flooring. The mansion boasts two living rooms, a home cinema, a gym, and a private garden. Its large compound can accommodate several vehicles, while the rooftop terrace offers breathtaking views of Lagos skyline. Ideal for luxury seekers who value privacy, comfort, and exclusivity.",
    location: "Ikoyi",
    state: "Lagos",
    country: "Nigeria",
    image: [
      { id: 1, url: "/houses/house8.webp" },
      { id: 2, url: "/houses/house1.webp" },
      { id: 3, url: "/houses/house2.jpg" },
      { id: 4, url: "/houses/house3.webp" },
      { id: 5, url: "/houses/house4.webp" },
    ],
  },
];

export default houses;
