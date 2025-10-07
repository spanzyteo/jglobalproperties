'use client'

import Blogs from "./components/home/Blogs";
import Featured from "./components/home/Featured";
import Hero from "./components/home/Hero";
import Info from "./components/home/Info";
import OurServices from "./components/home/OurServices";
import PopularAreas from "./components/home/PopularAreas";
import Records from "./components/home/Records";
import Reviews from "./components/home/Reviews";
import Team from "./components/home/Team";
import WithUs from "./components/home/WithUs";
import Modal from "./components/Modal";

const Home = () => {
  return (
    <div className="relative">
      <Modal />
      <Hero />
      <OurServices />
      <Info />
      <WithUs />
      <Featured />
      <PopularAreas />
      <Team />
      <Records />
      <Reviews />
      <Blogs />
    </div>
  );
};

export default Home;
