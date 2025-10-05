'use client'

import Hero from "./components/home/Hero";
import Info from "./components/home/Info";
import OurServices from "./components/home/OurServices";
import Properties from "./components/home/Properties";
import Review from "./components/home/Review";
import Modal from "./components/Modal";

const Home = () => {
  return (
    <div className="relative">
      <Modal />
      <Hero />
      <OurServices />
      <Info />
      {/* <About /> */}
      <Properties />
      <Review />
    </div>
  );
};

export default Home;
