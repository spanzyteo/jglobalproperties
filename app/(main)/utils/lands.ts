export interface LandUnit {
  id: string;
  size: number;
  unit: string;
  price: string;
  available: boolean;
}

export interface LandImage {
  id: number;
  url: string;
}

export interface LandData {
  id: string;
  title: string;
  slug: string;
  overview: string;
  location: string;
  state: string;
  country: string;
  status: string;
  averageRating: number | null;
  totalReviews: number;
  units: LandUnit[];
  images: LandImage[];
}

const lands: LandData[] = [
  {
    id: "land-001",
    title: "Prime Commercial Land in Lekki Phase 1",
    slug: "prime-commercial-land-lekki-phase-1",
    overview:
      "This prime commercial land is strategically located in the heart of Lekki Phase 1, one of Lagos' most prestigious business districts. With excellent road access and proximity to major commercial centers, this property offers incredible potential for retail, office, or mixed-use development. The land comes with a clean Certificate of Occupancy and is surrounded by thriving businesses, making it an ideal investment opportunity.",
    location: "Lekki Phase 1",
    state: "Lagos",
    country: "Nigeria",
    status: "FOR SALE",
    averageRating: null,
    totalReviews: 0,
    units: [
      {
        id: "unit-001",
        size: 1000,
        unit: "sqm",
        price: "150000000",
        available: true,
      },
    ],
    images: [
      { id: 1, url: "/houses/house1.webp" },
      { id: 2, url: "/houses/house2.jpg" },
      { id: 3, url: "/houses/house3.webp" },
      { id: 4, url: "/houses/house4.webp" },
      { id: 5, url: "/houses/house5.webp" },
    ],
  },
  {
    id: "land-002",
    title: "Affordable Residential Land in Ibeju-Lekki",
    slug: "affordable-residential-land-ibeju-lekki",
    overview:
      "Located in the rapidly developing area of Ibeju-Lekki, this residential land offers an excellent opportunity for building your dream home or investment property. The area is close to the proposed Lekki International Airport and several beach resorts. With good road networks and increasing infrastructure development, this land promises great appreciation potential. Perfect for those looking to invest in Lagos' future growth corridor.",
    location: "Ibeju-Lekki",
    state: "Lagos",
    country: "Nigeria",
    status: "FOR SALE",
    averageRating: null,
    totalReviews: 0,
    units: [
      {
        id: "unit-002",
        size: 500,
        unit: "sqm",
        price: "8000000",
        available: true,
      },
    ],
    images: [
      { id: 1, url: "/houses/house2.jpg" },
      { id: 2, url: "/houses/house3.webp" },
      { id: 3, url: "/houses/house4.webp" },
      { id: 4, url: "/houses/house5.webp" },
      { id: 5, url: "/houses/house6.webp" },
    ],
  },
  {
    id: "land-003",
    title: "Waterfront Land in Victoria Island",
    slug: "waterfront-land-victoria-island",
    overview:
      "Rare opportunity to own a waterfront property in the prestigious Victoria Island. This land offers stunning views and direct water access, making it perfect for luxury residential or hospitality development. The location provides unmatched exclusivity and is surrounded by high-end properties, embassies, and premium business establishments. With full documentation and government approval, this is a once-in-a-lifetime investment opportunity.",
    location: "Victoria Island",
    state: "Lagos",
    country: "Nigeria",
    status: "FOR SALE",
    averageRating: null,
    totalReviews: 0,
    units: [
      {
        id: "unit-003",
        size: 2000,
        unit: "sqm",
        price: "500000000",
        available: true,
      },
    ],
    images: [
      { id: 1, url: "/houses/house3.webp" },
      { id: 2, url: "/houses/house4.webp" },
      { id: 3, url: "/houses/house5.webp" },
      { id: 4, url: "/houses/house6.webp" },
      { id: 5, url: "/houses/house7.webp" },
    ],
  },
  {
    id: "land-004",
    title: "Estate Development Land in Abuja",
    slug: "estate-development-land-abuja",
    overview:
      "This expansive land in Gwarinpa, Abuja, is perfect for estate development or large-scale residential projects. Located in a well-planned district with excellent infrastructure, constant power supply, and good security. The area is experiencing rapid growth with new developments springing up. Ideal for developers looking to create a gated community or luxury estate in Nigeria's capital city.",
    location: "Gwarinpa",
    state: "Abuja",
    country: "Nigeria",
    status: "FOR SALE",
    averageRating: null,
    totalReviews: 0,
    units: [
      {
        id: "unit-004",
        size: 5000,
        unit: "sqm",
        price: "350000000",
        available: true,
      },
    ],
    images: [
      { id: 1, url: "/houses/house4.webp" },
      { id: 2, url: "/houses/house5.webp" },
      { id: 3, url: "/houses/house6.webp" },
      { id: 4, url: "/houses/house7.webp" },
      { id: 5, url: "/houses/house8.webp" },
    ],
  },
  {
    id: "land-005",
    title: "Agricultural Land in Epe",
    slug: "agricultural-land-epe",
    overview:
      "Vast agricultural land located in Epe, ideal for farming, livestock, or agribusiness ventures. The land features fertile soil, access to water, and is suitable for various agricultural activities including crop cultivation, poultry, or fish farming. With growing interest in commercial agriculture, this property offers excellent returns for investors looking to venture into the agricultural sector while enjoying the peaceful rural environment.",
    location: "Epe",
    state: "Lagos",
    country: "Nigeria",
    status: "SOLD",
    averageRating: null,
    totalReviews: 0,
    units: [
      {
        id: "unit-005",
        size: 10000,
        unit: "sqm",
        price: "25000000",
        available: true,
      },
    ],
    images: [
      { id: 1, url: "/houses/house5.webp" },
      { id: 2, url: "/houses/house6.webp" },
      { id: 3, url: "/houses/house7.webp" },
      { id: 4, url: "/houses/house8.webp" },
      { id: 5, url: "/houses/house1.webp" },
    ],
  },
  {
    id: "land-006",
    title: "Industrial Land in Ikeja",
    slug: "industrial-land-ikeja",
    overview:
      "Prime industrial land strategically located in Ikeja, Lagos' industrial hub. This property offers excellent access to major highways, the airport, and commercial centers. Suitable for warehousing, manufacturing, or logistics operations. The area has reliable power supply and is home to numerous established businesses. With proper documentation and good road infrastructure, this land is perfect for serious industrial investors.",
    location: "Ikeja",
    state: "Lagos",
    country: "Nigeria",
    status: "SOLD",
    averageRating: null,
    totalReviews: 0,
    units: [
      {
        id: "unit-006",
        size: 3000,
        unit: "sqm",
        price: "180000000",
        available: true,
      },
    ],
    images: [
      { id: 1, url: "/houses/house6.webp" },
      { id: 2, url: "/houses/house7.webp" },
      { id: 3, url: "/houses/house8.webp" },
      { id: 4, url: "/houses/house1.webp" },
      { id: 5, url: "/houses/house2.jpg" },
    ],
  },
  {
    id: "land-007",
    title: "Beachfront Land in Badagry",
    slug: "beachfront-land-badagry",
    overview:
      "Stunning beachfront property in Badagry offering direct beach access and breathtaking ocean views. Perfect for resort development, beach houses, or vacation rentals. The area is becoming increasingly popular for tourism and leisure activities. With the government's renewed focus on tourism development along the Lagos coastline, this property presents an excellent opportunity for hospitality ventures or exclusive residential development.",
    location: "Badagry",
    state: "Lagos",
    country: "Nigeria",
    status: "SOLD",
    averageRating: null,
    totalReviews: 0,
    units: [
      {
        id: "unit-007",
        size: 1500,
        unit: "sqm",
        price: "75000000",
        available: true,
      },
    ],
    images: [
      { id: 1, url: "/houses/house7.webp" },
      { id: 2, url: "/houses/house8.webp" },
      { id: 3, url: "/houses/house1.webp" },
      { id: 4, url: "/houses/house2.jpg" },
      { id: 5, url: "/houses/house3.webp" },
    ],
  },
  {
    id: "land-008",
    title: "Mixed-Use Development Land in Surulere",
    slug: "mixed-use-development-land-surulere",
    overview:
      "Well-positioned land in the vibrant Surulere area, perfect for mixed-use development combining residential and commercial spaces. The location offers excellent foot traffic, proximity to major markets, schools, and entertainment centers. With Surulere's rich history and ongoing urban renewal projects, this property is ideal for building modern apartments with ground-floor retail spaces or a mixed-use complex that caters to the area's dynamic community.",
    location: "Surulere",
    state: "Lagos",
    country: "Nigeria",
    status: "SOLD",
    averageRating: null,
    totalReviews: 0,
    units: [
      {
        id: "unit-008",
        size: 800,
        unit: "sqm",
        price: "95000000",
        available: true,
      },
    ],
    images: [
      { id: 1, url: "/houses/house8.webp" },
      { id: 2, url: "/houses/house1.webp" },
      { id: 3, url: "/houses/house2.jpg" },
      { id: 4, url: "/houses/house3.webp" },
      { id: 5, url: "/houses/house4.webp" },
    ],
  },
];

export default lands;
