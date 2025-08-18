'use client'

import Navbar from "./components/Navbar";
import About from "./components/home/About";
import Hero from "./components/home/Hero";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
    </>
  );
};

export default Home;
