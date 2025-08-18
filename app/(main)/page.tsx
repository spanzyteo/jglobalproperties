'use client'

import Navbar from "./components/Navbar";
import About from "./components/home/About";
import Hero from "./components/home/Hero";
import Properties from "./components/home/Properties";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Properties />
    </>
  );
};

export default Home;
