export interface TeamData {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
}

export const team: TeamData[] = [
  {
    id: 0,
    name: "Joan Obi-Okuhon",
    role: "CEO / Lead Consultant",
    image: "/team/joan.png",
    description:
      "Joan is a driven professional committed to delivering exceptional service and steadfast support to her clients. Her extensive expertise in the real estate industry and dedication to client satisfaction have garnered her numerous positive referrals from those she served.",
  },
  {
    id: 1,
    name: "Rita Akoke",
    role: "Digital Marketer",
    image: "/team/rita.png",
    description:
      "Rita is a creative and strategic content writer with robust knowledge in digital marketing. She has a passion for crafting compelling stories/strategies and driving online success.",
  },
  {
    id: 2,
    name: "Iweka Tiana",
    role: "Director of Communications",
    image: "/team/tiana.png",
    description:
      "Tiana is an exceptional team leader who oversees and directs both internal and external communications.",
  },
  {
    id: 3,
    name: "Josiah Victor",
    role: "Creative",
    image: "/team/victor.png",
    description:
      "Josiah is an innovative creative known for his unique designs and storytelling approach that captivates and resonates with the brand.",
  },
];
