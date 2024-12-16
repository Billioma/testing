import React from "react";
import Hero from "../components/data/Operator/Hero";
import Solution from "../components/data/Operator/Solution";
import Analytics from "../components/data/Operator/Analytics";
import { Box } from "@chakra-ui/react";

const Operator = () => {
  return (
    <Box>
      <Hero />
      <Solution />
      <Analytics />
    </Box>
  );
};

export default Operator;
