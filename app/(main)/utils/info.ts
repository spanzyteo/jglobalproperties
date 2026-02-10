export interface InfoData {
  id: number;
  name: string;
  description: string;
  link: string;
  image: string;
}

export const info: InfoData[] = [
  {
    id: 0,
    name: "HOME SEARCH",
    description:
      "Searching for a new home is an exciting journey for buyers and sellers.",
    link: "/houses",
    image: "/house.webp",
  },
  {
    id: 1,
    name: "LAND VALUATION",
    description:
      "Accurate land valuation ensures fair pricing for sellers & appropriate offers for buyers.",
    link: "/lands",
    image: "/land.webp",
  },
  {
    id: 2,
    name: "LET'S CONNECT",
    description:
      "Whether you're looking to buy, sell, or simply have questions about the real estate.",
    link: "/contact",
    image: "/connect.webp",
  },
];
