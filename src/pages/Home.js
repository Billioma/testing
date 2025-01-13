import React from "react";
import Hero from "../components/data/Home/Hero";
import Download from "../components/data/Home/Download";
import Testimonials from "../components/data/Home/Testimonials";
import GettingStarted from "../components/data/Home/GettingStarted";
import Find from "../components/data/Home/Find";
import About from "../components/data/Home/About";
import Plus from "../components/data/Home/Plus";
import { Box } from "@chakra-ui/react";
import MobileApp from "../components/data/Home/MobileApp";

const Home = () => {
  return (
    <Box>
      <Hero />
      <Download />
      <About />
      <Find />
      <Plus />
      <GettingStarted />
      <Testimonials />
      <MobileApp dash />
    </Box>
  );
};

export default Home;
