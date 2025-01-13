import React from "react";
import Hero from "../components/data/Operator/Hero";
import Solution from "../components/data/Operator/Solution";
import Analytics from "../components/data/Operator/Analytics";
import { Box } from "@chakra-ui/react";
import Download from "../components/data/Operator/Download";
import MobileApp from "../components/data/Home/MobileApp";

const Operator = () => {
  return (
    <Box>
      <Hero />
      <Solution />
      <Analytics />
      <Download />
      <MobileApp />
    </Box>
  );
};

export default Operator;
