'use client'

import Featured from "./components/home/Featured";
import Hero from "./components/home/Hero";
import Info from "./components/home/Info";
import OurServices from "./components/home/OurServices";
import PopularAreas from "./components/home/PopularAreas";
import Records from "./components/home/Records";
import Review from "./components/home/Review";
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
      <Review />
    </div>
  );
};

export default Home;
