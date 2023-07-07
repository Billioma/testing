import React from "react";
import Hero from "../components/data/Home/Hero";
import Services from "../components/data/Home/Services";
import Membership from "../components/data/Home/Membership";
import How from "../components/data/Home/How";
import Contact from "../components/data/Home/Contact";
import GettingStarted from "../components/data/Home/GettingStarted";

const Home = () => {
  return (
    <div>
      <Hero />
      <Membership />
      <Services />
      <GettingStarted />
      <How />
      <Contact />
    </div>
  );
};

export default Home;
