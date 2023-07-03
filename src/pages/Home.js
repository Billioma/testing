import React from "react";
import Hero from "../components/data/Hero";
import Services from "../components/data/Services";
import Membership from "../components/data/Membership";
import How from "../components/data/How";
import Plus from "../components/data/Plus";
import Contact from "../components/data/Contact";
import Connect from "../components/data/Connect";

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Membership />
      <How />
      {/* <Plus /> */}
      <Contact />
      {/* <Connect /> */}
    </div>
  );
};

export default Home;
