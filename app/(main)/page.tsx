'use client'

import About from "./components/home/About";
import Hero from "./components/home/Hero";
import Properties from "./components/home/Properties";
import Review from "./components/home/Review";
import Modal from "./components/Modal";

const Home = () => {
  return (
    <div className="relative">
      <Modal />
      <Hero />
      <About />
      <Properties />
      <Review />
    </div>
  );
};

export default Home;
