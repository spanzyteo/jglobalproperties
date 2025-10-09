import AboutHero from "../components/about/AboutHero";
import Ceo from "../components/about/Ceo";
import MissionAndVision from "../components/about/MissionAndVision";
import Contact from "../components/home/Contact";
import Records from "../components/home/Records";
import Reviews from "../components/home/Reviews";
import Team from "../components/home/Team";

const About = () => {
  return (
    <>
      <AboutHero />
      <Ceo />
      <MissionAndVision />
      <Team />
      <Reviews />
      <Records />
      <Contact />
    </>
  );
};

export default About;
