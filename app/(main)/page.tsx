'use client'

import About from "./components/home/About";
import Hero from "./components/home/Hero";
import Properties from "./components/home/Properties";
import Review from "./components/home/Review";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Properties />
      <Review />
    </>
  );
};

export default Home;
