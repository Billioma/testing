import React from "react";
import { Box } from "@chakra-ui/react";
import Hero from "../components/data/Faq/Hero";
import Content from "../components/data/Faq/Content";
import MobileApp from "../components/data/Home/MobileApp";

const Faq = () => {
  return (
    <Box>
      <Hero />
      <Content />
      <MobileApp />
    </Box>
  );
};

export default Faq;
