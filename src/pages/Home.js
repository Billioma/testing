import React from "react";
import Hero from "../components/data/Home/Hero";
import Services from "../components/data/Home/Services";
import Membership from "../components/data/Home/Membership";
import How from "../components/data/Home/How";
import GettingStarted from "../components/data/Home/GettingStarted";
import Plus from "../components/data/Home/Plus";

const Home = () => {
  return (
    <div>
      <Hero />
      <Membership />
      <Services />
      <Plus />
      <GettingStarted />
      <How />
    </div>
  );
};

export default Home;
