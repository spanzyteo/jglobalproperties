// types/review.ts
export interface Review {
  id: string;
  name: string;
  title: string;
  content: string;
  avatar?: string;
}

export const reviewsData: Review[] = [
  {
    id: "1",
    name: "Mr Jude",
    title: "Land Investor",
    content:
      "Thank you for everything! From the very beginning, you have been there every step of the way, ensuring all my needs are met and my questions answered. Your support and transparency is immensely appreciated.",
  },
  {
    id: "2",
    name: "Mr James",
    title: "House Investor",
    content:
      "Jglobal Properties is a stress-free straight-to-the-point Real estate brokerage firm I used to acquire landed properties in Lagos. The company took me by the hand throughout the process and made sure I saved costs and money. I will highly recommend the company to anyone interested in land and property acquisition in Lagos state and Nigeria at large.",
  },
  {
    id: "3",
    name: "Mr Austin",
    title: "Real Estate Investor",
    content:
      "I got my first Property with Jglobal and I was amazed at the array of real estate investing at their disposal. I got the best deal because Jglobal team protected my interests.",
  },
  {
    id: "4",
    name: "Mrs Sarah",
    title: "Property Developer",
    content:
      "Working with Jglobal Properties has been an absolute game-changer for my investment portfolio. Their attention to detail and commitment to client satisfaction is unmatched in the industry.",
  },
  {
    id: "5",
    name: "Dr Michael",
    title: "Investment Consultant",
    content:
      "The professionalism and expertise demonstrated by the Jglobal team is remarkable. They guided me through every aspect of the property acquisition process with clarity and confidence.",
  },
];
