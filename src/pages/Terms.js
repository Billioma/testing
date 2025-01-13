import React from "react";
import MobileApp from "../components/data/Home/MobileApp";
import Hero from "../components/data/Terms/Hero";
import Content from "../components/data/Terms/Content";
import { Box } from "@chakra-ui/react";

const Terms = () => {
  return (
    <Box>
      <Hero />
      <Content />
      <MobileApp />
    </Box>
  );
};

export default Terms;
